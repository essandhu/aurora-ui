import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "../src";

const meta: Meta<typeof AspectRatio> = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  argTypes: {
    ratio: {
      control: "number",
    },
  },
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <AspectRatio ratio={16 / 9}>
        <div style={{ background: "var(--au-bg-surface)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <AspectRatio ratio={1}>
        <div style={{ background: "var(--au-bg-surface)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Playground: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div style={{ width: 400 }}>
      <AspectRatio {...args}>
        <div style={{ background: "var(--au-bg-surface)", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Content
        </div>
      </AspectRatio>
    </div>
  ),
};
