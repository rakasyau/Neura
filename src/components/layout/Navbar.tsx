"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X, User, BookOpen, Grid3X3, FlaskConical, FileText, Sparkles, LayoutDashboard, Brain, LogOut } from "lucide-react"
import { CommandPalette } from "@/components/layout/CommandPalette"
import { notify } from "@/components/ui/Toast"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/belajar", label: "Belajar", icon: BookOpen },
  { href: "/algoritma", label: "Algoritma", icon: Grid3X3 },
  { href: "/studi-kasus", label: "Studi Kasus", icon: FlaskConical },
  { href: "/playground", label: "Playground", icon: FileText },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string; email: string; xp: number } | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Fetch session on load & route change
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
      }
    }
    checkAuth()
  }, [pathname])

  useEffect(() => {
    const handleOpen = () => setSearchOpen(true)
    window.addEventListener("open_command_palette", handleOpen)
    return () => window.removeEventListener("open_command_palette", handleOpen)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      notify("Berhasil Keluar", "Anda telah keluar dari akun.", "info")
      router.push("/masuk")
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <nav className="pill-nav max-w-6xl w-[calc(100%-32px)] h-14 px-3 sm:px-4 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 px-1 py-1 rounded-full hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-neura-cyan/15 border border-neura-cyan/30 flex items-center justify-center text-neura-cyan shadow-sm">
              <Brain className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-lg font-bold font-display text-white tracking-tight">
              Neura
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "bg-neura-cyan/15 text-neura-cyan font-bold border border-neura-cyan/30 shadow-sm"
                    : "text-neura-muted hover:text-white hover:bg-neura-raised"
                )}
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 h-10 px-3 text-xs text-neura-muted hover:text-white bg-neura-raised hover:bg-neura-raised rounded-full transition-all border border-neura-line"
            title="Cari (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-neura-cyan" />
            <span className="hidden xl:inline font-mono text-[11px] bg-neura-raised px-1.5 py-0.5 rounded text-neura-muted">⌘K</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* XP Badge (Only when logged in) */}
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-1.5 h-10 px-3 bg-neura-amber/10 border border-neura-amber/30 rounded-full text-xs font-bold font-mono text-neura-amber hover:bg-neura-amber/20 transition-all shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-neura-amber" />
                {user.xp} XP
              </Link>

              {/* User Profile Pill */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 h-8 px-2.5 glass rounded-full text-xs font-bold text-white hover:border-neura-cyan/40 transition-all border border-neura-line shrink-0 max-w-[130px] sm:max-w-[160px]"
              >
                <div className="w-5 h-5 rounded-full bg-neura-cyan text-neura-deep flex items-center justify-center text-[10px] font-bold shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate text-xs">{user.name.split(" ")[0]}</span>
              </Link>

              {/* Logout Icon Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center h-8 w-8 glass rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all border border-neura-line shrink-0"
                title="Keluar / Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link href="/masuk">
              <button className="flex items-center gap-1.5 h-10 px-3.5 text-xs font-bold text-neura-deep bg-neura-cyan rounded-full hover:bg-neura-cyan/90 transition-all shadow-md">
                <User className="w-3.5 h-3.5" />
                Masuk
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="lg:hidden flex items-center justify-center h-10 w-10 text-neura-muted hover:text-white bg-neura-raised rounded-full transition-all border border-neura-line ml-1"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="fixed top-20 left-4 right-4 z-40 glass-strong rounded-panel p-4 lg:hidden border border-neura-line bg-neura-deep/95 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-panel text-sm font-semibold transition-all",
                      isActive
                        ? "bg-neura-cyan/20 text-neura-cyan border border-neura-cyan/40"
                        : "text-neura-muted hover:text-white hover:bg-neura-raised"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                )
              })}
              <div className="pt-3 mt-1 border-t border-neura-line flex items-center justify-between gap-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-neura-amber/10 border border-neura-amber/30 rounded-panel text-xs font-bold font-mono text-neura-amber"
                    >
                      <Sparkles className="w-4 h-4" />
                      {user.xp} XP
                    </Link>
                    <button
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                      className="flex-1 py-2 text-xs font-bold text-red-300 bg-red-500/20 border border-red-500/30 rounded-panel flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </button>
                  </>
                ) : (
                  <Link href="/masuk" onClick={() => setOpen(false)} className="w-full">
                    <button className="w-full py-2.5 text-xs font-bold text-neura-deep bg-neura-cyan rounded-panel flex items-center justify-center gap-2">
                      <User className="w-4 h-4" /> Masuk ke Akun
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
