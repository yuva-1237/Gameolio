//main.js
const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');
const aboutBtn = document.getElementById('aboutBtn');
const contactBtn = document.getElementById('contactBtn');
const categoriesBtn = document.getElementById('categoriesBtn');
const homeBtn = document.getElementById('homeBtn');
const controlsSection = document.querySelector('.controls');

const gamesData = window.GAMES || [];

function renderGames(games) {
  gamesGrid.innerHTML = '';
  if (!games.length) {
    gamesGrid.innerHTML = `<div class="no-results">No games found. Try a different search or category.</div>`;
    return;
  }
  for (const game of games) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${game.thumb}" class="game-thumb" alt="${game.title}">
      <div class="game-info">
        <div class="game-title">${game.title}</div>
        <div class="game-category">${game.category}</div>
        <button class="play-btn" onclick="window.open('${game.url}', '_blank')">Play Now</button>
      </div>
    `;
    gamesGrid.appendChild(card);
  }
}

function filterGames() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const filtered = gamesData.filter(game => {
    const matchesCategory = (category === 'All') || (game.category === category);
    const matchesSearch = game.title.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
  renderGames(filtered);
}

searchInput.addEventListener('input', filterGames);
categoryFilter.addEventListener('change', filterGames);

function showMain() {
  aboutSection.style.display = 'none';
  contactSection.style.display = 'none';
  gamesGrid.style.display = '';
  controlsSection.style.display = '';
  categoryFilter.style.display = '';
  categoriesBtn.style.display = '';
}

function showAbout() {
  aboutSection.style.display = '';
  contactSection.style.display = 'none';
  gamesGrid.style.display = 'none';
  controlsSection.style.display = '';
  categoryFilter.style.display = 'none';
  categoriesBtn.style.display = 'none';
}

function showContact() {
  aboutSection.style.display = 'none';
  contactSection.style.display = '';
  gamesGrid.style.display = 'none';
  controlsSection.style.display = '';
  categoryFilter.style.display = 'none';
  categoriesBtn.style.display = 'none';
}

aboutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showAbout();
});

contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showContact();
});

categoriesBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showMain();
  categoryFilter.style.display = '';
  categoryFilter.focus();
});

homeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showMain();
});

document.addEventListener('DOMContentLoaded', () => {
  renderGames(gamesData);
});