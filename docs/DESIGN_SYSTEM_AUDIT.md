# Design System Audit — ManagementWebsite

**Date:** 2026-09-22  
**Inputs:** `docs/design-system-rules.md`, `docs/reference/mitsloan/12-design-system.md`, `src/app/globals.css`  
**Branch / scope:** execute design-system rules (token audit + drift cleanup)

---

## 0.1 Unique colors found in `src/`

### Brand / theme tokens (canonical — live in `globals.css` `:root`)

| Hex | Role / token |
|---|---|
| `#a31f34` | `--brand-accent` / primary |
| `#f0c14b` | `--brand-gold` |
| `#0a0a0a` | `--brand-dark` |
| `#0c2d5a` | `--brand-navy` |
| `#061525` | `--brand-deep` |
| `#1a1a1a` | `--brand-ink` / foreground |
| `#5c5c5c` | `--brand-muted` |
| `#c8c8c8` | `--brand-gray` |
| `#f7f6f3` | `--brand-sand` |
| `#f0efeb` | `--brand-mist` / secondary / muted |
| `#ffffff` / `#fff` | `--background` / `--card` / on-primary |
| `#e2e0db` | `--border` / `--input` |
| `oklch(0.577 0.245 27.325)` | `--destructive` (shadcn) |

### Derived / already used but unnamed before this pass

| Hex | Decision |
|---|---|
| `#c47800` | Register as `--brand-gold-deep` (gold gradient end already in SVG) |
| `#e8a317` | Mid gold stop → map to mix of gold / gold-deep or keep via gold-deep |
| `#e8e6e1` | Skeleton mid → `--brand-skel-mid` or `color-mix` of mist |
| `#1a3a6b` | Hero SVG navy stop → map to `--brand-navy` (close enough) / keep as illustration |

### Illustration-only (HeroFeatured decorative dots — NOT brand roles)

`#ff6b8a`, `#7dd3c0`, `#7eb6ff`, `#ff9f68`, `#c084fc` — allowed only inside hero SVG artwork; documented exception. Do not use in UI chrome.

### Opacity recipes (deep / white overlays)

`rgb(6 21 37 / …)` = `--brand-deep` alpha (hero veil).  
`rgb(255 255 255 / …)` = on-dark white alpha (rail, skel-dark, CTA-on-dark).

---

## 0.2 Role mapping (rules §1 — filled)

| Role | Token | Value |
|---|---|---|
| Primary / accent | `--brand-accent` | `#a31f34` |
| Gold accent | `--brand-gold` | `#f0c14b` |
| Gold deep | `--brand-gold-deep` | `#c47800` |
| Dark | `--brand-dark` | `#0a0a0a` |
| Navy | `--brand-navy` | `#0c2d5a` |
| Deep (hero) | `--brand-deep` | `#061525` |
| Ink | `--brand-ink` | `#1a1a1a` |
| Muted text | `--brand-muted` | `#5c5c5c` |
| Sand / mist surfaces | `--brand-sand` / `--brand-mist` | `#f7f6f3` / `#f0efeb` |
| Surface / card | `--background` / `--card` | `#ffffff` |
| Outline | `--border` | `#e2e0db` |
| Error | `--destructive` | oklch destructive |
| Success / warning | — | Not used in product UI yet; add when needed |

---

## 0.3 Typography drift (arbitrary `text-[…]` before fix)

| Value | Where | Target |
|---|---|---|
| `0.65rem` | SiteHeader tagline | `text-[0.65rem]` → `text-xs` + tracking (or leave as compressed eyebrow) |
| `0.7rem` | BadgeLabel | `text-xs` |
| `0.75rem` | SiteHeader utility bar | `text-xs` |
| `0.8rem` | button sm (shadcn) | leave / `text-xs` |
| `0.8125rem` | SiteHeader nav/CTA | matches `.ds-eyebrow` / `.ds-cta` → `text-sm` or keep via shared class |
| `0.875rem` | CampaignBanners | `text-sm` |
| `0.9375rem` | Cards quote/title | `text-sm` / `text-base` |
| `1.05rem` / `1.35rem` | SiteHeader brand | `text-lg` / `text-xl` |
| `1.25rem` | Heading level 3 | already `.ds-h3` — drop redundant arbitrary |

---

## 0.4 Parallel card surfaces (to unify)

| Location | Pattern |
|---|---|
| `programs/page.tsx` | `border border-border bg-white p-6` |
| `faculty/page.tsx` | `border border-border bg-white p-5` |
| `about/page.tsx` | `border border-border bg-white p-4` / `p-5` |
| `alumni/page.tsx` | `border border-border bg-white` |
| `programs/[slug]/page.tsx` | `border border-border bg-white p-4` |
| `ProfessionalLandingTemplate` | `border … bg-white p-8 shadow-sm` |
| `ProgramCarousel` | `border … bg-white p-6 shadow-[…]` |
| `ContactInterestForm` | `bg-white` inputs |

**Target:** `.ds-card` (+ optional `SurfaceCard` molecule) with `bg-card border-border`.

**Missing CSS classes referenced in code:** `ds-card`, `ds-card-dark` — must be defined in `globals.css`.

---

## 0.5 Allowed exceptions

1. `text-white` / `border-white/…` / `bg-white/10` on **dark surfaces** (`brand-deep`, `brand-dark`, overlays) — inverse chrome.
2. Hero illustration hexes listed in §0.1 illustration-only.
3. shadcn `navigation-menu` physical direction utilities — deferred (complex motion).

---

## 0.6 Acceptance for Phase 0

- [x] Unique color list captured
- [x] Role table filled with real values
- [x] Parallel surfaces identified
- [x] Token file = `src/app/globals.css` (no separate tokens.css needed)

## 0.7 Pass complete (2026-09-22)

Phases 1–3 applied: `ds-card` / `ds-card-dark` defined, `--brand-gold-deep` / `--brand-skel-mid` registered, product surfaces use `SurfaceCard`/`ds-card`, arbitrary type cleaned in chrome, `npm run build` succeeded.
