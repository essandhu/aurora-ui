import { forwardRef, type HTMLAttributes, type ElementType, type ReactNode } from "react";
import { cn } from "@aurora-ui-react/core";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {}
export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {}
export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {}

export interface BreadcrumbLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  href?: string;
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn(styles.root, className)}
      {...props}
    />
  )
);
BreadcrumbRoot.displayName = "Breadcrumb";

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn(styles.list, className)} {...props} />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn(styles.item, className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ as: Component = "a", className, ...props }, ref) => (
    <Component ref={ref} className={cn(styles.link, className)} {...props} />
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children = "/", ...props }, ref) => (
    <span
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn(styles.separator, className)}
      {...props}
    >
      {children}
    </span>
  )
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn(styles.page, className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
  Page: BreadcrumbPage,
});
