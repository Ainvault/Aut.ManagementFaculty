import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProfessionalLandingTemplate } from "@/components/templates/ProfessionalLandingTemplate";
import { getCourses } from "@/lib/data/courses";
import { getSiteStats, getTestimonials } from "@/lib/data/site";
import { courseJsonLd, JsonLd } from "@/lib/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("professionalTitle"),
    description: t("professionalDescription"),
    openGraph: {
      title: t("professionalTitle"),
      description: t("professionalDescription"),
    },
    alternates: {
      canonical: "/professional",
    },
  };
}

export default async function ProfessionalPage() {
  const t = await getTranslations();
  const [courses, stats, testimonials] = await Promise.all([
    getCourses(),
    getSiteStats(),
    getTestimonials(),
  ]);

  return (
    <>
      {courses.slice(0, 3).map((course) => (
        <JsonLd key={course.id} data={courseJsonLd(course)} />
      ))}
      <ProfessionalLandingTemplate
        labels={{
          pathways: t("professional.pathways"),
          exploreCourses: t("nav.exploreCourses"),
          heroTitle: t("professional.heroTitle"),
          heroBody: t("professional.heroBody"),
          findProgram: t("professional.findProgram"),
          offeredBy: t("professional.offeredBy"),
          dppTitle: t("professional.dppTitle"),
          dppBody: t("professional.dppBody"),
          statsTitle: t("professional.statsTitle"),
          rankTitle: t("professional.rankTitle"),
          testimonialsTitle: t("professional.testimonialsTitle"),
        }}
        courses={courses}
        stats={stats}
        testimonials={testimonials}
      />
    </>
  );
}
