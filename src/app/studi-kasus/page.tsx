"use client"

import { motion } from "framer-motion"
import { Leaf, Wifi, Database, Brain, BarChart, Smartphone } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { IoTSensorDashboard } from "@/components/features/IoTSensorDashboard"
import { AuthGuard } from "@/components/auth/AuthGuard"

const steps = [
  { icon: Leaf, title: "Sensor Tersebar di Lahan", desc: "Sensor IoT mengukur kelembaban, suhu, pH tanah, dan curah hujan di area perkebunan kopi." },
  { icon: Wifi, title: "Data Dikirim ke Cloud", desc: "Data sensor dikirim secara nirkabel ke server cloud untuk diproses lebih lanjut." },
  { icon: Database, title: "Preprocessing Data", desc: "Data dibersihkan, dinormalisasi, dan diformat untuk siap digunakan oleh model ML." },
  { icon: Brain, title: "Model ML (Random Forest)", desc: "Random Forest dilatih pada data historis untuk memprediksi kualitas tanah." },
  { icon: BarChart, title: "Evaluasi & Analisis", desc: "Model menghasilkan prediksi yang divisualisasikan dalam dashboard monitoring." },
  { icon: Smartphone, title: "Rekomendasi ke Petani", desc: "Rekomendasi tindakan dikirim ke aplikasi mobile petani secara real-time." },
]

export default function StudiKasusPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-xs text-neura-amber mb-4">
              <Leaf className="w-3 h-3" />
              Studi Kasus Unggulan
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-3">
              IoT Pertanian Presisi untuk Budidaya Kopi
            </h1>
            <p className="text-neura-muted text-base max-w-3xl leading-relaxed">
              Studi kasus terapan integrasi sensor Internet of Things (IoT) dengan algoritma Machine Learning
              Random Forest untuk pemantauan kualitas tanah perkebunan kopi secara real-time.
            </p>
          </motion.div>

          <GlassCard>
            <h2 className="text-xl font-bold font-display mb-6">Alur Kerja Sistem IoT + ML</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 glass rounded-[18px] flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-neura-cyan/10 flex items-center justify-center text-neura-cyan shrink-0 font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <s.icon className="w-4 h-4 text-neura-cyan" />
                      {s.title}
                    </h3>
                    <p className="text-xs text-neura-muted leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <IoTSensorDashboard />
          </motion.div>

          <GlassCard>
            <h2 className="text-xl font-bold font-display mb-4">Mengapa Random Forest Cocok?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Feature Importance", desc: "RF memberikan skor pentingnya fitur — petani dapat melihat variabel mana (misal: kelembaban vs pH) yang paling kritis." },
                { title: "Robust terhadap Noise", desc: "Data sensor lapangan sering noisy — Random Forest tangguh terhadap outlier." },
                { title: "Tidak Perlu Scaling", desc: "Data sensor memiliki skala berbeda (suhu 0-40°C, pH 4-9) — RF tidak memerlukan normalisasi." },
              ].map((item) => (
                <div key={item.title} className="p-4 glass rounded-[16px]">
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-neura-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AuthGuard>
  )
}
