import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariant = "accent" | "muted" | "inverse";

export function BadgeLabel({
  className,
  variant = "accent",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  const map = {
    accent: "default" as const,
    muted: "secondary" as const,
    inverse: "outline" as const,
  };
  return (
    <Badge
      variant={map[variant]}
      className={cn(
        variant === "inverse" &&
          "border-background/30 bg-background/15 text-background",
        className,
      )}
      {...props}
    />
  );
}
