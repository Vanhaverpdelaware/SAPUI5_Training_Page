# Training Site Playbook

Reference document for building internal delaware training sites. Captures all decisions, features, patterns and bug fixes from the SAPUI5 & TypeScript Training site build.

---

## Architecture decisions

| Decision | Chosen | Rejected | Reason |
|----------|--------|----------|--------|
| Hosting format | Plain multi-file HTML | SharePoint .aspx, Static site generator | Zero build step, editable by non-developers, AI-crawlable per page |
| Content scope | Full skeleton + real content | Placeholder only | Sourced from Confluence (TDD-001, QA-003, ADR-002) and official docs |
| Hero banner | Removed | CSS gradient banner | Redundant — header already shows site title |
| Progress tracking | None (keep simple) | localStorage checkboxes, progress bar | Internal tool, team knows where they left off |
| Edit on GitHub link | Skipped | Per-page link to GitHub | Team navigates GitHub directly |
| PWA manifest | Skipped | manifest.json for installability | Overkill for internal training tool |

---

## File structure

```
site-root/
├── index.html                  ← Home: chapter card grid
├── styles.css                  ← All styles, design tokens at :root
├── nav.js                      ← Sidebar + ALL JS features (single file)
├── _template.html              ← Copy-paste base for new pages
├── search-index.json           ← Lunr.js search index (update when adding pages)
├── sitemap.xml                 ← Crawler/AI discoverability (update base URL before publishing)
├── favicon.svg                 ← Red UI5 favicon, injected by nav.js
├── 404.html                    ← Custom not-found page
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
- Breadcrumb → chapter title (sticky while scrolling)
- Sub-page dropdown (first option: "Jump to page…" disabled placeholder) + "Next →" button
- Chapter intro paragraph
- Numbered list of sub-pages as clickable rows

### Content page
- Breadcrumb → chapter → page (sticky while scrolling)
- Author block (avatar + name + role)
- Reading time estimate below `<h1>` (excludes code block word count)
- "On this page" TOC (auto-generated from h2, min 2 headings required)
- `<article>` with real content
- Prev / Next navigation with page titles — cross-chapter links connect all 5 chapters end-to-end

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
- `data-page`: the `id` from NAV (empty string for home + chapter index pages)

`initNav()` is idempotent — guarded by `data-navInit` on `<body>`, safe to call multiple times.

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

Dark mode swaps these via `[data-theme="dark"]` on `<html>`. All components use tokens — no hardcoded colors except derived shadows.

---

## Features implemented (all in nav.js + styles.css)

### Core navigation
- `<details>`/`<summary>` collapsible sidebar — zero JS, native browser
- Active page detection via `data-page` attribute
- Auto-opens chapter section for current page
- **Cross-chapter prev/next** — last page of each chapter links to first page of next

### Search
- **lunr.js** client-side search (CDN, ~8KB)
- Pre-built `search-index.json` — update when adding pages
- Wildcard suffix search (`query*`), minimum 2 characters before triggering
- Hides chapter nav while searching, restores on clear
- Max-height `60vh` on results dropdown — no overflow on mobile
- **Keyboard shortcuts:** Press `/` to focus search, `Esc` to clear

### Code blocks
- **Prism.js** syntax highlighting (CDN + autoloader)
- **Auto language detection** in `nav.js` — classifies blocks by content pattern (TypeScript, XML/markup, YAML, JSON, bash) without requiring `class="language-*"` in HTML
- Prism runs AFTER language classes are applied (correct timing via `onload` chain)
- **Copy button** — appended inside `<pre>` element (not a wrapper div), positioned `absolute` relative to `<pre>`. Appears on hover, "Copied!" green feedback for 2s

### Content pages
- **"On this page" TOC** — auto-generated from `<h2>` headings (min 2 headings). Inserted before first h2.
- **Reading time** — word count ÷ 200 wpm, shown below `<h1>`. Code blocks excluded from count.
- **Active scroll** — TOC link highlights as sections scroll into view (IntersectionObserver, `-10% / -80%` margins)
- **Sticky breadcrumb** — `position: sticky; top: var(--header-height); z-index: 5` — stays visible while scrolling
- **Heading anchor links** — `#` permalink appears on hover of h2/h3. h2 IDs use `section-N` prefix, h3 use `subsection-N` (no collision)

### UX
- **Dark mode toggle** — "☾ Dark" / "☀ Light" button injected into header by nav.js. Persisted in localStorage. Smooth 0.2s transition on body/header/sidebar.
- **Back to top button** — fixed bottom-right (40px circle), appears after 400px scroll, smooth scroll
- **Mobile hamburger** — fixed bottom-left (48px circle, red), sidebar slides in with 0.25s ease, overlay closes it, auto-closes on link click
- **Print styles** — `@media print` hides: header, sidebar, hamburger, buttons, dark toggle, reading time, copy buttons. Appends `href` values after links. Wraps code.
- **Skip-to-content** — `<a id="skip-link">` prepended to body, visible on Tab keypress (accessibility)
- **Open Graph / Twitter meta tags** — injected by nav.js from existing title + description. Enables link previews in Teams/Slack.
- **Favicon** — SVG red rounded rect with "UI5" text, injected by nav.js via `data-root + 'favicon.svg'`
- **Custom 404 page** — `404.html` with sidebar navigation and back-to-home button

