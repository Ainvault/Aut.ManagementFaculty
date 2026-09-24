import { query } from "@/lib/db";
import type { EventItem } from "@/lib/types";
import { rowToEvent, type EventRow } from "@/lib/db/mappers";

export async function getEvents(): Promise<EventItem[]> {
  const res = await query<EventRow>(
    "SELECT * FROM events WHERE published = true ORDER BY start_date ASC",
  );
  return res.rows.map(rowToEvent);
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const res = await query<EventRow>(
    "SELECT * FROM events WHERE published = true AND id = $1 LIMIT 1",
    [id],
  );
  return res.rows[0] ? rowToEvent(res.rows[0]) : null;
}