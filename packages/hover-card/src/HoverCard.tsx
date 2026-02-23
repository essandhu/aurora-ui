import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@aurora-ui-react/core";
import styles from "./HoverCard.module.css";

export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {}

export interface HoverCardContentProps
  extends ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
  variant?: "default" | "glass";
}

const HoverCardRoot = ({ openDelay = 300, ...props }: HoverCardProps) => (
  <HoverCardPrimitive.Root openDelay={openDelay} {...props} />
);

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ variant = "default", className, children, sideOffset = 4, ...props }, ref) => (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(styles.content, className)}
        data-variant={variant}
        {...props}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  )
);
HoverCardContent.displayName = "HoverCardContent";

const HoverCardArrow = forwardRef<
  SVGSVGElement,
  ComponentPropsWithoutRef<typeof HoverCardPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Arrow
    ref={ref}
    className={cn(styles.arrow, className)}
    {...props}
  />
));
HoverCardArrow.displayName = "HoverCardArrow";

export const HoverCard = Object.assign(HoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
});
