"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, BookOpen, Grid3X3, FileText, FlaskConical, X, ChevronRight, Sparkles } from "lucide-react"
import { modules, algorithms, glossaryTerms } from "@/lib/data"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        else {
          // Open handled externally or trigger custom event
          window.dispatchEvent(new CustomEvent("open_command_palette"))
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Filter items
  const filteredModules = modules.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()) || m.description.toLowerCase().includes(query.toLowerCase())
  )
  const filteredAlgos = algorithms.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()) || a.summary.toLowerCase().includes(query.toLowerCase())
  )
  const filteredGlossary = glossaryTerms
    .filter((g) => g.term.toLowerCase().includes(query.toLowerCase()) || g.definition.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 4)

  const handleSelect = (href: string) => {
    onClose()
    setQuery("")
    router.push(href)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="w-full max-w-2xl glass-strong rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-neura-deep/95"
        >
          {/* Input Box */}
          <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-neura-cyan shrink-0" />
            <input
              type="text"
              placeholder="Cari modul, algoritma, istilah kuis... (Tekan Esc untuk tutup)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-sm text-white placeholder-neura-muted focus:outline-none"
            />
            <button onClick={onClose} className="p-1 glass rounded-lg text-neura-muted hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Container */}
          <div className="max-h-[380px] overflow-y-auto p-4 space-y-5">
            {/* Modules */}
            {filteredModules.length > 0 && (
              <div>
                <span className="text-[10px] font-bold tracking-wider text-neura-cyan uppercase mb-2 block px-2">
                  Modul Pembelajaran ({filteredModules.length})
                </span>
                <div className="space-y-1">
                  {filteredModules.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(`/belajar/${m.id}`)}
                      className="w-full p-3 rounded-2xl glass glass-hover flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-neura-cyan/20 text-neura-cyan flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white group-hover:text-neura-cyan transition-colors">{m.title}</h5>
                          <p className="text-[11px] text-neura-muted line-clamp-1">{m.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neura-muted group-hover:text-neura-cyan transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Algorithms */}
            {filteredAlgos.length > 0 && (
              <div>
                <span className="text-[10px] font-bold tracking-wider text-neura-amber uppercase mb-2 block px-2">
                  Ensiklopedia Algoritma ({filteredAlgos.length})
                </span>
                <div className="space-y-1">
                  {filteredAlgos.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleSelect(`/algoritma/${a.id}`)}
                      className="w-full p-3 rounded-2xl glass glass-hover flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-neura-amber/20 text-neura-amber flex items-center justify-center shrink-0">
                          <Grid3X3 className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white group-hover:text-neura-amber transition-colors">{a.name}</h5>
                          <p className="text-[11px] text-neura-muted line-clamp-1">{a.summary}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neura-muted group-hover:text-neura-amber transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Glossary */}
            {filteredGlossary.length > 0 && (
              <div>
                <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase mb-2 block px-2">
                  Istilah Glosarium
                </span>
                <div className="space-y-1">
                  {filteredGlossary.map((g) => (
                    <button
                      key={g.term}
                      onClick={() => handleSelect("/glossary")}
                      className="w-full p-3 rounded-2xl glass glass-hover flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">{g.term}</h5>
                          <p className="text-[11px] text-neura-muted line-clamp-1">{g.definition}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neura-muted group-hover:text-purple-300 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredModules.length === 0 && filteredAlgos.length === 0 && filteredGlossary.length === 0 && (
              <div className="text-center py-8 text-xs text-neura-muted">
                Tidak ada hasil untuk &quot;{query}&quot;
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
