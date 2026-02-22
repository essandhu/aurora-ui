# Aurora UI — Design Document

**Date:** 2026-02-21
**Status:** Approved

## Overview

Aurora UI is a React component library with a distinctive luminous, dark-first visual identity. It provides responsive, accessible, and performant components built on Radix Primitives, styled with CSS Modules and design tokens.

The library is designed for open-source distribution under the `@aurora-ui` npm scope.

## Decisions Summary

| Area | Decision |
|---|---|
| Framework | React 18/19 + TypeScript (strict) |
| Styling | CSS Modules + CSS custom properties |
| Theme | Aurora / Luminous — dark-first, ambient glows |
| Architecture | Monorepo, individual packages (`@aurora-ui-react/*`) |
| A11y Foundation | Radix Primitives |
| Variant System | Prop-driven, data attribute CSS selectors |
| Toolchain | Vite + Vitest + Storybook |
| Testing | TDD, 7 test categories, vitest-axe |
| Bundling | ESM + CJS dual output, tree-shakeable |
| Publishing | Changesets, independent versioning |
| Components | 15 core, built in 5 phases |

---

## 1. Project Structure

Monorepo with individual packages, managed by Turborepo and pnpm.

```
aurora-ui/
├── packages/
│   ├── core/                        # @aurora-ui-react/core
│   │   ├── src/
│   │   │   ├── tokens/
│   │   │   │   ├── colors.css       # 12-step color scales + aurora glow tokens
│   │   │   │   ├── spacing.css      # Space scale (--au-space-1 through --au-space-9)
│   │   │   │   ├── radii.css        # Border radius tokens
│   │   │   │   ├── typography.css   # Font families, sizes, weights
│   │   │   │   └── effects.css      # Glow, blur, luminance, transitions
│   │   │   ├── theme/
│   │   │   │   └── AuroraProvider.tsx
│   │   │   ├── utils/
│   │   │   │   ├── cn.ts            # Class merging utility
│   │   │   │   └── polymorphic.ts   # "as" prop types
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── button/                      # @aurora-ui-react/button
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── stories/
│   │   │   └── Button.stories.tsx
│   │   └── package.json
│   │
│   ├── input/                       # @aurora-ui-react/input
│   ├── select/                      # @aurora-ui-react/select
│   ├── checkbox/                    # @aurora-ui-react/checkbox
│   ├── radio/                       # @aurora-ui-react/radio
│   ├── switch/                      # @aurora-ui-react/switch
│   ├── card/                        # @aurora-ui-react/card
│   ├── modal/                       # @aurora-ui-react/modal
│   ├── toast/                       # @aurora-ui-react/toast
│   ├── tooltip/                     # @aurora-ui-react/tooltip
│   ├── badge/                       # @aurora-ui-react/badge
│   ├── avatar/                      # @aurora-ui-react/avatar
│   ├── tabs/                        # @aurora-ui-react/tabs
│   ├── accordion/                   # @aurora-ui-react/accordion
│   ├── spinner/                     # @aurora-ui-react/spinner
│   │
│   └── react/                       # @aurora-ui-react/react (barrel re-export)
│       ├── src/index.ts
│       └── package.json
│
├── apps/
│   └── storybook/                   # Storybook dev environment
│
├── turbo.json
├── pnpm-workspace.yaml
├── vitest.workspace.ts
├── tsconfig.base.json
├── .size-limit.json
└── .changeset/
```

Per-component file convention (4 files):

1. `Component.tsx` — Implementation with Radix primitive + forwardRef
2. `Component.module.css` — Scoped styles via CSS custom properties + data attributes
3. `Component.test.tsx` — Vitest + React Testing Library (written first per TDD)
4. `index.ts` — Named exports

Stories in a separate `stories/` folder per package.

---

## 2. Design Token System

Three-tier token architecture.

### Tier 1 — Primitive Tokens

Raw values, never used directly by components:

```css
--au-violet-1: hsl(260, 20%, 8%);
--au-violet-2: hsl(260, 22%, 11%);
/* ... through step 12 */
--au-violet-12: hsl(260, 95%, 92%);
```

### Tier 2 — Semantic Tokens

Mapped from primitives, consumed by components:

```css
--au-bg-base: var(--au-violet-1);
--au-bg-surface: var(--au-violet-2);
--au-bg-elevated: var(--au-violet-3);
--au-text-primary: var(--au-violet-12);
--au-text-secondary: var(--au-violet-11);
--au-border-default: var(--au-violet-6);
--au-accent: var(--au-cyan-9);
--au-accent-glow: var(--au-cyan-7);
```

### Tier 3 — Component Tokens

Scoped overrides within CSS Modules:

```css
.root {
  --button-bg: var(--au-accent);
  --button-glow-color: var(--au-accent-glow);
  --button-glow-spread: 0px;
}
.root:hover {
  --button-glow-spread: 12px;
}
```

### Aurora Effect Tokens

