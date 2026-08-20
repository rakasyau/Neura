"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Bookmark } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { glossaryTerms } from "@/lib/data"
import { cn } from "@/lib/utils"

const categories = Array.from(new Set(glossaryTerms.map((t) => t.category)))

export default function GlossaryPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")

  const filtered = glossaryTerms.filter((term) => {
    const matchSearch = term.term.toLowerCase().includes(search.toLowerCase()) ||
      term.definition.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === "Semua" || term.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen pt-28 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="mono-label mb-3">REFERENSI CEPAT</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Glossary</h1>
          <p className="text-neura-muted text-lg">Kamus istilah Machine Learning — dari A hingga Z.</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neura-muted" />
          <input
            type="text"
            placeholder="Cari istilah..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass-input"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveCategory("Semua")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all",
              activeCategory === "Semua" ? "bg-neura-cyan text-neura-deep font-medium" : "glass text-neura-muted hover:text-neura-text"
            )}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all",
                activeCategory === cat ? "bg-neura-cyan text-neura-deep font-medium" : "glass text-neura-muted hover:text-neura-text"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Terms */}
        <div className="space-y-3">
          {filtered.map((term, i) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <GlassCard hover className="py-4 px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold font-display text-base text-white">{term.term}</h3>
                      <span className="font-mono text-[11px] px-1.5 py-0.5 glass rounded text-neura-cyan">{term.category}</span>
                    </div>
                    <p className="text-sm text-neura-muted">{term.definition}</p>
                  </div>
                  <button className="shrink-0 p-1.5 glass rounded-lg text-neura-muted hover:text-neura-cyan transition-colors">
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-neura-muted">
              Istilah &quot;{search}&quot; tidak ditemukan
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
