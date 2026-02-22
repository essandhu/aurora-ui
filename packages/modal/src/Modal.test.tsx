import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Modal } from "./Modal";

describe("Modal", () => {
  const renderModal = (props = {}) =>
    render(
      <Modal {...props}>
        <Modal.Trigger asChild>
          <button>Open Modal</button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Title>Test Title</Modal.Title>
          <Modal.Description>Test description</Modal.Description>
          <Modal.Close asChild>
            <button>Close</button>
          </Modal.Close>
        </Modal.Content>
      </Modal>
    );

  it("renders trigger", () => {
    renderModal();
    expect(screen.getByRole("button", { name: "Open Modal" })).toBeInTheDocument();
  });

  it("opens when trigger clicked", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title and description", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("closes on close button", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    renderModal({ onOpenChange });
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("supports size prop on content", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <Modal.Trigger asChild>
          <button>Open</button>
        </Modal.Trigger>
        <Modal.Content size="lg">
          <Modal.Title>Large Modal</Modal.Title>
          <Modal.Description>Large description</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "lg");
  });

  it("defaults to md size", async () => {
    const user = userEvent.setup();
    renderModal();
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-size", "md");
  });

  it("forwards ref on content", async () => {
    const ref = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal>
        <Modal.Trigger asChild>
          <button>Open</button>
        </Modal.Trigger>
        <Modal.Content ref={ref}>
          <Modal.Title>Test</Modal.Title>
          <Modal.Description>Desc</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = renderModal();
    await user.click(screen.getByRole("button", { name: "Open Modal" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className on content", async () => {
    const user = userEvent.setup();
    render(
      <Modal>
        <Modal.Trigger asChild>
          <button>Open</button>
        </Modal.Trigger>
        <Modal.Content className="custom">
          <Modal.Title>Test</Modal.Title>
          <Modal.Description>Desc</Modal.Description>
        </Modal.Content>
      </Modal>
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveClass("custom");
  });
});
