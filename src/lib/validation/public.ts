// Phase G — public (no auth) validation schemas.

import { z } from "zod";

export const publicRegistrationSchema = z.object({
  fullName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  email: z.email("ایمیل معتبر نیست"),
  phone: z.string().default(""),
  position: z.string().min(1, "سمت را وارد کنید"),
  organization: z.string().min(1, "سازمان را وارد کنید"),
  message: z.string().default(""),
  courseSlug: z.string().optional(),
});