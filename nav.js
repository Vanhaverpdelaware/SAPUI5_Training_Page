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

  return `<div class="sidebar-search">
    <input type="search" id="sidebar-search-input" placeholder="Search…" aria-label="Search pages" autocomplete="off">
    <div id="search-results" class="search-results" aria-live="polite"></div>
  </div>
  <div class="sidebar-head"><span>SAPUI5 Training</span></div>
    ${sections}
    <div class="sidebar-footer">SAPUI5 &amp; TypeScript Training v1.0</div>`;
}

function initCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    if (pre.parentElement?.classList.contains('pre-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'pre-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    wrapper.appendChild(btn);

    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.innerText ?? pre.innerText;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });
}

function initSearch(root) {
  const input = document.getElementById('sidebar-search-input');
  const resultsEl = document.getElementById('search-results');
  const navSections = document.querySelectorAll('.sidebar details');
  if (!input || !resultsEl) return;

  let lunrIndex = null;
  let pages = [];

  fetch(root + 'search-index.json')
    .then(r => r.json())
    .then(data => {
      pages = data;
      // Wait for lunr to load
      const waitForLunr = setInterval(() => {
        if (typeof lunr !== 'undefined') {
          clearInterval(waitForLunr);
          lunrIndex = lunr(function () {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('tags');
            data.forEach(p => this.add(p));
          });
        }
      }, 100);
    })
    .catch(() => { /* search unavailable offline */ });

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (!q || q.length < 2 || !lunrIndex) {
      resultsEl.innerHTML = '';
      resultsEl.classList.remove('active');
      navSections.forEach(s => s.style.display = '');
      return;
    }
    navSections.forEach(s => s.style.display = 'none');
    try {
      const hits = lunrIndex.search(q + '*');
      if (!hits.length) {
        resultsEl.innerHTML = '<p class="search-empty">No results</p>';
        resultsEl.classList.add('active');
        return;
      }
      const html = hits.slice(0, 8).map(hit => {
        const page = pages.find(p => p.id === hit.ref);
        if (!page) return '';
        return `<a href="${root}${page.url}" class="search-result-item">${page.title}</a>`;
      }).join('');
      resultsEl.innerHTML = html;
      resultsEl.classList.add('active');
    } catch {
      resultsEl.innerHTML = '';
      resultsEl.classList.remove('active');
    }
  });

  // Press / to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      input.blur();
    }
  });

  // Clear search on nav link click
  document.addEventListener('click', e => {
    if (e.target.closest('.search-result-item') || e.target.closest('.sidebar-link')) {
      input.value = '';
      resultsEl.innerHTML = '';
      resultsEl.classList.remove('active');
      navSections.forEach(s => s.style.display = '');
    }
  });
}

