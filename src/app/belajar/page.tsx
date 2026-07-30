"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Play, Brain, Layers, Target, BarChart, Leaf, Grid3X3 } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { modules } from "@/lib/data"
import { AuthGuard } from "@/components/auth/AuthGuard"

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  grid: <Grid3X3 className="w-6 h-6" />,
  "bar-chart": <BarChart className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
}

export default function BelajarPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Learning Hub</h1>
          <p className="text-neura-muted text-lg max-w-2xl">
            Pilih modul pembelajaran sesuai kebutuhanmu. Setiap modul berisi beberapa bab dengan
            estimasi waktu belajar yang jelas.
          </p>
        </motion.div>

        <div className="space-y-4">
          {modules.map((mod, i) => (
            <Link key={mod.id} href={`/belajar/${mod.id}`}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-[24px] p-6 glass-hover cursor-pointer group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-neura-cyan/10 flex items-center justify-center text-neura-cyan shrink-0 group-hover:scale-110 transition-transform">
                    {iconMap[mod.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs text-neura-muted font-medium">
                        Modul {String(mod.number).padStart(2, "0")}
                      </span>
                      <span className="text-xs px-2 py-0.5 glass rounded-full text-neura-cyan">
                        {mod.totalDuration} menit
                      </span>
                    </div>
                    <h2 className="text-xl font-bold font-display group-hover:text-neura-cyan transition-colors">
                      {mod.title}
                    </h2>
                    <p className="text-sm text-neura-muted mt-1">{mod.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-neura-muted">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {mod.chapters.length} bab
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {mod.totalDuration} menit
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center text-neura-muted group-hover:text-neura-cyan transition-colors">
                    <Play className="w-5 h-5" />
                  </div>
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
