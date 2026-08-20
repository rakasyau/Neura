"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
  style?: React.CSSProperties
}

export function GlassCard({ children, className, hover = true, delay = 0, style }: GlassCardProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "glass rounded-panel p-6 md:p-8",
        hover && "glass-hover",
        className
      )}
      style={style}
    >
      {children}
    </motion.div>
  )
}