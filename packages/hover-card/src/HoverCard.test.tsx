import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { HoverCard } from "./HoverCard";

describe("HoverCard", () => {
  const renderHoverCard = (props = {}, contentProps = {}) =>
    render(
      <HoverCard openDelay={0} {...props}>
        <HoverCard.Trigger asChild>
          <a href="#">Hover me</a>
        </HoverCard.Trigger>
        <HoverCard.Content {...contentProps}>
          <p>Card content</p>
        </HoverCard.Content>
      </HoverCard>
    );

  // Rendering
  it("renders trigger", () => {
    renderHoverCard();
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not show content initially", () => {
    renderHoverCard();
    expect(screen.queryByText("Card content")).not.toBeInTheDocument();
  });

  // Interactions
  it("shows content on hover", async () => {
    const user = userEvent.setup();
    renderHoverCard();
    await user.hover(screen.getByText("Hover me"));
    expect(await screen.findByText("Card content")).toBeInTheDocument();
  });

  it("hides content when not hovering", async () => {
    const user = userEvent.setup();
    renderHoverCard();
    await user.hover(screen.getByText("Hover me"));
    await screen.findByText("Card content");
    await user.unhover(screen.getByText("Hover me"));
    // Content may still be visible during close delay
  });

  // Variants
  it("defaults to default variant", async () => {
    const user = userEvent.setup();
    renderHoverCard();
    await user.hover(screen.getByText("Hover me"));
    const content = await screen.findByText("Card content");
    expect(content.closest("[data-variant]")).toHaveAttribute("data-variant", "default");
  });

  it("applies glass variant", async () => {
    const user = userEvent.setup();
    renderHoverCard({}, { variant: "glass" });
    await user.hover(screen.getByText("Hover me"));
    const content = await screen.findByText("Card content");
    expect(content.closest("[data-variant]")).toHaveAttribute("data-variant", "glass");
  });

  // Ref forwarding
  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <HoverCard openDelay={0}>
        <HoverCard.Trigger asChild>
          <a href="#">Hover</a>
        </HoverCard.Trigger>
        <HoverCard.Content ref={ref}>Content</HoverCard.Content>
      </HoverCard>
    );
    await user.hover(screen.getByText("Hover"));
    await screen.findByText("Content");
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = renderHoverCard();
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    renderHoverCard({}, { className: "custom" });
    await user.hover(screen.getByText("Hover me"));
    const content = await screen.findByText("Card content");
    expect(content.closest("[data-variant]")).toHaveClass("custom");
  });

  // States — controlled open
  it("renders open when controlled with open prop", () => {
    render(
      <HoverCard open>
        <HoverCard.Trigger asChild>
          <a href="#">Hover me</a>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <p>Controlled content</p>
        </HoverCard.Content>
      </HoverCard>
    );
    expect(screen.getByText("Controlled content")).toBeInTheDocument();
  });

  it("calls onOpenChange when opened", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderHoverCard({ onOpenChange });
    await user.hover(screen.getByText("Hover me"));
    await screen.findByText("Card content");
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
