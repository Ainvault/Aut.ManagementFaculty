"use client";

import { useEffect } from "react";
import { DotCta } from "@/components/atoms/DotCta";
import { Button } from "@/components/ui/button";

export default function MainError({
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
    <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-start justify-center px-5 py-20 sm:px-8 lg:px-12">
      <p className="text-sm font-semibold text-primary">خطا</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
        بارگذاری صفحه ناموفق بود
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
        لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت، چند لحظه بعد بازگردید.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button type="button" onClick={reset}>
          تلاش مجدد
        </Button>
        <DotCta href="/">بازگشت به خانه</DotCta>
      </div>
    </div>
  );
}
