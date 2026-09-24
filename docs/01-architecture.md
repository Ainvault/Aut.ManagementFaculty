# Architecture

## Stack
| لایه | انتخاب | دلیل |
|---|---|---|
| زبان/فریمورک | TypeScript + Next.js App Router | SSR/RSC، SEO، Route Handlers |
| استایل | Tailwind CSS + CSS variables برند | layout سریع، توکن‌های قابل‌سواپ |
| UI پایه | shadcn/ui (atoms) | منو، accordion، button استاندارد |
| i18n | next-intl (فعلاً `fa`) | آمادگی چندزبانه؛ RTL |
| کاروسل | embla-carousel-react | سبک، بدون jQuery |
| آیکون | lucide-react | یکدست و درختی |
| داده | PostgreSQL + `pg` + `src/lib/data/*` (accessor واحد) | قرارداد پایدار؛ mock فقط برای seed/مرجع؛ جزئیات اتصال: `docs/03-database.md` |

## Project Structure
```
src/
  app/
    layout.tsx
    (main)/page.tsx            # هوم Sloan-like
    (main)/**                  # بقیهٔ صفحات عمومی
    professional/page.tsx
    admin/
      login/                   # بیرونِ گارد session
      (guard)/layout.tsx       # گارد session + shell ادمین
      (guard)/[entity]/        # لیست / new / [id]/edit — ده موجودیت
      (guard)/registrations/   # لیست + تغییر status لیدها
    api/
      admin/**                 # POST/PATCH/DELETE با requireAdmin()
      registrations/route.ts   # POST عمومی — ایجاد لید
      courses|programs|events|articles/   # GET عمومی
  components/
    atoms/ molecules/ organisms/ templates/ ui/   # vite دایرهٔ Atomic؛ admin/ زیر organisms
  lib/
    site-config.ts             # هویت/ناو استاتیک (نه محتوا)
    data/                      # accessors مشترک صفحات و API (فقط DB)
    db/  db.ts  mappers.ts     # کلاینت pg + row↔type
    admin/ entities.ts         # ثبتِ ده موجودیت (spec: fields/عرضه/list)
    auth/ admin.ts             # verifySession / createSession
    mock/                      # فقط seed/مرجع (db/seed.mjs)
    types/  seo/  validation/  api/
  proxy.ts                     # (Next 16) ریدایرکت /admin بدون cookie
  messages/fa.json
```

## Admin pattern (Phases D–H)
- Registry: `src/lib/admin/entities.ts` — ده موجودیت با `AdminEntitySpec` (fields، جدولها، `list`/`get`، `apiPath`، `idColumn`).
- صفحات نازک: `(guard)/[entity]` لیست، `[entity]/new` و `[entity]/[id]/edit` فرم — همه از `GenericTable` (سرور) / `GenericForm` (کلاینت؛ فقط `GenericFormSpec` سریال‌پذیر) / `GenericFilters` استفاده می‌کنند.
- Write APIها اعتبارسنجی با Zod (`src/lib/validation/admin.ts`)، `requireAdmin()` درون هر handler، و بعد از هر mutation `revalidateSite()` (== `revalidatePath("/", "layout")`) برای به‌روزرسانی صفحات ایستا.
- قواعد: بدون `any`؛ Base UI `Select` مقدار `string | null` دارد؛ فرم‌ها مقادیر را دوباره serialize می‌کنند (date→string و …).
- ثبت‌نام: `POST /api/registrations` (بدون session) → جدول `registration_leads`؛ در ادمین با فیلتر status/search.

## Architectural Decisions

### D1 — Next.js App Router + SSR/RSC
**تصمیم:** صفحات محتوایی Server Components؛ داده در سرور خوانده می‌شود.
**دلیل:** SEO، TTFB بهتر، HTML اولیه کامل برای crawler.
**Trade-off:** تعامل‌ها باید صریحاً Client باشند.

### D2 — Mock-first با قرارداد API
**تصمیم:** `lib/data/*` منبع واحد؛ Route Handlers و صفحات هر دو از آن استفاده می‌کنند.
**دلیل:** تعویض بعدی mock → DB بدون بازنویسی UI.
**Trade-off:** فعلاً persistence واقعی نیست.

### D3 — Atomic Design
**تصمیم:** atoms → molecules → organisms → templates → pages.
**دلیل:** اتومیک بودن، reuse، جلوگیری از سکشن‌های یک‌بارمصرف غول‌پیکر.
**Trade-off:** تعداد فایل بیشتر در ابتدای کار.

### D4 — SEO از روز اول
**تصمیم:** `generateMetadata`، Open Graph، JSON-LD Organization/Course، semantic landmarks.
**دلیل:** سایت ثبت‌نام محور باید قابل‌کشف باشد.
**Trade-off:** محتوای mock هم باید فیلدهای SEO داشته باشد.

### D5 — i18n فارسی RTL
**تصمیم:** next-intl با locale پیش‌فرض `fa` و `dir="rtl"`.
**دلیل:** مخاطب فعلی فارسی؛ ساختار آمادهٔ زبان بعدی.
**Trade-off:** فعلاً فقط یک فایل پیام.

### D6 — دو صفحه با معیار اصلی Sloan
**تصمیم:** `/` = Sloan IA؛ `/professional` = لندینگ برندینگ Professional.
**دلیل:** تأیید Discovery؛ آموزش آزاد هم نیاز به هوم غنی و هم لندینگ بازاریابی دارد.

## Design System
توکن‌ها و utilityهای `ds-*` در `src/app/globals.css`:
- برند: `--brand-dark/navy/ink/accent/sand/mist/gold/gold-deep` + elevation و ریتم (`--section-y`)
- سطح کارت: `.ds-card` / `.ds-card-dark` (+ molecule `SurfaceCard`)
- حرکت: `--ease-out`، `--duration-*`؛ کلاس‌های `ds-reveal` با احترام به `prefers-reduced-motion`
- سطح: `ds-media`، `ds-hero-veil` / `ds-hero-grid`
- تایپوگرافی: `ds-eyebrow`، `ds-rule`، Heading levels در atoms
- عملکرد: `ds-list-item` با `content-visibility`؛ جستجو با `useDeferredValue`

**مراجع ایجنت:**
- قواعد: `docs/design-system-rules.md`
- Audit: `docs/DESIGN_SYSTEM_AUDIT.md`
- هویت برند: `docs/reference/mitsloan/12-design-system.md`
- Skills: `design-system-rules`, `material-design`
- Cursor rules: `.cursor/rules/ui-architecture.mdc`, `.cursor/rules/design-bootstrap.mdc`

## Design Patterns / Idioms
- صفحات فقط template را صدا می‌زنند؛ منطق داده در `lib/data`
- Client Components فقط در مرز تعامل (`"use client"`)
- `next/dynamic` برای carousel/mega-menu سنگین
- import مستقیم — بدون barrel بی‌مورد (vercel-react-best-practices)
- تصاویر با `next/image` + alt فارسی؛ انیمیشن فقط transform/opacity

## Testing / Verification Method
1. `npm run dev` — بررسی بصری دسکتاپ/موبایل در مرورگر
2. `npm run build` — typecheck + موفقیت SSR
3. بررسی دستی: یک `h1`، RTL، لینک‌های داخلی، پاسخ JSON از `/api/courses`
