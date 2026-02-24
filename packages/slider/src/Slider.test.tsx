import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Slider } from "./Slider";

describe("Slider", () => {
  // Rendering
  it("renders a slider", () => {
    render(<Slider defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  // Variants
  it("defaults to default variant", () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    expect(container.firstChild).toHaveAttribute("data-variant", "default");
  });

  it("applies glow variant", () => {
    const { container } = render(<Slider variant="glow" defaultValue={[50]} />);
    expect(container.firstChild).toHaveAttribute("data-variant", "glow");
  });

  // Sizes
  it("defaults to md size", () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    expect(container.firstChild).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    const { container } = render(<Slider size="sm" defaultValue={[50]} />);
    expect(container.firstChild).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    const { container } = render(<Slider size="lg" defaultValue={[50]} />);
    expect(container.firstChild).toHaveAttribute("data-size", "lg");
  });

  // Value
  it("sets aria-valuenow from value", () => {
    render(<Slider value={[75]} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "75");
  });

  it("sets aria-valuemin and aria-valuemax", () => {
    render(<Slider defaultValue={[50]} min={10} max={90} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "90");
  });

  // Interactions
  it("calls onValueChange", async () => {
    const onValueChange = vi.fn();
    render(<Slider defaultValue={[50]} onValueChange={onValueChange} />);
    const slider = screen.getByRole("slider");
    // Keyboard interaction
    await userEvent.setup().type(slider, "{ArrowRight}");
    expect(onValueChange).toHaveBeenCalled();
  });

  // States
  it("is disabled when disabled prop is set", () => {
    const { container } = render(<Slider disabled defaultValue={[50]} />);
    expect(container.firstChild).toHaveAttribute("data-disabled", "");
  });

  // Orientation
  it("supports vertical orientation", () => {
    render(<Slider orientation="vertical" defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-orientation", "vertical");
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Slider ref={ref} defaultValue={[50]} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Slider defaultValue={[50]} aria-label="Volume" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    const { container } = render(<Slider className="custom" defaultValue={[50]} />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
