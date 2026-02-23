import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  // Rendering
  it("renders a toolbar", () => {
    render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("renders buttons", () => {
    render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
      </Toolbar>
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  // Variants
  it("defaults to default variant", () => {
    const { container } = render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>
    );
    expect(container.firstChild).toHaveAttribute("data-variant", "default");
  });

  it("applies glass variant", () => {
    const { container } = render(
      <Toolbar variant="glass" aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>
    );
    expect(container.firstChild).toHaveAttribute("data-variant", "glass");
  });

  // Interactions
  it("calls onClick on button", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button onClick={onClick}>Bold</Toolbar.Button>
      </Toolbar>
    );
    await user.click(screen.getByRole("button", { name: "Bold" }));
    expect(onClick).toHaveBeenCalled();
  });

  // Toggle items
  it("renders toggle group with items", () => {
    render(
      <Toolbar aria-label="Formatting">
        <Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">
          <Toolbar.ToggleItem value="bold" aria-label="Bold">B</Toolbar.ToggleItem>
          <Toolbar.ToggleItem value="italic" aria-label="Italic">I</Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar>
    );
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Text formatting" })).toBeInTheDocument();
  });

  // Separator
  it("renders separator", () => {
    render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button>Cut</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Copy</Toolbar.Button>
      </Toolbar>
    );
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  // Link
  it("renders links", () => {
    render(
      <Toolbar aria-label="Actions">
        <Toolbar.Link href="#">Learn more</Toolbar.Link>
      </Toolbar>
    );
    expect(screen.getByRole("link", { name: "Learn more" })).toBeInTheDocument();
  });

  // Keyboard navigation
  it("supports arrow key navigation", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button>Cut</Toolbar.Button>
        <Toolbar.Button>Copy</Toolbar.Button>
        <Toolbar.Button>Paste</Toolbar.Button>
      </Toolbar>
    );
    const buttons = screen.getAllByRole("button");
    buttons[0].focus();
    await user.keyboard("{ArrowRight}");
    expect(buttons[1]).toHaveFocus();
  });

  // Ref forwarding
  it("forwards ref on root", () => {
    const ref = vi.fn();
    render(
      <Toolbar ref={ref} aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Toolbar aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Separator />
        <Toolbar.Button>Italic</Toolbar.Button>
      </Toolbar>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    const { container } = render(
      <Toolbar className="custom" aria-label="Actions">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar>
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
