import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Command } from "./Command";

describe("Command", () => {
  it("renders input", () => {
    render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item>Item 1</Command.Item>
        </Command.List>
      </Command>
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders items", () => {
    render(
      <Command>
        <Command.Input />
        <Command.List>
          <Command.Item>Item 1</Command.Item>
          <Command.Item>Item 2</Command.Item>
        </Command.List>
      </Command>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("typing filters items", async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item>Apple</Command.Item>
          <Command.Item>Banana</Command.Item>
          <Command.Item>Cherry</Command.Item>
        </Command.List>
      </Command>
    );
    await user.type(screen.getByPlaceholderText("Search..."), "app");
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("calls onSelect when item selected", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Command>
        <Command.Input />
        <Command.List>
          <Command.Item onSelect={onSelect}>Click Me</Command.Item>
        </Command.List>
      </Command>
    );
    await user.click(screen.getByText("Click Me"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("shows empty state when no matches", async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>No results found</Command.Empty>
          <Command.Item>Apple</Command.Item>
        </Command.List>
      </Command>
    );
    await user.type(screen.getByPlaceholderText("Search..."), "xyz");
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders groups with headings", () => {
    render(
      <Command>
        <Command.Input />
        <Command.List>
          <Command.Group heading="Fruits">
            <Command.Item>Apple</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    );
    expect(screen.getByText("Fruits")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("renders separator", () => {
    const { container } = render(
      <Command>
        <Command.Input />
        <Command.List>
          <Command.Item>A</Command.Item>
          <Command.Separator />
          <Command.Item>B</Command.Item>
        </Command.List>
      </Command>
    );
    expect(container.querySelector("[cmdk-separator]")).toBeInTheDocument();
  });

  it("forwards ref on root", () => {
    const ref = vi.fn();
    render(
      <Command ref={ref}>
        <Command.Input />
        <Command.List>
          <Command.Item>A</Command.Item>
        </Command.List>
      </Command>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("merges className on root", () => {
    const { container } = render(
      <Command className="custom">
        <Command.Input />
        <Command.List>
          <Command.Item>A</Command.Item>
        </Command.List>
      </Command>
    );
    const root = container.querySelector("[cmdk-root]");
    expect(root).toHaveClass("custom");
    expect(root).toHaveClass("root");
  });
});

describe("Command.Dialog", () => {
  it("opens and renders content", () => {
    render(
      <Command.Dialog open>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item>Action</Command.Item>
        </Command.List>
      </Command.Dialog>
    );
    expect(screen.getByPlaceholderText("Type a command...")).toBeInTheDocument();
  });

  it("closes when onOpenChange fires", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Command.Dialog open onOpenChange={onOpenChange}>
        <Command.Input placeholder="Type..." />
        <Command.List>
          <Command.Item>Action</Command.Item>
        </Command.List>
      </Command.Dialog>
    );
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("Command accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Command label="Command menu">
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Group heading="Actions">
            <Command.Item>New File</Command.Item>
            <Command.Item>Open File</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
