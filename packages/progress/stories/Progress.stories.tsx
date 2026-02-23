import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../src";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  argTypes: {
    variant: { control: "select", options: ["default", "glow"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
    indeterminate: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
};

export const Glow: Story = {
  args: { value: 60, variant: "glow" },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Progress size="sm" value={60} />
      <Progress size="md" value={60} />
      <Progress size="lg" value={60} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Progress variant="default" value={60} />
      <Progress variant="glow" value={60} />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    value: 50,
    variant: "default",
    size: "md",
    indeterminate: false,
  },
};
