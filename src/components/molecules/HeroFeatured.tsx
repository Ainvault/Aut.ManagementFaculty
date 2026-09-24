import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { MetamorphField } from "@/components/atoms/MetamorphField";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroFeatured({ title, href, eyebrow }: { title: string; href: string; imageUrl: string; eyebrow: string }) {
  return (
    <header className="home-hero relative isolate overflow-hidden bg-chart-3 text-background">
      <MetamorphField tone="dark" density="sparse" className="end-0 start-auto w-[min(55vw,36rem)] opacity-20" />
      <Container className="relative z-[2] flex min-h-[38rem] items-center py-20 sm:py-24">
        <div className="home-hero__copy max-w-4xl">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-background/60">
            <GraduationCap className="size-4" />
            مرکز آموزش‌های آزاد دانشگاه صنعتی امیرکبیر
          </div>
          <h1 className="mt-8 text-4xl font-black leading-[1.25] tracking-tight sm:text-6xl lg:text-7xl">
            آموزش حرفه‌ای برای
            <span className="mt-2 block text-background">مدیریت در دنیای متغیر</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-background/65 sm:text-lg sm:leading-9">
            دانش دانشگاهی و تجربه‌ی صنعت را کنار هم می‌آوریم تا مدیران و متخصصان برای تصمیم‌های پیچیده آماده‌تر شوند.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
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
          <div className="mt-12 border-t border-background/10 pt-6">
            <Link href={href} className="group inline-flex max-w-2xl items-center gap-3 text-sm text-background/55 transition-colors hover:text-background">
              <span className="shrink-0 font-semibold text-background/80">{eyebrow}</span>
              <span className="truncate">{title}</span>
              <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
