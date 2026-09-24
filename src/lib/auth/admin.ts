// Phase E — Admin authentication (simple, secure-enough for test env)
// Uses Node crypto (scrypt) for password hashing; HttpOnly cookie sessions.

import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

const scryptAsync = promisify(scrypt);
const SESSION_COOKIE = "admin_session";
const SESSION_TTL_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [saltHex, derivedHex] = hash.split(":");
  if (!saltHex || !derivedHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const derived = Buffer.from(derivedHex, "hex");
  const test = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(derived, test);
}

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const tokenHash = randomBytes(32).toString("hex"); // store hash, not raw token
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await query(
    `INSERT INTO admin_sessions (token_hash, user_id, expires_at)
     VALUES ($1, $2, $3)`,
    [tokenHash, userId, expiresAt],
  );
  // Return token|hash so we can set cookie with token and verify with hash
  return `${token}.${tokenHash}`;
}

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: string;
}

/** Verifies the session cookie against admin_sessions, returns admin info or null. */
export async function verifySession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  const [token, tokenHash] = cookie.split(".");
  if (!token || !tokenHash) return null;

  const res = await query(
    `SELECT u.id, u.email, u.name, u.role
     FROM admin_users u
     JOIN admin_sessions s ON s.user_id = u.id
     WHERE s.token_hash = $1 AND s.expires_at > now()
     LIMIT 1`,
    [tokenHash],
  );
  if (res.rows.length === 0) return null;
  const u = res.rows[0];
  return { userId: u.id, email: u.email, name: u.name, role: u.role };
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (!cookie) return;
  const [, tokenHash] = cookie.split(".");
  if (tokenHash) {
    await query("DELETE FROM admin_sessions WHERE token_hash = $1", [tokenHash]);
  }
}

/** Convenience guard for admin Route Handlers — returns session or null (→ 401). */
export async function requireAdmin(): Promise<AdminSession | null> {
  return verifySession();
}

export async function setSessionCookie(cookieValue: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: cookieValue,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}