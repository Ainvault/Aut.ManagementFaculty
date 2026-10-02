import type {
  AlumniStory,
  Article,
  CampaignBanner,
  Course,
  EventItem,
  FacultyMember,
  IntersectionTopic,
  LegalPage,
  Program,
  SiteStat,
  Testimonial,
} from "@/lib/types";

// camelCase (TypeScript type) → snake_case (SQL row) mappers.
// Shared between db/seed.mjs (Node) and src/lib/data/* (Next.js).
// Only type-only imports are used so type stripping keeps this importable by Node.

/** Date columns come back as Date from pg; seed inserts ISO strings. Both are accepted. */
export type DateField = Date | string;

export function fmtDate(value: DateField): string {
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return value;
}

/** JSONB columns are parsed to arrays by pg on read; seed inserts JSON strings. */
export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return JSON.parse(value) as string[];
  return [];
}

export interface CourseRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  duration_hours: number | null;
  format: string;
  price: string | number | null;
  registration_url: string;
  poster_image_url: string;
  brochure_image_url: string;
  seo_description: string;
  tags: string[];
  published: boolean;
}

export function courseToRow(course: Course): CourseRow {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    summary: course.summary,
    category: course.category,
    duration_hours: course.durationHours ?? null,
    format: course.format,
    price: course.price ?? null,
    registration_url: course.registrationUrl,
    poster_image_url: course.posterImageUrl,
    brochure_image_url: course.brochureImageUrl,
    seo_description: course.seoDescription,
    tags: course.tags ?? [],
    published: true,
  };
}

export interface ProgramRow {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  group_key: string;
  href: string;
  tagline: string | null;
  audience: string;
  duration_label: string;
  format_label: string;
  highlights: unknown;
  body: string;
  published: boolean;
}

export function programToRow(program: Program): ProgramRow {
  return {
    id: program.id,
    slug: program.slug,
    title: program.title,
    blurb: program.blurb,
    group_key: program.group,
    href: program.href,
    tagline: program.tagline ?? null,
    audience: program.audience,
    duration_label: program.durationLabel,
    format_label: program.formatLabel,
    highlights: JSON.stringify(program.highlights),
    body: program.body,
    published: true,
  };
}

export interface EventRow {
  id: string;
  title: string;
  start_date: DateField;
  end_date: DateField | null;
  location: string;
  href: string;
  summary: string;
  published: boolean;
}

export function eventToRow(event: EventItem): EventRow {
  return {
    id: event.id,
    title: event.title,
    start_date: event.startDate,
    end_date: event.endDate ?? null,
    location: event.location,
    href: event.href,
    summary: event.summary,
    published: true,
  };
}

export interface ArticleRow {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image_url: string;
  href: string;
  featured: boolean;
  body: string;
  published_at: DateField;
  author: string;
  published: boolean;
}

export function articleToRow(article: Article): ArticleRow {
  return {
    id: article.id,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    image_url: article.imageUrl,
    href: article.href,
    featured: article.featured,
    body: article.body,
    published_at: article.publishedAt,
    author: article.author,
    published: true,
  };
}

export interface IntersectionTopicRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  href: string;
  image_url: string;
  body: string;
  highlights: unknown;
  published: boolean;
}

export function intersectionTopicToRow(topic: IntersectionTopic): IntersectionTopicRow {
  return {
    id: topic.id,
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    href: topic.href,
    image_url: topic.imageUrl,
    body: topic.body,
    highlights: JSON.stringify(topic.highlights),
    published: true,
  };
}

export interface FacultyMemberRow {
  id: string;
  name: string;
  title: string;
  focus: string;
  bio: string;
  image_url: string;
  email: string | null;
  office: string | null;
  phone: string | null;
  department: string | null;
  linkedin_url: string | null;
  scholar_url: string | null;
  published: boolean;
}

export function facultyMemberToRow(faculty: FacultyMember): FacultyMemberRow {
  return {
    id: faculty.id,
    name: faculty.name,
    title: faculty.title,
    focus: faculty.focus,
    bio: faculty.bio,
    image_url: faculty.imageUrl,
    email: faculty.email ?? null,
    office: faculty.office ?? null,
    phone: faculty.phone ?? null,
    department: faculty.department ?? null,
    linkedin_url: faculty.linkedinUrl ?? null,
    scholar_url: faculty.scholarUrl ?? null,
    published: true,
  };
}

export interface AlumniStoryRow {
  id: string;
  title: string;
  excerpt: string;
  name: string;
  program: string;
  image_url: string;
  href: string;
  published: boolean;
}

