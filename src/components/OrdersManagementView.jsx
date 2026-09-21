import React, { useState } from 'react';
import {
  Search, ShoppingBag, CheckCircle2, Clock, X, Calendar, Download,
  Filter, RefreshCw, Eye, Edit, MoreVertical, Users, MapPin, Copy,
  CreditCard, Bike, Phone, Send, ChevronDown
} from 'lucide-react';

export default function OrdersManagementView({ onToast }) {
  const [activeStatusFilter, setActiveStatusFilter] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All Platforms');
  const [statusFilter, setStatusFilter] = useState('All Order Status');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Methods');
  const [selectedOrderId, setSelectedOrderId] = useState('OM-20250922-0012');
  const [selectedDetailTab, setSelectedDetailTab] = useState('Summary');
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(true);

  // Toast helper
  const handleAction = (msg) => {
    if (onToast) onToast(msg);
  };

  // Full 10 Sample Orders Matching Screenshot 1
  const ordersList = [
    {
      id: 'OM-20250922-0012',
      placedDate: 'Sep 22, 3:24 PM',
      platform: 'Foodpanda',
      platformType: 'foodpanda',
      customer: 'Nabila Islam',
      phone: '+880 1712 345678',
      itemsSummary: '2 × Chicken Burger, 1 × French Fries',
      total: '৳ 520',
      status: 'On the Way',
      partner: 'Rahim Ahmed',
      partnerCode: 'DP-1024',
      partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      partnerPhone: '+880 1712 998877',
      orderTime: '3:24 PM',
      address: 'House 12, Road 5, Banani Dhaka 1213',
      paymentMethod: 'bKash',
      storeName: 'Foodpanda Restaurant • Food',
      eta: '8 min (2.3 km)',
      items: [
        {
          name: 'Zinger Burger',
          qty: 2,
          unitPrice: 120,
          totalPrice: 240,
          img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=160&q=80'
        },
        {
          name: 'French Fries',
          qty: 1,
          unitPrice: 80,
          totalPrice: 80,
          img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=160&q=80'
        }
      ],
      subtotal: 320,
      deliveryFee: 50,
      discount: 30,
      couponDiscount: 20,
      couponCode: 'OM20'
    },
    {
      id: 'OM-20250922-0011',
      placedDate: 'Sep 22, 2:10 PM',
      platform: 'Pathao Food',
      platformType: 'pathao',
      customer: 'Samiul Haque',
      phone: '+880 1689 123456',
      itemsSummary: '1 × Beef Tehari, 2 × Coke',
      total: '৳ 650',
      status: 'Preparing',
      partner: null,
      orderTime: '2:10 PM',
      address: 'Plot 44, Block C, Gulshan 1 Dhaka',
      paymentMethod: 'Nagad',
      storeName: 'Pathao Food Kitchen • Food',
      eta: '15 min (3.8 km)',
      items: [
        { name: 'Beef Tehari', qty: 1, unitPrice: 550, totalPrice: 550, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=160&q=80' },
        { name: 'Coke (500ml)', qty: 2, unitPrice: 50, totalPrice: 100, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 650,
      deliveryFee: 40,
      discount: 40,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0010',
      placedDate: 'Sep 22, 1:45 PM',
      platform: 'Choice Legacy',
      platformType: 'choice',
      customer: 'Ayesha Khan',
      phone: '+880 1700 987654',
      itemsSummary: '1 × Cosrx Toner, 1 × Moisturizer',
      total: '৳ 1,290',
      status: 'Confirmed',
      partner: 'Sakib Hasan',
      partnerCode: 'DP-1056',
      partnerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      partnerPhone: '+880 1819 876543',
      orderTime: '1:45 PM',
      address: 'House 88, Road 11, Uttara Dhaka',
      paymentMethod: 'Card',
      storeName: 'Choice Legacy Beauty • Skincare',
      eta: '25 min (5.1 km)',
      items: [
        { name: 'Cosrx BHA Toner', qty: 1, unitPrice: 790, totalPrice: 790, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=160&q=80' },
        { name: 'Hydrating Moisturizer', qty: 1, unitPrice: 500, totalPrice: 500, img: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 1290,
      deliveryFee: 60,
      discount: 60,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0009',
      placedDate: 'Sep 22, 12:30 PM',
      platform: 'Foodi',
      platformType: 'foodi',
      customer: 'Tanvir Ahmed',
      phone: '+880 1800 111222',
      itemsSummary: '3 × Pizza, 1 × Garlic Bread',
      total: '৳ 980',
      status: 'Delivered',
      partner: 'Imran Khan',
      partnerCode: 'DP-1102',
      partnerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      partnerPhone: '+880 1911 223344',
      orderTime: '12:30 PM',
      address: 'Flat 4B, Dhanmondi 27 Dhaka',
      paymentMethod: 'bKash',
      storeName: 'Foodi Express • Food',
      eta: 'Delivered at 1:05 PM',
      items: [
        { name: 'Medium Chicken Pizza', qty: 3, unitPrice: 280, totalPrice: 840, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=160&q=80' },
        { name: 'Garlic Bread sticks', qty: 1, unitPrice: 140, totalPrice: 140, img: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 980,
      deliveryFee: 50,
      discount: 50,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0008',
      placedDate: 'Sep 22, 11:15 AM',
      platform: 'Kirei',
      platformType: 'kirei',
      customer: 'Meherun Nesa',
      phone: '+880 1711 223344',
      itemsSummary: '1 × Sunscreen, 1 × Cleanser',
      total: '৳ 1,850',
      status: 'On the Way',
      partner: 'Tarek Rahman',
      partnerCode: 'DP-1090',
      partnerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
      partnerPhone: '+880 1677 334455',
      orderTime: '11:15 AM',
      address: 'House 5, Road 2, Mirpur 10 Dhaka',
      paymentMethod: 'Card',
      storeName: 'Kirei Skincare Hub • Skincare',
      eta: '12 min (3.0 km)',
      items: [
        { name: 'UV Shield Sunscreen SPF 50', qty: 1, unitPrice: 1150, totalPrice: 1150, img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=160&q=80' },
        { name: 'Gentle Foaming Cleanser', qty: 1, unitPrice: 700, totalPrice: 700, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 1850,
      deliveryFee: 50,
      discount: 50,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0007',
      placedDate: 'Sep 22, 10:05 AM',
      platform: 'Makeup Chari',
      platformType: 'makeup',
      customer: 'Fariha Jannat',
      phone: '+880 1622 556677',
      itemsSummary: '2 × Lip Tint, 1 × Face Mask',
      total: '৳ 1,420',
      status: 'Pending',
      partner: null,
      orderTime: '10:05 AM',
      address: 'Sector 3, Road 14, Uttara Dhaka',
      paymentMethod: 'bKash',
      storeName: 'Makeup Chari Boutique • Skincare',
      eta: 'Pending Assignment',
      items: [
        { name: 'Velvet Lip Tint', qty: 2, unitPrice: 460, totalPrice: 920, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=160&q=80' },
        { name: 'Hydrating Sheet Mask Pack', qty: 1, unitPrice: 500, totalPrice: 500, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 1420,
      deliveryFee: 40,
      discount: 40,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0006',
      placedDate: 'Sep 22, 9:40 AM',
      platform: 'Foodpanda',
      platformType: 'foodpanda',
      customer: 'Rafiul Islam',
      phone: '+880 1677 889900',
      itemsSummary: '1 × Noodles, 1 × Cold Coffee',
      total: '৳ 430',
      status: 'Cancelled',
      partner: null,
      orderTime: '9:40 AM',
      address: 'Block B, Bashundhara R/A Dhaka',
      paymentMethod: 'Cash on Delivery',
      storeName: 'Foodpanda Express • Food',
      eta: 'Order Cancelled',
      items: [
        { name: 'Hakka Noodles', qty: 1, unitPrice: 280, totalPrice: 280, img: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=160&q=80' },
        { name: 'Iced Cold Coffee', qty: 1, unitPrice: 150, totalPrice: 150, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 430,
      deliveryFee: 40,
      discount: 40,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0005',
      placedDate: 'Sep 22, 8:55 AM',
      platform: 'Pathao Food',
      platformType: 'pathao',
      customer: 'Sumaiya Akter',
      phone: '+880 1911 667788',
      itemsSummary: '1 × Kacchi Biryani, 2 × Borhani',
      total: '৳ 720',
      status: 'Delivered',
      partner: 'Mahmudul Islam',
      partnerCode: 'DP-1088',
      partnerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      partnerPhone: '+880 1911 223344',
      orderTime: '8:55 AM',
      address: 'Old Dhaka, Nazira Bazar',
      paymentMethod: 'bKash',
      storeName: 'Pathao Kacchi House • Food',
      eta: 'Delivered at 9:35 AM',
      items: [
        { name: 'Mutton Kacchi Biryani', qty: 1, unitPrice: 580, totalPrice: 580, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=160&q=80' },
        { name: 'Special Borhani (250ml)', qty: 2, unitPrice: 70, totalPrice: 140, img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 720,
      deliveryFee: 50,
      discount: 50,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0004',
      placedDate: 'Sep 22, 8:10 AM',
      platform: 'Choice Legacy',
      platformType: 'choice',
      customer: 'Zahin Rahman',
      phone: '+880 1810 334455',
      itemsSummary: '1 × Niacinamide Serum, 1 × Moisturizer',
      total: '৳ 1,120',
      status: 'Preparing',
      partner: null,
      orderTime: '8:10 AM',
      address: 'Banani DOHS, House 14',
      paymentMethod: 'Nagad',
      storeName: 'Choice Legacy Store • Skincare',
      eta: '20 min (4.0 km)',
      items: [
        { name: '10% Niacinamide Serum', qty: 1, unitPrice: 650, totalPrice: 650, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=160&q=80' },
        { name: 'Barrier Repair Cream', qty: 1, unitPrice: 470, totalPrice: 470, img: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 1120,
      deliveryFee: 50,
      discount: 50,
      couponDiscount: 0
    },
    {
      id: 'OM-20250922-0003',
      placedDate: 'Sep 22, 7:30 AM',
      platform: 'Foodi',
      platformType: 'foodi',
      customer: 'Nazifa Ahmed',
      phone: '+880 1733 889977',
      itemsSummary: '1 × Pasta, 1 × Coke',
      total: '৳ 480',
      status: 'Confirmed',
      partner: 'Hasan Ali',
      partnerCode: 'DP-1077',
      partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      partnerPhone: '+880 1733 445566',
      orderTime: '7:30 AM',
      address: 'Mohakhali Wireless Gate, Dhaka',
      paymentMethod: 'bKash',
      storeName: 'Foodi Italian Pasta • Food',
      eta: '18 min (3.2 km)',
      items: [
        { name: 'Creamy Alfredo Pasta', qty: 1, unitPrice: 420, totalPrice: 420, img: 'https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=160&q=80' },
        { name: 'Coke (250ml)', qty: 1, unitPrice: 60, totalPrice: 60, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=160&q=80' }
      ],
      subtotal: 480,
      deliveryFee: 40,
      discount: 40,
      couponDiscount: 0
    }
  ];

  // Platform Badge Renderer
  const renderPlatformBadge = (platformName, platformType) => {
    if (platformType === 'foodpanda' || platformName.toLowerCase().includes('foodpanda')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#ff2b70',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 800
          }}>
            🐼
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Foodpanda</span>
        </div>
      );
    }
    if (platformType === 'pathao' || platformName.toLowerCase().includes('pathao')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#ef4444',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 900
          }}>
            P
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Pathao Food</span>
        </div>
      );
    }
    if (platformType === 'choice' || platformName.toLowerCase().includes('choice')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#db2777',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 900
          }}>
            CL
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Choice Legacy</span>
        </div>
      );
    }
    if (platformType === 'foodi' || platformName.toLowerCase().includes('foodi')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#f97316',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 900
          }}>
            f
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Foodi</span>
        </div>
      );
    }
    if (platformType === 'kirei' || platformName.toLowerCase().includes('kirei')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#1e293b',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 900
          }}>
            K
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Kirei</span>
        </div>
      );
    }
    if (platformType === 'makeup' || platformName.toLowerCase().includes('makeup')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#ec4899',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 900
          }}>
            M
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Makeup Chari</span>
        </div>
      );
    }
    return <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{platformName}</span>;
  };

  // Status Badge Renderer
  const renderStatusBadge = (status) => {
    let bg = '#e0f2fe';
    let text = '#0284c7';

    if (status === 'On the Way') {
      bg = '#e0f2fe';
      text = '#0284c7';
    } else if (status === 'Preparing') {
      bg = '#fef3c7';
      text = '#d97706';
    } else if (status === 'Confirmed') {
      bg = '#dcfce7';
      text = '#16a34a';
    } else if (status === 'Delivered') {
      bg = '#dcfce7';
      text = '#16a34a';
    } else if (status === 'Pending') {
      bg = '#e0f2fe';
      text = '#0284c7';
    } else if (status === 'Cancelled') {
      bg = '#fee2e2';
      text = '#dc2626';
    }

    return (
      <span style={{
        background: bg,
        color: text,
        padding: '4px 10px',
        borderRadius: '99px',
        fontSize: '11.5px',
        fontWeight: 800,
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}>
        {status}
      </span>
    );
  };

  // Filter Logic
  const filteredOrders = ordersList.filter((ord) => {
    if (activeStatusFilter !== 'All Orders' && ord.status.toLowerCase() !== activeStatusFilter.toLowerCase()) {
      return false;
    }
    if (platformFilter !== 'All Platforms' && !ord.platform.toLowerCase().includes(platformFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'All Order Status' && ord.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (paymentFilter !== 'All Payment Methods' && ord.paymentMethod.toLowerCase() !== paymentFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchId = ord.id.toLowerCase().includes(q);
      const matchCust = ord.customer.toLowerCase().includes(q);
      const matchPhone = ord.phone.includes(q);
      const matchItems = ord.itemsSummary.toLowerCase().includes(q);
      if (!matchId && !matchCust && !matchPhone && !matchItems) return false;
    }
    return true;
  });

  const currentOrder = ordersList.find((o) => o.id === selectedOrderId) || ordersList[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}>

      {/* PAGE TITLE & TOP ACTION CONTROLS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Orders Management
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            View all orders, assign delivery partners, and track order status across all platforms.
          </p>
        </div>

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
            <span>Sep 15, 2026 - Sep 22, 2026</span>
            <ChevronDown size={14} color="#64748b" />
          </div>

          <button
            onClick={() => handleAction('Exported orders CSV / Excel')}
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
            <span>Export Orders</span>
          </button>
        </div>
      </div>

      {/* METRIC / STAT CARDS ROW (5 CARDS MATCHING SCREENSHOT 1) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {/* Card 1: Total Orders */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>128</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                ↑ 12% <span style={{ fontWeight: 500, color: '#64748b' }}>vs last week</span>
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>Total Orders</div>
          </div>
        </div>

        {/* Card 2: Delivered */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>64</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                ↑ 18% <span style={{ fontWeight: 500, color: '#64748b' }}>vs last week</span>
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>Delivered</div>
          </div>
        </div>

        {/* Card 3: On the Way */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>28</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                ↑ 5% <span style={{ fontWeight: 500, color: '#64748b' }}>vs last week</span>
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>On the Way</div>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#dbeafe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>22</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#dc2626', background: '#fee2e2', padding: '2px 6px', borderRadius: '4px' }}>
                ↓ 8% <span style={{ fontWeight: 500, color: '#64748b' }}>vs last week</span>
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>Pending</div>
          </div>
        </div>

        {/* Card 5: Cancelled */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>14</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px' }}>
                ↑ 2% <span style={{ fontWeight: 500, color: '#64748b' }}>vs last week</span>
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginTop: '2px' }}>Cancelled</div>
          </div>
        </div>
      </div>

      {/* STATUS FILTER PILLS ROW */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { name: 'All Orders', count: 128 },
          { name: 'Pending', count: 22 },
          { name: 'Confirmed', count: 18 },
          { name: 'Preparing', count: 14 },
          { name: 'On the Way', count: 28 },
          { name: 'Delivered', count: 64 },
          { name: 'Cancelled', count: 14 }
        ].map((pill) => {
          const isSelected = activeStatusFilter === pill.name;
          return (
            <button
              key={pill.name}
              onClick={() => setActiveStatusFilter(pill.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '99px',
                border: isSelected ? 'none' : '1px solid #e2e8f0',
                background: isSelected ? '#ff2b70' : '#ffffff',
                color: isSelected ? '#ffffff' : '#475569',
                fontSize: '13px',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 12px rgba(255, 43, 112, 0.25)' : 'none'
              }}
            >
              <span>{pill.name}</span>
              <span style={{
                background: isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                color: isSelected ? '#ffffff' : '#64748b',
                padding: '1px 7px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 800
              }}>
                {pill.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* FILTER CONTROLS BAR */}
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        padding: '14px 18px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              fontSize: '13px',
              outline: 'none',
              color: '#334155'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option>All Platforms</option>
            <option>Foodpanda</option>
            <option>Pathao Food</option>
            <option>Choice Legacy</option>
            <option>Foodi</option>
            <option>Kirei</option>
            <option>Makeup Chari</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option>All Order Status</option>
            <option>On the Way</option>
            <option>Preparing</option>
            <option>Confirmed</option>
            <option>Delivered</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option>All Payment Methods</option>
            <option>bKash</option>
            <option>Nagad</option>
            <option>Card</option>
            <option>Cash on Delivery</option>
          </select>

          <button
            onClick={() => handleAction('Filters applied')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Filter size={14} />
            <span>Filter</span>
          </button>

          <button
            onClick={() => {
              setSearchQuery('');
              setPlatformFilter('All Platforms');
              setStatusFilter('All Order Status');
              setPaymentFilter('All Payment Methods');
              setActiveStatusFilter('All Orders');
              handleAction('Filters reset');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #fecdd3',
              background: '#fff0f5',
              color: '#ff2b70',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* TABLE & RIGHT DETAIL PANEL LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: isDetailDrawerOpen ? '1fr 340px' : '1fr', gap: '20px', alignItems: 'start' }}>

        {/* LEFT SIDE: ORDERS TABLE */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', width: '36px' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                  </th>
                  <th style={{ padding: '12px 16px' }}>Order ID</th>
                  <th style={{ padding: '12px 16px' }}>Platform</th>
                  <th style={{ padding: '12px 16px' }}>Customer</th>
                  <th style={{ padding: '12px 16px' }}>Items</th>
                  <th style={{ padding: '12px 16px' }}>Total</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Partner</th>
                  <th style={{ padding: '12px 16px' }}>Order Time</th>
                  <th style={{ padding: '12px 16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((ord) => {
                  const isSelected = selectedOrderId === ord.id;
                  return (
                    <tr
                      key={ord.id}
                      onClick={() => {
                        setSelectedOrderId(ord.id);
                        setIsDetailDrawerOpen(true);
                      }}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: isSelected ? '#fff0f5' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '14px 16px' }} onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={isSelected} onChange={() => { setSelectedOrderId(ord.id); setIsDetailDrawerOpen(true); }} style={{ cursor: 'pointer' }} />
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{ord.id}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{ord.placedDate}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {renderPlatformBadge(ord.platform, ord.platformType)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{ord.customer}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.phone}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 600 }}>
                        {ord.itemsSummary}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 900, color: '#0f172a' }}>
                        {ord.total}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {renderStatusBadge(ord.status)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {ord.partner ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img
                              src={ord.partnerAvatar}
                              alt={ord.partner}
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '12px' }}>{ord.partner}</div>
                              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{ord.partnerCode}</div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Not Assigned</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(`Assign partner modal for ${ord.id}`);
                              }}
                              style={{
                                background: '#fff0f5',
                                color: '#ff2b70',
                                border: '1px solid #fecdd3',
                                borderRadius: '99px',
                                padding: '3px 10px',
                                fontSize: '11px',
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}
                            >
                              Assign
                            </button>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748b', fontWeight: 600, fontSize: '12px' }}>
                        {ord.orderTime}
                      </td>
                      <td style={{ padding: '14px 16px' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setSelectedOrderId(ord.id);
                              setIsDetailDrawerOpen(true);
                            }}
                            style={{ border: 'none', background: '#f1f5f9', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#475569' }}
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleAction(`Edit order ${ord.id}`)}
                            style={{ border: 'none', background: '#f1f5f9', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#475569' }}
                            title="Edit Order"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleAction(`More options for ${ord.id}`)}
                            style={{ border: 'none', background: '#f1f5f9', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#475569' }}
                            title="More"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>
              Showing 1-10 of 128 orders
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button style={{ border: '1px solid #e2e8f0', background: '#ffffff', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}>&lt;</button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  style={{
                    border: p === 1 ? 'none' : '1px solid #e2e8f0',
                    background: p === 1 ? '#ff2b70' : '#ffffff',
                    color: p === 1 ? '#ffffff' : '#475569',
                    padding: '5px 10px',
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
              <button style={{ border: '1px solid #e2e8f0', background: '#ffffff', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#475569' }}>13</button>
              <button style={{ border: '1px solid #e2e8f0', background: '#ffffff', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', color: '#64748b' }}>&gt;</button>
            </div>

            <select style={{ border: '1px solid #e2e8f0', background: '#ffffff', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', color: '#475569', outline: 'none' }}>
              <option>10 per page</option>
              <option>25 per page</option>
              <option>50 per page</option>
            </select>
          </div>
        </div>

        {/* RIGHT SIDE: ORDER DETAILS DRAWER PANEL */}
        {isDetailDrawerOpen && (
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
          }}>
            {/* Header Title & Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                Order Details
              </h3>
              <button
                onClick={() => setIsDetailDrawerOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Order ID & Status Badge */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a' }}>{currentOrder.id}</span>
                {renderStatusBadge(currentOrder.status)}
              </div>
              <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>
                Placed on {currentOrder.placedDate}
              </div>
            </div>

            {/* Detail Tabs Bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>
              {['Summary', 'Tracking', 'Customer', 'Partner'].map((tab) => {
                const isSelected = selectedDetailTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setSelectedDetailTab(tab)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      border: 'none',
                      borderBottom: isSelected ? '2px solid #ff2b70' : '2px solid transparent',
                      background: 'transparent',
                      color: isSelected ? '#ff2b70' : '#64748b',
                      fontSize: '12.5px',
                      fontWeight: isSelected ? 800 : 600,
                      cursor: 'pointer'
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Store Card Banner */}
            <div style={{
              background: '#fff0f5',
              borderRadius: '12px',
              padding: '12px',
              border: '1px solid #fecdd3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#ff2b70',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px'
                }}>
                  🐼
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Foodpanda</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Restaurant • Food</div>
                </div>
              </div>

              <button
                onClick={() => handleAction('Opening Foodpanda Store...')}
                style={{
                  border: '1px solid #ff2b70',
                  background: '#ffffff',
                  color: '#ff2b70',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                View Store
              </button>
            </div>

            {/* Purchased Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                        {item.name} <span style={{ color: '#64748b', fontWeight: 600 }}>× {item.qty}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        ৳ {item.unitPrice} each
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                    ৳ {item.totalPrice}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div style={{
              borderTop: '1px solid #f1f5f9',
              borderBottom: '1px solid #f1f5f9',
              padding: '12px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12.5px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Subtotal</span>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>৳ {currentOrder.subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Delivery Fee</span>
                <span style={{ color: '#0f172a', fontWeight: 700 }}>৳ {currentOrder.deliveryFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Discount</span>
                <span style={{ fontWeight: 700 }}>- ৳ {currentOrder.discount}</span>
              </div>
              {currentOrder.couponDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                  <span>Coupon ({currentOrder.couponCode})</span>
                  <span style={{ fontWeight: 700 }}>- ৳ {currentOrder.couponDiscount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 900, color: '#ff2b70', paddingTop: '6px' }}>
                <span>Total</span>
                <span>{currentOrder.total}</span>
              </div>
            </div>

            {/* Details Section List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
              {/* Customer */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <Users size={16} color="#64748b" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>Customer</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{currentOrder.customer}</div>
                  <div style={{ color: '#64748b' }}>{currentOrder.phone}</div>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} color="#64748b" style={{ marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>Delivery Address</span>
                    <Copy size={13} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => handleAction('Address copied')} />
                  </div>
                  <div style={{ fontWeight: 600, color: '#334155', lineHeight: 1.3, marginTop: '2px' }}>
                    {currentOrder.address}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <CreditCard size={16} color="#64748b" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>Payment Method</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{currentOrder.paymentMethod}</div>
                </div>
              </div>

              {/* Delivery Partner */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <Bike size={16} color="#64748b" style={{ marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>Delivery Partner</div>
                  {currentOrder.partner ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>
                        {currentOrder.partner} ({currentOrder.partnerCode})
                      </span>
                      <Phone size={13} color="#ff2b70" style={{ cursor: 'pointer' }} onClick={() => handleAction(`Calling ${currentOrder.partner}...`)} />
                    </div>
                  ) : (
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>Not Assigned</span>
                  )}
                  {currentOrder.partnerPhone && <div style={{ color: '#64748b' }}>{currentOrder.partnerPhone}</div>}
                </div>
              </div>

              {/* Order Status */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={16} color="#64748b" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>Order Status</div>
                  <div style={{ fontWeight: 800, color: '#0284c7' }}>{currentOrder.status}</div>
                  <div style={{ color: '#64748b' }}>ETA: {currentOrder.eta}</div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => handleAction('Update status modal')}
                style={{
                  border: '1px solid #ff2b70',
                  background: '#ffffff',
                  color: '#ff2b70',
                  borderRadius: '10px',
                  padding: '10px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Update Status
              </button>

              <button
                onClick={() => handleAction('Opening live map tracker...')}
                style={{
                  border: 'none',
                  background: '#ff2b70',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '10px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(255, 43, 112, 0.25)'
                }}
              >
                <Send size={14} />
                <span>View on Map</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
