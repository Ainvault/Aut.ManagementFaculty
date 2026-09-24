# Project Brief

<!-- این فایل به‌ندرت بعد از راه‌اندازی اولیه تغییر می‌کند. فقط اگر هدف/دامنهٔ پروژه واقعاً عوض شد ویرایش کن. -->

## Purpose
سایت رسمی **آموزش آزاد دانشگاه امیرکبیر** برای معرفی و بارگذاری اطلاعات دوره‌ها، با الگوی بصری/اطلاعاتی نزدیک به دانشکده‌های معتبر جهانی (معیار اصلی: MIT Sloan؛ مرجع دوم: MIT Professional Education). هدف تبدیل بازدیدکنندهٔ علاقه‌مند به ثبت‌نام‌کنندهٔ بالقوه است.

## Target Users
افرادی که می‌خواهند در دوره‌های آموزش آزاد ثبت‌نام کنند (متخصصان، مدیران، دانشجویان و علاقه‌مندان یادگیری مستمر).

## Problem Statement
اطلاعات دوره‌های آموزش آزاد باید در یک وب‌سایت حرفه‌ای، قابل‌کشف برای موتورهای جستجو، و با تجربهٔ کاربری جذاب ارائه شود تا مخاطب بتواند برنامه/دوره مناسب را پیدا کند و به مسیر ثبت‌نام هدایت شود. داده از PostgreSQL می‌آید؛ پنل ادمین همان اپ، محتوا را CRUD می‌کند.

## Key Constraints
- Next.js App Router + TypeScript + Tailwind + shadcn/ui
- SSR/RSC پیش‌فرض؛ Client Components فقط برای تعامل (carousel، mega-menu، جستجو)
- Atomic Design اجباری
- SEO-ready از روز اول (metadata، semantic HTML، JSON-LD)
- i18n با `next-intl`؛ فعلاً فقط فارسی RTL
- داده: PostgreSQL + `src/lib/data/*` (accessor واحد)؛ mock فقط برای seed/مرجع
- پنل ادمین در همان اپ Next.js (auth session ساده؛ شبیه UI ادمین نماید)
- هویت بصری امیرکبیر (سرمه‌ای + سفید + accent آجری) — نه کپی برند MIT

## Out of Scope
- پرداخت و اتصال درگاه
- ایمیل تایید SMTP
- i18n چندزبانهٔ واقعی (سوییچر ظاهری مجاز است)
- RBAC چندنقشی؛ آپلود فایل؛ آنالیتیکس، کپی متن کلمه‌به‌کلمهٔ MIT
- (جزئیات امنیت عقب‌افتاده: `docs/04-development-plan.md` بخش ۱۰)

## Core Features (خلاصه، جزئیات در 02-domain-rules.md)
- هوم‌پیج سبک Sloan (`/`) با انتخابگر برنامه، مقالات، رویدادها، تقاطع‌های موضوعی، آمار، CTA ثبت‌نام
- لندینگ برندینگ سبک Professional (`/professional`) با هیرو، فیلتر دسته، آمار، نظرات (داده از DB)
- API عمومی خواندنی: `courses` / `programs` / `events` / `articles` روی قرارداد `{ data }`
- `POST /api/registrations` — ذخیرهٔ لید در DB + مشاهده/مدیریت در پنل ادمین
- پنل ادمین در `/admin` — CRUD ده موجودیت (courses, programs, events, articles, topics, faculty, alumni, banners, legal, stats, testimonials) + لیست registration leads
