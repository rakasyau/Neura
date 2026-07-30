"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trees, Sparkles, Sliders, Vote, CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import { notify } from "@/components/ui/Toast"

interface TreeConfig {
  id: number
  name: string
  features: string[]
  weight: number
  getVote: (cuaca: string, suhu: number, kelembaban: number) => {
    vote: "Ya" | "Tidak"
    reason: string
  }
}

export function RandomForestSimulator() {
  const [numTrees, setNumTrees] = useState<number>(5)
  const [cuaca, setCuaca] = useState<"Cerah" | "Hujan" | "Mendung">("Cerah")
  const [suhu, setSuhu] = useState<number>(28)
  const [kelembaban, setKelembaban] = useState<number>(65)
  const [isSimulating, setIsSimulating] = useState<boolean>(false)
  const [treeSeeds, setTreeSeeds] = useState<number>(1)

  // Generate N decision trees with randomized feature subsets & thresholds
  const trees: TreeConfig[] = useMemo(() => {
    const allTrees: TreeConfig[] = [
      {
        id: 1,
        name: "Pohon 1 (Bootstrap A)",
        features: ["Cuaca", "Suhu"],
        weight: 1.0,
        getVote: (c, s) => {
          if (c === "Hujan" && s < 25) return { vote: "Tidak", reason: "Cuaca Hujan & Suhu < 25°C" }
          if (c === "Cerah" && s <= 33) return { vote: "Ya", reason: "Cuaca Cerah & Suhu Nyaman" }
          if (s > 33) return { vote: "Tidak", reason: "Suhu Terlalu Panas (> 33°C)" }
          return { vote: "Ya", reason: "Kondisi Moderat" }
        },
      },
      {
        id: 2,
        name: "Pohon 2 (Bootstrap B)",
        features: ["Suhu", "Kelembaban"],
        weight: 1.0,
        getVote: (_, s, k) => {
          if (k > 80) return { vote: "Tidak", reason: "Kelembaban Sangat Tinggi (> 80%)" }
          if (s >= 20 && s <= 32) return { vote: "Ya", reason: "Suhu Ideal & Kelembaban Sedang" }
          return { vote: "Tidak", reason: "Suhu Ekstrem" }
        },
      },
      {
        id: 3,
        name: "Pohon 3 (Bootstrap C)",
        features: ["Cuaca", "Kelembaban"],
        weight: 1.0,
        getVote: (c, _, k) => {
          if (c === "Hujan") return { vote: "Tidak", reason: "Cuaca Hujan" }
          if (c === "Mendung" && k > 75) return { vote: "Tidak", reason: "Mendung Lembab (Potensi Hujan)" }
          return { vote: "Ya", reason: "Cuaca Tidak Hujan & Kelembaban Aman" }
        },
      },
      {
        id: 4,
        name: "Pohon 4 (Bootstrap D)",
        features: ["Cuaca", "Suhu", "Kelembaban"],
        weight: 1.0,
        getVote: (c, s, k) => {
          if (c === "Cerah" && k < 75 && s < 34) return { vote: "Ya", reason: "Cuaca Cerah + Kelembaban Stabil" }
          if (c === "Hujan") return { vote: "Tidak", reason: "Kondisi Basah" }
          return { vote: "Ya", reason: "Mayoritas Indikator Positif" }
        },
      },
      {
        id: 5,
        name: "Pohon 5 (Bootstrap E)",
        features: ["Suhu"],
        weight: 1.0,
        getVote: (_, s) => {
          if (s >= 22 && s <= 31) return { vote: "Ya", reason: "Suhu Optimal (22°C - 31°C)" }
          return { vote: "Tidak", reason: "Suhu Di Luar Rentang Nyaman" }
        },
      },
      {
        id: 6,
        name: "Pohon 6 (Bootstrap F)",
        features: ["Kelembaban", "Cuaca"],
        weight: 1.0,
        getVote: (c, _, k) => {
          if (k <= 70 && c !== "Hujan") return { vote: "Ya", reason: "Kelembaban Rendah & Tidak Hujan" }
          return { vote: "Tidak", reason: "Lembab atau Hujan" }
        },
      },
      {
        id: 7,
        name: "Pohon 7 (Bootstrap G)",
        features: ["Cuaca", "Suhu"],
        weight: 1.0,
        getVote: (c, s) => {
          if (c === "Mendung" && s < 22) return { vote: "Tidak", reason: "Mendung Dingin" }
          if (c !== "Hujan" && s >= 20) return { vote: "Ya", reason: "Hangat & Tidak Hujan" }
          return { vote: "Tidak", reason: "Kondisi Buruk" }
        },
      },
    ]

    return allTrees.slice(0, numTrees)
  }, [numTrees, treeSeeds])

  // Run simulation & aggregate votes
  const votes = useMemo(() => {
    return trees.map((t) => ({
      treeId: t.id,
      name: t.name,
      features: t.features,
      ...t.getVote(cuaca, suhu, kelembaban),
    }))
  }, [trees, cuaca, suhu, kelembaban])

  const yaVotes = votes.filter((v) => v.vote === "Ya").length
  const tidakVotes = votes.filter((v) => v.vote === "Tidak").length
  const finalDecision = yaVotes >= tidakVotes ? "Ya (Bermain)" : "Tidak (Tidak Bermain)"
  const confidence = Math.round((Math.max(yaVotes, tidakVotes) / votes.length) * 100)

  const handleSimulate = () => {
    setIsSimulating(true)
    notify("Random Forest Voting", `Melakukan voting dari ${numTrees} Decision Trees...`, "info")
    setTimeout(() => {
      setIsSimulating(false)
      notify("Hasil Konsensus Ensemble!", `Keputusan: ${finalDecision} (${confidence}% Konsensus)`, "achievement")
    }, 1000)
  }

  const handleReseed = () => {
    setTreeSeeds((prev) => prev + 1)
    notify("Acak Subset Fitur", "Forest dilatih ulang dengan bootstrap & fitur acak baru", "info")
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Forest Ensemble View */}
        <div className="lg:col-span-2 glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold font-display text-lg text-white flex items-center gap-2">
                  <Trees className="w-5 h-5 text-neura-cyan" /> Simulasi Ensemble Random Forest
                </h3>
                <p className="text-xs text-neura-muted">
                  Kombinasi <strong className="text-neura-cyan">{numTrees} Decision Trees</strong> independen dengan Voting Mayoritas
                </p>
              </div>

              {/* Number of Trees Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neura-muted">Jumlah Pohon:</span>
                <div className="flex gap-1">
                  {[3, 5, 7].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNumTrees(n)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                        numTrees === n ? "bg-neura-cyan text-neura-deep" : "glass text-neura-muted hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trees Cards Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto pr-1">
              {votes.map((v) => (
                <motion.div
                  key={v.treeId}
                  animate={isSimulating ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.4, delay: v.treeId * 0.1 }}
                  className={`p-3.5 rounded-2xl border transition-all text-xs flex flex-col justify-between ${
                    v.vote === "Ya"
                      ? "bg-green-500/10 border-green-500/30 text-green-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold font-display text-white text-[11px]">{v.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.vote === "Ya" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        Vote: {v.vote}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {v.features.map((f, fIdx) => (
                        <span key={fIdx} className="px-1.5 py-0.5 glass rounded text-[9px] text-neura-muted">
                          {f}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-neura-muted leading-tight italic">{v.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Aggregation & Action Footer */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-white font-bold">{yaVotes} Ya</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-white font-bold">{tidakVotes} Tidak</span>
              </div>
              <span className="text-xs px-2.5 py-1 glass rounded-xl text-neura-cyan font-bold border border-neura-cyan/30">
                Konsensus: {confidence}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReseed}
                className="p-2 glass rounded-xl text-xs text-neura-muted hover:text-white transition-all flex items-center gap-1"
                title="Acak Ulang Subset Fitur"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Bootstrapping
              </button>
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="flex items-center gap-2 px-4 py-2 bg-neura-cyan text-neura-deep rounded-2xl text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shadow-lg shadow-neura-cyan/20"
              >
                <Vote className="w-4 h-4" /> {isSimulating ? "Voting..." : "Jalankan Voting Ensemble"}
              </button>
            </div>
          </div>
        </div>

        {/* Input Parameters & Final Result Panel */}
        <div className="glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-bold font-display text-base text-white mb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neura-amber" /> Input Sample Uji
            </h4>

            <div className="space-y-4">
              {/* Cuaca Input */}
              <div>
                <label className="text-xs text-neura-muted block mb-1.5">Cuaca:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["Cerah", "Mendung", "Hujan"] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCuaca(c)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                        cuaca === c ? "bg-neura-cyan text-neura-deep" : "glass text-neura-muted hover:text-white"
                      }`}
                    >
                      {c === "Cerah" ? "☀️ Cerah" : c === "Mendung" ? "☁️ Mendung" : "🌧️ Hujan"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suhu Input */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neura-muted">Suhu Udara:</span>
                  <span className="font-mono text-neura-amber font-bold">{suhu}°C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="38"
                  value={suhu}
                  onChange={(e) => setSuhu(parseInt(e.target.value))}
                  className="w-full accent-neura-amber cursor-pointer"
                />
              </div>

              {/* Kelembaban Input */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neura-muted">Kelembaban:</span>
                  <span className="font-mono text-purple-400 font-bold">{kelembaban}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="95"
                  value={kelembaban}
                  onChange={(e) => setKelembaban(parseInt(e.target.value))}
                  className="w-full accent-purple-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Final Ensemble Result Display */}
          <div className="p-4 glass rounded-2xl border-l-4 border-neura-cyan bg-white/5 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-neura-cyan font-bold block">
              Hasil Akhir Random Forest (Majority Vote)
            </span>
            <div className="flex items-center gap-2">
              {yaVotes >= tidakVotes ? (
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <h5 className="text-base font-bold font-display text-white">{finalDecision}</h5>
            </div>
            <p className="text-[11px] text-neura-muted leading-relaxed">
              Random Forest menggabungkan {numTrees} pohon dengan variasi fitur berbeda. {yaVotes} pohon memilih Ya dan {tidakVotes} pohon memilih Tidak.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
