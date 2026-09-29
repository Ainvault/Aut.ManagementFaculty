# Database (Test)

> محیط تست — امنیت فعلاً اولویت نیست. این فایل شامل credential اتصال است.

## وضعیت اتصال

| مورد | مقدار |
|---|---|
| وضعیت | متصل و تأییدشده روی `185.36.145.12` (`2026-09-29`) |
| Engine | PostgreSQL **16.15** |
| Encoding | **UTF8** |
| جداول فعلی | ۱۴ جدول داده + `schema_migrations` (فاز A تا H؛ لیست در بخش Schema) |

## جزئیات اتصال

| فیلد | مقدار |
|---|---|
| Host | `185.36.145.12` |
| Port | `5432` |
| Database | `ManagmentWebSite_Db` |
| Username | `managment_web` |
| Password | `hD3H9seTqX1GJMu1mDJBGDYr` |
| Engine | PostgreSQL 16.15 |
| Encoding | UTF8 |

## Connection string

از **خارج سرور** (لپ‌تاپ / migrate / seed):

```
postgresql://managment_web:hD3H9seTqX1GJMu1mDJBGDYr@185.36.145.12:5432/ManagmentWebSite_Db
```

از **داخل Docker** روی همان سرور (کانتینر وب → کانتینر `insaight-postgres` روی `shared_web_network`):

```
postgresql://managment_web:hD3H9seTqX1GJMu1mDJBGDYr@insaight-postgres:5432/ManagmentWebSite_Db
```

برای اپلیکیشن از متغیر محیطی استفاده شود. در `deploy.yml` / `docker-compose.yml` هاست `insaight-postgres` است.

```env
# local (.env.local)
DATABASE_URL=postgresql://managment_web:hD3H9seTqX1GJMu1mDJBGDYr@185.36.145.12:5432/ManagmentWebSite_Db
```

فایل محلی: `.env.local` (در gitignore است).

Production باید مستقیم به نام کانتینر `insaight-postgres` وصل شود (نه IP عمومی از داخل bridge).

## تست سریع اتصال

```bash
node scripts/test-db-connection.mjs
```

خروجی موفق باید شامل `CONNECTION_OK` باشد.

## نکات معماری

- لایهٔ دسترسی داده `src/lib/data/*` است؛ UI نباید مستقیم به DB وصل شود.
- از فاز C به بعد، همهٔ صفحات عمومی از PostgreSQL می‌خوانند (فقط `published = true`)؛ mock‌ها فقط برای seed/مرجع در `src/lib/mock/*` می‌مانند (runtime هیچ import مستقیمی از mock ندارد).
- هویت/ناو استاتیک (نام سایت، ناوبری، مأموریت، دسته‌ها) تیبل ندارند — از `src/lib/site-config.ts` می‌آیند.
- مپرها (camelCase ↔ snake_case) در `src/lib/db/mappers.ts`؛ موجودیت‌های محتوا شامل accessorهای `getSiteStats()` / `getTestimonials()` (پنل professional از DB می‌خواند).
- پکیج کلاینت نصب‌شده: `pg`؛ مپرهای shared ای که در Next استفاده می‌شوند با SQL خام.

## Schema و Migration (فاز A — 2026-09-22)

- اجرا: `node db/migrate.mjs` (از `DATABASE_URL` در `.env.local` می‌خواند).
- مکانیزم: هر فایل `db/migrations/*.sql` به‌ترتیب اسم، یک‌بار و در یک تراکنش اعمال می‌شود؛ نسخه‌های اجراشده در جدول `schema_migrations` ثبت می‌شوند (اجرای دوباره no-op).
- جدول `set_updated_at` با trigger روی همهٔ جداول محتوایی `updated_at` را خودکار به‌روز می‌کند.

جداول (۱۴ عدد بدون `schema_migrations`):

| جدول | نکته |
|---|---|
| `courses` | `category`/`format` با CHECK؛ `slug` UNIQUE؛ `price` اختیاری (تومان، NULL = مخفی در UI) |
| `programs` | `group_key` (به‌جای reserve واژهٔ `group`)؛ `highlights` JSONB |
| `events` | `start_date`/`end_date` DATE؛ `end_date` NULL = تک‌روزه |
| `articles` | `featured` + ایندکس جزئی `articles_one_featured` (حداکثر یک مقالهٔ published با `featured=true`) |
| `intersection_topics` | حمل `highlights` JSONB |
| `faculty_members` / `alumni_stories` / `campaign_banners` / `testimonials` | مطابق تایپ‌های `src/lib/types` |
| `legal_pages` | PK = `slug`؛ `body` JSONB (string[]) |
| `site_stats` | مطابق `SiteStat` |
| `registration_leads` | برای فاز G؛ `course_id` FK به `courses` (ON DELETE SET NULL)؛ `status` CHECK |
| `admin_users` / `admin_sessions` | برای فاز E؛ `password_hash` (هرگز plaintext)؛ session با `token_hash` |

حالتی که `published` دارد: همهٔ جدول‌های محتوا (`courses`, `programs`, `events`, `articles` و تیبل‌های site).

## ایندکس‌های تکمیلی (فاز H — 2026-09-24)

- Migration: `db/migrations/002_indexes.sql` (اجرا یک‌بار؛ در `schema_migrations` ثبت شده).
- `idx_registration_leads_created_at` روی `registration_leads (created_at DESC)` — لیست ادمین.
- `idx_articles_published_at` روی `articles (published, published_at DESC)` — لیست بینش‌ها.
- `idx_events_start` روی `events (published, start_date)`.
- `idx_programs_title` / `idx_courses_title` روی `(published, title)`.
- `courses.slug`, `programs.slug`, `intersection_topics.slug` از 001 UNIQUE هستند و ایندکس جزئی `articles_one_featured` از 001 موجود است — تکرار نشده‌اند.

## Admin (فاز E — 2026-09-22)

- مکانیزم: `admin_users` (رمز با scrypt در `password_hash`، هرگز plaintext) + `admin_sessions` (توکن تصادفی؛ `token_hash` در DB ذخیره می‌شود؛ cookie فقط `admin_session` HttpOnly/SameSite=Lax).
- محافظت: `src/proxy.ts` (Next 16؛ جانشین middleware) فقط حضور cookie را چک و به `/admin/login` ریدایرکت می‌کند؛ تأیید واقعی session در layout-گارد `src/app/admin/(guard)/layout.tsx` با `verifySession()` از `src/lib/auth/admin.ts` انجام می‌شود.
- صفحات ادمین داخل گروه `(guard)` قرار می‌گیرند؛ صفحهٔ لاگین در `src/app/admin/login/` بیرونِ گارد است.

کاربر seed اولیه (فقط محیط تست):

```bash
node scripts/seed-admin.mjs
# → admin@aut.ac.ir / admin123
```

> رمز در production باید چرخانده و از docs حذف شود (امنیت بعدی — بخش ۱۰ پلن).
