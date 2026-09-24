import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToCampaignBanner, type CampaignBannerRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { bannerCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

// POST /api/admin/banners — create campaign banner (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = bannerCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "campaign_banners",
      ["id", "version", "text", "href", "cta", "published"],
      [id, d.version, d.text, d.href, d.cta, d.published],
    );
    await query(sql, params);
    const res = await query<CampaignBannerRow>(`SELECT * FROM campaign_banners WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToCampaignBanner(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    console.error("admin create banner error:", err);
    return errorResponse("خطای سرور", 500);
  }
}