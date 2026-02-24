# Aurora UI — Claude Code Workflow

## Project Overview

Aurora UI is a React component library with a luminous, dark-first visual identity. Monorepo with individual packages (`@aurora-ui-react/*`), managed by Turborepo and pnpm.

**Design doc:** `docs/plans/2026-02-21-aurora-ui-design.md`
**Implementation plan:** `docs/plans/2026-02-21-aurora-ui-implementation.md`

## Commands

```bash
pnpm build          # Build all packages (Turborepo)
pnpm test           # Run all tests (Vitest via Turborepo)
pnpm lint           # Lint all packages (ESLint flat config)
pnpm typecheck      # Type check all packages (tsc --noEmit)
pnpm storybook      # Start Storybook dev server on port 6006
pnpm size           # Check bundle sizes (size-limit)
```

### Per-package commands (run from package directory):

```bash
pnpm vitest run                         # Run tests for current package
pnpm vitest run src/ComponentName.test.tsx  # Run a single test file
pnpm vitest watch                       # Watch mode
```

## Architecture

- **Packages:** `packages/` — each component is an independent npm package
- **Apps:** `apps/storybook/` — Storybook dev environment
- **Core:** `packages/core/` — tokens, AuroraProvider, utilities (cn, polymorphic types)
- **Barrel:** `packages/react/` — re-exports all components

### Per-component file convention (4 files):

1. `ComponentName.tsx` — Implementation with Radix primitive + forwardRef
2. `ComponentName.module.css` — Scoped styles via CSS custom properties + data attributes
3. `ComponentName.test.tsx` — Vitest + React Testing Library (written FIRST per TDD)
4. `index.ts` — Named exports only

Stories go in a separate `stories/` folder per package.

## Code Patterns

### Variant system

Props map to data attributes, styling resolved in CSS (zero JS runtime):

```tsx
<button data-variant={variant} data-size={size} data-accent={accent} ... />
```

```css
.root[data-variant="solid"] { ... }
.root[data-size="md"] { ... }
```

### All components must:

- Use `forwardRef`
- Accept `className` (merged via `cn()` from core)
- Use named exports only
- Use CSS Modules with camelCase class names
- Use `--au-` prefixed CSS custom properties (no hardcoded values)
- Use data attributes for variant/size/state styling

### Radix integration (Tier 2/3 components):

Complex components delegate behavior to Radix Primitives, applying Aurora styling on top.

## Testing — Strict TDD

Tests are written BEFORE implementation. Every component test must cover these 7 categories:

1. **Rendering** — Renders with default props, renders children
2. **Variants** — Each variant/size applies correct data attribute
3. **Interactions** — Click, hover, focus, keyboard behavior
4. **States** — Disabled, loading, active, error
5. **Ref forwarding** — Ref attaches to correct DOM element
6. **Accessibility** — axe-core passes (vitest-axe), ARIA attributes, keyboard nav
7. **Escape hatch** — Custom className merges correctly

### TDD workflow:

1. Write test file — all categories, all tests fail (red)
2. Implement component — minimal code to pass (green)
3. Refactor — clean up, extract patterns, improve CSS
4. Add Storybook story — visual verification

### Completion gate:

- All 7 test categories pass
- Zero vitest-axe violations
- TypeScript strict mode compiles
- Storybook story renders all variants

## Git Conventions

### Branches

Format: `type/scope`

- `feat/button` — new component or feature
- `fix/input-focus` — bug fix
- `chore/ci-setup` — tooling, config, CI

### Commits — Conventional Commits (REQUIRED)

Format: `type(scope): description`

```
feat(button): add glow variant
fix(input): correct focus ring in light mode
chore(core): update design tokens
test(modal): add keyboard navigation tests
refactor(card): simplify glass variant CSS
docs(storybook): add avatar usage examples
```

**Types:** `feat`, `fix`, `chore`, `test`, `refactor`, `docs`, `style`, `perf`
**Scope:** package name without prefix (e.g., `button`, `core`, `modal`)

### PRs

- One component per PR
- Changesets required for package changes (`pnpm changeset`)

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Packages | `@aurora-ui-react/kebab-case` | `@aurora-ui-react/button` |
| Component files | `PascalCase.tsx` | `Button.tsx` |
| CSS Modules | `PascalCase.module.css` | `Button.module.css` |
| CSS custom properties | `--au-` prefix | `--au-accent` |
| CSS classes | camelCase | `.root`, `.iconSlot` |
| Data attributes | `data-*` | `data-variant="glow"` |
| Exports | Named only | `export { Button }` |

## Design Token Tiers

1. **Primitive** (`--au-violet-1` through `--au-violet-12`) — raw values, never used by components directly
2. **Semantic** (`--au-bg-base`, `--au-accent`) — mapped from primitives, consumed by components
3. **Component** (`--button-bg`, `--button-glow-spread`) — scoped overrides within CSS Modules

## Performance

- Bundle per component: < 5KB gzipped
- CSS-only animations (compositor-only properties)
- No runtime style computation
- `will-change` only during active animations
- Enforce via `pnpm size` (size-limit)

## Accessibility Requirements

- WCAG 2.1 AA — vitest-axe in every test
- Keyboard navigation via Radix Primitives (Tier 2/3) or manual handlers (Tier 1)
- Focus visible: glow focus ring via `:focus-visible`
- Color contrast: 4.5:1 text, 3:1 borders
- `prefers-reduced-motion: reduce` disables all animations
- `forced-colors` media query degrades glows to solid borders

## Workflow For Each Request

1. **Read the design doc** — before implementing anything, check both design docs for relevant specs
2. **Follow TDD** — write failing tests first, then implement
3. **Follow git conventions** — conventional commits, proper scope
4. **Run verification** — tests pass, typecheck passes, lint passes before claiming done
5. **Changesets** — create a changeset for any package change (`pnpm changeset`)
