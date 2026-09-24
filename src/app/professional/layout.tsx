import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { getCourses } from "@/lib/data/courses";
import { getPrograms } from "@/lib/data/programs";
import { professionalNav, siteShortName } from "@/lib/site-config";

export default async function ProfessionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  const [courses, programs] = await Promise.all([getCourses(), getPrograms()]);

  return (
    <>
      <SiteHeader
        items={professionalNav}
        searchLabel={t("nav.search")}
        brandTitle={siteShortName}
        brandSubtitle={t("nav.brandSubtitle")}
        brandHref="/professional"
        academicsLabel={t("nav.academics")}
        programSelectorTitle={t("home.programSelectorTitle")}
        executiveLabel={t("home.executiveLabel")}
        exploreLabel={t("home.exploreOurPrograms")}
        variant="professional"
        courses={courses}
        programs={programs}
      />
      <div className="min-w-0 flex-1 overflow-x-clip">{children}</div>
      <SiteFooter
        variant="professional"
        copyright={t("footer.copyright", { year })}
        linksTitle={t("footer.links")}
        links={[
          { label: t("footer.press"), href: "/press" },
          { label: t("footer.careers"), href: "/careers" },
          { label: t("footer.accessibility"), href: "/accessibility" },
          { label: t("footer.privacy"), href: "/privacy" },
        ]}
      />
    </>
  );
}
