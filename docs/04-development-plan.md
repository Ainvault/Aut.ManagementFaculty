# Development Plan — آموزش آزاد امیرکبیر (ManagementWebsite)

> **هدف این فایل:** نقشهٔ اجرایی کامل برای ایجنت‌ها تا مرحله‌به‌مرحله کل بک‌اند، دیتابیس، ثبت‌نام، و پنل ادمین را پیاده کنند بدون حدس زدن معماری.
>
> **چگونه استفاده شود:** هر تسک ایجنت باید **فقط یک فاز یا یک زیرفاز** را انجام دهد. قبل از شروع: `PLAYBOOK.md` + این فایل + `docs/state/active-context.md` را بخوان. بعد از اتمام: `progress.md` و `active-context.md` را به‌روز کن.

---

## 0. وضعیت فعلی (Baseline — ۲۰۲۶-۰۹-۲۲)

| لایه | وضعیت |
|---|---|
| فرانت عمومی (صفحات محتوا) | آماده — mock + RSC |
| API عمومی | فقط **GET** روی `/api/courses\|programs\|events\|articles` |
| لایه داده | `src/lib/data/*` → `src/lib/mock/*` |
| PostgreSQL | متصل (تست) — **بدون جدول** — جزئیات: `docs/03-database.md` |
| کلاینت DB | `pg` + `src/lib/db.ts` + `.env.local` |
| Auth / Admin / CMS | وجود ندارد |
| ثبت‌نام | صفحهٔ UI «اعلام علاقه» — بدون persistence |
| پرداخت | خارج از دامنه تا اطلاع بعدی |

### قوانین تغییرناپذیر (برای همهٔ فازها)

1. صفحات فقط از `src/lib/data/*` داده بگیرند — نه مستقیم از `pg`، نه از mock در page.
2. UI فقط shadcn + Tailwind tokens (`docs/design-system-rules.md` + skill `shadcn-ui`).
3. صفحات نازک؛ UI سنگین در `components/molecules|organisms|templates`.
4. هر تصمیم معماری جدید → ردیف در `docs/log/decisions.md`.
5. امنیت فعلاً برای محیط تست اولویت پایین است؛ ولی **ساختار** auth/roles را درست بگذار تا بعداً سخت‌گیری ممکن باشد.
6. Incremental: یک زیرفاز در هر تسک ایجنت.

---

## 1. هدف نهایی (Definition of Done کلی)

وقتی این پلن تمام شد باید بتوان:

1. محتوای سایت (دوره، برنامه، رویداد، مقاله، سایت‌متا) را از PostgreSQL خواند.
2. از پنل ادمین همان محتوا را CRUD کرد (بدون ویرایش فایل mock).
3. فرم ثبت‌علاقه/ثبت‌نام را در DB ذخیره کرد و در ادمین دید.
4. API عمومی خواندنی پایدار بماند؛ قرارداد پاسخ `{ data }` / `{ error }` حفظ شود.
5. `npm run build` سبز بماند؛ اسکریپت تست DB پاس شود.

---

## 2. نقشهٔ فازها (خلاصه)

| فاز | نام | خروجی اصلی | وابستگی |
|---|---|---|---|
| **A** | Schema + Migrations | جداول PostgreSQL | اتصال موجود |
| **B** | Seed از mock | دادهٔ اولیه در DB | A |
| **C** | تعویض `lib/data` به DB | سایت عمومی از DB می‌خواند | B |
| **D** | API نوشتنی + Validation | POST/PATCH/DELETE امن‌شده برای ادمین | C |
| **E** | Auth سادهٔ ادمین | لاگین session/cookie برای `/admin` | D (یا موازی با D شروع) |
| **F** | پنل ادمین UI | CRUD محتوا روی همان بک‌اند | D + E |
| **G** | ثبت‌نام واقعی | ذخیرهٔ lead/registration + لیست در ادمین | C (UI) + D |
| **H** | سخت‌سازی و Polish | ایندکس، خطا، docs نهایی، حذف وابستگی mock | F + G |

ترتیب پیشنهادی اجرای ایجنت: **A → B → C → E → D → F → G → H**  
(Auth را قبل یا همزمان با write API بگذار تا endpointهای نوشتنی بدون محافظ نمانند.)

