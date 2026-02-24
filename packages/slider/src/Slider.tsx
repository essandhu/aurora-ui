import { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Slider.module.css";

type SliderVariant = "default" | "glow";

export interface SliderProps extends Omit<SliderPrimitive.SliderProps, "size"> {
  variant?: SliderVariant;
  size?: Size;
}

export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      variant = "default",
      size = "md",
      className,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      <SliderPrimitive.Track className={styles.track}>
        <SliderPrimitive.Range className={styles.range} />
      </SliderPrimitive.Track>
      {(props.defaultValue ?? props.value ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={styles.thumb}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        />
      ))}
    </SliderPrimitive.Root>
  )
);

Slider.displayName = "Slider";
