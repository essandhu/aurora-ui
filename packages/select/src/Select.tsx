import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@aurora-ui/core";
import styles from "./Select.module.css";

export interface SelectProps extends SelectPrimitive.SelectProps {}

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

export interface SelectContentProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

export interface SelectGroupProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}

export interface SelectLabelProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}

const SelectRoot = ({ children, ...props }: SelectProps) => (
  <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
);

const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(styles.trigger, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className={styles.icon}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = SelectPrimitive.Value;

const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = "popper", sideOffset = 4, ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(styles.content, className)}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectPrimitive.Viewport className={styles.viewport}>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(styles.item, className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles.itemIndicator}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = "SelectItem";

const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Group
      ref={ref}
      className={cn(styles.group, className)}
      {...props}
    />
  )
);
SelectGroup.displayName = "SelectGroup";

const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(styles.label, className)}
      {...props}
    />
  )
);
SelectLabel.displayName = "SelectLabel";

const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(styles.separator, className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
});
