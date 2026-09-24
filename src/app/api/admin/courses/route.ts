import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { query } from "@/lib/db";
import { rowToCourse, type CourseRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { courseCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { isUniqueViolation } from "@/lib/db/errors";
import { revalidateSite } from "@/lib/api/revalidate";
import { listAdminCourses } from "@/lib/data/admin/courses";

export const dynamic = "force-dynamic";

// GET /api/admin/courses — list courses (admin only; includes unpublished)
// Query: ?search=<text>&published=true|false
export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  try {
    const { searchParams } = request.nextUrl;
    const publishedRaw = searchParams.get("published");
    const published =
      publishedRaw === "true" ? true : publishedRaw === "false" ? false : null;
    const data = await listAdminCourses({
      search: searchParams.get("search") ?? undefined,
      published: published ?? undefined,
    });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("admin list courses error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// POST /api/admin/courses — create course (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = courseCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = randomUUID();

  try {
    await query(
      `INSERT INTO courses
         (id, slug, title, summary, category, duration_hours, format, price,
          registration_url, image_url, seo_description, published)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        id, d.slug, d.title, d.summary, d.category, d.durationHours, d.format,
        d.price ?? null, d.registrationUrl, d.imageUrl, d.seoDescription, d.published,
      ],
    );
    const res = await query<CourseRow>(`SELECT * FROM courses WHERE id = $1`, [id]);
    const row = res.rows[0];
    revalidateSite();
    return NextResponse.json(
      { ok: true, data: { ...rowToCourse(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "courses_slug_key") {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin create course error:", err);
    return errorResponse("خطای سرور", 500);
  }
}