---
name: legal-pages-footer-links-design
description: Add terms, privacy, and refund pages plus footer links in the VitePress site.
metadata:
  type: project
---

# Legal pages and footer links

## Goal
Add three public legal pages at `/terms`, `/privacy`, and `/refund`, and expose them from the site footer.

## Scope
- Create three new top-level VitePress Markdown pages using the provided copy.
- Keep the existing document-style layout for these pages.
- Add footer links for Terms of Service, Privacy Policy, and Refund Policy.

## Page content
- `/terms` → Terms of Service
- `/privacy` → Privacy Policy
- `/refund` → Refund Policy

Each page will use the exact user-provided content for the initial version.

## UI approach
Use the current VitePress theme and page chrome instead of building a separate policy-page layout. This keeps the pages consistent with the rest of the docs site and minimizes implementation changes.

## Footer approach
The current theme footer configuration only supports a message plus a single copyright string, so the footer link row will be added in the custom layout/theme layer rather than forcing HTML links into the config string.

## Implementation outline
1. Add the three Markdown pages in the docs root so VitePress serves them at the requested routes.
2. Update the custom layout/theme to render a small legal-links row in the footer area.
3. Keep the existing ads, sidebar, and document chrome unchanged.

## Success criteria
- Visiting `/terms`, `/privacy`, and `/refund` renders the provided content.
- The footer shows links to all three pages.
- Existing docs navigation and layout continue to work normally.
