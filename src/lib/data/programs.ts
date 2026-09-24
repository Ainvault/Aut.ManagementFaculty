import { query } from "@/lib/db";
import type { Program } from "@/lib/types";
import { rowToProgram, type ProgramRow } from "@/lib/db/mappers";

export async function getPrograms(): Promise<Program[]> {
  const res = await query<ProgramRow>(
    "SELECT * FROM programs WHERE published = true ORDER BY title ASC",
  );
  return res.rows.map(rowToProgram);
}

export async function getProgramsByGroup(
  group: Program["group"],
): Promise<Program[]> {
  const res = await query<ProgramRow>(
    "SELECT * FROM programs WHERE published = true AND group_key = $1 ORDER BY title ASC",
    [group],
  );
  return res.rows.map(rowToProgram);
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const res = await query<ProgramRow>(
    "SELECT * FROM programs WHERE published = true AND slug = $1 LIMIT 1",
    [slug],
  );
  return res.rows[0] ? rowToProgram(res.rows[0]) : null;
}