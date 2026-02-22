import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../src";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
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
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Switch {...args} size="sm" defaultChecked />
      <Switch {...args} size="md" defaultChecked />
      <Switch {...args} size="lg" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Switch {...args} disabled />
      <Switch {...args} checked disabled />
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
