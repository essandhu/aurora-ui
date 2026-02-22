import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../src";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    variant: {
      control: "select",
      options: ["surface", "elevated", "glass"],
    },
    as: {
      control: "select",
      options: ["div", "section", "article"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "This is a card component with some example content inside.",
    variant: "surface",
    style: { padding: 24 },
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Card {...args} variant="surface" style={{ padding: 24 }}>
        Surface
      </Card>
      <Card {...args} variant="elevated" style={{ padding: 24 }}>
        Elevated
      </Card>
      <Card {...args} variant="glass" style={{ padding: 24 }}>
        Glass
      </Card>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Playground card content",
    variant: "surface",
    as: "div",
    style: { padding: 24 },
  },
};
