# آموزش آزاد دانشگاه صنعتی امیرکبیر

سایت معرفی دوره‌ها و برنامه‌های آموزش آزاد — Next.js App Router، Atomic Design، SEO-ready، فارسی RTL، محتوا از PostgreSQL با پنل ادمین.

## پیش‌نیاز

- Node.js 20+
- PostgreSQL با `DATABASE_URL` برای اتصال.

## راه‌اندازی

```bash
npm install
cp .env.example .env.local   # اگر موجود نیست؛ DATABASE_URL را بگذار
```

## پایگاه داده

```bash
node db/migrate.mjs   # اعمال migration‌ها (نسبت به قبل)
node db/seed.mjs      # seed محتوای mock به DB (قابل تکرار، upsert)
node scripts/seed-admin.mjs   # کاربر ادمین اولیه → admin@aut.ac.ir / admin123
node scripts/test-db-connection.mjs  # تست اتصال → CONNECTION_OK
```

> محیط تست: credential در `docs/03-database.md`.

## اجرا

```bash
npm run dev        # http://localhost:3000
npm run build && npm start
```

- سایت عمومی: http://localhost:3000
- پنل ادمین: http://localhost:3000/admin (لاگین با کاربر seed شده)
- لندینگ حرفه‌ای: http://localhost:3000/professional

## اسکریپت smoke (پس از `npm start`)

```bash
SMOKE_ADMIN_EMAIL=admin@aut.ac.ir SMOKE_ADMIN_PASSWORD=admin123 node scripts/smoke.mjs
# خروجی SMOKE_OK
```

## API عمومی (قرارداد `{ data }`)

- `GET /api/courses` · `GET /api/courses/[id]`
- `GET /api/programs`
- `GET /api/events`
- `GET /api/articles`
- `POST /api/registrations` — ثبت علاقه (public)

## ساختار

- داده: `src/lib/data/*` (فقط DB) · مپرها: `src/lib/db/mappers.ts` · هویت استاتیک: `src/lib/site-config.ts`
- ادمین: registry در `src/lib/admin/entities.ts`؛ صفحات در `src/app/admin/(guard)/**`
- mock: فقط برای seed در `src/lib/mock/*` — runtime از آن import نمی‌کند

## مستندات ایجنت

شروع از `AGENTS.md` → `PLAYBOOK.md` → `docs/*`
- پلن و وضعیت: `docs/04-development-plan.md` · پیشرفت: `docs/state/progress.md`
- تصمیم‌ها: `docs/log/decisions.md` · دیتابیس: `docs/03-database.md`

## چک

```bash
npx tsc --noEmit
npm run lint
npm run build
```