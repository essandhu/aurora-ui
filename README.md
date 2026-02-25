# Aurora UI

A React component library with a luminous, dark-first visual identity. 40 accessible, performant components distributed as individually tree-shakeable npm packages.

Built on React 18/19, TypeScript (strict mode), Radix Primitives, and CSS Modules with a three-tier design token system.

## Quick Start

```bash
# Install a single component
pnpm add @aurora-ui-react/button @aurora-ui-react/core

# Or install everything
pnpm add @aurora-ui-react/react
```

Wrap your app with the theme provider and import the core styles:

```tsx
import { AuroraProvider } from "@aurora-ui-react/core";
import "@aurora-ui-react/core/styles.css";

function App() {
  return (
    <AuroraProvider mode="dark" accent="cyan" glow>
      <YourApp />
    </AuroraProvider>
  );
}
```

Use components:

```tsx
// Granular imports (recommended for bundle size)
import { Button } from "@aurora-ui-react/button";
import "@aurora-ui-react/button/styles.css";

// Or import everything from the barrel package
import { Button, Card, Modal } from "@aurora-ui-react/react";

function Page() {
  return (
    <Card>
      <Button variant="glow" accent="violet">
        Click me
      </Button>
    </Card>
  );
}
```

## Components

### Tier 1 — Primitives

Simple, single-purpose components with no external behavioral dependencies.

| Component | Package | Variants |
|---|---|---|
| Button | `@aurora-ui-react/button` | `solid`, `outline`, `ghost`, `glow` |
| Input | `@aurora-ui-react/input` | `outline`, `filled`, `ghost` |
| Textarea | `@aurora-ui-react/textarea` | `outline`, `filled`, `ghost` |
| Label | `@aurora-ui-react/label` | — |
| Card | `@aurora-ui-react/card` | `surface`, `elevated`, `glass` |
| Badge | `@aurora-ui-react/badge` | `solid`, `outline`, `glow` |
| Avatar | `@aurora-ui-react/avatar` | `circle`, `square` |
| Spinner | `@aurora-ui-react/spinner` | `ring`, `dots`, `pulse` |
| Separator | `@aurora-ui-react/separator` | — |
| Skeleton | `@aurora-ui-react/skeleton` | — |
| VisuallyHidden | `@aurora-ui-react/visually-hidden` | — |
| AspectRatio | `@aurora-ui-react/aspect-ratio` | — |

### Tier 2 — Radix-Powered Composites

Multi-part components that delegate behavior to Radix Primitives while applying Aurora styling.

| Component | Package | Radix Primitive |
|---|---|---|
| Checkbox | `@aurora-ui-react/checkbox` | `@radix-ui/react-checkbox` |
| Radio | `@aurora-ui-react/radio` | `@radix-ui/react-radio-group` |
| Switch | `@aurora-ui-react/switch` | `@radix-ui/react-switch` |
| Tooltip | `@aurora-ui-react/tooltip` | `@radix-ui/react-tooltip` |
| Tabs | `@aurora-ui-react/tabs` | `@radix-ui/react-tabs` |
| Accordion | `@aurora-ui-react/accordion` | `@radix-ui/react-accordion` |
| Collapsible | `@aurora-ui-react/collapsible` | `@radix-ui/react-collapsible` |
| Progress | `@aurora-ui-react/progress` | `@radix-ui/react-progress` |
| Slider | `@aurora-ui-react/slider` | `@radix-ui/react-slider` |
| Toggle | `@aurora-ui-react/toggle` | `@radix-ui/react-toggle` |
| Popover | `@aurora-ui-react/popover` | `@radix-ui/react-popover` |
| HoverCard | `@aurora-ui-react/hover-card` | `@radix-ui/react-hover-card` |
| ScrollArea | `@aurora-ui-react/scroll-area` | `@radix-ui/react-scroll-area` |
| Alert | `@aurora-ui-react/alert` | — |

### Tier 3 — Complex Composites

Multi-part compound components with rich sub-component APIs.

