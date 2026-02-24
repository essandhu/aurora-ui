import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Textarea.module.css";

type TextareaVariant = "outline" | "filled" | "ghost";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  variant?: TextareaVariant;
  size?: Size;
  error?: boolean;
  autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = "outline", size = "md", error, autoResize, className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-error={error || undefined}
      data-autoresize={autoResize || undefined}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
