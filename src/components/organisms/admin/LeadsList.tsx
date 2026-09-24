"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const LEAD_STATUS_LABELS: Record<string, string> = {
  new: "جدید",
  contacted: "تماس گرفته شد",
  enrolled: "ثبت‌نام شد",
  rejected: "رد شد",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  new: "default",
  contacted: "secondary",
  enrolled: "outline",
  rejected: "destructive",
};

export interface LeadForDashboard {
  id: string;
  full_name: string;
  email: string;
  course_slug: string | null;
  status: string;
  created_at: string;
}

export function LeadsList({ leads }: { leads: LeadForDashboard[] }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function changeStatus(id: string, status: string) {
    setError("");
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
  }

  if (leads.length === 0) {
    return <p className="text-sm text-muted-foreground">درخواستی ثبت نشده است.</p>;
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-2 pe-4 font-medium">نام</th>
              <th className="py-2 pe-4 font-medium">ایمیل</th>
              <th className="py-2 pe-4 font-medium">دوره</th>
              <th className="py-2 pe-4 font-medium">وضعیت</th>
              <th className="py-2 font-medium">تغییر وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="py-3 pe-4">{lead.full_name}</td>
                <td className="py-3 pe-4 text-muted-foreground">{lead.email}</td>
                <td className="py-3 pe-4 text-muted-foreground">
                  {lead.course_slug ?? "—"}
                </td>
                <td className="py-3 pe-4">
                  <Badge variant={STATUS_VARIANTS[lead.status] ?? "secondary"}>
                    {LEAD_STATUS_LABELS[lead.status] ?? lead.status}
                  </Badge>
                </td>
                <td className="py-3">
                  <Select
                    value={lead.status}
                    onValueChange={(v) => v && changeStatus(lead.id, v)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">جدید</SelectItem>
                      <SelectItem value="contacted">تماس گرفته شد</SelectItem>
                      <SelectItem value="enrolled">ثبت‌نام شد</SelectItem>
                      <SelectItem value="rejected">رد شد</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}