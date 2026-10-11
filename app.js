// KidsMedia - Core Application Controller
// Polished mobile-first creative learning community prototype for children.

class KidsMediaApp {
  constructor() {
    this.currentScreen = 'home';
    this.selectedCategory = 'all';
    this.selectedAge = 'all';
    this.searchQuery = '';
    this.activeCreation = null;
    this.parentAuthenticated = false;
    this.mediaType = 'art';
    this.isRecording = false;
    this.recordTimer = 0;
    this.recordInterval = null;
    this.isPlaying = false;
    this.playTimer = 0;
    this.playInterval = null;

    // Load state from localStorage or initialize from data.js
    this.loadState();
  }

  loadState() {
    const savedCreations = localStorage.getItem('km_creations_v2');
    const savedPending = localStorage.getItem('km_pending_v2');
    const savedRejected = localStorage.getItem('km_rejected_v2');
    const savedBadges = localStorage.getItem('km_badges_v2');
    const savedCheers = localStorage.getItem('km_growth_cheers_v2');

    this.creations = savedCreations ? JSON.parse(savedCreations) : [...INITIAL_APPROVED_CREATIONS];
    this.pendingSubmissions = savedPending ? JSON.parse(savedPending) : [...INITIAL_PENDING_SUBMISSIONS];
    this.rejectedSubmissions = savedRejected ? JSON.parse(savedRejected) : [];
    this.badges = savedBadges ? JSON.parse(savedBadges) : [...INITIAL_BADGES];
    this.growthCheers = savedCheers ? JSON.parse(savedCheers) : [...INITIAL_GROWTH_CHEERS];
    this.categories = [...INITIAL_CATEGORIES];
  }

  saveState() {
    localStorage.setItem('km_creations_v2', JSON.stringify(this.creations));
    localStorage.setItem('km_pending_v2', JSON.stringify(this.pendingSubmissions));
    localStorage.setItem('km_rejected_v2', JSON.stringify(this.rejectedSubmissions));
    localStorage.setItem('km_badges_v2', JSON.stringify(this.badges));
    localStorage.setItem('km_growth_cheers_v2', JSON.stringify(this.growthCheers));
    this.updateHeaderBadges();
  }

  resetDemoData() {
    localStorage.removeItem('km_creations_v2');
    localStorage.removeItem('km_pending_v2');
    localStorage.removeItem('km_rejected_v2');
    localStorage.removeItem('km_badges_v2');
    localStorage.removeItem('km_growth_cheers_v2');
    this.loadState();
    this.renderCurrentScreen();
    this.showToast('✨ Demo sample data restored to initial state!');
    sounds.sparkle();
  }

  init() {
    this.bindEvents();
    this.updateHeaderBadges();
    this.navigateTo('home');
  }

