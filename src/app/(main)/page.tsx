import { getTranslations } from "next-intl/server";
import {
  HomeEvents,
  HomeHero,
  HomeIdeas,
  HomeRest,
  type HomeLabels,
} from "@/components/templates/HomeTemplate";
import { getFeaturedArticle } from "@/lib/data/articles";
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
  try {
    const [featured, labels] = await Promise.all([
      getFeaturedArticle(),
      getLabels(),
    ]);
    return <HomeHero featured={featured} eyebrow={labels.ideasEyebrow} />;
  } catch (err) {
    console.error("[home] HeroSection failed:", err);
    const labels = await getLabels();
    return <HomeHero featured={null} eyebrow={labels.ideasEyebrow} />;
  }
}

async function EventsSection() {
  try {
    const [events, labels] = await Promise.all([getEvents(), getLabels()]);
    return (
      <HomeEvents
        events={events}
        title={labels.eventsTitle}
        seeAllLabel={labels.seeAllEvents}
      />
    );
  } catch (err) {
    console.error("[home] EventsSection failed:", err);
    const labels = await getLabels();
    return (
      <HomeEvents
        events={[]}
        title={labels.eventsTitle}
        seeAllLabel={labels.seeAllEvents}
      />
    );
  }
}

async function RestSection() {
  try {
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
  } catch (err) {
    console.error("[home] RestSection failed:", err);
    const labels = await getLabels();
    return (
      <HomeRest
        labels={labels}
        carouselPrograms={[]}
        intersections={[]}
        stats={[]}
      />
    );
  }
}

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <HomeIdeas />
      <EventsSection />
      <RestSection />
    </main>
  );
}
