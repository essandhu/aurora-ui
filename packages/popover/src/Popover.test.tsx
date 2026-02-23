import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Popover } from "./Popover";

describe("Popover", () => {
  const renderPopover = (props = {}, contentProps = {}) =>
    render(
      <Popover {...props}>
        <Popover.Trigger asChild>
          <button>Open</button>
        </Popover.Trigger>
        <Popover.Content {...contentProps}>
          <p>Popover content</p>
          <Popover.Close asChild>
            <button>Close</button>
          </Popover.Close>
        </Popover.Content>
      </Popover>
    );

  // Rendering
  it("renders trigger", () => {
    renderPopover();
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("does not show content initially", () => {
    renderPopover();
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  // Interactions
  it("opens when trigger is clicked", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderPopover({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // Variants
  it("defaults to default variant", async () => {
    const user = userEvent.setup();
    renderPopover();
    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = screen.getByText("Popover content").closest("[data-variant]");
    expect(content).toHaveAttribute("data-variant", "default");
  });

  it("applies glass variant", async () => {
    const user = userEvent.setup();
    renderPopover({}, { variant: "glass" });
    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = screen.getByText("Popover content").closest("[data-variant]");
    expect(content).toHaveAttribute("data-variant", "glass");
  });

  // Ref forwarding
  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger asChild>
          <button>Open</button>
        </Popover.Trigger>
        <Popover.Content ref={ref}>Content</Popover.Content>
      </Popover>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderPopover();
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    renderPopover({}, { className: "custom" });
    await user.click(screen.getByRole("button", { name: "Open" }));
    const content = screen.getByText("Popover content").closest("[data-variant]");
    expect(content).toHaveClass("custom");
  });
});