| Component | Package | Sub-components |
|---|---|---|
| Modal | `@aurora-ui-react/modal` | Trigger, Content, Title, Description, Close |
| AlertDialog | `@aurora-ui-react/alert-dialog` | Content, Title, Description, Action, Cancel |
| Sheet | `@aurora-ui-react/sheet` | Content, Title, Description, Close |
| Toast | `@aurora-ui-react/toast` | Provider, Title, Description, Action, Close |
| Select | `@aurora-ui-react/select` | Trigger, Content, Item, Group, Label |
| DropdownMenu | `@aurora-ui-react/dropdown-menu` | Content, Item, CheckboxItem, RadioItem, Sub, Separator |
| NavigationMenu | `@aurora-ui-react/navigation-menu` | List, Item, Trigger, Content, Link, Viewport |
| Toolbar | `@aurora-ui-react/toolbar` | Button, Link, Separator, ToggleGroup |
| Breadcrumb | `@aurora-ui-react/breadcrumb` | List, Item, Link, Separator, Page |
| Table | `@aurora-ui-react/table` | Header, Body, Footer, Row, Head, Cell, Caption |
| Command | `@aurora-ui-react/command` | Input, List, Empty, Group, Item, Separator, Dialog |
| Form | `@aurora-ui-react/form` | Field, Label, Description, Message |

## Theme Configuration

`AuroraProvider` controls the global theme via CSS custom properties and data attributes — no JavaScript runtime styling.

```tsx
<AuroraProvider
  mode="dark"         // "dark" | "light"
  accent="cyan"       // "cyan" | "violet" | "magenta" | "emerald" | "amber"
  radius="medium"     // "none" | "small" | "medium" | "large"
  glow={true}         // Enable/disable glow effects
  scaling={1.0}       // Font size multiplier
/>
```

All components inherit the theme automatically. Individual components can override the accent color via the `accent` prop.

## Design Token System

Aurora UI uses a three-tier CSS custom property architecture.

### Tier 1 — Primitive Tokens

Raw color values across 12-step scales (following the Radix color scale pattern). Five color palettes: Violet, Cyan, Magenta, Emerald, Amber.

```css
/* Steps 1-2: backgrounds, 3-5: interactive, 6-8: borders, 9-10: solid fills, 11-12: text */
--au-violet-1: hsl(260, 20%, 8%);
--au-cyan-9: hsl(190, 95%, 50%);
```

Never referenced by components directly.

### Tier 2 — Semantic Tokens

Mapped from primitives, consumed by component CSS:

```css
--au-bg-base       --au-text-primary    --au-accent
--au-bg-surface    --au-text-secondary   --au-accent-hover
--au-bg-elevated   --au-text-muted       --au-accent-glow
--au-border-default  --au-border-focus   --au-success / --au-warning / --au-error
```

### Tier 3 — Component Tokens

Scoped overrides inside CSS Modules for internal animation and state logic:

```css
.root {
  --button-glow-spread: 0px;
}
.root:hover {
  --button-glow-spread: 12px;
}
```

## Variant System

All styling is resolved in CSS via data attributes — zero JavaScript runtime overhead:

```tsx
<Button variant="glow" size="lg" accent="violet">Click</Button>
```

```css
.root[data-variant="glow"]:hover {
  box-shadow: var(--au-glow-md) var(--au-accent-glow);
}
.root[data-size="lg"] {
  height: 48px;
  padding: 0 var(--au-space-5);
}
```

## Accessibility

- **WCAG 2.1 AA** compliance enforced via vitest-axe in every component test
- **Keyboard navigation** handled by Radix Primitives (Tier 2/3) and manual handlers (Tier 1)
- **Focus visible** renders a luminous glow ring via `:focus-visible`
- **Color contrast** verified at 4.5:1 for text, 3:1 for borders
- **Reduced motion** — `prefers-reduced-motion: reduce` disables all animations
- **High contrast** — `forced-colors: active` degrades glows to solid borders

## Development

### Prerequisites

- Node.js 18+
- pnpm 10+

