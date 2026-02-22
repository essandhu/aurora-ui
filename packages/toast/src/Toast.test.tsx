import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Toast, ToastProvider } from "./Toast";

describe("Toast", () => {
  const renderToast = (props = {}, providerProps = {}) =>
    render(
      <ToastProvider {...providerProps}>
        <Toast open {...props}>
          <Toast.Title>Notification</Toast.Title>
          <Toast.Description>Something happened</Toast.Description>
          <Toast.Action altText="Undo">Undo</Toast.Action>
          <Toast.Close aria-label="Close">×</Toast.Close>
        </Toast>
      </ToastProvider>
    );

  it("renders toast title and description", () => {
    renderToast();
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(screen.getByText("Something happened")).toBeInTheDocument();
  });

  it("renders action button", () => {
    renderToast();
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });

  it("renders close button", () => {
    renderToast();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onOpenChange when close is clicked", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderToast({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("defaults to info severity", () => {
    renderToast();
    const toast = screen.getByText("Notification").closest("[data-severity]");
    expect(toast).toHaveAttribute("data-severity", "info");
  });

  it("supports success severity", () => {
    renderToast({ severity: "success" });
    const toast = screen.getByText("Notification").closest("[data-severity]");
    expect(toast).toHaveAttribute("data-severity", "success");
  });

  it("supports warning severity", () => {
    renderToast({ severity: "warning" });
    const toast = screen.getByText("Notification").closest("[data-severity]");
    expect(toast).toHaveAttribute("data-severity", "warning");
  });

  it("supports error severity", () => {
    renderToast({ severity: "error" });
    const toast = screen.getByText("Notification").closest("[data-severity]");
    expect(toast).toHaveAttribute("data-severity", "error");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(
      <ToastProvider>
        <Toast open ref={ref}>
          <Toast.Title>Test</Toast.Title>
          <Toast.Description>Desc</Toast.Description>
        </Toast>
      </ToastProvider>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLIElement));
  });

  it("renders multiple toasts", () => {
    render(
      <ToastProvider>
        <Toast open severity="info">
          <Toast.Title>First</Toast.Title>
          <Toast.Description>First toast</Toast.Description>
        </Toast>
        <Toast open severity="success">
          <Toast.Title>Second</Toast.Title>
          <Toast.Description>Second toast</Toast.Description>
        </Toast>
      </ToastProvider>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderToast();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    renderToast({ className: "custom" });
    const toast = screen.getByText("Notification").closest("[data-severity]");
    expect(toast).toHaveClass("custom");
  });

  it("auto-dismisses after duration", async () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    renderToast({ duration: 100, onOpenChange });

    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
    vi.useRealTimers();
  });
});
