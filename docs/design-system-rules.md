# قواعد سیستم طراحی (Design System Rules)

**منبع حقیقت:** [shadcn/ui](https://ui.shadcn.com/docs/installation) + Tailwind + تم CSS در `src/app/globals.css`.
**Skill ایجنت:** `.agents/skills/shadcn-ui/SKILL.md` (و کپی `.claude/skills/shadcn-ui`).
**کامپوننت‌ها:** فقط `src/components/ui/*` از طریق `npx shadcn@latest add <name>` (style: `base-nova`).
**آخرین مهاجرت:** 2026-09-22 — حذف کامل `ds-*` و `--brand-*`.

قبل از هر تغییر UI این فایل و skill `shadcn-ui` را بخوان.

---

## ۱. رنگ (توکن‌های shadcn)

| نقش | توکن | کاربرد |
|---|---|---|
| Primary (قرمز AUT) | `--primary` / `bg-primary` | CTA، لینک هاور |
| Accent (طلایی) | `--accent` / `bg-accent` | گوهٔ هیرو، هایلایت |
| Deep / navy | `--chart-3` / `--chart-2` | هیرو و باندهای تیره |
| Surface | `--background` / `--card` / `--muted` | صفحه، کارت، بخش ملایم |
| Text | `--foreground` / `--muted-foreground` | متن اصلی / ثانویه |
| Border | `--border` | جداکننده و Card ring |

**قانون:** هیچ `--brand-*` یا کلاس `ds-*` ننویس. رنگ فقط از utilityهای تم (`bg-primary`, `text-muted-foreground`, …).

---

## ۲. تایپوگرافی و فاصله

- فونت: Vazirmatn از layout → `font-sans`
- تیترها: `text-3xl font-bold` / `text-2xl font-bold` / `text-lg font-semibold` (یا `Heading` نازک)
- ظرف محتوا: `Container` (`max-w-7xl` + padding افقی) یا همان کلاس‌های Tailwind

---

## ۳. کامپوننت‌ها

| نیاز | استفاده |
|---|---|
| دکمه / CTA | `Button` (+ `render={<Link />}`) یا `DotCta` (wrapper روی Button) |
| کارت | `Card` / `CardHeader` / `CardTitle` / `CardContent` یا `SurfaceCard` |
| فرم | `Input` `Label` `Textarea` `Button` |
| جداکننده | `Separator` |
| منوی موبایل / پنل | `Sheet` |
| تب | `Tabs` |
| اسکلتون | `Skeleton` |
| نشان | `Badge` |

---

## ۴. چک‌لیست PR UI

- [ ] بدون `ds-*` و `--brand-*` در `src/`
- [ ] فقط توکن‌های تم shadcn + Tailwind
- [ ] RTL حفظ شده (`dir="rtl"`, `components.json` rtl: true)
- [ ] `npm run build` سبز
- [ ] بدون hex جدید در کامپوننت (به‌جز SVG stop که از `var(--accent)` استفاده کند)
