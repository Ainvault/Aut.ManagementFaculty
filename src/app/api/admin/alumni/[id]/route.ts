import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToAlumniStory, type AlumniStoryRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { alumniPatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { revalidateSite } from "@/lib/api/revalidate";
import { parseJsonBody, buildUpdate } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

const ALUMNI_COLUMNS: Record<string, string> = {
  title: "title",
  excerpt: "excerpt",
  name: "name",
  program: "program",
  imageUrl: "image_url",
  href: "href",
  published: "published",
};

// PATCH /api/admin/alumni/[id] — update alumni story (admin only)
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

  const parsed = alumniPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const spec = buildUpdate("alumni_stories", "id", ALUMNI_COLUMNS, parsed.data as Record<string, unknown>);
  if (spec.empty) return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);

  try {
    const res = await query<AlumniStoryRow>(spec.sql, [...spec.params, id]);
    if (res.rows.length === 0) return errorResponse("داستان دانش‌آموخته یافت نشد", 404);
    const row = res.rows[0];
    return NextResponse.json({
      ok: true,
      data: { ...rowToAlumniStory(row), published: row.published },
    });
  } catch (err) {
    console.error("admin update alumni error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/alumni/[id] — delete alumni story (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM alumni_stories WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("داستان دانش‌آموخته یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete alumni error:", err);
    return errorResponse("خطای سرور", 500);
  }
}