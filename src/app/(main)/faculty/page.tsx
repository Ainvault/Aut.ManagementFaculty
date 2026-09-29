import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { FacultyMemberCard } from "@/components/molecules/FacultyMemberCard";
import { PageHero } from "@/components/molecules/PageHero";
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
              <FacultyMemberCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
