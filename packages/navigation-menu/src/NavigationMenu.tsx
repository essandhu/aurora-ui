import { forwardRef, type ComponentPropsWithoutRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@aurora-ui-react/core";
import styles from "./NavigationMenu.module.css";

export interface NavigationMenuProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {}

export interface NavigationMenuListProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {}

export interface NavigationMenuItemProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {}

export interface NavigationMenuTriggerProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {}

export interface NavigationMenuContentProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {}

export interface NavigationMenuLinkProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {}

export interface NavigationMenuViewportProps
  extends ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {}

const NavigationMenuRoot = forwardRef<HTMLElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
);
NavigationMenuRoot.displayName = "NavigationMenu";

const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.List
      ref={ref}
      className={cn(styles.list, className)}
      {...props}
    />
  )
);
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(styles.trigger, className)}
      {...props}
    >
      {children}
      <svg
        className={styles.chevron}
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
    </NavigationMenuPrimitive.Trigger>
  )
);
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(styles.content, className)}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(styles.link, className)}
      {...props}
    />
  )
);
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ className, ...props }, ref) => (
    <div className={styles.viewportPosition}>
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(styles.viewport, className)}
        {...props}
      />
    </div>
  )
);
NavigationMenuViewport.displayName = "NavigationMenuViewport";

const NavigationMenuIndicator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(styles.indicator, className)}
    {...props}
  >
    <div className={styles.indicatorArrow} />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

export const NavigationMenu = Object.assign(NavigationMenuRoot, {
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Trigger: NavigationMenuTrigger,
  Content: NavigationMenuContent,
  Link: NavigationMenuLink,
  Viewport: NavigationMenuViewport,
  Indicator: NavigationMenuIndicator,
});
