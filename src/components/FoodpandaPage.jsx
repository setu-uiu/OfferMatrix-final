import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Search, ShoppingBag, User, Heart, Star, ChevronLeft, ChevronRight,
  Clock, MapPin, Globe, X, MessageCircle, Send, Sparkles, Percent, Tag, ShieldCheck, Check
} from 'lucide-react';

export default function FoodpandaPage({ onBack, onToast, onAddToCart, offers = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('relevance'); // 'relevance', 'fastest', 'distance', 'rating'
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [activeNavTab, setActiveNavTab] = useState('delivery'); // 'delivery', 'pickup', 'pandamart', 'shops'
  const [showQrBox, setShowQrBox] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState(['fp-1', 'fp-3']);

  // Live Timer for Promo Banner
  const [timeLeft, setTimeLeft] = useState({ mins: 44, secs: 57 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { mins: prev.mins - 1, secs: 59 };
        return { mins: 45, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // AI Food Assistant Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 🐼 Welcome to foodpanda AI Assistant! Ask me about top deals, best biryani, fast delivery, or coupon codes like YUMPANDA!",
      time: 'Just now'
    }
  ]);

  // Vouchers Data
  const vouchers = [
    {
      id: 'v-1',
      code: 'YUMPANDA',
      title: 'Flat 50% off your 1st order',
      badge: 'Free delivery',
      bg: 'linear-gradient(135deg, #d70f64, #ff2b70)',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'v-2',
      code: 'DEALNAD',
      title: 'Flat 50% off your 1st order',
      badge: 'Free delivery',
      bg: 'linear-gradient(135deg, #d70f64, #e11d48)',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'v-3',
      code: 'BKASHNC200',
      title: 'Tk. 200 off your first feast',
      badge: 'bKash Exclusive',
      bg: 'linear-gradient(135deg, #e11d48, #be123c)',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'v-4',
      code: 'CROWDFAV25',
      title: 'best seller Flat 25% off',
      badge: 'Crowd faves',
      bg: 'linear-gradient(135deg, #d70f64, #f43f5e)',
      img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Featured Promo Slider Restaurants
  const promoRestaurants = [
    {
      id: 'fp-p1',
      name: 'Chunk – Banani',
      rating: 4.9,
      reviews: '100+',
      time: '25 min',
      priceLevel: '৳৳',
      cuisine: 'Fast Food',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'fp-p2',
      name: 'Lunch Mafia – Gulshan',
      rating: 4.5,
      reviews: '3000+',
      time: '15 min',
      priceLevel: '৳৳',
      cuisine: 'Rice Dishes',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'fp-p3',
      name: 'The Chinese fusion',
      rating: 4.2,
      reviews: '500+',
      time: '20 min',
      priceLevel: '৳',
      cuisine: 'Chinese',
      img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'fp-p4',
      name: 'The Clays BD',
      rating: 4.6,
      reviews: '100+',
      time: '10 min',
      priceLevel: '৳৳৳',
      cuisine: 'Middle Eastern',
      img: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=500&q=80'
    }
  ];

  // All Restaurants Data (Matching Screenshots 1, 2, 3)
  const restaurants = [
    {
      id: 'fp-1',
      name: 'Lunch Mafia – Gulshan',
      rating: 4.5,
      reviews: '3000+',
      time: '15 min',
      priceLevel: '৳৳',
      cuisine: 'Rice Dishes',
      deliveryFee: 'Tk 55 Free for first order',
      discount: '10% off',
      isAd: true,
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      price: 280
    },
    {
      id: 'fp-2',
      name: 'Chaap Ghor – Banani',
      rating: 4.5,
      reviews: '100+',
      time: '15 min',
      priceLevel: '৳৳',
      cuisine: 'Kebab',
      deliveryFee: 'Tk 52 Free for first order',
      discount: 'Up to 25% off',
      isAd: true,
      img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      price: 340
    },
    {
      id: 'fp-3',
      name: 'Pizzaburg – Gulshan',
      rating: 4.8,
      reviews: '10000+',
      time: '35 min',
      priceLevel: '৳৳',
      cuisine: 'Pizza',
      deliveryFee: 'Tk 59 Free for first order',
      discount: 'Price Match',
      isAd: true,
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      price: 499
    },
    {
      id: 'fp-4',
      name: 'Takeout Burgers – Banani',
      rating: 4.7,
      reviews: '5000+',
      time: '20 min',
      priceLevel: '৳৳',
      cuisine: 'Burgers',
      deliveryFee: 'Free delivery',
      discount: '15% off',
      isAd: false,
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      price: 320
    },
    {
      id: 'fp-5',
      name: 'Steak Away – Gulshan',
      rating: 4.6,
      reviews: '1200+',
      time: '25 min',
      priceLevel: '৳৳৳',
      cuisine: 'Steaks',
      deliveryFee: 'Free delivery over ৳500',
      discount: '20% off',
      isAd: true,
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      price: 750
    },
    {
      id: 'fp-6',
      name: 'Kacchi Bhai – Dhanmondi',
      rating: 4.9,
      reviews: '8000+',
      time: '20 min',
      priceLevel: '৳৳',
      cuisine: 'Biryani',
      deliveryFee: 'Free delivery',
      discount: 'Flat 50% off',
      isAd: false,
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      price: 380
    }
  ];

  // Favourite Cuisines Categories
  const favouriteCuisines = [
    { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80' },
    { name: 'Biryani', img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80' },
    { name: 'Burgers', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
    { name: 'Chicken', img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80' },
    { name: 'Asian', img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Desserts', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80' },
    { name: 'Pasta', img: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=300&q=80' },
    { name: 'Beverages', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80' }
  ];

  // Filtering Logic
  const filteredRestaurants = restaurants.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || res.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || res.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    return matchesSearch && matchesCuisine;
  }).sort((a, b) => {
    if (selectedSort === 'rating') return b.rating - a.rating;
    if (selectedSort === 'fastest') return parseInt(a.time) - parseInt(b.time);
    return 0;
  });

  const toggleFavorite = (id) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(favId => favId !== id));
      onToast('Removed from foodpanda favourites ♡');
    } else {
      setFavoriteIds([...favoriteIds, id]);
      onToast('Saved to foodpanda favourites ❤️');
    }
  };

  // AI Chat Handler
  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('biryani') || lower.includes('kacchi') || lower.includes('lunch')) {
        botReply = "🍛 **Top Biryani Deals**: Check out **Lunch Mafia – Gulshan** (★4.5, 15 min delivery) or **Kacchi Bhai** with Flat 50% OFF using coupon `YUMPANDA`!";
      } else if (lower.includes('burger') || lower.includes('pizza')) {
        botReply = "🍔 **Burgers & Pizza**: We recommend **Takeout Burgers – Banani** (15% OFF) and **Pizzaburg – Gulshan** (★4.8, 35 min delivery)!";
      } else if (lower.includes('code') || lower.includes('coupon') || lower.includes('voucher') || lower.includes('discount')) {
        botReply = "🎉 **Foodpanda Promo Codes**:\n• `YUMPANDA`: 50% OFF 1st Order + Free Delivery\n• `BKASHNC200`: Flat ৳200 OFF via bKash\n• `DEALNAD`: 50% OFF First Order!";
      } else if (lower.includes('ship') || lower.includes('deliver') || lower.includes('fee')) {
        botReply = "🛵 **Delivery Info**: Delivery fees start at ৳52 with Free Delivery on orders over ৳250 using voucher `YUMPANDA`!";
      } else {
        botReply = `Thanks for asking foodpanda AI! For "${query}", try exploring top restaurants like Lunch Mafia, Chaap Ghor, or Pizzaburg. Use coupon YUMPANDA for 50% OFF!`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', fontFamily: "'Open Sans', 'Inter', sans-serif", color: '#333333' }}>
      
      {/* Top Floating Back to OfferMatrix Bar */}
      <div style={{ background: '#111827', color: '#ffffff', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10000, position: 'sticky', top: 0 }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #d70f64, #ff2b70)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '99px',
            padding: '7px 18px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(215, 15, 100, 0.3)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to OfferMatrix</span>
        </button>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#f3f4f6' }}>
          🐼 foodpanda Bangladesh Partner Platform • Instant Food Delivery
        </div>

        <button
          onClick={() => onToast('foodpanda Support: 16267')}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px', padding: '4px 12px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
        >
          Helpline: 16267
        </button>
      </div>

      {/* Main Foodpanda Header (Matching Screenshot 1 & 2) */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e8e8e8', position: 'sticky', top: '41px', zIndex: 9000 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* Foodpanda Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setSelectedCuisine('all')}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#d70f64', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '22px' }}>
              🐼
            </div>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#d70f64', letterSpacing: '-0.5px', fontFamily: "'Outfit', sans-serif" }}>
              foodpanda
            </span>
          </div>

          {/* Location Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#333', cursor: 'pointer', background: '#f7f7f7', padding: '8px 14px', borderRadius: '99px', border: '1px solid #eee' }} onClick={() => onToast('Location updated to Dhaka, Bangladesh')}>
            <MapPin size={16} color="#d70f64" />
            <span style={{ fontWeight: 600 }}>New address</span>
            <span style={{ color: '#707070', fontWeight: 700 }}>Select your address</span>
          </div>

          {/* Search Input Bar */}
          <div style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
            <Search size={18} color="#707070" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, and dishes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: '99px',
                border: '1px solid #e0e0e0',
                background: '#f7f7f7',
                fontSize: '13.5px',
                outline: 'none',
                color: '#333'
              }}
            />
          </div>

          {/* User & Action Options */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 700, color: '#333', cursor: 'pointer' }} onClick={() => onToast('Opened Profile settings')}>
              <User size={18} color="#333" />
              <span>Meherunnesa</span>
              <span style={{ fontSize: '11px' }}>▼</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#333', cursor: 'pointer' }} onClick={() => onToast('Language set to English (EN)')}>
              <Globe size={16} color="#333" />
              <span>EN</span>
              <span style={{ fontSize: '11px' }}>▼</span>
            </div>

            <Heart size={20} color="#333" style={{ cursor: 'pointer' }} onClick={() => onToast(`You have ${favoriteIds.length} saved favourite restaurants`)} />

            <div 
              onClick={() => onToast('Opened Foodpanda Basket')} 
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}
            >
              <ShoppingBag size={18} color="#333" />
            </div>
          </div>
        </div>

        {/* Navigation Category Ribbon */}
        <div style={{ borderTop: '1px solid #f0f0f0', padding: '0 24px', background: '#ffffff' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', gap: '32px' }}>
            {[
              { id: 'delivery', label: 'Delivery', icon: '🛵' },
              { id: 'pickup', label: 'Pick-up', icon: '🚶' },
              { id: 'pandamart', label: 'pandamart', icon: '🛍️' },
              { id: 'shops', label: 'Shops', icon: '🏪' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveNavTab(tab.id);
                  onToast(`Switched to Foodpanda ${tab.label}`);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 4px',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: activeNavTab === tab.id ? '#d70f64' : '#707070',
                  borderBottom: activeNavTab === tab.id ? '3px solid #d70f64' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout Container */}
      <div style={{ maxWidth: '1440px', margin: '24px auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '28px' }}>

        {/* LEFT COLUMN: QR Box & Filters Sidebar (Matching Screenshots 1, 2, 3) */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* QR Code App Download Box */}
          {showQrBox && (
            <div style={{ background: '#25292e', color: '#ffffff', borderRadius: '16px', padding: '20px 16px', position: 'relative', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
              <button
                onClick={() => setShowQrBox(false)}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>

              {/* QR Graphic */}
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '16px', display: 'inline-block', marginBottom: '14px' }}>
                <div style={{ width: '100px', height: '100px', background: '#000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {/* Simulated QR Pattern */}
                  <div style={{ position: 'absolute', width: '28px', height: '28px', background: '#d70f64', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px' }}>
                    🐼
                  </div>
                  <div style={{ width: '80px', height: '80px', border: '3px dashed #fff', borderRadius: '4px' }}></div>
                </div>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 14px 0', lineHeight: 1.3 }}>
                Unlock more app-only deals. Download now.
              </h4>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button 
                  onClick={() => onToast('Redirecting to iOS App Store...')}
                  style={{ background: '#ffffff', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span> App Store</span>
                </button>
                <button 
                  onClick={() => onToast('Redirecting to Google Play Store...')}
                  style={{ background: '#ffffff', color: '#000', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>▶ Play Store</span>
                </button>
              </div>
            </div>
          )}

          {/* Filter Card */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #eaeaea', boxShadow: '0 4px 14px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 16px 0' }}>
              Filters
            </h3>

            {/* Sort Options */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#707070', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Sort by
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'relevance', label: 'Relevance' },
                  { id: 'fastest', label: 'Fastest delivery' },
                  { id: 'distance', label: 'Distance' },
                  { id: 'rating', label: 'Rating' }
                ].map((sort) => (
                  <label key={sort.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#333', cursor: 'pointer', fontWeight: selectedSort === sort.id ? 700 : 500 }}>
                    <input
                      type="radio"
                      name="sortOption"
                      checked={selectedSort === sort.id}
                      onChange={() => setSelectedSort(sort.id)}
                      style={{ accentColor: '#d70f64' }}
                    />
                    <span>{sort.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cuisine Quick Filter Chips */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#707070', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Cuisine
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['All Cuisines', 'Biryani', 'Burgers', 'Pizza', 'Chinese', 'Kebab', 'Fast Food'].map((cui, idx) => {
                  const key = cui === 'All Cuisines' ? 'all' : cui;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedCuisine(key)}
                      style={{
                        textAlign: 'left',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: selectedCuisine === key ? '#ffe4ec' : '#f7f7f7',
                        color: selectedCuisine === key ? '#d70f64' : '#333',
                        fontWeight: selectedCuisine === key ? 800 : 600,
                        fontSize: '13px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {cui}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Promo Banners, Cuisines, Daily Deals & All Restaurants */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>

          {/* SECTION 1: Get 25% OFF Promo Carousel Banner (Matching Screenshot 1) */}
          <section style={{ background: '#ffe4ec', borderRadius: '24px', padding: '24px 28px', position: 'relative', border: '1px solid #fecdd3' }}>
            
            {/* Header text + Timer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', margin: '0 0 4px 0' }}>
                  Get 25% off
                </h2>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                  Max. discount Tk 190, Min. order Tk 250
                </div>
              </div>

              {/* Countdown Timer */}
              <div style={{ background: '#d70f64', color: '#ffffff', padding: '6px 14px', borderRadius: '8px', fontWeight: 900, fontSize: '14px' }}>
                {String(timeLeft.mins).padStart(2, '0')}:{String(timeLeft.secs).padStart(2, '0')}
              </div>
            </div>

            {/* 4 Promo Restaurant Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', position: 'relative' }}>
              {promoRestaurants.map((res) => (
                <div
                  key={res.id}
                  onClick={() => onToast(`Opened "${res.name}" menu`)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <div style={{ width: '100%', height: '130px', overflow: 'hidden' }}>
                    <img src={res.img} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {res.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#d70f64', fontWeight: 800, marginBottom: '4px' }}>
                      <Star size={13} fill="#d70f64" color="#d70f64" />
                      <span>{res.rating} ({res.reviews})</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      From {res.time} • {res.priceLevel} • {res.cuisine}
                    </div>
                  </div>
                </div>
              ))}

              <button style={{ position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)', width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <ChevronRight size={20} color="#333" />
              </button>
            </div>
          </section>

          {/* SECTION 2: Your favourite cuisines (Matching Screenshot 1) */}
          <section>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', margin: '0 0 20px 0' }}>
              Your favourite cuisines
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '16px' }}>
              {favouriteCuisines.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedCuisine(item.name);
                    onToast(`Filtered foodpanda restaurants by ${item.name}`);
                  }}
                  style={{ textAlign: 'center', cursor: 'pointer' }}
                >
                  <div style={{ width: '100%', height: '95px', borderRadius: '16px', overflow: 'hidden', marginBottom: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', border: selectedCuisine === item.name ? '2px solid #d70f64' : '1px solid #eaeaea' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Your daily deals (Matching Screenshot 2) */}
          <section>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', margin: '0 0 20px 0' }}>
              Your daily deals
            </h2>

            {/* Vouchers Row (Connected to Admin Foodpanda) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
              {(offers.length > 0 ? offers : vouchers).map((v, idx) => {
                const voucherCode = v.code || `PANDA${v.id || idx + 1}`;
                const voucherTitle = v.title;
                const voucherBadge = v.discount || v.badge || 'Free Delivery';
                const voucherBg = v.bg || (idx % 2 === 0 ? 'linear-gradient(135deg, #d70f64, #ff2b70)' : 'linear-gradient(135deg, #e11d48, #be123c)');

                return (
                  <div
                    key={v.id || idx}
                    onClick={() => {
                      navigator.clipboard.writeText(voucherCode);
                      onToast(`Coupon code "${voucherCode}" copied! Applied for checkout.`);
                    }}
                    style={{
                      background: voucherBg,
                      color: '#ffffff',
                      borderRadius: '16px',
                      padding: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(215, 15, 100, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: '120px'
                    }}
                  >
                    <div>
                      <span style={{ background: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>
                        {voucherBadge}
                      </span>
                      <h4 style={{ fontSize: '16px', fontWeight: 900, margin: '8px 0 4px 0', lineHeight: 1.2 }}>
                        {voucherTitle}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                      <code style={{ background: '#ffffff', color: '#d70f64', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 900 }}>
                        code {voucherCode}
                      </code>
                      <span style={{ fontSize: '11px', fontWeight: 700 }}>T&amp;Cs apply</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile App Banner (Matching Screenshot 2) */}
            <div style={{
              background: '#ffe4ec',
              borderRadius: '24px',
              padding: '28px 36px',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid #fecdd3'
            }}>
              {/* Left QR */}
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <div style={{ width: '80px', height: '80px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', width: '22px', height: '22px', background: '#d70f64', borderRadius: '50%', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🐼
                  </div>
                </div>
              </div>

              {/* Center Content */}
              <div style={{ flex: 1, padding: '0 28px' }}>
                <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', margin: '0 0 6px 0' }}>
                  Unlock exclusive deals and more in our <span style={{ color: '#d70f64' }}>mobile app</span>
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', fontWeight: 600 }}>
                  Meal for one, fast checkout, food &amp; grocery deals: get it all on foodpanda
                </p>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => onToast('Redirecting to App Store...')}
                    style={{ background: '#ffffff', color: '#000', border: '1px solid #e0e0e0', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
                  >
                     App Store
                  </button>
                  <button 
                    onClick={() => onToast('Redirecting to Play Store...')}
                    style={{ background: '#ffffff', color: '#000', border: '1px solid #e0e0e0', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    ▶ Play Store
                  </button>
                </div>
              </div>

              {/* Right Mascot 3D Pau Pau Panda */}
              <div style={{ fontSize: '72px', filter: 'drop-shadow(0 6px 12px rgba(215,15,100,0.2))' }}>
                🐼🏷️
              </div>
            </div>
          </section>

          {/* SECTION 4: All restaurants Grid (Matching Screenshot 3) */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#1e293b', margin: 0 }}>
                All restaurants
              </h2>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                Showing {filteredRestaurants.length} top restaurants near Dhaka
              </span>
            </div>

            {/* 6 Restaurant Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {filteredRestaurants.map((res) => {
                const isFav = favoriteIds.includes(res.id);
                return (
                  <div
                    key={res.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: '1px solid #eaeaea',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    {/* Top Image + Badges */}
                    <div style={{ position: 'relative', width: '100%', height: '190px' }}>
                      <img src={res.img} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                      {/* Ad Tag */}
                      {res.isAd && (
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.65)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                          Ad
                        </div>
                      )}

                      {/* Heart Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(res.id);
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <Heart size={18} fill={isFav ? '#d70f64' : 'none'} color={isFav ? '#d70f64' : '#64748b'} />
                      </button>
                    </div>

                    {/* Info Body */}
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                            {res.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12.5px', color: '#d70f64', fontWeight: 900 }}>
                            <Star size={14} fill="#d70f64" color="#d70f64" />
                            <span>{res.rating}</span>
                            <span style={{ color: '#707070', fontWeight: 600 }}>({res.reviews})</span>
                          </div>
                        </div>

                        <div style={{ fontSize: '12px', color: '#707070', marginBottom: '8px' }}>
                          From {res.time} • ৳৳ • {res.cuisine}
                        </div>

                        <div style={{ fontSize: '12px', color: '#d70f64', fontWeight: 700, marginBottom: '8px' }}>
                          ৳ {res.deliveryFee}
                        </div>

                        {res.discount && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ffe4ec', color: '#d70f64', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                            <Tag size={12} />
                            <span>{res.discount}</span>
                          </div>
                        )}
                      </div>

                      {/* Add to Basket Action */}
                      <button
                        onClick={() => {
                          onAddToCart({
                            id: res.id,
                            title: `${res.name} Special Meal`,
                            price: res.price,
                            selectedApp: 'Foodpanda',
                            selectedPayment: 'bKash',
                            qty: 1
                          });
                          onToast(`Added "${res.name} Special Meal" (৳${res.price}) to Foodpanda basket! 🛒`);
                        }}
                        style={{
                          marginTop: '14px',
                          width: '100%',
                          padding: '9px',
                          borderRadius: '8px',
                          border: 'none',
                          background: '#d70f64',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        Order Now (৳{res.price})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #eaeaea', padding: '32px 24px', textAlign: 'center', color: '#707070', fontSize: '13px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} foodpanda Bangladesh. Partnered with OfferMatrix.</p>
        </div>
      </footer>

      {/* Floating Pink Foodpanda AI Chatbot Button */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 90000,
          background: 'linear-gradient(135deg, #d70f64, #ff2b70)',
          color: '#ffffff',
          borderRadius: '99px',
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 30px rgba(215, 15, 100, 0.4)',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '20px' }}>🐼</span>
        <span style={{ fontSize: '14px', fontWeight: 900 }}>foodpanda AI</span>
      </div>

      {/* Interactive AI Assistant Modal */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '28px',
            width: '380px',
            height: '520px',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(215, 15, 100, 0.4)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ background: '#d70f64', padding: '14px 18px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                🐼
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900 }}>foodpanda Assistant</h4>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>Live Food &amp; Coupon Advisor</div>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#fff0f5', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? '#d70f64' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#333333',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '13px',
                  lineHeight: 1.4,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <div>{msg.text}</div>
                <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' }}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Chips */}
          <div style={{ padding: '8px 12px', background: '#ffffff', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {['🍛 Best Biryani', '🍔 Burgers & Pizza', '🎟️ YUMPANDA Code', '🛵 Delivery Fee'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  background: '#ffe4ec',
                  color: '#d70f64',
                  border: '1px solid #fecdd3',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ padding: '10px 12px', background: '#ffffff', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Ask foodpanda AI..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 14px',
                borderRadius: '99px',
                border: '1px solid #e0e0e0',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#d70f64',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
