import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { BadgeLabel } from "@/components/atoms/BadgeLabel";
import { MetamorphField } from "@/components/atoms/MetamorphField";
import { TextLink } from "@/components/atoms/TextLink";
import { getArticleById } from "@/lib/data/articles";
import { JsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return { title: "مقاله یافت نشد" };
  return { title: article.title, description: article.excerpt };
}

export default async function InsightDetailPage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const date = new Date(article.publishedAt).toLocaleDateString("fa-IR");

  return (
    <main id="main-content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          author: { "@type": "Person", name: article.author },
          image: article.imageUrl,
        }}
      />
      <Section tone="dark" className="relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-20">
        <MetamorphField tone="dark" density="sparse" className="opacity-35" />
        <Container narrow className="relative z-[1]">
          <BadgeLabel>{article.category}</BadgeLabel>
          <Heading as="h1" level={1} className="mt-4 text-background">
            {article.title}
          </Heading>
          <p className="mt-3 text-sm text-background/60">
            {article.author} · {date}
          </p>
        </Container>
      </Section>
      <Section className="bg-gradient-to-b from-background to-muted/40 pt-10">
        <Container narrow>
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted shadow-xl">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 800px"
              priority
            />
          </div>
          <p className="text-lg leading-9 text-foreground/90">{article.body}</p>
          <TextLink href="/insights" className="mt-10 inline-block">
            بازگشت به مقالات
          </TextLink>
        </Container>
      </Section>
    </main>
  );
}
