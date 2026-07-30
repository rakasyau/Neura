"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Copy, Check, Terminal, Download, Sparkles, RefreshCw, BarChart2 } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, ScatterChart, Scatter, Cell } from "recharts"
import { notify } from "@/components/ui/Toast"

interface Props {
  initialCode: string
  algoId?: string
}

// Algorithm-specific simulated outputs
function getSimulatedOutput(algoId: string): {
  logs: string[]
  chartData: { name: string; value: number; value2?: number }[]
  chartType: "line" | "bar" | "scatter"
  totalSteps: number
  stepDelay: number
} {
  switch (algoId) {
    case "linear-regression":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn, numpy...",
          "[Neura PyEngine] Membuat dataset: 100 sampel rumah...",
          "",
          "Melatih model Linear Regression...",
          "Model berhasil dilatih pada 80 sampel training.",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL",
          "═══════════════════════════════════════",
          "Koefisien (slope): 8.4723",
          "Intercept: 52.3841",
          "MSE: 847.32",
          "RMSE: 29.11",
          "R² Score: 0.9847",
          "",
          "Prediksi harga rumah 80m²: Rp 730 juta",
          "Prediksi harga rumah 120m²: Rp 1069 juta",
          "",
          "──────────────────────────────────────",
          "[Sukses] Model Linear Regression berhasil dilatih!",
          "R² = 0.9847 → Model menjelaskan 98.5% variasi harga"
        ],
        chartData: [
          { name: "20m²", value: 223, value2: 220 },
          { name: "40m²", value: 385, value2: 392 },
          { name: "60m²", value: 560, value2: 561 },
          { name: "80m²", value: 710, value2: 730 },
          { name: "100m²", value: 905, value2: 899 },
          { name: "120m²", value: 1080, value2: 1069 },
          { name: "140m²", value: 1230, value2: 1238 },
        ],
        chartType: "line",
        totalSteps: 8,
        stepDelay: 200,
      }

    case "decision-tree":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris (150 sampel, 4 fitur)...",
          "",
          "Dataset: 150 sampel, 4 fitur",
          "Kelas: ['setosa', 'versicolor', 'virginica']",
          "",
          "Melatih Decision Tree (max_depth=3)...",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL",
          "═══════════════════════════════════════",
          "Akurasi Training: 97.50%",
          "Akurasi Testing:  96.67%",
          "Kedalaman pohon:  3",
          "Jumlah daun:      5",
          "",
          "Feature Importance:",
          "  sepal length (cm)  0.000",
          "  sepal width (cm)   0.017",
          "  petal length (cm)  0.062 █",
          "  petal width (cm)   0.921 ██████████████████",
          "",
          "──────────────────────────────────────",
          "[Sukses] Decision Tree berhasil dilatih! Akurasi: 96.67%"
        ],
        chartData: [
          { name: "sepal length", value: 0.000 },
          { name: "sepal width", value: 0.017 },
          { name: "petal length", value: 0.062 },
          { name: "petal width", value: 0.921 },
        ],
        chartType: "bar",
        totalSteps: 6,
        stepDelay: 250,
      }

    case "random-forest":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris...",
          "",
          "Melatih Random Forest (100 pohon, max_depth=5)...",
          "  Pohon 1-25/100 dilatih...",
          "  Pohon 26-50/100 dilatih...",
          "  Pohon 51-75/100 dilatih...",
          "  Pohon 76-100/100 dilatih... ✓",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL",
          "═══════════════════════════════════════",
          "Akurasi Testing: 96.67%",
          "",
          "Cross-Validation 5-Fold:",
          "  Fold 1: 96.67%",
          "  Fold 2: 96.67%",
          "  Fold 3: 93.33%",
          "  Fold 4: 96.67%",
          "  Fold 5: 100.00%",
          "CV Score: 96.67% ± 2.11%",
          "",
          "Feature Importance:",
          "  sepal length (cm)  0.098 █",
          "  sepal width (cm)   0.024",
          "  petal length (cm)  0.424 ████████",
          "  petal width (cm)   0.454 █████████",
          "",
          "──────────────────────────────────────",
          "[Sukses] Random Forest berhasil dilatih! CV: 96.67% ± 2.11%"
        ],
        chartData: [
          { name: "sepal length", value: 0.098 },
          { name: "sepal width", value: 0.024 },
          { name: "petal length", value: 0.424 },
          { name: "petal width", value: 0.454 },
        ],
        chartType: "bar",
        totalSteps: 10,
        stepDelay: 200,
      }

    case "svm":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris...",
          "",
          "Normalisasi fitur dengan StandardScaler...",
          "  Mean fitur: [5.84, 3.06, 3.76, 1.20]",
          "  Std fitur:  [0.83, 0.44, 1.77, 0.76]",
          "",
          "Melatih SVM dengan kernel RBF...",
          "Optimasi quadratic programming selesai.",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL",
          "═══════════════════════════════════════",
          "Kernel: RBF",
          "Akurasi Testing: 96.67%",
          "Jumlah Support Vectors: 28",
          "Support Vectors per kelas: [8, 12, 8]",
          "",
          "──────────────────────────────────────",
          "[Sukses] SVM berhasil dilatih! 28 support vectors ditemukan."
        ],
        chartData: [
          { name: "Setosa", value: 8 },
          { name: "Versicolor", value: 12 },
          { name: "Virginica", value: 8 },
        ],
        chartType: "bar",
        totalSteps: 7,
        stepDelay: 250,
      }

    case "knn":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris...",
          "",
          "Perbandingan nilai K:",
          "  K   Akurasi",
          "--------------",
          "  1   93.33%",
          "  3   96.67% ← terbaik",
          "  5   96.67% ← terbaik",
          "  7   96.67% ← terbaik",
          "  9   96.67% ← terbaik",
          " 11   96.67% ← terbaik",
          "",
          "═══════════════════════════════════════",
          "K optimal: 3 (Akurasi: 96.67%)",
          "═══════════════════════════════════════",
          "",
          "──────────────────────────────────────",
          "[Sukses] KNN berhasil diuji! K optimal = 3"
        ],
        chartData: [
          { name: "K=1", value: 93.33 },
          { name: "K=3", value: 96.67 },
          { name: "K=5", value: 96.67 },
          { name: "K=7", value: 96.67 },
          { name: "K=9", value: 96.67 },
          { name: "K=11", value: 96.67 },
        ],
        chartType: "line",
        totalSteps: 7,
        stepDelay: 250,
      }

    case "gradient-boosting":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris...",
          "",
          "Melatih Gradient Boosting (100 estimators, lr=0.1)...",
          "  Iterasi 1-25/100 — loss: 0.8421",
          "  Iterasi 26-50/100 — loss: 0.3215",
          "  Iterasi 51-75/100 — loss: 0.1247",
          "  Iterasi 76-100/100 — loss: 0.0483 ✓",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL",
          "═══════════════════════════════════════",
          "Akurasi Testing: 96.67%",
          "Akurasi Training: 100.00%",
          "",
          "Cross-Validation 5-Fold:",
          "  Fold 1: 96.67%",
          "  Fold 2: 93.33%",
          "  Fold 3: 96.67%",
          "  Fold 4: 93.33%",
          "  Fold 5: 100.00%",
          "CV Score: 96.00% ± 2.49%",
          "",
          "Feature Importance:",
          "  sepal length (cm)  0.012",
          "  sepal width (cm)   0.008",
          "  petal length (cm)  0.322 ██████",
          "  petal width (cm)   0.658 █████████████",
          "",
          "──────────────────────────────────────",
          "[Sukses] Gradient Boosting selesai! CV: 96.00%"
        ],
        chartData: [
          { name: "Iter 10", value: 0.842 },
          { name: "Iter 25", value: 0.541 },
          { name: "Iter 50", value: 0.321 },
          { name: "Iter 75", value: 0.125 },
          { name: "Iter 100", value: 0.048 },
        ],
        chartType: "line",
        totalSteps: 10,
        stepDelay: 200,
      }

    case "k-means":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris (tanpa label)...",
          "",
          "Elbow Method:",
          "  K    Inertia   Silhouette",
          "------------------------------",
          "  2     152.35      0.6810",
          "  3      78.85      0.5528",
          "  4      57.23      0.4981",
          "  5      46.45      0.4886",
          "  6      39.04      0.3663",
          "",
          "═══════════════════════════════════════",
          "  HASIL CLUSTERING (K=3)",
          "═══════════════════════════════════════",
          "K Optimal: 3 (siku elbow)",
          "Inertia: 78.85",
          "Silhouette Score: 0.5528",
          "Distribusi cluster: [50, 62, 38]",
          "",
          "──────────────────────────────────────",
          "[Sukses] K-Means selesai! 3 cluster terbentuk."
        ],
        chartData: [
          { name: "K=2", value: 152.35, value2: 0.681 },
          { name: "K=3", value: 78.85, value2: 0.553 },
          { name: "K=4", value: 57.23, value2: 0.498 },
          { name: "K=5", value: 46.45, value2: 0.489 },
          { name: "K=6", value: 39.04, value2: 0.366 },
        ],
        chartType: "line",
        totalSteps: 8,
        stepDelay: 250,
      }

    case "neural-network":
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn...",
          "[Neura PyEngine] Memuat dataset Iris...",
          "",
          "Normalisasi fitur dengan StandardScaler...",
          "Arsitektur: 4 → [10] → [5] → 3",
          "",
          "Training Neural Network (Adam optimizer)...",
          "  Epoch 50/500  — loss: 0.847231 — acc: 72.50%",
          "  Epoch 100/500 — loss: 0.412854 — acc: 85.83%",
          "  Epoch 150/500 — loss: 0.198432 — acc: 93.33%",
          "  Epoch 200/500 — loss: 0.102315 — acc: 96.67%",
          "  Epoch 250/500 — loss: 0.071284 — acc: 97.50%",
          "  Konvergen pada epoch 278.",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL",
          "═══════════════════════════════════════",
          "Arsitektur: (10, 5)",
          "Jumlah iterasi: 278",
          "Loss akhir: 0.065841",
          "Akurasi Testing: 96.67%",
          "Jumlah layer: 4",
          "Jumlah parameter: 113",
          "",
          "──────────────────────────────────────",
          "[Sukses] Neural Network berhasil dilatih! 278 epochs."
        ],
        chartData: [
          { name: "Ep 50", value: 0.847, value2: 0.725 },
          { name: "Ep 100", value: 0.413, value2: 0.858 },
          { name: "Ep 150", value: 0.198, value2: 0.933 },
          { name: "Ep 200", value: 0.102, value2: 0.967 },
          { name: "Ep 250", value: 0.071, value2: 0.975 },
          { name: "Ep 278", value: 0.066, value2: 0.967 },
        ],
        chartType: "line",
        totalSteps: 10,
        stepDelay: 200,
      }

    default:
      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat dependencies...",
          "",
          "Menjalankan kode...",
          "",
          "[Sukses] Kode berhasil dieksekusi!"
        ],
        chartData: [],
        chartType: "line",
        totalSteps: 4,
        stepDelay: 300,
      }
  }
}

