import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@aurora-ui/core";
import type { Size, Accent } from "@aurora-ui/core";
import { Spinner } from "@aurora-ui/spinner";
import styles from "./Button.module.css";

type ButtonVariant = "solid" | "outline" | "ghost" | "glow";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  accent?: Accent;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      accent,
      loading,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" className={styles.spinner} />}
      <span className={styles.content} data-loading={loading || undefined}>
        {children}
      </span>
    </button>
  )
);

Button.displayName = "Button";
