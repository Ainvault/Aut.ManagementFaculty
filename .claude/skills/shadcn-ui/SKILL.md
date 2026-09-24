---
name: shadcn-ui
description: >-
  Use shadcn/ui + Tailwind only for this project's UI. Triggers on UI, styling,
  components, cards, forms, navigation, theming, or when the user mentions
  shadcn, ui/*, or design tokens. Do not invent parallel ds-* or --brand-* systems.
---

# shadcn/ui for AUT Management Website

## Source of truth

- Docs: https://ui.shadcn.com/docs/installation and https://ui.shadcn.com/docs/installation/next
- Config: `components.json` (style `base-nova`, CSS vars, RTL)
- Styles: `src/app/globals.css` — only Tailwind + `shadcn/tailwind.css` + theme CSS variables
- Primitives: `src/components/ui/*` via `npx shadcn@latest add <name>`

## Rules

1. Build UI from `@/components/ui/*` + Tailwind utilities only.
2. Colors: `bg-primary`, `text-muted-foreground`, `bg-muted`, `border-border`, `bg-card` — never `--brand-*` or `brand-*` classes.
3. Do not create or revive `.ds-*` utilities, SurfaceCard, or DotCta patterns.
4. Prefer `Card`, `Button`, `Separator`, `Sheet`, `NavigationMenu`, `Input`, `Label`, `Tabs`, `Skeleton`, `Badge`.
5. Add missing primitives with the CLI; do not hand-copy stale component APIs.
6. Keep Persian RTL (`dir="rtl"` on layout; `components.json` `"rtl": true`).
7. AUT identity lives only in shadcn theme variables (`--primary`, `--accent`, …).

## Anti-patterns

- Parallel design tokens (`--brand-*`, `ds-card`, `ds-hero`, `ds-cta`)
- Full section boxes with `border border-border` when spacing/`Separator`/`Card` suffice
- Always-on motion (ken-burns, default lift on every card)
---
