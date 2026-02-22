import { forwardRef } from "react";
import { cn } from "@aurora-ui/core";
import type { Size } from "@aurora-ui/core";
import styles from "./Avatar.module.css";

type AvatarVariant = "circle" | "square";

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  variant?: AvatarVariant;
  size?: Size;
  accent?: string;
  className?: string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { src, alt, fallback, variant = "circle", size = "md", accent, className },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback} role="img" aria-label={alt}>
          {fallback}
        </span>
      )}
    </span>
  )
);

Avatar.displayName = "Avatar";
