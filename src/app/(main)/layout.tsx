import { getTranslations } from "next-intl/server";
import { CampaignBanners } from "@/components/organisms/CampaignBanners";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { getCourses } from "@/lib/data/courses";
import { getPrograms } from "@/lib/data/programs";
import { getCampaignBanners } from "@/lib/data/site";
import { homeNav, siteShortName } from "@/lib/site-config";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  const [courses, programs, banners] = await Promise.all([
    getCourses(),
    getPrograms(),
    getCampaignBanners(),
  ]);

  return (
    <>
      <SiteHeader
        items={homeNav}
        searchLabel={t("nav.search")}
        brandTitle={siteShortName}
        brandSubtitle={t("nav.brandSubtitle")}
        academicsLabel={t("nav.academics")}
        programSelectorTitle={t("home.programSelectorTitle")}
        executiveLabel={t("home.executiveLabel")}
        exploreLabel={t("home.exploreOurPrograms")}
        variant="home"
        courses={courses}
        programs={programs}
      />
      <CampaignBanners banners={banners} />
      <div className="flex-1">{children}</div>
      <SiteFooter
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
