"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import type { AdminCourse } from "@/lib/data/admin/courses";
import { AdminFormCard } from "@/components/organisms/admin/AdminPage";

const SUGGESTED_TAGS = [
  "کارگاه‌ها",
  "دوره‌های سازمانی",
  "گزیده دوره‌های برگزار شده",
];

type Payload = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  durationHours: number | null;
  format: string;
  price: number | null;
  registrationUrl: string;
  posterImageUrl: string;
  brochureImageUrl: string;
  seoDescription: string;
  tags: string[];
  published: boolean;
};

interface CourseFormProps {
  initial?: AdminCourse;
}

export function CourseForm({ initial }: CourseFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<Payload>({
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    summary: initial?.summary ?? "",
    category: initial?.category ?? "leadership",
    durationHours: initial?.durationHours ?? null,
    format: initial?.format ?? "in-person",
    price: initial?.price ?? null,
    registrationUrl: initial?.registrationUrl ?? "/register/",
    posterImageUrl: initial?.posterImageUrl ?? "",
    brochureImageUrl: initial?.brochureImageUrl ?? "",
    seoDescription: initial?.seoDescription ?? "",
    tags: initial?.tags ?? [],
    published: initial?.published ?? true,
  });
  const [priceInput, setPriceInput] = useState(
    initial?.price != null ? String(initial.price) : "",
  );
  const [customTagInput, setCustomTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof Payload>(key: K, value: Payload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleTag(tag: string) {
    setForm((f) => {
      const exists = f.tags.includes(tag);
      return {
        ...f,
        tags: exists ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
      };
    });
  }

  function addCustomTag() {
    const trimmed = customTagInput.trim();
    if (!trimmed) return;
    if (!form.tags.includes(trimmed)) {
      set("tags", [...form.tags, trimmed]);
    }
    setCustomTagInput("");
  }

  function removeTag(tagToRemove: string) {
    set("tags", form.tags.filter((t) => t !== tagToRemove));
  }

  function onPriceChange(raw: string) {
    setPriceInput(raw);
    const trimmed = raw.trim();
    if (trimmed === "") {
      set("price", null);
      return;
    }
    const n = Number(trimmed.replace(/,/g, ""));
    set("price", Number.isFinite(n) ? Math.round(n) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        isEdit ? `/api/admin/courses/${initial!.id}` : "/api/admin/courses",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "خطا در ذخیره دوره");
        return;
      }
      router.push("/admin/courses");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminFormCard
        title={isEdit ? "ویرایش دوره" : "ثبت دوره جدید"}
        description="فیلدهای ستاره‌دار الزامی‌اند. قیمت اختیاری است."
        footer={
          <>
            <Button type="submit" disabled={loading}>
              {loading ? "در حال ذخیره..." : isEdit ? "ذخیره تغییرات" : "ایجاد دوره"}
            </Button>
            <Link
              href="/admin/courses"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              انصراف
            </Link>
          </>
        }
      >
        {error ? (
          <p
            className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="space-y-8">
          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">اطلاعات اصلی</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                شناسه، عنوان و خلاصهٔ نمایشی دوره
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="slug">اسلاگ</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="ai-for-managers"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="title">عنوان</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="هوش مصنوعی برای مدیران"
                  required
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="summary">خلاصه</Label>
                <Textarea
                  id="summary"
                  value={form.summary}
                  onChange={(e) => set("summary", e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">برگزاری و قیمت</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                دسته، قالب، مدت و هزینهٔ اختیاری
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Select value={form.category} onValueChange={(v) => v && set("category", v)}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">هوش مصنوعی و تحول سازمان</SelectItem>
                    <SelectItem value="digital">برند و بازاریابی</SelectItem>
                    <SelectItem value="innovation">برندینگ</SelectItem>
                    <SelectItem value="leadership">هم‌اندیشی مدیریتی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="format">قالب برگزاری</Label>
                <Select value={form.format} onValueChange={(v) => v && set("format", v)}>
                  <SelectTrigger id="format" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">آنلاین</SelectItem>
                    <SelectItem value="blended">ترکیبی</SelectItem>
                    <SelectItem value="in-person">حضوری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="durationHours">مدت (ساعت)</Label>
                <Input
                  id="durationHours"
                  type="number"
                  min={1}
                  value={form.durationHours ?? ""}
                  onChange={(e) => {
                    const raw = e.target.value;
                    set(
                      "durationHours",
                      raw === "" ? null : Number(raw),
                    );
                  }}
                  placeholder="اختیاری"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-3">
                <Label htmlFor="price">قیمت (تومان)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={priceInput}
                  onChange={(e) => onPriceChange(e.target.value)}
                  placeholder="خالی = بدون نمایش قیمت"
                />
                <p className="text-xs text-muted-foreground">
                  اگر خالی بماند، قیمت در سایت نمایش داده نمی‌شود.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">تگ‌ها و دسته‌بندی</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                برچسب‌هایی که دوره در فیلترها و دسته‌بندی سایت نمایش داده می‌شود (مثلاً کارگاه‌ها، دوره‌های سازمانی، گزیده دوره‌های برگزارشده)
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">تگ‌های پیشنهادی</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SUGGESTED_TAGS.map((tag) => {
                    const active = form.tags.includes(tag);
                    return (
                      <Button
                        key={tag}
                        type="button"
                        size="sm"
                        variant={active ? "default" : "outline"}
                        aria-pressed={active}
                        onClick={() => toggleTag(tag)}
                        className="h-8 px-3 text-xs"
                      >
                        {tag}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-1.5">
                  <Label htmlFor="newTag">افزودن تگ دلخواه</Label>
                  <Input
                    id="newTag"
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTag();
                      }
                    }}
                    placeholder="مثلاً دوره‌های ویژه مدیران"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCustomTag}
                  className="shrink-0"
                >
                  <Plus className="size-4" />
                  افزودن
                </Button>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  تگ‌های این دوره ({form.tags.length})
                </Label>
                {form.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 py-1 pe-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="rounded-full p-0.5 transition-colors hover:bg-foreground/10"
                          aria-label={`حذف تگ ${tag}`}
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    هنوز تگی برای این دوره انتخاب نشده است.
                  </p>
                )}
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">رسانه و انتشار</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                لینک ثبت‌نام، تصویر، SEO و وضعیت انتشار
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="registrationUrl">لینک ثبت‌نام</Label>
                <Input
                  id="registrationUrl"
                  value={form.registrationUrl}
                  onChange={(e) => set("registrationUrl", e.target.value)}
                  placeholder="/register/ai-for-managers"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="posterImageUrl">آدرس پوستر (نمایش در لیست دوره‌ها)</Label>
                <Input
                  id="posterImageUrl"
                  value={form.posterImageUrl}
                  onChange={(e) => set("posterImageUrl", e.target.value)}
                  placeholder="/images/courses/..."
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="brochureImageUrl">آدرس بروشور (نمایش در صفحه جزئیات)</Label>
                <Input
                  id="brochureImageUrl"
                  value={form.brochureImageUrl}
                  onChange={(e) => set("brochureImageUrl", e.target.value)}
                  placeholder="/images/courses/..."
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="seoDescription">توضیح SEO</Label>
                <Textarea
                  id="seoDescription"
                  value={form.seoDescription}
                  onChange={(e) => set("seoDescription", e.target.value)}
                  rows={2}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="published">وضعیت انتشار</Label>
                <Select
                  value={form.published ? "true" : "false"}
                  onValueChange={(v) => set("published", (v ?? "true") === "true")}
                >
                  <SelectTrigger id="published" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">منتشرشده</SelectItem>
                    <SelectItem value="false">پیش‌نویس</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
        </div>
      </AdminFormCard>
    </form>
  );
}