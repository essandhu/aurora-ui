import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard } from "../src";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCard.Trigger asChild>
        <a href="#" style={{ color: "var(--au-accent-text)" }}>@aurora-ui</a>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong>Aurora UI</strong>
          <p style={{ margin: 0, fontSize: 13, color: "var(--au-text-secondary)" }}>
            A luminous, dark-first React component library.
          </p>
        </div>
      </HoverCard.Content>
    </HoverCard>
  ),
};

export const Glass: Story = {
  render: () => (
    <HoverCard>
      <HoverCard.Trigger asChild>
        <a href="#" style={{ color: "var(--au-accent-text)" }}>Hover for glass card</a>
      </HoverCard.Trigger>
      <HoverCard.Content variant="glass">
        <p style={{ margin: 0 }}>Glass surface hover card with prominent glow.</p>
      </HoverCard.Content>
    </HoverCard>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <HoverCard>
      <HoverCard.Trigger asChild>
        <a href="#" style={{ color: "var(--au-accent-text)" }}>With arrow</a>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <HoverCard.Arrow />
        <p style={{ margin: 0 }}>Content with arrow pointer.</p>
      </HoverCard.Content>
    </HoverCard>
  ),
};

export const Playground: Story = {
  render: () => (
    <HoverCard>
      <HoverCard.Trigger asChild>
        <a href="#" style={{ color: "var(--au-accent-text)" }}>Hover me</a>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <p style={{ margin: 0 }}>Playground hover card.</p>
      </HoverCard.Content>
    </HoverCard>
  ),
};
