import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET!

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET tidak ditemukan. Atur di .env.local atau environment variable.")
}
const COOKIE_NAME = "neura_session"

export interface JwtPayload {
  userId: string
  email: string
  name: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
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
