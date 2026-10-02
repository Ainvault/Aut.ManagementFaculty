import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToCourse, type CourseRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { coursePatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { isUniqueViolation } from "@/lib/db/errors";
import { revalidateSite } from "@/lib/api/revalidate";
import { getAdminCourseById } from "@/lib/data/admin/courses";

export const dynamic = "force-dynamic";

// GET /api/admin/courses/[id] — single course (admin only; includes unpublished)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const course = await getAdminCourseById(id);
    if (!course) return errorResponse("دوره یافت نشد", 404);
    return NextResponse.json({ ok: true, data: course });
  } catch (err) {
    console.error("admin get course error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

const COURSE_COLUMNS: Record<string, string> = {
  slug: "slug",
  title: "title",
  summary: "summary",
  category: "category",
  durationHours: "duration_hours",
  format: "format",
  price: "price",
  registrationUrl: "registration_url",
  posterImageUrl: "poster_image_url",
  brochureImageUrl: "brochure_image_url",
  seoDescription: "seo_description",
  tags: "tags",
  published: "published",
};

// PATCH /api/admin/courses/[id] — update course (admin only)
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

  const parsed = coursePatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const sets: string[] = [];
  const values: unknown[] = [];
  for (const [key, column] of Object.entries(COURSE_COLUMNS)) {
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
    const res = await query<CourseRow>(
      `UPDATE courses SET ${sets.join(", ")} WHERE id = $${values.length} RETURNING *`,
      values,
    );
    if (res.rows.length === 0) return errorResponse("دوره یافت نشد", 404);
    const row = res.rows[0];
    revalidateSite();
    return NextResponse.json({ ok: true, data: { ...rowToCourse(row), published: row.published } });
  } catch (err) {
    if (isUniqueViolation(err) && err.constraint === "courses_slug_key") {
      return errorResponse("این slug قبلاً استفاده شده است", 409);
    }
    console.error("admin update course error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/courses/[id] — delete course (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM courses WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("دوره یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete course error:", err);
    return errorResponse("خطای سرور", 500);
  }
}