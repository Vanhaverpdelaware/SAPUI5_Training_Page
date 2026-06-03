# SAPUI5 Training Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete static HTML training site skeleton for SAPUI5/TypeScript with delaware red branding, shared sidebar navigation, and AI discoverability.

**Architecture:** Multi-file static HTML — one `.html` per page, shared `styles.css` + `nav.js` included on every page. `nav.js` renders the sidebar dynamically from a single NAV data structure, using `data-root` + `data-page` attributes on `<body>` for path resolution and active-state detection. No build step, no framework.

**Tech Stack:** Plain HTML5, CSS3 (custom properties), vanilla JS (ES6). Zero dependencies.

---

## File Map

| File | Responsibility |
|------|---------------|
| `styles.css` | All design tokens + component styles. Single source of truth for visual system. |
| `nav.js` | NAV data structure + sidebar renderer. Single source of truth for all navigation links. |
| `_template.html` | Canonical base HTML for copy-pasting when creating new pages. |
| `agent-briefing.md` | Shared context doc for Phase 2 agents — token names, patterns, file list. |
| `index.html` | Home page: hero + chapter card grid. |
| `01-prerequisites/index.html` | Chapter landing: breadcrumb + dropdown + sub-page list. |
| `01-prerequisites/ide-setup.html` | Content page: author block + article + prev/next. |
| `01-prerequisites/nodejs-tooling.html` | Content page (same template). |
| `01-prerequisites/system-access.html` | Content page (same template). |
| `02-sapui5-basics/index.html` | Chapter landing. |
| `02-sapui5-basics/mvc-pattern.html` | Content page. |
| `02-sapui5-basics/views-controllers.html` | Content page. |
| `02-sapui5-basics/data-binding.html` | Content page. |
| `02-sapui5-basics/odata-basics.html` | Content page. |
| `03-typescript-in-ui5/index.html` | Chapter landing. |
| `03-typescript-in-ui5/ts-setup.html` | Content page. |
| `03-typescript-in-ui5/types-and-classes.html` | Content page. |
| `03-typescript-in-ui5/strict-mode.html` | Content page. |
| `04-dev-tooling/index.html` | Chapter landing. |
| `04-dev-tooling/ui5-tooling.html` | Content page. |
| `04-dev-tooling/bas-vs-vscode.html` | Content page. |
| `04-dev-tooling/build-deploy.html` | Content page. |
| `05-exercises/index.html` | Chapter landing. |
| `05-exercises/exercise-1.html` | Content page. |
| `05-exercises/exercise-2.html` | Content page. |
| `05-exercises/exercise-3.html` | Content page. |
| `sitemap.xml` | All page URLs for AI/crawler indexing. |
| `CLAUDE.md` | Updated project guidance for future Claude sessions. |

---

## ═══ PHASE 1 — FOUNDATION ═══
> Complete Phase 1 fully before dispatching Phase 2 agents.

---

### Task 1: styles.css

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Create styles.css with design tokens and all component styles**

