import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuroraProvider } from "./AuroraProvider";

describe("AuroraProvider", () => {
  it("renders children", () => {
    render(
      <AuroraProvider>
        <span>Hello</span>
      </AuroraProvider>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sets data-aurora-theme to dark by default", () => {
    const { container } = render(
      <AuroraProvider>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-theme", "dark");
  });

  it("sets data-aurora-theme to light when mode is light", () => {
    const { container } = render(
      <AuroraProvider mode="light">
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-theme", "light");
  });

  it("sets data-aurora-accent to cyan by default", () => {
    const { container } = render(
      <AuroraProvider>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-accent", "cyan");
  });

  it("sets data-aurora-accent from prop", () => {
    const { container } = render(
      <AuroraProvider accent="violet">
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-accent", "violet");
  });

  it("sets data-aurora-radius from prop", () => {
    const { container } = render(
      <AuroraProvider radius="large">
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-radius", "large");
  });

  it("sets data-aurora-glow when glow is enabled (default)", () => {
    const { container } = render(
      <AuroraProvider>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-glow");
  });

  it("omits data-aurora-glow when glow is false", () => {
    const { container } = render(
      <AuroraProvider glow={false}>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).not.toHaveAttribute("data-aurora-glow");
  });
});
