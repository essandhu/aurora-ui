import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders a switch", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("is off by default", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("defaults to md size", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Switch size="sm" aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-size", "sm");
  });

  it("is disabled when disabled", () => {
    render(<Switch disabled aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Switch ref={ref} aria-label="Toggle" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch aria-label="Toggle" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Switch className="custom" aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toHaveClass("custom");
  });
});
