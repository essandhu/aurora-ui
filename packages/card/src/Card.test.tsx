import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("defaults to surface variant", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "surface"
    );
  });

  it("applies elevated variant", () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "elevated"
    );
  });

  it("applies glass variant", () => {
    const { container } = render(<Card variant="glass">Content</Card>);
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "glass"
    );
  });

  it("renders as a different element with as prop", () => {
    render(<Card as="article">Content</Card>);
    expect(screen.getByText("Content").closest("article")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Card>Content</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    const { container } = render(<Card className="custom">Content</Card>);
    expect(container.firstElementChild).toHaveClass("custom");
  });
});
