import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../src";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
    autoResize: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Textarea {...args} variant="outline" placeholder="Outline" />
      <Textarea {...args} variant="filled" placeholder="Filled" />
      <Textarea {...args} variant="ghost" placeholder="Ghost" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Textarea {...args} size="sm" placeholder="Small" />
      <Textarea {...args} size="md" placeholder="Medium" />
      <Textarea {...args} size="lg" placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Textarea {...args} placeholder="Default" />
      <Textarea {...args} error placeholder="Error" />
      <Textarea {...args} disabled placeholder="Disabled" />
    </div>
  ),
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    placeholder: "Auto-resizing textarea...",
  },
};

export const Playground: Story = {
  args: {
    placeholder: "Playground",
    variant: "outline",
    size: "md",
    error: false,
    disabled: false,
    autoResize: false,
  },
};
