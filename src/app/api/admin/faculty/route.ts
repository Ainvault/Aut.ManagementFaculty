import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToFacultyMember, type FacultyMemberRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { facultyCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

// POST /api/admin/faculty — create faculty member (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = facultyCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "faculty_members",
      ["id", "name", "title", "focus", "bio", "image_url", "published"],
      [id, d.name, d.title, d.focus, d.bio, d.imageUrl, d.published],
    );
    await query(sql, params);
    const res = await query<FacultyMemberRow>(`SELECT * FROM faculty_members WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToFacultyMember(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    console.error("admin create faculty error:", err);
    return errorResponse("خطای سرور", 500);
  }
}