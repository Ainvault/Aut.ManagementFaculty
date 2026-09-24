# سند بازسازی (Reconstruction Spec) — دو سایت مرجع MIT

این سند به‌گونه‌ای نوشته شده که هر بخشش به‌تنهایی قابل تبدیل به یک **پرامپت واحد** برای ابزارهای تولید صفحه (Claude/Cursor/v0/Lovable و مشابه) باشد. هر صفحه شامل: نقشه‌ی اطلاعات (IA)، مشخصات هر بخش (layout, content, interaction)، و در پایان یک **Master Prompt** آماده‌ی کپی‌پیست است.

> توجه: محتوای متنی اصلیِ منابع به‌صورت خلاصه/بازنویسی‌شده آمده (نه کپی کلمه‌به‌کلمه) و جزئیات بصری دقیق (فونت/رنگ/فاصله‌ها) در فچ صفحه در دسترس نبود؛ جاهایی که باید حدس منطقی بر اساس نوع سایت زده بشه با علامت 🔶 مشخص شده تا خودت موقع اجرا تنظیمش کنی.

---

## بخش ۱ — MIT Professional Education (Landing Page)
منبع: `professionalprograms.mit.edu` (نسخه‌ی چندزبانه WPML، پشت لینک تبلیغاتی Google Ads)

### ۱.۱ نوع صفحه و هدف
لندینگ صفحه‌ی برندینگ/لیدجنریشن برای دوره‌های آموزش مستمر MIT، اجراشده توسط پارتنر اجرایی (Global Alumni). هدف: معرفی برند → اعتمادسازی (تاریخچه + نقل‌قول) → هدایت به کاتالوگ دوره‌ها.

