"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, XCircle, Briefcase, Clock, BarChart } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { algorithms } from "@/lib/data"

export default function AlgorithmDetailPage() {
  const { algoritmaId } = useParams<{ algoritmaId: string }>()

  const algo = algorithms.find((a) => a.id === algoritmaId)

  if (!algo) {
    return (
      <AuthGuard>
        <div className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">404</div>
          <h1 className="text-2xl font-bold font-display">Algoritma tidak ditemukan</h1>
          <p className="text-neura-muted text-sm">Algoritma dengan ID &quot;{algoritmaId}&quot; tidak tersedia.</p>
          <Link href="/algoritma">
            <Button variant="primary">Kembali ke Ensiklopedia</Button>
          </Link>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/algoritma" className="inline-flex items-center gap-2 text-sm text-neura-muted hover:text-neura-cyan transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Ensiklopedia
            </Link>

            <GlassCard className="p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-neura-muted">#{String(algo.number).padStart(2, "0")}</span>
                <span className="text-[11px] px-2.5 py-0.5 glass rounded-full text-neura-cyan font-medium border border-neura-cyan/20">
                  {algo.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">{algo.name}</h1>
              <p className="text-neura-muted leading-relaxed mb-6">{algo.summary}</p>

              <div className="flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-neura-muted"><BarChart className="w-3.5 h-3.5 text-neura-cyan" /> {algo.taskType}</span>
                <span className="flex items-center gap-1.5 text-neura-muted"><Clock className="w-3.5 h-3.5 text-amber-400" /> {algo.complexity}</span>
                <span className="flex items-center gap-1.5 text-neura-muted"><Briefcase className="w-3.5 h-3.5 text-green-400" /> {algo.minData}</span>
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <GlassCard className="p-6">
                <h2 className="font-bold text-white mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> Kelebihan</h2>
                <ul className="space-y-2">
                  {algo.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neura-muted">
                      <span className="text-green-400 mt-0.5">+</span> {pro}
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="font-bold text-white mb-4 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-400" /> Kekurangan</h2>
                <ul className="space-y-2">
                  {algo.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neura-muted">
                      <span className="text-red-400 mt-0.5">-</span> {con}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>

            <GlassCard className="p-6">
              <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-neura-cyan" /> Contoh Penerapan</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {algo.applications.map((app, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-neura-muted p-3 glass rounded-2xl">
                    <span className="w-5 h-5 rounded-full bg-neura-cyan/10 text-neura-cyan flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</span>
                    {app}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard glow className="p-6 mt-6">
              <h2 className="font-bold text-white mb-2 font-display text-lg">💡 Analogi</h2>
              <p className="text-sm text-neura-muted leading-relaxed">{algo.analogy}</p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}
