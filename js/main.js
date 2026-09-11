// ============================================================
//  MAIN.JS — Site logic: nav, filtering, rendering
// ============================================================

// ── Helpers ──────────────────────────────────────────────────

/** Returns the CSS class for a given tag type + value */
function tagClass(type, value) {
  if (type === "format") return "tag-format";
  const slug = value.toLowerCase().replace(/\s+/g, "-");
  return `tag-${slug}`;
}

/** Renders a study item as an HTML card string */
function studyCardHTML(s, delay) {
  return `
    <div class="card study-card" style="animation-delay:${delay}s">
      <div class="study-card-header">
        <div>
          <div class="study-card-title">${s.title}</div>
          ${s.author ? `<div class="study-card-author">${s.author}</div>` : ""}
        </div>
        <div class="study-card-status">
          <span class="tag ${tagClass("status", s.status)}">${s.status}</span>
        </div>
      </div>
      ${s.summary ? `<p class="study-card-summary">${s.summary}</p>` : ""}
      <div class="tags">
        <span class="tag ${tagClass("format", s.format)}">${s.format}</span>
        <span class="tag ${tagClass("field",  s.field)}">${s.field}</span>
      </div>
    </div>`;
}

// ── Active nav link ───────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const isHome = href === "index.html" || href === "./";
    if (
      (isHome && (path === "/" || path.endsWith("/") || path.endsWith("index.html"))) ||
      (!isHome && path.endsWith(href.replace("./", "")))
    ) {
      link.classList.add("active");
    }
  });
})();

