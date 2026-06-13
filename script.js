/* ==========================================================================
   AI UNIVERSE — Shared Script (Multi-Page Version)
   Requires: data.js loaded first
   ========================================================================== */

// ─────────────────────────────────────────────
// 1. Active Navigation Detection
// ─────────────────────────────────────────────
function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href === path || (path === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ─────────────────────────────────────────────
// 2. Header Scroll Effect
// ─────────────────────────────────────────────
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ─────────────────────────────────────────────
// 3. Scroll Reveal (data-scroll elements)
// ─────────────────────────────────────────────
function initScrollReveal() {
    const els = document.querySelectorAll('[data-scroll]');
    const check = () => {
        els.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 1.12) el.classList.add('visible');
        });
    };
    window.addEventListener('scroll', check, { passive: true });
    setTimeout(check, 300);
}

// ─────────────────────────────────────────────
// 4. Mobile Drawer Navigation
// ─────────────────────────────────────────────
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    if (!toggle || !drawer) return;
    const close = () => {
        toggle.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('active');
        isOpen ? close() : (toggle.classList.add('active'), drawer.classList.add('active'), document.body.style.overflow = 'hidden');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', close));
}

// ─────────────────────────────────────────────
// 5. Canvas Particle Background (Hero only)
// ─────────────────────────────────────────────
function initCanvasParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const count = W < 768 ? 40 : 90;
    const connDist = 120;
    let mouse = { x: null, y: null };

    class Dot {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.vx = (Math.random() - .5) * .55;
            this.vy = (Math.random() - .5) * .55;
            this.r  = Math.random() * 1.8 + .8;
            this.a  = Math.random() * .45 + .1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,245,255,${this.a})`;
            ctx.fill();
        }
    }

    const dots = Array.from({ length: count }, () => new Dot());
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = null; });

    (function frame() {
        ctx.clearRect(0, 0, W, H);
        dots.forEach(d => { d.update(); d.draw(); });
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < connDist) {
                    ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.strokeStyle = `rgba(0,245,255,${(1 - dist/connDist) * .1})`; ctx.lineWidth = .7; ctx.stroke();
                }
            }
            if (mouse.x !== null) {
                const mx = dots[i].x - mouse.x, my = dots[i].y - mouse.y;
                const md = Math.sqrt(mx*mx + my*my);
                if (md < 180) {
                    ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(139,92,246,${(1 - md/180)*.2})`; ctx.lineWidth = 1; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(frame);
    })();
}

// ─────────────────────────────────────────────
// 6. Animated Stat Counters
// ─────────────────────────────────────────────
function initStatsCounters() {
    const section = document.querySelector('.stats-section, .stats-page-section');
    if (!section) return;
    let done = false;
    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !done) {
            done = true;
            section.querySelectorAll('.stat-number[data-target]').forEach(el => {
                const target = +el.dataset.target;
                const step = target / (2000 / 30);
                let cur = 0;
                const t = setInterval(() => {
                    cur += step;
                    if (cur >= target) { el.textContent = target; clearInterval(t); }
                    else el.textContent = Math.floor(cur);
                }, 30);
            });
        }
    }, { threshold: 0.1 }).observe(section);
}

