import http from 'http';

const endpoints = [
  '/api/health',
  '/api/roles',
  '/api/users',
  '/api/merchants',
  '/api/deals/food',
  '/api/deals/ride',
  '/api/deals/skincare',
  '/api/offers',
  '/api/coupons',
  '/api/bank-offers',
  '/api/wallet-offers/bkash',
  '/api/wallet-offers/nagad',
  '/api/wallet-offers/rocket',
  '/api/saved-deals/usr-nusrat',
  '/api/price-alerts/usr-nusrat',
  '/api/complaints',
  '/api/reviews',
  '/api/notifications/usr-nusrat',
  '/api/audit-logs'
];

async function testEndpoint(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const count = Array.isArray(json) ? json.length : 1;
          console.log(`✅ [${res.statusCode}] GET ${path} -> ${count} record(s)`);
          resolve(true);
        } catch (e) {
          console.log(`❌ [${res.statusCode}] GET ${path} -> Invalid JSON response`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`❌ GET ${path} -> Request Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function testAll() {
  console.log('🧪 Testing Express API Endpoints connected to PostgreSQL...\n');
  let pass = 0;
  for (const ep of endpoints) {
    const ok = await testEndpoint(ep);
    if (ok) pass++;
  }
  console.log(`\n🎉 Test Results: ${pass}/${endpoints.length} API endpoints passed successfully!`);
}

testAll();
