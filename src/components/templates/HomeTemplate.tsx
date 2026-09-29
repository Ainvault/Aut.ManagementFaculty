import Link from "next/link";
import Image from "next/image";
import { Building2, Compass, Network } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { DotCta } from "@/components/atoms/DotCta";
import { Heading } from "@/components/atoms/Heading";
import { MetamorphField } from "@/components/atoms/MetamorphField";
import { Section } from "@/components/atoms/Section";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HeroFeatured } from "@/components/molecules/HeroFeatured";
import {
  EventCard,
  IntersectionCard,
} from "@/components/molecules/Cards";
import { ProgramCarousel } from "@/components/organisms/ProgramCarousel";
import type { Article, EventItem, IntersectionTopic, Program, SiteStat } from "@/lib/types";
import { siteMission } from "@/lib/site-config";
import { AnimatedMetric } from "@/components/atoms/AnimatedMetric";

export type HomeLabels = {
  executiveLabel: string;
  exploreOurPrograms: string;
  ideasTitle: string;
  eventsTitle: string;
  seeAllEvents: string;
  intersectionsTitle: string;
  intersectionsSubtitle: string;
  moreThanDegree: string;
  moreThanDegreeBody: string;
  keepExploring: string;
  hireTitle: string;
  hireBody: string;
  registerCta: string;
  missionTitle: string;
  findUsTitle: string;
  ideasEyebrow: string;
  linksTitle: string;
};

export function HomeHero({
  featured,
  eyebrow,
}: {
  featured: Article | null;
  eyebrow: string;
}) {
  return (
    <HeroFeatured
      title={featured?.title}
      href={featured?.href}
      imageUrl={featured?.imageUrl}
      eyebrow={eyebrow}
    />
  );
}

export function HomeIdeas() {
  return (
    <>
    <Section className="relative py-20 sm:py-28">
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-28">
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">چرا دانشگاه امیرکبیر؟</Badge>
            <Heading level={2} className="mt-5 text-3xl leading-tight break-words sm:text-4xl">
              مدیریت با پشتوانه دانش مهندسی
            </Heading>
            <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
              هویت مهندسی و فناورانه دانشگاه صنعتی امیرکبیر به آموزش مدیریت در این دانشگاه جهت می‌دهد. در مرکز آموزش‌های آزاد دانشکده مدیریت، علم و فناوری، توسعه مدیران با شناخت فناوری و مسائل صنعت پیوند دارد.
            </p>
          </div>
          <div className="grid min-w-0 gap-4 md:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: Compass, title: "پشتوانه علمی امیرکبیر", text: "آموزش مدیریت در بستر دانشگاه صنعتی امیرکبیر، با تکیه بر دانش تخصصی، استدلال علمی و نگاه نقادانه." },
              { icon: Building2, title: "پیوند مدیریت و فناوری", text: "نگاهی میان‌رشته‌ای به داده و هوش مصنوعی؛ با توجه به تأثیر آن‌ها بر تصمیم‌های مدیریتی، مدل‌های کسب‌وکار و آینده صنعت." },
              { icon: Network, title: "تمرکز بر مسائل صنعت", text: "توسعه توانمندی مدیران با توجه به چالش‌های اجرای نوآوری، تغییر فرایندها و بهبود عملکرد سازمان." },
            ].map((item, index) => (
              <Card key={item.title} className="min-w-0 border-border/70 py-0 shadow-none transition-colors hover:border-primary/25">
                <CardContent className="flex h-full min-w-0 flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-6 lg:p-7">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><item.icon className="size-6" /></div>
                  <div className="min-w-0"><p className="text-xs font-bold text-primary">۰{index + 1}</p><h3 className="mt-1 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{item.text}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
    <section className="overflow-hidden bg-chart-3 text-background">
      <div className="grid min-w-0 lg:grid-cols-2">
        <div className="relative z-[1] order-2 flex min-w-0 flex-col justify-center gap-4 px-5 py-8 sm:gap-5 sm:px-10 sm:py-10 lg:order-1 lg:min-h-[22rem] lg:px-14 lg:py-12">
          <p className="text-xs font-bold text-background/55">
            رویکرد آموزشی ما
          </p>
          <Heading
            level={2}
            className="text-2xl leading-snug break-words text-background sm:text-3xl lg:text-[2.125rem] lg:leading-snug"
          >
            دانش امیرکبیر، در خدمت تحول صنعت
          </Heading>
          <p className="max-w-xl text-sm leading-7 text-background/70 sm:text-base sm:leading-8">
            امیرکبیر، دانش تخصصی و چارچوب‌های مدیریتی را برای مواجهه با چالش‌های صنعت در اختیار مدیران قرار می‌دهد؛ از شناخت ظرفیت‌های داده و هوش مصنوعی تا ارزیابی تصمیم‌ها و راهبری نوآوری در سازمان.
          </p>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-1 w-fit border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground",
            )}
          >
            آشنایی با رویکرد ما
          </Link>
        </div>
        <div className="relative order-1 aspect-[16/10] min-h-0 lg:order-2 lg:aspect-auto lg:min-h-full lg:self-stretch">
          <Image
            src="/brand/campus-collaboration-v1.png"
            alt="همکاری مدرسان و متخصصان در محیط دانشگاه"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
    </>
  );
}

