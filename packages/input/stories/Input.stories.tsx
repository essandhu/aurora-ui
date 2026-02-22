import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../src";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Input {...args} variant="outline" placeholder="Outline" />
      <Input {...args} variant="filled" placeholder="Filled" />
      <Input {...args} variant="ghost" placeholder="Ghost" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Input {...args} size="sm" placeholder="Small" />
      <Input {...args} size="md" placeholder="Medium" />
      <Input {...args} size="lg" placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Input {...args} disabled placeholder="Disabled" />
      <Input {...args} error placeholder="Error" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    placeholder: "Playground",
    variant: "outline",
    size: "md",
    error: false,
    disabled: false,
    type: "text",
  },
};
