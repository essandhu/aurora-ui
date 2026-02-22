import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../src";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <button>Open Modal</button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Modal Title</Modal.Title>
        <Modal.Description>
          This is a description of the modal content. It provides context about
          what the modal is for.
        </Modal.Description>
        <Modal.Close asChild>
          <button>Close</button>
        </Modal.Close>
      </Modal.Content>
    </Modal>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Modal>
        <Modal.Trigger asChild>
          <button>Small Modal</button>
        </Modal.Trigger>
        <Modal.Content size="sm">
          <Modal.Title>Small Modal</Modal.Title>
          <Modal.Description>This is a small modal.</Modal.Description>
          <Modal.Close asChild>
            <button>Close</button>
          </Modal.Close>
        </Modal.Content>
      </Modal>

      <Modal>
        <Modal.Trigger asChild>
          <button>Medium Modal</button>
        </Modal.Trigger>
        <Modal.Content size="md">
          <Modal.Title>Medium Modal</Modal.Title>
          <Modal.Description>This is a medium modal.</Modal.Description>
          <Modal.Close asChild>
            <button>Close</button>
          </Modal.Close>
        </Modal.Content>
      </Modal>

      <Modal>
        <Modal.Trigger asChild>
          <button>Large Modal</button>
        </Modal.Trigger>
        <Modal.Content size="lg">
          <Modal.Title>Large Modal</Modal.Title>
          <Modal.Description>This is a large modal.</Modal.Description>
          <Modal.Close asChild>
            <button>Close</button>
          </Modal.Close>
        </Modal.Content>
      </Modal>
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Modal {...args}>
      <Modal.Trigger asChild>
        <button>Open Modal</button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Playground Modal</Modal.Title>
        <Modal.Description>
          Experiment with this modal using the Storybook controls.
        </Modal.Description>
        <Modal.Close asChild>
          <button>Close</button>
        </Modal.Close>
      </Modal.Content>
    </Modal>
  ),
};
