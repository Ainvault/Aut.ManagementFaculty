import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToIntersectionTopic, type IntersectionTopicRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { topicPatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { revalidateSite } from "@/lib/api/revalidate";
import { parseJsonBody, buildUpdate } from "@/lib/api/crud";
import { isUniqueViolation } from "@/lib/db/errors";

export const dynamic = "force-dynamic";

const TOPIC_COLUMNS: Record<string, string> = {
  slug: "slug",
  title: "title",
  description: "description",
  href: "href",
  imageUrl: "image_url",
  body: "body",
  highlights: "highlights",
  published: "published",
};

// PATCH /api/admin/topics/[id] — update topic (admin only)
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

  const parsed = topicPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.highlights !== undefined) {
    data.highlights = JSON.stringify(data.highlights);
  }

  const spec = buildUpdate("intersection_topics", "id", TOPIC_COLUMNS, data);
  if (spec.empty) return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);

  try {
    const res = await query<IntersectionTopicRow>(spec.sql, [...spec.params, id]);
    if (res.rows.length === 0) return errorResponse("موضوع یافت نشد", 404);
    const row = res.rows[0];
    return NextResponse.json({
      ok: true,
      data: { ...rowToIntersectionTopic(row), published: row.published },
    });
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "intersection_topics_slug_key") {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin update topic error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/topics/[id] — delete topic (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM intersection_topics WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("موضوع یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete topic error:", err);
    return errorResponse("خطای سرور", 500);
  }
}