import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@aurora-ui-react/core";
import styles from "./Command.module.css";

export interface CommandProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive> {}

export interface CommandInputProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {}

export interface CommandListProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

export interface CommandEmptyProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

export interface CommandGroupProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}

export interface CommandItemProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {}

export interface CommandSeparatorProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

export interface CommandDialogProps extends DialogPrimitive.DialogProps {}

const CommandRoot = forwardRef<HTMLDivElement, CommandProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive
      ref={ref}
      className={cn(styles.root, className)}
      {...props}
    />
  )
);
CommandRoot.displayName = "Command";

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => (
    <div className={styles.inputWrapper}>
      <svg
        className={styles.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <CommandPrimitive.Input
        ref={ref}
        className={cn(styles.input, className)}
        {...props}
      />
    </div>
  )
);
CommandInput.displayName = "CommandInput";

const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn(styles.list, className)}
      {...props}
    />
  )
);
CommandList.displayName = "CommandList";

const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn(styles.empty, className)}
      {...props}
    />
  )
);
CommandEmpty.displayName = "CommandEmpty";

const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(styles.group, className)}
      {...props}
    />
  )
);
CommandGroup.displayName = "CommandGroup";

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(styles.item, className)}
      {...props}
    />
  )
);
CommandItem.displayName = "CommandItem";

const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn(styles.separator, className)}
      {...props}
    />
  )
);
CommandSeparator.displayName = "CommandSeparator";

const CommandDialog = ({ children, ...props }: CommandDialogProps) => (
  <DialogPrimitive.Root {...props}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.dialogOverlay} />
      <DialogPrimitive.Content
        className={styles.dialogContent}
        aria-describedby={undefined}
      >
        <DialogPrimitive.Title className={styles.dialogTitle}>
          Command Palette
        </DialogPrimitive.Title>
        <CommandPrimitive className={styles.dialogCommand}>
          {children}
        </CommandPrimitive>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

export const Command = Object.assign(CommandRoot, {
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
});
