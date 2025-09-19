import { products } from './data.js';
import { nanoid } from 'nanoid';

/* State */
const state = {
  search: '',
  game: 'all',
  sort: 'relevance',
  cart: loadCart()
};

const els = {
  grid: document.getElementById('productsGrid'),
  filter: document.getElementById('gameFilter'),
  search: document.getElementById('searchInput'),
  sort: document.getElementById('sortSelect'),
  cartBtn: document.getElementById('openCartBtn'),
  cartDrawer: document.getElementById('cartDrawer'),
  closeCart: document.getElementById('closeCartBtn'),
  cartItems: document.getElementById('cartItems'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartCount: document.getElementById('cartCount'),
  overlay: document.getElementById('overlay'),
  checkoutBtn: document.getElementById('checkoutBtn'),
  checkoutModal: document.getElementById('checkoutModal'),
  checkoutForm: document.getElementById('checkoutForm'),
  closeCheckout: document.getElementById('closeCheckout'),
  cancelCheckout: document.getElementById('cancelCheckout'),
  checkoutSummary: document.getElementById('checkoutSummary'),
  themeSwitch: document.getElementById('themeSwitch')
};

/* Utils */
const currency = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' });

function saveCart() { localStorage.setItem('ggshop_cart', JSON.stringify(state.cart)); }
function loadCart() {
  try { return JSON.parse(localStorage.getItem('ggshop_cart')) ?? []; }
  catch { return []; }
}
function cartTotals() {
  const subtotal = state.cart.reduce((s, it) => s + it.priceAOA * it.qty, 0);
  const count = state.cart.reduce((s, it) => s + it.qty, 0);
  return { subtotal, count };
}

/* Render products */
function renderProducts() {
  let list = products.slice();

  if (state.game !== 'all') {
    list = list.filter(p => p.game === state.game);
  }
  if (state.search) {
    const q = state.search.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.game.toLowerCase().includes(q)
    );
  }

  switch (state.sort) {
    case 'price-asc': list.sort((a,b) => a.priceAOA - b.priceAOA); break;
    case 'price-desc': list.sort((a,b) => b.priceAOA - a.priceAOA); break;
    case 'name-asc': list.sort((a,b) => a.title.localeCompare(b.title)); break;
    default: break;
  }

  els.grid.innerHTML = list.map(p => `
    <article class="card">
      <img class="thumb" src="./${p.image}" alt="${p.title} - ${p.game}" loading="lazy">
      <div class="card-body">
        <div class="game">${p.game}</div>
        <div class="title">${p.title}</div>
        <div class="add-row">
          <div class="price">${currency.format(p.priceAOA)}</div>
          <button class="add-btn" data-add="${p.id}">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('') || `<p>Nenhum item encontrado.</p>`;
}

/* Cart rendering */
function renderCart() {
  els.cartItems.innerHTML = state.cart.map(it => `
    <div class="cart-item">
      <img src="./${it.image}" alt="${it.title}">
      <div>
        <div class="name">${it.title}</div>
        <div class="meta">${it.game}</div>
        <div class="meta">${currency.format(it.priceAOA)} un.</div>
      </div>
      <div>
        <div class="qty">
          <button data-dec="${it.id}" aria-label="Diminuir">−</button>
          <span>${it.qty}</span>
          <button data-inc="${it.id}" aria-label="Aumentar">+</button>
        </div>
        <button class="icon-btn" data-rem="${it.id}" style="margin-top:8px;">Remover</button>
      </div>
    </div>
  `).join('') || `<p>Seu carrinho está vazio.</p>`;

  const { subtotal, count } = cartTotals();
  els.cartSubtotal.textContent = currency.format(subtotal);
  els.cartCount.textContent = count;
}

/* Cart ops */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = state.cart.find(x => x.id === id);
  if (existing) existing.qty += 1;
  else state.cart.push({ ...p, qty: 1 });
  saveCart(); renderCart();
}

function inc(id) {
  const it = state.cart.find(x => x.id === id);
  if (it) { it.qty += 1; saveCart(); renderCart(); }
}
function dec(id) {
  const it = state.cart.find(x => x.id === id);
  if (it) {
    it.qty -= 1;
    if (it.qty <= 0) state.cart = state.cart.filter(x => x.id !== id);
    saveCart(); renderCart();
  }
}
function rem(id) {
  state.cart = state.cart.filter(x => x.id !== id);
  saveCart(); renderCart();
}

/* Drawer + Modal */
function openDrawer() {
  els.cartDrawer.classList.add('open');
  els.cartDrawer.setAttribute('aria-hidden', 'false');
  els.overlay.hidden = false;
  requestAnimationFrame(() => els.overlay.classList.add('show'));
}
function closeDrawer() {
  els.cartDrawer.classList.remove('open');
  els.cartDrawer.setAttribute('aria-hidden', 'true');
  els.overlay.classList.remove('show');
  setTimeout(() => els.overlay.hidden = true, 180);
}
function openCheckout() {
  if (!state.cart.length) return;
  const { subtotal } = cartTotals();
  els.checkoutSummary.innerHTML = `
    <div><strong>Itens:</strong> ${state.cart.length}</div>
    <div><strong>Total:</strong> ${currency.format(subtotal)}</div>
    <div style="margin-top:8px; color:#6b7280;">Após confirmação, enviaremos instruções de pagamento e a entrega dos itens será feita na sua conta do jogo.</div>
  `;
  els.checkoutModal.showModal();
}
function closeCheckoutModal() { els.checkoutModal.close(); }

/* Events */
els.filter.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-game]');
  if (!btn) return;
  els.filter.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  state.game = btn.dataset.game;
  renderProducts();
});

els.search.addEventListener('input', (e) => {
  state.search = e.target.value.trim();
  renderProducts();
});

els.sort.addEventListener('change', (e) => {
  state.sort = e.target.value;
  renderProducts();
});

els.grid.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) addToCart(add.dataset.add);
});

els.cartBtn.addEventListener('click', openDrawer);
document.getElementById('closeCartBtn').addEventListener('click', closeDrawer);
els.overlay.addEventListener('click', () => { closeDrawer(); });

els.cartItems.addEventListener('click', (e) => {
  const t = e.target;
  if (t.dataset.inc) inc(t.dataset.inc);
  if (t.dataset.dec) dec(t.dataset.dec);
  if (t.dataset.rem) rem(t.dataset.rem);
});

els.checkoutBtn.addEventListener('click', () => {
  openCheckout();
});

els.closeCheckout.addEventListener('click', (e) => { e.preventDefault(); closeCheckoutModal(); });
els.cancelCheckout.addEventListener('click', (e) => { e.preventDefault(); closeCheckoutModal(); });

els.checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(els.checkoutForm);
  const order = {
    id: nanoid(10),
    nome: fd.get('nome'),
    email: fd.get('email'),
    telefone: fd.get('telefone'),
    convite: fd.get('convite'),
    pagamento: fd.get('pagamento'),
    jogadorId: fd.get('idJogador'),
    nickname: fd.get('nickname'),
    items: state.cart.map(({id,title,qty,priceAOA,game}) => ({ id, title, qty, priceAOA, game })),
    totalAOA: cartTotals().subtotal,
    createdAt: new Date().toISOString()
  };
  const itemsTxt = order.items
  .map((it,i)=>`${i+1}. [${it.game}] ${it.title} x${it.qty} — ${currency.format(it.priceAOA*it.qty)}`)
  .join('\n');
  const msg = `🛒 Novo Pedido R.J.A 🎮\nID: ${order.id}\nNome: ${order.nome}\n🧛‍♀️ Convite: ${order.convite}\nWhatsApp: ${order.telefone}\n🆔 Jogo/Nick: ${order.nickname} (ID: ${order.jogadorId})\n💳 Pagamento: ${order.pagamento}\n\n📌 Itens:\n${itemsTxt}\n\n💰 Total: ${currency.format(order.totalAOA)}\nCompra feita no dia: ${new Date(order.createdAt).toLocaleString('pt-AO')}`;
  window.open(`https://wa.me/244973929712?text=${encodeURIComponent(msg)}`,'_blank');
  state.cart = [];
  saveCart(); renderCart();
  closeCheckoutModal(); closeDrawer();
  e.target.reset();
});

/* Init */
renderProducts();
renderCart();
