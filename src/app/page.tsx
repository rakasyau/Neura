"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Play, FlaskConical, Leaf } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { modules } from "@/lib/data"

const fadeUp = {
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
}

const algorithms = [
  { name: "Linear Regression", num: "01" },
  { name: "Decision Tree", num: "02" },
  { name: "Random Forest", num: "03" },
  { name: "SVM", num: "04" },
  { name: "KNN", num: "05" },
  { name: "Gradient Boosting", num: "06" },
  { name: "Neural Network", num: "07" },
  { name: "K-Means", num: "08" },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero — split asimetris: proposisi kiri, indeks kurikulum kanan */}
      <section className="relative px-4 pt-32 pb-20">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          <div className="max-w-prose">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-neura-cyan"
            >
              Platform Belajar ML Interaktif
            </motion.div>
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-4xl md:text-6xl font-bold font-display tracking-tight leading-[1.05] text-balance"
            >
              Belajar Machine Learning{" "}
              <span className="text-neura-cyan">secara Visual</span>
            </motion.h1>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-lg text-neura-muted max-w-[52ch] leading-relaxed"
            >
              Dari fundamental, ragam algoritma, kode Python, hingga simulasi
              interaktif — semuanya tanpa instalasi, dalam Bahasa Indonesia.
            </motion.p>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
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
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-14 flex items-center gap-0 divide-x divide-neura-line border-y border-neura-line"
            >
              {[
                { value: `${modules.length}`, label: "Modul Lengkap" },
                { value: "8", label: "Algoritma" },
                { value: "100%", label: "Gratis" },
              ].map((stat) => (
                <div key={stat.label} className="py-5 pr-10 pl-0 first:pl-0 last:pr-0">
                  <div className="text-2xl md:text-3xl font-bold font-display text-white">{stat.value}</div>
                  <div className="text-xs text-neura-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indeks kurikulum bernomor — daftar editorial dengan hairline */}
          <motion.aside
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="border border-neura-line rounded-panel bg-neura-panel/60"
          >
            <div className="px-6 py-4 border-b border-neura-line flex items-center justify-between">
              <span className="mono-label">Kurikulum</span>
              <span className="font-mono text-[11px] text-neura-cyan">{modules.length} MODUL</span>
            </div>
            <ul className="divide-y divide-neura-line">
              {modules.map((mod, i) => (
                <li key={mod.id}>
                  <Link
                    href={`/belajar/${mod.id}`}
                    className="group flex items-center gap-5 px-6 py-4 hover:bg-neura-raised/60 transition-colors"
                  >
                    <span className="font-mono text-sm text-neura-cyan/80 group-hover:text-neura-cyan">
                      {String(mod.number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-white truncate">{mod.title}</span>
                      <span className="block text-xs text-neura-muted mt-0.5 truncate">{mod.chapters.length} bab · {mod.totalDuration} menit</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-neura-muted/50 group-hover:text-neura-cyan group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </section>

      {/* Modul Pembelajaran */}
      <section className="px-4 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-prose mx-auto">
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mt-10">Jalur Belajar Terstruktur</h2>
              </div>
              <p className="text-neura-muted max-w-md text-sm leading-relaxed">
                Dari nol hingga siap riset — {modules.length} modul yang dirancang mengikuti kurikulum akademik ML.
              </p>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <Link key={mod.id} href={`/belajar/${mod.id}`}>
                <GlassCard delay={i * 0.08} className="h-full cursor-pointer group">
                  <div className="max-w-prose">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="mono-label text-neura-cyan mb-3">Modul {String(mod.number).padStart(2, "0")}</div>
                        <h3 className="text-lg font-bold font-display text-white">{mod.title}</h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neura-muted/40 group-hover:text-neura-cyan group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-neura-muted mb-4 line-clamp-2 leading-relaxed">{mod.description}</p>
                    <div className="flex items-center gap-5 text-xs text-neura-muted pt-4 border-t border-neura-line">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {mod.chapters.length} bab
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5" />
                        {mod.totalDuration} menit
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ensiklopedia Algoritma */}
      <section className="px-4 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-prose mx-auto">
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mt-10">Ensiklopedia Algoritma</h2>
              </div>
              <Link href="/algoritma">
                <Button variant="ghost">
                  Lihat Semua <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {algorithms.map((algo, i) => (
              <Link
                key={algo.num}
                href={`/algoritma/${algo.name.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "").replace(/[^a-z0-9-]/g, "")}`}
              >
                <motion.div
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: i * 0.06 }}
                                  className="group border border-neura-line rounded-panel bg-neura-panel/60 p-5 hover:bg-neura-raised hover:border-neura-cyan/40 hover:-translate-y-0.5 transition-all cursor-pointer min-h-[80px] flex items-center"
                                >
                  <h3 className="font-semibold text-sm text-white mt-2">{algo.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Studi Kasus */}
      <section className="px-4 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <GlassCard className="relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="max-w-prose">
                <span className="inline-flex items-center gap-2 px-3 py-1 border border-neura-line rounded-full text-xs text-neura-amber mb-4">
                  <FlaskConical className="w-3 h-3" />
                  Studi Kasus Unggulan
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-display tracking-tight mb-4 mt-10">
                  Monitoring Tanah IoT untuk{" "}
                  <span className="text-neura-cyan">Budidaya Kopi Presisi</span>
                </h2>
                <p className="text-neura-muted mb-6 leading-relaxed">
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
              <div className="relative h-64 md:h-80 rounded-panel overflow-hidden border border-neura-line bg-neura-panel/60">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="w-14 h-14 text-neura-cyan/30 mx-auto mb-4" />
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
        <div className="max-w-[800px] mx-auto text-center">
          <div className="max-w-prose mx-auto">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-4">
              Siap Memulai Perjalanan ML-mu?
            </h2>
            <p className="text-neura-muted mb-8 max-w-[52ch] mx-auto leading-relaxed">
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
      </div>
      </section>
    </div>
  )
}