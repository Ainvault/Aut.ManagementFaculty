// Phase G — public (no auth) validation schemas.

import { z } from "zod";

export const publicRegistrationSchema = z.object({
  fullName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  email: z.email("ایمیل معتبر نیست"),
  phone: z.string().default(""),
  message: z.string().default(""),
  courseSlug: z.string().optional(),
});