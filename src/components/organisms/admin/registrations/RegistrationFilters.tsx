"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function buildUrl(search: string, status: string) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (status && status !== "all") params.set("status", status);
  const qs = params.toString();
  return qs ? `/admin/registrations?${qs}` : "/admin/registrations";
}

export function RegistrationFilters({
  initialSearch,
  initialStatus,
}: {
  initialSearch: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const hasFilters = Boolean(initialSearch.trim()) || initialStatus !== "all";

  function apply(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildUrl(search, status));
  }

  function clear() {
    setSearch("");
    setStatus("all");
    router.push("/admin/registrations");
  }

  return (
    <form onSubmit={apply} className="flex flex-wrap items-end gap-3">
      <div className="w-full max-w-xs space-y-1.5">
        <label htmlFor="reg-search" className="text-sm font-medium">
          جستجو
        </label>
        <Input
          id="reg-search"
          placeholder="نام، ایمیل یا اسلاگ دوره..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full max-w-[12rem] space-y-1.5">
        <label htmlFor="reg-status" className="text-sm font-medium">
          وضعیت
        </label>
        <Select value={status} onValueChange={(v) => setStatus(v ?? "all")}>
          <SelectTrigger id="reg-status" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="new">جدید</SelectItem>
            <SelectItem value="contacted">تماس گرفته شد</SelectItem>
            <SelectItem value="enrolled">ثبت‌نام شد</SelectItem>
            <SelectItem value="rejected">رد شد</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">اعمال فیلتر</Button>
      {hasFilters && (
        <Button type="button" variant="ghost" onClick={clear}>
          پاک‌کردن فیلترها
        </Button>
      )}
    </form>
  );
}