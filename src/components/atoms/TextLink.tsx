import Link from "next/link";
import { cn } from "@/lib/utils";

type TextLinkProps = React.ComponentProps<typeof Link> & {
  tone?: "default" | "inverse" | "accent";
};

export function TextLink({
  className,
  tone = "default",
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        "font-medium underline-offset-4 transition-colors hover:underline",
        tone === "default" && "text-chart-2 hover:text-primary",
        tone === "inverse" && "text-background/90 hover:text-background",
        tone === "accent" && "text-primary hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
