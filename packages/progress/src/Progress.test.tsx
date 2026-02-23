import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Progress } from "./Progress";

describe("Progress", () => {
  // Rendering
  it("renders a progressbar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders indicator child", () => {
    const { container } = render(<Progress value={50} />);
    expect(container.querySelector(".indicator")).toBeInTheDocument();
  });

  // Variants
  it("defaults to default variant", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-variant", "default");
  });

  it("applies glow variant", () => {
    render(<Progress variant="glow" value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-variant", "glow");
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Progress size="sm" value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Progress size="lg" value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-size", "lg");
  });

  // Value
  it("sets aria-valuenow from value prop", () => {
    render(<Progress value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("sets aria-valuemax from max prop", () => {
    render(<Progress value={50} max={200} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "200");
  });

  it("translates indicator based on value", () => {
    const { container } = render(<Progress value={60} />);
    const indicator = container.querySelector(".indicator") as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-40%)");
  });

  // Indeterminate
  it("sets data-indeterminate attribute", () => {
    render(<Progress indeterminate />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-indeterminate");
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Progress ref={ref} value={50} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={50} aria-label="Loading progress" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations when indeterminate", async () => {
    const { container } = render(<Progress indeterminate aria-label="Loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Progress value={50} className="custom" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom");
  });
});
