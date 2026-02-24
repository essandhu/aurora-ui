import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  // Rendering
  it("renders a textbox", () => {
    render(<Textarea aria-label="Message" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders as a textarea element", () => {
    render(<Textarea aria-label="Message" />);
    expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA");
  });

  // Variants
  it("defaults to outline variant", () => {
    render(<Textarea aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "outline"
    );
  });

  it("applies filled variant", () => {
    render(<Textarea variant="filled" aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "filled"
    );
  });

  it("applies ghost variant", () => {
    render(<Textarea variant="ghost" aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "ghost"
    );
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Textarea aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Textarea size="sm" aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Textarea size="lg" aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "lg");
  });

  // Interactions
  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Message" />);
    await user.type(screen.getByRole("textbox"), "hello world");
    expect(screen.getByRole("textbox")).toHaveValue("hello world");
  });

  it("calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Textarea aria-label="Message" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  // States
  it("is disabled when disabled prop is true", () => {
    render(<Textarea disabled aria-label="Message" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("sets data-error when error prop is true", () => {
    render(<Textarea error aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-error");
  });

  it("sets data-autoresize when autoResize prop is true", () => {
    render(<Textarea autoResize aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-autoresize");
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Textarea ref={ref} aria-label="Message" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Textarea aria-label="Message" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Textarea className="custom" aria-label="Message" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom");
  });
});
