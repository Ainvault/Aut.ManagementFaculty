import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToLegalPage, type LegalPageRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { legalCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { parseJsonBody, buildInsert } from "@/lib/api/crud";
import { isUniqueViolation } from "@/lib/db/errors";

export const dynamic = "force-dynamic";

// POST /api/admin/legal — create legal page (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = legalCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;

  try {
    const { sql, params } = buildInsert(
      "legal_pages",
      ["slug", "title", "body", "published"],
      [d.slug, d.title, JSON.stringify(d.body), d.published],
    );
    await query(sql, params);
    const res = await query<LegalPageRow>(`SELECT * FROM legal_pages WHERE slug = $1`, [d.slug]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToLegalPage(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    if (isUniqueViolation(err)) {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin create legal error:", err);
    return errorResponse("خطای سرور", 500);
  }
}