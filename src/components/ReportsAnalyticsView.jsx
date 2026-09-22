import React, { useState } from 'react';
import {
  ShoppingBag, DollarSign, Users, Star, AlertTriangle, FileText, Download,
  Calendar, Filter, RefreshCw, ChevronDown, ArrowUpRight, ArrowDownRight,
  TrendingUp, CheckCircle2, Clock, AlertCircle, Sparkles, Utensils, Car,
  MoreVertical, FileSpreadsheet, FileCode, Sliders
} from 'lucide-react';

export default function ReportsAnalyticsView({ onToast }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [dateRange, setDateRange] = useState('Sep 1, 2026 - Sep 22, 2026');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [selectedReportType, setSelectedReportType] = useState('Overview');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [timeframeTrend, setTimeframeTrend] = useState('Last 30 Days');
  const [timeframeRevenue, setTimeframeRevenue] = useState('Last 30 Days');

  // Toggle state for Scheduled Reports
  const [scheduledToggles, setScheduledToggles] = useState({
    weekly: true,
    monthly: true,
    partner: false,
    customer: false
  });

  const toggleScheduled = (key) => {
    setScheduledToggles(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      if (onToast) onToast(`Scheduled report ${!prev[key] ? 'enabled' : 'disabled'}`);
      return updated;
    });
  };

  const handleAction = (actionName) => {
    if (onToast) onToast(`${actionName} triggered`);
  };

  // Top Performing Partners with Real Photos
  const topPartners = [
    { rank: 1, name: 'Rahim Ahmed', deliveries: 245, rating: 4.9, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', rankBg: '#f59e0b' },
    { rank: 2, name: 'Sakib Hasan', deliveries: 198, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', rankBg: '#94a3b8' },
    { rank: 3, name: 'Tarek Rahman', deliveries: 176, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80', rankBg: '#b45309' },
    { rank: 4, name: 'Imran Khan', deliveries: 162, rating: 4.6, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', rankBg: '#e2e8f0' },
    { rank: 5, name: 'Hasan Ali', deliveries: 148, rating: 4.5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', rankBg: '#e2e8f0' }
  ];

  // Recent Reports Table Data
  const recentReports = [
    {
      id: 1,
      name: 'Monthly Revenue Report',
      type: 'Revenue',
      typeColor: '#10b981',
      typeBg: '#ecfdf5',
      dateRange: 'Sep 1 – Sep 22, 2026',
      generatedOn: '22 Sep 2026, 3:24 PM',
      generatedBy: 'Meherun Nesa',
      status: 'Completed',
      statusBg: '#ecfdf5',
      statusColor: '#10b981',
      actionType: 'download'
    },
    {
      id: 2,
      name: 'Partner Performance Report',
      type: 'Partner',
      typeColor: '#3b82f6',
      typeBg: '#eff6ff',
      dateRange: 'Sep 1 – Sep 22, 2026',
      generatedOn: '22 Sep 2026, 1:15 PM',
      generatedBy: 'Admin User',
      status: 'Completed',
      statusBg: '#ecfdf5',
      statusColor: '#10b981',
      actionType: 'download'
    },
    {
      id: 3,
      name: 'Customer Feedback Report',
      type: 'Customer',
      typeColor: '#f59e0b',
      typeBg: '#fff7ed',
      dateRange: 'Sep 1 – Sep 22, 2026',
      generatedOn: '21 Sep 2026, 6:40 PM',
      generatedBy: 'Meherun Nesa',
      status: 'Completed',
      statusBg: '#ecfdf5',
      statusColor: '#10b981',
      actionType: 'download'
    },
    {
      id: 4,
      name: 'Order Summary Report',
      type: 'Orders',
      typeColor: '#ff2b70',
      typeBg: '#fff0f5',
      dateRange: 'Sep 1 – Sep 15, 2026',
      generatedOn: '15 Sep 2026, 2:10 PM',
      generatedBy: 'Admin User',
      status: 'Completed',
      statusBg: '#ecfdf5',
      statusColor: '#10b981',
      actionType: 'download'
    },
    {
      id: 5,
      name: 'Cancelled Orders Report',
      type: 'Orders',
      typeColor: '#ef4444',
      typeBg: '#fef2f2',
      dateRange: 'Sep 1 – Sep 22, 2026',
      generatedOn: '14 Sep 2026, 11:30 AM',
      generatedBy: 'Admin User',
      status: 'Failed',
      statusBg: '#fef2f2',
      statusColor: '#ef4444',
      actionType: 'retry'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

      {/* ================= PAGE HEADER BAR ================= */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Reports &amp; Analytics
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Generate and view detailed reports to get insights into your business operations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Date Selector Button */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12.5px',
            fontWeight: 700,
            color: '#334155',
            cursor: 'pointer'
          }}>
            <Calendar size={15} color="#ff2b70" />
            <span>Sep 1, 2026 – Sep 22, 2026</span>
            <ChevronDown size={14} color="#64748b" />
          </div>

          {/* + Generate Report Button */}
          <button
            onClick={() => handleAction('Generate New Report')}
            style={{
              background: '#ff2b70',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(255, 43, 112, 0.3)'
            }}
          >
            <span>+ Generate Report</span>
          </button>
        </div>
      </div>

      {/* ================= KPI CARDS ROW (5 CARDS) ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>

        {/* Card 1: Total Orders */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>Total Orders</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>3,642</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 800, color: '#10b981' }}>
            <ArrowUpRight size={14} />
            <span>18%</span>
            <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '10.5px', marginLeft: '4px' }}>vs last month</span>
          </div>
        </div>

        {/* Card 2: Total Revenue */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>Total Revenue</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>৳ 256,480</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 800, color: '#10b981' }}>
            <ArrowUpRight size={14} />
            <span>12%</span>
            <span style={{ color: '#94a3b8', fontWeight: 500, fontSize: '10.5px', marginLeft: '4px' }}>vs last month</span>
          </div>
        </div>

        {/* Card 3: Active Partners */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>Active Partners</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>128</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 800, color: '#10b981' }}>
            <ArrowUpRight size={14} />
            <span>6%</span>
          </div>
        </div>

        {/* Card 4: Avg. Customer Rating */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={20} fill="#f59e0b" color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>Avg. Customer Rating</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>4.6 <span style={{ fontSize: '16px', color: '#64748b', fontWeight: 600 }}>/ 5</span></div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 800, color: '#10b981' }}>
            <ArrowUpRight size={14} />
            <span>0.3</span>
          </div>
        </div>

        {/* Card 5: Complaints */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700 }}>Complaints</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>36</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', fontWeight: 800, color: '#ff2b70' }}>
            <ArrowDownRight size={14} />
            <span>18%</span>
          </div>
        </div>

      </div>

      {/* ================= REPORT FILTER TABS ================= */}
      <div style={{ borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '24px', paddingBottom: '2px' }}>
        {[
          'Overview',
          'Orders Report',
          'Revenue Report',
          'Partner Report',
          'Customer Report',
          'Platform Report',
          'Custom Report'
        ].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                handleAction(`Switch tab to ${tab}`);
              }}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid #ff2b70' : '3px solid transparent',
                padding: '8px 4px 12px 4px',
                fontSize: '13.5px',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#ff2b70' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ================= MAIN 2-COLUMN GRID (CONTENT + RIGHT SIDEBAR) ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px' }}>

        {/* LEFT / CENTER COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* ROW 1: CHARTS (Orders Trend & Revenue Overview) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Chart 1: Orders Trend */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Orders Trend
                </h3>

                <select
                  value={timeframeTrend}
                  onChange={(e) => setTimeframeTrend(e.target.value)}
                  style={{
                    fontSize: '11.5px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    background: '#f8fafc',
                    color: '#475569',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Month</option>
                </select>
              </div>

              {/* Line Chart SVG Representation matching image */}
              <div style={{ height: '180px', width: '100%', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 320 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="310" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="55" x2="310" y2="55" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="90" x2="310" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="125" x2="310" y2="125" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Y-Axis Labels */}
                  <text x="5" y="24" fill="#94a3b8" fontSize="9" fontWeight="600">400</text>
                  <text x="5" y="59" fill="#94a3b8" fontSize="9" fontWeight="600">300</text>
                  <text x="5" y="94" fill="#94a3b8" fontSize="9" fontWeight="600">200</text>
                  <text x="5" y="129" fill="#94a3b8" fontSize="9" fontWeight="600">100</text>
                  <text x="18" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">0</text>

                  {/* X-Axis Labels */}
                  <text x="35" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">1 Sep</text>
                  <text x="100" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">5 Sep</text>
                  <text x="165" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">10 Sep</text>
                  <text x="230" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">15 Sep</text>
                  <text x="280" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">20 Sep</text>

                  {/* Line 1: Food (Pink) */}
                  <path d="M 45 95 Q 85 70 115 65 T 185 45 T 255 75 T 300 45" fill="none" stroke="#ff2b70" strokeWidth="2.5" />
                  {/* Points */}
                  <circle cx="45" cy="95" r="3.5" fill="#ff2b70" />
                  <circle cx="115" cy="65" r="3.5" fill="#ff2b70" />
                  <circle cx="185" cy="45" r="3.5" fill="#ff2b70" />
                  <circle cx="255" cy="75" r="3.5" fill="#ff2b70" />
                  <circle cx="300" cy="45" r="3.5" fill="#ff2b70" />

                  {/* Line 2: Ride (Blue) */}
                  <path d="M 45 120 Q 85 100 115 110 T 185 85 T 255 110 T 300 85" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  {/* Points */}
                  <circle cx="45" cy="120" r="3.5" fill="#3b82f6" />
                  <circle cx="115" cy="110" r="3.5" fill="#3b82f6" />
                  <circle cx="185" cy="85" r="3.5" fill="#3b82f6" />
                  <circle cx="255" cy="110" r="3.5" fill="#3b82f6" />
                  <circle cx="300" cy="85" r="3.5" fill="#3b82f6" />

                  {/* Line 3: Skincare (Purple) */}
                  <path d="M 45 138 Q 85 125 115 130 T 185 115 T 255 125 T 300 120" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                  {/* Points */}
                  <circle cx="45" cy="138" r="3.5" fill="#a855f7" />
                  <circle cx="115" cy="130" r="3.5" fill="#a855f7" />
                  <circle cx="185" cy="115" r="3.5" fill="#a855f7" />
                  <circle cx="255" cy="125" r="3.5" fill="#a855f7" />
                  <circle cx="300" cy="120" r="3.5" fill="#a855f7" />
                </svg>
              </div>

              {/* Chart Legend Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: '11.5px', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff2b70' }}></span> Food
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Ride
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></span> Skincare
                </span>
              </div>
            </div>

            {/* Chart 2: Revenue Overview */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Revenue Overview
                </h3>

                <select
                  value={timeframeRevenue}
                  onChange={(e) => setTimeframeRevenue(e.target.value)}
                  style={{
                    fontSize: '11.5px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    background: '#f8fafc',
                    color: '#475569',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>This Month</option>
                </select>
              </div>

              {/* Stacked Bar Chart SVG Representation matching image */}
              <div style={{ height: '180px', width: '100%', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 320 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="310" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="55" x2="310" y2="55" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="90" x2="310" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="125" x2="310" y2="125" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Y-Axis Labels */}
                  <text x="2" y="24" fill="#94a3b8" fontSize="8.5" fontWeight="600">৳ 40K</text>
                  <text x="2" y="59" fill="#94a3b8" fontSize="8.5" fontWeight="600">৳ 30K</text>
                  <text x="2" y="94" fill="#94a3b8" fontSize="8.5" fontWeight="600">৳ 20K</text>
                  <text x="2" y="129" fill="#94a3b8" fontSize="8.5" fontWeight="600">৳ 10K</text>
                  <text x="18" y="155" fill="#94a3b8" fontSize="8.5" fontWeight="600">৳ 0</text>

                  {/* X-Axis Labels */}
                  <text x="35" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">1 Sep</text>
                  <text x="100" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">5 Sep</text>
                  <text x="165" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">10 Sep</text>
                  <text x="230" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">15 Sep</text>
                  <text x="280" y="155" fill="#94a3b8" fontSize="9" fontWeight="600">20 Sep</text>

                  {/* Stacked Bars Series across 12 ticks */}
                  {[
                    { x: 38, h1: 30, h2: 20, h3: 15 },
                    { x: 60, h1: 25, h2: 18, h3: 12 },
                    { x: 82, h1: 35, h2: 25, h3: 18 },
                    { x: 104, h1: 28, h2: 22, h3: 14 },
                    { x: 126, h1: 40, h2: 30, h3: 20 },
                    { x: 148, h1: 32, h2: 24, h3: 16 },
                    { x: 170, h1: 45, h2: 35, h3: 22 },
                    { x: 192, h1: 38, h2: 28, h3: 18 },
                    { x: 214, h1: 42, h2: 32, h3: 20 },
                    { x: 236, h1: 48, h2: 36, h3: 24 },
                    { x: 258, h1: 40, h2: 30, h3: 18 },
                    { x: 280, h1: 50, h2: 38, h3: 26 }
                  ].map((bar, idx) => {
                    const y1 = 125 - bar.h1;
                    const y2 = y1 - bar.h2;
                    const y3 = y2 - bar.h3;
                    return (
                      <g key={idx}>
                        {/* Food (Bottom Pink) */}
                        <rect x={bar.x} y={y1} width="11" height={bar.h1} fill="#ff2b70" rx="1" />
                        {/* Ride (Middle Blue) */}
                        <rect x={bar.x} y={y2} width="11" height={bar.h2} fill="#3b82f6" rx="1" />
                        {/* Skincare (Top Purple) */}
                        <rect x={bar.x} y={y3} width="11" height={bar.h3} fill="#a855f7" rx="2" />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Chart Legend Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: '11.5px', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff2b70' }}></span> Food
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Ride
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></span> Skincare
                </span>
              </div>
            </div>

          </div>

          {/* ROW 2: DONUT CHARTS & TOP PERFORMING PARTNERS (3 CARDS) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.1fr 1.2fr', gap: '20px' }}>

            {/* Card 1: Orders by Platform */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px 0' }}>
                Orders by Platform
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                {/* SVG Donut Chart */}
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="120" height="120" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="5" />
                    {/* Pink Segment (Food 51%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ff2b70" strokeWidth="5" strokeDasharray="51 49" strokeDashoffset="0" />
                    {/* Blue Segment (Ride 31%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="5" strokeDasharray="31 69" strokeDashoffset="-51" />
                    {/* Purple Segment (Skincare 18%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#a855f7" strokeWidth="5" strokeDasharray="18 82" strokeDashoffset="-82" />
                  </svg>

                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>3,642</div>
                    <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>Total Orders</div>
                  </div>
                </div>

                {/* Legend List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff2b70' }}></span> Food
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>1,842 (51%)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Ride
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>1,120 (31%)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></span> Skincare
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>680 (18%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Order Status Distribution */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 16px 0' }}>
                Order Status Distribution
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                {/* SVG Donut Chart */}
                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="120" height="120" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="5" />
                    {/* Delivered (Green 76%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="5" strokeDasharray="76 24" strokeDashoffset="0" />
                    {/* On the Way (Blue 13%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="5" strokeDasharray="13 87" strokeDashoffset="-76" />
                    {/* Preparing (Amber 6%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="5" strokeDasharray="6 94" strokeDashoffset="-89" />
                    {/* Cancelled (Red 5%) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="5" strokeDasharray="5 95" strokeDashoffset="-95" />
                  </svg>

                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>3,642</div>
                    <div style={{ fontSize: '9px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>Total Orders</div>
                  </div>
                </div>

                {/* Legend List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Delivered
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>2,771 (76%)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> On the Way
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>482 (13%)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Preparing
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>214 (6%)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Cancelled
                    </span>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>175 (5%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Top Performing Partners */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 14px 0' }}>
                Top Performing Partners
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {topPartners.map((partner) => (
                  <div
                    key={partner.rank}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      padding: '4px 0',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: partner.rankBg,
                        color: partner.rank <= 3 ? '#ffffff' : '#64748b',
                        fontSize: '11px',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center'
                      }}>
                        {partner.rank}
                      </div>

                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />

                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
                          {partner.name}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                          {partner.deliveries} deliveries
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{partner.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ROW 3: RECENT REPORTS TABLE */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                Recent Reports
              </h3>

              <button
                onClick={() => handleAction('View All Reports')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff2b70',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>View All Reports</span>
                <span>→</span>
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>#</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>Report Name</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>Type</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>Date Range</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>Generated On</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>Generated By</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800 }}>Status</th>
                    <th style={{ padding: '10px 8px', fontWeight: 800, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 8px', color: '#94a3b8', fontWeight: 700 }}>{report.id}</td>
                      <td style={{ padding: '12px 8px', fontWeight: 800, color: '#0f172a' }}>{report.name}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          background: report.typeBg,
                          color: report.typeColor,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '11px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {report.type === 'Revenue' && <TrendingUp size={11} />}
                          {report.type === 'Partner' && <Users size={11} />}
                          {report.type === 'Customer' && <Star size={11} />}
                          {report.type === 'Orders' && <ShoppingBag size={11} />}
                          <span>{report.type}</span>
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#64748b', fontWeight: 600 }}>{report.dateRange}</td>
                      <td style={{ padding: '12px 8px', color: '#64748b', fontWeight: 600 }}>{report.generatedOn}</td>
                      <td style={{ padding: '12px 8px', color: '#334155', fontWeight: 700 }}>{report.generatedBy}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          background: report.statusBg,
                          color: report.statusColor,
                          padding: '3px 10px',
                          borderRadius: '99px',
                          fontWeight: 800,
                          fontSize: '10.5px'
                        }}>
                          {report.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          {report.actionType === 'download' ? (
                            <button
                              onClick={() => handleAction(`Download ${report.name}`)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ff2b70',
                                fontWeight: 800,
                                fontSize: '11.5px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction(`Retry ${report.name}`)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ff2b70',
                                fontWeight: 800,
                                fontSize: '11.5px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <RefreshCw size={13} />
                              <span>Retry</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleAction(`Options for ${report.name}`)}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN (FILTERS, EXPORT & SCHEDULED) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Widget 1: Report Filters */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Report Filters
            </h3>

            {/* Date Range */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '4px' }}>Date Range</label>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                color: '#334155',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                <Calendar size={13} color="#ff2b70" />
                <span style={{ flex: 1 }}>Sep 1, 2026 – Sep 22, 2026</span>
                <ChevronDown size={13} color="#94a3b8" />
              </div>
            </div>

            {/* Platform */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '4px' }}>Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#334155',
                  outline: 'none'
                }}
              >
                <option>All Platforms</option>
                <option>Food</option>
                <option>Ride</option>
                <option>Skincare</option>
              </select>
            </div>

            {/* Report Type */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '4px' }}>Report Type</label>
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#334155',
                  outline: 'none'
                }}
              >
                <option>Overview</option>
                <option>Revenue Report</option>
                <option>Partner Report</option>
                <option>Customer Report</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '4px' }}>Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: '#334155',
                  outline: 'none'
                }}
              >
                <option>All</option>
                <option>Completed</option>
                <option>Failed</option>
                <option>Pending</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={() => handleAction('Apply Filter')}
                style={{
                  width: '100%',
                  background: '#ff2b70',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(255, 43, 112, 0.25)'
                }}
              >
                <Filter size={14} />
                <span>Apply Filter</span>
              </button>

              <button
                onClick={() => handleAction('Reset Filter')}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#64748b',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Widget 2: Export Reports */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Export Reports
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {/* Export PDF */}
              <button
                onClick={() => handleAction('Export PDF')}
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecdd3',
                  borderRadius: '10px',
                  padding: '10px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={15} color="#ef4444" />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#b91c1c' }}>Export as PDF</span>
              </button>

              {/* Export Excel */}
              <button
                onClick={() => handleAction('Export Excel')}
                style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '10px',
                  padding: '10px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileSpreadsheet size={15} color="#10b981" />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#047857' }}>Export as Excel</span>
              </button>

              {/* Export CSV */}
              <button
                onClick={() => handleAction('Export CSV')}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '10px',
                  padding: '10px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#dbeafe', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCode size={15} color="#3b82f6" />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#1d4ed8' }}>Export as CSV</span>
              </button>
            </div>
          </div>

          {/* Widget 3: Scheduled Reports */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                Scheduled Reports
              </h3>

              <button
                onClick={() => handleAction('Manage Scheduled Reports')}
                style={{ background: 'none', border: 'none', color: '#ff2b70', fontWeight: 800, fontSize: '11.5px', cursor: 'pointer' }}
              >
                Manage
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

              {/* Item 1: Weekly Summary */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Calendar size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Weekly Summary</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Every Monday, 9:00 AM</div>
                  </div>
                </div>

                <div
                  onClick={() => toggleScheduled('weekly')}
                  style={{
                    width: '36px',
                    height: '20px',
                    borderRadius: '99px',
                    background: scheduledToggles.weekly ? '#10b981' : '#cbd5e1',
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
                    marginLeft: scheduledToggles.weekly ? 'auto' : '0',
                    transition: 'all 0.2s ease'
                  }}></div>
                </div>
              </div>

              {/* Item 2: Monthly Revenue Report */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <TrendingUp size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Monthly Revenue Report</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>1st of every month</div>
                  </div>
                </div>

                <div
                  onClick={() => toggleScheduled('monthly')}
                  style={{
                    width: '36px',
                    height: '20px',
                    borderRadius: '99px',
                    background: scheduledToggles.monthly ? '#10b981' : '#cbd5e1',
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
                    marginLeft: scheduledToggles.monthly ? 'auto' : '0',
                    transition: 'all 0.2s ease'
                  }}></div>
                </div>
              </div>

              {/* Item 3: Partner Performance Report */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Partner Performance Report</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>1st of every month</div>
                  </div>
                </div>

                <div
                  onClick={() => toggleScheduled('partner')}
                  style={{
                    width: '36px',
                    height: '20px',
                    borderRadius: '99px',
                    background: scheduledToggles.partner ? '#10b981' : '#cbd5e1',
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
                    marginLeft: scheduledToggles.partner ? 'auto' : '0',
                    transition: 'all 0.2s ease'
                  }}></div>
                </div>
              </div>

              {/* Item 4: Customer Feedback Report */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Star size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Customer Feedback Report</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Every Sunday</div>
                  </div>
                </div>

                <div
                  onClick={() => toggleScheduled('customer')}
                  style={{
                    width: '36px',
                    height: '20px',
                    borderRadius: '99px',
                    background: scheduledToggles.customer ? '#10b981' : '#cbd5e1',
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
                    marginLeft: scheduledToggles.customer ? 'auto' : '0',
                    transition: 'all 0.2s ease'
                  }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