---

## 3. فاز A — Schema و Migrations

### هدف
تعریف schema مطابق `src/lib/types/index.ts` و `docs/02-domain-rules.md`.

### تصمیم پیشنهادی (در صورت تأیید ضمنی این پلن)
- SQL خام + اسکریپت migration ساده با `pg` (بدون Prisma/Drizzle در فاز اول) تا سرعت بالا بماند.
- اگر بعداً ORM خواسته شد، در `decisions.md` ثبت و migrate شود — **در فاز A عوض نکن مگر کاربر بگوید.**

### جداول الزامی

#### A.1 `courses`
| ستون | نوع | توضیح |
|---|---|---|
| id | TEXT PK | مثل `crs-ai-mgmt` |
| slug | TEXT UNIQUE NOT NULL | |
| title | TEXT NOT NULL | |
| summary | TEXT NOT NULL | |
| category | TEXT NOT NULL | enum منطقی: leadership\|technology\|innovation\|energy\|design\|digital |
| duration_hours | INT NOT NULL | |
| format | TEXT NOT NULL | online\|blended\|in-person |
| registration_url | TEXT NOT NULL | |
| image_url | TEXT NOT NULL | |
| seo_description | TEXT NOT NULL | |
| created_at | TIMESTAMPTZ DEFAULT now() | |
| updated_at | TIMESTAMPTZ DEFAULT now() | |
| published | BOOLEAN DEFAULT true | برای ادمین (پیش‌نویس) |

#### A.2 `programs`
| ستون | نوع |
|---|---|
| id | TEXT PK |
| slug | TEXT UNIQUE NOT NULL |
| title | TEXT NOT NULL |
| blurb | TEXT NOT NULL |
| group_key | TEXT NOT NULL | `standard` \| `executive` (ستون را `group` نگذار — کلمهٔ رزرو SQL) |
| href | TEXT NOT NULL |
| tagline | TEXT NULL |
| audience | TEXT NOT NULL |
| duration_label | TEXT NOT NULL |
| format_label | TEXT NOT NULL |
| highlights | JSONB NOT NULL DEFAULT '[]' | string[] |
| body | TEXT NOT NULL |
| published | BOOLEAN DEFAULT true |
| created_at / updated_at | TIMESTAMPTZ |

#### A.3 `events`
| ستون | نوع |
|---|---|
| id | TEXT PK |
| title | TEXT NOT NULL |
| start_date | DATE NOT NULL |
| end_date | DATE NULL |
| location | TEXT NOT NULL |
| href | TEXT NOT NULL |
| summary | TEXT NOT NULL |
| published | BOOLEAN DEFAULT true |
| created_at / updated_at | TIMESTAMPTZ |

#### A.4 `articles`
| ستون | نوع |
|---|---|
| id | TEXT PK |
| title | TEXT NOT NULL |
| category | TEXT NOT NULL |
| excerpt | TEXT NOT NULL |
| image_url | TEXT NOT NULL |
| href | TEXT NOT NULL |
| featured | BOOLEAN NOT NULL DEFAULT false |
| body | TEXT NOT NULL |
| published_at | DATE NOT NULL |
| author | TEXT NOT NULL |
| published | BOOLEAN DEFAULT true |
| created_at / updated_at | TIMESTAMPTZ |

**قانون دامنه:** حداکثر یک `featured = true` بین مقالات published — با partial unique index یا enforce در لایهٔ write.

```sql
CREATE UNIQUE INDEX articles_one_featured
  ON articles ((featured))
  WHERE featured = true AND published = true;
```
(یا معادل منطقی با trigger / check در application layer اگر unique روی boolean مشکل‌ساز شد.)

#### A.5 محتوای سایت (site)

جداول جدا یا یک جدول key-value؛ پیشنهاد جدا برای وضوح ادمین:

- `intersection_topics` — مطابق `IntersectionTopic`
- `faculty_members` — مطابق `FacultyMember`
- `alumni_stories` — مطابق `AlumniStory`
- `campaign_banners` — مطابق `CampaignBanner`
- `legal_pages` — `slug` PK + `title` + `body` JSONB (string[])
- `site_stats` — مطابق `SiteStat` (برای professional)
- `testimonials` — مطابق `Testimonial`

