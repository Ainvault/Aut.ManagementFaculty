import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CourseDetailTemplate } from "@/components/templates/CourseDetailTemplate";
import { getCourseById } from "@/lib/data/courses";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseById(slug);
  if (!course) return { title: "دوره یافت نشد" };
  return {
    title: course.title,
    description: course.seoDescription || course.summary,
  };
}

export default async function CourseRegisterPage({ params }: Props) {
  const { slug } = await params;
  const [course, t] = await Promise.all([
    getCourseById(slug),
    getTranslations("pages"),
  ]);
  if (!course) notFound();

  return (
    <CourseDetailTemplate
      course={course}
      labels={{
        submit: t("submit"),
        success: t("registerSuccess"),
        cta: t("registerCtaRequest"),
        formTitle: t("registerFormTitle"),
        formDescription: t("registerFormDescription"),
        hint: t("registerFormHint"),
        cancel: t("registerFormCancel"),
        backToCatalog: t("backToCourses"),
        detailsTitle: t("courseDetailsTitle"),
        aboutTitle: t("courseAboutTitle"),
        duration: t("courseDuration"),
        format: t("courseFormat"),
        category: t("courseCategory"),
        price: t("coursePrice"),
        priceUnset: t("coursePriceUnset"),
      }}
    />
  );
}
