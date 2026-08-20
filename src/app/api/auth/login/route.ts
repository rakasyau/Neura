import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { signToken, setSessionCookie } from "@/lib/auth"
import { checkRateLimit } from "@/lib/rateLimit"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const { allowed, remaining } = checkRateLimit(`login:${ip}`)
    if (!allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi nanti." },
        { status: 429 }
      )
    }

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      )
    }

    if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    // Verify password
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Akun ini menggunakan Google Sign-In. Silakan masuk dengan Google." },
        { status: 401 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    // Generate JWT & set cookie
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    setSessionCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        xp: user.xp,
        completedChapters: user.completedChapters,
        badges: user.badges,
      },
    })
  } catch (error) {
    console.error("[Login API Error]:", error)
    return NextResponse.json(
      { error: "Gagal melakukan login. Coba lagi nanti." },
      { status: 500 }
    )
  }
}
