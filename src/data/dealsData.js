export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles', color: '#6366f1' },
  { id: 'food', name: 'Food', icon: 'Utensils', color: '#ff6b4a', bg: '#fef2f2' },
  { id: 'rides', name: 'Rides', icon: 'Car', color: '#10b981', bg: '#ecfdf5' },
  { id: 'skincare', name: 'Skin Care', icon: 'Sparkle', color: '#a855f7', bg: '#f3e8ff' },
  { id: 'coupons', name: 'Coupons', icon: 'Ticket', color: '#eab308', bg: '#fefce8' },
  { id: 'deals', name: 'Flash Deals', icon: 'Flame', color: '#ef4444', bg: '#fff1f2' },
  { id: 'subscription', name: 'Premium Pass', icon: 'Crown', color: '#8b5cf6', bg: '#f3e8ff' }
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Free Explorer',
    badge: 'STARTER',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for casual deal hunters exploring prices across Bangladesh.',
    features: [
      'Real-time price comparison on Food & Rides',
      'Save up to 5 deals in personal watchlist',
      'Access to standard promo codes & coupons',
      'Basic search & category filtering'
    ],
    ctaText: 'Current Plan',
    highlight: false,
    color: '#6b7280'
  },
  {
    id: 'pro',
    name: 'OfferMatrix Pro Pass',
    badge: '🔥 MOST POPULAR',
    monthlyPrice: 199,
    yearlyPrice: 1890,
    savingsText: 'Save ৳498 / year',
    description: 'Designed for frequent foodies and daily commuters looking to maximize savings.',
    features: [
      'Everything in Free Explorer, plus:',
      'Extra 10% Instant Cashback on Food & Rides',
      'Zero Delivery Fees on FoodPanda & Pathao',
      'Unlimited Saved Watchlist & Deal Alerts',
      'Exclusive VIP Coupon Vouchers (SAVE15)',
      'Priority Fare Matching Algorithm'
    ],
    ctaText: 'Upgrade to Pro ⚡',
    highlight: true,
    color: '#ff2b70'
  },
  {
    id: 'vip',
    name: 'VIP Matrix Membership',
    badge: '👑 VIP BEST VALUE',
    monthlyPrice: 499,
    yearlyPrice: 4790,
    savingsText: 'Save ৳1,198 / year',
    description: 'Ultimate savings experience with concierge assistance & premium partner perks.',
    features: [
      'Everything in Pro Pass, plus:',
      'Flat 15% Instant Discount on All Categories',
      'Priority Driver Assignment on Rides',
      'Early 2-Hour Access to Limited Flash Deals',
      'Dedicated 24/7 WhatsApp Concierge Support',
      'Free Monthly Skincare Sample Box'
    ],
    ctaText: 'Get VIP Access 🚀',
    highlight: false,
    color: '#8b5cf6'
  }
];

export const HERO_FEATURED_DEALS = {
  bestFoodDeal: {
    id: 'hero-food-1',
    badge: '🔥 Best Food Deal',
    title: 'Chicken Biryani',
    subtitle: 'Best total price',
    category: 'food',
    bestPrice: 195,
    originalPrice: 260,
    savings: 65,
    savingsBadgeColor: 'orange',
    image: '/assets/biryani.jpg',
    providers: [
      { name: 'FoodPanda', price: 195, time: '20-30 min', isBest: true, color: '#d70f64' },
      { name: 'HungryNaki', price: 210, time: '25-30 min', isBest: false, color: '#ff6b00' },
      { name: 'Pathao Food', price: 220, time: '30-40 min', isBest: false, color: '#e21b24' }
    ],
    description: 'Authentic Bangladeshi Kacchi/Chicken Biryani made with aromatic basmati rice, succulent chicken pieces, and traditional spices.'
  },
  cheapestRide: {
    id: 'hero-ride-1',
    badge: '🚗 Cheapest Ride',
    route: 'Dhanmondi ➔ Gulshan',
    subtitle: 'Compare & Save More',
    category: 'rides',
    cheapestPrice: 175,
    savings: 35,
    savingsBadgeColor: 'green',
    image: '/assets/blue_car.jpg',
    providers: [
      { name: 'Pathao', price: 185, time: '18 min', isCheapest: false },
      { name: 'Uber', price: 210, time: '16 min', isCheapest: false },
      { name: 'Shohoz', price: 175, time: '21 min', isCheapest: true }
    ],
    description: 'Real-time fare comparison for cars and bikes from Dhanmondi to Gulshan area.'
  },
  skincareDeal: {
    id: 'hero-skin-1',
    badge: '✨ Skin Care Deal',
    title: 'Niacinamide 10%',
    subtitle: 'Best price',
    category: 'skincare',
    bestPrice: 850,
    originalPrice: 1200,
    savings: 350,
    savingsBadgeColor: 'purple',
    image: '/assets/skincare.jpg',
    providers: [
      { name: 'Daraz', price: 850, isBest: true },
      { name: 'Beauty.com.bd', price: 890, isBest: false },
      { name: 'Pickaboo', price: 950, isBest: false }
    ],
    description: 'Pure 10% Niacinamide + Zinc 1% serum for skin brightening, pore reduction, and oil balance control.'
  }
};