```css
--au-glow-sm: 0 0 8px;
--au-glow-md: 0 0 16px;
--au-glow-lg: 0 0 32px;
--au-blur-surface: 12px;
--au-luminance-idle: 0.6;
--au-luminance-hover: 0.85;
--au-luminance-active: 1.0;
--au-transition-glow: 200ms ease-out;
--au-transition-luminance: 150ms ease-out;
```

### Color Scales

12-step semantic scale per color, following Radix's pattern:

| Steps | Purpose |
|---|---|
| 1-2 | App/card backgrounds |
| 3-5 | Interactive backgrounds (hover, active) |
| 6-8 | Borders, separators |
| 9-10 | Solid fills, accents |
| 11-12 | Text (secondary, primary) |

Accent colors: Cyan (default), Violet, Magenta, Emerald, Amber.

### Theme Provider

```tsx
<AuroraProvider
  mode="dark"
  accent="cyan"
  radius="medium"
  glow={true}
  scaling={1.0}
>
  <App />
</AuroraProvider>
```

Sets `data-aurora-theme` on a wrapping element. No JavaScript runtime for styling — CSS custom property switching only. Light mode uses softer glow effects (colored shadows instead of luminous glows).

---

## 3. Component API Patterns

### Variant System

Prop-driven variants mapped to CSS data attributes:

```tsx
<Button variant="glow" size="lg" accent="violet">Click</Button>
```

```tsx
// Button.tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", size = "md", accent, loading, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(styles.root, className)}
      data-variant={variant}
      data-size={size}
      data-accent={accent}
      data-loading={loading || undefined}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading && <Spinner className={styles.spinner} />}
      {children}
    </button>
  )
);
```

```css
/* Variants resolved in CSS — zero JS runtime */
.root[data-variant="solid"] { background: var(--au-accent); }
.root[data-variant="glow"]:hover { box-shadow: var(--au-glow-md) var(--au-accent-glow); }
.root[data-size="sm"] { height: 32px; padding: 0 12px; font-size: 13px; }
.root[data-size="md"] { height: 40px; padding: 0 16px; font-size: 14px; }
.root[data-size="lg"] { height: 48px; padding: 0 24px; font-size: 16px; }
```

### Radix Integration

Complex components delegate to Radix Primitives, applying Aurora styling on top:

```tsx
// Modal.tsx
import * as Dialog from "@radix-ui/react-dialog";

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onOpenChange, children, size = "md", ...props }, ref) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content ref={ref} className={cn(styles.content, props.className)}
          data-size={size} {...props}>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
);

Modal.Trigger = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Title = Dialog.Title;
Modal.Description = Dialog.Description;
```

### Shared Props

| Prop | Type | Used By |
|---|---|---|
| `variant` | Component-specific union | Button, Input, Badge, Card |
| `size` | `"sm" \| "md" \| "lg"` | All interactive components |
| `accent` | `"cyan" \| "violet" \| "magenta" \| "emerald" \| "amber"` | Any component with color |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "full"` | Any component with borders |
| `disabled` | `boolean` | All interactive components |
| `className` | `string` | All components (escape hatch) |

Polymorphic `as` prop for layout components (Card, Badge) via shared `PolymorphicProps` type in `@aurora-ui-react/core`.

All components use `forwardRef`.

---

## 4. Testing Strategy

Strict TDD — tests written before implementation.

### Stack

- Vitest — test runner
- React Testing Library — DOM-based component tests
- @testing-library/user-event — realistic interactions
- vitest-axe — automated accessibility assertions
- Storybook interaction tests — visual + behavioral

### Test Categories (per component)

| Category | What It Verifies |
|---|---|
| Rendering | Renders with default props, renders children |
| Variants | Each variant/size applies correct data attribute |
| Interactions | Click, hover, focus, keyboard behavior |
| States | Disabled, loading, active, error |
| Ref forwarding | Ref attaches to correct DOM element |
| Accessibility | axe-core passes, ARIA attributes, keyboard nav |
| Escape hatch | Custom className merges correctly |

### TDD Workflow

1. Write test file — all categories, all tests fail (red)
2. Implement component — minimal code to pass (green)
3. Refactor — clean up, extract patterns, improve CSS
4. Add Storybook story — visual verification

### Component Completion Gate

- All 7 test categories pass
- Zero vitest-axe violations
- TypeScript strict mode compiles
- Storybook story renders all variants

---

## 5. Build & Publishing

### Per-Package Output

Dual ESM + CJS via Vite library mode:

```json
{
  "name": "@aurora-ui-react/button",
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
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "@aurora-ui-react/core": "^0.1.0"
  }
}
```

### Barrel Package

`@aurora-ui-react/react` re-exports all components. Consumers choose:

```tsx
// Granular
import { Button } from "@aurora-ui-react/button";

