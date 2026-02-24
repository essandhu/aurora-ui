import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "../src";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>Actions</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const Glass: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>Actions</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="glass">
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithLabelsAndGroups: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>Options</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>File</DropdownMenu.Label>
        <DropdownMenu.Group>
          <DropdownMenu.Item>New</DropdownMenu.Item>
          <DropdownMenu.Item>Open</DropdownMenu.Item>
          <DropdownMenu.Item>Save</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Edit</DropdownMenu.Label>
        <DropdownMenu.Group>
          <DropdownMenu.Item>Undo</DropdownMenu.Item>
          <DropdownMenu.Item>Redo</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>View</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Panels</DropdownMenu.Label>
        <DropdownMenu.CheckboxItem checked>Sidebar</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem>Console</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem checked>Status Bar</DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>Actions</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Duplicate (disabled)</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button>Open Menu</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Item 3</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
};
