import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/brand/amirkabir.png";

type BrandLogoProps = {
  href?: string;
  title: string;
  subtitle?: string;
  onDark?: boolean;
  className?: string;
  compact?: boolean;
};

/** AUT seal — raw mark only (transparent), no disc/ring/background. */
export function BrandLogo({
  href = "/",
  title,
  subtitle,
  onDark = false,
  className,
  compact = false,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex min-w-0 items-center gap-2.5 sm:gap-3",
        className,
      )}
      aria-label={[title, subtitle].filter(Boolean).join(" — ")}
    >
      <span
        className={cn(
          "relative shrink-0",
          compact ? "size-9" : "size-11 sm:size-12",
        )}
      >
        <Image
          src={LOGO_SRC}
          alt=""
          fill
          priority
          sizes="48px"
          className={cn(
            "object-contain",
            // Asset is white-on-transparent; invert to dark ink on light surfaces
            !onDark && "brightness-0",
          )}
        />
      </span>
      <span className="min-w-0 text-start leading-tight">
        <span
          className={cn(
            "block truncate font-black tracking-tight transition-colors",
            compact ? "text-base" : "text-base sm:text-lg",
            onDark ? "group-hover:text-background/70" : "group-hover:text-primary",
          )}
        >
          {title}
        </span>
        {subtitle ? (
          <span
            className={cn(
              "mt-0.5 hidden truncate text-[0.7rem] font-medium min-[380px]:block sm:text-xs",
              onDark ? "text-background/70" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
