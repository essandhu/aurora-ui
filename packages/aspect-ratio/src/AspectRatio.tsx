import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@aurora-ui-react/core";
import styles from "./AspectRatio.module.css";

export interface AspectRatioProps
  extends ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, children, ...props }, ref) => (
    <div ref={ref} className={cn(styles.root, className)}>
      <AspectRatioPrimitive.Root ratio={ratio} {...props}>
        {children}
      </AspectRatioPrimitive.Root>
    </div>
  )
);

AspectRatio.displayName = "AspectRatio";
