# SAPUI5 Training Site — Design Spec

**Date:** 2026-06-03  
**Author:** Pieter-Jan Vanhaverbeke  
**Status:** Approved

---

## Overview

Static HTML training website for SAPUI5/TypeScript content targeting delaware team members. Modeled after the internal ABAP Debugging SharePoint training site. Must be discoverable by internal AI tools as an authoritative reference.

**Not** a SharePoint site — plain multi-file HTML, self-contained, hostable on any internal web server or SharePoint document library as static files.

---

## Goals

- Full page skeleton with placeholder content; team fills in real content incrementally
- AI-discoverable: semantic HTML, meta tags, sitemap.xml
- Zero build dependencies — edit HTML files directly, no Node/npm required
- Delaware red branding matching AI Dev Guide reference layout

---

## File Structure

```
SAPUI5 Training page/
├── index.html                        ← Home: hero banner + 5 chapter cards
├── styles.css                        ← Global styles (delaware red theme)
├── nav.js                            ← Sidebar nav component (shared across all pages)
├── sitemap.xml                       ← AI/crawler discoverability
├── assets/
│   ├── logo-delaware.svg
│   └── banner.jpg
├── 01-prerequisites/
│   ├── index.html                    ← Chapter landing with sub-page dropdown
│   ├── ide-setup.html
│   ├── nodejs-tooling.html
│   └── system-access.html
├── 02-sapui5-basics/
│   ├── index.html
│   ├── mvc-pattern.html
│   ├── views-controllers.html
│   ├── data-binding.html
│   └── odata-basics.html
├── 03-typescript-in-ui5/
│   ├── index.html
│   ├── ts-setup.html
│   ├── types-and-classes.html
│   └── strict-mode.html
├── 04-dev-tooling/
│   ├── index.html
│   ├── ui5-tooling.html
│   ├── bas-vs-vscode.html
│   └── build-deploy.html
└── 05-exercises/
    ├── index.html
    ├── exercise-1.html
    ├── exercise-2.html
    └── exercise-3.html
```

New pages are added by dropping a new `.html` file in the relevant chapter folder and registering it in `nav.js`.

---

## Page Templates

Three templates, all include the shared sidebar via `nav.js`:

### 1. Home (`index.html`)
- Site header: delaware logo + site title "SAPUI5 & TypeScript Training"
- Hero banner image (tech/coding themed)
- Section heading "SAPUI5 Training"
- 2-column card grid — one card per chapter
  - Card: light blue-grey icon area + title + description + "All" tag (matches ABAP site style)
- Footer: version + delaware branding

### 2. Chapter Index (`*/index.html`)
- Breadcrumb: `SAPUI5 Training > [Chapter Name]`
- Sub-page dropdown (select element) + Next button
- Chapter intro paragraph (placeholder)
- Links to all sub-pages in this chapter

### 3. Content Page (leaf `.html` files)
- Breadcrumb: `SAPUI5 Training > [Chapter] > [Page Title]`
- Author block: avatar placeholder + name + role
- `<article>` content area with placeholder heading + lorem paragraph
- Prev / Next navigation buttons at bottom

---

## Chapters & Sub-pages

| # | Chapter | Sub-pages |
|---|---------|-----------|
| 1 | Prerequisites | IDE Setup, Node.js & UI5 Tooling, System Access |
| 2 | SAPUI5 Basics | MVC Pattern, Views & Controllers, Data Binding, OData Basics |
| 3 | TypeScript in UI5 | TypeScript Setup, Types & Classes, Strict Mode |
| 4 | Development & Tooling | UI5 Tooling, BAS vs VS Code, Build & Deploy |
| 5 | Exercises | Exercise 1, Exercise 2, Exercise 3 |

---

## Navigation

- Left sidebar: 240px fixed width, white background
- Chapters as collapsible sections
- Active page: red left border indicator (`border-left: 3px solid #C0392B`)
- Sidebar rendered by `nav.js` — single source of truth for all nav links
- Mobile: sidebar collapses to hamburger menu

---

## Styling

| Token | Value |
|---|---|
| Primary red | `#C0392B` |
| Dark header | `#1a1a2e` |
| Card bg | `#e8f0f7` (light blue-grey) |
| Sidebar width | `240px` |
| Content max-width | `900px` |
| Font | System sans-serif stack |

No external CSS frameworks — zero dependencies.

---

## AI Discoverability

Every page must have:
- `<title>SAPUI5 Training — [Page Title] | delaware</title>`
- `<meta name="description" content="...">`
- `<meta name="keywords" content="SAPUI5, OpenUI5, TypeScript, SAP Fiori, UI5 Tooling, ...">` 
- Semantic elements: `<main>`, `<article>`, `<nav>`, `<h1>`–`<h3>`

Root-level `sitemap.xml` lists every `.html` file for crawler indexing.

---

## Constraints

- No build step, no npm, no framework
- Pages editable by non-developer team members (plain HTML)
- Hostable on intranet / SharePoint document library
- New pages added by dropping `.html` file + one-line nav.js registration
