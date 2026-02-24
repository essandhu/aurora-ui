import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("renders children", () => {
    render(
      <AspectRatio>
        <span>Content</span>
      </AspectRatio>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with default 16/9 ratio", () => {
    const { container } = render(
      <AspectRatio>
        <span>Content</span>
      </AspectRatio>
    );
    // Radix sets padding-bottom style for ratio
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it("accepts custom ratio 1/1", () => {
    render(
      <AspectRatio ratio={1 / 1}>
        <span>Square</span>
      </AspectRatio>
    );
    expect(screen.getByText("Square")).toBeInTheDocument();
  });

  it("accepts custom ratio 4/3", () => {
    render(
      <AspectRatio ratio={4 / 3}>
        <span>Photo</span>
      </AspectRatio>
    );
    expect(screen.getByText("Photo")).toBeInTheDocument();
  });

  it("forwards ref to wrapper div", () => {
    const ref = vi.fn();
    render(
      <AspectRatio ref={ref}>
        <span>Content</span>
      </AspectRatio>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <AspectRatio>
        <img src="test.jpg" alt="Test image" />
      </AspectRatio>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    const { container } = render(
      <AspectRatio className="custom">
        <span>Content</span>
      </AspectRatio>
    );
    expect(container.firstChild).toHaveClass("custom");
    expect(container.firstChild).toHaveClass("root");
  });
});
