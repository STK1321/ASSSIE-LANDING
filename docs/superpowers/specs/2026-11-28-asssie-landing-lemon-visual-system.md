# ASSSIE landing — Lemon visual system

Date: 2026-11-28
Branch: `feat/lemon-visual-system`
Status: approved direction (approach B), implementation pending

## Intent

Keep the approved narrative, structure, copy and honesty constraints of
asssie.co and replace only its visual layer with the language of `lemon.me/co`:
dark surfaces, lime accent, Geist, 24px radii and a calmer, more spacious
rhythm. The Android app already uses this palette, so the site and the app end
up sharing one identity.

This is a re-skin plus composition. It is **not** a copy of Lemon's business
model, its badges, its numbers or its brand marks.

## Tokens (measured from the live site)

| Token | Value | Use |
| --- | --- | --- |
| page | `#0E0E0E` | body background |
| card | `#171717` | cards, inputs |
| elevated | `#1E1E1E` | hover, nested surfaces |
| divider | `#262626` | 1px rules and borders |
| lemon | `#CFFF2E` | primary accent, active states |
| on-lemon | `#0B0B0B` | text on lime |
| green | `#00DF1A` | secondary accent, small marks |
| deep-green | `#003D1B` | rare tint, never body text |
| text | `#F5F4F0` | primary text |
| muted | `#A2A2A1` | secondary text |
| danger | `#EB3131` | errors |
| warning | `#F6B60B` | cautions |

Type: **Geist** (400/500/700) and **Geist Mono** (400), from Google Fonts,
replacing Space Grotesk and Work Sans.

Radii: 24px cards, 20px medium surfaces, fully rounded pills.
Shadows: none. Depth comes from surface value, not from blur.
Borders: 1px `#262626` only when a boundary is genuinely needed.

Contrast (checked): muted on page 7.5:1, text on page 17.5:1, on-lemon on lemon
16.9:1, lemon on card ~10:1. All pass AA for body text.

## Composition rules

- One idea per block. Section spacing 96–128px; no cramped `py-12` stacks.
- Headlines carry the hierarchy; no kicker above every section. At most one
  small uppercase label per screen, and only where it names something real.
- Hero: single left-aligned statement, `clamp` max 5rem, tracking ≥ -0.03em.
- Cards: `#171717`, 24px radius, no border, no shadow; hover raises surface to
  `#1E1E1E`, nothing moves.
- Primary button: lime pill, black text. Secondary: transparent pill with a
  `#262626` border and off-white text.
- Motion: 150–240ms, ease-out, conveys state only. Existing reveal stays and
  continues to respect `prefers-reduced-motion`.

## Banned

Gradient text, glassmorphism, side-stripe borders, decorative numbers `01/02/03`
over every section, fake metrics, download badges, invented testimonials,
border+shadow on the same element.

## Copy

Unchanged. The six home blocks, `/qr-libre`, and both privacy pages keep the
approved text. Only presentation changes.

## Constraints

- Astro 4 + Tailwind 3, no new dependencies, no CMS, no adapter.
- Four routes stay: `/`, `/qr-libre`, `/privacidad`, `/qr-libre/privacidad`.
- `npm run verify` must stay green; `npx astro check` must report 0 errors.
- No `INTERNET` equivalent here: no analytics, no new third-party requests
  beyond Google Fonts, which the privacy page already discloses.
- Accessibility unchanged or better: focus visible, AA contrast, one `h1` per
  page, reduced motion respected.

## Acceptance

- Every surface is dark; no warm off-white body remains.
- Lime is reserved for action and state, never for decoration.
- Headlines are the strongest element on each screen.
- Nothing above 24px radius on cards; no shadows on cards.
- The site and the app look like the same family.
- `npm run verify` passes; four routes render; no copy changed.
