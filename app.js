// Configuração da API - Auto detecta desenvolvimento vs produção
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://vivacidade-backend.onrender.com/api';

// Estado global
let state = {
  currentPage: 'home',
  currentUser: null,
  currentCity: null,
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  filters: {
    category: null,
    city: null,
    search: null
  }
};

// Funções de navegação
function navigateTo(page) {
  const pages = document.querySelectorAll('[id^="page-"]');
  pages.forEach(p => p.style.display = 'none');
  
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.style.display = 'block';
    state.currentPage = page;
    window.scrollTo(0, 0);
  }

  // Atualizar menu mobile
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && mobileMenu.classList.contains('flex')) {
    toggleMobileMenu();
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu?.classList.toggle('hidden');
}

// Autenticação
async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      state.currentUser = data.user;
      showNotification('Login realizado com sucesso!', 'success');
      navigateTo('home');
      updateAuthUI();
      return true;
    } else {
      showNotification(data.error || 'Erro ao fazer login', 'error');
      return false;
    }
  } catch (err) {
    console.error(err);
    showNotification('Erro ao conectar com o servidor', 'error');
    return false;
  }
}

async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'user' })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      state.currentUser = data.user;
      showNotification('Registro realizado com sucesso!', 'success');
      navigateTo('home');
      updateAuthUI();
      return true;
    } else {
      showNotification(data.error || 'Erro ao registrar', 'error');
      return false;
    }
  } catch (err) {
    console.error(err);
    showNotification('Erro ao conectar com o servidor', 'error');
    return false;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  state.currentUser = null;
  showNotification('Você foi desconectado', 'success');
  navigateTo('home');
  updateAuthUI();
}

// Atualizar UI de autenticação
function updateAuthUI() {
  const user = localStorage.getItem('user');
  const authBtn = document.getElementById('auth-button');
  
  if (user && authBtn) {
    const userData = JSON.parse(user);
    authBtn.innerHTML = `<button onclick="logout()">👤 ${userData.name} (Sair)</button>`;
  }
}

// Favoritos
function toggleFavorite(id, name, city, category, rating) {
  const favorite = {
    id, name, city, category, rating
  };

  const index = state.favorites.findIndex(f => f.id === id);
  
  if (index > -1) {
    state.favorites.splice(index, 1);
    showNotification('Removido dos favoritos', 'info');
  } else {
    state.favorites.push(favorite);
    showNotification('Adicionado aos favoritos!', 'success');
  }

  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  updateFavoritesUI();
}

function updateFavoritesUI() {
  const count = state.favorites.length;
  const countElement = document.getElementById('favorites-count');
  
  if (countElement) {
    if (count > 0) {
      countElement.classList.remove('hidden');
      countElement.textContent = count;
    } else {
      countElement.classList.add('hidden');
    }
  }

  // Atualizar visual dos botões
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (state.favorites.find(f => f.id === id)) {
      btn.innerHTML = '<svg class="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>';
    }
  });
}

// Busca
function performSearch() {
  const searchTerm = document.getElementById('search-input')?.value || '';
  const city = document.getElementById('city-select')?.value || '';
  
  state.filters.search = searchTerm;
  state.filters.city = city;
  
  loadBusinesses();
}

function filterByCategory(category) {
  state.filters.category = category;
  state.filters.city = null;
  loadBusinesses();
}

function selectCity(city) {
  state.currentCity = city;
  state.filters.city = city;
  loadBusinesses();
}

// Carregar empresas
async function loadBusinesses() {
  try {
    let url = `${API_URL}/businesses?`;
    
    if (state.filters.city) url += `city=${state.filters.city}&`;
    if (state.filters.category) url += `category=${state.filters.category}&`;
    if (state.filters.search) url += `search=${state.filters.search}&`;

    const res = await fetch(url);
    const businesses = await res.json();

    displayBusinesses(businesses);
    navigateTo('results');
  } catch (err) {
    console.error(err);
    showNotification('Erro ao carregar empresas', 'error');
  }
}

