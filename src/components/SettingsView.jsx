import React, { useState } from 'react';
import {
  User, Shield, Bell, Settings, CreditCard, Lock, Globe, Users, Link, Palette,
  HelpCircle, Info, Camera, Check, Calendar, Search, Save, Clock, ShieldAlert,
  AlertTriangle, Sun, Moon, Monitor, Trash2, Ban, ChevronDown, CheckCircle2, Crown, Sparkles, LayoutGrid
} from 'lucide-react';

export default function SettingsView({ onToast }) {
  const [activeNavTab, setActiveNavTab] = useState('Profile Settings');
  const [searchSettingsQuery, setSearchSettingsQuery] = useState('');

  // Profile Form States
  const [fullName, setFullName] = useState('Meherun Nesa');
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('meherun.nesa@offermatrix.com');
  const [username, setUsername] = useState('meherun.nesa');
  const [phone, setPhone] = useState('+880 1711 223344');
  const [department, setDepartment] = useState('Operations');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-15');
  const [timeZone, setTimeZone] = useState('(GMT+6) Dhaka, Bangladesh');

  // Quick Preferences
  const [defaultView, setDefaultView] = useState('Dashboard');
  const [dateFormat, setDateFormat] = useState('DD MMM YYYY');
  const [currency, setCurrency] = useState('BDT (৳)');
  const [itemsPerPage, setItemsPerPage] = useState('10');

  // Interface Preferences
  const [themeMode, setThemeMode] = useState('light'); // 'light', 'dark', 'system'
  const [language, setLanguage] = useState('English (US)');
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const handleAction = (msg) => {
    if (onToast) onToast(`${msg} updated successfully!`);
  };

  const handleSaveProfile = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onToast) onToast('🎉 Profile settings saved successfully!');
  };

  // Sub-Navigation Categories
  const navTabs = [
    { id: 'Profile Settings', label: 'Profile Settings', sub: 'Manage your personal information', icon: User },
    { id: 'Account & Security', label: 'Account & Security', sub: 'Password, 2FA, login activity', icon: Shield },
    { id: 'Notification Preferences', label: 'Notification Preferences', sub: 'Email, SMS, in-app notifications', icon: Bell },
    { id: 'Platform Settings', label: 'Platform Settings', sub: 'Configure platform preferences', icon: Settings },
    { id: 'Payment Settings', label: 'Payment Settings', sub: 'Payout methods and bank details', icon: CreditCard },
    { id: 'Privacy & Data', label: 'Privacy & Data', sub: 'Manage your privacy settings', icon: Lock },
    { id: 'Language & Region', label: 'Language & Region', sub: 'Language, timezone, and region', icon: Globe },
    { id: 'Team Management', label: 'Team Management', sub: 'Manage admin team members', icon: Users },
    { id: 'Integrations', label: 'Integrations', sub: 'Connected services (bKash, SMS, etc.)', icon: Link },
    { id: 'Appearance', label: 'Appearance', sub: 'Theme and display preferences', icon: Palette },
    { id: 'Help & Support', label: 'Help & Support', sub: 'FAQs, support tickets', icon: HelpCircle },
    { id: 'About', label: 'About', sub: 'App version, terms, and policies', icon: Info }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Inter', sans-serif" }}>

      {/* ================= PAGE TOP HEADER ================= */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Settings
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Manage your account, platform preferences, notifications, and security settings.
          </p>
        </div>

        {/* Top Right Search settings input */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search settings..."
            value={searchSettingsQuery}
            onChange={(e) => setSearchSettingsQuery(e.target.value)}
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
      </div>

      {/* ================= MAIN 3-COLUMN WORKSPACE GRID ================= */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 280px', gap: '20px' }}>

        {/* ---------------- COL 1: VERTICAL SUB-NAV MENU LIST ---------------- */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {navTabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeNavTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveNavTab(tab.id);
                  if (onToast) onToast(`Opened ${tab.label}`);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? '#fff0f5' : 'transparent',
                  color: isActive ? '#ff2b70' : '#475569',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: isActive ? '#ffffff' : '#f8fafc',
                  color: isActive ? '#ff2b70' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 2px 6px rgba(255, 43, 112, 0.15)' : 'none'
                }}>
                  <IconComponent size={17} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: isActive ? 800 : 700, color: isActive ? '#ff2b70' : '#0f172a', lineHeight: 1.2 }}>
                    {tab.label}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                    {tab.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ---------------- COL 2: MAIN SETTINGS FORM & PREFERENCES ---------------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* MAIN FORM CARD: Profile Settings */}
          <form onSubmit={handleSaveProfile} style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Header with Save Changes Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 3px 0' }}>
                  Profile Settings
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                  Update your personal information and profile details.
                </p>
              </div>

              <button
                type="submit"
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
                <Save size={15} />
                <span>Save Changes</span>
              </button>
            </div>

            {/* Profile Avatar & Info Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                    alt="Meherun Nesa"
                    style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff2b70' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAction('Change Photo')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#ff2b70',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Camera size={12} />
                  </button>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      Meherun Nesa
                    </h3>
                    <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                      Admin
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', fontWeight: 500 }}>
                    meherun.nesa@offermatrix.com
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#10b981', fontWeight: 800, marginTop: '4px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }}></span>
                    <span>Active</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => handleAction('Change Photo Upload')}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '7px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Camera size={14} color="#64748b" />
                  <span>Change Photo</span>
                </button>
                <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '4px' }}>
                  JPG, PNG (Max 5MB)
                </div>
              </div>
            </div>

            {/* Form Fields Grid (2 Columns) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              {/* Full Name */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Role */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Support Staff</option>
                </select>
              </div>

              {/* Email Address */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#475569',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Username */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Phone Number with BD flag */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Phone Number
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', background: '#ffffff' }}>
                  <div style={{ padding: '9px 10px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🇧🇩</span>
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>Operations</option>
                  <option>Logistics &amp; Delivery</option>
                  <option>Customer Support</option>
                  <option>Finance</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Date of Birth
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value="15 Jan 2000"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      background: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  />
                  <Calendar size={16} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Time Zone */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Time Zone
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>(GMT+6) Dhaka, Bangladesh</option>
                  <option>(GMT+0) UTC</option>
                  <option>(GMT+5:30) New Delhi</option>
                </select>
              </div>

            </div>
          </form>

          {/* BOTTOM ROW: Quick Preferences & Interface Preferences (2 CARDS) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* Bottom Card 1: Quick Preferences */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 2px 0' }}>
                  Quick Preferences
                </h3>
                <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>
                  Customize your platform experience.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Default Platform View */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <LayoutGrid size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Default Platform View</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Choose which platform to see first</div>
                    </div>
                  </div>

                  <select
                    value={defaultView}
                    onChange={(e) => { setDefaultView(e.target.value); handleAction('Default View'); }}
                    style={{ fontSize: '11.5px', padding: '5px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#ffffff', fontWeight: 700, outline: 'none' }}
                  >
                    <option>Dashboard</option>
                    <option>Delivery Partners</option>
                    <option>Orders</option>
                  </select>
                </div>

                {/* Date Format */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fff0f5', color: '#ff2b70', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Calendar size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Date Format</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Display date in your preferred format</div>
                    </div>
                  </div>

                  <select
                    value={dateFormat}
                    onChange={(e) => { setDateFormat(e.target.value); handleAction('Date Format'); }}
                    style={{ fontSize: '11.5px', padding: '5px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#ffffff', fontWeight: 700, outline: 'none' }}
                  >
                    <option>DD MMM YYYY</option>
                    <option>YYYY-MM-DD</option>
                    <option>MM/DD/YYYY</option>
                  </select>
                </div>

                {/* Currency */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#fff7ed', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CreditCard size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Currency</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Display currency format</div>
                    </div>
                  </div>

                  <select
                    value={currency}
                    onChange={(e) => { setCurrency(e.target.value); handleAction('Currency Format'); }}
                    style={{ fontSize: '11.5px', padding: '5px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#ffffff', fontWeight: 700, outline: 'none' }}
                  >
                    <option>BDT (৳)</option>
                    <option>USD ($)</option>
                  </select>
                </div>

                {/* Items Per Page */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Settings size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>Items Per Page</div>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Number of items to show in tables</div>
                    </div>
                  </div>

                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(e.target.value); handleAction('Items Per Page'); }}
                    style={{ fontSize: '11.5px', padding: '5px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#ffffff', fontWeight: 700, outline: 'none' }}
                  >
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Bottom Card 2: Interface Preferences */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: '0 0 2px 0' }}>
                  Interface Preferences
                </h3>
                <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>
                  Choose your preferred appearance and language.
                </p>
              </div>

              {/* Mode Selector Buttons (Light, Dark, System) */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '6px' }}>Mode</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>

                  {/* Light Mode */}
                  <button
                    type="button"
                    onClick={() => { setThemeMode('light'); handleAction('Light Mode'); }}
                    style={{
                      background: themeMode === 'light' ? '#fff0f5' : '#ffffff',
                      border: themeMode === 'light' ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '10px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    {themeMode === 'light' && (
                      <span style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#ff2b70', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>✓</span>
                    )}
                    <Sun size={18} color={themeMode === 'light' ? '#ff2b70' : '#64748b'} />
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: themeMode === 'light' ? '#ff2b70' : '#475569' }}>Light</span>
                  </button>

                  {/* Dark Mode */}
                  <button
                    type="button"
                    onClick={() => { setThemeMode('dark'); handleAction('Dark Mode'); }}
                    style={{
                      background: themeMode === 'dark' ? '#1e293b' : '#ffffff',
                      border: themeMode === 'dark' ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '10px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    {themeMode === 'dark' && (
                      <span style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#ff2b70', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>✓</span>
                    )}
                    <Moon size={18} color={themeMode === 'dark' ? '#ff2b70' : '#64748b'} />
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: themeMode === 'dark' ? '#ffffff' : '#475569' }}>Dark</span>
                  </button>

                  {/* System Mode */}
                  <button
                    type="button"
                    onClick={() => { setThemeMode('system'); handleAction('System Mode'); }}
                    style={{
                      background: themeMode === 'system' ? '#fff0f5' : '#ffffff',
                      border: themeMode === 'system' ? '1.5px solid #ff2b70' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '10px 6px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    {themeMode === 'system' && (
                      <span style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#ff2b70', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>✓</span>
                    )}
                    <Monitor size={18} color={themeMode === 'system' ? '#ff2b70' : '#64748b'} />
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: themeMode === 'system' ? '#ff2b70' : '#475569' }}>System</span>
                  </button>
                </div>
              </div>

              {/* Language Selector */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '4px' }}>Language</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value); handleAction('Language'); }}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 34px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      background: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0f172a',
                      outline: 'none'
                    }}
                  >
                    <option>English (US)</option>
                    <option>Bangla (বাংলা)</option>
                  </select>
                  <Globe size={15} color="#3b82f6" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              {/* Toggles: Compact Mode & Animations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                {/* Compact Mode */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Compact Mode</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Use a more compact layout</div>
                  </div>

                  <div
                    onClick={() => { setCompactMode(!compactMode); handleAction('Compact Mode'); }}
                    style={{
                      width: '36px',
                      height: '20px',
                      borderRadius: '99px',
                      background: compactMode ? '#ff2b70' : '#cbd5e1',
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
                      marginLeft: compactMode ? 'auto' : '0',
                      transition: 'all 0.2s ease'
                    }}></div>
                  </div>
                </div>

                {/* Animations */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Animations</div>
                    <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Enable smooth animations</div>
                  </div>

                  <div
                    onClick={() => { setAnimationsEnabled(!animationsEnabled); handleAction('Animations'); }}
                    style={{
                      width: '36px',
                      height: '20px',
                      borderRadius: '99px',
                      background: animationsEnabled ? '#ff2b70' : '#cbd5e1',
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
                      marginLeft: animationsEnabled ? 'auto' : '0',
                      transition: 'all 0.2s ease'
                    }}></div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ---------------- COL 3: RIGHT SIDEBAR STATUS & SECURITY WIDGETS ---------------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Card 1: Account Status */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748b' }}>Account Status</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981', lineHeight: 1.1, margin: '2px 0' }}>Active</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Your account is in good standing.</div>
            </div>
          </div>

          {/* Card 2: Plan Information */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#f3e8ff', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Crown size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>Plan Information</div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>Admin Plan</div>
                <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Full access to all features.</div>
              </div>
            </div>

            <button
              onClick={() => handleAction('View Plan Details')}
              style={{
                width: '100%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '7px',
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              View Plan Details
            </button>
          </div>

          {/* Card 3: Last Login */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>Last Login</div>
                <div style={{ fontSize: '13px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>22 Sep 2026, 3:24 PM</div>
                <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Dhaka, Bangladesh</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4px' }}>
              <span style={{ background: '#ecfdf5', color: '#10b981', padding: '3px 10px', borderRadius: '99px', fontSize: '10.5px', fontWeight: 800 }}>
                This device
              </span>
            </div>
          </div>

          {/* Card 4: Security Tips */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: '#0f172a' }}>
              <ShieldAlert size={17} color="#3b82f6" />
              <span>Security Tips</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#475569', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={13} color="#3b82f6" strokeWidth={3} />
                <span>Use a strong password</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={13} color="#3b82f6" strokeWidth={3} />
                <span>Enable two-factor authentication</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={13} color="#3b82f6" strokeWidth={3} />
                <span>Keep your email updated</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={13} color="#3b82f6" strokeWidth={3} />
                <span>Review login activity regularly</span>
              </div>
            </div>
          </div>

          {/* Card 5: Danger Zone */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #fecdd3', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: '#ef4444' }}>
              <AlertTriangle size={17} color="#ef4444" />
              <span>Danger Zone</span>
            </div>
            <p style={{ fontSize: '10.5px', color: '#64748b', margin: 0, fontWeight: 500 }}>
              These actions are irreversible.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
              {/* Deactivate Account */}
              <button
                type="button"
                onClick={() => handleAction('Deactivate Account')}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #fecdd3',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#ef4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '6px'
                }}
              >
                <Ban size={14} />
                <span>Deactivate Account</span>
              </button>

              {/* Delete Account */}
              <button
                type="button"
                onClick={() => handleAction('Delete Account')}
                style={{
                  width: '100%',
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
                }}
              >
                <Trash2 size={14} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
