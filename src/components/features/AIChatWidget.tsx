"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Bot, Send, User, RefreshCw, Copy, Check, Terminal } from "lucide-react"
import { notify } from "@/components/ui/Toast"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestedPrompts = [
  "💡 Jelaskan perbedaan Supervised dan Unsupervised Learning",
  "⚡ Berikan contoh kode Python untuk Random Forest",
  "🛡️ Bagaimana cara mengatasi Overfitting pada model?",
  "🎯 Buat 3 pertanyaan kuis cepat tentang Machine Learning",
]

interface AIChatWidgetProps {
  userName?: string
}

// Custom Markdown Code Block Component
function CodeBlockView({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    notify("Kode Tersalin", "Kode program berhasil disalin ke clipboard", "info")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-2xl overflow-hidden border border-white/15 bg-[#090E1A] shadow-xl">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/70 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2 text-neura-cyan">
          <Terminal className="w-3.5 h-3.5 text-neura-cyan" />
          <span className="lowercase font-bold tracking-wide">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-2.5 py-1 glass rounded-xl text-[11px] text-neura-muted hover:text-white transition-all border border-white/10"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400 font-bold">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Salin Kode</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-4 font-mono text-xs sm:text-xs text-neura-cyan leading-relaxed overflow-x-auto bg-black/50 selection:bg-neura-cyan/30">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// Helper to render inline markdown elements (bold, inline code, italic)
function renderInlineText(text: string): React.ReactNode[] {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g)

  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**") && token.length >= 4) {
      return (
        <strong key={i} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      )
    }
    if (token.startsWith("`") && token.endsWith("`") && token.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-black/60 text-neura-amber font-mono text-[11px] rounded border border-white/10 mx-0.5 inline-block"
        >
          {token.slice(1, -1)}
        </code>
      )
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length >= 2 && !token.startsWith("**")) {
      return (
        <em key={i} className="italic text-neura-cyan">
          {token.slice(1, -1)}
        </em>
      )
    }
    return token
  })
}

// Text block renderer with heading and list support
function FormattedTextBlock({ content }: { content: string }) {
  const lines = content.split("\n")

  return (
    <div className="space-y-1 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={idx} className="h-1.5" />

        // Headers
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="text-xs sm:text-sm font-bold text-neura-cyan mt-3 mb-1 font-display">
              {renderInlineText(trimmed.slice(4))}
            </h4>
          )
        }
        if (trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
          return (
            <h3 key={idx} className="text-sm sm:text-base font-bold text-white mt-3 mb-1 font-display">
              {renderInlineText(trimmed.replace(/^#+\s*/, ""))}
            </h3>
          )
        }

        // Bullet lists
        if (/^[-*•]\s+/.test(trimmed)) {
          const listText = trimmed.replace(/^[-*•]\s+/, "")
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 text-xs sm:text-sm my-0.5">
              <span className="text-neura-cyan shrink-0 mt-0.5 font-bold">•</span>
              <div>{renderInlineText(listText)}</div>
            </div>
          )
        }

        // Numbered lists
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2 text-xs sm:text-sm my-0.5">
              <span className="text-neura-amber font-mono text-xs font-bold shrink-0 mt-0.5">{numMatch[1]}.</span>
              <div>{renderInlineText(numMatch[2])}</div>
            </div>
          )
        }

        // Normal paragraph line
        return (
          <p key={idx} className="text-xs sm:text-sm">
            {renderInlineText(line)}
          </p>
        )
      })}
    </div>
  )
}

// Master Markdown Parser (separates code blocks from text blocks)
function FormattedMessage({ content }: { content: string }) {
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g
  const blocks: Array<{ type: "code"; language: string; code: string } | { type: "text"; content: string }> = []

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const textBefore = content.slice(lastIndex, match.index)
    if (textBefore.trim()) {
      blocks.push({ type: "text", content: textBefore })
    }
    blocks.push({
      type: "code",
      language: match[1] || "python",
      code: match[2].trimEnd(),
    })
    lastIndex = match.index + match[0].length
  }

  const textAfter = content.slice(lastIndex)
  if (textAfter.trim()) {
    blocks.push({ type: "text", content: textAfter })
  }

  // Fallback if no regex match was found
  if (blocks.length === 0) {
    blocks.push({ type: "text", content })
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        if (block.type === "code") {
          return <CodeBlockView key={i} language={block.language} code={block.code} />
        }
        return <FormattedTextBlock key={i} content={block.content} />
      })}
    </div>
  )
}

