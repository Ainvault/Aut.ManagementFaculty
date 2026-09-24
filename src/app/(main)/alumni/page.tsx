import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { BadgeLabel } from "@/components/atoms/BadgeLabel";
import { PageHero } from "@/components/molecules/PageHero";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { getAlumniStories } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("alumniTitle"), description: t("alumniIntro") };
}

export default async function AlumniPage() {
  const t = await getTranslations("pages");
  const stories = await getAlumniStories();

  return (
    <main id="main-content">
      <PageHero title={t("alumniTitle")} intro={t("alumniIntro")} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {stories.map((story) => (
              <SurfaceCard
                key={story.id}
                id={story.id}
                padded={false}
                className="group scroll-mt-24 overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={story.imageUrl}
                    alt={story.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <BadgeLabel>{story.program}</BadgeLabel>
                  <Heading as="h2" level={4} className="mt-3">
                    {story.title}
                  </Heading>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {story.excerpt}
                  </p>
                  <p className="mt-4 text-sm font-semibold">{story.name}</p>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
