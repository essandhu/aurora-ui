import { forwardRef } from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Toggle.module.css";

type ToggleGroupVariant = "outline" | "ghost" | "glow";

export type ToggleGroupProps = ToggleGroupPrimitive.ToggleGroupSingleProps | ToggleGroupPrimitive.ToggleGroupMultipleProps;

export interface ToggleGroupItemProps extends ToggleGroupPrimitive.ToggleGroupItemProps {
  variant?: ToggleGroupVariant;
  size?: Size;
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps & { variant?: ToggleGroupVariant; size?: Size }>(
  ({ variant = "outline", size = "md", className, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(styles.group, className)}
      data-variant={variant}
      data-size={size}
      {...(props as any)}
    />
  )
);
ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, ...props }, ref) => (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(styles.groupItem, className)}
      {...props}
    />
  )
);
ToggleGroupItem.displayName = "ToggleGroupItem";
