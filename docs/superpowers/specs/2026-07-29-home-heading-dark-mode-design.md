# Home Heading Dark Mode Design

## Goal

Adapt the black portions of the requested landing-page headings for dark mode. In dark mode they must use `var(--gva-text-strong)`, whose current dark value is `#f3f5f9`.

## Scope

- Review only the requested headings under `docs/.vitepress/theme/components/home/sections`.
- Keep every heading's existing light-mode color, including its current `#030303`, `#050505`, `#1a1a1a`, or `#1c1c1c` value.
- Add `dark:text-[var(--gva-text-strong)]` to each affected heading parent that does not already have an effective dark-mode override.
- Preserve all blue emphasis spans and their colors without modification.
- Cover both desktop and mobile heading variants where the component renders separate markup.

## Implementation

Use explicit Tailwind dark-mode utilities on the individual heading parent elements. Do not replace light-mode literals with a shared token and do not introduce a new shared heading class.

This keeps the change local to the affected text, preserves existing light-mode visual differences, and follows the repository's existing class-based dark-mode pattern.

## Verification

- Add a focused source-level regression test that checks every affected black-text heading variant has the required dark-mode class.
- Confirm the test fails before the production change and passes afterward.
- Run the documentation production build.
- Inspect the landing page in light and dark modes at desktop and mobile widths, confirming black text becomes `var(--gva-text-strong)` in dark mode while blue emphasis remains blue.

## Non-Goals

- No heading typography, spacing, content, or layout changes.
- No changes to body copy, cards, navigation, or other landing-page colors.
- No refactor of the landing-page color system.
