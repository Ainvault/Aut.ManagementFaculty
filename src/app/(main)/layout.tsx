import { getTranslations } from "next-intl/server";
import { CampaignBanners } from "@/components/organisms/CampaignBanners";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { getCourses } from "@/lib/data/courses";
import { getPrograms } from "@/lib/data/programs";
import { getCampaignBanners } from "@/lib/data/site";
import { homeNav, siteShortName } from "@/lib/site-config";

// Public CMS pages must read Postgres at request time — static bake at Docker
// build often has no DATABASE_URL and ships empty lists.
export const dynamic = "force-dynamic";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  let courses: Awaited<ReturnType<typeof getCourses>> = [];
  let programs: Awaited<ReturnType<typeof getPrograms>> = [];
  let banners: Awaited<ReturnType<typeof getCampaignBanners>> = [];
  try {
    [courses, programs, banners] = await Promise.all([
      getCourses(),
      getPrograms(),
      getCampaignBanners(),
    ]);
  } catch (err) {
    console.error("[main/layout] CMS fetch failed:", err);
  }

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
      <div className="min-w-0 flex-1 overflow-x-clip">{children}</div>
      <SiteFooter
        copyright={t("footer.copyright", { year })}
        linksTitle={t("footer.links")}
        links={[
          { label: t("footer.press"), href: "/press" },
          { label: t("footer.careers"), href: "/careers" },
        ]}
      />
    </>
  );
}
