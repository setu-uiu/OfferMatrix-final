const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch list of delivery partners from PostgreSQL backend
 * @param {Object} params - Query filters e.g. { status: 'AVAILABLE', availableOnly: true }
 */
export async function fetchDeliveryPartners(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.availableOnly) query.append('availableOnly', 'true');

    const res = await fetch(`${API_BASE_URL}/delivery/partners?${query.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.partners || [];
  } catch (err) {
    console.warn('⚠️ Could not fetch delivery partners from backend:', err.message);
    return null;
  }
}

/**
 * Assign a rider to an order via PostgreSQL transaction
 * @param {Object} payload - { orderId, deliveryPartnerId, orderType, adminId }
 */
export async function assignRiderToOrder({ orderId, deliveryPartnerId, orderType = 'food', adminId = null }) {
  try {
    const res = await fetch(`${API_BASE_URL}/delivery/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderId,
        deliveryPartnerId,
        orderType,
        adminId
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return {
        success: false,
        error: data.error || `Failed with status ${res.status}`
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data
    };
  } catch (err) {
    console.error('❌ Error assigning rider via API:', err);
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * Fetch delivery assignments log
 */
export async function fetchDeliveryAssignments() {
  try {
    const res = await fetch(`${API_BASE_URL}/delivery/assignments`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.assignments || [];
  } catch (err) {
    console.warn('⚠️ Could not fetch delivery assignments:', err.message);
    return [];
  }
}
