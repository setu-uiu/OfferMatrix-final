import React from 'react';
import { Heart, Flame, Car, Sparkles } from 'lucide-react';
import { HERO_FEATURED_DEALS } from '../data/dealsData';

export default function HeroDealsGrid({
  savedDeals,
  toggleSaveDeal,
  onOpenDealDetail
}) {
  const { bestFoodDeal, cheapestRide, skincareDeal } = HERO_FEATURED_DEALS;

  return (
    <div className="hero-right">
      {/* Column 1: Food Deal Card */}
      <div className="hero-right-col1">
        <div className="deal-card animate-fade-in">
          {/* Header */}
          <div className="card-header-badge">
            <div className="badge-pill-header">
              <span style={{ color: '#ff4757' }}>🔥</span> Best Food Deal
            </div>
            <button 
              className="btn-card-heart"
              onClick={() => toggleSaveDeal(bestFoodDeal)}
              title="Save deal"
            >
              <Heart 
                size={18} 
                fill={savedDeals.some(d => d.id === bestFoodDeal.id) ? "#ff4757" : "none"} 
                color="#ff4757" 
              />
            </button>
          </div>

          {/* Image & Floating Discount Circle */}
          <div className="card-img-wrapper">
            <img src={bestFoodDeal.image} alt={bestFoodDeal.title} className="card-img" />
            <div className="floating-save-badge orange">
              <span className="save-label">Save</span>
              <span className="save-amount">৳{bestFoodDeal.savings}</span>
            </div>
          </div>

          {/* Title & Prices */}
          <div className="card-title-group">
            <h3 className="card-item-title">{bestFoodDeal.title}</h3>
            <span className="card-item-sub">{bestFoodDeal.subtitle}</span>
          </div>

          <div className="price-row">
            <span className="main-price">৳{bestFoodDeal.bestPrice}</span>
            <span className="old-price">৳{bestFoodDeal.originalPrice}</span>
          </div>

          {/* Provider Comparison List */}
          <div className="provider-list">
            {bestFoodDeal.providers.map((p, idx) => (
              <div key={idx} className={`provider-row ${p.isBest ? 'best-row' : ''}`}>
                <div className="provider-left">
                  <span className="provider-dot"></span>
                  <span>{p.name}</span>
                </div>
                <div className="provider-right">
                  <span className="provider-price">৳{p.price}</span>
                  <span className="provider-time">{p.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Best Deal CTA Button */}
          <button 
            className="btn-card-action"
            onClick={() => onOpenDealDetail(bestFoodDeal)}
          >
            🔥 Best Deal
          </button>
        </div>
      </div>

      {/* Column 2: Ride Card & Skin Care Card */}
      <div className="hero-right-col2">
        {/* Top Ride Card */}
        <div className="deal-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Floating Discount Circle on Top Right */}
          <div className="floating-save-badge green">
            <span className="save-label">Save</span>
            <span className="save-amount">৳{cheapestRide.savings}</span>
          </div>

          <div className="card-header-badge">
            <div className="badge-pill-header">
              <span>🚗</span> Cheapest Ride
            </div>
            <button 
              className="btn-card-heart"
              onClick={() => toggleSaveDeal(cheapestRide)}
            >
              <Heart 
                size={18} 
                fill={savedDeals.some(d => d.id === cheapestRide.id) ? "#ff4757" : "none"} 
                color="#ff4757" 
              />
            </button>
          </div>

          <div className="card-title-group">
            <h3 className="card-item-title">{cheapestRide.route}</h3>
            <span className="card-item-sub">{cheapestRide.subtitle}</span>
          </div>

          <div className="provider-list">
            {cheapestRide.providers.map((p, idx) => (
              <div key={idx} className="provider-row">
                <div className="provider-left">
                  <span>{p.name}</span>
                </div>
                <div className="provider-right">
                  <span className="provider-price">৳{p.price}</span>
                  <span className="provider-time">{p.time}</span>
                  {p.isCheapest && <span className="tag-cheapest">Cheapest</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="green-savings-bar">
            You Save ৳{cheapestRide.savings}
          </div>

          <div className="card-img-wrapper" style={{ height: '80px', marginBottom: 0 }}>
            <img src={cheapestRide.image} alt={cheapestRide.route} className="card-img" />
          </div>
        </div>

        {/* Bottom Skincare Card */}
        <div className="deal-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Floating Save Badge */}
          <div className="floating-save-badge purple">
            <span className="save-label">Save</span>
            <span className="save-amount">৳{skincareDeal.savings}</span>
          </div>

          <div className="card-header-badge">
            <div className="badge-pill-header">
              <span>✨</span> Skin Care Deal
            </div>
            <button 
              className="btn-card-heart"
              onClick={() => toggleSaveDeal(skincareDeal)}
            >
              <Heart 
                size={18} 
                fill={savedDeals.some(d => d.id === skincareDeal.id) ? "#ff4757" : "none"} 
                color="#ff4757" 
              />
            </button>
          </div>

          <div className="card-title-group">
            <h3 className="card-item-title">{skincareDeal.title}</h3>
            <span className="card-item-sub">{skincareDeal.subtitle}</span>
          </div>

          <div className="price-row" style={{ marginBottom: '8px' }}>
            <span className="main-price">৳{skincareDeal.bestPrice}</span>
            <span className="old-price">৳{skincareDeal.originalPrice}</span>
          </div>

          <div className="provider-list">
            {skincareDeal.providers.map((p, idx) => (
              <div key={idx} className="provider-row">
                <div className="provider-left">
                  <span>{p.name}</span>
                </div>
                <div className="provider-right">
                  <span className="provider-price">৳{p.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <div style={{ width: '60px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
              <img src={skincareDeal.image} alt={skincareDeal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
