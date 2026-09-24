"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchOverlay } from "@/components/organisms/SearchOverlay";
import type { Course, NavItem, Program } from "@/lib/types";
import { cn } from "@/lib/utils";

const AcademicsOverlay = dynamic(
  () =>
    import("@/components/organisms/AcademicsOverlay").then(
      (m) => m.AcademicsOverlay,
    ),
  { ssr: false },
);

export function SiteHeader({
  items,
  searchLabel,
  brandHref = "/",
  brandTitle,
  brandSubtitle,
  academicsLabel,
  programSelectorTitle,
  executiveLabel,
  exploreLabel,
  variant = "home",
  courses = [],
  programs = [],
}: {
  items: NavItem[];
  searchLabel: string;
  brandHref?: string;
  brandTitle: string;
  brandSubtitle?: string;
  academicsLabel: string;
  programSelectorTitle: string;
  executiveLabel: string;
  exploreLabel: string;
  variant?: "home" | "professional";
  courses?: Course[];
  programs?: Program[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const isDark = variant === "professional";
  const standardPrograms = programs.filter((p) => p.group === "standard");
  const executivePrograms = programs.filter((p) => p.group === "executive");

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "site-header sticky top-0 z-50 pt-[env(safe-area-inset-top)] shadow-sm backdrop-blur-sm md:backdrop-blur-xl",
          isDark
            ? "border-b border-background/10 bg-chart-3/95 text-background"
            : "border-b border-border bg-card/95 text-foreground",
        )}
      >
        <Container className="flex h-[4.5rem] min-w-0 items-center justify-start gap-2 sm:h-20 sm:gap-5" dir="rtl">
          <BrandLogo
            href={brandHref}
            title={brandTitle}
            subtitle={brandSubtitle}
            onDark={isDark}
            className="max-w-[min(100%,14rem)] sm:max-w-[min(100%,20rem)]"
          />

          <nav
            className="hidden min-w-0 flex-1 items-center justify-start gap-0.5 xl:flex"
            aria-label="منوی اصلی"
          >
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
                  isDark
                    ? "text-background/80 hover:text-background"
                    : "text-foreground/75 hover:bg-muted hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "ms-2 h-9 border-primary/20 font-bold text-primary hover:bg-primary hover:text-primary-foreground",
                isDark &&
                  "border-background/50 bg-transparent text-background hover:bg-background hover:text-foreground",
              )}
              onClick={() => setAcademicsOpen(true)}
            >
              {academicsLabel}
            </Button>
          </nav>

          <div
            className={cn(
              "ms-auto flex shrink-0 items-center gap-0.5 xl:ms-0",
              isDark && "text-background",
            )}
          >
            <SearchOverlay
              courses={courses}
              programs={programs}
              label={searchLabel}
            />
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </Container>
      </header>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-chart-3 text-background pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="منوی اصلی"
        >
          <Container className="flex h-16 items-center justify-between gap-3">
            <BrandLogo
              href={brandHref}
              title={brandTitle}
              subtitle={brandSubtitle}
              onDark
              compact
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-background hover:bg-background/10"
              aria-label="بستن منو"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </Container>
          <Separator className="bg-background/10" />
          <Container className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 text-start">
              {items.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="block py-3.5 text-lg font-bold transition-colors hover:text-background/70"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-8 w-full border-background/80 bg-transparent py-3.5 text-background hover:bg-background hover:text-foreground"
              onClick={() => {
                setMobileOpen(false);
                setAcademicsOpen(true);
              }}
            >
              {academicsLabel}
            </Button>
          </Container>
        </div>
      ) : null}

      {academicsOpen ? (
        <AcademicsOverlay
          open={academicsOpen}
          onClose={() => setAcademicsOpen(false)}
          title={programSelectorTitle}
          executiveLabel={executiveLabel}
          exploreLabel={exploreLabel}
          standardPrograms={standardPrograms}
          executivePrograms={executivePrograms}
        />
      ) : null}
    </>
  );
}
