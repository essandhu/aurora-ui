import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import styles from "./Alert.module.css";

type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export interface AlertIconProps extends HTMLAttributes<HTMLSpanElement> {}

function getDefaultRole(variant: AlertVariant): string {
  return variant === "error" || variant === "warning" ? "alert" : "status";
}

const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "info", role, className, children, ...props }, ref) => (
    <div
      ref={ref}
      role={role ?? getDefaultRole(variant)}
      data-variant={variant}
      className={cn(styles.root, className)}
      {...props}
    >
      {children}
    </div>
  )
);
AlertRoot.displayName = "Alert";

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn(styles.title, className)} {...props} />
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn(styles.description, className)} {...props} />
  )
);
AlertDescription.displayName = "AlertDescription";

const AlertIcon = forwardRef<HTMLSpanElement, AlertIconProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(styles.icon, className)}
      {...props}
    />
  )
);
AlertIcon.displayName = "AlertIcon";

export const Alert = Object.assign(AlertRoot, {
  Title: AlertTitle,
  Description: AlertDescription,
  Icon: AlertIcon,
});
