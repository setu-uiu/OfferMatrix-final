import React, { useState } from 'react';
import {
  Star, Calendar, ChevronDown, Download, Filter, Search, Eye,
  MoreVertical, Smile, Frown, Lightbulb, MessageSquare, ThumbsUp,
  Utensils, Car, Sparkles, ChevronRight, Check
} from 'lucide-react';

export default function RatingsReviewsView({ onToast }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Sep 1, 2026 - Sep 22, 2026');

  // Filters State
  const [platformFilter, setPlatformFilter] = useState('All Platforms');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [orderTypeFilter, setOrderTypeFilter] = useState('All Order Types');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const handleAction = (msg) => {
    if (onToast) onToast(msg);
  };

  // 5 Sample Customer Reviews matching screenshot table
  const customerReviewsList = [
    {
      id: 1,
      customer: 'Nabila Islam',
      phone: '+880 1712 345678',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      orderId: 'OM-20250922-0012',
      platform: 'Foodpanda',
      platformType: 'foodpanda',
      rating: 5,
      reviewText: 'Amazing food! Fast delivery and very polite rider. Highly recommended!',
      date: '22 Sep 2026',
      time: '2:15 PM',
      type: 'Food Order',
      typeBg: '#fff0f5',
      typeColor: '#ff2b70'
    },
    {
      id: 2,
      customer: 'Samiul Haque',
      phone: '+880 1689 123456',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      orderId: 'OM-20250922-0011',
      platform: 'Kirei',
      platformType: 'kirei',
      rating: 4,
      reviewText: 'Product quality is good and nicely packed.',
      date: '22 Sep 2026',
      time: '11:40 AM',
      type: 'Skincare Order',
      typeBg: '#eff6ff',
      typeColor: '#2563eb'
    },
    {
      id: 3,
      customer: 'Ayesha Khan',
      phone: '+880 1700 987654',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      orderId: 'OM-20250922-0010',
      platform: 'Pathao Food',
      platformType: 'pathao',
      rating: 5,
      reviewText: 'Delivery partner was very friendly and on time.',
      date: '21 Sep 2026',
      time: '8:20 PM',
      type: 'Food Order',
      typeBg: '#fff0f5',
      typeColor: '#ff2b70'
    },
    {
      id: 4,
      customer: 'Tanvir Ahmed',
      phone: '+880 1800 111222',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      orderId: 'OM-20250922-0009',
      platform: 'Foodi',
      platformType: 'foodi',
      rating: 2,
      reviewText: 'Food was cold and arrived late. Not satisfied.',
      date: '21 Sep 2026',
      time: '7:10 PM',
      type: 'Food Order',
      typeBg: '#fff0f5',
      typeColor: '#ff2b70'
    },
    {
      id: 5,
      customer: 'Meherun Nesa',
      phone: '+880 1711 223344',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      orderId: 'OM-20250922-0008',
      platform: 'Choice Legacy',
      platformType: 'choice',
      rating: 5,
      reviewText: 'Authentic product and fast delivery. Will order again!',
      date: '21 Sep 2026',
      time: '5:45 PM',
      type: 'Skincare Order',
      typeBg: '#eff6ff',
      typeColor: '#2563eb'
    }
  ];

  // Recent Feedback widget list
  const recentFeedbackList = [
    {
      name: 'Nabila Islam',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      platform: 'Foodpanda BD',
      platformType: 'foodpanda',
      timeAgo: '2 hours ago',
      rating: 5,
      comment: 'Great food and fast delivery!'
    },
    {
      name: 'Samiul Haque',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      platform: 'Kirei',
      platformType: 'kirei',
      timeAgo: '5 hours ago',
      rating: 4,
      comment: 'Good packaging and product quality.'
    },
    {
      name: 'Ayesha Khan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      platform: 'Pathao Food',
      platformType: 'pathao',
      timeAgo: '1 day ago',
      rating: 5,
      comment: 'Very helpful delivery partner.'
    },
    {
      name: 'Tanvir Ahmed',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      platform: 'Foodi',
      platformType: 'foodi',
      timeAgo: '1 day ago',
      rating: 2,
      comment: 'Food was cold, late delivery.'
    }
  ];

  // Helper for rendering Platform Badge
  const renderPlatformLogo = (type) => {
    if (type === 'foodpanda') {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ff2b70', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
          🐼
        </div>
      );
    }
    if (type === 'pathao') {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>
          P
        </div>
      );
    }
    if (type === 'choice') {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#db2777', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900 }}>
          CL
        </div>
      );
    }
    if (type === 'foodi') {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f97316', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>
          f
        </div>
      );
    }
    if (type === 'kirei') {
      return (
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1e293b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>
          K
        </div>
      );
    }
    return null;
  };

  // Helper for rendering Yellow Star Rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#f59e0b' : '#e2e8f0', fontSize: '14px' }}>
          ★
        </span>
      );
    }
    return <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif", color: '#0f172a' }}>

      {/* PAGE HEADER ROW */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Ratings &amp; Reviews
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            See what customers say about orders, delivery partners, and overall service quality.
          </p>
        </div>

        {/* Date Range & Export Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#334155',
            cursor: 'pointer'
          }}>
            <Calendar size={15} color="#64748b" />
            <span>{dateRange}</span>
            <ChevronDown size={14} color="#64748b" />
          </div>

          <button
            onClick={() => handleAction('Exported Reviews CSV/Excel')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ff2b70',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '13.5px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 43, 112, 0.25)'
            }}
          >
            <Download size={16} />
            <span>Export Reviews</span>
          </button>
        </div>
      </div>

      {/* METRIC / STAT CARDS ROW (4 CARDS MATCHING SCREENSHOT) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>

        {/* Card 1: Overall Rating */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={22} fill="#d97706" />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>Overall Rating</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>4.6 / 5</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 0.2 <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Reviews */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>Total Reviews</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>1,284</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 18% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Positive Reviews */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Smile size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>Positive Reviews</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>92%</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 6% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Negative Reviews */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Frown size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>Negative Reviews</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>8%</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
              ↓ 4% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

      </div>

      {/* TABS BAR (Overview, Customer Reviews, Delivery Partner Reviews, Restaurant/Store Reviews, Product Reviews) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '24px' }}>
        {['Overview', 'Customer Reviews', 'Delivery Partner Reviews', 'Restaurant/Store Reviews', 'Product Reviews'].map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                handleAction(`Switched to ${tab}`);
              }}
              style={{
                padding: '10px 0',
                border: 'none',
                borderBottom: isSelected ? '3px solid #ff2b70' : '3px solid transparent',
                background: 'transparent',
                color: isSelected ? '#ff2b70' : '#64748b',
                fontSize: '13.5px',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* FILTER BAR (DROPDOWNS & FILTER BUTTON) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, color: '#334155', outline: 'none', cursor: 'pointer' }}
        >
          <option>All Platforms</option>
          <option>Foodpanda</option>
          <option>Pathao Food</option>
          <option>Choice Legacy</option>
          <option>Foodi</option>
          <option>Kirei</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, color: '#334155', outline: 'none', cursor: 'pointer' }}
        >
          <option>All Ratings</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>

        <select
          value={orderTypeFilter}
          onChange={(e) => setOrderTypeFilter(e.target.value)}
          style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, color: '#334155', outline: 'none', cursor: 'pointer' }}
        >
          <option>All Order Types</option>
          <option>Food Order</option>
          <option>Skincare Order</option>
          <option>Ride Booking</option>
        </select>

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, color: '#334155', outline: 'none', cursor: 'pointer' }}
        >
          <option>All Time</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>Last 3 Months</option>
        </select>

        <button
          onClick={() => handleAction('Applied review filters')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ff2b70',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 43, 112, 0.25)'
          }}
        >
          <Filter size={14} />
          <span>Filter</span>
        </button>
      </div>

      {/* MIDDLE GRID: (LEFT: Rating Distribution Bar Card, RIGHT: Average Rating by Platform Bar Chart) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>

        {/* Left Card: Rating Distribution */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px 0' }}>Rating Distribution</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: '5 Stars', count: '642 (50%)', width: '50%', color: '#10b981' },
              { label: '4 Stars', count: '398 (31%)', width: '31%', color: '#34d399' },
              { label: '3 Stars', count: '152 (12%)', width: '12%', color: '#f59e0b' },
              { label: '2 Stars', count: '54 (4%)', width: '4%', color: '#f97316' },
              { label: '1 Star', count: '38 (3%)', width: '3%', color: '#ff2b70' }
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569', width: '54px' }}>{row.label}</span>
                <div style={{ flex: 1, height: '10px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: row.width, height: '100%', background: row.color, borderRadius: '99px' }}></div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', width: '70px', textAlign: 'right' }}>{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Average Rating by Platform Vertical Bar Chart */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px 0' }}>Average Rating by Platform</h3>

          {/* Vertical Bar Chart Container */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '150px', padding: '0 10px' }}>
            {[
              { name: 'Foodpanda', score: '4.7', barH: '90%', color: '#ff2b70', logoType: 'foodpanda' },
              { name: 'Pathao Food', score: '4.5', barH: '80%', color: '#ff2b70', logoType: 'pathao' },
              { name: 'Choice Legacy', score: '4.6', barH: '85%', color: '#ff2b70', logoType: 'choice' },
              { name: 'Foodi', score: '4.4', barH: '75%', color: '#f97316', logoType: 'foodi' },
              { name: 'Kirei', score: '4.3', barH: '70%', color: '#cbd5e1', logoType: 'kirei' }
            ].map((col) => (
              <div key={col.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f172a' }}>{col.score}</span>
                <div style={{ width: '28px', height: col.barH, background: col.color, borderRadius: '6px 6px 0 0' }}></div>
                <div style={{ marginTop: '4px' }}>
                  {renderPlatformLogo(col.logoType)}
                </div>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>{col.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* LOWER SECTION: TABLE (70%) + RIGHT WIDGETS (30%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>

        {/* LEFT SIDE: CUSTOMER REVIEWS TABLE */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>

          {/* Table Header & Search Input Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Customer Reviews <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>(1,284)</span>
            </h3>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by customer name, order ID, review text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 34px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12.5px',
                  outline: 'none',
                  color: '#334155'
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  <th style={{ padding: '10px 12px', width: '30px' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                  </th>
                  <th style={{ padding: '10px 12px' }}>Customer</th>
                  <th style={{ padding: '10px 12px' }}>Order ID</th>
                  <th style={{ padding: '10px 12px' }}>Platform</th>
                  <th style={{ padding: '10px 12px' }}>Rating</th>
                  <th style={{ padding: '10px 12px' }}>Review</th>
                  <th style={{ padding: '10px 12px' }}>Date</th>
                  <th style={{ padding: '10px 12px' }}>Type</th>
                  <th style={{ padding: '10px 12px', textCenter: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerReviewsList.map((row) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }}>
                      <input type="checkbox" style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={row.avatar} alt={row.customer} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px' }}>{row.customer}</div>
                          <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{row.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#475569', fontSize: '11.5px' }}>
                      {row.orderId}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {renderPlatformLogo(row.platformType)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {renderStars(row.rating)}
                    </td>
                    <td style={{ padding: '12px', color: '#334155', fontWeight: 500, maxWidth: '200px', lineHeight: 1.3 }}>
                      {row.reviewText}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ fontWeight: 600, color: '#475569', fontSize: '11.5px' }}>{row.date}</div>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>{row.time}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: row.typeBg, color: row.typeColor, padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, whitespace: 'nowrap' }}>
                        {row.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => handleAction(`View review #${row.id}`)}
                          style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', color: '#334155' }}
                        >
                          View
                        </button>
                        <MoreVertical size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => handleAction(`Options for review #${row.id}`)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div style={{
            padding: '14px 0 0 0',
            marginTop: '10px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>
              Showing 1–5 of 1,284 reviews
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button style={{ border: '1px solid #e2e8f0', background: '#ffffff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}>&lt;</button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  style={{
                    border: p === 1 ? 'none' : '1px solid #e2e8f0',
                    background: p === 1 ? '#ff2b70' : '#ffffff',
                    color: p === 1 ? '#ffffff' : '#475569',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: p === 1 ? 800 : 600,
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              ))}
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>...</span>
              <button style={{ border: '1px solid #e2e8f0', background: '#ffffff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#475569' }}>257</button>
              <button style={{ border: '1px solid #e2e8f0', background: '#ffffff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}>&gt;</button>
            </div>

            <select style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', color: '#475569', outline: 'none' }}>
              <option>5 per page</option>
              <option>10 per page</option>
              <option>25 per page</option>
            </select>
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN WIDGETS (2 CARDS MATCHING SCREENSHOT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Widget 1: Recent Feedback */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Recent Feedback</h4>
              <span onClick={() => handleAction('View All Recent Feedback')} style={{ fontSize: '11.5px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View All</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentFeedbackList.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderBottom: idx < recentFeedbackList.length - 1 ? '1px solid #f8fafc' : 'none', paddingBottom: idx < recentFeedbackList.length - 1 ? '10px' : '0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={item.avatar} alt={item.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{item.name}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>{item.timeAgo}</div>
                      </div>
                    </div>
                    {renderPlatformLogo(item.platformType)}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    {renderStars(item.rating)}
                  </div>

                  <p style={{ fontSize: '11.5px', color: '#475569', margin: '2px 0 0 0', fontWeight: 500, lineHeight: 1.3 }}>
                    "{item.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 2: Review Insights */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Review Insights</h4>
              <span onClick={() => handleAction('View Full Insights Report')} style={{ fontSize: '11.5px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View Report</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* Section 1: What Customers Love */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Smile size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>What Customers Love</div>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '14px', fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                    <li>Fast delivery</li>
                    <li>Good product quality</li>
                    <li>Friendly delivery partners</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: Common Complaints */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Frown size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Common Complaints</div>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '14px', fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                    <li>Late delivery</li>
                    <li>Cold food</li>
                    <li>Product packaging issues</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Suggestions */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Lightbulb size={14} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Suggestions</div>
                  <ul style={{ margin: '4px 0 0 0', paddingLeft: '14px', fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                    <li>More delivery partners in peak hours</li>
                    <li>Better packaging</li>
                    <li>More discount offers</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
