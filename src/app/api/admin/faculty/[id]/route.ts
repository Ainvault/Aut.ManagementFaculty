import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToFacultyMember, type FacultyMemberRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { facultyPatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { revalidateSite } from "@/lib/api/revalidate";
import { parseJsonBody, buildUpdate } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

const FACULTY_COLUMNS: Record<string, string> = {
  name: "name",
  title: "title",
  focus: "focus",
  bio: "bio",
  imageUrl: "image_url",
  email: "email",
  office: "office",
  phone: "phone",
  department: "department",
  linkedinUrl: "linkedin_url",
  scholarUrl: "scholar_url",
  published: "published",
};

// PATCH /api/admin/faculty/[id] — update faculty member (admin only)
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

  const parsed = facultyPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const spec = buildUpdate("faculty_members", "id", FACULTY_COLUMNS, parsed.data as Record<string, unknown>);
  if (spec.empty) return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);

  try {
    const res = await query<FacultyMemberRow>(spec.sql, [...spec.params, id]);
    if (res.rows.length === 0) return errorResponse("عضو هیئت علمی یافت نشد", 404);
    const row = res.rows[0];
    return NextResponse.json({
      ok: true,
      data: { ...rowToFacultyMember(row), published: row.published },
    });
  } catch (err) {
    console.error("admin update faculty error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/faculty/[id] — delete faculty member (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM faculty_members WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("عضو هیئت علمی یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete faculty error:", err);
    return errorResponse("خطای سرور", 500);
  }
}