// ── Studies Page ─────────────────────────────────────────────
(function initStudiesPage() {
  const grid = document.getElementById("studies-grid");
  if (!grid || typeof STUDIES === "undefined") return;

  const activeFilters = { format: "", field: "", status: "" };

  function renderGrid() {
    const countEl = document.getElementById("results-count");
    const filtered = STUDIES.filter(
      (s) =>
        (!activeFilters.format || s.format === activeFilters.format) &&
        (!activeFilters.field  || s.field  === activeFilters.field)  &&
        (!activeFilters.status || s.status === activeFilters.status)
    );

    if (countEl) {
      countEl.textContent = `${filtered.length} item${filtered.length !== 1 ? "s" : ""}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state fade-in">
          <span class="empty-state-icon">🔍</span>
          <h3>No items match these filters</h3>
          <p>Try clearing one of the filters above.</p>
        </div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((s, i) => studyCardHTML(s, i * 0.05))
      .join("");
  }

  // Filter pill click handling
  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const group = pill.dataset.group;
      const value = pill.dataset.value;

      // Clicking the active pill resets the group
      activeFilters[group] = activeFilters[group] === value ? "" : value;

      document
        .querySelectorAll(`.filter-pill[data-group="${group}"]`)
        .forEach((p) => p.classList.toggle("active", p.dataset.value === activeFilters[group]));

      renderGrid();
    });
  });

  renderGrid();
})();

// ── Portfolio Page ────────────────────────────────────────────
(function initPortfolioPage() {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  if (PROJECTS.length === 0) {
    grid.innerHTML = `
      <div class="empty-state fade-in">
        <span class="empty-state-icon">🚧</span>
        <h3>Coming soon</h3>
        <p>No projects to show yet — but they're brewing. Check back later!</p>
      </div>`;
    return;
  }

  grid.innerHTML = PROJECTS.map(
    (p, i) => `
    <div class="card project-card" style="animation-delay:${i * 0.05}s">
      <h3>${p.title}</h3>
      <p class="study-card-summary">${p.description}</p>
      <div class="tags" style="margin-top:10px;">
        ${p.tech.map((t) => `<span class="tag tag-format">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        ${p.github ? `<a href="${p.github}" class="project-link" target="_blank" rel="noopener">↗ GitHub</a>` : ""}
        ${p.demo   ? `<a href="${p.demo}"   class="project-link" target="_blank" rel="noopener">↗ Live Demo</a>` : ""}
      </div>
    </div>`
  ).join("");
})();

// ── Notes Renderer (shared between notes page & home preview) ─
function renderNotes(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container || typeof NOTES === "undefined") return;

  const items = limit ? NOTES.slice(0, limit) : NOTES;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state fade-in">
        <span class="empty-state-icon">✏️</span>
        <h3>No notes yet</h3>
        <p>Notes will appear here as you write them in data.js.</p>
      </div>`;
    return;
  }

  container.innerHTML = `<div class="notes-list">` +
    items.map(
      (n) => `
      <div class="note-item" data-note-id="${n.id}">
        <button class="note-toggle" aria-expanded="false">
          <div class="note-toggle-left">
            <span class="note-toggle-title">${n.title}</span>
            <div class="note-toggle-meta">
              <span>${n.date}</span>
              ${n.tags.map((t) => `<span class="tag ${tagClass("field", t)}">${t}</span>`).join("")}
            </div>
          </div>
          <span class="note-chevron">▾</span>
        </button>
        <div class="note-body">${n.body}</div>
      </div>`
    ).join("") + `</div>`;

  // Accordion toggle
  container.querySelectorAll(".note-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".note-item");
      item.classList.toggle("open");
      btn.setAttribute("aria-expanded", item.classList.contains("open"));
    });
  });
}

// Notes page
renderNotes("notes-container");

// Home preview (latest 2)
renderNotes("home-notes", 2);

// ── Home: Currently Studying preview ─────────────────────────
(function renderStudyingPreview() {
  const el = document.getElementById("home-studying");
  if (!el || typeof STUDIES === "undefined") return;

  const studying = STUDIES.filter((s) => s.status === "Doing").slice(0, 3);

  if (studying.length === 0) {
    el.innerHTML = `<p style="color:var(--text-muted);font-size:.9rem;">Nothing marked as "Doing" yet — add items in <code>js/data.js</code>.</p>`;
    return;
  }

  el.innerHTML = `<div class="card-grid">${studying.map((s, i) => studyCardHTML(s, i * 0.07)).join("")}</div>`;
})();

// ── Hobbies Page ─────────────────────────────────────────────
(function initHobbiesPage() {
  if (typeof HOBBIES === "undefined") return;

  // Guitar
  const guitarEl = document.getElementById("guitar-section");
  if (guitarEl && HOBBIES.guitar) {
    const g = HOBBIES.guitar;
    guitarEl.innerHTML = `
      <div class="hobby-section fade-in">
        <div class="hobby-section-header">
          <span class="hobby-icon">🎸</span>
          <h2 style="margin-bottom:0;">Guitar</h2>
          <span class="hobby-level">${g.level}</span>
        </div>
        <p class="hobby-current" style="margin-top:10px;">
          <strong>Currently practicing:</strong> ${g.currentlyPracticing}
        </p>

        <div class="hobby-sub-label">Goals</div>
        <ul class="goal-list">
          ${g.goals.map((goal) => `
            <li class="goal-item">
              <span class="goal-circle"></span>
              <span>${goal}</span>
            </li>`).join("")}
        </ul>

        <div class="hobby-sub-label">Milestone Log</div>
        <ul class="milestone-list">
          ${[...g.milestones].reverse().map((m) => `
            <li class="milestone-item">
              <div class="milestone-dot"></div>
              <div>
                <div class="milestone-text">${m.text}</div>
                <div class="milestone-date">${m.date}</div>
              </div>
            </li>`).join("")}
        </ul>
      </div>`;
  }

  // Other interests
  const otherEl = document.getElementById("other-hobbies");
  if (otherEl && HOBBIES.other) {
    otherEl.innerHTML = HOBBIES.other.map(
      (h, i) => `
      <div class="card interest-card" style="animation-delay:${i * 0.07}s; margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <span style="font-size:1.3rem;line-height:1;">${h.icon}</span>
          <h3 style="font-size:.975rem;">${h.name}</h3>
        </div>
        <p class="study-card-summary">${h.description}</p>
      </div>`
    ).join("");
  }
})();
