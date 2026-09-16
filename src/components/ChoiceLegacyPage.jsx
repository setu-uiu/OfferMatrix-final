import React, { useState } from 'react';
import { 
  ArrowLeft, Search, ShoppingBag, User, MessageCircle, Phone, 
  Sparkles, Send, X, Star, ChevronLeft, ChevronRight,
  ShieldCheck, Heart, Tag, Sparkle
} from 'lucide-react';

export default function ChoiceLegacyPage({ onBack, onToast, onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [heroSlide, setHeroSlide] = useState(0);

  // AI Chat Box State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 🌸 Welcome to Choice Legacy AI Beauty Advisor. How can I help you choose authentic Korean & USA serums, facewashes, and scrubs today?",
      time: 'Just now'
    }
  ]);

  // Real Serum, Facewash, Scrub & Skincare Products Data
  const products = [
    {
      id: 'cl-1',
      title: 'The Ordinary Glycolic Acid 7% Exfoliating Toner',
      brand: 'The Ordinary',
      tag: 'Toner',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 2999,
      oldPrice: 3499,
      rating: 4.8,
      reviewsCount: 20,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-2',
      title: 'The Ordinary Multi-Peptide Serum for Hair Density',
      brand: 'The Ordinary',
      tag: 'Hair Serum',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 3999,
      oldPrice: 4500,
      rating: 5.0,
      reviewsCount: 1,
      inStock: false,
      img: 'https://images.unsplash.com/photo-1608248597263-00de4680c74f?auto=format&fit=crop&w=600&q=80',
      category: 'haircare'
    },
    {
      id: 'cl-3',
      title: 'The Ordinary - Niacinamide 10% + Zinc 1% Face Serum',
      brand: 'The Ordinary',
      tag: 'Serum',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 1399,
      oldPrice: 1650,
      rating: 4.9,
      reviewsCount: 17,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-4',
      title: 'OMI - Sun Bears Active Protect Milk Sunscreen SPF 50+ PA++++',
      brand: 'OMI Sun Bears',
      tag: 'Sunscreen',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 649,
      oldPrice: 850,
      rating: 4.8,
      reviewsCount: 32,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-5',
      title: 'Purito Mighty Bamboo Panthenol Gentle Facewash',
      brand: 'Purito',
      tag: 'Facewash',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 699,
      oldPrice: 950,
      rating: 4.9,
      reviewsCount: 31,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1556228722-d1191e4776e7?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-6',
      title: 'Purito Oat-in Calming Gel Cream & Face Scrub 100ml',
      brand: 'Purito',
      tag: 'Scrub & Gel',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 1250,
      oldPrice: 1550,
      rating: 4.9,
      reviewsCount: 28,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-7',
      title: 'Aveeno Baby Daily Care Moisturizing Lotion 250ml',
      brand: 'Aveeno Baby',
      tag: 'Baby Wash',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 1150,
      oldPrice: 1400,
      rating: 5.0,
      reviewsCount: 15,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      category: 'babycare'
    },
    {
      id: 'cl-8',
      title: 'Beauty of Joseon Glow Niacinamide Serum 30ml',
      brand: 'Beauty of Joseon',
      tag: 'Serum',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 1450,
      oldPrice: 1850,
      rating: 4.9,
      reviewsCount: 24,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-9',
      title: 'APLB Glutathione Exfoliating Face Scrub 40ml',
      brand: 'APLB K-Beauty',
      tag: 'Face Scrub',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 1650,
      oldPrice: 2100,
      rating: 4.8,
      reviewsCount: 19,
      inStock: true,
      img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    },
    {
      id: 'cl-10',
      title: 'Gillette Venus Smooth Sensitive Razor',
      brand: 'Gillette Venus',
      tag: 'Razor',
      tagBg: '#fff0f3',
      tagColor: '#e11d48',
      price: 450,
      oldPrice: 600,
      rating: 4.7,
      reviewsCount: 42,
      inStock: false,
      img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      category: 'skincare'
    }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // AI Assistant Response Handler
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

    // Generate intelligent AI response
    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('acne') || lower.includes('serum') || lower.includes('niacinamide')) {
        botReply = "For acne-prone & oily skin, I highly recommend **The Ordinary Niacinamide 10% + Zinc 1% Serum** (৳1,399) or **Purito Gentle Facewash** (৳699). Apply coupon **CL15** for 15% off!";
      } else if (lower.includes('scrub') || lower.includes('exfoliat')) {
        botReply = "✨ For smooth glowing skin, check out **APLB Glutathione Exfoliating Face Scrub** (৳1,650) or **The Ordinary Glycolic Acid Toner** (৳2,999)!";
      } else if (lower.includes('sunscreen') || lower.includes('sun')) {
        botReply = "☀️ Our #1 best seller is **OMI Sun Bears Active Protect Milk Sunscreen SPF 50+ PA++++** (৳649). Light formula with zero white cast!";
      } else if (lower.includes('deal') || lower.includes('offer') || lower.includes('discount') || lower.includes('1000')) {
        botReply = "🎉 Choice Legacy Puja Agomoni Special Offers:\n• Coupon **CL15**: 15% Flat Discount\n• Free Delivery on orders over ৳1,000!\n• OMI Sun Bears Sunscreen at ৳649\n• Purito Bamboo Cleanser at ৳699!";
      } else if (lower.includes('authentic') || lower.includes('barcode') || lower.includes('original')) {
        botReply = "🛡️ 100% Barcode Authenticity Guaranteed! All Choice Legacy BD items are imported directly from authorized brands in South Korea & USA.";
      } else {
        botReply = `Thanks for asking! Based on your search for "${query}", check out our top recommendations like Beauty of Joseon Glow Serum (৳1,450) or Purito Oat Gel Cream (৳1,250). Free shipping over ৳1,000!`;
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
    <div style={{ background: '#fdfbfb', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', sans-serif", position: 'relative' }}>
      
      {/* Choice Legacy Top Header Bar (Clean Light Premium Aesthetic) */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* Aligned Back Button + Choice Legacy Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <button 
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #fb7185, #e11d48)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '99px',
                padding: '9px 18px',
                fontWeight: 800,
                fontSize: '13.5px',
                boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to OfferMatrix</span>
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => setActiveCategory('all')}>
              <span style={{ fontFamily: "'Playfair Display', cursive, serif", fontSize: '26px', fontWeight: 800, color: '#fb7185', lineHeight: 1.05, letterSpacing: '-0.5px' }}>
                Choice <span style={{ fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', color: '#e11d48', fontWeight: 900 }}>LEGACY</span>
              </span>
              <span style={{ fontSize: '9.5px', color: '#94a3b8', letterSpacing: '0.4px', fontWeight: 700 }}>YOUR ULTIMATE BEAUTY DESTINATION</span>
            </div>
          </div>

          {/* Search Products Input Bar */}
          <div style={{ flex: 1, maxWidth: '500px', position: 'relative' }}>
            <input 
              type="text"
              placeholder="Search serum, facewash, scrub, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 18px 11px 44px',
                borderRadius: '99px',
                border: '1.5px solid #fecdd3',
                background: '#fff0f3',
                fontSize: '14px',
                outline: 'none',
                color: '#1e293b',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
              }}
            />
            <Search size={18} color="#fb7185" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          {/* Top Right Action Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#e11d48', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
              <User size={18} color="#e11d48" />
              <span>My Account</span>
            </button>
            
            <button 
              onClick={() => onToast('Choice Legacy Cart opened')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#e11d48', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
            >
              <ShoppingBag size={18} color="#e11d48" />
              <span>Cart</span>
            </button>

            {/* Social Action Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" title="WhatsApp" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                <Phone size={15} />
              </a>
              <a href="https://m.me/" target="_blank" rel="noreferrer" title="Messenger" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #0084FF, #00C6FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                <MessageCircle size={15} />
              </a>
              <div title="Customer Helpline" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #fb7185, #e11d48)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }} onClick={() => onToast('Choice Legacy Hotline: 09612-345678')}>
                <MessageCircle size={15} />
              </div>
            </div>
          </div>
        </div>

        {/* Soft Aesthetic Rose Category Navigation Bar */}
        <div style={{ background: 'linear-gradient(90deg, #fb7185 0%, #e11d48 100%)', padding: '0 24px' }}>
          <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '28px', flexWrap: 'wrap' }}>
            {[
              { id: 'skincare', label: 'SKIN CARE' },
              { id: 'babycare', label: 'BABY CARE' },
              { id: 'makeup', label: 'MAKEUP' },
              { id: 'haircare', label: 'HAIR CARE' }
            ].map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '12px 18px',
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '13.5px',
                  letterSpacing: '0.6px',
                  cursor: 'pointer',
                  opacity: activeCategory === cat.id ? 1 : 0.9,
                  borderBottom: activeCategory === cat.id ? '2px solid #ffffff' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}

            {/* OFFERS Pill Badge */}
            <button 
              onClick={() => onToast('🎟️ 15% OFF Puja Special Offer active!')}
              style={{
                padding: '6px 18px',
                background: '#fef08a',
                color: '#854d0e',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 900,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              OFFERS
            </button>

            {/* UNDERGARMENTS Pill Badge */}
            <button 
              onClick={() => onToast('Showing Undergarments collection')}
              style={{
                padding: '6px 18px',
                background: '#38bdf8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 900,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              UNDERGARMENTS
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section (Aesthetic Light Gradient & Real Products) */}
      <section style={{ maxWidth: '1340px', margin: '20px auto 0', padding: '0 24px', position: 'relative' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #fff0f3 0%, #fff7ed 50%, #fdf2f8 100%)', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          position: 'relative',
          boxShadow: '0 10px 30px rgba(225, 29, 72, 0.08)',
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          padding: '28px 48px',
          border: '1.5px solid #fecdd3'
        }}>
          {/* Left Banner Content */}
          <div style={{ maxWidth: '52%' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffe4e6', color: '#be123c', padding: '6px 16px', borderRadius: '99px', fontSize: '13px', fontWeight: 800, marginBottom: '14px' }}>
              <Sparkles size={15} />
              <span>PUJA AGOMONI SPECIAL SALE</span>
            </div>
            
            <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#881337', margin: '0 0 10px 0', lineHeight: 1.2 }}>
              পূজার আগমনী অফার <br />
              <span style={{ color: '#e11d48' }}>১৫% ফ্ল্যাট ডিসকাউন্ট</span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '14px 0 20px', flexWrap: 'wrap' }}>
              <div style={{ background: '#ffffff', color: '#be123c', padding: '8px 18px', borderRadius: '12px', fontWeight: 900, fontSize: '14.5px', border: '1.5px dashed #fb7185', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                Coupon Code: <span style={{ color: '#e11d48' }}>CL15</span>
              </div>
              <div style={{ background: '#ecfdf5', color: '#047857', padding: '8px 16px', borderRadius: '12px', fontWeight: 800, fontSize: '13px' }}>
                🚚 FREE DELIVERY | ORDER ৳1000+
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                onClick={() => onToast('Coupon code CL15 applied for 15% OFF!')}
                style={{
                  background: 'linear-gradient(135deg, #fb7185, #e11d48)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '99px',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(225, 29, 72, 0.3)'
                }}
              >
                Claim Offer Now ➔
              </button>
            </div>
          </div>

          {/* Right Real Aesthetic Product Display */}
          <div style={{ position: 'relative', width: '440px', height: '260px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
            <img 
              src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80" 
              alt="Real Skincare Serums & Cleanser" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(255,255,255,0.92)', color: '#881337', padding: '6px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '12px' }}>
              choicelegacy.com.bd
            </div>
          </div>

          {/* Slider Arrows */}
          <button 
            onClick={() => setHeroSlide((prev) => (prev === 0 ? 1 : 0))}
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            <ChevronLeft size={20} color="#475569" />
          </button>
          
          <button 
            onClick={() => setHeroSlide((prev) => (prev === 0 ? 1 : 0))}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '38px', height: '38px', borderRadius: '50%', background: '#ffffff', border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
          >
            <ChevronRight size={20} color="#475569" />
          </button>
        </div>
      </section>

      {/* Brand Logos Ribbon (Soft Pastel Light Aesthetic) */}
      <section style={{ background: '#fff0f3', margin: '24px 0', padding: '14px 24px', borderTop: '1px solid #fecdd3', borderBottom: '1px solid #fecdd3', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '36px' }}>
          {['AXIS-Y', 'Simple', 'Isntree', 'iUNIK', 'APLB', 'medicube K-BEAUTY TECH', 'CeraVe', 'COSRX', 'K-SECRET', "L'ORÉAL PARIS"].map((brand, idx) => (
            <span key={idx} style={{ color: '#881337', fontWeight: 800, fontSize: '15px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Arched Category Cards Grid with Real Serum, Facewash & Scrub Pictures */}
      <section style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 24px 40px' }}>
        {/* Row 1 Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginBottom: '24px' }}>
          {[
            { name: 'SKIN CARE', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80', key: 'skincare' },
            { name: 'K-BEAUTY', img: 'https://images.unsplash.com/photo-1556228722-d1191e4776e7?auto=format&fit=crop&w=500&q=80', key: 'skincare' },
            { name: 'MAKEUP', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80', key: 'makeup' },
            { name: 'HAIR CARE', img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=500&q=80', key: 'haircare' },
            { name: 'BABY CARE', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80', key: 'babycare' }
          ].map((catItem, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setActiveCategory(catItem.key);
                onToast(`Filtered Choice Legacy products by ${catItem.name}`);
              }}
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #fef08a 0%, #fef3c7 100%)',
                borderRadius: '24px 24px 20px 20px',
                padding: '8px',
                textAlign: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid #fef08a'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: '18px', overflow: 'hidden', background: '#fff0f3' }}>
                <img src={catItem.img} alt={catItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ background: '#fb7185', color: '#ffffff', padding: '9px 12px', borderRadius: '14px', fontWeight: 900, fontSize: '14.5px', letterSpacing: '0.5px', marginTop: '8px' }}>
                {catItem.name}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 Categories (Real Serums, Scrubs & Combos) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '1080px', margin: '0 auto' }}>
          {[
            { name: 'UNDERGARMENTS', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80' },
            { name: 'SERUM & COMBO', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80' },
            { name: 'SCRUB & GLOW', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80' },
            { name: 'CL OFFERS', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80' }
          ].map((catItem, idx) => (
            <div 
              key={idx}
              onClick={() => onToast(`Opening Choice Legacy ${catItem.name} collection`)}
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, #fef08a 0%, #fef3c7 100%)',
                borderRadius: '24px 24px 20px 20px',
                padding: '8px',
                textAlign: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid #fef08a'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: '18px', overflow: 'hidden', background: '#fff0f3' }}>
                <img src={catItem.img} alt={catItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ background: '#fb7185', color: '#ffffff', padding: '9px 12px', borderRadius: '14px', fontWeight: 900, fontSize: '14.5px', letterSpacing: '0.5px', marginTop: '8px' }}>
                {catItem.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMMENDED FOR YOU Section (Real Serum, Facewash & Scrub Products) */}
      <section style={{ maxWidth: '1340px', margin: '20px auto 50px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', letterSpacing: '1px', textTransform: 'uppercase' }}>
            RECOMMENDED FOR YOU
          </h2>
          <div style={{ width: '60px', height: '4px', background: '#fb7185', margin: '8px auto 0', borderRadius: '2px' }}></div>
        </div>

        {/* 10 Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div>
                {/* Product Image */}
                <div style={{ height: '190px', width: '100%', borderRadius: '10px', overflow: 'hidden', background: '#fafafa', marginBottom: '12px', position: 'relative' }}>
                  <img src={product.img} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: '8px', left: '8px', background: product.tagBg || '#fff0f3', color: product.tagColor || '#e11d48', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {product.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px 0', lineHeight: 1.4, minHeight: '38px' }}>
                  {product.title}
                </h3>

                {/* Price & Rating */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '17px', fontWeight: 900, color: '#e11d48' }}>
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span style={{ fontSize: '12.5px', color: '#94a3b8', textDecoration: 'line-through' }}>
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#fb7185', fontWeight: 800, marginBottom: '14px' }}>
                  <span style={{ background: '#e11d48', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '11px' }}>
                    {product.rating} ★
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '11px' }}>({product.reviewsCount})</span>
                </div>
              </div>

              {/* Add to Cart / Out of stock Button */}
              {product.inStock ? (
                <button
                  onClick={() => {
                    onAddToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      selectedApp: 'Choice Legacy',
                      selectedPayment: 'bKash',
                      qty: 1
                    });
                    onToast(`Added "${product.title}" to Choice Legacy basket! 🛒`);
                  }}
                  style={{
                    width: '100%',
                    padding: '9px',
                    borderRadius: '8px',
                    border: '1.5px solid #e11d48',
                    background: '#ffffff',
                    color: '#e11d48',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Add to cart
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    width: '100%',
                    padding: '9px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'not-allowed'
                  }}
                >
                  Out of stock
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Powerful Pair BEAUTIFUL SKIN Landscape Banner */}
      <section style={{ maxWidth: '1340px', margin: '40px auto 60px', padding: '0 24px' }}>
        <div style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
          <img 
            src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1400&q=80" 
            alt="Powerful Pair Beautiful Skin Banner" 
            style={{ width: '100%', height: '340px', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.3) 65%, transparent 100%)', display: 'flex', alignItems: 'center', padding: '48px' }}>
            <div>
              <span style={{ fontSize: '34px', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#fb7185', fontWeight: 700, display: 'block' }}>
                Powerful Pair
              </span>
              <h2 style={{ fontSize: '50px', fontWeight: 900, color: '#881337', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '-1px' }}>
                BEAUTIFUL SKIN
              </h2>
              <p style={{ fontSize: '15.5px', color: '#334155', fontWeight: 700, maxWidth: '480px', marginBottom: '24px' }}>
                Discover glowing serums, gentle facewashes &amp; brightening scrubs from COSRX, The Ordinary, Purito &amp; APLB with 100% barcode authenticity.
              </p>
              <button
                onClick={() => setIsChatOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #fb7185, #e11d48)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '13px 32px',
                  borderRadius: '99px',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(225, 29, 72, 0.3)'
                }}
              >
                Explore Beauty Combos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', padding: '36px 24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} Choice Legacy BD. Partnered with OfferMatrix Bangladesh.</p>
        </div>
      </footer>

      {/* Floating "✨ Shop with AI" Pill Widget */}
      <div 
        onClick={() => setIsChatOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90000,
          background: '#ffffff',
          borderRadius: '99px',
          padding: '10px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 30px rgba(225, 29, 72, 0.2)',
          cursor: 'pointer',
          border: '1.5px solid #fecdd3'
        }}
      >
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #fb7185, #e11d48)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Sparkles size={17} />
        </div>
        <span style={{ fontSize: '14px', fontWeight: 800, color: '#881337' }}>Shop with AI</span>
        <X size={14} color="#94a3b8" />
      </div>

      {/* Realistic Interactive AI Chat Box Modal */}
      {isChatOpen && (
        <div 
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '24px',
            width: '390px',
            maxHeight: '560px',
            height: '82vh',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(254, 205, 211, 0.8)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Chat Header */}
          <div style={{ background: 'linear-gradient(135deg, #fb7185, #e11d48)', padding: '14px 18px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900 }}>Choice Legacy AI</h4>
                <div style={{ fontSize: '11px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' }}></span>
                  <span>Online Beauty Assistant</span>
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
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#fff0f3', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #fb7185, #e11d48)' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  fontSize: '13px',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  border: msg.sender === 'bot' ? '1px solid #fecdd3' : 'none'
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
              '🔥 Best Serums for Acne',
              '✨ Exfoliating Face Scrub',
              '☀️ Sunscreen for Oily Skin',
              '🎁 Deals under 1000 TK'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '5px 12px',
                  background: '#fff0f3',
                  color: '#be123c',
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
              placeholder="Ask Choice Legacy AI..."
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
                background: 'linear-gradient(135deg, #fb7185, #e11d48)',
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
