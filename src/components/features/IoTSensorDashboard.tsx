"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Droplets, Thermometer, Activity, Leaf, ShieldAlert, Sparkles, Sliders } from "lucide-react"
import { notify } from "@/components/ui/Toast"

export function IoTSensorDashboard() {
  const [moisture, setMoisture] = useState<number>(65)
  const [temp, setTemp] = useState<number>(24)
  const [ph, setPh] = useState<number>(6.5)
  const [npk, setNpk] = useState<number>(140)

  const prediction = useMemo(() => {
    let score = 0

    // Kelembaban optimal: 60-70%, acceptable: 50-75%
    if (moisture >= 60 && moisture <= 70) score += 30
    else if (moisture >= 50 && moisture <= 75) score += 20
    else if (moisture >= 40 && moisture <= 85) score += 10
    else score += 0

    // Suhu optimal: 20-24°C, acceptable: 18-26°C
    if (temp >= 20 && temp <= 24) score += 25
    else if (temp >= 18 && temp <= 26) score += 18
    else if (temp >= 15 && temp <= 30) score += 8
    else score += 0

    // pH optimal: 6.0-6.5, acceptable: 5.5-7.0
    if (ph >= 6.0 && ph <= 6.5) score += 25
    else if (ph >= 5.5 && ph <= 7.0) score += 15
    else if (ph >= 5.0 && ph <= 7.5) score += 5
    else score += 0

    // NPK gradual scoring (ppm)
    if (npk >= 140) score += 20
    else if (npk >= 120) score += 15
    else if (npk >= 100) score += 10
    else if (npk >= 80) score += 5
    else score += 0

    let status = "Sangat Baik (Optimal)"
    let color = "text-neura-cyan border-neura-cyan/40 bg-neura-cyan/10"
    let recommendation = "Kondisi tanah ideal untuk tanaman kopi Arabika. Lanjutkan pola irigasi saat ini."

    if (score < 40) {
      status = "Kurang Ideal (Perlu Tindakan)"
      color = "text-red-400 border-red-500/40 bg-red-500/10"
      recommendation = "Kondisi tanah di luar batas optimal. Disarankan: penyesuaian irigasi (jika kelembaban rendah/tinggi), penambahan kapur/belerang (jika pH tidak sesuai), dan pemupukan NPK."
    } else if (score < 70) {
      status = "Cukup (Perlu Monitoring)"
      color = "text-neura-amber border-neura-amber/40 bg-neura-amber/10"
      recommendation = "Kualitas tanah sedang. Monitor tren harian dan berikan penyesuaian bertahap pada parameter yang belum optimal."
    }

    return { score, status, color, recommendation }
  }, [moisture, temp, ph, npk])

  return (
    <div className="glass p-6 rounded-3xl border border-white/15 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neura-amber flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Dashboard IoT Real-Time (Random Forest Predictor)
          </span>
          <h3 className="text-xl font-bold font-display text-white">Monitoring Perkebunan Kopi</h3>
        </div>
        <div className={`px-4 py-2 rounded-2xl border text-xs font-bold ${prediction.color}`}>
          Prediksi: {prediction.status}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sensor 1: Kelembaban */}
        <div className="p-4 glass rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neura-muted flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-neura-cyan" /> Kelembaban
            </span>
            <span className="font-mono font-bold text-neura-cyan">{moisture}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={moisture}
            onChange={(e) => setMoisture(parseInt(e.target.value))}
            className="w-full accent-neura-cyan cursor-pointer"
          />
        </div>

        {/* Sensor 2: Suhu Tanah */}
        <div className="p-4 glass rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neura-muted flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-neura-amber" /> Suhu Lahan
            </span>
            <span className="font-mono font-bold text-neura-amber">{temp}°C</span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            value={temp}
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full accent-neura-amber cursor-pointer"
          />
        </div>

        {/* Sensor 3: pH Tanah */}
        <div className="p-4 glass rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neura-muted flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" /> pH Tanah
            </span>
            <span className="font-mono font-bold text-purple-400">{ph}</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="9.0"
            step="0.1"
            value={ph}
            onChange={(e) => setPh(parseFloat(e.target.value))}
            className="w-full accent-purple-400 cursor-pointer"
          />
        </div>

        {/* Sensor 4: Kadar NPK */}
        <div className="p-4 glass rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neura-muted flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-green-400" /> Kadar NPK
            </span>
            <span className="font-mono font-bold text-green-400">{npk} ppm</span>
          </div>
          <input
            type="range"
            min="50"
            max="250"
            value={npk}
            onChange={(e) => setNpk(parseInt(e.target.value))}
            className="w-full accent-green-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Recommendation Box */}
      <div className="p-4 glass rounded-2xl border-l-4 border-neura-cyan flex items-start gap-3 bg-white/5">
        <Sparkles className="w-5 h-5 text-neura-cyan shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Rekomendasi Otomatis Model ML:</h4>
          <p className="text-xs text-neura-muted leading-relaxed">{prediction.recommendation}</p>
        </div>
      </div>
    </div>
  )
}
