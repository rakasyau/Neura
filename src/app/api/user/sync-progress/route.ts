import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User, IUser } from "@/models/User"
import { getSessionUser } from "@/lib/auth"
import { modules } from "@/lib/data"

// Pre-compute valid chapter IDs for validation
const VALID_CHAPTER_IDS = new Set(
  modules.flatMap((m) => m.chapters.map((c) => c.id))
)
const MAX_XP = 50000

export async function POST(req: Request) {
  try {
    const sessionUser = getSessionUser()
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { xp, completedChapters, completedQuizzes } = await req.json()

    await connectToDatabase()

    // Fetch current user data for comparison
    const currentUser = await User.findById(sessionUser.userId).select("xp completedChapters completedQuizzes")
    if (!currentUser) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 })
    }

    const updateFields: Record<string, unknown> = {}

    // XP: only allow increase, cap at MAX_XP
    if (typeof xp === "number" && xp >= 0) {
      updateFields.xp = Math.min(MAX_XP, Math.max(currentUser.xp || 0, Math.round(xp)))
    }

    // completedChapters: validate each ID against known chapters
    if (Array.isArray(completedChapters)) {
      const validChapters = completedChapters.filter(
        (id): id is string => typeof id === "string" && VALID_CHAPTER_IDS.has(id)
      )
      // Merge with existing, don't allow removal
      const merged = Array.from(new Set([...(currentUser.completedChapters || []), ...validChapters]))
      updateFields.completedChapters = merged
    }

    // completedQuizzes: validate values are percentages (0-100)
    if (completedQuizzes && typeof completedQuizzes === "object" && !Array.isArray(completedQuizzes)) {
      const sanitized: Record<string, number> = {}
      for (const [key, value] of Object.entries(completedQuizzes)) {
        if (typeof key === "string" && typeof value === "number" && value >= 0 && value <= 100) {
          sanitized[key] = Math.round(value)
        }
      }
      updateFields.completedQuizzes = sanitized
    }

    const updated = await User.findByIdAndUpdate(
      sessionUser.userId,
      { $set: updateFields },
      { new: true }
    ).select("-passwordHash")

    if (!updated) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updated._id.toString(),
        name: updated.name,
        email: updated.email,
        xp: updated.xp,
        completedChapters: updated.completedChapters,
        badges: updated.badges,
      },
    })
  } catch (error) {
    console.error("[Sync Progress Error]:", error)
    return NextResponse.json({ error: "Gagal sync progress" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sessionUser = getSessionUser()
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const user = await User.findById(sessionUser.userId).select("-passwordHash")
    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 })
    }

    const quizzesRaw = user.completedQuizzes || {}
    const completedQuizzes: Record<string, number> =
      quizzesRaw instanceof Map
        ? Object.fromEntries(quizzesRaw)
        : (quizzesRaw as Record<string, number>)

    return NextResponse.json({
      success: true,
      stats: {
        xp: user.xp,
        completedChapters: user.completedChapters,
        completedQuizzes,
        badges: user.badges,
      },
    })
  } catch (error) {
    console.error("[Get Progress Error]:", error)
    return NextResponse.json({ error: "Gagal mengambil progress" }, { status: 500 })
  }
}
