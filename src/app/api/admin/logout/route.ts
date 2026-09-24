import { NextResponse } from "next/server";
import { destroySession, clearSessionCookie } from "@/lib/auth/admin";

export async function POST() {
  try {
    await destroySession();
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin logout error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}