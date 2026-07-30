"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = true, glow = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "glass rounded-[32px] p-6 md:p-8",
        hover && "glass-hover",
        glow && "shadow-lg shadow-neura-cyan/5",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
