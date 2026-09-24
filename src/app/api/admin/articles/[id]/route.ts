import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToArticle, type ArticleRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { articlePatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { isUniqueViolation } from "@/lib/db/errors";
import { revalidateSite } from "@/lib/api/revalidate";

export const dynamic = "force-dynamic";

const ARTICLE_COLUMNS: Record<string, string> = {
  title: "title",
  category: "category",
  excerpt: "excerpt",
  imageUrl: "image_url",
  href: "href",
  featured: "featured",
  body: "body",
  publishedAt: "published_at",
  author: "author",
  published: "published",
};

// PATCH /api/admin/articles/[id] — update article (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = articlePatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const sets: string[] = [];
  const values: unknown[] = [];
  for (const [key, column] of Object.entries(ARTICLE_COLUMNS)) {
    const v = parsed.data[key as keyof typeof parsed.data];
    if (v !== undefined) {
      values.push(v);
      sets.push(`${column} = $${values.length}`);
    }
  }
  if (sets.length === 0) {
    return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);
  }
  values.push(id);

  try {
    const res = await query<ArticleRow>(
      `UPDATE articles SET ${sets.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values,
    );
    if (res.rows.length === 0) return errorResponse("مقاله یافت نشد", 404);
    const row = res.rows[0];
    revalidateSite();
    return NextResponse.json({
      ok: true,
      data: { ...rowToArticle(row), published: row.published },
    });
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "articles_one_featured") {
      return errorResponse("فقط یک مقالهٔ ویژهٔ منتشرشده مجاز است", 409);
    }
    console.error("admin update article error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/articles/[id] — delete article (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM articles WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("مقاله یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete article error:", err);
    return errorResponse("خطای سرور", 500);
  }
}