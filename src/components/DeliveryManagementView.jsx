import React, { useState, useEffect } from 'react';
import FoodPlatformView from './FoodPlatformView';
import RidePlatformView from './RidePlatformView';
import SkincarePlatformView from './SkincarePlatformView';
import OrdersManagementView from './OrdersManagementView';
import EarningsPayoutsView from './EarningsPayoutsView';
import PerformanceAnalyticsView from './PerformanceAnalyticsView';
import RatingsReviewsView from './RatingsReviewsView';
import ReportsAnalyticsView from './ReportsAnalyticsView';
import SettingsView from './SettingsView';
import SuspendedPartnersView from './SuspendedPartnersView';
import {
  Percent, Menu, Search, Bell, User, LayoutDashboard, Users, Bike, MapPin,
  ShoppingBag, DollarSign, TrendingUp, Star, AlertCircle, FileText, Settings,
  Utensils, Car, Sparkles, HelpCircle, LogOut, ChevronDown, Check, X, Plus,
  ArrowUpRight, Clock, ShieldAlert, Award, Filter, Phone, ArrowLeft, ChevronRight,
  Target, ShieldCheck, MessageSquare, MoreVertical, CheckCircle2, ArrowRight, Radio,
  Navigation, Send, Copy, CreditCard, UserPlus
} from 'lucide-react';
import { assignRiderToOrder, fetchDeliveryPartners } from '../services/deliveryApi';

