import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { errorResponse } from "@/lib/api/response";
import { listAdminRegistrations } from "@/lib/data/admin/registrations";

export const dynamic = "force-dynamic";

export interface RegistrationLeadRow {
  id: string;
  course_id: string | null;
  course_slug: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  status: "new" | "contacted" | "enrolled" | "rejected";
  created_at: string;
}

// GET /api/admin/registrations — list registration leads (admin only)
// Query: ?search=<text>&status=new|contacted|enrolled|rejected
export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  try {
    const { searchParams } = request.nextUrl;
    const data = await listAdminRegistrations({
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
    });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("admin list registrations error:", err);
    return errorResponse("خطای سرور", 500);
  }
}