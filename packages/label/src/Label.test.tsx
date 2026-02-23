import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Label } from "./Label";

describe("Label", () => {
  // Rendering
  it("renders children as text content", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders as a label element", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email").tagName).toBe("LABEL");
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Label size="sm">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("data-size", "sm");
  });

  // Required
  it("shows asterisk when required", () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("sets data-required when required", () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText("Email").closest("label")).toHaveAttribute("data-required");
  });

  it("hides asterisk from assistive technology", () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  // States
  it("sets data-disabled when disabled", () => {
    render(<Label disabled>Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("data-disabled");
  });

  it("sets data-error when error", () => {
    render(<Label error>Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("data-error");
  });

  // Interactions
  it("associates with input via htmlFor", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="test-input">Email</Label>
        <input id="test-input" data-testid="input" />
      </>
    );
    await user.click(screen.getByText("Email"));
    expect(screen.getByTestId("input")).toHaveFocus();
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Label ref={ref}>Email</Label>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Label className="custom">Email</Label>);
    expect(screen.getByText("Email")).toHaveClass("custom");
  });
});
