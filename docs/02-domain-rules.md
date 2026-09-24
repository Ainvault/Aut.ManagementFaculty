# Domain Rules — قوانین کسب‌وکار و مدل داده

## Data Model
```json
{
  "course": {
    "id": "crs-ai-mgmt",
    "slug": "ai-for-managers",
    "title": "هوش مصنوعی برای مدیران",
    "summary": "…",
    "category": "technology",
    "durationHours": 24,
    "format": "online",
    "registrationUrl": "/register/ai-for-managers",
    "imageUrl": "/images/courses/ai.jpg",
    "seoDescription": "…"
  },
  "program": {
    "id": "prg-emba",
    "slug": "executive",
    "title": "برنامه مدیران اجرایی",
    "blurb": "…",
    "group": "executive",
    "href": "/programs/executive"
  },
  "event": {
    "id": "evt-1",
    "title": "وبینار معرفی دوره‌ها",
    "startDate": "2026-10-16",
    "endDate": null,
    "location": "آنلاین",
    "href": "/events/evt-1"
  },
  "article": {
    "id": "art-1",
    "title": "…",
    "category": "بینش‌ها",
    "excerpt": "…",
    "imageUrl": "/images/articles/1.jpg",
    "href": "/insights/art-1",
    "featured": true
  }
}
```

| فیلد | توضیح |
|---|---|
| `course.category` | یکی از دسته‌های فیلتر لندینگ professional |
| `program.group` | `standard` یا `executive` برای selector هوم |
| `event.endDate` | اگر null باشد رویداد تک‌روزه است |
| `article.featured` | حداکثر یک مقاله featured در هوم |

## Business / Calculation Rules
- CTA اصلی همیشه به مسیر کشف دوره یا ثبت‌نام بالقوه اشاره می‌کند (فعلاً لینک mock).
- لیست برنامه‌های هوم: ابتدا `group=standard` سپس بلوک جدا `executive`.
- آمار لندینگ professional از mock ثابت خوانده می‌شود (تا اتصال analytics/DB).
- هیچ مبلغ/ظرفیت واقعی محاسبه نمی‌شود تا DB وصل شود.

## Locale / Format Rules
- زبان UI: فارسی؛ `dir="rtl"`؛ اعداد نمایشی می‌توانند فارسی‌سازی شوند در لایهٔ UI.
- تاریخ رویداد: نمایش شمسی در UI؛ ذخیرهٔ mock به ISO میلادی (`YYYY-MM-DD`).
- نام برند در متادیتا: «آموزش آزاد دانشگاه صنعتی امیرکبیر».

## Edge Cases & نکات ریز
- لیست بلند دوره‌ها در mega-menu باید `max-height` + اسکرول داخلی داشته باشد.
- اگر `featured` مقاله نباشد، اولین مقاله به‌عنوان featured موقتی استفاده نمی‌شود — صریحاً یکی باید featured باشد.
- API برای id ناموجود باید `404` برگرداند.
