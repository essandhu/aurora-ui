import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Agree" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("defaults to md size", () => {
    render(<Checkbox aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Checkbox size="sm" aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-size", "sm");
  });

  it("is disabled when disabled", () => {
    render(<Checkbox disabled aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} aria-label="Agree" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox aria-label="Agree" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Checkbox className="custom" aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom");
  });
});
