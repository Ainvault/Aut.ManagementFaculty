import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { TextLink } from "@/components/atoms/TextLink";
import { PageHero } from "@/components/molecules/PageHero";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCourses } from "@/lib/data/courses";
import { getProgramBySlug } from "@/lib/data/programs";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "برنامه یافت نشد" };
  return {
    title: program.title,
    description: program.blurb,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const [program, courses, t] = await Promise.all([
    getProgramBySlug(slug),
    getCourses(),
    getTranslations("pages"),
  ]);
  if (!program) notFound();

  const related = courses.slice(0, 3);

  return (
    <main id="main-content">
      <PageHero
        title={program.title}
        intro={program.blurb}
        eyebrow={program.tagline}
      />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-base leading-8 text-foreground/90">{program.body}</p>
            <Heading level={2} className="mt-10">
              {t("highlights")}
            </Heading>
            <ul className="mt-4 list-disc space-y-2 ps-5 text-sm leading-7">
              {program.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="h-fit space-y-4 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <p className="text-sm">
              <span className="font-semibold">مخاطب: </span>
              {program.audience}
            </p>
            <p className="text-sm">
              <span className="font-semibold">مدت: </span>
              {program.durationLabel}
            </p>
            <p className="text-sm">
              <span className="font-semibold">فرمت: </span>
              {program.formatLabel}
            </p>
            <Link
              href="/professional"
              className={cn(buttonVariants(), "w-full")}
            >
              مشاهده دوره‌ها
            </Link>
            <TextLink href="/programs" className="block text-sm">
              {t("backToPrograms")}
            </TextLink>
          </aside>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <Heading level={2}>{t("relatedCourses")}</Heading>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((course) => (
              <li key={course.id}>
                <SurfaceCard padded="sm" as="div" className="h-full">
                  <Link
                    href={course.registrationUrl}
                    className="font-semibold hover:text-primary"
                  >
                    {course.title}
                  </Link>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {course.summary}
                  </p>
                </SurfaceCard>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </main>
  );
}
