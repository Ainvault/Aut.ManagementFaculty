import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToEvent, type EventRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { eventPatchSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { revalidateSite } from "@/lib/api/revalidate";
import { parseJsonBody, buildUpdate } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

const EVENT_COLUMNS: Record<string, string> = {
  title: "title",
  startDate: "start_date",
  endDate: "end_date",
  location: "location",
  href: "href",
  summary: "summary",
  published: "published",
};

// PATCH /api/admin/events/[id] — update event (admin only)
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

  const parsed = eventPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }

  const spec = buildUpdate("events", "id", EVENT_COLUMNS, parsed.data as Record<string, unknown>);
  if (spec.empty) return errorResponse("حداقل یک فیلد برای ویرایش لازم است", 400);

  try {
    const res = await query<EventRow>(spec.sql, [...spec.params, id]);
    if (res.rows.length === 0) return errorResponse("رویداد یافت نشد", 404);
    const row = res.rows[0];
    return NextResponse.json({ ok: true, data: { ...rowToEvent(row), published: row.published } });
  } catch (err) {
    console.error("admin update event error:", err);
    return errorResponse("خطای سرور", 500);
  }
}

// DELETE /api/admin/events/[id] — delete event (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  const { id } = await params;
  try {
    const res = await query(`DELETE FROM events WHERE id = $1 RETURNING id`, [id]);
    if (res.rows.length === 0) return errorResponse("رویداد یافت نشد", 404);
    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("admin delete event error:", err);
    return errorResponse("خطای سرور", 500);
  }
}