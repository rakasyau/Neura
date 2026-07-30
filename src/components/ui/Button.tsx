"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  href?: string
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-[20px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neura-cyan/50"

  const variants = {
    primary: "bg-neura-cyan text-neura-deep hover:bg-neura-cyan/90 shadow-lg shadow-neura-cyan/20",
    secondary: "glass glass-hover text-neura-text",
    ghost: "text-neura-muted hover:text-neura-text hover:bg-white/5",
    outline: "border border-white/20 text-neura-text hover:bg-white/5",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, variants[variant], sizes[size], loading && "opacity-70", className)}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  )
}
