// Phase D — tiny SQL builders used by admin write Route Handlers to avoid
// large amounts of copy-paste. Column/table names are hardcoded literals in
// each caller (never user input), so the interpolated SQL is safe.

import { randomUUID } from "node:crypto";
import { revalidateSite } from "@/lib/api/revalidate";

export const makeId = () => randomUUID();

/** Parses a request JSON body; throws on invalid JSON (caller returns 400). */
export function parseJsonBody(request: Request): Promise<unknown> {
  return request.json();
}

// Revalidate public cache after admin writes (Phase H). Called from these
// builders (create/update paths) and, for DELETE, from each Route Handler.
export function revalidateSiteAfterWrite(): void {
  revalidateSite();
}

export interface UpdateSpec {
  sql: string;
  params: unknown[];
  empty: boolean;
}

/**
 * Builds `UPDATE <table> SET col = $n, ... WHERE <idCol> = $last RETURNING *`
 * including only keys present in `data`. Pass `params` + the id value to
 * `query()` in this order.
 */
export function buildUpdate(
  table: string,
  idCol: string,
  columnMap: Record<string, string>,
  data: Record<string, unknown>,
): UpdateSpec {
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [key, column] of Object.entries(columnMap)) {
    const value = data[key];
    if (value !== undefined) {
      params.push(value);
      sets.push(`${column} = $${params.length}`);
    }
  }
  revalidateSiteAfterWrite();
  return {
    empty: sets.length === 0,
    sql: `UPDATE ${table} SET ${sets.join(", ")} WHERE ${idCol} = $${params.length + 1} RETURNING *`,
    params,
  };
}

export interface InsertSpec {
  sql: string;
  params: unknown[];
}

export function buildInsert(table: string, columns: string[], params: unknown[]): InsertSpec {
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
  revalidateSiteAfterWrite();
  return {
    sql: `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`,
    params,
  };
}