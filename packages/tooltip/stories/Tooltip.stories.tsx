import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../src";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    delayDuration: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Tooltip.Trigger asChild>
        <button>Hover me</button>
      </Tooltip.Trigger>
      <Tooltip.Content>This is a tooltip</Tooltip.Content>
    </Tooltip>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Tooltip.Trigger asChild>
        <button>Hover me</button>
      </Tooltip.Trigger>
      <Tooltip.Content>Playground tooltip content</Tooltip.Content>
    </Tooltip>
  ),
  args: {
    delayDuration: 200,
  },
};
