import type { ComponentPropsWithoutRef, ElementType } from "react";

type GlassCardProps<T extends ElementType> = {
  as?: T;
  strong?: boolean;
  interactive?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function GlassCard<T extends ElementType = "div">({
  as,
  strong = false,
  interactive = false,
  className = "",
  ...props
}: GlassCardProps<T>) {
  const Component: ElementType = as ?? "div";
  const classes = [
    strong ? "glass-strong" : "glass",
    "rounded-3xl p-6",
    interactive ? "glass-hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes} {...props} />;
}