### ۱.۲ Design Tokens (پیشنهادی 🔶)
- پالت: سرمه‌ای/خاکستری تیره MIT (#8A8B8C خاکستری، قرمز MIT #A31F34 به‌عنوان accent) روی زمینه‌ی سفید
- تایپوگرافی: فونت Serif برای تیترها (حس آکادمیک)، Sans-serif برای بدنه
- Layout: کاملاً ریسپانسیو، حداکثر عرض کانتینر ۱۲۰۰px، grid ۱۲ ستونه

### ۱.۳ ساختار Header
```
[Logo SVG سفید] -- [Home] [Online Training ▾] [Digital Experience ▾] [LIVE] [DPP News ▾] [About us ▾] [Contact DPP] -- [EN|ES|FR|PT] [🔍]
```
- Mega-menu زیر «Online Training» با ۳ ستون:
  - Professional Certificates (۹ آیتم لیست)
  - Online Courses (۲۷ آیتم، اسکرول داخلی)
  - Corporate Training Programs (۲ آیتم)
- در حالت موبایل: hamburger → همان درخت منو به‌صورت accordion عمودی
- رفتار: sticky روی اسکرول، پس‌زمینه‌ی تیره با لوگوی سفید

### ۱.۴ Hero Section
| ویژگی | مقدار |
|---|---|
| Layout | متن تمام‌عرض، بدون تصویر پس‌زمینه پیچیده، پس‌زمینه‌ی تیره/برند |
| H1 | «دروازه‌ای به دانش و تخصص MIT برای متخصصان سراسر جهان» |
| Subhead | یک جمله درباره‌ی ارائه‌ی دوره‌های تخصصی توسط اساتید MIT |
| Body | ۳ جمله: مخاطب (متخصصان علوم/مهندسی/فناوری)، فرمت Digital Plus، مدرک/CEU |
| CTA اصلی | دکمه «مشاهده‌ی دوره‌ها» → لینک به صفحه‌ی کاتالوگ (UTM‌دار) |

### ۱.۵ Mission Section
- H2 + ۳ پاراگراف (مأموریت / شیوه‌ی تدریس / جایگاه سازمانی)
- یک جمله‌ی bold برجسته وسط متن
- **Testimonial block**: نقل‌قول ۴ پاراگرافی از مدیر اجرایی برنامه + نام/سمت زیر آن (بدون عکس)

### ۱.۶ History Section
- H2 + روایت تاریخی کوتاه (۲ پاراگراف با چند تاریخ کلیدی)
- نقل‌قول دوم کوتاه‌تر از نفر دوم (مدیر برنامه‌های جهانی) + نام/سمت
- لینک خروجی به دامنه‌ی اصلی برنامه‌ها

### ۱.۷ Secondary Brand Banner
- لوگوی رنگی وسط‌چین + تگ‌لاین یک‌خطی + دکمه‌ی متنی «بیشتر بدانید»

### ۱.۸ Footer (۶ ستونه + بلوک تماس)
```
[Online Training]  [Digital Experience]  [Live/News]  [Contact]  [About Us]  [Legal]
                لوگو سفید + کپی‌رایت
      بلوک تماس با پارتنر اجرایی: تلفن + ایمیل advisor + لوگوی پارتنر
```

### ۱.۹ Master Prompt — بخش ۱ (کپی‌پیست آماده)
```
یک صفحه‌ی لندینگ تک‌صفحه‌ای بساز برای یک برند آموزش حرفه‌ای دانشگاهی، با این ساختار دقیق:

HEADER: هدر sticky با پس‌زمینه‌ی تیره سرمه‌ای و لوگوی سفید سمت چپ. منوی افقی شامل Home،
یک آیتم "Online Training" با mega-menu سه‌ستونه (Professional Certificates / Online Courses
با لیست بلند اسکرول‌شونده / Corporate Programs)، آیتم‌های Digital Experience و About us هرکدام
با dropdown، لینک LIVE و Contact ساده. سمت راست هدر: سوییچر ۴ زبانه و آیکون جستجو.

HERO: پس‌زمینه تیره تمام‌عرض، H1 بزرگ درباره دروازه‌ی دانش دانشگاهی برای متخصصان جهان،
زیرتیتر یک‌خطی، پاراگراف ۳ جمله‌ای، دکمه CTA اصلی به رنگ قرمز آجری.

SECTION 2 (Mission): پس‌زمینه سفید، H2 + سه پاراگراف، یک جمله bold وسط‌چین برجسته،
و یک بلوک نقل‌قول بزرگ ایتالیک با نام و سمت گوینده زیرش (بدون عکس).

SECTION 3 (History): روایت دو پاراگرافی با چند سال کلیدی به‌صورت timeline-like، نقل‌قول دوم
کوتاه‌تر با نام/سمت دیگر.

SECTION 4 (Brand banner): نوار باریک وسط‌چین با لوگوی رنگی و یک دکمه متنی.

FOOTER: شش ستون لینک (Training / Digital Experience / Live-News / Contact / About / Legal)،
لوگوی سفید و کپی‌رایت، به‌علاوه یک بلوک جدا برای اطلاعات تماس پارتنر اجرایی (تلفن + ایمیل).

پالت: سرمه‌ای تیره + سفید + قرمز آجری به‌عنوان accent. فونت تیترها serif آکادمیک، بدنه sans-serif.
ریسپانسیو کامل، منوی موبایل accordion. از React + Tailwind استفاده کن.
```

---

## بخش ۲ — MIT Sloan (Homepage اصلی)
منبع: `mitsloan.mit.edu`

### ۲.۱ نوع صفحه و هدف
سایت رسمی دانشکده‌ی مدیریت — ترکیبی از معرفی برنامه‌های تحصیلی (انتخاب‌گر تعاملی)، محتوای فکری (Ideas Made to Matter)، رویدادها، و برندینگ سازمانی.

### ۲.۲ Design Tokens (پیشنهادی 🔶)
- پالت: سفید/خاکستری روشن + قرمز MIT (#A31F34) به‌عنوان accent محدود (خطوط/دکمه‌ها)
- تایپوگرافی: Sans-serif مدرن، وزن سنگین برای تیترها
- Layout: full-bleed carousels، کارت‌های با تصویر بزرگ

### ۲.۳ ساختار Header
```
[Logo MIT Sloan] -- [Expert Insights] [Values] [Events] [Alumni] [Faculty] [About] [Executive Education] -- [Contact] [🔍] [social icons]
                                نوار بالای هدر: لینک به mit.edu (سایت مادر)
```
- دو نوار اطلاع‌رسانی کوچک بالای هیرو (campaign banners، قابل بستن)
- overlay جستجوی تمام‌صفحه با دکمه‌ی «Back to Menu»

### ۲.۴ Hero — Program Selector (تعاملی، مهم‌ترین بخش)
| ویژگی | مقدار |
|---|---|
| نوع کامپوننت | Carousel/Slider افقی با دکمه ناوبری بعدی/قبلی |
| H2 | «کدام برنامه برای تو مناسب است؟» |
| پس‌زمینه | تصویر کمپوس تمام‌عرض پشت کارت‌ها |
| آیتم‌های عادی | MBA، LGO (dual-degree)، Evening MBA، Master of Finance، Master of Business Analytics، PhD، Undergraduate، MSMS — هرکدام: نام لینک‌شده + یک جمله توضیح |
| زیربخش Executive Programs | برچسب جدا + EMBA، Sloan Fellows، System Design & Management، Executive Education، Visiting Fellows |
| CTA پایین بخش | «Explore Our Programs» |

### ۲.۵ Ideas Made to Matter
- عنوان بخش (لینک به آرشیو مقالات)
- ۱ مقاله‌ی Featured با تصویر بزرگ + تیتر
- ۳ کارت کوچک‌تر (تصویر بندانگشتی + برچسب دسته + تیتر)، چیدمان grid

### ۲.۶ Upcoming Events
- H2 «Upcoming Events»
- ردیف افقی کارت رویداد (کارت = تاریخ روی چپ + تیتر لینک‌شده + مکان)
- شامل رویدادهای آنلاین و حضوری، برخی بازه‌ی چند روزه (Oct 23 → Dec 11)
- CTA «See All Events»

### ۲.۷ MIT Sloan Intersections
- H2 + زیرتیتر یک‌خطی (تلاقی مدیریت و فناوری)
- ۴ کارت موضوعی تمام‌عرض تصویر با overlay متن (Future of Work / Entrepreneurship / AI / Climate Action)، هرکدام لینک به صفحه‌ی موضوعی

### ۲.۸ "More than a degree" — کاروسل دوم برنامه‌ها
- H2 + مقدمه کوتاه
- کاروسل افقی کارت (MBA / Evening MBA / EMBA / Sloan Fellows / Master of Business Analytics / Master of Finance) — هر کارت: تگ‌لاین کوتاه + نام برنامه لینک‌شده
- ناوبری با اسلش (۱ از ۶) + دکمه‌ی «Still searching? Keep exploring»

### ۲.۹ Hire Talent CTA Block
- H2 + یک پاراگراف کوتاه خطاب به کارفرمایان
- دکمه «Meet talent that transforms» → لینک به پورتال کاریابی دانشکده

### ۲.۱۰ Mission Statement
- H2 «The Mission» + یک جمله رسمی مأموریت، وسط‌چین، تایپوگرافی بزرگ

### ۲.۱۱ Find Us
- آدرس فیزیکی + لینک نقشه گوگل + شماره تلفن، به‌صورت بلوک ساده کنار فوتر

### ۲.۱۲ Footer
```
[Press] [Careers] [Accessibility] [Licensing] [Privacy]
              social icons (FB/X/YouTube/IG/LinkedIn)
                  © سال جاری — نام دانشکده
```

### ۲.۱۳ Master Prompt — بخش ۲ (کپی‌پیست آماده)
```
یک هوم‌پیج بساز برای یک دانشکده‌ی مدیریت دانشگاهی معتبر، با این ساختار دقیق:

HEADER: دو نوار — نوار بسیار باریک بالا با لینک به سایت مادر دانشگاه، و هدر اصلی با لوگو
سمت چپ، منوی افقی ساده (بدون mega-menu، فقط لینک‌های تکی: Insights, Values, Events,
Alumni, Faculty, About, Executive Education)، و سمت راست آیکون تماس/جستجو/شبکه‌های اجتماعی.
دو نوار تبلیغاتی باریک و قابل‌بستن زیر هدر.

HERO: یک کاروسل افقی تعاملی با عنوان "کدام برنامه برای تو مناسب است؟" روی پس‌زمینه‌ی
عکس کمپوس. کارت‌های برنامه در دو گروه — برنامه‌های معمول و بخش جدا "Executive Programs" —
هرکدام نام + یک جمله توضیح، با ناوبری اسلایدری.

SECTION 2 (Ideas/Insights): یک مقاله بزرگ Featured + سه کارت کوچک‌تر در grid، همه با
تصویر واقعی و برچسب دسته‌بندی.

SECTION 3 (Events): ردیف افقی کارت رویداد با تاریخ برجسته سمت چپ هر کارت.

SECTION 4 (Intersections): چهار کارت تمام‌تصویر با overlay متن روی موضوعات کلان
(آینده کار، کارآفرینی، هوش مصنوعی، اقدام اقلیمی).

SECTION 5 (کاروسل دوم برنامه‌ها): شبیه هیرو ولی جمع‌وجورتر، با تگ‌لاین کوتاه هر برنامه.

SECTION 6 (CTA کارفرمایان) + SECTION 7 (Mission statement تک‌جمله‌ای بزرگ وسط‌چین)
+ بلوک آدرس/تلفن.

FOOTER: نوار باریک لینک‌های حقوقی/سازمانی + آیکون شبکه‌های اجتماعی + کپی‌رایت.

پالت: سفید/خاکستری روشن با قرمز آجری تیره به‌عنوان accent محدود. تایپوگرافی sans-serif
مدرن و سنگین برای تیترها. تصاویر واقعی و باکیفیت در همه بخش‌ها. از React + Tailwind استفاده کن.
```

---

## بخش ۳ — دستورعمل فنی، پکیج‌ها و زبان‌های موردنیاز

### ۳.۱ Stack پیشنهادی
| لایه | انتخاب | دلیل |
|---|---|---|
| زبان | TypeScript | type-safety برای کامپوننت‌های تکرارشونده (کارت، منو) |
| فریم‌ورک | Next.js 14+ (App Router) | هر دو صفحه چندبخشی‌اند و SEO/متادیتا لازم دارن؛ اگر فقط یک صفحه‌ی استاتیک ساده می‌خوای، Vite + React هم کافیه |
| استایل | Tailwind CSS | مطابقت مستقیم با توضیفات layout بالا (grid، spacing، responsive) |
| کامپوننت‌های UI پایه | shadcn/ui (Button, NavigationMenu, Accordion برای mega-menu موبایل) | سرعت پیاده‌سازی هدر پیچیده‌ی چندسطحی |
| آیکون | lucide-react | آیکون جستجو، هامبرگر، شبکه‌های اجتماعی |
| انیمیشن/ترنزیشن | framer-motion (اختیاری) | باز/بسته‌شدن mega-menu و overlay جستجو |

### ۳.۲ پکیج‌های اختصاصی هر بخش
**هدر و مگامنو (بخش ۱، صفحه‌ی MIT Professional Education):**
- `@radix-ui/react-navigation-menu` یا `shadcn/ui NavigationMenu` — برای dropdown سه‌ستونه با اسکرول داخلی لیست ۲۷آیتمی
- `@radix-ui/react-accordion` — برای حالت موبایل (accordion عمودی)

**کاروسل‌ها (بخش ۲، صفحه‌ی MIT Sloan — هیرو + "More than a degree"):**
- `embla-carousel-react` (سبک، بدون jQuery، پرکاربردترین گزینه‌ی این نوع اسلایدر) — یا در صورت نیاز به افکت پیشرفته‌تر `swiper/react`

**سوییچر زبان (بخش ۱):**
- اگر i18n واقعی لازم نیست و فقط ظاهر سوییچر کافیه، نیازی به پکیج نیست؛ اگر چندزبانه‌ی واقعی می‌خوای: `next-intl`

**فرم‌های تماس/advisor (اگر بخوای تعاملی کنی):**
- `react-hook-form` + `zod` برای validation

### ۳.۳ ساختار پوشه‌ی پیشنهادی (Next.js App Router)
```
app/
  layout.tsx                # Header + Footer مشترک
  page.tsx                  # یکی از دو صفحه (یا [site]/page.tsx برای هر دو)
  globals.css                # tailwind base + رنگ‌های برند به‌صورت CSS variables
components/
  layout/
    Header.tsx
    MegaMenu.tsx             # فقط برای صفحه‌ی ۱
    NavSimple.tsx            # فقط برای صفحه‌ی ۲
    Footer.tsx
  sections/
    Hero.tsx
    ProgramCarousel.tsx      # صفحه‌ی ۲
    MissionSection.tsx       # صفحه‌ی ۱
    HistorySection.tsx       # صفحه‌ی ۱
    IdeasSection.tsx         # صفحه‌ی ۲
    EventsSection.tsx        # صفحه‌ی ۲
    IntersectionsSection.tsx # صفحه‌ی ۲
  ui/                        # کامپوننت‌های پایه‌ی shadcn (Button, Card, ...)
lib/
  content.ts                 # متن‌ها و لینک‌های هر بخش به‌صورت داده (نه هاردکد در JSX)
```

### ۳.۴ نصب سریع (خط فرمان)
```bash
npx create-next-app@latest mit-clone --typescript --tailwind --app
cd mit-clone
npx shadcn@latest init
npx shadcn@latest add button navigation-menu accordion card
npm install embla-carousel-react lucide-react
```

### ۳.۵ نکات پیاده‌سازی
- محتوای هر بخش (متن تیترها، لینک‌ها، آیتم‌های منو) رو در `lib/content.ts` به‌صورت آبجکت/آرایه نگه دار تا بازسازی/ویرایش بعدی راحت باشه (خودِ Master Promptهای بالا رو می‌تونی مستقیم بدی به AI تا این فایل content.ts رو هم تولید کنه).
- رنگ برند رو به‌صورت CSS variable در `globals.css` تعریف کن (`--brand-accent`, `--brand-dark`) تا بین دو صفحه قابل‌سواپ باشه.
- برای mega-menu صفحه‌ی ۱، حتماً روی موبایل تست کن — لیست ۲۷ آیتمی «Online Courses» باید اسکرول داخلی (`max-h-* overflow-y-auto`) داشته باشه وگرنه صفحه در موبایل می‌شکنه.
- هیچ Skill خاص Anthropic/Claude لازم نیست؛ این یک تسک استاندارد frontend-design هست — اگر از Claude Code یا محیطی با دسترسی به skill «frontend-design» استفاده می‌کنی، همون رو برای رعایت اصول طراحی (تایپوگرافی، فاصله‌گذاری، تضاد رنگ) صدا بزن، نه یک skill اختصاصی جدا.

---

## یادداشت پایانی برای استفاده
- هر «Master Prompt» به‌تنهایی برای تولید یک نسخه‌ی HTML/React از همان صفحه کافی است؛ اگر می‌خوای هر دو صفحه به‌صورت یک سایت چندصفحه‌ای با ناوبری مشترک دربیان، کافیه یک پاراگراف اضافه کنی که «این دو صفحه باید با یک Header/Footer مشترک به هم لینک بخورند».
- بخش‌های علامت‌خورده با 🔶 (رنگ دقیق، فونت دقیق، فاصله‌گذاری پیکسلی) در HTML رندرشده‌ی صفحه در دسترس نبود (CSS خارجی/کلاس‌های به‌هم‌ریخته)؛ اگر رنگ/فونت دقیق لازم داری، باید از DevTools مرورگر روی صفحه‌ی زنده inspect کنی.
