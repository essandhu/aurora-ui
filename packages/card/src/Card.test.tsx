import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  // Interactions
  it("forwards click events via spread props", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Card onClick={onClick}>Content</Card>);
    await user.click(screen.getByText("Content"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports keyboard interaction via onKeyDown", async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn();
    render(
      <Card tabIndex={0} onKeyDown={onKeyDown}>
        Content
      </Card>
    );
    const card = screen.getByText("Content").closest("[tabindex]")!;
    card.focus();
    await user.keyboard("{Enter}");
    expect(onKeyDown).toHaveBeenCalled();
  });

  // States
  it("forwards aria-disabled attribute", () => {
    const { container } = render(
      <Card aria-disabled="true">Content</Card>
    );
    expect(container.firstElementChild).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });
});
