import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { BadgeLabel } from "@/components/atoms/BadgeLabel";
import { PageHero } from "@/components/molecules/PageHero";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPrograms } from "@/lib/data/programs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return {
    title: t("programsTitle"),
    description: t("programsIntro"),
  };
}

export default async function ProgramsPage() {
  const t = await getTranslations("pages");
  const programs = await getPrograms();
  const standard = programs.filter((p) => p.group === "standard");
  const executive = programs.filter((p) => p.group === "executive");

  return (
    <main id="main-content">
      <PageHero title={t("programsTitle")} intro={t("programsIntro")} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container className="space-y-10">
          <ProgramGroup title={t("standardGroup")} items={standard} />
          <ProgramGroup title={t("executiveGroup")} items={executive} />
        </Container>
      </Section>
    </main>
  );
}

function ProgramGroup({
  title,
  items,
}: {
  title: string;
  items: Awaited<ReturnType<typeof getPrograms>>;
}) {
  return (
    <div>
      <Heading level={2} className="mb-6">
        {title}
      </Heading>
        <div className="grid gap-5 md:grid-cols-2">
        {items.map((program) => (
          <SurfaceCard key={program.id} className="flex flex-col rounded-2xl p-6 sm:p-7">
            <BadgeLabel className="w-fit">{program.tagline}</BadgeLabel>
            <Heading as="h3" level={3} className="mt-3">
              <Link href={program.href} className="hover:text-primary">
                {program.title}
              </Link>
            </Heading>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {program.blurb}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <dt className="font-semibold text-foreground">مخاطب</dt>
                <dd>{program.audience}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">مدت</dt>
                <dd>{program.durationLabel}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">فرمت</dt>
                <dd>{program.formatLabel}</dd>
              </div>
            </dl>
            <Link
              href={program.href}
              className={cn(buttonVariants({ variant: "outline" }), "mt-5 w-fit")}
            >
              جزئیات برنامه
            </Link>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