function initTOC() {
  const body = document.querySelector('.content-body');
  if (!body) return;

  // Reading time (excludes code blocks and TOC box)
  const clone = body.cloneNode(true);
  clone.querySelectorAll('pre, .toc-box').forEach(el => el.remove());
  const text = clone.innerText || '';
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const mins = Math.max(1, Math.round(words / 200));
  const h1 = body.querySelector('h1');
  if (h1) {
    const rt = document.createElement('p');
    rt.className = 'reading-time';
    rt.innerHTML = `⏱ ${mins} min read`;
    h1.insertAdjacentElement('afterend', rt);
  }

  // TOC from h2 headings
  const headings = Array.from(body.querySelectorAll('h2'));
  if (headings.length < 2) return;

  headings.forEach((h, i) => {
    if (!h.id) h.id = 'section-' + i;
  });

  const toc = document.createElement('div');
  toc.className = 'toc-box';
  toc.innerHTML = '<h4>On this page</h4><ul class="toc-list">' +
    headings.map(h => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join('') +
    '</ul>';

  const firstH2 = headings[0];
  firstH2.parentNode.insertBefore(toc, firstH2);

  // Active section on scroll
  const tocLinks = toc.querySelectorAll('a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(a => a.classList.remove('toc-active'));
        const active = toc.querySelector(`a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('toc-active');
      }
    });
  }, { rootMargin: '-10% 0px -80% 0px' });

  headings.forEach(h => observer.observe(h));
}

function initDarkMode() {
  // Apply saved preference
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Inject toggle button into header
  const header = document.querySelector('.site-header');
  if (!header || document.getElementById('dark-toggle')) return;

  const btn = document.createElement('button');
  btn.id = 'dark-toggle';
  btn.className = 'dark-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark() ? '☀ Light' : '☾ Dark';

  btn.addEventListener('click', () => {
    if (isDark()) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      btn.textContent = '☾ Dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      btn.textContent = '☀ Light';
    }
  });

  // Insert before the last nav item
  const topNav = header.querySelector('.top-nav');
  if (topNav) header.insertBefore(btn, topNav);
  else header.appendChild(btn);
}

function initBackToTop() {
  if (document.getElementById('back-to-top')) return;
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function autoDetectLanguage() {
  document.querySelectorAll('pre > code:not([class])').forEach(code => {
    const t = code.textContent || '';
    let lang = 'typescript'; // default for this TS training site

    if (/^\s*<[\w:!]/.test(t)) {
      lang = 'markup'; // XML/HTML
    } else if (/^\s*(specVersion:|framework:|metadata:|server:|builder:|customMiddleware:|customTasks:)/.test(t)) {
      lang = 'yaml';
    } else if (/^\s*\{[\s\S]*"[\w]+"\s*:/.test(t) && !t.includes('\n//')) {
      lang = 'json';
    } else if (/^(npm |npx |node |git |ui5 |cf |mbt |mkdir |cd |yo |cds )/.test(t.trim())) {
      lang = 'bash';
    } else if (/^(npm |npx |node |git |ui5 |cf |mbt |mkdir |cd |yo |cds )/m.test(t) && t.includes('\n')) {
      lang = 'bash';
    } else if (/import\s+\w|export\s+default|:\s*(void|string|number|boolean|JSONModel|ODataModel)|private\s+_|public\s+on/.test(t)) {
      lang = 'typescript';
    } else if (/^\s*(#|\/\/|\/\*)/.test(t) && !t.includes('import ')) {
      lang = 'bash';
    }

    code.classList.add('language-' + lang);
    code.parentElement?.classList.add('language-' + lang);
  });
}

function initOpenGraph() {
  if (document.querySelector('meta[property="og:title"]')) return;
  const title = document.title;
  const desc = document.querySelector('meta[name="description"]')?.content || title;
  const url = window.location.href;
  const tags = [
    ['og:type',        'website'],
    ['og:title',       title],
    ['og:description', desc],
    ['og:url',         url],
    ['og:site_name',   'SAPUI5 & TypeScript Training — delaware'],
    ['twitter:card',   'summary'],
    ['twitter:title',  title],
    ['twitter:description', desc],
  ];
  tags.forEach(([prop, content]) => {
    const m = document.createElement('meta');
    m.setAttribute(prop.startsWith('twitter') ? 'name' : 'property', prop);
    m.content = content;
    document.head.appendChild(m);
  });
}

function initFavicon() {
  if (document.querySelector('link[rel="icon"]')) return;
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = (document.body.dataset.root || './') + 'favicon.svg';
  document.head.appendChild(link);
}

function initHeadingAnchors() {
  const body = document.querySelector('.content-body');
  if (!body) return;
  body.querySelectorAll('h2, h3').forEach((h, i) => {
    if (!h.id) h.id = (h.tagName === 'H3' ? 'subsection-' : 'section-') + i;
    const anchor = document.createElement('a');
    anchor.href = '#' + h.id;
    anchor.className = 'heading-anchor';
    anchor.setAttribute('aria-label', 'Link to this section');
    anchor.innerHTML = '#';
    h.appendChild(anchor);
  });
}

function initNav() {
  // Idempotency guard: prevent duplicate DOM nodes on re-init
  if (document.body.dataset.navInit) return;
  document.body.dataset.navInit = 'true';

  // Skip-to-content for keyboard/screen reader users
  if (!document.getElementById('skip-link')) {
    const skip = document.createElement('a');
    skip.id = 'skip-link';
    skip.href = '#main-content';
    skip.textContent = 'Skip to content';
    skip.className = 'skip-link';
    document.body.prepend(skip);
    // Add id to main element
    const main = document.querySelector('main.main');
    if (main && !main.id) main.id = 'main-content';
  }

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
      autoDetectLanguage();
      const autoloader = document.createElement('script');
      autoloader.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js';
      autoloader.onload = () => {
        if (typeof Prism !== 'undefined') Prism.highlightAll();
      };
      document.head.appendChild(autoloader);
    };
    document.head.appendChild(script);
  }

  // Inject lunr.js for search
  if (!document.getElementById('lunr-js')) {
    const s = document.createElement('script');
    s.id = 'lunr-js';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js';
    document.head.appendChild(s);
  }

  const mount = document.getElementById('nav-mount');
  if (!mount) return;
  const root = document.body.dataset.root || './';
  const currentPageId = document.body.dataset.page || '';
  mount.innerHTML = buildSidebar(currentPageId, root);

  initCopyButtons();
  initSearch(root);
  initTOC();
  initDarkMode();
  initBackToTop();

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

  initOpenGraph();
  initFavicon();
  initHeadingAnchors();
}

document.addEventListener('DOMContentLoaded', initNav);
