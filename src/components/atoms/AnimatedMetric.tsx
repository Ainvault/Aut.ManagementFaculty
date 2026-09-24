"use client";

import { useEffect, useRef, useState } from "react";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toLatin = (value: string) => value.replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)));

export function AnimatedMetric({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const latin = toLatin(value).replaceAll("٬", "");
    const match = latin.match(/^(\D*)(\d+)(\D*)$/);
    if (!match) return;
    const [, prefix, rawNumber, suffix] = match;
    const target = Number(rawNumber);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const startedAt = performance.now();
      const duration = 1000;
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased).toLocaleString("fa-IR");
        setDisplay(`${prefix}${current}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.55 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className={className}>{display}</span>;
}
