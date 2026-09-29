import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { PageHero } from "@/components/molecules/PageHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { valuesContent } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("valuesTitle"), description: valuesContent.intro };
}

export default async function ValuesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="ارزش‌های آموزشی ما"
        title={valuesContent.title}
        intro={valuesContent.intro}
      />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {valuesContent.items.map((item) => (
              <Card key={item.title} className="rounded-2xl border-border/70 shadow-sm transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-md">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
