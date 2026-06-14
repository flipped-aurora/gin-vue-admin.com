# Legal Pages and Footer Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/terms`, `/privacy`, and `/refund` pages to the VitePress site and expose them through footer links while keeping the existing doc-style layout intact.

**Architecture:** The legal pages will be plain top-level Markdown files under `docs/`, which VitePress automatically maps to the requested routes. Footer links will be rendered from the custom theme layout layer in `docs/.vitepress/theme/` so the existing VitePress footer message/copyright remain intact and the current sidebar, ads, and page chrome are unchanged.

**Tech Stack:** VitePress 1.3, Vue 3, Markdown, Sass

---

## File structure

- Create: `docs/terms.md` — Terms of Service page content
- Create: `docs/privacy.md` — Privacy Policy page content
- Create: `docs/refund.md` — Refund Policy page content
- Create: `docs/.vitepress/theme/components/LegalFooterLinks.vue` — footer link row rendered below the default layout
- Modify: `docs/.vitepress/theme/gvaLayout.vue` — mount the legal footer links in the custom layout without changing ads or other slots
- Modify: `docs/.vitepress/theme/styles/global.scss` — add minimal styling for the legal footer links row
- Verify: `package.json` — use existing `pnpm docs:build` and `pnpm docs:dev` scripts, no script changes required

### Task 1: Add the three legal content pages

**Files:**
- Create: `docs/terms.md`
- Create: `docs/privacy.md`
- Create: `docs/refund.md`

- [ ] **Step 1: Write the three Markdown pages**

Create `docs/terms.md` with this content:

```md
# Terms of Service

Last Updated: June 2026

These Terms of Service govern your use of Gin-Vue-Admin products and services.

## License

When purchasing a license, you are granted a non-exclusive, non-transferable license to use the software according to the selected plan.

## Restrictions

You may not:

- Resell the license without authorization.
- Distribute proprietary commercial resources included in the product.
- Remove copyright notices where required by the license.

## Updates

License holders may receive updates according to their purchased plan.

## Support

Technical support is provided according to the support policy associated with the purchased license.

## Disclaimer

The software is provided "as is" without warranty of any kind.

## Limitation of Liability

In no event shall Gin-Vue-Admin be liable for any indirect, incidental, or consequential damages.

## Contact

Email: business@gin-vue-admin.com
```

Create `docs/privacy.md` with this content:

```md
# Privacy Policy

Last Updated: June 2026

We respect your privacy and are committed to protecting your personal information.

## Information We Collect

We may collect:

- Name
- Email address
- Billing information
- License information

## How We Use Information

We use collected information to:

- Process orders
- Deliver licenses
- Provide customer support
- Improve our services

## Payment Processing

Payments are processed securely through third-party payment providers such as Paddle.

We do not store credit card information.

## Data Security

We take reasonable measures to protect your information.

## Third-Party Services

We may use third-party services for analytics, payment processing, and customer support.

## Contact

Email: business@gin-vue-admin.com
```

Create `docs/refund.md` with this content:

```md
# Refund Policy

Last Updated: June 2026

We want customers to be satisfied with their purchase.

## Eligibility

Refund requests may be accepted within 14 days of purchase if:

- The product does not function as described.
- A duplicate purchase was made.
- Technical issues cannot be resolved.

## Non-refundable Situations

Refunds will generally not be provided for:

- Change of mind.
- Failure to read product documentation.
- Lack of required technical knowledge.

## Requesting a Refund

To request a refund, contact:

business@gin-vue-admin.com

Please include:

- Order number
- Purchase email
- Reason for request

## Processing

Approved refunds will be processed through the original payment method.
```

- [ ] **Step 2: Run the docs build to verify the new routes compile**

Run:

```bash
pnpm docs:build
```

Expected: the VitePress production build completes successfully and emits the three new routes with no Markdown or route-generation errors.

- [ ] **Step 3: Commit the content pages**

```bash
git add docs/terms.md docs/privacy.md docs/refund.md
git commit -m "docs: add legal policy pages"
```

### Task 2: Render legal links in the footer area

**Files:**
- Create: `docs/.vitepress/theme/components/LegalFooterLinks.vue`
- Modify: `docs/.vitepress/theme/gvaLayout.vue`
- Modify: `docs/.vitepress/theme/styles/global.scss`

