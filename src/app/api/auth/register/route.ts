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
    const { allowed, remaining } = checkRateLimit(`register:${ip}`)
    if (!allowed) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Coba lagi nanti." },
        { status: 429 }
      )
    }

    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
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

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() })
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan masuk." },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user in MongoDB
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      xp: 0,
      completedChapters: [],
      badges: ["ML Learner"],
    })

    // Generate JWT & set cookie
    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
    })

    setSessionCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        xp: newUser.xp,
        completedChapters: newUser.completedChapters,
        badges: newUser.badges,
      },
    })
  } catch (error) {
    console.error("[Register API Error]:", error)
    return NextResponse.json(
      { error: "Gagal mendaftar. Coba lagi nanti." },
      { status: 500 }
    )
  }
}
