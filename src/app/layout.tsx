import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { AmbientBackground } from "@/components/ui/AmbientBackground"
import { ToastContainer } from "@/components/ui/Toast"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import "./globals.css"

export const metadata: Metadata = {
  title: "Neura — Platform Belajar Machine Learning Interaktif",
  description: "Belajar Machine Learning dari fundamental, algoritma, kode, hingga simulasi interaktif — tanpa instalasi. Bahasa Indonesia.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen gradient-aurora node-bg relative text-white selection:bg-neura-cyan/20">
        <AmbientBackground />
        <Navbar />
        <ErrorBoundary>
          <main className="relative z-10">{children}</main>
        </ErrorBoundary>
        <ToastContainer />
      </body>
    </html>
  )
}
