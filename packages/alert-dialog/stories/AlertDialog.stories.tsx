import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "../src";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
};
export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <button>Delete Item</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete this item.
        </AlertDialog.Description>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Delete</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <button>Delete Account</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content variant="destructive">
        <AlertDialog.Title>Delete Account</AlertDialog.Title>
        <AlertDialog.Description>
          This will permanently delete your account and all associated data. This cannot be undone.
        </AlertDialog.Description>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Delete Account</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

export const Small: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <button>Remove</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content size="sm">
        <AlertDialog.Title>Remove item?</AlertDialog.Title>
        <AlertDialog.Description>
          This item will be removed from your list.
        </AlertDialog.Description>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Remove</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};

export const Playground: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <button>Open AlertDialog</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to proceed?
        </AlertDialog.Description>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Confirm</AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};
