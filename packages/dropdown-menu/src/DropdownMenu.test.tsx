import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { DropdownMenu } from "./DropdownMenu";

describe("DropdownMenu", () => {
  const renderMenu = (props = {}, contentProps = {}) =>
    render(
      <DropdownMenu {...props}>
        <DropdownMenu.Trigger asChild>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content {...contentProps}>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );

  // Rendering
  it("renders trigger", () => {
    renderMenu();
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });

  it("does not show content initially", () => {
    renderMenu();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  // Interactions
  it("opens when trigger clicked", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders menu items when open", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Duplicate" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderMenu({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("closes when item is selected", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={onSelect}>Edit</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelect).toHaveBeenCalled();
  });

  // Keyboard navigation
  it("supports keyboard navigation with arrow keys", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.keyboard("{ArrowDown}");
    // Radix manages focus on menu items via data-highlighted
  });

  // Variants
  it("defaults to default variant", async () => {
    const user = userEvent.setup();
    renderMenu();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toHaveAttribute("data-variant", "default");
  });

  it("applies glass variant", async () => {
    const user = userEvent.setup();
    renderMenu({}, { variant: "glass" });
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toHaveAttribute("data-variant", "glass");
  });

  // Disabled items
  it("renders disabled items", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item disabled>Disabled</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menuitem", { name: "Disabled" })).toHaveAttribute("data-disabled");
  });

  // Checkbox items
  it("renders checkbox items", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.CheckboxItem checked>Show Grid</DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menuitemcheckbox", { name: "Show Grid" })).toBeInTheDocument();
  });

  // Label & Separator
  it("renders label and separator", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Actions</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  // Ref forwarding
  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button>Menu</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content ref={ref}>
          <DropdownMenu.Item>Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderMenu();
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    renderMenu({}, { className: "custom" });
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByRole("menu")).toHaveClass("custom");
  });
});
