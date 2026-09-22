import React, { useState } from 'react';
import {
  Phone, MapPin, Navigation, CheckCircle2, Send, Paperclip, Star,
  Clock, Bike, DollarSign, TrendingUp, ChevronRight, User, Utensils,
  Check, MoreVertical, Minus, ArrowUpRight, ArrowDownRight, MessageSquare
} from 'lucide-react';

export default function FoodPlatformView({ onToast }) {
  const [activeTab, setActiveTab] = useState('Accepted');
  const [selectedOrderId, setSelectedOrderId] = useState('OM-20260922-0012');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'customer', text: 'Hi! Where are you now?', time: '3:28 PM' },
    { sender: 'me', text: "Hi! I'm on the way to your location. It will take around 8 minutes.", time: '3:29 PM', read: true },
    { sender: 'customer', text: 'Okay. Please deliver at the main gate.', time: '3:30 PM' },
    { sender: 'me', text: "Sure! I'll be there soon.", time: '3:31 PM', read: true },
    { sender: 'customer', text: 'Thank you! 🙏', time: '3:31 PM' }
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

  const handleAction = (msg) => {
    if (onToast) onToast(`${msg} action triggered`);
  };

  // Orders List
  const ordersList = [
    {
      id: 'OM-20260922-0012',
      restaurant: 'KFC - Gulshan',
      status: 'On the Way',
      statusBg: '#ecfdf5',
      statusColor: '#10b981',
      customer: 'Nabila Islam',
      eta: '8 min • 2.3 km',
      logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=120&q=80',
      logoText: 'KFC',
      logoBg: '#e11d48',
      isSelected: selectedOrderId === 'OM-20260922-0012'
    },
    {
      id: 'OM-20260922-0015',
      restaurant: 'Pizza Hut - Dhanmondi',
      status: 'Picked Up',
      statusBg: '#eff6ff',
      statusColor: '#3b82f6',
      customer: 'Samiul Haque',
      eta: '12 min • 3.5 km',
      logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=120&q=80',
      logoText: 'Pizza Hut',
      logoBg: '#1e293b',
      isSelected: selectedOrderId === 'OM-20260922-0015'
    },
    {
      id: 'OM-20260922-0018',
      restaurant: 'Burger King - Uttara',
      status: 'Accepted',
      statusBg: '#fff7ed',
      statusColor: '#f59e0b',
      customer: 'Ayesha Khan',
      eta: '5 min • 1.7 km',
      logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&q=80',
      logoText: 'Burger King',
      logoBg: '#d97706',
      isSelected: selectedOrderId === 'OM-20260922-0018'
    },
    {
      id: 'OM-20260922-0021',
      restaurant: 'Star Kabab - Banani',
      status: 'New Order',
      statusBg: '#e0f2fe',
      statusColor: '#0284c7',
      customer: 'Tanvir Ahmed',
      eta: '15 min • 4.1 km',
      logo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=120&q=80',
      logoText: 'Star Kabab',
      logoBg: '#991b1b',
      isSelected: selectedOrderId === 'OM-20260922-0021'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

      {/* ================= TOP ORDER STATUS TABS BAR ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
        {[
          { label: 'All Orders', count: 8 },
          { label: 'New Orders', count: 2 },
          { label: 'Accepted', count: 1 },
          { label: 'Picked Up', count: 1 },
          { label: 'On the Way', count: 2 },
          { label: 'Delivered', count: 12 },
          { label: 'Cancelled', count: 1 }
        ].map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              onClick={() => {
                setActiveTab(tab.label);
                handleAction(`Filter tab ${tab.label}`);
              }}
              style={{
                background: isActive ? '#fff0f5' : '#ffffff',
                border: isActive ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '12px 8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: isActive ? '0 4px 12px rgba(255, 43, 112, 0.15)' : 'none'
              }}
            >
              <div style={{ fontSize: '12.5px', fontWeight: isActive ? 800 : 700, color: isActive ? '#ff2b70' : '#475569' }}>
                {tab.label}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: isActive ? '#ff2b70' : '#0f172a', marginTop: '2px' }}>
                {tab.count}
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= MAIN 3-COLUMN WORKSPACE GRID ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 340px', gap: '20px' }}>

        {/* ---------------- COL 1: ACTIVE ORDERS LIST ---------------- */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '4px', height: '16px', background: '#ff2b70', borderRadius: '4px' }}></div>
            <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Active Orders
            </h3>
          </div>

          {/* Orders Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ordersList.map((item) => {
              const isSelected = selectedOrderId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedOrderId(item.id);
                    handleAction(`Selected Order ${item.id}`);
                  }}
                  style={{
                    background: isSelected ? '#fff0f5' : '#ffffff',
                    border: isSelected ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: item.logoBg,
                        color: '#ffffff',
                        fontWeight: 900,
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                      }}>
                        {item.logoText}
                      </div>

                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                          {item.restaurant}
                        </div>
                        <div style={{ fontSize: '11px', color: '#ff2b70', fontWeight: 700, marginTop: '2px' }}>
                          {item.id}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{
                        background: item.statusBg,
                        color: item.statusColor,
                        padding: '3px 8px',
                        borderRadius: '99px',
                        fontSize: '10.5px',
                        fontWeight: 800
                      }}>
                        {item.status}
                      </span>
                      <ChevronRight size={15} color="#94a3b8" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontWeight: 600, borderTop: '1px stroke #f1f5f9', paddingTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={12} color="#64748b" /> {item.customer}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569', fontWeight: 700 }}>
                      <Clock size={12} color="#ff2b70" /> {item.eta}
                    </span>
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
          {/* Details Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Order Details
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span> On the Way ❯
              </span>
            </div>
          </div>

          <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600, marginTop: '-10px' }}>
            Order <strong style={{ color: '#0f172a' }}>#OM-20260922-0012</strong> • <span style={{ color: '#94a3b8' }}>Placed at 3:05 PM, 22 Sep 2026</span>
          </div>

          {/* Restaurant Card */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#e11d48',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                KFC
              </div>

              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#0f172a' }}>KFC - Gulshan</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>House 12, Road 5, Gulshan 1, Dhaka 1212</div>
                <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <span>📞 01711 223344</span>
                  <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>👤 Restaurant</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleAction('Call Restaurant')}
              style={{
                background: '#ffffff',
                border: '1.5px solid #ff2b70',
                borderRadius: '8px',
                padding: '7px 12px',
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
              <span>Call Restaurant</span>
            </button>
          </div>

          {/* Customer Information Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Customer Information
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Nabila Islam"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }}
                />

                <div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#0f172a' }}>Nabila Islam</div>
                  <div style={{ fontSize: '11.5px', color: '#f59e0b', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>4.8 <span style={{ color: '#94a3b8', fontWeight: 500 }}>(32 orders)</span></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => handleAction('Open Maps')}
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '8px',
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
                  <MapPin size={12} />
                  <span>Open in Maps</span>
                </button>

                <button
                  onClick={() => handleAction('Call Customer')}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #ff2b70',
                    borderRadius: '8px',
                    padding: '6px 12px',
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
                  <span>Call Customer</span>
                </button>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} color="#3b82f6" />
                <span>House 25, Road 12, Gulshan 1, Dhaka 1212</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={13} color="#10b981" />
                <span>01820 765432</span>
              </div>
            </div>
          </div>

          {/* Order Items (2) */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px 0' }}>
              Order Items (2)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Item 1 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80"
                    alt="Zinger Burger"
                    style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>Zinger Burger</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>x 1</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>৳ 250</div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=150&q=80"
                    alt="French Fries"
                    style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a' }}>French Fries (Medium)</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>x 1</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>৳ 170</div>
              </div>
            </div>
          </div>

          {/* Payment Method & Total Amount */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Total Amount</div>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a' }}>৳ 420</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Payment Method</div>
              <div style={{ background: '#e11d48', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 900 }}>
                bKash
              </div>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 800 }}>
                Paid
              </span>
            </div>
          </div>

          {/* Order Progress Stepper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
              {/* Stepper Line */}
              <div style={{ position: 'absolute', top: '10px', left: '10%', right: '10%', height: '3px', background: '#e2e8f0', zIndex: 1 }}>
                <div style={{ width: '66%', height: '100%', background: '#10b981' }}></div>
              </div>

              {[
                { title: 'Order Accepted', time: '3:08 PM', isDone: true },
                { title: 'Picked Up', time: '3:18 PM', isDone: true },
                { title: 'On the Way', time: '3:32 PM', isDone: true },
                { title: 'Delivered', time: '', isDone: false }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: step.isDone ? '#10b981' : '#ffffff',
                    border: step.isDone ? 'none' : '2px solid #cbd5e1',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center'
                  }}>
                    {step.isDone ? '✓' : ''}
                  </div>
                  <div style={{ fontSize: '10.5px', fontWeight: step.isDone ? 800 : 600, color: step.isDone ? '#0f172a' : '#94a3b8', marginTop: '4px' }}>
                    {step.title}
                  </div>
                  {step.time && (
                    <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>{step.time}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '10px' }}>
            <button
              onClick={() => handleAction('View Route')}
              style={{
                background: '#ffffff',
                border: '1.5px solid #3b82f6',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#3b82f6',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '6px'
              }}
            >
              <Navigation size={15} />
              <span>View Route</span>
            </button>

            <button
              onClick={() => handleAction('Mark as Delivered')}
              style={{
                background: '#10b981',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>Mark as Delivered</span>
            </button>
          </div>

        </div>

        {/* ---------------- COL 3: CHAT WITH CUSTOMER PANEL ---------------- */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          gap: '14px'
        }}>
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Chat with Customer
                </h3>
                <span style={{ background: '#ecfdf5', color: '#10b981', padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                  • Active
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                <Minus size={16} style={{ cursor: 'pointer' }} />
                <MoreVertical size={16} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* Customer Chat Profile Subheader */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Nabila Islam"
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>Nabila Islam</div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>Order #OM-20260922-0012</div>
              </div>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '260px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {chatMessages.map((msg, idx) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    background: isMe ? '#ecfdf5' : '#f1f5f9',
                    color: isMe ? '#065f46' : '#1e293b',
                    padding: '8px 12px',
                    borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    fontSize: '12px',
                    fontWeight: 500,
                    maxWidth: '85%',
                    lineHeight: 1.4
                  }}>
                    {msg.text}
                  </div>

                  <div style={{ fontSize: '9.5px', color: '#94a3b8', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span>{msg.time}</span>
                    {isMe && <span style={{ color: '#10b981', fontWeight: 900 }}>✓✓</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preset Quick Replies Grid */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[
                "I'm on the way",
                "I've arrived",
                "Can't find location",
                "Need more time",
                "Order picked up",
                "Custom message"
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(preset)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '6px 4px',
                    fontSize: '10.5px',
                    fontWeight: 700,
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

          {/* Chat Input Field */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => handleAction('Attach File')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '99px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: '12px',
                outline: 'none',
                color: '#334155'
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#ff2b70',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(255, 43, 112, 0.3)'
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM KPI CARDS ROW (4 CARDS + CURSIVE TAGLINE) ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.2fr 180px', gap: '16px', alignItems: 'center' }}>

        {/* Card 1: Today's Deliveries */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bike size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Today's Deliveries</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>12</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ +33%</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs yesterday</div>
          </div>
        </div>

        {/* Card 2: Today's Earnings */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Today's Earnings</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>৳ 1,250</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ 18%</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs yesterday</div>
          </div>
        </div>

        {/* Card 3: Avg. Rating */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Star size={20} fill="#f59e0b" color="#f59e0b" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Avg. Rating</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>4.8</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↑ +0.2</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs last week</div>
          </div>
        </div>

        {/* Card 4: Avg. Delivery Time */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Avg. Delivery Time</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a' }}>28 min</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>↓ 12%</span>
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>vs last week</div>
          </div>
        </div>

        {/* Cursive Tagline (Far Right) */}
        <div style={{
          fontFamily: "'Caveat', 'Playfair Display', cursive, sans-serif",
          fontSize: '22px',
          fontWeight: 800,
          color: '#ff2b70',
          transform: 'rotate(-4deg)',
          textAlign: 'center',
          lineHeight: 1.15
        }}>
          Deliver<br />
          Happiness<br />
          Together! ♡
        </div>

      </div>

    </div>
  );
}
