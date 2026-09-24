"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Button } from "@/components/ui/button";
import type { CampaignBanner } from "@/lib/types";

const STORAGE_PREFIX = "aut-banner:v1:";

export function CampaignBanners({ banners }: { banners: CampaignBanner[] }) {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const next: Record<string, boolean> = {};
      for (const banner of banners) {
        try {
          next[banner.id] =
            localStorage.getItem(`${STORAGE_PREFIX}${banner.version}`) === "1";
        } catch {
          next[banner.id] = false;
        }
      }
      setHidden(next);
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [banners]);

  function dismiss(banner: CampaignBanner) {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${banner.version}`, "1");
    } catch {
      /* ignore */
    }
    setHidden((prev) => ({ ...prev, [banner.id]: true }));
  }

  if (!ready) return null;

  const visible = banners.filter((b) => !hidden[b.id]);
  if (visible.length === 0) return null;

  const banner = visible[0];

  return (
    <div className="bg-chart-3 text-background">
      <Container className="flex items-center justify-between gap-4 py-3">
        <p className="min-w-0 flex-1 text-sm leading-relaxed">
          <span className="text-background/90">{banner.text}</span>{" "}
          <Link
            href={banner.href}
            className="font-bold text-background underline-offset-4 hover:underline"
          >
            {banner.cta}
          </Link>
        </p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="بستن بنر"
          className="shrink-0 text-background/70 hover:bg-background/10 hover:text-background"
          onClick={() => dismiss(banner)}
        >
          <X className="size-4" />
        </Button>
      </Container>
    </div>
  );
}
