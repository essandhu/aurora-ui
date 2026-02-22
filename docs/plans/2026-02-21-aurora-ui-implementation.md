# Aurora UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React component library with a luminous, dark-first Aurora theme — 15 accessible components distributed as individual npm packages.

**Architecture:** Turborepo monorepo with pnpm workspaces. Each component is an independent package (`@aurora-ui-react/*`) with CSS Modules for styling, data attributes for variants, and Radix Primitives for accessibility. All development follows strict TDD.

**Tech Stack:** React 18/19, TypeScript (strict), Vite (library mode), Vitest, React Testing Library, vitest-axe, Storybook, Radix Primitives, CSS Modules, Turborepo, pnpm, Changesets.

**Design Doc:** `docs/plans/2026-02-21-aurora-ui-design.md`

---

## Phase 1: Foundation — Monorepo Infrastructure & @aurora-ui-react/core

### Task 1.1: Initialize Monorepo

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `tsconfig.base.json`
- Create: `.gitignore`
- Create: `.npmrc`

**Step 1: Initialize pnpm and root package.json**

```bash
pnpm init
```

Then replace `package.json` contents with:

```json
{
  "name": "aurora-ui",
  "private": true,
  "version": "0.0.0",
  "packageManager": "pnpm@10.4.1",
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "test:watch": "turbo run test:watch",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "storybook": "storybook dev -p 6006",
    "changeset": "changeset",
    "release": "turbo run build && changeset publish",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "turbo": "^2.4.0",
    "@changesets/cli": "^2.29.0",
    "typescript": "^5.7.0"
  }
}
```

**Step 2: Create pnpm-workspace.yaml**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

**Step 3: Create turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "test:watch": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

**Step 4: Create tsconfig.base.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Step 5: Create .gitignore**

```
node_modules/
dist/
*.tsbuildinfo
.turbo/
.cache/
coverage/
storybook-static/
```

**Step 6: Create .npmrc**

```
auto-install-peers=true
strict-peer-dependencies=false
```

**Step 7: Install root dependencies**

```bash
pnpm install
```

**Step 8: Initialize changesets**

```bash
pnpm changeset init
```

**Step 9: Commit**

```bash
git add -A
git commit -m "chore: initialize monorepo with turborepo and pnpm"
```

---

### Task 1.2: Create @aurora-ui-react/core Package — Scaffold

**Files:**
- Create: `packages/core/package.json`
- Create: `packages/core/tsconfig.json`
- Create: `packages/core/vite.config.ts`
- Create: `packages/core/src/index.ts`

**Step 1: Create packages/core directory and package.json**

```bash
mkdir -p packages/core/src
```

```json
{
  "name": "@aurora-ui-react/core",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./tokens": "./dist/tokens.css",
    "./styles.css": "./dist/styles.css"
  },
  "sideEffects": ["*.css"],
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc --emitDeclarationOnly --outDir dist/types",
    "test": "vitest run",
    "test:watch": "vitest watch",
    "lint": "eslint src/",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "vite": "^6.1.0",
    "vitest": "^3.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@testing-library/react": "^16.2.0",
    "@testing-library/jest-dom": "^6.6.0",
    "jsdom": "^26.0.0",
    "clsx": "^2.1.0"
  },
  "dependencies": {
    "clsx": "^2.1.0"
  }
}
```

**Step 2: Create tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist/types",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

**Step 3: Create vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `${format === "es" ? "esm" : "cjs"}/index.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
```

**Step 4: Create test setup file**

Create `packages/core/src/test-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 5: Create placeholder index.ts**

```ts
// @aurora-ui-react/core — foundation package
export {};
```

**Step 6: Install dependencies**

```bash
cd packages/core && pnpm install
```

**Step 7: Verify build**

```bash
pnpm build
```

**Step 8: Commit**

```bash
git add -A
git commit -m "chore(core): scaffold @aurora-ui-react/core package"
```

---

### Task 1.3: Core Utility — `cn` Class Merging

**Files:**
- Create: `packages/core/src/utils/cn.test.ts`
- Create: `packages/core/src/utils/cn.ts`
- Modify: `packages/core/src/index.ts`

**Step 1: Write the failing test**

```ts
// packages/core/src/utils/cn.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges multiple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe(
      "base active"
    );
  });

  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd packages/core && pnpm vitest run src/utils/cn.test.ts
```

Expected: FAIL — module not found.

**Step 3: Write minimal implementation**

```ts
// packages/core/src/utils/cn.ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
```

**Step 4: Run test to verify it passes**

```bash
cd packages/core && pnpm vitest run src/utils/cn.test.ts
```

Expected: All 4 tests PASS.

**Step 5: Export from index.ts**

```ts
// packages/core/src/index.ts
export { cn } from "./utils/cn";
```

**Step 6: Commit**

```bash
git add packages/core/src/utils/ packages/core/src/index.ts
git commit -m "feat(core): add cn class merging utility"
```

---

### Task 1.4: Core Utility — Polymorphic Types

**Files:**
- Create: `packages/core/src/utils/polymorphic.ts`
- Modify: `packages/core/src/index.ts`

**Step 1: Create the polymorphic type utility**

No test file needed — this is pure TypeScript types, verified by `typecheck`.

```ts
// packages/core/src/utils/polymorphic.ts
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export type PolymorphicProps<
  E extends ElementType,
  Props = {}
> = Props &
  Omit<ComponentPropsWithoutRef<E>, keyof Props | "as"> & {
    as?: E;
    children?: ReactNode;
  };
```

**Step 2: Export from index.ts**

Add to `packages/core/src/index.ts`:

```ts
export type { PolymorphicProps } from "./utils/polymorphic";
```

**Step 3: Run typecheck**

```bash
cd packages/core && pnpm typecheck
```

Expected: No errors.

**Step 4: Commit**

```bash
git add packages/core/src/utils/polymorphic.ts packages/core/src/index.ts
git commit -m "feat(core): add polymorphic 'as' prop types"
```

---

### Task 1.5: Core — Design Tokens (CSS)

**Files:**
- Create: `packages/core/src/tokens/colors.css`
- Create: `packages/core/src/tokens/spacing.css`
- Create: `packages/core/src/tokens/radii.css`
- Create: `packages/core/src/tokens/typography.css`
- Create: `packages/core/src/tokens/effects.css`
- Create: `packages/core/src/tokens/index.css`

**Step 1: Create color tokens**

```css
/* packages/core/src/tokens/colors.css */

/* --- Primitive Color Scales --- */