```css
/* ── Design tokens ─────────────────────────────────────────────── */
:root {
  /* Colors */
  --color-primary:       #A93226;   /* 5.1:1 on white — WCAG AA body text */
  --color-primary-hover: #8e2318;
  --color-primary-light: #fdf2f1;   /* 8% tint — active nav bg */
  --color-primary-mid:   #C0392B;   /* headings + large text only */
  --color-dark:          #1a1a2e;
  --color-text:          #1a1a1a;
  --color-text-muted:    #555e6b;
  --color-text-subtle:   #767676;   /* 4.5:1 on white — minimum safe gray */
  --color-border:        #e2e8f0;
  --color-bg:            #f7f8fa;
  --color-surface:       #ffffff;
  --color-card-icon-bg:  #dceefa;
  --color-code-bg:       #f3f4f6;
  --color-code-dark:     #1e1e1e;

  /* Layout */
  --sidebar-width: 260px;
  --header-height: 48px;
  --content-max:   72ch;

  /* Spacing */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2rem;
  --space-2xl: 2.5rem;

  /* Shape */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* Typography */
  --font-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
}

/* ── Reset ─────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; }
body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
a { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }
a:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 2px; }

/* ── Site header ───────────────────────────────────────────────── */
.site-header {
  background: var(--color-dark);
  color: white;
  height: var(--header-height);
  padding: 0 var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 50;
}
.site-header .badge {
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.site-header .site-title { font-weight: 600; font-size: 15px; }
.site-header .header-spacer { flex: 1; }
.site-header .top-nav { display: flex; gap: var(--space-lg); }
.site-header .top-nav a { color: #c0c8d4; font-size: 13px; }
.site-header .top-nav a:hover { color: white; text-decoration: none; }

/* ── Shell layout ──────────────────────────────────────────────── */
.shell {
  display: flex;
  flex: 1;
}

/* ── Sidebar ───────────────────────────────────────────────────── */
.sidebar {
  width: var(--sidebar-width);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
}
.sidebar-head {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.sidebar-head span {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 1px;
  text-transform: uppercase;
}
/* <details>/<summary> collapsible — zero JS */
.sidebar details { border-bottom: 1px solid var(--color-border); }
.sidebar details summary {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px var(--space-md);
  font-size: 13px;
  font-weight: 600;
  color: #2d3748;
  cursor: pointer;
  user-select: none;
  gap: var(--space-sm);
}
.sidebar details summary::-webkit-details-marker { display: none; }
.sidebar details summary:hover { background: var(--color-bg); }
.sidebar details summary .chevron {
  font-size: 10px;
  color: var(--color-text-subtle);
  transition: transform 0.15s;
  flex-shrink: 0;
}
.sidebar details[open] summary .chevron { transform: rotate(90deg); }
.sidebar-link {
  display: block;
  padding: 7px var(--space-md) 7px 32px;
  font-size: 13px;
  color: var(--color-text-muted);
  text-decoration: none;
  line-height: 1.4;
}
.sidebar-link:hover { background: var(--color-bg); color: var(--color-text); text-decoration: none; }
.sidebar-link.active {
  border-left: 3px solid var(--color-primary);
  padding-left: 29px;
  color: var(--color-primary);
  font-weight: 600;
  background: var(--color-primary-light);
}
.sidebar-footer {
  margin-top: auto;
  padding: var(--space-md);
  font-size: 11px;
  color: var(--color-text-subtle);
  border-top: 1px solid var(--color-border);
}

/* ── Main content area ─────────────────────────────────────────── */
.main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

/* ── Hero (CSS-only — no image dependency) ─────────────────────── */
.hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
  color: white;
  padding: var(--space-2xl) var(--space-2xl);
  position: relative;
  overflow: hidden;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(192,57,43,0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(99,179,237,0.10) 0%, transparent 40%);
  pointer-events: none;
}
.hero h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  position: relative;
  z-index: 1;
}
.hero p {
  font-size: 1rem;
  color: #a8c4db;
  max-width: 540px;
  position: relative;
  z-index: 1;
}

/* ── Home: chapter card grid ───────────────────────────────────── */
.home-section { padding: var(--space-2xl); }
.home-section h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-lg);
  max-width: 900px;
}
.card {
  display: flex;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s, transform 0.1s;
}
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.10); transform: translateY(-1px); text-decoration: none; }
.card-icon {
  width: 88px;
  background: var(--color-card-icon-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 26px;
}
.card-body { padding: var(--space-md); }
.card-body h3 { font-size: 0.9375rem; font-weight: 600; color: var(--color-primary-mid); margin-bottom: 5px; line-height: 1.3; }
.card-body p { font-size: 0.8125rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: var(--space-sm); }
.card-tag {
  display: inline-block;
  font-size: 11px;
  color: var(--color-text-subtle);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 1px 8px;
  border-radius: 100px;
}

/* ── Chapter index page ────────────────────────────────────────── */
.chapter-page { padding: var(--space-2xl); max-width: 860px; }
.breadcrumb {
  font-size: 0.8125rem;
  color: var(--color-text-subtle);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.breadcrumb a { color: var(--color-primary); }
.breadcrumb .sep { color: var(--color-border); }
.page-nav-bar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2xl);
}
.page-nav-bar select {
  flex: 1;
  padding: 7px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-family: var(--font-sans);
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
}
.btn { padding: 8px 20px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: var(--font-sans); transition: background 0.15s; }
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-primary-hover); }
.chapter-intro h1 { font-size: 1.5rem; font-weight: 700; color: var(--color-dark); border-left: 4px solid var(--color-primary); padding-left: var(--space-md); margin-bottom: var(--space-md); }
.chapter-intro p { font-size: 0.9375rem; color: var(--color-text-muted); line-height: 1.7; max-width: var(--content-max); }
.chapter-links { margin-top: var(--space-xl); display: flex; flex-direction: column; gap: var(--space-sm); }
.chapter-link-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.chapter-link-item:hover { border-color: var(--color-primary); box-shadow: 0 2px 8px rgba(169,50,38,0.10); text-decoration: none; }
.chapter-link-item .link-num { font-size: 12px; font-weight: 700; color: var(--color-primary); background: var(--color-primary-light); padding: 3px 8px; border-radius: 100px; flex-shrink: 0; }
.chapter-link-item .link-title { font-size: 14px; font-weight: 500; }
.chapter-link-item .link-arrow { margin-left: auto; color: var(--color-text-subtle); }

/* ── Content page ──────────────────────────────────────────────── */
.content-page { padding: var(--space-2xl); max-width: 860px; }
.author-block { display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-xl); padding-bottom: var(--space-lg); border-bottom: 1px solid var(--color-border); }
.author-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--color-card-icon-bg); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.author-info strong { display: block; font-size: 14px; color: var(--color-text); }
.author-info span { font-size: 12px; color: var(--color-text-subtle); }
.content-body h1 { font-size: 2rem; font-weight: 700; color: var(--color-dark); margin-bottom: var(--space-lg); line-height: 1.25; }
.content-body h2 { font-size: 1.5rem; font-weight: 600; color: var(--color-dark); margin-top: var(--space-2xl); margin-bottom: var(--space-md); padding-top: var(--space-md); border-top: 1px solid var(--color-border); }
.content-body h3 { font-size: 1.125rem; font-weight: 600; color: var(--color-dark); margin-top: var(--space-xl); margin-bottom: var(--space-sm); }
.content-body p { font-size: 1rem; color: var(--color-text-muted); line-height: 1.75; max-width: var(--content-max); margin-bottom: var(--space-md); }
.content-body ul, .content-body ol { padding-left: 1.5rem; margin-bottom: var(--space-md); color: var(--color-text-muted); font-size: 1rem; line-height: 1.75; max-width: var(--content-max); }
.content-body li { margin-bottom: var(--space-xs); }
.content-body code { font-family: var(--font-mono); font-size: 0.875em; background: var(--color-code-bg); padding: 2px 6px; border-radius: 3px; color: var(--color-primary); }
.content-body pre { background: var(--color-code-dark); color: #d4d4d4; padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 14px; line-height: 1.5; overflow-x: auto; margin: var(--space-lg) 0; max-width: calc(var(--content-max) + 4rem); }
.content-body pre code { background: none; padding: 0; color: inherit; font-size: inherit; }
/* Callout boxes */
.callout { padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); margin: var(--space-lg) 0; font-size: 0.9375rem; max-width: var(--content-max); }
.callout.note    { background: #eff6ff; border-left: 4px solid #3b82f6; color: #1e40af; }
.callout.warning { background: #fffbeb; border-left: 4px solid #f59e0b; color: #92400e; }
.callout.tip     { background: var(--color-primary-light); border-left: 4px solid var(--color-primary); color: #7f1d1d; }
.callout strong  { font-weight: 700; }
/* Prev/Next navigation */
.prev-next { display: flex; justify-content: space-between; gap: var(--space-md); margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid var(--color-border); }
.nav-btn { display: flex; flex-direction: column; padding: var(--space-md) var(--space-lg); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-decoration: none; color: var(--color-text); min-width: 180px; transition: border-color 0.15s; }
.nav-btn:hover { border-color: var(--color-primary); text-decoration: none; }
.nav-btn.next { text-align: right; }
.nav-btn .nav-label { font-size: 11px; color: var(--color-text-subtle); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
.nav-btn .nav-title { font-size: 14px; font-weight: 600; color: var(--color-primary); }

/* ── Footer ─────────────────────────────────────────────────────── */
.site-footer { background: var(--color-dark); color: #667587; text-align: center; padding: var(--space-md); font-size: 12px; flex-shrink: 0; margin-top: auto; }

/* ── Responsive ────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .hero { padding: var(--space-xl) var(--space-lg); }
  .home-section { padding: var(--space-xl) var(--space-lg); }
  .chapter-page, .content-page { padding: var(--space-xl) var(--space-lg); }
  .cards-grid { grid-template-columns: 1fr; }
  .prev-next { flex-direction: column; }
  .nav-btn { min-width: 0; }
}
```

