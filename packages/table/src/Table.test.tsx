import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Table } from "./Table";

const renderTable = (props = {}) =>
  render(
    <Table {...props}>
      <Table.Caption>Test Table</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Value</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Item 1</Table.Cell>
          <Table.Cell>100</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Item 2</Table.Cell>
          <Table.Cell>200</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>300</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );

describe("Table", () => {
  it("renders table element", () => {
    renderTable();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders thead", () => {
    const { container } = renderTable();
    expect(container.querySelector("thead")).toBeInTheDocument();
  });

  it("renders tbody", () => {
    const { container } = renderTable();
    expect(container.querySelector("tbody")).toBeInTheDocument();
  });

  it("renders tfoot", () => {
    const { container } = renderTable();
    expect(container.querySelector("tfoot")).toBeInTheDocument();
  });

  it("renders tr elements", () => {
    renderTable();
    expect(screen.getAllByRole("row").length).toBeGreaterThan(0);
  });

  it("renders th elements", () => {
    renderTable();
    expect(screen.getAllByRole("columnheader").length).toBe(2);
  });

  it("renders td elements", () => {
    renderTable();
    expect(screen.getAllByRole("cell").length).toBe(6);
  });

  it("renders caption", () => {
    renderTable();
    expect(screen.getByText("Test Table").tagName).toBe("CAPTION");
  });

  it("defaults to default variant", () => {
    renderTable();
    expect(screen.getByRole("table")).toHaveAttribute("data-variant", "default");
  });

  it("applies striped variant", () => {
    renderTable({ variant: "striped" });
    expect(screen.getByRole("table")).toHaveAttribute("data-variant", "striped");
  });

  it("applies bordered variant", () => {
    renderTable({ variant: "bordered" });
    expect(screen.getByRole("table")).toHaveAttribute("data-variant", "bordered");
  });

  it("defaults to md size", () => {
    renderTable();
    expect(screen.getByRole("table")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    renderTable({ size: "sm" });
    expect(screen.getByRole("table")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    renderTable({ size: "lg" });
    expect(screen.getByRole("table")).toHaveAttribute("data-size", "lg");
  });

  it("applies stickyHeader", () => {
    renderTable({ stickyHeader: true });
    expect(screen.getByRole("table")).toHaveAttribute("data-sticky-header");
  });

  it("does not set sticky-header when false", () => {
    renderTable();
    expect(screen.getByRole("table")).not.toHaveAttribute("data-sticky-header");
  });
});

describe("Table ref forwarding", () => {
  it("forwards ref on table", () => {
    const ref = vi.fn();
    render(
      <Table ref={ref}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableElement));
  });

  it("forwards ref on header", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Header ref={ref}>
          <Table.Row>
            <Table.Head>A</Table.Head>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableSectionElement));
  });

  it("forwards ref on body", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Body ref={ref}>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableSectionElement));
  });

  it("forwards ref on footer", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Footer ref={ref}>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableSectionElement));
  });

  it("forwards ref on row", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row ref={ref}>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableRowElement));
  });

  it("forwards ref on head", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head ref={ref}>A</Table.Head>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableCellElement));
  });

  it("forwards ref on cell", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell ref={ref}>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableCellElement));
  });

  it("forwards ref on caption", () => {
    const ref = vi.fn();
    render(
      <Table>
        <Table.Caption ref={ref}>Caption</Table.Caption>
        <Table.Body>
          <Table.Row>
            <Table.Cell>A</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTableCaptionElement));
  });
});

describe("Table classNames", () => {
  it("merges className on table", () => {
    renderTable({ className: "custom" });
    expect(screen.getByRole("table")).toHaveClass("custom");
    expect(screen.getByRole("table")).toHaveClass("root");
  });
});

describe("Table accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = renderTable();
    expect(await axe(container)).toHaveNoViolations();
  });
});
