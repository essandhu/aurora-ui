import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Toggle } from "./Toggle";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

describe("Toggle", () => {
  // Rendering
  it("renders a button", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  // Variants
  it("defaults to outline variant", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "outline");
  });

  it("applies ghost variant", () => {
    render(<Toggle variant="ghost" aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "ghost");
  });

  it("applies glow variant", () => {
    render(<Toggle variant="glow" aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-variant", "glow");
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Toggle size="sm" aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Toggle size="lg" aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
  });

  // Interactions
  it("toggles pressed state on click", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Bold">B</Toggle>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-state", "off");
    await user.click(btn);
    expect(btn).toHaveAttribute("data-state", "on");
    await user.click(btn);
    expect(btn).toHaveAttribute("data-state", "off");
  });

  it("calls onPressedChange", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle aria-label="Bold" onPressedChange={onPressedChange}>B</Toggle>);
    await user.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  // States
  it("supports controlled pressed state", () => {
    render(<Toggle pressed aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Toggle disabled aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Toggle ref={ref} aria-label="Bold">B</Toggle>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Toggle aria-label="Bold">B</Toggle>);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Toggle className="custom" aria-label="Bold">B</Toggle>);
    expect(screen.getByRole("button")).toHaveClass("custom");
  });
});

describe("ToggleGroup", () => {
  // Rendering
  it("renders a group", () => {
    render(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">C</ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">R</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  // Single selection
  it("supports single selection", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">C</ToggleGroupItem>
      </ToggleGroup>
    );
    await user.click(screen.getByRole("radio", { name: "Left" }));
    expect(screen.getByRole("radio", { name: "Left" })).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("radio", { name: "Center" })).toHaveAttribute("data-state", "off");
  });

  // Multiple selection
  it("supports multiple selection", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="multiple" aria-label="Formatting">
        <ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem>
      </ToggleGroup>
    );
    await user.click(screen.getByRole("button", { name: "Bold" }));
    await user.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("data-state", "on");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("data-state", "on");
  });

  // Variants
  it("defaults to outline variant", () => {
    const { container } = render(
      <ToggleGroup type="single" aria-label="Test">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(container.firstChild).toHaveAttribute("data-variant", "outline");
  });

  // Ref forwarding
  it("forwards ref on group", () => {
    const ref = vi.fn();
    render(
      <ToggleGroup ref={ref} type="single" aria-label="Test">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToggleGroup type="single" aria-label="Alignment">
        <ToggleGroupItem value="left" aria-label="Left">L</ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">C</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on group", () => {
    const { container } = render(
      <ToggleGroup type="single" className="custom" aria-label="Test">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