export const ALL_DEALS = [
  {
    id: 'deal-1',
    title: 'Chicken Biryani',
    category: 'food',
    bestPrice: 195,
    originalPrice: 260,
    savings: 65,
    tag: 'Best Food Deal',
    image: '/assets/biryani.jpg',
    providers: [
      { name: 'FoodPanda', price: 195, time: '20-30 min', isBest: true },
      { name: 'HungryNaki', price: 210, time: '25-30 min' },
      { name: 'Pathao Food', price: 220, time: '30-40 min' }
    ],
    rating: 4.9,
    reviewsCount: 1420
  },
  {
    id: 'deal-2',
    title: 'Dhanmondi to Gulshan Ride',
    category: 'rides',
    bestPrice: 175,
    originalPrice: 210,
    savings: 35,
    tag: 'Cheapest Ride',
    image: '/assets/blue_car.jpg',
    providers: [
      { name: 'Shohoz', price: 175, time: '21 min', isBest: true },
      { name: 'Pathao', price: 185, time: '18 min' },
      { name: 'Uber', price: 210, time: '16 min' }
    ],
    rating: 4.8,
    reviewsCount: 890
  },
  {
    id: 'deal-3',
    title: 'Niacinamide 10% Serum',
    category: 'skincare',
    bestPrice: 850,
    originalPrice: 1200,
    savings: 350,
    tag: 'Skin Care Deal',
    image: '/assets/skincare.jpg',
    providers: [
      { name: 'Daraz', price: 850, isBest: true },
      { name: 'Beauty.com.bd', price: 890 },
      { name: 'Pickaboo', price: 950 }
    ],
    rating: 4.9,
    reviewsCount: 2310
  },
  {
    id: 'deal-4',
    title: 'Uttara to Banani Bike Ride',
    category: 'rides',
    bestPrice: 95,
    originalPrice: 140,
    savings: 45,
    tag: 'Express Bike',
    image: '/assets/blue_car.jpg',
    providers: [
      { name: 'Pathao Bike', price: 95, time: '12 min', isBest: true },
      { name: 'Uber Moto', price: 110, time: '10 min' },
      { name: 'Shohoz Bike', price: 120, time: '15 min' }
    ],
    rating: 4.7,
    reviewsCount: 540
  },
  {
    id: 'deal-5',
    title: 'Cheesy Pepperoni Pizza (Large)',
    category: 'food',
    bestPrice: 650,
    originalPrice: 890,
    savings: 240,
    tag: 'Super Saver Pizza',
    image: '/assets/pizza.jpg',
    providers: [
      { name: 'FoodPanda', price: 650, time: '30-40 min', isBest: true },
      { name: 'Pizza Hut Direct', price: 720, time: '35-45 min' },
      { name: 'Pathao Food', price: 750, time: '35-50 min' }
    ],
    rating: 4.8,
    reviewsCount: 1120
  },
  {
    id: 'deal-9',
    title: 'Smokey Gourmet Beef Burger Combo',
    category: 'food',
    bestPrice: 380,
    originalPrice: 520,
    savings: 140,
    tag: 'Juicy Burger Deal',
    image: '/assets/burger.jpg',
    providers: [
      { name: 'Takeout FoodPanda', price: 380, time: '25-35 min', isBest: true },
      { name: 'HungryNaki', price: 410, time: '30-40 min' },
      { name: 'Pathao Food', price: 430, time: '30-45 min' }
    ],
    rating: 4.9,
    reviewsCount: 980
  },
  {
    id: 'deal-6',
    title: 'HYALURONIC ACID Hydrating Cream',
    category: 'skincare',
    bestPrice: 1100,
    originalPrice: 1550,
    savings: 450,
    tag: 'Top Glow Product',
    image: '/assets/cream.jpg',
    providers: [
      { name: 'Beauty.com.bd', price: 1100, isBest: true },
      { name: 'Daraz Mall', price: 1250 },
      { name: 'Chaldal Secret', price: 1300 }
    ],
    rating: 4.9,
    reviewsCount: 670
  },
  {
    id: 'deal-10',
    title: 'CeraVe Hydrating Facial Cleanser 236ml',
    category: 'skincare',
    bestPrice: 1350,
    originalPrice: 1800,
    savings: 450,
    tag: 'Gentle Cleanser',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    providers: [
      { name: 'Choice Legacy', price: 1350, isBest: true },
      { name: 'Kirei BD', price: 1420 },
      { name: 'Daraz Mall', price: 1500 }
    ],
    rating: 4.9,
    reviewsCount: 1540
  },
  {
    id: 'deal-7',
    title: 'Flat ৳150 Off Food orders over ৳500',
    category: 'coupons',
    bestPrice: 0,
    originalPrice: 150,
    savings: 150,
    tag: 'Coupon Voucher',
    code: 'FOOD150',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80',
    providers: [
      { name: 'FoodPanda Code', price: 0, code: 'FOOD150', isBest: true },
      { name: 'Pathao Code', price: 0, code: 'PATHAOFOOD' }
    ],
    rating: 5.0,
    reviewsCount: 3400
  },
  {
    id: 'deal-8',
    title: 'Dhaka to Chittagong AC Bus Ticket',
    category: 'rides',
    bestPrice: 1200,
    originalPrice: 1500,
    savings: 300,
    tag: 'Intercity Travel',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    providers: [
      { name: 'Shohoz Tickets', price: 1200, isBest: true },
      { name: 'BusBD', price: 1350 },
      { name: 'GreenLine App', price: 1450 }
    ],
    rating: 4.8,
    reviewsCount: 780
  }
];

