import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@aurora-ui-react/core";
import styles from "./Collapsible.module.css";

export interface CollapsibleProps extends CollapsiblePrimitive.CollapsibleProps {
  className?: string;
}

export interface CollapsibleContentProps
  extends ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content> {}

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ className, ...props }, ref) => (
    <CollapsiblePrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      {...props}
    />
  )
);
CollapsibleRoot.displayName = "Collapsible";

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, ...props }, ref) => (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(styles.content, className)}
      {...props}
    />
  )
);
CollapsibleContent.displayName = "CollapsibleContent";

export const Collapsible = Object.assign(CollapsibleRoot, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});
