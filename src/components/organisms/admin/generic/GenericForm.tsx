"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type AdminFieldSpec,
  type GenericFormSpec,
} from "@/lib/admin/entities";
import { AdminFormCard } from "@/components/organisms/admin/AdminPage";

function defaultValue(field: AdminFieldSpec): unknown {
  if (field.type === "stringList") return [];
  if (field.type === "boolean") return Boolean(field.defaultValue ?? false);
  return field.defaultValue ?? "";
}

function finalValue(field: AdminFieldSpec, value: unknown): unknown {
  if (field.type === "stringList") {
    return (value as string[]).map((s) => s.trim()).filter(Boolean);
  }
  if (field.type === "number") return Number(value);
  if (field.type === "boolean") return value;
  // optional empty text/date becomes null (e.g. event endDate, program tagline)
  if (!field.required && value === "") return null;
  return value;
}

export function GenericForm({
  spec,
  initial,
}: {
  spec: GenericFormSpec;
  initial?: unknown;
}) {
  const router = useRouter();
  const data = (initial ?? {}) as Record<string, unknown>;
  const isEdit = Boolean(initial);
  const editId = data[spec.idColumn];

  const [form, setForm] = useState<Record<string, unknown>>(() => {
    const state: Record<string, unknown> = {};
    for (const field of spec.fields) {
      state[field.name] = data[field.name] !== undefined ? data[field.name] : defaultValue(field);
    }
    return state;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(name: string, value: unknown) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function setListItem(name: string, index: number, value: string) {
    setForm((f) => {
      const list = [...((f[name] as string[]) ?? [])];
      list[index] = value;
      return { ...f, [name]: list };
    });
  }

  function addListItem(name: string) {
    setForm((f) => ({ ...f, [name]: [...((f[name] as string[]) ?? []), ""] }));
  }

  function removeListItem(name: string, index: number) {
    setForm((f) => ({
      ...f,
      [name]: ((f[name] as string[]) ?? []).filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload: Record<string, unknown> = {};
    for (const field of spec.fields) {
      payload[field.name] = finalValue(field, form[field.name]);
    }

    try {
      const res = await fetch(isEdit ? `${spec.apiPath}/${editId}` : spec.apiPath, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "خطا در ذخیره");
        return;
      }
      router.push(`/admin/${spec.key}`);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function renderControl(field: AdminFieldSpec) {
    const value = form[field.name];

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            value={String(value ?? "")}
            onChange={(e) => set(field.name, e.target.value)}
            rows={4}
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={Number(value ?? 0)}
            onChange={(e) => set(field.name, Number(e.target.value))}
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={String(value ?? "")}
            onChange={(e) => set(field.name, e.target.value)}
            required={field.required}
          />
        );
      case "select":
        return (
          <Select value={String(value ?? "")} onValueChange={(v) => v && set(field.name, v)}>
            <SelectTrigger id={field.name} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(field.options ?? []).map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "boolean": {
        const options = field.options ?? [
          { value: "true", label: "بله" },
          { value: "false", label: "خیر" },
        ];
        return (
          <Select
            value={Boolean(value) ? "true" : "false"}
            onValueChange={(v) => set(field.name, v === "true")}
          >
            <SelectTrigger id={field.name} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      case "stringList":
        return (
          <div className="space-y-2">
            {((value as string[]) ?? []).map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => setListItem(field.name, index, e.target.value)}
                  placeholder={field.placeholder ?? "مورد…"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeListItem(field.name, index)}
                >
                  حذف
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => addListItem(field.name)}>
              + افزودن مورد
            </Button>
          </div>
        );
      default:
        return (
          <Input
            value={String(value ?? "")}
            onChange={(e) => set(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
          />
        );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminFormCard
        title={isEdit ? `ویرایش ${spec.noun}` : `ثبت ${spec.noun} جدید`}
        description="پس از ذخیره، فهرست به‌روز می‌شود."
        footer={
          <>
            <Button type="submit" disabled={loading}>
              {loading
                ? "در حال ذخیره..."
                : isEdit
                  ? "ذخیره تغییرات"
                  : `ایجاد ${spec.noun}`}
            </Button>
            <Link
              href={`/admin/${spec.key}`}
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

        <div className="grid gap-5 sm:grid-cols-2">
          {spec.fields.map((field) => (
            <div
              key={field.name}
              className={field.full ? "space-y-1.5 sm:col-span-2" : "space-y-1.5"}
            >
              <Label htmlFor={field.name}>{field.label}</Label>
              {renderControl(field)}
            </div>
          ))}
        </div>
      </AdminFormCard>
    </form>
  );
}