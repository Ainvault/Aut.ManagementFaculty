import pg from "pg";

const { Pool } = pg;

/**
 * Shared Postgres pool for server-side use.
 * Connection details: docs/03-database.md
 * Production must use DATABASE_URL → 185.36.145.12 (not Docker-internal DNS).
 */
export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://managment_web:hD3H9seTqX1GJMu1mDJBGDYr@185.36.145.12:5432/ManagmentWebSite_Db",
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("[db] idle client error:", err.message);
});

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  try {
    return await pool.query<T>(text, params);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[db] query failed:", message, { text: text.slice(0, 120) });
    throw err;
  }
}

/** Soft-fail helper for public pages — empty result instead of crashing the RSC tree. */
export async function queryRows<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<T[]> {
  try {
    const res = await query<T>(text, params);
    return res.rows;
  } catch {
    return [];
  }
}