### Setup

```bash
git clone <repo-url>
cd aurora-ui
pnpm install
```

### Commands

```bash
pnpm build          # Build all packages (Turborepo)
pnpm test           # Run all tests (Vitest)
pnpm lint           # Lint all packages (ESLint)
pnpm typecheck      # Type check all packages (tsc --noEmit)
pnpm storybook      # Start Storybook dev server on port 6006
pnpm size           # Check bundle sizes (size-limit)
```

### Per-Package Commands

Run from inside any `packages/*` directory:

```bash
pnpm vitest run                            # Run tests
pnpm vitest run src/Button.test.tsx        # Single test file
pnpm vitest watch                          # Watch mode
```

### Component File Convention

Every component package follows a strict 4-file structure:

```
packages/button/
├── src/
│   ├── Button.tsx           # Implementation (forwardRef + Radix)
│   ├── Button.module.css    # Scoped styles via CSS custom properties
│   ├── Button.test.tsx      # Tests (written first — TDD)
│   └── index.ts             # Named exports only
├── stories/
│   └── Button.stories.tsx   # Storybook story
└── package.json
```

### Testing

Strict TDD — tests are written before implementation. Every component test covers 7 required categories:

| Category | What It Verifies |
|---|---|
| Rendering | Renders with default props, renders children |
| Variants | Each variant/size applies correct data attribute |
| Interactions | Click, hover, focus, keyboard behavior |
| States | Disabled, loading, active, error |
| Ref forwarding | Ref attaches to correct DOM element |
| Accessibility | vitest-axe passes, ARIA attributes, keyboard nav |
| Escape hatch | Custom `className` merges correctly via `cn()` |

### Release Workflow

Packages are versioned independently via Changesets:

```bash
pnpm changeset       # Create a changeset describing your changes
pnpm release         # Build all + publish via changesets
```

### Git Conventions

**Branches:** `feat/button`, `fix/input-focus`, `chore/ci-setup`

**Commits:** Conventional Commits — `type(scope): description`

```
feat(button): add glow variant
fix(input): correct focus ring in light mode
test(modal): add keyboard navigation tests
```

**PRs:** One component per PR. Changesets required for any package changes.

---

## Architectural Trade-offs

The following sections detail the major architectural decisions made during Aurora UI's design, the alternatives considered for each, and the rationale behind the chosen approach.

### 1. Styling: CSS Modules + Data Attributes vs. Alternatives

**Chosen:** CSS Modules with CSS custom properties and `data-*` attribute selectors for variant styling.

| Option | Pros | Cons |
|---|---|---|
| **CSS Modules + data attributes** | Zero JS runtime overhead. Styles are statically analyzable and natively scoped. Works with any bundler. No vendor lock-in. Glow/animation effects are pure CSS. | Requires separate `.module.css` file per component. Less dynamic than JS-in-CSS solutions. Refactoring variant names requires updating both TSX and CSS files. |
| **CSS-in-JS (styled-components, Emotion)** | Co-located styles with logic. Dynamic styling based on props is ergonomic. Single file per component. | Runtime overhead for style injection — directly conflicts with the performance-critical glow animation system. SSR hydration issues. Vendor lock-in. Larger bundle per component. |
| **Tailwind CSS** | Rapid prototyping. Utility classes reduce naming overhead. Strong community. | Requires class string manipulation for variants (className soup). Hard to express the 12-step color scale and glow token system cleanly. Design token system would fight Tailwind's opinionated defaults. Poor fit for distributable libraries (consumers must configure Tailwind). |
| **Vanilla Extract / StyleX** | Type-safe tokens. Zero runtime. Build-time extraction. | Newer ecosystem, fewer integrations. Requires specific build tooling that consumers must adopt. Smaller community for debugging issues. |

