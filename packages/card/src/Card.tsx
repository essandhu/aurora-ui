import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@aurora-ui/core";
import styles from "./Card.module.css";

type CardVariant = "surface" | "elevated" | "glass";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "surface", as: Component = "div", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      {...props}
    >
      {children}
    </Component>
  )
);

Card.displayName = "Card";
