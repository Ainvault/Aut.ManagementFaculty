// Reference/seed data (Phase B) — db/seed.mjs reads this module to populate
// the DB. Runtime code must NOT import from here; use src/lib/site-config.ts
// (static identity/config) and src/lib/data/* (DB-backed content).

import type {
  AlumniStory,
  CampaignBanner,
  FacultyMember,
  IntersectionTopic,
  LegalPage,
  NavItem,
  SiteStat,
  Testimonial,
} from "@/lib/types";

export const siteName =
  "دانشکده مدیریت علم و فناوری دانشگاه صنعتی امیرکبیر";
export const siteShortName = "مدیریت علم و فناوری";
export const siteFaculty = "دانشکده مدیریت علم و فناوری";
export const siteUniversity = "دانشگاه صنعتی امیرکبیر";
export const siteMission =
  "توسعهٔ رهبران نوآور و اصول‌محور در تلاقی مدیریت، علم و فناوری؛ و تولید ایده‌هایی که عمل مدیریت را پیش می‌برند.";

export const siteAddress = {
  line: "تهران، خیابان حافظ، دانشگاه صنعتی امیرکبیر — دانشکده مدیریت علم و فناوری",
  phone: "۰۲۱-۶۴۵۴۰۰۰۰",
  email: "mst@aut.ac.ir",
  mapUrl: "https://maps.google.com/?q=Amirkabir+University+of+Technology",
};

/** Main nav labels for Persian users */
export const homeNav: NavItem[] = [
  { label: "مقالات", href: "/insights" },
  { label: "ارزش‌ها", href: "/values" },
  { label: "رویدادها", href: "/events" },
  { label: "دانش‌آموختگان", href: "/alumni" },
  { label: "اساتید", href: "/faculty" },
  { label: "درباره ما", href: "/about" },
  { label: "دوره‌های کوتاه", href: "/professional" },
];

export const professionalNav: NavItem[] = [
  { label: "صفحه اصلی", href: "/" },
  {
    label: "فهرست دوره‌ها",
    href: "/professional#programs",
    children: [
      { label: "گواهی‌نامه‌ها", href: "/professional#certificates" },
      { label: "دوره‌های آنلاین", href: "/professional#courses" },
      { label: "دوره‌های سازمانی", href: "/professional#corporate" },
    ],
  },
  { label: "نحوه یادگیری", href: "/professional#digital" },
  { label: "درباره ما", href: "/about" },
  { label: "تماس با ما", href: "/contact" },
];

export const intersections: IntersectionTopic[] = [
  {
    id: "int-work",
    slug: "future-of-work",
    title: "آینده کار",
    description: "مهارت، نقش‌ها و سازمان در عصر فناوری.",
    href: "/topics/future-of-work",
    imageUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=80",
    body: "آینده کار در تلاقی فناوری، مهارت و طراحی شغل شکل می‌گیرد. دانشکده مدیریت علم و فناوری مدیران را برای بازطراحی نقش‌ها، هم‌زیستی انسان و هوش مصنوعی، و ساخت سازمان یادگیرنده آماده می‌کند.",
    highlights: [
      "بازطراحی نقش‌ها در عصر هوش مصنوعی",
      "مهارت‌آموزی مستمر نیروی کار",
      "حکمرانی داده و اخلاق فناوری",
    ],
  },
  {
    id: "int-startup",
    slug: "entrepreneurship",
    title: "کارآفرینی",
    description: "مسیر تبدیل ایده به کسب‌وکار با پشتیبانی دانشگاه.",
    href: "/topics/entrepreneurship",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&q=80",
    body: "کارآفرینی در امیرکبیر یعنی ترکیب نگاه مدیریتی دقیق با نوآوری. از ایده تا بازار، دوره‌ها و کارگاه‌ها مسیر ساخت محصول و تیم را پوشش می‌دهند.",
    highlights: [
      "روش‌های ساخت استارتاپ منظم",
      "شبکه منتور و سرمایه‌گذار",
      "پروژه‌های واقعی تیمی",
    ],
  },
  {
    id: "int-ai",
    slug: "ai",
    title: "هوش مصنوعی",
    description: "کاربرد هوش مصنوعی در تصمیم و محصول سازمان.",
    href: "/topics/ai",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=80",
    body: "هوش مصنوعی فقط ابزار فنی نیست؛ قابلیت استراتژیک سازمان است. دوره‌های ما مدیران را برای انتخاب مسئله، ارزیابی ریسک و اجرای مسئولانه آماده می‌کنند.",
    highlights: [
      "هوش مصنوعی برای تصمیم‌گیری مدیریتی",
      "هوش مصنوعی مولد در عملیات و محصول",
      "ریسک، حریم خصوصی و سوگیری",
    ],
  },
  {
    id: "int-climate",
    slug: "climate",
    title: "پایداری و انرژی",
    description: "استراتژی پایدار برای صنعت و سازمان.",
    href: "/topics/climate",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&q=80",
    body: "پایداری نیازمند نگاه سیستمی است. دانشکده مدیریت علم و فناوری استراتژی انرژی، اقتصاد چرخشی و سرمایه‌گذاری مسئولانه را برای رهبران صنعت ارائه می‌کند.",
    highlights: [
      "استراتژی پایداری سازمانی",
      "انرژی و اقتصاد چرخشی",
      "تصمیم‌گیری بلندمدت زیست‌محیطی",
    ],
  },
];

