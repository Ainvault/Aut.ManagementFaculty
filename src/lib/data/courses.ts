import { query } from "@/lib/db";
import type { Course } from "@/lib/types";
import { rowToCourse, type CourseRow } from "@/lib/db/mappers";

export async function getCourses(): Promise<Course[]> {
  const res = await query<CourseRow>(
    "SELECT * FROM courses WHERE published = true ORDER BY title ASC",
  );
  return res.rows.map(rowToCourse);
}

export async function getCourseById(id: string): Promise<Course | null> {
  const res = await query<CourseRow>(
    "SELECT * FROM courses WHERE published = true AND (id = $1 OR slug = $1) LIMIT 1",
    [id],
  );
  return res.rows[0] ? rowToCourse(res.rows[0]) : null;
}