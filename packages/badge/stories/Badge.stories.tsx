import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "glow"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    accent: {
      control: "select",
      options: ["cyan", "violet", "magenta", "emerald", "amber"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Badge {...args} variant="solid">Solid</Badge>
      <Badge {...args} variant="outline">Outline</Badge>
      <Badge {...args} variant="glow">Glow</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge {...args} size="sm">Small</Badge>
      <Badge {...args} size="md">Medium</Badge>
      <Badge {...args} size="lg">Large</Badge>
    </div>
  ),
};

export const AllAccents: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Badge {...args} accent="cyan">Cyan</Badge>
      <Badge {...args} accent="violet">Violet</Badge>
      <Badge {...args} accent="magenta">Magenta</Badge>
      <Badge {...args} accent="emerald">Emerald</Badge>
      <Badge {...args} accent="amber">Amber</Badge>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "solid",
    size: "md",
    accent: "cyan",
  },
};
