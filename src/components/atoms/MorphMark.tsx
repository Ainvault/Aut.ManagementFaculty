import { cn } from "@/lib/utils";

type MorphMarkProps = {
  className?: string;
};

/**
 * Metamorphism mark: four dots that morph into crossing lines on group hover.
 * Parent must use `group` (e.g. Button).
 */
export function MorphMark({ className }: MorphMarkProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cn("size-4 shrink-0", className)}
      aria-hidden
    >
      {/* Idle: four dots */}
      <g className="origin-center transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
        <circle cx="4" cy="4" r="1.65" fill="currentColor" />
        <circle cx="12" cy="4" r="1.65" fill="currentColor" />
        <circle cx="4" cy="12" r="1.65" fill="currentColor" />
        <circle cx="12" cy="12" r="1.65" fill="currentColor" />
      </g>
      {/* Hover: crossing lines */}
      <g
        className="origin-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      >
        <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" />
        <line x1="12.5" y1="3.5" x2="3.5" y2="12.5" />
      </g>
    </svg>
  );
}
