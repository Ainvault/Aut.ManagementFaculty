"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/lib/types";
import { courseCategories } from "@/lib/site-config";
import { formatCoursePrice, formatLabel } from "@/lib/labels";
import { cn } from "@/lib/utils";

export function CategoryCourseExplorer({
  courses,
  findLabel,
  tagsLabel = "دسته‌بندی‌ها",
}: {
  courses: Course[];
  findLabel: string;
  tagsLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  // Distinct tags across all courses (stable order: most used first).
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const course of courses) {
      for (const t of course.tags ?? []) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        category === "all" ||
        category === "best" ||
        course.category === category;
      const matchesTag = !tag || (course.tags ?? []).includes(tag);
      const matchesQuery =
        !deferredQuery ||
        course.title.includes(deferredQuery) ||
        course.summary.includes(deferredQuery);
      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [courses, category, tag, deferredQuery]);

  const resetFilters = () => {
    setCategory("all");
    setTag("");
    setQuery("");
  };

  return (
    <div className="space-y-8">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <Label className="sr-only" htmlFor="course-search">
          {findLabel}
        </Label>
        <Input
          id="course-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={findLabel}
          className="h-11 flex-1 border-border bg-background text-foreground placeholder:text-muted-foreground"
        />
        <Button type="submit" className="h-11">
          جستجو
        </Button>
      </form>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="دسته‌بندی دوره‌ها"
      >
        {courseCategories.map((item) => (
          <Button
            key={item.id}
            type="button"
            role="tab"
            size="sm"
            variant={category === item.id ? "default" : "ghost"}
            aria-selected={category === item.id}
            onClick={() => setCategory(item.id)}
            className={cn(
              category !== item.id &&
                "bg-background/10 text-background/85 hover:bg-background/20 hover:text-background",
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {tags.length > 0 ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-background/80">
              {tagsLabel}
            </span>
            <Button
              type="button"
              size="sm"
              variant={tag === "" ? "default" : "ghost"}
              aria-selected={tag === ""}
              onClick={() => setTag("")}
              className={cn(
                tag !== "" &&
                  "bg-background/10 text-background/85 hover:bg-background/20 hover:text-background",
              )}
            >
              همه
            </Button>
            {tags.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={tag === item ? "default" : "ghost"}
                aria-selected={tag === item}
                onClick={() => setTag(tag === item ? "" : item)}
                className={cn(
                  tag !== item &&
                    "bg-background/10 text-background/85 hover:bg-background/20 hover:text-background",
                )}
              >
                {item}
              </Button>
            ))}
          </div>

          {(tag !== "" || category !== "all") && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-background/60">
              <span>فیلترهای فعال:</span>
              {category !== "all" && (
                <Badge variant="secondary" className="gap-1 py-0.5 pe-1">
                  {courseCategories.find((c) => c.id === category)?.label ?? category}
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className="rounded-full p-0.5 hover:bg-foreground/10"
                    aria-label="حذف فیلتر دسته‌بندی"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {tag !== "" && (
                <Badge variant="secondary" className="gap-1 py-0.5 pe-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => setTag("")}
                    className="rounded-full p-0.5 hover:bg-foreground/10"
                    aria-label="حذف فیلتر تگ"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="underline underline-offset-4 hover:text-background"
              >
                پاک‌کردن همه
              </button>
            </div>
          )}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-background/60">
          دوره‌ای با این فیلترها یافت نشد.
        </p>
      ) : (
        <div
          className={cn(
            "grid gap-5 transition-opacity sm:grid-cols-2 lg:grid-cols-3",
            isStale && "opacity-70",
          )}
        >
          {filtered.map((course) => {
            const priceLabel = formatCoursePrice(course.price);
            return (
              <Card
                key={course.id}
                className="gap-0 overflow-hidden bg-background/5 py-0 text-background ring-background/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={course.posterImageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <CardHeader className="gap-1 px-4 pt-4">
                  <CardTitle className="text-base text-background">
                    <Link
                      href={course.registrationUrl}
                      className="transition-opacity hover:opacity-90"
                    >
                      {course.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 px-4 pb-4">
                  <CardDescription className="line-clamp-3 text-background/70">
                    {course.summary}
                  </CardDescription>
                  {course.tags && course.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {course.tags.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="border-background/25 text-[10px] text-background/80"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-background/55">
                    <span>
                      {course.durationHours
                        ? `${course.durationHours} ساعت · ${formatLabel(course.format)}`
                        : formatLabel(course.format)}
                    </span>
                    {priceLabel ? (
                      <span className="font-semibold text-background/90">
                        {priceLabel}
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={course.registrationUrl}
                    className="inline-flex text-sm font-semibold text-background underline-offset-4 hover:underline"
                  >
                    جزئیات و ثبت‌نام
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}