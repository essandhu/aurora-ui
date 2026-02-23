import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible } from "../src";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible>
      <Collapsible.Trigger asChild>
        <button>Toggle content</button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div style={{ padding: "12px 0" }}>
          <p>This content can be collapsed and expanded.</p>
          <p>It uses a height animation with luminance fade-in.</p>
        </div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <Collapsible.Trigger asChild>
        <button>Toggle content</button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div style={{ padding: "12px 0" }}>
          <p>This content is open by default.</p>
        </div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const Playground: Story = {
  render: () => (
    <Collapsible>
      <Collapsible.Trigger asChild>
        <button>Click to toggle</button>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div style={{ padding: "12px 0" }}>
          <p>Collapsible playground content.</p>
        </div>
      </Collapsible.Content>
    </Collapsible>
  ),
};