export function HomeEvents({
  events,
  title,
  seeAllLabel,
}: {
  events: EventItem[];
  title: string;
  seeAllLabel: string;
}) {
  return (
    <Section className="py-20 sm:py-24">
      <Container>
        <p className="text-center text-xs font-bold text-primary">در جریان یادگیری</p>
        <Heading level={2} className="mt-2 text-center text-3xl sm:text-4xl">
          {title}
        </Heading>
        <Separator className="mx-auto mt-5 max-w-16 bg-primary" />
        <div className="mt-10 grid min-w-0 gap-0 border-y border-border md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} variant="home" />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <DotCta href="/events">{seeAllLabel}</DotCta>
        </div>
      </Container>
    </Section>
  );
}

export function HomeRest({
  labels,
  carouselPrograms,
  intersections,
  stats,
}: {
  labels: HomeLabels;
  carouselPrograms: Program[];
  intersections: IntersectionTopic[];
  stats: SiteStat[];
}) {
  return (
    <>
      <Section tone="muted" className="py-20 sm:py-24">
        <Container>
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold text-primary">حوزه‌های آموزشی</p>
            <Heading level={2} className="mt-2 text-3xl sm:text-4xl">{labels.intersectionsTitle}</Heading>
            <p className="mt-3 text-lg font-semibold leading-relaxed text-primary sm:text-xl">
              {labels.intersectionsSubtitle}
            </p>
          </div>
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {intersections.map((topic) => (
              <IntersectionCard key={topic.id} {...topic} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden py-20 sm:py-24">
        <MetamorphField tone="light" density="sparse" />
        <Container className="relative z-[1] min-w-0">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <Heading level={2} className="break-words">{labels.moreThanDegree}</Heading>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {labels.moreThanDegreeBody}
            </p>
          </div>
          <ProgramCarousel
            title=""
            programs={carouselPrograms}
            keepExploringLabel={labels.keepExploring}
            hideTitle
          />
        </Container>
      </Section>

      <Section tone="dark" className="relative overflow-hidden py-20 sm:py-28">
        <MetamorphField
          tone="dark"
          density="sparse"
          className="opacity-[0.4]"
        />
        <Container className="relative z-[1] grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
          <div className="min-w-0 max-w-3xl"><p className="text-xs font-bold text-background/60">همکاری با سازمان‌ها</p><Heading level={2} className="mt-3 break-words text-background sm:text-5xl">
            {labels.hireTitle}
          </Heading>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/75 sm:text-lg">
            {labels.hireBody}
          </p>
          </div><div className="shrink-0">
            <DotCta href="/professional" onDark>
              {labels.registerCta}
            </DotCta>
          </div>
        </Container>
      </Section>

      <Section className="py-20 sm:py-24">
        <Container className="max-w-4xl text-center">
          <Heading
            level={2}
            className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
          >
            {labels.missionTitle}
          </Heading>
          <p className="mt-5 text-xl font-bold leading-relaxed break-words text-foreground sm:text-2xl md:text-3xl">
            {siteMission}
          </p>
          <div className="mt-12 grid min-w-0 gap-6 border-t border-border pt-10 sm:grid-cols-3">
            {stats.map((stat) => <div key={stat.id} className="min-w-0"><p className="text-3xl font-black text-primary sm:text-4xl"><AnimatedMetric value={stat.value} /></p><p className="mt-2 text-sm text-muted-foreground">{stat.label}</p></div>)}
          </div>
        </Container>
      </Section>
    </>
  );
}
