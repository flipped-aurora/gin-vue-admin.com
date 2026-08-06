# Home Heading Dark Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every requested landing-page heading an explicit dark-mode strong-text override while leaving blue emphasis unchanged.

**Architecture:** A focused Node test parses Vue SFC templates with the Vue compiler and checks the exact requested heading nodes. Production changes add only `dark:text-[var(--gva-text-strong)]` to affected heading parents.

**Tech Stack:** Vue 3 SFC compiler, Node.js test runner, Tailwind CSS 3, VitePress.

---

### Task 1: Add the regression test

**Files:**
- Create: `tests/home-heading-dark-mode.test.mjs`

- [ ] Write a Node test that parses the relevant Vue templates and asserts every matching desktop/mobile title node contains `dark:text-[var(--gva-text-strong)]` or its important variant.
- [ ] Run `node --test tests/home-heading-dark-mode.test.mjs` and verify it fails on headings that currently rely only on the changing CSS variable.

### Task 2: Add explicit dark-mode heading colors

**Files:**
- Modify: `docs/.vitepress/theme/components/home/sections/CallDeps.vue`
- Modify: `docs/.vitepress/theme/components/home/sections/CoreFeatures.vue`
- Modify: `docs/.vitepress/theme/components/home/sections/Community.vue`
- Modify: `docs/.vitepress/theme/components/home/sections/StarUsers.vue`
- Modify: `docs/.vitepress/theme/components/home/sections/FinalCta.vue`

- [ ] Add `dark:text-[var(--gva-text-strong)]` to only the affected title parent classes.
- [ ] Leave all child blue-span classes byte-for-byte unchanged.
- [ ] Run `node --test tests/home-heading-dark-mode.test.mjs` and verify it passes.

### Task 3: Verify production behavior

**Files:**
- Verify only: `docs/.vitepress/theme/components/home/sections/*.vue`

- [ ] Run `pnpm docs:build` and require a successful production build.
- [ ] Start the VitePress development server and inspect the requested titles in a real browser at desktop and mobile widths.
- [ ] In light mode, confirm the existing black values remain unchanged.
- [ ] In dark mode, confirm ordinary title text computes to `rgb(243, 245, 249)` and blue emphasis remains blue.
- [ ] Review the final diff to confirm no unrelated user changes are included.
