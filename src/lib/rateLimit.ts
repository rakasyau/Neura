const rateMap = new Map<string, { count: number; resetAt: number }>()

const DEFAULT_MAX = 20
const DEFAULT_WINDOW_MS = 60 * 1000

export function checkRateLimit(
  key: string,
  maxRequests = DEFAULT_MAX,
  windowMs = DEFAULT_WINDOW_MS
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}

setInterval(() => {
  const now = Date.now()
  rateMap.forEach((entry, key) => {
    if (now > entry.resetAt) rateMap.delete(key)
  })
}, 60 * 1000)
