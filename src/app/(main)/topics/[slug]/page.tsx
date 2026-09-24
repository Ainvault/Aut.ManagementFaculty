import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { TextLink } from "@/components/atoms/TextLink";
import { PageHero } from "@/components/molecules/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getTopicBySlug } from "@/lib/data/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) return { title: "موضوع یافت نشد" };
  return { title: topic.title, description: topic.description };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = await getTopicBySlug(slug);
  if (!topic) notFound();

  return (
    <main id="main-content">
      <PageHero
        title={topic.title}
        intro={topic.description}
        imageUrl={topic.imageUrl}
      />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-base leading-8">{topic.body}</p>
            <ul className="mt-8 list-disc space-y-2 ps-5 text-sm">
              {topic.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <aside className="h-fit space-y-4 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
            <p className="text-sm text-muted-foreground">
              دوره‌های مرتبط با این موضوع را در فهرست دوره‌های کوتاه ببینید.
            </p>
            <Link href="/professional" className={cn(buttonVariants())}>
              مشاهده دوره‌ها
            </Link>
            <Separator />
            <TextLink href="/" className="block text-sm">
              بازگشت به خانه
            </TextLink>
          </aside>
        </Container>
      </Section>
    </main>
  );
}
