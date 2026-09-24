import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyPassword, createSession, setSessionCookie } from "@/lib/auth/admin";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "ایمیل و رمز الزامی است" }, { status: 400 });
    }

    const res = await query(
      `SELECT id, email, password_hash, name, role FROM admin_users WHERE email = $1 LIMIT 1`,
      [email],
    );
    if (res.rows.length === 0) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 401 });
    }

    const user = res.rows[0];
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "رمز نادرست است" }, { status: 401 });
    }

    const cookieValue = await createSession(user.id);
    await setSessionCookie(cookieValue);

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    console.error("admin login error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}