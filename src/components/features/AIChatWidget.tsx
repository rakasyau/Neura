"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { motion } from "framer-motion"
import { Bot, Send, User, RefreshCw, Copy, Check, Terminal, ExternalLink } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
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

// Custom Markdown Code Block Component with Copy Button
function CodeBlockView({ language, code }: { language?: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    notify("Kode Tersalin", "Kode program berhasil disalin ke clipboard", "info")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-3 rounded-panel overflow-hidden border border-neura-line bg-neura-deep shadow-xl not-prose">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neura-deep/90 border-b border-neura-line text-xs font-mono">
        <div className="flex items-center gap-2 text-neura-cyan">
          <Terminal className="w-3.5 h-3.5 text-neura-cyan" />
          <span className="lowercase font-bold tracking-wide">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 px-2.5 py-1 glass rounded-xl text-[11px] text-neura-muted hover:text-white transition-all border border-neura-line"
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
      <pre className="p-4 font-mono text-xs sm:text-xs text-neura-cyan leading-relaxed overflow-x-auto bg-neura-deep/70 selection:bg-neura-cyan/30">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// Rich Markdown Message Renderer with GitHub Flavored Markdown (GFM)
function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="markdown-content text-xs sm:text-sm text-neura-text leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h2 className="text-base sm:text-lg font-bold font-display text-white mt-4 mb-2 first:mt-0 tracking-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-sm sm:text-base font-bold font-display text-white mt-4 mb-2 first:mt-0 pb-1 border-b border-neura-line">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-bold font-display text-neura-cyan mt-3 mb-1.5 first:mt-0">
              {children}
            </h4>
          ),
          h4: ({ children }) => (
            <h5 className="text-xs sm:text-sm font-bold text-white mt-2.5 mb-1 first:mt-0">
              {children}
            </h5>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="my-2 leading-relaxed text-neura-text/95 first:mt-0 last:mb-0">
              {children}
            </p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2.5 pl-5 list-disc marker:text-neura-cyan text-neura-text/90">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2.5 pl-5 list-decimal marker:text-neura-amber marker:font-bold text-neura-text/90">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1 text-xs sm:text-sm">
              {children}
            </li>
          ),

          // Strong & Emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-white">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neura-cyan/90">
              {children}
            </em>
          ),

          // Horizontal Rule
          hr: () => (
            <hr className="my-4 border-neura-line" />
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-neura-cyan pl-3.5 py-1.5 my-3 bg-neura-raised/40 rounded-r-lg text-neura-muted italic">
              {children}
            </blockquote>
          ),

          // Table Elements (GFM)
          table: ({ children }) => (
            <div className="overflow-x-auto my-3.5 rounded-lg border border-neura-line bg-neura-deep/70 shadow-md">
              <table className="w-full border-collapse text-left text-xs">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-neura-raised border-b border-neura-line text-neura-cyan font-bold font-display">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-neura-line/50">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-neura-panel/50 transition-colors even:bg-neura-panel/20">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 font-bold border-r border-neura-line/40 last:border-r-0 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 border-r border-neura-line/30 last:border-r-0 text-neura-text/90 align-top leading-relaxed">
              {children}
            </td>
          ),

          // Code
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            const codeString = String(children).replace(/\n$/, "")
            const isInline = !match && !String(children).includes("\n")

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-neura-deep text-neura-amber font-mono text-[11px] sm:text-xs rounded border border-neura-line mx-0.5 inline-block"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            return (
              <CodeBlockView
                language={match ? match[1] : undefined}
                code={codeString}
              />
            )
          },

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neura-cyan hover:underline inline-flex items-center gap-1 font-medium"
            >
              {children}
              <ExternalLink className="w-3 h-3 inline" />
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export function AIChatWidget({ userName = "Pembelajar ML" }: AIChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Halo **${userName}**! 👋 Saya **Neura AI Assistant**.\n\nAda materi Machine Learning atau kode Python yang ingin kamu tanyakan atau diskusikan hari ini? Silakan ajukan pertanyaan atau pilih salah satu topik di bawah.`,
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
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: `❌ **Error:** Terjadi kendala jaringan saat menghubungi server.` },
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
    <div className="glass rounded-panel border border-neura-line shadow-2xl flex flex-col h-[650px] overflow-hidden bg-neura-deep/80">
      {/* Header Chat */}
      <div className="p-4 px-6 border-b border-neura-line flex items-center justify-between bg-neura-deep/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-panel bg-neura-cyan flex items-center justify-center text-neura-deep font-bold">
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
              className={`relative group max-w-[90%] sm:max-w-[85%] p-4 sm:p-5 rounded-panel text-xs sm:text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-neura-cyan text-neura-deep font-medium rounded-tr-none"
                  : "glass border border-neura-line text-white rounded-tl-none bg-neura-panel/50 shadow-sm"
              }`}
            >
              {m.role === "assistant" && (
                <button
                  onClick={() => handleCopy(m.content, idx)}
                  className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 glass rounded-lg text-neura-muted hover:text-white transition-all bg-neura-deep/80"
                  title="Salin Seluruh Respon"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}

              {/* Formatted Markdown & Code Blocks */}
              {m.role === "assistant" ? (
                <MarkdownMessage content={m.content} />
              ) : (
                <div className="whitespace-pre-wrap font-medium">{m.content}</div>
              )}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-neura-amber/20 border border-neura-amber/30 text-neura-amber flex items-center justify-center shrink-0 mt-1">
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
            <div className="glass p-4 rounded-panel rounded-tl-none border border-neura-line bg-neura-deep/60 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neura-cyan animate-ping" />
              <span className="text-xs text-neura-muted">Neura AI sedang berpikir & menyusun jawaban...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length < 3 && (
        <div className="px-4 sm:px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-neura-line/50">
          {suggestedPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 glass rounded-xl text-xs text-neura-muted hover:text-neura-cyan hover:border-neura-cyan/40 transition-all shrink-0 border border-neura-line"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-4 px-6 border-t border-neura-line bg-neura-deep/60">
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
            className="flex-1 px-4 py-3 bg-neura-deep/80 border border-neura-line rounded-panel text-xs sm:text-sm text-white placeholder-neura-muted focus:outline-none focus:border-neura-cyan/50 transition-all"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Kirim pesan"
            className="p-3 bg-neura-cyan text-neura-deep rounded-panel font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4 fill-current" />
          </button>
        </form>
      </div>
    </div>
  )
}