function displayBusinesses(businesses) {
  const container = document.getElementById('results-container');
  if (!container) return;

  if (businesses.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">Nenhuma empresa encontrada</p>';
    return;
  }

  container.innerHTML = businesses.map(b => `
    <div class="glass-card rounded-2xl overflow-hidden card-hover cursor-pointer" onclick="openListing('${b._id}')">
      <div class="relative h-48 gradient-primary">
        <div class="absolute top-3 right-3">
          <button onclick="event.stopPropagation(); toggleFavorite('${b._id}', '${b.name}', '${b.city}', '${b.category}', ${b.rating})" class="favorite-btn p-2 rounded-full bg-white/90 hover:bg-white transition-all" data-id="${b._id}">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="p-5">
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-bold text-lg text-slate-900">${b.name}</h3>
          <div class="flex items-center gap-1 text-sm">
            <span class="star-filled">★</span>
            <span class="font-semibold text-slate-900">${b.rating.toFixed(1)}</span>
          </div>
        </div>
        <p class="text-slate-500 text-sm mb-3">📍 ${b.city} • ${b.category}</p>
        <p class="text-slate-600 text-sm mb-4">${b.description || 'Descrição não disponível'}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium bg-blue-50 px-3 py-1 rounded-full">${b.plan.toUpperCase()}</span>
          <span class="text-slate-400 text-sm">${b.reviews?.length || 0} avaliações</span>
        </div>
      </div>
    </div>
  `).join('');

  updateFavoritesUI();
}

// Abrir listagem
async function openListing(id) {
  try {
    const res = await fetch(`${API_URL}/businesses/${id}`);
    const business = await res.json();

    const detailContainer = document.getElementById('listing-detail');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto;">
        <button onclick="navigateTo('results')" style="margin-bottom: 20px; padding: 8px 16px; background: #f0f0f0; border: none; border-radius: 6px; cursor: pointer;">← Voltar</button>

        <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div class="relative h-80 gradient-primary">
            <div class="absolute top-6 left-6">
              <span class="featured-badge px-4 py-2 rounded-full text-white font-semibold">${business.plan.toUpperCase()}</span>
            </div>
            <div class="absolute top-6 right-6">
              <button onclick="toggleFavorite('${business._id}', '${business.name}', '${business.city}', '${business.category}', ${business.rating})" class="favorite-btn p-3 rounded-full bg-white hover:bg-slate-100 transition-all" data-id="${business._id}">
                <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div style="padding: 40px;">
            <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 16px;">${business.name}</h1>

            <div style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
              <div>
                <p style="color: #666; font-size: 14px;">Categoria</p>
                <p style="font-weight: 600;">${business.category}</p>
              </div>
              <div>
                <p style="color: #666; font-size: 14px;">Localização</p>
                <p style="font-weight: 600;">📍 ${business.city}</p>
              </div>
              <div>
                <p style="color: #666; font-size: 14px;">Avaliação</p>
                <p style="font-weight: 600;">⭐ ${business.rating.toFixed(1)}</p>
              </div>
              <div>
                <p style="color: #666; font-size: 14px;">Plano</p>
                <p style="font-weight: 600;">${business.plan}</p>
              </div>
            </div>

            <div style="border-top: 1px solid #e0e0e0; padding-top: 30px; margin-bottom: 30px;">
              <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Sobre</h2>
              <p style="color: #555; line-height: 1.6;">${business.description || 'Descrição não disponível'}</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; border-top: 1px solid #e0e0e0; padding-top: 30px;">
              <div>
                <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">Contato</h2>
                ${business.phone ? `<p style="margin-bottom: 8px;"><strong>Telefone:</strong> <a href="tel:${business.phone}" style="color: #0066FF; text-decoration: none;">${business.phone}</a></p>` : ''}
                ${business.email ? `<p style="margin-bottom: 8px;"><strong>Email:</strong> <a href="mailto:${business.email}" style="color: #0066FF; text-decoration: none;">${business.email}</a></p>` : ''}
                ${business.website ? `<p style="margin-bottom: 8px;"><strong>Website:</strong> <a href="${business.website}" target="_blank" rel="noopener noreferrer" style="color: #0066FF; text-decoration: none;">${business.website}</a></p>` : ''}
                ${business.address ? `<p><strong>Endereço:</strong> ${business.address}</p>` : ''}
              </div>

              <div>
                <button style="width: 100%; padding: 16px; background: linear-gradient(135deg, #0066FF 0%, #00B4A0 100%); color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer; margin-bottom: 12px;">Enviar Mensagem</button>
                <button onclick="window.open('https://wa.me', '_blank')" style="width: 100%; padding: 16px; background: #25D366; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 16px; cursor: pointer;">WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    navigateTo('listing');
    window.scrollTo(0, 0);
    updateFavoritesUI();
  } catch (err) {
    console.error(err);
    showNotification('Erro ao carregar detalhes', 'error');
  }
}

// Notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;

  const colors = {
    success: '#28a745',
    error: '#ff4757',
    info: '#0066FF'
  };

  notification.style.background = colors[type] || colors.info;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('user');
  if (user) {
    state.currentUser = JSON.parse(user);
    updateAuthUI();
  }
  updateFavoritesUI();
});
