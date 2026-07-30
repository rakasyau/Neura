"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Network, Play, Sparkles, Sliders } from "lucide-react"
import { notify } from "@/components/ui/Toast"

export function NeuralNetSimulator() {
  const [hiddenNodes, setHiddenNodes] = useState<number>(4)
  const [activation, setActivation] = useState<string>("ReLU")
  const [isFiring, setIsFiring] = useState<boolean>(false)
  const [outputVal, setOutputVal] = useState<number | null>(null)

  const fireNetwork = () => {
    if (isFiring) return
    setIsFiring(true)
    setOutputVal(null)
    notify("Sinyal Dikirim!", "Mengalirkan data input melalui hidden layers...", "info")

    setTimeout(() => {
      setIsFiring(false)
      // Output bergantung pada parameter arsitektur
      // Lebih banyak neuron → confidence lebih tinggi (hingga batas tertentu)
      const neuronBonus = Math.min(hiddenNodes * 0.04, 0.20)  // max +0.20 dari 6 neuron
      // Fungsi aktivasi mempengaruhi range output
      const activationBase: Record<string, number> = {
        "ReLU": 0.72,     // Range: 0.72-0.92 → paling umum dan stabil
        "Sigmoid": 0.65,  // Range: 0.65-0.85 → cenderung lebih rendah
        "Tanh": 0.68,     // Range: 0.68-0.88 → menengah
      }
      const base = activationBase[activation] || 0.70
      const noise = (Math.random() - 0.5) * 0.08  // ±0.04 variasi acak
      const res = parseFloat(Math.min(0.98, Math.max(0.50, base + neuronBonus + noise)).toFixed(3))
      setOutputVal(res)
      notify("Prediksi Neural Net!", `Output: ${res} | ${hiddenNodes} neuron, ${activation}`, "achievement")
    }, 1800)
  }

  const inputs = ["Fitur 1 (x₁)", "Fitur 2 (x₂)", "Fitur 3 (x₃)"]
  const hNodes = Array.from({ length: hiddenNodes })
  const outputs = ["Kelas A", "Kelas B"]

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Network Diagram View */}
        <div className="lg:col-span-2 glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-display text-lg text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-neura-cyan" /> Arsitektur Multi-Layer Perceptron (MLP)
              </h3>
              <p className="text-xs text-neura-muted">Fungsi Aktivasi: {activation}</p>
            </div>
            {outputVal !== null && (
              <span className="px-3 py-1 glass rounded-xl text-xs font-bold text-neura-cyan border border-neura-cyan/40">
                Confidence: {(outputVal * 100).toFixed(1)}%
              </span>
            )}
          </div>

          {/* Canvas View */}
          <div className="relative w-full h-[320px] bg-black/40 rounded-2xl border border-white/10 p-4 sm:p-6 flex items-center justify-between overflow-x-auto no-scrollbar">
            {/* Input Layer */}
            <div className="flex flex-col justify-around h-full z-10">
              <span className="text-[10px] uppercase tracking-wider text-neura-muted mb-2 text-center font-bold">Input Layer</span>
              {inputs.map((inp, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-neura-cyan/20 border border-neura-cyan flex items-center justify-center text-xs font-bold text-neura-cyan shadow-lg shadow-neura-cyan/10">
                    x{i + 1}
                  </div>
                  <span className="text-[11px] text-neura-muted font-medium hidden sm:inline">{inp}</span>
                </div>
              ))}
            </div>

            {/* Hidden Layer */}
            <div className="flex flex-col justify-around h-full z-10">
              <span className="text-[10px] uppercase tracking-wider text-neura-amber mb-2 text-center font-bold">Hidden Layer</span>
              {hNodes.map((_, i) => (
                <motion.div
                  key={i}
                  animate={isFiring ? { scale: [1, 1.25, 1], borderColor: ["#F5A265", "#5EEAD4", "#F5A265"] } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="w-10 h-10 rounded-full bg-neura-amber/20 border border-neura-amber flex items-center justify-center text-xs font-bold text-neura-amber shadow-lg"
                >
                  h{i + 1}
                </motion.div>
              ))}
            </div>

            {/* Output Layer */}
            <div className="flex flex-col justify-around h-full z-10">
              <span className="text-[10px] uppercase tracking-wider text-purple-400 mb-2 text-center font-bold">Output Layer</span>
              {outputs.map((out, i) => (
                <motion.div
                  key={i}
                  animate={isFiring ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.2 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold border shadow-xl ${
                    outputVal !== null && i === 0 ? "bg-neura-cyan text-neura-deep border-neura-cyan" : "bg-purple-500/20 text-purple-300 border-purple-400"
                  }`}
                >
                  y{i + 1}
                </motion.div>
              ))}
            </div>

            {/* Pulsing Synapse Pulse Lines Overlay */}
            <AnimatePresence>
              {isFiring && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none bg-gradient-to-r from-neura-cyan/10 via-neura-amber/15 to-purple-500/10 animate-pulse"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
            <button
              onClick={fireNetwork}
              disabled={isFiring}
              className="flex items-center gap-2 px-5 py-2.5 bg-neura-cyan text-neura-deep rounded-2xl text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50 shadow-lg shadow-neura-cyan/20"
            >
              <Sparkles className="w-4 h-4" /> {isFiring ? "Proses Sinyal Feedforward..." : "Jalankan Feedforward Pass"}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="glass p-5 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <h4 className="font-bold font-display text-base text-white mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-neura-cyan" /> Tuning Arsitektur
            </h4>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-neura-muted">Neuron Hidden Layer:</span>
                  <span className="font-mono text-neura-cyan font-bold">{hiddenNodes} Neuron</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={hiddenNodes}
                  onChange={(e) => setHiddenNodes(parseInt(e.target.value))}
                  className="w-full accent-neura-cyan cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs text-neura-muted block mb-2">Fungsi Aktivasi:</span>
                <div className="grid grid-cols-3 gap-2">
                  {["ReLU", "Sigmoid", "Tanh"].map((fn) => (
                    <button
                      key={fn}
                      onClick={() => setActivation(fn)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        activation === fn ? "bg-neura-cyan text-neura-deep" : "glass text-neura-muted hover:text-white"
                      }`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 glass rounded-2xl border-l-2 border-neura-cyan text-xs text-neura-muted leading-relaxed">
              <p className="font-medium text-white mb-1">🧠 Konsep Neural Network:</p>
              Input dikalikan dengan bobot ($W$), ditambahkan bias ($b$), lalu diaktifkan oleh fungsi non-linear ({activation}) untuk menghasilkan output!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
