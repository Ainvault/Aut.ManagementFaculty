# Progress

## Done
- [x] Discovery تأیید شد
- [x] نصب skill `vercel-react-best-practices`
- [x] پر کردن docs (brief / architecture / domain / decisions)
- [x] Scaffold Next.js + shadcn + embla + lucide + next-intl
- [x] Atomic foundation + brand tokens + Vazirmatn RTL
- [x] Mock + API (`/api/courses|programs|events|articles`)
- [x] صفحات `/` (Sloan-like) و `/professional`
- [x] SEO metadata + JSON-LD
- [x] `npm run build` موفق
- [x] استخراج مرجع MIT Sloan → `docs/reference/mitsloan/`
- [x] فاز ۱ محتوا: همه مسیرهای لینک‌شده + polish ظاهر + بنر/جستجو
- [x] Design system: توکن‌ها، `ds-*` utilities، polish هیرو/کارت/جستجو (vercel skill)
- [x] بازسازی ۱:۱ Sloan: پالت/CTA نقطه‌ای/overlay آکادمیک/ترتیب سکشن هوم + docs/12-design-system
- [x] انتقال skill/قواعد دیزاین از Front.Patient.App → `docs/design-system-rules.md` + skills `material-design` / `design-system-rules` + `.cursor/rules`
- [x] اجرای قواعد: audit (`DESIGN_SYSTEM_AUDIT.md`) + توکن‌های `ds-card`/`gold-deep` + `SurfaceCard` + حذف drift hex/bg-white/arbitrary type؛ `npm run build` OK
- [x] RTL فارسی: هدر native (برند→ناو→اکشن)، بدون tracking روی متن FA، CTA shadow آینه‌ای، `ps-5` برای list-disc
- [x] فوتر فشرده + کاهش فضای خالی (هیرو/سکشن/Find Us تکراری)
- [x] نرم‌سازی گوشه‌ها/سایه + انیمیشن روان (ds-lift، CTA، ken-burns هیرو، reduced-motion)
- [x] نام‌گذاری فارسی روشن: منو/پیام‌ها/برنامه‌ها/مقالات (حذف jargon ترجمه‌ی Sloan)
- [x] مهاجرت کامل UI به shadcn/ui + Tailwind (حذف ds-* و --brand-*)
- [x] اتصال تست به PostgreSQL 16.15 (`ManagmentWebSite_Db`) — تأییدشده
- [x] مستند اتصال: `docs/03-database.md` + `.env.local` + `pg` + `scripts/test-db-connection.mjs`
- [x] پلن اجرایی کامل ایجنت: `docs/04-development-plan.md` (فازهای A→H)
- [x] فاز A — Schema + Migrations: `db/migrations/001_init.sql` + `db/migrate.mjs`؛ ۱۴ جدول + `schema_migrations` + ایندکس جزئی `articles_one_featured` + trigger `set_updated_at`؛ اجرای دوباره idempotent؛ D14
- [x] فاز B — Seed از mock: `db/seed.mjs` + مپر `src/lib/db/mappers.ts`؛ upsert همهٔ mock به DB؛ تعداد ردیفها با mock یکی است؛ featured_articles=۱؛ اجرای دوباره idempotent؛ D15
- [x] فاز C — تعویض `lib/data` به PostgreSQL: همهٔ accessor ها فقط `published = true` می‌خوانند؛ مپرهای معکوس SQL→TS؛ بدون import مستقیم mock در `src`؛ `npm run build` OK؛ `/api/courses|programs|events|articles` دادهٔ درست (camelCase)
- [x] فاز E — Auth ادمین: `proxy.ts` (انتقال از middleware با توجه به Next 16) + layout-گارد `src/app/admin/(guard)/layout.tsx` + `src/lib/auth/admin.ts` (scrypt + session) + `/admin/login` + API لاگین/لاگاوت + `scripts/seed-admin.mjs` (admin@aut.ac.ir/admin123)؛ تست: 307 بدون session، 401 رمز غلط، logout حذف session؛ D16
- [x] فاز D کامل — write API ادمین همهٔ entityها + registrations (GET/PATCH)؛ Zod validation (D17)، قانون featured (409، D18)، سازنده‌های SQL مشترک (D19)؛ تست زنده همهٔ مسیرها + پاکسازی
- [x] فاز F بخش ۱ — shell ادمین (ناو + خروج در `(guard)`) + داشبورد (شمارش + لیدهای اخیر با تغییر status) + CRUD دوره‌ها: لیست با فیلتر search/published، new/`[id]/edit`، توگل publish، حذف با Dialog؛ لایه دادهٔ `lib/data/admin/courses.ts` + GET ادمین؛ primitive های Table/Select/Dialog با shadcn CLI افزوده شد؛ تست زنده: ریدایرکت بدون session، فیلترها، create→publish→دیده‌شدن در عمومی→unpublish→حذف، logout؛ D20
- [x] فاز F ادامه (ساختار کامل ادمین) — رجیستری `ENTITIES` (`lib/admin/entities.ts`) برای ۱۰ entity + لایه دادهٔ عمومی `lib/data/admin/{helpers,cms,registrations}.ts` + صفحات داینامیک `/admin/[entity]`, `[entity]/new`, `[entity]/[id]/edit` + orgهای عمومی (Filters/Table/Form/DeleteDialog/PublishToggle) + ناوبری گروهی (محتوا/جامعه/سایت/درخواست‌ها)؛ D21. نکته: `GenericForm` فقط spec قابل‌serialize می‌گیرد (توابع list/get/preview به Client Component نمی‌رسند)
- [x] فاز G — ثبت‌نام عمومی: `POST /api/registrations` (اسکیمای عموم `publicRegistrationSchema`؛ یافتن course_id از slug؛ عموم بدون auth) + فرم ثبت‌نام واقعاً لید می‌سازد + صفحهٔ `/admin/registrations` (فیلتر search/status، تغییر status، حذف) + GET ادمین با فیلتر + DELETE؛ D22
- [x] فاز H — بازاعتبارسنجی: `revalidateSite()` (`revalidatePath("/", "layout")`) در `crud.ts` (buildInsert/buildUpdate) + دستی در route های raw-SQL (courses/articles) و DELETE همهٔ entityها؛ D22
- [x] فاز H باقی‌مانده — ایندکس‌ها (`db/migrations/002_indexes.sql`؛ leads/articles/events/programs/courses؛ slugها و featured از 001)، حذف کامل وابستگی runtime به mock (هویت استاتیک → `src/lib/site-config.ts`؛ stats/testimonials/intersections از DB: `getSiteStats()`/`getTestimonials()` در `lib/data/site.ts`)، docs نهایی (00-brief، 01-architecture، 03-database، 04-development-plan، README)، اسکریپت `scripts/smoke.mjs` (خواندن API + یک write ادمین) → `SMOKE_OK` زنده؛ tsc/lint/build سبز

## Doing

هیچ — ساختار کامل است؛ فقط محتوای واقعی مانده که طبق دستور کاربر از ادمین کنترل می‌شود.

## Next
- [x] فاز H باقی‌مانده — ایندکس‌ها، docs/README نهایی، حذف وابستگی runtime به mock، smoke script
- [ ] محتوای واقعی از پنل ادمین (طبق دستور کاربر بعداً)

## Milestones
| مرحله | وضعیت | تاریخ |
|---|---|---|
| ۰ راه‌اندازی | انجام شد | 2026-09-21 |
| ۱ تکمیل تعامل/محتوا | انجام شد | 2026-09-22 |
| ۱b دیزاین‌سیستم | انجام شد | 2026-09-22 |
| ۱c Sloan 1:1 FA | انجام شد | 2026-09-22 |
| ۲ اتصال DB | فاز A–C تمام شد — schema + seed + read از DB | 2026-09-22 |
| ۳ ساختار اولیه کامل (A→H) | ساختار ادمین/ثبت‌نام/پولیش تمام شد | 2026-09-24 |
