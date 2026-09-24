import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/admin";
import { registrationStatusSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { parseJsonBody } from "@/lib/api/crud";
import type { RegistrationLeadRow } from "@/app/api/admin/registrations/route";

export const dynamic = "force-dynamic";

// PATCH /api/admin/registrations/[id] — change lead status (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = registrationStatusSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  try {
    const res = await query<RegistrationLeadRow>(
      `UPDATE registration_leads SET status = $1 WHERE id = $2 RETURNING *`,
      [parsed.data.status, id],
    );
    if (res.rows.length === 0) return errorResponse("لید ثبت‌نام یافت نشد", 404);
    return NextResponse.json({ ok: true, data: res.rows[0] });
  } catch (err) {
    console.error("admin update registration error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/registrations/[id] — delete a lead (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(
      `DELETE FROM registration_leads WHERE id = $1 RETURNING id`,
      [id],
    );
    if (res.rows.length === 0) return errorResponse("لید ثبت‌نام یافت نشد", 404);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete registration error:", err);
    return errorResponse("خطای سرور", 500);
  }
}