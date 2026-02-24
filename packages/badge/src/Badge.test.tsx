import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("defaults to solid variant", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-variant", "solid");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-variant", "outline");
  });

  it("applies glow variant", () => {
    render(<Badge variant="glow">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-variant", "glow");
  });

  it("defaults to md size", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Badge size="sm">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-size", "sm");
  });

  it("sets accent data attribute", () => {
    render(<Badge accent="emerald">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-accent", "emerald");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Tag</Badge>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Tag</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Badge className="custom">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("custom");
  });

  // Interactions
  it("forwards click events via spread props", () => {
    const onClick = vi.fn();
    render(<Badge onClick={onClick}>Tag</Badge>);
    fireEvent.click(screen.getByText("Tag"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  // States
  it("forwards aria-disabled attribute", () => {
    render(<Badge aria-disabled="true">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards hidden attribute", () => {
    const { container } = render(<Badge hidden>Tag</Badge>);
    expect(container.firstElementChild).toHaveAttribute("hidden");
  });
});
