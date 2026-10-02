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

export const intersections: IntersectionTopic[] = [
  {
    id: "int-01",
    slug: "ai-organizational-transformation",
    title: "تحول سازمانی با هوش مصنوعی",
    description:
      "دوره تخصصی دوروزه؛ درک روشن از اینکه هوش مصنوعی کجا و چگونه به سازمان کمک می‌کند.",
    href: "/register/ai-organizational-transformation",
    imageUrl: "/images/courses/ai-organizational-transformation.png",
    body: "پنج محور: آمادگی و مدیریت تغییر (دکتر آغاز)، تحول با هوش مصنوعی (دکتر هراتی‌نیک)، چرخه عمر محصول AI (دکتر سلیمی‌نمین)، حاکمیت داده (دکتر روشنی)، و تجربه عملی AI Fluency با دستیاران صنعتی آموزشی (مهندس متین صفار و مهندس محمدحسین کشفی). مسیر از مسئله سازمانی تا ساخت و آزمون Prompt، chatbot و AI Agent.",
    highlights: [
      "دوره تخصصی دوروزه",
      "از مسئله سازمانی تا تشخیص کاربرد مناسب",
      "تجربه عملی AI Fluency",
    ],
  },
  {
    id: "int-02",
    slug: "branding",
    title: "برندینگ",
    description:
      "از هویت و جایگاه برند تا تجربه مخاطب، ارتباطات و ارزیابی ارزش برند.",
    href: "/register/branding",
    imageUrl: "/images/courses/branding.jpg",
    body: "کارگاه برندینگ رابطه میان هویت تعریف‌شده کسب‌وکار و تجربه‌ای که مخاطب دریافت می‌کند را بررسی می‌کند؛ همراه با مطالعه موردی و کار عملی. مدرس: دکتر علیرضا شیخ.",
    highlights: [
      "هویت، جایگاه و ارزش پیشنهادی",
      "تجربه و روایت برند",
      "سنجش ارزش برند",
    ],
  },
  {
    id: "int-03",
    slug: "marketing",
    title: "برند و بازاریابی",
    description:
      "از شناخت مشتری و استراتژی بازار تا کمپین، شاخص‌های عملکرد و کاربرد داده و AI.",
    href: "/register/marketing",
    imageUrl: "/images/courses/marketing.jpg",
    body: "کارگاه‌های مارکتینگ و برندینگ و مارکتینگ در عمل، مسیر تصمیم‌گیری بازار را از بینش مشتری تا اجرای کمپین و سنجش اثربخشی پوشش می‌دهند. مدرس: دکتر علیرضا شیخ.",
    highlights: [
      "شناخت مشتری و استراتژی بازاریابی",
      "کمپین و شاخص‌های عملکرد",
      "هماهنگی برند و فعالیت‌های بازار",
    ],
  },
  {
    id: "int-04",
    slug: "managerial-dialogue",
    title: "هم‌اندیشی مدیریتی",
    description:
      "گفت‌وگوی یک‌به‌یک مدیر با متخصص، برای روشن‌ترشدن مسئله و گزینه‌های تصمیم.",
    href: "/register/managerial-dialogue",
    imageUrl: "/images/courses/managerial-dialogue.jpg",
    body: "هم‌اندیشی مدیریتی بر محور مسئله واقعی مدیر شکل می‌گیرد؛ پیش از جلسه موضوع مشخص می‌شود و متخصص متناسب پیشنهاد می‌گردد. خروجی مورد انتظار، روشن‌ترشدن فرض‌ها و گزینه‌های تصمیم است.",
    highlights: [
      "مسئله مشخص سازمان",
      "نگاه تخصصی بیرونی",
      "جمع‌بندی گزینه‌های قابل بررسی",
    ],
  },
];

