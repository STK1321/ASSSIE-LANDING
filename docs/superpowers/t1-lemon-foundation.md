# T1 — Lemon design foundation

Date: 2026-11-28
Branch: `feat/lemon-visual-system`
Status: done (foundation only; no section, page or copy changes)

Spec: `docs/superpowers/specs/2026-11-28-asssie-landing-lemon-visual-system.md`

## What changed

- `tailwind.config.cjs`: palette replaced with the spec tokens (`page`, `card`,
  `elevated`, `divider`, `lemon`, `onLemon`, `green`, `deepGreen`, `text`,
  `muted`, `danger`, `warning`). Fonts: `display`/`body` → Geist, `mono` →
  Geist Mono. Radii: `card` 24px, `medium` 20px. Removed `boxShadow.card`,
  `boxShadow.soft`, `backgroundImage.hero` and `backgroundImage.grid`.
- `src/styles/global.css`: `color-scheme: dark`, dark body (`#0E0E0E`) with
  off-white text, Geist body font, lime `:focus-visible` outline, lime
  selection at 25% alpha. Reveal system and its `prefers-reduced-motion`
  block are byte-for-byte unchanged in behavior.
- `src/layouts/BaseLayout.astro` / `ProductLayout.astro`: Geist
  (400/500/700) + Geist Mono (400) via the existing preload/print-media
  pattern, `theme-color` `#0E0E0E`, noscript reveal guard kept, skip link
  uses `bg-elevated`/`text-text`. `ProductLayout` accent default is
  `#CFFF2E`; `--product-accent` still applies.
- `src/components/atoms/Button.astro`: primary = lime pill with black text,
  ghost = transparent with `#262626` 1px border and off-white text, dark =
  `#1E1E1E` surface. 44px minimum height (48px for `lg`), lime focus ring.
- `src/components/molecules/SectionHeading.astro`: headline-led. Title is
  `text-3xl → md:text-5xl` with `tracking-[-0.02em]`, subtitle is body-size
  muted, eyebrow renders only when the prop is provided.

## Legacy bridge (intentional, temporary)

Sections still pass old class names. They are mapped to dark values in the
palette so dependent components stay legible until their own rewrite:

| Legacy class | Resolves to |
| --- | --- |
| `text-ink` / `bg-ink` | `#F5F4F0` |
| `text-slate`, `border-slate/*` | `#A2A2A1` (10–20% alpha reads as the divider) |
| `bg-surface` | `#171717` |
| `bg-white` / `text-white` | `#171717` (cards become dark, lime badge text becomes black) |
| `bg-mist` | `#1E1E1E` |
| `bg-accent` / `text-accent` | `#CFFF2E` |

`accentDark` and `glow` were dropped (no remaining consumers). `shadow-card`,
`shadow-soft`, `bg-hero` and `bg-grid` still appear in section markup but no
longer generate CSS; the next task should remove them while rewriting sections.

## Open items for the next task

1. `src/pages/qr-libre.astro:15` and `src/pages/qr-libre/privacidad.astro:6`
   still declare `const accent = "#1d4ed8"` and pass it to `ProductLayout`, so
   the built product pages emit `--product-accent:#1d4ed8` (blue). Pages were
   out of T1 scope. Drop those constants (and the `accent` prop) to inherit the
   lime default.
2. `public/favicon.svg` still uses the old teal/cream/amber palette. Out of
   scope here; the required grep only covers `src/` and the Tailwind config.
3. No dialog or backdrop rules exist in `global.css`; `backdrop-blur` on the
   header is a utility class, not a global rule, so nothing was removed.

## Verification (cwd = repo root)

- `npm run build` → 4 pages built, complete.
- `npm run verify` → `ok — 4 routes checked, 4 pages scanned`.
- `npx astro check` → `Result (35 files): 0 errors, 0 warnings, 3 hints`
  (hints are pre-existing script-directive/`media` notices).
- `grep -rn "f7f3ee\|0f766e\|f59e0b\|Space Grotesk\|Work Sans" src tailwind.config.cjs`
  → no matches.
- Spot-checked inlined CSS: `.bg-white` → `rgb(23 23 23)`, `.bg-lemon` →
  `rgb(207 255 46)`, `.text-text` → `rgb(245 244 240)`,
  `.border-divider` → `rgb(38 38 38)`, body → `#0e0e0e` / `#f5f4f0`.
