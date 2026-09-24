import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToIntersectionTopic, type IntersectionTopicRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { topicCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";
import { isUniqueViolation } from "@/lib/db/errors";

export const dynamic = "force-dynamic";

// POST /api/admin/topics — create topic (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = topicCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "intersection_topics",
      ["id", "slug", "title", "description", "href", "image_url", "body", "highlights", "published"],
      [id, d.slug, d.title, d.description, d.href, d.imageUrl, d.body, JSON.stringify(d.highlights), d.published],
    );
    await query(sql, params);
    const res = await query<IntersectionTopicRow>(`SELECT * FROM intersection_topics WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToIntersectionTopic(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "intersection_topics_slug_key") {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin create topic error:", err);
    return errorResponse("خطای سرور", 500);
  }
}