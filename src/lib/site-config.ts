// Static site identity/configuration (no DB table — these are constants,
// not content). Content that admins manage lives in DB via src/lib/data/site.ts
// and src/lib/data/admin/*. Runtime code must NOT import from src/lib/mock/*
// (that module is kept only as seed/reference data for db/seed.mjs).

import type { NavItem } from "@/lib/types";

export const siteName =
  "مرکز آموزش‌های آزاد دانشکده مدیریت، علم و فناوری دانشگاه صنعتی امیرکبیر";
export const siteShortName = "مرکز آموزش‌های آزاد";
export const siteFaculty = "دانشکده مدیریت، علم و فناوری";
export const siteUniversity = "دانشگاه صنعتی امیرکبیر";
export const siteMission =
  "آموزش مدیران برای تحول در صنعت؛ با تمرکز بر تصمیم‌گیری داده‌محور، کاربرد هوش مصنوعی و مدیریت تغییر برای بهبود عملکرد سازمان.";

export const siteAddress = {
  line: "تهران، خیابان حافظ، دانشگاه صنعتی امیرکبیر — دانشکده مدیریت، علم و فناوری",
  phone: "۰۲۱-۶۴۵۴۰۰۰۰",
  email: "mst@aut.ac.ir",
  mapUrl: "https://maps.google.com/?q=Amirkabir+University+of+Technology",
};

/** Main nav labels for Persian users */
export const homeNav: NavItem[] = [
  { label: "ارزش‌ها", href: "/values" },
  { label: "اساتید", href: "https://mst.aut.ac.ir/content/31094/شبکه-اساتید" },
  { label: "درباره ما", href: "/about" },
  { label: "دوره‌های کوتاه", href: "/professional" },
  { label: "دوره‌های صنعتی", href: "/professional" },
  { label: "دانشگاه امیرکبیر", href: "https://mst.aut.ac.ir/", prominent: true },
];

export const professionalNav: NavItem[] = [
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

export const aboutFocusAreas = [
  {
    title: "هوش مصنوعی و تحول سازمان",
    description:
      "دوره تخصصی دوروزه و کارگاه عملی AI Fluency؛ از آمادگی سازمان تا محصول، داده و تجربه عملی.",
  },
  {
    title: "برندینگ",
    description:
      "انسجام هویت، وعده و تجربه برند برای اعتماد مخاطب و تصمیم‌های جایگاه کسب‌وکار.",
  },
  {
    title: "برند و بازاریابی",
    description:
      "از شناخت مشتری و استراتژی بازار تا کمپین، سنجش اثربخشی و هماهنگی برند با فعالیت‌های بازار.",
  },
  {
    title: "هم‌اندیشی مدیریتی",
    description:
      "گفت‌وگوی یک‌به‌یک درباره مسئله واقعی سازمان برای روشن‌ترشدن فرض‌ها و گزینه‌های تصمیم.",
  },
];

export const valuesContent = {
  title: "یادگیری با مسئله‌های واقعی",
  intro:
    "در مرکز آموزش‌های آزاد دانشگاه صنعتی امیرکبیر، کاربرد آموزش در تصمیم‌های مدیریتی و عملکرد سازمان معیار مهمی برای کیفیت یادگیری است. بررسی مسائل صنعت و تبادل تجربه میان مدیران، مبنای رویکرد آموزشی ما هستند.",
  items: [
    {
      title: "دقت علمی",
      text: "استدلال‌ها باید به منابع معتبر و شواهد قابل بررسی متکی باشند. در تحلیل داده و استفاده از هوش مصنوعی، بررسی درستی خروجی بخشی از کار است.",
    },
    {
      title: "تمرین و کاربرد",
      text: "آموخته‌ها باید در تصمیم‌های مدیریتی کاربرد داشته باشند؛ مانند ارزیابی سرمایه‌گذاری در فناوری، بازطراحی یک فرایند یا برنامه‌ریزی برای اجرای تغییر.",
    },
    {
      title: "پرسش و گفت‌وگو",
      text: "پرسیدن، نقد ایده‌ها و شنیدن تجربه دیگران به یادگیری کمک می‌کند. ایده‌های خلاقانه با گفت‌وگو و آزمودن دقیق‌تر می‌شوند.",
    },
    {
      title: "ارزیابی نتیجه",
      text: "یک راه‌حل را با نتیجه آن می‌سنجیم: آیا کیفیت بهتر شده، زمان انجام کار کاهش یافته یا تصمیم دقیق‌تری گرفته شده است؟",
    },
  ],
};

export const courseCategories: { id: string; label: string }[] = [
  { id: "best", label: "پیشنهاد ویژه" },
  { id: "technology", label: "هوش مصنوعی و تحول سازمان" },
  { id: "digital", label: "برند و بازاریابی" },
  { id: "innovation", label: "برندینگ" },
  { id: "leadership", label: "هم‌اندیشی مدیریتی" },
  { id: "all", label: "همه برنامه‌ها" },
];
