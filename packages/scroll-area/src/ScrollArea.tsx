import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@aurora-ui-react/core";
import styles from "./ScrollArea.module.css";

type ScrollAreaVariant = "default" | "minimal";

export interface ScrollAreaProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  variant?: ScrollAreaVariant;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ variant = "default", className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className={styles.viewport}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        orientation="vertical"
        className={styles.scrollbar}
        data-orientation="vertical"
      >
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar
        orientation="horizontal"
        className={styles.scrollbar}
        data-orientation="horizontal"
      >
        <ScrollAreaPrimitive.Thumb className={styles.thumb} />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className={styles.corner} />
    </ScrollAreaPrimitive.Root>
  )
);

ScrollArea.displayName = "ScrollArea";
