"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Network, Play, Sparkles, Sliders } from "lucide-react"
import { notify } from "@/components/ui/Toast"

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z))
const activate = (z: number, fn: string) =>
  fn === "ReLU" ? Math.max(0, z) : fn === "Tanh" ? Math.tanh(z) : sigmoid(z)

// Input tetap (3 fitur). Forward pass: h = act(W1·x + b1); out = sigmoid(W2·h + b2).
const INPUT_VALUES = [1.0, 0.5, -0.3]

function forwardPass(h: number, fn: string): number[] {
  const w1: number[][] = Array.from({ length: h }, (_, j) =>
    Array.from({ length: 3 }, (_, i) => Math.cos(j * 2.9 + i * 1.7) * 0.4)
  )
  const b1: number[] = Array.from({ length: h }, (_, j) => Math.sin(j * 1.3) * 0.3)
  const hidden = w1.map((row, j) =>
    activate(row.reduce((s, w, i) => s + w * INPUT_VALUES[i], 0) + b1[j], fn)
  )
  const out = [0, 1].map((a) => {
    let z = a === 0 ? 0.1 : -0.1
    for (let j = 0; j < h; j++) z += (a === 0 ? 1 : -1) * Math.sin(j + a + 2) * 1.0 * hidden[j]
    return sigmoid(z)
  })
  return out
}

export function NeuralNetSimulator() {
  const [hiddenNodes, setHiddenNodes] = useState<number>(4)
  const [activation, setActivation] = useState<string>("ReLU")
  const [isFiring, setIsFiring] = useState<boolean>(false)
  const [outputVal, setOutputVal] = useState<number | null>(null)
  const [winner, setWinner] = useState<number>(0)

  const fireNetwork = () => {
    if (isFiring) return
    setIsFiring(true)
    setOutputVal(null)
    notify("Sinyal Dikirim!", "Mengalirkan data input melalui hidden layers...", "info")

    setTimeout(() => {
      setIsFiring(false)
      const out = forwardPass(hiddenNodes, activation)
      const win = out[0] >= out[1] ? 0 : 1
      setWinner(win)
      setOutputVal(out[win])
      notify(
        "Prediksi Neural Net!",
        `→ Kelas ${String.fromCharCode(65 + win)} (${(out[win] * 100).toFixed(1)}%) | ${hiddenNodes} neuron, ${activation}`,
        "achievement"
      )
    }, 1800)
  }

  const inputs = ["Fitur 1 (x₁)", "Fitur 2 (x₂)", "Fitur 3 (x₃)"]
  const hNodes = Array.from({ length: hiddenNodes })
  const outputs = ["Kelas A", "Kelas B"]

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Network Diagram View */}
        <div className="lg:col-span-2 glass p-5 rounded-panel border border-neura-line flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-display text-lg text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-neura-cyan" /> Arsitektur Multi-Layer Perceptron (MLP)
              </h3>
              <p className="text-xs text-neura-muted">Fungsi Aktivasi: {activation}</p>
            </div>
            {outputVal !== null && (
              <span className="px-3 py-1 glass rounded-xl text-xs font-bold text-neura-cyan border border-neura-cyan/40">
                Kelas {String.fromCharCode(65 + winner)}: {(outputVal * 100).toFixed(1)}%
              </span>
            )}
          </div>

          {/* Canvas View */}
          <div className="relative w-full h-[320px] bg-neura-deep/60 rounded-panel border border-neura-line p-4 sm:p-6 flex items-center justify-between overflow-x-auto no-scrollbar">
            {/* Input Layer */}
            <div className="flex flex-col justify-around h-full z-10">
              <span className="text-[10px] uppercase tracking-wider text-neura-muted mb-2 text-center font-bold">Input Layer</span>
              {inputs.map((inp, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-neura-cyan/20 border border-neura-cyan flex items-center justify-center text-xs font-bold text-neura-cyan">
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
                    outputVal !== null && winner === i ? "bg-neura-cyan text-neura-deep border-neura-cyan" : "bg-purple-500/20 text-purple-300 border-purple-400"
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
                  className="absolute inset-0 pointer-events-none bg-neura-cyan/10 animate-pulse"
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-neura-line">
            <button
              onClick={fireNetwork}
              disabled={isFiring}
              className="flex items-center gap-2 px-5 py-2.5 bg-neura-cyan text-neura-deep rounded-panel text-xs font-bold hover:bg-neura-cyan/90 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" /> {isFiring ? "Proses Sinyal Feedforward..." : "Jalankan Feedforward Pass"}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="glass p-5 rounded-panel border border-neura-line flex flex-col justify-between">
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

            <div className="mt-6 p-4 glass rounded-panel border-l border-neura-cyan text-xs text-neura-muted leading-relaxed">
              <p className="font-medium text-white mb-1">🧠 Konsep Neural Network:</p>
              Input dikalikan dengan bobot ($W$), ditambahkan bias ($b$), lalu diaktifkan oleh fungsi non-linear ({activation}) untuk menghasilkan output!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
