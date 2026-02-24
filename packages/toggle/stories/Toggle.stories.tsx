import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "../src/Toggle";
import { ToggleGroup, ToggleGroupItem } from "../src/ToggleGroup";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    variant: { control: "select", options: ["outline", "ghost", "glow"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: { children: "B", "aria-label": "Bold" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Toggle variant="outline" aria-label="Bold">B</Toggle>
      <Toggle variant="ghost" aria-label="Bold">B</Toggle>
      <Toggle variant="glow" aria-label="Bold">B</Toggle>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Toggle size="sm" aria-label="Bold">B</Toggle>
      <Toggle size="md" aria-label="Bold">B</Toggle>
      <Toggle size="lg" aria-label="Bold">B</Toggle>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center">C</ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">R</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultipleGroup: Story = {
  render: () => (
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const GlowGroup: Story = {
  render: () => (
    <ToggleGroup type="single" variant="glow" defaultValue="center" aria-label="Alignment">
      <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center">C</ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">R</ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Playground: Story = {
  args: {
    children: "Toggle",
    variant: "outline",
    size: "md",
    disabled: false,
    "aria-label": "Toggle",
  },
};
