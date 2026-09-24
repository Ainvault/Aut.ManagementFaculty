"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { DotCta } from "@/components/atoms/DotCta";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/types";

export function AcademicsOverlay({
  open,
  onClose,
  title,
  executiveLabel,
  exploreLabel,
  standardPrograms,
  executivePrograms,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  executiveLabel: string;
  exploreLabel: string;
  standardPrograms: Program[];
  executivePrograms: Program[];
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto bg-card text-foreground"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <Container className="py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="px-0 font-semibold hover:bg-transparent hover:text-primary"
          >
            بازگشت به منو
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="بستن"
          >
            <X className="size-5" />
          </Button>
        </div>

        <h2 className="mb-10 max-w-3xl text-start text-3xl font-bold tracking-tight break-words sm:text-4xl">
          {title}
        </h2>

        <ul className="grid min-w-0 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {standardPrograms.map((program) => (
            <li key={program.id}>
              <Link
                href={program.href}
                onClick={onClose}
                className="group block"
              >
                <span className="text-base font-extrabold leading-snug group-hover:text-primary">
                  {program.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {program.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 mb-6 text-lg font-extrabold text-primary">
          {executiveLabel}
        </h3>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {executivePrograms.map((program) => (
            <li key={program.id}>
              <Link
                href={program.href}
                onClick={onClose}
                className="group block"
              >
                <span className="text-base font-extrabold leading-snug group-hover:text-primary">
                  {program.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {program.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <DotCta href="/programs">{exploreLabel}</DotCta>
        </div>
      </Container>
    </div>
  );
}
