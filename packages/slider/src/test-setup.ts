import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";
expect.extend(matchers);

// Polyfill ResizeObserver missing in jsdom (required by @radix-ui/react-slider)
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Polyfill pointer capture APIs missing in jsdom (required by @radix-ui/react-slider)
if (typeof Element.prototype.hasPointerCapture !== "function") {
  Element.prototype.hasPointerCapture = () => false;
}
if (typeof Element.prototype.setPointerCapture !== "function") {
  Element.prototype.setPointerCapture = () => {};
}
if (typeof Element.prototype.releasePointerCapture !== "function") {
  Element.prototype.releasePointerCapture = () => {};
}
