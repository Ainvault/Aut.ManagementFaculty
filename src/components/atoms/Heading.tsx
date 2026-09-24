import { cn } from "@/lib/utils";

const levels = {
  1: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
  2: "text-2xl font-bold tracking-tight sm:text-3xl",
  3: "text-lg font-semibold sm:text-xl",
  4: "text-base font-semibold sm:text-lg",
} as const;

type HeadingProps = React.ComponentProps<"h1"> & {
  as?: "h1" | "h2" | "h3" | "h4";
  level?: keyof typeof levels;
};

export function Heading({ as, level = 2, className, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as "h1" | "h2" | "h3" | "h4");
  return <Tag className={cn(levels[level], className)} {...props} />;
}
