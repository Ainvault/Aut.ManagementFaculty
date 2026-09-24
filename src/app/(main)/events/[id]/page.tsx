import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { TextLink } from "@/components/atoms/TextLink";
import { PageHero } from "@/components/molecules/PageHero";
import { getEventById } from "@/lib/data/events";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: "رویداد یافت نشد" };
  return { title: event.title, description: event.summary };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const start = new Date(event.startDate).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const end = event.endDate
    ? new Date(event.endDate).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main id="main-content">
      <PageHero title={event.title} intro={event.summary} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container narrow className="space-y-5 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border sm:p-10">
          <p className="text-sm">
            <span className="font-semibold">زمان: </span>
            {start}
            {end ? ` تا ${end}` : ""}
          </p>
          <p className="text-sm">
            <span className="font-semibold">مکان: </span>
            {event.location}
          </p>
          <Heading level={3}>درباره رویداد</Heading>
          <p className="leading-8 text-foreground/90">{event.summary}</p>
          <TextLink href="/events">بازگشت به رویدادها</TextLink>
        </Container>
      </Section>
    </main>
  );
}
