import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../src";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "bordered"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    stickyHeader: {
      control: "boolean",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { name: "Aurora", status: "Active", role: "Admin" },
  { name: "Nebula", status: "Inactive", role: "User" },
  { name: "Cosmos", status: "Active", role: "Editor" },
  { name: "Stellar", status: "Active", role: "User" },
];

export const Default: Story = {
  render: () => (
    <Table>
      <Table.Caption>Team Members</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table variant="striped">
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Table variant="bordered">
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sampleData.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const Playground: Story = {
  args: { variant: "default", size: "md", stickyHeader: false },
  render: (args) => (
    <Table {...args}>
      <Table.Caption>Playground Table</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Value</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Item A</Table.Cell>
          <Table.Cell>100</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Item B</Table.Cell>
          <Table.Cell>200</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};