- [ ] **Step 1: Write the failing theme change by mounting a new footer component**

Create `docs/.vitepress/theme/components/LegalFooterLinks.vue` with this content:

```vue
<template>
  <div class="gva-legal-footer-links">
    <a href="/terms">Terms of Service</a>
    <a href="/privacy">Privacy Policy</a>
    <a href="/refund">Refund Policy</a>
  </div>
</template>
```

Update `docs/.vitepress/theme/gvaLayout.vue` to this structure:

```vue
<template>
  <Layout>
    <template #layout-top>
      <!--  <GiteeBanner /> -->
    </template>
    <template #aside-outline-after>
      <AsideAd></AsideAd>
    </template>
    <template #layout-bottom>
      <LegalFooterLinks />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import AsideAd from './components/asideAd.vue'
import GiteeBanner from './components/GiteeBanner.vue'
import LegalFooterLinks from './components/LegalFooterLinks.vue'

const { Layout } = DefaultTheme
</script>
```

Append this styling to `docs/.vitepress/theme/styles/global.scss`:

```scss
.gva-legal-footer-links {
    display: flex;
    justify-content: center;
    gap: 16px;
    padding: 16px 24px 32px;
    font-size: 14px;
    line-height: 1.5;
    flex-wrap: wrap;
}

.gva-legal-footer-links a {
    color: var(--vp-c-text-2);
    transition: color 0.2s ease;
}

.gva-legal-footer-links a:hover {
    color: var(--vp-c-brand-1);
}
```

- [ ] **Step 2: Run the docs build to verify the theme compiles**

Run:

```bash
pnpm docs:build
```

Expected: PASS. If VitePress reports that `layout-bottom` is not a supported slot, stop and switch `gvaLayout.vue` to wrap `<Layout />` plus `<LegalFooterLinks />` as sibling nodes in the template instead:

```vue
<template>
  <div>
    <Layout>
      <template #layout-top>
        <!--  <GiteeBanner /> -->
      </template>
      <template #aside-outline-after>
        <AsideAd></AsideAd>
      </template>
    </Layout>
    <LegalFooterLinks />
  </div>
</template>
```

Keep the same `<script setup>` imports in that fallback.

- [ ] **Step 3: Start the local docs site for manual verification**

Run:

```bash
pnpm docs:dev --host 127.0.0.1 --port 4173
```

Expected: a local VitePress server starts and prints a local URL for manual testing.

- [ ] **Step 4: Verify the pages and footer links in a browser**

Manually verify all of the following in the running site:

```text
Open /terms and confirm the Terms of Service heading and body render.
Open /privacy and confirm the Privacy Policy heading and body render.
Open /refund and confirm the Refund Policy heading and body render.
On each page, confirm the footer contains links for Terms of Service, Privacy Policy, and Refund Policy.
Click each footer link and confirm it navigates to the expected route.
Confirm the aside ad area still renders on normal doc pages such as /guide/introduce/project.
```

- [ ] **Step 5: Commit the footer link implementation**

```bash
git add docs/.vitepress/theme/components/LegalFooterLinks.vue docs/.vitepress/theme/gvaLayout.vue docs/.vitepress/theme/styles/global.scss
git commit -m "feat: add legal links to site footer"
```

### Task 3: Final verification and cleanup

**Files:**
- Verify only; no new files expected

- [ ] **Step 1: Run the final production build**

Run:

```bash
pnpm docs:build
```

Expected: PASS with no build errors.

- [ ] **Step 2: Review git diff for unintended changes**

Run:

```bash
git diff -- docs/terms.md docs/privacy.md docs/refund.md docs/.vitepress/theme/components/LegalFooterLinks.vue docs/.vitepress/theme/gvaLayout.vue docs/.vitepress/theme/styles/global.scss
```

Expected: only the legal pages, the footer link component, the layout mount, and the matching styles appear.

- [ ] **Step 3: Confirm git status is clean except for intentionally uncommitted work**

Run:

```bash
git status --short
```

Expected: no unexpected modified or untracked files.

- [ ] **Step 4: Prepare the handoff summary**

Use this summary structure:

```text
Added /terms, /privacy, and /refund as VitePress pages.
Added footer links to those three routes through the custom theme layout.
Verified docs build succeeds and manually checked rendering/navigation in the local site.
```
