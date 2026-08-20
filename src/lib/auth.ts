import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET tidak ditemukan atau terlalu pendek (min 32 karakter). " +
      "Generate dengan: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\" " +
      "lalu atur di .env.local atau Vercel Environment Variables."
    )
  }
  return secret
}

const COOKIE_NAME = "neura_session"

export interface JwtPayload {
  userId: string
  email: string
  name: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtPayload
  } catch {
    return null
  }
}

export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  })
}

export function removeSessionCookie() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  })
}

export function getSessionUser(): JwtPayload | null {
  const cookieStore = cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}