export const FLASH_DEALS = [
  {
    id: 'flash-1',
    title: 'Kacchi Biryani + Borhani Combo',
    store: 'Sultan\'s Dine',
    category: 'food',
    bestPrice: 280,
    originalPrice: 420,
    savings: 140,
    discountPercent: '33%',
    image: '/assets/biryani.jpg',
    claimProgress: 78,
    timeLeft: '02h : 15m : 40s',
    providers: [
      { name: 'FoodPanda Flash', price: 280, isBest: true }
    ]
  },
  {
    id: 'flash-2',
    title: 'Gulshan to Airport Car Ride',
    store: 'Uber Premier',
    category: 'rides',
    bestPrice: 240,
    originalPrice: 360,
    savings: 120,
    discountPercent: '33%',
    image: '/assets/blue_car.jpg',
    claimProgress: 91,
    timeLeft: '00h : 42m : 10s',
    providers: [
      { name: 'Uber Flash Offer', price: 240, isBest: true }
    ]
  },
  {
    id: 'flash-3',
    title: 'CeraVe Foaming Facial Cleanser 236ml',
    store: 'Kirei Beauty BD',
    category: 'skincare',
    bestPrice: 1250,
    originalPrice: 1850,
    savings: 600,
    discountPercent: '32%',
    image: '/assets/skincare.jpg',
    claimProgress: 64,
    timeLeft: '04h : 55m : 00s',
    providers: [
      { name: 'Choice Legacy', price: 1250, isBest: true }
    ]
  }
];

export const COUPONS_LIST = [
  {
    id: 'c-1',
    code: 'SAVE10',
    title: 'Extra 10% OFF Sitewide',
    platform: 'All Platforms',
    minOrder: '৳300',
    expiry: 'Expires in 3 days',
    category: 'all',
    bg: '#fff0f5',
    borderColor: '#ff2b70'
  },
  {
    id: 'c-2',
    code: 'FOOD150',
    title: 'Flat ৳150 OFF Biryani & Pizza',
    platform: 'FoodPanda / Pathao Food',
    minOrder: '৳500',
    expiry: 'Expires tonight',
    category: 'food',
    bg: '#fff7ed',
    borderColor: '#ff6b4a'
  },
  {
    id: 'c-3',
    code: 'PATHAORIDE',
    title: '50% OFF First 3 Bike Rides',
    platform: 'Pathao Rides',
    minOrder: 'No min order',
    expiry: 'Valid for new users',
    category: 'rides',
    bg: '#ecfdf5',
    borderColor: '#10b981'
  },
  {
    id: 'c-4',
    code: 'GLOWBEAUTY',
    title: '৳300 OFF Skincare & Serums',
    platform: 'Daraz & Beauty BD',
    minOrder: '৳1,000',
    expiry: 'Expires tomorrow',
    category: 'skincare',
    bg: '#f3e8ff',
    borderColor: '#a855f7'
  }
];

export const POPULAR_SEARCHES = [
  'Chicken Biryani',
  'Ride to Gulshan',
  'Niacinamide Serum',
  'Dhaka → Chittagong'
];

