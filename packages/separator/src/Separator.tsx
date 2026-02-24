import { forwardRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@aurora-ui-react/core";
import styles from "./Separator.module.css";

type SeparatorVariant = "default" | "glow";

export interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {
  variant?: SeparatorVariant;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ variant = "default", orientation = "horizontal", decorative = true, className, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-orientation={orientation}
      {...props}
    />
  )
);

Separator.displayName = "Separator";
