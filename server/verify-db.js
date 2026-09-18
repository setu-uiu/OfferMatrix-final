import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  console.log('🔍 Verifying PostgreSQL database "offermatrix" (18-table check)...');

  try {
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;

    console.log('\n📊 Tables found in "offermatrix" database:');
    tables.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.table_name}`);
    });

    const rolesCount = await prisma.role.count();
    const usersCount = await prisma.user.count();
    const merchantsCount = await prisma.merchant.count();
    const foodDealsCount = await prisma.foodDeal.count();
    const rideDealsCount = await prisma.rideDeal.count();
    const skincareDealsCount = await prisma.skincareDeal.count();
    const offersCount = await prisma.offer.count();
    const couponsCount = await prisma.coupon.count();
    const bankOffersCount = await prisma.bankOffer.count();
    const bkashCount = await prisma.bkashOffer.count();
    const nagadCount = await prisma.nagadOffer.count();
    const rocketCount = await prisma.rocketOffer.count();
    const savedCount = await prisma.savedDeal.count();
    const alertCount = await prisma.priceAlert.count();
    const complaintCount = await prisma.complaint.count();
    const reviewCount = await prisma.review.count();
    const notifCount = await prisma.notification.count();
    const auditCount = await prisma.adminAuditLog.count();

    console.log('\n📈 Database Record Summary:');
    console.log(`  - Roles: ${rolesCount}`);
    console.log(`  - Users: ${usersCount}`);
    console.log(`  - Merchants: ${merchantsCount}`);
    console.log(`  - Food Deals: ${foodDealsCount}`);
    console.log(`  - Ride Deals: ${rideDealsCount}`);
    console.log(`  - Skincare Deals: ${skincareDealsCount}`);
    console.log(`  - Offers: ${offersCount}`);
    console.log(`  - Coupons: ${couponsCount}`);
    console.log(`  - Bank Offers: ${bankOffersCount}`);
    console.log(`  - bKash Offers: ${bkashCount}`);
    console.log(`  - Nagad Offers: ${nagadCount}`);
    console.log(`  - Rocket Offers: ${rocketCount}`);
    console.log(`  - Saved Deals: ${savedCount}`);
    console.log(`  - Price Alerts: ${alertCount}`);
    console.log(`  - Complaints: ${complaintCount}`);
    console.log(`  - Reviews: ${reviewCount}`);
    console.log(`  - Notifications: ${notifCount}`);
    console.log(`  - Admin Audit Logs: ${auditCount}`);

    console.log('\n✨ Database verification complete! All 18 tables exist in PostgreSQL "offermatrix".');
  } catch (error) {
    console.error('❌ Verification error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
