---
name: gva-css-standards
description: Use when writing or editing any CSS/SCSS/Tailwind in the gin-vue-admin docs & marketing site (docs/.vitepress/theme) — styling landing sections, buttons, headings, links, cards, colors, borders, radius, shadows, spacing, responsive breakpoints, or dark mode. Brand color is #2264F2.
---

# GVA Docs Site — CSS 规范 (Design Tokens & Conventions)

Reference for styling the GVA docs/marketing site (VitePress + Vue 3 + Tailwind). This is the **GVA 3.0 landing** design system. Keep everything token-based and consistent with the tables below.

## Core Rules (read first)

1. **Never hard-code brand blue.** Use the token `var(--gva-primary)` (= `#2264F2`). Every brand-blue variant in the repo was unified to `#2264F2`; do not reintroduce `#1268ff`, `#0b72ff`, `#287cff`, `#347CF3`, `rgba(78,128,238,…)`, or the old `#2465F2` / `rgba(36,101,242,…)`.
2. **Buttons always use `.gva-btn`** (`docs/.vitepress/theme/styles/landing.scss`). Rounded rectangle, `border-radius: 8px`. **Never** a pill (`border-radius: 999px`) for buttons.
3. **Base font size is 16px.** Body text, sub-headings, labels, leads, list items, links, pills → 16px. Exceptions that keep their own size: page/section display headings, buttons (14px), terminal/code (mono), decorative ghost numbers.
4. **Real headings use inline Tailwind arbitrary values**, not the `.gva-h1/.gva-h2/.gva-h3` SCSS classes (those are legacy/near-unused — `.gva-h2` was normalized to 16px and does **not** drive section titles). See the Typography section.
5. **Dark mode** is `.dark { … }` in `vars.css`, overriding the same token names. Style with tokens and dark mode mostly works for free.

**Files:** tokens → `styles/vars.css`; shared landing classes → `styles/landing.scss`; nav/docs-chrome + 2K tweaks → `styles/global.scss`.

## Brand & Semantic Colors

| Token | Light | Dark (`.dark`) | Use |
|---|---|---|---|
| `--gva-primary` | `#2264F2` | `#4f86ff` | Primary brand — buttons, links, accents |
| `--gva-primary-hover` | `#1B52D4` | `#6b9bf8` | Hover/pressed |
| `--gva-primary-soft` | `rgba(34,100,242,.1)` | `rgba(79,134,255,.16)` | Soft bg (pill/chip/dot halo) |
| `--gva-primary-ring` | `rgba(34,100,242,.28)` | `rgba(79,134,255,.34)` | Focus ring |
| `--gva-success` | `#16a34a` | — | On/success state |
| `--gva-danger` | `#ef4444` | — | Off/error state |
| `--gva-amber` | `#f59e0b` | — | Warning |

Legacy VitePress aliases (kept for nav/buttons/links, all point at the same blue): `--vp-c-brand`/`--vp-c-brand-1` = `#2264F2`, `--vp-c-brand-2`/`-light` = `#3B78F5`, `--vp-c-brand-3`/`-dark` = `#1B52D4`, `-lighter` = `#6B9BF8`, `-darker` = `#1644B5`, `-soft` = `rgba(34,100,242,.14)`.

**Non-brand accents that are intentionally NOT #2264F2** (leave them): status greens (`#16a34a`, `#4eb849`, `#34b765`), macOS traffic-light dots (`#ff5f57`/`#febc2e`/`#28c840`), one sky-blue accent `#38bdf8`, dark neutrals.

## Text & Background Colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--gva-text-strong` | `#0B0B0F` | `#f3f5f9` | Headings / emphasis |
| `--gva-text-body` | `#5A5F6B` | `#aab2c0` | Body copy |
| `--gva-text-muted` | `#8A8F99` | `#7c8595` | Captions / hints |
| `--gva-bg-base` | `#ffffff` | `#0f1115` | Default section bg |
| `--gva-bg-alt` | `#f7f7f7` | `#15181e` | Alternating section (`.gva-section--alt`) |
| `--gva-bg-dark` | `#0a0e1a` | `#06080f` | Dark section / terminal |
| `--gva-bg-dark-soft` | `#111726` | `#0d1320` | Dark elevated surface |

