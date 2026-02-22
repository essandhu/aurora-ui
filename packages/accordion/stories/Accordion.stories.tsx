import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../src";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content for item 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content for item 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content for item 3</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content for item 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content for item 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content for item 3</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Accordion {...args} type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content for item 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content for item 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content for item 3</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
