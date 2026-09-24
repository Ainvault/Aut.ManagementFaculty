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

function buildUrl(search: string, published: string) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (published && published !== "all") params.set("published", published);
  const qs = params.toString();
  return qs ? `/admin/courses?${qs}` : "/admin/courses";
}

export function CourseFilters({
  initialSearch,
  initialPublished,
}: {
  initialSearch: string;
  initialPublished: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [published, setPublished] = useState(initialPublished);
  const hasFilters = Boolean(initialSearch.trim()) || initialPublished !== "all";

  function apply(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildUrl(search, published));
  }

  function clear() {
    setSearch("");
    setPublished("all");
    router.push("/admin/courses");
  }

  return (
    <form
      onSubmit={apply}
      className="flex flex-wrap items-end gap-3"
    >
      <div className="w-full max-w-xs space-y-1.5">
        <label htmlFor="course-search" className="text-sm font-medium">
          جستجو
        </label>
        <Input
          id="course-search"
          placeholder="عنوان یا اسلاگ دوره..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full max-w-[12rem] space-y-1.5">
        <label htmlFor="course-published" className="text-sm font-medium">
          وضعیت انتشار
        </label>
        <Select value={published} onValueChange={(v) => setPublished(v ?? "all")}>
          <SelectTrigger id="course-published" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="true">منتشرشده</SelectItem>
            <SelectItem value="false">پیش‌نویس</SelectItem>
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