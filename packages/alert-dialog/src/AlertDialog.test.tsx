import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
  const renderAlertDialog = (props = {}, contentProps = {}) =>
    render(
      <AlertDialog {...props}>
        <AlertDialog.Trigger asChild>
          <button>Delete</button>
        </AlertDialog.Trigger>
        <AlertDialog.Content {...contentProps}>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
          <AlertDialog.Cancel asChild>
            <button>Cancel</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button>Confirm</button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog>
    );

  // Rendering
  it("renders trigger", () => {
    renderAlertDialog();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("does not show content initially", () => {
    renderAlertDialog();
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  // Interactions
  it("opens when trigger clicked", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("renders title and description when open", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("closes when cancel is clicked", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("closes when action is clicked", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    await user.click(screen.getByRole("button", { name: "Confirm" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderAlertDialog({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  // Variants
  it("defaults to default variant", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toHaveAttribute("data-variant", "default");
  });

  it("applies destructive variant", async () => {
    const user = userEvent.setup();
    renderAlertDialog({}, { variant: "destructive" });
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toHaveAttribute("data-variant", "destructive");
  });

  // Sizes
  it("defaults to md size", async () => {
    const user = userEvent.setup();
    renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", async () => {
    const user = userEvent.setup();
    renderAlertDialog({}, { size: "sm" });
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toHaveAttribute("data-size", "sm");
  });

  // Ref forwarding
  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialog.Trigger asChild>
          <button>Open</button>
        </AlertDialog.Trigger>
        <AlertDialog.Content ref={ref}>
          <AlertDialog.Title>Test</AlertDialog.Title>
          <AlertDialog.Description>Desc</AlertDialog.Description>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>OK</AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  // Accessibility
  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderAlertDialog();
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    renderAlertDialog({}, { className: "custom" });
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("alertdialog")).toHaveClass("custom");
  });
});