#### A.6 ثبت‌نام / علاقه (برای فاز G؛ جدول را از همین الان بساز)

`registration_leads`
| ستون | نوع |
|---|---|
| id | UUID PK DEFAULT gen_random_uuid() |
| course_id | TEXT NULL REFERENCES courses(id) |
| course_slug | TEXT NULL |
| full_name | TEXT NOT NULL |
| email | TEXT NOT NULL |
| phone | TEXT NULL |
| message | TEXT NULL |
| source | TEXT DEFAULT 'register_page' |
| status | TEXT DEFAULT 'new' | new\|contacted\|enrolled\|rejected |
| created_at | TIMESTAMPTZ DEFAULT now() |

#### A.7 ادمین (برای فاز E)

`admin_users`
| ستون | نوع |
|---|---|
| id | UUID PK |
| email | TEXT UNIQUE NOT NULL |
| password_hash | TEXT NOT NULL | حتی در تست hash کن (bcrypt/argon) |
| name | TEXT NOT NULL |
| role | TEXT DEFAULT 'admin' | فعلاً فقط admin |
| created_at | TIMESTAMPTZ |

`admin_sessions` (اختیاری اگر cookie session ساده)
| id | token_hash | user_id | expires_at | created_at |

### فایل‌های پیشنهادی فاز A

```
db/
  migrations/
    001_init.sql
  migrate.mjs          # اجرا روی DATABASE_URL
scripts/
  test-db-connection.mjs  # موجود
```

### Acceptance Criteria — A
- [ ] همهٔ جداول بالا در DB ساخته شده‌اند
- [ ] `node db/migrate.mjs` قابل تکرار است (idempotent یا نسخهٔ migration)
- [ ] `docs/03-database.md` بخش schema به‌روز شده
- [ ] ردیف تصمیم در `docs/log/decisions.md` (D13 — schema SQL)

### دستور پیشنهادی به ایجنت
> فاز A پلن `docs/04-development-plan.md` را اجرا کن: فقط migrations و اسکریپت migrate. seed نکن. UI را تغییر نده.

---

## 4. فاز B — Seed از mock

### هدف
محتوای فعلی `src/lib/mock/*` را یک‌بار وارد DB کن.

### فایل‌ها
```
db/seed.mjs
src/lib/mock/courses.ts
src/lib/mock/programs.ts
src/lib/mock/events.ts
src/lib/mock/articles.ts
src/lib/mock/site.ts
```

### قوانین
- Seed باید **قابل‌اجرای مجدد** با استراتژی upsert (`ON CONFLICT (id) DO UPDATE`) باشد.
- mapping camelCase (TypeScript) → snake_case (SQL) در یک ماژول مشترک `src/lib/db/mappers.ts`.
- بعد از seed، تعداد ردیف‌ها را log کن.

### Acceptance Criteria — B
- [ ] تعداد courses/programs/events/articles در DB با mock یکی است (یا بیشتر اگر published draft اضافه شد)
- [ ] حداقل یک article با `featured=true`
- [ ] اسکریپت: `node db/seed.mjs` بدون error

### دستور پیشنهادی به ایجنت
> فاز B: فقط seed از mock به PostgreSQL. `lib/data` را هنوز عوض نکن.

---

## 5. فاز C — تعویض `lib/data` به PostgreSQL

### هدف
سایت عمومی بدون تغییر ظاهری از DB بخواند.

### الگوی پیاده‌سازی (اجباری)

```
src/lib/data/courses.ts  → query از pool در src/lib/db.ts
src/lib/data/programs.ts
src/lib/data/events.ts
src/lib/data/articles.ts
src/lib/data/site.ts
```

- فقط ردیف‌های `published = true` برای سایت عمومی.
- API Route Handlers تغییری در قرارداد ندهند؛ چون از همان accessors استفاده می‌کنند.
- در صورت خطای DB: log کن و fail واضح (۵۰۰) — فعلاً fallback به mock **نکن** مگر کاربر بخواهد (اگر خواست در ambiguities ثبت شود).

