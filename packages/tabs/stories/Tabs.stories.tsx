import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../src";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
      <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
      <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
    </Tabs>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
      <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
      <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
    </Tabs>
  ),
};
