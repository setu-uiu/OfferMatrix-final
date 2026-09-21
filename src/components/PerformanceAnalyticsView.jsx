import React, { useState } from 'react';
import {
  Calendar, ChevronDown, Download, Box, CheckCircle2, Clock, Star,
  TrendingUp, XCircle, AlertTriangle, AlertCircle, Search, Filter,
  MoreVertical, Eye, Utensils, Car, Sparkles, ChevronRight, Check
} from 'lucide-react';

export default function PerformanceAnalyticsView({ onToast }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Sep 1, 2026 - Sep 22, 2026');
  const [chartTimeframe, setChartTimeframe] = useState('Last 30 Days');

  // Filter States for Partner Table
  const [partnerSearch, setPartnerSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All Platforms');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const handleAction = (msg) => {
    if (onToast) onToast(msg);
  };

  // Top Performing Partners Data
  const topPartners = [
    { rank: 1, name: 'Rahim Ahmed', id: 'DP-1024', deliveries: 245, onTime: '98%', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { rank: 2, name: 'Imran Khan', id: 'DP-1102', deliveries: 198, onTime: '96%', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80' },
    { rank: 3, name: 'Sakib Hasan', id: 'DP-1056', deliveries: 176, onTime: '94%', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { rank: 4, name: 'Tarek Rahman', id: 'DP-1090', deliveries: 162, onTime: '92%', rating: 4.6, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80' },
    { rank: 5, name: 'Hasan Ali', id: 'DP-1077', deliveries: 148, onTime: '91%', rating: 4.5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' }
  ];

  // Platform Performance List
  const platformPerfList = [
    { name: 'Foodpanda', type: 'foodpanda', deliveries: 302, score: 94, target: 90, trend: '↑ 6%' },
    { name: 'Pathao Food', type: 'pathao', deliveries: 184, score: 90, target: 92, trend: '↑ 3%' },
    { name: 'Choice Legacy', type: 'choice', deliveries: 156, score: 88, target: 90, trend: '↑ 5%' },
    { name: 'Foodi', type: 'foodi', deliveries: 120, score: 92, target: 92, trend: '↑ 8%' },
    { name: 'Kirei', type: 'kirei', deliveries: 80, score: 87, target: 85, trend: '↑ 4%' }
  ];

  // Partner Details Table Data
  const partnerDetails = [
    { rank: 1, name: 'Rahim Ahmed', id: 'DP-1024', totalDeliveries: 245, onTime: '98%', avgTime: '26 min', rating: 4.9, cancelRate: '1.2%', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { rank: 2, name: 'Imran Khan', id: 'DP-1102', totalDeliveries: 198, onTime: '96%', avgTime: '28 min', rating: 4.8, cancelRate: '1.8%', status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80' },
    { rank: 3, name: 'Sakib Hasan', id: 'DP-1056', totalDeliveries: 176, onTime: '94%', avgTime: '30 min', rating: 4.7, cancelRate: '2.1%', status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { rank: 4, name: 'Tarek Rahman', id: 'DP-1090', totalDeliveries: 162, onTime: '92%', avgTime: '32 min', rating: 4.6, cancelRate: '2.5%', status: 'Active', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80' },
    { rank: 5, name: 'Hasan Ali', id: 'DP-1077', totalDeliveries: 148, onTime: '91%', avgTime: '34 min', rating: 4.5, cancelRate: '3.0%', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' }
  ];

  // Helper for Platform Badge render
  const renderPlatformLogo = (type) => {
    if (type === 'foodpanda') {
      return (
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ff2b70', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
          🐼
        </div>
      );
    }
    if (type === 'pathao') {
      return (
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900 }}>
          P
        </div>
      );
    }
    if (type === 'choice') {
      return (
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#db2777', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>
          CL
        </div>
      );
    }
    if (type === 'foodi') {
      return (
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f97316', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900 }}>
          f
        </div>
      );
    }
    if (type === 'kirei') {
      return (
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1e293b', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 900 }}>
          K
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif", color: '#0f172a' }}>

      {/* PAGE HEADER ROW */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Performance Analytics
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Track delivery performance, partner efficiency, and service quality across all platforms.
          </p>
        </div>

        {/* Top Right Controls */}
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
            onClick={() => handleAction('Exported Performance Report CSV/PDF')}
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
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* METRIC / STAT CARDS ROW (4 CARDS MATCHING SCREENSHOT) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>

        {/* Card 1: Total Deliveries */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fdf2f8', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Total Deliveries</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>842</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 18% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: On-Time Deliveries */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>On-Time Deliveries</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>92%</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 4% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Avg. Delivery Time */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Avg. Delivery Time</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>28 min</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↓ 12% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Customer Satisfaction */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Customer Satisfaction</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>4.7 / 5</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 0.3 <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

      </div>

      {/* TABS BAR (Overview, Delivery Partners, Platform Performance, Order Performance, Customer Feedback) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '24px' }}>
        {['Overview', 'Delivery Partners', 'Platform Performance', 'Order Performance', 'Customer Feedback'].map((tab) => {
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

      {/* MIDDLE SECTION 3 CARDS ROW: (1. Delivery Performance Trend, 2. Performance by Platform, 3. Top Performing Partners) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '20px' }}>

        {/* Card 1: Delivery Performance Trend Graph */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Delivery Performance Trend</h3>
            <select
              value={chartTimeframe}
              onChange={(e) => setChartTimeframe(e.target.value)}
              style={{ fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '4px 8px', background: '#f8fafc', color: '#475569', outline: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>

          {/* Dual Axis SVG Chart with Bars & Lines */}
          <div style={{ width: '100%', height: '170px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 380 150" preserveAspectRatio="none">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="50" x2="380" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="80" x2="380" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="110" x2="380" y2="110" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="140" x2="380" y2="140" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y-Left axis labels (Deliveries) */}
              <text x="0" y="24" fill="#94a3b8" fontSize="9" fontWeight="600">200</text>
              <text x="0" y="54" fill="#94a3b8" fontSize="9" fontWeight="600">150</text>
              <text x="0" y="84" fill="#94a3b8" fontSize="9" fontWeight="600">100</text>
              <text x="0" y="114" fill="#94a3b8" fontSize="9" fontWeight="600">50</text>
              <text x="0" y="144" fill="#94a3b8" fontSize="9" fontWeight="600">0</text>

              {/* Y-Right axis labels (Time / %) */}
              <text x="360" y="24" fill="#94a3b8" fontSize="9" fontWeight="600">75</text>
              <text x="360" y="64" fill="#94a3b8" fontSize="9" fontWeight="600">50</text>
              <text x="360" y="104" fill="#94a3b8" fontSize="9" fontWeight="600">25</text>
              <text x="360" y="144" fill="#94a3b8" fontSize="9" fontWeight="600">0</text>

              {/* Light Blue Bars for Deliveries */}
              {[
                { x: 30, h: 50 }, { x: 55, h: 65 }, { x: 80, h: 70 }, { x: 105, h: 75 },
                { x: 130, h: 80 }, { x: 155, h: 60 }, { x: 180, h: 70 }, { x: 205, h: 85 },
                { x: 230, h: 90 }, { x: 255, h: 70 }, { x: 280, h: 80 }, { x: 305, h: 95 }, { x: 330, h: 100 }
              ].map((bar, idx) => (
                <rect key={idx} x={bar.x} y={140 - bar.h} width="12" height={bar.h} fill="#dbeafe" rx="2" opacity="0.8" />
              ))}

              {/* Green Line for On-Time Deliveries % */}
              <path
                d="M 36 75 Q 85 45 135 48 T 235 52 T 335 42"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="36" cy="75" r="3.5" fill="#10b981" />
              <circle cx="135" cy="48" r="3.5" fill="#10b981" />
              <circle cx="235" cy="52" r="3.5" fill="#10b981" />
              <circle cx="335" cy="42" r="3.5" fill="#10b981" />

              {/* Pink Line for Avg Delivery Time */}
              <path
                d="M 36 100 Q 85 105 135 110 T 235 108 T 335 102"
                fill="none"
                stroke="#ff2b70"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="36" cy="100" r="3.5" fill="#ff2b70" />
              <circle cx="135" cy="110" r="3.5" fill="#ff2b70" />
              <circle cx="235" cy="108" r="3.5" fill="#ff2b70" />
              <circle cx="335" cy="102" r="3.5" fill="#ff2b70" />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>
            <span>1 Sep</span>
            <span>5 Sep</span>
            <span>10 Sep</span>
            <span>15 Sep</span>
            <span>20 Sep</span>
          </div>

          {/* Legend Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '10px', fontSize: '11px', fontWeight: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span>
              <span style={{ color: '#475569' }}>Total Deliveries</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              <span style={{ color: '#475569' }}>On-Time Deliveries (%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff2b70' }}></span>
              <span style={{ color: '#475569' }}>Avg. Delivery Time (min)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Performance by Platform */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0' }}>Performance by Platform</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {platformPerfList.map((plat) => (
              <div key={plat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {renderPlatformLogo(plat.type)}
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{plat.name}</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{plat.deliveries} deliveries</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Score Pill / Progress Circle */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '3px solid #2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 900,
                    color: '#2563eb'
                  }}>
                    {plat.score}%
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{plat.target}%</div>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a' }}>{plat.trend}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Top Performing Partners */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Top Performing Partners</h3>
            <span onClick={() => handleAction('View All Top Partners')} style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topPartners.map((p) => (
              <div key={p.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: p.rank === 1 ? '#f59e0b' : p.rank === 2 ? '#94a3b8' : p.rank === 3 ? '#b45309' : '#f1f5f9',
                    color: p.rank <= 3 ? '#ffffff' : '#64748b',
                    fontSize: '10.5px',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {p.rank}
                  </div>
                  <img src={p.avatar} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{p.name}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{p.id} • {p.deliveries} deliveries</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#ecfdf5', padding: '2px 6px', borderRadius: '6px' }}>
                    🛡️ {p.onTime}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b' }}>
                    ⭐ {p.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* LOWER SECTION 3 CARDS ROW: (1. Key Performance Metrics, 2. Order Status Distribution, 3. Areas for Improvement) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '20px' }}>

        {/* Card 1: Key Performance Metrics (3 Sub-Cards) */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 14px 0' }}>Key Performance Metrics</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {/* Metric 1: Delivery Success Rate */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px', border: '1px solid #f1f5f9' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <CheckCircle2 size={16} />
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>Delivery Success Rate</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '2px 0' }}>96%</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#16a34a' }}>↑ 3% <span style={{ color: '#94a3b8', fontWeight: 500 }}>vs last month</span></div>
            </div>

            {/* Metric 2: Cancellation Rate */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px', border: '1px solid #f1f5f9' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <XCircle size={16} />
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>Cancellation Rate</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '2px 0' }}>2.8%</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#16a34a' }}>↓ 1.2% <span style={{ color: '#94a3b8', fontWeight: 500 }}>vs last month</span></div>
            </div>

            {/* Metric 3: Avg. Preparation Time */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px', border: '1px solid #f1f5f9' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dbeafe', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <Clock size={16} />
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>Avg. Preparation Time</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '2px 0' }}>12 min</div>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#16a34a' }}>↓ 10% <span style={{ color: '#94a3b8', fontWeight: 500 }}>vs last month</span></div>
            </div>
          </div>
        </div>

        {/* Card 2: Order Status Distribution Donut Chart */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0' }}>Order Status Distribution</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px' }}>
              <svg width="100" height="100" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="5" strokeDasharray="91, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="5" strokeDasharray="6, 100" strokeDashoffset="-91" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="5" strokeDasharray="2, 100" strokeDashoffset="-97" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#dc2626" strokeWidth="5" strokeDasharray="1, 100" strokeDashoffset="-99" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>842</span>
                <span style={{ fontSize: '8.5px', color: '#64748b', fontWeight: 700 }}>Total Orders</span>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}><span style={{ color: '#10b981' }}>●</span> Delivered</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>771 (91%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}><span style={{ color: '#3b82f6' }}>●</span> On the Way</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>48 (6%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}><span style={{ color: '#f59e0b' }}>●</span> Preparing</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>14 (2%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}><span style={{ color: '#dc2626' }}>●</span> Cancelled</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>9 (1%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Areas for Improvement */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Areas for Improvement</h3>
            <span onClick={() => handleAction('View Details Areas for Improvement')} style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View Details</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Issue 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertCircle size={12} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Delayed Deliveries</div>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>High during peak hours (7-9 PM)</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626' }}>8%</span>
            </div>

            {/* Issue 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={12} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Customer Complaints</div>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Mostly related to late delivery</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706' }}>5%</span>
            </div>

            {/* Issue 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle size={12} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Order Cancellations</div>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Due to restaurant unavailability</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626' }}>2.8%</span>
            </div>

            {/* Issue 4 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={12} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Low Rated Deliveries</div>
                  <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>Need better partner training</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#d97706' }}>4%</span>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: PARTNER PERFORMANCE DETAILS TABLE */}
      <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
        {/* Table Header & Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Partner Performance Details</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search partner name or ID..."
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 32px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12.5px',
                  outline: 'none',
                  color: '#334155'
                }}
              />
            </div>

            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '8px', padding: '6px 10px', fontSize: '12.5px', color: '#475569', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              <option>All Platforms</option>
              <option>Foodpanda</option>
              <option>Pathao Food</option>
              <option>Choice Legacy</option>
              <option>Foodi</option>
              <option>Kirei</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '8px', padding: '6px 10px', fontSize: '12.5px', color: '#475569', outline: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Busy</option>
              <option>Offline</option>
            </select>

            <button
              onClick={() => handleAction('Downloaded partner performance table')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ff2b70',
                color: '#ffffff',
                border: 'none',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(255, 43, 112, 0.25)'
              }}
            >
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                <th style={{ padding: '10px 12px', width: '30px' }}>#</th>
                <th style={{ padding: '10px 12px' }}>Partner</th>
                <th style={{ padding: '10px 12px' }}>ID</th>
                <th style={{ padding: '10px 12px' }}>Total Deliveries</th>
                <th style={{ padding: '10px 12px' }}>On-Time %</th>
                <th style={{ padding: '10px 12px' }}>Avg. Time</th>
                <th style={{ padding: '10px 12px' }}>Rating</th>
                <th style={{ padding: '10px 12px' }}>Cancellation %</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px', textCenter: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partnerDetails.map((row) => (
                <tr key={row.rank} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#94a3b8' }}>{row.rank}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={row.avatar} alt={row.name} style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: '#64748b', fontWeight: 600 }}>{row.id}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: '#0f172a' }}>{row.totalDeliveries}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: '#16a34a' }}>{row.onTime}</td>
                  <td style={{ padding: '12px', color: '#475569', fontWeight: 600 }}>{row.avgTime}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: '#f59e0b' }}>⭐ {row.rating}</td>
                  <td style={{ padding: '12px', color: '#dc2626', fontWeight: 700 }}>{row.cancelRate}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleAction(`View partner detail ${row.id}`)}
                        style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', color: '#334155' }}
                      >
                        View
                      </button>
                      <MoreVertical size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => handleAction(`Options for ${row.id}`)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
