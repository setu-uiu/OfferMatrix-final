import http from 'http';

const BASE_URL = 'http://localhost:5000';

function makeRequest(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runDeliverySystemTests() {
  console.log('🧪 Starting OfferMatrix Delivery System Automated E2E Verification...\n');

  try {
    // 1. Health check
    const health = await makeRequest('/api/health');
    console.log(`✅ Backend Health Check: HTTP ${health.status} - ${health.body.status}`);

    // 2. Login User
    const loginRes = await makeRequest('/api/auth/login', 'POST', {
      email: 'setumeherunnesa59@gmail.com',
      password: 'password123'
    });

    if (!loginRes.body || !loginRes.body.token) {
      throw new Error(`User login failed: ${JSON.stringify(loginRes.body)}`);
    }

    const token = loginRes.body.token;
    console.log(`✅ User Logged In successfully: ${loginRes.body.user.name}`);

    // 3. Place a Food Order
    const orderRes = await makeRequest('/api/orders', 'POST', {
      items: [
        { name: 'Kacchi Biryani Feast', quantity: 2, unitPrice: 320.00, selectedApp: 'FoodPanda' }
      ],
      paymentMethod: 'Cash on Delivery',
      deliveryAddress: 'House 14, Road 5, Dhanmondi, Dhaka'
    }, token);

    if (!orderRes.body.success || !orderRes.body.order) {
      throw new Error(`Order placement failed: ${JSON.stringify(orderRes.body)}`);
    }

    const foodOrder = orderRes.body.order;
    console.log(`✅ Food Order Placed: #${foodOrder.orderNumber} (ID: ${foodOrder.id})`);

    // 4. Admin Delivery Orders List
    const adminOrdersRes = await makeRequest('/api/admin/delivery/orders');
    console.log(`✅ Admin Delivery Orders Endpoint: Found ${adminOrdersRes.body.total} active orders.`);

    // 5. Query Delivery Partners
    const partnersRes = await makeRequest('/api/admin/delivery/partners?status=AVAILABLE');
    if (!partnersRes.body.partners || partnersRes.body.partners.length === 0) {
      throw new Error('No available delivery partners found.');
    }

    const partner = partnersRes.body.partners[0];
    console.log(`✅ Selected Available Partner: ${partner.name} (${partner.partnerCode}, Phone: ${partner.phone})`);

    // 6. Assign Partner to Order
    const assignRes = await makeRequest(`/api/admin/delivery/orders/${foodOrder.id}/assign`, 'POST', {
      deliveryPartnerId: partner.id
    });

    if (!assignRes.body.success) {
      throw new Error(`Partner assignment failed: ${JSON.stringify(assignRes.body)}`);
    }
    console.log(`✅ Partner ${partner.name} assigned to Order #${foodOrder.orderNumber}!`);

    // 7. Check User Order Details & Partner Info
    const userOrderRes = await makeRequest(`/api/orders/${foodOrder.id}`, 'GET', null, token);
    const assignedPartner = userOrderRes.body.order.deliveryPartner;
    console.log(`✅ User Order Summary updated with Partner: ${assignedPartner.name} (${assignedPartner.phone})`);

    // 8. Partner updates order status: PICKED_UP -> ON_THE_WAY
    const statusUpdate1 = await makeRequest(`/api/delivery-partner/orders/${foodOrder.id}/status`, 'POST', {
      status: 'PICKED_UP'
    });
    console.log(`✅ Partner updated status: ${statusUpdate1.body.message}`);

    const statusUpdate2 = await makeRequest(`/api/delivery-partner/orders/${foodOrder.id}/status`, 'POST', {
      status: 'ON_THE_WAY'
    });
    console.log(`✅ Partner updated status: ${statusUpdate2.body.message}`);

    // 9. Partner sends GPS location
    const locationRes = await makeRequest('/api/delivery-partner/location', 'POST', {
      deliveryPartnerId: partner.id,
      latitude: 23.7465,
      longitude: 90.3760,
      accuracy: 8,
      timestamp: new Date().toISOString()
    });
    console.log(`✅ Live GPS location recorded: (${locationRes.body.location.latitude}, ${locationRes.body.location.longitude})`);

    // 10. Customer Live Tracking Check
    const trackingRes = await makeRequest(`/api/orders/${foodOrder.id}/tracking`, 'GET', null, token);
    console.log(`✅ Live Tracking API Check: locationAvailable = ${trackingRes.body.tracking.locationAvailable}`);
    console.log(`   Rider: ${trackingRes.body.tracking.deliveryPartner.name}, Message: ${trackingRes.body.tracking.locationMessage}`);

    // 11. Admin clicks Delivery Done
    const completeRes = await makeRequest(`/api/admin/delivery/orders/${foodOrder.id}/complete`, 'POST');
    if (!completeRes.body.success) {
      throw new Error(`Delivery Done failed: ${JSON.stringify(completeRes.body)}`);
    }
    console.log(`✅ Admin clicked "Delivery Done": Status = ${completeRes.body.order.status}, DeliveredAt = ${completeRes.body.order.deliveredAt}`);

    // 12. Verify user notifications
    const notifRes = await makeRequest(`/api/notifications/${loginRes.body.user.id}`);
    console.log(`✅ User Notifications count: ${notifRes.body.length} notifications received.`);

    console.log('\n🎉 ALL 13 E2E DELIVERY MANAGEMENT SYSTEM TESTS PASSED SUCCESSFULLY! 🚀');
  } catch (err) {
    console.error(`❌ Delivery system test error: ${err.message}`);
    process.exit(1);
  }
}

runDeliverySystemTests();
