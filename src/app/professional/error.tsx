"use client";

import { useEffect } from "react";
import { DotCta } from "@/components/atoms/DotCta";
import { Button } from "@/components/ui/button";

export default function ProfessionalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-start justify-center bg-chart-3 px-5 py-20 text-background sm:px-8 lg:px-12">
      <p className="text-sm font-semibold text-accent">خطا</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-background sm:text-3xl">
        بارگذاری صفحه ناموفق بود
      </h1>
      <p className="mt-3 max-w-md text-background/70">لطفاً دوباره تلاش کنید.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button
          type="button"
          variant="outline"
          className="border-background/60 bg-transparent text-background hover:bg-background hover:text-foreground"
          onClick={reset}
        >
          تلاش مجدد
        </Button>
        <DotCta href="/professional" onDark>
          بازگشت
        </DotCta>
      </div>
    </div>
  );
}
