"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { DotCta } from "@/components/atoms/DotCta";
import { ProgramCard } from "@/components/molecules/Cards";
import { Button } from "@/components/ui/button";
import type { Program } from "@/lib/types";

export function ProgramCarousel({
  title,
  programs,
  keepExploringLabel,
  hideTitle = false,
}: {
  title: string;
  programs: Program[];
  keepExploringLabel: string;
  hideTitle?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: "rtl",
    loop: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="min-w-0">
      <div className="mb-5 flex min-w-0 items-end justify-between gap-4">
        {!hideTitle && title ? (
          <h2 className="min-w-0 text-2xl font-bold tracking-tight break-words sm:text-3xl">
            {title}
          </h2>
        ) : (
          <span />
        )}
        <div className="flex shrink-0 gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="قبلی"
            onClick={scrollPrev}
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="بعدی"
            onClick={scrollNext}
          >
            <ChevronLeft className="size-4" />
          </Button>
        </div>
      </div>
      <div className="min-w-0 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-5">
          {programs.map((program) => (
            <div
              key={program.id}
              className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[45%] lg:basis-[31%]"
            >
              <ProgramCard program={program} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7">
        <DotCta href="/programs">{keepExploringLabel}</DotCta>
      </div>
    </div>
  );
}