- [ ] **Step 2: Verify file created and syntax is valid**

Open `styles.css` in a browser devtools Sources tab — no parse errors shown.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add global styles with delaware red design tokens"
```

---

### Task 2: nav.js

**Files:**
- Create: `nav.js`

- [ ] **Step 1: Create nav.js with NAV structure and sidebar renderer**

```javascript
// Single source of truth for all navigation.
// To add a page: add entry here + create the .html file.
// data-root on <body>: "./" for root pages, "../" for chapter/leaf pages.
// data-page on <body>: the `id` field of the page entry below.

const NAV = [
  {
    id: '01-prerequisites',
    title: '01 Prerequisites',
    path: '01-prerequisites/index.html',
    pages: [
      { id: 'ide-setup',       title: 'IDE Setup',             path: '01-prerequisites/ide-setup.html' },
      { id: 'nodejs-tooling',  title: 'Node.js & UI5 Tooling', path: '01-prerequisites/nodejs-tooling.html' },
      { id: 'system-access',   title: 'System Access',         path: '01-prerequisites/system-access.html' },
    ],
  },
  {
    id: '02-sapui5-basics',
    title: '02 SAPUI5 Basics',
    path: '02-sapui5-basics/index.html',
    pages: [
      { id: 'mvc-pattern',        title: 'MVC Pattern',           path: '02-sapui5-basics/mvc-pattern.html' },
      { id: 'views-controllers',  title: 'Views & Controllers',   path: '02-sapui5-basics/views-controllers.html' },
      { id: 'data-binding',       title: 'Data Binding',          path: '02-sapui5-basics/data-binding.html' },
      { id: 'odata-basics',       title: 'OData Basics',          path: '02-sapui5-basics/odata-basics.html' },
    ],
  },
  {
    id: '03-typescript-in-ui5',
    title: '03 TypeScript in UI5',
    path: '03-typescript-in-ui5/index.html',
    pages: [
      { id: 'ts-setup',           title: 'TypeScript Setup',      path: '03-typescript-in-ui5/ts-setup.html' },
      { id: 'types-and-classes',  title: 'Types & Classes',       path: '03-typescript-in-ui5/types-and-classes.html' },
      { id: 'strict-mode',        title: 'Strict Mode',           path: '03-typescript-in-ui5/strict-mode.html' },
    ],
  },
  {
    id: '04-dev-tooling',
    title: '04 Dev & Tooling',
    path: '04-dev-tooling/index.html',
    pages: [
      { id: 'ui5-tooling',   title: 'UI5 Tooling',    path: '04-dev-tooling/ui5-tooling.html' },
      { id: 'bas-vs-vscode', title: 'BAS vs VS Code', path: '04-dev-tooling/bas-vs-vscode.html' },
      { id: 'build-deploy',  title: 'Build & Deploy', path: '04-dev-tooling/build-deploy.html' },
    ],
  },
  {
    id: '05-exercises',
    title: '05 Exercises',
    path: '05-exercises/index.html',
    pages: [
      { id: 'exercise-1', title: 'Exercise 1', path: '05-exercises/exercise-1.html' },
      { id: 'exercise-2', title: 'Exercise 2', path: '05-exercises/exercise-2.html' },
      { id: 'exercise-3', title: 'Exercise 3', path: '05-exercises/exercise-3.html' },
    ],
  },
];

function buildSidebar(currentPageId, root) {
  const sections = NAV.map(chapter => {
    const isChapterActive = chapter.pages.some(p => p.id === currentPageId) || chapter.id === currentPageId;
    const links = chapter.pages.map(page => {
      const isActive = page.id === currentPageId;
      return `<a href="${root}${page.path}" class="sidebar-link${isActive ? ' active' : ''}">${page.title}</a>`;
    }).join('');
    return `
      <details${isChapterActive ? ' open' : ''}>
        <summary>${chapter.title} <span class="chevron">›</span></summary>
        ${links}
      </details>`;
  }).join('');

  return `
    <div class="sidebar-head"><span>SAPUI5 Training</span></div>
    ${sections}
    <div class="sidebar-footer">SAPUI5 &amp; TypeScript Training v1.0</div>
  `;
}

function initNav() {
  const mount = document.getElementById('nav-mount');
  if (!mount) return;
  const root = document.body.dataset.root || './';
  const currentPageId = document.body.dataset.page || '';
  mount.innerHTML = buildSidebar(currentPageId, root);
}

document.addEventListener('DOMContentLoaded', initNav);
```

- [ ] **Step 2: Verify nav.js logic with a quick smoke test**

Create a temporary `test.html` at the project root:
```html
<!DOCTYPE html>
<html><body data-root="./" data-page="ide-setup">
<div id="nav-mount"></div>
<script src="nav.js"></script>
</body></html>
```
Open in browser. Sidebar should render with "01 Prerequisites" open and "IDE Setup" highlighted active. Delete `test.html` after verifying.

- [ ] **Step 3: Commit**

```bash
git add nav.js
git commit -m "feat: add nav.js sidebar renderer with full NAV structure"
```

---

### Task 3: _template.html

**Files:**
- Create: `_template.html`

- [ ] **Step 1: Create the canonical base template**

This file is never served — it's a copy-paste source for creating new pages.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- EDIT: update title for each page -->
  <title>SAPUI5 Training — [Page Title] | delaware</title>
  <!-- EDIT: update description for each page -->
  <meta name="description" content="[One sentence describing this page's content]">
  <meta name="keywords" content="SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, delaware, SAP BTP">
  <meta name="author" content="delaware">
  <!-- EDIT: set data-root to "./" for root pages, "../" for chapter/leaf pages -->
  <!-- EDIT: set data-page to the page id from NAV in nav.js -->
  <link rel="stylesheet" href="[ROOT]styles.css">
</head>
<body data-root="[ROOT]" data-page="[PAGE-ID]">

  <header class="site-header">
    <a href="[ROOT]index.html" class="badge" style="text-decoration:none;">UI5</a>
    <span class="site-title">SAPUI5 &amp; TypeScript Training</span>
    <div class="header-spacer"></div>
    <nav class="top-nav" aria-label="Site navigation">
      <a href="[ROOT]index.html">Home</a>
      <a href="[ROOT]index.html#chapters">Chapters</a>
    </nav>
  </header>

  <div class="shell">
    <aside class="sidebar" aria-label="Chapter navigation">
      <div id="nav-mount"></div>
    </aside>
    <main class="main">
      <!-- PAGE CONTENT GOES HERE -->
    </main>
  </div>

  <footer class="site-footer">
    SAPUI5 &amp; TypeScript Training v1.0 — delaware
  </footer>

  <script src="[ROOT]nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add _template.html
git commit -m "feat: add _template.html base page template"
```

