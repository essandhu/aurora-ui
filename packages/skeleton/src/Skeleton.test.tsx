import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  // Rendering
  it("renders a div", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("is hidden from assistive technology", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  // Variants
  it("defaults to pulse variant", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("data-variant", "pulse");
  });

  it("applies shimmer variant", () => {
    const { container } = render(<Skeleton variant="shimmer" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "shimmer");
  });

  it("applies glow variant", () => {
    const { container } = render(<Skeleton variant="glow" />);
    expect(container.firstChild).toHaveAttribute("data-variant", "glow");
  });

  // Shapes
  it("defaults to text shape", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("data-shape", "text");
  });

  it("applies circular shape", () => {
    const { container } = render(<Skeleton shape="circular" />);
    expect(container.firstChild).toHaveAttribute("data-shape", "circular");
  });

  it("applies rectangular shape", () => {
    const { container } = render(<Skeleton shape="rectangular" />);
    expect(container.firstChild).toHaveAttribute("data-shape", "rectangular");
  });

  // Custom dimensions
  it("applies custom width and height", () => {
    const { container } = render(<Skeleton width={200} height={40} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("200px");
    expect(el.style.height).toBe("40px");
  });

  it("applies custom borderRadius", () => {
    const { container } = render(<Skeleton borderRadius={8} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.borderRadius).toBe("8px");
  });

  // Animation
  it("is animated by default", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("data-animated");
  });

  it("can disable animation", () => {
    const { container } = render(<Skeleton animated={false} />);
    expect(container.firstChild).not.toHaveAttribute("data-animated");
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Skeleton ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Skeleton />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    const { container } = render(<Skeleton className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});
