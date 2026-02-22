import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Select } from "./Select";

const renderSelect = (props = {}) =>
  render(
    <Select {...props}>
      <Select.Trigger aria-label="Fruit">
        <Select.Value placeholder="Select a fruit…" />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
        <Select.Item value="cherry">Cherry</Select.Item>
      </Select.Content>
    </Select>
  );

describe("Select", () => {
  it("renders a trigger", () => {
    renderSelect();
    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    renderSelect();
    expect(screen.getByText("Select a fruit…")).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("selects an item and updates value", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(screen.getByRole("combobox")).toHaveTextContent("Apple");
  });

  it("calls onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Banana" }));
    expect(onValueChange).toHaveBeenCalledWith("banana");
  });

  it("closes after selecting an item", async () => {
    const user = userEvent.setup();
    renderSelect();
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("supports disabled state on trigger", () => {
    render(
      <Select disabled>
        <Select.Trigger aria-label="Fruit">
          <Select.Value placeholder="Select a fruit…" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Content>
      </Select>
    );
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("supports disabled state on individual items", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Select onValueChange={onValueChange}>
        <Select.Trigger aria-label="Fruit">
          <Select.Value placeholder="Select a fruit…" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple" disabled>Apple</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
        </Select.Content>
      </Select>
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("forwards ref on trigger", () => {
    const ref = vi.fn();
    render(
      <Select>
        <Select.Trigger ref={ref} aria-label="Fruit">
          <Select.Value placeholder="Select a fruit…" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Content>
      </Select>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = renderSelect();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className on trigger", () => {
    render(
      <Select>
        <Select.Trigger className="custom" aria-label="Fruit">
          <Select.Value placeholder="Select a fruit…" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Content>
      </Select>
    );
    expect(screen.getByRole("combobox")).toHaveClass("custom");
  });

  it("renders groups with labels", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <Select.Trigger aria-label="Food">
          <Select.Value placeholder="Select…" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            <Select.Item value="apple">Apple</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
    );
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByText("Fruits")).toBeInTheDocument();
  });
});
