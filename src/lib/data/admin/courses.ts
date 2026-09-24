import { query } from "@/lib/db";
import type { Course } from "@/lib/types";
import { rowToCourse, type CourseRow } from "@/lib/db/mappers";

/** Course as returned to admin (includes rows that are not yet published). */
export interface AdminCourse extends Course {
  published: boolean;
}

function toAdminCourse(row: CourseRow): AdminCourse {
  return { ...rowToCourse(row), published: row.published };
}

export async function listAdminCourses(opts?: {
  search?: string;
  published?: boolean;
}): Promise<AdminCourse[]> {
  const search = opts?.search?.trim() ?? "";
  const published = opts?.published ?? null;
  const res = await query<CourseRow>(
    `SELECT * FROM courses
     WHERE ($1 = '' OR title ILIKE '%' || $1 || '%' OR slug ILIKE '%' || $1 || '%')
       AND ($2::boolean IS NULL OR published = $2)
     ORDER BY updated_at DESC`,
    [search, published],
  );
  return res.rows.map(toAdminCourse);
}

export async function getAdminCourseById(id: string): Promise<AdminCourse | null> {
  const res = await query<CourseRow>("SELECT * FROM courses WHERE id = $1 LIMIT 1", [id]);
  return res.rows[0] ? toAdminCourse(res.rows[0]) : null;
}