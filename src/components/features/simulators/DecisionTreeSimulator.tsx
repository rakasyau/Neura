"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { GitBranch, Sparkles, Filter, Sliders } from "lucide-react"

interface SampleData {
  id: number
  cuaca: "Cerah" | "Hujan"
  suhu: number
  bermain: "Ya" | "Tidak"
}

const dataset: SampleData[] = [
  { id: 1, cuaca: "Cerah", suhu: 30, bermain: "Ya" },
  { id: 2, cuaca: "Cerah", suhu: 32, bermain: "Ya" },
  { id: 3, cuaca: "Cerah", suhu: 18, bermain: "Tidak" },
  { id: 4, cuaca: "Hujan", suhu: 28, bermain: "Tidak" },
  { id: 5, cuaca: "Hujan", suhu: 22, bermain: "Tidak" },
  { id: 6, cuaca: "Hujan", suhu: 31, bermain: "Ya" },
  { id: 7, cuaca: "Cerah", suhu: 25, bermain: "Ya" },
  { id: 8, cuaca: "Hujan", suhu: 19, bermain: "Tidak" },
]

export function DecisionTreeSimulator() {
  const [selectedCuaca, setSelectedCuaca] = useState<"Semua" | "Cerah" | "Hujan">("Semua")
  const [suhuCutoff, setSuhuCutoff] = useState<number>(25)
  const [applySuhuFilter, setApplySuhuFilter] = useState<boolean>(false)

  const filtered = useMemo(() => {
    return dataset.filter((d) => {
      if (selectedCuaca !== "Semua" && d.cuaca !== selectedCuaca) return false
      if (applySuhuFilter && d.suhu < suhuCutoff) return false
      return true
    })
  }, [selectedCuaca, suhuCutoff, applySuhuFilter])

  // Calculate Gini impurity for the filtered subset
  const giniImpurity = useMemo(() => {
    if (filtered.length === 0) return 0
    const yaCount = filtered.filter((d) => d.bermain === "Ya").length
    const tidakCount = filtered.length - yaCount
    const pYa = yaCount / filtered.length
    const pTidak = tidakCount / filtered.length
    return parseFloat((1 - pYa * pYa - pTidak * pTidak).toFixed(3))
  }, [filtered])

  const resetAll = () => {
    setSelectedCuaca("Semua")
    setApplySuhuFilter(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tree Diagram View */}
        <div className="lg:col-span-2 glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-bold font-display text-lg text-white flex items-center gap-2 mb-4">
              <GitBranch className="w-5 h-5 text-neura-cyan" /> Simulasi Percabangan Decision Tree
            </h3>

            {/* Tree Branch Diagram */}
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-4">
              {/* Root Node */}
              <div className="p-3 px-5 glass rounded-2xl border border-neura-cyan/40 text-center shadow-lg">
                <span className="text-xs text-neura-muted block">Split 1 (Gini)</span>
                <span className="text-sm font-bold text-neura-cyan">Apakah Cuaca == Cerah?</span>
              </div>

              {/* Branch Buttons */}
              <div className="flex justify-center gap-6 w-full max-w-md">
                <button
                  onClick={() => { setSelectedCuaca("Cerah"); setApplySuhuFilter(false) }}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold transition-all ${
                    selectedCuaca === "Cerah" ? "bg-neura-cyan text-neura-deep border-neura-cyan shadow-lg" : "glass text-neura-muted hover:text-white"
                  }`}
                >
                  Ya (Cerah) ☀️
                </button>
                <button
                  onClick={() => { setSelectedCuaca("Hujan"); setApplySuhuFilter(false) }}
                  className={`flex-1 p-3 rounded-2xl border text-xs font-bold transition-all ${
                    selectedCuaca === "Hujan" ? "bg-neura-amber text-neura-deep border-neura-amber shadow-lg" : "glass text-neura-muted hover:text-white"
                  }`}
                >
                  Tidak (Hujan) 🌧️
                </button>
              </div>

              {/* Second Level Split — Suhu */}
              {selectedCuaca !== "Semua" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md space-y-3"
                >
                  <div className="p-3 px-5 glass rounded-2xl border border-neura-amber/40 text-center shadow-lg">
                    <span className="text-xs text-neura-muted block">Split 2</span>
                    <span className="text-sm font-bold text-neura-amber">Apakah Suhu ≥ {suhuCutoff}°C?</span>
                  </div>

                  <div className="flex items-center gap-3 px-2">
                    <Sliders className="w-4 h-4 text-neura-amber shrink-0" />
                    <input
                      type="range"
                      min="15"
                      max="35"
                      value={suhuCutoff}
                      onChange={(e) => setSuhuCutoff(parseInt(e.target.value))}
                      className="w-full accent-neura-amber cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-neura-amber w-10 text-right">{suhuCutoff}°C</span>
                  </div>

                  <button
                    onClick={() => setApplySuhuFilter(true)}
                    className={`w-full p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      applySuhuFilter
                        ? "bg-green-500/20 border-green-500/40 text-green-300"
                        : "glass text-neura-muted hover:text-white hover:border-neura-amber/40"
                    }`}
                  >
                    {applySuhuFilter ? `✓ Filter Aktif: Suhu ≥ ${suhuCutoff}°C` : `Terapkan Split: Suhu ≥ ${suhuCutoff}°C`}
                  </button>
                </motion.div>
              )}

              {/* Status Bar */}
              <div className="w-full pt-3 border-t border-white/10 flex justify-between items-center px-2">
                <div className="text-xs text-neura-muted space-x-3">
                  <span>Filter: <strong className="text-white">{selectedCuaca}</strong></span>
                  {applySuhuFilter && <span>| Suhu ≥ <strong className="text-neura-amber">{suhuCutoff}°C</strong></span>}
                  <span>| Gini: <strong className={giniImpurity < 0.3 ? "text-green-400" : "text-neura-amber"}>{giniImpurity}</strong></span>
                </div>
                <button
                  onClick={resetAll}
                  className="text-xs text-neura-cyan hover:underline"
                >
                  Reset Tree
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sample Table */}
        <div className="glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="font-bold font-display text-base text-white mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-neura-amber" /> Hasil Sub-Dataset ({filtered.length} Sampel)
            </h4>

            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
              {filtered.length === 0 ? (
                <div className="text-xs text-neura-muted text-center py-6 italic">
                  Tidak ada data yang cocok dengan filter. Coba ubah threshold suhu.
                </div>
              ) : (
                filtered.map((item) => (
                  <div key={item.id} className="p-2.5 glass rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white">Sampel #{item.id}</span>
                      <span className="text-neura-muted ml-2">{item.cuaca}, {item.suhu}°C</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-bold ${item.bermain === "Ya" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      Bermain: {item.bermain}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 p-3.5 glass rounded-2xl border-l-2 border-neura-amber text-xs text-neura-muted">
              🌲 Decision Tree memecah dataset menjadi subset yang lebih murni (Gini Impurity rendah) pada setiap percabangan. Coba geser threshold suhu untuk melihat bagaimana pemisahan berubah!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
