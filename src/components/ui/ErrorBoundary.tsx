"use client"

import { Component, ReactNode } from "react"
import Link from "next/link"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    console.error("[ErrorBoundary]", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-neura-deep">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold font-display text-white mb-2">Terjadi Kesalahan</h1>
            <p className="text-sm text-neura-muted mb-6">
              Aplikasi mengalami error yang tidak terduga. Silakan muat ulang halaman.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-neura-cyan text-neura-deep font-bold rounded-panel text-sm hover:bg-neura-cyan/90 transition-all"
              >
                Muat Ulang Halaman
              </button>
              <Link
                href="/"
                className="px-6 py-3 glass text-white font-bold rounded-panel text-sm hover:bg-neura-raised transition-all"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
