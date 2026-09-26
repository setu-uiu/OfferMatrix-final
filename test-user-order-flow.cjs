const http = require('http');

function request(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING USER ORDER STATUS & HISTORY E2E VERIFICATION ---');

  const { PrismaClient } = require('./server/node_modules/@prisma/client');
  const prisma = new PrismaClient();
  const bcrypt = require('./server/node_modules/bcryptjs');

  const hashedPassword = await bcrypt.hash('Password123!', 10);
  let user = await prisma.user.findUnique({ where: { email: 'flowtest@offermatrix.com' } });
  if (!user) {
    const role = await prisma.role.findFirst({ where: { name: 'USER' } });
    user = await prisma.user.create({
      data: {
        email: 'flowtest@offermatrix.com',
        name: 'Flow Tester',
        password: hashedPassword,
        isEmailVerified: true,
        roleId: role.id
      }
    });
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true, password: hashedPassword }
    });
  }

  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'flowtest@offermatrix.com', password: 'Password123!' });

  token = loginRes.body.token;

  if (!token) {
    console.error('❌ Login/Register failed:', loginRes.body);
    process.exit(1);
  }
  console.log('✓ 1. User authenticated successfully.');

  // 2. Create Order
  const createRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }, {
    merchantName: "Sultan's Dine",
    items: [{ name: 'Kacchi Biryani Special', quantity: 2, unitPrice: 450 }],
    subtotal: 900,
    deliveryFee: 50,
    discount: 100,
    totalAmount: 850,
    paymentMethod: 'bKash'
  });

  if ((createRes.status !== 200 && createRes.status !== 201) || !createRes.body.order) {
    console.error('❌ Order creation failed:', createRes.body);
    process.exit(1);
  }
  const order = createRes.body.order;
  console.log(`✓ 2. Created order #${order.orderNumber} (ID: ${order.id}).`);

  // 3. Get Riders
  const ridersRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/delivery/partners',
    method: 'GET'
  });
  const riders = ridersRes.body.partners || ridersRes.body.riders || ridersRes.body;
  const availableRider = Array.isArray(riders) ? (riders.find(r => r.status === 'AVAILABLE') || riders[0]) : null;
  if (!availableRider) {
    console.error('❌ Could not fetch riders:', ridersRes.body);
    process.exit(1);
  }
  console.log(`✓ 3. Found rider: ${availableRider.name} (${availableRider.phone}, ${availableRider.vehicle})`);

  // 4. Assign Rider
  const assignRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/assign',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, deliveryPartnerId: availableRider.id, orderType: 'food' });

  if (assignRes.status !== 200 || !assignRes.body.success) {
    console.error('❌ Assignment failed:', assignRes.body);
    process.exit(1);
  }
  console.log(`✓ 4. Rider assigned to order #${order.orderNumber}. Response: ${assignRes.body.message}`);

  // 5. Fetch User Orders to verify Rider Details in Active Order
  const userOrdersRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const assignedOrder = userOrdersRes.body.orders.find(o => o.id === order.id);
  if (!assignedOrder || !assignedOrder.deliveryPartner) {
    console.error('❌ Rider details missing in user orders response:', assignedOrder);
    process.exit(1);
  }
  console.log('✓ 5. User order contains populated rider information:');
  console.log(`   - Rider Name: ${assignedOrder.deliveryPartner.name}`);
  console.log(`   - Rider Phone: ${assignedOrder.deliveryPartner.phone}`);
  console.log(`   - Vehicle: ${assignedOrder.deliveryPartner.vehicle}`);

  // 6. Complete Delivery (mark status DELIVERED)
  const completeRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${order.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DELIVERED' });

  if (completeRes.status !== 200 || !completeRes.body.success) {
    console.error('❌ Delivery completion failed:', completeRes.body);
    process.exit(1);
  }
  console.log(`✓ 6. Order #${order.orderNumber} marked DELIVERED.`);

  // 7. Verify Order moved to history state in user orders
  const userOrdersDeliveredRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const deliveredOrder = userOrdersDeliveredRes.body.orders.find(o => o.id === order.id);
  if (!deliveredOrder || deliveredOrder.status !== 'DELIVERED') {
    console.error('❌ Order status is not DELIVERED:', deliveredOrder);
    process.exit(1);
  }
  console.log(`✓ 7. Verified order #${order.orderNumber} status is DELIVERED and retains all order/rider details.`);

  // 8. Submit Review
  const reviewRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/reviews',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }, {
    category: 'food',
    item: "Sultan's Dine - Kacchi Biryani Special",
    rating: 5,
    comment: 'Delicious biryani, quick delivery by ' + assignedOrder.deliveryPartner.name
  });

  if (reviewRes.status !== 200 || !reviewRes.body.success) {
    console.error('❌ Review submission failed:', reviewRes.body);
    process.exit(1);
  }
  console.log('✓ 8. Review submitted successfully after delivery completion.');

  console.log('\n==================================================');
  console.log('🎉 ALL 8 E2E USER ORDER STATUS & HISTORY TESTS PASSED!');
  console.log('==================================================');
}

runTests().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
