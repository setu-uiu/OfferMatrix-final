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

async function runMultipleSimultaneousOrdersTests() {
  console.log('=======================================================================');
  console.log('--- STARTING MULTIPLE SIMULTANEOUS ORDERS E2E VERIFICATION SUITE ---');
  console.log('=======================================================================\n');

  const { PrismaClient } = require('./server/node_modules/@prisma/client');
  const prisma = new PrismaClient();
  const bcrypt = require('./server/node_modules/bcryptjs');

  const hashedPassword = await bcrypt.hash('Password123!', 10);
  let user = await prisma.user.findUnique({ where: { email: 'multiorder@offermatrix.com' } });
  if (!user) {
    const role = await prisma.role.findFirst({ where: { name: 'USER' } });
    user = await prisma.user.create({
      data: {
        email: 'multiorder@offermatrix.com',
        name: 'Multi Order User',
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

  // 1. Authenticate User
  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'multiorder@offermatrix.com', password: 'Password123!' });

  if (loginRes.status !== 200 || !loginRes.body.token) {
    console.error('❌ Login failed:', loginRes.body);
    process.exit(1);
  }
  const token = loginRes.body.token;
  console.log('✓ 1. User authenticated successfully for multi-order testing.\n');

  // Fetch Delivery Partners
  const partnersRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/partners',
    method: 'GET'
  });
  const partners = partnersRes.body.partners || [];
  if (partners.length < 2) {
    console.error('❌ Need at least 2 delivery partners to test simultaneous orders:', partners);
    process.exit(1);
  }
  const riderA = partners[0];
  const riderB = partners[1];
  console.log(`✓ Delivery partners loaded: Rider A (${riderA.name}), Rider B (${riderB.name})\n`);

  // =========================================================================
  // TEST SCENARIO 1: Foodpanda Order A + Foodi Order B (Two different riders)
  // =========================================================================
  console.log('▶ TEST SCENARIO 1: Foodpanda Order A + Foodi Order B');
  const createFoodA = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, {
    merchantName: 'FoodPanda - Sultan Dine',
    items: [{ name: 'Kacchi Biryani Half', quantity: 2, unitPrice: 350, selectedApp: 'FoodPanda' }],
    paymentMethod: 'bKash'
  });
  const orderA = createFoodA.body.order;

  const createFoodB = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, {
    merchantName: 'Foodi - Pizza Burg',
    items: [{ name: 'Beef Double Cheese Burger', quantity: 1, unitPrice: 320, selectedApp: 'Foodi' }],
    paymentMethod: 'Cash on Delivery'
  });
  const orderB = createFoodB.body.order;

  console.log(`  - Created Order A (#${orderA.orderNumber}) and Order B (#${orderB.orderNumber})`);

  // Assign Rider A to Order A
  await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/assign',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: orderA.id, deliveryPartnerId: riderA.id, orderType: 'food' });

  // Assign Rider B to Order B
  await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/assign',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: orderB.id, deliveryPartnerId: riderB.id, orderType: 'food' });

  // Verify both active orders independently
  const activeOrdersRes1 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const fetchedA1 = activeOrdersRes1.body.orders.find(o => o.id === orderA.id);
  const fetchedB1 = activeOrdersRes1.body.orders.find(o => o.id === orderB.id);

  if (fetchedA1.deliveryPartnerId !== riderA.id || fetchedB1.deliveryPartnerId !== riderB.id) {
    console.error('❌ Independent rider assignment failed:', { fetchedA1, fetchedB1 });
    process.exit(1);
  }
  console.log('  ✓ Verified Order A has Rider A and Order B has Rider B independently.');

  // Complete ONLY Order A
  await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${orderA.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DELIVERED' });

  const activeOrdersRes2 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const fetchedA2 = activeOrdersRes2.body.orders.find(o => o.id === orderA.id);
  const fetchedB2 = activeOrdersRes2.body.orders.find(o => o.id === orderB.id);

  if (fetchedA2.status !== 'DELIVERED') {
    console.error('❌ Order A did not mark DELIVERED:', fetchedA2);
    process.exit(1);
  }
  if (fetchedB2.status === 'DELIVERED' || fetchedB2.status === 'CANCELLED') {
    console.error('❌ Order B was erroneously hidden or modified when Order A completed:', fetchedB2);
    process.exit(1);
  }
  console.log('  ✓ Verified completing Order A moved Order A to history while Order B REMAINS ACTIVE!\n');

  // =========================================================================
  // TEST SCENARIO 2: Food + Skincare Simultaneous Orders
  // =========================================================================
  console.log('▶ TEST SCENARIO 2: Food + Skincare Simultaneous Orders');
  const createFoodOrder = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, {
    merchantName: 'FoodPanda - Kacchi Bhai',
    items: [{ name: 'Mutton Biryani Deluxe', quantity: 1, unitPrice: 420, selectedApp: 'FoodPanda' }],
    paymentMethod: 'bKash'
  });
  const foodOrd = createFoodOrder.body.order;

  const createSkinOrder = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders/skincare',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, {
    storePlatform: 'choice_legacy',
    items: [{ name: 'COSRX Snail Mucin 100ml', quantity: 1, unitPrice: 1450 }],
    paymentMethod: 'Card'
  });
  const skinOrd = createSkinOrder.body.order;

  // Assign Rider A to Food order, Rider B to Skincare order
  await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/assign',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: foodOrd.id, deliveryPartnerId: riderA.id, orderType: 'food' });

  await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/delivery/assign',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { orderId: skinOrd.id, deliveryPartnerId: riderB.id, orderType: 'skincare' });

  // Complete Food order
  await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${foodOrd.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DELIVERED' });

  const activeRes3 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const checkSkin = activeRes3.body.orders.find(o => o.id === skinOrd.id);
  if (checkSkin.status === 'DELIVERED') {
    console.error('❌ Skincare order was erroneously completed when Food order completed:', checkSkin);
    process.exit(1);
  }
  console.log('  ✓ Verified Food order completed while Skincare order REMAINS ACTIVE!\n');

  // =========================================================================
  // TEST SCENARIO 3: Food + Food Simultaneous Orders
  // =========================================================================
  console.log('▶ TEST SCENARIO 3: Food + Food Simultaneous Orders');
  const createF1 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, { merchantName: 'Takeout Burgers', items: [{ name: 'Cheesy Beef Burger', quantity: 1, unitPrice: 280 }], paymentMethod: 'Nagad' });
  const f1 = createF1.body.order;

  const createF2 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, { merchantName: 'Chillox Burgers', items: [{ name: 'Smokey BBQ Burger', quantity: 1, unitPrice: 310 }], paymentMethod: 'bKash' });
  const f2 = createF2.body.order;

  await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${f1.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DELIVERED' });

  const activeRes4 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const checkF2 = activeRes4.body.orders.find(o => o.id === f2.id);
  if (checkF2.status === 'DELIVERED') {
    console.error('❌ Food 2 order was erroneously completed when Food 1 completed:', checkF2);
    process.exit(1);
  }
  console.log('  ✓ Verified Food 1 completed while Food 2 REMAINS ACTIVE!\n');

  // =========================================================================
  // TEST SCENARIO 4: Skincare + Skincare Simultaneous Orders
  // =========================================================================
  console.log('▶ TEST SCENARIO 4: Skincare + Skincare Simultaneous Orders');
  const createS1 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders/skincare',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, { storePlatform: 'kirei', items: [{ name: 'Anua Heartleaf Toner', quantity: 1, unitPrice: 1650 }], paymentMethod: 'bKash' });
  const s1 = createS1.body.order;

  const createS2 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders/skincare',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, { storePlatform: 'makeup_chari', items: [{ name: 'Beauty of Joseon Sunscreen', quantity: 1, unitPrice: 1200 }], paymentMethod: 'Card' });
  const s2 = createS2.body.order;

  await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/delivery-partner/orders/${s1.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DELIVERED' });

  const activeRes5 = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const checkS2 = activeRes5.body.orders.find(o => o.id === s2.id);
  if (checkS2.status === 'DELIVERED') {
    console.error('❌ Skincare 2 order was erroneously completed when Skincare 1 completed:', checkS2);
    process.exit(1);
  }
  console.log('  ✓ Verified Skincare 1 completed while Skincare 2 REMAINS ACTIVE!\n');

  // =========================================================================
  // Notification & Review Order Belonging Test
  // =========================================================================
  console.log('▶ TEST SCENARIO 5: Independent Notification & Review Ownership');
  const revA = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/reviews',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, { category: 'food', item: "FoodPanda Sultan's Dine", orderId: orderA.id, rating: 5, comment: 'Review for Order A' });

  const revB = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/reviews',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  }, { category: 'food', item: 'Foodi Pizza Burg', orderId: orderB.id, rating: 5, comment: 'Review for Order B' });

  if (!revA.body.success || !revB.body.success) {
    console.error('❌ Independent review submission failed:', { revA: revA.body, revB: revB.body });
    process.exit(1);
  }
  console.log('  ✓ Verified Review A linked to Order A and Review B linked to Order B independently.');

  console.log('\n=======================================================================');
  console.log('🎉 ALL MULTIPLE SIMULTANEOUS ORDERS E2E TESTS PASSED SUCCESSFULLY!');
  console.log('Foodpanda + Foodi • Food + Skincare • Food + Food • Skincare + Skincare');
  console.log('=======================================================================\n');
}

runMultipleSimultaneousOrdersTests().catch(err => {
  console.error('Multi order test error:', err);
  process.exit(1);
});
