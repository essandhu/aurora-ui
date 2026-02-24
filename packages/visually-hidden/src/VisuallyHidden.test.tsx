import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("renders children in the DOM", () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);
    expect(screen.getByText("Hidden text")).toBeInTheDocument();
  });

  it("content is accessible via getByText", () => {
    render(<VisuallyHidden>Screen reader only</VisuallyHidden>);
    expect(screen.getByText("Screen reader only")).toBeInTheDocument();
  });

  it("forwards ref to HTMLSpanElement", () => {
    const ref = vi.fn();
    render(<VisuallyHidden ref={ref}>Hidden</VisuallyHidden>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("spreads extra props through", () => {
    render(<VisuallyHidden data-testid="vh">Hidden</VisuallyHidden>);
    expect(screen.getByTestId("vh")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <button>
        <VisuallyHidden>Click me</VisuallyHidden>
        Icon
      </button>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
