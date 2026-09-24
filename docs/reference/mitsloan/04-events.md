# صفحه ۴ — Events

**URL هاب:** https://mitsloan.mit.edu/events  
**نقش:** تقویم رویدادهای پذیرش، alumni، symposia، class visits

## ساختار هاب
- لیست/کارت رویدادها (نه لزوماً همان کاروسل هوم)
- هر آیتم معمولاً: عنوان · توضیح کوتاه · زمان/مکان · لینک جزئیات یا ثبت‌نام

## انواع رویداد مشاهده‌شده
| نوع | مثال | مقصد لینک |
|---|---|---|
| Class Visit Program | MBA Class Visit · صبح/بعدازظهر | صفحه رویداد / ثبت |
| Virtual Info Session | MBAn Virtual Information Session | آنلاین |
| Alumni Online | گفتگو با alumni | آنلاین |
| Fair | QS MBA Fair / Master's Fair Boston | خارجی/ثبت |
| Symposium / Academic | Financial Regulation… | `/events/{date}-{slug}` |
| Visit Program چندماهه | MIT Sloan Visit Program | `applymitsloan.mit.edu` |
| Webinar پذیرش | Evening MBA Application Tips | `applymitsloan.mit.edu/register/...` |

## الگوی صفحه جزئیات رویداد
**مسیر رایج:** `/events/YYYY-MM-DD-slug`

فیلدهای لازم برای مدل:
- `title`
- `startDate` / `endDate` (nullable)
- `location` (Online / Cambridge, MA / …)
- `summary`
- `href` (داخلی یا پورتال ثبت خارجی)

## دلالت AUT
کارت افقی با تاریخ شمسی در UI؛ ذخیره ISO؛ پشتیبانی بازه چندروزه.
