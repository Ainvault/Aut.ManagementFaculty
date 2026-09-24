import { notFound } from "next/navigation";
import { ENTITIES } from "@/lib/admin/entities";
import { GenericForm } from "@/components/organisms/admin/generic/GenericForm";
import {
  AdminPage,
  AdminPageHeader,
} from "@/components/organisms/admin/AdminPage";

export const dynamic = "force-dynamic";

export default async function AdminEntityCreatePage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const spec = ENTITIES[entity];
  if (!spec) notFound();

  return (
    <AdminPage>
      <AdminPageHeader
        title={`${spec.noun} جدید`}
        description={
          spec.hasPublished
            ? "پس از ثبت، در صورت «منتشرشده» بودن در سایت عمومی نمایش داده می‌شود."
            : undefined
        }
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
      />
    </AdminPage>
  );
}
