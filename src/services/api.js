const API_BASE_URL = 'http://localhost:5000/api';

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
  getUsers: () => fetchJson('/users'),
  createUser: (userData) => fetchJson('/users', { method: 'POST', body: JSON.stringify(userData) }),
  updateUserStatus: (id, status) => fetchJson(`/users/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getMerchants: () => fetchJson('/merchants'),
  getFoodDeals: () => fetchJson('/deals/food'),
  getRideDeals: () => fetchJson('/deals/ride'),
  getSkincareDeals: () => fetchJson('/deals/skincare'),
  getOffers: (platform) => fetchJson(`/offers${platform ? `?platform=${platform}` : ''}`),
  getCoupons: () => fetchJson('/coupons'),
  getBankOffers: () => fetchJson('/bank-offers'),
  getWalletOffers: (provider) => fetchJson(`/wallet-offers/${provider}`),
  getSavedDeals: (userId) => fetchJson(`/saved-deals/${userId}`),
  getComplaints: () => fetchJson('/complaints'),
  getAuditLogs: () => fetchJson('/audit-logs')
};
