// Registry describing every CMS entity the admin manages. Drives the generic
// list/new/edit pages and the generic organisms (Filters / Table / Form /
// DeleteDialog). Field specs mirror src/lib/validation/admin.ts so the form
// payload is already camelCase and validated by the same write APIs.

import {
  getAdminAlumniById,
  getAdminArticleById,
  getAdminBannerById,
  getAdminEventById,
  getAdminFacultyById,
  getAdminLegalBySlug,
  getAdminProgramById,
  getAdminStatById,
  getAdminTestimonialById,
  getAdminTopicById,
  listAdminAlumni,
  listAdminArticles,
  listAdminBanners,
  listAdminEvents,
  listAdminFaculty,
  listAdminLegal,
  listAdminPrograms,
  listAdminStats,
  listAdminTestimonials,
  listAdminTopics,
} from "@/lib/data/admin/cms";

export type AdminFieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select"
  | "boolean"
  | "stringList";

export interface AdminSelectOption {
  value: string;
  label: string;
}

export interface AdminFieldSpec {
  name: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  placeholder?: string;
  options?: AdminSelectOption[];
  defaultValue?: unknown;
  /** spans the full form row instead of one column of a 2-col grid */
  full?: boolean;
}

export interface AdminColumnSpec {
  name: string;
  label: string;
  variant?: "text" | "badge" | "date";
  /** badge label map (e.g. group/status enums) */
  map?: Record<string, string>;
}

export type AdminRow = Record<string, unknown>;

/** Serializable slice of AdminEntitySpec that can cross into Client Components. */
export type GenericFormSpec = Pick<
  AdminEntitySpec,
  "key" | "noun" | "apiPath" | "idColumn" | "fields"
>;

export interface AdminEntitySpec {
  /** URL segment under /admin */
  key: string;
  navLabel: string;
  /** singular Persian noun (delete confirmation, etc.) */
  noun: string;
  apiPath: string;
  /** PK column; legal uses slug, everything else id */
  idColumn: "id" | "slug";
  searchCols: string[];
  searchHint: string;
  hasPublished: boolean;
  /** public detail URL for the "preview" link (only shown when published) */
  preview?: (row: AdminRow) => string | null;
  fields: AdminFieldSpec[];
  columns: AdminColumnSpec[];
  list: (opts?: { search?: string; published?: boolean }) => Promise<unknown[]>;
  get: (id: string) => Promise<unknown | null>;
}

const publishedField: AdminFieldSpec = {
  name: "published",
  label: "وضعیت انتشار",
  type: "boolean",
  defaultValue: true,
};

const yesNo = [
  { value: "true", label: "بله" },
  { value: "false", label: "خیر" },
];

const publishedCol: AdminColumnSpec = { name: "published", label: "انتشار", variant: "badge", map: { true: "منتشر", false: "پیش‌نویس" } };

