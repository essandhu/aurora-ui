import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@aurora-ui/core";
import styles from "./Toast.module.css";

type Severity = "info" | "success" | "warning" | "error";

export interface ToastProviderProps extends ToastPrimitive.ToastProviderProps {}

export interface ToastProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  severity?: Severity;
}

export interface ToastTitleProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {}

export interface ToastDescriptionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {}

export interface ToastActionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Action> {}

export interface ToastCloseProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {}

export const ToastProvider = ({
  children,
  ...props
}: ToastProviderProps) => (
  <ToastPrimitive.Provider {...props}>
    {children}
    <ToastPrimitive.Viewport className={styles.viewport} />
  </ToastPrimitive.Provider>
);

const ToastRoot = forwardRef<HTMLLIElement, ToastProps>(
  ({ className, severity = "info", ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-severity={severity}
      {...props}
    />
  )
);
ToastRoot.displayName = "Toast";

const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Title
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    />
  )
);
ToastTitle.displayName = "ToastTitle";

const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Description
      ref={ref}
      className={cn(styles.description, className)}
      {...props}
    />
  )
);
ToastDescription.displayName = "ToastDescription";

const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Action
      ref={ref}
      className={cn(styles.action, className)}
      {...props}
    />
  )
);
ToastAction.displayName = "ToastAction";

const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(
  ({ className, ...props }, ref) => (
    <ToastPrimitive.Close
      ref={ref}
      className={cn(styles.close, className)}
      {...props}
    />
  )
);
ToastClose.displayName = "ToastClose";

export const Toast = Object.assign(ToastRoot, {
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
});
