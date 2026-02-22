import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
