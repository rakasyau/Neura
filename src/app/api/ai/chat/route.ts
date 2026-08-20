import { NextResponse } from "next/server"
import { getSessionUser } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rateLimit"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI Chat sedang tidak tersedia. API key belum dikonfigurasi." },
        { status: 503 }
      )
    }

    const sessionUser = getSessionUser()
    if (!sessionUser) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu untuk menggunakan AI Chat Agent." },
        { status: 401 }
      )
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const { allowed, remaining } = checkRateLimit(`chat:${sessionUser.userId}:${ip}`, 30, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan chat. Tunggu sebentar." },
        { status: 429 }
      )
    }

    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Format pesan tidak valid" },
        { status: 400 }
      )
    }

    // Validate message limits
    const MAX_MESSAGES = 20
    const MAX_CONTENT_LENGTH = 4000

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: `Maksimal ${MAX_MESSAGES} pesan per percakapan. Silakan reset chat.` },
        { status: 400 }
      )
    }

    for (const m of messages) {
      if (!m || typeof m.role !== "string" || typeof m.content !== "string") {
        return NextResponse.json(
          { error: "Setiap pesan harus memiliki 'role' dan 'content' yang valid." },
          { status: 400 }
        )
      }
      if (m.content.length > MAX_CONTENT_LENGTH) {
        return NextResponse.json(
          { error: `Panjang pesan maksimal ${MAX_CONTENT_LENGTH} karakter.` },
          { status: 400 }
        )
      }
    }

    // Sanitize: strip HTML/script tags from content
    const sanitize = (text: string) => text.replace(/<[^>]*>/g, "")

    // System instruction for Neura AI Assistant
    const systemInstruction = `Kamu adalah Neura AI Assistant, pakar Machine Learning dan kecerdasan buatan dari platform edukasi Neura.
Tugas utama kamu adalah membantu ${sessionUser.name} belajar Machine Learning, menjelaskan algoritma (Supervised, Unsupervised, Reinforcement Learning, Neural Networks, dll), membantu debugging kode Python (Scikit-Learn, Pandas, NumPy, PyTorch, TensorFlow), serta menjawab pertanyaan seputar ilmu data dalam Bahasa Indonesia yang ramah, jelas, terstruktur, dan edukatif.

PANDUAN FORMAT TAMPILAN JAWABAN:
1. TABEL: Jika membandingkan dua konsep atau lebih (seperti Supervised vs Unsupervised), gunakan format Tabel Markdown standar GitHub (| Kolom 1 | Kolom 2 |) agar dapat dirender secara visual dan rapi.
2. STRUKTUR & JUDUL: Gunakan judul hierarkis Markdown yang rapi (## untuk topik utama, ### untuk sub-topik). Hindari penggunaan tanda pagar berlebihan.
3. DAFTAR POIN: Gunakan bullet list (-) atau nomor (1., 2.) yang rapi untuk menjelaskan poin-poin penting.
4. KODE PROGRAM: Ketika memberikan contoh kode program, WAJIB sertakan dalam blok kode Markdown dengan nama bahasa yang jelas, contoh:
\`\`\`python
# Kode program kamu di sini
\`\`\`
Jangan mencampur teks penjelasan di dalam blok kode. Blok kode hanya untuk sintaksis kode murni.
5. PENEKANAN: Gunakan **teks tebal** untuk istilah penting. Hindari simbol asteris mentah di luar sintaks markdown.`

    // Format chat history for Gemini API
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: sanitize(m.content) }],
    }))

    // Primary & Fallback Models (Gemini 2.5 Flash -> Gemini 2.0 Flash -> Gemini 1.5 Pro)
    const modelsToTry = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
    ]

    let responseText = ""
    let lastError = ""

    for (const modelName of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }],
            },
            contents: contents,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        })

        const data = await res.json()

        if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          responseText = data.candidates[0].content.parts[0].text
          break // Success! Exit loop
        } else if (data?.error?.message) {
          lastError = data.error.message
          console.warn(`[Gemini API Model ${modelName} Warning]:`, data.error.message)
        }
      } catch (err) {
        lastError = err instanceof Error ? err.message : "Fetch failed"
      }
    }

    if (!responseText) {
      console.error("[Gemini API Error All Models Failed]:", lastError)
      return NextResponse.json(
        { error: "Gagal mendapatkan respon dari AI. Coba lagi nanti." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      reply: responseText,
    })
  } catch (error) {
    console.error("[AI Chat API Error]:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server AI Chat" },
      { status: 500 }
    )
  }
}