// ─────────────────────────────────────────────
// 7. FAQ Accordions
// ─────────────────────────────────────────────
function setupFaqAccordions() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(it => {
                it.classList.remove('active');
                it.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// ─────────────────────────────────────────────
// 8. AI Cards Renderer
// ─────────────────────────────────────────────
function renderAICards(tools) {
    const grid = document.getElementById('ai-cards-grid');
    const empty = document.getElementById('directory-empty-state');
    if (!grid) return;
    grid.innerHTML = '';
    if (!tools.length) { grid.classList.add('hidden'); empty && empty.classList.remove('hidden'); return; }
    grid.classList.remove('hidden'); empty && empty.classList.add('hidden');

    tools.forEach(tool => {
        const catClass = tool.categoryKey.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        const card = document.createElement('div');
        card.className = `ai-card glass-panel ${catClass}`;
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - r.left}px`);
            card.style.setProperty('--y', `${e.clientY - r.top}px`);
        });
        const caps = tool.capabilities.slice(0, 3).map(c => `<span class="capability-pill">${c}</span>`).join('');
        const extra = tool.capabilities.length > 3 ? `<span class="capability-pill">+${tool.capabilities.length - 3}</span>` : '';
        card.innerHTML = `
            <div class="ai-card-accent"></div>
            <div class="ai-card-header">
                <div class="logo-container" style="background:${tool.logoColor}">${tool.logoLetter}</div>
                <div class="ai-card-meta">
                    <h3 class="ai-card-title">${tool.name}</h3>
                    <span class="category-tag">${tool.category}</span>
                </div>
            </div>
            <div class="ai-card-body">
                <p class="ai-card-desc">${tool.description}</p>
                <div class="capabilities-section">
                    <h4 class="capabilities-title">Key Capabilities</h4>
                    <div class="capability-tags">${caps}${extra}</div>
                </div>
            </div>
            <div class="ai-card-actions">
                <button class="btn-card-expand" data-id="${tool.id}">Details</button>
                <a href="${tool.website}" target="_blank" rel="noopener" class="btn-card-link">
                    Visit <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
            </div>`;
        grid.appendChild(card);
    });
    document.querySelectorAll('.btn-card-expand').forEach(btn => btn.addEventListener('click', e => openDetailModal(e.currentTarget.dataset.id)));
}

// ─────────────────────────────────────────────
// 9. Search & Category Filter
// ─────────────────────────────────────────────
let activeCategory = 'all';
let searchQuery = '';

function setupSearchAndFilters() {
    const inp = document.getElementById('ai-search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    const catCont = document.getElementById('categories-container');
    const resetBtn = document.getElementById('reset-filters-btn');
    if (!inp) return;

    const run = () => {
        const filtered = aiDatabase.filter(t => {
            const mCat = activeCategory === 'all' || t.categoryKey === activeCategory;
            const mQ = !searchQuery || t.name.toLowerCase().includes(searchQuery) ||
                t.description.toLowerCase().includes(searchQuery) ||
                t.category.toLowerCase().includes(searchQuery) ||
                t.capabilities.some(c => c.toLowerCase().includes(searchQuery));
            return mCat && mQ;
        });
        renderAICards(filtered);
    };

    inp.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase().trim();
        clearBtn && (clearBtn.style.display = searchQuery ? 'block' : 'none');
        run();
    });
    clearBtn && clearBtn.addEventListener('click', () => {
        inp.value = ''; searchQuery = ''; clearBtn.style.display = 'none'; run(); inp.focus();
    });
    catCont && catCont.addEventListener('click', e => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        run();
    });
    resetBtn && resetBtn.addEventListener('click', () => {
        inp.value = ''; searchQuery = ''; activeCategory = 'all';
        clearBtn && (clearBtn.style.display = 'none');
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.category-btn[data-category="all"]') && document.querySelector('.category-btn[data-category="all"]').classList.add('active');
        run();
    });

    // Check URL param (from home page category cards)
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) {
        activeCategory = cat;
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        const target = document.querySelector(`.category-btn[data-category="${cat}"]`);
        if (target) target.classList.add('active');
    }
    run();
}

// ─────────────────────────────────────────────
// 10. Comparison Table Renderer
// ─────────────────────────────────────────────
function renderComparisonTable() {
    const body = document.getElementById('comparison-table-body');
    if (!body) return;
    body.innerHTML = '';
    const mark = v => v ? `<span class="check-mark">✓</span>` : `<span class="cross-mark">✕</span>`;
    aiDatabase.forEach(tool => {
        const tr = document.createElement('tr');
        tr.setAttribute('draggable', 'true');
        tr.dataset.id = tool.id;
        tr.dataset.name = tool.name;
        
        tr.innerHTML = `
            <td><a class="compare-table-link" data-id="${tool.id}">
                <span class="compare-table-logo-circle" style="background:${tool.logoColor}">${tool.logoLetter}</span>
                <span>${tool.name}</span></a></td>
            <td>${mark(tool.comparison.chat)}</td><td>${mark(tool.comparison.images)}</td>
            <td>${mark(tool.comparison.video)}</td><td>${mark(tool.comparison.audio)}</td>
            <td>${mark(tool.comparison.coding)}</td><td>${mark(tool.comparison.research)}</td>
            <td>${mark(tool.comparison.freePlan)}</td>`;
            
        // Drag start/end events
        tr.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', tool.id);
            e.dataTransfer.effectAllowed = 'copy';
            tr.classList.add('dragging');
        });
        tr.addEventListener('dragend', () => {
            tr.classList.remove('dragging');
        });
        
        tr.addEventListener('mouseenter', () => tr.classList.add('row-highlight'));
        tr.addEventListener('mouseleave', () => tr.classList.remove('row-highlight'));
        body.appendChild(tr);
    });
    document.querySelectorAll('.compare-table-link').forEach(l => l.addEventListener('click', e => openDetailModal(e.currentTarget.dataset.id)));
}

// ─────────────────────────────────────────────
// 11. Rankings Renderer
// ─────────────────────────────────────────────
function renderRankings() {
    const populate = (listId, ids) => {
        const el = document.getElementById(listId);
        if (!el) return;
        el.innerHTML = ids.map((id, i) => {
            const t = aiDatabase.find(t => t.id === id);
            if (!t) return '';
            return `<li class="ranking-list-item" data-id="${t.id}">
                <div class="ranking-item-left">
                    <span class="ranking-number">${String(i+1).padStart(2,'0')}</span>
                    <span class="ranking-name">${t.name}</span>
                </div>
                <span class="ranking-rating-pill">★ ${t.rating}</span></li>`;
        }).join('');
        el.querySelectorAll('.ranking-list-item').forEach(li => li.addEventListener('click', () => openDetailModal(li.dataset.id)));
    };
    populate('ranking-coding-list',   rankingsData.coding);
    populate('ranking-research-list', rankingsData.research);
    populate('ranking-images-list',   rankingsData.images);
    populate('ranking-videos-list',   rankingsData.videos);
    populate('ranking-audio-list',    rankingsData.audio);
}

// ─────────────────────────────────────────────
// 12. Details Modal
// ─────────────────────────────────────────────
function openDetailModal(id) {
    const modal = document.getElementById('details-modal');
    const area  = document.getElementById('modal-content-area');
    if (!modal || !area) return;
    const t = aiDatabase.find(t => t.id === id);
    if (!t) return;
    const cp = (label, val) => `<div class="modal-compare-pill"><span class="pill-label">${label}</span><span class="pill-value">${val ? '<span class="check-mark">✓</span>' : '<span class="cross-mark">✕</span>'}</span></div>`;
    area.innerHTML = `
        <div class="modal-detail-header">
            <div class="modal-logo-wrapper" style="background:${t.logoColor}">${t.logoLetter}</div>
            <div class="modal-header-meta">
                <h2 class="modal-title">${t.name}</h2>
                <div class="modal-tags">
                    <span class="modal-cat-tag">${t.category}</span>
                    <span class="ranking-rating-pill" style="font-size:.85rem;padding:4px 8px">★ ${t.rating}</span>
                </div>
            </div>
        </div>
        <div class="modal-detail-body">
            <div class="modal-description-box"><p>${t.longDescription}</p></div>
            <div>
                <h4 class="modal-section-title"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Core Capabilities</h4>
                <div class="modal-cap-list">${t.capabilities.map(c => `<div class="modal-cap-item"><span class="modal-cap-dot"></span><span>${c}</span></div>`).join('')}</div>
            </div>
            <div>
                <h4 class="modal-section-title"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> Capability Matrix</h4>
                <div class="modal-comparison-grid">
                    ${cp('Chat',t.comparison.chat)}${cp('Images',t.comparison.images)}${cp('Video',t.comparison.video)}
                    ${cp('Audio',t.comparison.audio)}${cp('Coding',t.comparison.coding)}${cp('Research',t.comparison.research)}${cp('Free Plan',t.comparison.freePlan)}
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn-modal-close" id="btn-modal-inner-close">Close</button>
                <a href="${t.website}" target="_blank" rel="noopener" class="btn-modal-visit">Visit Official Website ↗</a>
            </div>
        </div>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const closeModal = () => { modal.classList.remove('active'); document.body.style.overflow = ''; };
    document.getElementById('modal-close-btn').onclick = closeModal;
    document.getElementById('btn-modal-inner-close').onclick = closeModal;
    modal.onclick = e => { if (e.target === modal) closeModal(); };
    const esc = e => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
}

// ─────────────────────────────────────────────
// 13. Home Page — Featured Tools + Categories
// ─────────────────────────────────────────────
function initHomePage() {
    // Featured tools (3 spotlight cards)
    const featGrid = document.getElementById('featured-tools-grid');
    if (featGrid) {
        const spotlight = ['chatgpt', 'claude', 'midjourney'];
        spotlight.forEach(id => {
            const t = aiDatabase.find(t => t.id === id);
            if (!t) return;
            const el = document.createElement('div');
            el.className = 'featured-tool-card glass-panel';
            el.innerHTML = `
                <div class="ftc-accent"></div>
                <div class="ftc-header">
                    <div class="ftc-logo" style="background:${t.logoColor}">${t.logoLetter}</div>
                    <div>
                        <h3 class="ftc-name">${t.name}</h3>
                        <span class="category-tag">${t.category}</span>
                    </div>
                    <span class="ftc-rating">★ ${t.rating}</span>
                </div>
                <p class="ftc-desc">${t.description}</p>
                <div class="ftc-caps">${t.capabilities.slice(0,4).map(c=>`<span class="capability-pill">${c}</span>`).join('')}</div>
                <div class="ftc-actions">
                    <a href="explore.html" class="btn-card-expand">Explore All AIs</a>
                    <a href="${t.website}" target="_blank" rel="noopener" class="btn-card-link">Visit ↗</a>
                </div>`;
            featGrid.appendChild(el);
        });
    }

    // Category showcase
    const catGrid = document.getElementById('category-showcase-grid');
    if (catGrid) {
        categoryMeta.forEach(cat => {
            const el = document.createElement('a');
            el.href = `explore.html?cat=${encodeURIComponent(cat.key)}`;
            el.className = 'cat-showcase-card glass-panel';
            el.innerHTML = `
                <div class="csc-icon" style="background:${cat.color}">${cat.icon}</div>
                <span class="csc-label">${cat.label}</span>
                <span class="csc-count">${cat.count} tool${cat.count !== 1 ? 's' : ''}</span>`;
            catGrid.appendChild(el);
        });
    }

    initStatsCounters();
    initTrendingWidget();
}

// ─────────────────────────────────────────────
// 14. Stats Page — Category Breakdown Bars
// ─────────────────────────────────────────────
function initStatsPage() {
    initStatsCounters();
    const barContainer = document.getElementById('category-bars');
    if (!barContainer) return;
    const counts = {};
    aiDatabase.forEach(t => { counts[t.categoryKey] = (counts[t.categoryKey] || 0) + 1; });
    const max = Math.max(...Object.values(counts));
    Object.entries(counts).forEach(([cat, n]) => {
        const pct = Math.round((n / max) * 100);
        const meta = categoryMeta.find(m => m.key === cat);
        const el = document.createElement('div');
        el.className = 'cat-bar-row';
        el.setAttribute('data-scroll', '');
        el.innerHTML = `
            <div class="cat-bar-label">
                <span>${meta ? meta.icon : '📦'} ${cat}</span>
                <span class="cat-bar-count">${n} tool${n !== 1 ? 's' : ''}</span>
            </div>
            <div class="cat-bar-track">
                <div class="cat-bar-fill" style="width:0%;background:${meta ? meta.color : 'var(--primary)'}" data-width="${pct}%"></div>
            </div>`;
        barContainer.appendChild(el);
    });
    // Animate bars on scroll
    setTimeout(() => {
        document.querySelectorAll('.cat-bar-fill').forEach(b => {
            b.style.transition = 'width 1.2s cubic-bezier(0.16,1,0.3,1)';
            b.style.width = b.dataset.width;
        });
    }, 400);
}

// ─────────────────────────────────────────────
// 15. Master Init — detects page & bootstraps
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initActiveNav();
    initHeaderScroll();
    initMobileMenu();
    initCanvasParticles();

    const page = document.body.dataset.page || 'home';
    switch (page) {
        case 'home':     initHomePage();    break;
        case 'explore':  renderAICards(aiDatabase); setupSearchAndFilters(); break;
        case 'compare':  renderComparisonTable(); initCompareArena(); break;
        case 'rankings': renderRankings();  break;
        case 'stats':    initStatsPage();   break;
        case 'faq':      setupFaqAccordions(); break;
    }

    // Initialize scroll reveal after page-specific dynamic content has been rendered
    initScrollReveal();
});

// ─────────────────────────────────────────────
// 16. Trending Widget Logic (Home Page Hero)
// ─────────────────────────────────────────────
function initTrendingWidget() {
    const contentArea = document.getElementById('trending-widget-content');
    if (!contentArea) return;

    const tabs = document.querySelectorAll('.trending-tab-btn');
    
    const renderTrending = (period) => {
        const data = trendingData[period];
        if (!data) return;
        const tool = aiDatabase.find(t => t.id === data.id);
        if (!tool) return;
        
        contentArea.innerHTML = `
            <div class="trending-ai-header">
                <div class="trending-ai-logo" style="background:${tool.logoColor}">${tool.logoLetter}</div>
                <div class="trending-ai-meta">
                    <h4 class="trending-ai-name">${tool.name}</h4>
                    <div class="trending-ai-badge-row">
                        <span class="trending-period-badge">${data.badge}</span>
                        <span class="trending-stat-pill">${data.metric}</span>
                    </div>
                </div>
            </div>
            <p class="trending-ai-desc">${data.reason}</p>
            <div class="trending-ai-caps">
                ${tool.capabilities.slice(0, 3).map(c => `<span class="capability-pill">${c}</span>`).join('')}
            </div>
            <div class="trending-ai-actions">
                <button class="btn-card-expand" id="trending-btn-expand" data-id="${tool.id}">Details</button>
                <a href="${tool.website}" target="_blank" rel="noopener" class="btn-card-link">Visit Website ↗</a>
            </div>
        `;
        
        const detailsBtn = document.getElementById('trending-btn-expand');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', () => openDetailModal(tool.id));
        }
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTrending(tab.dataset.period);
        });
    });
    
    // Initial load (weekly)
    renderTrending('weekly');
}