### Mapper
هر ردیف SQL → تایپ موجود در `src/lib/types` بدون شکستن صفحه‌ها.

### Acceptance Criteria — C
- [ ] `getCourses()` و بقیه از DB می‌خوانند
- [ ] هوم، professional، programs، events، insights، faculty، alumni بدون تغییر UI کار می‌کنند
- [ ] `/api/courses` JSON درست برمی‌گرداند
- [ ] mock فقط برای seed/مرجع باقی می‌ماند؛ صفحه مستقیم import از mock ندارد
- [ ] `npm run build` OK

### دستور پیشنهادی به ایجنت
> فاز C: پیاده‌سازی `lib/data` روی PostgreSQL. فقط read. هیچ UI ادمین یا write API نساز.

---

## 6. فاز E — Auth سادهٔ ادمین (قبل از writeهای عمومی)

### هدف
محافظت از `/admin` و mutationها با session ساده.

### پیشنهاد تست (امنیت پایین، ساختار درست)
- لاگین با email/password در برابر `admin_users`
- Session cookie HttpOnly (مثلاً `admin_session`)
- Middleware یا layout guard روی `src/app/admin/**`
- یک کاربر seed اولیه در docs یا seed (رمز در `docs/03-database.md` بخش admin — محیط تست)

### فایل‌ها
```
src/lib/auth/admin.ts          # verifySession, login, logout
src/app/admin/login/page.tsx
src/app/api/admin/login/route.ts
src/app/api/admin/logout/route.ts
src/middleware.ts                # محافظت /admin (به‌جز /admin/login)
```

### Acceptance Criteria — E
- [ ] بدون session، `/admin` → redirect به login
- [ ] با session معتبر، دسترسی به داشبورد
- [ ] logout کار می‌کند
- [ ] رمز به‌صورت plaintext در DB ذخیره **نشود**

### دستور پیشنهادی به ایجنت
> فاز E پلن را اجرا کن: auth ادمین + صفحه login. CRUD محتوا نساز.

---

## 7. فاز D — API نوشتنی + Validation

### هدف
CRUD برای موجودیت‌های محتوا و لیدها؛ فقط برای ادمین authenticated.

### Routeهای پیشنهادی

```
POST   /api/admin/courses
PATCH  /api/admin/courses/[id]
DELETE /api/admin/courses/[id]

(همان الگو برای programs, events, articles, topics, faculty, alumni, banners, legal, stats, testimonials)

GET    /api/admin/registrations
PATCH  /api/admin/registrations/[id]   # تغییر status

POST   /api/registrations              # عمومی — ایجاد لید (فاز G؛ rate-limit بعدی)
```

### قوانین
- همهٔ `/api/admin/*` باید session ادمین را چک کنند (درون handler، نه فقط middleware).
- Validation با schema ساده (Zod پیشنهاد می‌شود — اگر اضافه شد در decisions ثبت کن).
- پاسخ خطا: `{ error: string }` + status مناسب (400/401/404/409/500).
- بعد از mutation موفق، نیازی به revalidate پیچیده در فاز اول نیست؛ در H می‌توان `revalidatePath` افزود.

### Acceptance Criteria — D
- [ ] CRUD course با curl/اسکریپت تست با session کار می‌کند
- [ ] بدون auth → 401
- [ ] قانون featured article enforce می‌شود

### دستور پیشنهادی به ایجنت
> فاز D: write APIهای admin برای courses و articles اول؛ بعد بقیهٔ entityها در تسک جدا. UI ادمین نساز.

---

## 8. فاز F — پنل ادمین UI

### هدف
ادمین بتواند محتوا را مدیریت کند روی **همان** Next.js app و همان PostgreSQL.

### ساختار مسیر

```
src/app/admin/
  layout.tsx              # shell ادمین (ناو ساده)
  page.tsx                # داشبورد خلاصه (تعدادها + لیدهای جدید)
  login/page.tsx          # از فاز E
  courses/page.tsx
  courses/new/page.tsx
  courses/[id]/edit/page.tsx
  programs/...
  events/...
  articles/...
  registrations/page.tsx
  site/
    topics/...
    faculty/...
    alumni/...
    banners/...
    legal/...
```

