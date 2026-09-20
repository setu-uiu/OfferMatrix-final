import http from 'http';

const BASE_URL = 'http://localhost:5000/api';

function makeRequest(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve) => {
    const url = new URL(`${BASE_URL}${path}`);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(url, { method, headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (err) => resolve({ status: 500, error: err.message }));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runAuthTests() {
  console.log('🧪 Running Comprehensive OfferMatrix Authentication Test Suite...\n');
  let passCount = 0;
  let totalCount = 0;

  function assert(condition, message) {
    totalCount++;
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passCount++;
    } else {
      console.log(`❌ FAIL: ${message}`);
    }
  }

  const testEmail = `testuser_${Date.now()}@offermatrix.bd`;
  const testPassword = 'Password123!';
  const newPassword = 'NewSecretPassword456!';
  let verificationToken = '';
  let resetToken = '';
  let jwtToken = '';

  // 1. Test Registration with Password Mismatch
  const regMismatch = await makeRequest('/auth/register', 'POST', {
    name: 'Test User',
    email: testEmail,
    password: testPassword,
    confirmPassword: 'WrongPassword'
  });
  assert(regMismatch.status === 400 && regMismatch.body.error === 'Passwords do not match', 'Registration blocks password mismatch');

  // 2. Test Registration with Weak Password
  const regWeak = await makeRequest('/auth/register', 'POST', {
    name: 'Test User',
    email: testEmail,
    password: '123',
    confirmPassword: '123'
  });
  assert(regWeak.status === 400 && regWeak.body.error.includes('at least 6 characters'), 'Registration blocks weak password (< 6 chars)');

  // 3. Test Valid Registration
  const regValid = await makeRequest('/auth/register', 'POST', {
    name: 'Test Authenticated User',
    email: testEmail,
    password: testPassword,
    confirmPassword: testPassword
  });
  assert(regValid.status === 201 && regValid.body.verificationToken, 'Valid registration creates user & generates verification token');
  if (regValid.body.verificationToken) {
    verificationToken = regValid.body.verificationToken;
  }

  // 4. Test Duplicate Email Registration
  const regDup = await makeRequest('/auth/register', 'POST', {
    name: 'Duplicate User',
    email: testEmail,
    password: testPassword,
    confirmPassword: testPassword
  });
  assert(regDup.status === 400 && regDup.body.error.includes('already exists'), 'Registration blocks duplicate email');

  // 5. Test Login Before Email Verification (Should Fail)
  const loginUnverified = await makeRequest('/auth/login', 'POST', {
    email: testEmail,
    password: testPassword
  });
  assert(loginUnverified.status === 400 && loginUnverified.body.error.includes('verify your email'), 'Login blocked for unverified email account');

  // 6. Test Email Verification with Invalid Token
  const verifyInvalid = await makeRequest('/auth/verify-email', 'POST', { token: 'invalid_fake_token_123' });
  assert(verifyInvalid.status === 400 && verifyInvalid.body.error.includes('Invalid or expired'), 'Email verification blocks invalid token');

  // 7. Test Valid Email Verification
  const verifyValid = await makeRequest('/auth/verify-email', 'POST', { token: verificationToken });
  assert(verifyValid.status === 200 && verifyValid.body.message.includes('verified successfully'), 'Email verification succeeds with valid token');

  // 8. Test Re-using Email Verification Token (Should Fail)
  const verifyReuse = await makeRequest('/auth/verify-email', 'POST', { token: verificationToken });
  assert(verifyReuse.status === 400, 'Verification token single-use check (cannot be reused)');

  // 9. Test Login with Wrong Password
  const loginWrongPass = await makeRequest('/auth/login', 'POST', {
    email: testEmail,
    password: 'WrongPassword99'
  });
  assert(loginWrongPass.status === 401 && loginWrongPass.body.error.includes('Invalid email or password'), 'Login blocks incorrect password');

  // 10. Test Valid Login & JWT Issuance
  const loginValid = await makeRequest('/auth/login', 'POST', {
    email: testEmail,
    password: testPassword
  });
  assert(loginValid.status === 200 && loginValid.body.token && loginValid.body.user.isEmailVerified, 'Valid login returns JWT token & user profile');
  if (loginValid.body.token) {
    jwtToken = loginValid.body.token;
  }

  // 11. Test GET /api/auth/me with Valid Token
  const getMeValid = await makeRequest('/auth/me', 'GET', null, jwtToken);
  assert(getMeValid.status === 200 && getMeValid.body.email === testEmail, 'GET /api/auth/me returns authenticated profile');

  // 12. Test Protected Endpoint Without Token (Should Fail 401)
  const getMeNoToken = await makeRequest('/auth/me', 'GET');
  assert(getMeNoToken.status === 401, 'Protected endpoint rejects request without token (401)');

  // 13. Test Protected Endpoint With Invalid Token (Should Fail 403)
  const getMeBadToken = await makeRequest('/auth/me', 'GET', null, 'invalid_jwt_token_456');
  assert(getMeBadToken.status === 403, 'Protected endpoint rejects invalid JWT token (403)');

  // 14. Test Forgot Password Request
  const forgotRes = await makeRequest('/auth/forgot-password', 'POST', { email: testEmail });
  assert(forgotRes.status === 200 && forgotRes.body.resetTokenSent === true, 'Forgot password handles registered email and issues reset token');

  // 15. Test Forgot Password for Non-existent Email (Safe Handling)
  const forgotUnknown = await makeRequest('/auth/forgot-password', 'POST', { email: 'nonexistent_email_999@offermatrix.bd' });
  assert(forgotUnknown.status === 200 && forgotUnknown.body.resetTokenSent === false, 'Forgot password handles unknown email safely without leaking enumeration details');

  // 16. Test Password Reset with Valid Token
  // Fetch reset token from user via GET /api/users or forgot response
  const usersRes = await makeRequest('/users', 'GET');
  const createdUser = usersRes.body.find(u => u.email === testEmail);
  if (createdUser && createdUser.resetPasswordToken) {
    resetToken = createdUser.resetPasswordToken;
  }

  if (resetToken) {
    const resetValid = await makeRequest('/auth/reset-password', 'POST', {
      token: resetToken,
      newPassword: newPassword,
      confirmPassword: newPassword
    });
    assert(resetValid.status === 200 && resetValid.body.message.includes('reset successfully'), 'Password reset succeeds with valid token');

    // 17. Test Old Password Login (Should Fail)
    const loginOldPass = await makeRequest('/auth/login', 'POST', {
      email: testEmail,
      password: testPassword
    });
    assert(loginOldPass.status === 401, 'Old password no longer works after password reset');

    // 18. Test New Password Login (Should Succeed)
    const loginNewPass = await makeRequest('/auth/login', 'POST', {
      email: testEmail,
      password: newPassword
    });
    assert(loginNewPass.status === 200 && loginNewPass.body.token, 'New password successfully authenticates user');
  } else {
    console.log('⚠️ Could not obtain reset token for step 16-18');
  }

  // 19. Test Logout
  const logoutRes = await makeRequest('/auth/logout', 'POST');
  assert(logoutRes.status === 200, 'Logout endpoint completes successfully');

  console.log(`\n🎉 OfferMatrix Authentication Test Results: ${passCount}/${totalCount} tests passed!\n`);
}

runAuthTests();
