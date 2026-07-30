"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  BarChart,
  Award,
  Clock,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Download,
  X,
  Lock,
  Bot,
  User as UserIcon,
  LogOut,
  ArrowRight,
  MessageSquare
} from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { modules, algorithms } from "@/lib/data"
import { useUserStats } from "@/lib/store"
import { notify } from "@/components/ui/Toast"
import { AIChatWidget } from "@/components/features/AIChatWidget"

interface UserData {
  id: string
  name: string
  email: string
  xp: number
  completedChapters: string[]
  badges: string[]
  createdAt?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "ai-chat" | "certificate">("overview")
  const [showCertModal, setShowCertModal] = useState(false)
  const { stats } = useUserStats()

  // Fetch Session User from MongoDB API
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()

        if (data.authenticated && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      notify("Berhasil Keluar", "Anda telah keluar dari akun.", "info")
      router.push("/masuk")
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-neura-muted">
          <div className="w-8 h-8 rounded-full border-2 border-neura-cyan border-t-transparent animate-spin" />
          <span className="text-xs font-mono">Memuat Dashboard & Sesi User...</span>
        </div>
      </div>
    )
  }

  // 2. Protected Screen: If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <GlassCard className="p-8 sm:p-10 border border-white/15 text-center shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-3xl bg-neura-amber/20 border border-neura-amber/40 text-neura-amber flex items-center justify-center mx-auto mb-5 shadow-lg shadow-neura-amber/20">
                <Lock className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                Akses Terkunci
              </h1>
              <p className="text-xs sm:text-sm text-neura-muted leading-relaxed mb-8 max-w-md mx-auto">
                Halaman Dashboard dan **Neura AI Assistant** hanya dapat diakses oleh pengguna yang sudah masuk. Silakan buat akun atau masuk untuk menyimpan progress Anda di database.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/masuk" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full justify-center gap-2">
                    <UserIcon className="w-4 h-4" /> Masuk ke Akun
                  </Button>
                </Link>
                <Link href="/daftar" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full justify-center gap-2">
                    Daftar Akun Baru <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    )
  }

  // 3. Logged-in User Dashboard
  const validChapterIds = new Set(modules.flatMap((m) => m.chapters.map((c) => c.id)))
  const combinedCompleted = Array.from(
    new Set([...(user.completedChapters || []), ...(stats.completedChapters || [])])
  ).filter((id) => validChapterIds.has(id))

  const completedChaptersCount = combinedCompleted.length
  const totalChapters = validChapterIds.size
  const progressPercent = Math.min(100, Math.round((completedChaptersCount / totalChapters) * 100))
  const displayXp = Math.max(user.xp || 0, stats.xp || 0)
  const displayBadges = Array.from(new Set([...(user.badges || []), ...(stats.badges || [])]))

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header User Profile Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="relative overflow-hidden border border-white/15 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-neura-cyan to-indigo-600 text-neura-deep flex items-center justify-center text-2xl font-bold font-display shadow-xl shadow-neura-cyan/20 border border-white/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">{user.name}</h1>
                  </div>
                  <p className="text-xs sm:text-sm text-neura-muted">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs font-bold font-mono text-amber-400">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {displayXp} XP
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-2xl text-xs font-bold text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Dashboard Tab Navigation */}
        <div className="flex gap-2 p-1.5 glass rounded-2xl w-fit border border-white/15">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-neura-cyan text-neura-deep shadow-lg shadow-neura-cyan/20"
                : "text-neura-muted hover:text-white"
            }`}
          >
            <BarChart className="w-4 h-4" />
            Ringkasan Belajar
          </button>
          <button
            onClick={() => setActiveTab("ai-chat")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "ai-chat"
                ? "bg-neura-cyan text-neura-deep shadow-lg shadow-neura-cyan/20"
                : "text-neura-muted hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            Neura AI Assistant
          </button>
          <button
            onClick={() => setActiveTab("certificate")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "certificate"
                ? "bg-neura-cyan text-neura-deep shadow-lg shadow-neura-cyan/20"
                : "text-neura-muted hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            Sertifikat Kelulusan
          </button>
        </div>

        {/* Tab Content: 1. Overview */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neura-muted">Total XP</span>
                  <Sparkles className="w-4 h-4 text-neura-amber" />
                </div>
                <div className="text-2xl font-bold font-mono text-neura-amber">{displayXp}</div>
                <span className="text-[10px] text-neura-muted">Poin Prestasi</span>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neura-muted">Bab Selesai</span>
                  <BookOpen className="w-4 h-4 text-neura-cyan" />
                </div>
                <div className="text-2xl font-bold font-mono text-neura-cyan">
                  {completedChaptersCount}/{totalChapters}
                </div>
                <span className="text-[10px] text-neura-muted">{progressPercent}% Keseluruhan</span>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neura-muted">Algoritma Dikuasai</span>
                  <BarChart className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-green-400">{algorithms.length}</div>
                <span className="text-[10px] text-neura-muted">Ensiklopedia ML</span>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neura-muted">Lencana Keahlian</span>
                  <Award className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-purple-400">{displayBadges.length}</div>
                <span className="text-[10px] text-neura-muted">Badge Dihasilkan</span>
              </GlassCard>
            </div>

            {/* Overall Progress Progress Bar */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neura-cyan" />
                  <h3 className="font-bold text-sm text-white">Kemajuan Pembelajaran Kurikulum Neura</h3>
                </div>
                <span className="text-xs font-mono text-neura-cyan font-bold">{progressPercent}% Selesai</span>
              </div>
              <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-neura-cyan to-indigo-500 rounded-full transition-all duration-500 shadow-sm shadow-neura-cyan/50"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>
            </GlassCard>

            {/* Badges List */}
            <GlassCard className="p-6">
              <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> Lencana Pencapaian
              </h3>
              <div className="flex flex-wrap gap-3">
                {displayBadges.map((badge, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    {badge}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab Content: 2. Neura AI Assistant Chat */}
        {activeTab === "ai-chat" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <AIChatWidget userName={user.name} />
          </motion.div>
        )}

        {/* Tab Content: 3. Certificate */}
        {activeTab === "certificate" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {completedChaptersCount >= totalChapters ? (
              <GlassCard className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Seluruh Bab Selesai ({completedChaptersCount}/{totalChapters})
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">Sertifikat Kelulusan Neura ML</h3>
                  <p className="text-xs text-neura-muted max-w-md mx-auto leading-relaxed">
                    Selamat! Anda telah menyelesaikan seluruh kurikulum Machine Learning Neura atas nama **{user.name}**.
                  </p>
                </div>

                <div className="p-6 glass rounded-3xl border border-amber-500/30 max-w-xl mx-auto bg-black/40 text-left space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-xs text-neura-muted">Penerima Sertifikat</span>
                    <span className="text-sm font-bold text-white font-display">{user.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-xs text-neura-muted">Program</span>
                    <span className="text-xs font-bold text-neura-cyan">Neura Machine Learning Specialist</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-xs text-neura-muted">Total XP yang Didapat</span>
                    <span className="text-xs font-mono font-bold text-amber-400">{displayXp} XP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neura-muted">ID Verifikasi MongoDB</span>
                    <span className="text-[10px] font-mono text-neura-muted">{user.id}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowCertModal(true)
                    notify("Prinjinjauan Sertifikat", "Menampilkan sertifikat cetak untuk " + user.name, "info")
                  }}
                  className="px-6 py-3 bg-neura-cyan text-neura-deep font-bold rounded-2xl text-xs hover:bg-neura-cyan/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-neura-cyan/20"
                >
                  <Download className="w-4 h-4" /> Lihat & Unduh Sertifikat
                </button>
              </GlassCard>
            ) : (
              <GlassCard className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/15 text-neura-muted flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 stroke-[2]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold mb-2">
                    <Lock className="w-3.5 h-3.5" /> Akses Terkunci ({completedChaptersCount}/{totalChapters} Bab)
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">Sertifikat Belum Tersedia</h3>
                  <p className="text-xs text-neura-muted max-w-md mx-auto leading-relaxed">
                    Sertifikat kelulusan hanya dapat diunduh setelah menyelesaikan seluruh bab kurikulum. Selesaikan **{totalChapters - completedChaptersCount} bab lagi** untuk membuka sertifikat ini!
                  </p>
                </div>

                {/* Progress bar info */}
                <div className="p-6 glass rounded-3xl border border-white/10 max-w-xl mx-auto bg-black/40 text-left space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neura-muted">Kemajuan Kurikulum</span>
                    <span className="font-mono text-neura-cyan font-bold">{completedChaptersCount} dari {totalChapters} Bab ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-neura-cyan to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, progressPercent)}%` }}
                    />
                  </div>
                </div>

                <Link href="/belajar" className="inline-block">
                  <Button variant="primary" className="gap-2">
                    Lanjutkan Belajar Modul <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </GlassCard>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal Preview Sertifikat */}
      <AnimatePresence>
        {showCertModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl glass-strong rounded-3xl p-8 border border-amber-500/40 relative bg-[#090E1A] shadow-2xl text-center space-y-6"
            >
              <button
                onClick={() => setShowCertModal(false)}
                className="absolute top-4 right-4 p-2 glass rounded-xl text-neura-muted hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-4 border-double border-amber-500/50 p-8 rounded-2xl bg-gradient-to-b from-amber-500/5 to-transparent space-y-6">
                <div className="flex items-center justify-center gap-2 text-amber-400">
                  <Award className="w-8 h-8" />
                  <span className="text-xl font-bold font-display uppercase tracking-widest">Sertifikat Kelulusan</span>
                </div>
                <p className="text-xs text-neura-muted italic">Dengan ini menyatakan bahwa</p>
                <h2 className="text-3xl font-bold font-display text-white underline decoration-neura-cyan decoration-2 underline-offset-8">
                  {user.name}
                </h2>
                <p className="text-xs text-neura-muted max-w-lg mx-auto leading-relaxed">
                  Telah berhasil menyelesaikan seluruh kurikulum **Neura Machine Learning Academy**, menguasai 8 algoritma utama, studi kasus IoT, dan memperoleh total **{displayXp} XP**.
                </p>

                <div className="pt-6 border-t border-white/10 flex justify-between items-end text-xs text-neura-muted">
                  <div className="text-left font-mono text-[10px]">
                    ID: NEURA-{user.id.slice(-6).toUpperCase()}<br />
                    Database: MongoDB Verified
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white font-display">Neura AI Platform</div>
                    <div className="text-[10px] text-neura-cyan">Direksi Kurikulum ML</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setShowCertModal(false)}>
                  Tutup
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.print()
                  }}
                >
                  <Download className="w-4 h-4" /> Cetak / PDF
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
