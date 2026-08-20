"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"
import { Loader2 } from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
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
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neura-cyan/60"

  const variants = {
    primary: "bg-neura-cyan text-neura-deep hover:bg-neura-cyan/90",
    secondary: "bg-neura-panel border border-neura-line text-neura-text hover:border-neura-cyan/50 hover:bg-neura-raised",
    ghost: "text-neura-muted hover:text-neura-text hover:bg-neura-raised",
    outline: "border border-neura-line text-neura-text hover:border-neura-cyan/50 hover:bg-neura-raised",
  }

  const sizes = {
    sm: "px-4 py-2.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  }

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, variants[variant], sizes[size], loading && "opacity-70", className)}
      disabled={disabled || loading}
      {...(props as HTMLMotionProps<"button">)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  )
}