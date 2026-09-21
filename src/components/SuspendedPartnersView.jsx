import React, { useState } from 'react';
import {
  Users, Clock, ShieldAlert, CheckCircle2, Search, Calendar, Filter, ChevronDown,
  MoreVertical, Eye, FileText, AlertTriangle, UserX, Unlock, Ban, Plus, X, Phone,
  Mail, Bike, Car, Shield, Check, FileCode, Paperclip, ChevronLeft, ChevronRight, ExternalLink
} from 'lucide-react';

export default function SuspendedPartnersView({ onToast, onOpenPartnerDetails }) {
  const [selectedPartnerId, setSelectedPartnerId] = useState('DP-1102');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms');
  const [selectedType, setSelectedType] = useState('All Suspension Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  // Sample data for 10 suspended partners matching screenshot
  const suspendedPartnersData = [
    {
      id: 'DP-1102',
      rowNum: 1,
      name: 'Imran Khan',
      phone: '+880 1712 345678',
      email: 'imran.khan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1102',
      platform: 'Foodpanda',
      platformColor: '#ff2b85',
      platformLogoText: 'fp',
      reason: 'Multiple customer complaints',
      suspendedOn: '20 Sep 2026 11:30 AM',
      duration: '7 days',
      status: 'Temporary',
      vehicle: 'Honda Dream 110',
      licensePlate: 'DHA-3344',
      joinedDate: '15 Jan 2024',
      liftDate: '27 Sep 2026, 11:30 AM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Received 5 complaints in 10 days regarding late delivery and rude behavior.',
      documents: [
        { name: 'complaint_screenshot_1.png', date: 'Uploaded on 20 Sep 2026', type: 'image' },
        { name: 'chat_evidence.pdf', date: 'Uploaded on 20 Sep 2026', type: 'pdf' },
        { name: 'partner_warning_history.pdf', date: 'Uploaded on 20 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1056',
      rowNum: 2,
      name: 'Sakib Hasan',
      phone: '+880 1689 123456',
      email: 'sakib.hasan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1056',
      platform: 'Pathao Food',
      platformColor: '#f32735',
      platformLogoText: 'P',
      reason: 'Late deliveries (repeated)',
      suspendedOn: '18 Sep 2026 4:20 PM',
      duration: '14 days',
      status: 'Temporary',
      vehicle: 'TVS Metro 100',
      licensePlate: 'DHA-5521',
      joinedDate: '10 Feb 2024',
      liftDate: '02 Oct 2026, 4:20 PM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Consistently delayed deliveries over 45 minutes on 8 consecutive orders.',
      documents: [
        { name: 'delay_log_report.pdf', date: 'Uploaded on 18 Sep 2026', type: 'pdf' },
        { name: 'gps_tracking_history.csv', date: 'Uploaded on 18 Sep 2026', type: 'file' }
      ]
    },
    {
      id: 'DP-1090',
      rowNum: 3,
      name: 'Tarek Rahman',
      phone: '+880 1300 987654',
      email: 'tarek.rahman@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1090',
      platform: 'Choice Legacy',
      platformColor: '#e91e63',
      platformLogoText: 'CL',
      reason: 'Fraudulent documents',
      suspendedOn: '15 Sep 2026 9:15 AM',
      duration: 'Permanent',
      status: 'Permanent',
      vehicle: 'Yamaha FZ Version 3',
      licensePlate: 'DHA-8890',
      joinedDate: '05 Mar 2024',
      liftDate: 'N/A (Permanent)',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Driving license presented during audit was identified as forged.',
      documents: [
        { name: 'fake_driving_license.jpg', date: 'Uploaded on 15 Sep 2026', type: 'image' },
        { name: 'audit_investigation_notes.pdf', date: 'Uploaded on 15 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1077',
      rowNum: 4,
      name: 'Hasan Ali',
      phone: '+880 1710 445566',
      email: 'hasan.ali@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1077',
      platform: 'Ride Service',
      platformColor: '#0288d1',
      platformLogoText: 'Ride',
      reason: 'Misconduct with customer',
      suspendedOn: '12 Sep 2026 7:40 PM',
      duration: '30 days',
      status: 'Temporary',
      vehicle: 'Bajaj Discover 125',
      licensePlate: 'DHA-4412',
      joinedDate: '22 Nov 2023',
      liftDate: '12 Oct 2026, 7:40 PM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Verbal altercation reported during customer drop-off.',
      documents: [
        { name: 'customer_support_ticket_99.pdf', date: 'Uploaded on 12 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1033',
      rowNum: 5,
      name: 'Rafiqul Islam',
      phone: '+880 1677 889900',
      email: 'rafiqul.islam@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1033',
      platform: 'Foodi',
      platformColor: '#ff6f00',
      platformLogoText: 'Foodi',
      reason: 'Order theft allegation',
      suspendedOn: '10 Sep 2026 2:10 PM',
      duration: 'Permanent',
      status: 'Permanent',
      vehicle: 'Hero Splendor Plus',
      licensePlate: 'DHA-9081',
      joinedDate: '18 Apr 2024',
      liftDate: 'N/A (Permanent)',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Order marked delivered but customer confirmed items were never handed over.',
      documents: [
        { name: 'merchant_cctv_log.mp4', date: 'Uploaded on 10 Sep 2026', type: 'file' },
        { name: 'refund_claim_receipt.pdf', date: 'Uploaded on 10 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1088',
      rowNum: 6,
      name: 'Naim Hossain',
      phone: '+880 1711 223344',
      email: 'naim.hossain@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1088',
      platform: 'Kirei',
      platformColor: '#d81b60',
      platformLogoText: 'K',
      reason: 'Using fake vehicle documents',
      suspendedOn: '8 Sep 2026 1:25 PM',
      duration: '14 days',
      status: 'Temporary',
      vehicle: 'Runner Turbo 125',
      licensePlate: 'DHA-6632',
      joinedDate: '14 Jan 2024',
      liftDate: '22 Sep 2026, 1:25 PM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Vehicle registration copy failed automated verification check.',
      documents: [
        { name: 'reg_doc_flagged.pdf', date: 'Uploaded on 8 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1044',
      rowNum: 7,
      name: 'Jahidul Islam',
      phone: '+880 1622 556677',
      email: 'jahidul.islam@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1044',
      platform: 'Foodpanda',
      platformColor: '#ff2b85',
      platformLogoText: 'fp',
      reason: 'Low rating (below 2.5) for 50+ orders',
      suspendedOn: '5 Sep 2026 6:50 PM',
      duration: '7 days',
      status: 'Temporary',
      vehicle: 'Suzuki Gixxer 150',
      licensePlate: 'DHA-1109',
      joinedDate: '01 Jun 2024',
      liftDate: '12 Sep 2026, 6:50 PM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Automated policy trigger for rating average dropping below threshold.',
      documents: [
        { name: 'rating_summary_report.pdf', date: 'Uploaded on 5 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1028',
      rowNum: 8,
      name: 'Karim Ullah',
      phone: '+880 1911 667788',
      email: 'karim.ullah@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1028',
      platform: 'Pathao Food',
      platformColor: '#f32735',
      platformLogoText: 'P',
      reason: 'Unprofessional behavior',
      suspendedOn: '2 Sep 2026 3:45 PM',
      duration: '30 days',
      status: 'Temporary',
      vehicle: 'Walton LEO 100',
      licensePlate: 'DHA-7741',
      joinedDate: '09 Aug 2023',
      liftDate: '02 Oct 2026, 3:45 PM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Repeated refusal to wear official delivery uniform and bag.',
      documents: [
        { name: 'warning_letter_2.pdf', date: 'Uploaded on 2 Sep 2026', type: 'pdf' }
      ]
    },
    {
      id: 'DP-1015',
      rowNum: 9,
      name: 'Shakil Ahmed',
      phone: '+880 1700 998877',
      email: 'shakil.ahmed@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1015',
      platform: 'Choice Legacy',
      platformColor: '#e91e63',
      platformLogoText: 'CL',
      reason: 'Account sharing',
      suspendedOn: '28 Aug 2026 10:20 AM',
      duration: 'Permanent',
      status: 'Permanent',
      vehicle: 'Dayang 100 Run',
      licensePlate: 'DHA-3029',
      joinedDate: '12 Dec 2023',
      liftDate: 'N/A (Permanent)',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Facial verification failed during random mid-shift security check.',
      documents: [
        { name: 'facial_verification_failure.png', date: 'Uploaded on 28 Aug 2026', type: 'image' }
      ]
    },
    {
      id: 'DP-1009',
      rowNum: 10,
      name: 'Arif Khan',
      phone: '+880 1888 445566',
      email: 'arif.khan@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      partnerId: 'DP-1009',
      platform: 'Ride Service',
      platformColor: '#0288d1',
      platformLogoText: 'Ride',
      reason: 'Violation of platform policy',
      suspendedOn: '25 Aug 2026 8:10 PM',
      duration: '7 days',
      status: 'Temporary',
      vehicle: 'TVS Stryker 125',
      licensePlate: 'DHA-9932',
      joinedDate: '30 Jul 2023',
      liftDate: '01 Sep 2026, 8:10 PM',
      suspendedBy: 'Meherun Nesa (Admin)',
      remarks: 'Accepting off-app cash payments directly from customers.',
      documents: [
        { name: 'audit_policy_ticket.pdf', date: 'Uploaded on 25 Aug 2026', type: 'pdf' }
      ]
    }
  ];

  const selectedPartner = suspendedPartnersData.find(p => p.id === selectedPartnerId) || suspendedPartnersData[0];

  const handleLiftSuspension = () => {
    if (onToast) onToast(`Suspension lifted for ${selectedPartner.name} (${selectedPartner.partnerId})`);
  };

  const handleMakePermanent = () => {
    if (onToast) onToast(`Suspension set to PERMANENT for ${selectedPartner.name} (${selectedPartner.partnerId})`);
  };

  const renderPlatformBadge = (platform) => {
    switch (platform) {
      case 'Foodpanda':
        return (
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#ff2b85', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: 800 }}>
            fp
          </div>
        );
      case 'Pathao Food':
        return (
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#f32735', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 900 }}>
            P
          </div>
        );
      case 'Choice Legacy':
        return (
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#e91e63', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 800 }}>
            CL
          </div>
        );
      case 'Foodi':
        return (
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#ff6f00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 800 }}>
            fd
          </div>
        );
      case 'Kirei':
        return (
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#333', color: '#ff2b85', border: '1px solid #ff2b85', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
            K
          </div>
        );
      default:
        return (
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0288d1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Car style={{ width: '14px', height: '14px' }} />
          </div>
        );
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            Suspended Partners
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            View and manage suspended delivery partners. Review reasons, duration, and take necessary actions.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSuspendModalOpen(true);
            if (onToast) onToast('Open Suspend Partner Modal');
          }}
          style={{
            backgroundColor: '#ff2b85',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(255, 43, 133, 0.3)',
            transition: 'all 0.2s'
          }}
        >
          <Plus style={{ width: '18px', height: '18px' }} />
          Suspend Partner
        </button>
      </div>

      {/* Top Metrics Cards (4 Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>

        {/* Card 1: Total Suspended */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff1f2', color: '#ff2b85', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Total Suspended</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: '1' }}>18</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#e11d48' }}>↑ 3 vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Temporary Suspension */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff7ed', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Temporary Suspension</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: '1' }}>13</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#f97316' }}>↑ 72%</span>
            </div>
          </div>
        </div>

        {/* Card 3: Permanent Suspension */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1 }}>∞</span>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Permanent Suspension</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: '1' }}>5</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626' }}>↓ 28%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Reactivated */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 style={{ width: '22px', height: '22px' }} />
          </div>
          <div>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Reactivated</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', lineHeight: '1' }}>7</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>↑ 40% this month</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Layout: Table Left (68%), Details Drawer Right (32%) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>

        {/* Left Column: Table and Filters */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>

          {/* Filters Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>

            {/* Search */}
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search by name, ID, phone, or reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  backgroundColor: '#f8fafc',
                  outline: 'none'
                }}
              />
            </div>

            {/* Dropdown 1: All Platforms */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                style={{
                  appearance: 'none',
                  padding: '9px 32px 9px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option>All Platforms</option>
                <option>Foodpanda</option>
                <option>Pathao Food</option>
                <option>Choice Legacy</option>
                <option>Foodi</option>
                <option>Kirei</option>
              </select>
              <ChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#64748b', pointerEvents: 'none' }} />
            </div>

            {/* Dropdown 2: All Suspension Types */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  appearance: 'none',
                  padding: '9px 32px 9px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option>All Suspension Types</option>
                <option>Temporary</option>
                <option>Permanent</option>
              </select>
              <ChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#64748b', pointerEvents: 'none' }} />
            </div>

            {/* Dropdown 3: All Status */}
            <div style={{ position: 'relative' }}>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  appearance: 'none',
                  padding: '9px 32px 9px 14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#475569',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Lifted</option>
              </select>
              <ChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', height: '14px', color: '#64748b', pointerEvents: 'none' }} />
            </div>

            {/* Date Picker Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
              <Calendar style={{ width: '15px', height: '15px', color: '#64748b' }} />
              <span>Sep 1, 2026 - Sep 22, 2026</span>
            </div>

          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#64748b', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '12px 10px', width: '30px' }}><input type="checkbox" style={{ borderRadius: '4px' }} /></th>
                  <th style={{ padding: '12px 10px', width: '30px' }}>#</th>
                  <th style={{ padding: '12px 10px' }}>Partner</th>
                  <th style={{ padding: '12px 10px' }}>Partner ID</th>
                  <th style={{ padding: '12px 10px' }}>Platform</th>
                  <th style={{ padding: '12px 10px' }}>Reason</th>
                  <th style={{ padding: '12px 10px' }}>Suspended On</th>
                  <th style={{ padding: '12px 10px' }}>Duration</th>
                  <th style={{ padding: '12px 10px' }}>Status</th>
                  <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {suspendedPartnersData.map((partner) => {
                  const isSelected = partner.id === selectedPartnerId;
                  return (
                    <tr
                      key={partner.id}
                      onClick={() => setSelectedPartnerId(partner.id)}
                      style={{
                        borderBottom: '1px solid #f8fafc',
                        backgroundColor: isSelected ? '#fff1f2' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s'
                      }}
                    >
                      <td style={{ padding: '12px 10px' }} onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" style={{ borderRadius: '4px' }} />
                      </td>
                      <td style={{ padding: '12px 10px', color: '#94a3b8', fontWeight: 600 }}>
                        {partner.rowNum}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={partner.avatar}
                            alt={partner.name}
                            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>{partner.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{partner.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 10px', fontWeight: 600, color: '#475569' }}>
                        {partner.partnerId}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        {renderPlatformBadge(partner.platform)}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#334155', fontWeight: 500, maxWidth: '180px' }}>
                        {partner.reason}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#64748b', fontSize: '12px' }}>
                        {partner.suspendedOn}
                      </td>
                      <td style={{ padding: '12px 10px', fontWeight: 600, color: '#475569' }}>
                        {partner.duration}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: partner.status === 'Permanent' ? '#fef2f2' : '#fff7ed',
                          color: partner.status === 'Permanent' ? '#dc2626' : '#ea580c',
                          display: 'inline-block'
                        }}>
                          {partner.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => setSelectedPartnerId(partner.id)}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => onToast && onToast(`Options menu for ${partner.name}`)}
                            style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                          >
                            <MoreVertical style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Showing 1-10 of 18 suspended partners
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                <ChevronLeft style={{ width: '16px', height: '16px' }} />
              </button>
              <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', backgroundColor: '#fff1f2', color: '#ff2b85', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}>
                1
              </button>
              <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#64748b', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                2
              </button>
              <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                <ChevronRight style={{ width: '16px', height: '16px' }} />
              </button>
              <select style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', fontSize: '12px', fontWeight: 600, color: '#475569', marginLeft: '8px' }}>
                <option>10 per page</option>
                <option>20 per page</option>
                <option>50 per page</option>
              </select>
            </div>
          </div>

        </div>

        {/* Right Column: Partner Details Drawer */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Partner Details
            </h3>
            <button
              onClick={() => onToast && onToast('Close details panel')}
              style={{ border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X style={{ width: '18px', height: '18px' }} />
            </button>
          </div>

          {/* Partner Main Profile Card */}
          <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
            <img
              src={selectedPartner.avatar}
              alt={selectedPartner.name}
              style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px auto', border: '3px solid #fff1f2' }}
            />
            <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0' }}>
              {selectedPartner.name}
            </h4>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
              Partner ID: {selectedPartner.partnerId}
            </div>
            <span style={{
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              fontSize: '11px',
              fontWeight: 800
            }}>
              Suspended
            </span>

            {/* Quick Contact & Vehicle Info */}
            <div style={{ marginTop: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                <span>{selectedPartner.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                <span>{selectedPartner.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bike style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                <span>{selectedPartner.vehicle}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCode style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                <span>{selectedPartner.licensePlate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                <span>Joined on {selectedPartner.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Suspension Information Section */}
          <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
              Suspension Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Reason</span>
                <span style={{ fontWeight: 700, color: '#0f172a', textAlign: 'right', maxWidth: '170px' }}>{selectedPartner.reason}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Suspended On</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedPartner.suspendedOn}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Suspension Type</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedPartner.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Duration</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedPartner.duration}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Lift Date</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedPartner.liftDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Suspended By</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>{selectedPartner.suspendedBy}</span>
              </div>
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Remarks</span>
                <p style={{ margin: 0, padding: '8px', borderRadius: '6px', backgroundColor: '#f8fafc', color: '#475569', fontSize: '11px', lineHeight: '1.4' }}>
                  {selectedPartner.remarks}
                </p>
              </div>
            </div>
          </div>

          {/* Related Documents Section */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Related Documents
              </h4>
              <button
                onClick={() => onToast && onToast('Opening all documents')}
                style={{ border: 'none', background: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedPartner.documents.map((doc, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText style={{ width: '16px', height: '16px', color: doc.type === 'pdf' ? '#ef4444' : '#2563eb' }} />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>{doc.name}</div>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>{doc.date}</div>
                    </div>
                  </div>
                  <ExternalLink style={{ width: '14px', height: '14px', color: '#94a3b8', cursor: 'pointer' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Drawer Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '10px' }}>
            <button
              onClick={handleLiftSuspension}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #fca5a5',
                backgroundColor: '#ffffff',
                color: '#ef4444',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Unlock style={{ width: '14px', height: '14px' }} />
              Lift Suspension
            </button>
            <button
              onClick={handleMakePermanent}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#ff2b85',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(255, 43, 133, 0.3)'
              }}
            >
              <Ban style={{ width: '14px', height: '14px' }} />
              Make Permanent
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
