"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Play, Clock, CheckCircle2, ChevronRight } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { ChapterReaderModal } from "@/components/features/ChapterReaderModal"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { modules } from "@/lib/data"
import { useUserStats } from "@/lib/store"

export default function ModuleDetailPage() {
  const { modulId } = useParams<{ modulId: string }>()
  const { stats } = useUserStats()
  const [activeChapter, setActiveChapter] = useState<string | null>(null)

  const mod = modules.find((m) => m.id === modulId)

  if (!mod) {
    return (
      <AuthGuard>
        <div className="min-h-screen pt-32 pb-24 px-4 flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">404</div>
          <h1 className="text-2xl font-bold font-display">Modul tidak ditemukan</h1>
          <p className="text-neura-muted text-sm">Modul dengan ID &quot;{modulId}&quot; tidak tersedia.</p>
          <Link href="/belajar">
            <Button variant="primary">Kembali ke Learning Hub</Button>
          </Link>
        </div>
      </AuthGuard>
    )
  }

  const completedChapters = stats.completedChapters
  const chapterProgress = mod.chapters.filter((c) => completedChapters.includes(c.id)).length
  const progressPercent = Math.round((chapterProgress / mod.chapters.length) * 100)

  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link href="/belajar" className="inline-flex items-center gap-2 text-sm text-neura-muted hover:text-neura-cyan transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Learning Hub
            </Link>

            <GlassCard className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-xs text-neura-muted font-medium">Modul {String(mod.number).padStart(2, "0")}</div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">{mod.title}</h1>
              <p className="text-neura-muted mb-6 max-w-2xl">{mod.description}</p>

              <div className="flex items-center gap-4 text-sm text-neura-muted mb-4">
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {mod.chapters.length} bab</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {mod.totalDuration} menit</span>
              </div>

              {chapterProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neura-muted">Progress</span>
                    <span className="text-neura-cyan font-mono">{chapterProgress}/{mod.chapters.length} bab</span>
                  </div>
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-gradient-to-r from-neura-cyan to-indigo-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>

          <div className="space-y-2">
            {mod.chapters.map((ch, i) => {
              const isCompleted = completedChapters.includes(ch.id)
              return (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setActiveChapter(ch.id)}
                    className="w-full text-left glass rounded-[20px] p-5 glass-hover cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isCompleted
                          ? "bg-neura-cyan/20 text-neura-cyan"
                          : "bg-white/5 text-neura-muted group-hover:bg-neura-cyan/10 group-hover:text-neura-cyan"
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-mono font-bold">{String(i + 1).padStart(2, "0")}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white group-hover:text-neura-cyan transition-colors">{ch.title}</h3>
                        <span className="text-xs text-neura-muted flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {ch.duration} menit</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neura-muted group-hover:text-neura-cyan transition-colors shrink-0" />
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {activeChapter && (
          <ChapterReaderModal
            chapterId={activeChapter}
            onClose={() => setActiveChapter(null)}
          />
        )}
      </div>
    </AuthGuard>
  )
}