---

### Task 4: agent-briefing.md

**Files:**
- Create: `agent-briefing.md`

> **Note:** Update the "CSS tokens" and "nav.js confirmed" sections AFTER reviewing Phase 1 output before dispatching Phase 2 agents.

- [ ] **Step 1: Create agent-briefing.md**

```markdown
# Agent Briefing — SAPUI5 Training Site Phase 2

Read this file before creating any pages. It is the single source of truth for all patterns.

## Your job (Phase 2)

Create static HTML skeleton pages. All content is placeholder — the team fills in real content later.
Do NOT change `styles.css` or `nav.js`. Read them, don't modify them.

## File locations

All paths are relative to the project root (`SAPUI5 Training page/`).

### Files you must create

| File | Template type |
|------|--------------|
| `index.html` | Home page |
| `01-prerequisites/index.html` | Chapter index |
| `01-prerequisites/ide-setup.html` | Content page |
| `01-prerequisites/nodejs-tooling.html` | Content page |
| `01-prerequisites/system-access.html` | Content page |
| `02-sapui5-basics/index.html` | Chapter index |
| `02-sapui5-basics/mvc-pattern.html` | Content page |
| `02-sapui5-basics/views-controllers.html` | Content page |
| `02-sapui5-basics/data-binding.html` | Content page |
| `02-sapui5-basics/odata-basics.html` | Content page |
| `03-typescript-in-ui5/index.html` | Chapter index |
| `03-typescript-in-ui5/ts-setup.html` | Content page |
| `03-typescript-in-ui5/types-and-classes.html` | Content page |
| `03-typescript-in-ui5/strict-mode.html` | Content page |
| `04-dev-tooling/index.html` | Chapter index |
| `04-dev-tooling/ui5-tooling.html` | Content page |
| `04-dev-tooling/bas-vs-vscode.html` | Content page |
| `04-dev-tooling/build-deploy.html` | Content page |
| `05-exercises/index.html` | Chapter index |
| `05-exercises/exercise-1.html` | Content page |
| `05-exercises/exercise-2.html` | Content page |
| `05-exercises/exercise-3.html` | Content page |
| `sitemap.xml` | Sitemap |

## Confirmed CSS classes (from styles.css)

| Component | Class |
|-----------|-------|
| Header | `.site-header`, `.badge`, `.site-title`, `.top-nav` |
| Layout | `.shell`, `.sidebar`, `.main` |
| Sidebar mount | `#nav-mount` (div — nav.js fills this) |
| Hero | `.hero` |
| Home cards | `.home-section`, `.cards-grid`, `.card`, `.card-icon`, `.card-body`, `.card-tag` |
| Chapter index | `.chapter-page`, `.breadcrumb`, `.sep`, `.page-nav-bar`, `.btn`, `.btn-primary`, `.chapter-intro`, `.chapter-links`, `.chapter-link-item`, `.link-num`, `.link-title`, `.link-arrow` |
| Content page | `.content-page`, `.author-block`, `.author-avatar`, `.author-info`, `.content-body` |
| Callouts | `.callout.note`, `.callout.warning`, `.callout.tip` |
| Prev/Next | `.prev-next`, `.nav-btn`, `.nav-btn.next`, `.nav-label`, `.nav-title` |
| Footer | `.site-footer` |

## nav.js data attributes

Every `<body>` tag needs two attributes:

| Attribute | Root pages (`index.html`) | Chapter/leaf pages |
|-----------|--------------------------|-------------------|
| `data-root` | `"./"` | `"../"` |
| `data-page` | `""` (empty) | Page id from table below |

### Page IDs (from NAV in nav.js)

| File | data-page value |
|------|----------------|
| `01-prerequisites/index.html` | `""` (chapter index — no leaf active) |
| `01-prerequisites/ide-setup.html` | `"ide-setup"` |
| `01-prerequisites/nodejs-tooling.html` | `"nodejs-tooling"` |
| `01-prerequisites/system-access.html` | `"system-access"` |
| `02-sapui5-basics/index.html` | `""` |
| `02-sapui5-basics/mvc-pattern.html` | `"mvc-pattern"` |
| `02-sapui5-basics/views-controllers.html` | `"views-controllers"` |
| `02-sapui5-basics/data-binding.html` | `"data-binding"` |
| `02-sapui5-basics/odata-basics.html` | `"odata-basics"` |
| `03-typescript-in-ui5/index.html` | `""` |
| `03-typescript-in-ui5/ts-setup.html` | `"ts-setup"` |
| `03-typescript-in-ui5/types-and-classes.html` | `"types-and-classes"` |
| `03-typescript-in-ui5/strict-mode.html` | `"strict-mode"` |
| `04-dev-tooling/index.html` | `""` |
| `04-dev-tooling/ui5-tooling.html` | `"ui5-tooling"` |
| `04-dev-tooling/bas-vs-vscode.html` | `"bas-vs-vscode"` |
| `04-dev-tooling/build-deploy.html` | `"build-deploy"` |
| `05-exercises/index.html` | `""` |
| `05-exercises/exercise-1.html` | `"exercise-1"` |
| `05-exercises/exercise-2.html` | `"exercise-2"` |
| `05-exercises/exercise-3.html` | `"exercise-3"` |

## Chapter metadata

| Folder | Title | Description | Icon |
|--------|-------|-------------|------|
| `01-prerequisites` | Prerequisites | Tools, accounts and IDE setup required before starting the training. | ⚙️ |
| `02-sapui5-basics` | SAPUI5 Basics | Core UI5 concepts: MVC, data binding, controls and views. | 📐 |
| `03-typescript-in-ui5` | TypeScript in UI5 | TypeScript setup, class syntax, strict mode and type annotations in UI5. | 🔷 |
| `04-dev-tooling` | Development & Tooling | UI5 Tooling, BAS vs VS Code setup, linting, build and deploy. | 🛠️ |
| `05-exercises` | Exercises | Hands-on exercises to practise your SAPUI5 & TypeScript skills. | 📝 |

## Sub-page metadata (for prev/next nav titles)

### 01 Prerequisites
| File | Title | Prev | Next |
|------|-------|------|------|
| `ide-setup.html` | IDE Setup | — | Node.js & UI5 Tooling |
| `nodejs-tooling.html` | Node.js & UI5 Tooling | IDE Setup | System Access |
| `system-access.html` | System Access | Node.js & UI5 Tooling | — |

