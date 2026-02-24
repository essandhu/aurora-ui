import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Sheet.module.css";

type Side = "left" | "right" | "top" | "bottom";

export interface SheetProps extends DialogPrimitive.DialogProps {}

export interface SheetContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: Side;
  size?: Size;
}

export interface SheetTitleProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export interface SheetDescriptionProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export interface SheetCloseProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {}

const SheetRoot = ({ children, ...props }: SheetProps) => (
  <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
);

const SheetTrigger = DialogPrimitive.Trigger;

const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = "right", size = "md", ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(styles.content, className)}
        data-side={side}
        data-size={size}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
SheetContent.displayName = "SheetContent";

const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    />
  )
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(styles.description, className)}
      {...props}
    />
  )
);
SheetDescription.displayName = "SheetDescription";

const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Close
      ref={ref}
      className={cn(styles.close, className)}
      {...props}
    />
  )
);
SheetClose.displayName = "SheetClose";

export const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose,
});