**Why CSS Modules:** The core Aurora aesthetic relies on glow effects, luminance transitions, and ambient animations — all compositor-friendly CSS properties. A zero-runtime solution was non-negotiable to guarantee 60fps animations. CSS Modules give us static scoping without imposing any runtime cost or build-tool requirement on consumers. The data attribute pattern (`[data-variant="glow"]`) cleanly separates variant logic (props → attributes in JS) from variant styling (attribute selectors in CSS), making both independently maintainable.

### 2. Component Behavior: Radix Primitives vs. Alternatives

**Chosen:** Radix Primitives for all interactive compound components (Tier 2 and 3). Custom implementations for Tier 1 primitives (Button, Input, Badge, etc.).

| Option | Pros | Cons |
|---|---|---|
| **Radix Primitives** | Best-in-class WAI-ARIA compliance. Headless — no styling opinions, so Aurora's visual identity applies cleanly on top. Compound component API (Root/Trigger/Content) is a proven pattern. Handles keyboard navigation, focus management, and portal rendering. | Adds peer dependency weight. Component API is constrained by Radix's compound pattern — can't easily deviate. Some Radix components have opinionated DOM structure. |
| **Headless UI (Tailwind Labs)** | Good accessibility coverage. Simpler API for some components. | Tailwind-ecosystem-oriented. Fewer primitives available (no Select, Slider, NavigationMenu). Less granular control over compound parts. |
| **React Aria (Adobe)** | Hooks-based — maximum flexibility. Extremely thorough accessibility coverage including mobile. | Significantly more integration work per component (hooks, not components). Steeper learning curve for contributors. Requires more boilerplate to compose behaviors. |
| **Custom from scratch** | Full control over API and DOM. No external dependencies. | Reimplementing WAI-ARIA patterns is error-prone and time-consuming. Accessibility edge cases (screen reader announcements, focus traps, roving tabindex) are notoriously hard to get right. Ongoing maintenance burden as ARIA specs evolve. |

**Why Radix:** Aurora UI's value proposition is its visual identity, not its behavioral primitives. Radix provides battle-tested accessibility that would take months to reimplement correctly. Its headless architecture means zero styling conflicts — we apply Aurora's glow tokens and data-attribute system directly on top. The compound component API (`Modal.Trigger`, `Modal.Content`) gives consumers fine-grained composition control while keeping the accessibility contract intact. Tier 1 components (Button, Input) are simple enough that Radix would add unnecessary abstraction, so those are implemented directly.

### 3. Monorepo: Individual Packages vs. Single Package

**Chosen:** Independent npm packages per component (`@aurora-ui-react/button`, `@aurora-ui-react/input`, etc.) with a barrel re-export package (`@aurora-ui-react/react`).

| Option | Pros | Cons |
|---|---|---|
| **Individual packages + barrel** | Consumers install only what they use — minimal `node_modules` footprint. Each component is independently versioned and releasable. Breaking changes in one component don't force upgrades across the board. Tree-shaking is guaranteed at the package boundary. | More packages to maintain. Consumers managing many `@aurora-ui-react/*` imports can feel verbose. Cross-component dependency management requires care. |
| **Single package** | Simple install (`npm install aurora-ui`). Single version to track. Easier internal refactoring. | Consumers bundle the entire library even if they use one component (mitigated somewhat by tree-shaking, but CSS side-effects make this unreliable). A breaking change in any component forces a major version bump for the whole library. |
| **Single package with subpath exports** | One package, granular imports via `aurora-ui/button`. Modern bundler support. | Subpath exports have inconsistent tooling support. TypeScript resolution can be tricky. CSS side-effect imports from subpaths are poorly supported in some bundlers. Versioning is still all-or-nothing. |

**Why individual packages:** Aurora UI components ship CSS alongside JS (each component has a `styles.css` export). CSS is a side-effect that bundlers cannot tree-shake — a single-package approach would force consumers to load all component CSS even if unused. Independent packages make this a non-issue: you install `@aurora-ui-react/button`, you get only Button's CSS. Independent versioning also means a breaking change to Modal's API doesn't require Avatar consumers to do anything. The barrel package (`@aurora-ui-react/react`) provides the convenience of single-package imports for teams that prefer it.