// Convenient
import { Button, Card } from "@aurora-ui-react/react";
```

### CSS Distribution

Each component ships compiled CSS. `AuroraProvider` auto-injects token CSS.

### Turborepo Pipeline

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test": { "dependsOn": ["^build"] },
    "lint": {},
    "typecheck": { "dependsOn": ["^build"] }
  }
}
```

### Versioning

Changesets for independent versioning per package. CI automates publishing via GitHub Actions.

---

## 6. Component Roadmap

### Tier 1 — Standalone

| Component | Aurora Feature | Variants |
|---|---|---|
| Button | Glow variant with animated light-bleed | `solid`, `outline`, `ghost`, `glow` |
| Badge | Subtle pulse on glow variant | `solid`, `outline`, `glow` |
| Avatar | Luminous ring border | `circle`, `square` |
| Spinner | Rotating gradient arc with glow trail | `dots`, `ring`, `pulse` |
| Card | Ambient edge-glow on hover | `surface`, `elevated`, `glass` |
| Input | Expanding glow focus ring | `outline`, `filled`, `ghost` |

### Tier 2 — Radix-Powered

| Component | Radix Primitive | Aurora Feature |
|---|---|---|
| Checkbox | `@radix-ui/react-checkbox` | Luminous checkmark animation |
| Radio | `@radix-ui/react-radio-group` | Glowing dot fill with ripple |
| Switch | `@radix-ui/react-switch` | Thumb with glow trail |
| Tooltip | `@radix-ui/react-tooltip` | Glass-surface with glow border |
| Tabs | `@radix-ui/react-tabs` | Active underline glow sweep |
| Accordion | `@radix-ui/react-accordion` | Luminance fade-in reveal |

### Tier 3 — Complex Composites

| Component | Radix Primitive | Compound Parts |
|---|---|---|
| Select | `@radix-ui/react-select` | Trigger, Content, Item |
| Modal | `@radix-ui/react-dialog` | Trigger, Content, Title, Close |
| Toast | `@radix-ui/react-toast` | Provider, Title, Action |

### Implementation Phases

```
Phase 1: @aurora-ui-react/core (tokens, provider, utilities)
Phase 2: Button, Input, Badge, Spinner, Avatar, Card (parallel)
Phase 3: Checkbox, Radio, Switch, Tooltip, Tabs, Accordion (parallel)
Phase 4: Select, Modal, Toast (parallel)
Phase 5: Barrel package, Storybook docs, README
```

Phase gate: all tests pass, all a11y checks pass, all stories render.

### Out of Scope (v1)

- Server components / RSC
- Animation library integration
- Form library bindings
- Table, DatePicker, Combobox, Popover
- CLI scaffolding
- Documentation website (Storybook serves as docs)

---

## 7. Developer Experience

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Packages | `@aurora-ui-react/kebab-case` | `@aurora-ui-react/button` |
| Component files | `PascalCase.tsx` | `Button.tsx` |
| CSS Modules | `PascalCase.module.css` | `Button.module.css` |
| CSS properties | `--au-` prefix | `--au-accent` |
| CSS classes | camelCase | `.root`, `.iconSlot` |
| Data attributes | `data-*` | `data-variant="glow"` |
| Exports | Named only | `export { Button }` |

### Linting

- ESLint — flat config, react/hooks + typescript-eslint
- Stylelint — CSS Modules rules, enforces token usage (no hardcoded values)
- Prettier — formatting
- Husky + lint-staged — pre-commit hooks

### Git Conventions

- Branches: `feat/button`, `fix/input-focus`, `chore/ci-setup`
- Commits: Conventional Commits (`feat(button): add glow variant`)
- PRs: One component per PR
- Changesets: Required for package changes

---

## 8. Performance & Accessibility

### Performance Targets

| Metric | Target |
|---|---|
| Bundle per component | < 5KB gzipped |
| Total bundle (`@aurora-ui-react/react`) | < 50KB gzipped |
| Animation performance | 60fps (compositor-only properties) |
| CLS | 0 |

CSS-only animations. No runtime style computation. `will-change` only during active animations.

Bundle size CI enforcement via size-limit.

### Accessibility

| Requirement | Implementation |
|---|---|
| WCAG 2.1 AA | vitest-axe in every test, CI-enforced |
| Keyboard navigation | Radix Primitives (Tier 2/3), manual handlers (Tier 1) |
| Focus visible | Glow focus ring via `:focus-visible` |
| Screen readers | Correct ARIA from Radix, tested via `getByRole` |
| Color contrast | 4.5:1 text, 3:1 borders, verified per accent |
| Reduced motion | `prefers-reduced-motion: reduce` disables all animations |
| High contrast | `forced-colors` media query degrades glows to solid borders |

### Focus Ring

```css
.root:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--au-bg-base),
              0 0 0 4px var(--au-accent),
              var(--au-glow-md) var(--au-accent-glow);
}

@media (forced-colors: active) {
  .root:focus-visible {
    outline: 2px solid LinkText;
    box-shadow: none;
  }
}
```