### 02 SAPUI5 Basics
| File | Title | Prev | Next |
|------|-------|------|------|
| `mvc-pattern.html` | MVC Pattern | — | Views & Controllers |
| `views-controllers.html` | Views & Controllers | MVC Pattern | Data Binding |
| `data-binding.html` | Data Binding | Views & Controllers | OData Basics |
| `odata-basics.html` | OData Basics | Data Binding | — |

### 03 TypeScript in UI5
| File | Title | Prev | Next |
|------|-------|------|------|
| `ts-setup.html` | TypeScript Setup | — | Types & Classes |
| `types-and-classes.html` | Types & Classes | TypeScript Setup | Strict Mode |
| `strict-mode.html` | Strict Mode | Types & Classes | — |

### 04 Dev & Tooling
| File | Title | Prev | Next |
|------|-------|------|------|
| `ui5-tooling.html` | UI5 Tooling | — | BAS vs VS Code |
| `bas-vs-vscode.html` | BAS vs VS Code | UI5 Tooling | Build & Deploy |
| `build-deploy.html` | Build & Deploy | BAS vs VS Code | — |

### 05 Exercises
| File | Title | Prev | Next |
|------|-------|------|------|
| `exercise-1.html` | Exercise 1 | — | Exercise 2 |
| `exercise-2.html` | Exercise 2 | Exercise 1 | Exercise 3 |
| `exercise-3.html` | Exercise 3 | Exercise 2 | — |

## Meta keywords to use on every page

```
SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, SAP BTP, MVC, data binding, OData, delaware
```

## Placeholder text to use in content areas

```
[Placeholder content — to be filled in by the training team.]
```

Use `<div class="callout tip"><strong>Note:</strong> Placeholder content — to be filled in by the training team.</div>` as the main content placeholder in article bodies.
```

- [ ] **Step 2: Commit**

```bash
git add agent-briefing.md
git commit -m "docs: add agent-briefing.md shared context for Phase 2 agents"
```

---

## ⚠️ QUALITY GATE — Review before Phase 2

Before dispatching any Phase 2 agents:

1. Open browser at `http://localhost:3030` (or `npx serve .`)
2. Create one test page using `_template.html` as copy source — verify sidebar renders, active state works, styles load
3. Confirm `agent-briefing.md` CSS class table matches what's actually in `styles.css`
4. Delete test page
5. Only then dispatch Phase 2 agents

---

## ═══ PHASE 2 — PAGES (run Tasks 5–9 in parallel) ═══

---

### Task 5: Home page — index.html

**Files:**
- Create: `index.html`

Read `agent-briefing.md` and `_template.html` before starting.

- [ ] **Step 1: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAPUI5 & TypeScript Training | delaware</title>
  <meta name="description" content="SAPUI5 and TypeScript training for delaware consultants. Covers prerequisites, UI5 basics, TypeScript setup, tooling, and hands-on exercises.">
  <meta name="keywords" content="SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, SAP BTP, MVC, data binding, OData, delaware">
  <meta name="author" content="delaware">
  <link rel="stylesheet" href="./styles.css">
</head>
<body data-root="./" data-page="">

  <header class="site-header">
    <a href="./index.html" class="badge" style="text-decoration:none;">UI5</a>
    <span class="site-title">SAPUI5 &amp; TypeScript Training</span>
    <div class="header-spacer"></div>
    <nav class="top-nav" aria-label="Site navigation">
      <a href="./index.html">Home</a>
      <a href="./index.html#chapters">Chapters</a>
    </nav>
  </header>

  <div class="shell">
    <aside class="sidebar" aria-label="Chapter navigation">
      <div id="nav-mount"></div>
    </aside>
    <main class="main">
      <div class="hero">
        <h1>Welcome to SAPUI5 &amp; TypeScript Training</h1>
        <p>A hands-on guide for delaware consultants building SAP Fiori applications with modern TypeScript.</p>
      </div>
      <section class="home-section" id="chapters">
        <h2>SAPUI5 Training</h2>
        <div class="cards-grid">
          <a href="./01-prerequisites/index.html" class="card">
            <div class="card-icon" aria-hidden="true">⚙️</div>
            <div class="card-body">
              <h3>Prerequisites</h3>
              <p>Tools, accounts and IDE setup required before starting the training.</p>
              <span class="card-tag">All</span>
            </div>
          </a>
          <a href="./02-sapui5-basics/index.html" class="card">
            <div class="card-icon" aria-hidden="true">📐</div>
            <div class="card-body">
              <h3>SAPUI5 Basics</h3>
              <p>Core UI5 concepts: MVC, data binding, controls and views.</p>
              <span class="card-tag">All</span>
            </div>
          </a>
          <a href="./03-typescript-in-ui5/index.html" class="card">
            <div class="card-icon" aria-hidden="true">🔷</div>
            <div class="card-body">
              <h3>TypeScript in UI5</h3>
              <p>TypeScript setup, class syntax, strict mode and type annotations in UI5.</p>
              <span class="card-tag">All</span>
            </div>
          </a>
          <a href="./04-dev-tooling/index.html" class="card">
            <div class="card-icon" aria-hidden="true">🛠️</div>
            <div class="card-body">
              <h3>Development &amp; Tooling</h3>
              <p>UI5 Tooling, BAS vs VS Code setup, linting, build and deploy.</p>
              <span class="card-tag">All</span>
            </div>
          </a>
          <a href="./05-exercises/index.html" class="card">
            <div class="card-icon" aria-hidden="true">📝</div>
            <div class="card-body">
              <h3>Exercises</h3>
              <p>Hands-on exercises to practise your SAPUI5 &amp; TypeScript skills.</p>
              <span class="card-tag">All</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  </div>

  <footer class="site-footer">
    SAPUI5 &amp; TypeScript Training v1.0 — delaware
  </footer>

  <script src="./nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3030/index.html`. Check:
