export type CourseFormat = "online" | "blended" | "in-person";

export type CourseCategory =
  | "leadership"
  | "technology"
  | "innovation"
  | "energy"
  | "design"
  | "digital";

export interface Course {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: CourseCategory;
  durationHours: number;
  format: CourseFormat;
  /** Optional price in toman; omit/null = do not show price in UI */
  price?: number | null;
  registrationUrl: string;
  imageUrl: string;
  seoDescription: string;
}

export type ProgramGroup = "standard" | "executive";

export interface Program {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  group: ProgramGroup;
  href: string;
  tagline?: string;
  audience: string;
  durationLabel: string;
  formatLabel: string;
  highlights: string[];
  body: string;
}

export interface EventItem {
  id: string;
  title: string;
  startDate: string;
  endDate: string | null;
  location: string;
  href: string;
  summary: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  href: string;
  featured: boolean;
  body: string;
  publishedAt: string;
  author: string;
}

export interface IntersectionTopic {
  id: string;
  slug: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  body: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  courseTitle: string;
}

export interface SiteStat {
  id: string;
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  focus: string;
  bio: string;
  imageUrl: string;
}

export interface AlumniStory {
  id: string;
  title: string;
  excerpt: string;
  name: string;
  program: string;
  imageUrl: string;
  href: string;
}

export interface CampaignBanner {
  id: string;
  version: string;
  text: string;
  href: string;
  cta: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  body: string[];
}
