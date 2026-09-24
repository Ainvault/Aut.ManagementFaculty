import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToTestimonial, type TestimonialRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { testimonialCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

// POST /api/admin/testimonials — create testimonial (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = testimonialCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "testimonials",
      ["id", "quote", "name", "role", "course_title", "published"],
      [id, d.quote, d.name, d.role, d.courseTitle, d.published],
    );
    await query(sql, params);
    const res = await query<TestimonialRow>(`SELECT * FROM testimonials WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToTestimonial(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    console.error("admin create testimonial error:", err);
    return errorResponse("خطای سرور", 500);
  }
}