"use client"

import { useState } from "react"
import { Play, Copy, Check, Terminal, Loader2, Sparkles, BarChart2 } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { notify } from "@/components/ui/Toast"

interface Props {
  initialCode: string
  algoId?: string
}

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"

// Satu instance runtime dipakai lintas run (load sekali).
let pyPromise: Promise<CustomPyodide> | null = null
const printBuffer: string[] = []

interface CustomPyodide {
  runPythonAsync: (code: string) => Promise<any>
  setStdout: (opts: { batched: (s: string) => void }) => void
  loadPackage: (pkgs: string[]) => Promise<void>
  globals: {
    get: (name: string) => any
  }
}

function getPyRuntime(): Promise<CustomPyodide> {
  if (!pyPromise) {
    pyPromise = (async () => {
      if (!(window as any).loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script")
          s.src = `${PYODIDE_URL}pyodide.js`
          s.onload = () => resolve()
          s.onerror = () => reject(new Error("Gagal memuat Pyodide — periksa jaringan & VPN"))
          document.head.appendChild(s)
        })
      }
      const py = await (window as any).loadPyodide({ indexURL: PYODIDE_URL })
      await py.loadPackage(["numpy", "scikit-learn"])
      py.setStdout({ batched: (line: string) => printBuffer.push(String(line)) })
      return py
    })()
  }
  return pyPromise
}

// Eksentrik real: baca balik hasil model dari namespace Python (Pyodide) jadi chart data.
const CHART_TAIL = `
import numpy as _NP
__NEURA_CHART = []
def _fX():
    for k in ('X', 'X_test', 'X_train'):
        v = globals().get(k)
        if v is not None:
            return v
    d = globals().get('data')
    if d is not None and hasattr(d, 'data'):
        return d.data
    return None
def _fM():
    m = globals().get('model')
    return m if m is not None and hasattr(m, 'predict') else None
try:
    XX = _fX(); MM = _fM()
    if XX is not None and MM is not None:
        Xa = XX if isinstance(XX, _NP.ndarray) else _NP.array(XX, dtype=float)
        yhat = _NP.asarray(MM.predict(Xa))
        __NEURA_CHART = [{'name': str(i), 'value': float(v)} for i, v in enumerate(yhat[:40])]
except Exception:
    __NEURA_CHART = []
`

const algoLabel = (algoId: string) =>
  algoId
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

interface ChartPoint {
  name: string
  value: number
}

function toChartArray(raw: any): ChartPoint[] {
  if (!raw) return []
  try {
    const arr = typeof raw.toJs === "function" ? Array.from(raw.toJs()) : Array.isArray(raw) ? raw : []
    return arr.map((p: any) => ({ name: String(p.name), value: Number(p.value) }))
  } catch {
    return []
  }
}

export function InteractiveCodeRunner({ initialCode, algoId = "general" }: Props) {
  const [code, setCode] = useState<string>(initialCode)
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [chartData, setChartData] = useState<ChartPoint[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    notify("Kode Tersalin", "Kode Python berhasil disalin ke clipboard", "info")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRunCode = async () => {
    if (isRunning) return
    setIsRunning(true)
    setError(null)
    setChartData([])
    printBuffer.length = 0
    setLogs(["[Neura PyRuntime] Memuat Pyodide (WebAssembly)... lambat di jalankan pertama kali"])

    try {
      const py = await getPyRuntime()
      setLogs([
        `[Neura PyRuntime] Runtime siap. Mengeksekusi ${algoId} (sklearn/numpy) di browser...`,
        "",
      ])

      await py.runPythonAsync(code)
      // ambil data chart dari hasil prediksi model yang baru saja dieksekusi
      try {
        await py.runPythonAsync(CHART_TAIL)
        setChartData(toChartArray(py.globals.get("__NEURA_CHART")))
      } catch {
        setChartData([])
      }

      const output = printBuffer.length > 0 ? printBuffer : ["(tidak ada print/cetak pada kode)"]

      setLogs([
        `[Neura PyRuntime] Runtime Python siap — menjalankan ${algoId}_model.py via WebAssembly.`,
        "",
        "════════════════════ EXECUTION OUTPUT ════════════════",
        ...output,
        "──────────────────────────────────────────────────────",
        "[Sukses] Kode dieksekusi (WebAssembly real). Output di atas hasil nyata dari kode yang kamu ubah.",
      ])
      notify("Eksekusi Selesai!", `${algoLabel(algoId)} berhasil dijalankan (+50 XP)`, "achievement")
    } catch (e: any) {
      setError(String(e?.message || e))
      const output = printBuffer.length > 0 ? [...printBuffer, ""] : []
      setLogs([
        `[Neura PyRuntime] Runtime siap — menjalankan ${algoId}_model.py via WebAssembly.`,
        "",
        "════════════════════ ERROR TRACEBACK ══════════════════",
        ...output,
        String(e?.message || e),
        "",
        "[Gagal] Kode tidak selesai. Cek kembali sintaks/data kode kamu.",
      ])
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Editor */}
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
              className="flex items-center gap-1.5 px-4 py-1.5 bg-neura-cyan text-neura-deep rounded-lg text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shadow-lg shadow-neura-cyan/20 shrink-0"
            >
              {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              {isRunning ? "Menjalankan..." : "Jalankan Kode"}
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-[280px] p-4 bg-black/60 rounded-2xl font-mono text-xs text-neura-cyan leading-relaxed focus:outline-none border border-white/10 resize-none"
        />
        <p className="mt-2 text-[11px] text-neura-muted/70 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-neura-amber" />
          Kode dieksekusi sungguhan via Pyodide (WebAssembly) langsung di browser — ubah kodenya, output & grafik ikut berubah.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Terminal */}
        <div className="glass p-4 rounded-3xl border border-white/10 flex flex-col min-h-[280px]">
          <div className="flex items-center gap-2 text-xs font-bold text-white mb-2 pb-2 border-b border-white/10">
            <Terminal className="w-4 h-4 text-neura-amber" /> Terminal Output Log
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-[11px] text-neura-muted space-y-0.5 pr-1 bg-black/40 p-3 rounded-xl max-h-[360px]">
            {logs.length === 0 ? (
              <span className="text-neura-muted/50 italic">
                Tekan &quot;Jalankan Kode&quot; untuk mengeksekusi model...
              </span>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={
                    log.includes("[Sukses]")
                      ? "text-neura-cyan font-bold"
                      : log.includes("═")
                      ? "text-neura-amber font-bold"
                      : log.includes("────")
                      ? "text-white/20"
                      : error && log.includes("Error")
                      ? "text-red-400"
                      : ""
                  }
                >
                  {log || "\u00A0"}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Grafik hasil uji (real, dari model.predict) */}
        <div className="glass p-4 rounded-3xl border border-white/10 flex flex-col min-h-[280px]">
          <div className="flex items-center gap-2 text-xs font-bold text-white mb-2 pb-2 border-b border-white/10">
            <BarChart2 className="w-4 h-4 text-neura-cyan" /> Grafik Hasil {algoLabel(algoId)}
          </div>
          <div className="flex-1 w-full pt-1">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-neura-muted/40 italic px-4 text-center">
                {error && !isRunning
                  ? "Kode error — perbaiki lalu jalankan ulang."
                  : "Grafik real dari hasil prediksi model (variabel `model`) akan dirender di sini setelah kode dijalankan."}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="#9CA3C4" fontSize={10} />
                  <YAxis stroke="#9CA3C4" fontSize={10} width={40} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(11, 15, 31, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      fontSize: "11px",
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#5EEAD4" strokeWidth={2} dot={{ r: 2 }} name="Prediksi" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}