- Sidebar renders with all 5 chapters
- 5 chapter cards visible in grid
- Hero section shows
- All card links point to correct chapter folders

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home page with chapter card grid"
```

---

### Task 6: Chapter index pages (all 5)

**Files:**
- Create: `01-prerequisites/index.html`
- Create: `02-sapui5-basics/index.html`
- Create: `03-typescript-in-ui5/index.html`
- Create: `04-dev-tooling/index.html`
- Create: `05-exercises/index.html`

Read `agent-briefing.md` before starting. All 5 follow the same pattern — create them all in this task.

- [ ] **Step 1: Create 01-prerequisites/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAPUI5 Training — Prerequisites | delaware</title>
  <meta name="description" content="Prerequisites for SAPUI5 and TypeScript training: IDE setup, Node.js, UI5 Tooling installation and system access at delaware.">
  <meta name="keywords" content="SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, SAP BTP, MVC, data binding, OData, delaware">
  <meta name="author" content="delaware">
  <link rel="stylesheet" href="../styles.css">
</head>
<body data-root="../" data-page="">

  <header class="site-header">
    <a href="../index.html" class="badge" style="text-decoration:none;">UI5</a>
    <span class="site-title">SAPUI5 &amp; TypeScript Training</span>
    <div class="header-spacer"></div>
    <nav class="top-nav" aria-label="Site navigation">
      <a href="../index.html">Home</a>
      <a href="../index.html#chapters">Chapters</a>
    </nav>
  </header>

  <div class="shell">
    <aside class="sidebar" aria-label="Chapter navigation">
      <div id="nav-mount"></div>
    </aside>
    <main class="main">
      <div class="chapter-page">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="../index.html">SAPUI5 Training</a>
          <span class="sep" aria-hidden="true">›</span>
          <strong>Prerequisites</strong>
        </nav>
        <div class="page-nav-bar">
          <select aria-label="Select page" onchange="if(this.value) window.location.href=this.value">
            <option value="ide-setup.html">IDE Setup</option>
            <option value="nodejs-tooling.html">Node.js &amp; UI5 Tooling</option>
            <option value="system-access.html">System Access</option>
          </select>
          <button class="btn btn-primary" onclick="window.location.href='ide-setup.html'">Next →</button>
        </div>
        <div class="chapter-intro">
          <h1>Prerequisites</h1>
          <p>This chapter covers everything you need before starting the SAPUI5 training. Follow each sub-page in order to prepare your development environment.</p>
        </div>
        <nav class="chapter-links" aria-label="Chapter pages">
          <a href="ide-setup.html" class="chapter-link-item">
            <span class="link-num">01</span>
            <span class="link-title">IDE Setup</span>
            <span class="link-arrow" aria-hidden="true">›</span>
          </a>
          <a href="nodejs-tooling.html" class="chapter-link-item">
            <span class="link-num">02</span>
            <span class="link-title">Node.js &amp; UI5 Tooling</span>
            <span class="link-arrow" aria-hidden="true">›</span>
          </a>
          <a href="system-access.html" class="chapter-link-item">
            <span class="link-num">03</span>
            <span class="link-title">System Access</span>
            <span class="link-arrow" aria-hidden="true">›</span>
          </a>
        </nav>
      </div>
    </main>
  </div>

  <footer class="site-footer">SAPUI5 &amp; TypeScript Training v1.0 — delaware</footer>
  <script src="../nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create 02-sapui5-basics/index.html**

Same pattern as above. Change: title, description, `data-page=""`, breadcrumb text, h1, intro p, dropdown options + onchange targets, chapter-link-items.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAPUI5 Training — SAPUI5 Basics | delaware</title>
  <meta name="description" content="SAPUI5 Basics: MVC pattern, views and controllers, data binding, and OData fundamentals for SAP Fiori development.">
  <meta name="keywords" content="SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, SAP BTP, MVC, data binding, OData, delaware">
  <meta name="author" content="delaware">
  <link rel="stylesheet" href="../styles.css">
</head>
<body data-root="../" data-page="">
  <header class="site-header">
    <a href="../index.html" class="badge" style="text-decoration:none;">UI5</a>
    <span class="site-title">SAPUI5 &amp; TypeScript Training</span>
    <div class="header-spacer"></div>
    <nav class="top-nav" aria-label="Site navigation">
      <a href="../index.html">Home</a><a href="../index.html#chapters">Chapters</a>
    </nav>
  </header>
  <div class="shell">
    <aside class="sidebar" aria-label="Chapter navigation"><div id="nav-mount"></div></aside>
    <main class="main">
      <div class="chapter-page">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="../index.html">SAPUI5 Training</a>
          <span class="sep" aria-hidden="true">›</span>
          <strong>SAPUI5 Basics</strong>
        </nav>
        <div class="page-nav-bar">
          <select aria-label="Select page" onchange="if(this.value) window.location.href=this.value">
            <option value="mvc-pattern.html">MVC Pattern</option>
            <option value="views-controllers.html">Views &amp; Controllers</option>
            <option value="data-binding.html">Data Binding</option>
            <option value="odata-basics.html">OData Basics</option>
          </select>
          <button class="btn btn-primary" onclick="window.location.href='mvc-pattern.html'">Next →</button>
        </div>
        <div class="chapter-intro">
          <h1>SAPUI5 Basics</h1>
          <p>Core UI5 concepts every developer needs: the MVC architecture pattern, views and controllers, data binding, and OData service integration.</p>
        </div>
        <nav class="chapter-links" aria-label="Chapter pages">
          <a href="mvc-pattern.html" class="chapter-link-item"><span class="link-num">01</span><span class="link-title">MVC Pattern</span><span class="link-arrow" aria-hidden="true">›</span></a>
          <a href="views-controllers.html" class="chapter-link-item"><span class="link-num">02</span><span class="link-title">Views &amp; Controllers</span><span class="link-arrow" aria-hidden="true">›</span></a>
          <a href="data-binding.html" class="chapter-link-item"><span class="link-num">03</span><span class="link-title">Data Binding</span><span class="link-arrow" aria-hidden="true">›</span></a>
          <a href="odata-basics.html" class="chapter-link-item"><span class="link-num">04</span><span class="link-title">OData Basics</span><span class="link-arrow" aria-hidden="true">›</span></a>
        </nav>
      </div>
    </main>
  </div>
  <footer class="site-footer">SAPUI5 &amp; TypeScript Training v1.0 — delaware</footer>
  <script src="../nav.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create 03-typescript-in-ui5/index.html**

Same pattern. Title: `TypeScript in UI5`. Pages: TypeScript Setup, Types & Classes, Strict Mode. Desc: `TypeScript in SAPUI5: setup, type annotations, class syntax and strict mode for robust Fiori apps.`

- [ ] **Step 4: Create 04-dev-tooling/index.html**

Same pattern. Title: `Development & Tooling`. Pages: UI5 Tooling, BAS vs VS Code, Build & Deploy. Desc: `Development tooling for SAPUI5: UI5 Tooling CLI, BAS vs VS Code comparison, build pipeline and deployment.`

- [ ] **Step 5: Create 05-exercises/index.html**

Same pattern. Title: `Exercises`. Pages: Exercise 1, Exercise 2, Exercise 3. Desc: `Hands-on SAPUI5 and TypeScript exercises for delaware trainees. Build real Fiori apps step by step.`

- [ ] **Step 6: Commit**

```bash
git add 01-prerequisites/index.html 02-sapui5-basics/index.html 03-typescript-in-ui5/index.html 04-dev-tooling/index.html 05-exercises/index.html
git commit -m "feat: add all 5 chapter index pages"
```

---

### Task 7: Content leaf pages (all 16)

**Files:** All 16 `.html` leaf pages across the 5 chapter folders.

Read `agent-briefing.md` before starting. All 16 pages use the **content page** template. The pattern is identical for each — only title, description, `data-page`, breadcrumb, author placeholder, h1, and prev/next links change.

- [ ] **Step 1: Create the canonical content page pattern**

Use `01-prerequisites/ide-setup.html` as the first example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAPUI5 Training — IDE Setup | delaware</title>
  <meta name="description" content="IDE setup for SAPUI5 and TypeScript development at delaware: VS Code, SAP Fiori Tools extension and Business Application Studio.">
  <meta name="keywords" content="SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, SAP BTP, MVC, data binding, OData, delaware">
  <meta name="author" content="delaware">
  <link rel="stylesheet" href="../styles.css">
</head>
<body data-root="../" data-page="ide-setup">

  <header class="site-header">
    <a href="../index.html" class="badge" style="text-decoration:none;">UI5</a>
    <span class="site-title">SAPUI5 &amp; TypeScript Training</span>
    <div class="header-spacer"></div>
    <nav class="top-nav" aria-label="Site navigation">
      <a href="../index.html">Home</a>
      <a href="../index.html#chapters">Chapters</a>
    </nav>
  </header>

  <div class="shell">
    <aside class="sidebar" aria-label="Chapter navigation">
      <div id="nav-mount"></div>
    </aside>
    <main class="main">
      <div class="content-page">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="../index.html">SAPUI5 Training</a>
          <span class="sep" aria-hidden="true">›</span>
          <a href="index.html">Prerequisites</a>
          <span class="sep" aria-hidden="true">›</span>
          <strong>IDE Setup</strong>
        </nav>
        <div class="author-block">
          <div class="author-avatar" aria-hidden="true">👤</div>
          <div class="author-info">
            <strong>delaware Training Team</strong>
            <span>Consultant — delaware</span>
          </div>
        </div>
        <article class="content-body">
          <h1>IDE Setup</h1>
          <div class="callout tip">
            <strong>Note:</strong> Placeholder content — to be filled in by the training team.
          </div>
          <p>This page will guide you through setting up your development environment for SAPUI5 and TypeScript development.</p>
        </article>
        <nav class="prev-next" aria-label="Page navigation">
          <span></span>
          <a href="nodejs-tooling.html" class="nav-btn next">
            <span class="nav-label">Next →</span>
            <span class="nav-title">Node.js &amp; UI5 Tooling</span>
          </a>
        </nav>
      </div>
    </main>
  </div>

  <footer class="site-footer">SAPUI5 &amp; TypeScript Training v1.0 — delaware</footer>
  <script src="../nav.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create all remaining prerequisite leaf pages**

Create `01-prerequisites/nodejs-tooling.html` — change:
- `data-page="nodejs-tooling"`
- `<title>` → `Node.js & UI5 Tooling`
- `<meta description>` → `Node.js and UI5 Tooling CLI setup for SAPUI5 development at delaware.`
- breadcrumb last item → `Node.js & UI5 Tooling`
- `<h1>` → `Node.js & UI5 Tooling`
- prev-next: prev = `ide-setup.html` / `IDE Setup`, next = `system-access.html` / `System Access`

Create `01-prerequisites/system-access.html` — change:
- `data-page="system-access"`
- `<title>` → `System Access`
- `<meta description>` → `System access setup for SAPUI5 training: SAP system credentials and BTP subaccount access at delaware.`
- breadcrumb last item → `System Access`
- `<h1>` → `System Access`
- prev-next: prev = `nodejs-tooling.html` / `Node.js & UI5 Tooling`, no next (use `<span></span>`)

- [ ] **Step 3: Create all SAPUI5 Basics leaf pages**

For each, `data-root="../"`, breadcrumb chapter = `SAPUI5 Basics` linking to `index.html`.

`02-sapui5-basics/mvc-pattern.html` — `data-page="mvc-pattern"`, h1 `MVC Pattern`, prev: none, next: `views-controllers.html` / `Views & Controllers`

`02-sapui5-basics/views-controllers.html` — `data-page="views-controllers"`, h1 `Views & Controllers`, prev: `mvc-pattern.html` / `MVC Pattern`, next: `data-binding.html` / `Data Binding`

`02-sapui5-basics/data-binding.html` — `data-page="data-binding"`, h1 `Data Binding`, prev: `views-controllers.html` / `Views & Controllers`, next: `odata-basics.html` / `OData Basics`

`02-sapui5-basics/odata-basics.html` — `data-page="odata-basics"`, h1 `OData Basics`, prev: `data-binding.html` / `Data Binding`, next: none

- [ ] **Step 4: Create all TypeScript in UI5 leaf pages**

Breadcrumb chapter = `TypeScript in UI5` linking to `index.html`.

`03-typescript-in-ui5/ts-setup.html` — `data-page="ts-setup"`, h1 `TypeScript Setup`, prev: none, next: `types-and-classes.html` / `Types & Classes`

`03-typescript-in-ui5/types-and-classes.html` — `data-page="types-and-classes"`, h1 `Types & Classes`, prev: `ts-setup.html` / `TypeScript Setup`, next: `strict-mode.html` / `Strict Mode`

`03-typescript-in-ui5/strict-mode.html` — `data-page="strict-mode"`, h1 `Strict Mode`, prev: `types-and-classes.html` / `Types & Classes`, next: none

- [ ] **Step 5: Create all Dev & Tooling leaf pages**

Breadcrumb chapter = `Development & Tooling` linking to `index.html`.

`04-dev-tooling/ui5-tooling.html` — `data-page="ui5-tooling"`, h1 `UI5 Tooling`, prev: none, next: `bas-vs-vscode.html` / `BAS vs VS Code`

`04-dev-tooling/bas-vs-vscode.html` — `data-page="bas-vs-vscode"`, h1 `BAS vs VS Code`, prev: `ui5-tooling.html` / `UI5 Tooling`, next: `build-deploy.html` / `Build & Deploy`

`04-dev-tooling/build-deploy.html` — `data-page="build-deploy"`, h1 `Build & Deploy`, prev: `bas-vs-vscode.html` / `BAS vs VS Code`, next: none

- [ ] **Step 6: Create all Exercise leaf pages**

Breadcrumb chapter = `Exercises` linking to `index.html`.

`05-exercises/exercise-1.html` — `data-page="exercise-1"`, h1 `Exercise 1`, prev: none, next: `exercise-2.html` / `Exercise 2`

`05-exercises/exercise-2.html` — `data-page="exercise-2"`, h1 `Exercise 2`, prev: `exercise-1.html` / `Exercise 1`, next: `exercise-3.html` / `Exercise 3`

`05-exercises/exercise-3.html` — `data-page="exercise-3"`, h1 `Exercise 3`, prev: `exercise-2.html` / `Exercise 2`, next: none

- [ ] **Step 7: Commit**

```bash
git add 01-prerequisites/ 02-sapui5-basics/ 03-typescript-in-ui5/ 04-dev-tooling/ 05-exercises/
git commit -m "feat: add all 16 content leaf pages with placeholder content"
```

---

### Task 8: sitemap.xml

**Files:**
- Create: `sitemap.xml`

> Replace `https://training.delaware.internal/sapui5/` with the actual hosted URL before publishing. Use a relative placeholder until then.

