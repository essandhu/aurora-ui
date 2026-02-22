import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@aurora-ui/core";
import styles from "./Accordion.module.css";

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  className?: string;
};
export interface AccordionItemProps extends AccordionPrimitive.AccordionItemProps {}
export interface AccordionTriggerProps extends AccordionPrimitive.AccordionTriggerProps {}
export interface AccordionContentProps extends AccordionPrimitive.AccordionContentProps {}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Root ref={ref} className={cn(styles.root, className)} {...(props as any)} />
  )
);
AccordionRoot.displayName = "Accordion";

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn(styles.item, className)} {...props} />
  )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger ref={ref} className={cn(styles.trigger, className)} {...props}>
        {children}
        <svg
          className={styles.chevron}
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.5 5.5L7 9L10.5 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Content ref={ref} className={cn(styles.content, className)} {...props} />
  )
);
AccordionContent.displayName = "AccordionContent";

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
