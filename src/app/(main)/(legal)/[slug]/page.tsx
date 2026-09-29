import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { PageHero } from "@/components/molecules/PageHero";
import { ContactInterestForm } from "@/components/organisms/ContactInterestForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLegalPage } from "@/lib/data/site";

type Props = { params: Promise<{ slug: string }> };

const ALLOWED = new Set(["press", "careers"]);

export async function generateStaticParams() {
  return [...ALLOWED].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return { title: "صفحه یافت نشد" };
  return { title: page.title, description: page.body[0] };
}

export default async function LegalSlugPage({ params }: Props) {
  const { slug } = await params;
  if (!ALLOWED.has(slug)) notFound();
  const page = await getLegalPage(slug);
  if (!page) notFound();
  const t = await getTranslations("pages");

  return (
    <main id="main-content">
      <PageHero title={page.title} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-10">
            {page.body.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
          <Card className="rounded-2xl border-border/70 shadow-lg">
            <CardHeader>
              <CardTitle>ارسال پیام</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInterestForm
                submitLabel={t("submit")}
                successLabel={t("registerSuccess")}
              />
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
