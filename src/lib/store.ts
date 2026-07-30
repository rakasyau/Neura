"use client"

import { useState, useEffect } from "react"

export interface UserStats {
  xp: number
  completedChapters: string[]
  completedQuizzes: Record<string, number>
  badges: string[]
  streak: number
}

const STORAGE_KEY = "neura_user_stats_v2"

const defaultStats: UserStats = {
  xp: 0,
  completedChapters: [],
  completedQuizzes: {},
  badges: [],
  streak: 0,
}

function getStoredStats(): UserStats {
  if (typeof window === "undefined") return defaultStats
  try {
    const item = localStorage.getItem(STORAGE_KEY)
    return item ? JSON.parse(item) : defaultStats
  } catch {
    return defaultStats
  }
}

function saveStoredStats(stats: UserStats) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
    window.dispatchEvent(new Event("neura_stats_updated"))
  } catch (e) {
    console.error("Failed to save user stats", e)
  }
}

async function syncToServer(stats: UserStats) {
  try {
    const res = await fetch("/api/auth/me")
    const data = await res.json()
    if (!data.authenticated) return

    await fetch("/api/user/sync-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        xp: stats.xp,
        completedChapters: stats.completedChapters,
        completedQuizzes: stats.completedQuizzes,
      }),
    })
  } catch {
    // sync is best-effort; ignore errors
  }
}

async function loadFromServer(): Promise<UserStats | null> {
  try {
    const res = await fetch("/api/auth/me")
    const data = await res.json()
    if (!data.authenticated) return null

    const progressRes = await fetch("/api/user/sync-progress")
    const progressData = await progressRes.json()
    if (!progressData.success) return null

    return {
      xp: progressData.stats.xp,
      completedChapters: progressData.stats.completedChapters,
      completedQuizzes: progressData.stats.completedQuizzes || {},
      badges: progressData.stats.badges || [],
      streak: 0,
    }
  } catch {
    return null
  }
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(defaultStats)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    async function init() {
      const serverStats = await loadFromServer()
      if (serverStats) {
        setStats(serverStats)
        saveStoredStats(serverStats)
      } else {
        setStats(getStoredStats())
      }
    }
    init()

    const handleUpdate = () => {
      setStats(getStoredStats())
    }

    window.addEventListener("neura_stats_updated", handleUpdate)
    return () => window.removeEventListener("neura_stats_updated", handleUpdate)
  }, [])

  const markChapterComplete = async (chapterId: string, xpReward = 50) => {
    const current = getStoredStats()
    if (!current.completedChapters.includes(chapterId)) {
      const updated = {
        ...current,
        xp: current.xp + xpReward,
        completedChapters: [...current.completedChapters, chapterId],
      }
      saveStoredStats(updated)
      setStats(updated)
      syncToServer(updated)
      return true
    }
    return false
  }

  const recordQuizScore = async (quizId: string, score: number, total: number) => {
    const current = getStoredStats()
    const percentage = Math.round((score / total) * 100)
    const currentBest = current.completedQuizzes[quizId] || 0
    const xpReward = percentage > currentBest ? Math.round((percentage - currentBest) * 1.5) : 0

    const updatedBadges = [...current.badges]
    if (percentage === 100 && !updatedBadges.includes("quiz_master")) {
      updatedBadges.push("quiz_master")
    }

    const updated = {
      ...current,
      xp: current.xp + xpReward,
      completedQuizzes: {
        ...current.completedQuizzes,
        [quizId]: Math.max(currentBest, percentage),
      },
      badges: updatedBadges,
    }
    saveStoredStats(updated)
    setStats(updated)
    syncToServer(updated)
  }

  return { stats, syncing, markChapterComplete, recordQuizScore }
}
