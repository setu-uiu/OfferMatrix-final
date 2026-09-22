import React, { useState } from 'react';
import {
  Sparkles, Clock, CheckCircle2, DollarSign, Star, Search, Bell, Phone,
  Video, MessageSquare, MapPin, Navigation, Send, Paperclip, Check,
  ChevronRight, ArrowUpRight, Heart, ShoppingBag, Eye, ShieldCheck, MoreVertical
} from 'lucide-react';

export default function SkincarePlatformView({ onToast }) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('All (5)');
  const [selectedOrderId, setSelectedOrderId] = useState('OM-SK-20260922-0012');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'customer', text: 'Hi! I have ordered some skincare products.', time: '10:12 AM' },
    { sender: 'me', text: "Okay! I've accepted your order. I'll pick it up soon.", time: '10:13 AM', read: true },
    { sender: 'customer', text: 'Thank you! Please handle with care. 🥰', time: '10:14 AM' },
    { sender: 'me', text: "Sure! I'll update you once I pick it up.", time: '10:14 AM', read: true }
  ]);

  const handleSendMessage = (textToSend) => {
    const msg = textToSend || chatMessage;
    if (!msg || !msg.trim()) return;

    const newMsg = {
      sender: 'me',
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatMessage('');
    if (onToast) onToast('Message sent to customer!');
  };

  const handleAction = (actionMsg) => {
    if (onToast) onToast(`${actionMsg} action triggered`);
  };

  // Skincare Orders List
  const ordersList = [
    {
      id: 'OM-SK-20260922-0012',
      storeName: 'Choice Legacy',
      storeBadgeBg: '#fff0f5',
      storeBadgeColor: '#ff2b70',
      timeAgo: '5 min ago',
      fare: '৳ 1,240',
      customerName: 'Tasmia Rahman',
      rating: 4.9,
      ordersCount: 12,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      pickup: 'Choice Legacy - Dhanmondi',
      pickupDist: '1.8 km away',
      deliver: 'House 12, Road 5, Dhanmondi',
      deliverDist: '3.6 km away',
      products: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1608248597263-000799965813?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80'
      ],
      isSelected: selectedOrderId === 'OM-SK-20260922-0012'
    },
    {
      id: 'OM-SK-20260922-0015',
      storeName: 'Kirei',
      storeBadgeBg: '#fff0f5',
      storeBadgeColor: '#e11d48',
      timeAgo: '8 min ago',
      fare: '৳ 980',
      customerName: 'Sifat Ahmed',
      rating: 4.8,
      ordersCount: 6,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      pickup: 'Kirei - Gulshan',
      pickupDist: '2.4 km away',
      deliver: 'Road 12, Banani',
      deliverDist: '4.1 km away',
      products: [
        'https://images.unsplash.com/photo-1608248597263-000799965813?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80'
      ],
      isSelected: selectedOrderId === 'OM-SK-20260922-0015'
    },
    {
      id: 'OM-SK-20260922-0018',
      storeName: 'Makeup Chari',
      storeBadgeBg: '#fff0f5',
      storeBadgeColor: '#ff2b70',
      timeAgo: '12 min ago',
      fare: '৳ 1,650',
      customerName: 'Nabila Islam',
      rating: 5.0,
      ordersCount: 20,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      pickup: 'Makeup Chari - Uttara',
      pickupDist: '3.2 km away',
      deliver: 'Sector 7, Uttara',
      deliverDist: '5.7 km away',
      products: [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1608248597263-000799965813?auto=format&fit=crop&w=150&q=80'
      ],
      isSelected: selectedOrderId === 'OM-SK-20260922-0018'
    },
    {
      id: 'OM-SK-20260922-0021',
      storeName: 'Skin Cafe',
      storeBadgeBg: '#fff0f5',
      storeBadgeColor: '#0284c7',
      timeAgo: '18 min ago',
      fare: '৳ 890',
      customerName: 'Farhan Khan',
      rating: 4.6,
      ordersCount: 9,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      pickup: 'Skin Cafe - Mirpur',
      pickupDist: '4.0 km away',
      deliver: 'Mirpur 10, Dhaka',
      deliverDist: '6.3 km away',
      products: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1608248597263-000799965813?auto=format&fit=crop&w=150&q=80'
      ],
      isSelected: selectedOrderId === 'OM-SK-20260922-0021'
    }
  ];

  const selectedOrder = ordersList.find(o => o.id === selectedOrderId) || ordersList[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

      {/* ================= TOP SEARCH & HEADER BAR ================= */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Skincare Partner Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Deliver authentic beauty products with trust.
          </p>
        </div>

        {/* Search Bar & User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search orders, customers, products, or locations..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '99px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                fontSize: '12.5px',
                outline: 'none',
                color: '#334155'
              }}
            />
          </div>

          <div
            onClick={() => handleAction('Notifications')}
            style={{ position: 'relative', cursor: 'pointer', color: '#475569' }}
          >
            <Bell size={22} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
              alt="Meherun Nesa"
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
            />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>Meherun Nesa</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Skincare Partner</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '6px 12px', borderRadius: '99px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: isOnline ? '#10b981' : '#64748b' }}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <div
              onClick={() => {
                setIsOnline(!isOnline);
                handleAction(isOnline ? 'Went Offline' : 'Went Online');
              }}
              style={{
                width: '36px',
                height: '20px',
                borderRadius: '99px',
                background: isOnline ? '#10b981' : '#cbd5e1',
                position: 'relative',
                padding: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#ffffff',
                marginLeft: isOnline ? 'auto' : '0',
                transition: 'all 0.2s ease'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TOP KPI CARDS ROW (5 CARDS + PROMO BANNER) ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 1.5fr', gap: '16px' }}>

        {/* Card 1: New Orders */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>New Orders</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>5</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 25%</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs yesterday</div>
          </div>
        </div>

        {/* Card 2: Ongoing Deliveries */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f3e8ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Ongoing Deliveries</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>3</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 0%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Completed Today */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Completed Today</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>18</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 38%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Today's Earnings */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Today's Earnings</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>৳ 3,250</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 22%</span>
            </div>
          </div>
        </div>

        {/* Card 5: Avg. Rating */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Star size={20} fill="#f59e0b" color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Avg. Rating</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>4.8</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 0.2</span>
            </div>
          </div>
        </div>

        {/* Promo Banner Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fff0f5 0%, #fce7f3 60%, #ffe4e6 100%)',
          borderRadius: '16px',
          border: '1px solid #fecdd3',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{
              fontFamily: "'Caveat', 'Playfair Display', cursive, sans-serif",
              fontSize: '20px',
              fontWeight: 800,
              color: '#ff2b70',
              lineHeight: 1.15
            }}>
              Beauty Delivered<br />
              Happier You! ♡
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80"
            alt="Beauty Serum"
            style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '12px', transform: 'rotate(8deg)', boxShadow: '0 4px 12px rgba(255, 43, 112, 0.2)' }}
          />
        </div>

      </div>

      {/* ================= MAIN 3-COLUMN WORKSPACE GRID ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: '20px' }}>

        {/* ---------------- COL 1: NEW SKINCARE ORDERS (5) ---------------- */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              New Skincare Orders (5)
            </h3>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
            {['All (5)', 'Choice Legacy (2)', 'Kirei (1)', 'Makeup Chari (1)', 'Others (1)'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); handleAction(`Filter tab ${tab}`); }}
                  style={{
                    background: isActive ? '#fff0f5' : '#f8fafc',
                    border: isActive ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '5px 2px',
                    fontSize: '10px',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#ff2b70' : '#64748b',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Orders Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {ordersList.map((item) => {
              const isSelected = selectedOrderId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedOrderId(item.id);
                    handleAction(`Selected ${item.storeName} Order`);
                  }}
                  style={{
                    background: isSelected ? '#fff0f5' : '#ffffff',
                    border: isSelected ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: isSelected ? '0 4px 16px rgba(255, 43, 112, 0.12)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Top Bar: Store Badge & Fare */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        background: '#ffffff',
                        border: '1px solid #fecdd3',
                        color: '#ff2b70',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 900
                      }}>
                        {item.storeName}
                      </div>
                      <span style={{ background: '#fef2f2', color: '#ef4444', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>New</span>
                      <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>{item.timeAgo}</span>
                    </div>

                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{item.fare}</div>
                  </div>

                  {/* Customer Line */}
                  <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>
                    Customer: <strong style={{ color: '#0f172a' }}>{item.customerName}</strong> • <span style={{ color: '#f59e0b', fontWeight: 800 }}>⭐ {item.rating}</span> <span style={{ color: '#94a3b8' }}>({item.ordersCount} orders)</span>
                  </div>

                  {/* Product Thumbnails Row (3 images) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.products.map((imgUrl, pIdx) => (
                      <img
                        key={pIdx}
                        src={imgUrl}
                        alt="Product"
                        style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                      />
                    ))}
                  </div>

                  {/* Pickup & Delivery Locations */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>Pickup: {item.pickup}</span>
                      <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: 'auto' }}>{item.pickupDist}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>Deliver: {item.deliver}</span>
                      <span style={{ color: '#94a3b8', fontSize: '10px', marginLeft: 'auto' }}>{item.deliverDist}</span>
                    </div>
                  </div>

                  {/* Decline & Accept Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAction(`Declined ${item.storeName} order`); }}
                      style={{
                        background: '#fff0f5',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '7px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#ff2b70',
                        cursor: 'pointer'
                      }}
                    >
                      Decline
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleAction(`Accepted ${item.storeName} order`); }}
                      style={{
                        background: '#ff2b70',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '7px',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(255, 43, 112, 0.25)'
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------- COL 2: ORDER DETAILS PANEL ---------------- */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Order Details
            </h3>
          </div>

          {/* Store & Order ID Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                background: '#fff0f5',
                border: '1px solid #fecdd3',
                color: '#ff2b70',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 900
              }}>
                {selectedOrder.storeName}
              </div>
              <span style={{ background: '#fef2f2', color: '#ef4444', padding: '2px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 800 }}>
                New Order
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>Order #{selectedOrder.id}</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{selectedOrder.timeAgo}</div>
            </div>
          </div>

          {/* Customer Information Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Customer Information
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={selectedOrder.avatar}
                  alt={selectedOrder.customerName}
                  style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
                />

                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#0f172a' }}>{selectedOrder.customerName}</div>
                  <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={11} fill="#f59e0b" color="#f59e0b" />
                    <span>{selectedOrder.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({selectedOrder.ordersCount} orders)</span></span>
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '1px' }}>
                    📞 +880 1712 345678
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => handleAction('Chat Customer')}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #ff2b70',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#ff2b70',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <MessageSquare size={12} color="#ff2b70" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => handleAction('Call Customer')}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #ff2b70',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#ff2b70',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Phone size={12} color="#ff2b70" />
                  <span>Call</span>
                </button>
              </div>
            </div>

            {/* Locations Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#f8fafc', padding: '10px 12px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
              {/* Pickup */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', marginTop: '4px' }}></span>
                  <div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Pickup Location</div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{selectedOrder.pickup}</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Shop 27, Dhanmondi Tower, Dhanmondi, Dhaka</div>
                  </div>
                </div>

                <button
                  onClick={() => handleAction('View Pickup on Map')}
                  style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '4px 8px', fontSize: '10px', fontWeight: 800, color: '#3b82f6', cursor: 'pointer' }}
                >
                  View on Map
                </button>
              </div>

              {/* Delivery */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', marginTop: '4px' }}></span>
                  <div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Delivery Location</div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{selectedOrder.deliver}</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Dhaka 1205</div>
                  </div>
                </div>

                <button
                  onClick={() => handleAction('View Delivery on Map')}
                  style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '4px 8px', fontSize: '10px', fontWeight: 800, color: '#3b82f6', cursor: 'pointer' }}
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>

          {/* Product Items (3) */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0' }}>
              Product Items (3)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Product 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80"
                    alt="COSRX Snail Essence"
                    style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>COSRX Advanced Snail 96 Essence</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>x 1</div>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#0f172a' }}>৳ 1,050</div>
              </div>

              {/* Product 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1608248597263-000799965813?auto=format&fit=crop&w=150&q=80"
                    alt="Beauty of Joseon Sunscreen"
                    style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Beauty of Joseon Relief Sun SPF50+</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>x 1</div>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#0f172a' }}>৳ 950</div>
              </div>

              {/* Product 3 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=150&q=80"
                    alt="Anua Heartleaf Toner"
                    style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Anua Heartleaf Toner 250ml</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>x 1</div>
                  </div>
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#0f172a' }}>৳ 790</div>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '11.5px', fontWeight: 900, color: '#0f172a', marginBottom: '2px' }}>Order Summary</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
              <span>Item Total</span>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>৳ 2,790</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
              <span>Platform Discount</span>
              <span style={{ fontWeight: 800, color: '#10b981' }}>- ৳ 550</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', paddingTop: '4px', borderTop: '1px stroke #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>Customer Paid</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>{selectedOrder.fare}</span>
                <span style={{ background: '#fff0f5', color: '#ff2b70', padding: '2px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: 800 }}>⚡ Prepaid (bKash)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Decline & Accept Order */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '10px' }}>
            <button
              onClick={() => handleAction(`Declined ${selectedOrder.storeName} Order`)}
              style={{
                background: '#fff0f5',
                border: 'none',
                borderRadius: '10px',
                padding: '11px',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#ff2b70',
                cursor: 'pointer'
              }}
            >
              Decline Order
            </button>

            <button
              onClick={() => handleAction(`Accepted ${selectedOrder.storeName} Order`)}
              style={{
                background: '#ff2b70',
                border: 'none',
                borderRadius: '10px',
                padding: '11px',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(255, 43, 112, 0.3)'
              }}
            >
              <Check size={16} />
              <span>Accept Order</span>
            </button>
          </div>
        </div>

        {/* ---------------- COL 3: CHAT & DELIVERY ROUTE MAP PANEL ---------------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Card 1: Chat with Customer */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Chat with Customer
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                  • Online
                </span>
                <MoreVertical size={15} color="#94a3b8" style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Customer Header Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={selectedOrder.avatar}
                  alt={selectedOrder.customerName}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{selectedOrder.customerName}</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Order #{selectedOrder.id}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div onClick={() => handleAction('Call Customer')} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #fecdd3', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Phone size={13} color="#ff2b70" />
                </div>
                <div onClick={() => handleAction('Video Call Customer')} style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #fecdd3', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Video size={13} color="#ff2b70" />
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '2px' }}>
              {chatMessages.map((msg, idx) => {
                const isMe = msg.sender === 'me';
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      background: isMe ? '#fff0f5' : '#f1f5f9',
                      color: isMe ? '#ff2b70' : '#1e293b',
                      padding: '7px 11px',
                      borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      maxWidth: '85%'
                    }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span>{msg.time}</span>
                      {isMe && <span style={{ color: '#10b981', fontWeight: 900 }}>✓✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preset Replies */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                {[
                  "On my way to pickup",
                  "Order picked up",
                  "On the way",
                  "Arrived at location",
                  "Can't find the address",
                  "Call me"
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(preset)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '5px 2px',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button onClick={() => handleAction('Attach File')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}>
                <Paperclip size={16} />
              </button>

              <input
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '99px',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  fontSize: '11.5px',
                  outline: 'none'
                }}
              />

              <button
                onClick={() => handleSendMessage()}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#ff2b70',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={13} />
              </button>
            </div>
          </div>

          {/* Card 2: Delivery Route (Real Google Location Map) */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Delivery Route
            </h4>

            {/* REAL INTERACTIVE GOOGLE MAP EMBED (Dhanmondi Tower to Road 5, Dhanmondi Route) */}
            <div style={{
              height: '180px',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #cbd5e1',
              background: '#e0f2fe'
            }}>
              <iframe
                title="Real Google Location Skincare Delivery Map"
                src="https://maps.google.com/maps?q=Dhanmondi+Tower,+Road+5,+Dhanmondi,+Dhaka,+Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                style={{ width: '100%', height: '100%', border: 0, opacity: 0.9 }}
                loading="lazy"
              ></iframe>

              {/* Map Route Blue Line */}
              <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                <path d="M 90 140 Q 140 100 190 50" fill="none" stroke="#3b82f6" strokeWidth="4" />
              </svg>

              {/* Pickup Pin */}
              <div style={{ position: 'absolute', bottom: '20%', left: '20%', zIndex: 20, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '8px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>●</div>
                <div style={{ background: '#ffffff', padding: '2px 5px', borderRadius: '4px', fontSize: '8.5px', fontWeight: 900, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>Pickup Choice Legacy</div>
              </div>

              {/* Dropoff Pin */}
              <div style={{ position: 'absolute', top: '15%', right: '25%', zIndex: 20, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '8px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>📍</div>
                <div style={{ background: '#ffffff', padding: '2px 5px', borderRadius: '4px', fontSize: '8.5px', fontWeight: 900, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>Drop-off Dhanmondi</div>
              </div>

              {/* Delivery Scooter Pin */}
              <div style={{ position: 'absolute', top: '48%', left: '50%', zIndex: 20 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(255,43,112,0.4)' }}>🛵</div>
              </div>
            </div>

            {/* Distance & Time Callouts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '8px', padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>1.8 km</div>
                <div style={{ fontSize: '9.5px', color: '#64748b' }}>to pickup</div>
              </div>

              <div style={{ background: '#fff0f5', border: '1px solid #fecdd3', borderRadius: '8px', padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#ff2b70' }}>3.6 km</div>
                <div style={{ fontSize: '9.5px', color: '#ff2b70' }}>to delivery</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Est. total time</div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>18 min</div>
              </div>

              <button
                onClick={() => handleAction('Start Route Navigation')}
                style={{
                  background: '#ffffff',
                  border: '1px solid #3b82f6',
                  borderRadius: '99px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#3b82f6',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Navigation size={12} color="#3b82f6" />
                <span>Navigate</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
