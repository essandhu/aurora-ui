import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
  const renderAccordion = (props = {}) =>
    render(
      <Accordion type="single" collapsible {...props}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Section 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

  it("renders accordion triggers", () => {
    renderAccordion();
    expect(screen.getByRole("button", { name: "Section 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Section 2" })).toBeInTheDocument();
  });

  it("content is hidden by default", () => {
    renderAccordion();
    const content = screen.queryByText("Content 1");
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }
  });

  it("expands on click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("collapses on second click when collapsible", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    expect(screen.getByText("Content 1")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    const content = screen.queryByText("Content 1");
    if (content) {
      expect(content).not.toBeVisible();
    } else {
      expect(content).not.toBeInTheDocument();
    }
  });

  it("supports multiple type", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="multiple">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Section 2</Accordion.Trigger>
          <Accordion.Content>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    await user.click(screen.getByRole("button", { name: "Section 2" }));
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(
      <Accordion ref={ref} type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Section 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = renderAccordion();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    const { container } = renderAccordion({ className: "custom" });
    expect(container.firstChild).toHaveClass("custom");
  });

  // Variants — Radix data-state
  it("trigger has data-state closed by default", () => {
    renderAccordion();
    expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
      "data-state",
      "closed"
    );
  });

  it("trigger has data-state open when expanded", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
      "data-state",
      "open"
    );
  });
});