export const ENTITIES: Record<string, AdminEntitySpec> = {
  articles: {
    key: "articles",
    navLabel: "مقالات",
    noun: "مقاله",
    apiPath: "/api/admin/articles",
    idColumn: "id",
    searchCols: ["title", "author"],
    searchHint: "عنوان یا نویسنده",
    hasPublished: true,
    preview: (r) => `/insights/${r.id}`,
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, full: true },
      {
        name: "category",
        label: "دسته",
        type: "text",
        required: true,
        placeholder: "مثلاً نوآوری",
      },
      { name: "author", label: "نویسنده", type: "text", required: true },
      { name: "publishedAt", label: "تاریخ انتشار", type: "date", required: true },
      { name: "excerpt", label: "خلاصه", type: "textarea", required: true, full: true },
      { name: "imageUrl", label: "آدرس تصویر", type: "text", placeholder: "/images/insights/..." },
      { name: "href", label: "لینک کامل", type: "text", placeholder: "/insights/..." },
      { name: "featured", label: "مقالهٔ ویژه", type: "boolean", options: yesNo, defaultValue: false },
      { name: "body", label: "متن مقاله", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "title", label: "عنوان" },
      { name: "category", label: "دسته", variant: "badge" },
      { name: "featured", label: "ویژه", variant: "badge", map: { true: "ویژه", false: "—" } },
      { name: "publishedAt", label: "تاریخ", variant: "date" },
      { name: "author", label: "نویسنده" },
    ],
    list: listAdminArticles,
    get: getAdminArticleById,
  },

  programs: {
    key: "programs",
    navLabel: "برنامه‌ها",
    noun: "برنامه",
    apiPath: "/api/admin/programs",
    idColumn: "id",
    searchCols: ["title", "slug"],
    searchHint: "عنوان یا اسلاگ",
    hasPublished: true,
    preview: (r) => `/programs/${r.slug}`,
    fields: [
      { name: "slug", label: "اسلاگ", type: "text", required: true, placeholder: "academy-experience" },
      { name: "title", label: "عنوان", type: "text", required: true },
      {
        name: "group",
        label: "گروه",
        type: "select",
        options: [
          { value: "standard", label: "استاندارد" },
          { value: "executive", label: "اجرایی" },
        ],
        defaultValue: "standard",
      },
      { name: "durationLabel", label: "برچسب مدت", type: "text", required: true },
      { name: "formatLabel", label: "برچسب قالب", type: "text", required: true },
      { name: "tagline", label: "تگلاین", type: "text" },
      { name: "audience", label: "مخاطبان", type: "text", required: true },
      { name: "href", label: "لینک", type: "text", placeholder: "/programs/..." },
      { name: "blurb", label: "معرفی کوتاه", type: "textarea", required: true, full: true },
      { name: "highlights", label: "نکات برجسته", type: "stringList", full: true },
      { name: "body", label: "متن کامل", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "title", label: "عنوان" },
      { name: "group", label: "گروه", variant: "badge", map: { standard: "استاندارد", executive: "اجرایی" } },
      { name: "durationLabel", label: "مدت" },
      publishedCol,
    ],
    list: listAdminPrograms,
    get: getAdminProgramById,
  },

  events: {
    key: "events",
    navLabel: "رویدادها",
    noun: "رویداد",
    apiPath: "/api/admin/events",
    idColumn: "id",
    searchCols: ["title", "location"],
    searchHint: "عنوان یا محل",
    hasPublished: true,
    preview: (r) => `/events/${r.id}`,
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, full: true },
      { name: "startDate", label: "تاریخ شروع", type: "date", required: true },
      { name: "endDate", label: "تاریخ پایان (اختیاری)", type: "date" },
      { name: "location", label: "محل برگزاری", type: "text", required: true },
      { name: "href", label: "لینک", type: "text", placeholder: "/events/..." },
      { name: "summary", label: "خلاصه", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "title", label: "عنوان" },
      { name: "startDate", label: "شروع", variant: "date" },
      { name: "location", label: "محل" },
      publishedCol,
    ],
    list: listAdminEvents,
    get: getAdminEventById,
  },

  topics: {
    key: "topics",
    navLabel: "موضوعات",
    noun: "موضوع",
    apiPath: "/api/admin/topics",
    idColumn: "id",
    searchCols: ["title", "slug"],
    searchHint: "عنوان یا اسلاگ",
    hasPublished: true,
    preview: (r) => `/topics/${r.slug}`,
    fields: [
      { name: "slug", label: "اسلاگ", type: "text", required: true },
      { name: "title", label: "عنوان", type: "text", required: true },
      { name: "href", label: "لینک", type: "text", placeholder: "/topics/..." },
      { name: "imageUrl", label: "آدرس تصویر", type: "text", placeholder: "/images/topics/..." },
      { name: "description", label: "توضیح", type: "textarea", required: true, full: true },
      { name: "highlights", label: "نکات برجسته", type: "stringList", full: true },
      { name: "body", label: "متن کامل", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "title", label: "عنوان" },
      publishedCol,
    ],
    list: listAdminTopics,
    get: getAdminTopicById,
  },

  faculty: {
    key: "faculty",
    navLabel: "اساتید",
    noun: "عضو هیئت علمی",
    apiPath: "/api/admin/faculty",
    idColumn: "id",
    searchCols: ["name", "title"],
    searchHint: "نام یا سمت",
    hasPublished: true,
    fields: [
      { name: "name", label: "نام", type: "text", required: true },
      { name: "title", label: "مرتبه علمی", type: "text", required: true, placeholder: "استادیار" },
      { name: "department", label: "گروه", type: "text", placeholder: "مدیریت کسب و کار" },
      { name: "focus", label: "علایق پژوهشی", type: "text", required: true },
      { name: "email", label: "ایمیل", type: "text", placeholder: "name@aut.ac.ir" },
      { name: "phone", label: "تلفن داخلی", type: "text", placeholder: "۰۲۱۶۴۵۴۵۸۰۰" },
      { name: "office", label: "دفتر", type: "text", placeholder: "ساختمان زکریا رازی — اتاق …" },
      { name: "imageUrl", label: "آدرس تصویر", type: "text", placeholder: "/images/faculty/..." },
      { name: "linkedinUrl", label: "لینکدین", type: "text", placeholder: "https://www.linkedin.com/in/..." },
      { name: "scholarUrl", label: "گوگل اسکولار", type: "text", placeholder: "https://scholar.google.com/..." },
      { name: "bio", label: "بیوگرافی", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "name", label: "نام" },
      { name: "title", label: "سمت" },
      publishedCol,
    ],
    list: listAdminFaculty,
    get: getAdminFacultyById,
  },

  alumni: {
    key: "alumni",
    navLabel: "دانش‌آموختگان",
    noun: "داستان",
    apiPath: "/api/admin/alumni",
    idColumn: "id",
    searchCols: ["title", "name"],
    searchHint: "عنوان یا نام",
    hasPublished: true,
    fields: [
      { name: "title", label: "عنوان", type: "text", required: true, full: true },
      { name: "name", label: "نام", type: "text", required: true },
      { name: "program", label: "برنامه", type: "text", required: true },
      { name: "imageUrl", label: "آدرس تصویر", type: "text", placeholder: "/images/alumni/..." },
      { name: "href", label: "لینک", type: "text", placeholder: "/alumni/..." },
      { name: "excerpt", label: "خلاصه", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "title", label: "عنوان" },
      { name: "name", label: "نام" },
      { name: "program", label: "برنامه" },
      publishedCol,
    ],
    list: listAdminAlumni,
    get: getAdminAlumniById,
  },

  banners: {
    key: "banners",
    navLabel: "بنرهای کمپین",
    noun: "بنر",
    apiPath: "/api/admin/banners",
    idColumn: "id",
    searchCols: ["version", "cta"],
    searchHint: "نسخه یا دکمه",
    hasPublished: true,
    fields: [
      { name: "version", label: "نسخه", type: "text", required: true, placeholder: "مثلاً autumn-2025" },
      { name: "cta", label: "دکمه", type: "text", required: true },
      { name: "href", label: "لینک", type: "text", required: true, placeholder: "/register/..." },
      { name: "text", label: "متن بنر", type: "textarea", required: true, full: true },
      publishedField,
    ],
    columns: [
      { name: "version", label: "نسخه" },
      { name: "cta", label: "دکمه" },
      publishedCol,
    ],
    list: listAdminBanners,
    get: getAdminBannerById,
  },

  legal: {
    key: "legal",
    navLabel: "صفحات قانونی",
    noun: "صفحه",
    apiPath: "/api/admin/legal",
    idColumn: "slug",
    searchCols: ["slug", "title"],
    searchHint: "اسلاگ یا عنوان",
    hasPublished: true,
    preview: (r) => `/${r.slug}`,
    fields: [
      { name: "slug", label: "اسلاگ", type: "text", required: true, placeholder: "privacy" },
      { name: "title", label: "عنوان", type: "text", required: true },
      { name: "body", label: "پاراگراف‌ها", type: "stringList", full: true },
      publishedField,
    ],
    columns: [
      { name: "title", label: "عنوان" },
      { name: "slug", label: "اسلاگ" },
      publishedCol,
    ],
    list: listAdminLegal,
    get: getAdminLegalBySlug,
  },

  stats: {
    key: "stats",
    navLabel: "آمار",
    noun: "آمار",
    apiPath: "/api/admin/stats",
    idColumn: "id",
    searchCols: ["value", "label"],
    searchHint: "مقدار یا برچسب",
    hasPublished: true,
    fields: [
      { name: "value", label: "مقدار", type: "text", required: true, placeholder: "مثلاً ۹۸٪" },
      { name: "label", label: "برچسب", type: "text", required: true, placeholder: "مثلاً رضایت شرکت‌کنندگان" },
      publishedField,
    ],
    columns: [
      { name: "value", label: "مقدار" },
      { name: "label", label: "برچسب" },
      publishedCol,
    ],
    list: listAdminStats,
    get: getAdminStatById,
  },

  testimonials: {
    key: "testimonials",
    navLabel: "نظرات",
    noun: "نظر",
    apiPath: "/api/admin/testimonials",
    idColumn: "id",
    searchCols: ["name", "quote"],
    searchHint: "نام یا متن",
    hasPublished: true,
    fields: [
      { name: "quote", label: "متن نظر", type: "textarea", required: true, full: true },
      { name: "name", label: "نام", type: "text", required: true },
      { name: "role", label: "سمت", type: "text", required: true },
      { name: "courseTitle", label: "عنوان دوره", type: "text", required: true },
      publishedField,
    ],
    columns: [
      { name: "quote", label: "متن" },
      { name: "name", label: "نام" },
      publishedCol,
    ],
    list: listAdminTestimonials,
    get: getAdminTestimonialById,
  },
};

/** Stable insertion order for nav/menus. */
export const ENTITY_KEYS = Object.keys(ENTITIES);