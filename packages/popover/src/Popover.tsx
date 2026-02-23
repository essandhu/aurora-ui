import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@aurora-ui-react/core";
import styles from "./Popover.module.css";

export interface PopoverProps extends PopoverPrimitive.PopoverProps {}

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  variant?: "default" | "glass";
}

const PopoverRoot = ({ children, ...props }: PopoverProps) => (
  <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>
);

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ variant = "default", className, children, sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(styles.content, className)}
        data-variant={variant}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = "PopoverContent";

const PopoverArrow = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <PopoverPrimitive.Arrow
    ref={ref}
    className={cn(styles.arrow, className)}
    {...props}
  />
));
PopoverArrow.displayName = "PopoverArrow";

const PopoverClose = PopoverPrimitive.Close;

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Close: PopoverClose,
});
