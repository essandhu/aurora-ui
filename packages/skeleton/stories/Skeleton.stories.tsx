import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../src";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    variant: { control: "select", options: ["pulse", "shimmer", "glow"] },
    shape: { control: "select", options: ["text", "circular", "rectangular"] },
    animated: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      <Skeleton variant="pulse" />
      <Skeleton variant="shimmer" />
      <Skeleton variant="glow" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Skeleton shape="text" width={200} />
      <Skeleton shape="circular" />
      <Skeleton shape="rectangular" width={200} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}>
      <Skeleton shape="rectangular" height={180} variant="shimmer" />
      <Skeleton shape="text" width="80%" variant="shimmer" />
      <Skeleton shape="text" width="60%" variant="shimmer" />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Skeleton shape="circular" width={32} height={32} variant="shimmer" />
        <Skeleton shape="text" width={120} variant="shimmer" />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "pulse",
    shape: "text",
    animated: true,
  },
};
