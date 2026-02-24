import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Form, useFormField } from "./Form";

describe("Form", () => {
  it("renders a form element", () => {
    render(<Form data-testid="form">content</Form>);
    expect(screen.getByTestId("form").tagName).toBe("FORM");
  });

  it("forwards ref on form", () => {
    const ref = vi.fn();
    render(<Form ref={ref}>content</Form>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLFormElement));
  });

  it("fires onSubmit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it("merges className on form", () => {
    render(<Form className="custom" data-testid="form">content</Form>);
    expect(screen.getByTestId("form")).toHaveClass("custom");
    expect(screen.getByTestId("form")).toHaveClass("root");
  });
});

describe("Form.Field", () => {
  it("renders a div", () => {
    render(
      <Form>
        <Form.Field name="email" data-testid="field">
          content
        </Form.Field>
      </Form>
    );
    expect(screen.getByTestId("field").tagName).toBe("DIV");
  });

  it("forwards ref on field", () => {
    const ref = vi.fn();
    render(
      <Form>
        <Form.Field ref={ref} name="email">
          content
        </Form.Field>
      </Form>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("merges className on field", () => {
    render(
      <Form>
        <Form.Field name="email" className="custom" data-testid="field">
          content
        </Form.Field>
      </Form>
    );
    expect(screen.getByTestId("field")).toHaveClass("custom");
    expect(screen.getByTestId("field")).toHaveClass("field");
  });
});

describe("Form.Label", () => {
  it("renders label with htmlFor matching field id", () => {
    render(
      <Form>
        <Form.Field name="email">
          <Form.Label>Email</Form.Label>
          <input />
        </Form.Field>
      </Form>
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for");
    expect(label.getAttribute("for")).toContain("email");
  });

  it("forwards ref on label", () => {
    const ref = vi.fn();
    render(
      <Form>
        <Form.Field name="test">
          <Form.Label ref={ref}>Test</Form.Label>
        </Form.Field>
      </Form>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLabelElement));
  });

  it("passes required to Label", () => {
    render(
      <Form>
        <Form.Field name="email" required>
          <Form.Label>Email</Form.Label>
        </Form.Field>
      </Form>
    );
    const label = screen.getByText("Email").closest("label");
    expect(label).toHaveAttribute("data-required");
  });

  it("passes error to Label", () => {
    render(
      <Form>
        <Form.Field name="email" error="Required">
          <Form.Label>Email</Form.Label>
        </Form.Field>
      </Form>
    );
    const label = screen.getByText("Email").closest("label");
    expect(label).toHaveAttribute("data-error");
  });
});

describe("Form.Description", () => {
  it("renders with correct id for aria linkage", () => {
    render(
      <Form>
        <Form.Field name="email">
          <Form.Description>Enter your email</Form.Description>
        </Form.Field>
      </Form>
    );
    const desc = screen.getByText("Enter your email");
    expect(desc.id).toContain("email");
    expect(desc.id).toContain("description");
  });

  it("forwards ref on description", () => {
    const ref = vi.fn();
    render(
      <Form>
        <Form.Field name="test">
          <Form.Description ref={ref}>Help text</Form.Description>
        </Form.Field>
      </Form>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLParagraphElement));
  });

  it("merges className on description", () => {
    render(
      <Form>
        <Form.Field name="email">
          <Form.Description className="custom">Help</Form.Description>
        </Form.Field>
      </Form>
    );
    const desc = screen.getByText("Help");
    expect(desc).toHaveClass("custom");
    expect(desc).toHaveClass("description");
  });
});

describe("Form.Message", () => {
  it("renders error from field context", () => {
    render(
      <Form>
        <Form.Field name="email" error="Email is required">
          <Form.Message />
        </Form.Field>
      </Form>
    );
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("returns null when no error and no children", () => {
    const { container } = render(
      <Form>
        <Form.Field name="email">
          <Form.Message />
        </Form.Field>
      </Form>
    );
    expect(container.querySelector("[role='alert']")).not.toBeInTheDocument();
  });

  it("renders children when provided", () => {
    render(
      <Form>
        <Form.Field name="email">
          <Form.Message>Custom message</Form.Message>
        </Form.Field>
      </Form>
    );
    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });

  it("defaults to error type", () => {
    render(
      <Form>
        <Form.Field name="email" error="Error">
          <Form.Message />
        </Form.Field>
      </Form>
    );
    expect(screen.getByText("Error")).toHaveAttribute("data-type", "error");
  });

  it("applies success type", () => {
    render(
      <Form>
        <Form.Field name="email">
          <Form.Message type="success">Looks good!</Form.Message>
        </Form.Field>
      </Form>
    );
    expect(screen.getByText("Looks good!")).toHaveAttribute("data-type", "success");
  });

  it("has correct id for aria linkage", () => {
    render(
      <Form>
        <Form.Field name="email" error="Error">
          <Form.Message />
        </Form.Field>
      </Form>
    );
    const msg = screen.getByText("Error");
    expect(msg.id).toContain("email");
    expect(msg.id).toContain("message");
  });

  it("has role=alert and aria-live=polite", () => {
    render(
      <Form>
        <Form.Field name="email" error="Error">
          <Form.Message />
        </Form.Field>
      </Form>
    );
    const msg = screen.getByText("Error");
    expect(msg).toHaveAttribute("role", "alert");
    expect(msg).toHaveAttribute("aria-live", "polite");
  });

  it("forwards ref on message", () => {
    const ref = vi.fn();
    render(
      <Form>
        <Form.Field name="email" error="Error">
          <Form.Message ref={ref} />
        </Form.Field>
      </Form>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLParagraphElement));
  });

  it("merges className on message", () => {
    render(
      <Form>
        <Form.Field name="email" error="Error">
          <Form.Message className="custom" />
        </Form.Field>
      </Form>
    );
    expect(screen.getByText("Error")).toHaveClass("custom");
    expect(screen.getByText("Error")).toHaveClass("message");
  });
});

describe("useFormField", () => {
  it("throws when used outside Form.Field", () => {
    const TestComponent = () => {
      useFormField();
      return null;
    };
    expect(() => render(<TestComponent />)).toThrow(
      "useFormField must be used within a Form.Field"
    );
  });
});

describe("Form accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Form>
        <Form.Field name="email" required>
          <Form.Label>Email</Form.Label>
          <Form.Description>Enter your email address</Form.Description>
          <input type="email" aria-label="Email" />
          <Form.Message />
        </Form.Field>
      </Form>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations with error state", async () => {
    const { container } = render(
      <Form>
        <Form.Field name="email" error="Email is required" required>
          <Form.Label>Email</Form.Label>
          <input type="email" aria-label="Email" />
          <Form.Message />
        </Form.Field>
      </Form>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
