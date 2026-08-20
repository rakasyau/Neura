"use client"

import { useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, User, ArrowRight } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

interface AuthGuardProps {
  children: ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me")
        const data = await res.json()
        if (data.authenticated) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
      } catch {
        setAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-neura-muted">
          <div className="w-8 h-8 rounded-full border-2 border-neura-cyan border-t-transparent animate-spin" />
          <span className="text-xs font-mono">Memeriksa Akses Autentikasi...</span>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center relative z-10">
        <div className="w-full max-w-lg">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <GlassCard className="p-8 sm:p-10 border border-neura-line text-center shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 rounded-panel bg-neura-amber/20 border border-neura-amber/40 text-neura-amber flex items-center justify-center mx-auto mb-5 shadow-lg shadow-neura-amber/20">
                <Lock className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                Login Diperlukan
              </h1>
              <p className="text-xs sm:text-sm text-neura-muted leading-relaxed mb-8 max-w-md mx-auto">
                Fitur pembelajaran Neura hanya dapat diakses oleh pengguna yang sudah masuk. Silakan buat akun gratis atau masuk untuk melanjutkan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={`/masuk?redirect=${encodeURIComponent(pathname)}`} className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full justify-center gap-2">
                    <User className="w-4 h-4" /> Masuk ke Akun
                  </Button>
                </Link>
                <Link href={`/daftar?redirect=${encodeURIComponent(pathname)}`} className="w-full sm:w-auto">
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

  return <>{children}</>
}
