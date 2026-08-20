import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { signToken, setSessionCookie } from "@/lib/auth"

export const dynamic = "force-dynamic"

/**
 * Validates that a redirect target is a safe, relative path.
 * Prevents open redirect attacks (e.g. //evil.com or https://evil.com).
 */
function sanitizeRedirect(raw: string): string {
  // Must start with "/" and not "//" (protocol-relative URL)
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    // Strip any backslashes (path traversal on Windows)
    const cleaned = raw.replace(/\\/g, "/")
    // Only allow paths, no protocol
    if (!cleaned.includes(":")) return cleaned
  }
  return "/dashboard"
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get("code")
  const stateRaw = searchParams.get("state")
  
  let redirectTarget = "/dashboard"
  if (stateRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(stateRaw))
      if (typeof parsed.redirect === "string") {
        redirectTarget = sanitizeRedirect(parsed.redirect)
      }
    } catch {
      // fallback to /dashboard
    }
  }

  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
  const redirectUri = `${origin}/api/auth/google/callback`

  // Validate prerequisites
  if (!code || !clientSecret || !clientId) {
    console.error("[Google OAuth Callback] Missing code, client_secret, or client_id")
    return NextResponse.redirect(`${origin}/masuk?error=google_config`)
  }

  let googleEmail: string | null = null
  let googleName: string | null = null

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

    if (!tokenData.access_token) {
      console.error("[Google OAuth Callback] Token exchange failed:", tokenData.error || "no access_token")
      return NextResponse.redirect(`${origin}/masuk?error=google_token`)
    }

    // Fetch User Profile from Google UserInfo endpoint
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const profileData = await profileRes.json()

    if (!profileData.email) {
      console.error("[Google OAuth Callback] No email in profile:", profileData)
      return NextResponse.redirect(`${origin}/masuk?error=google_profile`)
    }

    googleEmail = profileData.email
    googleName = profileData.name || googleEmail!.split("@")[0]
  } catch (err) {
    console.error("[Google OAuth Callback Token Error]:", err)
    return NextResponse.redirect(`${origin}/masuk?error=google_failed`)
  }

  try {
    await connectToDatabase()

    // At this point googleEmail is guaranteed non-null (early returns above handle failures)
    let user = await User.findOne({ email: googleEmail!.toLowerCase().trim() })

    if (!user) {
      user = await User.create({
        name: (googleName || "").trim(),
        email: googleEmail!.toLowerCase().trim(),
        passwordHash: "", // OAuth users have no password
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
