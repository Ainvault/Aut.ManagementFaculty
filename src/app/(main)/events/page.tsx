import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { EventCard } from "@/components/molecules/Cards";
import { PageHero } from "@/components/molecules/PageHero";
import { getEvents } from "@/lib/data/events";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("eventsTitle"), description: t("eventsIntro") };
}

export default async function EventsPage() {
  const t = await getTranslations("pages");
  const events = await getEvents();

  return (
    <main id="main-content">
      <PageHero title={t("eventsTitle")} intro={t("eventsIntro")} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event.id} {...event} variant="list" />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
