import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Modal.module.css";

export interface ModalProps extends DialogPrimitive.DialogProps {}

export interface ModalContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: Size;
}

export interface ModalTitleProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export interface ModalDescriptionProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export interface ModalCloseProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {}

const ModalRoot = ({ children, ...props }: ModalProps) => (
  <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>
);

const ModalTrigger = DialogPrimitive.Trigger;

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, size = "md", ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(styles.content, className)}
        data-size={size}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);
ModalContent.displayName = "ModalContent";

const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    />
  )
);
ModalTitle.displayName = "ModalTitle";

const ModalDescription = forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn(styles.description, className)}
      {...props}
    />
  )
);
ModalDescription.displayName = "ModalDescription";

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Close
      ref={ref}
      className={cn(styles.close, className)}
      {...props}
    />
  )
);
ModalClose.displayName = "ModalClose";

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
});
