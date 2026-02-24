import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders trigger", () => {
    render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("shows content on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    await user.hover(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Tooltip text");
  });

  it("hides content when not hovering", () => {
    render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows content on focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Focus me</button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    await act(async () => {
      screen.getByRole("button").focus();
    });
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content className="custom">Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    await user.hover(screen.getByRole("button"));
    await screen.findByRole("tooltip");
    const content = document.querySelector("[data-side]");
    expect(content).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    await user.hover(screen.getByRole("button"));
    await screen.findByRole("tooltip");
    expect(await axe(container)).toHaveNoViolations();
  });

  // Ref forwarding
  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <button>Hover me</button>
        </Tooltip.Trigger>
        <Tooltip.Content ref={ref}>Tooltip text</Tooltip.Content>
      </Tooltip>
    );
    await user.hover(screen.getByRole("button"));
    await screen.findByRole("tooltip");
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