/* Violet (base surface palette) */
:root, [data-aurora-theme] {
  --au-violet-1: hsl(260, 20%, 8%);
  --au-violet-2: hsl(260, 22%, 11%);
  --au-violet-3: hsl(260, 24%, 15%);
  --au-violet-4: hsl(260, 25%, 19%);
  --au-violet-5: hsl(260, 26%, 23%);
  --au-violet-6: hsl(260, 20%, 32%);
  --au-violet-7: hsl(260, 18%, 42%);
  --au-violet-8: hsl(260, 16%, 52%);
  --au-violet-9: hsl(260, 60%, 58%);
  --au-violet-10: hsl(260, 65%, 65%);
  --au-violet-11: hsl(260, 50%, 75%);
  --au-violet-12: hsl(260, 95%, 92%);

  /* Cyan (default accent) */
  --au-cyan-1: hsl(190, 60%, 6%);
  --au-cyan-2: hsl(190, 55%, 10%);
  --au-cyan-3: hsl(190, 50%, 15%);
  --au-cyan-4: hsl(190, 50%, 20%);
  --au-cyan-5: hsl(190, 50%, 26%);
  --au-cyan-6: hsl(190, 45%, 35%);
  --au-cyan-7: hsl(190, 65%, 42%);
  --au-cyan-8: hsl(190, 70%, 50%);
  --au-cyan-9: hsl(190, 90%, 55%);
  --au-cyan-10: hsl(190, 95%, 62%);
  --au-cyan-11: hsl(190, 85%, 72%);
  --au-cyan-12: hsl(190, 90%, 88%);

  /* Magenta */
  --au-magenta-1: hsl(320, 50%, 7%);
  --au-magenta-2: hsl(320, 48%, 11%);
  --au-magenta-3: hsl(320, 46%, 16%);
  --au-magenta-4: hsl(320, 44%, 21%);
  --au-magenta-5: hsl(320, 42%, 27%);
  --au-magenta-6: hsl(320, 38%, 36%);
  --au-magenta-7: hsl(320, 55%, 44%);
  --au-magenta-8: hsl(320, 65%, 52%);
  --au-magenta-9: hsl(320, 80%, 58%);
  --au-magenta-10: hsl(320, 85%, 65%);
  --au-magenta-11: hsl(320, 75%, 74%);
  --au-magenta-12: hsl(320, 85%, 90%);

  /* Emerald */
  --au-emerald-1: hsl(155, 50%, 6%);
  --au-emerald-2: hsl(155, 48%, 10%);
  --au-emerald-3: hsl(155, 46%, 14%);
  --au-emerald-4: hsl(155, 44%, 19%);
  --au-emerald-5: hsl(155, 42%, 25%);
  --au-emerald-6: hsl(155, 38%, 33%);
  --au-emerald-7: hsl(155, 55%, 40%);
  --au-emerald-8: hsl(155, 65%, 48%);
  --au-emerald-9: hsl(155, 80%, 52%);
  --au-emerald-10: hsl(155, 85%, 60%);
  --au-emerald-11: hsl(155, 70%, 70%);
  --au-emerald-12: hsl(155, 80%, 88%);

  /* Amber */
  --au-amber-1: hsl(40, 50%, 6%);
  --au-amber-2: hsl(40, 48%, 10%);
  --au-amber-3: hsl(40, 46%, 15%);
  --au-amber-4: hsl(40, 44%, 20%);
  --au-amber-5: hsl(40, 42%, 26%);
  --au-amber-6: hsl(40, 38%, 35%);
  --au-amber-7: hsl(40, 55%, 42%);
  --au-amber-8: hsl(40, 70%, 50%);
  --au-amber-9: hsl(40, 90%, 55%);
  --au-amber-10: hsl(40, 95%, 62%);
  --au-amber-11: hsl(40, 85%, 72%);
  --au-amber-12: hsl(40, 90%, 88%);
}

/* --- Semantic Color Tokens (Dark Mode — default) --- */
:root, [data-aurora-theme="dark"] {
  --au-bg-base: var(--au-violet-1);
  --au-bg-surface: var(--au-violet-2);
  --au-bg-elevated: var(--au-violet-3);
  --au-bg-interactive: var(--au-violet-4);
  --au-bg-interactive-hover: var(--au-violet-5);

  --au-text-primary: var(--au-violet-12);
  --au-text-secondary: var(--au-violet-11);
  --au-text-muted: var(--au-violet-8);
  --au-text-disabled: var(--au-violet-7);

  --au-border-default: var(--au-violet-6);
  --au-border-strong: var(--au-violet-7);
  --au-border-focus: var(--au-violet-9);

  /* Accent (overridden by data-aurora-accent) */
  --au-accent: var(--au-cyan-9);
  --au-accent-hover: var(--au-cyan-10);
  --au-accent-glow: var(--au-cyan-7);
  --au-accent-text: var(--au-cyan-11);
  --au-accent-contrast: hsl(260, 20%, 8%);

  /* Status colors */
  --au-success: var(--au-emerald-9);
  --au-warning: var(--au-amber-9);
  --au-error: var(--au-magenta-9);
}

/* Accent overrides */
[data-aurora-accent="cyan"] {
  --au-accent: var(--au-cyan-9);
  --au-accent-hover: var(--au-cyan-10);
  --au-accent-glow: var(--au-cyan-7);
  --au-accent-text: var(--au-cyan-11);
}

[data-aurora-accent="violet"] {
  --au-accent: var(--au-violet-9);
  --au-accent-hover: var(--au-violet-10);
  --au-accent-glow: var(--au-violet-7);
  --au-accent-text: var(--au-violet-11);
}

[data-aurora-accent="magenta"] {
  --au-accent: var(--au-magenta-9);
  --au-accent-hover: var(--au-magenta-10);
  --au-accent-glow: var(--au-magenta-7);
  --au-accent-text: var(--au-magenta-11);
}

[data-aurora-accent="emerald"] {
  --au-accent: var(--au-emerald-9);
  --au-accent-hover: var(--au-emerald-10);
  --au-accent-glow: var(--au-emerald-7);
  --au-accent-text: var(--au-emerald-11);
}

[data-aurora-accent="amber"] {
  --au-accent: var(--au-amber-9);
  --au-accent-hover: var(--au-amber-10);
  --au-accent-glow: var(--au-amber-7);
  --au-accent-text: var(--au-amber-11);
}

/* --- Light Mode --- */
[data-aurora-theme="light"] {
  --au-bg-base: hsl(260, 15%, 97%);
  --au-bg-surface: hsl(260, 12%, 93%);
  --au-bg-elevated: hsl(0, 0%, 100%);
  --au-bg-interactive: hsl(260, 10%, 90%);
  --au-bg-interactive-hover: hsl(260, 12%, 86%);

  --au-text-primary: var(--au-violet-1);
  --au-text-secondary: hsl(260, 15%, 35%);
  --au-text-muted: hsl(260, 10%, 50%);
  --au-text-disabled: hsl(260, 8%, 65%);

  --au-border-default: hsl(260, 10%, 82%);
  --au-border-strong: hsl(260, 12%, 70%);
  --au-border-focus: var(--au-violet-9);

  --au-accent-contrast: hsl(0, 0%, 100%);
}
```

**Step 2: Create spacing tokens**

```css
/* packages/core/src/tokens/spacing.css */
:root, [data-aurora-theme] {
  --au-space-1: 4px;
  --au-space-2: 8px;
  --au-space-3: 12px;
  --au-space-4: 16px;
  --au-space-5: 24px;
  --au-space-6: 32px;
  --au-space-7: 48px;
  --au-space-8: 64px;
  --au-space-9: 96px;
}
```

**Step 3: Create radii tokens**

```css
/* packages/core/src/tokens/radii.css */
:root, [data-aurora-theme] {
  --au-radius-none: 0px;
  --au-radius-sm: 4px;
  --au-radius-md: 8px;
  --au-radius-lg: 12px;
  --au-radius-full: 9999px;
}

