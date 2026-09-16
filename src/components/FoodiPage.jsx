import React, { useState } from 'react';
import {
  ArrowLeft, Search, ShoppingBag, User, Heart, Star, MapPin, Globe, X,
  MessageCircle, Send, Sparkles, Percent, Tag, ShieldCheck, Check, Navigation, Phone, Smartphone, ChevronRight
} from 'lucide-react';

export default function FoodiPage({ onBack, onToast, onAddToCart, offers = [] }) {
  const [locationInput, setLocationInput] = useState('');
  const [activeCity, setActiveCity] = useState('Dhaka');

  // AI Foodi Assistant Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 🍴 Welcome to Foodi BD Assistant! Just order & smile. How can I help you find top dishes, fast delivery, or partner registration today?",
      time: 'Just now'
    }
  ]);

  // Cities Data (Matching Screenshot 5)
  const cities = [
    { name: 'Dhaka', count: '3707 Restaurants', img: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&w=500&q=80' },
    { name: 'Chattogram', count: '379 Restaurants', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80' },
    { name: 'Sylhet', count: '177 Restaurants', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80' },
    { name: 'Narayanganj', count: '174 Restaurants', img: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=500&q=80' },
    { name: 'Khulna', count: '162 Restaurants', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80' },
    { name: 'Rajshahi', count: '123 Restaurants', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500&q=80' },
    { name: 'Bogra', count: '114 Restaurants', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80' },
    { name: 'Cumilla', count: '116 Restaurants', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=500&q=80' },
    { name: 'Mymensingh', count: '80 Restaurants', img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80' },
    { name: 'Gazipur', count: '46 Restaurants', img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=500&q=80' },
    { name: 'Tangail', count: '45 Restaurants', img: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=500&q=80' },
    { name: "Cox's Bazar", count: '41 Restaurants', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80' }
  ];

  // Top Foodi Featured Dishes / Restaurants
  const featuredRestaurants = [
    {
      id: 'foodi-1',
      name: 'Kacchi Bhai – Gulshan',
      rating: 4.8,
      time: '20 min',
      price: 399,
      cuisine: 'Biryani & Kacchi',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
      badge: 'Flat 20% OFF'
    },
    {
      id: 'foodi-2',
      name: 'Chillox Burgers – Banani',
      rating: 4.7,
      time: '15 min',
      price: 320,
      cuisine: 'Gourmet Burgers',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      badge: 'Free Delivery'
    },
    {
      id: 'foodi-3',
      name: 'PizzaBurg – Dhanmondi',
      rating: 4.9,
      time: '25 min',
      price: 499,
      cuisine: 'Cheesy Pizzas',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      badge: 'BOGO Offer'
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

    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('partner') || lower.includes('restaurant') || lower.includes('register')) {
        botReply = "🤝 **Become a Foodi Partner**: Register your restaurant on Foodi and reach millions of hungry customers! Click the 'Become a Partner' button or contact us at partner@foodibd.com.";
      } else if (lower.includes('hero') || lower.includes('rider') || lower.includes('job') || lower.includes('earning')) {
        botReply = "🛵 **Become a Foodi Hero**: Join our delivery team and earn up to ৳25,000 BDT/month with flexible hours!";
      } else if (lower.includes('biryani') || lower.includes('kacchi') || lower.includes('burger')) {
        botReply = "🍔 **Top Foodi Recommendations**: Check out **Kacchi Bhai** (20% OFF) or **Chillox Burgers** with free delivery!";
      } else {
        botReply = `Thank you for asking Foodi! For "${query}", enter your location above to discover top restaurants near you. Just order & smile!`;
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
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif", color: '#111827' }}>

      {/* Top Floating Back to OfferMatrix Ribbon */}
      <div style={{ background: '#111827', color: '#ffffff', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10000 }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #e11d48, #ff2b70)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '99px',
            padding: '7px 18px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to OfferMatrix</span>
        </button>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#f3f4f6' }}>
          🍴 Foodi BD • Just Order &amp; Smile • Partnered with OfferMatrix
        </div>

        <button
          onClick={() => onToast('Foodi Support: 16789')}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px', padding: '4px 12px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
        >
          Helpline: 16789
        </button>
      </div>

      {/* TOP RED ANNOUNCEMENT BAR (Matching Screenshot 1) */}
      <div style={{ background: '#e11d48', color: '#ffffff', padding: '10px 24px', textAlign: 'center', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <span>Do you need a business account?</span>
        <button
          onClick={() => onToast('Opened Foodi Business Account Signup')}
          style={{
            background: '#ffffff',
            color: '#e11d48',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 14px',
            fontWeight: 800,
            fontSize: '12.5px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          Signup Now
        </button>
      </div>

      {/* MAIN FOODI HEADER (Matching Screenshot 1) */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: '41px', zIndex: 9000 }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Foodi Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={() => onToast('Foodi Home')}>
            <span style={{ fontSize: '32px', fontWeight: 900, color: '#e11d48', letterSpacing: '-0.8px', fontFamily: "'Outfit', sans-serif" }}>
              foodi
            </span>
            <span style={{ fontSize: '24px' }}>🍴</span>
          </div>

          {/* Right Header Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              onClick={() => onToast('Foodi Cart is empty')}
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <ShoppingBag size={18} color="#475569" />
            </div>

            <button
              onClick={() => onToast('Opened Foodi Sign In')}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e11d48',
                color: '#e11d48',
                padding: '9px 20px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Sign in
            </button>

            <button
              onClick={() => onToast('Opened Foodi Sign Up')}
              style={{
                background: '#e11d48',
                border: 'none',
                color: '#ffffff',
                padding: '9px 20px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)'
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Matching Screenshot 1) */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fff5f5 100%)', padding: '60px 24px 80px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Text & Location Input */}
          <div>
            <h1 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, margin: '0 0 16px 0', letterSpacing: '-1px' }}>
              <span style={{ color: '#e11d48' }}>Fast, Fresh</span> <br />
              <span style={{ color: '#e11d48' }}>&amp; Right</span> <span style={{ color: '#111827' }}>To Your Door</span>
            </h1>

            <p style={{ fontSize: '18px', color: '#4b5563', margin: '0 0 36px 0', fontWeight: 500 }}>
              Order dishes from favorite restaurants near you.
            </p>

            {/* Location Input Box */}
            <div style={{
              background: '#ffffff',
              border: '2px solid #e11d48',
              borderRadius: '12px',
              padding: '6px 6px 6px 20px',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              boxShadow: '0 10px 30px rgba(225, 29, 72, 0.12)',
              maxWidth: '560px'
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '15px',
                    outline: 'none',
                    color: '#111827'
                  }}
                />

                <button
                  onClick={() => {
                    setLocationInput('Gulshan 2, Dhaka');
                    onToast('Location set to Gulshan 2, Dhaka 📍');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e11d48',
                    fontWeight: 800,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Navigation size={14} color="#e11d48" />
                  <span>Locate me</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (!locationInput) setLocationInput('Dhaka, Bangladesh');
                  onToast(`Searching restaurants near ${locationInput || 'Dhaka'} 🍔`);
                }}
                style={{
                  background: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 28px',
                  fontWeight: 900,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)'
                }}
              >
                Find Food
              </button>
            </div>
          </div>

          {/* Right Graphic / Phone Mockup with Mascot (Matching Screenshot 1) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Red Blob Graphic Background */}
            <div style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: '#e11d48',
              top: '20px',
              right: '20px',
              zIndex: 1,
              opacity: 0.95
            }}></div>

            {/* Waving Smile Box Mascot */}
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '30px',
              zIndex: 3,
              fontSize: '80px',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
            }}>
              📦😃👋
            </div>

            {/* Mobile Device Mockup Container */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              width: '310px',
              background: '#111827',
              borderRadius: '36px',
              padding: '12px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              border: '4px solid #374151'
            }}>
              {/* Phone Screen Display */}
              <div style={{ background: '#ffffff', borderRadius: '28px', overflow: 'hidden', padding: '14px' }}>
                <div style={{ background: '#e11d48', color: '#ffffff', padding: '10px', borderRadius: '12px', marginBottom: '10px', fontSize: '11px', fontWeight: 800 }}>
                  📍 Current Location: Baridhara, Dhaka
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                  <div style={{ background: '#fff5f5', padding: '10px', borderRadius: '10px', border: '1px solid #fecdd3' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: '#e11d48' }}>Food Delivery</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>Up to 50% OFF</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: '#1e293b' }}>Pick-up</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>Flat 20% OFF</div>
                  </div>
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" 
                  alt="Foodi Mobile App View" 
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE FOODI OFFERS & VOUCHERS SECTION (CONNECTED WITH ADMIN FOODI) */}
      <section style={{ maxWidth: '1340px', margin: '40px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: '0 0 4px 0' }}>
              🍴 Active Foodi Offers &amp; Vouchers
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: 500 }}>
              Exclusive discount codes &amp; deals updated directly by Foodi Admin
            </p>
          </div>
          <span style={{ background: '#fff1f2', color: '#e11d48', padding: '6px 16px', borderRadius: '99px', fontWeight: 800, fontSize: '13px', border: '1px solid #fecdd3' }}>
            ⚡ {offers.length} Live Offers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {offers.map((offer, idx) => {
            const code = offer.code || `FOODI${offer.id || idx + 1}`;
            return (
              <div
                key={offer.id || idx}
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  onToast(`Coupon code "${code}" copied! Applied for Foodi checkout.`);
                }}
                style={{
                  background: 'linear-gradient(135deg, #e11d48, #be123c)',
                  color: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.25)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                      {offer.discount || 'Special Discount'}
                    </span>
                    <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: 700 }}>
                      Valid till {offer.validTill || '30 Sep 2026'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.2 }}>
                    {offer.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', borderTop: '1px dashed rgba(255,255,255,0.3)', paddingTop: '10px' }}>
                  <code style={{ background: '#ffffff', color: '#e11d48', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 900 }}>
                    CODE: {code}
                  </code>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>Tap to Copy 📋</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PARTNER & HERO CARDS SECTION (Matching Screenshot 2) */}
      <section style={{ maxWidth: '1340px', margin: '60px auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          
          {/* Card 1: List Your Restaurant on Foodi */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" 
                alt="List Your Restaurant on Foodi" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 8px 0' }}>
                List Your Restaurant on Foodi
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 18px 0', lineHeight: 1.4 }}>
                Would you like millions of new customers to enjoy your amazing food and groceries? Let's start our partnership today!
              </p>
              <button
                onClick={() => onToast('Redirected to Foodi Merchant Registration Page!')}
                style={{
                  background: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '11px 22px',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)'
                }}
              >
                Become a Partner
              </button>
            </div>
          </div>

          {/* Card 2: Become A Foodi Hero */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80" 
                alt="Become A Foodi Hero Rider" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 8px 0' }}>
                Become A Foodi Hero
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 18px 0', lineHeight: 1.4 }}>
                Are you a man of speed and a master of navigation? Become a Foodi Hero and earn up to 25,000 TK each month while spreading joy to doorsteps.
              </p>
              <button
                onClick={() => onToast('Redirected to Foodi Rider Application Form!')}
                style={{
                  background: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '11px 22px',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)'
                }}
              >
                Become a Hero
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PERKS / FEATURES SECTION (Matching Screenshot 3) */}
      <section style={{ background: '#fafafa', padding: '70px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }}>
          
          {/* Feature 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', marginBottom: '20px', boxShadow: '0 6px 20px rgba(225, 29, 72, 0.1)' }}>
              🛵
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0' }}>
              Super fast Delivery
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
              Faster than your cravings can blink. Experience the super-fast delivery and get fresh food.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', marginBottom: '20px', boxShadow: '0 6px 20px rgba(225, 29, 72, 0.1)' }}>
              📍
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0' }}>
              Live Order Tracking
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
              Track your order while it is delivered to your doorstep from the restaurant.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', marginBottom: '20px', boxShadow: '0 6px 20px rgba(225, 29, 72, 0.1)' }}>
              📱
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0' }}>
              Your Favorite Restaurants
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>
              Find the best and nearest top your favorite restaurants from your selected location.
            </p>
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD BANNER SECTION (Matching Screenshot 4) */}
      <section style={{ maxWidth: '1340px', margin: '60px auto', padding: '0 24px' }}>
        <div style={{
          background: '#e11d48',
          borderRadius: '28px',
          padding: '48px 60px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          boxShadow: '0 16px 40px rgba(225, 29, 72, 0.3)'
        }}>
          {/* Left Text & Download Buttons */}
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 900, margin: '0 0 28px 0', lineHeight: 1.2 }}>
              For better experience, <br />
              Download the Foodi app now
            </h2>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => onToast('Redirecting to Google Play Store...')}
                style={{
                  background: '#ffffff',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                }}
              >
                <span>GET IT ON</span>
                <span style={{ color: '#e11d48' }}>Google Play</span>
              </button>

              <button
                onClick={() => onToast('Redirecting to Apple App Store...')}
                style={{
                  background: '#ffffff',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 24px',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                }}
              >
                <span>Download on the</span>
                <span style={{ color: '#e11d48' }}>App Store</span>
              </button>
            </div>
          </div>

          {/* Right White QR Box */}
          <div style={{ background: '#ffffff', color: '#111827', padding: '24px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
            <div style={{ width: '160px', height: '160px', border: '3px solid #e11d48', borderRadius: '16px', margin: '0 auto 12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
              <div style={{ width: '130px', height: '130px', background: '#111827', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', position: 'relative' }}>
                <span style={{ position: 'absolute', background: '#e11d48', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>🍴</span>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#4b5563' }}>Scan to Download</span>
          </div>
        </div>
      </section>

      {/* WE DELIVER TO: CITIES GRID SECTION (Matching Screenshot 5) */}
      <section style={{ maxWidth: '1340px', margin: '60px auto 80px', padding: '0 24px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', margin: '0 0 28px 0' }}>
          We deliver to:
        </h2>

        {/* 12 Cities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
          {cities.map((city, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveCity(city.name);
                onToast(`Viewing ${city.name} foodi restaurants!`);
              }}
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                border: activeCity === city.name ? '3px solid #e11d48' : '1px solid #f1f5f9'
              }}
            >
              <img src={city.img} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', color: '#ffffff' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 2px 0' }}>
                  {city.name}
                </h3>
                <span style={{ fontSize: '11.5px', opacity: 0.9, fontWeight: 600 }}>
                  {city.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DISHES FOR SELECTED CITY */}
      <section style={{ background: '#fff5f5', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: 0 }}>
              Top Restaurants in {activeCity}
            </h2>
            <button
              onClick={() => onToast(`Viewing all ${activeCity} restaurants`)}
              style={{ background: '#e11d48', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, fontSize: '13.5px', cursor: 'pointer' }}
            >
              View All in {activeCity}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {featuredRestaurants.map((res) => (
              <div
                key={res.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #fecdd3',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '180px' }}>
                  <img src={res.img} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#e11d48', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 900 }}>
                    {res.badge}
                  </span>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '16.5px', fontWeight: 900, color: '#111827', margin: 0 }}>
                        {res.name}
                      </h3>
                      <span style={{ color: '#e11d48', fontWeight: 900, fontSize: '13px' }}>
                        ⭐ {res.rating}
                      </span>
                    </div>

                    <div style={{ fontSize: '12.5px', color: '#6b7280', marginBottom: '12px' }}>
                      ⏱ {res.time} • {res.cuisine}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart({
                        id: res.id,
                        title: `${res.name} Special Meal`,
                        price: res.price,
                        selectedApp: 'Foodi',
                        selectedPayment: 'bKash',
                        qty: 1
                      });
                      onToast(`Added "${res.name} Special Meal" to Foodi basket! 🛒`);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#e11d48',
                      color: '#ffffff',
                      fontWeight: 900,
                      fontSize: '13.5px',
                      cursor: 'pointer'
                    }}
                  >
                    Order Now (৳{res.price})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', color: '#9ca3af', padding: '40px 24px', textAlign: 'center', fontSize: '13.5px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} Foodi BD. Just Order &amp; Smile. Partnered with OfferMatrix Bangladesh.</p>
        </div>
      </footer>

      {/* Floating Red Foodi AI Chatbot Button */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 90000,
          background: 'linear-gradient(135deg, #e11d48, #ff2b70)',
          color: '#ffffff',
          borderRadius: '99px',
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 30px rgba(225, 29, 72, 0.4)',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '20px' }}>🍴</span>
        <span style={{ fontSize: '14px', fontWeight: 900 }}>Foodi AI Assistant</span>
      </div>

      {/* Interactive AI Chatbot Modal */}
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
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(225, 29, 72, 0.4)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ background: '#e11d48', padding: '14px 18px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                🍴
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900 }}>Foodi AI Support</h4>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>Just Order &amp; Smile</div>
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
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#fff5f5', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? '#e11d48' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#111827',
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
          <div style={{ padding: '8px 12px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {['🤝 Become Partner', '🛵 Become Hero', '🍛 Top Biryani', '📍 Dhaka Restaurants'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  background: '#fff5f5',
                  color: '#e11d48',
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
            style={{ padding: '10px 12px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Ask Foodi AI..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 14px',
                borderRadius: '99px',
                border: '1px solid #e2e8f0',
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
                background: '#e11d48',
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
