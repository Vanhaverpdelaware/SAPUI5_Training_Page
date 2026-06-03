# Training Site Playbook

Reference document for building internal delaware training sites. Captures all decisions, features, and patterns from the SAPUI5 & TypeScript Training site build.

---

## Architecture decisions

| Decision | Chosen | Rejected | Reason |
|----------|--------|----------|--------|
| Hosting format | Plain multi-file HTML | SharePoint .aspx, Static site generator | Zero build step, editable by non-developers, AI-crawlable per page |
| Content scope | Full skeleton + real content | Placeholder only | Sourced from Confluence (TDD-001, QA-003, ADR-002) and official docs |
| Hero banner | Removed | CSS gradient banner | Redundant — header already shows site title |
| Progress tracking | None (keep simple) | localStorage checkboxes, progress bar | Internal tool, team knows where they left off |
| Edit on GitHub link | Skipped | Per-page link to GitHub | Team navigates GitHub directly |

---

## Structure

```
site-root/
├── index.html                  ← Home: chapter card grid
├── styles.css                  ← All styles, design tokens at :root
├── nav.js                      ← Sidebar + all JS features (single file)
├── _template.html              ← Copy-paste base for new pages
├── search-index.json           ← Lunr.js search index (update when adding pages)
├── sitemap.xml                 ← Crawler/AI discoverability (update base URL before publishing)
├── agent-briefing.md           ← Context doc for AI agents building new pages
├── [NN]-[chapter-slug]/
│   ├── index.html              ← Chapter landing: breadcrumb + dropdown + page list
│   └── [page-slug].html        ← Content page: author + article + prev/next
└── docs/
    └── superpowers/            ← Design spec + implementation plan (internal)
```

**Chapter folder naming:** `[NN]-[slug]` — e.g. `01-prerequisites`, `02-sapui5-basics`. Numbered for sort order.

---

## Page templates

### Home page
- No hero banner — chapter cards start directly below header
- 2-column auto-fill card grid (`minmax(300px, 1fr)`)
- Each card: icon area (110px, light blue bg) + title + description + "All" tag

### Chapter index page
- Breadcrumb → chapter title
- Sub-page dropdown + "Next →" button
- Chapter intro paragraph
- Numbered list of sub-pages as clickable rows

### Content page
- Breadcrumb → chapter → page
- Author block (avatar + name + role)
- `<article>` with real content
- Prev / Next navigation with page titles

---

## Navigation system

All navigation is driven by `nav.js` — single source of truth.

```javascript
// To add a page: add one entry here + create the .html file
const NAV = [
  { id: 'chapter-id', title: 'Chapter Title', path: 'folder/index.html', pages: [
    { id: 'page-id', title: 'Page Title', path: 'folder/page.html' }
  ]}
];
```

Every `<body>` needs two attributes:
- `data-root`: `"./"` for root, `"../"` for chapter/leaf pages
- `data-page`: the `id` from NAV (empty for home + chapter index pages)

---

## Design tokens (styles.css :root)

| Token | Value | Notes |
|-------|-------|-------|
| `--color-primary` | `#B83229` | WCAG AA (4.9:1 on white) — links, active states |
| `--color-primary-mid` | `#C0392B` | Headings, large text only |
| `--color-dark` | `#1C1C2E` | Header background |
| `--color-bg` | `#F8F9FB` | Page background |
| `--sidebar-width` | `260px` | — |
| `--content-max` | `72ch` | Optimal reading line length |
| `--header-height` | `48px` | Used for sticky positioning offsets |

---

## Features implemented (all in nav.js + styles.css)

### Core navigation
- `<details>`/`<summary>` collapsible sidebar — zero JS, native browser
- Active page detection via `data-page` attribute
- Auto-opens chapter section for current page

### Search
- **lunr.js** client-side search (CDN, ~8KB)
- Pre-built `search-index.json` — update when adding pages
- Wildcard suffix search (`query*`)
- Hides chapter nav while searching, restores on clear
- **Keyboard shortcut:** Press `/` to focus search, `Esc` to clear

### Code blocks
- **Prism.js** syntax highlighting (CDN, autoloader)
- **Copy button** — appears on hover, "Copied!" feedback for 2s
- Languages auto-detected by Prism autoloader

### Content pages
- **"On this page" TOC** — auto-generated from `<h2>` headings (min 2 headings)
- **Reading time** — word count ÷ 200 wpm, shown below `<h1>`
- **Active scroll** — TOC link highlights as sections scroll into view (IntersectionObserver)
- **Sticky breadcrumb** — stays visible while scrolling

### UX
- **Dark mode toggle** — "☾ Dark" / "☀ Light" button in header, persisted in localStorage
- **Back to top button** — fixed bottom-right, appears after 400px scroll
- **Mobile hamburger** — sidebar slides in from left on screens < 768px, overlay closes it
- **Print styles** — `@media print` hides chrome, appends link URLs, wraps code

### AI discoverability
- `<title>` pattern: `Training — [Page Title] | delaware`
- `<meta name="description">` on every page
- `<meta name="keywords">` with relevant terms on every page
- Semantic HTML: `<main>`, `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
- `sitemap.xml` listing all pages

---

## Adding a new page checklist

1. Copy `_template.html` to the chapter folder
2. Set correct `data-root` and `data-page` on `<body>`
3. Add entry to `NAV` array in `nav.js`
4. Add URL to `sitemap.xml`
5. Add entry to `search-index.json` with `id`, `title`, `url`, `tags`
6. Update prev/next links on adjacent pages

---

## Content sourcing

For SAPUI5 training, content was sourced from:
- **Confluence SAPDEV space** — TDD-001 (project setup), QA-003 (UI5 frontend standards), ADR-002 (TypeScript mandate), class-based development guide
- **Official docs** — ui5.sap.com, sap.github.io/ui5-typescript, sap.github.io/ui5-tooling
- **SAP exercises** — SAP CodeJam UI5, SAPUI5 Walkthrough Tutorial

For other topics, search Confluence first, then official docs, then SAP Community blogs.

---

## What was skipped and why

| Feature | Reason skipped |
|---------|----------------|
| Progress tracking / checkboxes | Unnecessary complexity for internal tool |
| "Edit this page" GitHub link | Team navigates GitHub directly |
| Hero banner | Redundant with header title |
| SharePoint .aspx format | More complex, harder to maintain than plain HTML |
| Static site generator (Eleventy/Hugo) | Build step adds friction for non-developer editors |

---

## Deployment options

| Option | Effort | Notes |
|--------|--------|-------|
| GitHub Pages | 2 clicks | Free, public. Enable in repo Settings → Pages |
| SharePoint document library | Upload zip | Internal only, no setup needed |
| Intranet web server | Drop folder | IT involvement required |

Update `sitemap.xml` base URL after deploying.

---

## Tech stack summary

- **HTML5** — semantic elements throughout
- **CSS3** — custom properties, grid, flexbox, sticky positioning, `@media print`
- **Vanilla JS** (ES6) — all features in single `nav.js` file
- **Prism.js** 1.29.0 — syntax highlighting (CDN)
- **lunr.js** 2.3.9 — client-side search (CDN)
- **Zero dependencies** — no npm, no build step, no framework