- [ ] **Step 1: Create sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home -->
  <url><loc>https://training.delaware.internal/sapui5/index.html</loc><priority>1.0</priority></url>
  <!-- Prerequisites -->
  <url><loc>https://training.delaware.internal/sapui5/01-prerequisites/index.html</loc><priority>0.9</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/01-prerequisites/ide-setup.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/01-prerequisites/nodejs-tooling.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/01-prerequisites/system-access.html</loc><priority>0.8</priority></url>
  <!-- SAPUI5 Basics -->
  <url><loc>https://training.delaware.internal/sapui5/02-sapui5-basics/index.html</loc><priority>0.9</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/02-sapui5-basics/mvc-pattern.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/02-sapui5-basics/views-controllers.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/02-sapui5-basics/data-binding.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/02-sapui5-basics/odata-basics.html</loc><priority>0.8</priority></url>
  <!-- TypeScript in UI5 -->
  <url><loc>https://training.delaware.internal/sapui5/03-typescript-in-ui5/index.html</loc><priority>0.9</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/03-typescript-in-ui5/ts-setup.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/03-typescript-in-ui5/types-and-classes.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/03-typescript-in-ui5/strict-mode.html</loc><priority>0.8</priority></url>
  <!-- Dev & Tooling -->
  <url><loc>https://training.delaware.internal/sapui5/04-dev-tooling/index.html</loc><priority>0.9</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/04-dev-tooling/ui5-tooling.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/04-dev-tooling/bas-vs-vscode.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/04-dev-tooling/build-deploy.html</loc><priority>0.8</priority></url>
  <!-- Exercises -->
  <url><loc>https://training.delaware.internal/sapui5/05-exercises/index.html</loc><priority>0.9</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/05-exercises/exercise-1.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/05-exercises/exercise-2.html</loc><priority>0.8</priority></url>
  <url><loc>https://training.delaware.internal/sapui5/05-exercises/exercise-3.html</loc><priority>0.8</priority></url>
