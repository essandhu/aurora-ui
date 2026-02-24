import type { Meta, StoryObj } from "@storybook/react";
import { NavigationMenu } from "../src";

const meta: Meta<typeof NavigationMenu> = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
};
export default meta;
type Story = StoryObj<typeof NavigationMenu>;

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 16, display: "grid", gap: 8, width: 400 }}>
              <NavigationMenu.Link href="/analytics">Analytics</NavigationMenu.Link>
              <NavigationMenu.Link href="/automation">Automation</NavigationMenu.Link>
              <NavigationMenu.Link href="/reports">Reports</NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 16, display: "grid", gap: 8, width: 300 }}>
              <NavigationMenu.Link href="/docs">Documentation</NavigationMenu.Link>
              <NavigationMenu.Link href="/blog">Blog</NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="/pricing">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ),
};

export const WithIndicator: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Getting Started</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 16, width: 400 }}>
              <p style={{ margin: 0 }}>Quick start guide and installation instructions.</p>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="/components">Components</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Indicator />
      </NavigationMenu.List>
    </NavigationMenu>
  ),
};

export const Playground: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Menu</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div style={{ padding: 16, width: 300 }}>
              <NavigationMenu.Link href="/item-1">Item 1</NavigationMenu.Link>
              <NavigationMenu.Link href="/item-2">Item 2</NavigationMenu.Link>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="/direct">Direct Link</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ),
};
