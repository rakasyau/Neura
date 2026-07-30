"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, GitBranch, Trees, SeparatorHorizontal, Circle, Network, CircleDot } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
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

const colors = [
  { bg: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400", border: "border-cyan-500/20" },
  { bg: "from-amber-500/20 to-amber-500/5", text: "text-amber-400", border: "border-amber-500/20" },
  { bg: "from-green-500/20 to-green-500/5", text: "text-green-400", border: "border-green-500/20" },
  { bg: "from-purple-500/20 to-purple-500/5", text: "text-purple-400", border: "border-purple-500/20" },
  { bg: "from-pink-500/20 to-pink-500/5", text: "text-pink-400", border: "border-pink-500/20" },
  { bg: "from-orange-500/20 to-orange-500/5", text: "text-orange-400", border: "border-orange-500/20" },
  { bg: "from-blue-500/20 to-blue-500/5", text: "text-blue-400", border: "border-blue-500/20" },
  { bg: "from-teal-500/20 to-teal-500/5", text: "text-teal-400", border: "border-teal-500/20" },
]

export default function AlgoritmaPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Ensiklopedia Algoritma</h1>
            <p className="text-neura-muted text-lg max-w-2xl">
              Jelajahi 8 algoritma Machine Learning utama. Pelajari cara kerja, analogi kehidupan
              nyata, kelebihan, kekurangan, hingga contoh kodenya.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algo, i) => (
              <Link key={algo.id} href={`/algoritma/${algo.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-[24px] p-6 glass-hover cursor-pointer h-full flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-neura-cyan/10 flex items-center justify-center text-neura-cyan group-hover:scale-110 transition-transform">
                        {algoIcons[algo.id] || <TrendingUp className="w-5 h-5" />}
                      </div>
                      <span className="text-xs font-mono text-neura-muted">#{String(algo.number).padStart(2, "0")}</span>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 glass rounded-full text-neura-cyan font-medium border border-neura-cyan/20 inline-block mb-2">
                      {algo.category}
                    </span>
                    <h2 className="text-lg font-bold font-display">{algo.name}</h2>
                  </div>
                  <p className="text-sm text-neura-muted line-clamp-2 mb-3">{algo.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-neura-muted">
                    <span>{algo.taskType}</span>
                    <span>·</span>
                    <span>{algo.complexity}</span>
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
