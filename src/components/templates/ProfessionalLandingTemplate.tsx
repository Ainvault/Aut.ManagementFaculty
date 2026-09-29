import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { DotCta } from "@/components/atoms/DotCta";
import { Heading } from "@/components/atoms/Heading";
import { MetamorphField } from "@/components/atoms/MetamorphField";
import { Section } from "@/components/atoms/Section";
import { QuoteBlock } from "@/components/molecules/Cards";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { CategoryCourseExplorer } from "@/components/organisms/CategoryCourseExplorer";
import type { Course, SiteStat, Testimonial } from "@/lib/types";
import { AnimatedMetric } from "@/components/atoms/AnimatedMetric";

export function ProfessionalLandingTemplate({
  labels,
  courses,
  stats,
  testimonials,
}: {
  labels: {
    pathways: string;
    exploreCourses: string;
    heroTitle: string;
    heroBody: string;
    findProgram: string;
    offeredBy: string;
    dppTitle: string;
    dppBody: string;
    statsTitle: string;
    rankTitle: string;
    testimonialsTitle: string;
  };
  courses: Course[];
  stats: SiteStat[];
  testimonials: Testimonial[];
}) {
  return (
    <main id="main-content">
      <header className="relative isolate min-h-[42rem] overflow-hidden bg-chart-3 text-background">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="نمایی از پردیس دانشگاه"
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-l from-chart-3 via-chart-3/85 to-chart-3/60"
          aria-hidden
        />
        <MetamorphField
          tone="dark"
          className="inset-y-0 end-0 start-auto w-[min(72vw,36rem)] opacity-[0.5]"
        />
        <div className="relative z-[2] flex min-h-[inherit] min-w-0 items-center py-12">
          <Container>
            <div className="w-full min-w-0 max-w-4xl text-start">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-background/75">
                  {labels.offeredBy}
                </p>
                <Heading
                  as="h1"
                  level={1}
                  className="mt-4 max-w-4xl text-[1.65rem] leading-[1.45] text-pretty text-background sm:text-4xl lg:text-[2.75rem] lg:leading-[1.4]"
                >
                  {labels.heroTitle}
                </Heading>
                <p className="mt-5 max-w-2xl border-t border-accent/60 pt-5 text-base leading-8 text-pretty text-background/70 sm:text-lg sm:leading-8">
                  {labels.heroBody}
                </p>
                <div className="mt-6">
                  <DotCta href="#programs" onDark>
                    {labels.exploreCourses}
                  </DotCta>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <Section
        id="programs"
        tone="dark"
        className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
      >
        <MetamorphField
          tone="dark"
          density="sparse"
          className="opacity-[0.28]"
        />
        <Container className="relative z-[1]">
          <div id="courses" className="scroll-mt-24" />
          <div id="certificates" className="scroll-mt-24" />
          <div id="corporate" className="scroll-mt-24" />
          <p className="mb-6 text-lg font-semibold text-background/80">
            {labels.pathways}
          </p>
          <CategoryCourseExplorer
            courses={courses}
            findLabel={labels.findProgram}
          />
        </Container>
      </Section>

      <Section id="digital" tone="accent" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <Heading level={2} className="text-primary-foreground">
            {labels.dppTitle}
          </Heading>
          <p className="mt-3 max-w-3xl text-primary-foreground/80">
            {labels.dppBody}
          </p>
        </Container>
      </Section>

      <Section tone="muted" className="py-20 sm:py-24">
        <Container>
          <Heading level={2} className="mb-8 text-center">
            {labels.statsTitle}
          </Heading>
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-4xl font-extrabold text-primary"><AnimatedMetric value={stat.value} /></p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-20 sm:py-24">
        <Container className="text-center">
          <Heading level={2}>{labels.rankTitle}</Heading>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <SurfaceCard padded="md" className="text-start">
              <p className="text-3xl font-extrabold text-primary">#۱</p>
              <p className="mt-2 font-bold">از برترین دانشگاه‌های فنی کشور</p>
              <p className="mt-1 text-sm text-muted-foreground">
                دانشگاه صنعتی امیرکبیر
              </p>
            </SurfaceCard>
            <SurfaceCard padded="md" className="text-start">
              <p className="text-3xl font-extrabold text-primary">۶۰+</p>
              <p className="mt-2 font-bold">سال تجربه آموزش عالی</p>
              <p className="mt-1 text-sm text-muted-foreground">
                میراث علمی و صنعتی
              </p>
            </SurfaceCard>
          </div>
        </Container>
      </Section>

      <Section tone="dark" className="relative overflow-hidden py-20 sm:py-24">
        <MetamorphField tone="dark" density="sparse" className="opacity-25" />
        <Container className="relative z-[1]">
          <Heading level={2} className="mb-6 text-background">
            {labels.testimonialsTitle}
          </Heading>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <QuoteBlock key={item.id} {...item} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
