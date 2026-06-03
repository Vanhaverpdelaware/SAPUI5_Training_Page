# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML training site for SAPUI5/TypeScript. Delaware internal training resource. Zero build step — edit HTML directly. No npm, no framework.

## Serving locally

```bash
npx serve .              # serves at http://localhost:3000
npx serve . --listen 3030
```

## Adding a new page

1. Copy `_template.html` to the relevant chapter folder
2. Set `data-root="../"` and `data-page="[new-id]"` on `<body>`
3. Add one entry to the `NAV` array in `nav.js` with matching `id`, `title`, and `path`
4. Add the URL to `sitemap.xml`

## Key files

| File | Purpose |
|------|---------|
| `styles.css` | All styles. Design tokens at `:root`. Do not add inline styles to pages. |
| `nav.js` | NAV data structure + sidebar renderer. Only file to edit for navigation changes. |
| `_template.html` | Copy-paste base for new pages. Never served directly. |
| `agent-briefing.md` | CSS class reference + page ID table for agentic workers. |
| `sitemap.xml` | Update when adding pages. Change base URL before publishing. |
| `mockup.html` | Layout mockup (dev preview only — not part of the site). |

## Architecture

`nav.js` reads `data-root` and `data-page` from `<body>` to build the sidebar with correct relative links and active-state detection.

- Root pages (`index.html`): `data-root="./"`, `data-page=""`
- Chapter index pages (`*/index.html`): `data-root="../"`, `data-page=""`
- Content leaf pages: `data-root="../"`, `data-page="[page-id]"` (id from NAV in nav.js)

## Design tokens (styles.css :root)

| Token | Value | Use |
|-------|-------|-----|
| `--color-primary` | `#B83229` | Body text links, active states (WCAG AA) |
| `--color-primary-mid` | `#C0392B` | Headings, large text only |
| `--color-dark` | `#1C1C2E` | Site header background |
| `--content-max` | `72ch` | Max width for prose content |
| `--sidebar-width` | `260px` | Fixed sidebar width |

## Chapters

| Folder | Chapter |
|--------|---------|
| `01-prerequisites/` | Prerequisites |
| `02-sapui5-basics/` | SAPUI5 Basics |
| `03-typescript-in-ui5/` | TypeScript in UI5 |
| `04-dev-tooling/` | Development & Tooling |
| `05-exercises/` | Exercises |
