import { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Label.module.css";

export interface LabelProps extends LabelPrimitive.LabelProps {
  size?: Extract<Size, "sm" | "md">;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = "md", required, disabled, error, className, children, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-size={size}
      data-disabled={disabled || undefined}
      data-error={error || undefined}
      data-required={required || undefined}
      {...props}
    >
      {children}
      {required && <span className={styles.asterisk} aria-hidden="true">*</span>}
    </LabelPrimitive.Root>
  )
);

Label.displayName = "Label";
