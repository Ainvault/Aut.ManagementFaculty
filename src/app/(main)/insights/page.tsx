import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { ArticleCard } from "@/components/molecules/Cards";
import { PageHero } from "@/components/molecules/PageHero";
import { getArticles } from "@/lib/data/articles";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("insightsTitle"), description: t("insightsIntro") };
}

export default async function InsightsPage() {
  const t = await getTranslations("pages");
  const articles = await getArticles();

  return (
    <main id="main-content">
      <PageHero title={t("insightsTitle")} intro={t("insightsIntro")} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container>
          <div className="mx-auto max-w-5xl">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                category={article.category}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
                href={article.href}
                variant="list"
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