export default function DeliveryManagementView({ onBack, onLogout, onToast, initialTab = 'Delivery Partners' }) {
  const [activeSidebarItem, setActiveSidebarItem] = useState(initialTab || 'Delivery Partners');
  const [statsTimeframe, setStatsTimeframe] = useState('Last 7 Days');

  // Delivery Partners View States
  const [partnerFilterTab, setPartnerFilterTab] = useState('all');
  const [selectedPartnerId, setSelectedPartnerId] = useState('dp-1');
  const [partnerSearchQuery, setPartnerSearchQuery] = useState('');

  // Quick action toast helper
  const handleAction = (actionName) => {
    if (onToast) onToast(`${actionName} action triggered`);
  };

  // Perform backend PostgreSQL rider assignment transaction
  const handleAssignRiderInView = async (partner) => {
    const targetPartner = partner || selectedPartner;
    const orderId = 'OM-20250922-0012';

    if (targetPartner.statusType === 'suspended' || targetPartner.isSuspended) {
      if (onToast) onToast(`❌ Cannot assign rider ${targetPartner.name}: Rider is currently suspended.`);
      return;
    }
    if (targetPartner.statusType === 'offline' || targetPartner.status === 'Offline') {
      if (onToast) onToast(`⚠️ Rider ${targetPartner.name} is offline. Please select an available rider.`);
      return;
    }

    if (onToast) onToast(`⏳ Assigning ${targetPartner.name} in PostgreSQL database...`);

    const res = await assignRiderToOrder({
      orderId,
      deliveryPartnerId: targetPartner.id || 'dp-1',
      orderType: 'food'
    });

    if (res.success || res.data) {
      if (onToast) onToast(`✅ Rider ${targetPartner.name} assigned to Order #${orderId}! Saved in PostgreSQL with audit log.`);
    } else {
      if (onToast) onToast(`⚠️ ${res.error || 'Failed to assign rider'}`);
    }
  };

  // Partners Data List
  const partnersList = [
    {
      id: 'dp-1',
      name: 'Rahim Ahmed',
      rating: 4.8,
      reviewsCount: 124,
      distance: '2.3 km away',
      status: 'Available',
      statusType: 'available',
      phone: '+880 1712 345678',
      joined: '15 Jan 2024',
      totalDeliveries: 842,
      vehicle: 'Honda Dream 110 (Motorcycle)',
      licensePlate: 'DHA-1234',
      partnerCode: 'DP-1024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      documents: { nid: true, drivingLicense: true, vehiclePapers: true },
      isOnline: true
    },
    {
      id: 'dp-2',
      name: 'Sakib Hasan',
      rating: 4.7,
      reviewsCount: 98,
      distance: '5.1 km away',
      status: 'On Delivery',
      statusType: 'on_delivery',
      phone: '+880 1819 876543',
      joined: '20 Feb 2024',
      totalDeliveries: 620,
      vehicle: 'Yamaha FZ-S (Motorcycle)',
      licensePlate: 'DHA-5678',
      partnerCode: 'DP-1088',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      documents: { nid: true, drivingLicense: true, vehiclePapers: true },
      isOnline: true
    },
    {
      id: 'dp-3',
      name: 'Mahmudul Islam',
      rating: 4.6,
      reviewsCount: 76,
      distance: '1.8 km away',
      status: 'Available',
      statusType: 'available',
      phone: '+880 1911 223344',
      joined: '05 Mar 2024',
      totalDeliveries: 598,
      vehicle: 'Runner Turbo 125',
      licensePlate: 'DHA-9012',
      partnerCode: 'DP-1102',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      documents: { nid: true, drivingLicense: true, vehiclePapers: true },
      isOnline: true
    },
    {
      id: 'dp-4',
      name: 'Tarek Rahman',
      rating: 4.5,
      reviewsCount: 62,
      distance: '6.4 km away',
      status: 'Busy',
      statusType: 'busy',
      phone: '+880 1677 334455',
      joined: '12 Apr 2024',
      totalDeliveries: 410,
      vehicle: 'TVS Metro Plus',
      licensePlate: 'DHA-3456',
      partnerCode: 'DP-1145',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      documents: { nid: true, drivingLicense: true, vehiclePapers: true },
      isOnline: true
    },
    {
      id: 'dp-5',
      name: 'Hasan Ali',
      rating: 4.4,
      reviewsCount: 48,
      distance: '--',
      status: 'Offline',
      statusType: 'offline',
      phone: '+880 1552 667788',
      joined: '01 May 2024',
      totalDeliveries: 280,
      vehicle: 'Discover 125',
      licensePlate: 'DHA-7890',
      partnerCode: 'DP-1201',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      documents: { nid: true, drivingLicense: true, vehiclePapers: true },
      isOnline: false
    },
    {
      id: 'dp-6',
      name: 'Imran Khan',
      rating: 4.3,
      reviewsCount: 39,
      distance: 'Suspended on 12 Sep 2024',
      status: 'Suspended',
      statusType: 'suspended',
      phone: '+880 1300 998877',
      joined: '18 Jun 2024',
      totalDeliveries: 150,
      vehicle: 'Hero Splendor',
      licensePlate: 'DHA-2468',
      partnerCode: 'DP-1290',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      documents: { nid: true, drivingLicense: false, vehiclePapers: true },
      isOnline: false
    }
  ];

  const selectedPartner = partnersList.find(p => p.id === selectedPartnerId) || partnersList[0];

  // Filter partners
  const filteredPartners = partnersList.filter(p => {
    const matchesTab = partnerFilterTab === 'all' ? true :
      partnerFilterTab === 'available' ? p.statusType === 'available' :
        partnerFilterTab === 'on_delivery' ? (p.statusType === 'on_delivery' || p.statusType === 'busy') :
          partnerFilterTab === 'offline' ? p.statusType === 'offline' :
            partnerFilterTab === 'suspended' ? p.statusType === 'suspended' : true;

    const matchesSearch = p.name.toLowerCase().includes(partnerSearchQuery.toLowerCase()) ||
      p.partnerCode.toLowerCase().includes(partnerSearchQuery.toLowerCase()) ||
      p.phone.includes(partnerSearchQuery);

    return matchesTab && matchesSearch;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#1e293b' }}>

      {/* ================= TOP HEADER BAR ================= */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        {/* Left: Brand Logo & Navigation Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid #fecdd3',
                background: '#fff0f5',
                color: '#ff2b70',
                borderRadius: '99px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={14} />
              <span>Back to OfferMatrix</span>
            </button>
          )}

          <div
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#ff2b70',
              boxShadow: '0 4px 14px rgba(255, 43, 112, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Percent size={20} strokeWidth={3} />
            </div>
            <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Offer<span style={{ color: '#00c853' }}>Matrix</span>
            </span>
          </div>

          <button
            onClick={() => handleAction('Sidebar Toggle')}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Center: Search Input Bar */}
        <div style={{ flex: 1, maxWidth: '440px', position: 'relative', margin: '0 20px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search delivery partners, location, or order ID..."
            value={partnerSearchQuery}
            onChange={(e) => setPartnerSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 16px 9px 40px',
              borderRadius: '99px',
              border: '1px solid #e2e8f0',
              background: '#f1f5f9',
              fontSize: '13px',
              outline: 'none',
              color: '#334155'
            }}
          />
        </div>

        {/* Right: Notifications & User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            onClick={() => handleAction('Notifications')}
            style={{ position: 'relative', cursor: 'pointer', color: '#475569' }}
          >
            <Bell size={20} />
          </div>

          <div
            onClick={() => handleAction('User Profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
              alt="Meherun Nesa"
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Meherun Nesa</span>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Admin</span>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </div>
        </div>
      </header>

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 57px)' }}>

        {/* ---------------- LEFT SIDEBAR ---------------- */}
        <aside style={{ background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Group 1: DELIVERY MANAGEMENT */}
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '12px' }}>
              DELIVERY MANAGEMENT
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Delivery Partners', icon: Users },
                { name: 'Assign Partner', icon: Bike },
                { name: 'Live Tracking', icon: MapPin },
                { name: 'Orders', icon: ShoppingBag },
                { name: 'Earnings & Payouts', icon: DollarSign },
                { name: 'Performance', icon: TrendingUp },
                { name: 'Ratings & Reviews', icon: Star },
                { name: 'Suspended Partners', icon: AlertCircle },
                { name: 'Reports', icon: FileText },
                { name: 'Settings', icon: Settings }
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSidebarItem === item.name;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setActiveSidebarItem(item.name);
                        handleAction(item.name);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: 'none',
                        background: isActive ? '#ff2b70' : 'transparent',
                        color: isActive ? '#ffffff' : '#475569',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 4px 12px rgba(255, 43, 112, 0.25)' : 'none'
                      }}
                    >
                      <IconComponent size={17} color={isActive ? '#ffffff' : '#64748b'} />
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Group 2: MAIN PLATFORM */}
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '12px' }}>
              MAIN PLATFORM
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { name: 'Food', icon: Utensils, color: '#3b82f6' },
                { name: 'Ride', icon: Car, color: '#ef4444' },
                { name: 'Skincare', icon: Sparkles, color: '#02a9ea' }
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSidebarItem === item.name;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setActiveSidebarItem(item.name);
                        handleAction(`Navigate to ${item.name}`);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '9px 14px',
                        borderRadius: '10px',
                        border: 'none',
                        background: isActive ? '#ff2b70' : 'transparent',
                        color: isActive ? '#ffffff' : '#475569',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 4px 12px rgba(255, 43, 112, 0.25)' : 'none'
                      }}
                    >
                      <IconComponent size={17} color={isActive ? '#ffffff' : item.color} />
                      <span>{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Back to OfferMatrix Option */}
            <button
              onClick={onBack}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid #fecdd3',
                background: '#fff0f5',
                color: '#ff2b70',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to OfferMatrix</span>
            </button>
          </div>

          {/* Bottom Sidebar Widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff0f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff2b70' }}>
                <HelpCircle size={18} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Need Help?</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Contact Support</div>
              </div>
            </div>

            <button
              onClick={onLogout || onBack}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 14px',
                borderRadius: '10px',
                border: 'none',
                background: 'transparent',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <LogOut size={16} color="#ef4444" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* ---------------- RIGHT CONTENT AREA ---------------- */}
        <main style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* CONDITIONALLY RENDER BASED ON ACTIVE SIDEBAR ITEM */}
          {activeSidebarItem === 'Assign Partner' ? (

            /* ================= ASSIGN PARTNER VIEW ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* PAGE TOP BANNER CARD (HERO) */}
              <div style={{
                background: 'linear-gradient(135deg, #fff0f5 0%, #fef2f2 60%, #fff5f7 100%)',
                borderRadius: '20px',
                padding: '22px 28px',
                border: '1px solid #fecdd3',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(255, 43, 112, 0.04)'
              }}>
                <div style={{ flex: 1, zIndex: 2 }}>
                  <div
                    onClick={() => { setActiveSidebarItem('Orders'); handleAction('Back to Orders'); }}
                    style={{ fontSize: '13px', color: '#ff2b70', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Orders</span>
                  </div>

                  <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.8px' }}>
                    Assign <span style={{ color: '#ff2b70' }}>Delivery Partner</span>
                  </h1>

                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                    Find the best available partner and assign to this order.
                  </p>
                </div>

                {/* Center Rider Visual & Value Proposition */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 2 }}>
                  <div style={{
                    height: '110px',
                    width: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    position: 'relative'
                  }}>
                    <img
                      src="/assets/delivery_rider.png"
                      alt="Assign Delivery Rider"
                      style={{
                        height: '105px',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 6px 14px rgba(255, 43, 112, 0.2))'
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', fontWeight: 800, color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                      <span>Faster Deliveries</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                      <span>Happier Customers</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                      <span>Grow Together</span>
                    </div>
                  </div>

                  {/* Cursive Tagline */}
                  <div style={{
                    fontFamily: "'Caveat', 'Playfair Display', cursive, sans-serif",
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#0f172a',
                    transform: 'rotate(-4deg)',
                    textAlign: 'center',
                    marginLeft: '10px',
                    lineHeight: 1.2,
                    position: 'relative'
                  }}>
                    Right Partner<br />
                    <span style={{ color: '#ff2b70' }}>Right Delivery</span><br />
                    Every Time
                    <svg width="100" height="10" viewBox="0 0 100 10" fill="none" style={{ position: 'absolute', bottom: '-6px', left: '10px' }}>
                      <path d="M 2 7 Q 50 1 98 7" stroke="#ff2b70" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* MAIN 3-COLUMN WORKSPACE GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 320px', gap: '20px' }}>

                {/* COL 1: AVAILABLE DELIVERY PARTNERS (12) */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>
                      Available Delivery Partners (12)
                    </div>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      background: '#ffffff',
                      color: '#475569',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}>
                      <Filter size={13} />
                      <span>Filter</span>
                    </button>
                  </div>

                  {/* Search & Sort Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Search by name, phone or vehicle number..."
                        style={{
                          width: '100%',
                          padding: '7px 10px 7px 30px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '11px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <select style={{
                      fontSize: '11px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '7px 6px',
                      background: '#ffffff',
                      fontWeight: 700,
                      outline: 'none'
                    }}>
                      <option>Nearest First</option>
                      <option>Highest Rated</option>
                    </select>
                  </div>

                  {/* Partner Cards List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '460px', overflowY: 'auto', paddingRight: '2px' }}>
                    {[
                      {
                        id: 'ap-1',
                        name: 'Rahim Ahmed',
                        rating: 4.8,
                        reviews: 124,
                        distance: '2.3 km away',
                        vehicle: 'Honda Dream 110',
                        license: 'DHA-1234',
                        statusDot: '#10b981',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                        isSelected: true
                      },
                      {
                        id: 'ap-2',
                        name: 'Sakib Hasan',
                        rating: 4.7,
                        reviews: 98,
                        distance: '3.1 km away',
                        vehicle: 'Yamaha FZS',
                        license: 'DHA-5678',
                        statusDot: '#10b981',
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      },
                      {
                        id: 'ap-3',
                        name: 'Mahmudul Islam',
                        rating: 4.6,
                        reviews: 76,
                        distance: '4.8 km away',
                        vehicle: 'TVS Raider',
                        license: 'DHA-9012',
                        statusDot: '#10b981',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      },
                      {
                        id: 'ap-4',
                        name: 'Tarek Rahman',
                        rating: 4.5,
                        reviews: 62,
                        distance: '6.2 km away',
                        vehicle: 'Suzuki Gixxer',
                        license: 'DHA-3344',
                        statusDot: '#f59e0b',
                        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      },
                      {
                        id: 'ap-5',
                        name: 'Hasan Ali',
                        rating: 4.4,
                        reviews: 48,
                        distance: '7.1 km away',
                        vehicle: 'Bajaj Pulsar',
                        license: 'DHA-7788',
                        statusDot: '#10b981',
                        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      }
                    ].map((partner) => (
                      <div
                        key={partner.id}
                        style={{
                          background: partner.isSelected ? '#fff0f5' : '#ffffff',
                          border: partner.isSelected ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                          borderRadius: '14px',
                          padding: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ position: 'relative' }}>
                            <img src={partner.avatar} alt={partner.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: partner.statusDot, border: '2px solid #fff' }}></span>
                          </div>

                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{partner.name}</div>
                            <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Star size={11} fill="#f59e0b" color="#f59e0b" /> {partner.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({partner.reviews})</span>
                            </div>
                            <div style={{ fontSize: '10.5px', color: partner.isSelected ? '#ff2b70' : '#64748b', fontWeight: 700, marginTop: '2px' }}>
                              {partner.distance}
                            </div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                              <Bike size={10} color="#94a3b8" />
                              <span>{partner.vehicle}</span>
                              <span style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '4px', fontWeight: 700, color: '#475569' }}>{partner.license}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAssignRiderInView(partner)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            border: partner.isSelected ? 'none' : '1.5px solid #ff2b70',
                            background: partner.isSelected ? '#ff2b70' : '#ffffff',
                            color: partner.isSelected ? '#ffffff' : '#ff2b70',
                            fontSize: '11.5px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: partner.isSelected ? '0 4px 12px rgba(255, 43, 112, 0.25)' : 'none'
                          }}
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COL 2: CENTER INTERACTIVE ROUTE MAP */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '540px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Map Base Iframe */}
                  <div style={{ flex: 1, position: 'relative' }}>
                    <iframe
                      title="Assign Partner Route Map"
                      src="https://maps.google.com/maps?q=Banani,+Dhaka,+Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      style={{ width: '100%', height: '100%', border: 0, opacity: 0.85 }}
                      loading="lazy"
                    ></iframe>

                    {/* Top-Left Map / Satellite Toggle */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', background: 'rgba(255,255,255,0.95)', padding: '3px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                      <button style={{ background: '#ff2b70', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>Map</button>
                      <button style={{ background: 'transparent', color: '#475569', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Satellite</button>
                    </div>

                    {/* Top-Right Fullscreen Button */}
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#ffffff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10, color: '#475569', fontWeight: 900 }}>
                      ⛶
                    </div>

                    {/* SVG Dashed Route Line (Pink) */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                      <path d="M 380 140 Q 280 230 240 280 T 180 330" fill="none" stroke="#ff2b70" strokeWidth="4" strokeDasharray="6 4" />
                    </svg>

                    {/* MAP OVERLAY PINS */}
                    {/* 1. KFC Gulshan Restaurant Pin (Top Right) */}
                    <div style={{ position: 'absolute', top: '22%', right: '26%', zIndex: 20, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,43,112,0.4)', border: '2px solid #fff' }}>
                        <Utensils size={18} />
                      </div>
                      <div style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', border: '1px solid #fecdd3' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>KFC - Gulshan</div>
                        <div style={{ fontSize: '10px', color: '#ff2b70', fontWeight: 700 }}>Restaurant</div>
                      </div>
                    </div>

                    {/* 2. Delivery Partner Scooter Pin (Middle) */}
                    <div style={{ position: 'absolute', top: '44%', left: '50%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(255,43,112,0.4)', border: '2px solid #fff' }}>
                        <Bike size={20} />
                      </div>
                      <div style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', border: '1px solid #fecdd3', marginTop: '4px', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>Rahim Ahmed</div>
                        <div style={{ fontSize: '10px', color: '#ff2b70', fontWeight: 700 }}>2.3 km • 8 min</div>
                      </div>
                    </div>

                    {/* 3. Customer Location Pin (Bottom Left) */}
                    <div style={{ position: 'absolute', bottom: '26%', left: '36%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(59,130,246,0.4)', border: '2px solid #fff' }}>
                        <MapPin size={20} />
                      </div>
                      <div style={{ background: '#ffffff', color: '#0f172a', padding: '4px 10px', borderRadius: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', textAlign: 'center', marginTop: '4px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>Customer Location</div>
                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Banani, Dhaka</div>
                      </div>
                    </div>

                    {/* City Map Labels */}
                    <span style={{ position: 'absolute', top: '15%', right: '35%', fontSize: '10px', fontWeight: 900, color: '#475569' }}>BANANI</span>
                    <span style={{ position: 'absolute', top: '36%', right: '36%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>GULSHAN</span>
                    <span style={{ position: 'absolute', top: '44%', left: '16%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>DHANMONDI</span>
                    <span style={{ position: 'absolute', bottom: '22%', right: '25%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>MOHAKHALI</span>

                    {/* Zoom Controls */}
                    <div style={{ position: 'absolute', bottom: '70px', right: '14px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 10 }}>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>+</button>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>-</button>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}><Target size={15} /></button>
                    </div>
                  </div>

                  {/* MAP BOTTOM INFO OVERLAY BAR */}
                  <div style={{
                    background: '#ffffff',
                    borderTop: '1px solid #e2e8f0',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Bike size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>2.3 km</div>
                          <div style={{ fontSize: '10.5px', color: '#64748b' }}>Distance</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Clock size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>8 min</div>
                          <div style={{ fontSize: '10.5px', color: '#64748b' }}>ETA</div>
                        </div>
                      </div>
                    </div>

                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      border: '1.5px solid #ff2b70',
                      background: '#ffffff',
                      color: '#ff2b70',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}>
                      <Navigation size={14} color="#ff2b70" />
                      <span>View Route</span>
                    </button>
                  </div>
                </div>

                {/* COL 3: ORDER DETAILS PANEL */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}>
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                        Order Details
                      </h3>
                      <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                        • Ready to Assign
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600, marginBottom: '14px' }}>
                      #OM-20250922-0012
                    </div>

                    {/* Merchant Block */}
                    <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e11d48', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                          KFC
                        </div>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#0f172a' }}>KFC - Gulshan 1</div>
                          <div style={{ fontSize: '10.5px', color: '#64748b' }}>Road 5, Gulshan 1, Dhaka</div>
                        </div>
                      </div>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Phone size={13} color="#ff2b70" />
                      </div>
                    </div>

                    {/* Order Items Breakdown */}
                    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '10px', fontSize: '11.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>1 × Zinger Burger</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>৳ 350</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>1 × French Fries</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>৳ 120</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>1 × Coke (500ml)</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>৳ 80</span>
                      </div>
                    </div>

                    {/* Subtotal, Fee, Total */}
                    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px', marginBottom: '14px', fontSize: '11.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Subtotal</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>৳ 550</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Delivery Fee</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>৳ 50</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>Discount</span>
                        <span style={{ fontWeight: 800, color: '#10b981' }}>- ৳ 80</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>Total</span>
                        <span style={{ fontSize: '18px', fontWeight: 900, color: '#ff2b70' }}>৳ 520</span>
                      </div>
                    </div>

                    {/* Delivery Details List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11.5px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <MapPin size={15} color="#ff2b70" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#64748b', fontWeight: 700 }}>Delivery Address</div>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>House 12, Road 5, Banani</div>
                          <div style={{ color: '#94a3b8', fontSize: '10.5px' }}>Dhaka 1213</div>
                        </div>
                        <Copy size={13} color="#94a3b8" style={{ cursor: 'pointer' }} />
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <User size={15} color="#3b82f6" style={{ flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#64748b', fontWeight: 700 }}>Customer</div>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>+880 1712 345678</div>
                        </div>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <Phone size={12} color="#ff2b70" />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <CreditCard size={15} color="#10b981" style={{ flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#64748b', fontWeight: 700 }}>Payment Method</div>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>bKash</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <FileText size={15} color="#f59e0b" style={{ flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#64748b', fontWeight: 700 }}>Notes</div>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>Please deliver before 7 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '10px', marginTop: '16px' }}>
                    <button
                      onClick={() => handleAssignRiderInView(selectedPartner)}
                      style={{
                        padding: '11px',
                        borderRadius: '10px',
                        border: 'none',
                        background: '#ff2b70',
                        color: '#ffffff',
                        fontWeight: 900,
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 14px rgba(255, 43, 112, 0.3)'
                      }}
                    >
                      <UserPlus size={16} />
                      <span>Assign Partner</span>
                    </button>

                    <button
                      onClick={() => { setActiveSidebarItem('Orders'); handleAction('Cancel Assignment'); }}
                      style={{
                        padding: '11px',
                        borderRadius: '10px',
                        border: '1.5px solid #fecdd3',
                        background: '#ffffff',
                        color: '#ff2b70',
                        fontWeight: 800,
                        fontSize: '12.5px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

              </div>

              {/* BOTTOM SECTION: QUICK ACTIONS (4 CARDS) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Quick Actions
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {/* Card 1: View Order on Map */}
                  <div
                    onClick={() => handleAction('View Order on Map')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={18} color="#3b82f6" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>View Order on Map</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>See restaurant &amp; customer location</div>
                    </div>
                  </div>

                  {/* Card 2: Notify Partner */}
                  <div
                    onClick={() => handleAction('Notify Partner')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Send size={18} color="#8b5cf6" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>Notify Partner</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>Send order details</div>
                    </div>
                  </div>

                  {/* Card 3: Call Restaurant */}
                  <div
                    onClick={() => handleAction('Call Restaurant')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} color="#ff2b70" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>Call Restaurant</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>+880 2 9887654</div>
                    </div>
                  </div>

                  {/* Card 4: Call Customer */}
                  <div
                    onClick={() => handleAction('Call Customer')}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} color="#ff2b70" />
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>Call Customer</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>+880 1712 345678</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          ) : activeSidebarItem === 'Live Tracking' ? (

            /* ================= LIVE TRACKING VIEW ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* PAGE TOP BANNER CARD */}
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '20px 24px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: '#ff2b70',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(255, 43, 112, 0.35)'
                  }}>
                    <MapPin size={26} color="#ffffff" />
                  </div>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 3px 0', letterSpacing: '-0.5px' }}>
                      Live Tracking
                    </h1>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                      Track your delivery partners in real-time and ensure faster, safer deliveries.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '14px',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#10b981',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      fontSize: '14px',
                      fontWeight: 900
                    }}>
                      <Radio size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#065f46' }}>Live Tracking Active</div>
                      <div style={{ fontSize: '11px', color: '#047857', fontWeight: 500 }}>Real-time location updates</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Mon, 22 Sep 2025</div>
                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>3:24 PM</div>
                  </div>
                </div>
              </div>

              {/* MAIN 3-COLUMN WORKSPACE GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 310px', gap: '20px' }}>

                {/* COL 1: ACTIVE DELIVERIES LIST */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>
                    Active Deliveries (4)
                  </div>

                  {/* Search & Filter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="Search by order ID, partner name..."
                        style={{
                          width: '100%',
                          padding: '7px 10px 7px 30px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '11.5px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <select style={{
                      fontSize: '11.5px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '7px 8px',
                      background: '#ffffff',
                      fontWeight: 600,
                      outline: 'none'
                    }}>
                      <option>All Status</option>
                      <option>On the Way</option>
                      <option>Picked Up</option>
                      <option>At Restaurant</option>
                    </select>
                  </div>

                  {/* List of Deliveries */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
                    {[
                      {
                        id: 'del-1',
                        name: 'Rahim Ahmed',
                        rating: 4.8,
                        orderId: '#OM-20250922-0012',
                        vehicle: 'Honda Dream 110 • DHA-1234',
                        status: 'On the Way',
                        statusBg: '#ecfdf5',
                        statusColor: '#10b981',
                        eta: '8 min',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                        isSelected: true
                      },
                      {
                        id: 'del-2',
                        name: 'Sakib Hasan',
                        rating: 4.7,
                        orderId: '#OM-20250922-0015',
                        vehicle: 'Yamaha FZS • DHA-5678',
                        status: 'Picked Up',
                        statusBg: '#eff6ff',
                        statusColor: '#3b82f6',
                        eta: '12 min',
                        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      },
                      {
                        id: 'del-3',
                        name: 'Tarek Rahman',
                        rating: 4.5,
                        orderId: '#OM-20250922-0018',
                        vehicle: 'TVS Raider • DHA-9012',
                        status: 'At Restaurant',
                        statusBg: '#fff7ed',
                        statusColor: '#f59e0b',
                        eta: '5 min',
                        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      },
                      {
                        id: 'del-4',
                        name: 'Imran Khan',
                        rating: 4.6,
                        orderId: '#OM-20250922-0021',
                        vehicle: 'Honda Livo • DHA-3344',
                        status: 'On the Way',
                        statusBg: '#eff6ff',
                        statusColor: '#3b82f6',
                        eta: '15 min',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                        isSelected: false
                      }
                    ].map((item) => (
                      <div
                        key={item.id}
                        style={{
                          background: item.isSelected ? '#fff0f5' : '#ffffff',
                          border: item.isSelected ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                          borderRadius: '14px',
                          padding: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ position: 'relative' }}>
                            <img src={item.avatar} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', border: '2px solid #fff' }}></span>
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{item.name}</span>
                              <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Star size={11} fill="#f59e0b" color="#f59e0b" /> {item.rating}
                              </span>
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '1px' }}>
                              Order <span style={{ fontWeight: 600 }}>{item.orderId}</span>
                            </div>
                            <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>
                              {item.vehicle}
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                          <span style={{
                            background: item.statusBg,
                            color: item.statusColor,
                            padding: '3px 8px',
                            borderRadius: '99px',
                            fontSize: '10px',
                            fontWeight: 800
                          }}>
                            {item.status}
                          </span>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>
                            ETA <strong style={{ color: item.isSelected ? '#ff2b70' : '#0f172a', fontSize: '11.5px' }}>{item.eta}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COL 2: CENTER INTERACTIVE GOOGLE MAP */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '520px'
                }}>
                  {/* Google Map iframe */}
                  <iframe
                    title="Live Tracking Dhaka Map"
                    src="https://maps.google.com/maps?q=Banani,+Dhaka,+Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    style={{ width: '100%', height: '100%', border: 0, opacity: 0.85 }}
                    loading="lazy"
                  ></iframe>

                  {/* Top-Left Map / Satellite Toggle */}
                  <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', background: 'rgba(255,255,255,0.9)', padding: '3px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                    <button style={{ background: '#ff2b70', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>Map</button>
                    <button style={{ background: 'transparent', color: '#475569', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Satellite</button>
                  </div>

                  {/* Top-Right Fullscreen Button */}
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: '#ffffff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10, color: '#475569', fontWeight: 900 }}>
                    ⛶
                  </div>

                  {/* SVG Route Curve Line (Blue dashed) */}
                  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                    <path d="M 380 140 Q 280 230 240 280 T 200 340" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6 4" />
                  </svg>

                  {/* MAP OVERLAY PINS */}
                  {/* 1. KFC Gulshan Restaurant Pin (Top Right) */}
                  <div style={{ position: 'absolute', top: '22%', right: '28%', zIndex: 20, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,43,112,0.4)', border: '2px solid #fff' }}>
                      <Utensils size={18} />
                    </div>
                    <div style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', border: '1px solid #fecdd3' }}>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>KFC - Gulshan</div>
                      <div style={{ fontSize: '10px', color: '#ff2b70', fontWeight: 700 }}>Preparing your order</div>
                    </div>
                  </div>

                  {/* 2. Delivery Partner Rider Pin (Center) */}
                  <div style={{ position: 'absolute', top: '42%', left: '52%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: '#ffffff', color: '#0f172a', padding: '3px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', marginBottom: '4px', border: '1px solid #cbd5e1' }}>
                      Delivery Partner
                    </div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(59,130,246,0.4)', border: '2px solid #fff' }}>
                        <Bike size={22} />
                      </div>
                      <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>▲</div>
                    </div>
                    {/* ETA callout box */}
                    <div style={{ background: '#1e3a8a', color: '#ffffff', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 800, marginTop: '4px', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                      8 min<br /><span style={{ fontSize: '9px', opacity: 0.8 }}>2.3 km</span>
                    </div>
                  </div>

                  {/* 3. Your Location Pin (Bottom Left) */}
                  <div style={{ position: 'absolute', bottom: '26%', left: '40%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(16,185,129,0.4)', border: '2px solid #fff' }}>
                      <MapPin size={20} />
                    </div>
                    <div style={{ background: '#ffffff', color: '#0f172a', padding: '4px 10px', borderRadius: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', textAlign: 'center', marginTop: '4px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 900, color: '#0f172a' }}>Your Location</div>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Dhanmondi</div>
                    </div>
                  </div>

                  {/* City District Map Labels */}
                  <span style={{ position: 'absolute', top: '10%', left: '46%', fontSize: '11px', fontWeight: 900, color: '#475569', letterSpacing: '0.5px' }}>UTTARA</span>
                  <span style={{ position: 'absolute', top: '32%', right: '35%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>GULSHAN</span>
                  <span style={{ position: 'absolute', top: '40%', left: '20%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>DHANMONDI</span>
                  <span style={{ position: 'absolute', bottom: '30%', right: '28%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>MOHAKHALI</span>
                  <span style={{ position: 'absolute', bottom: '18%', right: '38%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>TEJGAON</span>
                  <span style={{ position: 'absolute', top: '35%', right: '12%', fontSize: '10px', fontWeight: 800, color: '#64748b' }}>BASHUNDHARA</span>

                  {/* Bottom-Left Live Location Pill */}
                  <div style={{ position: 'absolute', bottom: '14px', left: '14px', background: '#ffffff', padding: '5px 12px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: '#0f172a', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                    <span>Live Location: <strong style={{ color: '#10b981' }}>ON</strong></span>
                  </div>

                  {/* Bottom-Right Controls & Traffic Switch */}
                  <div style={{ position: 'absolute', bottom: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <div style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#475569', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <span>Traffic</span>
                      <div style={{ width: '28px', height: '16px', borderRadius: '99px', background: '#ff2b70', position: 'relative', display: 'flex', alignItems: 'center', padding: '2px', cursor: 'pointer' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fff', marginLeft: 'auto' }}></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>+</button>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>-</button>
                      <button style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}><Target size={15} /></button>
                    </div>
                  </div>
                </div>

                {/* COL 3: DELIVERY PARTNER DETAILS PANEL */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between'
                }}>
                  <div>
                    {/* Header Title */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                        Delivery Partner Details
                      </h3>
                      <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                        • Online
                      </span>
                    </div>

                    {/* Profile Card */}
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                        alt="Rahim Ahmed"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff2b70', margin: '0 auto 8px auto' }}
                      />
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>Rahim Ahmed</div>
                      <div style={{ fontSize: '11.5px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', marginTop: '2px' }}>
                        <Star size={13} fill="#f59e0b" color="#f59e0b" /> 4.8 <span style={{ color: '#94a3b8', fontWeight: 500 }}>(124 reviews)</span>
                      </div>

                      {/* Action Buttons: Call & Chat */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: '1.5px solid #ff2b70',
                          background: '#ffffff',
                          color: '#ff2b70',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}>
                          <Phone size={13} color="#ff2b70" />
                          <span>Call</span>
                        </button>

                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          border: '1.5px solid #ff2b70',
                          background: '#ffffff',
                          color: '#ff2b70',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}>
                          <MessageSquare size={13} color="#ff2b70" />
                          <span>Chat</span>
                        </button>

                        <button style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          cursor: 'pointer'
                        }}>
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Partner Info Details Grid */}
                    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', border: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Partner ID</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>DP-1024</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Phone</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>+880 1712 345678</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Vehicle</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>Honda Dream 110</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Registration No.</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>DHA-1234</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Total Deliveries</span>
                        <span style={{ fontWeight: 900, color: '#ff2b70' }}>842</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Joined On</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>15 Jan 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Partner Card */}
                  <div style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '12px'
                  }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 900, color: '#065f46' }}>Verified Partner</div>
                      <div style={{ fontSize: '10.5px', color: '#047857', fontWeight: 500 }}>All documents verified</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM SECTION: ORDER TRACKING STEPPER & CARDS */}
              <div style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    Order Tracking - <span style={{ color: '#64748b' }}>#OM-20250922-0012</span>
                  </h2>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                      <Clock size={16} color="#ff2b70" />
                      <span style={{ color: '#64748b', fontWeight: 600 }}>Estimated Arrival</span>
                      <span style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>8 min</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>(3:32 PM)</span>
                    </div>

                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#ff2b70',
                      color: '#ffffff',
                      border: 'none',
                      padding: '9px 18px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(255, 43, 112, 0.25)'
                    }}>
                      <span>View Order Details</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* 7-Step Progress Stepper */}
                <div style={{ position: 'relative', padding: '10px 0 20px 0' }}>
                  {/* Step Connecting Line */}
                  <div style={{ position: 'absolute', top: '24px', left: '4%', right: '4%', height: '3px', background: '#e2e8f0', zIndex: 1 }}>
                    <div style={{ width: '66%', height: '100%', background: '#10b981' }}></div>
                  </div>

                  {/* Steps Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    {[
                      { title: 'Order Placed', time: '', isDone: true, isCurrent: false },
                      { title: 'Restaurant Confirmed', time: '3:05 PM', isDone: true, isCurrent: false },
                      { title: 'Preparing', time: '3:12 PM', isDone: true, isCurrent: false },
                      { title: 'Picked Up', time: '3:18 PM', isDone: true, isCurrent: false },
                      { title: 'On the Way', time: '3:20 PM', isDone: false, isCurrent: true },
                      { title: 'Arriving Soon', time: '', isDone: false, isCurrent: false },
                      { title: 'Delivered', time: '', isDone: false, isCurrent: false }
                    ].map((step, index) => (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: step.isCurrent ? '#ff2b70' : step.isDone ? '#10b981' : '#ffffff',
                          border: step.isCurrent ? 'none' : step.isDone ? 'none' : '2px solid #cbd5e1',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center',
                          fontSize: '13px',
                          fontWeight: 900,
                          boxShadow: step.isCurrent ? '0 4px 12px rgba(255,43,112,0.4)' : step.isDone ? '0 2px 6px rgba(16,185,129,0.3)' : 'none',
                          marginBottom: '8px'
                        }}>
                          {step.isDone ? '✓' : step.isCurrent ? '🛵' : ''}
                        </div>
                        <div style={{ fontSize: '11.5px', fontWeight: step.isCurrent ? 900 : 700, color: step.isCurrent ? '#ff2b70' : step.isDone ? '#0f172a' : '#94a3b8' }}>
                          {step.title}
                        </div>
                        {step.time && (
                          <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                            {step.time}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 Summary Info Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {/* Card 1: Restaurant Info */}
                  <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#e11d48', color: '#fff', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                        KFC
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>KFC - Gulshan</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Fast Food • Gulshan 1</div>
                      </div>
                    </div>
                    <button style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: '1px solid #fecdd3',
                      background: '#ffffff',
                      color: '#ff2b70',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}>
                      View Menu
                    </button>
                  </div>

                  {/* Card 2: Delivery Address */}
                  <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={18} color="#ef4444" />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Delivery Address</div>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', marginTop: '1px' }}>House 12, Road 5, Dhanmondi</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>Dhaka 1205</div>
                    </div>
                  </div>

                  {/* Card 3: Order Items */}
                  <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ShoppingBag size={18} color="#3b82f6" />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Order Items</div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>1 × Zinger Burger</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>1 × French Fries</div>
                      </div>
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                </div>

              </div>

            </div>

          ) : activeSidebarItem === 'Orders' ? (

            /* ================= ORDERS MANAGEMENT VIEW (SCREENSHOT 1) ================= */
            <OrdersManagementView onToast={onToast} />

          ) : activeSidebarItem === 'Earnings & Payouts' ? (

            /* ================= EARNINGS & PAYOUTS VIEW ================= */
            <EarningsPayoutsView onToast={onToast} />

          ) : activeSidebarItem === 'Performance' ? (

            /* ================= PERFORMANCE ANALYTICS VIEW ================= */
            <PerformanceAnalyticsView onToast={onToast} />

          ) : activeSidebarItem === 'Ratings & Reviews' ? (

            /* ================= RATINGS & REVIEWS VIEW ================= */
            <RatingsReviewsView onToast={onToast} />

          ) : activeSidebarItem === 'Suspended Partners' ? (

            /* ================= SUSPENDED PARTNERS VIEW ================= */
            <SuspendedPartnersView onToast={onToast} />

          ) : activeSidebarItem === 'Reports' ? (

            /* ================= REPORTS & ANALYTICS VIEW ================= */
            <ReportsAnalyticsView onToast={onToast} />

          ) : activeSidebarItem === 'Settings' ? (

            /* ================= SETTINGS VIEW ================= */
            <SettingsView onToast={onToast} />

          ) : activeSidebarItem === 'Food' ? (

            /* ================= FOOD PLATFORM VIEW ================= */
            <FoodPlatformView onToast={onToast} />

          ) : activeSidebarItem === 'Ride' ? (

            /* ================= RIDE PLATFORM VIEW ================= */
            <RidePlatformView onToast={onToast} />

          ) : activeSidebarItem === 'Skincare' ? (

            /* ================= SKINCARE PLATFORM VIEW ================= */
            <SkincarePlatformView onToast={onToast} />

          ) : activeSidebarItem === 'Delivery Partners' ? (

            /* ================= DELIVERY PARTNERS VIEW ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* PAGE TITLE & ADD NEW PARTNER BUTTON */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
                    Delivery Partners
                  </h1>
                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                    Manage your delivery partners, assign orders and track their performance
                  </p>
                </div>

                <button
                  onClick={() => handleAction('Add New Partner Modal')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ff2b70',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 43, 112, 0.3)'
                  }}
                >
                  <Plus size={18} />
                  <span>Add New Partner</span>
                </button>
              </div>

              {/* STAT CARDS ROW (5 CARDS) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {/* Total Partners */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>Total Partners</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={16} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>28</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>↑ 12%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Active delivery partners</div>
                </div>

                {/* Active */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>Active</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>22</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>↑ 8%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Currently online</div>
                </div>

                {/* Busy */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>Busy</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={16} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>4</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>On delivery</div>
                </div>

                {/* Offline */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>Offline</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={16} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>2</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Currently offline</div>
                </div>

                {/* Suspended */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>Suspended</span>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={16} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>1</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Temporarily suspended</div>
                </div>
              </div>

              {/* FILTER TABS & SEARCH BAR ROW */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                {/* Filter Chips */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { id: 'all', label: 'All Partners', count: 28 },
                    { id: 'available', label: 'Available', count: 12, dotColor: '#10b981' },
                    { id: 'on_delivery', label: 'On Delivery', count: 8, dotColor: '#f59e0b' },
                    { id: 'offline', label: 'Offline', count: 2, dotColor: '#94a3b8' },
                    { id: 'suspended', label: 'Suspended', count: 1, dotColor: '#ef4444' }
                  ].map((tab) => {
                    const isSelected = partnerFilterTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setPartnerFilterTab(tab.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          borderRadius: '99px',
                          border: isSelected ? 'none' : '1px solid #e2e8f0',
                          background: isSelected ? '#ff2b70' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#475569',
                          fontSize: '12.5px',
                          fontWeight: isSelected ? 800 : 600,
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 4px 12px rgba(255, 43, 112, 0.25)' : 'none'
                        }}
                      >
                        {tab.dotColor && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: tab.dotColor }}></span>}
                        <span>{tab.label}</span>
                        <span style={{
                          background: isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                          color: isSelected ? '#fff' : '#64748b',
                          padding: '2px 6px',
                          borderRadius: '99px',
                          fontSize: '10.5px',
                          fontWeight: 800
                        }}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Search & Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ position: 'relative', width: '260px' }}>
                    <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      placeholder="Search partner by name, phone or ID..."
                      value={partnerSearchQuery}
                      onChange={(e) => setPartnerSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '7px 12px 7px 34px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    onClick={() => handleAction('Filter Options')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      background: '#ffffff',
                      color: '#475569',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <Filter size={14} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* 3-COLUMN WORKSPACE GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '20px' }}>

                {/* COL 1: PARTNERS LIST */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '540px', overflowY: 'auto', paddingRight: '4px' }}>
                  {filteredPartners.map((partner) => {
                    const isSelected = selectedPartner.id === partner.id;
                    const statusBg = partner.statusType === 'available' ? '#ecfdf5' : partner.statusType === 'on_delivery' ? '#eff6ff' : partner.statusType === 'busy' ? '#fff7ed' : partner.statusType === 'suspended' ? '#fef2f2' : '#f1f5f9';
                    const statusColor = partner.statusType === 'available' ? '#10b981' : partner.statusType === 'on_delivery' ? '#3b82f6' : partner.statusType === 'busy' ? '#f59e0b' : partner.statusType === 'suspended' ? '#ef4444' : '#64748b';

                    return (
                      <div
                        key={partner.id}
                        onClick={() => setSelectedPartnerId(partner.id)}
                        style={{
                          background: isSelected ? '#fff0f5' : '#ffffff',
                          borderRadius: '16px',
                          padding: '12px 14px',
                          border: isSelected ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between',
                          gap: '12px',
                          transition: 'all 0.15s ease',
                          position: 'relative'
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', background: '#ff2b70', borderRadius: '0 4px 4px 0' }}></div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={partner.avatar} alt={partner.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: isSelected ? '2px solid #ff2b70' : 'none' }} />

                          <div>
                            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{partner.name}</div>
                            <div style={{ fontSize: '11.5px', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Star size={12} fill="#f59e0b" color="#f59e0b" />
                              <span>{partner.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({partner.reviewsCount})</span></span>
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                              <MapPin size={11} color="#64748b" />
                              <span>{partner.distance}</span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ background: statusBg, color: statusColor, padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 800 }}>
                            {partner.status}
                          </span>
                          <ChevronRight size={16} color="#94a3b8" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* COL 2: LIVE LOCATION GOOGLE MAP EMBED */}
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>

                  {/* Google Maps Embed Base */}
                  <div style={{ width: '100%', height: '480px', position: 'relative', background: '#e0f2fe' }}>
                    <iframe
                      title="Dhaka Live Delivery Google Map"
                      src="https://maps.google.com/maps?q=Banani,+Dhaka,+Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      style={{ width: '100%', height: '100%', border: 0, opacity: 0.85 }}
                      loading="lazy"
                    ></iframe>

                    {/* OVERLAY SVG ROUTE LINE (Blue dashed line between Rahim Ahmed & Order Location) */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                      <path d="M 230 210 Q 210 270 240 330" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6 4" />
                    </svg>

                    {/* MAP OVERLAY PINS */}
                    {/* Banani Top Pin */}
                    <div style={{ position: 'absolute', top: '15%', right: '35%', background: '#10b981', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.25)', zIndex: 10 }}>
                      <Bike size={15} />
                    </div>

                    {/* Upper Right Pin */}
                    <div style={{ position: 'absolute', top: '22%', right: '15%', background: '#64748b', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.25)', zIndex: 10 }}>
                      <Bike size={15} />
                    </div>

                    {/* Selected Partner Pin (Rahim Ahmed 2.3 km away) */}
                    <div style={{ position: 'absolute', top: '38%', left: '42%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ background: '#ffffff', color: '#0f172a', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, boxShadow: '0 4px 14px rgba(0,0,0,0.15)', marginBottom: '4px', border: '1px solid #fecdd3', whiteSpace: 'nowrap' }}>
                        {selectedPartner.name} • <span style={{ color: '#ff2b70' }}>{selectedPartner.distance}</span>
                      </div>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,43,112,0.4)' }}>
                        <Bike size={16} />
                      </div>
                    </div>

                    {/* Dhanmondi Pin */}
                    <div style={{ position: 'absolute', top: '50%', left: '18%', background: '#10b981', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.25)', zIndex: 10 }}>
                      <Bike size={15} />
                    </div>

                    {/* Order Location Blue Home Pin */}
                    <div style={{ position: 'absolute', bottom: '26%', left: '45%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(59,130,246,0.4)', border: '2px solid #fff' }}>
                        <MapPin size={18} />
                      </div>
                      <div style={{ background: '#ffffff', color: '#0f172a', padding: '3px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '4px' }}>
                        Order Location
                      </div>
                    </div>

                    {/* Mohakhali Pin */}
                    <div style={{ position: 'absolute', bottom: '20%', right: '22%', background: '#64748b', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.25)', zIndex: 10 }}>
                      <Bike size={15} />
                    </div>

                    {/* Lower Left Suspended Pin */}
                    <div style={{ position: 'absolute', bottom: '15%', left: '15%', background: '#ef4444', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.25)', zIndex: 10 }}>
                      <Bike size={15} />
                    </div>

                    {/* Map Labels */}
                    <span style={{ position: 'absolute', top: '12%', right: '30%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>BANANI</span>
                    <span style={{ position: 'absolute', top: '48%', right: '10%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>GULSHAN</span>
                    <span style={{ position: 'absolute', top: '58%', left: '8%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>DHANMONDI</span>
                    <span style={{ position: 'absolute', bottom: '10%', right: '18%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>MOHAKHALI</span>

                    {/* Map Controls */}
                    <div style={{ position: 'absolute', right: '14px', bottom: '60px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 20 }}>
                      <button style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>+</button>
                      <button style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>-</button>
                      <button style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}><Target size={16} /></button>
                    </div>
                  </div>

                  {/* MAP LEGEND BAR */}
                  <div style={{ padding: '10px 16px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Available</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> OnDelivery</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Busy</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></span> Offline</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Suspended</span>
                  </div>
                </div>

                {/* COL 3: PARTNER DETAILS PANEL */}
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                  <div>
                    {/* Details Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                          {selectedPartner.name}
                        </h3>
                        <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                          {selectedPartner.status}
                        </span>
                      </div>
                      <X size={16} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => handleAction('Close Partner Details')} />
                    </div>

                    {/* Profile Header Block */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                      <img src={selectedPartner.avatar} alt={selectedPartner.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff2b70' }} />

                      <div style={{ flex: 1, fontSize: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                          <Star size={14} fill="#f59e0b" color="#f59e0b" />
                          <span>{selectedPartner.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({selectedPartner.reviewsCount} reviews)</span></span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px', color: '#64748b' }}>
                          <span style={{ fontWeight: 600 }}>Partner ID:</span>
                          <span style={{ fontWeight: 800, color: '#0f172a' }}>{selectedPartner.partnerCode}</span>

                          <span style={{ fontWeight: 600 }}>Phone:</span>
                          <span style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {selectedPartner.phone} <Phone size={12} color="#ff2b70" />
                          </span>

                          <span style={{ fontWeight: 600 }}>Joined:</span>
                          <span style={{ fontWeight: 800, color: '#0f172a' }}>{selectedPartner.joined}</span>

                          <span style={{ fontWeight: 600 }}>Total Deliveries:</span>
                          <span style={{ fontWeight: 900, color: '#ff2b70' }}>{selectedPartner.totalDeliveries}</span>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Information */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                        Vehicle Information
                      </div>

                      <div style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '22px' }}>🛵</span>
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>{selectedPartner.vehicle}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Motorcycle</div>
                          </div>
                        </div>
                        <span style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, color: '#0f172a' }}>
                          {selectedPartner.licensePlate} ❯
                        </span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                        Documents
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {[
                          { label: 'NID', isVerified: selectedPartner.documents.nid },
                          { label: 'Driving License', isVerified: selectedPartner.documents.drivingLicense },
                          { label: 'Vehicle Papers', isVerified: selectedPartner.documents.vehiclePapers }
                        ].map((doc, idx) => (
                          <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>{doc.label}</div>
                            <div style={{ fontSize: '10px', fontWeight: 800, color: doc.isVerified ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                              <span>{doc.isVerified ? '✓ Verified' : '✕ Pending'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
                    <button
                      onClick={() => handleAction('View Full Profile')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1.5px solid #ff2b70',
                        background: '#ffffff',
                        color: '#ff2b70',
                        fontWeight: 800,
                        fontSize: '12.5px',
                        cursor: 'pointer'
                      }}
                    >
                      View Full Profile
                    </button>

                    <button
                      onClick={() => handleAction('Assign to Order')}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#ff2b70',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(255, 43, 112, 0.25)'
                      }}
                    >
                      Assign to Order
                    </button>
                  </div>
                </div>
              </div>

              {/* RECENT ACTIVITY BAR */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px 20px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Recent Activity
                  </h3>
                  <span onClick={() => handleAction('View All Activity')} style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>
                    View All
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900 }}>✓</div>
                    <div>
                      <div><strong>Rahim Ahmed</strong> completed delivery</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>OM-20240920-0012 • 2 mins ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📦</div>
                    <div>
                      <div><strong>Sakib Hasan</strong> picked up order</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>OM-20240920-0011 • 8 mins ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🕒</div>
                    <div>
                      <div><strong>Tarek Rahman</strong> went offline</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>12 minutes ago</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</div>
                    <div>
                      <div><strong>Imran Khan</strong> has been suspended</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>1 hour ago</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          ) : (

            /* ================= DEFAULT DASHBOARD VIEW ================= */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* SECTION 1: HERO BANNER */}
              <div style={{
                background: 'linear-gradient(135deg, #fff0f5 0%, #fef2f2 60%, #e6fffa 100%)',
                borderRadius: '20px',
                padding: '24px 32px',
                border: '1px solid #fecdd3',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(255, 43, 112, 0.04)',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '15px', right: '450px', fontSize: '16px', color: '#fecdd3', opacity: 0.7 }}>✨</div>
                <div style={{ position: 'absolute', bottom: '20px', left: '420px', fontSize: '18px', color: '#fecdd3', opacity: 0.7 }}>✦</div>

                <div style={{ flex: 1, zIndex: 2 }}>
                  <div style={{ fontSize: '14px', color: '#334155', fontWeight: 800, marginBottom: '6px' }}>
                    Welcome Back, Meherun Nesa! 👋
                  </div>
                  <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.8px' }}>
                    Manage Your <span style={{ color: '#ff2b70' }}>Delivery</span> Team
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                    Keep your partners active, orders moving and customers happy.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 2 }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '110px' }}>
                    <div style={{
                      fontFamily: "'Caveat', 'Playfair Display', cursive, sans-serif",
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#1e293b',
                      transform: 'rotate(-6deg)',
                      marginRight: '12px',
                      whiteSpace: 'nowrap',
                      position: 'relative'
                    }}>
                      Faster Deliveries <br />
                      <span style={{ color: '#1e293b' }}>Happier Customers</span>
                      <svg width="110" height="12" viewBox="0 0 110 12" fill="none" style={{ position: 'absolute', bottom: '-8px', left: '10px' }}>
                        <path d="M 2 8 Q 55 1 108 8" stroke="#ff2b70" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div style={{
                      height: '120px',
                      width: '160px',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      position: 'relative'
                    }}>
                      <img
                        src="/assets/delivery_rider.png"
                        alt="Delivery Partner Rider"
                        style={{
                          height: '110px',
                          width: 'auto',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 6px 14px rgba(255, 43, 112, 0.2))'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    </div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #fff0f3 0%, #ecfdf5 100%)',
                    borderRadius: '18px',
                    padding: '16px 22px',
                    border: '1px solid #fecdd3',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    minWidth: '220px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#ffe4ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                        📦
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#334155' }}>Total Deliveries Today</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                      <span style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>128</span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>
                        ↑ 18%
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', fontWeight: 600 }}>vs yesterday</div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: STAT CARDS ROW (5 CARDS) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#64748b' }}>Total Partners</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={18} /></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>28</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>↑ 12%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>All registered partners</div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#64748b' }}>Active Now</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>22</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>↑ 8%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Currently online</div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#64748b' }}>On Delivery</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={18} /></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>4</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Delivering orders</div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#64748b' }}>Offline</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} /></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>2</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Currently offline</div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#64748b' }}>Suspended</span>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={18} /></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a' }}>1</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Temporarily suspended</div>
                </div>
              </div>

              {/* SECTION 3: MIDDLE ROW */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1.2fr', gap: '20px' }}>
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0' }}>Partner Status</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ position: 'relative', width: '130px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="130" height="130" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="4.5" />
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4.5" strokeDasharray="79 21" strokeDashoffset="0" />
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="14 86" strokeDashoffset="-79" />
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#94a3b8" strokeWidth="4.5" strokeDasharray="7 93" strokeDashoffset="-93" />
                        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="4.5" strokeDasharray="4 96" strokeDashoffset="-100" />
                      </svg>
                      <div style={{ position: 'absolute', textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>28</div>
                        <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>Partners</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span><span style={{ color: '#475569', fontWeight: 600 }}>Active</span><span style={{ fontWeight: 800, color: '#0f172a', marginLeft: 'auto' }}>22 (79%)</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span><span style={{ color: '#475569', fontWeight: 600 }}>On Delivery</span><span style={{ fontWeight: 800, color: '#0f172a', marginLeft: 'auto' }}>4 (14%)</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></span><span style={{ color: '#475569', fontWeight: 600 }}>Offline</span><span style={{ fontWeight: 800, color: '#0f172a', marginLeft: 'auto' }}>2 (7%)</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span><span style={{ color: '#475569', fontWeight: 600 }}>Suspended</span><span style={{ fontWeight: 800, color: '#0f172a', marginLeft: 'auto' }}>1 (4%)</span></div>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Live Partner Locations</h3>
                    <span onClick={() => { setActiveSidebarItem('Delivery Partners'); handleAction('View All Map'); }} style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View All</span>
                  </div>
                  <div style={{ height: '180px', borderRadius: '12px', background: '#e0f2fe', position: 'relative', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                    <iframe title="Dhaka Live Map" src="https://maps.google.com/maps?q=Banani,+Dhaka,+Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed" style={{ width: '100%', height: '100%', border: 0, opacity: 0.7 }} loading="lazy"></iframe>
                    <div style={{ position: 'absolute', top: '25%', left: '35%', background: '#10b981', color: '#fff', padding: '4px', borderRadius: '50%' }}><Bike size={14} /></div>
                    <div style={{ position: 'absolute', top: '45%', left: '60%', background: '#f59e0b', color: '#fff', padding: '4px', borderRadius: '50%' }}><Bike size={14} /></div>
                    <span style={{ position: 'absolute', top: '15%', right: '25%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>BANANI</span>
                    <span style={{ position: 'absolute', top: '45%', right: '10%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>GULSHAN</span>
                    <span style={{ position: 'absolute', top: '55%', left: '10%', fontSize: '10px', fontWeight: 800, color: '#334155' }}>DHANMONDI</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '11px', marginTop: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569', fontWeight: 700 }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Available</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569', fontWeight: 700 }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> On Delivery</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569', fontWeight: 700 }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></span> Offline</span>
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Activity</h3>
                    <span onClick={() => handleAction('View All Activity')} style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View All</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</div><div><div><strong>Rahim Ahmed</strong> completed delivery <code>OM-20240920-0012</code></div><div style={{ fontSize: '10.5px', color: '#94a3b8' }}>2 minutes ago</div></div></div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📦</div><div><div><strong>Sakib Hasan</strong> picked up order <code>OM-20240920-0011</code></div><div style={{ fontSize: '10.5px', color: '#94a3b8' }}>8 minutes ago</div></div></div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🕒</div><div><div><strong>Tarek Rahman</strong> went offline</div><div style={{ fontSize: '10.5px', color: '#94a3b8' }}>12 minutes ago</div></div></div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</div><div><div><strong>Imran Khan</strong> has been suspended</div><div style={{ fontSize: '10.5px', color: '#ef4444', fontWeight: 600 }}>Reason: Multiple complaints</div><div style={{ fontSize: '10.5px', color: '#94a3b8' }}>2 hours ago</div></div></div>
                  </div>
                </div>
              </div>

              {/* SECTION 4: BOTTOM ROW */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '20px' }}>
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Top Performing Partners</h3>
                    <span onClick={() => { setActiveSidebarItem('Delivery Partners'); handleAction('View All Top Partners'); }} style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', cursor: 'pointer' }}>View All</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { rank: 1, name: 'Rahim Ahmed', rating: '4.8', deliveries: '842 deliveries', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', status: 'Active' },
                      { rank: 2, name: 'Sakib Hasan', rating: '4.7', deliveries: '620 deliveries', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', status: 'Active' },
                      { rank: 3, name: 'Mahmudul Islam', rating: '4.6', deliveries: '598 deliveries', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80', status: 'Active' }
                    ].map((partner) => (
                      <div key={partner.rank} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: partner.rank === 1 ? '#f59e0b' : partner.rank === 2 ? '#94a3b8' : '#b45309', color: '#fff', fontSize: '11px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{partner.rank}</div>
                        <img src={partner.img} alt={partner.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{partner.name}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>⭐ {partner.rating} • {partner.deliveries}</div>
                        </div>
                        <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#10b981', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px' }}>{partner.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Delivery Stats <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>(Last 7 Days)</span></h3>
                    <select value={statsTimeframe} onChange={(e) => setStatsTimeframe(e.target.value)} style={{ fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '4px 8px', background: '#f8fafc', outline: 'none', cursor: 'pointer' }}>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', padding: '10px 10px 0 10px' }}>
                    {[
                      { day: 'Sat', val: 80 }, { day: 'Sun', val: 95 }, { day: 'Mon', val: 120 },
                      { day: 'Tue', val: 110 }, { day: 'Wed', val: 160 }, { day: 'Thu', val: 140 }, { day: 'Fri', val: 128 }
                    ].map((item) => (
                      <div key={item.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b' }}>{item.val}</span>
                        <div style={{ width: '28px', height: `${(item.val / 160) * 100}px`, background: 'linear-gradient(180deg, #ff2b70, #ff6b4a)', borderRadius: '6px 6px 0 0' }}></div>
                        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 14px 0' }}>Quick Actions</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div onClick={() => handleAction('Add New Partner')} style={{ background: '#fff0f5', border: '1px solid #fecdd3', borderRadius: '12px', padding: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ff2b70', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><User size={14} /></div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Add New Partner</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>Register a new delivery partner</div>
                    </div>

                    <div onClick={() => { setActiveSidebarItem('Delivery Partners'); handleAction('Assign Partner'); }} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><Bike size={14} /></div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Assign Partner</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>Manually assign to orders</div>
                    </div>

                    <div onClick={() => { setActiveSidebarItem('Delivery Partners'); handleAction('View Live Map'); }} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><MapPin size={14} /></div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>View Live Map</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>Track partners in real-time</div>
                    </div>

                    <div onClick={() => handleAction('View Reports')} style={{ background: '#fffbebe', border: '1px solid #fef3c7', borderRadius: '12px', padding: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}><FileText size={14} /></div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>View Reports</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>Performance &amp; analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}

        </main>
      </div>
    </div>
  );
}