// ─────────────────────────────────────────────
// 17. AI Arena (Compare Page)
// ─────────────────────────────────────────────
let selectedArenaAIs = {
    "1": null,
    "2": null
};

function initCompareArena() {
    const slotSelect1 = document.getElementById('slot-select-1');
    const slotSelect2 = document.getElementById('slot-select-2');
    const compareSubmit = document.getElementById('arena-compare-submit');
    
    if (!slotSelect1 || !slotSelect2) return;

    // Populate fallback selectors
    const populateSelector = (selectEl) => {
        selectEl.innerHTML = '<option value="" disabled selected>Select AI...</option>' + 
            aiDatabase.map(tool => `<option value="${tool.id}">${tool.name}</option>`).join('');
    };
    populateSelector(slotSelect1);
    populateSelector(slotSelect2);

    // Event listener for dropdown selectors
    slotSelect1.addEventListener('change', (e) => {
        loadAIToSlot(e.target.value, "1");
    });
    slotSelect2.addEventListener('change', (e) => {
        loadAIToSlot(e.target.value, "2");
    });

    // Configure drag-and-drop slots
    const slots = document.querySelectorAll('.duel-slot');
    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            slot.classList.add('drag-hover');
        });
        
        slot.addEventListener('dragleave', () => {
            slot.classList.remove('drag-hover');
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('drag-hover');
            const id = e.dataTransfer.getData('text/plain');
            loadAIToSlot(id, slot.dataset.slot);
        });
    });

    // Action button to trigger comparison
    if (compareSubmit) {
        compareSubmit.addEventListener('click', () => {
            runArenaComparison();
        });
    }
}

