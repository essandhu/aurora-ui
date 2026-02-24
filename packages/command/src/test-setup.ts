import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";
expect.extend(matchers);

// cmdk uses ResizeObserver internally
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// cmdk uses scrollIntoView which jsdom doesn't implement
Element.prototype.scrollIntoView = function () {};
