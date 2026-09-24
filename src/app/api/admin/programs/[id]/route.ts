import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToProgram, type ProgramRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { programPatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { revalidateSite } from "@/lib/api/revalidate";
import { parseJsonBody, buildUpdate } from "@/lib/api/crud";
import { isUniqueViolation } from "@/lib/db/errors";

export const dynamic = "force-dynamic";

const PROGRAM_COLUMNS: Record<string, string> = {
  slug: "slug",
  title: "title",
  blurb: "blurb",
  group: "group_key",
  href: "href",
  tagline: "tagline",
  audience: "audience",
  durationLabel: "duration_label",
  formatLabel: "format_label",
  highlights: "highlights",
  body: "body",
  published: "published",
};

// PATCH /api/admin/programs/[id] — update program (admin only)
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

  const parsed = programPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.highlights !== undefined) {
    data.highlights = JSON.stringify(data.highlights);
  }

  const spec = buildUpdate("programs", "id", PROGRAM_COLUMNS, data);
  if (spec.empty) return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);

  try {
    const res = await query<ProgramRow>(spec.sql, [...spec.params, id]);
    if (res.rows.length === 0) return errorResponse("برنامه یافت نشد", 404);
    const row = res.rows[0];
    return NextResponse.json({ ok: true, data: { ...rowToProgram(row), published: row.published } });
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "programs_slug_key") {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin update program error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/programs/[id] — delete program (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM programs WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("برنامه یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete program error:", err);
    return errorResponse("خطای سرور", 500);
  }
}