export const faculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "دکتر مریم احمدی",
    title: "استاد مدیریت عملیات",
    focus: "تحول دیجیتال و بهره‌وری",
    bio: "پژوهشگر طراحی سیستم‌های عملیاتی و مدرس دوره‌های مدیران اجرایی.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    id: "fac-2",
    name: "دکتر حسین رضایی",
    title: "استاد مالی",
    focus: "بازارها و سرمایه‌گذاری",
    bio: "تخصص در مدل‌های کمی مالی و مشاوره به نهادهای مالی.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    id: "fac-3",
    name: "دکتر نازنین کاظمی",
    title: "استاد استراتژی و نوآوری",
    focus: "نوآوری سازمانی",
    bio: "کار روی اکوسیستم‌های نوآوری و کارآفرینی فناوری‌محور.",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    id: "fac-4",
    name: "دکتر علی موسوی",
    title: "استاد سیستم‌های اطلاعاتی",
    focus: "هوش مصنوعی کاربردی",
    bio: "تدریس کاربرد هوش مصنوعی در تصمیم‌گیری و محصول دیجیتال.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    id: "fac-5",
    name: "دکتر سارا جلالی",
    title: "استاد منابع انسانی",
    focus: "آینده کار و مهارت",
    bio: "پژوهش درباره بازطراحی شغل و یادگیری سازمانی.",
    imageUrl:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80",
  },
  {
    id: "fac-6",
    name: "دکتر پیمان نوری",
    title: "استاد انرژی و پایداری",
    focus: "استراتژی پایداری و انرژی",
    bio: "تمرکز بر اقتصاد انرژی و تصمیم‌گیری پایدار.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

export const alumniStories: AlumniStory[] = [
  {
    id: "alu-1",
    title: "از کارشناس به رهبر تحول دیجیتال",
    excerpt:
      "با شرکت در دوره تحول دیجیتال، مسیر شغلی‌ام از اجرای پروژه به رهبری برنامه سازمانی تغییر کرد.",
    name: "کیان حسینی",
    program: "تحول دیجیتال سازمان",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    href: "/alumni#alu-1",
  },
  {
    id: "alu-2",
    title: "شبکه هم‌دوره‌ای که هنوز کار می‌کند",
    excerpt:
      "هم‌دوره‌ای‌های مدیریت عصرگاهی امروز شرکای حرفه‌ای من در سه صنعت مختلف هستند.",
    name: "مینا صالحی",
    program: "مدیریت عصرگاهی",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    href: "/alumni#alu-2",
  },
  {
    id: "alu-3",
    title: "راه‌اندازی استارتاپ انرژی پاک",
    excerpt:
      "کارگاه‌های کارآفرینی و پایداری نقطه شروع شرکت انرژی تجدیدپذیر ما بود.",
    name: "آرش یزدانی",
    program: "کارآفرینی و پایداری",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    href: "/alumni#alu-3",
  },
];

export const campaignBanners: CampaignBanner[] = [
  {
    id: "ban-1",
    version: "v1-fall-2026",
    text: "ثبت‌نام دوره‌های پاییز ۱۴۰۵ آغاز شد — برنامه مناسب خود را پیدا کنید.",
    href: "/programs",
    cta: "مشاهده برنامه‌ها",
  },
  {
    id: "ban-2",
    version: "v1-evening",
    text: "مدیریت عصرگاهی: استاندارد علمی، بدون توقف شغل.",
    href: "/programs/evening-management",
    cta: "جزئیات برنامه",
  },
];

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "حریم خصوصی",
    body: [
      "دانشکده مدیریت علم و فناوری دانشگاه صنعتی امیرکبیر به حریم خصوصی بازدیدکنندگان احترام می‌گذارد.",
      "اطلاعات تماس که از طریق فرم‌ها ارسال می‌کنید فقط برای پاسخ به درخواست شما استفاده می‌شود و فروخته نمی‌شود.",
      "برای پرسش درباره داده‌های شخصی با mst@aut.ac.ir تماس بگیرید.",
    ],
  },
  {
    slug: "accessibility",
    title: "دسترسی‌پذیری",
    body: [
      "ما تلاش می‌کنیم سایت برای همه کاربران، از جمله افراد دارای نیازهای دسترسی ویژه، قابل‌استفاده باشد.",
      "اگر در استفاده از صفحه مشکلی دارید، موضوع را به mst@aut.ac.ir اطلاع دهید تا پیگیری شود.",
    ],
  },
  {
    slug: "press",
    title: "رسانه و روابط عمومی",
    body: [
      "برای مصاحبه با مدرسان یا پوشش رویدادهای دانشکده با روابط عمومی هماهنگ کنید.",
      "ایمیل: mst@aut.ac.ir",
    ],
  },
  {
    slug: "careers",
    title: "همکاری با ما",
    body: [
      "دانشکده مدیریت علم و فناوری گاهی موقعیت همکاری آموزشی و اجرایی منتشر می‌کند.",
      "رزومه و معرفی کوتاه خود را به mst@aut.ac.ir ارسال کنید.",
    ],
  },
];

