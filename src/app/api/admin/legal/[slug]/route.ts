import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToLegalPage, type LegalPageRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { legalPatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { revalidateSite } from "@/lib/api/revalidate";
import { parseJsonBody, buildUpdate } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

const LEGAL_COLUMNS: Record<string, string> = {
  title: "title",
  body: "body",
  published: "published",
};

// PATCH /api/admin/legal/[slug] — update legal page (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { slug } = await params;

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = legalPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.body !== undefined) {
    data.body = JSON.stringify(data.body);
  }

  const spec = buildUpdate("legal_pages", "slug", LEGAL_COLUMNS, data);
  if (spec.empty) return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);

  try {
    const res = await query<LegalPageRow>(spec.sql, [...spec.params, slug]);
    if (res.rows.length === 0) return errorResponse("صفحهٔ حقوقی یافت نشد", 404);
    const row = res.rows[0];
    return NextResponse.json({
      ok: true,
      data: { ...rowToLegalPage(row), published: row.published },
    });
  } catch (err) {
    console.error("admin update legal error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/legal/[slug] — delete legal page (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { slug } = await params;
  try {
    const res = await query(`DELETE FROM legal_pages WHERE slug = $1 RETURNING slug`, [slug]);
    if (res.rows.length === 0) return errorResponse("صفحهٔ حقوقی یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete legal error:", err);
    return errorResponse("خطای سرور", 500);
  }
}