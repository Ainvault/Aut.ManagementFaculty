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
import type { AdminCourse } from "@/lib/data/admin/courses";
import { AdminFormCard } from "@/components/organisms/admin/AdminPage";

type Payload = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  durationHours: number;
  format: string;
  price: number | null;
  registrationUrl: string;
  imageUrl: string;
  seoDescription: string;
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
    durationHours: initial?.durationHours ?? 16,
    format: initial?.format ?? "online",
    price: initial?.price ?? null,
    registrationUrl: initial?.registrationUrl ?? "/register/",
    imageUrl: initial?.imageUrl ?? "",
    seoDescription: initial?.seoDescription ?? "",
    published: initial?.published ?? true,
  });
  const [priceInput, setPriceInput] = useState(
    initial?.price != null ? String(initial.price) : "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof Payload>(key: K, value: Payload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
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
                    <SelectItem value="leadership">رهبری</SelectItem>
                    <SelectItem value="technology">فناوری</SelectItem>
                    <SelectItem value="innovation">نوآوری</SelectItem>
                    <SelectItem value="energy">انرژی</SelectItem>
                    <SelectItem value="design">طراحی</SelectItem>
                    <SelectItem value="digital">دیجیتال</SelectItem>
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
                  value={form.durationHours}
                  onChange={(e) => set("durationHours", Number(e.target.value))}
                  required
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
                <Label htmlFor="imageUrl">آدرس تصویر</Label>
                <Input
                  id="imageUrl"
                  value={form.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
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