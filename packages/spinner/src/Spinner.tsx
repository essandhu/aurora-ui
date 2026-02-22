import { forwardRef } from "react";
import { cn } from "@aurora-ui/core";
import type { Size } from "@aurora-ui/core";
import styles from "./Spinner.module.css";

type SpinnerVariant = "ring" | "dots" | "pulse";

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: Size;
  label?: string;
  className?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ variant = "ring", size = "md", label = "Loading", className }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
    >
      {variant === "dots" && (
        <>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </>
      )}
    </span>
  )
);

Spinner.displayName = "Spinner";
