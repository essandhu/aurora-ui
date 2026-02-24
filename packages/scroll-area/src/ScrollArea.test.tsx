import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { ScrollArea } from "./ScrollArea";

describe("ScrollArea", () => {
  // Rendering
  it("renders children", () => {
    render(
      <ScrollArea style={{ height: 200 }}>
        <p>Content inside scroll area</p>
      </ScrollArea>
    );
    expect(screen.getByText("Content inside scroll area")).toBeInTheDocument();
  });

  it("renders viewport element", () => {
    const { container } = render(
      <ScrollArea style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>
    );
    expect(container.querySelector("[data-radix-scroll-area-viewport]")).toBeInTheDocument();
  });

  // Variants
  it("defaults to default variant", () => {
    const { container } = render(
      <ScrollArea style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>
    );
    expect(container.firstChild).toHaveAttribute("data-variant", "default");
  });

  it("applies minimal variant", () => {
    const { container } = render(
      <ScrollArea variant="minimal" style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>
    );
    expect(container.firstChild).toHaveAttribute("data-variant", "minimal");
  });

  // Ref forwarding
  it("forwards ref", () => {
    const ref = vi.fn();
    render(
      <ScrollArea ref={ref} style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(
      <ScrollArea style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    const { container } = render(
      <ScrollArea className="custom" style={{ height: 200 }}>
        <p>Content</p>
      </ScrollArea>
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
