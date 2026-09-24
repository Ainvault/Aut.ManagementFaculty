import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rowToEvent, type EventRow } from "@/lib/db/mappers";
import { requireAdmin } from "@/lib/auth/admin";
import { eventCreateSchema } from "@/lib/validation/admin";
import { errorResponse } from "@/lib/api/response";
import { makeId, parseJsonBody, buildInsert } from "@/lib/api/crud";

export const dynamic = "force-dynamic";

// POST /api/admin/events — create event (admin only)
export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) return errorResponse("عدم دسترسی — ورود لازم است", 401);

  let body: unknown;
  try {
    body = await parseJsonBody(request);
  } catch {
    return errorResponse("بدنهٔ درخواست JSON معتبر نیست", 400);
  }

  const parsed = eventCreateSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "داده نادرست", 400);
  }
  const d = parsed.data;
  const id = makeId();

  try {
    const { sql, params } = buildInsert(
      "events",
      ["id", "title", "start_date", "end_date", "location", "href", "summary", "published"],
      [id, d.title, d.startDate, d.endDate, d.location, d.href, d.summary, d.published],
    );
    await query(sql, params);
    const res = await query<EventRow>(`SELECT * FROM events WHERE id = $1`, [id]);
    const row = res.rows[0];
    return NextResponse.json(
      { ok: true, data: { ...rowToEvent(row), published: row.published } },
      { status: 201 },
    );
  } catch (err) {
    console.error("admin create event error:", err);
    return errorResponse("خطای سرور", 500);
  }
}