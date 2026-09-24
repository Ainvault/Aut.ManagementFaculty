import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/entities";
import { GenericForm } from "@/components/organisms/admin/generic/GenericForm";
import {
  AdminPage,
  AdminPageHeader,
} from "@/components/organisms/admin/AdminPage";

export const dynamic = "force-dynamic";

export default async function AdminEntityEditPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const spec = ENTITIES[entity];
  if (!spec) notFound();

  const row = (await spec.get(id)) as Record<string, unknown>;
  if (!row) notFound();

  return (
    <AdminPage>
      <AdminPageHeader
        title={`ویرایش ${spec.noun}`}
        description={String(row[spec.columns[0].name] ?? "")}
        backHref={`/admin/${entity}`}
        backLabel={`بازگشت به ${spec.navLabel}`}
      />
      <GenericForm
        spec={{
          key: spec.key,
          noun: spec.noun,
          apiPath: spec.apiPath,
          idColumn: spec.idColumn,
          fields: spec.fields,
        }}
        initial={row}
      />
    </AdminPage>
  );
}
