import type { Meta, StoryObj } from "@storybook/react";
import { Sheet } from "../src";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
};
export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger asChild>
        <button>Open Sheet</button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Title>Sheet Title</Sheet.Title>
        <Sheet.Description>
          This is a side panel that slides in from the right edge.
        </Sheet.Description>
        <Sheet.Close asChild>
          <button>Close</button>
        </Sheet.Close>
      </Sheet.Content>
    </Sheet>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      {(["left", "right", "top", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <Sheet.Trigger asChild>
            <button>{side} Sheet</button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>
            <Sheet.Title>{side} Sheet</Sheet.Title>
            <Sheet.Description>This sheet slides in from the {side}.</Sheet.Description>
            <Sheet.Close asChild>
              <button>Close</button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Sheet key={size}>
          <Sheet.Trigger asChild>
            <button>{size} Sheet</button>
          </Sheet.Trigger>
          <Sheet.Content size={size}>
            <Sheet.Title>{size} Sheet</Sheet.Title>
            <Sheet.Description>A {size} sized sheet.</Sheet.Description>
            <Sheet.Close asChild>
              <button>Close</button>
            </Sheet.Close>
          </Sheet.Content>
        </Sheet>
      ))}
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Sheet {...args}>
      <Sheet.Trigger asChild>
        <button>Open Sheet</button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Title>Playground Sheet</Sheet.Title>
        <Sheet.Description>
          Experiment with this sheet using the Storybook controls.
        </Sheet.Description>
        <Sheet.Close asChild>
          <button>Close</button>
        </Sheet.Close>
      </Sheet.Content>
    </Sheet>
  ),
};
