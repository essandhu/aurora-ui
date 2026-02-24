import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "../src";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <Form style={{ maxWidth: 400 }}>
      <Form.Field name="email" required>
        <Form.Label>Email</Form.Label>
        <Form.Description>We will never share your email.</Form.Description>
        <input type="email" placeholder="you@example.com" />
      </Form.Field>
      <Form.Field name="password" required>
        <Form.Label>Password</Form.Label>
        <input type="password" placeholder="Enter password" />
      </Form.Field>
      <button type="submit">Submit</button>
    </Form>
  ),
};

export const WithError: Story = {
  render: () => (
    <Form style={{ maxWidth: 400 }}>
      <Form.Field name="email" error="Email is required" required>
        <Form.Label>Email</Form.Label>
        <input type="email" placeholder="you@example.com" />
        <Form.Message />
      </Form.Field>
    </Form>
  ),
};

export const WithSuccess: Story = {
  render: () => (
    <Form style={{ maxWidth: 400 }}>
      <Form.Field name="username">
        <Form.Label>Username</Form.Label>
        <input type="text" defaultValue="aurora_user" />
        <Form.Message type="success">Username is available!</Form.Message>
      </Form.Field>
    </Form>
  ),
};

export const Playground: Story = {
  render: () => (
    <Form style={{ maxWidth: 400 }}>
      <Form.Field name="name">
        <Form.Label>Full Name</Form.Label>
        <Form.Description>Enter your legal name</Form.Description>
        <input type="text" />
      </Form.Field>
      <button type="submit">Submit</button>
    </Form>
  ),
};
