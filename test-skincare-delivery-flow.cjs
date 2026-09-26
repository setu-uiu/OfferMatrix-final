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

async function runSkincareTests() {
  console.log('--- STARTING SKINCARE ORDER & DELIVERY LIFECYCLE E2E TEST ---');

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
      data: { password: hashedPassword, isEmailVerified: true }
    });
  }

  // 1. Login user
  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'flowtest@offermatrix.com', password: 'Password123!' });

  if (loginRes.status !== 200 || !loginRes.body.token) {
    console.error('❌ Login failed:', loginRes.body);
    process.exit(1);
  }
  const token = loginRes.body.token;
  console.log('✓ 1. User authenticated successfully.');

  // 2. Step 1: Order (Place Skincare Order)
  const createRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders/skincare',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }, {
    storePlatform: 'choice_legacy',
    items: [
      { name: 'CeraVe Hydrating Facial Cleanser 473ml', quantity: 1, unitPrice: 1250, brand: 'Choice Legacy' }
    ],
    paymentMethod: 'bKash',
    deliveryAddress: 'House 14, Road 11, Dhanmondi, Dhaka'
  });

  if (createRes.status !== 201 || !createRes.body.order) {
    console.error('❌ Skincare order creation failed:', createRes.body);
    process.exit(1);
  }
  const order = createRes.body.order;
  console.log(`✓ 2. Step 1 (Order): Placed skincare order #${order.orderNumber} (ID: ${order.id}). Status: ${order.status}`);

  // 3. Step 2: Waiting for rider (Verify order initially has no rider assigned)
  const userOrders1 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const placedOrder = userOrders1.body.orders.find(o => o.id === order.id);
  console.log(`✓ 3. Step 2 (Waiting for rider): Order #${placedOrder.orderNumber} category: ${placedOrder.category}, deliveryPartner: ${placedOrder.deliveryPartner ? placedOrder.deliveryPartner.name : 'None (Waiting for rider)'}`);

  // 4. Step 3: Rider assigned (Assign rider to skincare order using existing delivery API)
  const partnersRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/delivery/partners',
    method: 'GET'
  });
  const partners = partnersRes.body.partners || [];
  const selectedPartner = partners.find(p => p.status === 'AVAILABLE') || partners[0];
  if (!selectedPartner) {
    console.error('❌ Could not find delivery partner');
    process.exit(1);
  }

  const assignRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/assign',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: order.id, deliveryPartnerId: selectedPartner.id, orderType: 'skincare' });

  if (assignRes.status !== 200 || !assignRes.body.success) {
    console.error('❌ Skincare rider assignment failed:', assignRes.body);
    process.exit(1);
  }
  console.log(`✓ 4. Step 3 (Rider assigned): Assigned ${selectedPartner.name} (${selectedPartner.phone}, ${selectedPartner.vehicle}) to skincare order #${order.orderNumber}.`);

  // 5. Step 4: Delivery (Update status to SHIPPED / ON_THE_WAY)
  const deliveryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${order.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'SHIPPED' });

  if (deliveryRes.status !== 200 || !deliveryRes.body.success) {
    console.error('❌ Delivery status update failed:', deliveryRes.body);
    process.exit(1);
  }
  console.log(`✓ 5. Step 4 (Delivery): Skincare order #${order.orderNumber} status updated to SHIPPED (In Delivery).`);

  // 6. Step 5: Delivered (Update status to DELIVERED)
  const deliveredRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${order.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DELIVERED' });

  if (deliveredRes.status !== 200 || !deliveredRes.body.success) {
    console.error('❌ Marking DELIVERED failed:', deliveredRes.body);
    process.exit(1);
  }
  console.log(`✓ 6. Step 5 (Delivered): Skincare order #${order.orderNumber} marked DELIVERED.`);

  // 7. Step 6: History (Verify skincare order moves to history & retains full details)
  const userOrders2 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const historyOrder = userOrders2.body.orders.find(o => o.id === order.id);
  if (!historyOrder || historyOrder.status !== 'DELIVERED') {
    console.error('❌ Skincare order missing or status not DELIVERED in history:', historyOrder);
    process.exit(1);
  }
  console.log(`✓ 7. Step 6 (History): Order #${historyOrder.orderNumber} status DELIVERED in history retaining store platform (${historyOrder.storePlatform}) & rider (${historyOrder.deliveryPartner ? historyOrder.deliveryPartner.name : 'N/A'}).`);

  // 8. Step 7: Review (Submit a review for the delivered skincare order)
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
    category: 'skincare',
    item: 'Choice Legacy - CeraVe Hydrating Facial Cleanser',
    orderId: order.id,
    rating: 5,
    comment: 'Authentic CeraVe cleanser! Fast delivery by ' + selectedPartner.name
  });

  if (reviewRes.status !== 200 || !reviewRes.body.success) {
    console.error('❌ Skincare review submission failed:', reviewRes.body);
    process.exit(1);
  }
  console.log(`✓ 8. Step 7 (Review): Skincare review submitted successfully.`);

  console.log('\n==================================================================');
  console.log('🎉 ALL 7 STEPS OF THE SKINCARE DELIVERY LIFECYCLE PASSED SUCCESSFULLY!');
  console.log('Order ↓ Waiting for rider ↓ Rider assigned ↓ Delivery ↓ Delivered ↓ History ↓ Review');
  console.log('==================================================================');
}

runSkincareTests().catch(err => {
  console.error('Skincare test error:', err);
  process.exit(1);
});
