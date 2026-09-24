import { getTranslations } from "next-intl/server";
import {
  HomeEvents,
  HomeHero,
  HomeIdeas,
  HomeRest,
  type HomeLabels,
} from "@/components/templates/HomeTemplate";
import { getArticles, getFeaturedArticle } from "@/lib/data/articles";
import { getEvents } from "@/lib/data/events";
import { getPrograms } from "@/lib/data/programs";
import { getSiteStats, getTopics } from "@/lib/data/site";

async function getLabels(): Promise<HomeLabels> {
  const t = await getTranslations();
  return {
    executiveLabel: t("home.executiveLabel"),
    exploreOurPrograms: t("home.exploreOurPrograms"),
    ideasTitle: t("home.ideasTitle"),
    eventsTitle: t("home.eventsTitle"),
    seeAllEvents: t("nav.seeAllEvents"),
    intersectionsTitle: t("home.intersectionsTitle"),
    intersectionsSubtitle: t("home.intersectionsSubtitle"),
    moreThanDegree: t("home.moreThanDegree"),
    moreThanDegreeBody: t("home.moreThanDegreeBody"),
    keepExploring: t("home.keepExploring"),
    hireTitle: t("home.hireTitle"),
    hireBody: t("home.hireBody"),
    registerCta: t("nav.registerCta"),
    missionTitle: t("home.missionTitle"),
    findUsTitle: t("home.findUsTitle"),
    ideasEyebrow: t("home.ideasEyebrow"),
    linksTitle: t("footer.links"),
  };
}

async function HeroSection() {
  const [featured, labels] = await Promise.all([
    getFeaturedArticle(),
    getLabels(),
  ]);
  if (!featured) return null;
  return <HomeHero featured={featured} eyebrow={labels.ideasEyebrow} />;
}

async function IdeasSection() {
  const [articles, labels] = await Promise.all([getArticles(), getLabels()]);
  return <HomeIdeas articles={articles} title={labels.ideasTitle} />;
}

async function EventsSection() {
  const [events, labels] = await Promise.all([getEvents(), getLabels()]);
  return (
    <HomeEvents
      events={events}
      title={labels.eventsTitle}
      seeAllLabel={labels.seeAllEvents}
    />
  );
}

async function RestSection() {
  const [programs, intersections, stats, labels] = await Promise.all([
    getPrograms(),
    getTopics(),
    getSiteStats(),
    getLabels(),
  ]);
  const carouselPrograms = programs.filter((p) =>
    [
      "management-core",
      "evening-management",
      "executive",
      "leadership-fellows",
      "business-analytics",
      "finance",
    ].includes(p.slug),
  );
  return (
    <HomeRest
      labels={labels}
      carouselPrograms={carouselPrograms}
      intersections={intersections}
      stats={stats}
    />
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <IdeasSection />
      <EventsSection />
      <RestSection />
    </main>
  );
}