export function AIChatWidget({ userName = "Pembelajar ML" }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Halo **${userName}**! 👋 Saya **Neura AI Assistant**. Ada materi Machine Learning atau kode Python yang ingin kamu tanyakan atau diskusikan hari ini?`,
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim() || loading) return

    const newMessages: Message[] = [...messages, { role: "user", content: query.trim() }]
    setMessages(newMessages)
    if (!textToSend) setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (res.ok && data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }])
      } else {
        const errorMsg = data.error || "Gagal mendapatkan respon dari AI."
        setMessages([
          ...newMessages,
          { role: "assistant", content: `❌ **Error:** ${errorMsg}` },
        ])
        notify("Gagal Terhubung AI", errorMsg, "error")
      }
    } catch (err: any) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: `❌ **Error:** Terjadi kendala jaringan.` },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    notify("Pesan Tersalin", "Teks respon AI berhasil disalin ke clipboard", "info")
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="glass rounded-3xl border border-white/15 shadow-2xl flex flex-col h-[650px] overflow-hidden bg-neura-deep/80">
      {/* Header Chat */}
      <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-neura-cyan to-indigo-500 flex items-center justify-center text-neura-deep font-bold shadow-lg shadow-neura-cyan/20">
              <Bot className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#090E1A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold font-display text-white">Neura AI Assistant</h3>
            </div>
            <p className="text-[11px] text-neura-muted">Asisten Pembelajaran ML Real-time</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                content: `Percakapan telah direset. Ada yang ingin kamu pelajari hari ini, **${userName}**?`,
              },
            ])
          }
          className="p-2 glass rounded-xl text-neura-muted hover:text-white transition-all"
          title="Reset Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div className="w-8 h-8 rounded-xl bg-neura-cyan/20 border border-neura-cyan/30 text-neura-cyan flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`relative group max-w-[85%] sm:max-w-[78%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gradient-to-r from-neura-cyan to-teal-400 text-neura-deep font-medium rounded-tr-none shadow-lg shadow-neura-cyan/15"
                  : "glass border border-white/10 text-white rounded-tl-none bg-black/40"
              }`}
            >
              {m.role === "assistant" && (
                <button
                  onClick={() => handleCopy(m.content, idx)}
                  className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 glass rounded-lg text-neura-muted hover:text-white transition-all"
                  title="Salin Seluruh Respon"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Formatted Markdown & Code Blocks */}
              {m.role === "assistant" ? (
                <FormattedMessage content={m.content} />
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-neura-cyan/20 border border-neura-cyan/30 text-neura-cyan flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="glass p-4 rounded-2xl rounded-tl-none border border-white/10 bg-black/40 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neura-cyan animate-ping" />
              <span className="text-xs text-neura-muted">Neura AI sedang berpikir & menyusun jawaban...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length < 3 && (
        <div className="px-4 sm:px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
          {suggestedPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 glass rounded-xl text-xs text-neura-muted hover:text-neura-cyan hover:border-neura-cyan/40 transition-all shrink-0 border border-white/10"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-4 px-6 border-t border-white/10 bg-black/40">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan konsep Machine Learning, kode Python, atau teori..."
            disabled={loading}
            className="flex-1 px-4 py-3 bg-black/60 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-neura-muted focus:outline-none focus:border-neura-cyan/50 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 bg-neura-cyan text-neura-deep rounded-2xl font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shadow-lg shadow-neura-cyan/20 shrink-0"
          >
            <Send className="w-4 h-4 fill-current" />
          </button>
        </form>
      </div>
    </div>
  )
}
