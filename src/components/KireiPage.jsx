import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Search, ShoppingBag, User, MessageCircle, Phone,
  Sparkles, Send, X, Star, Heart, Clock, ChevronLeft, ChevronRight,
  ShieldCheck, Truck, Percent, Calendar
} from 'lucide-react';

export default function KireiPage({ onBack, onToast, onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Countdown timer state for Hot Deals
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 0,
    mins: 10,
    secs: 34
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // AI Dermatologist Chat Box State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 🌸 Welcome to Kirei Skincare Support & Dermatologist Consultation. How can I assist with your skin concerns today?",
      time: 'Just now'
    }
  ]);

  // Featured Hot Deals Data (Matching Screenshot 5)
  const hotDeals = [
    {
      id: 'kirei-1',
      title: 'Anua 345 Relief Cream 50ml',
      brand: 'Anua',
      discount: '21% OFF',
      discountNum: 21,
      price: 1450,
      oldPrice: 1850,
      rating: 4.9,
      reviewsCount: 42,
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80',
      category: 'skincare'
    },
    {
      id: 'kirei-2',
      title: 'Beauty of Joseon Dynasty Cream 50ml',
      brand: 'Beauty of Joseon',
      discount: '16% OFF',
      discountNum: 16,
      price: 1550,
      oldPrice: 1850,
      rating: 4.8,
      reviewsCount: 38,
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
      category: 'skincare'
    },
    {
      id: 'kirei-3',
      title: 'COSRX BHA Blackhead Power Liquid 100ml',
      brand: 'COSRX',
      discount: '29% OFF',
      discountNum: 29,
      price: 1350,
      oldPrice: 1900,
      rating: 4.9,
      reviewsCount: 56,
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80',
      category: 'skincare'
    },
    {
      id: 'kirei-4',
      title: 'ANUA Heartleaf 77% Soothing Toner 250ml',
      brand: 'Anua',
      discount: '42% OFF',
      discountNum: 42,
      price: 1650,
      oldPrice: 2850,
      rating: 5.0,
      reviewsCount: 64,
      img: 'https://images.unsplash.com/photo-1556228722-d1191e4776e7?auto=format&fit=crop&w=500&q=80',
      category: 'skincare'
    }
  ];

  // AI Chat Response Handler
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

    // Generate intelligent Kirei AI Dermatologist reply
    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('dermatologist') || lower.includes('book') || lower.includes('consult')) {
        botReply = "🩺 **Kirei Dermatologist Consultation**: Our certified dermatologists are available for live online skin checkups! Would you like to schedule a session for Today at 5:00 PM?";
      } else if (lower.includes('acne') || lower.includes('breakout')) {
        botReply = " For acne & breakout relief, our dermatologists recommend **COSRX BHA Blackhead Power Liquid** (৳1,350 - 29% OFF) and **Anua 345 Relief Cream** (৳1,450).";
      } else if (lower.includes('ship') || lower.includes('delivery') || lower.includes('charge')) {
        botReply = "🚚 **Shipping Details**: Free delivery on all orders over ৳1,599 BDT! Flat ৳69 delivery charge nationwide.";
      } else if (lower.includes('j-beauty') || lower.includes('japan') || lower.includes('discount')) {
        botReply = "🎟️ **J-Beauty Exclusive**: Join the J-Beauty Users Group to get an extra 10% OFF on all Japanese Sunscreens & Serums!";
      } else {
        botReply = `Thank you for consulting Kirei! For "${query}", our dermatologists suggest checking our Hot Deals like ANUA Heartleaf 77% Toner (৳1,650) & Beauty of Joseon Dynasty Cream (৳1,550).`;
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
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif", position: 'relative' }}>

      {/* Top Floating Back Button to OfferMatrix */}
      <button
        onClick={onBack}
        style={{
          position: 'fixed',
          top: '16px',
          left: '20px',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '99px',
          padding: '10px 20px',
          fontWeight: 800,
          fontSize: '13.5px',
          boxShadow: '0 6px 20px rgba(16, 185, 129, 0.35)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to OfferMatrix</span>
      </button>

      {/* Kirei Top Header Bar (Matching Screenshots 1, 3, 5) */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9', sticky: 'top', top: 0, zIndex: 1000 }}>
        {/* Row 1: Logo + Search + Support Hotline */}
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>

          {/* Kirei Logo */}
          <div style={{ marginLeft: '170px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={onBack}>
            {/* Origami Red Kirei Icon */}
            <div style={{ width: '38px', height: '38px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L32 16L20 28L8 16L20 4Z" fill="#e11d48" opacity="0.9" />
                <path d="M20 10L28 18L20 26L12 18L20 10Z" fill="#be123c" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Playfair Display', cursive, serif", fontSize: '32px', fontWeight: 800, color: '#1e293b', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
              Kirei
            </span>
          </div>

          {/* Search Input Bar */}
          <div style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 44px 11px 18px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                color: '#1e293b'
              }}
            />
            <Search size={18} color="#475569" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
          </div>

          {/* Support Phone Hotline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={18} color="#1e293b" />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Support</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>+880 966 679 1110</div>
            </div>
          </div>
        </div>

        {/* Row 2: Browse Categories + Navigation Links + Actions */}
        <div style={{ borderTop: '1px solid #f1f5f9', padding: '10px 24px' }}>
          <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Left Category Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', color: '#1e293b', cursor: 'pointer' }}>
              <span>Browse Categories</span>
              <span style={{ fontSize: '12px' }}>▾</span>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {['Home', 'Hot Deals', 'Shop', 'Blogs', 'Contact'].map((nav, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (nav === 'Hot Deals') {
                      const el = document.getElementById('kirei-hot-deals');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onToast(`Navigated to Kirei ${nav}`);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: nav === 'Hot Deals' ? '#e11d48' : '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {nav}
                </button>
              ))}
            </div>

            {/* Right Wishlist, Cart & Profile Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Heart size={20} color="#334155" style={{ cursor: 'pointer' }} onClick={() => onToast('Saved to Kirei wishlist')} />
              <ShoppingBag size={20} color="#334155" style={{ cursor: 'pointer' }} onClick={() => onToast('Opened Kirei cart')} />
              <User size={20} color="#334155" style={{ cursor: 'pointer' }} onClick={() => onToast('Kirei Account Details')} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section: Dermatologist Support (Matching Screenshot 1) */}
      <section style={{ maxWidth: '1340px', margin: '24px auto', padding: '0 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #a5f3fc 0%, #e0f2fe 50%, #bae6fd 100%)',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '360px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '0 60px',
          boxShadow: '0 10px 30px rgba(186, 230, 253, 0.4)'
        }}>
          {/* Left Dermatologist Doctor Graphic */}
          <div style={{ position: 'relative', width: '460px', height: '340px', display: 'flex', alignItems: 'flex-end' }}>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
              alt="Kirei Dermatologist Doctor Consultation"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
            />
          </div>

          {/* Right Hero Text & Action */}
          <div style={{ maxWidth: '500px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#e11d48', margin: '0 0 6px 0', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
              Dermatologist
            </h1>
            <h1 style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a', margin: '0 0 24px 0', lineHeight: 1.1, letterSpacing: '-0.5px' }}>
              Support
            </h1>

            <button
              onClick={() => setIsChatOpen(true)}
              style={{
                background: '#1e293b',
                color: '#ffffff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(30, 41, 59, 0.25)'
              }}
            >
              <span>Book Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Categories Section (Matching Screenshot 3) */}
      <section style={{ maxWidth: '1340px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Featured Categories
          </h2>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronLeft size={18} color="#475569" />
            </button>
            <button style={{ width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ChevronRight size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* 8 Category Rounded Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '16px' }}>
          {[
            { name: 'New Arrivals', bg: 'linear-gradient(135deg, #fef08a, #facc15)', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80' },
            { name: 'J-Beauty', bg: 'linear-gradient(135deg, #f0abfc, #c084fc)', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80' },
            { name: 'K-Beauty', bg: 'linear-gradient(135deg, #fdba74, #fb923c)', img: 'https://images.unsplash.com/photo-1608248597263-00de4680c74f?auto=format&fit=crop&w=300&q=80' },
            { name: 'International Brands', bg: 'linear-gradient(135deg, #93c5fd, #60a5fa)', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=300&q=80' },
            { name: 'Baby Care', bg: 'linear-gradient(135deg, #bae6fd, #7dd3fc)', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80' },
            { name: 'Make Up', bg: 'linear-gradient(135deg, #fca5a5, #f87171)', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80' },
            { name: 'Doctor Cosmetics', bg: 'linear-gradient(135deg, #93c5fd, #3b82f6)', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80' },
            { name: 'Beauty Tips', bg: 'linear-gradient(135deg, #fef08a, #eab308)', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80' }
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onToast(`Filtered Kirei by ${cat.name}`)}
              style={{ textAlign: 'center', cursor: 'pointer' }}
            >
              <div style={{ width: '100%', height: '110px', borderRadius: '16px', background: cat.bg, padding: '8px', marginBottom: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: idx === 4 ? '#e11d48' : '#334155' }}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Shop By Concern Section (Matching Screenshots 3 & 4) */}
      <section style={{ maxWidth: '1340px', margin: '50px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Shop By Concern
          </h2>
        </div>

        {/* 5 Concern Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          {[
            { title: 'Uneven skintone', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
            { title: 'Dullness', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
            { title: 'Blackheads', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
            { title: 'Dryness', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
            { title: 'Acne', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setIsChatOpen(true);
                handleSendMessage(`I need recommendations for ${item.title}`);
              }}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '100%', height: '260px', overflow: 'hidden', background: '#fdf2f8' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ background: '#f0fdf4', padding: '12px', borderTop: '1px solid #dcfce7' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#166534' }}>
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Perks Bar Section (Matching Screenshot 5) */}
      <section style={{ maxWidth: '1340px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #f1f5f9',
          padding: '24px 36px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
        }}>
          {/* Perk 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff0f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={24} color="#e11d48" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Free Shipping on Orders Over 1599 BDT</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>For All Products</div>
            </div>
          </div>

          {/* Perk 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff0f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Percent size={24} color="#e11d48" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Up To 10% OFF On All Items</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Available for J-Beauty Users Group!</div>
            </div>
          </div>

          {/* Perk 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff0f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} color="#e11d48" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>Flat 69 TK delivery charge</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>All over the country!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals Section with Live Countdown (Matching Screenshot 5) */}
      <section id="kirei-hot-deals" style={{ background: '#f8fafc', padding: '50px 0' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 24px' }}>

          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#1e293b', margin: 0 }}>
                Hot Deals
              </h2>

              {/* Countdown Timer Pill */}
              <div style={{ background: '#e11d48', color: '#ffffff', padding: '6px 16px', borderRadius: '8px', fontWeight: 900, fontSize: '14px', display: 'flex', gap: '6px' }}>
                <span>{String(timeLeft.days).padStart(2, '0')} Days</span> :
                <span>{String(timeLeft.hours).padStart(2, '0')} Hours</span> :
                <span>{String(timeLeft.mins).padStart(2, '0')} Mins</span> :
                <span>{String(timeLeft.secs).padStart(2, '0')} Secs</span>
              </div>
            </div>

            <button style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}>
              View All
            </button>
          </div>

          {/* 4 Hot Deals Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {hotDeals.map((deal) => (
              <div
                key={deal.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #f1f5f9',
                  padding: '16px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                {/* Discount Badge */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#e11d48', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 900, zIndex: 10 }}>
                  {deal.discount}
                </div>

                {/* Product Image */}
                <div>
                  <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', background: '#fafafa', marginBottom: '14px' }}>
                    <img src={deal.img} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                    {deal.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#e11d48' }}>
                      ৳{deal.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>
                      ৳{deal.oldPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart({
                      id: deal.id,
                      title: deal.title,
                      price: deal.price,
                      selectedApp: 'Kirei',
                      selectedPayment: 'bKash',
                      qty: 1
                    });
                    onToast(`Added "${deal.title}" to Kirei basket! 🛒`);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#1e293b',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    cursor: 'pointer'
                  }}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', padding: '36px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} Kirei BD. Simply Caring. Partnered with OfferMatrix Bangladesh.</p>
        </div>
      </footer>

      {/* Floating Green Kirei Chat Button (Matching Screenshots 1, 3, 4, 5) */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 90000,
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
      >
        <MessageCircle size={26} />
      </div>

      {/* Realistic Kirei AI Dermatologist Chat Box Modal */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '28px',
            width: '390px',
            maxHeight: '560px',
            height: '82vh',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(16, 185, 129, 0.3)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '14px 18px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900 }}>Kirei Dermatologist AI</h4>
                <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffffff' }}></span>
                  <span>Live Skin Advisor</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#f0fdf4', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #10b981, #059669)' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  border: msg.sender === 'bot' ? '1px solid #dcfce7' : 'none'
                }}
              >
                <div>{msg.text}</div>
                <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' }}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestion Chips */}
          <div style={{ padding: '8px 14px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {[
              '🩺 Book Dermatologist',
              ' Recommended for Acne',
              '🚚 Shipping Info',
              '🎟️ J-Beauty 10% Coupon'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '5px 12px',
                  background: '#ecfdf5',
                  color: '#047857',
                  border: '1px solid #a7f3d0',
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

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ padding: '12px 14px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <input
              type="text"
              placeholder="Ask Kirei Dermatologist AI..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '99px',
                border: '1px solid #e2e8f0',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
