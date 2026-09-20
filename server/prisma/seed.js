import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting full database seeding (18 tables)...');

  // 1. Roles
  console.log('1. Seeding Roles...');
  const roles = [
    { name: 'ADMIN', description: 'System Administrator with full management access' },
    { name: 'USER', description: 'Standard OfferMatrix deal explorer' },
    { name: 'MERCHANT', description: 'Partner merchant account' }
  ];

  const roleMap = {};
  for (const r of roles) {
    const roleObj = await prisma.role.upsert({
      where: { name: r.name },
      update: r,
      create: r
    });
    roleMap[r.name] = roleObj.id;
  }

  // 2. Users
  console.log('2. Seeding Users...');
  const users = [
    {
      id: 'usr-admin',
      email: 'admin@offermatrix.com',
      name: 'Super Admin',
      phone: '01700-000000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      status: 'Active',
      subscriptionPlan: 'vip',
      roleId: roleMap['ADMIN']
    },
    {
      id: 'usr-nusrat',
      email: 'nusrat@gmail.com',
      name: 'Nusrat Jahan',
      phone: '01712-345678',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      status: 'Active',
      subscriptionPlan: 'pro',
      roleId: roleMap['USER']
    },
    {
      id: 'usr-tanvir',
      email: 'tanvir@gmail.com',
      name: 'Tanvir Rahman',
      phone: '01823-456789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      status: 'Active',
      subscriptionPlan: 'free',
      roleId: roleMap['USER']
    },
    {
      id: 'usr-samiha',
      email: 'samiha@gmail.com',
      name: 'Samiha Islam',
      phone: '01676-234567',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      status: 'Reported',
      subscriptionPlan: 'free',
      roleId: roleMap['USER']
    },
    {
      id: 'usr-rafi',
      email: 'rafi@gmail.com',
      name: 'Rafi Ahmed',
      phone: '01988-123456',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      status: 'Suspended',
      subscriptionPlan: 'free',
      roleId: roleMap['USER']
    }
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: u
    });
  }

  // 3. Merchants
  console.log('3. Seeding Merchants...');
  const merchants = [
    { id: 'm-1', name: "Sultan's Dine", category: 'Food', logo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', rating: 4.9, totalDeals: 15, contact: '01711-111222', status: 'Active' },
    { id: 'm-2', name: 'Kacchi Bhai', category: 'Food', logo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', rating: 4.8, totalDeals: 12, contact: '01711-222333', status: 'Active' },
    { id: 'm-3', name: 'Choice Legacy', category: 'Skincare', logo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be', rating: 4.9, totalDeals: 8, contact: '01711-333444', status: 'Active' },
    { id: 'm-4', name: 'Kirei Beauty BD', category: 'Skincare', logo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03', rating: 4.8, totalDeals: 10, contact: '01711-444555', status: 'Active' },
    { id: 'm-5', name: 'Uber Bangladesh', category: 'Rides', logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e', rating: 4.7, totalDeals: 20, contact: '01711-555666', status: 'Active' },
    { id: 'm-6', name: 'Pathao Limited', category: 'Rides', logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e', rating: 4.8, totalDeals: 25, contact: '01711-666777', status: 'Active' }
  ];

  for (const m of merchants) {
    await prisma.merchant.upsert({
      where: { id: m.id },
      update: m,
      create: m
    });
  }

  // 4. Food Deals
  console.log('4. Seeding Food Deals...');
  const foodDeals = [
    {
      id: 'fd-1',
      title: 'Kacchi Biryani Half',
      restaurant: "Sultan's Dine",
      bestPrice: 195,
      originalPrice: 260,
      savings: 65,
      tag: 'Best Seller',
      image: '/assets/biryani.jpg',
      rating: 4.9,
      reviewsCount: 1420,
      description: 'Authentic Bangladeshi Kacchi Biryani made with basmati rice & tender mutton/chicken.'
    },
    {
      id: 'fd-2',
      title: 'Cheesy Pepperoni Pizza (Large)',
      restaurant: 'Pizza Hut Direct',
      bestPrice: 650,
      originalPrice: 890,
      savings: 240,
      tag: 'Super Saver Pizza',
      image: '/assets/pizza.jpg',
      rating: 4.8,
      reviewsCount: 1120,
      description: 'Classic mozzarella cheese pepperoni pizza with crispy hand-tossed crust.'
    },
    {
      id: 'fd-3',
      title: 'Smokey Gourmet Beef Burger Combo',
      restaurant: 'Takeout',
      bestPrice: 380,
      originalPrice: 520,
      savings: 140,
      tag: 'Juicy Burger',
      image: '/assets/burger.jpg',
      rating: 4.9,
      reviewsCount: 980,
      description: 'Charcoal grilled beef patty with melt cheese & seasoned fries.'
    },
    {
      id: 'fd-4',
      title: 'Mutton Kacchi Biryani Full',
      restaurant: "Sultan's Dine",
      bestPrice: 380,
      originalPrice: 480,
      savings: 100,
      tag: 'Best Seller',
      image: '/assets/biryani.jpg',
      rating: 4.9,
      reviewsCount: 1850,
      description: 'Rich, aromatic mutton kacchi biryani topped with fried onions & boiled egg.'
    },
    {
      id: 'fd-5',
      title: 'Morog Polao Special Combo',
      restaurant: 'Star Kabab',
      bestPrice: 260,
      originalPrice: 340,
      savings: 80,
      tag: 'Traditional Taste',
      image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      reviewsCount: 1240,
      description: 'Traditional Dhakaiya Morog Polao served with borhani and salad.'
    },
    {
      id: 'fd-6',
      title: 'Beef Bhuna Khichuri',
      restaurant: 'Ghoroa Restaurant',
      bestPrice: 220,
      originalPrice: 290,
      savings: 70,
      tag: 'Rainy Day Special',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      reviewsCount: 920,
      description: 'Comforting bhuna khichuri with tender spicy beef bhuna.'
    },
    {
      id: 'fd-7',
      title: 'BBQ Chicken Pizza (Medium)',
      restaurant: 'PizzaBurg',
      bestPrice: 480,
      originalPrice: 650,
      savings: 170,
      tag: 'Cheesy Delight',
      image: '/assets/pizza.jpg',
      rating: 4.8,
      reviewsCount: 1560,
      description: 'Loaded with smoky BBQ chicken bits, capsicum, onion, and extra cheese.'
    },
    {
      id: 'fd-8',
      title: 'Crispy Fried Chicken (4 pcs)',
      restaurant: 'KFC Direct',
      bestPrice: 390,
      originalPrice: 500,
      savings: 110,
      tag: 'Extra Crunchy',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      reviewsCount: 2100,
      description: 'Hot & crispy fried chicken pieces with dip sauce.'
    }
  ];

  for (const fd of foodDeals) {
    await prisma.foodDeal.upsert({
      where: { id: fd.id },
      update: fd,
      create: fd
    });
  }

  // 5. Ride Deals
  console.log('5. Seeding Ride Deals...');
  const rideDeals = [
    {
      id: 'rd-1',
      title: 'Dhanmondi to Gulshan Car Ride',
      route: 'Dhanmondi ➔ Gulshan',
      cheapestPrice: 175,
      originalPrice: 210,
      savings: 35,
      tag: 'Cheapest Ride',
      image: '/assets/blue_car.jpg',
      rating: 4.8,
      reviewsCount: 890
    },
    {
      id: 'rd-2',
      title: 'Uttara to Banani Bike Ride',
      route: 'Uttara ➔ Banani',
      cheapestPrice: 95,
      originalPrice: 140,
      savings: 45,
      tag: 'Express Bike',
      image: '/assets/blue_car.jpg',
      rating: 4.7,
      reviewsCount: 540
    }
  ];

  for (const rd of rideDeals) {
    await prisma.rideDeal.upsert({
      where: { id: rd.id },
      update: rd,
      create: rd
    });
  }

  // 6. Skincare Deals
  console.log('6. Seeding Skincare Deals...');
  const skincareDeals = [
    {
      id: 'sd-1',
      title: 'Niacinamide 10% Serum',
      brand: 'Choice Legacy',
      bestPrice: 850,
      originalPrice: 1200,
      savings: 350,
      tag: 'Skin Care Deal',
      image: '/assets/skincare.jpg',
      rating: 4.9,
      reviewsCount: 2310,
      description: 'Pure Niacinamide + Zinc serum for skin brightening and oil control.'
    },
    {
      id: 'sd-2',
      title: 'CeraVe Hydrating Facial Cleanser 236ml',
      brand: 'Kirei Beauty BD',
      bestPrice: 1350,
      originalPrice: 1800,
      savings: 450,
      tag: 'Gentle Cleanser',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviewsCount: 1540,
      description: 'Non-foaming hydrating cleanser with essential ceramides.'
    }
  ];

  for (const sd of skincareDeals) {
    await prisma.skincareDeal.upsert({
      where: { id: sd.id },
      update: sd,
      create: sd
    });
  }

  // 7. Offers (Master / Platform Offers)
  console.log('7. Seeding Offers...');
  const offers = [
    { id: 'off-1', platform: 'foodpanda', title: 'Flat 50% off your 1st order', discount: '50%', validTill: '30 Sep 2026', status: 'Active', code: 'YUMPANDA', category: 'Food' },
    { id: 'off-2', platform: 'foodi', title: 'Just Order & Smile 25% OFF', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'FOODI25', category: 'Food' },
    { id: 'off-3', platform: 'pathao_food', title: 'Pathao Food Express 30% OFF', discount: '30%', validTill: '30 Sep 2026', status: 'Active', code: 'PATHAO30', category: 'Food' },
    { id: 'off-4', platform: 'uber', title: '20% off on 3 Rides', discount: '20%', validTill: '30 Sep 2026', status: 'Active', code: 'UBER20', category: 'Rides' },
    { id: 'off-5', platform: 'obhai', title: 'OBHAI 25% OFF on CNG', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'OBHAI25', category: 'Rides' },
    { id: 'off-6', platform: 'indrive', title: 'Set Your Fare 30% OFF', discount: '30%', validTill: '30 Sep 2026', status: 'Active', code: 'INDRIVER30', category: 'Rides' },
    { id: 'off-7', platform: 'choice_legacy', title: '15% Off Niacinamide Serum', discount: '15%', validTill: '30 Sep 2026', status: 'Active', code: 'CHOICE15', category: 'Skincare' },
    { id: 'off-8', platform: 'kirei', title: 'Flat ৳200 OFF CeraVe Cleanser', discount: '৳200', validTill: '30 Sep 2026', status: 'Active', code: 'KIREI200', category: 'Skincare' },
    { id: 'off-9', platform: 'makeup_chari', title: 'Buy 2 Get 1 Free Hydrating Cream', discount: 'B2G1', validTill: '30 Sep 2026', status: 'Active', code: 'MAKEUPFREE', category: 'Skincare' }
  ];

  for (const off of offers) {
    await prisma.offer.upsert({
      where: { id: off.id },
      update: off,
      create: off
    });
  }

  // 8. Coupons
  console.log('8. Seeding Coupons...');
  const coupons = [
    { id: 'c-1', code: 'SAVE10', title: 'Extra 10% OFF Sitewide', platform: 'All Platforms', minOrder: '৳300', expiry: 'Expires in 3 days', category: 'all', bg: '#fff0f5', borderColor: '#ff2b70' },
    { id: 'c-2', code: 'FOOD150', title: 'Flat ৳150 OFF Biryani & Pizza', platform: 'FoodPanda / Pathao Food', minOrder: '৳500', expiry: 'Expires tonight', category: 'food', bg: '#fff7ed', borderColor: '#ff6b4a' },
    { id: 'c-3', code: 'PATHAORIDE', title: '50% OFF First 3 Bike Rides', platform: 'Pathao Rides', minOrder: 'No min order', expiry: 'Valid for new users', category: 'rides', bg: '#ecfdf5', borderColor: '#10b981' },
    { id: 'c-4', code: 'GLOWBEAUTY', title: '৳300 OFF Skincare & Serums', platform: 'Daraz & Beauty BD', minOrder: '৳1,000', expiry: 'Expires tomorrow', category: 'skincare', bg: '#f3e8ff', borderColor: '#a855f7' }
  ];

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { id: coupon.id },
      update: coupon,
      create: coupon
    });
  }

  // 9. Bank Offers
  console.log('9. Seeding Bank Offers...');
  const bankOffers = [
    { id: 'bo-1', bankName: 'BRAC Bank', cardType: 'Credit', offerTitle: '15% Instant Cashback on FoodPanda', discount: '15%', validTill: '31 Oct 2026', code: 'BRACFOOD15', status: 'Active' },
    { id: 'bo-2', bankName: 'City Bank', cardType: 'Visa/Amex', offerTitle: 'Buy 1 Get 1 Free Pizza Deal', discount: 'B1G1', validTill: '15 Oct 2026', code: 'CITYB1G1', status: 'Active' },
    { id: 'bo-3', bankName: 'EBL', cardType: 'Mastercard', offerTitle: '10% OFF on Uber & Pathao Rides', discount: '10%', validTill: '30 Sep 2026', code: 'EBLRIDE10', status: 'Active' }
  ];

  for (const bo of bankOffers) {
    await prisma.bankOffer.upsert({
      where: { id: bo.id },
      update: bo,
      create: bo
    });
  }

  // 10. bKash Offers
  console.log('10. Seeding bKash Offers...');
  const bkashOffers = [
    { id: 'bk-1', title: 'Flat ৳50 Instant Cashback via bKash Payment', discount: '৳50', cashback: '৳50', merchant: 'FoodPanda', code: 'BKASH50', validTill: '30 Sep 2026', status: 'Active' },
    { id: 'bk-2', title: '20% Cashback on Pathao Rides', discount: '20%', cashback: 'Up to ৳100', merchant: 'Pathao', code: 'BKASHRIDE', validTill: '25 Sep 2026', status: 'Active' }
  ];

  for (const bk of bkashOffers) {
    await prisma.bkashOffer.upsert({
      where: { id: bk.id },
      update: bk,
      create: bk
    });
  }

  // 11. Nagad Offers
  console.log('11. Seeding Nagad Offers...');
  const nagadOffers = [
    { id: 'ng-1', title: '12% Mega Cashback on Daraz Skincare', discount: '12%', cashback: 'Up to ৳300', merchant: 'Daraz BD', code: 'NAGAD12', validTill: '30 Sep 2026', status: 'Active' },
    { id: 'ng-2', title: 'Flat ৳40 Cashback on OBHAI CNG Rides', discount: '৳40', cashback: '৳40', merchant: 'OBHAI', code: 'NAGADCNG', validTill: '28 Sep 2026', status: 'Active' }
  ];

  for (const ng of nagadOffers) {
    await prisma.nagadOffer.upsert({
      where: { id: ng.id },
      update: ng,
      create: ng
    });
  }

  // 12. Rocket Offers
  console.log('12. Seeding Rocket Offers...');
  const rocketOffers = [
    { id: 'rk-1', title: '10% Extra Discount on Foodi App', discount: '10%', cashback: 'Up to ৳80', merchant: 'Foodi', code: 'ROCKETFOOD', validTill: '30 Sep 2026', status: 'Active' }
  ];

  for (const rk of rocketOffers) {
    await prisma.rocketOffer.upsert({
      where: { id: rk.id },
      update: rk,
      create: rk
    });
  }

  // 13. Saved Deals
  console.log('13. Seeding Saved Deals...');
  await prisma.savedDeal.deleteMany({});
  await prisma.savedDeal.createMany({
    data: [
      { id: 'sd-user-1', userId: 'usr-nusrat', dealId: 'fd-1', category: 'food', title: 'Kacchi Biryani Half', price: 195, image: '/assets/biryani.jpg' },
      { id: 'sd-user-2', userId: 'usr-nusrat', dealId: 'sd-1', category: 'skincare', title: 'Niacinamide 10% Serum', price: 850, image: '/assets/skincare.jpg' },
      { id: 'sd-user-3', userId: 'usr-tanvir', dealId: 'rd-1', category: 'rides', title: 'Dhanmondi to Gulshan Ride', price: 175, image: '/assets/blue_car.jpg' }
    ]
  });

  // 14. Price Alerts
  console.log('14. Seeding Price Alerts...');
  await prisma.priceAlert.deleteMany({});
  await prisma.priceAlert.createMany({
    data: [
      { id: 'pa-1', userId: 'usr-nusrat', dealId: 'sd-1', title: 'Niacinamide Serum drop below ৳800', targetPrice: 800, channel: 'WhatsApp', status: 'Active' },
      { id: 'pa-2', userId: 'usr-tanvir', dealId: 'rd-1', title: 'Gulshan Ride drop below ৳150', targetPrice: 150, channel: 'Email', status: 'Active' }
    ]
  });

  // 15. Complaints
  console.log('15. Seeding Complaints...');
  await prisma.complaint.deleteMany({});
  await prisma.complaint.createMany({
    data: [
      { id: 'cmp-1', userId: 'usr-nusrat', title: 'Fake product advertised', subCategory: 'Skincare', status: 'Open', date: '12 Sep 2026', details: 'Advertised 20% discount was rejected at store checkout.' },
      { id: 'cmp-2', userId: 'usr-nusrat', title: 'Wrong discount code', subCategory: 'Food', status: 'Resolved', date: '05 Sep 2026', details: 'Promo code FOOD150 showed invalid status.' },
      { id: 'cmp-3', userId: 'usr-samiha', title: 'Payment failed twice on bKash', subCategory: 'Wallet', status: 'Under Review', date: '10 Sep 2026', details: 'bKash debited money but offer voucher failed.' }
    ]
  });

  // 16. Reviews
  console.log('16. Seeding Reviews...');
  await prisma.review.deleteMany({});
  await prisma.review.createMany({
    data: [
      { id: 'rv-1', userId: 'usr-nusrat', dealId: 'fd-1', category: 'food', rating: 5, comment: 'Sultan Dine Kacchi Biryani best price via OfferMatrix!' },
      { id: 'rv-2', userId: 'usr-tanvir', dealId: 'rd-1', category: 'rides', rating: 5, comment: 'Saved ৳35 on Gulshan trip using Obhai rate comparison.' }
    ]
  });

  // 17. Notifications
  console.log('17. Seeding Notifications...');
  await prisma.notification.deleteMany({});
  await prisma.notification.createMany({
    data: [
      { id: 'nt-1', userId: 'usr-nusrat', title: 'Price Alert Triggered! ⚡', message: 'Niacinamide Serum is now available for ৳850!', type: 'alert', isRead: false },
      { id: 'nt-2', userId: 'usr-nusrat', title: 'Welcome to OfferMatrix Pro Pass 🚀', message: 'Your Pro subscription is active until Sep 2027.', type: 'system', isRead: true }
    ]
  });

  // 18. Admin Audit Logs
  console.log('18. Seeding Admin Audit Logs...');
  await prisma.adminAuditLog.deleteMany({});
  await prisma.adminAuditLog.createMany({
    data: [
      { id: 'log-1', adminId: 'usr-admin', action: 'Approved Merchant Kirei Beauty', target: 'Merchants', details: 'Verified trade license and active catalog.', date: 'Today, 04:15 PM', color: '#10b981' },
      { id: 'log-2', adminId: 'usr-admin', action: 'Suspended User Rafi Ahmed', target: 'Users', details: 'Multiple abusive support messages logged.', date: '05 Sep 2026, 03:00 PM', color: '#ef4444' },
      { id: 'log-3', adminId: 'usr-admin', action: 'Created Coupon SAVE10', target: 'Coupons', details: '10% sitewide promotional voucher added.', date: '01 Sep 2026, 10:00 AM', color: '#3b82f6' }
    ]
  });

  console.log('✨ Full 18-Table Database Seeding Completed Successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Database seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
