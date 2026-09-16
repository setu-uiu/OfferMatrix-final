import React from 'react';
import { Utensils, Car, Sparkles, Ticket, Flame, Heart, Star, ExternalLink, Copy, Check, ArrowRight, Clock } from 'lucide-react';
import { ALL_DEALS, FLASH_DEALS, COUPONS_LIST } from '../data/dealsData';

export default function SectorSections({
  selectedCategory = 'all',
  savedDeals = [],
  toggleSaveDeal,
  onOpenDealDetail,
  onCopyCode,
  copiedCode,
  setSelectedCategory,
  onToast,
  onOpenAuth
}) {
  // Filter deals for each specific category
  const foodDeals = ALL_DEALS.filter(d => d.category === 'food');
  const rideDeals = ALL_DEALS.filter(d => d.category === 'rides');
  const skincareDeals = ALL_DEALS.filter(d => d.category === 'skincare');

  const scrollToAllDeals = (cat) => {
    setSelectedCategory(cat);
    const el = document.getElementById('all-deals-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOfferClick = (deal) => {
    if (onOpenAuth) {
      onOpenAuth();
    } else if (onOpenDealDetail) {
      onOpenDealDetail(deal);
    }
  };

  const showFood = selectedCategory === 'all' || selectedCategory === 'food';
  const showRides = selectedCategory === 'all' || selectedCategory === 'rides';
  const showSkincare = selectedCategory === 'all' || selectedCategory === 'skincare';
  const showCoupons = selectedCategory === 'all' || selectedCategory === 'coupons';
  const showDeals = selectedCategory === 'all' || selectedCategory === 'deals';

  return (
    <div className="sectors-wrapper">

      {/* ==================== 1. FOOD SECTOR ==================== */}
      {showFood && (
        <section id="food-sector" className="sector-container sector-food">
          <div className="sector-header-flex">
            <div>
              <div className="sector-badge orange">
                <Utensils size={16} />
                <span>FOOD & RESTAURANTS</span>
              </div>
              <h2 className="sector-title">
                Compare <span>Food & Delivery Prices</span>
              </h2>
              <p className="sector-subtitle">
                Live price comparisons across FoodPanda, HungryNaki & Pathao Food in Dhaka & Chittagong.
              </p>
            </div>
            <button className="btn-sector-more" onClick={() => scrollToAllDeals('food')}>
              <span>View All Food Offers</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="sector-cards-grid">
            {foodDeals.map((deal) => {
              const isSaved = savedDeals.some(d => d.id === deal.id);
              return (
                <div
                  key={deal.id}
                  className="deal-card sector-card animate-fade-in"
                  onClick={() => handleOfferClick(deal)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-header-badge">
                    <span className="tag-pill food-tag">{deal.tag}</span>
                    {toggleSaveDeal && (
                      <button
                        className="btn-card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDeal(deal);
                        }}
                      >
                        <Heart size={18} fill={isSaved ? "#ff4757" : "none"} color="#ff4757" />
                      </button>
                    )}
                  </div>

                  <div className="card-img-wrapper">
                    <img src={deal.image} alt={deal.title} className="card-img" />
                    {deal.savings > 0 && (
                      <div className="floating-save-badge orange">
                        <span className="save-label">Save</span>
                        <span className="save-amount">৳{deal.savings}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-title-group">
                    <h3 className="card-item-title">{deal.title}</h3>
                    <div className="rating-row">
                      <Star size={14} fill="#eab308" color="#eab308" />
                      <span className="rating-score">{deal.rating}</span>
                      <span className="rating-count">({deal.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className="price-row">
                    <span className="main-price">৳{deal.bestPrice}</span>
                    {deal.originalPrice > deal.bestPrice && (
                      <span className="old-price">৳{deal.originalPrice}</span>
                    )}
                  </div>

                  <div className="provider-list">
                    {deal.providers.slice(0, 3).map((p, idx) => (
                      <div key={idx} className={`provider-row ${p.isBest ? 'best-row' : ''}`}>
                        <span>{p.name} {p.time && `(${p.time})`}</span>
                        <span className="provider-price">৳{p.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-card-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOfferClick(deal);
                    }}
                  >
                    <span>Compare & Order Food</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}


      {/* ==================== 2. RIDES & TRANSPORT SECTOR ==================== */}
      {showRides && (
        <section id="rides-sector" className="sector-container sector-rides">
          <div className="sector-header-flex">
            <div>
              <div className="sector-badge green">
                <Car size={16} />
                <span>RIDES & COMMUTE</span>
              </div>
              <h2 className="sector-title">
                Cheapest <span>Rides & Bike Fares</span>
              </h2>
              <p className="sector-subtitle">
                Instant fare matching between Pathao, Uber, Shohoz & Intercity Bus tickets.
              </p>
            </div>
            <button className="btn-sector-more" onClick={() => scrollToAllDeals('rides')}>
              <span>View All Rides & Routes</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="sector-cards-grid">
            {rideDeals.map((deal) => {
              const isSaved = savedDeals.some(d => d.id === deal.id);
              return (
                <div
                  key={deal.id}
                  className="deal-card sector-card animate-fade-in"
                  onClick={() => handleOfferClick(deal)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-header-badge">
                    <span className="tag-pill ride-tag">{deal.tag}</span>
                    {toggleSaveDeal && (
                      <button
                        className="btn-card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDeal(deal);
                        }}
                      >
                        <Heart size={18} fill={isSaved ? "#ff4757" : "none"} color="#ff4757" />
                      </button>
                    )}
                  </div>

                  <div className="card-img-wrapper">
                    <img src={deal.image} alt={deal.title} className="card-img" />
                    {deal.savings > 0 && (
                      <div className="floating-save-badge green">
                        <span className="save-label">Save</span>
                        <span className="save-amount">৳{deal.savings}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-title-group">
                    <h3 className="card-item-title">{deal.title}</h3>
                    <div className="rating-row">
                      <Star size={14} fill="#eab308" color="#eab308" />
                      <span className="rating-score">{deal.rating}</span>
                      <span className="rating-count">({deal.reviewsCount} rides booked)</span>
                    </div>
                  </div>

                  <div className="price-row">
                    <span className="main-price">৳{deal.bestPrice}</span>
                    {deal.originalPrice > deal.bestPrice && (
                      <span className="old-price">৳{deal.originalPrice}</span>
                    )}
                  </div>

                  <div className="provider-list">
                    {deal.providers.slice(0, 3).map((p, idx) => (
                      <div key={idx} className={`provider-row ${p.isBest ? 'best-row' : ''}`}>
                        <span>{p.name} {p.time && `(${p.time})`}</span>
                        <span className="provider-price">৳{p.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-card-action btn-ride-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOfferClick(deal);
                    }}
                  >
                    <span>Compare Ride Fares</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}


      {/* ==================== 3. SKIN CARE & BEAUTY SECTOR ==================== */}
      {showSkincare && (
        <section id="skincare-sector" className="sector-container sector-skincare">
          <div className="sector-header-flex">
            <div>
              <div className="sector-badge purple">
                <Sparkles size={16} />
                <span>SKIN CARE & BEAUTY</span>
              </div>
              <h2 className="sector-title">
                Authentic <span>Skincare & Glow Products</span>
              </h2>
              <p className="sector-subtitle">
                Verify authentic skincare formulas & best prices across Choice Legacy, Kirei & Daraz Mall.
              </p>
            </div>
            <button className="btn-sector-more" onClick={() => scrollToAllDeals('skincare')}>
              <span>Explore Skincare Products</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="sector-cards-grid">
            {skincareDeals.map((deal) => {
              const isSaved = savedDeals.some(d => d.id === deal.id);
              return (
                <div
                  key={deal.id}
                  className="deal-card sector-card animate-fade-in"
                  onClick={() => handleOfferClick(deal)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-header-badge">
                    <span className="tag-pill skin-tag">{deal.tag}</span>
                    {toggleSaveDeal && (
                      <button
                        className="btn-card-heart"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDeal(deal);
                        }}
                      >
                        <Heart size={18} fill={isSaved ? "#ff4757" : "none"} color="#ff4757" />
                      </button>
                    )}
                  </div>

                  <div className="card-img-wrapper">
                    <img src={deal.image} alt={deal.title} className="card-img" />
                    {deal.savings > 0 && (
                      <div className="floating-save-badge purple">
                        <span className="save-label">Save</span>
                        <span className="save-amount">৳{deal.savings}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-title-group">
                    <h3 className="card-item-title">{deal.title}</h3>
                    <div className="rating-row">
                      <Star size={14} fill="#eab308" color="#eab308" />
                      <span className="rating-score">{deal.rating}</span>
                      <span className="rating-count">({deal.reviewsCount} buyers)</span>
                    </div>
                  </div>

                  <div className="price-row">
                    <span className="main-price">৳{deal.bestPrice}</span>
                    {deal.originalPrice > deal.bestPrice && (
                      <span className="old-price">৳{deal.originalPrice}</span>
                    )}
                  </div>

                  <div className="provider-list">
                    {deal.providers.slice(0, 3).map((p, idx) => (
                      <div key={idx} className={`provider-row ${p.isBest ? 'best-row' : ''}`}>
                        <span>{p.name}</span>
                        <span className="provider-price">৳{p.price}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="btn-card-action btn-skin-action"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOfferClick(deal);
                    }}
                  >
                    <span>Check Skincare Deals</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}


      {/* ==================== 4. COUPONS & VOUCHER SECTOR ==================== */}
      {showCoupons && (
        <section id="coupons-sector" className="sector-container sector-coupons">
          <div className="sector-header-flex">
            <div>
              <div className="sector-badge yellow">
                <Ticket size={16} />
                <span>PROMO CODES & COUPONS</span>
              </div>
              <h2 className="sector-title">
                Instant <span>Vouchers & Discount Codes</span>
              </h2>
              <p className="sector-subtitle">
                Copy verified active promo codes for FoodPanda, Pathao, Daraz & Uber in 1 click.
              </p>
            </div>
            <button className="btn-sector-more" onClick={() => scrollToAllDeals('coupons')}>
              <span>See All Coupons</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="coupons-grid">
            {COUPONS_LIST.map((coupon) => (
              <div
                key={coupon.id}
                className="coupon-card"
                style={{ background: coupon.bg, borderColor: coupon.borderColor }}
              >
                <div className="coupon-card-top">
                  <span className="coupon-platform-badge">{coupon.platform}</span>
                  <span className="coupon-expiry-pill">{coupon.expiry}</span>
                </div>

                <h3 className="coupon-card-title">{coupon.title}</h3>
                <p className="coupon-min-order">Min Order: {coupon.minOrder}</p>

                <div className="coupon-code-flex">
                  <div className="coupon-code-box">
                    <span className="code-text">{coupon.code}</span>
                  </div>
                  <button
                    className="btn-copy-coupon"
                    onClick={() => onCopyCode(coupon.code)}
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}


      {/* ==================== 5. FLASH DEALS SECTOR ==================== */}
      {showDeals && (
        <section id="deals-sector" className="sector-container sector-flash-deals">
          <div className="sector-header-flex">
            <div>
              <div className="sector-badge red">
                <Flame size={16} />
                <span>LIMITED TIME FLASH DEALS</span>
              </div>
              <h2 className="sector-title">
                Hurry! <span>Limited Stock Flash Deals</span>
              </h2>
              <p className="sector-subtitle">
                Huge discounts up to 50% off with live countdown timers & claim progress.
              </p>
            </div>
            <button className="btn-sector-more" onClick={() => scrollToAllDeals('deals')}>
              <span>Explore All Flash Deals</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flash-deals-grid">
            {FLASH_DEALS.map((deal) => (
              <div key={deal.id} className="flash-card">
                <div className="flash-card-banner">
                  <span className="flash-discount-badge">{deal.discountPercent} OFF</span>
                  <div className="flash-timer-pill">
                    <Clock size={14} />
                    <span>{deal.timeLeft}</span>
                  </div>
                </div>

                <div className="flash-img-wrapper">
                  <img src={deal.image} alt={deal.title} className="flash-img" />
                </div>

                <div className="flash-content">
                  <span className="flash-store">{deal.store}</span>
                  <h3 className="flash-title">{deal.title}</h3>

                  <div className="flash-price-row">
                    <span className="flash-best-price">৳{deal.bestPrice}</span>
                    <span className="flash-old-price">৳{deal.originalPrice}</span>
                    <span className="flash-save-text">Save ৳{deal.savings}</span>
                  </div>

                  {/* Claim Progress Bar */}
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${deal.claimProgress}%` }}></div>
                  </div>
                  <div className="progress-text-row">
                    <span>{deal.claimProgress}% Claimed</span>
                    <span>Almost Sold Out!</span>
                  </div>

                  <button
                    className="btn-flash-claim"
                    onClick={() => handleOfferClick(deal)}
                  >
                    <Flame size={16} />
                    <span>Claim Flash Deal Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
