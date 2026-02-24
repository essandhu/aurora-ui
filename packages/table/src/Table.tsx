import { forwardRef, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Table.module.css";

type TableVariant = "default" | "striped" | "bordered";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  variant?: TableVariant;
  size?: Size;
  stickyHeader?: boolean;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = "default", size = "md", stickyHeader, className, children, ...props }, ref) => (
    <div className={styles.wrapper}>
      <table
        ref={ref}
        className={cn(styles.root, className)}
        data-variant={variant}
        data-size={size}
        data-sticky-header={stickyHeader || undefined}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
TableRoot.displayName = "Table";

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn(styles.header, className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn(styles.body, className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn(styles.footer, className)} {...props} />
  )
);
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn(styles.row, className)} {...props} />
  )
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn(styles.head, className)} {...props} />
  )
);
TableHead.displayName = "TableHead";

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn(styles.cell, className)} {...props} />
  )
);
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn(styles.caption, className)} {...props} />
  )
);
TableCaption.displayName = "TableCaption";

export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});
