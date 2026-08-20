"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Play, RotateCcw, Plus, Sparkles, Sliders, Activity } from "lucide-react"
import { ResponsiveContainer, ComposedChart, Scatter, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { notify } from "@/components/ui/Toast"

interface DataPoint {
  x: number
  y: number
}

const initialPoints: DataPoint[] = [
  { x: 1, y: 2.1 },
  { x: 2, y: 3.8 },
  { x: 3, y: 5.2 },
  { x: 4, y: 7.1 },
  { x: 5, y: 9.3 },
  { x: 6, y: 11.0 },
  { x: 7, y: 12.8 },
]

export function LinearRegressionSimulator() {
  const [points, setPoints] = useState<DataPoint[]>(initialPoints)
  const [slope, setSlope] = useState<number>(1.2)
  const [bias, setBias] = useState<number>(0.5)
  const [isTraining, setIsTraining] = useState(false)
  const [history, setHistory] = useState<{ step: number; mse: number }[]>([])

  // Compute Mean Squared Error (MSE) & R2 score
  const { mse, r2Score, chartData } = useMemo(() => {
    let totalSqError = 0
    let sumY = 0
    points.forEach((p) => (sumY += p.y))
    const meanY = sumY / points.length

    let totalVar = 0
    points.forEach((p) => {
      totalVar += Math.pow(p.y - meanY, 2)
    })

    const chartData = points.map((p) => {
      const pred = slope * p.x + bias
      const sqErr = Math.pow(p.y - pred, 2)
      totalSqError += sqErr
      return {
        x: p.x,
        y: p.y,
        predY: parseFloat(pred.toFixed(2)),
      }
    })

    const computedMse = totalSqError / points.length
    const r2 = Math.max(0, 1 - totalSqError / (totalVar || 1))

    return {
      mse: parseFloat(computedMse.toFixed(3)),
      r2Score: parseFloat((r2 * 100).toFixed(1)),
      chartData,
    }
  }, [points, slope, bias])

  // Gradient Descent Step-by-Step Training Simulation
  const runGradientDescent = () => {
    if (isTraining) return
    setIsTraining(true)
    notify("Pelatihan Ditingkatkan!", "Menjalankan Gradient Descent untuk mencari garis terbaik...", "info")

    let currentSlope = slope
    let currentBias = bias
    const lr = 0.03
    const steps = 25
    let stepCount = 0
    const newHistory: { step: number; mse: number }[] = []

    const interval = setInterval(() => {
      stepCount++
      let slopeGrad = 0
      let biasGrad = 0
      const N = points.length

      points.forEach((p) => {
        const pred = currentSlope * p.x + currentBias
        const err = pred - p.y
        slopeGrad += (2 / N) * err * p.x
        biasGrad += (2 / N) * err
      })

      currentSlope = currentSlope - lr * slopeGrad
      currentBias = currentBias - lr * biasGrad

      setSlope(parseFloat(currentSlope.toFixed(2)))
      setBias(parseFloat(currentBias.toFixed(2)))

      const stepMse = points.reduce((acc, p) => acc + Math.pow(currentSlope * p.x + currentBias - p.y, 2), 0) / N
      newHistory.push({ step: stepCount, mse: parseFloat(stepMse.toFixed(2)) })
      setHistory([...newHistory])

      if (stepCount >= steps) {
        clearInterval(interval)
        setIsTraining(false)
        notify("Model Terlatih!", `Garis Garis Regresi Ditemukan! MSE: ${stepMse.toFixed(2)}`, "achievement")
      }
    }, 100)
  }

  const addNoise = () => {
    const noisy = points.map((p) => ({
      x: p.x,
      y: parseFloat((p.y + (Math.random() * 3 - 1.5)).toFixed(1)),
    }))
    setPoints(noisy)
    notify("Noise Ditambahkan", "Data acak dimasukkan ke dataset", "info")
  }

  const resetAll = () => {
    setPoints(initialPoints)
    setSlope(1.2)
    setBias(0.5)
    setHistory([])
    notify("Reset Simulasi", "Kembali ke dataset awal", "info")
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart View */}
        <div className="lg:col-span-2 glass p-5 rounded-panel border border-neura-line flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-display text-lg text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-neura-cyan" /> Visualisasi Garis Regresi
              </h3>
              <p className="text-xs text-neura-muted">
                Formula: <span className="text-neura-cyan font-mono font-semibold">y = {slope}x + {bias}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 glass rounded-xl text-xs font-semibold text-neura-cyan border border-neura-cyan/30">
                MSE: {mse}
              </span>
              <span className="px-3 py-1 glass rounded-xl text-xs font-semibold text-neura-amber border border-neura-amber/30">
                R² Score: {(r2Score / 100).toFixed(3)}
              </span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="x" type="number" domain={[0, 8]} stroke="#9CA3C4" fontSize={12} />
                <YAxis dataKey="y" type="number" domain={[0, 16]} stroke="#9CA3C4" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(11, 15, 31, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />
                <Scatter name="Data Sampel" dataKey="y" fill="#F5A265" />
                <Line name="Garis Prediksi" dataKey="predY" stroke="#5EEAD4" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neura-line">
            <button
              onClick={runGradientDescent}
              disabled={isTraining}
              className="flex items-center gap-2 px-4 py-2 bg-neura-cyan text-neura-deep rounded-panel text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isTraining ? "Melatih Model..." : "Latih Otomatis (Gradient Descent)"}
            </button>
            <button
              onClick={addNoise}
              className="flex items-center gap-1.5 px-3 py-2 glass rounded-panel text-xs text-neura-muted hover:text-white transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Noise
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 px-3 py-2 glass rounded-panel text-xs text-neura-muted hover:text-white transition-all ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="glass p-5 rounded-panel border border-neura-line flex flex-col justify-between">
          <div>
            <h4 className="font-bold font-display text-base text-white mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neura-amber" /> Ubah Parameter
            </h4>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neura-muted">Kemiringan (Slope / m):</span>
                  <span className="font-mono text-neura-cyan font-bold">{slope}</span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="3"
                  step="0.05"
                  value={slope}
                  onChange={(e) => setSlope(parseFloat(e.target.value))}
                  className="w-full accent-neura-cyan cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neura-muted">Intersep Bias (c):</span>
                  <span className="font-mono text-neura-amber font-bold">{bias}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="6"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(parseFloat(e.target.value))}
                  className="w-full accent-neura-amber cursor-pointer"
                />
              </div>
            </div>

            {/* Explanation box */}
            <div className="mt-6 p-4 glass rounded-panel border-l border-neura-cyan text-xs text-neura-muted leading-relaxed">
              <p className="font-medium text-white mb-1">💡 Tips Interaktif:</p>
              Geser slider slope & bias secara manual atau tekan tombol <strong>Latih Otomatis</strong> untuk melihat bagaimana algoritma meminimalkan error garis ke semua titik!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
