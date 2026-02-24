import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="/photo.jpg" alt="User" />);
    expect(screen.getByRole("img", { name: "User" })).toBeInTheDocument();
  });

  it("renders fallback initials when no src", () => {
    render(<Avatar fallback="JD" alt="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("defaults to circle variant", () => {
    render(<Avatar fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-variant",
      "circle"
    );
  });

  it("applies square variant", () => {
    render(<Avatar variant="square" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-variant",
      "square"
    );
  });

  it("defaults to md size", () => {
    render(<Avatar fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-size",
      "md"
    );
  });

  it("applies sm size", () => {
    render(<Avatar size="sm" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-size",
      "sm"
    );
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} fallback="JD" alt="User" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar fallback="JD" alt="User" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Avatar className="custom" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveClass("custom");
  });

  // Variants — accent
  it("sets accent data attribute", () => {
    render(<Avatar accent="emerald" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-accent",
      "emerald"
    );
  });

  // Sizes — lg
  it("applies lg size", () => {
    render(<Avatar size="lg" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-size",
      "lg"
    );
  });
});
