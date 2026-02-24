import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Collapsible } from "./Collapsible";

describe("Collapsible", () => {
  const renderCollapsible = (props = {}) =>
    render(
      <Collapsible {...props}>
        <Collapsible.Trigger asChild>
          <button>Toggle</button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <p>Hidden content</p>
        </Collapsible.Content>
      </Collapsible>
    );

  // Rendering
  it("renders trigger", () => {
    renderCollapsible();
    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
  });

  it("hides content by default", () => {
    renderCollapsible();
    const content = screen.queryByText("Hidden content");
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }
  });

  // Interactions
  it("shows content when trigger clicked", async () => {
    const user = userEvent.setup();
    renderCollapsible();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Hidden content")).toBeVisible();
  });

  it("hides content when clicked again", async () => {
    const user = userEvent.setup();
    renderCollapsible();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByText("Hidden content")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    const content = screen.queryByText("Hidden content");
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }
  });

  it("calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderCollapsible({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // Controlled
  it("supports controlled open state", () => {
    render(
      <Collapsible open>
        <Collapsible.Trigger asChild>
          <button>Toggle</button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <p>Visible content</p>
        </Collapsible.Content>
      </Collapsible>
    );
    expect(screen.getByText("Visible content")).toBeVisible();
  });

  // Ref forwarding
  it("forwards ref on root", () => {
    const ref = vi.fn();
    render(
      <Collapsible ref={ref}>
        <Collapsible.Trigger asChild>
          <button>Toggle</button>
        </Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <Collapsible>
        <Collapsible.Trigger asChild>
          <button>Toggle</button>
        </Collapsible.Trigger>
        <Collapsible.Content ref={ref}>Content</Collapsible.Content>
      </Collapsible>
    );
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = renderCollapsible();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderCollapsible();
    await user.click(screen.getByRole("button", { name: "Toggle" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on root", () => {
    const { container } = render(
      <Collapsible className="custom">
        <Collapsible.Trigger asChild>
          <button>Toggle</button>
        </Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );
    expect(container.firstChild).toHaveClass("custom");
  });
});
