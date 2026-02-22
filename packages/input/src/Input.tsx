import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Input.module.css";

type InputVariant = "outline" | "filled" | "ghost";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: Size;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "outline", size = "md", error, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-error={error || undefined}
      {...props}
    />
  )
);

Input.displayName = "Input";