export const faculty: FacultyMember[] = [
  {
    id: "fac-1",
    name: "دکتر عسل آغاز",
    title: "استادیار",
    focus: "تحلیل‌گری منابع انسانی، رهبری، رفتار سازمانی، برندسازی داخلی",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/asal-aghaz-v2.jpg",
    email: "a.aghaz@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۳۰۲",
    phone: "۰۲۱۶۴۵۴۵۸۵۸",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    linkedinUrl: "https://www.linkedin.com/in/asal-aghaz-017b0b8b",
    scholarUrl: "https://scholar.google.com/citations?user=OI1RDbYAAAAJ",
  },
  {
    id: "fac-2",
    name: "دکتر سارا سلیمی‌نمین",
    title: "استادیار",
    focus: "TRIZ، بازی‌های جدی، طراحی محصول، پیش‌بینی فناوری، نوآوری باز",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/sara-salimi.jpg",
    email: "sara.salimi@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۳۰۴",
    phone: "۰۲۱۶۴۵۴۵۸۳۸",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    linkedinUrl: "https://www.linkedin.com/in/sara-saliminamin",
  },
  {
    id: "fac-3",
    name: "دکتر مهدی مجیدپور",
    title: "دانشیار",
    focus: "مدیریت فناوری، انتقال فناوری، آینده‌پژوهی فناوری، تحول دیجیتال",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/mehdi-majidpour.jpg",
    email: "majidpour@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۴۰۱",
    phone: "۰۲۱۶۴۵۴۵۸۴۲",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    linkedinUrl: "https://www.linkedin.com/in/mehdi-majidpour-388091112",
    scholarUrl: "https://scholar.google.com/citations?user=zlcXrOcAAAAJ",
  },
  {
    id: "fac-4",
    name: "دکتر محمدرضا هراتی‌نیک",
    title: "استادیار",
    focus: "فرآیند کاوی، سیستم‌های اطلاعاتی، هوشمندی کسب و کار",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/mohammadreza-harati.jpg",
    email: "m.harati@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۲۰۱",
    phone: "۰۲۱۶۴۵۴۵۸۵۷",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    linkedinUrl: "https://www.linkedin.com/in/hnreza",
  },
  {
    id: "fac-5",
    name: "دکتر علیرضا شیخ",
    title: "دانشیار",
    focus: "بازاریابی دیجیتال، بازاریابی عملکردی، سیستم‌های توصیه‌گر، برندینگ",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/alireza-sheikh.jpg",
    email: "a.sheikh@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۳۰۴",
    phone: "۰۲۱۶۴۵۴۵۸۳۷",
    department: "مدیریت کسب و کار",
    linkedinUrl: "https://www.linkedin.com/in/alireza-sheikh-45881712",
  },
  {
    id: "fac-6",
    name: "دکتر سعید روشنی",
    title: "استادیار",
    focus: "مدیریت فناوری، فناوری‌های نوظهور، مدیریت استراتژی، NLP",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/saeed-roshani.jpg",
    email: "saeedroshani@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۳۰۶",
    phone: "۰۲۱۶۴۵۴۵۸۴۳",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    linkedinUrl: "https://www.linkedin.com/in/saeed-roshani",
    scholarUrl: "https://scholar.google.com/citations?user=Q46atc0AAAAJ",
  },
  {
    id: "fac-7",
    name: "دکتر زینب صباغ",
    title: "استادیار",
    focus: "مدیریت منابع انسانی، رفتار سازمانی",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "",
    email: "z.sabagh@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۳۰۴",
    phone: "۰۲۱۶۴۵۴۵۸۳۳",
    department: "مدیریت کسب و کار + مدیریت فناوری",
  },
  {
    id: "fac-8",
    name: "دکتر سیدمحسن طباطبایی",
    title: "استادیار",
    focus: "مدیریت منابع انسانی",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/mohsen-tabatabaei.jpg",
    email: "tabatabaie@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۴۰۲",
    phone: "۰۲۱۶۴۵۴۵۸۳۵",
    department: "مدیریت کسب و کار + مدیریت فناوری",
  },
  {
    id: "fac-9",
    name: "دکتر وحید زاهدی‌راد",
    title: "استادیار",
    focus: "پویایی‌شناسی سیستم‌ها",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/vahid-zahedi.jpg",
    email: "v.zahedi@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۲۰۱",
    phone: "۰۲۱۶۴۵۴۵۸۳۴",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    scholarUrl: "https://scholar.google.com/citations?user=38UplpAAAAAJ",
  },
  {
    id: "fac-10",
    name: "دکتر سیدمحمدصادق امامیان",
    title: "استادیار",
    focus: "سیاست‌گذاری عمومی، حکمرانی انرژی",
    bio: "عضو هیئت علمی دانشکده مدیریت، علم و فناوری",
    imageUrl: "/images/faculty/sadegh-emamian.jpg",
    email: "seyed.emamian@aut.ac.ir",
    office: "ساختمان زکریا رازی — اتاق ۳۰۷",
    phone: "۰۲۱۶۴۵۴۵۸۴۸",
    department: "مدیریت کسب و کار + مدیریت فناوری",
    linkedinUrl: "https://www.linkedin.com/in/seyed-emamian-93419118",
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
  { id: "technology", label: "هوش مصنوعی و تحول سازمان" },
  { id: "digital", label: "برند و بازاریابی" },
  { id: "innovation", label: "برندینگ" },
  { id: "leadership", label: "هم‌اندیشی مدیریتی" },
  { id: "all", label: "همه برنامه‌ها" },
];
