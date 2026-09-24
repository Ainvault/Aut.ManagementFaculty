import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToAlumniStory, type AlumniStoryRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { alumniCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

// POST /api/admin/alumni — create alumni story (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = alumniCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "alumni_stories",
      ["id", "title", "excerpt", "name", "program", "image_url", "href", "published"],
      [id, d.title, d.excerpt, d.name, d.program, d.imageUrl, d.href, d.published],
    );
    await query(sql, params);
    const res = await query<AlumniStoryRow>(`SELECT * FROM alumni_stories WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToAlumniStory(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    console.error("admin create alumni error:", err);
    return errorResponse("خطای سرور", 500);
  }
}