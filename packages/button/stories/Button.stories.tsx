import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "glow"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    accent: {
      control: "select",
      options: ["cyan", "violet", "magenta", "emerald", "amber"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} variant="solid">Solid</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="glow">Glow</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};

export const AllAccents: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} variant="glow" accent="cyan">Cyan</Button>
      <Button {...args} variant="glow" accent="violet">Violet</Button>
      <Button {...args} variant="glow" accent="magenta">Magenta</Button>
      <Button {...args} variant="glow" accent="emerald">Emerald</Button>
      <Button {...args} variant="glow" accent="amber">Amber</Button>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} disabled>Disabled</Button>
      <Button {...args} loading>Loading</Button>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "solid",
    size: "md",
    accent: "cyan",
    loading: false,
    disabled: false,
  },
};
