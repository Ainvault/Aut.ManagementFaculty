"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function PublishToggle({
  apiPath,
  id,
  published,
}: {
  apiPath: string;
  id: string;
  published: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function toggle() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiPath}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "خطا در ذخیره وضعیت");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        size="sm"
        variant={published ? "outline" : "ghost"}
        onClick={toggle}
        disabled={loading}
      >
        {loading ? "..." : published ? "منتشرشده" : "پیش‌نویس"}
      </Button>
      {error && <p className="mt-1 max-w-40 text-xs text-red-600">{error}</p>}
    </div>
  );
}