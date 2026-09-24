// Phase A — migration runner
// Usage: node db/migrate.mjs
// Reads DATABASE_URL from .env.local if not already in the environment.
// Applies each file in db/migrations/*.sql in filename order, once, atomically.
// Tracks applied versions in a schema_migrations table; re-running is a no-op.

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import pg from "pg";

const { Client } = pg;

if (!process.env.DATABASE_URL) {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in process.env)) {
        process.env[match[1]] = match[2];
      }
    }
  }
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set and .env.local was not found.");
  process.exit(1);
}

const migrationsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "migrations");

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    const appliedRes = await client.query("SELECT version FROM schema_migrations");
    const applied = new Set(appliedRes.rows.map((r) => r.version));

    const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();

    let appliedCount = 0;
    const skipped = [];

    for (const file of files) {
      if (applied.has(file)) {
        skipped.push(file);
        continue;
      }
      const sql = await readFile(path.join(migrationsDir, file), "utf8");
      try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (version) VALUES ($1)", [file]);
        await client.query("COMMIT");
        console.log("applied:", file);
        appliedCount += 1;
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        console.error("FAILED on:", file);
        console.error(error instanceof Error ? error.message : error);
        process.exitCode = 1;
        return;
      }
    }

    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    console.log(`applied_count: ${appliedCount}`);
    console.log(`skipped (already applied): ${skipped.length ? skipped.join(", ") : "none"}`);
    console.log(`tables_count: ${tables.rows.length}`);
    console.log(JSON.stringify(tables.rows.map((r) => r.table_name)));
  } finally {
    await client.end().catch(() => {});
  }
}

await main();