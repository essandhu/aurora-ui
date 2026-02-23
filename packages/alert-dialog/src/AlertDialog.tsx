import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./AlertDialog.module.css";

type AlertDialogVariant = "default" | "destructive";

export interface AlertDialogProps extends AlertDialogPrimitive.AlertDialogProps {}

export interface AlertDialogContentProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  variant?: AlertDialogVariant;
  size?: Extract<Size, "sm" | "md">;
}

export interface AlertDialogTitleProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {}

export interface AlertDialogDescriptionProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {}

export interface AlertDialogActionProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {}

export interface AlertDialogCancelProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {}

const AlertDialogRoot = ({ children, ...props }: AlertDialogProps) => (
  <AlertDialogPrimitive.Root {...props}>{children}</AlertDialogPrimitive.Root>
);

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={styles.overlay} />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(styles.content, className)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  )
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogTitle = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    />
  )
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn(styles.description, className)}
      {...props}
    />
  )
);
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(styles.action, className)}
      {...props}
    />
  )
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(styles.cancel, className)}
      {...props}
    />
  )
);
AlertDialogCancel.displayName = "AlertDialogCancel";

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
