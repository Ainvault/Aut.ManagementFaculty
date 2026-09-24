// Static site identity/configuration (no DB table — these are constants,
// not content). Content that admins manage lives in DB via src/lib/data/site.ts
// and src/lib/data/admin/*. Runtime code must NOT import from src/lib/mock/*
// (that module is kept only as seed/reference data for db/seed.mjs).

import type { NavItem } from "@/lib/types";

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