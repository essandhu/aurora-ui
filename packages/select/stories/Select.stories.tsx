import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../src";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
        <Select.Item value="option4">Option 4</Select.Item>
      </Select.Content>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="orange">Orange</Select.Item>
        </Select.Group>
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="broccoli">Broccoli</Select.Item>
          <Select.Item value="spinach">Spinach</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Select {...args}>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
      </Select.Content>
    </Select>
  ),
};
