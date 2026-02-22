import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a textbox", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("defaults to outline variant", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "outline"
    );
  });

  it("applies filled variant", () => {
    render(<Input variant="filled" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "filled"
    );
  });

  it("applies ghost variant", () => {
    render(<Input variant="ghost" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "ghost"
    );
  });

  it("defaults to md size", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Input size="sm" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "sm");
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" />);
    await user.type(screen.getByRole("textbox"), "hello");
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled aria-label="Name" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("sets data-error when error prop is true", () => {
    render(<Input error aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-error");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Input ref={ref} aria-label="Name" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Name" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Input className="custom" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom");
  });
});