function loadAIToSlot(id, slotNum) {
    const tool = aiDatabase.find(t => t.id === id);
    if (!tool) return;

    // Verify if this AI is already loaded in the other slot
    const otherSlotNum = slotNum === "1" ? "2" : "1";
    if (selectedArenaAIs[otherSlotNum] === id) {
        alert("Please select two different AIs to compare!");
        const selectEl = document.getElementById(`slot-select-${slotNum}`);
        if (selectEl) selectEl.value = selectedArenaAIs[slotNum] || "";
        return;
    }

    // Set selection
    selectedArenaAIs[slotNum] = id;
    
    // Update select element value to match
    const selectEl = document.getElementById(`slot-select-${slotNum}`);
    if (selectEl) selectEl.value = id;

    // Update UI slot
    const slotEl = document.getElementById(`arena-slot-${slotNum}`);
    const emptyView = slotEl.querySelector('.slot-empty');
    const filledView = slotEl.querySelector('.slot-filled');
    
    if (emptyView) emptyView.classList.add('hidden');
    if (filledView) {
        filledView.classList.remove('hidden');
        filledView.innerHTML = `
            <div class="slot-filled-left">
                <div class="slot-filled-logo" style="background:${tool.logoColor}">${tool.logoLetter}</div>
                <div>
                    <h4 class="slot-filled-name">${tool.name}</h4>
                    <span class="slot-filled-cat">${tool.category}</span>
                </div>
            </div>
            <button class="btn-slot-remove" data-slot="${slotNum}" aria-label="Remove AI">&times;</button>
        `;

        // Bind remove button
        filledView.querySelector('.btn-slot-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            removeAIFromSlot(slotNum);
        });
    }

    // Enable/Disable compare button
    updateArenaSubmitButton();
}

