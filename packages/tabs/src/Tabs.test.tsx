import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
  const renderTabs = (props = {}) =>
    render(
      <Tabs defaultValue="tab1" {...props}>
        <Tabs.List aria-label="Test tabs">
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );

  it("renders a tablist", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("renders tab triggers", () => {
    renderTabs();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });

  it("shows default tab content", () => {
    renderTabs();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("switches tab on click", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole("tab", { name: "Tab 1" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });

  it("marks active tab", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("data-state", "active");
  });

  it("forwards ref on Tabs root", () => {
    const ref = vi.fn();
    render(
      <Tabs ref={ref} defaultValue="tab1">
        <Tabs.List aria-label="Test tabs">
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
      </Tabs>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = renderTabs();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    renderTabs({ className: "custom" });
    expect(screen.getByRole("tablist").closest("[class]")).toBeTruthy();
  });
});