**Note:** some section headings hard-code near-black (`#1a1a1a`, `#050505`, `#030303`) rather than `--gva-text-strong`. This is existing convention for the hero/section titles; prefer the token for new work unless matching an adjacent title.

## Borders

| Token | Light | Dark | Notes |
|---|---|---|---|
| `--gva-border` | `rgba(15,23,42,.1)` | `rgba(255,255,255,.1)` | Default card/divider border |
| `--gva-border-strong` | `rgba(15,23,42,.16)` | `rgba(255,255,255,.16)` | Hover / emphasized border |

**Width:** `1px` everywhere (cards, dividers, ghost buttons). Underline accents (links) use `border-b-2` (2px) in `var(--gva-primary)`.

## Radius

| Token / value | Size | Use |
|---|---|---|
| `--gva-radius-sm` | `10px` | Small chips, inner elements |
| `--gva-radius` | `14px` | **Cards** (`.gva-card`) |
| `--gva-radius-lg` | `20px` | Large panels |
| (button) | `8px` | `.gva-btn` — fixed, do not change |
| (pill/round) | `999px` | Tags (`.gva-pill`), status dots, avatars — **not** buttons |

## Shadows

| Token | Value (light) |
|---|---|
| `--gva-shadow-sm` | `0 1px 2px rgba(15,23,42,.04), 0 4px 12px rgba(15,23,42,.05)` |
| `--gva-shadow` | `0 8px 24px rgba(15,23,42,.06), 0 2px 8px rgba(15,23,42,.04)` |
| `--gva-shadow-lg` | `0 24px 60px rgba(15,23,42,.1)` |
| `--gva-shadow-primary` | `0 10px 28px rgba(34,100,242,.28)` — CTA glow |

Dark mode swaps sm/base/lg for `rgba(0,0,0,…)` equivalents.

## Typography — base + responsive heading scale

**Base:** `.gva-landing { font-size: 16px; line-height: 1.6; }`, family = MiSans stack (`--vp-font-family-base`). Self-hosted MiSans weights: **305 / 330 / 380 / 520** (Normal / Regular / Medium / Semibold).

**Headings are inline Tailwind, and responsive is mandatory** — the user's rule is "非一级标题以及明确写的都走默认字号 (16px)", so anything that is NOT a display heading and has no deliberate size = 16px. Display headings follow this actual scale (verified in `components/home`):

| Role | Desktop size | Mobile / breakpoint steps | Weight | Leading | Tracking | Color |
|---|---|---|---|---|---|---|
| **H1** hero (page title) | `clamp(34px,5vw,56px)`; ≥2560px → `clamp(56px,3.2vw,76px)` | ≤860px → `28px` | 600 → mobile **700** | 1.2 → 1.32 | -0.02em → 0 | `#1a1a1a` |
| **H2** section (fluid) | `clamp(28px,3.6vw,40px)` (StarUsers `…,3.8vw,44px`) | ≤859px → `34px`, leading 1.22 | 700 | 1.18 | -0.02em | `--gva-text-strong` |
| **H2** section (stepped) | `sm:34 lg:40 xl:40` (ApiCli) / `sm:33 lg:37 xl:40` (Permissions) | mobile el `34px`/`28px` | 700 | 1.18 | -0.02…-0.045em | `#050505` |
| **H3** section display | `32 → min860:40 → min1920:44` (SkillsSystem); `34 → min860:36` (LiveGenerate) | mobile el `34px` | 600–700 | 1.2–1.32 | -0.04em | `#050505`/`#030303` |
| **H3** card title | `19–20px` | ≤859 → `20px` | 700 | 1.35 | -0.015em | `--gva-text-strong` |
| **H4** card title | `18–24px` (ApiCli `20 → xl:27`) | — | 600–700 | 1.3 | -0.02em | `#080A0E`/`#1c1c1e` |
| **H4** footer column | `13px` | — | 700 | — | 0.04em | `#fff` |
| Display `<p>` as title | `42px` (ToolCompat) | ≤720px → `34px` | 600 | 1.43 | 0 | `#030303` |
| Body / lead / bullets / muted / label / pill / link | **16px** | some `max-[859/860]:14px` | 300–500 | 1.6–2 | — | body/`#747981` |
| Button (`.gva-btn`) | `14px` | — | normal | — | — | — |
| Terminal / code | `13.5px` (`.gva-terminal__body`), title `12px` | — | — | 1.85 | — | mono, `#cdd6e4` |

