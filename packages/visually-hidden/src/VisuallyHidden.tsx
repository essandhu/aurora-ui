import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";

export interface VisuallyHiddenProps
  extends ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root> {}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  (props, ref) => <VisuallyHiddenPrimitive.Root ref={ref} {...props} />
);

VisuallyHidden.displayName = "VisuallyHidden";
