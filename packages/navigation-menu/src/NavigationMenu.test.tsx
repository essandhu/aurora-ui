import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { NavigationMenu } from "./NavigationMenu";

describe("NavigationMenu", () => {
  const renderNav = () =>
    render(
      <NavigationMenu>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="/product-a">Product A</NavigationMenu.Link>
              <NavigationMenu.Link href="/product-b">Product B</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>
    );

  // Rendering
  it("renders navigation element", () => {
    renderNav();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders list items", () => {
    renderNav();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  // Interactions
  it("opens content when trigger clicked", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByText("Products"));
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    renderNav();
    await user.tab();
    expect(screen.getByText("Products")).toHaveFocus();
  });

  // Links
  it("renders direct links", () => {
    renderNav();
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toBeInTheDocument();
  });

  // Ref forwarding
  it("forwards ref on root", () => {
    const ref = vi.fn();
    render(
      <NavigationMenu ref={ref}>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = renderNav();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderNav();
    await user.click(screen.getByText("Products"));
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on root", () => {
    const { container } = render(
      <NavigationMenu className="custom">
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>
    );
    expect(container.firstChild).toHaveClass("custom");
  });

  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger>Menu</NavigationMenu.Trigger>
            <NavigationMenu.Content className="custom-content">
              <NavigationMenu.Link href="/">Item</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>
    );
    await user.click(screen.getByText("Menu"));
    const content = document.querySelector(".custom-content");
    expect(content).toBeInTheDocument();
  });
});
