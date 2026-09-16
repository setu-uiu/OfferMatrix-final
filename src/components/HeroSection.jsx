import React from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { POPULAR_SEARCHES, CATEGORIES } from '../data/dealsData';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onCopyCode,
  copiedCode
}) {
  return (
    <div className="hero-left">
      {/* Bangladesh Platform Pill */}
      <div className="platform-badge">
        <span className="badge-dot"></span>
        BANGLADESH'S SMART DEAL PLATFORM
      </div>

      {/* Main Headline */}
      <h1 className="hero-title">
        Compare <br />
        Everything. <br />
        <span className="text-gradient">Save More.</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Food, Rides, Skin Care & more — <br />
        Best prices, best offers, all in one place.
      </p>

      {/* Quick Category Jump Icons */}
      {(() => {
        const handleQuickCatClick = (catId) => {
          setSelectedCategory(catId);
          const el = document.getElementById(`${catId}-sector`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        };

        return (
          <div className="category-quick-bar">
            <div
              className={`cat-card ${selectedCategory === 'food' ? 'active' : ''}`}
              onClick={() => handleQuickCatClick('food')}
            >
              <div className="cat-icon-wrap" style={{ background: '#fff0ec' }}>🍔</div>
              <span className="cat-name">Food</span>
            </div>

            <div
              className={`cat-card ${selectedCategory === 'rides' ? 'active' : ''}`}
              onClick={() => handleQuickCatClick('rides')}
            >
              <div className="cat-icon-wrap" style={{ background: '#e6f9f0' }}>🚗</div>
              <span className="cat-name">Rides</span>
            </div>

            <div
              className={`cat-card ${selectedCategory === 'skincare' ? 'active' : ''}`}
              onClick={() => handleQuickCatClick('skincare')}
            >
              <div className="cat-icon-wrap" style={{ background: '#f3e8ff' }}>🧴</div>
              <span className="cat-name">Skin Care</span>
            </div>

            <div
              className={`cat-card ${selectedCategory === 'coupons' ? 'active' : ''}`}
              onClick={() => handleQuickCatClick('coupons')}
            >
              <div className="cat-icon-wrap" style={{ background: '#fefce8' }}>🎟️</div>
              <span className="cat-name">Coupons</span>
            </div>
          </div>
        );
      })()}

      {/* Interactive Search Bar */}
      <div className="search-container">
        <div className="search-input-wrap">
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="search-input"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="search-divider"></div>

        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button className="btn-search" onClick={() => { }}>
          Search
        </button>
      </div>

      {/* Popular Searches */}
      <div className="popular-searches">
        <span style={{ fontWeight: 600 }}>Popular Searches:</span>
        {POPULAR_SEARCHES.map((item, idx) => (
          <span
            key={idx}
            className="popular-tag"
            onClick={() => setSearchQuery(item)}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Promo Discount Banner */}
      <div className="promo-banner-card">
        <div className="promo-left">
          <div className="promo-badge-circle">
            <div className="promo-badge-top">EXTRA</div>
            <div className="promo-badge-percent">10%</div>
            <div className="promo-badge-top">OFF</div>
            <div className="promo-badge-sub">On All Orders</div>
          </div>
          <div className="promo-details">
            <div className="promo-code-box">
              <span className="promo-code-text">Use Code:</span>
              <span className="code-pill">SAVE10</span>
            </div>
          </div>
        </div>

        <button
          className="btn-copy-code"
          onClick={() => onCopyCode('SAVE10')}
        >
          {copiedCode ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              Copy Code 📋
            </>
          )}
        </button>
      </div>

      <div className="hero-trust-row" aria-label="OfferMatrix platform highlights">
        <div className="trust-stat">
          <strong>12k+</strong>
          <span>offers tracked</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-stat">
          <strong>48</strong>
          <span>partner stores</span>
        </div>
        <div className="trust-divider"></div>
        <div className="trust-stat">
          <strong>4.9/5</strong>
          <span>shopper rating</span>
        </div>
      </div>
    </div>
  );
}
