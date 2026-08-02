"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Grid3X3, FlaskConical, Play, Brain, Layers, Target, BarChart, Leaf } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { modules } from "@/lib/data"

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  grid: <Grid3X3 className="w-6 h-6" />,
  "bar-chart": <BarChart className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(94,234,212,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm text-neura-cyan mb-6">
              <span className="w-2 h-2 rounded-full bg-neura-cyan animate-pulse" />
              Platform Belajar ML Interaktif #1 di Indonesia
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-balance leading-tight mb-6"
          >
            Belajar{" "}
            <span className="gradient-text">Machine Learning</span>
            <br />
            secara Visual
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-neura-muted max-w-2xl mx-auto mb-8"
          >
            Dari fundamental, ragam algoritma, kode Python, hingga simulasi interaktif — semuanya tanpa instalasi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/belajar">
              <Button variant="primary" size="lg">
                Mulai Belajar Gratis
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/algoritma">
              <Button variant="secondary" size="lg">
                Jelajahi Algoritma
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: `${modules.length}`, label: "Modul Lengkap" },
              { value: "8", label: "Algoritma" },
              { value: "100%", label: "Gratis" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold font-display gradient-text">{stat.value}</div>
                <div className="text-sm text-neura-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modul Pembelajaran */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Jalur Belajar Terstruktur</h2>
            <p className="text-neura-muted max-w-xl mx-auto">
              Dari nol hingga siap riset — {modules.length} modul yang dirancang mengikuti kurikulum akademik ML.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <Link key={mod.id} href={`/belajar/${mod.id}`}>
                <GlassCard delay={i * 0.1} className="h-full cursor-pointer group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-neura-cyan/10 flex items-center justify-center text-neura-cyan shrink-0 group-hover:scale-110 transition-transform">
                      {iconMap[mod.icon]}
                    </div>
                    <div>
                      <div className="text-xs text-neura-muted font-medium mb-1">
                        Modul {String(mod.number).padStart(2, "0")}
                      </div>
                      <h3 className="text-lg font-bold font-display">{mod.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-neura-muted mb-4 line-clamp-2">{mod.description}</p>
                  <div className="flex items-center gap-4 text-xs text-neura-muted">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {mod.chapters.length} bab
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {mod.totalDuration} menit
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ensiklopedia Algoritma */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Ensiklopedia Algoritma</h2>
              <p className="text-neura-muted max-w-xl">
                Jelajahi 8 algoritma ML utama lengkap dengan penjelasan, kode, dan simulasi interaktif.
              </p>
            </div>
            <Link href="/algoritma">
              <Button variant="ghost" className="mt-4 md:mt-0">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Linear Regression", num: "01", color: "from-cyan-500/20 to-cyan-500/5" },
              { name: "Decision Tree", num: "02", color: "from-amber-500/20 to-amber-500/5" },
              { name: "Random Forest", num: "03", color: "from-green-500/20 to-green-500/5" },
              { name: "SVM", num: "04", color: "from-purple-500/20 to-purple-500/5" },
              { name: "KNN", num: "05", color: "from-pink-500/20 to-pink-500/5" },
              { name: "Gradient Boosting", num: "06", color: "from-orange-500/20 to-orange-500/5" },
              { name: "Neural Network", num: "07", color: "from-blue-500/20 to-blue-500/5" },
              { name: "K-Means", num: "08", color: "from-teal-500/20 to-teal-500/5" },
            ].map((algo, i) => (
              <Link key={algo.num} href={`/algoritma/${algo.name.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "").replace(/[^a-z0-9-]/g, "")}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`glass rounded-[20px] p-5 glass-hover cursor-pointer bg-gradient-to-br ${algo.color}`}
                >
                  <div className="text-2xl font-bold font-mono text-neura-cyan mb-2">#{algo.num}</div>
                  <h3 className="font-semibold text-sm text-white">{algo.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Studi Kasus */}
      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <GlassCard glow className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(94,234,212,0.06)_0%,_transparent_60%)]" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-xs text-neura-amber mb-4">
                  <FlaskConical className="w-3 h-3" />
                  Studi Kasus Unggulan
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                  Monitoring Tanah IoT untuk{" "}
                  <span className="gradient-text">Budidaya Kopi Presisi</span>
                </h2>
                <p className="text-neura-muted mb-6">
                  Pelajari bagaimana Random Forest digunakan untuk memprediksi kualitas tanah dari data
                  sensor IoT — studi kasus end-to-end dari sensor ke rekomendasi.
                </p>
                <Link href="/studi-kasus">
                  <Button variant="primary">
                    Jelajahi Studi Kasus
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative h-64 md:h-80 rounded-[24px] overflow-hidden glass">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="w-16 h-16 text-neura-cyan/30 mx-auto mb-4" />
                    <div className="text-sm text-neura-muted">Visualisasi Dashboard IoT</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Siap Memulai Perjalanan ML-mu?
            </h2>
            <p className="text-neura-muted mb-8">
              Tidak perlu instalasi. Tidak perlu pengalaman. Langsung praktik dari browser.
            </p>
            <Link href="/belajar">
              <Button variant="primary" size="lg">
                Mulai Belajar Sekarang
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
