import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../src";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    fallback: { control: "text" },
    variant: {
      control: "select",
      options: ["circle", "square"],
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
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: "Aurora User",
    fallback: "AU",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User Avatar",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar {...args} variant="circle" alt="Circle Avatar" fallback="CI" />
      <Avatar {...args} variant="square" alt="Square Avatar" fallback="SQ" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar {...args} size="sm" alt="Small Avatar" fallback="SM" />
      <Avatar {...args} size="md" alt="Medium Avatar" fallback="MD" />
      <Avatar {...args} size="lg" alt="Large Avatar" fallback="LG" />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "Playground Avatar",
    fallback: "PG",
    variant: "circle",
    size: "md",
    accent: "cyan",
  },
};
