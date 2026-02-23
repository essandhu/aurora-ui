import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../src";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  argTypes: {
    variant: { control: "select", options: ["default", "glow"] },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    decorative: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {};

export const Glow: Story = {
  args: { variant: "glow" },
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", height: 40, alignItems: "center", gap: 12 }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Separator variant="default" />
      <Separator variant="glow" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "default",
    orientation: "horizontal",
    decorative: true,
  },
};
