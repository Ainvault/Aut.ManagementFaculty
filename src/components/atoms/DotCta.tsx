import Link from "next/link";
import { MorphMark } from "@/components/atoms/MorphMark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DotCtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
  external?: boolean;
};

/** CTA with metamorphism mark (dots → lines on hover) */
export function DotCta({
  href,
  children,
  className,
  onDark = false,
  external = false,
}: DotCtaProps) {
  const classes = cn(
    buttonVariants({ variant: "outline" }),
    "group h-auto gap-2.5 px-5 py-3 text-sm font-bold",
    onDark &&
      "border-background/40 bg-background text-foreground hover:bg-background/90",
    className,
  );

  const content = (
    <>
      <MorphMark />
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
