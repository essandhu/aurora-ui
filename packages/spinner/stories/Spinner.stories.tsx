import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../src";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    variant: {
      control: "select",
      options: ["ring", "dots", "pulse"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    label: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {},
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Spinner {...args} variant="ring" />
      <Spinner {...args} variant="dots" />
      <Spinner {...args} variant="pulse" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "ring",
    size: "md",
    label: "Loading...",
  },
};