### معماری UI
- صفحات ادمین = orchestration نازک
- فرم‌ها/جداول در `src/components/organisms/admin/*`
- فقط shadcn: `Table`, `Button`, `Input`, `Textarea`, `Select`, `Card`, `Dialog`, `Badge`
- RTL فارسی مثل سایت عمومی
- **بدون** تلاش برای کپی ظاهر Sloan در ادمین — UI کاربردی و خلوت

### قابلیت‌های MVP داشبورد
1. لیست + جستجوی ساده + فیلتر published
2. ایجاد / ویرایش / حذف (یا soft unpublish)
3. پیش‌نمایش لینک به صفحهٔ عمومی
4. لیست registration leads + تغییر status

### Acceptance Criteria — F
- [ ] ادمین می‌تواند یک course جدید بسازد و در سایت عمومی بعد از publish دیده شود
- [ ] مقاله featured قابل تنظیم است بدون شکستن قانون یکتایی
- [ ] registrations در UI دیده می‌شوند
- [ ] موبایل قابل‌استفاده (جدول اسکرول افقی OK)

### دستور پیشنهادی به ایجنت
> فاز F زیرفاز courses: لیست/ایجاد/ویرایش course در `/admin`. بقیهٔ entityها را جداگانه بپرس.

---

## 9. فاز G — ثبت‌نام واقعی (Lead capture)

### وضعیت فعلی
`/register/[slug]` فرم اعلام علاقه دارد (`ContactInterestForm`) ولی persistence ندارد.

### کارها
1. Server Action یا `POST /api/registrations` که در `registration_leads` بنویسد.
2. validation: نام، ایمیل الزامی؛ تلفن اختیاری.
3. پیام موفقیت در UI.
4. در ادمین: لیست + فیلتر status + جزئیات.
5. فعلاً **بدون پرداخت** و بدون ایمیل SMTP مگر کاربر بخواهد (اختیاری فاز H+).

### Acceptance Criteria — G
- [ ] submit فرم → ردیف در DB
- [ ] course_slug/course_id درست ذخیره شود
- [ ] در `/admin/registrations` دیده شود
- [ ] خطاهای validation به کاربر فارسی نشان داده شود

### دستور پیشنهادی به ایجنت
> فاز G: persistence فرم ثبت علاقه + لیست در ادمین. پرداخت نساز.

---

## 10. فاز H — سخت‌سازی و بستن مرحله

> **وضعیت: کامل (2026-09-24)** — موردهای (اختیاری) عمداً عقب‌افتاده.

### چک‌لیست
- [x] ایندکس‌ها: `courses(slug)`, `programs(slug)`, `articles(featured)`, `registration_leads(created_at DESC)` — (slugها و featured از 001؛ `002_indexes.sql` بقیه را اضافه کرد: leads/articles/events/programs/courses)
- [x] `revalidatePath` / `revalidateTag` بعد از mutation ادمین — `revalidateSite()` در `src/lib/api/revalidate.ts` + همهٔ DELETE handlers
- [x] حذف importهای مردهٔ mock از runtime (seed می‌تواند mock را نگه دارد) — فقط `src/lib/site-config.ts` برای هویت استاتیک
- [x] به‌روزرسانی `docs/00-brief.md` بخش Out of Scope (ادمین دیگر out نیست)
- [x] به‌روزرسانی `docs/01-architecture.md` (داده: PostgreSQL؛ ادمین در همان app)
- [x] `docs/03-database.md` کامل (جداول + نحوه migrate/seed + ایندکس ۰۰۲)
- [x] `README.md` دستورات dev/migrate/seed/admin
- [x] اسکریپت smoke: خواندن API + یک write ادمین ← `scripts/smoke.mjs`
- [ ] (اختیاری) rate limit ساده روی POST registrations — عقب‌افتاده
- [ ] (اختیاری) آپلود تصویر — فعلاً URL متنی کافی است

### امنیت بعدی (عمداً عقب‌افتاده — فقط یادداشت)
- چرخش رمز DB، حذف credential از docs در production
- HTTPS-only cookie، CSRF برای admin forms
- RBAC چندنقشی
- backup و migration در CI

