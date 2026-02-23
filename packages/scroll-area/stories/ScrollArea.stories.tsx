import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "../src";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  argTypes: {
    variant: { control: "select", options: ["default", "minimal"] },
  },
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

const longContent = Array.from({ length: 50 }, (_, i) => (
  <p key={i} style={{ margin: "8px 0" }}>Item {i + 1} — Lorem ipsum dolor sit amet</p>
));

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 300, width: 350, border: "1px solid var(--au-border-default)", borderRadius: 8, padding: 16 }}>
      {longContent}
    </ScrollArea>
  ),
};

export const Minimal: Story = {
  render: () => (
    <ScrollArea variant="minimal" style={{ height: 300, width: 350, border: "1px solid var(--au-border-default)", borderRadius: 8, padding: 16 }}>
      {longContent}
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea style={{ width: 350, border: "1px solid var(--au-border-default)", borderRadius: 8, padding: 16 }}>
      <div style={{ display: "flex", gap: 16, width: 1200 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ minWidth: 100, height: 100, background: "var(--au-bg-interactive)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <ScrollArea {...args} style={{ height: 300, width: 350, border: "1px solid var(--au-border-default)", borderRadius: 8, padding: 16 }}>
      {longContent}
    </ScrollArea>
  ),
  args: {
    variant: "default",
  },
};