export function alumniStoryToRow(story: AlumniStory): AlumniStoryRow {
  return {
    id: story.id,
    title: story.title,
    excerpt: story.excerpt,
    name: story.name,
    program: story.program,
    image_url: story.imageUrl,
    href: story.href,
    published: true,
  };
}

export interface CampaignBannerRow {
  id: string;
  version: string;
  text: string;
  href: string;
  cta: string;
  published: boolean;
}

export function campaignBannerToRow(banner: CampaignBanner): CampaignBannerRow {
  return {
    id: banner.id,
    version: banner.version,
    text: banner.text,
    href: banner.href,
    cta: banner.cta,
    published: true,
  };
}

export interface LegalPageRow {
  slug: string;
  title: string;
  body: unknown;
  published: boolean;
}

export function legalPageToRow(page: LegalPage): LegalPageRow {
  return {
    slug: page.slug,
    title: page.title,
    body: JSON.stringify(page.body),
    published: true,
  };
}

export interface SiteStatRow {
  id: string;
  value: string;
  label: string;
  published: boolean;
}

export function siteStatToRow(stat: SiteStat): SiteStatRow {
  return {
    id: stat.id,
    value: stat.value,
    label: stat.label,
    published: true,
  };
}

export interface TestimonialRow {
  id: string;
  quote: string;
  name: string;
  role: string;
  course_title: string;
  published: boolean;
}

export function testimonialToRow(testimonial: Testimonial): TestimonialRow {
  return {
    id: testimonial.id,
    quote: testimonial.quote,
    name: testimonial.name,
    role: testimonial.role,
    course_title: testimonial.courseTitle,
    published: true,
  };
}

// ---- Reverse mappers: SQL row (snake_case) → TypeScript type (camelCase) ----

export function rowToCourse(row: CourseRow): Course {
  const rawPrice = row.price;
  const price =
    rawPrice === null || rawPrice === undefined || rawPrice === ""
      ? null
      : Number(rawPrice);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    category: row.category as Course["category"],
    durationHours: row.duration_hours,
    format: row.format as Course["format"],
    price: Number.isFinite(price) ? price : null,
    registrationUrl: row.registration_url,
    posterImageUrl: row.poster_image_url ?? (row as unknown as { image_url?: string }).image_url ?? "",
    brochureImageUrl: row.brochure_image_url ?? (row as unknown as { image_url?: string }).image_url ?? "",
    seoDescription: row.seo_description,
    tags: asStringArray(row.tags),
  };
}

export function rowToProgram(row: ProgramRow): Program {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    blurb: row.blurb,
    group: row.group_key as Program["group"],
    href: row.href,
    tagline: row.tagline ?? undefined,
    audience: row.audience,
    durationLabel: row.duration_label,
    formatLabel: row.format_label,
    highlights: asStringArray(row.highlights),
    body: row.body,
  };
}

export function rowToEvent(row: EventRow): EventItem {
  return {
    id: row.id,
    title: row.title,
    startDate: fmtDate(row.start_date),
    endDate: row.end_date == null ? null : fmtDate(row.end_date),
    location: row.location,
    href: row.href,
    summary: row.summary,
  };
}

export function rowToArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    imageUrl: row.image_url,
    href: row.href,
    featured: row.featured,
    body: row.body,
    publishedAt: fmtDate(row.published_at),
    author: row.author,
  };
}

export function rowToIntersectionTopic(row: IntersectionTopicRow): IntersectionTopic {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    href: row.href,
    imageUrl: row.image_url,
    body: row.body,
    highlights: asStringArray(row.highlights),
  };
}

export function rowToFacultyMember(row: FacultyMemberRow): FacultyMember {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    focus: row.focus,
    bio: row.bio,
    imageUrl: row.image_url,
    email: row.email ?? undefined,
    office: row.office ?? undefined,
    phone: row.phone ?? undefined,
    department: row.department ?? undefined,
    linkedinUrl: row.linkedin_url ?? undefined,
    scholarUrl: row.scholar_url ?? undefined,
  };
}

export function rowToAlumniStory(row: AlumniStoryRow): AlumniStory {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    name: row.name,
    program: row.program,
    imageUrl: row.image_url,
    href: row.href,
  };
}

export function rowToCampaignBanner(row: CampaignBannerRow): CampaignBanner {
  return {
    id: row.id,
    version: row.version,
    text: row.text,
    href: row.href,
    cta: row.cta,
  };
}

export function rowToLegalPage(row: LegalPageRow): LegalPage {
  return {
    slug: row.slug,
    title: row.title,
    body: asStringArray(row.body),
  };
}

export function rowToSiteStat(row: SiteStatRow): SiteStat {
  return {
    id: row.id,
    value: row.value,
    label: row.label,
  };
}

export function rowToTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    courseTitle: row.course_title,
  };
}