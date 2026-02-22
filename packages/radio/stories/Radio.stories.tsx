import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioItem } from "../src";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Radio",
  component: RadioGroup,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="option-1">
      <RadioItem value="option-1" />
      <RadioItem value="option-2" />
      <RadioItem value="option-3" />
    </RadioGroup>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <RadioGroup {...args} size="sm" defaultValue="a">
        <RadioItem value="a" />
        <RadioItem value="b" />
      </RadioGroup>
      <RadioGroup {...args} size="md" defaultValue="a">
        <RadioItem value="a" />
        <RadioItem value="b" />
      </RadioGroup>
      <RadioGroup {...args} size="lg" defaultValue="a">
        <RadioItem value="a" />
        <RadioItem value="b" />
      </RadioGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled defaultValue="option-1">
      <RadioItem value="option-1" />
      <RadioItem value="option-2" />
      <RadioItem value="option-3" />
    </RadioGroup>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioItem value="option-1" />
      <RadioItem value="option-2" />
      <RadioItem value="option-3" />
    </RadioGroup>
  ),
  args: {
    size: "md",
    defaultValue: "option-1",
    disabled: false,
  },
};