### AI discoverability
- `<title>` pattern: `SAPUI5 Training — [Page Title] | delaware`
- `<meta name="description">` and `<meta name="keywords">` on every page
- Semantic HTML: `<main>`, `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
- `sitemap.xml` listing all pages (update base URL before publishing)

---

## Adding a new page checklist

1. Copy `_template.html` to the relevant chapter folder
2. Set `data-root="../"` and `data-page="[new-id]"` on `<body>`
3. Add one entry to `NAV` array in `nav.js`
4. Add URL to `sitemap.xml`
5. Add entry to `search-index.json` with `id`, `title`, `url`, `tags`
6. Update prev/next links on adjacent pages (including cross-chapter if first/last of chapter)

---

## Known bugs fixed (important for future replication)

| Bug | Fix |
|-----|-----|
| Copy button outside code block | Append button to `<pre>` with `position: relative`, not to a wrapper div |
| h2/h3 duplicate IDs between TOC and anchor functions | Use `subsection-N` prefix for h3, `section-N` for h2 |
| Copy button invisible in dark mode | Add `[data-theme="dark"] .copy-btn` CSS overrides |
| Header z-index below sticky breadcrumb | Header `z-index: 20`, breadcrumb `z-index: 5` |
| Prism highlights before language classes set | Call `autoDetectLanguage()` inside Prism's `onload`, before autoloader |
| initNav() created duplicate DOM on re-call | `data-navInit` guard on `<body>` as first line of `initNav()` |
| Search fired on 1-char input (noise) | `q.length < 2` guard before lunr search |
| Reading time inflated by code blocks | Clone body, remove `<pre>` before word count |
| Search results overflow on mobile | `max-height: 60vh; overflow-y: auto` on `.search-results` |
| Chapter dropdown re-navigated on re-select | Add `<option value="" disabled selected>Jump to page…</option>` as first option |
| Dark mode card/shadow invisible | Add dark mode overrides for `box-shadow` on `.card:hover` and `.chapter-link-item:hover` |
| Search icon invisible in dark mode | Override `background-image` SVG stroke color in `[data-theme="dark"]` |

---

## Local development

```bash
# Always run from the project root folder
cd "path/to/training-site"
npx serve@14 . --listen 3030
# Open http://localhost:3030/index.html
```

**Important:** Always run `serve` from the project root, not a parent directory. Running from a parent directory causes chapter links to 404 because relative paths resolve incorrectly. Do NOT create a `serve.json` — it breaks `index.html` auto-serving for directories.

---

## Content sourcing

For SAPUI5 training, content was sourced from:
- **Confluence SAPDEV space** — TDD-001 (project setup), QA-003 (UI5 frontend standards), ADR-002 (TypeScript mandate), class-based development guide
- **Official docs** — ui5.sap.com, sap.github.io/ui5-typescript, sap.github.io/ui5-tooling
- **SAP exercises** — SAP CodeJam UI5, SAPUI5 Walkthrough Tutorial

For other topics: search Confluence first → official docs → SAP Community blogs.

---

## What was skipped and why

| Feature | Reason skipped |
|---------|----------------|
| Progress tracking / checkboxes | Unnecessary complexity for internal tool |
| "Edit this page" GitHub link | Team navigates GitHub directly |
| Hero banner | Redundant with header title |
| SharePoint .aspx format | More complex, harder to maintain than plain HTML |
| Static site generator (Eleventy/Hugo) | Build step adds friction for non-developer editors |
| PWA manifest | Overkill for internal training tool |
| serve.json | Breaks directory→index.html mapping, causes directory listings |

---

## Deployment options

| Option | Effort | Notes |
|--------|--------|-------|
| GitHub Pages | 2 clicks | Free, public. Enable in repo Settings → Pages |
| SharePoint document library | Upload zip | Internal only, no setup needed |
| Intranet web server | Drop folder | IT involvement required |

Update `sitemap.xml` base URL after deploying. Transfer repo ownership in GitHub Settings → Danger Zone → Transfer if needed.

---

## Tech stack summary

- **HTML5** — semantic elements throughout
- **CSS3** — custom properties, grid, flexbox, sticky positioning, `@media print`, dark mode via `[data-theme]`
- **Vanilla JS** (ES6) — all features in single `nav.js` file (~400 lines)
- **Prism.js** 1.29.0 — syntax highlighting (CDN + autoloader)
- **lunr.js** 2.3.9 — client-side full-text search (CDN)
- **Zero dependencies** — no npm, no build step, no framework
