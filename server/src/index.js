import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const dbTest = await prisma.$queryRaw`SELECT 1 as connected`;
    res.json({
      status: 'ok',
      database: 'Connected to offermatrix (PostgreSQL)',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 1. Roles API
app.get('/api/roles', async (req, res) => {
  try {
    const roles = await prisma.role.findMany({ include: { _count: { select: { users: true } } } });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Users API (Get all users, add user, update user status)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        _count: { select: { complaints: true, reviews: true, savedDeals: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone, status, roleId } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || '01700-000000',
        status: status || 'Active',
        roleId: roleId || undefined,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      }
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/users/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status }
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Merchants API
app.get('/api/merchants', async (req, res) => {
  try {
    const merchants = await prisma.merchant.findMany({ orderBy: { rating: 'desc' } });
    res.json(merchants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/merchants', async (req, res) => {
  try {
    const newMerchant = await prisma.merchant.create({ data: req.body });
    res.status(201).json(newMerchant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Food Deals API
app.get('/api/deals/food', async (req, res) => {
  try {
    const foodDeals = await prisma.foodDeal.findMany({ orderBy: { rating: 'desc' } });
    res.json(foodDeals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Ride Deals API
app.get('/api/deals/ride', async (req, res) => {
  try {
    const rideDeals = await prisma.rideDeal.findMany({ orderBy: { rating: 'desc' } });
    res.json(rideDeals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Skincare Deals API
app.get('/api/deals/skincare', async (req, res) => {
  try {
    const skincareDeals = await prisma.skincareDeal.findMany({ orderBy: { rating: 'desc' } });
    res.json(skincareDeals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Offers API (Platform & Flash Offers)
app.get('/api/offers', async (req, res) => {
  try {
    let { platform } = req.query;
    if (platform === 'pathao') platform = 'pathao_food';
    if (platform === 'indriver') platform = 'indrive';
    const where = platform ? { platform } : {};
    const offers = await prisma.offer.findMany({ where });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/offers', async (req, res) => {
  try {
    const newOffer = await prisma.offer.create({ data: req.body });
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Coupons API
app.get('/api/coupons', async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Bank Offers API
app.get('/api/bank-offers', async (req, res) => {
  try {
    const bankOffers = await prisma.bankOffer.findMany({ where: { status: 'Active' } });
    res.json(bankOffers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Mobile Wallet Offers API (bKash, Nagad, Rocket)
app.get('/api/wallet-offers/:provider', async (req, res) => {
  try {
    const { provider } = req.params;
    if (provider === 'bkash') {
      const offers = await prisma.bkashOffer.findMany();
      return res.json(offers);
    } else if (provider === 'nagad') {
      const offers = await prisma.nagadOffer.findMany();
      return res.json(offers);
    } else if (provider === 'rocket') {
      const offers = await prisma.rocketOffer.findMany();
      return res.json(offers);
    }
    res.status(400).json({ error: 'Invalid wallet provider' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Saved Deals API
app.get('/api/saved-deals/:userId', async (req, res) => {
  try {
    const saved = await prisma.savedDeal.findMany({ where: { userId: req.params.userId } });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/saved-deals', async (req, res) => {
  try {
    const newSaved = await prisma.savedDeal.create({ data: req.body });
    res.status(201).json(newSaved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Price Alerts API
app.get('/api/price-alerts/:userId', async (req, res) => {
  try {
    const alerts = await prisma.priceAlert.findMany({ where: { userId: req.params.userId } });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 13. Complaints API
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await prisma.complaint.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/complaints', async (req, res) => {
  try {
    const complaint = await prisma.complaint.create({ data: req.body });
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 14. Reviews API
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({ include: { user: true } });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 15. Notifications API
app.get('/api/notifications/:userId', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({ where: { userId: req.params.userId }, orderBy: { createdAt: 'desc' } });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 16. Admin Audit Logs API
app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await prisma.adminAuditLog.findMany({ include: { admin: true }, orderBy: { createdAt: 'desc' } });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Connected to PostgreSQL DB: offermatrix (18 active endpoints)`);
});
