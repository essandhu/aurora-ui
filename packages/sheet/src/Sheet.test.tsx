import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Sheet } from "./Sheet";

describe("Sheet", () => {
  const renderSheet = (props = {}, contentProps = {}) =>
    render(
      <Sheet {...props}>
        <Sheet.Trigger asChild>
          <button>Open Sheet</button>
        </Sheet.Trigger>
        <Sheet.Content {...contentProps}>
          <Sheet.Title>Sheet Title</Sheet.Title>
          <Sheet.Description>Sheet description</Sheet.Description>
          <Sheet.Close asChild>
            <button>Close</button>
          </Sheet.Close>
        </Sheet.Content>
      </Sheet>
    );

  it("renders trigger", () => {
    renderSheet();
    expect(screen.getByRole("button", { name: "Open Sheet" })).toBeInTheDocument();
  });

  it("opens when trigger clicked", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("defaults to right side", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "right");
  });

  it("defaults to md size", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "md");
  });

  it("applies left side", async () => {
    const user = userEvent.setup();
    renderSheet({}, { side: "left" });
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "left");
  });

  it("applies top side", async () => {
    const user = userEvent.setup();
    renderSheet({}, { side: "top" });
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "top");
  });

  it("applies bottom side", async () => {
    const user = userEvent.setup();
    renderSheet({}, { side: "bottom" });
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "bottom");
  });

  it("applies size prop", async () => {
    const user = userEvent.setup();
    renderSheet({}, { size: "lg" });
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "lg");
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    renderSheet();
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderSheet({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <Sheet>
        <Sheet.Trigger asChild>
          <button>Open</button>
        </Sheet.Trigger>
        <Sheet.Content ref={ref}>
          <Sheet.Title>Test</Sheet.Title>
          <Sheet.Description>Desc</Sheet.Description>
        </Sheet.Content>
      </Sheet>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderSheet();
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    renderSheet({}, { className: "custom" });
    await user.click(screen.getByRole("button", { name: "Open Sheet" }));
    expect(screen.getByRole("dialog")).toHaveClass("custom");
  });
});
