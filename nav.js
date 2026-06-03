// Single source of truth for all navigation.
// To add a page: add entry to NAV array + create the .html file.
const NAV = [
  {
    id: '01-prerequisites',
    title: '01 Prerequisites',
    path: '01-prerequisites/index.html',
    pages: [
      { id: 'ide-setup',      title: 'IDE Setup',             path: '01-prerequisites/ide-setup.html' },
      { id: 'nodejs-tooling', title: 'Node.js & UI5 Tooling', path: '01-prerequisites/nodejs-tooling.html' },
      { id: 'system-access',  title: 'System Access',         path: '01-prerequisites/system-access.html' },
    ],
  },
  {
    id: '02-sapui5-basics',
    title: '02 SAPUI5 Basics',
    path: '02-sapui5-basics/index.html',
    pages: [
      { id: 'mvc-pattern',       title: 'MVC Pattern',         path: '02-sapui5-basics/mvc-pattern.html' },
      { id: 'views-controllers', title: 'Views & Controllers', path: '02-sapui5-basics/views-controllers.html' },
      { id: 'data-binding',      title: 'Data Binding',        path: '02-sapui5-basics/data-binding.html' },
      { id: 'odata-basics',      title: 'OData Basics',        path: '02-sapui5-basics/odata-basics.html' },
    ],
  },
  {
    id: '03-typescript-in-ui5',
    title: '03 TypeScript in UI5',
    path: '03-typescript-in-ui5/index.html',
    pages: [
      { id: 'ts-setup',          title: 'TypeScript Setup', path: '03-typescript-in-ui5/ts-setup.html' },
      { id: 'types-and-classes', title: 'Types & Classes',  path: '03-typescript-in-ui5/types-and-classes.html' },
      { id: 'strict-mode',       title: 'Strict Mode',      path: '03-typescript-in-ui5/strict-mode.html' },
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
    const isOpen = chapter.pages.some(p => p.id === currentPageId);
    const links = chapter.pages.map(page => {
      const isActive = page.id === currentPageId;
      return `<a href="${root}${page.path}" class="sidebar-link${isActive ? ' active' : ''}">${page.title}</a>`;
    }).join('');
    return `<details${isOpen ? ' open' : ''}>
        <summary>${chapter.title} <span class="chevron">›</span></summary>
        ${links}
      </details>`;
  }).join('');

  return `<div class="sidebar-head"><span>SAPUI5 Training</span></div>
    ${sections}
    <div class="sidebar-footer">SAPUI5 &amp; TypeScript Training v1.0</div>`;
}

function initNav() {
  // Inject Prism.js for syntax highlighting (runs once)
  if (!document.getElementById('prism-css')) {
    const link = document.createElement('link');
    link.id = 'prism-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(link);
  }
  if (!document.getElementById('prism-js')) {
    const script = document.createElement('script');
    script.id = 'prism-js';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
    script.onload = () => {
      const autoloader = document.createElement('script');
      autoloader.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js';
      document.head.appendChild(autoloader);
    };
    document.head.appendChild(script);
  }

  const mount = document.getElementById('nav-mount');
  if (!mount) return;
  const root = document.body.dataset.root || './';
  const currentPageId = document.body.dataset.page || '';
  mount.innerHTML = buildSidebar(currentPageId, root);

  // Inject hamburger button + overlay for mobile
  if (!document.getElementById('hamburger-btn')) {
    const sidebar = document.querySelector('.sidebar');

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const btn = document.createElement('button');
    btn.id = 'hamburger-btn';
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.innerHTML = '☰';
    document.body.appendChild(btn);

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      btn.innerHTML = '✕';
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      btn.innerHTML = '☰';
    }

    btn.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    overlay.addEventListener('click', closeSidebar);

    // Close on nav link click (mobile UX)
    mount.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', closeSidebar);
    });
  }
}

document.addEventListener('DOMContentLoaded', initNav);
