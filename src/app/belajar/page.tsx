"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Brain, Layers, Target, BarChart, Leaf, Grid3X3 } from "lucide-react"
import { modules } from "@/lib/data"
import { AuthGuard } from "@/components/auth/AuthGuard"

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  grid: <Grid3X3 className="w-5 h-5" />,
  "bar-chart": <BarChart className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />,
}

export default function BelajarPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
            <p className="mono-label mb-3">KURIKULUM — {modules.length} MODUL</p>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Learning Hub</h1>
            <p className="text-neura-muted text-lg max-w-2xl">
              Pilih modul sesuai kebutuhanmu. Setiap modul berisi beberapa bab dengan estimasi waktu belajar yang
              jelas.
            </p>
          </motion.div>

          {/* Indeks editorial bernomor — hairlines, bukan card bertumpuk */}
          <div className="divide-y divide-neura-line">
            {modules.map((mod, i) => (
              <Link key={mod.id} href={`/belajar/${mod.id}`} className="group block -mx-4 px-4 rounded-panel transition-colors hover:bg-neura-panel">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-5 py-6"
                >
                  <span className="font-mono text-sm text-neura-muted pt-1 tabular-nums">
                    {String(mod.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="text-lg font-bold font-display text-white group-hover:text-neura-cyan transition-colors">
                        {mod.title}
                      </h2>
                      <span className="font-mono text-[11px] px-2 py-0.5 border border-neura-line rounded-full text-neura-cyan">
                        {mod.totalDuration} mnt
                      </span>
                    </div>
                    <p className="text-sm text-neura-muted mt-1">{mod.description}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neura-muted mt-2">
                      {mod.chapters.length} bab
                    </p>
                  </div>
                  <div className="text-neura-muted group-hover:text-neura-cyan group-hover:translate-x-1 transition-all pt-1">
                    {iconMap[mod.icon]}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
