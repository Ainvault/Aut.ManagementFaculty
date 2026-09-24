import { listAdminRegistrations } from "@/lib/data/admin/registrations";
import { RegistrationFilters } from "@/components/organisms/admin/registrations/RegistrationFilters";
import { RegistrationsTable } from "@/components/organisms/admin/registrations/RegistrationsTable";
import { LEAD_STATUS_LABELS } from "@/components/organisms/admin/LeadsList";
import {
  AdminPage,
  AdminPageHeader,
  AdminTableCard,
  AdminToolbarCard,
} from "@/components/organisms/admin/AdminPage";

export const dynamic = "force-dynamic";

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const { search = "", status = "" } = await searchParams;
  const rows = await listAdminRegistrations({ search, status });

  const parts = [
    `${rows.length} درخواست`,
    search ? `جستجو: «${search}»` : null,
    status && LEAD_STATUS_LABELS[status]
      ? `وضعیت: ${LEAD_STATUS_LABELS[status]}`
      : null,
  ].filter(Boolean);

  return (
    <AdminPage>
      <AdminPageHeader title="برگ ثبت‌نام" description={parts.join(" · ")} />

      <AdminToolbarCard description="جستجو بر اساس نام، ایمیل یا اسلاگ دوره">
        <RegistrationFilters
          initialSearch={search}
          initialStatus={status || "all"}
        />
      </AdminToolbarCard>

      <AdminTableCard title="درخواست‌ها" description="پیگیری و تغییر وضعیت لیدها">
        <RegistrationsTable rows={rows} />
      </AdminTableCard>
    </AdminPage>
  );
}
