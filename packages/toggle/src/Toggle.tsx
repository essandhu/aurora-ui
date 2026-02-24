import { forwardRef } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Toggle.module.css";

type ToggleVariant = "outline" | "ghost" | "glow";

export interface ToggleProps extends Omit<TogglePrimitive.ToggleProps, "size"> {
  variant?: ToggleVariant;
  size?: Size;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ variant = "outline", size = "md", className, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(styles.toggle, className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";