function removeAIFromSlot(slotNum) {
    selectedArenaAIs[slotNum] = null;

    // Reset select element dropdown
    const selectEl = document.getElementById(`slot-select-${slotNum}`);
    if (selectEl) selectEl.value = "";

    // Reset UI slot
    const slotEl = document.getElementById(`arena-slot-${slotNum}`);
    const emptyView = slotEl.querySelector('.slot-empty');
    const filledView = slotEl.querySelector('.slot-filled');

    if (filledView) filledView.classList.add('hidden');
    if (emptyView) emptyView.classList.remove('hidden');

    // Hide results if open, as one slot is empty
    const resultsSection = document.getElementById('arena-results-section');
    if (resultsSection) resultsSection.classList.add('hidden');

    updateArenaSubmitButton();
}

function updateArenaSubmitButton() {
    const compareSubmit = document.getElementById('arena-compare-submit');
    if (!compareSubmit) return;
    compareSubmit.disabled = !(selectedArenaAIs["1"] && selectedArenaAIs["2"]);
}

function runArenaComparison() {
    const id1 = selectedArenaAIs["1"];
    const id2 = selectedArenaAIs["2"];
    const ai1 = aiDatabase.find(t => t.id === id1);
    const ai2 = aiDatabase.find(t => t.id === id2);
    
    if (!ai1 || !ai2) return;

    const resultsSection = document.getElementById('arena-results-section');
    if (!resultsSection) return;

    // 1. Calculate Score based on features and ratings
    const getScore = (ai) => {
        let count = 0;
        if (ai.comparison.chat) count++;
        if (ai.comparison.images) count++;
        if (ai.comparison.video) count++;
        if (ai.comparison.audio) count++;
        if (ai.comparison.coding) count++;
        if (ai.comparison.research) count++;
        if (ai.comparison.freePlan) count++;
        
        return {
            features: count,
            rating: parseFloat(ai.rating)
        };
    };

    const score1 = getScore(ai1);
    const score2 = getScore(ai2);

    // Determine winner
    let winner = null;
    let winnerText = "";
    let reasonText = "";

    if (score1.rating > score2.rating) {
        winner = ai1;
    } else if (score2.rating > score1.rating) {
        winner = ai2;
    } else {
        // Tie-breaker
        if (score1.features > score2.features) {
            winner = ai1;
        } else if (score2.features > score1.features) {
            winner = ai2;
        }
    }

    if (winner) {
        winnerText = `${winner.name} Wins!`;
    } else {
        winnerText = "It's a Tie!";
    }

    // Dynamic analysis description
    if (ai1.categoryKey === ai2.categoryKey) {
        if (winner) {
            const runnerUp = winner.id === ai1.id ? ai2 : ai1;
            reasonText = `<span class="verdict-desc-highlight">${winner.name}</span> is slightly better for general tasks due to its higher user rating of <span class="verdict-score-high">${winner.rating}★</span> and optimized key capabilities. However, <span class="verdict-desc-highlight">${runnerUp.name}</span> (${runnerUp.rating}★) remains a robust alternative in the <span class="verdict-desc-highlight">${winner.categoryKey}</span> category.`;
        } else {
            reasonText = `Both AIs are evenly matched in the <span class="verdict-desc-highlight">${ai1.categoryKey}</span> space, each sharing a rating of <span class="verdict-score-high">${ai1.rating}★</span>. Choose based on specific features like ${ai1.capabilities[0]} or ${ai2.capabilities[0]}.`;
        }
    } else {
        reasonText = `These models serve different domains: <span class="verdict-desc-highlight">${ai1.name}</span> is for <span class="verdict-desc-highlight">${ai1.category}</span> while <span class="verdict-desc-highlight">${ai2.name}</span> focuses on <span class="verdict-desc-highlight">${ai2.category}</span>. For general purposes, <span class="verdict-desc-highlight">${winner ? winner.name : ai1.name}</span> holds the edge. Select according to your specific functional requirements.`;
    }

    resultsSection.innerHTML = `
        <div class="verdict-header">
            <span class="verdict-header-title">Duel Result</span>
            <span class="verdict-badge">${winnerText}</span>
        </div>
        <div class="verdict-comparison-details">
            <div class="verdict-detail-row">
                <span class="verdict-detail-label">Rating</span>
                <span class="verdict-detail-values">
                    <span class="${winner && winner.id === ai1.id ? 'verdict-score-high' : ''}">${ai1.rating}★</span>
                    <span>/</span>
                    <span class="${winner && winner.id === ai2.id ? 'verdict-score-high' : ''}">${ai2.rating}★</span>
                </span>
            </div>
            <div class="verdict-detail-row">
                <span class="verdict-detail-label">Features Supported</span>
                <span class="verdict-detail-values">
                    <span class="${score1.features > score2.features ? 'verdict-score-high' : ''}">${score1.features}</span>
                    <span>/</span>
                    <span class="${score2.features > score1.features ? 'verdict-score-high' : ''}">${score2.features}</span>
                </span>
            </div>
            <div class="verdict-detail-row">
                <span class="verdict-detail-label">Chat Capable</span>
                <span class="verdict-detail-values">
                    <span>${ai1.comparison.chat ? '✓' : '✕'}</span>
                    <span>/</span>
                    <span>${ai2.comparison.chat ? '✓' : '✕'}</span>
                </span>
            </div>
            <div class="verdict-detail-row">
                <span class="verdict-detail-label">Image Creation</span>
                <span class="verdict-detail-values">
                    <span>${ai1.comparison.images ? '✓' : '✕'}</span>
                    <span>/</span>
                    <span>${ai2.comparison.images ? '✓' : '✕'}</span>
                </span>
            </div>
            <div class="verdict-detail-row">
                <span class="verdict-detail-label">Coding Assistant</span>
                <span class="verdict-detail-values">
                    <span>${ai1.comparison.coding ? '✓' : '✕'}</span>
                    <span>/</span>
                    <span>${ai2.comparison.coding ? '✓' : '✕'}</span>
                </span>
            </div>
            <div class="verdict-detail-row">
                <span class="verdict-detail-label">Deep Research</span>
                <span class="verdict-detail-values">
                    <span>${ai1.comparison.research ? '✓' : '✕'}</span>
                    <span>/</span>
                    <span>${ai2.comparison.research ? '✓' : '✕'}</span>
                </span>
            </div>
        </div>
        <div class="verdict-desc-box">
            <p>${reasonText}</p>
        </div>
    `;

    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
