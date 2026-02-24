import type { Meta, StoryObj } from "@storybook/react";
import { Command } from "../src";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
};
export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Command>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item>Calendar</Command.Item>
            <Command.Item>Search</Command.Item>
            <Command.Item>Settings</Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Actions">
            <Command.Item>New File</Command.Item>
            <Command.Item>New Window</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
};

export const Dialog: Story = {
  render: () => {
    return (
      <Command.Dialog open>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Actions">
            <Command.Item>New File</Command.Item>
            <Command.Item>Open File</Command.Item>
            <Command.Item>Save</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    );
  },
};

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>Nothing found.</Command.Empty>
          <Command.Item>Item A</Command.Item>
          <Command.Item>Item B</Command.Item>
          <Command.Item>Item C</Command.Item>
        </Command.List>
      </Command>
    </div>
  ),
};
