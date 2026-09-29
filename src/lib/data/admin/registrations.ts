import { query } from "@/lib/db";

export interface AdminRegistration {
  id: string;
  course_id: string | null;
  course_slug: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  position: string | null;
  organization: string | null;
  message: string | null;
  source: string;
  status: string;
  created_at: string;
}

export interface AdminRegistrationFilters {
  search?: string;
  status?: string;
}

export async function listAdminRegistrations(
  filters: AdminRegistrationFilters = {},
): Promise<AdminRegistration[]> {
  const search = filters.search?.trim() ?? "";
  const status = filters.status?.trim() ?? "";
  const where: string[] = [];
  const params: unknown[] = [];

  if (search) {
    params.push(search);
    const p = `$${params.length}`;
    where.push(
      `(full_name ILIKE '%' || ${p} || '%' OR email ILIKE '%' || ${p} || '%' OR COALESCE(course_slug, '') ILIKE '%' || ${p} || '%' OR COALESCE(position, '') ILIKE '%' || ${p} || '%' OR COALESCE(organization, '') ILIKE '%' || ${p} || '%')`,
    );
  }
  if (status) {
    params.push(status);
    where.push(`status = $${params.length}`);
  }

  const sql = `SELECT * FROM registration_leads${
    where.length ? ` WHERE ${where.join(" AND ")}` : ""
  } ORDER BY created_at DESC`;
  const res = await query<AdminRegistration>(sql, params);
  return res.rows;
}