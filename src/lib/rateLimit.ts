const rateMap = new Map<string, { count: number; resetAt: number }>()

const DEFAULT_MAX = 20
const DEFAULT_WINDOW_MS = 60 * 1000

export function checkRateLimit(
  key: string,
  maxRequests = DEFAULT_MAX,
  windowMs = DEFAULT_WINDOW_MS
): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Lazy cleanup: remove expired entries on each call instead of using setInterval
  // This prevents memory leaks in dev servers and is serverless-friendly
  if (rateMap.size > 100) {
    rateMap.forEach((entry, k) => {
      if (now > entry.resetAt) rateMap.delete(k)
    })
  }

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