export const aboutFocusAreas = [
  {
    title: "هوش مصنوعی و اقتصاد دیجیتال",
    description: "کاربرد مسئولانه هوش مصنوعی در تصمیم و محصول.",
  },
  {
    title: "کارآفرینی",
    description: "از ایده تا بازار با پشتیبانی دانشگاه.",
  },
  {
    title: "آینده کار",
    description: "مهارت، نقش و سازمان در تحول فناورانه.",
  },
  {
    title: "پایداری و انرژی",
    description: "استراتژی پایدار برای رهبران صنعت.",
  },
];

export const valuesContent = {
  title: "ارزش‌های ما",
  intro:
    "در دانشکده مدیریت علم و فناوری باور داریم یادگیری جدی باید همراه احترام، گشودگی و کاربرد واقعی باشد.",
  items: [
    {
      title: "کیفیت علمی",
      text: "استاندارد دانشگاهی و محتوای به‌روز.",
    },
    {
      title: "احترام و گفتگو",
      text: "تنوع دیدگاه‌ها و فضای امن برای پرسش.",
    },
    {
      title: "شبکه حرفه‌ای",
      text: "ارتباطی که بعد از پایان دوره هم ادامه دارد.",
    },
    {
      title: "کاربرد عملی",
      text: "یادگیری برای حل مسئله واقعی سازمان.",
    },
  ],
};

export const stats: SiteStat[] = [
  { id: "st-1", value: "+۱۲٬۰۰۰", label: "شرکت‌کننده در دوره‌ها" },
  { id: "st-2", value: "+۳۰", label: "استان مبدأ شرکت‌کنندگان" },
  { id: "st-3", value: "۹۱٪", label: "رضایت از تجربه یادگیری" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote:
      "این دوره نه‌تنها ابزار حل مسئله داد، بلکه افق تصمیم‌گیری‌ام را گسترده‌تر کرد. امروز با اطمینان بیشتری محدوده پروژه‌ها را تعریف می‌کنم.",
    name: "سارا محمدی",
    role: "مدیر عملیات، صنعت انرژی",
    courseTitle: "انرژی و پایداری",
  },
  {
    id: "t-2",
    quote:
      "فضای دوره پویا بود و ارتباط با مدرسان آسان. نگاه تازه‌ای به فناوری‌های نو پیدا کردم.",
    name: "رضا کریمی",
    role: "مدیر فنی، صنعت غذایی",
    courseTitle: "استراتژی نوآوری",
  },
  {
    id: "t-3",
    quote:
      "هم‌نشینی با مدیران از صنایع مختلف، تجربه یادگیری را به یک شبکه حرفه‌ای واقعی تبدیل کرد.",
    name: "الهام نوری",
    role: "مدیر محصول، حوزه فین‌تک",
    courseTitle: "تحول دیجیتال سازمان",
  },
];

export const courseCategories: { id: string; label: string }[] = [
  { id: "best", label: "پیشنهاد ویژه" },
  { id: "leadership", label: "رهبری و ارتباطات" },
  { id: "energy", label: "انرژی و پایداری" },
  { id: "design", label: "طراحی و ساخت" },
  { id: "digital", label: "تحول دیجیتال" },
  { id: "technology", label: "فناوری" },
  { id: "innovation", label: "نوآوری" },
  { id: "all", label: "همه دوره‌ها" },
];
