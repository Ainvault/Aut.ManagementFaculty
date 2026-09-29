import pg from "pg";

const { Pool } = pg;

/**
 * Shared Postgres pool for server-side use.
 * Connection details: docs/03-database.md
 */
export const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgresql://managment_web:hD3H9seTqX1GJMu1mDJBGDYr@185.36.145.12:5432/ManagmentWebSite_Db",
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return pool.query<T>(text, params);
}
