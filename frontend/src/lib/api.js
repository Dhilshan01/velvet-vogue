const BASE = '/api';

function getToken() {
  return localStorage.getItem('vv_token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res  = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  // Auth
  register: body  => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:    body  => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  me:       ()    => request('/auth/me'),

  // Products
  getProducts: category => request(`/products${category ? `?category=${category}` : ''}`),
  getProduct:  id       => request(`/products/${id}`),

  // Cart
  getCart:       ()         => request('/cart'),
  addToCart:     body       => request('/cart', { method: 'POST',   body: JSON.stringify(body) }),
  updateCart:    (id, body) => request(`/cart/${id}`, { method: 'PATCH',  body: JSON.stringify(body) }),
  removeFromCart: id        => request(`/cart/${id}`, { method: 'DELETE' }),

  // Contact
  sendContact: body => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
};
