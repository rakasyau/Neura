import type { Metadata } from "next"
import { Archivo, JetBrains_Mono } from "next/font/google"
import { MotionConfig } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { AmbientBackground } from "@/components/ui/AmbientBackground"
import { ToastContainer } from "@/components/ui/Toast"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import "./globals.css"

const display = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Neura — Platform Belajar Machine Learning Interaktif",
  description: "Belajar Machine Learning dari fundamental, algoritma, kode, hingga simulasi interaktif — tanpa instalasi. Bahasa Indonesia.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${display.variable} ${mono.variable} min-h-screen bg-neura-deep text-white relative font-body antialiased selection:bg-neura-cyan/20`}
      >
        {/* THESIS: Editorial dark-tech untuk belajar ML — menolak centered-glass-hero template AI. OWN-WORLD: panel solid, hairline borders, satu aksen cyan, grotesk editorial (Archivo) + mono JetBrains, skala radius konsisten (10px), indeks bernomor mono. STORY: mahasiswa Indonesia membaca kurikulum ML sebagai meja editorial yang rapi: hierarki jelas, simulasi sebagai bukti. FIRST VIEWPORT: split asimetris — kiri proposisi + CTA, kanan indeks kurikulum bernomor (01–06), aksen tunggal. FORM: editorial-tech (varias tinggi, motion rendah). FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
        <AmbientBackground />
        <Navbar />
        <ErrorBoundary>
          <MotionConfig reducedMotion="user">
            <main className="relative z-10">{children}</main>
          </MotionConfig>
        </ErrorBoundary>
        <ToastContainer />
      </body>
    </html>
  )
}