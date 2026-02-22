import { forwardRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Switch.module.css";

export interface SwitchProps
  extends Omit<SwitchPrimitive.SwitchProps, "size"> {
  size?: Size;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ size = "md", className, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-size={size}
      {...props}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  )
);

Switch.displayName = "Switch";
