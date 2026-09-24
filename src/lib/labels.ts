export const COURSE_CATEGORY_LABELS: Record<string, string> = {
  leadership: "رهبری",
  technology: "فناوری",
  innovation: "نوآوری",
  energy: "انرژی",
  design: "طراحی",
  digital: "دیجیتال",
};

export const COURSE_FORMAT_LABELS: Record<string, string> = {
  online: "آنلاین",
  blended: "ترکیبی (حضوری + آنلاین)",
  "in-person": "حضوری",
};

export function categoryLabel(value: string): string {
  return COURSE_CATEGORY_LABELS[value] ?? value;
}

export function formatLabel(value: string): string {
  return COURSE_FORMAT_LABELS[value] ?? value;
}

/** Format course price in toman for UI; returns null when price should be hidden. */
export function formatCoursePrice(price: number | null | undefined): string | null {
  if (price === null || price === undefined || !Number.isFinite(price) || price < 0) {
    return null;
  }
  const formatted = new Intl.NumberFormat("fa-IR").format(Math.round(price));
  return `${formatted} تومان`;
}