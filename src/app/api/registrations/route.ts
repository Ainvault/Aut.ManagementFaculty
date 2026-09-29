import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { publicRegistrationSchema } from "@/lib/validation/public";
import { errorResponse } from "@/lib/api/response";

export const dynamic = "force-dynamic";

// POST /api/registrations — create a registration lead (public).
// Used by ContactInterestForm on /register/[slug] and /contact.
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = publicRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const d = parsed.data;
  const courseSlug = d.courseSlug?.trim() || null;

  try {
    const course = courseSlug
      ? await query<{ id: string }>(
          "SELECT id FROM courses WHERE slug = $1 AND published = true LIMIT 1",
          [courseSlug],
        )
      : null;

    await query(
      `INSERT INTO registration_leads
         (course_id, course_slug, full_name, email, phone, position, organization, message, source)
       VALUES ($1, $2, $3, $4, NULLIF($5, ''), $6, $7, NULLIF($8, ''), 'register_page')`,
      [
        course?.rows[0]?.id ?? null,
        courseSlug,
        d.fullName,
        d.email,
        d.phone,
        d.position,
        d.organization,
        d.message,
      ],
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("create registration lead error:", err);
    return errorResponse("خطای سرور", 500);
  }
}