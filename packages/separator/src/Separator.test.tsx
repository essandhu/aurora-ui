import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Separator } from "./Separator";

describe("Separator", () => {
  // Rendering
  it("renders a separator element", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders as decorative by default (no role)", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toBeInTheDocument();
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  // Variants
  it("defaults to default variant", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-variant", "default");
  });

  it("applies glow variant", () => {
    render(<Separator variant="glow" data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-variant", "glow");
  });

  // Orientation
  it("defaults to horizontal orientation", () => {
    render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("applies vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveAttribute("data-orientation", "vertical");
  });

  it("sets aria-orientation for non-decorative vertical separator", () => {
    render(<Separator orientation="vertical" decorative={false} />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Separator ref={ref} data-testid="sep" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Separator />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations when non-decorative", async () => {
    const { container } = render(<Separator decorative={false} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Separator className="custom" data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveClass("custom");
  });
});
