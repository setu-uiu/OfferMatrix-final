import React, { useState } from 'react';
import {
  Calendar, ChevronDown, Wallet, TrendingUp, Clock, DollarSign,
  Users, FileText, ArrowUpRight, ArrowDownRight, CheckCircle2, ChevronRight,
  Send, Check, Download, Settings, Eye, MoreVertical, CreditCard,
  Building, Percent, Sparkles, Utensils, Car
} from 'lucide-react';

export default function EarningsPayoutsView({ onToast }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Sep 1, 2026 - Sep 22, 2026');
  const [chartTimeframe, setChartTimeframe] = useState('Last 30 Days');

  const handleAction = (msg) => {
    if (onToast) onToast(msg);
  };

  // Recent Payouts Table Data matching screenshot exactly
  const recentPayouts = [
    {
      id: 'PO-20260922-001',
      partner: 'Rahim Ahmed',
      partnerCode: 'DP-1024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      platform: 'Food',
      platformType: 'food',
      amount: '৳ 4,250',
      period: '1 – 15 Sep 2026',
      status: 'Paid',
      statusType: 'paid',
      date: '22 Sep 2026'
    },
    {
      id: 'PO-20260922-002',
      partner: 'Sakib Hasan',
      partnerCode: 'DP-1056',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      platform: 'Ride',
      platformType: 'ride',
      amount: '৳ 5,800',
      period: '1 – 15 Sep 2026',
      status: 'Paid',
      statusType: 'paid',
      date: '22 Sep 2026'
    },
    {
      id: 'PO-20260922-003',
      partner: 'Tarek Rahman',
      partnerCode: 'DP-1090',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      platform: 'Food',
      platformType: 'food',
      amount: '৳ 3,950',
      period: '1 – 15 Sep 2026',
      status: 'Processing',
      statusType: 'processing',
      date: '—'
    },
    {
      id: 'PO-20260922-004',
      partner: 'Imran Khan',
      partnerCode: 'DP-1102',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      platform: 'Skincare',
      platformType: 'skincare',
      amount: '৳ 6,120',
      period: '1 – 15 Sep 2026',
      status: 'Paid',
      statusType: 'paid',
      date: '21 Sep 2026'
    },
    {
      id: 'PO-20260922-005',
      partner: 'Hasan Ali',
      partnerCode: 'DP-1077',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      platform: 'Ride',
      platformType: 'ride',
      amount: '৳ 4,760',
      period: '1 – 15 Sep 2026',
      status: 'Pending',
      statusType: 'pending',
      date: '—'
    }
  ];

  const renderPlatformBadge = (platformName, type) => {
    let bg = '#fff0f5';
    let text = '#ff2b70';
    let icon = <Utensils size={13} />;

    if (type === 'ride') {
      bg = '#eff6ff';
      text = '#2563eb';
      icon = <Car size={13} />;
    } else if (type === 'skincare') {
      bg = '#f3e8ff';
      text = '#9333ea';
      icon = <Sparkles size={13} />;
    }

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: bg, color: text, padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800 }}>
        {icon}
        <span>{platformName}</span>
      </div>
    );
  };

  const renderStatusBadge = (status) => {
    let bg = '#dcfce7';
    let text = '#16a34a';

    if (status === 'Processing') {
      bg = '#fef3c7';
      text = '#d97706';
    } else if (status === 'Pending') {
      bg = '#fee2e2';
      text = '#dc2626';
    }

    return (
      <span style={{
        background: bg,
        color: text,
        padding: '3px 10px',
        borderRadius: '99px',
        fontSize: '11.5px',
        fontWeight: 800,
        display: 'inline-block'
      }}>
        {status}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif", color: '#0f172a' }}>

      {/* PAGE HEADER ROW */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Earnings &amp; Payouts
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Track earnings, commissions, and manage partner payouts across all platforms.
          </p>
        </div>

        {/* Date Range Picker Dropdown */}
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
      </div>

      {/* METRIC / STAT CARDS ROW (4 CARDS MATCHING SCREENSHOT) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>

        {/* Card 1: Total Revenue */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Total Revenue</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>৳ 256,480</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 16% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Platform Commission */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fdf2f8', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Percent size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Platform Commission</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>৳ 38,472</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 12% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Partner Payouts */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Car size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Partner Payouts</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>৳ 192,340</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
              ↑ 20% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Payouts */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Pending Payouts</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>৳ 12,450</div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
              ↓ 8% <span style={{ fontWeight: 500, color: '#94a3b8' }}>vs last month</span>
            </div>
          </div>
        </div>

      </div>

      {/* TABS BAR (Overview, Partner Payouts, Transactions, Commission Breakdown, Pending Payouts) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', gap: '24px' }}>
        {['Overview', 'Partner Payouts', 'Transactions', 'Commission Breakdown', 'Pending Payouts'].map((tab) => {
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

      {/* MAIN TWO-COLUMN LAYOUT: (LEFT CONTENT AREA + RIGHT SIDEBAR WIDGETS) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>

        {/* LEFT COLUMN: CHARTS & RECENT PAYOUTS TABLE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* MIDDLE SECTION: EARNINGS OVERVIEW GRAPH + REVENUE BY PLATFORM DONUT CHART */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>

            {/* Left Card: Earnings Overview Curve Chart */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Earnings Overview</h3>
                <select
                  value={chartTimeframe}
                  onChange={(e) => setChartTimeframe(e.target.value)}
                  style={{ fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '4px 10px', background: '#f8fafc', color: '#475569', outline: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Year</option>
                </select>
              </div>

              {/* Chart SVG Visualization */}
              <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="0" y1="140" x2="400" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-Axis text labels */}
                  <text x="0" y="24" fill="#94a3b8" fontSize="10" fontWeight="600">৳ 40K</text>
                  <text x="0" y="64" fill="#94a3b8" fontSize="10" fontWeight="600">৳ 30K</text>
                  <text x="0" y="104" fill="#94a3b8" fontSize="10" fontWeight="600">৳ 20K</text>
                  <text x="0" y="144" fill="#94a3b8" fontSize="10" fontWeight="600">৳ 10K</text>

                  {/* Line 1: Total Revenue (Green Curve) */}
                  <path
                    d="M 40 120 Q 90 100 140 50 T 240 70 T 340 30 T 390 35"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Points on Line 1 */}
                  <circle cx="40" cy="120" r="4" fill="#10b981" />
                  <circle cx="140" cy="50" r="4" fill="#10b981" />
                  <circle cx="240" cy="70" r="4" fill="#10b981" />
                  <circle cx="340" cy="30" r="4" fill="#10b981" />

                  {/* Line 2: Partner Payouts (Blue Curve) */}
                  <path
                    d="M 40 135 Q 90 120 140 90 T 240 100 T 340 75 T 390 80"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Points on Line 2 */}
                  <circle cx="40" cy="135" r="4" fill="#3b82f6" />
                  <circle cx="140" cy="90" r="4" fill="#3b82f6" />
                  <circle cx="240" cy="100" r="4" fill="#3b82f6" />
                  <circle cx="340" cy="75" r="4" fill="#3b82f6" />

                  {/* Line 3: Platform Commission (Pink Curve) */}
                  <path
                    d="M 40 145 Q 90 140 140 125 T 240 120 T 340 110 T 390 100"
                    fill="none"
                    stroke="#ff2b70"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Points on Line 3 */}
                  <circle cx="40" cy="145" r="4" fill="#ff2b70" />
                  <circle cx="140" cy="125" r="4" fill="#ff2b70" />
                  <circle cx="240" cy="120" r="4" fill="#ff2b70" />
                  <circle cx="340" cy="110" r="4" fill="#ff2b70" />
                </svg>
              </div>

              {/* X-Axis Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginTop: '8px' }}>
                <span>1 Sep</span>
                <span>5 Sep</span>
                <span>10 Sep</span>
                <span>15 Sep</span>
                <span>20 Sep</span>
              </div>

              {/* Legend Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '14px', fontSize: '12px', fontWeight: 700 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                  <span>Total Revenue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff2b70' }}></span>
                  <span>Platform Commission</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></span>
                  <span>Partner Payouts</span>
                </div>
              </div>
            </div>

            {/* Right Card: Revenue by Platform Donut Chart */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: '0 0 12px 0' }}>Revenue by Platform</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Donut Chart SVG */}
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 36 36">
                    {/* Pink Segment (Food 42%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ff2b70"
                      strokeWidth="5"
                      strokeDasharray="42, 100"
                    />
                    {/* Blue Segment (Ride 28%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="5"
                      strokeDasharray="28, 100"
                      strokeDashoffset="-42"
                    />
                    {/* Purple Segment (Skincare 20%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="5"
                      strokeDasharray="20, 100"
                      strokeDashoffset="-70"
                    />
                    {/* Dark Segment (Others 10%) */}
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="5"
                      strokeDasharray="10, 100"
                      strokeDashoffset="-90"
                    />
                  </svg>
                  {/* Center Text */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>৳ 256,480</span>
                    <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 700 }}>Total Revenue</span>
                  </div>
                </div>

                {/* Donut Legend Items */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>

                  {/* Food */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Utensils size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        Food <span style={{ color: '#64748b', fontWeight: 600 }}>42%</span>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>৳ 107,721</div>
                    </div>
                  </div>

                  {/* Ride */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Car size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        Ride <span style={{ color: '#64748b', fontWeight: 600 }}>28%</span>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>৳ 71,814</div>
                    </div>
                  </div>

                  {/* Skincare */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f3e8ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={12} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        Skincare <span style={{ color: '#64748b', fontWeight: 600 }}>20%</span>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>৳ 51,296</div>
                    </div>
                  </div>

                  {/* Others */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>
                      ...
                    </div>
                    <div>
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                        Others <span style={{ color: '#64748b', fontWeight: 600 }}>10%</span>
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>৳ 25,649</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* RECENT PAYOUTS TABLE SECTION */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Recent Payouts</h3>
              <span
                onClick={() => handleAction('View All Recent Payouts')}
                style={{ fontSize: '12.5px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}
              >
                View All
              </span>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    <th style={{ padding: '10px 14px' }}>Payout ID</th>
                    <th style={{ padding: '10px 14px' }}>Partner</th>
                    <th style={{ padding: '10px 14px' }}>Platform</th>
                    <th style={{ padding: '10px 14px' }}>Amount</th>
                    <th style={{ padding: '10px 14px' }}>Period</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                    <th style={{ padding: '10px 14px' }}>Payout Date</th>
                    <th style={{ padding: '10px 14px', textCenter: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayouts.map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#475569', fontSize: '12px' }}>
                        {row.id}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={row.avatar} alt={row.partner} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '13px' }}>{row.partner}</div>
                            <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{row.partnerCode}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px' }}>
                        {renderPlatformBadge(row.platform, row.platformType)}
                      </td>
                      <td style={{ padding: '14px', fontWeight: 900, color: '#0f172a' }}>
                        {row.amount}
                      </td>
                      <td style={{ padding: '14px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>
                        {row.period}
                      </td>
                      <td style={{ padding: '14px' }}>
                        {renderStatusBadge(row.status)}
                      </td>
                      <td style={{ padding: '14px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>
                        {row.date}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleAction(`View payout detail ${row.id}`)}
                            style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', padding: '4px 10px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', color: '#334155' }}
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

          {/* SECURE PAYOUTS BANNER AT BOTTOM */}
          <div style={{
            background: '#ecfdf5',
            borderRadius: '14px',
            padding: '14px 20px',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#065f46' }}>
                All payouts are securely processed and recorded.
              </div>
              <div style={{ fontSize: '11.5px', color: '#047857', marginTop: '1px' }}>
                We ensure transparent and fair earnings for all our delivery partners.
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: SIDEBAR WIDGETS (4 CARDS MATCHING SCREENSHOT) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Widget 1: Promo Cursive Banner Card */}
          <div style={{
            background: 'linear-gradient(135deg, #ff2b70, #ec4899)',
            borderRadius: '16px',
            padding: '16px 20px',
            color: '#ffffff',
            position: 'relative',
            boxShadow: '0 4px 16px rgba(255, 43, 112, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, lineHeight: 1.3 }}>
                Fair Earnings<br />
                Stronger Partners<br />
                Bigger Tomorrow
              </div>
            </div>
            <div style={{ fontSize: '24px', opacity: 0.9 }}>
              💖
            </div>
          </div>

          {/* Widget 2: Next Payout Batch */}
          <div
            onClick={() => handleAction('Next Payout Batch detail')}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '14px 16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calendar size={18} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Next Payout Batch</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>25 Sep 2026</div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>12 partners • ৳ 18,600</div>
              </div>
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </div>

          {/* Widget 3: Pending Approvals */}
          <div
            onClick={() => handleAction('Pending Approvals detail')}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '14px 16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Pending Approvals</div>
                <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>5 payout requests</div>
              </div>
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </div>

          {/* Widget 4: Total Active Partners */}
          <div
            onClick={() => handleAction('Total Active Partners detail')}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '14px 16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Total Active Partners</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>28</span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a' }}>↑ 12%</span>
                </div>
              </div>
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </div>

          {/* Widget 5: Payout Methods List Card */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Payout Methods</h4>
              <span onClick={() => handleAction('Manage Payout Methods')} style={{ fontSize: '11.5px', fontWeight: 800, color: '#2563eb', cursor: 'pointer' }}>Manage</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* bKash */}
              <div onClick={() => handleAction('bKash payout options')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px' }}>
                    ৳
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>bKash</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>16 partners</div>
                  </div>
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>

              {/* Nagad */}
              <div onClick={() => handleAction('Nagad payout options')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '11px' }}>
                    ৳
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>Nagad</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>8 partners</div>
                  </div>
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>

              {/* Bank Transfer */}
              <div onClick={() => handleAction('Bank Transfer options')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>Bank Transfer</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>4 partners</div>
                  </div>
                </div>
                <ChevronRight size={14} color="#94a3b8" />
              </div>
            </div>
          </div>

          {/* Widget 6: Quick Actions 2x2 Grid */}
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>Quick Actions</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

              {/* Action 1: Process Payouts */}
              <div
                onClick={() => handleAction('Process Payouts modal')}
                style={{
                  background: '#fff0f5',
                  border: '1px solid #fecdd3',
                  borderRadius: '12px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                  <Send size={13} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Process Payouts</div>
              </div>

              {/* Action 2: Approve Requests */}
              <div
                onClick={() => handleAction('Approve Requests modal')}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                  <Check size={13} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Approve Requests</div>
              </div>

              {/* Action 3: Download Report */}
              <div
                onClick={() => handleAction('Download Report')}
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '12px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                  <Download size={13} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Download Report</div>
              </div>

              {/* Action 4: Payout Settings */}
              <div
                onClick={() => handleAction('Payout Settings')}
                style={{
                  background: '#f3e8ff',
                  border: '1px solid #e9d5ff',
                  borderRadius: '12px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#a855f7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px auto' }}>
                  <Settings size={13} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>Payout Settings</div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
