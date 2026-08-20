"use client"

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-neura-deep" aria-hidden>
      {/* Satu glow aksen statis (tanpa animasi orb) */}
      <div className="absolute -top-40 right-[8%] w-[520px] h-[520px] rounded-full bg-neura-cyan/[0.05] blur-[140px]" />
      {/* Grid hairline halus */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  )
}