---

## 11. قرارداد داده و نام‌گذاری (مرجع سریع ایجنت)

| TypeScript (`src/lib/types`) | SQL |
|---|---|
| `durationHours` | `duration_hours` |
| `imageUrl` | `image_url` |
| `seoDescription` | `seo_description` |
| `registrationUrl` | `registration_url` |
| `group` (Program) | `group_key` |
| `startDate` | `start_date` |
| `endDate` | `end_date` |
| `publishedAt` | `published_at` |

پاسخ API عمومی همچنان camelCase مطابق تایپ‌های فعلی.

---

## 12. ساختار فایل هدف (پس از تکمیل)

```
db/
  migrations/001_init.sql
  migrate.mjs
  seed.mjs
src/
  lib/
    db.ts
    db/mappers.ts
    auth/admin.ts
    data/*.ts          # فقط PostgreSQL
    mock/*.ts          # فقط برای seed/مرجع
  app/
    api/
      courses|programs|events|articles/   # GET عمومی
      registrations/route.ts              # POST عمومی
      admin/**                            # CRUD + auth
    admin/**                              # UI ادمین
    (main)/**                             # سایت عمومی
  components/organisms/admin/**
docs/
  03-database.md
  04-development-plan.md   # این فایل
```

---

## 13. ترتیب تسک‌های آمادهٔ کپی‌پیست برای ایجنت

هر خط = یک chat/task جدا:

1. `فاز A از docs/04-development-plan.md — فقط SQL migration + migrate.mjs`
2. `فاز B — seed از mock به PostgreSQL`
3. `فاز C — تعویض lib/data به خواندن از DB`
4. `فاز E — auth ادمین + login/logout + middleware`
5. `فاز D — write API ادمین برای courses و articles`
6. `فاز D ادامه — write API برای programs/events/site entities`
7. `فاز F — UI ادمین: داشبورد + CRUD courses`
8. `فاز F ادامه — CRUD articles/events/programs`
9. `فاز F ادامه — CRUD site (faculty/alumni/topics/banners/legal)`
10. `فاز G — persistence ثبت علاقه + صفحه registrations ادمین`
11. `فاز H — ایندکس، revalidate، docs، README، حذف وابستگی runtime به mock`

---

## 14. خارج از این پلن (عمداً نکن مگر کاربر بگوید)

- درگاه پرداخت / فاکتور
- ایمیل تایید SMTP
- i18n واقعی چندزبانه
- اپ موبایل جدا
- ORM اجباری (Prisma/Drizzle) — اختیاری بعداً
- جدا کردن admin به سرویس جدا (همان Monolith Next کافی است)
- آنالیتیکس پیشرفته

---

## 15. معیار توقف و سؤال از کاربر (طبق PLAYBOOK)

اگر ایجنت به این موارد رسید، **حدس نزند** — در `docs/log/ambiguities.md` ثبت و بپرسد:

- آیا حذف فیزیکی محتوا مجاز است یا فقط `published=false`؟
- آیا ثبت‌نام باید ظرفیت/مهلت داشته باشد؟
- آیا آپلود فایل تصویر لازم است یا URL کافی است؟
- آیا بیش از یک نقش ادمین لازم است؟
- آیا ORM می‌خواهید یا SQL/`pg` کافی است؟

---

## 16. ارجاعات

| سند | نقش |
|---|---|
| `PLAYBOOK.md` | رفتار ایجنت |
| `docs/00-brief.md` | هدف و دامنه |
| `docs/01-architecture.md` | معماری |
| `docs/02-domain-rules.md` | قوانین دامنه |
| `docs/03-database.md` | اتصال PostgreSQL |
| `docs/state/active-context.md` | کار فعلی |
| `docs/state/progress.md` | پیشرفت |
| `docs/design-system-rules.md` | UI |
| `.cursor/rules/ui-architecture.mdc` | لایهٔ کامپوننت |

---

**آخرین به‌روزرسانی پلن:** 2026-09-24  
**مرحلهٔ جاری برای شروع ایجنت:** ساختار کامل است — فازهای A تا H انجام شد؛ کار بعدی محتوای واقعی از پنل ادمین.
