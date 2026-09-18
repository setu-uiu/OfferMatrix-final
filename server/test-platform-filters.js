import http from 'http';

const canonicalPlatforms = [
  // FOOD
  'foodpanda',
  'foodi',
  'pathao_food',
  // RIDE
  'uber',
  'obhai',
  'indrive',
  // SKINCARE
  'choice_legacy',
  'kirei',
  'makeup_chari'
];

async function testPlatformFilter(platform) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5000/api/offers?platform=${platform}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const ok = res.statusCode === 200 && Array.isArray(json);
          console.log(`${ok ? '✅' : '❌'} Platform filter "${platform}" -> HTTP ${res.statusCode}, returned ${json.length} offer(s)`);
          resolve(ok);
        } catch (e) {
          console.log(`❌ Platform filter "${platform}" -> Invalid JSON`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`❌ Platform filter "${platform}" -> Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('🧪 Testing Canonical Platform API Filters...\n');
  let pass = 0;
  for (const p of canonicalPlatforms) {
    const ok = await testPlatformFilter(p);
    if (ok) pass++;
  }
  console.log(`\n🎉 Platform Filter Verification: ${pass}/${canonicalPlatforms.length} canonical filters passed!`);
}

run();
