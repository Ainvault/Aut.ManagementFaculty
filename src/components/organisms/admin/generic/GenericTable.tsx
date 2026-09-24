import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminEntitySpec } from "@/lib/admin/entities";
import { PublishToggle } from "@/components/organisms/admin/generic/PublishToggle";
import { GenericDeleteDialog } from "@/components/organisms/admin/generic/GenericDeleteDialog";

function truncate(value: unknown, max = 60): string {
  const text = String(value ?? "—");
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function GenericTable({ spec, rows }: { spec: AdminEntitySpec; rows: unknown[] }) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <p className="text-sm font-medium text-foreground">موردی یافت نشد</p>
        <p className="mt-1 text-sm text-muted-foreground">
          هنوز محتوایی برای این بخش ثبت نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {spec.columns.map((col) => (
              <TableHead key={col.name}>{col.label}</TableHead>
            ))}
            <TableHead>عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => {
            const r = row as Record<string, unknown>;
            const id = String(r[spec.idColumn] ?? "");
            const preview = spec.preview && r.published ? spec.preview(r) : null;
            return (
              <TableRow key={String(id)}>
                {spec.columns.map((col, i) => {
                  const value = r[col.name];
                  if (col.variant === "badge") {
                    const label = col.map ? (col.map[String(value)] ?? String(value)) : String(value);
                    const isPublish = col.name === "published";
                    return (
                      <TableCell key={col.name}>
                        <Badge variant={isPublish || label === "پیش‌نویس" ? "outline" : "secondary"}>
                          {value === null || value === undefined || value === "" ? "—" : label}
                        </Badge>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      key={col.name}
                      className={i === 0 ? "font-medium" : "text-muted-foreground"}
                    >
                      <span title={String(value ?? "")}>{truncate(value)}</span>
                    </TableCell>
                  );
                })}
                <TableCell>
                  <div className="flex items-center gap-3">
                    {spec.hasPublished && (
                      <PublishToggle apiPath={spec.apiPath} id={id} published={Boolean(r.published)} />
                    )}
                    <Link
                      href={`/admin/${spec.key}/${id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      ویرایش
                    </Link>
                    {preview && (
                      <Link
                        href={preview}
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        پیش‌نمایش
                      </Link>
                    )}
                    <GenericDeleteDialog apiPath={spec.apiPath} id={id} noun={spec.noun} subject={String(r[spec.columns[0].name] ?? "")} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}