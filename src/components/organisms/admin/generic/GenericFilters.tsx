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

function buildUrl(entity: string, search: string, published: string) {
  const params = new URLSearchParams();
  if (search.trim()) params.set("search", search.trim());
  if (published && published !== "all") params.set("published", published);
  const qs = params.toString();
  return qs ? `/admin/${entity}?${qs}` : `/admin/${entity}`;
}

export function GenericFilters({
  entity,
  searchHint,
  hasPublished,
  initialSearch,
  initialPublished,
}: {
  entity: string;
  searchHint: string;
  hasPublished: boolean;
  initialSearch: string;
  initialPublished: string;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [published, setPublished] = useState(initialPublished);
  const hasFilters = Boolean(initialSearch.trim()) || initialPublished !== "all";

  function apply(e: React.FormEvent) {
    e.preventDefault();
    router.push(buildUrl(entity, search, published));
  }

  function clear() {
    setSearch("");
    setPublished("all");
    router.push(`/admin/${entity}`);
  }

  return (
    <form onSubmit={apply} className="flex flex-wrap items-end gap-3">
      <div className="w-full max-w-xs space-y-1.5">
        <label htmlFor={`${entity}-search`} className="text-sm font-medium">
          جستجو
        </label>
        <Input
          id={`${entity}-search`}
          placeholder={searchHint}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {hasPublished && (
        <div className="w-full max-w-[12rem] space-y-1.5">
          <label htmlFor={`${entity}-published`} className="text-sm font-medium">
            وضعیت انتشار
          </label>
          <Select value={published} onValueChange={(v) => setPublished(v ?? "all")}>
            <SelectTrigger id={`${entity}-published`} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="true">منتشرشده</SelectItem>
              <SelectItem value="false">پیش‌نویس</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <Button type="submit">اعمال فیلتر</Button>
      {hasFilters && (
        <Button type="button" variant="ghost" onClick={clear}>
          پاک‌کردن فیلترها
        </Button>
      )}
    </form>
  );
}