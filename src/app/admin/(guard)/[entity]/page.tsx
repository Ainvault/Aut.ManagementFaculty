import Link from "next/link";
import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/entities";
import { GenericFilters } from "@/components/organisms/admin/generic/GenericFilters";
import { GenericTable } from "@/components/organisms/admin/generic/GenericTable";
import {
  AdminPage,
  AdminPageHeader,
  AdminTableCard,
  AdminToolbarCard,
} from "@/components/organisms/admin/AdminPage";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminEntityListPage({
  params,
  searchParams,
}: {
  params: Promise<{ entity: string }>;
  searchParams: Promise<{ search?: string; published?: string }>;
}) {
  const { entity } = await params;
  const spec = ENTITIES[entity];
  if (!spec) notFound();

  const { search = "", published: publishedRaw } = await searchParams;
  const published =
    publishedRaw === "true" ? true : publishedRaw === "false" ? false : undefined;

  const rows = await spec.list({ search, published });

  return (
    <AdminPage>
      <AdminPageHeader
        title={spec.navLabel}
        description={`${rows.length} مورد${search ? ` مطابق فیلتر «${search}»` : ""}`}
        actions={
          <Link href={`/admin/${entity}/new`} className={cn(buttonVariants())}>
            + {spec.noun} جدید
          </Link>
        }
      />

      <AdminToolbarCard description={spec.searchHint}>
        <GenericFilters
          entity={entity}
          searchHint={spec.searchHint}
          hasPublished={spec.hasPublished}
          initialSearch={search}
          initialPublished={publishedRaw ?? "all"}
        />
      </AdminToolbarCard>

      <AdminTableCard title={`فهرست ${spec.navLabel}`}>
        <GenericTable spec={spec} rows={rows} />
      </AdminTableCard>
    </AdminPage>
  );
}
