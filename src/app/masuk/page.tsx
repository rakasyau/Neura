"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Brain, User, Lock, ArrowRight, AlertCircle } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { notify } from "@/components/ui/Toast"

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
            auto_select?: boolean
          }) => void
          renderButton: (
            element: HTMLElement | null,
            options: { theme: string; size: string; text?: string; width?: number }
          ) => void
          prompt: () => void
        }
      }
    }
  }
}

function MasukForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get("redirect") || "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const googleButtonRef = useRef<HTMLDivElement>(null)
  const gisLoadedRef = useRef(false)

  useEffect(() => {
    if (googleButtonRef.current && !gisLoadedRef.current) {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      if (!clientId) return

      if (window.google?.accounts) {
        gisLoadedRef.current = true
        renderGoogleButton(clientId)
        return
      }

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = () => {
        gisLoadedRef.current = true
        renderGoogleButton(clientId)
      }
      document.body.appendChild(script)
    }
  }, [])

  function renderGoogleButton(clientId: string) {
    if (!window.google?.accounts || !googleButtonRef.current) return
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCredential,
    })
    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      text: "signin_with",
      width: googleButtonRef.current.offsetWidth || 320,
    })
  }

  const handleGoogleCredential = async (response: { credential: string }) => {
    setGoogleLoading(true)
    setErrorMsg("")

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        notify("Login Berhasil!", `Selamat datang kembali, ${data.user.name}!`, "achievement")
        router.push(redirectTarget)
        router.refresh()
      } else {
        setErrorMsg(data.error || "Gagal autentikasi Google.")
        notify("Gagal Masuk", data.error || "Gagal autentikasi Google.", "error")
      }
    } catch {
      setErrorMsg("Terjadi kendala jaringan saat autentikasi Google.")
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMsg("Mohon isi email dan password")
      return
    }

    setLoading(true)
    setErrorMsg("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        notify("Login Berhasil!", `Selamat datang kembali, ${data.user.name}!`, "achievement")
        router.push(redirectTarget)
        router.refresh()
      } else {
        const msg = data.error || "Gagal masuk. Periksa kembali email dan password."
        setErrorMsg(msg)
        notify("Gagal Masuk", msg, "error")
      }
    } catch {
      setErrorMsg("Terjadi kendala jaringan saat mencoba masuk.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <GlassCard className="p-8 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-3xl bg-neura-cyan/20 border border-neura-cyan/40 text-neura-cyan flex items-center justify-center mx-auto mb-4 shadow-lg shadow-neura-cyan/20">
            <Brain className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">Masuk ke Neura</h1>
          <p className="text-xs sm:text-sm text-neura-muted">Akses Dashboard Pembelajaran & AI Agent</p>
        </div>

        {/* Error Message Alert */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google Sign-In Button (proper OAuth via GIS) */}
        {googleLoading ? (
          <div className="w-full py-3 mb-6 flex items-center justify-center gap-2 glass rounded-2xl text-xs text-neura-muted">
            <div className="w-4 h-4 rounded-full border-2 border-neura-cyan border-t-transparent animate-spin" />
            Memproses Google Sign-In...
          </div>
        ) : (
          <div ref={googleButtonRef} className="w-full flex justify-center mb-6 min-h-[40px]" />
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-neura-muted uppercase tracking-wider">atau dengan email</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neura-muted uppercase tracking-wider mb-2">Email</label>
            <div className="relative">
              <User className="w-4 h-4 text-neura-muted absolute left-4 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-neura-muted/50 focus:outline-none focus:border-neura-cyan transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neura-muted uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neura-muted absolute left-4 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-neura-muted/50 focus:outline-none focus:border-neura-cyan transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-neura-cyan text-neura-deep font-bold rounded-2xl text-xs sm:text-sm hover:bg-neura-cyan/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-neura-cyan/25 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk ke Akun"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-neura-muted">
          Belum punya akun?{" "}
          <Link href={`/daftar${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ""}`} className="text-neura-cyan font-bold hover:underline">
            Daftar Sekarang
          </Link>
        </div>
      </GlassCard>

    </>
  )
}

export default function MasukPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center relative z-10">
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Suspense fallback={<div className="text-center text-neura-muted text-xs">Memuat Form...</div>}>
            <MasukForm />
          </Suspense>
        </motion.div>
      </div>
    </div>
  )
}
