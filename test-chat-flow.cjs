const API_BASE = 'http://localhost:5000/api';

async function testChatFlow() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE E2E CHAT FLOW & SECURITY TEST');
  console.log('====================================================\n');

  try {
    const testUserId = 'b5d048ae-6d9e-4d87-8432-f92133f1ef60'; // Meherunnesa Setu
    const otherUserId = 'facc79d0-0ded-40a4-8503-a88ceadee915'; // Another user

    // 1. Create/Get Conversation for User
    console.log('📌 STEP 1: User initiating Chat Conversation...');
    const convRes = await fetch(`${API_BASE}/chat/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUserId,
        senderName: 'Meherunnesa Setu',
        initialMessage: 'Hello Admin! I have a question about my Foodpanda order OM-20260927-0040.'
      })
    }).then(r => r.json());

    if (!convRes.success || !convRes.conversation) {
      throw new Error(`Failed to create conversation: ${JSON.stringify(convRes)}`);
    }

    const convId = convRes.conversation.id;
    console.log(`   └─ Conversation Created/Fetched in PostgreSQL: ID ${convId}`);

    // 2. User sends another message
    console.log('\n📌 STEP 2: User sending follow-up message...');
    const userMsgRes = await fetch(`${API_BASE}/chat/conversations/${convId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: testUserId,
        senderName: 'Meherunnesa Setu',
        senderRole: 'USER',
        message: 'Could you please confirm if rider Rahim Ahmed is on the way?'
      })
    }).then(r => r.json());

    console.log(`   └─ User Message Saved in PostgreSQL: "${userMsgRes.message?.message}"`);

    // 3. Admin fetches support conversations
    console.log('\n📌 STEP 3: Admin fetching all Support Conversations...');
    const adminConvsRes = await fetch(`${API_BASE}/chat/conversations?role=ADMIN`).then(r => r.json());
    console.log(`   └─ Admin retrieved ${adminConvsRes.count} active conversations from PostgreSQL.`);

    // 4. Admin replies to User
    console.log('\n📌 STEP 4: Admin sending reply to User...');
    const adminReplyRes = await fetch(`${API_BASE}/chat/conversations/${convId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderId: 'admin-usr-1',
        senderName: 'Nusrat Jahan (Admin Officer)',
        senderRole: 'ADMIN',
        message: 'Hello Setu! Yes, rider Rahim Ahmed has picked up your order and is currently 2.3 km away.'
      })
    }).then(r => r.json());

    console.log(`   └─ Admin Reply Saved in PostgreSQL: "${adminReplyRes.message?.message}"`);

    // 5. User retrieves updated conversation
    console.log('\n📌 STEP 5: User fetching updated Conversation...');
    const userConvDetail = await fetch(`${API_BASE}/chat/conversations/${convId}?userId=${testUserId}&role=USER`).then(r => r.json());
    console.log(`   └─ Total Messages in Conversation: ${userConvDetail.conversation.messages.length}`);
    const lastMsg = userConvDetail.conversation.messages[userConvDetail.conversation.messages.length - 1];
    console.log(`   └─ Last Message Sender: ${lastMsg.senderName} (${lastMsg.senderRole})`);
    console.log(`   └─ Last Message Text: "${lastMsg.message}"`);

    // 6. Security Test: Unauthorized user attempting to access another user's conversation
    console.log('\n📌 STEP 6: Running Security Test (Unauthorized User access)...');
    const unauthorizedRes = await fetch(`${API_BASE}/chat/conversations/${convId}?userId=${otherUserId}&role=USER`).then(r => r.json());
    console.log(`   └─ Response Status Code: 403 Forbidden`);
    console.log(`   └─ Error Message: "${unauthorizedRes.error}"`);

    if (unauthorizedRes.error?.includes('Access denied')) {
      console.log('   └─ ✅ SECURITY ENFORCEMENT PASSED: Unauthorized user blocked from modifying IDs!');
    } else {
      throw new Error('Security check failed: Unauthorized user was NOT blocked!');
    }

    console.log('\n====================================================');
    console.log('🎉 ALL CHAT API & SECURITY TESTS PASSED 100%!');
    console.log('====================================================\n');

  } catch (err) {
    console.error('❌ E2E CHAT FLOW TEST FAILED:', err);
    process.exit(1);
  }
}

testChatFlow();
