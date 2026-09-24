"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminRegistration } from "@/lib/data/admin/registrations";
import { LEAD_STATUS_LABELS } from "@/components/organisms/admin/LeadsList";

function statusVariant(status: string): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "new":
      return "default";
    case "contacted":
      return "secondary";
    case "enrolled":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
}

function faDate(value: string): string {
  return new Date(value).toLocaleDateString("fa-IR");
}

export function RegistrationsTable({ rows }: { rows: AdminRegistration[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function changeStatus(id: string, status: string) {
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "خطا در تغییر وضعیت");
        return;
      }
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function deleteLead(id: string) {
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "خطا در حذف لید");
        return;
      }
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
        <p className="text-sm font-medium text-foreground">درخواستی یافت نشد</p>
        <p className="mt-1 text-sm text-muted-foreground">
          فیلتر را تغییر دهید یا منتظر درخواست جدید بمانید.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {error ? (
        <p className="border-b border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>نام</TableHead>
              <TableHead>ایمیل</TableHead>
              <TableHead>تلفن</TableHead>
              <TableHead>دوره</TableHead>
              <TableHead>وضعیت</TableHead>
              <TableHead>تغییر وضعیت</TableHead>
              <TableHead>تاریخ</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.full_name}</TableCell>
                <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                <TableCell className="text-muted-foreground">{lead.phone ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.course_slug ?? "—"}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(lead.status)}>
                    {LEAD_STATUS_LABELS[lead.status] ?? lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select value={lead.status} onValueChange={(v) => v && changeStatus(lead.id, v)}>
                    <SelectTrigger className="w-40" disabled={busyId === lead.id}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">جدید</SelectItem>
                      <SelectItem value="contacted">تماس گرفته شد</SelectItem>
                      <SelectItem value="enrolled">ثبت‌نام شد</SelectItem>
                      <SelectItem value="rejected">رد شد</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-muted-foreground">{faDate(lead.created_at)}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={busyId === lead.id}
                    onClick={() => deleteLead(lead.id)}
                  >
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}