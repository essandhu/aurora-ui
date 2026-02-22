import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProvider } from "../src";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toast severity="info" open={true} onOpenChange={() => {}}>
        <Toast.Title>Info Toast</Toast.Title>
        <Toast.Description>
          This is an informational message.
        </Toast.Description>
        <Toast.Close />
      </Toast>

      <Toast severity="success" open={true} onOpenChange={() => {}}>
        <Toast.Title>Success Toast</Toast.Title>
        <Toast.Description>
          The operation completed successfully.
        </Toast.Description>
        <Toast.Close />
      </Toast>

      <Toast severity="warning" open={true} onOpenChange={() => {}}>
        <Toast.Title>Warning Toast</Toast.Title>
        <Toast.Description>
          Please review before proceeding.
        </Toast.Description>
        <Toast.Close />
      </Toast>

      <Toast severity="error" open={true} onOpenChange={() => {}}>
        <Toast.Title>Error Toast</Toast.Title>
        <Toast.Description>
          Something went wrong. Please try again.
        </Toast.Description>
        <Toast.Action altText="Try again">Try Again</Toast.Action>
        <Toast.Close />
      </Toast>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    severity: "info",
  },
  argTypes: {
    severity: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
  render: (args) => (
    <Toast {...args} open={true} onOpenChange={() => {}}>
      <Toast.Title>Playground Toast</Toast.Title>
      <Toast.Description>
        Experiment with this toast using the Storybook controls.
      </Toast.Description>
      <Toast.Action altText="Undo">Undo</Toast.Action>
      <Toast.Close />
    </Toast>
  ),
};
