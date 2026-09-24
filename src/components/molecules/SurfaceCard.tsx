import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  padded?: boolean | "sm" | "md" | "lg";
  as?: "article" | "div";
};

const padClass = {
  true: "p-6",
  sm: "p-4",
  md: "p-5",
  lg: "p-8",
} as const;

/** Light surface built on shadcn Card */
export function SurfaceCard({
  padded = "md",
  className,
  children,
  id,
  as = "article",
}: SurfaceCardProps) {
  return (
    <Card
      id={id}
      data-slot={as === "div" ? "surface-div" : "surface-article"}
      className={cn(
        "gap-0 border-border/70 bg-card py-0 shadow-sm transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-md",
        padded !== false &&
          padClass[padded === true ? "true" : (padded as "sm" | "md" | "lg")],
        className,
      )}
    >
      {children}
    </Card>
  );
}
