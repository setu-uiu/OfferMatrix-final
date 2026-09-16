import React, { useState } from 'react';
import {
  Search, Heart, ShoppingBag, User, ArrowLeft, Play, Eye, ChevronLeft, ChevronRight,
  ShieldCheck, Truck, Headphones, Award, Phone, Mail, MessageCircle, Star, Plus, Minus
} from 'lucide-react';

export default function MakeupChariPage({ onBack, onToast, onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  // Quantity control handlers
  const handleQtyChange = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      if (onToast) onToast(`Removed ${product.title} from Wishlist`);
    } else {
      setWishlist([...wishlist, product]);
      if (onToast) onToast(`Added ${product.title} to Wishlist 💖`);
    }
  };

  // Products Data matching Screenshot 3 exactly
  const bestsellers = [
    {
      id: 'mc-1',
      title: 'BEAUTY OF JOSEON REVIVE EYE SERUM: GINSENG + RETINAL 30ML',
      brand: 'Beauty Of Joseon',
      discount: '-22%',
      oldPrice: 1700,
      price: 1320,
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
      category: 'skin'
    },
    {
      id: 'mc-2',
      title: 'Wet N Wild Megalast Liquid Catsuit Matte Lipstick Give Me Mocha',
      brand: 'Wet n wild',
      discount: '-28%',
      oldPrice: 580,
      price: 420,
      img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80',
      category: 'makeup'
    },
    {
      id: 'mc-3',
      title: 'Vaseline Lip Therapy Rosy Lips 20g',
      brand: 'Vaseline',
      discount: '-29%',
      oldPrice: 350,
      price: 249,
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80',
      category: 'skin'
    },
    {
      id: 'mc-4',
      title: 'IM FROM RICE TONER 30ML',
      brand: 'Im From',
      discount: '-45%',
      oldPrice: 1100,
      price: 610,
      img: 'https://images.unsplash.com/photo-1608248597261-8332570544c0?auto=format&fit=crop&w=500&q=80',
      category: 'korean'
    },
    {
      id: 'mc-5',
      title: 'Axis-Y Dark Spot Correcting Glow Serum 5ml',
      brand: 'AXIS-Y',
      discount: '-72%',
      oldPrice: 600,
      price: 170,
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80',
      category: 'korean'
    }
  ];

  const filteredProducts = bestsellers.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCartClick = (product) => {
    const qty = quantities[product.id] || 1;
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        img: product.img,
        qty: qty,
        selectedApp: 'Makeup Chari Store',
        selectedPayment: 'Online / COD'
      });
    }
    if (onToast) onToast(`Added ${qty}x "${product.title}" to cart! 🛍️`);
  };

  return (
    <div className="makeup-chari-page-root animate-fade-in" style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
      
      {/* Top Floating Back Bar */}
      <div style={{ background: '#0f172a', padding: '10px 24px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to OfferMatrix Deals</span>
        </button>

        <div style={{ fontSize: '13px', color: '#94a3b8' }}>
          ✨ Independent Official Store Front • <span style={{ color: '#ec4899', fontWeight: '800' }}>Direct Online Shopping</span>
        </div>
      </div>

      {/* Main Header Container (Screenshot 1) */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* Logo & Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }} onClick={onBack}>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>MAKEUP.</span>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#db2777', letterSpacing: '-0.5px', marginLeft: '4px' }}>CHARI</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '13.5px', fontWeight: '700', color: '#475569' }}>
              <span style={{ cursor: 'pointer' }}>BRANDS ▾</span>
              <span style={{ cursor: 'pointer' }}>HISTORY ▾</span>
            </div>
          </div>

          {/* Search Box */}
          <div style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 42px 10px 18px',
                borderRadius: '30px',
                border: '1.5px solid #e2e8f0',
                outline: 'none',
                fontSize: '13.5px',
                background: '#f8fafc'
              }}
            />
            <button style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
              <Search size={18} />
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => { if (onToast) onToast(`Wishlist contains ${wishlist.length} saved items`); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f472b6',
                color: '#ffffff',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '24px',
                fontWeight: '800',
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(244, 114, 182, 0.3)'
              }}
            >
              <Heart size={15} fill="#ffffff" />
              <span>WISHLIST ({wishlist.length})</span>
            </button>

            <button
              onClick={() => { if (onToast) onToast('Makeup Chari Account Guest Portal Access'); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#c084fc',
                color: '#ffffff',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '24px',
                fontWeight: '800',
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(192, 132, 252, 0.3)'
              }}
            >
              <User size={15} />
              <span>LOGIN / REGISTER</span>
            </button>

            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#7e22ce',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => { if (onToast) onToast('Cart Opened'); }}
            >
              <ShoppingBag size={20} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ec4899', color: '#ffffff', fontSize: '11px', fontWeight: '800', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                0
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Navbar Category Links (Screenshot 1) */}
        <div style={{ borderTop: '1px solid #f1f5f9', background: '#ffffff' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', overflowX: 'auto', fontSize: '13px', fontWeight: '700', color: '#334155' }}>
            <span style={{ cursor: 'pointer', color: activeCategory === 'makeup' ? '#db2777' : '' }} onClick={() => setActiveCategory('makeup')}>MAKEUP ▾</span>
            <span style={{ cursor: 'pointer', color: activeCategory === 'skin' ? '#db2777' : '' }} onClick={() => setActiveCategory('skin')}>SKIN ▾</span>
            <span style={{ cursor: 'pointer', color: activeCategory === 'korean' ? '#db2777' : '' }} onClick={() => setActiveCategory('korean')}>KOREAN ▾</span>
            <span style={{ cursor: 'pointer' }}>J-BEAUTY</span>
            <span style={{ cursor: 'pointer' }}>INDIAN</span>
            <span style={{ cursor: 'pointer' }}>HAIR ▾</span>
            <span style={{ cursor: 'pointer' }}>BODY &amp; BATH ▾</span>
            <span style={{ cursor: 'pointer' }}>KIDS &amp; MOM</span>
            <span style={{ cursor: 'pointer' }}>FRAGRANCE ▾</span>
            <span style={{ cursor: 'pointer' }}>COMBO</span>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '20px',
                fontWeight: '800',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)'
              }}
              onClick={() => {
                setActiveCategory('all');
                if (onToast) onToast('Showing Summer Sale Exclusive Offers ☀️');
              }}
            >
              <span>☀️ Summer Sale</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section (Screenshot 1) */}
      <section style={{ maxWidth: '1280px', margin: '20px auto 0 auto', padding: '0 24px' }}>
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80"
            alt="Summer Sale Banner"
            style={{ width: '100%', height: '380px', objectFit: 'cover' }}
          />

          {/* Tropical Summer Sale Overlay Content */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15,23,42,0.65) 0%, rgba(219,39,119,0.35) 60%, rgba(0,0,0,0.1) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', color: '#ffffff' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#fef08a', marginBottom: '8px' }}>
              MAKEUPCHARI PRESENTS
            </div>
            <h1 style={{ fontSize: '46px', fontWeight: '900', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.4)', color: '#ffffff' }}>
              SUMMER SALE ☀️
            </h1>
            <p style={{ fontSize: '16px', marginTop: '10px', maxWidth: '500px', color: '#f1f5f9' }}>
              Up to 70% OFF on Korean Skincare, Makeup Bestsellers &amp; Sunscreens! Authentic products guaranteed.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('bestsellers-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                marginTop: '20px',
                width: 'fit-content',
                padding: '12px 28px',
                background: '#db2777',
                color: '#ffffff',
                border: 'none',
                borderRadius: '30px',
                fontWeight: '800',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(219, 39, 119, 0.5)'
              }}
            >
              SHOP SUMMER SALE DEALS »
            </button>
          </div>

          <button style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={22} color="#0f172a" />
          </button>
          <button style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.7)', border: 'none', width: '38px', height: '38px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={22} color="#0f172a" />
          </button>
        </div>

        {/* Ticker Tape Ribbon (Screenshot 1) */}
        <div style={{ background: '#000000', color: '#ffffff', padding: '10px 0', overflow: 'hidden', marginTop: '10px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px' }}>
          <div style={{ display: 'flex', gap: '40px', whitespace: 'nowrap', animation: 'marquee 20s linear infinite' }}>
            <span>NEW ON MAKEUP CHARI ❄️ SUMMER SALE ❄️ NEW ON MAKEUP CHARI ❄️ SUMMER SALE ❄️ NEW ON MAKEUP CHARI ❄️ SUMMER SALE</span>
            <span>NEW ON MAKEUP CHARI ❄️ SUMMER SALE ❄️ NEW ON MAKEUP CHARI ❄️ SUMMER SALE ❄️ NEW ON MAKEUP CHARI ❄️ SUMMER SALE</span>
          </div>
        </div>
      </section>

      {/* Top Categories Section (Screenshot 2) */}
      <section style={{ maxWidth: '1280px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Top Categories</h2>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569', cursor: 'pointer' }}>View All »</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { name: 'Skin', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80', key: 'skin' },
            { name: 'Makeup', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', key: 'makeup' },
            { name: 'Korean', img: 'https://images.unsplash.com/photo-1512290900673-7002b5420311?auto=format&fit=crop&w=400&q=80', key: 'korean' },
            { name: 'Hair', img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80', key: 'hair' },
            { name: 'Body & Bath', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', key: 'body' }
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveCategory(cat.key);
                if (onToast) onToast(`Filtered by ${cat.name}`);
              }}
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                border: activeCategory === cat.key ? '3px solid #db2777' : 'none'
              }}
            >
              <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 60%)', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Concern Section (Screenshot 2) */}
      <section style={{ maxWidth: '1280px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Shop by Concern</h2>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569', cursor: 'pointer' }}>View All »</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Acne & Blemishes', img: 'https://images.unsplash.com/photo-1512290900673-7002b5420311?auto=format&fit=crop&w=400&q=80' },
            { title: 'Glow & Brightening', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80' },
            { title: 'Scalp & Hair Fall', img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80' },
            { title: 'Dark Spots & Pigmentation', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80' },
            { title: 'Pore Care & Oil Control', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80' }
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'radial-gradient(circle at center, #a855f7 0%, #7e22ce 100%)',
                boxShadow: '0 4px 14px rgba(126, 34, 206, 0.25)'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'overlay', opacity: 0.85 }} />
              <div style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'linear-gradient(0deg, rgba(126,34,206,0.85) 0%, rgba(0,0,0,0) 60%)' }}>
                <span style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff' }}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Bestsellers Section (Screenshot 3) */}
      <section id="bestsellers-section" style={{ maxWidth: '1280px', margin: '40px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>Weekly Bestsellers</h2>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569', cursor: 'pointer' }}>View All »</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => {
            const qty = quantities[product.id] || 1;
            const isWishlisted = wishlist.some(item => item.id === product.id);

            return (
              <div
                key={product.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '18px',
                  padding: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  position: 'relative'
                }}
              >
                {/* Discount Badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#ec4899',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    zIndex: 2
                  }}
                >
                  {product.discount}
                </span>

                {/* Wishlist Heart Icon */}
                <button
                  onClick={() => toggleWishlist(product)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                >
                  <Heart size={16} color={isWishlisted ? '#ec4899' : '#64748b'} fill={isWishlisted ? '#ec4899' : 'none'} />
                </button>

                {/* Product Image */}
                <div style={{ height: '180px', overflow: 'hidden', borderRadius: '12px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info */}
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {product.brand}
                  </div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', margin: '0 0 10px 0', height: '38px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {product.title}
                  </h4>

                  {/* Pricing */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>
                      {product.oldPrice}৳
                    </span>
                    <span style={{ fontSize: '17px', fontWeight: '900', color: '#db2777' }}>
                      {product.price}৳
                    </span>
                  </div>

                  {/* Qty & Add to Cart Controls */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '4px' }}>
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '2px 6px', color: '#475569' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '13px', fontWeight: '800', padding: '0 6px' }}>{qty}</span>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '2px 6px', color: '#475569' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCartClick(product)}
                      style={{
                        flex: 1,
                        background: '#a855f7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '9px',
                        borderRadius: '10px',
                        fontSize: '12.5px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(168, 85, 247, 0.35)'
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subscribe to MAKEUPCHARI Video Reel Section (Screenshot 4) */}
      <section style={{ maxWidth: '1280px', margin: '50px auto 0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>SUBSCRIBE to MAKEUPCHARI</h2>
          <button style={{ background: '#ff0000', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '16px', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Play size={12} fill="#ffffff" />
            <span>Subscribe</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {[
            { views: '477', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
            { views: '980', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
            { views: '807', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
            { views: '702', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' }
          ].map((reel, idx) => (
            <div
              key={idx}
              style={{
                position: 'relative',
                height: '380px',
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
              }}
            >
              <img src={reel.img} alt="Reel Video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.65)', color: '#ffffff', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={12} />
                <span>{reel.views}</span>
              </div>

              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                  <Play size={24} color="#db2777" fill="#db2777" style={{ marginLeft: '3px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges Ribbon (Screenshot 5) */}
      <section style={{ background: '#ec4899', color: '#ffffff', padding: '24px 0', marginTop: '60px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Award size={32} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '900' }}>300+ BEAUTY BRANDS</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Top International Beauty</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={32} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '900' }}>100% AUTHENTIC PRODUCTS</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Direct Brand Sourced</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck size={32} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '900' }}>FAST DELIVERY ENSURED</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Across Bangladesh</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Headphones size={32} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '900' }}>FREE EXPERT SUPPORT</div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Dermatologist Guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Footer Section (Screenshot 5) */}
      <footer style={{ background: '#000000', color: '#94a3b8', padding: '50px 24px 30px 24px', fontSize: '13px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
          
          {/* Logo & Contact Info */}
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", marginBottom: '14px' }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>MAKEUP.</span>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#db2777', marginLeft: '4px' }}>CHARI</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '12.5px', marginBottom: '16px' }}>
              If you have any other queries about our products, delivery, or need advice on specific items, please don't hesitate to contact our team.
            </p>
            <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><Phone size={14} style={{ display: 'inline', marginRight: '6px' }} /> Call: +880 1644-931626</div>
              <div><Mail size={14} style={{ display: 'inline', marginRight: '6px' }} /> Email: info@makeupchari.com</div>
              <div><MessageCircle size={14} style={{ display: 'inline', marginRight: '6px' }} /> WhatsApp: +8801344-518642</div>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '800', marginBottom: '14px' }}>Popular Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ cursor: 'pointer' }}>Makeup</li>
              <li style={{ cursor: 'pointer' }}>Skin</li>
              <li style={{ cursor: 'pointer' }}>Body &amp; Bath</li>
              <li style={{ cursor: 'pointer' }}>Hair Care</li>
              <li style={{ cursor: 'pointer' }}>Fragrance</li>
              <li style={{ cursor: 'pointer' }}>Kids &amp; Mom</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '800', marginBottom: '14px' }}>Useful Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ cursor: 'pointer' }}>Track Order</li>
              <li style={{ cursor: 'pointer' }}>Terms &amp; Condition</li>
              <li style={{ cursor: 'pointer' }}>Privacy Policy</li>
              <li style={{ cursor: 'pointer' }}>Return &amp; Refund</li>
              <li style={{ cursor: 'pointer' }}>Suppliers Policy</li>
              <li style={{ cursor: 'pointer' }}>F.A.Q</li>
            </ul>
          </div>

          {/* Company & Payment Methods */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: '800', marginBottom: '14px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ cursor: 'pointer' }}>About Us</li>
              <li style={{ cursor: 'pointer' }}>Blog</li>
              <li style={{ cursor: 'pointer' }}>Contact Us</li>
              <li style={{ cursor: 'pointer' }}>Join Us</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #1e293b', marginTop: '40px', paddingTop: '20px', maxWidth: '1280px', margin: '40px auto 0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>© 2021-2026 Makeupchari - All Rights Reserved.</div>
          <div style={{ color: '#cbd5e1', fontWeight: '700' }}>
            💳 Verified Payment Gateways Accepted
          </div>
        </div>
      </footer>
    </div>
  );
}
