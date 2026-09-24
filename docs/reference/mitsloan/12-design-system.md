# Design System — استخراج از MIT Sloan

> منبع: [https://mitsloan.mit.edu](https://mitsloan.mit.edu) · تم Drupal `mitsloan`  
> نسخهٔ فارسی RTL برای آموزش آزاد امیرکبیر · تاریخ: 2026-09-22

## پالت

| نقش | مقدار | منبع Sloan |
|---|---|---|
| Accent / crimson | `#a31f34` | `rgb(163, 31, 52)` — ماه/روز رویداد، هاور لینک، CTA |
| Ink | `#272727` | `rgb(39, 39, 39)` — متن اصلی |
| Black | `#000000` | هیرو گرادیان، هدر تیره، Hire CTA |
| Gray border | `#b1b1b1` | جداکننده‌ها |
| Navy tint | `#0f3f82` @ 5% | پس‌زمینهٔ بلوک «More than a degree» |
| Sky | `#aaccee` | اکسنت ثانویه |

## تایپوگرافی (نگاشت)

| Sloan | نقش | AUT (فارسی) |
|---|---|---|
| Futura LT Heavy | عناوین UI، H1–H4، لیبل | Vazirmatn ExtraBold (800) |
| Futura LT Medium | لیبل‌های کوچک، CTA | Vazirmatn Medium (500) |
| Adelle Regular | بدنهٔ توضیحی | Vazirmatn Regular |

الگوها: `.ds-label` (uppercase + tracking)، `.ds-h-section`، `.ds-h-display`، `.ds-title-link` (خط قرمز زیر تیتر)

## کامپوننت‌های امضا

1. **Dot CTA** (`.ds-cta`) — دکمهٔ bordered با سایهٔ نقطه‌ای offset؛ هاور → سایه قرمز می‌شود  
2. **Hero rail** (`.ds-hero-rail`) — خط عمودی سفید + نشان پایین (به‌جای dome MIT)  
3. **Hero gradients** — گرادیان بالا + گرادیان مورب از لبهٔ شروع (RTL)  
4. **Event date** — ماه/روز به رنگ accent، بدون جعبه تیره  
5. **Nav square buttons** (`.ds-nav-btn`) — ۴۵×۴۵، border ink، هاور پر از accent  

## ساختار هوم (ترتیب اجباری)

1. Campaign banners  
2. Hero featured idea (`home--header`)  
3. Ideas multi-up  
4. Upcoming Events (`featured_calendar`)  
5. Intersections photo-grid  
6. More than a degree (highlights carousel)  
7. Hire talent (black band)  
8. Mission  
9. Find Us + Footer links/social  

**Program Selector داخل صفحهٔ هوم نیست** — در overlay دکمهٔ «آکادمیک» است (مثل Sloan Academics).

## هدر

- نوار utility: دانشگاه مادر · تماس  
- ردیف اصلی (RTL از راست): لوگو → لینک‌های سطح ۱ → دکمهٔ آکادمیک → (فضا) → جستجو / منوی موبایل  
  فاصلهٔ حروف (`letter-spacing`) روی متن فارسی اعمال نشود. 
- منوی موبایل + overlay برنامه‌ها  

## فایل‌های پیاده‌سازی

- توکن/utility: `src/app/globals.css`  
- CTA: `src/components/atoms/DotCta.tsx`  
- Overlay: `src/components/organisms/AcademicsOverlay.tsx`  
- هوم: `src/components/templates/HomeTemplate.tsx`
