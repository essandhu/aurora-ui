import { forwardRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Progress.module.css";

type ProgressVariant = "default" | "glow";

export interface ProgressProps extends Omit<ProgressPrimitive.ProgressProps, "size"> {
  variant?: ProgressVariant;
  size?: Size;
  indeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ variant = "default", size = "md", value, max = 100, indeterminate, className, ...props }, ref) => {
    const percentage = indeterminate ? undefined : ((value ?? 0) / max) * 100;

    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={indeterminate ? null : value}
        max={max}
        className={cn(styles.root, className)}
        data-variant={variant}
        data-size={size}
        data-indeterminate={indeterminate || undefined}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={styles.indicator}
          style={indeterminate ? undefined : { transform: `translateX(-${100 - (percentage ?? 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);

Progress.displayName = "Progress";
