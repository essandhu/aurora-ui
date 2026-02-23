import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../src";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    variant: { control: "select", options: ["default", "glow"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [50], "aria-label": "Volume" },
};

export const Glow: Story = {
  args: { defaultValue: [50], variant: "glow", "aria-label": "Volume" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 300 }}>
      <Slider size="sm" defaultValue={[50]} aria-label="Small" />
      <Slider size="md" defaultValue={[50]} aria-label="Medium" />
      <Slider size="lg" defaultValue={[50]} aria-label="Large" />
    </div>
  ),
};

export const Range: Story = {
  args: { defaultValue: [25, 75], "aria-label": "Range" },
};

export const Disabled: Story = {
  args: { defaultValue: [50], disabled: true, "aria-label": "Disabled" },
};

export const Playground: Story = {
  args: {
    defaultValue: [50],
    variant: "default",
    size: "md",
    disabled: false,
    "aria-label": "Playground",
  },
};
