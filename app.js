/**
 * What to Cook Today? — Application Logic
 * Daily cooking decision assistant for South Indian homemakers
 */

;(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  //  STATE
  // ═══════════════════════════════════════════════════════════════

  const state = {
    selectedIngredients: [],
    filters: {
      veg: false,
      nonveg: false,
      quick: false,
      lowEffort: false,
      spicy: false,
      tamil: false,
      andhra: false
    },
    currentView: 'home',
    history: [],      // [{ dishId, date }]
    favorites: [],    // [dishId]
  };

  // ═══════════════════════════════════════════════════════════════
  //  DOM REFS
  // ═══════════════════════════════════════════════════════════════

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    ingredientGrid: $('#ingredientGrid'),
    ingredientCount: $('#ingredientCount'),
    selectedSummary: $('#selectedSummary'),
    filterBar: $('#filterBar'),
    findDishesBtn: $('#findDishesBtn'),
    surpriseMeBtn: $('#surpriseMeBtn'),
    dishList: $('#dishList'),
    favoritesList: $('#favoritesList'),
    historyList: $('#historyList'),
    recipeModal: $('#recipeModal'),
    recipeBody: $('#recipeBody'),
    toast: $('#toast'),
    backFromSuggestions: $('#backFromSuggestions'),
    installBanner: $('#installBanner'),
    installBannerBtn: $('#installBannerBtn'),
    installHeaderBtn: $('#installHeaderBtn'),
    suggestionIntro: $('#suggestionIntro'),
  };

  // ═══════════════════════════════════════════════════════════════
  //  STORAGE
  // ═══════════════════════════════════════════════════════════════

  const STORAGE_KEYS = {
    HISTORY: 'wtct_history',
    FAVORITES: 'wtct_favorites',
  };

  function loadState() {
    try {
      const h = localStorage.getItem(STORAGE_KEYS.HISTORY);
      const f = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (h) state.history = JSON.parse(h);
      if (f) state.favorites = JSON.parse(f);
    } catch (e) {
      console.warn('Storage load error:', e);
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    } catch (e) { /* quota exceeded fallback */ }
  }

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
    } catch (e) { /* quota exceeded fallback */ }
  }

  // ═══════════════════════════════════════════════════════════════
  //  NAVIGATION
  // ═══════════════════════════════════════════════════════════════

  function navigateTo(view) {
    state.currentView = view;

    // Toggle views
    $$('.view').forEach(v => v.classList.remove('active'));
    $(`#view-${view}`).classList.add('active');

    // Toggle nav
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $(`#nav-${view}`).classList.add('active');

    // Render on navigate
    if (view === 'favorites') renderFavorites();
    if (view === 'history') renderHistory();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ═══════════════════════════════════════════════════════════════
  //  INGREDIENT GRID
  // ═══════════════════════════════════════════════════════════════

  function renderIngredientGrid() {
    els.ingredientGrid.innerHTML = INGREDIENTS.map(ing => `
      <button class="ingredient-btn ${state.selectedIngredients.includes(ing.id) ? 'selected' : ''}"
              data-id="${ing.id}"
              id="ing-${ing.id}"
              aria-label="Select ${ing.name}"
              aria-pressed="${state.selectedIngredients.includes(ing.id)}">
        <span class="emoji">${ing.emoji}</span>
        <span class="label">${ing.name}</span>
      </button>
    `).join('');
  }

  function toggleIngredient(id) {
    const idx = state.selectedIngredients.indexOf(id);
    if (idx === -1) {
      state.selectedIngredients.push(id);
    } else {
      state.selectedIngredients.splice(idx, 1);
    }
    updateIngredientUI();
  }

  function updateIngredientUI() {
    // Update buttons
    INGREDIENTS.forEach(ing => {
      const btn = $(`#ing-${ing.id}`);
      if (btn) {
        const sel = state.selectedIngredients.includes(ing.id);
        btn.classList.toggle('selected', sel);
        btn.setAttribute('aria-pressed', sel);
      }
    });

    // Update count
    const count = state.selectedIngredients.length;
    els.ingredientCount.textContent = count;

    // Update Find button
    els.findDishesBtn.disabled = false; // Allow finding even with 0 (shows common dishes)

    // Update selected summary
    if (count > 0) {
      els.selectedSummary.classList.add('visible');
      els.selectedSummary.innerHTML = state.selectedIngredients.map(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        return `<span class="selected-tag" data-id="${id}">${ing.emoji} ${ing.name} ✕</span>`;
      }).join('');
    } else {
      els.selectedSummary.classList.remove('visible');
      els.selectedSummary.innerHTML = '';
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  FILTERS
  // ═══════════════════════════════════════════════════════════════

  function toggleFilter(filterKey) {
    // Mutually exclusive: veg & nonveg
    if (filterKey === 'veg' && state.filters.nonveg) state.filters.nonveg = false;
    if (filterKey === 'nonveg' && state.filters.veg) state.filters.veg = false;

    // Mutually exclusive: tamil & andhra
    if (filterKey === 'tamil' && state.filters.andhra) state.filters.andhra = false;
    if (filterKey === 'andhra' && state.filters.tamil) state.filters.tamil = false;

    state.filters[filterKey] = !state.filters[filterKey];
    updateFilterUI();
  }

  function updateFilterUI() {
    Object.keys(state.filters).forEach(key => {
      const chip = $(`#filter-${key}`);
      if (chip) chip.classList.toggle('active', state.filters[key]);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  //  SUGGESTION ENGINE
  // ═══════════════════════════════════════════════════════════════

  function getRecentDishIds(withinDays = 3) {
    const cutoff = Date.now() - (withinDays * 24 * 60 * 60 * 1000);
    return state.history
      .filter(h => new Date(h.date).getTime() > cutoff)
      .map(h => h.dishId);
  }

  function scoreDish(dish, selectedIngredients) {
    const result = { dish, score: 0, matchPercent: 0, matchedIngredients: [] };

    if (selectedIngredients.length === 0) {
      // No ingredients selected → score based on popularity (effort level as proxy)
      result.score = dish.effort_level === 'low' ? 3 : dish.effort_level === 'medium' ? 2 : 1;
      result.matchPercent = 0;
      return result;
    }

    // Calculate ingredient match
    const dishIngredients = dish.ingredients;
    const matched = selectedIngredients.filter(i => dishIngredients.includes(i));
    const matchPercent = matched.length / dishIngredients.length;

    result.matchedIngredients = matched;
    result.matchPercent = Math.round(matchPercent * 100);

    // Base score: ingredient match (0-10)
    result.score = matchPercent * 10;

    // Bonus: user has MORE than needed (all dish ingredients covered)
    if (matched.length >= dishIngredients.length) {
      result.score += 2;
    }

    // Effort bonus (lower effort = slight bonus)
    if (dish.effort_level === 'low') result.score += 0.5;

    return result;
  }

  function getSuggestions() {
    const selected = state.selectedIngredients;
    const filters = state.filters;
    const recentIds = getRecentDishIds(3);

    let candidates = DISHES.map(dish => scoreDish(dish, selected));

    // Apply filters
    if (filters.veg) candidates = candidates.filter(c => c.dish.isVeg);
    if (filters.nonveg) candidates = candidates.filter(c => !c.dish.isVeg);
    if (filters.quick) candidates = candidates.filter(c => c.dish.prep_time <= 20);
    if (filters.lowEffort) candidates = candidates.filter(c => c.dish.effort_level === 'low');
    if (filters.spicy) candidates = candidates.filter(c => c.dish.spice_level === 'hot');
    if (filters.tamil) candidates = candidates.filter(c => c.dish.cuisine_type === 'Tamil');
    if (filters.andhra) candidates = candidates.filter(c => c.dish.cuisine_type === 'Andhra');

    // If ingredients selected, require at least 60% match (or relax if no results)
    if (selected.length > 0) {
      const goodMatches = candidates.filter(c => c.matchPercent >= 60);
      if (goodMatches.length >= 3) {
        candidates = goodMatches;
      } else {
        // Relax: take best available but sort by match
        candidates = candidates.filter(c => c.matchPercent > 0);
      }
    }

    // Penalize recent dishes
    candidates.forEach(c => {
      if (recentIds.includes(c.dish.id)) {
        c.score -= 3;
      }
    });

    // Sort by score descending
    candidates.sort((a, b) => b.score - a.score);

    // Ensure cuisine diversity in top 5
    const result = [];
    let tamilCount = 0;
    let andhraCount = 0;
    const backup = [];

    for (const c of candidates) {
      if (result.length >= 5) break;

      if (c.dish.cuisine_type === 'Tamil') {
        if (tamilCount < 3) { result.push(c); tamilCount++; }
        else backup.push(c);
      } else {
        if (andhraCount < 3) { result.push(c); andhraCount++; }
        else backup.push(c);
      }
    }

    // Fill remaining slots from backup
    while (result.length < 5 && backup.length > 0) {
      result.push(backup.shift());
    }

    // Re-sort final result by score
    result.sort((a, b) => b.score - a.score);

    return result;
  }

  function surpriseMe() {
    const recentIds = getRecentDishIds(3);
    const filters = state.filters;

    let pool = DISHES.filter(d => !recentIds.includes(d.id));

    // Apply active filters
    if (filters.veg) pool = pool.filter(d => d.isVeg);
    if (filters.nonveg) pool = pool.filter(d => !d.isVeg);
    if (filters.quick) pool = pool.filter(d => d.prep_time <= 20);
    if (filters.lowEffort) pool = pool.filter(d => d.effort_level === 'low');
    if (filters.spicy) pool = pool.filter(d => d.spice_level === 'hot');
    if (filters.tamil) pool = pool.filter(d => d.cuisine_type === 'Tamil');
    if (filters.andhra) pool = pool.filter(d => d.cuisine_type === 'Andhra');

    if (pool.length === 0) pool = DISHES; // Fallback

    // Try to balance cuisine
    const lastCuisine = state.history.length > 0
      ? DISHES.find(d => d.id === state.history[0].dishId)?.cuisine_type
      : null;

    // Prefer opposite cuisine for variety
    if (lastCuisine) {
      const opposite = pool.filter(d => d.cuisine_type !== lastCuisine);
      if (opposite.length > 0) pool = opposite;
    }

    const pick = pool[Math.floor(Math.random() * pool.length)];
    return [{ dish: pick, score: 10, matchPercent: 100, matchedIngredients: [] }];
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERING: SUGGESTIONS
  // ═══════════════════════════════════════════════════════════════

  function renderSuggestions(results) {
    if (results.length === 0) {
      els.dishList.innerHTML = `
        <div class="empty-state">
          <span class="emoji-large">🤷‍♀️</span>
          <h3>No matches found</h3>
          <p>Try selecting different ingredients or adjusting your filters.</p>
        </div>`;
      return;
    }

    els.dishList.innerHTML = results.map(r => {
      const d = r.dish;
      const isFav = state.favorites.includes(d.id);
      return `
      <div class="dish-card ${d.isVeg ? 'veg' : 'nonveg'}" data-dish-id="${d.id}" id="dish-${d.id}">
        <div class="dish-card-header">
          <span class="dish-name">${d.name}</span>
          <button class="dish-fav-btn ${isFav ? 'favorited' : ''}"
                  data-dish-id="${d.id}"
                  aria-label="${isFav ? 'Remove from' : 'Add to'} favorites">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="dish-badges">
          <span class="badge ${d.cuisine_type === 'Tamil' ? 'badge-tamil' : 'badge-andhra'}">
            ${d.cuisine_type === 'Tamil' ? '🏛️' : '🌶️'} ${d.cuisine_type}
          </span>
          <span class="badge ${d.isVeg ? 'badge-veg' : 'badge-nonveg'}">
            ${d.isVeg ? '🥬 Veg' : '🍗 Non-Veg'}
          </span>
        </div>
        <div class="dish-meta">
          <div class="meta-item">
            <span class="icon">⏱️</span> ${d.prep_time} min
          </div>
          <div class="meta-item">
            <span class="icon">💪</span>
            ${renderEffortDots(d.effort_level)}
          </div>
          <div class="meta-item">
            <span class="icon">🌶️</span>
            ${renderSpiceDots(d.spice_level)}
          </div>
        </div>
        ${r.matchPercent > 0 ? `
        <div class="match-bar">
          <div class="match-bar-inner" style="width: ${r.matchPercent}%"></div>
        </div>
        <div class="match-label">${r.matchPercent}% ingredient match</div>
        ` : ''}
      </div>`;
    }).join('');
  }

  function renderEffortDots(level) {
    const levels = { low: 1, medium: 2, high: 3 };
    const n = levels[level] || 1;
    return Array.from({ length: 3 }, (_, i) =>
      `<span class="effort-dot ${i < n ? 'active' : ''}"></span>`
    ).join('');
  }

  function renderSpiceDots(level) {
    const levels = { mild: 1, medium: 2, hot: 3 };
    const n = levels[level] || 1;
    return Array.from({ length: 3 }, (_, i) =>
      `<span class="spice-dot ${i < n ? `active ${level}` : ''}"></span>`
    ).join('');
  }

  // ═══════════════════════════════════════════════════════════════
  //  RECIPE MODAL
  // ═══════════════════════════════════════════════════════════════

  function showRecipe(dishId) {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish) return;

    const isFav = state.favorites.includes(dish.id);
    const ingredientNames = dish.ingredients.map(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      return ing ? `${ing.emoji} ${ing.name}` : id;
    });

    els.recipeBody.innerHTML = `
      <h2 class="modal-dish-name">${dish.name}</h2>
      <div class="modal-meta">
        <span class="badge ${dish.cuisine_type === 'Tamil' ? 'badge-tamil' : 'badge-andhra'}">
          ${dish.cuisine_type === 'Tamil' ? '🏛️' : '🌶️'} ${dish.cuisine_type}
        </span>
        <span class="badge ${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}">
          ${dish.isVeg ? '🥬 Veg' : '🍗 Non-Veg'}
        </span>
        <span class="badge" style="background: #f3e5f5; color: #7b1fa2;">
          ⏱️ ${dish.prep_time} min
        </span>
      </div>

      <div class="section-title"><span class="icon">🥘</span> Ingredients</div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
        ${ingredientNames.map(n => `<span class="selected-tag" style="cursor:default; background: var(--text-secondary);">${n}</span>`).join('')}
      </div>

      <div class="section-title"><span class="icon">👩‍🍳</span> Steps</div>
      <ol class="recipe-steps">
        ${dish.steps.map((step, i) => `
          <li class="recipe-step">
            <span class="step-number">${i + 1}</span>
            <span class="step-text">${step}</span>
          </li>
        `).join('')}
      </ol>

      <div class="modal-actions">
        <button class="action-btn btn-primary" id="modalCookedBtn" data-dish-id="${dish.id}">
          ✅ I Cooked This!
        </button>
        <button class="action-btn btn-secondary" id="modalFavBtn" data-dish-id="${dish.id}">
          ${isFav ? '❤️ Saved' : '🤍 Save'}
        </button>
      </div>
    `;

    els.recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Wire up modal buttons
    $('#modalCookedBtn').addEventListener('click', () => {
      addToHistory(dish.id);
      closeModal();
      showToast(`${dish.name} added to history! 🎉`);
    });

    $('#modalFavBtn').addEventListener('click', () => {
      toggleFavorite(dish.id);
      const nowFav = state.favorites.includes(dish.id);
      $('#modalFavBtn').innerHTML = nowFav ? '❤️ Saved' : '🤍 Save';
      showToast(nowFav ? `${dish.name} saved to favorites ❤️` : `Removed from favorites`);
    });
  }

  function closeModal() {
    els.recipeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ═══════════════════════════════════════════════════════════════
  //  HISTORY
  // ═══════════════════════════════════════════════════════════════

  function addToHistory(dishId) {
    state.history.unshift({
      dishId,
      date: new Date().toISOString()
    });
    // Keep max 30 entries
    if (state.history.length > 30) state.history = state.history.slice(0, 30);
    saveHistory();
  }

  function renderHistory() {
    if (state.history.length === 0) {
      els.historyList.innerHTML = `
        <div class="empty-state">
          <span class="emoji-large">📝</span>
          <h3>No cooking history yet</h3>
          <p>Start cooking and your dishes will appear here!</p>
        </div>`;
      return;
    }

    const html = state.history.map(h => {
      const dish = DISHES.find(d => d.id === h.dishId);
      if (!dish) return '';
      const dateStr = formatDate(h.date);
      return `
        <div class="history-item" data-dish-id="${dish.id}">
          <div class="history-item-info">
            <h4>${dish.name}</h4>
            <span class="history-date">${dateStr}</span>
          </div>
          <div class="history-item-badges">
            <span class="badge ${dish.cuisine_type === 'Tamil' ? 'badge-tamil' : 'badge-andhra'}" style="font-size: 0.65rem;">
              ${dish.cuisine_type}
            </span>
          </div>
        </div>`;
    }).join('');

    els.historyList.innerHTML = html + `
      <button class="clear-btn" id="clearHistoryBtn">🗑️ Clear History</button>`;

    $('#clearHistoryBtn').addEventListener('click', () => {
      state.history = [];
      saveHistory();
      renderHistory();
      showToast('History cleared');
    });
  }

  function formatDate(isoStr) {
    const d = new Date(isoStr);
    const now = new Date();
    const diff = now - d;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  // ═══════════════════════════════════════════════════════════════
  //  FAVORITES
  // ═══════════════════════════════════════════════════════════════

  function toggleFavorite(dishId) {
    const idx = state.favorites.indexOf(dishId);
    if (idx === -1) {
      state.favorites.push(dishId);
    } else {
      state.favorites.splice(idx, 1);
    }
    saveFavorites();
  }

  function renderFavorites() {
    if (state.favorites.length === 0) {
      els.favoritesList.innerHTML = `
        <div class="empty-state">
          <span class="emoji-large">💛</span>
          <h3>No favorites yet</h3>
          <p>Tap the heart on any dish to save it here for quick access.</p>
        </div>`;
      return;
    }

    els.favoritesList.innerHTML = state.favorites.map(fid => {
      const dish = DISHES.find(d => d.id === fid);
      if (!dish) return '';
      return `
        <div class="history-item" data-dish-id="${dish.id}">
          <div class="history-item-info">
            <h4>${dish.name}</h4>
            <span class="history-date">${dish.isVeg ? '🥬 Veg' : '🍗 Non-Veg'} · ${dish.prep_time} min</span>
          </div>
          <div class="history-item-badges">
            <span class="badge ${dish.cuisine_type === 'Tamil' ? 'badge-tamil' : 'badge-andhra'}" style="font-size: 0.65rem;">
              ${dish.cuisine_type}
            </span>
          </div>
        </div>`;
    }).join('');
  }

  // ═══════════════════════════════════════════════════════════════
  //  TOAST
  // ═══════════════════════════════════════════════════════════════

  let toastTimer = null;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('visible'), 2500);
  }

  // ═══════════════════════════════════════════════════════════════
  //  PWA INSTALL PROMPT
  // ═══════════════════════════════════════════════════════════════

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    els.installBanner.classList.add('visible');
    els.installHeaderBtn.classList.add('visible');
  });

  function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        showToast('App installed! 🎉');
      }
      deferredPrompt = null;
      els.installBanner.classList.remove('visible');
      els.installHeaderBtn.classList.remove('visible');
    });
  }

  window.addEventListener('appinstalled', () => {
    els.installBanner.classList.remove('visible');
    els.installHeaderBtn.classList.remove('visible');
    showToast('What to Cook Today? installed! 🍛');
  });

  // ═══════════════════════════════════════════════════════════════
  //  EVENT LISTENERS
  // ═══════════════════════════════════════════════════════════════

  function init() {
    loadState();
    renderIngredientGrid();
    updateIngredientUI();
    updateFilterUI();

    // ── Ingredient Grid Clicks ──
    els.ingredientGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.ingredient-btn');
      if (!btn) return;
      toggleIngredient(btn.dataset.id);
    });

    // ── Selected Summary Tag Removal ──
    els.selectedSummary.addEventListener('click', (e) => {
      const tag = e.target.closest('.selected-tag');
      if (!tag) return;
      toggleIngredient(tag.dataset.id);
    });

    // ── Filter Chips ──
    els.filterBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      toggleFilter(chip.dataset.filter);
    });

    // ── Find Dishes ──
    els.findDishesBtn.addEventListener('click', () => {
      const results = getSuggestions();
      renderSuggestions(results);

      // Update intro text
      if (state.selectedIngredients.length === 0) {
        els.suggestionIntro.querySelector('.intro-text').innerHTML =
          'Here are some <strong>easy everyday dishes</strong> to get you started!';
      } else {
        const count = state.selectedIngredients.length;
        els.suggestionIntro.querySelector('.intro-text').innerHTML =
          `Based on your <strong>${count} ingredient${count > 1 ? 's' : ''}</strong>, here are today's best picks!`;
      }

      navigateTo('suggestions');
    });

    // ── Surprise Me ──
    els.surpriseMeBtn.addEventListener('click', () => {
      const results = surpriseMe();
      renderSuggestions(results);
      els.suggestionIntro.querySelector('.intro-text').innerHTML =
        `<strong>🎲 Surprise!</strong> How about this dish today?`;
      navigateTo('suggestions');
    });

    // ── Back from Suggestions ──
    els.backFromSuggestions.addEventListener('click', () => {
      navigateTo('home');
    });

    // ── Dish Card Clicks ──
    els.dishList.addEventListener('click', (e) => {
      // Favorite button
      const favBtn = e.target.closest('.dish-fav-btn');
      if (favBtn) {
        e.stopPropagation();
        const dishId = favBtn.dataset.dishId;
        toggleFavorite(dishId);
        const nowFav = state.favorites.includes(dishId);
        favBtn.innerHTML = nowFav ? '❤️' : '🤍';
        favBtn.classList.toggle('favorited', nowFav);
        const dish = DISHES.find(d => d.id === dishId);
        showToast(nowFav ? `${dish.name} saved ❤️` : 'Removed from favorites');
        return;
      }

      // Card click = show recipe
      const card = e.target.closest('.dish-card');
      if (card) showRecipe(card.dataset.dishId);
    });

    // ── Favorites List Clicks ──
    els.favoritesList.addEventListener('click', (e) => {
      const item = e.target.closest('.history-item');
      if (item) showRecipe(item.dataset.dishId);
    });

    // ── History List Clicks ──
    els.historyList.addEventListener('click', (e) => {
      const item = e.target.closest('.history-item');
      if (item) showRecipe(item.dataset.dishId);
    });

    // ── Modal Close ──
    els.recipeModal.addEventListener('click', (e) => {
      if (e.target === els.recipeModal) closeModal();
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // ── Bottom Nav ──
    $$('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.view);
      });
    });

    // ── Install Buttons ──
    els.installBannerBtn.addEventListener('click', handleInstall);
    els.installHeaderBtn.addEventListener('click', handleInstall);

    // ── Register Service Worker ──
    registerServiceWorker();
  }

  // ═══════════════════════════════════════════════════════════════
  //  SERVICE WORKER REGISTRATION
  // ═══════════════════════════════════════════════════════════════

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(reg => {
            console.log('SW registered:', reg.scope);
          })
          .catch(err => {
            console.warn('SW registration failed:', err);
          });
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  BOOT
  // ═══════════════════════════════════════════════════════════════

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
