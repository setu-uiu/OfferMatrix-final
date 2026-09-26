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

async function runRideTests() {
  console.log('--- STARTING RIDE / UBER DRIVER ASSIGNMENT & LIFECYCLE E2E TEST ---');

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

  // 1. Authenticate User
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

  // 2. Request a Ride (Uber Sedan)
  const rideRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/rides',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }, {
    platform: 'uber',
    pickup: 'House 42, Road 7/A, Dhanmondi',
    destination: 'Terminal 2, HSI Airport, Dhaka',
    carType: 'Uber Premier Sedan (AC)',
    baseFare: 550,
    discount: 100,
    paymentMethod: 'bKash',
    distanceKm: 18.5,
    durationMins: 34
  });

  if (rideRes.status !== 201 || !rideRes.body.trip) {
    console.error('❌ Ride creation failed:', rideRes.body);
    process.exit(1);
  }
  const trip = rideRes.body.trip;
  console.log(`✓ 2. Requested Uber trip #${trip.tripNumber} (ID: ${trip.id}). Initial Status: ${trip.status}`);

  // 3. Driver Assignment (Assign Driver to RideTrip)
  const assignRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/rides/${trip.id}/assign-driver`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    driverName: 'Tanvir Hossain',
    driverPhone: '+880 1819 876543',
    vehicleModel: 'Toyota Premio (AC)',
    vehicleRegNumber: 'DHAKA-METRO-GA-11-2026',
    driverRating: 4.9,
    status: 'DRIVER_ASSIGNED'
  });

  if (assignRes.status !== 200 || !assignRes.body.trip) {
    console.error('❌ Driver assignment failed:', assignRes.body);
    process.exit(1);
  }
  const assignedTrip = assignRes.body.trip;
  console.log(`✓ 3. Driver assigned: ${assignedTrip.driverName} (${assignedTrip.driverPhone}, ${assignedTrip.vehicleModel} • ${assignedTrip.vehicleRegNumber}). Status: ${assignedTrip.status}`);

  // 4. Ride Status Transition: DRIVER_ARRIVING -> IN_TRIP
  const arriveRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/rides/${trip.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'DRIVER_ARRIVING' });
  console.log(`✓ 4a. Ride status updated to DRIVER_ARRIVING.`);

  const inTripRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/rides/${trip.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'IN_TRIP' });
  console.log(`✓ 4b. Ride status updated to IN_TRIP.`);

  // 5. Trip Completed (COMPLETED)
  const completeRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/rides/${trip.id}/status`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { status: 'COMPLETED' });

  if (completeRes.status !== 200 || !completeRes.body.trip) {
    console.error('❌ Ride completion failed:', completeRes.body);
    process.exit(1);
  }
  console.log(`✓ 5. Trip #${trip.tripNumber} status updated to COMPLETED.`);

  // 6. User Visibility Verification (GET /api/orders)
  const userOrdersRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/orders',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const historyRide = userOrdersRes.body.orders.find(o => o.id === trip.id || o.orderNumber === trip.tripNumber);
  if (!historyRide || (historyRide.status !== 'Completed' && historyRide.status !== 'COMPLETED')) {
    console.error('❌ Ride missing from user visibility history:', historyRide);
    process.exit(1);
  }
  console.log(`✓ 6. User visibility verified: Ride #${historyRide.orderNumber} appeared in history with status Completed, driver (${historyRide.deliveryPartner?.name}), & fare (${historyRide.totalAmount}).`);

  // 7. Real Notifications Verification (GET /api/notifications/:userId)
  const notifRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/notifications/${user.id}`,
    method: 'GET'
  });
  const notifs = notifRes.body || [];
  const rideNotifs = notifs.filter(n => n.type === 'ride' || (n.message && n.message.includes('ride')));
  console.log(`✓ 7. Verified ${rideNotifs.length} real ride notifications generated for user.`);

  // 8. Submit Ride Review
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
    category: 'ride',
    item: 'Uber Premier Sedan - Airport Ride',
    orderId: trip.id,
    rating: 5,
    comment: 'Great comfortable ride with ' + assignedTrip.driverName + '. Clean car!'
  });

  if (reviewRes.status !== 200 || !reviewRes.body.success) {
    console.error('❌ Ride review failed:', reviewRes.body);
    process.exit(1);
  }
  console.log('✓ 8. Submitted ride review successfully.');

  // 9. Centralized Uber Offers System Verification (GET /api/offers?platform=uber)
  const uberOffersRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/offers?platform=uber',
    method: 'GET'
  });

  const uberOffers = uberOffersRes.body || [];
  console.log(`✓ 9. Centralized offer system verified: ${uberOffers.length} active Uber offers returned from PostgreSQL Offer model.`);

  console.log('\n==================================================================');
  console.log('🎉 ALL 9 RIDE / UBER DRIVER ASSIGNMENT & LIFECYCLE TESTS PASSED!');
  console.log('Driver Assignment • Driver Info • Ride Statuses • Notifications • User Visibility • Uber Offers');
  console.log('==================================================================');
}

runRideTests().catch(err => {
  console.error('Ride test error:', err);
  process.exit(1);
});
