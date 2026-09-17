import React from 'react';
import { Heart, Check } from 'lucide-react';
import { HERO_FEATURED_DEALS } from '../data/dealsData';

export default function HeroDealsGrid({
  savedDeals = [],
  toggleSaveDeal,
  onOpenDealDetail,
  onCopyCode,
  copiedCode
}) {
  const { bestFoodDeal, cheapestRide, skincareDeal } = HERO_FEATURED_DEALS;

  const fallbackBiryani = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80";
  const fallbackCar = "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80";
  const fallbackSkincare = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="hero-right">
      <div className="hero-right-cols-inner">
        {/* Column 1: Best Food Deal Card + Dashed Coupon Box */}
        <div className="hero-right-col1">

          {/* Card 1: Best Food Deal */}
          <div className="deal-card animate-fade-in">
            {/* Card Header */}
            <div className="card-header-badge">
              <div className="badge-pill-header">
                <span style={{ color: '#ff4757' }}>🔥</span> Best Food Deal
              </div>
              <button
                className="btn-card-heart"
                onClick={() => toggleSaveDeal && toggleSaveDeal(bestFoodDeal)}
                title="Save deal"
              >
                <Heart
                  size={18}
                  fill={savedDeals.some(d => d.id === bestFoodDeal.id) ? "#ff4757" : "none"}
                  color="#ff4757"
                />
              </button>
            </div>

            {/* Full-width Food Photo Container with Overlapping Orange Save Badge */}
            <div className="food-top-photo-wrapper">
              <img
                src={bestFoodDeal.image || fallbackBiryani}
                onError={(e) => { e.target.src = fallbackBiryani; }}
                alt={bestFoodDeal.title}
                className="food-top-photo"
              />
              <div className="circular-save-badge orange-circle food-image-overlap-badge">
                <span className="save-label">Save</span>
                <span className="save-amount">৳{bestFoodDeal.savings}</span>
              </div>
            </div>

            {/* Title & Prices */}
            <div className="card-title-group" style={{ marginTop: '12px' }}>
              <h3 className="card-item-title">{bestFoodDeal.title}</h3>
              <span className="card-item-sub">{bestFoodDeal.subtitle}</span>
            </div>

            <div className="price-row">
              <span className="main-price">৳{bestFoodDeal.bestPrice}</span>
              <span className="old-price">৳{bestFoodDeal.originalPrice}</span>
            </div>

            {/* Provider Comparison Mini Rows */}
            <div className="provider-list mini-food-providers">
              {bestFoodDeal.providers.map((p, idx) => (
                <div key={idx} className={`provider-row ${p.isBest ? 'best-row' : ''}`}>
                  <div className="provider-left">
                    <span className="provider-dot" style={{ backgroundColor: p.color || '#ff2b70' }}></span>
                    <span>{p.name}</span>
                  </div>
                  <div className="provider-right">
                    <span className="provider-price">৳{p.price}</span>
                    <span className="provider-time">{p.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Full-width Pink Best Deal Button */}
            <button
              className="btn-card-action pink-cta-btn"
              onClick={() => onOpenDealDetail && onOpenDealDetail(bestFoodDeal)}
            >
              🔥 Best Deal
            </button>
          </div>

          {/* Dashed Promo Coupon Box directly under Card 1 */}
          <div className="dashed-promo-box">
            <div className="dashed-promo-left">
              <div className="promo-pink-badge">
                <span className="promo-extra-text">EXTRA</span>
                <span className="promo-percent-text">10% OFF</span>
                <span className="promo-sub-text">On All Orders</span>
              </div>
              <div className="promo-code-wrap">
                <span className="use-code-label">Use Code:</span>
                <span className="code-tag-pink">SAVE10</span>
              </div>
            </div>

            <button
              className="btn-copy-pink"
              onClick={() => onCopyCode && onCopyCode('SAVE10')}
            >
              {copiedCode === 'SAVE10' ? (
                <>
                  <Check size={14} /> Copied!
                </>
              ) : (
                'Copy Code 📋'
              )}
            </button>
          </div>
        </div>

        {/* Column 2: Ride Card & Skin Care Card */}
        <div className="hero-right-col2">

          {/* Card 2: Best Ride Deal */}
          <div className="deal-card animate-fade-in">
            {/* Circular Green Save Badge Top Right */}
            <div className="circular-save-badge green-circle top-right-badge">
              <span className="save-label">Save</span>
              <span className="save-amount">৳{cheapestRide.savings}</span>
            </div>

            <div className="card-header-badge">
              <div className="badge-pill-header green-pill">
                <span>🚗</span> Cheapest Ride
              </div>
            </div>

            <div className="card-title-group">
              <h3 className="card-item-title">{cheapestRide.route}</h3>
              <span className="card-item-sub">{cheapestRide.subtitle}</span>
            </div>

            <div className="provider-list">
              {cheapestRide.providers.map((p, idx) => (
                <div key={idx} className={`provider-row ${p.isCheapest ? 'cheapest-row-highlight' : ''}`}>
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

            <div className="car-img-box">
              <img
                src={cheapestRide.image || fallbackCar}
                onError={(e) => { e.target.src = fallbackCar; }}
                alt={cheapestRide.route}
                className="card-img"
              />
            </div>
          </div>

          {/* Card 3: Skin Care Special */}
          <div className="deal-card animate-fade-in">
            <div className="card-header-badge">
              <div className="badge-pill-header purple-pill">
                <span>✨</span> Skin Care Deal
              </div>
              <button
                className="btn-card-heart"
                onClick={() => toggleSaveDeal && toggleSaveDeal(skincareDeal)}
                title="Save deal"
              >
                <Heart
                  size={18}
                  fill={savedDeals.some(d => d.id === skincareDeal.id) ? "#ff4757" : "none"}
                  color="#ff4757"
                />
              </button>
            </div>

            <div className="skincare-card-split">
              {/* Left Content */}
              <div className="skincare-left-content">
                <div className="card-title-group">
                  <h3 className="card-item-title">{skincareDeal.title}</h3>
                  <span className="card-item-sub">{skincareDeal.subtitle}</span>
                </div>

                <div className="price-row">
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
              </div>

              {/* Right Photo Wrapper with Floating Purple Circle Badge */}
              <div className="skincare-right-photo-wrap">
                <div className="skincare-photo-box">
                  <img
                    src={skincareDeal.image || fallbackSkincare}
                    onError={(e) => { e.target.src = fallbackSkincare; }}
                    alt={skincareDeal.title}
                    className="skincare-photo"
                  />
                  <div className="circular-save-badge purple-circle skincare-overlap-badge">
                    <span className="save-label">Save</span>
                    <span className="save-amount">৳{skincareDeal.savings}</span>
                  </div>
                </div>
                <div className="cream-mini-tag">CREAM</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
