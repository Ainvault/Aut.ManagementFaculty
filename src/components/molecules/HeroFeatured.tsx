import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { MetamorphField } from "@/components/atoms/MetamorphField";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroFeatured({
  title,
  href,
  eyebrow,
}: {
  title?: string;
  href?: string;
  imageUrl?: string;
  eyebrow?: string;
}) {
  return (
    <header className="home-hero relative isolate overflow-hidden bg-chart-3 text-background">
      <MetamorphField
        tone="dark"
        density="sparse"
        className="end-0 start-auto w-[min(55vw,36rem)] opacity-20"
      />
      <Container className="relative z-[2] flex min-h-[34rem] min-w-0 items-center py-16 sm:min-h-[36rem] sm:py-20">
        <div className="home-hero__copy w-full min-w-0 max-w-4xl text-start">
          <div className="inline-flex max-w-full items-start gap-2 text-sm font-medium text-background/60">
            <GraduationCap className="mt-0.5 size-4 shrink-0" />
            <span className="min-w-0 leading-7 text-pretty">
              مرکز آموزش‌های آزاد دانشکده مدیریت، علم و فناوری دانشگاه{"\u00A0"}صنعتی{"\u00A0"}امیرکبیر
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl text-[1.65rem] font-black leading-[1.45] tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.4]">
            برای تصمیم‌هایی که{" "}
            <span className="whitespace-nowrap">صنعت را پیش می‌برند</span>
          </h1>
          <p className="mt-6 max-w-2xl border-t border-accent/60 pt-5 text-base leading-8 text-pretty text-background/65 sm:text-lg sm:leading-8">
            دانش امیرکبیر، پشتوانه رهبری نوآور در عصر داده و هوش{"\u00A0"}مصنوعی.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-primary font-bold text-primary-foreground hover:bg-primary/85",
              )}
            >
              مشاهده دوره‌ها <ArrowLeft className="size-4" />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-background/25 bg-transparent font-bold text-background hover:bg-background hover:text-foreground",
              )}
            >
              درباره مرکز
            </Link>
          </div>
          {title && href && eyebrow ? (
            <div className="mt-12 border-t border-background/10 pt-6">
              <Link
                href={href}
                className="group inline-flex max-w-full items-center gap-3 text-sm text-background/55 transition-colors hover:text-background"
              >
                <span className="shrink-0 font-semibold text-background/80">
                  {eyebrow}
                </span>
                <span className="min-w-0 truncate">{title}</span>
                <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
