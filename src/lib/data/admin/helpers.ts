// Shared SQL helpers for admin read paths (list + get for CMS tables).
// Only used by src/lib/data/admin/* — public accessors stay published-only.

import { query } from "@/lib/db";

export interface AdminListOpts {
  search?: string;
  published?: boolean;
}

/** SELECT * from `table` with optional ILIKE search + published filter. */
export async function listContentRows<T>(
  table: string,
  searchCols: string[],
  mapper: (row: Record<string, unknown>) => T,
  opts: AdminListOpts = {},
  orderBy = "updated_at DESC",
): Promise<T[]> {
  const search = opts.search?.trim() ?? "";
  const published = opts.published ?? null;
  const where: string[] = [];
  const params: unknown[] = [];

  if (search) {
    params.push(search);
    const p = `$${params.length}`;
    where.push(
      `(${searchCols.map((c) => `${c} ILIKE '%' || ${p} || '%'`).join(" OR ")})`,
    );
  }
  if (published !== null) {
    params.push(published);
    where.push(`published = $${params.length}`);
  }

  const sql = `SELECT * FROM ${table}${
    where.length ? ` WHERE ${where.join(" AND ")}` : ""
  } ORDER BY ${orderBy}`;
  const res = await query<Record<string, unknown>>(sql, params);
  return res.rows.map(mapper);
}

export async function getContentRow<T>(
  table: string,
  idColumn: string,
  id: string,
  mapper: (row: Record<string, unknown>) => T,
): Promise<T | null> {
  const res = await query<Record<string, unknown>>(
    `SELECT * FROM ${table} WHERE ${idColumn} = $1 LIMIT 1`,
    [id],
  );
  return res.rows[0] ? mapper(res.rows[0]) : null;
}