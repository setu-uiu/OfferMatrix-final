const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API fetch error on ${endpoint}:`, err.message);
    return null;
  }
}

export const OfferMatrixAPI = {
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
  getNotifications: (userId) => fetchJson(`/notifications/${userId}`),
  getAuditLogs: () => fetchJson('/audit-logs')
};

