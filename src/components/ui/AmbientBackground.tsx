"use client"

import { motion } from "framer-motion"

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050811]">
      {/* Dynamic Ambient Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[160px]"
      />

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(94,234,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  )
}
