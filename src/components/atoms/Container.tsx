import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  narrow?: boolean;
};

export function Container({
  className,
  narrow = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-5 sm:px-8 lg:px-12",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
      {...props}
    />
  );
}