### Dual-element responsive pattern (used for H1 and stepped H2/H3)
Big headings ship **two elements**, one shown per breakpoint — do not fight this with a single fluid value when matching these sections:
```html
<!-- desktop -->
<h1 class="text-[clamp(34px,5vw,56px)] … max-[860px]:hidden">…</h1>
<!-- mobile -->
<h1 class="… hidden max-[860px]:block max-[860px]:text-[28px] …">…</h1>
```

### Breakpoints (compatibility)
- **Tailwind defaults:** `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536.
- **Custom max (mobile down-steps):** `max-[560px]`, `max-[720px]`, `max-[859px]`, `max-[860px]` — 860 is the primary desktop/mobile split.
- **Custom min (large-screen up-steps):** `min-[860px]`, `min-[1920px]`, `min-[2560px]`.
- **2K+ (≥2560px):** `vars.css` widens 版心 (`--gva-content` 1100→**1600px**, `--gva-container` 1200→**1700px**); `global.scss` bumps nav font to 18px.

## Component classes (landing.scss)

| Class | Spec |
|---|---|
| `.gva-btn` | inline-flex, **h 43px** (≤860px → 48px), `padding 0 28px`, **radius 8px**, font 14px, 1px transparent border |
| `.gva-btn--primary` | bg `--gva-primary`, `#fff`; hover → `--gva-primary-hover` + `translateY(-1px)` |
| `.gva-btn--ghost` | transparent, text+border `--gva-primary`; on `--dark` section → white |
| `.gva-link` | inline-flex, `--gva-primary`, 16px, 600, arrow slides on hover |
| `.gva-card` | bg base, `1px --gva-border`, **radius 14px**, `--gva-shadow-sm`; `.gva-card--hover` lifts 3px |
| `.gva-pill` | pill (999px), 16px/500, mono, `--gva-primary-soft` bg + `--gva-primary` text |
| `.gva-label` | 16px/600, `--gva-primary`, leading `●` dot with soft halo |
| `.gva-bullets li` | 16px, 26px left pad, blue dot (`--gva-primary` + soft halo) |
| `.gva-ghost-num` | decorative `clamp(40px,5vw,64px)`, weight 800, `--gva-ghost-num` faint fill |

## Layout / spacing

| Token / value | Size |
|---|---|
| `--gva-content` (版心 main) | `1100px` (≥2560px → 1600px) |
| `--gva-container` (footer wide) | `1200px` (≥2560px → 1700px) |
| `.gva-container--narrow` | `940px` |
| `.gva-section` padding | `88px 24px` (≤860px → `60px 20px`) |
| `.gva-head` bottom margin | `56px` (≤860px → 40px) |
| `.gva-two-col` gap | `56px` (≤860px → 32px, stacks to 1 col) |

## Common Mistakes

- ❌ Hard-coding `#2264F2` (or an old blue) instead of `var(--gva-primary)`.
- ❌ Pill-shaped buttons — buttons are always 8px radius via `.gva-btn`.
- ❌ Relying on `.gva-h2/.gva-h3` for section titles — they're 16px legacy; use the inline Tailwind scale above.
- ❌ Single fluid font-size where the section uses the dual-element show/hide pattern (breaks the mobile step).
- ❌ Forgetting the `.dark` override when introducing a new raw color — prefer a token so dark mode is automatic.
- ❌ Bumping a body/label/lead above 16px — only display headings and the listed exceptions deviate from 16px.

## Verify after color/token edits
Audit for stray old brand blues before finishing:
```bash
grep -rinE "#1268ff|#0b72ff|#287cff|#347cf3|#0f5ae0|2465f2|36, ?101, ?242|78, ?128, ?238" docs/.vitepress/theme | grep -v /cache/
```
Expected: no matches. Then `pnpm docs:dev` and load `/` — confirm no Sass/Vue compile errors.
