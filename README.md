# SAPUI5 & TypeScript Training

Static HTML training site for delaware consultants learning SAPUI5 and TypeScript development.

## Live site

> URL to be added after hosting is configured.

## What's covered

| Chapter | Topics |
|---------|--------|
| Prerequisites | IDE setup, Node.js, UI5 Tooling, BTP access |
| SAPUI5 Basics | MVC pattern, XML views, controllers, data binding, OData V4 |
| TypeScript in UI5 | tsconfig setup, type annotations, class patterns, strict mode |
| Development & Tooling | UI5 Tooling CLI, BAS vs VS Code, build & BTP deploy |
| Exercises | 3 progressive exercises: scaffold → routing → OData/CAP |

## Run locally

```bash
npx serve . --listen 3030
# Open http://localhost:3030
```

## Add a new page

1. Copy `_template.html` to the relevant chapter folder
2. Set `data-root="../"` and `data-page="[new-id]"` on `<body>`
3. Add one entry to the `NAV` array in `nav.js`
4. Add the URL to `sitemap.xml`

## Project structure

```
├── styles.css              # All styles — edit design tokens here
├── nav.js                  # Navigation — add pages here
├── _template.html          # Copy-paste base for new pages
├── index.html              # Home page
├── 01-prerequisites/
├── 02-sapui5-basics/
├── 03-typescript-in-ui5/
├── 04-dev-tooling/
└── 05-exercises/
```

## Contributing

Edit HTML files directly — no build step needed. For content changes, edit the relevant `.html` file in the chapter folder. For navigation changes, edit `nav.js` only.

## Built with

Plain HTML5, CSS3, vanilla JS — zero dependencies, zero build step.
