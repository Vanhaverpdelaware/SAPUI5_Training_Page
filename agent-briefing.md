# Agent Briefing — SAPUI5 Training Site Phase 2

Read this entire file before creating any pages. Single source of truth for all patterns.

## Your job

Create static HTML skeleton pages. Content is placeholder — team fills real content later.
Do NOT modify `styles.css` or `nav.js`. Read them for reference, never edit.

## Files to create

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

## Body attributes (CRITICAL — copy exactly)

Every `<body>` tag needs:

| Page | data-root | data-page |
|------|-----------|-----------|
| `index.html` | `"./"` | `""` |
| `01-prerequisites/index.html` | `"../"` | `""` |
| `01-prerequisites/ide-setup.html` | `"../"` | `"ide-setup"` |
| `01-prerequisites/nodejs-tooling.html` | `"../"` | `"nodejs-tooling"` |
| `01-prerequisites/system-access.html` | `"../"` | `"system-access"` |
| `02-sapui5-basics/index.html` | `"../"` | `""` |
| `02-sapui5-basics/mvc-pattern.html` | `"../"` | `"mvc-pattern"` |
| `02-sapui5-basics/views-controllers.html` | `"../"` | `"views-controllers"` |
| `02-sapui5-basics/data-binding.html` | `"../"` | `"data-binding"` |
| `02-sapui5-basics/odata-basics.html` | `"../"` | `"odata-basics"` |
| `03-typescript-in-ui5/index.html` | `"../"` | `""` |
| `03-typescript-in-ui5/ts-setup.html` | `"../"` | `"ts-setup"` |
| `03-typescript-in-ui5/types-and-classes.html` | `"../"` | `"types-and-classes"` |
| `03-typescript-in-ui5/strict-mode.html` | `"../"` | `"strict-mode"` |
| `04-dev-tooling/index.html` | `"../"` | `""` |
| `04-dev-tooling/ui5-tooling.html` | `"../"` | `"ui5-tooling"` |
| `04-dev-tooling/bas-vs-vscode.html` | `"../"` | `"bas-vs-vscode"` |
| `04-dev-tooling/build-deploy.html` | `"../"` | `"build-deploy"` |
| `05-exercises/index.html` | `"../"` | `""` |
| `05-exercises/exercise-1.html` | `"../"` | `"exercise-1"` |
| `05-exercises/exercise-2.html` | `"../"` | `"exercise-2"` |
| `05-exercises/exercise-3.html` | `"../"` | `"exercise-3"` |

## CSS classes (confirmed in styles.css)

| Component | Classes |
|-----------|---------|
| Header | `.site-header`, `.badge`, `.site-title`, `.header-spacer`, `.top-nav` |
| Layout | `.shell`, `.sidebar`, `.main` |
| Sidebar | `#nav-mount` (nav.js fills this — do not add content) |
| Home | `.home-section`, `.cards-grid`, `.card`, `.card-icon`, `.card-body`, `.card-tag` |
| Chapter index | `.chapter-page`, `.breadcrumb`, `.sep`, `.page-nav-bar`, `.btn`, `.btn-primary`, `.chapter-intro`, `.chapter-links`, `.chapter-link-item`, `.link-num`, `.link-title`, `.link-arrow` |
| Content page | `.content-page`, `.author-block`, `.author-avatar`, `.author-info`, `.content-body` |
| Callouts | `.callout.note`, `.callout.warning`, `.callout.tip` |
| Prev/Next | `.prev-next`, `.nav-btn`, `.nav-btn.next`, `.nav-label`, `.nav-title` |
| Footer | `.site-footer` |

## Chapter metadata

| Folder | Title | Description | Icon |
|--------|-------|-------------|------|
| `01-prerequisites` | Prerequisites | Tools, accounts and IDE setup required before starting the training. | ⚙️ |
| `02-sapui5-basics` | SAPUI5 Basics | Core UI5 concepts: MVC, data binding, controls and views. | 📐 |
| `03-typescript-in-ui5` | TypeScript in UI5 | TypeScript setup, class syntax, strict mode and type annotations in UI5. | 🔷 |
| `04-dev-tooling` | Development & Tooling | UI5 Tooling, BAS vs VS Code setup, linting, build and deploy. | 🛠️ |
| `05-exercises` | Exercises | Hands-on exercises to practise your SAPUI5 & TypeScript skills. | 📝 |

## Prev/Next map

### 01 Prerequisites
| File | Title | Prev title | Prev file | Next title | Next file |
|------|-------|-----------|-----------|------------|-----------|
| `ide-setup.html` | IDE Setup | — | — | Node.js & UI5 Tooling | `nodejs-tooling.html` |
| `nodejs-tooling.html` | Node.js & UI5 Tooling | IDE Setup | `ide-setup.html` | System Access | `system-access.html` |
| `system-access.html` | System Access | Node.js & UI5 Tooling | `nodejs-tooling.html` | — | — |

### 02 SAPUI5 Basics
| File | Title | Prev title | Prev file | Next title | Next file |
|------|-------|-----------|-----------|------------|-----------|
| `mvc-pattern.html` | MVC Pattern | — | — | Views & Controllers | `views-controllers.html` |
| `views-controllers.html` | Views & Controllers | MVC Pattern | `mvc-pattern.html` | Data Binding | `data-binding.html` |
| `data-binding.html` | Data Binding | Views & Controllers | `views-controllers.html` | OData Basics | `odata-basics.html` |
| `odata-basics.html` | OData Basics | Data Binding | `data-binding.html` | — | — |

### 03 TypeScript in UI5
| File | Title | Prev title | Prev file | Next title | Next file |
|------|-------|-----------|-----------|------------|-----------|
| `ts-setup.html` | TypeScript Setup | — | — | Types & Classes | `types-and-classes.html` |
| `types-and-classes.html` | Types & Classes | TypeScript Setup | `ts-setup.html` | Strict Mode | `strict-mode.html` |
| `strict-mode.html` | Strict Mode | Types & Classes | `types-and-classes.html` | — | — |

### 04 Dev & Tooling
| File | Title | Prev title | Prev file | Next title | Next file |
|------|-------|-----------|-----------|------------|-----------|
| `ui5-tooling.html` | UI5 Tooling | — | — | BAS vs VS Code | `bas-vs-vscode.html` |
| `bas-vs-vscode.html` | BAS vs VS Code | UI5 Tooling | `ui5-tooling.html` | Build & Deploy | `build-deploy.html` |
| `build-deploy.html` | Build & Deploy | BAS vs VS Code | `bas-vs-vscode.html` | — | — |

### 05 Exercises
| File | Title | Prev title | Prev file | Next title | Next file |
|------|-------|-----------|-----------|------------|-----------|
| `exercise-1.html` | Exercise 1 | — | — | Exercise 2 | `exercise-2.html` |
| `exercise-2.html` | Exercise 2 | Exercise 1 | `exercise-1.html` | Exercise 3 | `exercise-3.html` |
| `exercise-3.html` | Exercise 3 | Exercise 2 | `exercise-2.html` | — | — |

## Placeholder content

Use this callout as main content placeholder in every article:

```html
<div class="callout tip">
  <strong>Note:</strong> Placeholder content — to be filled in by the training team.
</div>
<p>Content coming soon.</p>
```

## Meta keywords (use on every page)

```
SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, SAP BTP, MVC, data binding, OData, delaware
```
