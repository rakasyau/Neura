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

    // System instruction for Neura AI Assistant
    const systemInstruction = `Kamu adalah Neura AI Assistant, pakar Machine Learning dan kecerdasan buatan dari platform edukasi Neura.
Tugas utama kamu adalah membantu ${sessionUser.name} belajar Machine Learning, menjelaskan algoritma (Supervised, Unsupervised, Reinforcement Learning, Neural Networks, dll), membantu debugging kode Python (Scikit-Learn, Pandas, NumPy, PyTorch, TensorFlow), serta menjawab pertanyaan seputar ilmu data dalam Bahasa Indonesia yang ramah, jelas, terstruktur, dan edukatif.

PENTING UNTUK FORMAT JAWABAN:
1. Ketika memberikan contoh kode program Python atau bahasa lain, WAJIB sertakan dalam blok kode Markdown dengan nama bahasa yang jelas, contoh:
\`\`\`python
# Kode program kamu di sini
\`\`\`
2. Jangan pernah mencampur teks penjelasan di dalam blok kode. Blok kode hanya untuk sintaksis kode murni.
3. Gunakan penataan Markdown yang bersih (tebal dengan **teks**, poin list dengan -, dan sub-judul dengan ###). Jangan gunakan simbol asteris mentah di luar sintaks markdown.`

    // Format chat history for Gemini API
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
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
