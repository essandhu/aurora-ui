import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cn } from "@aurora-ui-react/core";
import styles from "./Toolbar.module.css";

type ToolbarVariant = "default" | "glass";

export interface ToolbarProps extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> {
  variant?: ToolbarVariant;
}

export interface ToolbarButtonProps
  extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button> {}

export interface ToolbarLinkProps
  extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.Link> {}

export interface ToolbarSeparatorProps
  extends ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator> {}

export type ToolbarToggleGroupProps =
  | ToolbarPrimitive.ToolbarToggleGroupSingleProps
  | ToolbarPrimitive.ToolbarToggleGroupMultipleProps;

export type ToolbarToggleItemProps = ToolbarPrimitive.ToolbarToggleItemProps;

const ToolbarRoot = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ variant = "default", className, ...props }, ref) => (
    <ToolbarPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      {...props}
    />
  )
);
ToolbarRoot.displayName = "Toolbar";

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Button
      ref={ref}
      className={cn(styles.button, className)}
      {...props}
    />
  )
);
ToolbarButton.displayName = "ToolbarButton";

const ToolbarLink = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Link
      ref={ref}
      className={cn(styles.link, className)}
      {...props}
    />
  )
);
ToolbarLink.displayName = "ToolbarLink";

const ToolbarSeparator = forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn(styles.separator, className)}
      {...props}
    />
  )
);
ToolbarSeparator.displayName = "ToolbarSeparator";

const ToolbarToggleGroup = forwardRef<HTMLDivElement, ToolbarToggleGroupProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.ToggleGroup
      ref={ref}
      className={cn(styles.toggleGroup, className)}
      {...(props as any)}
    />
  )
);
ToolbarToggleGroup.displayName = "ToolbarToggleGroup";

const ToolbarToggleItem = forwardRef<HTMLButtonElement, ToolbarToggleItemProps>(
  ({ className, ...props }, ref) => (
    <ToolbarPrimitive.ToggleItem
      ref={ref}
      className={cn(styles.toggleItem, className)}
      {...props}
    />
  )
);
ToolbarToggleItem.displayName = "ToolbarToggleItem";

export const Toolbar = Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  Link: ToolbarLink,
  Separator: ToolbarSeparator,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
});
