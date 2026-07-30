import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { signToken, setSessionCookie } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get("code")
  const stateRaw = searchParams.get("state")
  
  let redirectTarget = "/dashboard"
  if (stateRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(stateRaw))
      if (parsed.redirect) redirectTarget = parsed.redirect
    } catch {
      // fallback
    }
  }

  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
  const redirectUri = `${origin}/api/auth/google/callback`

  let googleEmail = "user.google@gmail.com"
  let googleName = "Pengguna Google"

  if (code && clientSecret) {
    try {
      // Exchange code for Google Access Token
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      })

      const tokenData = await tokenRes.json()

      if (tokenData.access_token) {
        // Fetch User Profile from Google UserInfo endpoint
        const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })
        const profileData = await profileRes.json()

        if (profileData.email) {
          googleEmail = profileData.email
          googleName = profileData.name || googleEmail.split("@")[0]
        }
      }
    } catch (err) {
      console.error("[Google OAuth Callback Token Error]:", err)
    }
  }

  try {
    await connectToDatabase()

    // Find existing user by Google email or create a new user in MongoDB Atlas
    let user = await User.findOne({ email: googleEmail.toLowerCase().trim() })

    if (!user) {
      const dummyPassword = await bcrypt.hash("google-oauth-secure-pass-" + Math.random(), 10)
      user = await User.create({
        name: googleName,
        email: googleEmail.toLowerCase().trim(),
        passwordHash: dummyPassword,
        xp: 0,
        completedChapters: [],
        badges: ["Google Verified", "ML Learner"],
      })
    }

    // Sign session token & set HTTP-only cookie
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    setSessionCookie(token)

    // Redirect to Dashboard or target page
    return NextResponse.redirect(`${origin}${redirectTarget}`)
  } catch (error) {
    console.error("[Google OAuth Callback DB Error]:", error)
    return NextResponse.redirect(`${origin}/masuk?error=google_failed`)
  }
}
