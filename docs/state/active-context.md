# Active Context

## Current Goal
ساختار اولیه کامل است (فازهای A تا H پلن `docs/04-development-plan.md`). طبق دستور کاربر محتوای واقعی وارد نشده — بعداً از پنل ادمین کنترل می‌شود. هیچ کار ساختاری باقی نمانده؛ پیشرفت بعدی = محتوای واقعی.

## Current Work
کار ساختاری به پایان رسید و همهٔ چک‌های نهایی سبزند (2026-09-24):

- **حذف وابستگی runtime به mock**: همهٔ importهای `@/lib/mock` از runtime حذف شد. هویت/ناو استاتیک که تیبل ندارند → `src/lib/site-config.ts` (siteName، siteShortName، siteFaculty، siteUniversity، siteMission، siteAddress، homeNav، professionalNav، aboutFocusAreas، valuesContent، courseCategories). `src/lib/mock/site.ts` فقط برای seed (`db/seed.mjs`) باقی ماند (هدر کامنت دارد).
- **محتوا از DB**: `src/lib/data/site.ts` + `getSiteStats()`/`getTestimonials()` (مپرهای `rowToSiteStat`/`rowToTestimonial` موجود بودند)؛ هوم (`intersections` → `getTopics()` + `stats`) و `/professional` (stats/testimonials) از DB می‌خوانند. `HomeRest` prop جدید `stats: SiteStat[]` گرفت (Page آن را پاس می‌دهد).
- **ایندکس‌ها**: `db/migrations/002_indexes.sql` اعمال شد (`registration_leads(created_at DESC)`، `articles(published, published_at DESC)`، `events(published, start_date)`، `programs/courses(published, title)`). slugها و `articles_one_featured` از 001 موجودند.
- **tests**: tsc/lint/build سبز؛ `scripts/smoke.mjs` با `SMOKE_OK` زنده پاس شد (۴ API عمومی + login + create stat + delete stat؛ لید باقی‌نماند)؛ `/` و `/professional` با خروجی 200؛ ایندکس به‌صورت idempotent اجرا شد.
- **docs**: `00-brief.md` (ادمین دیگر out نیست)، `01-architecture.md` (پستگرس + ادمین همان اپ + الگوی registry)، `03-database.md` (بی‌نقص: جداول + migrate/seed + ایندکس ۰۰۲)، `04-development-plan.md` (چک‌لیست H کامل)، `README.md` (دستورات dev/migrate/seed/admin/smoke) به‌روز شدند.

## Current Blockers
بدون مانع. تصمیم‌های باز (حذف vs unpublish؛ آپلود تصویر؛ ORM؛ محتوای واقعی) در بخش ۱۵ پلن برای پرسش هنگام نیاز آمده‌اند.

## Next Steps
1. محتوای واقعی از پنل ادمین (طبق دستور کاربر بعداً — فعلاً چیزی بقای ساختاری نمانده).
2. (اختیاری، بخش ۱۰ پلن) rate limit روی `POST /api/registrations`؛ آپلود تصویر.

## نکته برای ادامهٔ کار
صفحات جدید داخل `src/app/admin/(guard)/` و کامپوننت‌های رابط در `src/components/organisms/admin/*`. افزودن primitive shadcn جدید فقط با `npx shadcn@latest add <name>` (بدون دست‌نویسی). **انتقال spec به Client Component نباید تابع داشته باشد** (list/get/preview → فقط `GenericFormSpec` serialize می‌شود؛ `GenericTable` سرور است و spec کامل مجاز است). Select بیس UI مقدار `null` هم می‌فرستد (`(v) => v ?? "all"`). در PowerShell مسیرهای حاوی `[id]` به `-LiteralPath` نیاز دارند؛ `Start-Process cmd` باید با `-ArgumentList @('/c', 'npm run start -- -p 3100 > server.log 2>&1')` ساخته شود. تست زنده: `npm run build` سپس سرور روی `-p 3100` و لاگین با `admin@aut.ac.ir/admin123` (cookie دارای Secure است؛ روی http باید دستی ارسال شود). smoke: `SMOKE_ADMIN_EMAIL/PASSWORD` بگذار و `node scripts/smoke.mjs` بزن.