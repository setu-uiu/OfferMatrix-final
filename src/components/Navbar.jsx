import React from 'react';
import { Heart, Bell, Percent, User, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';

export default function Navbar({ 
  activeCategory, 
  setActiveCategory, 
  savedCount = 0, 
  cartCount = 0,
  currentUser,
  onOpenSaved,
  onOpenCart, 
  onOpenAuth,
  onOpenDashboard,
  onLogout,
  onOpenFindDeal 
}) {
  const navItems = [
    { id: 'all', label: 'Home' },
    { id: 'food', label: 'Food' },
    { id: 'rides', label: 'Rides' },
    { id: 'skincare', label: 'Skin Care' },
    { id: 'coupons', label: 'Coupons' },
    { id: 'deals', label: 'Deals' },
    { id: 'subscription', label: '👑 Premium' }
  ];

  const handleNavClick = (id) => {
    setActiveCategory(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetId = `${id}-sector`;
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo-wrapper" onClick={() => setActiveCategory('all')}>
          <div className="logo-icon">
            <Percent size={20} strokeWidth={3} />
          </div>
          <div className="logo-text">
            Offer<span>Matrix</span>
          </div>
        </div>

        {/* Nav Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeCategory === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </li>
          ))}
          <li className="nav-item">More ▾</li>
        </ul>

        {/* Nav Right Actions */}
        <div className="nav-actions">
          <button className="btn-icon-bell" title="Notifications">
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                className="btn-signin" 
                onClick={onOpenDashboard} 
                style={{ background: '#fff0f5', color: '#ff2b70', borderColor: '#fecdd3', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={onLogout} 
                title="Log Out"
                style={{ padding: '8px', borderRadius: '50%', border: '1px solid #e5e7eb', color: '#ef4444' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn-signin" onClick={onOpenAuth}>
              Sign In / Sign Up
            </button>
          )}

          <button className="btn-find-deal" onClick={onOpenFindDeal}>
            Find Best Deal
          </button>
        </div>
      </div>
    </nav>
  );
}
