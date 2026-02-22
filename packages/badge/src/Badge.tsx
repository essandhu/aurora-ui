import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size, Accent } from "@aurora-ui-react/core";
import styles from "./Badge.module.css";

type BadgeVariant = "solid" | "outline" | "glow";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: Size;
  accent?: Accent;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "solid", size = "md", accent, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
