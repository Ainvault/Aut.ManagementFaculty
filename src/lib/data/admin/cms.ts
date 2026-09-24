// Admin read layer for the CMS entities (camelCase + `published`), used by
// the /admin/[entity] pages. Public accessors stay in src/lib/data/*.

import {
  rowToAlumniStory,
  rowToArticle,
  rowToCampaignBanner,
  rowToEvent,
  rowToFacultyMember,
  rowToIntersectionTopic,
  rowToLegalPage,
  rowToProgram,
  rowToSiteStat,
  rowToTestimonial,
} from "@/lib/db/mappers";
import { getContentRow, listContentRows, type AdminListOpts } from "@/lib/data/admin/helpers";

type Row = Record<string, unknown>;

const withPublished =
  <T,>(map: (row: never) => T) =>
  (row: Row): T & { published: boolean } => ({
    ...map(row as never),
    published: Boolean(row.published),
  });

export function listAdminArticles(opts?: AdminListOpts) {
  return listContentRows(
    "articles",
    ["title", "author"],
    withPublished(rowToArticle ),
    opts,
    "published_at DESC",
  );
}

export function getAdminArticleById(id: string) {
  return getContentRow("articles", "id", id, withPublished(rowToArticle ));
}

export function listAdminPrograms(opts?: AdminListOpts) {
  return listContentRows(
    "programs",
    ["title", "slug"],
    withPublished(rowToProgram ),
    opts,
    "title ASC",
  );
}

export function getAdminProgramById(id: string) {
  return getContentRow("programs", "id", id, withPublished(rowToProgram ));
}

export function listAdminEvents(opts?: AdminListOpts) {
  return listContentRows(
    "events",
    ["title", "location"],
    withPublished(rowToEvent ),
    opts,
    "start_date DESC",
  );
}

export function getAdminEventById(id: string) {
  return getContentRow("events", "id", id, withPublished(rowToEvent ));
}

export function listAdminTopics(opts?: AdminListOpts) {
  return listContentRows(
    "intersection_topics",
    ["title", "slug"],
    withPublished(rowToIntersectionTopic ),
    opts,
    "title ASC",
  );
}

export function getAdminTopicById(id: string) {
  return getContentRow("intersection_topics", "id", id, withPublished(rowToIntersectionTopic ));
}

export function listAdminFaculty(opts?: AdminListOpts) {
  return listContentRows(
    "faculty_members",
    ["name", "title"],
    withPublished(rowToFacultyMember ),
    opts,
    "name ASC",
  );
}

export function getAdminFacultyById(id: string) {
  return getContentRow("faculty_members", "id", id, withPublished(rowToFacultyMember ));
}

export function listAdminAlumni(opts?: AdminListOpts) {
  return listContentRows(
    "alumni_stories",
    ["title", "name"],
    withPublished(rowToAlumniStory ),
    opts,
    "created_at DESC",
  );
}

export function getAdminAlumniById(id: string) {
  return getContentRow("alumni_stories", "id", id, withPublished(rowToAlumniStory ));
}

export function listAdminBanners(opts?: AdminListOpts) {
  return listContentRows(
    "campaign_banners",
    ["version", "cta"],
    withPublished(rowToCampaignBanner ),
    opts,
    "created_at DESC",
  );
}

export function getAdminBannerById(id: string) {
  return getContentRow("campaign_banners", "id", id, withPublished(rowToCampaignBanner ));
}

export function listAdminLegal(opts?: AdminListOpts) {
  return listContentRows(
    "legal_pages",
    ["slug", "title"],
    withPublished(rowToLegalPage ),
    opts,
    "title ASC",
  );
}

export function getAdminLegalBySlug(slug: string) {
  return getContentRow("legal_pages", "slug", slug, withPublished(rowToLegalPage ));
}

export function listAdminStats(opts?: AdminListOpts) {
  return listContentRows(
    "site_stats",
    ["value", "label"],
    withPublished(rowToSiteStat ),
    opts,
    "created_at ASC",
  );
}

export function getAdminStatById(id: string) {
  return getContentRow("site_stats", "id", id, withPublished(rowToSiteStat ));
}

export function listAdminTestimonials(opts?: AdminListOpts) {
  return listContentRows(
    "testimonials",
    ["name", "quote"],
    withPublished(rowToTestimonial ),
    opts,
    "created_at DESC",
  );
}

export function getAdminTestimonialById(id: string) {
  return getContentRow("testimonials", "id", id, withPublished(rowToTestimonial ));
}