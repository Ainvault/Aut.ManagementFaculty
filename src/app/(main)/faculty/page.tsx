import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { PageHero } from "@/components/molecules/PageHero";
import { SurfaceCard } from "@/components/molecules/SurfaceCard";
import { getFaculty } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return { title: t("facultyTitle"), description: t("facultyIntro") };
}

export default async function FacultyPage() {
  const t = await getTranslations("pages");
  const members = await getFaculty();

  return (
    <main id="main-content">
      <PageHero title={t("facultyTitle")} intro={t("facultyIntro")} />
      <Section className="bg-gradient-to-b from-background to-muted/40">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <SurfaceCard key={member.id} className="group rounded-2xl">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <Heading as="h2" level={4}>
                  {member.name}
                </Heading>
                <p className="mt-1 text-sm text-primary">{member.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {member.focus}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {member.bio}
                </p>
              </SurfaceCard>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
