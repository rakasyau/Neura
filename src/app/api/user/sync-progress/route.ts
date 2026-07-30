import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User, IUser } from "@/models/User"
import { getSessionUser } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const sessionUser = getSessionUser()
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { xp, completedChapters, completedQuizzes } = await req.json()

    await connectToDatabase()

    const updateFields: Record<string, unknown> = {}
    if (typeof xp === "number") updateFields.xp = xp
    if (Array.isArray(completedChapters)) updateFields.completedChapters = completedChapters
    if (completedQuizzes && typeof completedQuizzes === "object") updateFields.completedQuizzes = completedQuizzes

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
