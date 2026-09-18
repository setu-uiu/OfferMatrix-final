import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  console.log('🔍 Testing PostgreSQL connection via Prisma...');
  try {
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`;
    console.log('✅ Connection successful!');
    console.log('Database Details:', result);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
