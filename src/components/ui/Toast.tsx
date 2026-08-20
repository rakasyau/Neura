"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Sparkles, AlertCircle, Info, X } from "lucide-react"

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: "success" | "info" | "achievement" | "error"
}

let toastListeners: ((toast: ToastMessage) => void)[] = []

export function notify(title: string, description?: string, type: "success" | "info" | "achievement" | "error" = "success") {
  const toast: ToastMessage = {
    id: Math.random().toString(36).substring(2, 9),
    title,
    description,
    type,
  }
  toastListeners.forEach((listener) => listener(toast))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    const handleToast = (toast: ToastMessage) => {
      setToasts((prev) => [...prev.slice(-3), toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000)
    }

    toastListeners.push(handleToast)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== handleToast)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-auto glass-strong p-4 rounded-panel shadow-2xl border border-neura-line flex items-start gap-3 bg-neura-deep/90 backdrop-blur-xl"
          >
            {toast.type === "achievement" ? (
              <div className="w-9 h-9 rounded-xl bg-neura-amber/20 text-neura-amber flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            ) : toast.type === "error" ? (
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            ) : toast.type === "info" ? (
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-neura-cyan/20 text-neura-cyan flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold font-display text-white">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-neura-muted mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-neura-muted hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
