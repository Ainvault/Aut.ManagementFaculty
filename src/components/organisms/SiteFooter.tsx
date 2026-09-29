import Link from "next/link";
import { BrandLogo } from "@/components/atoms/BrandLogo";
import { Container } from "@/components/atoms/Container";
import { Separator } from "@/components/ui/separator";
import {
  siteAddress,
  siteUniversity,
  siteShortName,
} from "@/lib/site-config";

export function SiteFooter({
  copyright,
  links,
  linksTitle = "دسترسی سریع",
}: {
  copyright: string;
  links: { label: string; href: string }[];
  linksTitle?: string;
  variant?: "home" | "professional";
}) {
  return (
    <footer className="border-t border-border bg-chart-3 pb-[env(safe-area-inset-bottom)] text-background">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="max-w-sm space-y-4">
            <BrandLogo
              title={siteShortName}
              subtitle={siteUniversity}
              onDark
            />
            <p className="text-sm leading-7 text-background/65">
              {siteAddress.line}
            </p>
          </div>

          <nav aria-label="لینک‌های پاورقی" className="space-y-4">
            <p className="text-xs font-semibold tracking-wide text-background/55">
              {linksTitle}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/80 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4 sm:max-w-xs lg:justify-self-end lg:text-end">
            <p className="text-xs font-semibold tracking-wide text-background/55">
              تماس
            </p>
            <div className="space-y-1.5 text-sm text-background/75">
              <p dir="ltr">
                <a
                  href={`tel:${siteAddress.phone}`}
                  className="transition-colors hover:text-background"
                >
                  {siteAddress.phone}
                </a>
              </p>
              <p dir="ltr">
                <a
                  href={`mailto:${siteAddress.email}`}
                  className="transition-colors hover:text-background"
                >
                  {siteAddress.email}
                </a>
              </p>
              <p className="pt-1">
                <a
                  href={siteAddress.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-background/90 transition-colors hover:text-background"
                >
                  موقعیت روی نقشه
                </a>
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <p className="text-xs text-background/45">{copyright}</p>
      </Container>
    </footer>
  );
}
