import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../src";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: "Email address" },
};

export const Required: Story = {
  args: { children: "Email address", required: true },
};

export const Disabled: Story = {
  args: { children: "Email address", disabled: true },
};

export const Error: Story = {
  args: { children: "Email address", error: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Label>Default</Label>
      <Label required>Required</Label>
      <Label disabled>Disabled</Label>
      <Label error>Error</Label>
      <Label required error>Required + Error</Label>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Label text",
    size: "md",
    required: false,
    disabled: false,
    error: false,
  },
};
