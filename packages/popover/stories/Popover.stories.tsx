import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "../src";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button>Open Popover</button>
      </Popover.Trigger>
      <Popover.Content>
        <p style={{ margin: 0 }}>This is popover content.</p>
      </Popover.Content>
    </Popover>
  ),
};

export const Glass: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button>Open Glass Popover</button>
      </Popover.Trigger>
      <Popover.Content variant="glass">
        <p style={{ margin: 0 }}>Glass surface popover.</p>
      </Popover.Content>
    </Popover>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button>With Arrow</button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Arrow />
        <p style={{ margin: 0 }}>Content with arrow.</p>
      </Popover.Content>
    </Popover>
  ),
};

export const WithClose: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button>Open</button>
      </Popover.Trigger>
      <Popover.Content>
        <p style={{ margin: 0 }}>Popover with close button.</p>
        <Popover.Close asChild>
          <button style={{ marginTop: 8 }}>Close</button>
        </Popover.Close>
      </Popover.Content>
    </Popover>
  ),
};

export const Playground: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <button>Playground Trigger</button>
      </Popover.Trigger>
      <Popover.Content>
        <p style={{ margin: 0 }}>Playground popover content.</p>
      </Popover.Content>
    </Popover>
  ),
};
