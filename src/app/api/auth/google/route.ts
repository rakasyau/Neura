import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { signToken, setSessionCookie } from "@/lib/auth"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

export async function POST(req: Request) {
  try {
    if (!GOOGLE_CLIENT_ID) {
      return NextResponse.json(
        { error: "Login Google sedang tidak tersedia. GOOGLE_CLIENT_ID belum dikonfigurasi." },
        { status: 503 }
      )
    }

    const { credential } = await req.json()

    if (!credential) {
      return NextResponse.json(
        { error: "Token Google tidak ditemukan." },
        { status: 400 }
      )
    }

    const verifyRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    )

    if (!verifyRes.ok) {
      console.error("[Google Auth] Token verification failed:", await verifyRes.text())
      return NextResponse.json(
        { error: "Token Google tidak valid." },
        { status: 401 }
      )
    }

    const payload = await verifyRes.json()

    if (payload.aud !== GOOGLE_CLIENT_ID) {
      return NextResponse.json(
        { error: "Token Google tidak sesuai dengan client ID ini." },
        { status: 401 }
      )
    }

    const googleEmail = payload.email
    const googleName = payload.name || payload.email.split("@")[0]

    await connectToDatabase()

    let user = await User.findOne({ email: googleEmail.toLowerCase().trim() })

    if (!user) {
      user = await User.create({
        name: googleName.trim(),
        email: googleEmail.toLowerCase().trim(),
        passwordHash: "",
        xp: 0,
        completedChapters: [],
        badges: ["ML Learner"],
      })
    }

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
    console.error("[Google Auth API Error]:", error)
    return NextResponse.json(
      { error: "Gagal autentikasi Google. Coba lagi nanti." },
      { status: 500 }
    )
  }
}
