import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../src";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Checkbox {...args} size="sm" defaultChecked />
      <Checkbox {...args} size="md" defaultChecked />
      <Checkbox {...args} size="lg" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Checkbox {...args} disabled />
      <Checkbox {...args} checked disabled />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    size: "md",
    checked: false,
    disabled: false,
  },
};
