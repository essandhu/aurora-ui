import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@aurora-ui/core";
import type { Size } from "@aurora-ui/core";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.CheckboxProps, "size"> {
  size?: Size;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ size = "md", className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-size={size}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          className={styles.checkIcon}
        >
          <path
            d="M11.5 3.5L5.5 10.5L2.5 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = "Checkbox";