[data-aurora-radius="none"] { --au-radius-default: var(--au-radius-none); }
[data-aurora-radius="small"] { --au-radius-default: var(--au-radius-sm); }
[data-aurora-radius="medium"] { --au-radius-default: var(--au-radius-md); }
[data-aurora-radius="large"] { --au-radius-default: var(--au-radius-lg); }
```

**Step 4: Create typography tokens**

```css
/* packages/core/src/tokens/typography.css */
:root, [data-aurora-theme] {
  --au-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --au-font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;

  --au-text-xs: 12px;
  --au-text-sm: 13px;
  --au-text-md: 14px;
  --au-text-lg: 16px;
  --au-text-xl: 18px;
  --au-text-2xl: 24px;
  --au-text-3xl: 32px;

  --au-leading-tight: 1.25;
  --au-leading-normal: 1.5;
  --au-leading-relaxed: 1.75;

  --au-weight-normal: 400;
  --au-weight-medium: 500;
  --au-weight-semibold: 600;
  --au-weight-bold: 700;
}
```

**Step 5: Create effects tokens**

```css
/* packages/core/src/tokens/effects.css */
:root, [data-aurora-theme] {
  /* Glow sizes */
  --au-glow-sm: 0 0 8px;
  --au-glow-md: 0 0 16px;
  --au-glow-lg: 0 0 32px;

  /* Surface effects */
  --au-blur-surface: 12px;

  /* Transitions */
  --au-transition-glow: 200ms ease-out;
  --au-transition-luminance: 150ms ease-out;
  --au-transition-base: 150ms ease;

  /* Shadows (for light mode) */
  --au-shadow-sm: 0 1px 2px hsl(260, 20%, 8%, 0.05);
  --au-shadow-md: 0 4px 12px hsl(260, 20%, 8%, 0.1);
  --au-shadow-lg: 0 8px 24px hsl(260, 20%, 8%, 0.15);

  /* Focus ring */
  --au-ring-width: 2px;
  --au-ring-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root, [data-aurora-theme] {
    --au-transition-glow: 0ms;
    --au-transition-luminance: 0ms;
    --au-transition-base: 0ms;
  }
}
```

**Step 6: Create token index that imports all**

```css
/* packages/core/src/tokens/index.css */
@import "./colors.css";
@import "./spacing.css";
@import "./radii.css";
@import "./typography.css";
@import "./effects.css";
```

**Step 7: Commit**

```bash
git add packages/core/src/tokens/
git commit -m "feat(core): add design token system (colors, spacing, radii, typography, effects)"
```

---

### Task 1.6: Core — AuroraProvider

**Files:**
- Create: `packages/core/src/theme/AuroraProvider.test.tsx`
- Create: `packages/core/src/theme/AuroraProvider.tsx`
- Modify: `packages/core/src/index.ts`

**Step 1: Write the failing tests**

```tsx
// packages/core/src/theme/AuroraProvider.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuroraProvider } from "./AuroraProvider";

