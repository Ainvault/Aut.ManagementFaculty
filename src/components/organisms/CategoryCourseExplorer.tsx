"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}: {
  courses: Course[];
  findLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        category === "all" ||
        category === "best" ||
        course.category === category;
      const matchesQuery =
        !deferredQuery ||
        course.title.includes(deferredQuery) ||
        course.summary.includes(deferredQuery);
      return matchesCategory && matchesQuery;
    });
  }, [courses, category, deferredQuery]);

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
                src={course.imageUrl}
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
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-background/55">
                <span>
                  {course.durationHours} ساعت · {formatLabel(course.format)}
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
    </div>
  );
}
