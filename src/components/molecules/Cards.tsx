import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, MapPin, Wifi } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blurDataURL } from "@/lib/images";
import type { Program } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProgramCard({
  program,
  className,
}: {
  program: Program;
  className?: string;
}) {
  return (
    <Card className={cn("group h-full gap-2 border-border/70 py-6 shadow-sm transition-[box-shadow,border-color] hover:border-primary/25 hover:shadow-lg", className)}>
      <CardHeader className="gap-1">
        {program.tagline ? (
          <p className="text-xs font-bold text-primary">{program.tagline}</p>
        ) : null}
        <CardTitle className="text-lg">
          <Link href={program.href} className="hover:text-primary">
            {program.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {program.blurb}
        </CardDescription>
        <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary">
          جزئیات برنامه
          <ArrowUpLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </CardContent>
    </Card>
  );
}

export function ArticleCard({
  title,
  category,
  excerpt,
  imageUrl,
  href,
  featured = false,
  variant = "grid",
}: {
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  href: string;
  featured?: boolean;
  variant?: "grid" | "list";
}) {
  if (variant === "list") {
    return (
      <article className="group grid overflow-hidden border-b border-border py-7 first:pt-0 last:border-b-0 sm:grid-cols-[14rem_1fr] sm:gap-8 lg:grid-cols-[19rem_1fr] lg:py-9">
        <Link href={href} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted sm:aspect-auto sm:min-h-44">
          <Image src={imageUrl} alt={title} fill placeholder="blur" blurDataURL={blurDataURL} className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" sizes="(max-width:640px) 100vw, 304px" />
        </Link>
        <div className="flex min-w-0 flex-col justify-center pt-5 sm:pt-0">
          <p className="text-xs font-bold text-primary">{category}</p>
          <h2 className="mt-2 text-xl font-bold leading-relaxed tracking-tight sm:text-2xl">
            <Link href={href} className="transition-colors hover:text-primary">{title}</Link>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{excerpt}</p>
          <Link href={href} className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary">
            مطالعه مقاله <ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col",
        featured && "lg:flex-row lg:gap-8",
      )}
    >
      <Link
        href={href}
        className={cn(
          "relative block shrink-0 overflow-hidden rounded-2xl",
          featured && "lg:w-[58%]",
        )}
      >
        <div
          className={cn(
            "relative w-full",
            featured ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            sizes={
              featured
                ? "(max-width:1024px) 100vw, 58vw"
                : "(max-width:768px) 100vw, 33vw"
            }
          />
        </div>
      </Link>
      <div
        className={cn(
          "mt-4 flex flex-1 flex-col",
          featured && "lg:mt-0 lg:justify-center",
        )}
      >
        <p className="text-xs font-semibold text-muted-foreground">{category}</p>
        <h3
          className={cn(
            featured
              ? "mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              : "mt-1.5 text-lg font-semibold",
          )}
        >
          <Link href={href} className="hover:text-primary">
            {title}
          </Link>
        </h3>
        {featured ? (
          <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function EventCard({
  title,
  startDate,
  endDate,
  location,
  href,
  variant = "home",
}: {
  title: string;
  startDate: string;
  endDate: string | null;
  location: string;
  href: string;
  variant?: "home" | "list";
}) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  const day = start.toLocaleDateString("fa-IR", { day: "numeric" });
  const month = start.toLocaleDateString("fa-IR", { month: "short" });
  const endDay = end?.toLocaleDateString("fa-IR", { day: "numeric" });
  const endMonth = end?.toLocaleDateString("fa-IR", { month: "short" });
  const isOnline = /آنلاین|online/i.test(location);

  const body = (
    <>
      <div className="flex items-start gap-3">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">{month}</p>
          <p className="mt-0.5 text-2xl font-bold leading-none">{day}</p>
        </div>
        {end ? (
          <>
            <span className="mt-7 text-xs font-medium text-primary">تا</span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">
                {endMonth}
              </p>
              <p className="mt-0.5 text-2xl font-bold leading-none">{endDay}</p>
            </div>
          </>
        ) : null}
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          <Link href={href} className="hover:text-primary">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          {isOnline ? (
            <Wifi className="size-3.5 shrink-0" aria-hidden />
          ) : (
            <MapPin className="size-3.5 shrink-0" aria-hidden />
          )}
          {location}
        </p>
      </div>
    </>
  );

  if (variant === "list") {
    return (
      <Card className="gap-4 py-5">
        <CardContent className="flex flex-col gap-4">{body}</CardContent>
      </Card>
    );
  }

  return (
    <article className="flex min-w-0 flex-col gap-4 border-b border-border px-0 py-5 last:border-b-0 md:border-b-0 md:border-e md:px-5 md:py-2 md:last:border-e-0">
      {body}
    </article>
  );
}

export function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-accent">{value}</p>
      <p className="mt-2 text-sm text-background/70">{label}</p>
    </div>
  );
}

export function QuoteBlock({
  quote,
  name,
  role,
  courseTitle,
}: {
  quote: string;
  name: string;
  role: string;
  courseTitle: string;
}) {
  return (
    <blockquote className="flex h-full flex-col rounded-xl bg-background/5 p-7 ring-1 ring-background/10">
      <p className="flex-1 text-sm leading-8 text-background/90">«{quote}»</p>
      <footer className="mt-7">
        <p className="font-bold text-background">{name}</p>
        <p className="mt-0.5 text-sm text-background/55">{role}</p>
        <p className="mt-2 text-xs font-semibold text-accent">{courseTitle}</p>
      </footer>
    </blockquote>
  );
}

export function IntersectionCard({
  title,
  description,
  href,
  imageUrl,
}: {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block min-h-[16rem] overflow-hidden rounded-2xl bg-chart-3 shadow-sm sm:min-h-[18rem]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width:768px) 100vw, 25vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-chart-3 via-chart-3/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-background">
        <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-accent">{title}</p><ArrowUpLeft className="size-4 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></div>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-background/80">{description}</p>
      </div>
    </Link>
  );
}