describe("AuroraProvider", () => {
  it("renders children", () => {
    render(
      <AuroraProvider>
        <span>Hello</span>
      </AuroraProvider>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("sets data-aurora-theme to dark by default", () => {
    const { container } = render(
      <AuroraProvider>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-theme", "dark");
  });

  it("sets data-aurora-theme to light when mode is light", () => {
    const { container } = render(
      <AuroraProvider mode="light">
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-theme", "light");
  });

  it("sets data-aurora-accent to cyan by default", () => {
    const { container } = render(
      <AuroraProvider>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-accent", "cyan");
  });

  it("sets data-aurora-accent from prop", () => {
    const { container } = render(
      <AuroraProvider accent="violet">
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-accent", "violet");
  });

  it("sets data-aurora-radius from prop", () => {
    const { container } = render(
      <AuroraProvider radius="large">
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-radius", "large");
  });

  it("sets data-aurora-glow when glow is enabled (default)", () => {
    const { container } = render(
      <AuroraProvider>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("data-aurora-glow");
  });

  it("omits data-aurora-glow when glow is false", () => {
    const { container } = render(
      <AuroraProvider glow={false}>
        <span>Test</span>
      </AuroraProvider>
    );
    const wrapper = container.firstElementChild;
    expect(wrapper).not.toHaveAttribute("data-aurora-glow");
  });
});
```

**Step 2: Run tests to verify they fail**

```bash
cd packages/core && pnpm vitest run src/theme/AuroraProvider.test.tsx
```

Expected: FAIL — module not found.

**Step 3: Write minimal implementation**

```tsx
// packages/core/src/theme/AuroraProvider.tsx
import type { ReactNode } from "react";
import "../tokens/index.css";

type Accent = "cyan" | "violet" | "magenta" | "emerald" | "amber";
type Radius = "none" | "small" | "medium" | "large";

export interface AuroraProviderProps {
  children: ReactNode;
  mode?: "dark" | "light";
  accent?: Accent;
  radius?: Radius;
  glow?: boolean;
  scaling?: number;
  className?: string;
}

export function AuroraProvider({
  children,
  mode = "dark",
  accent = "cyan",
  radius = "medium",
  glow = true,
  scaling = 1,
  className,
}: AuroraProviderProps) {
  return (
    <div
      data-aurora-theme={mode}
      data-aurora-accent={accent}
      data-aurora-radius={radius}
      data-aurora-glow={glow || undefined}
      className={className}
      style={scaling !== 1 ? { fontSize: `${scaling}rem` } : undefined}
    >
      {children}
    </div>
  );
}
```

**Step 4: Run tests to verify they pass**

```bash
cd packages/core && pnpm vitest run src/theme/AuroraProvider.test.tsx
```

Expected: All 8 tests PASS.

**Step 5: Export from index.ts**

Add to `packages/core/src/index.ts`:

```ts
export { AuroraProvider } from "./theme/AuroraProvider";
export type { AuroraProviderProps } from "./theme/AuroraProvider";
```

**Step 6: Commit**

```bash
git add packages/core/src/theme/ packages/core/src/index.ts
git commit -m "feat(core): add AuroraProvider theme context component"
```

---

### Task 1.7: Core — Shared Types

**Files:**
- Create: `packages/core/src/types.ts`
- Modify: `packages/core/src/index.ts`

**Step 1: Create shared prop types**

```ts
// packages/core/src/types.ts
export type Size = "sm" | "md" | "lg";
export type Accent = "cyan" | "violet" | "magenta" | "emerald" | "amber";
export type Radius = "none" | "sm" | "md" | "lg" | "full";

export interface AuroraComponentProps {
  className?: string;
}
```

**Step 2: Export from index.ts**

Add to `packages/core/src/index.ts`:

```ts
export type { Size, Accent, Radius, AuroraComponentProps } from "./types";
```

**Step 3: Run typecheck**

```bash
cd packages/core && pnpm typecheck
```

**Step 4: Commit**

```bash
git add packages/core/src/types.ts packages/core/src/index.ts
git commit -m "feat(core): add shared component types (Size, Accent, Radius)"
```

---

### Task 1.8: Phase 1 Gate — Verify Core Build

**Step 1: Run all core tests**

```bash
cd packages/core && pnpm test
```

Expected: All tests PASS.

**Step 2: Run build**

```bash
cd packages/core && pnpm build
```

Expected: Successful build, `dist/` directory created.

**Step 3: Run typecheck**

```bash
cd packages/core && pnpm typecheck
```

Expected: No errors.

**Step 4: Commit any remaining changes**

```bash
git add -A
git commit -m "chore(core): phase 1 complete — core foundation verified"
```

---

## Phase 2: Standalone Components (Parallel)

Each component follows the same structure. All 6 can be built in parallel.

### Task 2.1: Spinner Component

**Files:**
- Create: `packages/spinner/package.json`
- Create: `packages/spinner/tsconfig.json`
- Create: `packages/spinner/vite.config.ts`
- Create: `packages/spinner/src/test-setup.ts`
- Create: `packages/spinner/src/Spinner.test.tsx`
- Create: `packages/spinner/src/Spinner.tsx`
- Create: `packages/spinner/src/Spinner.module.css`
- Create: `packages/spinner/src/index.ts`

Spinner is built first because Button's loading state depends on it.

**Step 1: Scaffold the package**

Create `packages/spinner/package.json`:

```json
{
  "name": "@aurora-ui-react/spinner",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "sideEffects": ["*.css"],
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc --emitDeclarationOnly --outDir dist/types",
    "test": "vitest run",
    "test:watch": "vitest watch",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "@aurora-ui-react/core": "workspace:*"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@aurora-ui-react/core": "workspace:*",
    "vite": "^6.1.0",
    "vitest": "^3.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@testing-library/react": "^16.2.0",
    "@testing-library/jest-dom": "^6.6.0",
    "vitest-axe": "^1.0.0",
    "jsdom": "^26.0.0"
  }
}
```

Create `packages/spinner/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": { "outDir": "./dist/types", "rootDir": "./src" },
  "include": ["src"]
}
```

Create `packages/spinner/vite.config.ts` (same pattern as core but with entry `src/index.ts` and external `["react", "react-dom", "react/jsx-runtime", "@aurora-ui-react/core"]`):

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `${format === "es" ? "esm" : "cjs"}/index.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "@aurora-ui-react/core"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
```

Create `packages/spinner/src/test-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 2: Write the failing tests**

```tsx
// packages/spinner/src/Spinner.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  // Rendering
  it("renders with role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<Spinner label="Loading content" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading content"
    );
  });

  it("defaults label to Loading", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading"
    );
  });

  // Variants
  it("defaults to ring variant", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "ring"
    );
  });

  it("applies dots variant", () => {
    render(<Spinner variant="dots" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "dots"
    );
  });

  it("applies pulse variant", () => {
    render(<Spinner variant="pulse" />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "data-variant",
      "pulse"
    );
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "lg");
  });

  // Ref forwarding
  it("forwards ref to the root element", () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Spinner className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("custom");
  });
});
```

**Step 3: Run test to verify it fails**

```bash
cd packages/spinner && pnpm install && pnpm vitest run src/Spinner.test.tsx
```

Expected: FAIL.

**Step 4: Write minimal implementation**

```tsx
// packages/spinner/src/Spinner.tsx
import { forwardRef } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Spinner.module.css";

type SpinnerVariant = "ring" | "dots" | "pulse";

export interface SpinnerProps {
  variant?: SpinnerVariant;
  size?: Size;
  label?: string;
  className?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ variant = "ring", size = "md", label = "Loading", className }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
    >
      {variant === "dots" && (
        <>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </>
      )}
    </span>
  )
);

Spinner.displayName = "Spinner";
```

**Step 5: Create CSS Module**

```css
/* packages/spinner/src/Spinner.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Sizes */
.root[data-size="sm"] { width: 16px; height: 16px; }
.root[data-size="md"] { width: 24px; height: 24px; }
.root[data-size="lg"] { width: 32px; height: 32px; }

/* Ring variant */
.root[data-variant="ring"] {
  border: 2px solid var(--au-border-default);
  border-top-color: var(--au-accent);
  border-radius: var(--au-radius-full);
  animation: spin 0.75s linear infinite;
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

/* Dots variant */
.root[data-variant="dots"] {
  gap: var(--au-space-1);
  width: auto;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: var(--au-radius-full);
  background: var(--au-accent);
  animation: dotPulse 1.2s ease-in-out infinite;
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

.root[data-variant="dots"][data-size="sm"] .dot { width: 4px; height: 4px; }
.root[data-variant="dots"][data-size="lg"] .dot { width: 8px; height: 8px; }

/* Pulse variant */
.root[data-variant="pulse"] {
  border-radius: var(--au-radius-full);
  background: var(--au-accent);
  animation: pulse 1.5s ease-in-out infinite;
  box-shadow: var(--au-glow-md) var(--au-accent-glow);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes dotPulse {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .root[data-variant="ring"],
  .root[data-variant="pulse"],
  .dot {
    animation: none;
  }
  .root[data-variant="ring"] {
    border-top-color: var(--au-accent);
    opacity: 0.8;
  }
}
```

**Step 6: Create barrel export**

```ts
// packages/spinner/src/index.ts
export { Spinner } from "./Spinner";
export type { SpinnerProps } from "./Spinner";
```

**Step 7: Run tests to verify they pass**

```bash
cd packages/spinner && pnpm vitest run src/Spinner.test.tsx
```

Expected: All 12 tests PASS.

**Step 8: Commit**

```bash
git add packages/spinner/
git commit -m "feat(spinner): add Spinner component with ring, dots, pulse variants"
```

---

### Task 2.2: Button Component

**Files:**
- Create: `packages/button/package.json` (same pattern as spinner, add `@aurora-ui-react/spinner` to peerDeps)
- Create: `packages/button/tsconfig.json`
- Create: `packages/button/vite.config.ts`
- Create: `packages/button/src/test-setup.ts`
- Create: `packages/button/src/Button.test.tsx`
- Create: `packages/button/src/Button.tsx`
- Create: `packages/button/src/Button.module.css`
- Create: `packages/button/src/index.ts`

**Step 1: Scaffold the package**

Same structure as spinner. `package.json` adds:

```json
{
  "name": "@aurora-ui-react/button",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "@aurora-ui-react/core": "workspace:*",
    "@aurora-ui-react/spinner": "workspace:*"
  }
}
```

External in vite.config.ts: `["react", "react-dom", "react/jsx-runtime", "@aurora-ui-react/core", "@aurora-ui-react/spinner"]`

**Step 2: Write the failing tests**

```tsx
// packages/button/src/Button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Button } from "./Button";

describe("Button", () => {
  // Rendering
  it("renders children as text content", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  // Variants
  it("defaults to solid variant", () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "solid"
    );
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "outline"
    );
  });

  it("applies ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "ghost"
    );
  });

  it("applies glow variant", () => {
    render(<Button variant="glow">Glow</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "glow"
    );
  });

  // Sizes
  it("defaults to md size", () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm");
  });

  it("applies lg size", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg");
  });

  // Accent
  it("sets accent data attribute", () => {
    render(<Button accent="violet">Violet</Button>);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-accent",
      "violet"
    );
  });

  // Interactions
  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  // States
  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("sets data-loading when loading", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-loading");
  });

  // Ref forwarding
  it("forwards ref to the button element", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  // Accessibility
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Accessible</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  // Escape hatch
  it("merges custom className", () => {
    render(<Button className="custom">Styled</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom");
  });

  // Type attribute
  it("defaults to type button", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
```

**Step 3: Run test to verify it fails**

```bash
cd packages/button && pnpm install && pnpm vitest run src/Button.test.tsx
```

**Step 4: Write minimal implementation**

```tsx
// packages/button/src/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size, Accent } from "@aurora-ui-react/core";
import { Spinner } from "@aurora-ui-react/spinner";
import styles from "./Button.module.css";

type ButtonVariant = "solid" | "outline" | "ghost" | "glow";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  accent?: Accent;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      accent,
      loading,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" className={styles.spinner} />}
      <span className={styles.content} data-loading={loading || undefined}>
        {children}
      </span>
    </button>
  )
);

Button.displayName = "Button";
```

**Step 5: Create CSS Module**

```css
/* packages/button/src/Button.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--au-space-2);
  border: 1px solid transparent;
  border-radius: var(--au-radius-md);
  font-family: var(--au-font-sans);
  font-weight: var(--au-weight-medium);
  cursor: pointer;
  transition:
    background var(--au-transition-base),
    box-shadow var(--au-transition-glow),
    border-color var(--au-transition-base),
    opacity var(--au-transition-base);
  position: relative;
}

.root:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Sizes */
.root[data-size="sm"] {
  height: 32px;
  padding: 0 var(--au-space-3);
  font-size: var(--au-text-sm);
}

.root[data-size="md"] {
  height: 40px;
  padding: 0 var(--au-space-4);
  font-size: var(--au-text-md);
}

.root[data-size="lg"] {
  height: 48px;
  padding: 0 var(--au-space-5);
  font-size: var(--au-text-lg);
}

/* Solid variant */
.root[data-variant="solid"] {
  background: var(--au-accent);
  color: var(--au-accent-contrast);
}

.root[data-variant="solid"]:hover:not(:disabled) {
  background: var(--au-accent-hover);
}

/* Outline variant */
.root[data-variant="outline"] {
  background: transparent;
  border-color: var(--au-accent);
  color: var(--au-accent-text);
}

.root[data-variant="outline"]:hover:not(:disabled) {
  background: var(--au-bg-interactive);
}

/* Ghost variant */
.root[data-variant="ghost"] {
  background: transparent;
  color: var(--au-accent-text);
}

.root[data-variant="ghost"]:hover:not(:disabled) {
  background: var(--au-bg-interactive);
}

/* Glow variant */
.root[data-variant="glow"] {
  background: var(--au-accent);
  color: var(--au-accent-contrast);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

.root[data-variant="glow"]:hover:not(:disabled) {
  background: var(--au-accent-hover);
  box-shadow: var(--au-glow-md) var(--au-accent-glow);
}

.root[data-variant="glow"]:active:not(:disabled) {
  box-shadow: var(--au-glow-lg) var(--au-accent-glow);
}

/* Focus ring */
.root:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 var(--au-ring-offset) var(--au-bg-base),
    0 0 0 calc(var(--au-ring-offset) + var(--au-ring-width)) var(--au-accent),
    var(--au-glow-md) var(--au-accent-glow);
}

/* Loading state */
.content[data-loading] {
  opacity: 0;
}

.spinner {
  position: absolute;
}

/* High contrast */
@media (forced-colors: active) {
  .root:focus-visible {
    outline: 2px solid LinkText;
    box-shadow: none;
  }
}
```

**Step 6: Create barrel export**

```ts
// packages/button/src/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
```

**Step 7: Run tests**

```bash
cd packages/button && pnpm vitest run src/Button.test.tsx
```

Expected: All 18 tests PASS.

**Step 8: Commit**

```bash
git add packages/button/
git commit -m "feat(button): add Button with solid, outline, ghost, glow variants"
```

---

### Task 2.3: Badge Component

**Files:** Same 4-file pattern in `packages/badge/`

**Step 1: Scaffold package** (same pattern, name `@aurora-ui-react/badge`, peerDep on `@aurora-ui-react/core`)

**Step 2: Write failing tests**

```tsx
// packages/badge/src/Badge.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("defaults to solid variant", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-variant", "solid");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-variant", "outline");
  });

  it("applies glow variant", () => {
    render(<Badge variant="glow">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-variant", "glow");
  });

  it("defaults to md size", () => {
    render(<Badge>Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Badge size="sm">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-size", "sm");
  });

  it("sets accent data attribute", () => {
    render(<Badge accent="emerald">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveAttribute("data-accent", "emerald");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Tag</Badge>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Tag</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Badge className="custom">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("custom");
  });
});
```

**Step 3: Write implementation**

```tsx
// packages/badge/src/Badge.tsx
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size, Accent } from "@aurora-ui-react/core";
import styles from "./Badge.module.css";

type BadgeVariant = "solid" | "outline" | "glow";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: Size;
  accent?: Accent;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "solid", size = "md", accent, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
```

```css
/* packages/badge/src/Badge.module.css */
.root {
  display: inline-flex;
  align-items: center;
  border-radius: var(--au-radius-full);
  font-family: var(--au-font-sans);
  font-weight: var(--au-weight-medium);
  white-space: nowrap;
}

.root[data-size="sm"] { padding: 2px var(--au-space-2); font-size: var(--au-text-xs); }
.root[data-size="md"] { padding: var(--au-space-1) var(--au-space-3); font-size: var(--au-text-sm); }
.root[data-size="lg"] { padding: var(--au-space-2) var(--au-space-4); font-size: var(--au-text-md); }

.root[data-variant="solid"] {
  background: var(--au-accent);
  color: var(--au-accent-contrast);
}

.root[data-variant="outline"] {
  background: transparent;
  border: 1px solid var(--au-accent);
  color: var(--au-accent-text);
}

.root[data-variant="glow"] {
  background: var(--au-accent);
  color: var(--au-accent-contrast);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
  animation: badgePulse 2s ease-in-out infinite;
}

@keyframes badgePulse {
  0%, 100% { box-shadow: var(--au-glow-sm) var(--au-accent-glow); }
  50% { box-shadow: var(--au-glow-md) var(--au-accent-glow); }
}

@media (prefers-reduced-motion: reduce) {
  .root[data-variant="glow"] { animation: none; }
}
```

**Step 4: Run tests, verify pass, commit**

```bash
git add packages/badge/
git commit -m "feat(badge): add Badge with solid, outline, glow variants"
```

---

### Task 2.4: Avatar Component

**Files:** Same pattern in `packages/avatar/`

**Step 2: Write failing tests**

```tsx
// packages/avatar/src/Avatar.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="/photo.jpg" alt="User" />);
    expect(screen.getByRole("img", { name: "User" })).toBeInTheDocument();
  });

  it("renders fallback initials when no src", () => {
    render(<Avatar fallback="JD" alt="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("defaults to circle variant", () => {
    render(<Avatar fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-variant",
      "circle"
    );
  });

  it("applies square variant", () => {
    render(<Avatar variant="square" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-variant",
      "square"
    );
  });

  it("defaults to md size", () => {
    render(<Avatar fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-size",
      "md"
    );
  });

  it("applies sm size", () => {
    render(<Avatar size="sm" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveAttribute(
      "data-size",
      "sm"
    );
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} fallback="JD" alt="User" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar fallback="JD" alt="User" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Avatar className="custom" fallback="JD" alt="User" />);
    expect(screen.getByText("JD").parentElement).toHaveClass("custom");
  });
});
```

**Step 3: Write implementation**

```tsx
// packages/avatar/src/Avatar.tsx
import { forwardRef } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Avatar.module.css";

type AvatarVariant = "circle" | "square";

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  variant?: AvatarVariant;
  size?: Size;
  accent?: string;
  className?: string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { src, alt, fallback, variant = "circle", size = "md", accent, className },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback} role="img" aria-label={alt}>
          {fallback}
        </span>
      )}
    </span>
  )
);

Avatar.displayName = "Avatar";
```

```css
/* packages/avatar/src/Avatar.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--au-bg-elevated);
  border: 2px solid var(--au-accent);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
  transition: box-shadow var(--au-transition-glow);
}

.root:hover {
  box-shadow: var(--au-glow-md) var(--au-accent-glow);
}

.root[data-variant="circle"] { border-radius: var(--au-radius-full); }
.root[data-variant="square"] { border-radius: var(--au-radius-md); }

.root[data-size="sm"] { width: 32px; height: 32px; font-size: var(--au-text-xs); }
.root[data-size="md"] { width: 40px; height: 40px; font-size: var(--au-text-sm); }
.root[data-size="lg"] { width: 56px; height: 56px; font-size: var(--au-text-lg); }

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback {
  color: var(--au-accent-text);
  font-family: var(--au-font-sans);
  font-weight: var(--au-weight-semibold);
}

@media (prefers-reduced-motion: reduce) {
  .root:hover { box-shadow: var(--au-glow-sm) var(--au-accent-glow); }
}
```

**Step 4: Run tests, verify pass, commit**

```bash
git add packages/avatar/
git commit -m "feat(avatar): add Avatar with circle, square variants and fallback"
```

---

### Task 2.5: Card Component

**Files:** Same pattern in `packages/card/`

**Step 2: Write failing tests**

```tsx
// packages/card/src/Card.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("defaults to surface variant", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "surface"
    );
  });

  it("applies elevated variant", () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "elevated"
    );
  });

  it("applies glass variant", () => {
    const { container } = render(<Card variant="glass">Content</Card>);
    expect(container.firstElementChild).toHaveAttribute(
      "data-variant",
      "glass"
    );
  });

  it("renders as a different element with as prop", () => {
    render(<Card as="article">Content</Card>);
    expect(screen.getByText("Content").closest("article")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Card>Content</Card>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    const { container } = render(<Card className="custom">Content</Card>);
    expect(container.firstElementChild).toHaveClass("custom");
  });
});
```

**Step 3: Write implementation**

```tsx
// packages/card/src/Card.tsx
import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import styles from "./Card.module.css";

type CardVariant = "surface" | "elevated" | "glass";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "surface", as: Component = "div", className, children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      {...props}
    >
      {children}
    </Component>
  )
);

Card.displayName = "Card";
```

```css
/* packages/card/src/Card.module.css */
.root {
  border-radius: var(--au-radius-lg);
  padding: var(--au-space-5);
  font-family: var(--au-font-sans);
  color: var(--au-text-primary);
  transition: box-shadow var(--au-transition-glow);
}

.root[data-variant="surface"] {
  background: var(--au-bg-surface);
  border: 1px solid var(--au-border-default);
}

.root[data-variant="elevated"] {
  background: var(--au-bg-elevated);
  border: 1px solid var(--au-border-default);
  box-shadow: var(--au-shadow-md);
}

.root[data-variant="elevated"]:hover {
  box-shadow: var(--au-shadow-lg), var(--au-glow-sm) var(--au-accent-glow);
}

.root[data-variant="glass"] {
  background: hsla(260, 20%, 12%, 0.6);
  backdrop-filter: blur(var(--au-blur-surface));
  -webkit-backdrop-filter: blur(var(--au-blur-surface));
  border: 1px solid hsla(260, 30%, 40%, 0.2);
}

.root[data-variant="glass"]:hover {
  border-color: hsla(260, 30%, 50%, 0.3);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

@media (prefers-reduced-motion: reduce) {
  .root:hover { transition: none; }
}
```

**Step 4: Run tests, verify pass, commit**

```bash
git add packages/card/
git commit -m "feat(card): add Card with surface, elevated, glass variants"
```

---

### Task 2.6: Input Component

**Files:** Same pattern in `packages/input/`

**Step 2: Write failing tests**

```tsx
// packages/input/src/Input.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a textbox", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("defaults to outline variant", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "outline"
    );
  });

  it("applies filled variant", () => {
    render(<Input variant="filled" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "filled"
    );
  });

  it("applies ghost variant", () => {
    render(<Input variant="ghost" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "data-variant",
      "ghost"
    );
  });

  it("defaults to md size", () => {
    render(<Input aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Input size="sm" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-size", "sm");
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Name" />);
    await user.type(screen.getByRole("textbox"), "hello");
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Name" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled aria-label="Name" />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("sets data-error when error prop is true", () => {
    render(<Input error aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("data-error");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Input ref={ref} aria-label="Name" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input aria-label="Name" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Input className="custom" aria-label="Name" />);
    expect(screen.getByRole("textbox")).toHaveClass("custom");
  });
});
```

**Step 3: Write implementation**

```tsx
// packages/input/src/Input.tsx
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Input.module.css";

type InputVariant = "outline" | "filled" | "ghost";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: Size;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "outline", size = "md", error, className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-error={error || undefined}
      {...props}
    />
  )
);

Input.displayName = "Input";
```

```css
/* packages/input/src/Input.module.css */
.root {
  display: block;
  width: 100%;
  border-radius: var(--au-radius-md);
  font-family: var(--au-font-sans);
  color: var(--au-text-primary);
  transition:
    border-color var(--au-transition-base),
    box-shadow var(--au-transition-glow);
}

.root::placeholder { color: var(--au-text-muted); }

.root[data-size="sm"] { height: 32px; padding: 0 var(--au-space-3); font-size: var(--au-text-sm); }
.root[data-size="md"] { height: 40px; padding: 0 var(--au-space-4); font-size: var(--au-text-md); }
.root[data-size="lg"] { height: 48px; padding: 0 var(--au-space-5); font-size: var(--au-text-lg); }

/* Outline */
.root[data-variant="outline"] {
  background: transparent;
  border: 1px solid var(--au-border-default);
}

.root[data-variant="outline"]:hover:not(:disabled) {
  border-color: var(--au-border-strong);
}

.root[data-variant="outline"]:focus {
  outline: none;
  border-color: var(--au-accent);
  box-shadow:
    0 0 0 var(--au-ring-offset) var(--au-bg-base),
    0 0 0 calc(var(--au-ring-offset) + var(--au-ring-width)) var(--au-accent),
    var(--au-glow-sm) var(--au-accent-glow);
}

/* Filled */
.root[data-variant="filled"] {
  background: var(--au-bg-interactive);
  border: 1px solid transparent;
}

.root[data-variant="filled"]:focus {
  outline: none;
  background: var(--au-bg-base);
  border-color: var(--au-accent);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

/* Ghost */
.root[data-variant="ghost"] {
  background: transparent;
  border: 1px solid transparent;
}

.root[data-variant="ghost"]:focus {
  outline: none;
  border-color: var(--au-accent);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

/* Error state */
.root[data-error] {
  border-color: var(--au-error);
}

.root[data-error]:focus {
  box-shadow: var(--au-glow-sm) var(--au-error);
}

.root:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (forced-colors: active) {
  .root:focus {
    outline: 2px solid LinkText;
    box-shadow: none;
  }
}
```

**Step 4: Run tests, verify pass, commit**

```bash
git add packages/input/
git commit -m "feat(input): add Input with outline, filled, ghost variants"
```

---

### Task 2.7: Phase 2 Gate

**Step 1: Run all tests across all packages**

```bash
pnpm test
```

Expected: All tests pass across core, spinner, button, badge, avatar, card, input.

**Step 2: Run typecheck across all packages**

```bash
pnpm typecheck
```

Expected: No errors.

**Step 3: Commit gate**

```bash
git add -A
git commit -m "chore: phase 2 complete — all standalone components verified"
```

---

## Phase 3: Radix-Powered Components (Parallel)

All 6 components follow the same pattern: wrap a Radix Primitive with Aurora styling.

### Task 3.1: Checkbox Component

**Files:** Same scaffold pattern in `packages/checkbox/`. Add `@radix-ui/react-checkbox` to dependencies.

**Step 2: Write failing tests**

```tsx
// packages/checkbox/src/Checkbox.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="Agree" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("defaults to md size", () => {
    render(<Checkbox aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-size", "md");
  });

  it("applies sm size", () => {
    render(<Checkbox size="sm" aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-size", "sm");
  });

  it("is disabled when disabled", () => {
    render(<Checkbox disabled aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} aria-label="Agree" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox aria-label="Agree" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("merges custom className", () => {
    render(<Checkbox className="custom" aria-label="Agree" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom");
  });
});
```

**Step 3: Write implementation**

```tsx
// packages/checkbox/src/Checkbox.tsx
import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@aurora-ui-react/core";
import type { Size } from "@aurora-ui-react/core";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.CheckboxProps, "size"> {
  size?: Size;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ size = "md", className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(styles.root, className)}
      data-size={size}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={styles.indicator}>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          className={styles.checkIcon}
        >
          <path
            d="M11.5 3.5L5.5 10.5L2.5 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = "Checkbox";
```

```css
/* packages/checkbox/src/Checkbox.module.css */
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--au-border-default);
  border-radius: var(--au-radius-sm);
  background: transparent;
  cursor: pointer;
  transition:
    background var(--au-transition-base),
    border-color var(--au-transition-base),
    box-shadow var(--au-transition-glow);
}

.root[data-size="sm"] { width: 16px; height: 16px; }
.root[data-size="md"] { width: 20px; height: 20px; }
.root[data-size="lg"] { width: 24px; height: 24px; }

.root[data-state="checked"] {
  background: var(--au-accent);
  border-color: var(--au-accent);
  box-shadow: var(--au-glow-sm) var(--au-accent-glow);
}

.root:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 var(--au-ring-offset) var(--au-bg-base),
    0 0 0 calc(var(--au-ring-offset) + var(--au-ring-width)) var(--au-accent),
    var(--au-glow-sm) var(--au-accent-glow);
}

.root:disabled { opacity: 0.5; cursor: not-allowed; }

.indicator { display: flex; align-items: center; justify-content: center; }

.checkIcon {
  width: 100%;
  height: 100%;
  color: var(--au-accent-contrast);
}

@media (forced-colors: active) {
  .root:focus-visible { outline: 2px solid LinkText; box-shadow: none; }
}
```

**Step 4: Run tests, verify pass, commit**

```bash
git add packages/checkbox/
git commit -m "feat(checkbox): add Checkbox with Radix primitive and glow on check"
```

---

### Task 3.2: Radio Component

Same pattern. Uses `@radix-ui/react-radio-group`. Wraps `RadioGroup.Root` and `RadioGroup.Item`. Tests check group behavior, individual item selection, keyboard navigation. Glowing dot fill indicator. Commit message: `feat(radio): add RadioGroup with glowing dot indicator`.

### Task 3.3: Switch Component

Same pattern. Uses `@radix-ui/react-switch`. Tests check toggle behavior, disabled state, keyboard. Glow trail on thumb slide. Commit message: `feat(switch): add Switch with glow trail thumb`.

### Task 3.4: Tooltip Component

Same pattern. Uses `@radix-ui/react-tooltip`. Tests check content appears on hover, disappears on leave, keyboard accessible. Glass-surface styling with glow border. Exports `Tooltip`, `Tooltip.Trigger`, `Tooltip.Content`. Commit message: `feat(tooltip): add Tooltip with glass surface and glow border`.

### Task 3.5: Tabs Component

Same pattern. Uses `@radix-ui/react-tabs`. Tests check tab switching, keyboard navigation, active state. Active underline with glow sweep. Exports `Tabs`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`. Commit message: `feat(tabs): add Tabs with glow sweep active indicator`.

### Task 3.6: Accordion Component

Same pattern. Uses `@radix-ui/react-accordion`. Tests check expand/collapse, keyboard, multiple/single mode. Content reveal with luminance fade-in. Exports `Accordion`, `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`. Commit message: `feat(accordion): add Accordion with luminance fade-in reveal`.

### Task 3.7: Phase 3 Gate

```bash
pnpm test
pnpm typecheck
git add -A
git commit -m "chore: phase 3 complete — all Radix-powered components verified"
```

---

## Phase 4: Complex Composites (Parallel)

### Task 4.1: Select Component

**Files:** `packages/select/`. Uses `@radix-ui/react-select`.

**Compound exports:** `Select`, `Select.Trigger`, `Select.Content`, `Select.Item`, `Select.Group`, `Select.Label`.

**Key tests:**
- Opens on trigger click
- Selects an item and updates value
- Calls onValueChange
- Keyboard navigation (arrow keys, enter)
- Closes on outside click
- Disabled state
- Ref forwarding on trigger
- axe passes
- className escape hatch

**Aurora styling:** Glass dropdown panel with glow-highlighted active item, subtle border glow on open.

Commit: `feat(select): add Select with glass dropdown and glow-highlighted items`

### Task 4.2: Modal Component

**Files:** `packages/modal/`. Uses `@radix-ui/react-dialog`.

**Compound exports:** `Modal`, `Modal.Trigger`, `Modal.Content`, `Modal.Title`, `Modal.Description`, `Modal.Close`.

**Key tests:**
- Opens when trigger clicked
- Closes on close button
- Closes on overlay click
- Traps focus inside
- Renders title and description
- Calls onOpenChange
- Sizes (sm, md, lg)
- Ref forwarding
- axe passes
- className escape hatch

**Aurora styling:** Backdrop blur overlay, luminous border on content panel, glow focus ring on interactive elements within.

Commit: `feat(modal): add Modal with backdrop blur and luminous border`

### Task 4.3: Toast Component

**Files:** `packages/toast/`. Uses `@radix-ui/react-toast`.

**Compound exports:** `ToastProvider`, `Toast`, `Toast.Title`, `Toast.Description`, `Toast.Action`, `Toast.Close`.

**Key tests:**
- Renders toast message
- Auto-dismisses after duration
- Action button works
- Close button works
- Multiple toasts stack
- Severity variants (info, success, warning, error)
- Ref forwarding
- axe passes
- className escape hatch

**Aurora styling:** Edge-glow color-coded by severity (cyan=info, emerald=success, amber=warning, magenta=error), slide-in with luminance ramp animation.

Commit: `feat(toast): add Toast with severity glow and slide-in animation`

### Task 4.4: Phase 4 Gate

```bash
pnpm test
pnpm typecheck
git add -A
git commit -m "chore: phase 4 complete — all complex composite components verified"
```

---

## Phase 5: Barrel Package, Storybook & Polish

### Task 5.1: Barrel Package (@aurora-ui-react/react)

**Files:**
- Create: `packages/react/package.json`
- Create: `packages/react/src/index.ts`
- Create: `packages/react/tsconfig.json`

**Step 1: Create package.json**

```json
{
  "name": "@aurora-ui-react/react",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "sideEffects": ["*.css"],
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc --emitDeclarationOnly --outDir dist/types",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@aurora-ui-react/core": "workspace:*",
    "@aurora-ui-react/button": "workspace:*",
    "@aurora-ui-react/input": "workspace:*",
    "@aurora-ui-react/select": "workspace:*",
    "@aurora-ui-react/checkbox": "workspace:*",
    "@aurora-ui-react/radio": "workspace:*",
    "@aurora-ui-react/switch": "workspace:*",
    "@aurora-ui-react/card": "workspace:*",
    "@aurora-ui-react/modal": "workspace:*",
    "@aurora-ui-react/toast": "workspace:*",
    "@aurora-ui-react/tooltip": "workspace:*",
    "@aurora-ui-react/badge": "workspace:*",
    "@aurora-ui-react/avatar": "workspace:*",
    "@aurora-ui-react/tabs": "workspace:*",
    "@aurora-ui-react/accordion": "workspace:*",
    "@aurora-ui-react/spinner": "workspace:*"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

**Step 2: Create barrel index.ts**

```ts
// packages/react/src/index.ts
// Core
export { AuroraProvider } from "@aurora-ui-react/core";
export { cn } from "@aurora-ui-react/core";
export type { Size, Accent, Radius, AuroraProviderProps } from "@aurora-ui-react/core";

// Components
export { Button } from "@aurora-ui-react/button";
export type { ButtonProps } from "@aurora-ui-react/button";

export { Input } from "@aurora-ui-react/input";
export type { InputProps } from "@aurora-ui-react/input";

export { Select } from "@aurora-ui-react/select";

export { Checkbox } from "@aurora-ui-react/checkbox";
export type { CheckboxProps } from "@aurora-ui-react/checkbox";

export { Radio, RadioGroup } from "@aurora-ui-react/radio";

export { Switch } from "@aurora-ui-react/switch";

export { Card } from "@aurora-ui-react/card";
export type { CardProps } from "@aurora-ui-react/card";

export { Modal } from "@aurora-ui-react/modal";

export { Toast, ToastProvider } from "@aurora-ui-react/toast";

export { Tooltip } from "@aurora-ui-react/tooltip";

export { Badge } from "@aurora-ui-react/badge";
export type { BadgeProps } from "@aurora-ui-react/badge";

export { Avatar } from "@aurora-ui-react/avatar";
export type { AvatarProps } from "@aurora-ui-react/avatar";

export { Tabs } from "@aurora-ui-react/tabs";

export { Accordion } from "@aurora-ui-react/accordion";

export { Spinner } from "@aurora-ui-react/spinner";
export type { SpinnerProps } from "@aurora-ui-react/spinner";
```

**Step 3: Build and verify**

```bash
cd packages/react && pnpm build
```

**Step 4: Commit**

```bash
git add packages/react/
git commit -m "feat(react): add barrel package re-exporting all components"
```

---

### Task 5.2: Storybook Setup

**Files:**
- Create: `apps/storybook/.storybook/main.ts`
- Create: `apps/storybook/.storybook/preview.ts`
- Create: `apps/storybook/package.json`

**Step 1: Initialize Storybook app**

```json
{
  "name": "@aurora-ui-react/storybook",
  "private": true,
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "devDependencies": {
    "storybook": "^8.5.0",
    "@storybook/react": "^8.5.0",
    "@storybook/react-vite": "^8.5.0",
    "@storybook/addon-essentials": "^8.5.0",
    "@storybook/addon-a11y": "^8.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@aurora-ui-react/react": "workspace:*"
  }
}
```

**Step 2: Configure main.ts**

```ts
// apps/storybook/.storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../../../packages/*/stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
```

**Step 3: Configure preview with AuroraProvider decorator**

```ts
// apps/storybook/.storybook/preview.ts
import type { Preview } from "@storybook/react";
import { AuroraProvider } from "@aurora-ui-react/core";
import React from "react";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        AuroraProvider,
        { mode: "dark", accent: "cyan" },
        React.createElement(Story)
      ),
  ],
  parameters: {
    backgrounds: {
      default: "aurora-dark",
      values: [
        { name: "aurora-dark", value: "hsl(260, 20%, 8%)" },
        { name: "aurora-light", value: "hsl(260, 15%, 97%)" },
      ],
    },
  },
};

export default preview;
```

**Step 4: Commit**

```bash
git add apps/storybook/
git commit -m "chore(storybook): configure Storybook with Aurora theme decorator"
```

---

### Task 5.3: Component Stories

Create one story file per component in `packages/<component>/stories/`. Each story includes:

- Default
- AllVariants
- AllSizes
- AllAccents
- States (disabled, loading, error)
- Playground (all controls)

Example for Button:

```tsx
// packages/button/stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["solid", "outline", "ghost", "glow"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    accent: { control: "select", options: ["cyan", "violet", "magenta", "emerald", "amber"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="glow">Glow</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllAccents: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button accent="cyan" variant="glow">Cyan</Button>
      <Button accent="violet" variant="glow">Violet</Button>
      <Button accent="magenta" variant="glow">Magenta</Button>
      <Button accent="emerald" variant="glow">Emerald</Button>
      <Button accent="amber" variant="glow">Amber</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "solid",
    size: "md",
    accent: "cyan",
    loading: false,
    disabled: false,
  },
};
```

Repeat for all 15 components. Commit after all stories:

```bash
git add packages/*/stories/
git commit -m "feat(storybook): add stories for all 15 components"
```

---

### Task 5.4: Linting Setup

**Files:**
- Create: `eslint.config.js`
- Create: `.prettierrc`
- Create: `.stylelintrc.json`

**Step 1: Install linting dependencies at root**

```bash
pnpm add -D -w eslint @eslint/js typescript-eslint eslint-plugin-react-hooks prettier stylelint stylelint-config-standard
```

**Step 2: Configure ESLint (flat config)**

```js
// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strict,
  {
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  { ignores: ["**/dist/**", "**/node_modules/**", "**/*.config.*"] }
);
```

**Step 3: Configure Prettier**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 90,
  "tabWidth": 2
}
```

**Step 4: Configure Stylelint**

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "declaration-no-important": true,
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]*$",
    "custom-property-pattern": "^(au-|button-|input-|card-|badge-|avatar-|spinner-|checkbox-|radio-|switch-|tooltip-|tabs-|accordion-|select-|modal-|toast-).+"
  }
}
```

**Step 5: Commit**

```bash
git add eslint.config.js .prettierrc .stylelintrc.json
git commit -m "chore: configure ESLint, Prettier, and Stylelint"
```

---

### Task 5.5: Size Limit Configuration

**Files:**
- Create: `.size-limit.json`

```json
[
  { "path": "packages/button/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/input/dist/esm/index.js", "limit": "2 KB" },
  { "path": "packages/select/dist/esm/index.js", "limit": "5 KB" },
  { "path": "packages/checkbox/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/radio/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/switch/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/card/dist/esm/index.js", "limit": "2 KB" },
  { "path": "packages/modal/dist/esm/index.js", "limit": "5 KB" },
  { "path": "packages/toast/dist/esm/index.js", "limit": "5 KB" },
  { "path": "packages/tooltip/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/badge/dist/esm/index.js", "limit": "2 KB" },
  { "path": "packages/avatar/dist/esm/index.js", "limit": "2 KB" },
  { "path": "packages/tabs/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/accordion/dist/esm/index.js", "limit": "3 KB" },
  { "path": "packages/spinner/dist/esm/index.js", "limit": "2 KB" },
  { "path": "packages/react/dist/esm/index.js", "limit": "50 KB" }
]
```

Install and add script:

```bash
pnpm add -D -w size-limit @size-limit/preset-small-lib
```

Add to root `package.json` scripts: `"size": "size-limit"`

**Commit:**

```bash
git add .size-limit.json package.json
git commit -m "chore: add size-limit bundle size enforcement"
```

---

### Task 5.6: Final Gate — Full Verification

**Step 1: Run all tests**

```bash
pnpm test
```

**Step 2: Run all typechecks**

```bash
pnpm typecheck
```

**Step 3: Run all builds**

```bash
pnpm build
```

**Step 4: Run size checks**

```bash
pnpm size
```

**Step 5: Run lint**

```bash
pnpm lint
```

**Step 6: Verify Storybook builds**

```bash
cd apps/storybook && pnpm build
```

All must pass. Final commit:

```bash
git add -A
git commit -m "chore: phase 5 complete — Aurora UI v0.1.0 ready for release"
```

---

## Summary

| Phase | Tasks | Components |
|---|---|---|
| 1 | 1.1–1.8 | Core foundation (tokens, provider, utils) |
| 2 | 2.1–2.7 | Button, Input, Badge, Spinner, Avatar, Card |
| 3 | 3.1–3.7 | Checkbox, Radio, Switch, Tooltip, Tabs, Accordion |
| 4 | 4.1–4.4 | Select, Modal, Toast |
| 5 | 5.1–5.6 | Barrel package, Storybook, linting, size limits |

**TDD enforced:** Every component has tests written before implementation covering rendering, variants, interactions, states, ref forwarding, accessibility, and className escape hatch.
