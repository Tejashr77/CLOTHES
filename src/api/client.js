const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('zaqueen-token');

const headers = (isFormData = false) => {
  const h = isFormData ? {} : { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

const api = {
  // Auth
  register: (body) => fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  login: (body) => fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  getProfile: () => fetch(`${API_BASE}/auth/profile`, { headers: headers() }).then(handleResponse),
  updateProfile: (body) => fetch(`${API_BASE}/auth/profile`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  // Products
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/products?${qs}`, { headers: headers() }).then(handleResponse);
  },
  getProductById: (id) => fetch(`${API_BASE}/products/${id}`, { headers: headers() }).then(handleResponse),

  // Cart
  getCart: () => fetch(`${API_BASE}/cart`, { headers: headers() }).then(handleResponse),
  addToCart: (body) => fetch(`${API_BASE}/cart/add`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  updateCartItem: (productId, size, quantity) => fetch(`${API_BASE}/cart/${productId}/${size}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ quantity }) }).then(handleResponse),
  removeFromCart: (productId, size) => fetch(`${API_BASE}/cart/${productId}/${size}`, { method: 'DELETE', headers: headers() }).then(handleResponse),
  clearCart: () => fetch(`${API_BASE}/cart`, { method: 'DELETE', headers: headers() }).then(handleResponse),

  // Orders
  createOrder: (body) => fetch(`${API_BASE}/orders`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  getMyOrders: () => fetch(`${API_BASE}/orders/my`, { headers: headers() }).then(handleResponse),
  getOrderById: (id) => fetch(`${API_BASE}/orders/${id}`, { headers: headers() }).then(handleResponse),
  getAllOrders: () => fetch(`${API_BASE}/orders/all`, { headers: headers() }).then(handleResponse),
  updateOrderStatus: (id, body) => fetch(`${API_BASE}/orders/${id}/status`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  // Bespoke
  createBespoke: (formData) => fetch(`${API_BASE}/bespoke`, { method: 'POST', headers: headers(true), body: formData }).then(handleResponse),
  getMyBespoke: () => fetch(`${API_BASE}/bespoke/my`, { headers: headers() }).then(handleResponse),
  getBespokeById: (id) => fetch(`${API_BASE}/bespoke/${id}`, { headers: headers() }).then(handleResponse),

  // Contact
  submitContact: (body) => fetch(`${API_BASE}/contact`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),

  // Admin
  getAdminStats: () => fetch(`${API_BASE}/admin/stats`, { headers: headers() }).then(handleResponse),
  getAllContacts: () => fetch(`${API_BASE}/contact`, { headers: headers() }).then(handleResponse),
  getAllBespoke: () => fetch(`${API_BASE}/bespoke/all`, { headers: headers() }).then(handleResponse),
  updateBespoke: (id, body) => fetch(`${API_BASE}/bespoke/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  createProduct: (body) => fetch(`${API_BASE}/products`, { method: 'POST', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  updateProduct: (id, body) => fetch(`${API_BASE}/products/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) }).then(handleResponse),
  deleteProduct: (id) => fetch(`${API_BASE}/products/${id}`, { method: 'DELETE', headers: headers() }).then(handleResponse),
};

export default api;