function getChartLabel(algoId: string): { title: string; yLabel: string; line1Name: string; line2Name?: string } {
  switch (algoId) {
    case "linear-regression":
      return { title: "Harga Aktual vs Prediksi", yLabel: "Harga (juta Rp)", line1Name: "Aktual", line2Name: "Prediksi" }
    case "decision-tree":
    case "random-forest":
    case "gradient-boosting":
      return { title: "Feature Importance", yLabel: "Importance", line1Name: "Importance" }
    case "svm":
      return { title: "Support Vectors per Kelas", yLabel: "Jumlah SV", line1Name: "Support Vectors" }
    case "knn":
      return { title: "Akurasi vs Nilai K", yLabel: "Akurasi (%)", line1Name: "Akurasi" }
    case "k-means":
      return { title: "Elbow Method (Inertia)", yLabel: "Inertia", line1Name: "Inertia", line2Name: "Silhouette" }
    case "neural-network":
      return { title: "Training Loss & Accuracy", yLabel: "Nilai", line1Name: "Loss", line2Name: "Accuracy" }
    default:
      return { title: "Grafik Performa", yLabel: "Nilai", line1Name: "Value" }
  }
}

export function InteractiveCodeRunner({ initialCode, algoId = "general" }: Props) {
  const [code, setCode] = useState<string>(initialCode)
  const [copied, setCopied] = useState<boolean>(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [logs, setLogs] = useState<string[]>([])
  const [chartData, setChartData] = useState<{ name: string; value: number; value2?: number }[]>([])
  const [chartType, setChartType] = useState<"line" | "bar" | "scatter">("line")

  // Sync code when algorithm/initialCode changes
  useEffect(() => {
    setCode(initialCode)
    setLogs([])
    setChartData([])
    setIsRunning(false)
  }, [initialCode])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    notify("Kode Tersalin", "Kode Python berhasil disalin ke clipboard", "info")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRunCode = () => {
    if (isRunning) return
    setIsRunning(true)
    setLogs(["[Neura PyEngine] Inisialisasi..."])
    setChartData([])

    const simulated = getSimulatedOutput(algoId)
    setChartType(simulated.chartType)

    notify("Menjalankan Kode Python", "Proses eksekusi sedang berlangsung...", "info")

    let currentStep = 0
    const logsPerStep = Math.ceil(simulated.logs.length / simulated.totalSteps)
    const chartPerStep = Math.ceil(simulated.chartData.length / simulated.totalSteps)
    const displayedLogs: string[] = []
    const displayedChart: typeof simulated.chartData = []

    const interval = setInterval(() => {
      currentStep++

      // Add logs for this step
      const logEnd = Math.min(currentStep * logsPerStep, simulated.logs.length)
      for (let i = displayedLogs.length; i < logEnd; i++) {
        displayedLogs.push(simulated.logs[i])
      }
      setLogs([...displayedLogs])

      // Add chart data for this step
      const chartEnd = Math.min(currentStep * chartPerStep, simulated.chartData.length)
      for (let i = displayedChart.length; i < chartEnd; i++) {
        displayedChart.push(simulated.chartData[i])
      }
      setChartData([...displayedChart])

      if (currentStep >= simulated.totalSteps) {
        clearInterval(interval)
        // Ensure all logs and chart data are shown
        setLogs([...simulated.logs])
        setChartData([...simulated.chartData])
        setIsRunning(false)

        const algoName = algoId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        notify("Eksekusi Selesai! 🎉", `${algoName} berhasil dijalankan (+50 XP)`, "achievement")
      }
    }, simulated.stepDelay)
  }

  const labels = getChartLabel(algoId)
  const COLORS = ["#5EEAD4", "#F5A265", "#A78BFA", "#F472B6", "#34D399", "#60A5FA"]

  return (
    <div className="space-y-4">
      {/* Code Editor Header */}
      <div className="glass p-4 rounded-3xl border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-neura-muted ml-2">{algoId}_model.py</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 glass rounded-xl text-xs text-neura-muted hover:text-white transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Tersalin" : "Salin Kode"}
            </button>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-neura-cyan text-neura-deep rounded-xl text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shadow-lg shadow-neura-cyan/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunning ? "Menjalankan..." : "Jalankan Kode"}
            </button>
          </div>
        </div>

        {/* Text Area Code Editor */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-[280px] p-4 bg-black/60 rounded-2xl font-mono text-xs text-neura-cyan leading-relaxed focus:outline-none border border-white/10 resize-none"
        />
      </div>

      {/* Interactive Terminal Output & Graphs */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Terminal Output Logs */}
        <div className="glass p-4 rounded-3xl border border-white/10 flex flex-col h-[280px]">
          <div className="flex items-center gap-2 text-xs font-bold text-white mb-2 pb-2 border-b border-white/10">
            <Terminal className="w-4 h-4 text-neura-amber" /> Terminal Output Log
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-[11px] text-neura-muted space-y-0.5 pr-1 bg-black/40 p-3 rounded-xl">
            {logs.length === 0 ? (
              <span className="text-neura-muted/50 italic">Tekan &quot;Jalankan Kode&quot; untuk mengeksekusi model...</span>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.includes("[Sukses]")
                      ? "text-neura-cyan font-bold"
                      : log.includes("═══")
                      ? "text-neura-amber font-bold"
                      : log.includes("──────")
                      ? "text-white/20"
                      : log.includes("Akurasi") || log.includes("R²") || log.includes("Score") || log.includes("K Optimal") || log.includes("K optimal")
                      ? "text-green-400"
                      : log.includes("█")
                      ? "text-neura-cyan/80"
                      : ""
                  }
                >
                  {log || "\u00A0"}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Live Metrics Graph */}
        <div className="glass p-4 rounded-3xl border border-white/10 flex flex-col h-[280px]">
          <div className="flex items-center justify-between text-xs font-bold text-white mb-2 pb-2 border-b border-white/10">
            <span className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-neura-cyan" /> {labels.title}
            </span>
          </div>
          <div className="flex-1 w-full pt-1">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-neura-muted/40 italic">
                Grafik akan dirender di sini secara real-time saat kode dijalankan
              </div>
            ) : chartType === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#9CA3C4" fontSize={10} angle={-15} textAnchor="end" height={40} />
                  <YAxis stroke="#9CA3C4" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 15, 31, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="value" name={labels.line1Name} radius={[4, 4, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#9CA3C4" fontSize={10} />
                  <YAxis stroke="#9CA3C4" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 15, 31, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      fontSize: "11px",
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#5EEAD4" strokeWidth={2} dot={{ r: 3 }} name={labels.line1Name} />
                  {labels.line2Name && (
                    <Line type="monotone" dataKey="value2" stroke="#F5A265" strokeWidth={2} dot={{ r: 3 }} name={labels.line2Name} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