  bindEvents() {
    // Bottom navigation buttons
    document.querySelectorAll('[data-nav-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-nav-target');
        this.navigateTo(target);
        sounds.pop();
      });
    });

    // Parent Corner button in header
    const parentCornerBtn = document.getElementById('btn-parent-corner');
    if (parentCornerBtn) {
      parentCornerBtn.addEventListener('click', () => {
        sounds.pop();
        this.openParentGate();
      });
    }

    // Audio Mute toggle
    const muteBtn = document.getElementById('btn-toggle-sound');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = sounds.toggleMute();
        muteBtn.innerHTML = isMuted 
          ? '<i data-lucide="volume-x" class="w-4 h-4 text-slate-400"></i>' 
          : '<i data-lucide="volume-2" class="w-4 h-4 text-teal-600"></i>';
        if (window.lucide) lucide.createIcons();
      });
    }

    // Device frame mode toggle (Mobile Shell vs Expanded View)
    const frameToggleBtn = document.getElementById('btn-toggle-frame');
    if (frameToggleBtn) {
      frameToggleBtn.addEventListener('click', () => {
        sounds.pop();
        const shell = document.getElementById('mobile-frame');
        shell.classList.toggle('expanded-mode');
        const isExpanded = shell.classList.contains('expanded-mode');
        frameToggleBtn.innerHTML = isExpanded 
          ? '<i data-lucide="smartphone" class="w-3.5 h-3.5"></i> Phone View'
          : '<i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> Expanded View';
        if (window.lucide) lucide.createIcons();
      });
    }

    // Modal close buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.pop();
        this.closeAllModals();
      });
    });

    // Category filter chips in Discover
    document.getElementById('discover-category-filters')?.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-category-id]');
      if (!chip) return;
      sounds.pop();
      this.selectedCategory = chip.getAttribute('data-category-id');
      this.updateDiscoverCategoryChips();
      this.renderDiscoverGallery();
    });

    // Search input in Discover
    const searchInput = document.getElementById('discover-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        const clearBtn = document.getElementById('btn-clear-search');
        if (clearBtn) clearBtn.classList.toggle('hidden', !this.searchQuery);
        this.renderDiscoverGallery();
      });
    }

    const clearSearchBtn = document.getElementById('btn-clear-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        this.renderDiscoverGallery();
      });
    }

    // Create Screen Form Submissions
    this.bindCreateForm();

    // Parent Gate Verification
    this.bindParentGate();

    // AI Creativity Coach Open Buttons
    document.querySelectorAll('[data-open-ai-coach]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-coach-category') || null;
        this.openAICoach(cat);
      });
    });

    // AI Coach Settings
    document.getElementById('btn-open-ai-settings')?.addEventListener('click', () => {
      this.openAISettings();
    });
  }

  updateHeaderBadges() {
    const pendingCountBadge = document.getElementById('parent-pending-count');
    const pendingNum = this.pendingSubmissions.filter(p => p.status === 'pending').length;
    if (pendingCountBadge) {
      pendingCountBadge.textContent = pendingNum;
      pendingCountBadge.classList.toggle('hidden', pendingNum === 0);
    }
  }

  navigateTo(screenId) {
    this.currentScreen = screenId;

    // Update screen visibility
    document.querySelectorAll('.app-screen').forEach(scr => {
      scr.classList.add('hidden');
      scr.classList.remove('screen-fade');
    });

    const activeScreen = document.getElementById(`screen-${screenId}`);
    if (activeScreen) {
      activeScreen.classList.remove('hidden');
      activeScreen.classList.add('screen-fade');
    }

    // Update bottom nav highlighting
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const target = item.getAttribute('data-nav-target');
      if (target === screenId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Render screen specific content
    this.renderCurrentScreen();

    // Scroll container to top
    const mainContainer = document.getElementById('app-scroll-container');
    if (mainContainer) mainContainer.scrollTop = 0;

    // Refresh icons
    if (window.lucide) lucide.createIcons();
  }

  renderCurrentScreen() {
    switch (this.currentScreen) {
      case 'home':
        this.renderHomeScreen();
        break;
      case 'discover':
        this.renderDiscoverScreen();
        break;
      case 'create':
        this.renderCreateScreen();
        break;
      case 'growth':
        this.renderGrowthScreen();
        break;
      case 'parent':
        this.renderParentScreen();
        break;
    }
  }

  // ==========================================
  // SCREEN 1: HOME
  // ==========================================
  renderHomeScreen() {
    // Render the 6 Large Illustrated Category Cards
    const container = document.getElementById('home-six-categories');
    if (container) {
      container.innerHTML = this.categories.map(cat => `
        <div 
          onclick="app.selectCategoryAndDiscover('${cat.id}')"
          class="category-hero-card p-4 border ${cat.badgeColor} card-kids cursor-pointer bubbly-btn flex flex-col justify-between"
        >
          <!-- Top Row: Icon & Tag -->
          <div class="flex items-start justify-between">
            <div class="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl">
              ${cat.emoji}
            </div>
            <span class="px-2.5 py-1 rounded-full text-[11px] font-fredoka font-semibold bg-white/80 text-slate-700 shadow-2xs">
              Explore →
            </span>
          </div>

          <!-- Middle: Title & Description -->
          <div class="my-2.5">
            <h4 class="font-fredoka font-bold text-base text-slate-900 leading-tight">
              ${cat.name} ${cat.emoji}
            </h4>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">
              ${cat.description}
            </p>
          </div>

          <!-- Bottom: Action prompt -->
          <div class="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-fredoka text-slate-700">
            <span class="text-teal-700 font-bold">Open ${cat.shortName} gallery</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-teal-700"></i>
          </div>
        </div>
      `).join('');
    }

    // Render Featured sample creations
    const featuredList = this.creations.filter(c => c.status === 'approved').slice(0, 4);
    const featuredContainer = document.getElementById('home-featured-list');
    if (featuredContainer) {
      featuredContainer.innerHTML = featuredList.map(item => this.createCardHTML(item)).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  selectCategoryAndDiscover(catId) {
    this.selectedCategory = catId;
    this.navigateTo('discover');
    this.updateDiscoverCategoryChips();
    this.renderDiscoverGallery();
  }

  // ==========================================
  // SCREEN 2: DISCOVER
  // ==========================================
  renderDiscoverScreen() {
    this.renderDiscoverCategoryChips();
    this.renderDiscoverGallery();
  }

  renderDiscoverCategoryChips() {
    const container = document.getElementById('discover-category-filters');
    if (!container) return;

    const chips = [
      { id: 'all', name: 'All Talents', emoji: '✨' },
      ...this.categories
    ];

    container.innerHTML = chips.map(chip => {
      const isSelected = this.selectedCategory === chip.id;
      return `
        <button 
          data-category-id="${chip.id}"
          class="shrink-0 px-3.5 py-2 rounded-full font-fredoka text-xs font-medium border bubbly-btn transition-all flex items-center gap-1.5 ${
            isSelected 
              ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-200' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }"
        >
          <span>${chip.emoji || '✨'}</span>
          <span>${chip.name || chip.shortName}</span>
        </button>
      `;
    }).join('');
  }

  updateDiscoverCategoryChips() {
    const container = document.getElementById('discover-category-filters');
    if (!container) return;
    container.querySelectorAll('[data-category-id]').forEach(btn => {
      const catId = btn.getAttribute('data-category-id');
      const isSelected = this.selectedCategory === catId;
      if (isSelected) {
        btn.className = "shrink-0 px-3.5 py-2 rounded-full font-fredoka text-xs font-medium border bubbly-btn transition-all flex items-center gap-1.5 bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-200";
      } else {
        btn.className = "shrink-0 px-3.5 py-2 rounded-full font-fredoka text-xs font-medium border bubbly-btn transition-all flex items-center gap-1.5 bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
      }
    });
  }

  renderDiscoverGallery() {
    const gallery = document.getElementById('discover-gallery');
    const countEl = document.getElementById('discover-count-badge');
    const emptyState = document.getElementById('discover-empty-state');
    if (!gallery) return;

    let filtered = this.creations.filter(c => c.status === 'approved');

    // Filter by Category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === this.selectedCategory);
    }

    // Filter by Search Query
    if (this.searchQuery) {
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(this.searchQuery) ||
        c.description.toLowerCase().includes(this.searchQuery) ||
        c.childName.toLowerCase().includes(this.searchQuery) ||
        (c.learningTakeaway && c.learningTakeaway.toLowerCase().includes(this.searchQuery))
      );
    }

    if (countEl) {
      countEl.textContent = `${filtered.length} approved sample creations`;
    }

    if (filtered.length === 0) {
      gallery.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      gallery.innerHTML = filtered.map(item => this.createCardHTML(item)).join('');
    }

    if (window.lucide) lucide.createIcons();
  }

  createCardHTML(item) {
    const cat = this.categories.find(c => c.id === item.category) || {
      name: item.category,
      badgeColor: 'bg-teal-50 text-teal-700',
      emoji: '✨'
    };

    return `
      <div 
        class="bg-white rounded-3xl border border-slate-100 overflow-hidden card-kids flex flex-col group transition-all"
      >
        <!-- Card Artwork Banner -->
        <div 
          onclick="app.openCreationModal('${item.id}')"
          class="h-38 w-full ${item.thumbnailBg || 'bg-gradient-to-br from-teal-400 to-sky-500'} relative p-4 flex flex-col justify-between overflow-hidden cursor-pointer"
        >
          <!-- Background Circles -->
          <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/20 blur-xs pointer-events-none"></div>
          
          <!-- Top Row: Category Pill & Approved Tag -->
          <div class="flex items-center justify-between relative z-10">
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-fredoka font-semibold bg-white/95 text-slate-800 shadow-xs">
              <span>${cat.emoji}</span>
              <span>${cat.name}</span>
            </span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-fredoka font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-2xs">
              <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> Approved Sample
            </span>
          </div>

          <!-- Center Illustration -->
          <div class="flex items-center justify-center py-1 text-4xl animate-gentle-float">
            ${item.illustrationEmoji || '🎨 ✨'}
          </div>

          <!-- Bottom Row: Learning format & duration -->
          <div class="flex items-center justify-between text-white text-xs font-medium relative z-10">
            <span class="bg-slate-900/40 px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1 text-[11px]">
              <i data-lucide="sparkles" class="w-3 h-3 text-amber-300"></i>
              <span>${item.duration || '1m 30s'}</span>
            </span>
            <span class="text-xs bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs font-fredoka">
              Tap to Learn
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div onclick="app.openCreationModal('${item.id}')" class="cursor-pointer">
            <h3 class="font-fredoka font-bold text-base text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-1">
              ${item.title}
            </h3>
            <p class="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              ${item.description}
            </p>
          </div>

          <!-- Preset Encouragement Action & Creator Info -->
          <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full ${item.avatarBg || 'bg-amber-100'} flex items-center justify-center text-sm shadow-xs">
                ${item.avatar || '⭐'}
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800 leading-none">${item.childName}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">Sample Creator</p>
              </div>
            </div>

            <!-- Preset Encouragement Button (No popularity ranking!) -->
            <button 
              onclick="event.stopPropagation(); app.quickEncourage('${item.id}');"
              class="px-2.5 py-1.5 rounded-full text-xs font-fredoka font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 bubbly-btn flex items-center gap-1 shadow-2xs"
              title="Send friendly affirmation"
            >
              <span>🌟</span>
              <span>Celebrate Creativity!</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Quick Preset Encouragement from Card
  quickEncourage(creationId) {
    sounds.sparkle();
    const item = this.creations.find(c => c.id === creationId);
    if (item) {
      item.encouragementCount = (item.encouragementCount || 0) + 1;
      item.latestEncouragement = "Celebrate Creativity! 🌟";
      this.saveState();
      this.showToast(`💖 Celebrated creativity on "${item.title}"!`);
      this.renderDiscoverGallery();
    }
  }

  // ==========================================
  // SCREEN 3: CREATE (TALENT STUDIO)
  // ==========================================
  renderCreateScreen() {
    this.renderCreateCategoryPicker();
  }

  renderCreateCategoryPicker() {
    const container = document.getElementById('create-category-picker');
    if (!container) return;

    container.innerHTML = this.categories.map(cat => {
      const isSelected = cat.id === 'singing';
      return `
        <label class="cursor-pointer">
          <input 
            type="radio" 
            name="create-category" 
            value="${cat.id}" 
            ${isSelected ? 'checked' : ''} 
            class="peer sr-only"
            onchange="sounds.pop()"
          />
          <div class="p-3 rounded-2xl border border-slate-200 bg-white peer-checked:border-teal-500 peer-checked:bg-teal-50/60 peer-checked:ring-2 peer-checked:ring-teal-400/40 transition-all flex flex-col items-center text-center bubbly-btn">
            <span class="text-2xl mb-1">${cat.emoji}</span>
            <span class="text-xs font-fredoka font-semibold text-slate-800 leading-tight">${cat.name}</span>
          </div>
        </label>
      `;
    }).join('');
  }

  fillExampleCreateForm() {
    sounds.sparkle();
    const titleInput = document.getElementById('create-title-input');
    const descInput = document.getElementById('create-desc-input');
    const takeawayInput = document.getElementById('create-takeaway-input');

    if (titleInput) titleInput.value = "The Friendly Bumblebee Song";
    if (descInput) descInput.value = "I composed a cheerful 30-second melody with funny buzzing sounds to show how bumblebees help pollinate garden flowers!";
    if (takeawayInput) takeawayInput.value = "Practicing joyful singing, rhythm timing, and nature appreciation.";
    this.showToast("💡 Sample project details filled!");
  }

  bindCreateForm() {
    const form = document.getElementById('create-project-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('create-title-input').value.trim();
      const desc = document.getElementById('create-desc-input').value.trim();
      const takeaway = document.getElementById('create-takeaway-input').value.trim();
      const category = form.querySelector('input[name="create-category"]:checked')?.value || 'singing';

      // Validation with accessible visual error banner
      const errorContainer = document.getElementById('create-validation-msg');
      const errorText = document.getElementById('create-validation-text');
      if (!title) {
        if (errorContainer && errorText) {
          errorText.textContent = 'Please enter a title for your project! 🌟';
          errorContainer.classList.remove('hidden');
        } else {
          alert('Please enter a title for your project! 🌟');
        }
        document.getElementById('create-title-input')?.focus();
        return;
      }
      if (!desc) {
        if (errorContainer && errorText) {
          errorText.textContent = 'Please describe your creation so friends can learn what you made! 🎨';
          errorContainer.classList.remove('hidden');
        } else {
          alert('Please describe your creation! 🎨');
        }
        document.getElementById('create-desc-input')?.focus();
        return;
      }

      if (errorContainer) errorContainer.classList.add('hidden');

      const catObj = this.categories.find(c => c.id === category) || this.categories[0];

      // New pending creation object
      const newCreation = {
        id: `proj-pending-${Date.now()}`,
        title: title,
        category: category,
        childName: "Maya (You)",
        childAge: 8,
        avatar: "🎨",
        avatarBg: "bg-purple-100 text-purple-700",
        thumbnailBg: "bg-gradient-to-br from-teal-400 via-sky-400 to-indigo-500",
        illustrationEmoji: `${catObj.emoji} ✨`,
        description: desc,
        learningTakeaway: takeaway || "Demonstrates positive creative effort and dedication.",
        materials: "Voice, imagination, and creative practice",
        submittedAt: "Just now",
        status: "pending",
        encouragementCount: 0,
        latestEncouragement: "Under Review ⏳",
        safetyFlags: {
          childFriendly: true,
          noPersonalData: true,
          educationalValue: true
        },
        parentNote: ""
      };

      // Add to pending review queue
      this.pendingSubmissions.unshift(newCreation);
      this.saveState();

      // Trigger celebration & fanfare
      sounds.celebrate();
      this.fireConfetti();

      // Reset form
      form.reset();

      // Show celebratory modal
      this.showSubmissionSuccessModal(newCreation);
    });
  }

  showSubmissionSuccessModal(item) {
    const modal = document.getElementById('submission-success-modal');
    const titleEl = document.getElementById('success-modal-title');
    if (titleEl) titleEl.textContent = `"${item.title}"`;
    if (modal) modal.classList.remove('hidden');
  }

  fireConfetti() {
    if (window.confetti) {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }

  // ==========================================
  // SCREEN 4: MY GROWTH
  // ==========================================
  renderGrowthScreen() {
    this.renderGrowthCreations();
    this.renderGrowthBadges();
    this.renderGrowthCheers();
  }

  setGrowthTab(tabId) {
    sounds.pop();
    document.querySelectorAll('[data-growth-tab]').forEach(btn => {
      const isSelected = btn.getAttribute('data-growth-tab') === tabId;
      btn.className = isSelected
        ? 'flex-1 py-2.5 rounded-xl text-xs font-fredoka font-semibold bg-teal-600 text-white shadow-xs bubbly-btn'
        : 'flex-1 py-2.5 rounded-xl text-xs font-fredoka font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 bubbly-btn';
    });

    document.getElementById('growth-panel-creations')?.classList.toggle('hidden', tabId !== 'creations');
    document.getElementById('growth-panel-badges')?.classList.toggle('hidden', tabId !== 'badges');
    document.getElementById('growth-panel-cheers')?.classList.toggle('hidden', tabId !== 'cheers');
  }

  renderGrowthCreations() {
    const container = document.getElementById('growth-creations-list');
    if (!container) return;

    // Filter Maya's sample projects
    const myApproved = this.creations.filter(c => c.childName.includes("Maya"));
    const myPending = this.pendingSubmissions.filter(c => c.childName.includes("Maya"));
    const myRejected = this.rejectedSubmissions.filter(c => c.childName.includes("Maya"));
    const allMyItems = [...myPending, ...myApproved, ...myRejected];

    if (allMyItems.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 p-4 bg-white rounded-3xl border border-slate-100">
          <span class="text-4xl block mb-2">🌱</span>
          <p class="font-fredoka text-slate-700 font-bold">No sample creations yet!</p>
          <p class="text-xs text-slate-400 mt-1">Tap the Create button below to share your first talent.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = allMyItems.map(item => {
      let statusBadge = '';
      if (item.status === 'approved') {
        statusBadge = `
          <span class="px-2.5 py-1 rounded-full text-[11px] font-fredoka font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-2xs">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i> Approved & Live in Showcase 🌟
          </span>
        `;
      } else if (item.status === 'pending') {
        statusBadge = `
          <span class="px-2.5 py-1 rounded-full text-[11px] font-fredoka font-semibold bg-amber-100 text-amber-800 flex items-center gap-1 shadow-2xs">
            <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-600"></i> Under Parent Review ⏳
          </span>
        `;
      } else if (item.status === 'needs_polish' || item.status === 'rejected') {
        statusBadge = `
          <span class="px-2.5 py-1 rounded-full text-[11px] font-fredoka font-semibold bg-purple-100 text-purple-800 flex items-center gap-1 shadow-2xs">
            <i data-lucide="edit-3" class="w-3.5 h-3.5 text-purple-600"></i> Revision Requested ✏️
          </span>
        `;
      }

      return `
        <div class="bg-white p-4 rounded-3xl border border-slate-100 card-kids flex flex-col gap-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl ${item.thumbnailBg || 'bg-teal-500'} flex items-center justify-center text-2xl shadow-xs shrink-0">
                ${item.illustrationEmoji || '🎨'}
              </div>
              <div>
                <h4 class="font-fredoka font-bold text-sm text-slate-900 leading-tight">${item.title}</h4>
                <p class="text-[11px] text-slate-400 mt-0.5">Submitted ${item.submittedAt}</p>
              </div>
            </div>
            ${statusBadge}
          </div>

          <p class="text-xs text-slate-600 leading-relaxed">${item.description}</p>

          ${item.parentNote ? `
            <div class="bg-purple-50 p-2.5 rounded-xl border border-purple-100 text-xs text-purple-900 flex items-start gap-2">
              <span class="text-base">💬</span>
              <div>
                <span class="font-bold">Guardian Feedback:</span> ${item.parentNote}
              </div>
            </div>
          ` : ''}

          <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span class="font-fredoka text-amber-700">💖 ${item.encouragementCount || 0} Encouragements Received</span>
            <button 
              onclick="app.openCreationModal('${item.id}')"
              class="text-teal-600 font-bold hover:underline flex items-center gap-1"
            >
              View Card <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  renderGrowthBadges() {
    const container = document.getElementById('growth-badges-grid');
    if (!container) return;

    container.innerHTML = this.badges.map(b => `
      <div class="p-3.5 rounded-2xl border ${b.earned ? b.badgeBg : 'bg-slate-50 border-slate-200 opacity-60'} flex flex-col items-center text-center">
        <span class="text-[10px] font-fredoka font-bold uppercase tracking-wider text-slate-400 mb-1">${b.pillar}</span>
        <div class="w-12 h-12 rounded-full ${b.earned ? 'bg-gradient-to-br ' + b.color : 'bg-slate-200'} flex items-center justify-center text-2xl shadow-xs mb-2">
          ${b.icon}
        </div>
        <h5 class="font-fredoka font-bold text-xs text-slate-900 leading-tight">${b.name}</h5>
        <p class="text-[10px] text-slate-600 mt-1 leading-tight">${b.description}</p>
        <span class="mt-2 text-[10px] font-fredoka font-bold px-2 py-0.5 rounded-full ${b.earned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
          ${b.progressNote}
        </span>
      </div>
    `).join('');
  }

  renderGrowthCheers() {
    const container = document.getElementById('growth-cheers-list');
    if (!container) return;

    container.innerHTML = this.growthCheers.map(ch => `
      <div class="p-3 rounded-2xl bg-white border border-slate-100 flex items-start gap-3 shadow-xs">
        <span class="text-2xl p-1 bg-amber-50 rounded-xl">${ch.emoji}</span>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h6 class="font-fredoka font-bold text-xs text-slate-800">${ch.from}</h6>
            <span class="text-[10px] text-slate-400">${ch.time}</span>
          </div>
          <p class="text-xs text-slate-700 mt-0.5 leading-relaxed font-medium">Sent affirmation: <strong class="text-amber-800">${ch.text}</strong> on <em>${ch.project}</em></p>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // SCREEN 5: PARENT CORNER (GUARDIAN HUB)
  // ==========================================
  openParentGate() {
    this.mathNum1 = Math.floor(Math.random() * 8) + 4;
    this.mathNum2 = Math.floor(Math.random() * 7) + 3;
    this.mathAnswer = this.mathNum1 + this.mathNum2;

    const mathQuestionEl = document.getElementById('parent-gate-question');
    if (mathQuestionEl) {
      mathQuestionEl.textContent = `What is ${this.mathNum1} + ${this.mathNum2}?`;
    }

    const input = document.getElementById('parent-gate-input');
    if (input) input.value = '';

    const errorEl = document.getElementById('parent-gate-error');
    if (errorEl) errorEl.classList.add('hidden');

    const modal = document.getElementById('parent-gate-modal');
    if (modal) modal.classList.remove('hidden');
  }

  bindParentGate() {
    const submitBtn = document.getElementById('btn-verify-parent-gate');
    const bypassBtn = document.getElementById('btn-bypass-parent-gate');
    const input = document.getElementById('parent-gate-input');
    const errorEl = document.getElementById('parent-gate-error');

    const verify = () => {
      const val = parseInt(input?.value.trim(), 10);
      if (val === this.mathAnswer) {
        sounds.sparkle();
        this.parentAuthenticated = true;
        this.closeAllModals();
        this.navigateTo('parent');
      } else {
        sounds.gentleDismiss();
        if (errorEl) errorEl.classList.remove('hidden');
      }
    };

    if (submitBtn) submitBtn.addEventListener('click', verify);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') verify();
      });
    }

    if (bypassBtn) {
      bypassBtn.addEventListener('click', () => {
        sounds.sparkle();
        this.parentAuthenticated = true;
        this.closeAllModals();
        this.navigateTo('parent');
      });
    }
  }

  renderParentScreen() {
    this.renderParentPendingList();
    this.renderParentApprovedList();
  }

  setParentTab(tabId) {
    sounds.pop();
    document.querySelectorAll('[data-parent-tab]').forEach(btn => {
      const isSelected = btn.getAttribute('data-parent-tab') === tabId;
      btn.className = isSelected
        ? 'flex-1 py-2.5 rounded-xl text-xs font-fredoka font-semibold bg-purple-700 text-white shadow-xs bubbly-btn'
        : 'flex-1 py-2.5 rounded-xl text-xs font-fredoka font-semibold bg-purple-100 text-purple-900 hover:bg-purple-200 bubbly-btn';
    });

    document.getElementById('parent-panel-pending')?.classList.toggle('hidden', tabId !== 'pending');
    document.getElementById('parent-panel-approved')?.classList.toggle('hidden', tabId !== 'approved');
    document.getElementById('parent-panel-safety')?.classList.toggle('hidden', tabId !== 'safety');
  }

  renderParentPendingList() {
    const container = document.getElementById('parent-pending-queue');
    const badgeEl = document.getElementById('parent-pending-tab-badge');
    if (!container) return;

    const pendingItems = this.pendingSubmissions.filter(p => p.status === 'pending');
    if (badgeEl) badgeEl.textContent = pendingItems.length;

    if (pendingItems.length === 0) {
      container.innerHTML = `
        <div class="text-center py-10 bg-white rounded-3xl border border-slate-100 p-6">
          <span class="text-4xl block mb-2">🎉</span>
          <h4 class="font-fredoka text-slate-800 font-bold text-base">No Pending Submissions</h4>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            All submitted projects have been reviewed. You can test submitting a new project in the Create tab!
          </p>
          <button 
            onclick="app.navigateTo('create'); sounds.pop();"
            class="mt-4 px-4 py-2 rounded-full bg-teal-600 text-white font-fredoka text-xs font-semibold bubbly-btn"
          >
            Create a New Test Project 🚀
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = pendingItems.map(item => `
      <div class="bg-white rounded-3xl border-2 border-purple-100 p-4 shadow-sm flex flex-col gap-3.5">
        <!-- Submitter Info -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full ${item.avatarBg || 'bg-purple-100'} flex items-center justify-center text-lg shadow-xs">
              ${item.avatar || '👧'}
            </div>
            <div>
              <p class="font-fredoka font-bold text-xs text-slate-900 leading-tight">${item.childName} (Age ${item.childAge})</p>
              <p class="text-[10px] text-slate-400 mt-0.5">Submitted: ${item.submittedAt}</p>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-fredoka font-bold bg-amber-100 text-amber-800">
            Pending Approval ⏳
          </span>
        </div>

        <!-- Project Banner Preview -->
        <div class="h-28 rounded-2xl ${item.thumbnailBg || 'bg-amber-400'} flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
          <span>${item.illustrationEmoji || '🎨'}</span>
          <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/50 text-[10px] text-white font-medium">
            Category: ${item.category.toUpperCase()}
          </div>
        </div>

        <!-- Title & Content -->
        <div>
          <h4 class="font-fredoka font-bold text-base text-slate-900">${item.title}</h4>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            "${item.description}"
          </p>
          ${item.learningTakeaway ? `
            <p class="text-[11px] text-teal-800 font-medium mt-2 bg-teal-50/70 p-2 rounded-lg border border-teal-100">
              💡 <strong>Takeaway:</strong> ${item.learningTakeaway}
            </p>
          ` : ''}
        </div>

        <!-- Safety Pre-checks -->
        <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
          <div class="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-600"></i> No personal addresses or contact numbers detected
          </div>
          <div class="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i> Age-appropriate and positive learning tone
          </div>
        </div>

        <!-- Guardian Action Buttons: Approve and Reject -->
        <div class="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <button 
            onclick="app.approveSubmission('${item.id}')"
            class="flex-1 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-fredoka font-bold text-xs bubbly-btn flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-200"
          >
            <i data-lucide="check-circle" class="w-4 h-4"></i> Approve & Publish to Showcase 🌟
          </button>
          
          <button 
            onclick="app.rejectSubmission('${item.id}')"
            class="py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-fredoka font-semibold text-xs bubbly-btn flex items-center justify-center gap-1.5 border border-rose-200"
          >
            <i data-lucide="x-circle" class="w-4 h-4"></i> Reject / Decline ❌
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  approveSubmission(itemId) {
    const idx = this.pendingSubmissions.findIndex(p => p.id === itemId);
    if (idx === -1) return;

    const item = this.pendingSubmissions[idx];
    item.status = 'approved';
    item.approvedAt = 'Just now';

    // Remove from pending queue
    this.pendingSubmissions.splice(idx, 1);

    // Prepend to live creations showcase
    this.creations.unshift(item);

    this.saveState();
    sounds.celebrate();
    this.fireConfetti();

    this.showToast(`🎉 Approved "${item.title}"! It is now live in the Discover showcase.`);
    this.renderParentScreen();
  }

  rejectSubmission(itemId) {
    const idx = this.pendingSubmissions.findIndex(p => p.id === itemId);
    if (idx === -1) return;

    const item = this.pendingSubmissions[idx];
    item.status = 'rejected';
    item.parentNote = "Thank you for sharing! Please review the project details with a guardian to add more steps before republishing.";

    // Remove from pending queue & archive in rejectedSubmissions
    this.pendingSubmissions.splice(idx, 1);
    this.rejectedSubmissions.unshift(item);

    this.saveState();
    sounds.gentleDismiss();
    this.showToast(`Decline recorded for "${item.title}". Item will not appear in the public showcase.`);
    this.renderParentScreen();
  }

  renderParentApprovedList() {
    const container = document.getElementById('parent-approved-list');
    if (!container) return;

    container.innerHTML = this.creations.map(c => `
      <div class="p-3 bg-white rounded-2xl border border-slate-100 flex items-center justify-between gap-3 shadow-xs">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="text-2xl">${c.illustrationEmoji?.split(' ')[0] || '🌟'}</span>
          <div class="truncate">
            <h5 class="font-fredoka font-bold text-xs text-slate-800 truncate">${c.title}</h5>
            <p class="text-[10px] text-slate-400">By ${c.childName} • ${c.encouragementCount || 0} Encouragements</p>
          </div>
        </div>
        <button 
          onclick="app.revokeShowcaseItem('${c.id}')"
          class="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-fredoka font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 bubbly-btn"
        >
          Revoke
        </button>
      </div>
    `).join('');
  }

  revokeShowcaseItem(itemId) {
    if (!confirm("Move this item back to the pending review queue?")) return;
    const idx = this.creations.findIndex(c => c.id === itemId);
    if (idx !== -1) {
      const item = this.creations[idx];
      item.status = 'pending';
      this.creations.splice(idx, 1);
      this.pendingSubmissions.unshift(item);
      this.saveState();
      sounds.gentleDismiss();
      this.showToast("Item returned to pending queue.");
      this.renderParentScreen();
    }
  }

  // ==========================================
  // CREATION DETAIL & LEARNING MODAL
  // ==========================================
  openCreationModal(creationId) {
    sounds.pop();
    const item = this.creations.find(c => c.id === creationId) || 
                 this.pendingSubmissions.find(p => p.id === creationId);
    if (!item) return;

    this.activeCreation = item;
    const modal = document.getElementById('creation-detail-modal');
    if (!modal) return;

    // Populate Modal Content
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-creator-name').textContent = `${item.childName} (Age ${item.childAge})`;
    document.getElementById('modal-creator-avatar').textContent = item.avatar || '⭐';
    document.getElementById('modal-desc').textContent = item.description;
    document.getElementById('modal-takeaway').textContent = item.learningTakeaway || "Practicing positive creativity and sharing with friends.";
    document.getElementById('modal-materials').textContent = item.materials || "Imagination, voice, paper, colors";

    // Thumbnail banner
    const banner = document.getElementById('modal-banner');
    if (banner) {
      banner.className = `h-44 w-full ${item.thumbnailBg || 'bg-gradient-to-br from-teal-400 to-sky-500'} rounded-3xl relative flex flex-col items-center justify-center p-4 text-white overflow-hidden shadow-inner`;
      banner.innerHTML = `
        <div class="text-6xl animate-gentle-float mb-2">${item.illustrationEmoji || '🎨'}</div>
        <div class="flex items-center gap-2 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold">
          <i data-lucide="play" class="w-3.5 h-3.5 fill-white"></i> Simulated Child-Safe Playback
        </div>
      `;
    }

    // Community affirmation pill
    const countEl = document.getElementById('modal-encouragement-count');
    if (countEl) {
      countEl.textContent = `${item.encouragementCount || 1} friends have encouraged this project!`;
    }

    // Reset player simulator
    this.resetPlayerSimulator();

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  sendPresetEncouragement(text, emoji) {
    if (!this.activeCreation) return;
    sounds.sparkle();
    this.fireConfetti();

    this.activeCreation.encouragementCount = (this.activeCreation.encouragementCount || 0) + 1;
    this.activeCreation.latestEncouragement = `“${text}” ${emoji}`;

    // Add to Maya's growth cheers
    this.growthCheers.unshift({
      from: "Maya (You)",
      text: `“${text}”`,
      emoji: emoji,
      project: this.activeCreation.title,
      time: "Just now"
    });

    this.saveState();

    const countEl = document.getElementById('modal-encouragement-count');
    if (countEl) {
      countEl.textContent = `${this.activeCreation.encouragementCount} friends have encouraged this project!`;
    }

    this.showToast(`💖 Sent encouragement: “${text}” ${emoji}`);
  }

  resetPlayerSimulator() {
    this.isPlaying = false;
    clearInterval(this.playInterval);
    const playBtn = document.getElementById('btn-modal-play');
    if (playBtn) playBtn.innerHTML = '<i data-lucide="play" class="w-5 h-5 fill-white"></i>';
    const scrubber = document.getElementById('modal-player-progress');
    if (scrubber) scrubber.style.width = '0%';
  }

  togglePlaybackSimulator() {
    this.isPlaying = !this.isPlaying;
    const playBtn = document.getElementById('btn-modal-play');
    const visualizer = document.getElementById('modal-visualizer');

    if (this.isPlaying) {
      sounds.pop();
      if (playBtn) playBtn.innerHTML = '<i data-lucide="pause" class="w-5 h-5 fill-white"></i>';
      if (visualizer) visualizer.classList.remove('opacity-20');

      let percent = 0;
      this.playInterval = setInterval(() => {
        percent += 2;
        const scrubber = document.getElementById('modal-player-progress');
        if (scrubber) scrubber.style.width = `${percent}%`;

        if (percent >= 100) {
          this.resetPlayerSimulator();
        }
      }, 100);
    } else {
      sounds.pop();
      this.resetPlayerSimulator();
      if (visualizer) visualizer.classList.add('opacity-20');
    }
    if (window.lucide) lucide.createIcons();
  }

  // ==========================================
  // AI CREATIVITY COACH CONTROLLERS
  // ==========================================
  openAICoach(category = null) {
    sounds.pop();
    this.coachCategory = category || this.coachCategory || 'singing';
    this.coachActiveTab = 'activities'; // 'activities' or 'ideas'

    const modal = document.getElementById('ai-coach-modal');
    if (!modal) return;

    // Render Category Chips
    this.renderCoachCategoryChips();
    // Render Goal Chips
    this.renderCoachGoalChips();
    // Update Mode Status Badge
    this.updateCoachModeBadge();
    // Generate Suggestions
    this.triggerCoachGeneration();

    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
  }

  updateCoachModeBadge() {
    const badge = document.getElementById('ai-coach-mode-badge');
    if (!badge) return;

    if (window.aiCoach && aiCoach.hasApiKey()) {
      badge.className = "px-2.5 py-1 rounded-full text-[11px] font-fredoka font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1 shadow-2xs";
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Gemini AI Connected`;
    } else {
      badge.className = "px-2.5 py-1 rounded-full text-[11px] font-fredoka font-semibold bg-amber-100 text-amber-900 flex items-center gap-1 shadow-2xs";
      badge.innerHTML = `<span>✨</span> Demo Mode (Curated Engine)`;
    }
  }

  renderCoachCategoryChips() {
    const container = document.getElementById('ai-coach-categories');
    if (!container) return;

    container.innerHTML = this.categories.map(cat => {
      const isSelected = this.coachCategory === cat.id;
      return `
        <button 
          onclick="app.selectCoachCategory('${cat.id}')"
          class="shrink-0 px-3 py-1.5 rounded-full font-fredoka text-xs font-medium border bubbly-btn transition-all flex items-center gap-1.5 ${
            isSelected 
              ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-200' 
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }"
        >
          <span>${cat.emoji}</span>
          <span>${cat.name}</span>
        </button>
      `;
    }).join('');
  }

  selectCoachCategory(catId) {
    sounds.pop();
    this.coachCategory = catId;
    this.coachGoal = null; // reset to default for new category
    this.renderCoachCategoryChips();
    this.renderCoachGoalChips();
    this.triggerCoachGeneration();
  }

  renderCoachGoalChips() {
    const container = document.getElementById('ai-coach-goals');
    if (!container) return;

    const catKnowledge = DEMO_COACH_KNOWLEDGE[this.coachCategory] || DEMO_COACH_KNOWLEDGE.singing;
    if (!this.coachGoal) {
      this.coachGoal = catKnowledge.defaultGoal;
    }

    container.innerHTML = catKnowledge.goals.map(goal => {
      const isSelected = this.coachGoal === goal;
      const safeGoalEscaped = goal.replace(/'/g, "\\'");
      return `
        <button 
          onclick="app.selectCoachGoal('${safeGoalEscaped}')"
          class="text-left px-3 py-1.5 rounded-xl font-fredoka text-xs border bubbly-btn transition-all ${
            isSelected
              ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold ring-1 ring-teal-500'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }"
        >
          ${goal}
        </button>
      `;
    }).join('');
  }

  selectCoachGoal(goal) {
    sounds.pop();
    this.coachGoal = goal;
    this.renderCoachGoalChips();
    this.triggerCoachGeneration();
  }

  setCoachTab(tabId) {
    sounds.pop();
    this.coachActiveTab = tabId;
    document.querySelectorAll('[data-coach-tab]').forEach(btn => {
      const isSelected = btn.getAttribute('data-coach-tab') === tabId;
      btn.className = isSelected
        ? 'flex-1 py-2 rounded-xl text-xs font-fredoka font-semibold bg-teal-600 text-white shadow-xs bubbly-btn'
        : 'flex-1 py-2 rounded-xl text-xs font-fredoka font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 bubbly-btn';
    });

    document.getElementById('coach-panel-activities')?.classList.toggle('hidden', tabId !== 'activities');
    document.getElementById('coach-panel-ideas')?.classList.toggle('hidden', tabId !== 'ideas');
  }

  async triggerCoachGeneration() {
    const customPromptInput = document.getElementById('ai-coach-custom-prompt');
    const customQuestion = customPromptInput ? customPromptInput.value.trim() : '';

    const resultsArea = document.getElementById('ai-coach-results-area');
    const loadingArea = document.getElementById('ai-coach-loading');
    const sourceBadge = document.getElementById('ai-coach-source-notice');

    if (window.aiCoach && aiCoach.hasApiKey()) {
      if (loadingArea) loadingArea.classList.remove('hidden');
      if (resultsArea) resultsArea.classList.add('hidden');
    }

    try {
      const response = await aiCoach.generateCoaching(this.coachCategory, this.coachGoal, customQuestion);

      if (loadingArea) loadingArea.classList.add('hidden');
      if (resultsArea) resultsArea.classList.remove('hidden');

      if (sourceBadge) {
        if (response.mode === 'live') {
          sourceBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Powered by Google Gemini AI (Live Request)`;
          sourceBadge.className = "text-[11px] font-fredoka text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5";
        } else if (response.mode === 'fallback') {
          sourceBadge.innerHTML = `⚠️ Gemini API request failed. Displaying curated practice suggestions.`;
          sourceBadge.className = "text-[11px] font-fredoka text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-flex items-center gap-1.5";
        } else {
          sourceBadge.innerHTML = `✨ Curated Demo Engine (Child-Safe Presets)`;
          sourceBadge.className = "text-[11px] font-fredoka text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 inline-flex items-center gap-1.5";
        }
      }

      this.renderCoachResults(response.data);
    } catch (err) {
      if (loadingArea) loadingArea.classList.add('hidden');
      if (resultsArea) resultsArea.classList.remove('hidden');
      this.showToast('Could not reach AI service. Showing curated practice tips.');
    }

    if (window.lucide) lucide.createIcons();
  }

  renderCoachResults(data) {
    if (!data) return;

    // 1. Render Practice Activities Tab
    const goalBanner = document.getElementById('coach-achievable-goal');
    if (goalBanner) {
      goalBanner.textContent = data.achievableGoal || "Practice with patience and creative joy today!";
    }

    const messageBanner = document.getElementById('coach-encouraging-message');
    if (messageBanner) {
      messageBanner.textContent = data.encouragingMessage || "You've got this! Every creative effort makes you shine brighter.";
    }

    const activitiesList = document.getElementById('coach-activities-list');
    if (activitiesList && data.activities) {
      activitiesList.innerHTML = data.activities.map((act, idx) => `
        <div class="p-3.5 rounded-2xl bg-white border border-teal-100 shadow-2xs space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-fredoka font-bold text-xs flex items-center justify-center">
              ${idx + 1}
            </span>
            <h5 class="font-fredoka font-bold text-xs text-slate-900">${act.title}</h5>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed pl-8">${act.step}</p>
          ${act.tip ? `
            <div class="ml-8 mt-1 bg-amber-50/80 p-2 rounded-xl text-[11px] text-amber-900 border border-amber-200/50">
              <strong>💡 Coach Tip:</strong> ${act.tip}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    // 2. Render Project Ideas Tab
    const ideasList = document.getElementById('coach-ideas-list');
    if (ideasList && data.projectIdeas) {
      ideasList.innerHTML = data.projectIdeas.map(idea => {
        const safeTitleEscaped = idea.title.replace(/'/g, "\\'");
        const safeDescEscaped = idea.explanation.replace(/'/g, "\\'");
        return `
          <div class="p-4 rounded-2xl bg-white border border-purple-100 shadow-2xs space-y-2">
            <div>
              <h5 class="font-fredoka font-bold text-sm text-slate-900 leading-tight">${idea.title}</h5>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${idea.explanation}</p>
            </div>
            <div class="bg-teal-50 p-2.5 rounded-xl border border-teal-100 text-[11px] text-teal-900">
              <strong>🚀 First Practical Step:</strong> ${idea.firstStep}
            </div>
            <button 
              onclick="app.startProjectFromCoach('${safeTitleEscaped}', '${safeDescEscaped}', '${this.coachCategory}')"
              class="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-fredoka font-bold text-xs bubbly-btn flex items-center justify-center gap-1.5 shadow-xs shadow-teal-200"
            >
              <span>🚀</span> Start This Project in Studio
            </button>
          </div>
        `;
      }).join('');
    }
  }

  startProjectFromCoach(title, desc, category) {
    sounds.celebrate();
    this.closeAllModals();
    this.navigateTo('create');

    // Pre-fill Create form
    const titleInput = document.getElementById('create-title-input');
    const descInput = document.getElementById('create-desc-input');
    if (titleInput) titleInput.value = title;
    if (descInput) descInput.value = desc;

    // Select category radio
    const radio = document.querySelector(`input[name="create-category"][value="${category}"]`);
    if (radio) radio.checked = true;

    this.showToast(`🚀 Loaded "${title}" into Creative Studio!`);
  }

  openAISettings() {
    sounds.pop();
    const modal = document.getElementById('ai-settings-modal');
    const input = document.getElementById('ai-settings-key-input');
    if (input) input.value = aiCoach.apiKey || '';
    if (modal) modal.classList.remove('hidden');
  }

  saveAISettings() {
    const input = document.getElementById('ai-settings-key-input');
    const key = input ? input.value.trim() : '';
    aiCoach.setApiKey(key);
    sounds.sparkle();
    this.closeAllModals();
    this.updateCoachModeBadge();
    this.showToast(key ? '🟢 Gemini API Key saved! Live AI enabled.' : '✨ Switched to Curated Demo Mode.');
    this.openAICoach();
  }

  clearAISettings() {
    aiCoach.setApiKey('');
    sounds.pop();
    this.closeAllModals();
    this.updateCoachModeBadge();
    this.showToast('✨ Cleared API key. Running in Curated Demo Mode.');
    this.openAICoach();
  }

  closeAllModals() {
    document.querySelectorAll('.app-modal').forEach(m => m.classList.add('hidden'));
    this.resetPlayerSimulator();
  }

  showToast(message) {
    const toast = document.getElementById('app-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2800);
  }
}

// Global App Instance
const app = new KidsMediaApp();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
