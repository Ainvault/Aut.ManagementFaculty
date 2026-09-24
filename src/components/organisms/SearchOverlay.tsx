"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Course, Program } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SearchOverlay({
  courses,
  programs,
  label,
}: {
  courses: Course[];
  programs: Program[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingInlineEnd;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingInlineEnd = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingInlineEnd = previousPadding;
    };
  }, [open]);

  const results = useMemo(() => {
    const q = deferredQuery.trim();
    if (!q) {
      return { programs: programs.slice(0, 4), courses: courses.slice(0, 4) };
    }
    return {
      programs: programs.filter(
        (p) => p.title.includes(q) || p.blurb.includes(q),
      ),
      courses: courses.filter(
        (c) => c.title.includes(q) || c.summary.includes(q),
      ),
    };
  }, [deferredQuery, programs, courses]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={label}
        onClick={() => setOpen(true)}
        className="size-11 text-inherit hover:bg-foreground/5"
      >
        <Search />
      </Button>

      {open ? createPortal(
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-background text-foreground"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="border-b border-border bg-card">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
              <p className="text-sm font-semibold text-muted-foreground">{label}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-muted"
                aria-label="بستن جستجو"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>
          </div>
          <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی برنامه یا دوره…"
              className="h-14 rounded-xl border-border bg-card px-4 text-lg text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 sm:text-xl"
            />
            <div
              className={cn(
                "grid gap-8 transition-opacity sm:grid-cols-2",
                isStale && "opacity-70",
              )}
            >
              <ResultGroup
                title="برنامه‌ها"
                items={results.programs.map((p) => ({
                  href: p.href,
                  title: p.title,
                  subtitle: p.tagline,
                }))}
                onNavigate={() => setOpen(false)}
              />
              <ResultGroup
                title="دوره‌ها"
                items={results.courses.map((c) => ({
                  href: c.registrationUrl,
                  title: c.title,
                  subtitle: c.summary,
                }))}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      , document.body) : null}
    </>
  );
}

function ResultGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { href: string; title: string; subtitle?: string }[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold text-muted-foreground">{title}</p>
      <ul className="space-y-3">
        {items.length === 0 ? (
          <li className="text-sm text-muted-foreground">موردی یافت نشد</li>
        ) : (
          items.map((item) => (
            <li key={item.href + item.title}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-xl bg-card p-4 shadow-sm ring-1 ring-border transition-[background-color,box-shadow] hover:bg-muted hover:shadow-md"
              >
                <span className="font-semibold">{item.title}</span>
                {item.subtitle ? (
                  <span className="mt-1 line-clamp-2 block text-xs leading-6 text-muted-foreground">
                    {item.subtitle}
                  </span>
                ) : null}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