### 4. Build Output: Dual ESM + CJS vs. ESM-Only

**Chosen:** Dual output — ESM (`dist/esm/`) and CommonJS (`dist/cjs/`) — via Vite library mode.

| Option | Pros | Cons |
|---|---|---|
| **Dual ESM + CJS** | Works everywhere: Vite, webpack, Next.js (pages + app router), Remix, CRA, Node.js SSR. Consumers don't need to configure their bundler. | Two output formats to build and test. Slightly larger package on disk. Must ensure both formats behave identically. |
| **ESM only** | Simpler build. Smaller published package. Aligns with the modern module direction. | Breaks CJS consumers (older webpack configs, Jest with default transform, some Node.js SSR setups). Next.js Pages Router can have issues with ESM-only deps. Narrows adoption. |

**Why dual output:** Aurora UI targets the broadest possible React ecosystem. Many production apps still use CJS-based toolchains (especially Next.js Pages Router and Jest without ESM transforms). Shipping CJS alongside ESM is a one-time build configuration cost that eliminates a class of "cannot find module" issues for consumers. The `exports` field in each `package.json` lets modern bundlers resolve ESM automatically while CJS remains a fallback.

### 5. Variant API: Data Attributes vs. Class Composition

**Chosen:** Props map to `data-*` attributes; CSS selectors target those attributes.

| Option | Pros | Cons |
|---|---|---|
| **Data attributes** (`data-variant="glow"`) | Clean separation between JS (set attribute) and CSS (select attribute). Single source of truth for variant state. Easy to inspect in DevTools. Consistent API — every variant is a prop. No className string generation logic. | Attribute selectors have slightly lower specificity than classes (can cause unexpected overrides if consumers use high-specificity selectors). More verbose CSS selectors than simple class names. |
| **Class composition** (`cn(styles.root, styles.glow, styles.lg)`) | Higher specificity. Familiar pattern from Tailwind/BEM. Slightly faster CSS selector matching (though negligible in practice). | Requires logic to conditionally build class name strings. Variant + size + state combinations create combinatorial explosion in `cn()` calls. Harder to inspect which variant is active in DevTools (must decode hashed class names). |
| **CSS Modules `composes`** | Built into CSS Modules spec. No JS logic for class composition. | Poor IDE support. Debugging composed styles is opaque. Does not handle dynamic variant switching well. |

**Why data attributes:** The data attribute approach produces the simplest component code: each prop is passed directly to a `data-*` attribute (`data-variant={variant}`), and CSS handles all visual logic. This means zero variant-related JavaScript in the component body — no conditional class name building, no ternary expressions, no style objects. DevTools inspection is immediate: you see `data-variant="glow"` on the element and know exactly which visual state is active. The specificity trade-off is acceptable because Aurora's CSS Modules scoping prevents unintended conflicts.

### 6. Token Architecture: Three-Tier vs. Flat

**Chosen:** Three-tier system — primitive tokens, semantic tokens, component-scoped tokens.

| Option | Pros | Cons |
|---|---|---|
| **Three-tier (primitive → semantic → component)** | Clear hierarchy: raw values are never used directly, so changing a primitive updates all semantics that reference it. Component tokens enable local animation state (e.g., `--button-glow-spread`) without polluting global scope. Theme switching (dark/light, accent color) only requires remapping semantic tokens. | More indirection — developers must understand three levels. Debugging requires tracing a token through multiple layers. Naming must be disciplined to avoid ambiguity. |
| **Flat tokens** (single level) | Simple mental model. Direct mapping from name to value. Easy to audit. | Theme switching requires overriding every token individually. No scoping — component-specific animation values pollute the global namespace. A color change ripples through the entire system unpredictably. |
| **Two-tier (primitive + semantic)** | Simpler than three tiers. Primitives handle raw values, semantics handle theming. | Component-specific animation tokens (glow spread, luminance step) have no natural home. They end up as semantic tokens with overly specific names, or as hardcoded values in CSS — both defeat the purpose. |

