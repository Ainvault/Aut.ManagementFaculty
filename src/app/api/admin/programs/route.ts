import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToProgram, type ProgramRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { programCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";
import { isUniqueViolation } from "@/lib/db/errors";

export const dynamic = "force-dynamic";

// POST /api/admin/programs — create program (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = programCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "programs",
      ["id", "slug", "title", "blurb", "group_key", "href", "tagline", "audience", "duration_label", "format_label", "highlights", "body", "published"],
      [id, d.slug, d.title, d.blurb, d.group, d.href, d.tagline ?? null, d.audience, d.durationLabel, d.formatLabel, JSON.stringify(d.highlights), d.body, d.published],
    );
    await query(sql, params);
    const res = await query<ProgramRow>(`SELECT * FROM programs WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToProgram(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "programs_slug_key") {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin create program error:", err);
    return errorResponse("خطای سرور", 500);
  }
}