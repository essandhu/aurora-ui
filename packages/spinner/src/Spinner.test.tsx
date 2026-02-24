import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  // Rendering
  it("renders with role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<Spinner label="Loading content" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading content"
    );
  });

  it("defaults label to Loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading"
    );
  });

  // Variants
  it("defaults to ring variant", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "ring"
    );
  });

  it("applies dots variant", () => {
    render(<Spinner variant="dots" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "dots"
    );
  });

  it("applies pulse variant", () => {
    render(<Spinner variant="pulse" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "pulse"
    );
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "lg");
  });

  // Ref forwarding
  it("forwards ref to the root element", () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Spinner className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("custom");
  });

  // States
  it("renders dot elements for dots variant", () => {
    render(<Spinner variant="dots" />);
    const status = screen.getByRole("status");
    const dots = status.querySelectorAll("span");
    expect(dots).toHaveLength(3);
  });
});
