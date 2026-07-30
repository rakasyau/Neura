"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, BookOpen, CheckCircle2, Sparkles, HelpCircle, ArrowRight } from "lucide-react"
import { chapterLessons, LessonContent } from "@/lib/chapterData"
import { useUserStats } from "@/lib/store"
import { notify } from "@/components/ui/Toast"

interface ChapterReaderModalProps {
  chapterId: string | null
  onClose: () => void
}

export function ChapterReaderModal({ chapterId, onClose }: ChapterReaderModalProps) {
  const { stats, markChapterComplete } = useUserStats()
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [prevChapterId, setPrevChapterId] = useState<string | null>(null)

  // Reset quiz state when chapter changes
  if (chapterId !== prevChapterId) {
    setPrevChapterId(chapterId)
    setQuizAnswers({})
  }

  if (!chapterId) return null

  const lesson: LessonContent = chapterLessons[chapterId] || {
    id: chapterId,
    title: "Materi Pembelajaran ML",
    moduleTitle: "Modul Pembelajaran",
    summary: "Pelajari konsep mendalam beserta rumus dan latihan praktis.",
    contentBlocks: [
      {
        type: "paragraph",
        text: "Machine Learning memungkinkan sistem untuk mempelajari pola kompleks dari dataset berukuran besar tanpa intervensi instruksi manual baris demi baris.",
      },
      {
        type: "highlight",
        text: "💡 Catatan Penting: Evaluasi model secara berkala menggunakan data uji (testing set) agar terhindar dari overfitting.",
      },
      {
        type: "quick_quiz",
        question: {
          q: "Apa fungsi utama membagi data menjadi Train & Test split?",
          opts: [
            "Agar proses komputasi lebih lambat",
            "Untuk mengevaluasi kemampuan generalisasi model pada data baru",
            "Menghapus missing values secara otomatis",
            "Mengubah data kategorikal menjadi angka",
          ],
          correct: 1,
          exp: "Benar! Test split digunakan untuk menguji performa riil model terhadap data yang belum pernah dilihat.",
        },
      },
    ],
  }

  const isCompleted = stats.completedChapters.includes(chapterId)

  const handleComplete = async () => {
    const isNew = await markChapterComplete(chapterId, 50)
    if (isNew) {
      notify("Bab Selesai! 🎉", "Selamat! Anda mendapatkan +50 XP", "achievement")
    } else {
      notify("Info Progress", "Bab ini sudah pernah Anda selesaikan.", "info")
    }
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl max-h-[92vh] sm:max-h-[85vh] h-full glass-strong rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden bg-neura-deep/95"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neura-cyan/20 text-neura-cyan flex items-center justify-center font-bold shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neura-cyan block">{lesson.moduleTitle}</span>
                <h3 className="text-base sm:text-lg font-bold font-display text-white truncate">{lesson.title}</h3>
              </div>
            </div>
            <button onClick={onClose} className="p-2 glass rounded-xl text-neura-muted hover:text-white transition-all shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            <p className="text-sm text-neura-muted italic leading-relaxed border-l-2 border-neura-cyan pl-4 bg-white/5 py-2 rounded-r-xl">
              {lesson.summary}
            </p>

            {lesson.contentBlocks.map((block, idx) => {
              if (block.type === "paragraph") {
                return (
                  <p key={idx} className="text-sm text-neura-muted leading-relaxed">
                    {block.text}
                  </p>
                )
              }
              if (block.type === "highlight") {
                return (
                  <div key={idx} className="p-4 glass rounded-2xl border-l-4 border-neura-amber text-xs text-white leading-relaxed font-medium bg-neura-amber/10 whitespace-pre-wrap">
                    {block.text}
                  </div>
                )
              }
              if (block.type === "formula") {
                return (
                  <div key={idx} className="p-4 bg-black/40 rounded-2xl border border-white/10 text-center">
                    <code className="text-sm text-neura-amber font-mono">{block.text}</code>
                  </div>
                )
              }
              if (block.type === "code") {
                return (
                  <pre key={idx} className="p-4 bg-black/60 rounded-2xl font-mono text-xs text-neura-cyan overflow-x-auto border border-white/10">
                    <code>{block.code}</code>
                  </pre>
                )
              }
              if (block.type === "quick_quiz" && block.question) {
                const q = block.question
                const selectedOpt = quizAnswers[idx] ?? null
                const quizAnswered = selectedOpt !== null
                return (
                  <div key={idx} className="p-5 glass rounded-3xl border border-neura-cyan/30 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-neura-cyan">
                      <HelpCircle className="w-4 h-4" /> Uji Pemahaman Cepat
                    </div>
                    <h5 className="text-sm font-bold text-white">{q.q}</h5>

                    <div className="space-y-2">
                      {q.opts.map((opt, oIdx) => {
                        let btnStyle = "glass hover:border-neura-cyan/50 text-neura-muted"
                        if (quizAnswered && selectedOpt === oIdx) {
                          btnStyle = oIdx === q.correct ? "bg-green-500/20 border-green-500 text-green-300" : "bg-red-500/20 border-red-500 text-red-300"
                        } else if (quizAnswered && oIdx === q.correct) {
                          btnStyle = "bg-green-500/10 border-green-500/40 text-green-300/80"
                        }
                        return (
                          <button
                            key={oIdx}
                            disabled={quizAnswered}
                            onClick={() => {
                              setQuizAnswers((prev) => ({ ...prev, [idx]: oIdx }))
                            }}
                            className={`w-full p-3 rounded-2xl border text-xs text-left transition-all flex items-center justify-between disabled:cursor-default ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizAnswered && selectedOpt === oIdx && (
                              <span className="font-bold">{oIdx === q.correct ? "✓ Benar" : "✗ Salah"}</span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {quizAnswered && (
                      <div className="p-3 bg-white/5 rounded-xl text-xs text-neura-cyan italic">
                        {q.exp}
                      </div>
                    )}
                  </div>
                )
              }
              return null
            })}
          </div>

          {/* Footer Action */}
          <div className="p-4 px-6 border-t border-white/10 flex items-center justify-between bg-black/30">
            <span className="text-xs text-neura-muted">
              {isCompleted ? "✓ Bab ini sudah selesai (+50 XP)" : "Selesaikan materi untuk klaim +50 XP"}
            </span>
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2.5 bg-neura-cyan text-neura-deep rounded-2xl text-xs font-bold hover:bg-neura-cyan/90 transition-all shadow-lg shadow-neura-cyan/20"
            >
              <CheckCircle2 className="w-4 h-4" /> {isCompleted ? "Tutup Materi" : "Tandai Selesai & Klaim XP"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
