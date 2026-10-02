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

function buildUrl(search: string, published: string, tag: string) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (published && published !== "all") params.set("published", published);
  if (tag && tag.trim()) params.set("tag", tag.trim());
  const qs = params.toString();
  return qs ? `/admin/courses?${qs}` : "/admin/courses";
}

export function CourseFilters({
  initialSearch,
  initialPublished,
  initialTag,
  availableTags,
}: {
  initialSearch: string;
  initialPublished: string;
  initialTag: string;
  availableTags: string[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [published, setPublished] = useState(initialPublished);
  const [tag, setTag] = useState(initialTag);
  const hasFilters = Boolean(search.trim()) || published !== "all" || Boolean(tag.trim());

  function apply(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildUrl(search, published, tag));
  }

  function clear() {
    setSearch("");
    setPublished("all");
    setTag("");
    router.push("/admin/courses");
  }

  return (
    <form onSubmit={apply} className="flex flex-wrap items-end gap-3">
      {/* ... search input ... */}
      <div className="w-full max-w-xs space-y-1.5">
        <label htmlFor="course-search" className="text-sm font-medium">جستجو</label>
        <Input
          id="course-search"
          placeholder="عنوان یا اسلاگ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ... published select ... */}
      <div className="w-full max-w-[12rem] space-y-1.5">
        <label htmlFor="course-published" className="text-sm font-medium">وضعیت انتشار</label>
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

      {/* ... tag select ... */}
      <div className="w-full max-w-[12rem] space-y-1.5">
        <label htmlFor="course-tag" className="text-sm font-medium">تگ</label>
        <Select value={tag} onValueChange={(v) => setTag(v ?? "")}>
          <SelectTrigger id="course-tag" className="w-full">
            <SelectValue placeholder="همه" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">همه</SelectItem>
            {availableTags.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">اعمال فیلتر</Button>
      {hasFilters && (
        <Button type="button" variant="ghost" onClick={clear}>پاک‌کردن فیلترها</Button>
      )}
    </form>
  );
}