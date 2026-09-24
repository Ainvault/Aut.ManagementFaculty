---
name: design-system-rules
description: >-
  Project design-system rules for AUT Open Education: shadcn/ui + Tailwind only.
  Use when changing UI, styling, colors, cards, navigation, forms, or loading
  states. Read docs/design-system-rules.md and skill shadcn-ui before visual work.
---

# Design System Rules

## Instructions

1. **Before any UI change**, read:
   - `docs/design-system-rules.md`
   - skill `shadcn-ui` (`.agents/skills/shadcn-ui/SKILL.md`)
   - Theme: `src/app/globals.css` (shadcn CSS variables only)
2. Build from `@/components/ui/*` + Tailwind. Add missing pieces with `npx shadcn@latest add`.
3. Colors: `bg-primary`, `text-muted-foreground`, `bg-muted`, `bg-chart-3` — never `ds-*` or `--brand-*`.
4. Extract substantial UI into molecules/organisms; keep pages thin (`.cursor/rules/ui-architecture.mdc`).
5. Material Design skill is methodology only — do not replace AUT colors mapped into shadcn tokens.
6. Complete the checklist in §4 of `docs/design-system-rules.md` before finishing.

## Anti-patterns

- Reviving `.ds-*` utilities or `--brand-*` parallel tokens
- Inventing new hex in components (use theme vars / SVG `var(--accent)`)
- Full section border boxes when `Card` / `Separator` / spacing suffice
- Physical `ml/mr/pl/pr` on RTL without an LTR island
