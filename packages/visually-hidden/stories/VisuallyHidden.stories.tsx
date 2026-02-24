import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "../src";

const meta: Meta<typeof VisuallyHidden> = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
};
export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: () => (
    <div>
      <p>The text below is visually hidden but accessible to screen readers:</p>
      <VisuallyHidden>This text is only visible to screen readers</VisuallyHidden>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <button>
      <VisuallyHidden>Close dialog</VisuallyHidden>
      <span aria-hidden="true">✕</span>
    </button>
  ),
};

export const Playground: Story = {
  args: { children: "Hidden content" },
};
