import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { getSessionUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const sessionUser = getSessionUser()
    if (!sessionUser) {
      return NextResponse.json({ authenticated: false, user: null })
    }

    await connectToDatabase()

    const user = await User.findById(sessionUser.userId).select("-passwordHash")
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        xp: user.xp,
        completedChapters: user.completedChapters,
        badges: user.badges,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("[Auth Me API Error]:", error)
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 500 }
    )
  }
}
