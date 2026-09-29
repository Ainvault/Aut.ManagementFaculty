import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { PageHero } from "@/components/molecules/PageHero";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTopics } from "@/lib/data/site";
import { aboutFocusAreas, siteMission } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("aboutTitle"), description: siteMission };
}

export default async function AboutPage() {
  const topics = await getTopics();

  return (
    <main id="main-content">
      <PageHero
        eyebrow="درباره مرکز آموزش‌های آزاد"
        title="آموزش مدیریت با پشتوانه امیرکبیر"
        intro="مرکز آموزش‌های آزاد دانشکده مدیریت، علم و فناوری دانشگاه صنعتی امیرکبیر، بر آموزش مدیران و تیم‌های مدیریتی برای تحول در صنعت تمرکز دارد. دوره‌های ما به تصمیم‌گیری داده‌محور، به‌کارگیری هوش مصنوعی در کسب‌وکار و مدیریت اجرای تغییر در سازمان می‌پردازند."
      />
      <Section className="relative overflow-hidden">
        <Container>
          <p className="text-xs font-bold text-primary">آنچه می‌آموزید</p><Heading level={2} className="mt-2 text-3xl sm:text-4xl">توانمندی‌های مدیریتی برای تحول در صنعت</Heading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutFocusAreas.map((area) => (
              <SurfaceCard key={area.title}>
                <Heading as="h3" level={4}>
                  {area.title}
                </Heading>
                <p className="mt-2 text-sm text-muted-foreground">
                  {area.description}
                </p>
              </SurfaceCard>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="muted">
        <Container>
          <p className="text-xs font-bold text-primary">حوزه‌های آموزشی</p><Heading level={2} className="mt-2 text-3xl sm:text-4xl">موضوع مورد نیاز خود را پیدا کنید</Heading>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <SurfaceCard key={topic.id} padded="sm" className="h-full">
                <Link href={topic.href} className="block">
                  <span className="font-semibold hover:text-primary">
                    {topic.title}
                  </span>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </Link>
              </SurfaceCard>
            ))}
          </div>
          <Link href="/programs" className={cn(buttonVariants(), "mt-8")}>
            مشاهده برنامه‌های آموزشی
          </Link>
        </Container>
      </Section>
    </main>
  );
}
