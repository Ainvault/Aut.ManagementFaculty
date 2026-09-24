"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactInterestForm({
  submitLabel,
  successLabel,
  courseSlug,
}: {
  submitLabel: string;
  successLabel: string;
  courseSlug?: string;
}) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, courseSlug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "خطا در ثبت درخواست");
        return;
      }
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <p className="rounded-lg border border-primary/25 bg-primary/5 p-4 text-sm text-chart-2">
        {successLabel}
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="name">نام و نام خانوادگی</Label>
        <Input
          id="name"
          value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          required
          className="h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          required
          className="h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">تلفن</Label>
        <Input
          id="phone"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          className="h-11"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">پیام</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "در حال ارسال..." : submitLabel}
      </Button>
    </form>
  );
}