"use client"

interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  label?: string
}

export function ProgressRing({ percentage, size = 80, strokeWidth = 4, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const color = percentage >= 80 ? "#5EEAD4" : percentage >= 50 ? "#F5A265" : "#9CA3C4"

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-lg font-bold font-display" style={{ color }}>
        {percentage}%
      </span>
      {label && (
        <span className="absolute -bottom-6 text-xs text-neura-muted whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  )
}
