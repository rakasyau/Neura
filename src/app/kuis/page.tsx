"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Brain, Layers, Target, BarChart, Leaf } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { chapterLessons } from "@/lib/chapterData"
import { useUserStats } from "@/lib/store"

const quizModules = [
  { id: "m1-kuis", label: "Fundamental ML", icon: Brain },
  { id: "m2-kuis", label: "Tiga Jenis ML", icon: Layers },
  { id: "m3-kuis", label: "Supervised Learning", icon: Target },
  { id: "m5-kuis", label: "Evaluasi Model", icon: BarChart },
  { id: "m6-kuis", label: "Studi Kasus", icon: Leaf },
]

function extractQuestions(moduleId: string) {
  const lesson = chapterLessons[moduleId]
  if (!lesson) return []
  return lesson.contentBlocks
    .filter((b) => b.type === "quick_quiz" && b.question)
    .map((b, i) => ({
      id: `${moduleId}-q${i}`,
      question: b.question!.q,
      options: b.question!.opts,
      correctIndex: b.question!.correct,
      explanation: b.question!.exp,
    }))
}

export default function KuisPage() {
  const [activeModule, setActiveModule] = useState("m1-kuis")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const { recordQuizScore } = useUserStats()

  const questions = extractQuestions(activeModule)
  const question = questions[current]
  const selected = question ? answers[question.id] : undefined
  const isCorrect = selected === question?.correctIndex
  const progress = questions.length ? ((current + 1) / questions.length) * 100 : 0

  const handleAnswer = (index: number) => {
    if (selected !== undefined || !question) return
    setAnswers({ ...answers, [question.id]: index })
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    } else {
      setShowResults(true)
    }
  }

  // Save quiz score when results are shown
  useEffect(() => {
    if (showResults && questions.length > 0) {
      const finalScore = questions.filter((q) => answers[q.id] === q.correctIndex).length
      recordQuizScore(activeModule, finalScore, questions.length)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResults, activeModule])

  const switchModule = (id: string) => {
    setActiveModule(id)
    setCurrent(0)
    setAnswers({})
    setShowResults(false)
  }

  const reset = () => {
    setCurrent(0)
    setAnswers({})
    setShowResults(false)
  }

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length

  const menuIcon = (id: string) => {
    const m = quizModules.find((x) => x.id === id)
    if (!m) return <Brain className="w-4 h-4" />
    const Icon = m.icon
    return <Icon className="w-4 h-4" />
  }

  return (
    <AuthGuard>
      <div className="min-h-screen pt-28 pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Module Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {quizModules.map((m) => {
              const Icon = m.icon
              const isActive = activeModule === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => switchModule(m.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-panel text-xs font-bold transition-all ${
                    isActive
                      ? "bg-neura-cyan text-neura-deep"
                      : "glass text-neura-muted hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </button>
              )
            })}
          </div>

          {questions.length === 0 ? (
            <GlassCard className="text-center py-12">
              <p className="text-neura-muted">Belum ada soal untuk modul ini.</p>
            </GlassCard>
          ) : showResults ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="text-center">
                <div className="text-6xl font-bold font-display gradient-text mb-4">
                  {score}/{questions.length}
                </div>
                <h2 className="text-2xl font-bold font-display mb-2">
                  {score === questions.length
                    ? "Sempurna! 🎉"
                    : score >= questions.length * 0.7
                    ? "Bagus! 👍"
                    : "Ayo Belajar Lagi! 📚"}
                </h2>
                <p className="text-neura-muted mb-2">
                  Kamu menjawab {score} dari {questions.length} pertanyaan dengan benar.
                </p>
                <p className="text-xs text-neura-muted mb-8">
                  {quizModules.find((m) => m.id === activeModule)?.label}
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="primary" onClick={reset}>
                    <RotateCcw className="w-4 h-4" /> Coba Lagi
                  </Button>
                  <a href="/belajar">
                    <Button variant="secondary">
                      Kembali ke Learning Hub
                    </Button>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-1 glass rounded-full overflow-hidden border border-neura-line">
                    <div className="h-full bg-neura-cyan rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-sm text-neura-muted shrink-0">
                    {current + 1}/{questions.length}
                  </span>
                </div>

                <GlassCard>
                  <h2 className="text-xl font-bold font-display mb-6">{question.question}</h2>
                  <div className="space-y-3">
                    {question.options.map((option: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={selected !== undefined}
                        className={`w-full text-left p-4 rounded-panel text-sm transition-all ${
                          selected === undefined
                            ? "glass glass-hover border border-transparent"
                            : selected === i && i === question.correctIndex
                            ? "bg-neura-cyan/20 border border-neura-cyan/50"
                            : selected === i && i !== question.correctIndex
                            ? "bg-red-500/20 border border-red-500/50"
                            : selected !== undefined && i === question.correctIndex && selected !== i
                            ? "bg-neura-cyan/10 border border-neura-cyan/30"
                            : "border border-transparent"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                              selected === i && i === question.correctIndex
                                ? "bg-neura-cyan text-neura-deep"
                                : selected === i
                                ? "bg-red-500 text-white"
                                : "bg-neura-raised text-neura-muted"
                            }`}
                          >
                            {selected === i && i === question.correctIndex ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : selected === i ? (
                              <XCircle className="w-3.5 h-3.5" />
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {selected !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 glass rounded-panel border-l border-neura-cyan"
                    >
                      <div className="flex items-center gap-2 text-sm text-neura-cyan font-medium mb-1">
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {isCorrect ? "Benar!" : "Kurang tepat"}
                      </div>
                      <p className="text-sm text-neura-muted">{question.explanation}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-end mt-6">
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      disabled={selected === undefined}
                    >
                      {current < questions.length - 1 ? (
                        <>
                          Lanjut <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        "Lihat Hasil"
                      )}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
