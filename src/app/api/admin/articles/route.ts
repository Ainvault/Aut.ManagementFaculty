import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { query } from "@/lib/db";
import { rowToArticle, type ArticleRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { articleCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { isUniqueViolation } from "@/lib/db/errors";
import { revalidateSite } from "@/lib/api/revalidate";

export const dynamic = "force-dynamic";

// POST /api/admin/articles — create article (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = articleCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = randomUUID();

  try {
    await query(
      `INSERT INTO articles
         (id, title, category, excerpt, image_url, href, featured, body, published_at, author, published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        id, d.title, d.category, d.excerpt, d.imageUrl, d.href,
        d.featured, d.body, d.publishedAt, d.author, d.published,
      ],
    );
    const res = await query<ArticleRow>(`SELECT * FROM articles WHERE id = $1`, [id]);
    const row = res.rows[0];
    revalidateSite();
    return NextResponse.json(
      { ok: true, data: { ...rowToArticle(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "articles_one_featured") {
      return errorResponse("فقط یک مقالهٔ ویژهٔ منتشرشده مجاز است", 409);
    }
    console.error("admin create article error:", err);
    return errorResponse("خطای سرور", 500);
  }
}