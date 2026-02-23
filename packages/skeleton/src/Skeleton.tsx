import { forwardRef, type CSSProperties } from "react";
import { cn } from "@aurora-ui-react/core";
import styles from "./Skeleton.module.css";

type SkeletonVariant = "pulse" | "shimmer" | "glow";
type SkeletonShape = "text" | "circular" | "rectangular";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  shape?: SkeletonShape;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "pulse",
      shape = "text",
      width,
      height,
      borderRadius,
      animated = true,
      className,
      style,
    },
    ref
  ) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(styles.root, className)}
      data-variant={variant}
      data-shape={shape}
      data-animated={animated || undefined}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  )
);

Skeleton.displayName = "Skeleton";
