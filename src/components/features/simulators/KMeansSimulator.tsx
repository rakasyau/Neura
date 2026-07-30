"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Sparkles, CircleDot, RefreshCw } from "lucide-react"
import { notify } from "@/components/ui/Toast"

interface Point {
  id: number
  x: number
  y: number
  cluster: number
}

interface Centroid {
  id: number
  x: number
  y: number
  color: string
}

const CLUSTER_COLORS = ["#5EEAD4", "#F5A265", "#A855F7", "#EC4899", "#3B82F6"]

const generateSamplePoints = (): Point[] => {
  const points: Point[] = []
  let id = 1
  for (let i = 0; i < 10; i++) {
    points.push({ id: id++, x: 20 + Math.random() * 25, y: 20 + Math.random() * 25, cluster: -1 })
  }
  for (let i = 0; i < 10; i++) {
    points.push({ id: id++, x: 65 + Math.random() * 25, y: 70 + Math.random() * 20, cluster: -1 })
  }
  for (let i = 0; i < 10; i++) {
    points.push({ id: id++, x: 70 + Math.random() * 20, y: 25 + Math.random() * 25, cluster: -1 })
  }
  return points
}

export function KMeansSimulator() {
  const [kCount, setKCount] = useState<number>(3)
  const [points, setPoints] = useState<Point[]>(generateSamplePoints)
  const [step, setStep] = useState<number>(0)
  const [iteration, setIteration] = useState<number>(0)
  const [centroids, setCentroids] = useState<Centroid[]>(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: 15 + i * 30,
      y: 40 + (i % 2) * 20,
      color: CLUSTER_COLORS[i],
    }))
  })

  const initCentroids = (newK = kCount) => {
    const newC: Centroid[] = []
    for (let i = 0; i < newK; i++) {
      newC.push({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        color: CLUSTER_COLORS[i],
      })
    }
    setCentroids(newC)
    setPoints(points.map((p) => ({ ...p, cluster: -1 })))
    setStep(0)
    setIteration(0)
    notify("Centroid Diinisialisasi", `Dibuat ${newK} centroid acak`, "info")
  }

  const assignPoints = () => {
    const updatedPoints = points.map((p) => {
      let minDist = Infinity
      let closestCluster = -1

      centroids.forEach((c) => {
        const dist = Math.hypot(p.x - c.x, p.y - c.y)
        if (dist < minDist) {
          minDist = dist
          closestCluster = c.id
        }
      })
      return { ...p, cluster: closestCluster }
    })

    setPoints(updatedPoints)
    setStep(1)
    notify("Titik Dikelompokkan", `Iterasi ${iteration + 1}: Setiap titik dimasukkan ke centroid terdekat`, "info")
  }

  const updateCentroids = () => {
    const newCentroids = centroids.map((c) => {
      const clusterPoints = points.filter((p) => p.cluster === c.id)
      if (clusterPoints.length === 0) return c

      const meanX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length
      const meanY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length

      return { ...c, x: parseFloat(meanX.toFixed(1)), y: parseFloat(meanY.toFixed(1)) }
    })

    setCentroids(newCentroids)
    setStep(2)
    setIteration((prev) => prev + 1)
    notify("Centroid Dipindahkan", `Iterasi ${iteration + 1} selesai. Posisi centroid diperbarui.`, "achievement")
  }

  const handleKChange = (newK: number) => {
    setKCount(newK)
    initCentroids(newK)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-display text-lg text-white flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-neura-cyan" /> Visualisasi Clustering K-Means
              </h3>
              <p className="text-xs text-neura-muted">
                Status: {step === 0 ? "Belum Dikelompokkan" : step === 1 ? `Iterasi ${iteration + 1}: Assign Cluster` : `Iterasi ${iteration} selesai — Update Centroids`}
              {iteration > 0 && <span className="ml-2 px-2 py-0.5 glass rounded-lg text-neura-cyan font-bold">{iteration} iterasi</span>}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neura-muted">Jumlah K:</span>
              <div className="flex gap-1">
                {[2, 3, 4, 5].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKChange(k)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      kCount === k ? "bg-neura-cyan text-neura-deep" : "glass text-neura-muted hover:text-white"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full h-[320px] bg-black/40 rounded-2xl border border-white/10 overflow-hidden">
            {points.map((p) => {
              const color = p.cluster >= 0 ? CLUSTER_COLORS[p.cluster] : "#9CA3C4"
              return (
                <motion.div
                  key={p.id}
                  layout
                  transition={{ duration: 0.4 }}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: color }}
                  className="absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full border border-black/40 shadow-sm"
                />
              )
            })}

            {centroids.map((c) => (
              <motion.div
                key={c.id}
                animate={{ left: `${c.x}%`, top: `${c.y}%` }}
                transition={{ type: "spring", damping: 15 }}
                style={{ left: `${c.x}%`, top: `${c.y}%`, backgroundColor: c.color }}
                className="absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full flex items-center justify-center font-bold text-xs text-neura-deep shadow-xl border-2 border-white cursor-pointer z-10"
              >
                C{c.id + 1}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
            <button
              onClick={assignPoints}
              className="flex items-center gap-2 px-4 py-2 bg-neura-cyan text-neura-deep rounded-2xl text-xs font-bold hover:bg-neura-cyan/90 transition-all"
            >
              <Sparkles className="w-4 h-4" /> 1. Kelompokkan Titik
            </button>
            <button
              onClick={updateCentroids}
              className="flex items-center gap-2 px-4 py-2 bg-neura-amber text-neura-deep rounded-2xl text-xs font-bold hover:bg-neura-amber/90 transition-all"
            >
              <Play className="w-4 h-4" /> 2. Pindahkan Centroid
            </button>
            <button
              onClick={() => initCentroids()}
              className="flex items-center gap-1.5 px-3 py-2 glass rounded-2xl text-xs text-neura-muted hover:text-white transition-all ml-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Acak Ulang
            </button>
          </div>
        </div>

        <div className="glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="font-bold font-display text-base text-white mb-4">Daftar Cluster (K = {kCount})</h4>
            <div className="space-y-3">
              {centroids.map((c) => {
                const count = points.filter((p) => p.cluster === c.id).length
                return (
                  <div key={c.id} className="p-3 glass rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-xs font-semibold text-white">Cluster {c.id + 1}</span>
                    </div>
                    <span className="text-xs text-neura-muted font-mono">{count} titik</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 glass rounded-2xl border-l-2 border-neura-amber text-xs text-neura-muted leading-relaxed">
              <p className="font-medium text-white mb-1">🎯 Cara Kerja K-Means:</p>
              Klik <strong>1. Kelompokkan Titik</strong> lalu <strong>2. Pindahkan Centroid</strong> berulang kali sampai posisi centroid tidak lagi berpindah!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
