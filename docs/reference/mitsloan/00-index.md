# مرجع MIT Sloan — فهرست صفحات و IA

> منبع زنده: [https://mitsloan.mit.edu](https://mitsloan.mit.edu)  
> تاریخ استخراج: 2026-09-22  
> هدف: بازسازی ساختاری برای سایت آموزش آزاد AUT (معیار اصلی UI/IA)

## محدوده این مستند

MIT Sloan صدها صفحهٔ برگ (مقاله، پروفایل استاد، رویداد تکی) دارد. در این پوشه:

1. **همهٔ هاب‌ها و صفحات سطح ۱–۲** ناوبری اصلی مشخص و جزئی‌نویسی شده‌اند.
2. **الگوی صفحات برگ** (article / event / faculty profile) توصیف شده تا در بازسازی تکرارپذیر باشد.
3. لینک‌های دامنه‌های خواهر (مثل `executive.mit.edu`, `lgo.mit.edu`, `sdm.mit.edu`) جدا علامت خورده‌اند.

## درخت ناوبری اصلی (Header)

| # | آیتم منو | URL مقصد | فایل جزئیات |
|---|---|---|---|
| 0 | Homepage | `/` | [01-homepage.md](./01-homepage.md) |
| 1 | Academics (mega) | زیرمنو برنامه‌ها | [02-programs.md](./02-programs.md) |
| 2 | Expert Insights | `/ideas-made-to-matter` | [03-ideas-made-to-matter.md](./03-ideas-made-to-matter.md) |
| 3 | Values | `/values/our-values` | [07-values.md](./07-values.md) |
| 4 | Events | `/events` | [04-events.md](./04-events.md) |
| 5 | Alumni | `/alumni` | [05-alumni.md](./05-alumni.md) |
| 6 | Faculty | `/faculty/faculty-directory` | [06-faculty.md](./06-faculty.md) |
| 7 | About | `/about/why-mit-sloan` | [08-about.md](./08-about.md) |
| 8 | Executive Education | `https://executive.mit.edu/` (دامنه جدا) | [09-executive-education.md](./09-executive-education.md) |
| 9 | Contact | `/about/staff-directory` | [08-about.md](./08-about.md) |

نوار بالا: لینک به `mit.edu` · جستجوی overlay · آیکون‌های اجتماعی.

## Academics — فهرست کامل برنامه‌ها

### Degree / Pre-experience

| برنامه | URL | دامنه |
|---|---|---|
| MBA | `/mba/explore-program` | mitsloan |
| Leaders for Global Operations | `https://lgo.mit.edu/` | **خارجی** |
| MBA Early (Deferred) | `/mba/deferred-admission` | mitsloan |
| MIT Sloan Evening MBA | `/mit-sloan-evening-mba` | mitsloan |
| Master of Finance | `/mfin/explore-program` | mitsloan |
| Master of Business Analytics | `/master-of-business-analytics/explore-program` | mitsloan |
| PhD | `/programs/phd/explore-program` | mitsloan |
| Undergraduate | `/programs/undergraduate/undergraduate-programs` | mitsloan |
| MSMS | `/msms/master-science-management-studies/explore-program` | mitsloan |

### Executive Programs

| برنامه | URL | دامنه |
|---|---|---|
| MIT Executive MBA | `/emba/program-details` | mitsloan |
| MIT Sloan Fellows MBA | `/mit-sloan-fellows-mba-program/explore-program` | mitsloan |
| System Design & Management | `https://sdm.mit.edu/` | **خارجی** |
| Executive Education | `https://executive.mit.edu/` | **خارجی** |
| Visiting Fellows | `/visiting-fellows` | mitsloan |

### Hub مقایسه برنامه‌ها

| صفحه | URL |
|---|---|
| Explore Our Programs | `/about/explore-our-programs` |

جزئیات: [02-programs.md](./02-programs.md)

## Intersections (موضوعات کلان از هوم)

| موضوع | URL | فایل |
|---|---|---|
| Artificial Intelligence | `/artificial-intelligence-mit-sloan` | [10-intersections.md](./10-intersections.md) |
| Future of Work | `/future-work-mit-sloan` | همان |
| Climate Action | `/climate-action` | همان |
| Entrepreneurship | `/entrepreneurship-MIT-Sloan` | همان |

## فوتر و صفحات حقوقی/سازمانی

| لینک | URL | فایل |
|---|---|---|
| Press | `/press/connect-faculty` | [11-utility-footer.md](./11-utility-footer.md) |
| Careers / Work at MIT Sloan | `/work-mit-sloan` | همان |
| Accessibility | (لینک فوتر؛ صفحه سیاست دسترسی) | همان |
| Licensing | `/licensing` | همان |
| Privacy | `/privacy` | همان |
| Find Us | آدرس روی هوم + نقشه | [01-homepage.md](./01-homepage.md) |

## الگوهای صفحات برگ (تکرارشونده)

| الگو | مسیر نمونه | ویژگی‌ها |
|---|---|---|
| مقاله Ideas | `/ideas-made-to-matter/{slug}` | H1 عنوان، تاریخ، نویسنده، بدنه، تگ دسته |
| رویداد | `/events/{YYYY-MM-DD}-{slug}` یا پورتال `applymitsloan.mit.edu` | تاریخ، مکان، توضیح، CTA ثبت |
| پروفایل استاد | از Faculty Directory | نام، سمت، حوزه تخصص، بیو |
| Staff directory | `/about/staff-directory` | فهرست searchable کارکنان |

## فایل‌های این پوشه

| فایل | محتوا |
|---|---|
| [00-index.md](./00-index.md) | این فهرست |
| [01-homepage.md](./01-homepage.md) | هوم — سکشن‌به‌سکشن |
| [02-programs.md](./02-programs.md) | Academics + همه برنامه‌ها + hub مقایسه |
| [03-ideas-made-to-matter.md](./03-ideas-made-to-matter.md) | آرشیو بینش‌ها |
| [04-events.md](./04-events.md) | تقویم رویدادها |
| [05-alumni.md](./05-alumni.md) | Alumni hub |
| [06-faculty.md](./06-faculty.md) | Faculty directory |
| [07-values.md](./07-values.md) | Values |
| [08-about.md](./08-about.md) | About + Contact/Staff |
| [09-executive-education.md](./09-executive-education.md) | دامنه executive.mit.edu |
| [10-intersections.md](./10-intersections.md) | ۴ موضوع کلان |
| [11-utility-footer.md](./11-utility-footer.md) | Press / Careers / Privacy / … |
| [12-design-system.md](./12-design-system.md) | پالت، تایپو، CTA، ساختار هوم از تم زنده Sloan |

## نکات بازسازی برای AUT

- معیار اصلی: ساختار هوم + Program Selector + Ideas/Events/Intersections.
- دامنه‌های خارجی MIT را در AUT به‌صورت مسیر داخلی یا لینک خارجی معادل نگه دارید (نه کپی برند).
- محتوای متنی اینجا **خلاصه/بازنویسی ساختاری** است؛ کپی کلمه‌به‌کلمه ممنوع (طبق brief پروژه).
