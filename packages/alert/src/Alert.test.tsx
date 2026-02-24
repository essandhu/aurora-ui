import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByText("Alert content")).toBeInTheDocument();
  });

  it("defaults to info variant", () => {
    render(<Alert>Info alert</Alert>);
    expect(screen.getByRole("status")).toHaveAttribute("data-variant", "info");
  });

  it("applies success variant", () => {
    render(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole("status")).toHaveAttribute("data-variant", "success");
  });

  it("applies warning variant", () => {
    render(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("data-variant", "warning");
  });

  it("applies error variant", () => {
    render(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole("alert")).toHaveAttribute("data-variant", "error");
  });

  it("uses role=status for info", () => {
    render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses role=status for success", () => {
    render(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses role=alert for warning", () => {
    render(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses role=alert for error", () => {
    render(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("allows role override", () => {
    render(<Alert variant="info" role="alert">Overridden</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Content</Alert>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("merges custom className", () => {
    render(<Alert className="custom">Content</Alert>);
    expect(screen.getByRole("status")).toHaveClass("custom");
    expect(screen.getByRole("status")).toHaveClass("root");
  });
});

describe("Alert.Title", () => {
  it("renders heading", () => {
    render(
      <Alert>
        <Alert.Title>Title</Alert.Title>
      </Alert>
    );
    expect(screen.getByText("Title").tagName).toBe("H5");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(
      <Alert>
        <Alert.Title ref={ref}>Title</Alert.Title>
      </Alert>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLHeadingElement));
  });

  it("merges className", () => {
    render(
      <Alert>
        <Alert.Title className="custom">Title</Alert.Title>
      </Alert>
    );
    expect(screen.getByText("Title")).toHaveClass("custom");
    expect(screen.getByText("Title")).toHaveClass("title");
  });
});

describe("Alert.Description", () => {
  it("renders paragraph", () => {
    render(
      <Alert>
        <Alert.Description>Description text</Alert.Description>
      </Alert>
    );
    expect(screen.getByText("Description text").tagName).toBe("P");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(
      <Alert>
        <Alert.Description ref={ref}>Desc</Alert.Description>
      </Alert>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLParagraphElement));
  });

  it("merges className", () => {
    render(
      <Alert>
        <Alert.Description className="custom">Desc</Alert.Description>
      </Alert>
    );
    expect(screen.getByText("Desc")).toHaveClass("custom");
    expect(screen.getByText("Desc")).toHaveClass("description");
  });
});

describe("Alert.Icon", () => {
  it("has aria-hidden=true", () => {
    render(
      <Alert>
        <Alert.Icon data-testid="icon">!</Alert.Icon>
      </Alert>
    );
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(
      <Alert>
        <Alert.Icon ref={ref}>!</Alert.Icon>
      </Alert>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("merges className", () => {
    render(
      <Alert>
        <Alert.Icon className="custom" data-testid="icon">!</Alert.Icon>
      </Alert>
    );
    expect(screen.getByTestId("icon")).toHaveClass("custom");
    expect(screen.getByTestId("icon")).toHaveClass("icon");
  });
});

describe("Alert accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert>
        <Alert.Icon>i</Alert.Icon>
        <div>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>This is an informational alert.</Alert.Description>
        </div>
      </Alert>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with error variant", async () => {
    const { container } = render(
      <Alert variant="error">
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>Something went wrong.</Alert.Description>
      </Alert>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
