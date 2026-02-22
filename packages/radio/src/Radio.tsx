import { forwardRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Radio.module.css";

export interface RadioGroupProps extends RadioGroupPrimitive.RadioGroupProps {
  size?: Size;
}

export interface RadioItemProps extends RadioGroupPrimitive.RadioGroupItemProps {}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ size = "md", className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-size={size}
      {...props}
    />
  )
);
RadioGroup.displayName = "RadioGroup";

export const RadioItem = forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(styles.item, className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={styles.indicator}>
        <span className={styles.dot} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
);
RadioItem.displayName = "RadioItem";
