"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, GitBranch, Trees, SeparatorHorizontal, Circle, Network, CircleDot } from "lucide-react"
import { algorithms } from "@/lib/data"
import { AuthGuard } from "@/components/auth/AuthGuard"

const algoIcons: Record<string, React.ReactNode> = {
  "linear-regression": <TrendingUp className="w-5 h-5" />,
  "decision-tree": <GitBranch className="w-5 h-5" />,
  "random-forest": <Trees className="w-5 h-5" />,
  "svm": <SeparatorHorizontal className="w-5 h-5" />,
  "knn": <Circle className="w-5 h-5" />,
  "gradient-boosting": <TrendingUp className="w-5 h-5" />,
  "neural-network": <Network className="w-5 h-5" />,
  "k-means": <CircleDot className="w-5 h-5" />,
}

export default function AlgoritmaPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
            <p className="mono-label mb-3">ENSIKLOPEDIA — {algorithms.length} ALGORITMA</p>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Ensiklopedia Algoritma</h1>
            <p className="text-neura-muted text-lg max-w-2xl">
              Jelajahi 8 algoritma Machine Learning utama. Pelajari cara kerja, analogi kehidupan nyata,
              kelebihan, kekurangan, hingga contoh kodenya.
            </p>
          </motion.div>

          {/* Indeks editorial bernomor — hairlines, konsisten dengan halaman Belajar */}
          <div className="divide-y divide-neura-line">
            {algorithms.map((algo, i) => (
              <Link key={algo.id} href={`/algoritma/${algo.id}`} className="group block -mx-4 px-4 rounded-panel transition-colors hover:bg-neura-panel">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-5 py-6"
                >
                  <span className="font-mono text-sm text-neura-muted pt-1 tabular-nums">
                    {String(algo.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h2 className="text-lg font-bold font-display text-white group-hover:text-neura-cyan transition-colors">
                        {algo.name}
                      </h2>
                      <span className="font-mono text-[11px] px-2 py-0.5 border border-neura-line rounded-full text-neura-cyan">
                        {algo.category}
                      </span>
                    </div>
                    <p className="text-sm text-neura-muted mt-1">{algo.summary}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neura-muted mt-2">
                      {algo.taskType} · {algo.complexity}
                    </p>
                  </div>
                  <div className="text-neura-muted group-hover:text-neura-cyan group-hover:translate-x-1 transition-all pt-1">
                    {algoIcons[algo.id] || <TrendingUp className="w-5 h-5" />}
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
