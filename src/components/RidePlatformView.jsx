import React, { useState } from 'react';
import {
  Car, DollarSign, CheckCircle2, Star, Clock, Bell, Phone, MessageSquare,
  MapPin, Navigation, Send, Paperclip, ChevronRight, User, ShieldCheck,
  Check, ArrowUpRight, ArrowDownRight, MoreVertical, CreditCard, Shield
} from 'lucide-react';

export default function RidePlatformView({ onToast }) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('All (3)');
  const [selectedTripId, setSelectedTripId] = useState('trip-uber-1');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'rider', text: "Hi! I'm at Banani, House 12.", time: '10:14 AM' },
    { sender: 'me', text: "Okay! I'm on the way. Arriving in 5 minutes.", time: '10:15 AM', read: true },
    { sender: 'rider', text: "I'm waiting near the main gate.", time: '10:15 AM' },
    { sender: 'me', text: 'Got it! See you soon.', time: '10:15 AM', read: true }
  ]);

  const handleSendMessage = (msgText) => {
    const text = msgText || chatMessage;
    if (!text || !text.trim()) return;

    const newMsg = {
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatMessage('');
    if (onToast) onToast('Message sent to rider!');
  };

  const handleAction = (msg) => {
    if (onToast) onToast(`${msg} action triggered`);
  };

  // Trip Requests List
  const tripRequests = [
    {
      id: 'trip-uber-1',
      platform: 'Uber',
      platformBg: '#000000',
      platformTagBg: '#000000',
      timeAgo: '4 min ago',
      fare: '৳ 320',
      estDist: 'Est. (18 km)',
      riderName: 'Sadia Islam',
      rating: 4.9,
      tripsCount: 48,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      pickup: 'Banani, Dhaka',
      dropoff: 'Uttara, Dhaka',
      awayDist: '4.8 km away',
      timeToPickup: '5 min to pickup',
      pickupDetail: 'House 12, Road 5, Banani, Dhaka',
      dropoffDetail: 'Sector 7, Uttara, Dhaka',
      pickupMapDist: '2.3 km',
      dropoffMapDist: '18 km',
      tripDuration: '32 min',
      paymentMethod: 'Cash',
      isSelected: selectedTripId === 'trip-uber-1'
    },
    {
      id: 'trip-obhai-2',
      platform: 'Obhai',
      platformBg: '#10b981',
      platformTagBg: '#10b981',
      timeAgo: '6 min ago',
      fare: '৳ 280',
      estDist: 'Est. (12 km)',
      riderName: 'Hasan Mahmud',
      rating: 4.7,
      tripsCount: 36,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      pickup: 'Dhanmondi, Dhaka',
      dropoff: 'Gulshan, Dhaka',
      awayDist: '3.2 km away',
      timeToPickup: '4 min to pickup',
      pickupDetail: 'Road 8A, Dhanmondi, Dhaka',
      dropoffDetail: 'Circle 2, Gulshan, Dhaka',
      pickupMapDist: '1.5 km',
      dropoffMapDist: '12 km',
      tripDuration: '24 min',
      paymentMethod: 'bKash',
      isSelected: selectedTripId === 'trip-obhai-2'
    },
    {
      id: 'trip-indrive-3',
      platform: 'inDrive',
      platformBg: '#84cc16',
      platformTagBg: '#000000',
      timeAgo: '8 min ago',
      fare: '৳ 250',
      estDist: 'Est. (10 km)',
      riderName: 'Nusrat Jahan',
      rating: 4.8,
      tripsCount: 22,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      pickup: 'Mirpur 10, Dhaka',
      dropoff: 'Mohammadpur, Dhaka',
      awayDist: '6.1 km away',
      timeToPickup: '7 min to pickup',
      pickupDetail: 'Block D, Mirpur 10, Dhaka',
      dropoffDetail: 'Town Hall, Mohammadpur, Dhaka',
      pickupMapDist: '2.8 km',
      dropoffMapDist: '10 km',
      tripDuration: '20 min',
      paymentMethod: 'Cash',
      isSelected: selectedTripId === 'trip-indrive-3'
    }
  ];

  const selectedTrip = tripRequests.find(t => t.id === selectedTripId) || tripRequests[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

      {/* ================= HEADER BAR ================= */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Ride Partner Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Get trip requests from Uber, Obhai and inDrive. Accept, complete and earn more.
          </p>
        </div>

        {/* Right Status Toggle & User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Online Toggle Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '6px 14px', borderRadius: '99px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: isOnline ? '#10b981' : '#64748b' }}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <div
              onClick={() => {
                setIsOnline(!isOnline);
                handleAction(isOnline ? 'Went Offline' : 'Went Online');
              }}
              style={{
                width: '38px',
                height: '22px',
                borderRadius: '99px',
                background: isOnline ? '#10b981' : '#cbd5e1',
                position: 'relative',
                padding: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#ffffff',
                marginLeft: isOnline ? 'auto' : '0',
                transition: 'all 0.2s ease'
              }}></div>
            </div>
          </div>

          {/* Bell Notifications */}
          <div
            onClick={() => handleAction('Ride Notifications')}
            style={{ position: 'relative', cursor: 'pointer', color: '#475569' }}
          >
            <Bell size={22} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#ff2b70',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              3
            </span>
          </div>

          {/* User Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="Rahim Ahmed"
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
            />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>Rahim Ahmed</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Driver Partner ∨</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TOP KPI METRIC CARDS ROW (5 CARDS) ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>

        {/* Card 1: Today's Trips */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Car size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Today's Trips</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>12</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 20%</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs yesterday</div>
          </div>
        </div>

        {/* Card 2: Today's Earnings */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Today's Earnings</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>৳ 2,450</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 18%</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs yesterday</div>
          </div>
        </div>

        {/* Card 3: Acceptance Rate */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Acceptance Rate</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>92%</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 5%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Avg. Rating */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Star size={22} fill="#f59e0b" color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Avg. Rating</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>4.8</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 0.2</span>
            </div>
          </div>
        </div>

        {/* Card 5: Online Hours */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#f3e8ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Online Hours</div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>6h 20m</div>
          </div>
        </div>

      </div>

      {/* ================= MAIN 3-COLUMN WORKSPACE GRID ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 340px', gap: '20px' }}>

        {/* ---------------- COL 1: TRIP REQUESTS (3) ---------------- */}
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
              Trip Requests (3)
            </h3>
            <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
              • Live
            </span>
          </div>

          {/* Filter Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {['All (3)', 'Uber (1)', 'Obhai (1)', 'inDrive (1)'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); handleAction(`Tab ${tab}`); }}
                  style={{
                    background: isActive ? '#fff0f5' : '#f8fafc',
                    border: isActive ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '6px 4px',
                    fontSize: '11px',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#ff2b70' : '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Requests Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tripRequests.map((trip) => {
              const isSelected = selectedTripId === trip.id;
              return (
                <div
                  key={trip.id}
                  onClick={() => {
                    setSelectedTripId(trip.id);
                    handleAction(`Selected ${trip.platform} Trip`);
                  }}
                  style={{
                    background: isSelected ? '#ffffff' : '#ffffff',
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
                  {/* Top Bar: Platform Badge & Fare */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        background: trip.platformBg,
                        color: '#ffffff',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 900
                      }}>
                        {trip.platform}
                      </div>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{trip.timeAgo}</span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{trip.fare}</div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>{trip.estDist}</div>
                    </div>
                  </div>

                  {/* Rider Profile */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={trip.avatar}
                      alt={trip.riderName}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{trip.riderName}</div>
                      <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Star size={11} fill="#f59e0b" color="#f59e0b" />
                        <span>{trip.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({trip.tripsCount} trips)</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Locations Pickup & Dropoff */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{trip.pickup}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{trip.dropoff}</span>
                    </div>
                  </div>

                  {/* Sub Distance & Time info */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Car size={12} color="#64748b" /> {trip.awayDist}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontWeight: 700 }}>
                      <Clock size={12} color="#ef4444" /> {trip.timeToPickup}
                    </span>
                  </div>

                  {/* Decline / Accept Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAction(`Declined ${trip.riderName}`); }}
                      style={{
                        background: '#fff0f5',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        color: '#ff2b70',
                        cursor: 'pointer'
                      }}
                    >
                      Decline
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleAction(`Accepted ${trip.riderName}`); }}
                      style={{
                        background: '#ff2b70',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        fontSize: '11.5px',
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

        {/* ---------------- COL 2: TRIP DETAILS PANEL (REAL GOOGLE MAP) ---------------- */}
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
              Trip Details
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: selectedTrip.platformBg, color: '#ffffff', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 900 }}>
                {selectedTrip.platform}
              </span>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                New Request
              </span>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{selectedTrip.timeAgo}</span>
            </div>
          </div>

          {/* Rider Quick Info Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={selectedTrip.avatar}
                alt={selectedTrip.riderName}
                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.riderName}</div>
                <div style={{ fontSize: '11.5px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span>{selectedTrip.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({selectedTrip.tripsCount} trips)</span></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handleAction(`Call ${selectedTrip.riderName}`)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #ff2b70',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#ff2b70',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Phone size={13} color="#ff2b70" />
                <span>Call</span>
              </button>

              <button
                onClick={() => handleAction(`Chat with ${selectedTrip.riderName}`)}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #ff2b70',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#ff2b70',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <MessageSquare size={13} color="#ff2b70" />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Pickup & Dropoff Address Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            {/* Pickup */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', marginTop: '4px', flexShrink: 0 }}></span>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700 }}>Pickup Location</div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.pickup}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{selectedTrip.pickupDetail}</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{selectedTrip.pickupMapDist}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px stroke #e2e8f0', margin: '2px 0' }} />

            {/* Drop-off */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', marginTop: '4px', flexShrink: 0 }}></span>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700 }}>Drop-off Location</div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.dropoff}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{selectedTrip.dropoffDetail}</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{selectedTrip.dropoffMapDist}</span>
            </div>
          </div>

          {/* REAL INTERACTIVE GOOGLE MAP EMBED (Banani to Uttara Dhaka Route) */}
          <div style={{
            height: '240px',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #cbd5e1',
            background: '#e0f2fe'
          }}>
            <iframe
              title="Real Google Location Dhaka Map"
              src="https://maps.google.com/maps?q=Banani+to+Uttara,+Dhaka,+Bangladesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
              style={{ width: '100%', height: '100%', border: 0, opacity: 0.9 }}
              loading="lazy"
            ></iframe>

            {/* Map Overlay Route Line (Blue) */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
              <path d="M 120 180 Q 180 120 220 50" fill="none" stroke="#3b82f6" strokeWidth="4" />
            </svg>

            {/* Pickup Pin */}
            <div style={{ position: 'absolute', bottom: '22%', left: '30%', zIndex: 20, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981', color: '#fff', fontSize: '9px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>●</div>
              <div style={{ background: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 900, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>Pickup Banani</div>
            </div>

            {/* Drop-off Pin */}
            <div style={{ position: 'absolute', top: '15%', right: '28%', zIndex: 20, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ef4444', color: '#fff', fontSize: '9px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>📍</div>
              <div style={{ background: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: 900, boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>Drop-off Uttara</div>
            </div>

            {/* Car Driver Marker Pin */}
            <div style={{ position: 'absolute', bottom: '28%', left: '36%', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#000000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
                <Car size={14} />
              </div>
              <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '1px 5px', borderRadius: '4px', fontSize: '9px', fontWeight: 800, marginTop: '2px' }}>Your Location</div>
            </div>

            {/* ETA Callout Badge on Route */}
            <div style={{ position: 'absolute', top: '40%', right: '40%', background: '#ffffff', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 900, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', border: '1px solid #bfdbfe', zIndex: 20 }}>
              18 km<br /><span style={{ color: '#3b82f6' }}>~ 32 min</span>
            </div>

            {/* Bottom Navigate Button */}
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 20 }}>
              <button
                onClick={() => handleAction('Start Navigation')}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '99px',
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#3b82f6',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Navigation size={13} color="#3b82f6" />
                <span>Navigate</span>
              </button>
            </div>
          </div>

          {/* Trip Summary Grid (4 Stats) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center', background: '#f8fafc', padding: '10px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Estimated Fare</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.fare}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Estimated Time</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.tripDuration}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Distance</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.dropoffMapDist}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>Payment Method</div>
              <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '2px' }}>
                <span>💵</span> {selectedTrip.paymentMethod}
              </div>
            </div>
          </div>

          {/* Action Buttons: Decline & Accept Trip */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '10px' }}>
            <button
              onClick={() => handleAction(`Declined ${selectedTrip.riderName}`)}
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
              Decline
            </button>

            <button
              onClick={() => handleAction(`Accepted Trip for ${selectedTrip.riderName}`)}
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
                justify: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(255, 43, 112, 0.3)'
              }}
            >
              <Check size={16} />
              <span>Accept Trip</span>
            </button>
          </div>
        </div>

        {/* ---------------- COL 3: CHAT & RIDER INFO SIDE PANEL ---------------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Card 1: Uber Chat with Rider */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            gap: '12px'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#000000', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>Uber</span>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Chat with Rider
                </h3>
              </div>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                • Online
              </span>
            </div>

            {/* Rider Header Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={selectedTrip.avatar}
                  alt={selectedTrip.riderName}
                  style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.riderName}</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>+880 1712 345678</div>
                </div>
              </div>

              <div
                onClick={() => handleAction('Call Rider')}
                style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Phone size={14} color="#ff2b70" />
              </div>
            </div>

            {/* Chat Stream */}
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

            {/* Chat Input Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => handleAction('Attach File')}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
              >
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
                  justify: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={13} />
              </button>
            </div>
          </div>

          {/* Card 2: Rider Information */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Rider Information
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={selectedTrip.avatar}
                alt={selectedTrip.riderName}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
              />

              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#0f172a' }}>{selectedTrip.riderName}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>+880 1712 345678</div>
                <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                  <Star size={11} fill="#f59e0b" color="#f59e0b" />
                  <span>{selectedTrip.rating} <span style={{ color: '#94a3b8', fontWeight: 500 }}>({selectedTrip.tripsCount} trips)</span></span>
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                  Uber User • Member since Jan 2024
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Vehicle Information */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Vehicle Information
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Car size={20} color="#3b82f6" />
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 900, color: '#0f172a' }}>Toyota Corolla 2020</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Silver</div>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: 800, marginTop: '2px' }}>Dhaka Metro - GA 32-1234</div>
                </div>
              </div>

              {/* Real Silver Toyota Corolla Car Image */}
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80"
                alt="Toyota Corolla 2020 Silver"
                style={{ width: '84px', height: '52px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>

            <button
              onClick={() => handleAction('View Vehicle Details')}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '7px',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#3b82f6',
                cursor: 'pointer'
              }}
            >
              View Vehicle Details
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
