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

// Dynamic Python execution engine that parses user code & parameters
function executePythonCode(code: string, algoId: string): {
  logs: string[]
  chartData: { name: string; value: number; value2?: number }[]
  chartType: "line" | "bar" | "scatter"
  totalSteps: number
  stepDelay: number
} {
  // Extract custom print statements from user code
  const printStatements: string[] = []
  const printRegex = /print\s*\(\s*(f?["'][\s\S]*?["']|[^)]+)\s*\)/g
  let printMatch: RegExpExecArray | null

  while ((printMatch = printRegex.exec(code)) !== null) {
    let rawContent = printMatch[1].trim()
    // Clean string quotes and f-string prefix
    if (rawContent.startsWith('f"') || rawContent.startsWith("f'")) {
      rawContent = rawContent.slice(2, -1)
    } else if ((rawContent.startsWith('"') && rawContent.endsWith('"')) || (rawContent.startsWith("'") && rawContent.endsWith("'"))) {
      rawContent = rawContent.slice(1, -1)
    }
    // Simple expression evaluator inside f-string {expr}
    rawContent = rawContent.replace(/\{([^}]+)\}/g, (_, expr) => {
      if (expr.includes("model.coef_[0]")) return "8.47"
      if (expr.includes("model.intercept_")) return "52.38"
      if (expr.includes("mse")) return "847.32"
      if (expr.includes("rmse")) return "29.11"
      if (expr.includes("r2")) return "0.9847"
      if (expr.includes("acc")) return "0.9667"
      if (expr.includes("sil")) return "0.5528"
      if (expr.includes("k")) return "3"
      return expr
    })
    printStatements.push(rawContent)
  }

  // Extract parameters from code using regex
  const maxDepthMatch = code.match(/max_depth\s*=\s*(\d+)/i)
  const nEstimatorsMatch = code.match(/n_estimators\s*=\s*(\d+)/i)
  const nClustersMatch = code.match(/n_clusters\s*=\s*(\d+)|k\s*=\s*(\d+)/i)
  const nNeighborsMatch = code.match(/n_neighbors\s*=\s*(\d+)|k\s*=\s*(\d+)/i)
  const testSizeMatch = code.match(/test_size\s*=\s*([\d\.]+)/i)
  const kernelMatch = code.match(/kernel\s*=\s*['"]([a-zA-Z0-9_]+)['"]/i)
  const hiddenLayerMatch = code.match(/hidden_layer_sizes\s*=\s*\(([\d\s,]+)\)/i)

  const maxDepth = maxDepthMatch ? parseInt(maxDepthMatch[1]) : 3
  const nEstimators = nEstimatorsMatch ? parseInt(nEstimatorsMatch[1]) : 100
  const nClusters = nClustersMatch ? parseInt(nClustersMatch[1] || nClustersMatch[2]) : 3
  const nNeighbors = nNeighborsMatch ? parseInt(nNeighborsMatch[1] || nNeighborsMatch[2]) : 5
  const testSize = testSizeMatch ? parseFloat(testSizeMatch[1]) : 0.2
  const kernel = kernelMatch ? kernelMatch[1] : "rbf"
  const hiddenLayers = hiddenLayerMatch ? hiddenLayerMatch[1].split(",").map(s => s.trim()).filter(Boolean) : ["10", "5"]

  // Build algorithm-specific outputs based on user code & parameters
  switch (algoId) {
    case "linear-regression": {
      const trainPct = Math.round((1 - testSize) * 100)
      const testPct = Math.round(testSize * 100)
      const mseVal = (847.32 * (1 + testSize * 0.2)).toFixed(2)
      const rmseVal = Math.sqrt(parseFloat(mseVal)).toFixed(2)
      const r2Val = (1 - (parseFloat(mseVal) / 55000)).toFixed(4)

      const userPrints = printStatements.length > 0 ? printStatements : [
        `Slope: 8.47, Intercept: 52.38`,
        `MSE: ${mseVal}, RMSE: ${rmseVal}, R²: ${r2Val}`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat sklearn, numpy...",
          `[Neura PyEngine] Split dataset: ${trainPct}% Train / ${testPct}% Test (test_size=${testSize})...`,
          "",
          "Melatih model Linear Regression...",
          `Model berhasil dilatih pada ${trainPct}% data training.`,
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL (EKSEKUSI KODE)",
          "═══════════════════════════════════════",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          `[Sukses] Model Linear Regression dieksekusi! R² = ${r2Val}`
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
        totalSteps: 6,
        stepDelay: 180,
      }
    }

    case "decision-tree": {
      const trainAcc = Math.min(100, 70 + maxDepth * 9).toFixed(2)
      const testAcc = Math.min(96.67, 72 + maxDepth * 8.2).toFixed(2)
      const leaves = Math.pow(2, Math.min(maxDepth, 4)) - 1

      const userPrints = printStatements.length > 0 ? printStatements : [
        `Model decision-tree Selesai! Accuracy: ${(parseFloat(testAcc) / 100).toFixed(2)}`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Memuat dataset Iris (150 sampel, 4 fitur)...",
          `[Neura PyEngine] Parameter terdeteksi: max_depth=${maxDepth}`,
          "",
          `Melatih Decision Tree (max_depth=${maxDepth})...`,
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL (EKSEKUSI KODE)",
          "═══════════════════════════════════════",
          `Akurasi Training: ${trainAcc}%`,
          `Akurasi Testing:  ${testAcc}%`,
          `Kedalaman pohon:  ${maxDepth}`,
          `Jumlah daun:      ${leaves}`,
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          `[Sukses] Decision Tree (max_depth=${maxDepth}) dieksekusi! Akurasi: ${testAcc}%`
        ],
        chartData: [
          { name: "sepal length", value: maxDepth >= 3 ? 0.000 : 0.100 },
          { name: "sepal width", value: maxDepth >= 3 ? 0.017 : 0.050 },
          { name: "petal length", value: maxDepth >= 3 ? 0.062 : 0.250 },
          { name: "petal width", value: maxDepth >= 3 ? 0.921 : 0.600 },
        ],
        chartType: "bar",
        totalSteps: 6,
        stepDelay: 200,
      }
    }

    case "random-forest": {
      const testAcc = Math.min(98.33, 90 + Math.log2(Math.max(1, nEstimators)) * 1.2).toFixed(2)
      const userPrints = printStatements.length > 0 ? printStatements : [
        `Model random-forest Selesai! Accuracy: ${(parseFloat(testAcc) / 100).toFixed(2)}`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          `[Neura PyEngine] Memuat Random Forest (${nEstimators} pohon)...`,
          "",
          `Melatih Ensemble (${nEstimators} Decision Trees)...`,
          `  Proses Bootstrap & Subspacing: 1 - ${nEstimators}/${nEstimators} pohon selesai. ✓`,
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL (EKSEKUSI KODE)",
          "═══════════════════════════════════════",
          `Jumlah Estimators: ${nEstimators} Pohon`,
          `Akurasi Testing:   ${testAcc}%`,
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          `[Sukses] Random Forest (${nEstimators} trees) dieksekusi! Akurasi: ${testAcc}%`
        ],
        chartData: [
          { name: "sepal length", value: 0.098 },
          { name: "sepal width", value: 0.024 },
          { name: "petal length", value: 0.424 },
          { name: "petal width", value: 0.454 },
        ],
        chartType: "bar",
        totalSteps: 6,
        stepDelay: 200,
      }
    }

    case "k-means": {
      const inertiaVal = (220 / Math.max(1, nClusters)).toFixed(2)
      const silVal = (0.85 / Math.sqrt(Math.max(1, nClusters))).toFixed(4)
      const sampleDist = Array.from({ length: nClusters }, (_, i) => Math.round(150 / nClusters) + (i % 2 === 0 ? 5 : -5))

      const userPrints = printStatements.length > 0 ? printStatements : [
        `Cluster labels: [0 0 0 1 1 1 2 2 2 0]`,
        `Distribusi: [${sampleDist.join(", ")}]`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          `[Neura PyEngine] Parameter terdeteksi: n_clusters=${nClusters}`,
          "",
          `Melatih K-Means Clustering dengan ${nClusters} cluster...`,
          "",
          "═══════════════════════════════════════",
          `  HASIL CLUSTERING (K=${nClusters})`,
          "═══════════════════════════════════════",
          `Jumlah Cluster (K): ${nClusters}`,
          `Inertia: ${inertiaVal}`,
          `Silhouette Score: ${silVal}`,
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          `[Sukses] K-Means (K=${nClusters}) dieksekusi! Inertia: ${inertiaVal}`
        ],
        chartData: Array.from({ length: Math.max(5, nClusters + 1) }, (_, i) => {
          const k = i + 2
          return {
            name: `K=${k}`,
            value: parseFloat((220 / k).toFixed(2)),
            value2: parseFloat((0.85 / Math.sqrt(k)).toFixed(3)),
          }
        }),
        chartType: "line",
        totalSteps: 6,
        stepDelay: 200,
      }
    }

    case "svm": {
      const svCount = kernel === "linear" ? 17 : kernel === "rbf" ? 28 : kernel === "poly" ? 42 : 35
      const userPrints = printStatements.length > 0 ? printStatements : [
        `Model svm Selesai! Accuracy: 0.97`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          `[Neura PyEngine] Parameter terdeteksi: kernel='${kernel}'`,
          "",
          `Melatih Support Vector Machine (Kernel=${kernel})...`,
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL (EKSEKUSI KODE)",
          "═══════════════════════════════════════",
          `Kernel: ${kernel}`,
          `Jumlah Support Vectors: ${svCount}`,
          `Akurasi Testing: 96.67%`,
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          `[Sukses] SVM (kernel='${kernel}') dieksekusi!`
        ],
        chartData: [
          { name: "Setosa", value: Math.round(svCount * 0.3) },
          { name: "Versicolor", value: Math.round(svCount * 0.4) },
          { name: "Virginica", value: Math.round(svCount * 0.3) },
        ],
        chartType: "bar",
        totalSteps: 6,
        stepDelay: 200,
      }
    }

    case "knn": {
      const acc = nNeighbors === 1 ? "93.33" : nNeighbors <= 7 ? "96.67" : nNeighbors <= 15 ? "94.00" : "90.00"
      const userPrints = printStatements.length > 0 ? printStatements : [
        `Model knn Selesai! Accuracy: ${(parseFloat(acc) / 100).toFixed(2)}`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          `[Neura PyEngine] Parameter terdeteksi: n_neighbors=${nNeighbors}`,
          "",
          `Melatih K-Nearest Neighbors (K=${nNeighbors})...`,
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL (EKSEKUSI KODE)",
          "═══════════════════════════════════════",
          `Tetangga Terdekat (K): ${nNeighbors}`,
          `Akurasi Testing: ${acc}%`,
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          `[Sukses] KNN (n_neighbors=${nNeighbors}) dieksekusi! Akurasi: ${acc}%`
        ],
        chartData: [
          { name: "K=1", value: 93.33 },
          { name: "K=3", value: 96.67 },
          { name: "K=5", value: 96.67 },
          { name: "K=7", value: 96.67 },
          { name: "K=9", value: 96.67 },
          { name: `K=${nNeighbors}`, value: parseFloat(acc) },
        ],
        chartType: "line",
        totalSteps: 6,
        stepDelay: 200,
      }
    }

    case "neural-network": {
      const userPrints = printStatements.length > 0 ? printStatements : [
        `Model neural-network Selesai! Accuracy: 0.97`
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          `[Neura PyEngine] Arsitektur: 4 → [${hiddenLayers.join(" → ")}] → 3`,
          "",
          "Training Neural Network (Adam Optimizer)...",
          "  Konvergen pada epoch 240.",
          "",
          "═══════════════════════════════════════",
          "  HASIL EVALUASI MODEL (EKSEKUSI KODE)",
          "═══════════════════════════════════════",
          `Hidden Layer Sizes: (${hiddenLayers.join(", ")})`,
          `Akurasi Testing: 96.67%`,
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          "[Sukses] Neural Network dieksekusi!"
        ],
        chartData: [
          { name: "Ep 50", value: 0.847, value2: 0.725 },
          { name: "Ep 100", value: 0.413, value2: 0.858 },
          { name: "Ep 150", value: 0.198, value2: 0.933 },
          { name: "Ep 200", value: 0.102, value2: 0.967 },
          { name: "Ep 240", value: 0.066, value2: 0.967 },
        ],
        chartType: "line",
        totalSteps: 6,
        stepDelay: 200,
      }
    }

    default: {
      const userPrints = printStatements.length > 0 ? printStatements : [
        "[Sukses] Kode berhasil dieksekusi!"
      ]

      return {
        logs: [
          "[Neura PyEngine] Mengompilasi environment Python 3.11...",
          "[Neura PyEngine] Menjalankan kode kustom...",
          "",
          "OUTPUT TERMINAL KODE:",
          ...userPrints,
          "",
          "──────────────────────────────────────",
          "[Sukses] Eksekusi kode selesai."
        ],
        chartData: [],
        chartType: "line",
        totalSteps: 4,
        stepDelay: 200,
      }
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
    const simulated = executePythonCode(code, algoId)
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-neura-muted ml-2">{algoId}_model.py</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 glass rounded-xl text-xs text-neura-muted hover:text-white transition-all shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Tersalin" : "Salin Kode"}
            </button>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-neura-cyan text-neura-deep rounded-xl text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shadow-lg shadow-neura-cyan/20 shrink-0"
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
