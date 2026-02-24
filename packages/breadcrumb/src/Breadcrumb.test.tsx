import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders nav element", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("has aria-label on nav", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("renders ol element", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List data-testid="list">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByTestId("list").tagName).toBe("OL");
  });

  it("renders items with links", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("Home").tagName).toBe("A");
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
  });

  it("renders default separator /", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("renders custom separator", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>→</Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("separator has aria-hidden", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator data-testid="sep" />
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByTestId("sep")).toHaveAttribute("aria-hidden", "true");
  });

  it("separator has role=presentation", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator data-testid="sep" />
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByTestId("sep")).toHaveAttribute("role", "presentation");
  });

  it("Page has aria-current=page", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
  });

  it("supports polymorphic as prop", () => {
    const CustomLink = (props: Record<string, unknown>) => <button {...props} />;
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link as={CustomLink}>Custom</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("Custom").tagName).toBe("BUTTON");
  });

  it("renders as button with as prop", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link as="button">Click</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("Click").tagName).toBe("BUTTON");
  });
});

describe("Breadcrumb ref forwarding", () => {
  it("forwards ref on root", () => {
    const ref = vi.fn();
    render(
      <Breadcrumb ref={ref}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it("forwards ref on list", () => {
    const ref = vi.fn();
    render(
      <Breadcrumb>
        <Breadcrumb.List ref={ref}>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLOListElement));
  });

  it("forwards ref on item", () => {
    const ref = vi.fn();
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item ref={ref}>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLLIElement));
  });

  it("forwards ref on separator", () => {
    const ref = vi.fn();
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Separator ref={ref} />
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("forwards ref on page", () => {
    const ref = vi.fn();
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page ref={ref}>Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });
});

describe("Breadcrumb classNames", () => {
  it("merges className on root", () => {
    render(
      <Breadcrumb className="custom">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByRole("navigation")).toHaveClass("custom");
    expect(screen.getByRole("navigation")).toHaveClass("root");
  });

  it("merges className on list", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List className="custom" data-testid="list">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByTestId("list")).toHaveClass("custom");
    expect(screen.getByTestId("list")).toHaveClass("list");
  });

  it("merges className on page", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Page className="custom">Current</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(screen.getByText("Current")).toHaveClass("custom");
    expect(screen.getByText("Current")).toHaveClass("page");
  });
});

describe("Breadcrumb accessibility", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Current Page</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
