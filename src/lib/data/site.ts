import { query } from "@/lib/db";
import type {
  AlumniStory,
  CampaignBanner,
  FacultyMember,
  IntersectionTopic,
  LegalPage,
  SiteStat,
  Testimonial,
} from "@/lib/types";
import {
  rowToAlumniStory,
  rowToCampaignBanner,
  rowToFacultyMember,
  rowToIntersectionTopic,
  rowToLegalPage,
  rowToSiteStat,
  rowToTestimonial,
  type AlumniStoryRow,
  type CampaignBannerRow,
  type FacultyMemberRow,
  type IntersectionTopicRow,
  type LegalPageRow,
  type SiteStatRow,
  type TestimonialRow,
} from "@/lib/db/mappers";

export async function getTopics(): Promise<IntersectionTopic[]> {
  const res = await query<IntersectionTopicRow>(
    "SELECT * FROM intersection_topics WHERE published = true ORDER BY id ASC",
  );
  return res.rows.map(rowToIntersectionTopic);
}

export async function getTopicBySlug(
  slug: string,
): Promise<IntersectionTopic | null> {
  const res = await query<IntersectionTopicRow>(
    "SELECT * FROM intersection_topics WHERE published = true AND slug = $1 LIMIT 1",
    [slug],
  );
  return res.rows[0] ? rowToIntersectionTopic(res.rows[0]) : null;
}

export async function getFaculty(): Promise<FacultyMember[]> {
  const res = await query<FacultyMemberRow>(
    "SELECT * FROM faculty_members WHERE published = true ORDER BY id ASC",
  );
  return res.rows.map(rowToFacultyMember);
}

export async function getAlumniStories(): Promise<AlumniStory[]> {
  const res = await query<AlumniStoryRow>(
    "SELECT * FROM alumni_stories WHERE published = true ORDER BY id ASC",
  );
  return res.rows.map(rowToAlumniStory);
}

export async function getCampaignBanners(): Promise<CampaignBanner[]> {
  const res = await query<CampaignBannerRow>(
    "SELECT * FROM campaign_banners WHERE published = true ORDER BY id ASC",
  );
  return res.rows.map(rowToCampaignBanner);
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  const res = await query<LegalPageRow>(
    "SELECT * FROM legal_pages WHERE published = true AND slug = $1 LIMIT 1",
    [slug],
  );
  return res.rows[0] ? rowToLegalPage(res.rows[0]) : null;
}

export async function getSiteStats(): Promise<SiteStat[]> {
  const res = await query<SiteStatRow>(
    "SELECT * FROM site_stats WHERE published = true ORDER BY id ASC",
  );
  return res.rows.map(rowToSiteStat);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await query<TestimonialRow>(
    "SELECT * FROM testimonials WHERE published = true ORDER BY id ASC",
  );
  return res.rows.map(rowToTestimonial);
}