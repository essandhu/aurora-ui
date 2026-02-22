import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type PolymorphicProps<
  E extends ElementType,
  Props = Record<string, never>
> = Props &
  Omit<ComponentPropsWithoutRef<E>, keyof Props | "as"> & {
    as?: E;
    children?: ReactNode;
  };
