import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../src";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => (
    <Alert>
      <div>
        <Alert.Title>Heads up!</Alert.Title>
        <Alert.Description>
          You can add components to your app using the cli.
        </Alert.Description>
      </div>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Alert variant="info">
        <div>
          <Alert.Title>Info</Alert.Title>
          <Alert.Description>Informational message.</Alert.Description>
        </div>
      </Alert>
      <Alert variant="success">
        <div>
          <Alert.Title>Success</Alert.Title>
          <Alert.Description>Operation completed successfully.</Alert.Description>
        </div>
      </Alert>
      <Alert variant="warning">
        <div>
          <Alert.Title>Warning</Alert.Title>
          <Alert.Description>Please review before proceeding.</Alert.Description>
        </div>
      </Alert>
      <Alert variant="error">
        <div>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>Something went wrong.</Alert.Description>
        </div>
      </Alert>
    </div>
  ),
};

export const Playground: Story = {
  args: { variant: "info" },
  render: (args) => (
    <Alert {...args}>
      <div>
        <Alert.Title>Alert Title</Alert.Title>
        <Alert.Description>Alert description text.</Alert.Description>
      </div>
    </Alert>
  ),
};
