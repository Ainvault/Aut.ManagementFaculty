// Phase D — Zod validation schemas for admin write APIs.
// Field-level validators are shared; create uses defaults, patch is all-optional
// (no defaults on patch, so omitted fields are never overwritten).

import { z } from "zod";

/** Accepts local paths ("/register/...") or absolute http(s) URLs (seeded image/href values use both). */
export const urlOrPath = z
  .string()
  .min(1)
  .refine((v) => v.startsWith("/") || /^https?:\/\//.test(v), {
    message: "باید مسیر محلی یا URL معتبر باشد",
  });

export const slugField = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug فقط حروف کوچک لاتین و خط تیره");

export const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "تاریخ باید YYYY-MM-DD باشد");

const courseFields = {
  slug: slugField,
  title: z.string().min(1, "title الزامی است"),
  summary: z.string().min(1, "summary الزامی است"),
  category: z.enum(["leadership", "technology", "innovation", "energy", "design", "digital"]),
  durationHours: z.number().int().positive("durationHours باید عدد مثبت باشد"),
  format: z.enum(["online", "blended", "in-person"]),
  /** Optional; null clears price. Empty string from forms is coerced to null. */
  price: z
    .union([z.number().int().nonnegative("قیمت نمی‌تواند منفی باشد"), z.null()])
    .optional(),
  registrationUrl: urlOrPath,
  imageUrl: urlOrPath,
  seoDescription: z.string(),
  published: z.boolean(),
};

export const courseCreateSchema = z.object({
  ...courseFields,
  seoDescription: z.string().default(""),
  published: z.boolean().default(true),
});

export const coursePatchSchema = z
  .object(courseFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const articleFields = {
  title: z.string().min(1, "title الزامی است"),
  category: z.string().min(1).max(60),
  excerpt: z.string().min(1, "excerpt الزامی است"),
  imageUrl: urlOrPath,
  href: urlOrPath,
  featured: z.boolean(),
  body: z.string().min(1, "body الزامی است"),
  publishedAt: dateOnly,
  author: z.string().min(1, "author الزامی است"),
  published: z.boolean(),
};

export const articleCreateSchema = z.object({
  ...articleFields,
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const articlePatchSchema = z
  .object(articleFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const highlights = z.array(z.string());

const programFields = {
  slug: slugField,
  title: z.string().min(1, "title الزامی است"),
  blurb: z.string().min(1, "blurb الزامی است"),
  group: z.enum(["standard", "executive"]),
  href: urlOrPath,
  tagline: z.string().nullable(),
  audience: z.string().min(1, "audience الزامی است"),
  durationLabel: z.string().min(1, "durationLabel الزامی است"),
  formatLabel: z.string().min(1, "formatLabel الزامی است"),
  highlights,
  body: z.string().min(1, "body الزامی است"),
  published: z.boolean(),
};

export const programCreateSchema = z.object({
  ...programFields,
  tagline: z.string().nullable().default(null),
  highlights: highlights.default([]),
  published: z.boolean().default(true),
});

export const programPatchSchema = z
  .object({ ...programFields, tagline: z.string().nullable().optional() })
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const eventFields = {
  title: z.string().min(1, "title الزامی است"),
  startDate: dateOnly,
  endDate: dateOnly.nullable(),
  location: z.string().min(1, "location الزامی است"),
  href: urlOrPath,
  summary: z.string().min(1, "summary الزامی است"),
  published: z.boolean(),
};

export const eventCreateSchema = z.object({
  ...eventFields,
  endDate: dateOnly.nullable().default(null),
  published: z.boolean().default(true),
});

export const eventPatchSchema = z
  .object({ ...eventFields, endDate: dateOnly.nullable().optional() })
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const topicFields = {
  slug: slugField,
  title: z.string().min(1, "title الزامی است"),
  description: z.string().min(1, "description الزامی است"),
  href: urlOrPath,
  imageUrl: urlOrPath,
  body: z.string().min(1, "body الزامی است"),
  highlights,
  published: z.boolean(),
};

export const topicCreateSchema = z.object({
  ...topicFields,
  highlights: highlights.default([]),
  published: z.boolean().default(true),
});

export const topicPatchSchema = z
  .object(topicFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const facultyFields = {
  name: z.string().min(1, "name الزامی است"),
  title: z.string().min(1, "title الزامی است"),
  focus: z.string().min(1, "focus الزامی است"),
  bio: z.string().min(1, "bio الزامی است"),
  imageUrl: urlOrPath,
  published: z.boolean(),
};

export const facultyCreateSchema = z.object({
  ...facultyFields,
  published: z.boolean().default(true),
});

export const facultyPatchSchema = z
  .object(facultyFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const alumniFields = {
  title: z.string().min(1, "title الزامی است"),
  excerpt: z.string().min(1, "excerpt الزامی است"),
  name: z.string().min(1, "name الزامی است"),
  program: z.string().min(1, "program الزامی است"),
  imageUrl: urlOrPath,
  href: urlOrPath,
  published: z.boolean(),
};

export const alumniCreateSchema = z.object({
  ...alumniFields,
  published: z.boolean().default(true),
});

export const alumniPatchSchema = z
  .object(alumniFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const bannerFields = {
  version: z.string().min(1, "version الزامی است"),
  text: z.string().min(1, "text الزامی است"),
  href: urlOrPath,
  cta: z.string().min(1, "cta الزامی است"),
  published: z.boolean(),
};

export const bannerCreateSchema = z.object({
  ...bannerFields,
  published: z.boolean().default(true),
});

export const bannerPatchSchema = z
  .object(bannerFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const legalFields = {
  slug: slugField,
  title: z.string().min(1, "title الزامی است"),
  body: z.array(z.string()),
  published: z.boolean(),
};

export const legalCreateSchema = z.object({
  ...legalFields,
  body: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

export const legalPatchSchema = z
  .object(legalFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const statFields = {
  value: z.string().min(1, "value الزامی است"),
  label: z.string().min(1, "label الزامی است"),
  published: z.boolean(),
};

export const statCreateSchema = z.object({
  ...statFields,
  published: z.boolean().default(true),
});

export const statPatchSchema = z
  .object(statFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

const testimonialFields = {
  quote: z.string().min(1, "quote الزامی است"),
  name: z.string().min(1, "name الزامی است"),
  role: z.string().min(1, "role الزامی است"),
  courseTitle: z.string().min(1, "courseTitle الزامی است"),
  published: z.boolean(),
};

export const testimonialCreateSchema = z.object({
  ...testimonialFields,
  published: z.boolean().default(true),
});

export const testimonialPatchSchema = z
  .object(testimonialFields)
  .partial()
  .refine((v) => Object.keys(v).length > 0, { message: "حداقل یک فیلد برای ویرایش لازم است" });

export const registrationStatusSchema = z.object({
  status: z.enum(["new", "contacted", "enrolled", "rejected"]),
});