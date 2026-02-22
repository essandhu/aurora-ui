import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@aurora-ui/core";
import styles from "./Tabs.module.css";

export interface TabsProps extends TabsPrimitive.TabsProps {}
export interface TabsListProps extends TabsPrimitive.TabsListProps {}
export interface TabsTriggerProps extends TabsPrimitive.TabsTriggerProps {}
export interface TabsContentProps extends TabsPrimitive.TabsContentProps {}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Root ref={ref} className={cn(styles.root, className)} {...props} />
  )
);
TabsRoot.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.List ref={ref} className={cn(styles.list, className)} {...props} />
  )
);
TabsList.displayName = "TabsList";

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger ref={ref} className={cn(styles.trigger, className)} {...props} />
  )
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Content ref={ref} className={cn(styles.content, className)} {...props} />
  )
);
TabsContent.displayName = "TabsContent";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
