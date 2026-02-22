import { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@aurora-ui-react/core";
import styles from "./Tooltip.module.css";

export interface TooltipProps extends TooltipPrimitive.TooltipProps {}

export interface TooltipContentProps extends TooltipPrimitive.TooltipContentProps {}

const TooltipRoot = ({ children, ...props }: TooltipProps) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(styles.content, className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = "TooltipContent";

export const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});
