import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  tone?: "default" | "muted" | "dark" | "accent";
  tight?: boolean;
};

const tones = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-chart-3 text-background",
  accent: "bg-primary text-primary-foreground",
};

export function Section({
  className,
  tone = "default",
  tight = false,
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        "motion-section relative min-w-0",
        tight ? "py-8 sm:py-10" : "py-16 sm:py-24",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
