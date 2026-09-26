const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const token = localStorage.getItem('offermatrix_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || `HTTP ${res.status}`, status: res.status };
    }
    return data;
  } catch (err) {
    console.warn(`API fetch error on ${endpoint}:`, err.message);
    return { error: err.message };
  }
}

export const OfferMatrixAPI = {
  // Auth API
  register: (data) => fetchJson('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  verifyEmail: (token) => fetchJson('/auth/verify-email', { method: 'POST', body: JSON.stringify({ token }) }),
  login: (credentials) => fetchJson('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getMe: () => fetchJson('/auth/me'),
  logout: () => fetchJson('/auth/logout', { method: 'POST' }),
  forgotPassword: (email) => fetchJson('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (data) => fetchJson('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),

  // Domain API
  getHealth: () => fetchJson('/health'),
  getRoles: () => fetchJson('/roles'),
  getUsers: () => fetchJson('/users'),
  createUser: (userData) => fetchJson('/users', { method: 'POST', body: JSON.stringify(userData) }),
  updateUserStatus: (id, status) => fetchJson(`/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getMerchants: () => fetchJson('/merchants'),
  createMerchant: (data) => fetchJson('/merchants', { method: 'POST', body: JSON.stringify(data) }),
  getFoodDeals: () => fetchJson('/deals/food'),
  getRideDeals: () => fetchJson('/deals/ride'),
  getSkincareDeals: () => fetchJson('/deals/skincare'),
  getOffers: (platform) => fetchJson(`/offers${platform ? `?platform=${platform}` : ''}`),
  createOffer: (offerData) => fetchJson('/offers', { method: 'POST', body: JSON.stringify(offerData) }),
  updateOffer: (id, offerData) => fetchJson(`/offers/${id}`, { method: 'PUT', body: JSON.stringify(offerData) }),
  updateOfferStatus: (id, status) => fetchJson(`/offers/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteOffer: (id) => fetchJson(`/offers/${id}`, { method: 'DELETE' }),
  getCoupons: () => fetchJson('/coupons'),
  getBankOffers: () => fetchJson('/bank-offers'),
  getWalletOffers: (provider) => fetchJson(`/wallet-offers/${provider}`),
  getBkashOffers: () => fetchJson('/wallet-offers/bkash'),
  getNagadOffers: () => fetchJson('/wallet-offers/nagad'),
  getRocketOffers: () => fetchJson('/wallet-offers/rocket'),
  getSavedDeals: (userId) => fetchJson(`/saved-deals/${userId}`),
  createSavedDeal: (data) => fetchJson('/saved-deals', { method: 'POST', body: JSON.stringify(data) }),
  getPriceAlerts: (userId) => fetchJson(`/price-alerts/${userId}`),
  getComplaints: () => fetchJson('/complaints'),
  createComplaint: (data) => fetchJson('/complaints', { method: 'POST', body: JSON.stringify(data) }),
  getReviews: () => fetchJson('/reviews'),
  createReview: (data) => fetchJson('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  getNotifications: (userId) => fetchJson(`/notifications/${userId}`),
  getAuditLogs: () => fetchJson('/audit-logs'),

  // Orders & Domain API
  getOrders: () => fetchJson('/orders'),
  getOrderById: (id) => fetchJson(`/orders/${id}`),
  createOrder: (orderData) => fetchJson('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  cancelOrder: (id) => fetchJson(`/orders/${id}/cancel`, { method: 'POST' }),
  getOrderTracking: (id) => fetchJson(`/orders/${id}/tracking`),

  // Skincare Orders API
  createSkincareOrder: (data) => fetchJson('/orders/skincare', { method: 'POST', body: JSON.stringify(data) }),

  // Ride Trips API
  getRides: () => fetchJson('/rides'),
  getRideById: (id) => fetchJson(`/rides/${id}`),
  createRide: (rideData) => fetchJson('/rides', { method: 'POST', body: JSON.stringify(rideData) }),
  assignDriverToRide: (id, driverData) => fetchJson(`/rides/${id}/assign-driver`, { method: 'POST', body: JSON.stringify(driverData || {}) }),
  updateRideStatus: (id, status) => fetchJson(`/rides/${id}/status`, { method: 'POST', body: JSON.stringify({ status }) })
};

