/**
 * What to Cook Today? — Application Logic
 * Daily cooking decision assistant for South Indian homemakers
 */

;(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  //  STATE
  // ═══════════════════════════════════════════════════════════════

  const YOUTUBE_API_KEY = ''; // Optional: Add a free YouTube v3 key here for in-app video embeds

  const state = {
    selectedIngredients: [],
    filters: {
      veg: false,
      nonveg: false,
      quick: false,
      lowEffort: false,
      spicy: false,
      breakfast: false,
      lunch: false,
      dinner: false,
      snack: false
    },
    currentView: 'home',
    history: [],      // [{ dishId, date }]
    favorites: [],    // [dishId]
    marketList: [],   // [ingredientId]
    prepList: [],     // [prepId]
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
    MARKET: 'wtct_market',
    PREP: 'wtct_prep'
  };

  function loadState() {
    try {
      const h = localStorage.getItem(STORAGE_KEYS.HISTORY);
      const f = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      const m = localStorage.getItem(STORAGE_KEYS.MARKET);
      const p = localStorage.getItem(STORAGE_KEYS.PREP);
      if (h) state.history = JSON.parse(h);
      if (f) state.favorites = JSON.parse(f);
      if (m) state.marketList = JSON.parse(m);
      if (p) state.prepList = JSON.parse(p);
    } catch (e) {
      console.warn('Storage load error:', e);
    }
  }

  function saveHistory() {
    try { localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history)); } catch (e) {}
  }

  function saveFavorites() {
    try { localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites)); } catch (e) {}
  }

  function saveMarket() {
    try { localStorage.setItem(STORAGE_KEYS.MARKET, JSON.stringify(state.marketList)); } catch (e) {}
  }

  function savePrep() {
    try { localStorage.setItem(STORAGE_KEYS.PREP, JSON.stringify(state.prepList)); } catch (e) {}
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
    if (view === 'market') renderMarket();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ═══════════════════════════════════════════════════════════════
  //  INGREDIENT GRID
  // ═══════════════════════════════════════════════════════════════

  function renderIngredientGrid() {
    const categoryLabels = {
      'leftovers': '♻️ Use Leftovers',
      'vegetable': '🥬 Vegetables',
      'protein': '🍗 Meat & Protein',
      'batter': '🥣 Batters',
      'grain': '🌾 Grains & Dals',
      'pantry': '🌿 Spices, Masala & Staples'
    };

    const grouped = {};
    INGREDIENTS.forEach(ing => {
      if (!grouped[ing.category]) grouped[ing.category] = [];
      grouped[ing.category].push(ing);
    });

    let html = '';
    const order = ['leftovers', 'vegetable', 'protein', 'batter', 'grain', 'pantry'];
    
    order.forEach(cat => {
      if (grouped[cat] && grouped[cat].length > 0) {
        html += `<div style="grid-column: 1 / -1; margin: 15px 0 5px; font-weight: bold; color: var(--text-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">${categoryLabels[cat]}</div>`;
        html += grouped[cat].map(ing => `
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
    });

    els.ingredientGrid.innerHTML = html;
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

    // Mutually exclusive: breakfast, lunch, dinner, snack
    if (['breakfast', 'lunch', 'dinner', 'snack'].includes(filterKey)) {
      ['breakfast', 'lunch', 'dinner', 'snack'].forEach(k => {
        if (k !== filterKey) state.filters[k] = false;
      });
    }

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

    // 0. If no ingredients are filtered, rank based on effort vs popularity
    if (selectedIngredients.length === 0) {
      result.score = dish.effort_level === 'low' ? 3 : dish.effort_level === 'medium' ? 2 : 1;
      result.matchPercent = 0;
      return result;
    }

    // 1. Categorize ingredients into Core vs. Pantry
    const dishCores = [];
    const dishPantry = [];
    
    dish.ingredients.forEach(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      // Ensure fundamental bases like onion and tomato are treated flexibly (like pantry items)
      if (id === 'onion' || id === 'tomato') {
        dishPantry.push(id);
      } else if (ing && ['vegetable', 'protein', 'grain', 'batter'].includes(ing.category)) {
        dishCores.push(id);
      } else {
        dishPantry.push(id); 
      }
    });

    const matchedCores = dishCores.filter(id => selectedIngredients.includes(id));
    const matchedPantry = dishPantry.filter(id => selectedIngredients.includes(id));
    
    result.matchedIngredients = [...matchedCores, ...matchedPantry];

    // 2. Base Scoring
    // We enforce that Core ingredients MUST be met, otherwise heavy penalty
    let score = matchedCores.length * 10; 
    const missingCores = dishCores.length - matchedCores.length;
    score -= missingCores * 15; // Strict penalty for lacking the main protein/vegetable
    score += matchedPantry.length * 2; // Small bump for pantry items

    // 3. Batter Clash Penalty
    // If the user selected a very specific batter, and this dish requires a different one -> Disqualify.
    const selectedBatters = selectedIngredients.filter(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      return ing && ing.category === 'batter';
    });
    const dishBatters = dishCores.filter(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      return ing && ing.category === 'batter';
    });

    if (selectedBatters.length > 0 && dishBatters.length > 0) {
      const matchedBatters = dishBatters.filter(b => selectedBatters.includes(b));
      if (matchedBatters.length === 0) {
        score -= 50; // Total clash!
      }
    }

    // 4. Final adjustments
    if (dish.effort_level === 'low') score += 0.5;

    result.score = score;
    result.matchPercent = Math.round((result.matchedIngredients.length / dish.ingredients.length) * 100);

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
    if (filters.breakfast) candidates = candidates.filter(c => c.dish.meal_type === 'breakfast');
    if (filters.lunch) candidates = candidates.filter(c => c.dish.meal_type === 'lunch');
    if (filters.dinner) candidates = candidates.filter(c => c.dish.meal_type === 'dinner');
    if (filters.snack) candidates = candidates.filter(c => c.dish.meal_type === 'snack');

    // If ingredients selected, filter by intent
    if (selected.length > 0) {
      // Score > 0 ensures they aren't missing major core ingredients
      const validMatches = candidates.filter(c => c.score > 0);
      if (validMatches.length > 0) {
        candidates = validMatches;
      } else {
        // Fallback: exclude out bad batter clashes and ensure some intersection
        candidates = candidates.filter(c => c.score > -40 && c.matchPercent > 0);
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

    return candidates.slice(0, 8);
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
    if (filters.breakfast) pool = pool.filter(d => d.meal_type === 'breakfast');
    if (filters.lunch) pool = pool.filter(d => d.meal_type === 'lunch');
    if (filters.dinner) pool = pool.filter(d => d.meal_type === 'dinner');
    if (filters.snack) pool = pool.filter(d => d.meal_type === 'snack');

    if (pool.length === 0) pool = DISHES; // Fallback

    const pick = pool[Math.floor(Math.random() * pool.length)];
    return [{ dish: pick, score: 10, matchPercent: 100, matchedIngredients: [] }];
  }

  // ═══════════════════════════════════════════════════════════════
  //  RENDERING: SUGGESTIONS
  // ═══════════════════════════════════════════════════════════════

  function renderSuggestions(results) {
    if (results.length === 0) {
      // Create fallback search link based on selected ingredients
      const searchTerms = state.selectedIngredients.map(id => {
        const ing = INGREDIENTS.find(i => i.id === id);
        return ing ? (ing.name.includes('(') ? ing.name.split(' (')[0] : ing.name) : id;
      }).join(' ');
      
      const fallbackUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent('Tamil recipe with ' + searchTerms)}`;

      els.dishList.innerHTML = `
        <div class="empty-state">
          <span class="emoji-large">🤷‍♀️</span>
          <h3>No matches found locally</h3>
          <p>Try selecting different ingredients or check online!</p>
          <a href="${fallbackUrl}" target="_blank" class="action-btn" style="background:#ff0000; color:white; text-decoration:none; display:inline-block; margin-top:15px; width:auto; padding: 10px 20px;">
            ▶️ Search YouTube Instead
          </a>
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
          <span class="badge badge-tamil">🏛️ Tamil Nadu</span>
          <span class="badge ${d.isVeg ? 'badge-veg' : 'badge-nonveg'}">
            ${d.isVeg ? '🥬 Veg' : '🍗 Non-Veg'}
          </span>
          <span class="badge badge-meal">
            ${d.meal_type === 'breakfast' ? '🌅' : d.meal_type === 'lunch' ? '🍚' : d.meal_type === 'snack' ? '☕' : '🌙'} ${d.meal_type ? d.meal_type.charAt(0).toUpperCase() + d.meal_type.slice(1) : ''}
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
  //  YOUTUBE INTEGRATION
  // ═══════════════════════════════════════════════════════════════

  async function fetchYouTubeVideo(dishName) {
    if (!YOUTUBE_API_KEY) return null;
    try {
      const query = encodeURIComponent(`Tamil home cooking ${dishName} recipe`);
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=1&key=${YOUTUBE_API_KEY}&type=video`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
      }
    } catch (e) {
      console.warn("YouTube API Error:", e);
    }
    return null;
  }

  // ═══════════════════════════════════════════════════════════════
  //  RECIPE MODAL
  // ═══════════════════════════════════════════════════════════════

  function showRecipe(dishId) {
    const dish = DISHES.find(d => d.id === dishId);
    if (!dish) return;

    const isFav = state.favorites.includes(dish.id);
    const ingredientHtml = dish.ingredients.map(id => {
      const ing = INGREDIENTS.find(i => i.id === id);
      const name = ing ? `${ing.emoji} ${ing.name}` : id;
      const inMarket = state.marketList.includes(id);
      return `<span class="selected-tag" style="background: var(--bg-hover); color: var(--text-primary); display:flex; align-items:center; gap:8px; padding-right: 4px; font-size: 0.85rem;">
                ${name} 
                <button aria-label="Add to Market" onclick="window.toggleMarketItem('${id}'); this.innerHTML='✓'; this.style.background='var(--primary-color)';" style="background:${inMarket ? 'var(--primary-color)' : 'rgba(0,0,0,0.1)'}; border:none; border-radius:50%; color:white; width:22px; height:22px; display:flex; align-items:center; justify-content:center; cursor:pointer;" title="Add to Shopping List">${inMarket ? '✓' : '+'}</button>
              </span>`;
    }).join('');

    els.recipeBody.innerHTML = `
      <h2 class="modal-dish-name">${dish.name}</h2>
      <div class="modal-meta">
        <span class="badge badge-tamil">🏛️ Tamil Nadu</span>
        <span class="badge ${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}">
          ${dish.isVeg ? '🥬 Veg' : '🍗 Non-Veg'}
        </span>
        <span class="badge" style="background: #f3e5f5; color: #7b1fa2;">
          ⏱️ ${dish.prep_time} min
        </span>
      </div>

      ${dish.serves_with ? `
      <div style="margin: 10px 0; background: #fff3e0; padding: 12px; border-radius: 8px; font-size: 0.95rem; border-left: 4px solid #ff9800; color: #e65100;">
        <strong>🍽️ Complete the Meal:</strong> Pair with ${dish.serves_with}
      </div>` : ''}

      ${dish.ingredients.includes('batter_fermented') ? `
      <div style="margin: 10px 0; background: #e3f2fd; padding: 10px; border-radius: 8px; font-size: 0.85rem; border-left: 4px solid #2196f3; display:flex; justify-content:space-between; align-items:center;">
        <span>⚠️ Needs overnight batter!</span>
        <button onclick="window.togglePrepItem('prep_idli', true); window.showToast('Added to Tonight\\'s Prep 🕒');" style="background:#2196f3; color:white; border:none; border-radius:4px; padding:4px 8px; font-size:0.75rem; cursor:pointer;">Add to Prep</button>
      </div>` : ''}

      <div class="section-title"><span class="icon">🥘</span> Ingredients</div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
        ${ingredientHtml}
      </div>

      <div class="section-title"><span class="icon">👨‍🍳</span> Instructions</div>
      <ol style="margin-bottom: 20px; padding-left: 20px; color: var(--text-secondary); font-size: 0.95rem;">
        ${(dish.steps || []).map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
      </ol>

      <div id="youtube-container" style="margin-top: 15px; text-align: center;">
        <button id="loadVideoBtn" class="action-btn btn-secondary" style="width: 100%; border: 1px solid #ff0000; color: #ff0000; background: transparent;">
          <span class="icon">▶️</span> Watch YouTube Recipe
        </button>
      </div>

      <div class="modal-actions" style="margin-top: 15px;">
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
    $('#loadVideoBtn').addEventListener('click', async () => {
      const container = $('#youtube-container');
      
      if (!YOUTUBE_API_KEY) {
        // Fallback if no API key is provided
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent('Tamil recipe ' + dish.name)}`;
        container.innerHTML = `
          <a href="${searchUrl}" target="_blank" class="action-btn" style="background:#ff0000; color:white; text-decoration:none; display:inline-block; padding: 10px;">
            ▶️ Open YouTube Search
          </a>
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:8px;">Add a free YouTube API key in code to embed videos here</div>
        `;
        return;
      }

      container.innerHTML = '<div style="padding: 10px; color: var(--text-secondary);">Loading video...</div>';
      const videoId = await fetchYouTubeVideo(dish.name);
      
      if (videoId) {
        container.innerHTML = `
          <iframe width="100%" height="215" style="border-radius: 8px; border: none; margin-top: 5px;" 
                  src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
        `;
      } else {
        container.innerHTML = '<div style="color: red; padding: 10px;">Could not load video.</div>';
      }
    });

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
  //  MARKET / SHOPPING LIST
  // ═══════════════════════════════════════════════════════════════

  function toggleMarketItem(ingredientId) {
    const idx = state.marketList.indexOf(ingredientId);
    if (idx === -1) {
      state.marketList.push(ingredientId);
      showToast('Added to list 🛒');
    } else {
      state.marketList.splice(idx, 1);
    }
    saveMarket();
    if (state.currentView === 'market') renderMarket();
  }
  window.toggleMarketItem = toggleMarketItem;


  function renderMarket() {
    const container = $('#marketList');
    if (!container) return;
    
    if (state.marketList.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="emoji-large">🛒</span>
          <h3>Your list is empty</h3>
          <p>Add missing ingredients to buy them later!</p>
        </div>`;
      return;
    }

    container.innerHTML = state.marketList.map(mid => {
      const ing = INGREDIENTS.find(i => i.id === mid) || { id: mid, name: mid, emoji: '🛒' };
      return `
        <div class="history-item" style="display:flex; justify-content:space-between; align-items:center;">
          <div><span style="margin-right:10px;">${ing.emoji}</span> ${ing.name}</div>
          <button class="action-btn" style="padding: 5px 10px; min-width: auto; background:var(--bg-hover);" onclick="window.removeMarketItem('${mid}')">✅</button>
        </div>`;
    }).join('');

    container.innerHTML += `<button class="clear-btn" style="margin-top:20px;" onclick="window.clearMarketList()">🗑️ Clear List</button>`;
  }

  window.removeMarketItem = (id) => {
    state.marketList = state.marketList.filter(i => i !== id);
    saveMarket();
    renderMarket();
  };

  window.clearMarketList = () => {
    state.marketList = [];
    saveMarket();
    renderMarket();
  };

  // ═══════════════════════════════════════════════════════════════
  //  TONIGHT'S PREP TRACKER
  // ═══════════════════════════════════════════════════════════════

  const PREP_ITEMS_DATA = [
    { id: 'prep_idli', text: 'Soak Urad Dal & Rice (For Idli/Dosai)' },
    { id: 'prep_curd', text: 'Set Milk for Curd Overnight' },
    { id: 'prep_chana', text: 'Soak Chana/Rajma (For Sundal/Curry)' }
  ];

  function renderPrepTracker() {
    const container = $('#prepTracker');
    if (!container) return;

    container.innerHTML = PREP_ITEMS_DATA.map(item => {
      const isDone = state.prepList.includes(item.id);
      return `
        <label style="display:flex; align-items:center; margin-bottom:8px; cursor:pointer; color: ${isDone ? 'var(--text-secondary)' : 'var(--text-primary)'}; text-decoration: ${isDone ? 'line-through' : 'none'};">
          <input type="checkbox" style="margin-right:10px; transform:scale(1.2);"
                 onchange="window.togglePrepItem('${item.id}', this.checked)" ${isDone ? 'checked' : ''}>
          ${item.text}
        </label>
      `;
    }).join('');
  }

  window.togglePrepItem = (id, isChecked) => {
    if (isChecked) {
      if (!state.prepList.includes(id)) state.prepList.push(id);
    } else {
      state.prepList = state.prepList.filter(i => i !== id);
    }
    savePrep();
    renderPrepTracker();
  };

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
    window.showToast = showToast;
    loadState();
    renderIngredientGrid();
    renderPrepTracker();
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
      if (state.filters.nonveg) {
        els.suggestionIntro.querySelector('.intro-text').innerHTML =
          '<strong>🍗 Sunday Special!</strong> Here are an authentic set of South Indian Non-Veg treats!';
      } else if (state.selectedIngredients.length === 0) {
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
