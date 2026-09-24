// Quick admin user seed for Phase E - standalone .mjs
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";
import pg from "pg";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scryptAsync(password, salt, 64);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

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

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const email = "admin@aut.ac.ir";
  const password = "admin123";
  const name = "مدیر سیستم";
  const role = "admin";

  const passwordHash = await hashPassword(password);

  try {
    await pool.query(
      `INSERT INTO admin_users (email, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO UPDATE SET password_hash = $2, name = $3, role = $4`,
      [email, passwordHash, name, role],
    );
    console.log("Admin user seeded:", email, "/", password);
  } catch (error) {
    console.error("Seed admin error:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

await main();