</urlset>
```

- [ ] **Step 2: Commit**

```bash
git add sitemap.xml
git commit -m "feat: add sitemap.xml for AI/crawler discoverability"
```

---

### Task 9: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Replace CLAUDE.md contents**

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static HTML training site for SAPUI5/TypeScript. Delaware internal training resource. Zero build step — edit HTML directly.

## Serving locally

```bash
npx serve .         # serves at http://localhost:3000
# or
npx serve . --listen 3030
```

## Adding a new page

1. Create `.html` file in the relevant chapter folder (copy `_template.html`)
2. Set `data-root="../"` and `data-page="[id]"` on `<body>`
3. Add one entry to the `NAV` array in `nav.js` with matching `id`, `title`, and `path`
4. Add URL to `sitemap.xml`

## Key files

| File | Purpose |
|------|---------|
| `styles.css` | All styles. Design tokens at `:root`. Do not add inline styles to pages. |
| `nav.js` | `NAV` data structure + sidebar renderer. Only file to edit for navigation changes. |
| `_template.html` | Copy-paste base for new pages. |
| `agent-briefing.md` | CSS class reference + page ID table for agentic workers. |
| `sitemap.xml` | Update when adding pages. |

## Architecture

`nav.js` reads `data-root` and `data-page` from `<body>` to build the sidebar with correct relative links and active state. Root pages use `data-root="./"`, all chapter and leaf pages use `data-root="../"`.

## Design tokens (styles.css :root)

Primary color: `--color-primary: #A93226` (WCAG AA)  
Dark header: `--color-dark: #1a1a2e`  
Content width: `--content-max: 72ch`  
Sidebar width: `--sidebar-width: 260px`
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with final project architecture"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Hero banner — CSS-only gradient in `.hero`, no image dependency
- ✅ Chapter card grid — Task 5, `.cards-grid` with `auto-fill`
- ✅ Sidebar collapsible — `<details>`/`<summary>` in nav.js, Task 2
- ✅ Active state — `.sidebar-link.active` via `data-page` detection, Task 2
- ✅ Breadcrumbs — on all chapter + content pages, Tasks 6–7
- ✅ Sub-page dropdown + Next — `.page-nav-bar`, Task 6
- ✅ Author block — `.author-block`, Task 7
- ✅ Prev/Next — `.prev-next` with chapter label + page title, Task 7
- ✅ Meta tags + title pattern — on every page, Tasks 5–7
- ✅ Semantic HTML — `<main>`, `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>` throughout
- ✅ sitemap.xml — Task 8
- ✅ WCAG AA contrast — `#A93226` = 5.1:1 on white, Task 1
- ✅ Zero dependencies — no CDN links, no npm, Tasks 1–9
- ✅ agent-briefing.md — Task 4
- ✅ _template.html — Task 3
- ✅ CLAUDE.md — Task 9

**Placeholder scan:** No TBD/TODO found in plan tasks. All code blocks complete.

**Type consistency:** CSS class names match between `styles.css` (Task 1) and HTML in Tasks 5–7. `data-page` IDs match between `nav.js` NAV (Task 2) and `agent-briefing.md` page ID table (Task 4).
