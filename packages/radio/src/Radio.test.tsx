import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { RadioGroup, RadioItem } from "./Radio";

describe("RadioGroup", () => {
  it("renders a radiogroup", () => {
    render(
      <RadioGroup aria-label="Options">
        <RadioItem value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders radio items", () => {
    render(
      <RadioGroup aria-label="Options">
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("selects item on click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Options" onValueChange={onValueChange}>
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    await user.click(screen.getByRole("radio", { name: "Option B" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("supports defaultValue", () => {
    render(
      <RadioGroup aria-label="Options" defaultValue="b">
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio", { name: "Option B" })).toBeChecked();
  });

  it("defaults to md size", () => {
    render(
      <RadioGroup aria-label="Options">
        <RadioItem value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", "md");
  });

  it("disables items when disabled", () => {
    render(
      <RadioGroup aria-label="Options" disabled>
        <RadioItem value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio")).toBeDisabled();
  });

  it("forwards ref on RadioGroup", () => {
    const ref = vi.fn();
    render(
      <RadioGroup ref={ref} aria-label="Options">
        <RadioItem value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("forwards ref on RadioItem", () => {
    const ref = vi.fn();
    render(
      <RadioGroup aria-label="Options">
        <RadioItem ref={ref} value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <RadioGroup aria-label="Options">
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(
      <RadioGroup className="custom" aria-label="Options">
        <RadioItem value="a" aria-label="Option A" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("custom");
  });
});
