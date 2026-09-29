import type { Course } from "@/lib/types";

/** Seed/reference courses from docs/cources + برنامه تحول سازمانی با AI. */
export const courses: Course[] = [
  {
    id: "crs-ai-org-transform",
    slug: "ai-organizational-transformation",
    title: "تحول سازمانی با هوش مصنوعی",
    summary:
      "دوره تخصصی دوروزه؛ درک روشن از اینکه هوش مصنوعی کجا و چگونه به سازمان کمک می‌کند.",
    category: "technology",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/ai-organizational-transformation",
    imageUrl: "/images/courses/ai-organizational-transformation.png",
    seoDescription:
      "دوره تخصصی دوروزه تحول سازمانی با هوش مصنوعی. مسیر یادگیری از مسئله سازمانی تا نقش انسان و AI، انتخاب مسیر، مدیریت محصول AI، داده و حاکمیت، ساخت و آزمون (Prompt، chatbot، AI Agent) و تشخیص کاربرد مناسب. محورها: ۱) آمادگی و مدیریت تغییر — دکتر آغاز؛ ۲) تحول با هوش مصنوعی — دکتر هراتی‌نیک؛ ۳) چرخه عمر محصول AI — دکتر سلیمی‌نمین؛ ۴) حاکمیت داده — دکتر روشنی؛ ۵) تجربه عملی AI Fluency و دستیاران صنعتی آموزشی — مهندس متین صفار و مهندس محمدحسین کشفی. شعار دوره: A SMARTER TOMORROW BY BETTER DECISIONS.",
  },
  {
    id: "crs-ai-fluency",
    slug: "ai-fluency",
    title: "AI Fluency؛ کارگاه عملی کاربرد هوش مصنوعی",
    summary:
      "از پرامپت دقیق تا ایجنت قابل اعتماد — یاد بگیرید، بسازید، ارزیابی کنید.",
    category: "technology",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/ai-fluency",
    imageUrl: "/images/courses/ai-fluency.jpg",
    seoDescription:
      "کارگاه عملی کاربرد هوش مصنوعی با شعار «از پرامپت دقیق تا ایجنت قابل اعتماد». پنج گام مسیر یادگیری: ۱) مهندسی پرامپت — درخواست شفاف، پاسخ هدفمند؛ مشخص‌کردن هدف، زمینه و قالب خروجی؛ ۲) طراحی دستورالعمل (Prompt Card / Skill) — دستور شفاف، اجرای منسجم؛ تعریف گام‌ها و قوانین انجام کار؛ ۳) چت‌بات اختصاصی — دانش شما، دستیار شما؛ تعیین نقش، منابع و مرزهای پاسخ؛ ۴) ایجنت — از پاسخ‌دادن تا انجام کار؛ اتصال ابزارها با نظارت انسان؛ ۵) ارزیابی و کنترل — بسنجید، اصلاح کنید، اعتماد کنید؛ آزمون پاسخ‌ها و کنترل خطا. در پایان کارگاه، از ایده به یک دستیار کاربردی می‌رسید: پرامپت دقیق، مهارت قابل تکرار، چت‌بات اختصاصی و ایجنت قابل ارزیابی.",
  },
  {
    id: "crs-hr-prompt",
    slug: "hr-prompt-engineering",
    title: "مهندسی پرامپت در منابع انسانی",
    summary:
      "کارگاهی درباره هدایت هوش مصنوعی مولد در مسائل منابع انسانی؛ با تمرکز بر تحلیل رزومه، شرح شغل، شایستگی‌ها و طراحی پرامپت‌های تخصصی و قابل تکرار.",
    category: "technology",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/hr-prompt-engineering",
    imageUrl: "/images/courses/hr-prompt-engineering.jpg",
    seoDescription:
      "استفاده حرفه‌ای از هوش مصنوعی در منابع انسانی به شناخت مسئله و کیفیت تعامل با مدل وابسته است. این کارگاه به طراحی پرامپت برای تحلیل اطلاعات تخصصی HR می‌پردازد و کاربردهای آن را در جذب، توسعه و مدیریت عملکرد بررسی می‌کند. مدرس: دکتر عسل آغاز.",
  },
  {
    id: "crs-branding",
    slug: "branding",
    title: "برندینگ",
    summary:
      "بررسی هویت و جایگاه برند در ارتباط با تجربه مخاطب، ارتباطات و ارزش برند؛ با مطالعه نمونه‌ها و کار عملی طراحی و توسعه برند.",
    category: "innovation",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/branding",
    imageUrl: "/images/courses/branding.jpg",
    seoDescription:
      "برند در ارتباط میان هویت کسب‌وکار و تجربه مخاطب شکل می‌گیرد. این کارگاه به تصمیم‌های مؤثر بر این ارتباط می‌پردازد؛ از شناخت مخاطب و ارزش پیشنهادی تا روایت، تجربه و ارزیابی برند. مدرس: دکتر علیرضا شیخ. شعار منبع: از معنا و هویت تا تجربه و وفاداری.",
  },
  {
    id: "crs-marketing",
    slug: "marketing",
    title: "مارکتینگ",
    summary:
      "بررسی مسیر تصمیم‌گیری بازاریابی، از شناخت مشتری و ارزش پیشنهادی تا استراتژی، کمپین و ارزیابی عملکرد؛ با توجه به کاربرد داده و هوش مصنوعی.",
    category: "digital",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/marketing",
    imageUrl: "/images/courses/marketing.jpg",
    seoDescription:
      "تصمیم‌های بازاریابی به شناخت بازار، رفتار مشتری و ارزیابی نتیجه وابسته‌اند. این کارگاه ارتباط میان تحقیقات بازار، انتخاب استراتژی، طراحی کمپین و شاخص‌های عملکرد را بررسی می‌کند. مدرس: دکتر علیرضا شیخ. شعار منبع: از شناخت مشتری تا طراحی استراتژی و اجرای کمپین.",
  },
  {
    id: "crs-branding-marketing",
    slug: "branding-marketing-in-practice",
    title: "برندینگ و مارکتینگ در عمل",
    summary:
      "نگاهی یکپارچه به هویت برند، استراتژی بازاریابی و عملکرد بازار؛ همراه با مطالعه موردی و پروژه عملی برای بررسی ارتباط این تصمیم‌ها.",
    category: "digital",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/branding-marketing-in-practice",
    imageUrl: "/images/courses/branding-marketing-practice.jpg",
    seoDescription:
      "هویت برند، ارزش پیشنهادی و فعالیت‌های بازاریابی بر یکدیگر اثر می‌گذارند. این کارگاه ارتباط میان آن‌ها را در تصمیم‌های کسب‌وکار بررسی می‌کند: از شناخت بازار و طراحی استراتژی برند تا انتخاب کانال، طراحی کمپین و تحلیل شاخص‌های عملکرد. مدرس: دکتر علیرضا شیخ. شعار منبع: از هویت برند تا رشد پایدار کسب‌وکار.",
  },
  {
    id: "crs-managerial-dialogue",
    slug: "managerial-dialogue",
    title: "هم‌اندیشی مدیریتی",
    summary:
      "گفت‌وگوی یک‌به‌یک مدیر با استاد یا متخصص مرتبط، برای بررسی مسئله واقعی سازمان، بازبینی فرض‌ها و روشن‌ترشدن گزینه‌های تصمیم.",
    category: "leadership",
    durationHours: null,
    format: "in-person",
    registrationUrl: "/register/managerial-dialogue",
    imageUrl: "/images/courses/managerial-dialogue.jpg",
    seoDescription:
      "هم‌اندیشی مدیریتی از مسئله‌ای آغاز می‌شود که مدیر با خود به جلسه می‌آورد. موضوع و انتظار او پیش از جلسه مشخص می‌شود و متخصص مرتبط با آن پیشنهاد می‌شود. گفت‌وگو به بررسی ابعاد مسئله، فرضیات و گزینه‌های تصمیم اختصاص دارد. زیرعنوان منبع: گفت‌وگویی تخصصی برای مواجهه با مسائل واقعی مدیریت.",
  },
];
