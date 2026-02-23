import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar } from "../src";

const meta: Meta<typeof Toolbar> = {
  title: "Components/Toolbar",
  component: Toolbar,
  argTypes: {
    variant: { control: "select", options: ["default", "glass"] },
  },
};
export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  render: () => (
    <Toolbar aria-label="Formatting">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem value="bold" aria-label="Bold">B</Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="italic" aria-label="Italic">I</Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="underline" aria-label="Underline">U</Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator />
      <Toolbar.Button>Cut</Toolbar.Button>
      <Toolbar.Button>Copy</Toolbar.Button>
      <Toolbar.Button>Paste</Toolbar.Button>
    </Toolbar>
  ),
};

export const Glass: Story = {
  render: () => (
    <Toolbar variant="glass" aria-label="Formatting">
      <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
        <Toolbar.ToggleItem value="bold" aria-label="Bold">B</Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="italic" aria-label="Italic">I</Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator />
      <Toolbar.Button>Save</Toolbar.Button>
      <Toolbar.Link href="#">Help</Toolbar.Link>
    </Toolbar>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Toolbar {...args} aria-label="Toolbar">
      <Toolbar.Button>Action 1</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Action 2</Toolbar.Button>
    </Toolbar>
  ),
  args: { variant: "default" },
};
