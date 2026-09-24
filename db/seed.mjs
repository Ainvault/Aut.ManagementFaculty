// Phase B — seed mock content into PostgreSQL.
// Usage: node db/seed.mjs  (re-runnable; uses upsert by primary key)
// Reads DATABASE_URL from .env.local if not already in the environment.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

import { courses } from "../src/lib/mock/courses.ts";
import { programs } from "../src/lib/mock/programs.ts";
import { events } from "../src/lib/mock/events.ts";
import { articles } from "../src/lib/mock/articles.ts";
import {
  alumniStories,
  campaignBanners,
  faculty,
  intersections,
  legalPages,
  stats,
  testimonials,
} from "../src/lib/mock/site.ts";

import {
  alumniStoryToRow,
  articleToRow,
  campaignBannerToRow,
  courseToRow,
  eventToRow,
  facultyMemberToRow,
  intersectionTopicToRow,
  legalPageToRow,
  programToRow,
  siteStatToRow,
  testimonialToRow,
} from "../src/lib/db/mappers.ts";

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

const { Client } = pg;

async function upsertByKey(client, table, rows, columns, key = "id") {
  if (rows.length === 0) return 0;
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
  const updates = columns
    .filter((c) => c !== key)
    .map((c) => `${c} = EXCLUDED.${c}`)
    .join(", ");
  const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})
    ON CONFLICT (${key}) DO UPDATE SET ${updates}`;
  for (const row of rows) {
    const values = columns.map((c) => row[c]);
    await client.query(sql, values);
  }
  return rows.length;
}

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  try {
    const results = [];
    const upsert = (table, rows, columns, key) =>
      upsertByKey(client, table, rows, columns, key).then((n) => {
        results.push([table, n]);
      });

    await upsert("courses", courses.map(courseToRow), [
      "id", "slug", "title", "summary", "category", "duration_hours", "format", "price",
      "registration_url", "image_url", "seo_description", "published",
    ]);
    await upsert("programs", programs.map(programToRow), [
      "id", "slug", "title", "blurb", "group_key", "href", "tagline", "audience",
      "duration_label", "format_label", "highlights", "body", "published",
    ]);
    await upsert("events", events.map(eventToRow), [
      "id", "title", "start_date", "end_date", "location", "href", "summary", "published",
    ]);
    await upsert("articles", articles.map(articleToRow), [
      "id", "title", "category", "excerpt", "image_url", "href", "featured",
      "body", "published_at", "author", "published",
    ]);
    await upsert("intersection_topics", intersections.map(intersectionTopicToRow), [
      "id", "slug", "title", "description", "href", "image_url", "body", "highlights", "published",
    ]);
    await upsert("faculty_members", faculty.map(facultyMemberToRow), [
      "id", "name", "title", "focus", "bio", "image_url", "published",
    ]);
    await upsert("alumni_stories", alumniStories.map(alumniStoryToRow), [
      "id", "title", "excerpt", "name", "program", "image_url", "href", "published",
    ]);
    await upsert("campaign_banners", campaignBanners.map(campaignBannerToRow), [
      "id", "version", "text", "href", "cta", "published",
    ]);
    await upsert("legal_pages", legalPages.map(legalPageToRow), [
      "slug", "title", "body", "published",
    ], "slug");
    await upsert("site_stats", stats.map(siteStatToRow), [
      "id", "value", "label", "published",
    ]);
    await upsert("testimonials", testimonials.map(testimonialToRow), [
      "id", "quote", "name", "role", "course_title", "published",
    ]);

    const counts = await client.query(`
      SELECT (SELECT count(*) FROM courses) AS courses,
             (SELECT count(*) FROM programs) AS programs,
             (SELECT count(*) FROM events) AS events,
             (SELECT count(*) FROM articles) AS articles,
             (SELECT count(*) FROM intersection_topics) AS topics,
             (SELECT count(*) FROM faculty_members) AS faculty,
             (SELECT count(*) FROM alumni_stories) AS alumni,
             (SELECT count(*) FROM campaign_banners) AS banners,
             (SELECT count(*) FROM legal_pages) AS legal,
             (SELECT count(*) FROM site_stats) AS stats,
             (SELECT count(*) FROM testimonials) AS testimonials,
             (SELECT count(*) FROM articles WHERE featured = true AND published = true) AS featured_articles
    `);

    console.log("seed_rows:");
    for (const [table, n] of results) {
      console.log(`  ${table}: ${n}`);
    }
    console.log("db_counts:", JSON.stringify(counts.rows[0]));
  } finally {
    await client.end().catch(() => {});
  }
}

await main();