**Why three tiers:** Aurora's visual identity relies on glow effects that transition between states (idle → hover → active). These transitions require component-scoped CSS custom properties that change on interaction — properties like `--button-glow-spread` or `--card-edge-glow-opacity`. A two-tier system would force these into the semantic layer (cluttering it with component-specific concerns) or into hardcoded values (breaking the token contract). The third tier gives each component a private space for animation and state logic while the semantic layer handles theming and the primitive layer provides the raw color science.

### 7. Theme Implementation: Data Attributes vs. CSS Classes vs. Context

**Chosen:** `AuroraProvider` sets `data-*` attributes on a wrapper element. CSS tokens are remapped via attribute selectors. No JavaScript runtime styling.

| Option | Pros | Cons |
|---|---|---|
| **Data attributes on wrapper** | Theme changes are a single DOM attribute update. All token remapping happens in CSS (`[data-aurora-mode="light"]` selectors). Zero JS style computation. Components don't need to read theme context — they inherit tokens via CSS cascade. | Theme is scoped to the DOM subtree under the wrapper (which is usually the intended behavior, but can surprise if the wrapper isn't at the root). |
| **React Context + CSS class toggling** | Components can read theme values in JS for conditional logic. Familiar React pattern. | Creates a render dependency — all components re-render when theme changes. Unnecessary for a system where all theming is CSS-based. |
| **React Context + style injection** | Maximum flexibility — any style can be computed in JS. | Runtime overhead for every theme change. Defeats the purpose of a CSS-token-based system. Hydration issues in SSR. |

**Why data attributes:** Since all Aurora styling resolves through CSS custom properties, the theme system only needs to remap those properties — a pure CSS concern. Setting `data-aurora-mode="light"` on a wrapper element and using `[data-aurora-mode="light"] { --au-bg-base: ... }` selectors keeps the entire theme mechanism in CSS. Components never need to know which theme is active; they just reference `var(--au-bg-base)` and the cascade handles the rest. This means theme switching causes zero React re-renders — only a single DOM attribute mutation that triggers CSS recalculation.

### 8. Testing: TDD with 7 Categories vs. Ad-Hoc Testing

**Chosen:** Strict test-driven development with a mandated 7-category test structure for every component.

| Option | Pros | Cons |
|---|---|---|
| **TDD with 7 fixed categories** | Guarantees comprehensive coverage across rendering, variants, interactions, states, refs, accessibility, and escape hatches. New contributors know exactly what to test. vitest-axe category catches accessibility regressions before they ship. | Higher upfront time per component. Some categories feel boilerplate for very simple components. Rigid structure may not fit unusual component shapes. |
| **Ad-hoc test coverage** | Faster to write initially. Tests cover what the author deems important. | Coverage gaps are invisible until bugs ship. Accessibility testing is often skipped when not mandated. Ref forwarding and escape hatch tests are frequently forgotten — leading to consumer-reported bugs. Inconsistent test quality across contributors. |
| **Snapshot testing** | Easy to set up. Catches unintended DOM changes. | Brittle — every minor refactor breaks snapshots. Doesn't test behavior. Developers rubber-stamp snapshot updates without reviewing. No accessibility coverage. |

**Why structured TDD:** The 7-category structure was designed to prevent the specific classes of bugs that component libraries are most prone to: broken ref forwarding, missing keyboard navigation, accessibility regressions, and variant props that don't actually style anything. By mandating vitest-axe in every component test, accessibility is a build-time guarantee rather than an aspirational checklist item. The upfront cost pays for itself in reduced bug reports and consumer trust.

## Performance

| Metric | Target |
|---|---|
| Bundle per component | < 5 KB gzipped |
| Animation frame rate | 60fps (compositor-only properties) |
| Runtime style computation | Zero (all CSS) |
| CLS contribution | 0 |

Bundle sizes are enforced in CI via [size-limit](https://github.com/ai/size-limit). Run `pnpm size` locally to check.

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+

`prefers-reduced-motion` and `forced-colors` media queries are supported for accessibility.

## License

MIT
