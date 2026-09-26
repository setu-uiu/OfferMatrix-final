const http = require('http');

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runNotificationsFlowTest() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE E2E NOTIFICATIONS FLOW TEST');
  console.log('====================================================\n');

  try {
    // 1. Authenticate / Login to get Token
    const loginRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'setumeherunnesa59@gmail.com',
      password: '123'
    });

    if (loginRes.status !== 200 || !loginRes.body.token) {
      throw new Error(`Login failed: ${JSON.stringify(loginRes.body)}`);
    }

    const token = loginRes.body.token;
    const userId = loginRes.body.user.id;
    console.log(`✅ Authenticated User: ${loginRes.body.user.name} (${userId})\n`);

    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // 2. Create Foodpanda Order
    console.log('📌 STEP 1: Creating Foodpanda Order A...');
    const orderFPRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/orders',
      method: 'POST',
      headers: authHeaders
    }, {
      items: [{ name: 'Kacchi Biryani', quantity: 1, unitPrice: 280, selectedApp: 'Foodpanda' }],
      paymentMethod: 'bKash'
    });

    if (orderFPRes.status !== 201 || !orderFPRes.body.order) {
      throw new Error(`Foodpanda order creation failed: ${JSON.stringify(orderFPRes.body)}`);
    }

    const orderFP = orderFPRes.body.order;
    console.log(`   └─ Foodpanda Order Created: ID ${orderFP.id}, Number ${orderFP.orderNumber}`);

    // 3. Create Foodi Order
    console.log('\n📌 STEP 2: Creating Foodi Order B...');
    const orderFIRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/orders',
      method: 'POST',
      headers: authHeaders
    }, {
      items: [{ name: 'Chicken Pizza', quantity: 1, unitPrice: 450, selectedApp: 'Foodi' }],
      paymentMethod: 'Cash on Delivery'
    });

    if (orderFIRes.status !== 201 || !orderFIRes.body.order) {
      throw new Error(`Foodi order creation failed: ${JSON.stringify(orderFIRes.body)}`);
    }

    const orderFI = orderFIRes.body.order;
    console.log(`   └─ Foodi Order Created: ID ${orderFI.id}, Number ${orderFI.orderNumber}`);

    // 4. Create Skincare Order
    console.log('\n📌 STEP 3: Creating Kirei Skincare Order...');
    const skinRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/orders/skincare',
      method: 'POST',
      headers: authHeaders
    }, {
      items: [{ name: 'Hydrating Serum', quantity: 1, unitPrice: 1200, brand: 'Kirei' }],
      storePlatform: 'kirei',
      paymentMethod: 'bKash'
    });

    const orderSkin = skinRes.body.order;
    console.log(`   └─ Skincare Order Created: ID ${orderSkin.id}, Number ${orderSkin.orderNumber}`);

    // 5. Verify Persistent Notifications for "Order placed" & "Waiting for rider"
    console.log('\n📌 STEP 4: Verifying Persistent Notifications in PostgreSQL for Order Placed & Waiting for Rider...');
    let notifRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${userId}`,
      method: 'GET',
      headers: authHeaders
    });

    let notifications = notifRes.body;
    console.log(`   └─ Retrieved ${notifications.length} persistent notifications from PostgreSQL.`);

    const fpPlaced = notifications.find(n => n.orderId === orderFP.id && n.title.includes('Order placed'));
    const fpWaiting = notifications.find(n => n.orderId === orderFP.id && n.title.includes('Waiting for rider'));

    console.log(`   └─ Foodpanda Placed Notif: "${fpPlaced?.title}"`);
    console.log(`   └─ Foodpanda Waiting Notif: "${fpWaiting?.title}"`);

    if (!fpPlaced || !fpWaiting) {
      throw new Error('❌ Missing Order Placed or Waiting for Rider notification in PostgreSQL!');
    }

    // 6. Assign Rider Rahim Ahmed to Foodpanda Order
    console.log('\n📌 STEP 5: Assigning Rider Rahim Ahmed to Foodpanda Order...');
    const partnerRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/delivery/partners?availableOnly=true',
      method: 'GET',
      headers: authHeaders
    });

    const partner = partnerRes.body.partners[0];
    const assignRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/delivery/assign',
      method: 'POST',
      headers: authHeaders
    }, {
      orderId: orderFP.id,
      deliveryPartnerId: partner.id
    });

    if (assignRes.status !== 200) {
      throw new Error(`Rider assignment failed: ${JSON.stringify(assignRes.body)}`);
    }

    console.log(`   └─ Rider ${partner.name} assigned to Foodpanda Order ${orderFP.orderNumber}`);

    // 7. Verify "Rider assigned" notification identifies correct order
    console.log('\n📌 STEP 6: Verifying "Rider assigned" notification in PostgreSQL...');
    notifRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${userId}`,
      method: 'GET',
      headers: authHeaders
    });
    notifications = notifRes.body;

    const fpAssignedNotif = notifications.find(n => n.orderId === orderFP.id && n.title.includes('Rider assigned'));
    const fiAssignedNotif = notifications.find(n => n.orderId === orderFI.id && n.title.includes('Rider assigned'));

    console.log(`   └─ Foodpanda Rider Assigned Notif: "${fpAssignedNotif?.title}"`);
    console.log(`   └─ Message: "${fpAssignedNotif?.message}"`);

    if (!fpAssignedNotif) {
      throw new Error('❌ Rider assigned notification for Foodpanda order not found!');
    }
    if (fiAssignedNotif) {
      throw new Error('❌ Rider assigned notification incorrectly attached to Foodi order!');
    }

    // 8. Update Foodpanda order status to ON_THE_WAY ("Out for delivery")
    console.log('\n📌 STEP 7: Updating Foodpanda Order status to ON_THE_WAY...');
    await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/delivery-partner/orders/${orderFP.id}/status`,
      method: 'POST',
      headers: authHeaders
    }, { status: 'ON_THE_WAY' });

    notifRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${userId}`,
      method: 'GET',
      headers: authHeaders
    });
    notifications = notifRes.body;
    const fpOutNotif = notifications.find(n => n.orderId === orderFP.id && n.title.includes('Out for delivery'));
    console.log(`   └─ Out for Delivery Notif: "${fpOutNotif?.title}"`);

    if (!fpOutNotif) {
      throw new Error('❌ "Out for delivery" notification not found!');
    }

    // 9. Complete Foodpanda order delivery ("Delivered")
    console.log('\n📌 STEP 8: Updating Foodpanda Order status to DELIVERED...');
    await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/delivery-partner/orders/${orderFP.id}/status`,
      method: 'POST',
      headers: authHeaders
    }, { status: 'DELIVERED' });

    notifRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${userId}`,
      method: 'GET',
      headers: authHeaders
    });
    notifications = notifRes.body;
    const fpDeliveredNotif = notifications.find(n => n.orderId === orderFP.id && n.title.includes('Delivered'));
    console.log(`   └─ Delivered Notif: "${fpDeliveredNotif?.title}"`);

    if (!fpDeliveredNotif) {
      throw new Error('❌ "Delivered" notification not found!');
    }

    // 10. Test Read / Unread Status Persistence in PostgreSQL
    console.log('\n📌 STEP 9: Testing Read/Unread Status Persistence in PostgreSQL...');
    const targetNotif = fpDeliveredNotif;
    console.log(`   └─ Initial isRead state for Notification ${targetNotif.id}: ${targetNotif.isRead}`);

    // Mark single notification as Read
    const patchReadRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${targetNotif.id}/read`,
      method: 'PATCH',
      headers: authHeaders
    }, { isRead: true });

    if (patchReadRes.status !== 200 || !patchReadRes.body.notification.isRead) {
      throw new Error(`❌ Failed to mark notification ${targetNotif.id} as read!`);
    }
    console.log(`   └─ Successfully PATCHed notification ${targetNotif.id} isRead -> true`);

    // Verify persistence by re-querying GET /api/notifications/:userId
    notifRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${userId}`,
      method: 'GET',
      headers: authHeaders
    });
    const updatedTargetNotif = notifRes.body.find(n => n.id === targetNotif.id);
    if (!updatedTargetNotif || !updatedTargetNotif.isRead) {
      throw new Error('❌ Read state did not persist in PostgreSQL database!');
    }
    console.log(`   └─ Verified PostgreSQL Persistence: isRead = ${updatedTargetNotif.isRead}`);

    // Mark ALL as read
    console.log('\n📌 STEP 10: Testing Mark All as Read Endpoint...');
    const markAllRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/user/${userId}/read-all`,
      method: 'PATCH',
      headers: authHeaders
    });

    if (markAllRes.status !== 200) {
      throw new Error(`❌ Mark all read failed: ${JSON.stringify(markAllRes.body)}`);
    }

    notifRes = await request({
      hostname: 'localhost',
      port: 5000,
      path: `/api/notifications/${userId}`,
      method: 'GET',
      headers: authHeaders
    });

    const unreadRemaining = notifRes.body.filter(n => !n.isRead).length;
    console.log(`   └─ Remaining Unread Notifications for User: ${unreadRemaining}`);
    if (unreadRemaining !== 0) {
      throw new Error('❌ markAllNotificationsRead did not update all notifications!');
    }

    console.log('\n====================================================');
    console.log('🎉 ALL PERSISTENT NOTIFICATION TESTS PASSED 100%!');
    console.log('====================================================');

  } catch (err) {
    console.error('\n❌ TEST FAILED:', err);
    process.exit(1);
  }
}

runNotificationsFlowTest();
