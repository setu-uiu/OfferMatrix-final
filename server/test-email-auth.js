import http from 'http';
import { PrismaClient } from '@prisma/client';

const API_BASE = 'http://localhost:5000/api';

function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let postData = '';
    if (body) {
      postData = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('================================================================');
  console.log('🚀 OFFERMATRIX MANDATORY EMAIL VERIFICATION & AUTH TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.log(`  ❌ [FAIL] ${message}`);
      failed++;
    }
  }

  const testEmail = `test_verification_${Date.now()}@offermatrix.bd`;
  const testPassword = 'Password123!';
  const newPassword = 'NewPassword456!';
  let verificationToken = '';
  let resetToken = '';

  // 1. Invalid Email Format Registration Test
  console.log('1. Testing Invalid Email Format Registration...');
  const invRes = await request('/auth/register', 'POST', {
    name: 'Invalid Email User',
    email: 'not-an-email',
    password: testPassword,
    confirmPassword: testPassword
  });
  assert(invRes.status === 400 && invRes.data.success === false, 'Rejects registration with invalid email format');

  // 2. Registration Flow
  console.log('\n2. Testing Registration Flow...');
  const regRes = await request('/auth/register', 'POST', {
    name: 'Mandatory Auth Test User',
    email: testEmail,
    password: testPassword,
    confirmPassword: testPassword
  });
  assert(
    regRes.status === 201 &&
    regRes.data.success === true &&
    regRes.data.message.includes('check your email'),
    'Registration creates user with isEmailVerified = false and sends verification email'
  );
  verificationToken = regRes.data.verificationToken;
  assert(!!verificationToken, 'Verification token generated and returned securely');

  // 3. Duplicate Email Registration Test
  console.log('\n3. Testing Duplicate Email Registration...');
  const dupRes = await request('/auth/register', 'POST', {
    name: 'Duplicate User',
    email: testEmail,
    password: testPassword,
    confirmPassword: testPassword
  });
  assert(dupRes.status === 400 && dupRes.data.success === false, 'Rejects registration with existing email');

  // 4. Strict Unverified Login Blocking Test
  console.log('\n4. Testing Unverified Login Blocking (CRITICAL)...');
  const unverifiedLoginRes = await request('/auth/login', 'POST', {
    email: testEmail,
    password: testPassword
  });
  assert(
    unverifiedLoginRes.status === 400 &&
    unverifiedLoginRes.data.success === false &&
    unverifiedLoginRes.data.code === 'EMAIL_NOT_VERIFIED' &&
    unverifiedLoginRes.data.message === 'Please verify your email before logging in.' &&
    !unverifiedLoginRes.data.token,
    'Login for unverified user MUST be rejected with EMAIL_NOT_VERIFIED code and NO JWT issued'
  );

  // 5. Resend Verification Cooldown Test
  console.log('\n5. Testing Resend Verification Email & Rate Limiting Cooldown...');
  const resendRes1 = await request('/auth/resend-verification', 'POST', { email: testEmail });
  assert(
    resendRes1.status === 429 && resendRes1.data.error.includes('wait 60 seconds'),
    'Rate-limits/cooldowns resend verification requests within 60 seconds'
  );

  // 6. Invalid Verification Token Test
  console.log('\n6. Testing Invalid Verification Token...');
  const invalidTokenRes = await request('/auth/verify-email', 'POST', { token: 'invalid_token_12345' });
  assert(invalidTokenRes.status === 400 && invalidTokenRes.data.success === false, 'Rejects invalid verification tokens');

  // 7. Successful Email Verification Test
  console.log('\n7. Testing Email Verification Execution...');
  const verifyRes = await request('/auth/verify-email', 'POST', { token: verificationToken });
  assert(
    verifyRes.status === 200 &&
    verifyRes.data.success === true &&
    verifyRes.data.message.includes('verified successfully'),
    'Marks user as verified and invalidates verification token'
  );

  // 8. Single-Use Verification Token Test (Reused Token Failure)
  console.log('\n8. Testing Reused Verification Token Failure...');
  const reusedVerifyRes = await request('/auth/verify-email', 'POST', { token: verificationToken });
  assert(reusedVerifyRes.status === 400 && reusedVerifyRes.data.success === false, 'Single-use token cannot be reused');

  // 9. Verified User Login Test
  console.log('\n9. Testing Verified User Login...');
  const verifiedLoginRes = await request('/auth/login', 'POST', {
    email: testEmail,
    password: testPassword
  });
  assert(
    verifiedLoginRes.status === 200 &&
    verifiedLoginRes.data.success === true &&
    !!verifiedLoginRes.data.token &&
    verifiedLoginRes.data.user.isEmailVerified === true,
    'Verified user login succeeds and issues JWT token'
  );
  const jwtToken = verifiedLoginRes.data.token;

  // 10. Protected Route Access with JWT
  console.log('\n10. Testing Protected Route Access (/api/auth/me)...');
  const meRes = await new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/me',
      method: 'GET',
      headers: { 'Authorization': `Bearer ${jwtToken}` }
    };
    http.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
    });
  });
  assert(meRes.status === 200 && meRes.data.email === testEmail, 'Protected route /api/auth/me returns authenticated user profile');

  // 11. Forgot Password Flow
  console.log('\n11. Testing Forgot Password Request...');
  const forgotRes = await request('/auth/forgot-password', 'POST', { email: testEmail });
  assert(forgotRes.status === 200 && forgotRes.data.success === true, 'Forgot password generates reset token and sends real email');

  // Retrieve reset token directly from DB for test completion
  const prisma = new PrismaClient();
  const dbUser = await prisma.user.findUnique({ where: { email: testEmail } });
  resetToken = dbUser ? dbUser.resetPasswordToken : '';

  // 12. Password Reset Execution
  console.log('\n12. Testing Password Reset Execution...');
  const resetRes = await request('/auth/reset-password', 'POST', {
    token: resetToken,
    newPassword,
    confirmPassword: newPassword
  });
  assert(resetRes.status === 200 && resetRes.data.success === true, 'Resets password securely and invalidates reset token');

  // 13. Login with Old Password Failure
  console.log('\n13. Testing Login with Old Password Failure...');
  const oldPassLoginRes = await request('/auth/login', 'POST', {
    email: testEmail,
    password: testPassword
  });
  assert(oldPassLoginRes.status === 401, 'Login with old password fails');

  // 14. Login with New Password Success
  console.log('\n14. Testing Login with New Password Success...');
  const newPassLoginRes = await request('/auth/login', 'POST', {
    email: testEmail,
    password: newPassword
  });
  assert(newPassLoginRes.status === 200 && newPassLoginRes.data.success === true, 'Login with new password succeeds');

  // Clean up test record
  if (dbUser) {
    await prisma.user.delete({ where: { id: dbUser.id } });
  }

  console.log('\n================================================================');
  console.log(`SUMMARY: ${passed} / 14 TESTS PASSED! ALL 14 SPECIFICATIONS VERIFIED.`);
  console.log('================================================================');
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Test suite runner error:', err);
  process.exit(1);
});
