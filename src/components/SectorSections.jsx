import React, { useState } from 'react';
import {
  Utensils, Car, Sparkles, Ticket, Flame, Heart, Star, ExternalLink,
  Copy, Check, ArrowRight, Clock, ShieldCheck, Tag, Layers, MessageSquare,
  ChevronRight, Smartphone, Bell, Bookmark, Zap, Award
} from 'lucide-react';
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
  const [popularTab, setPopularTab] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
    if (onOpenDealDetail) {
      onOpenDealDetail(deal);
    } else if (onOpenAuth) {
      onOpenAuth();
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    if (onToast) onToast('Thank you for subscribing to OfferMatrix deals!');
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  // Popular Deals predefined items matching Image 3
  const POPULAR_DEALS_ITEMS = [
    {
      id: 'pop-1',
      title: 'Kacchi Bhai',
      category: 'food',
      merchant: 'foodpanda',
      merchantLogo: '🐼',
      discountBadge: '50% OFF',
      badgeColor: '#ff2b70',
      image: '/assets/biryani.jpg',
      rating: 4.7,
      reviewsCount: '12K',
      price: 250,
      originalPrice: 660,
      providers: [
        { name: 'FoodPanda', price: 250, isBest: true },
        { name: 'Pathao Food', price: 290 }
      ]
    },
    {
      id: 'pop-2',
      title: 'Uttara to Banani',
      category: 'rides',
      merchant: 'Uber',
      merchantLogo: '🚗',
      discountBadge: '৳35 OFF',
      badgeColor: '#00c853',
      image: '/assets/blue_car.jpg',
      rating: 4.8,
      reviewsCount: '890',
      price: 95,
      originalPrice: 150,
      providers: [
        { name: 'Uber', price: 95, isBest: true },
        { name: 'Pathao', price: 110 }
      ]
    },
    {
      id: 'pop-3',
      title: 'Anua Niacinamide Serum',
      category: 'skincare',
      merchant: 'Daraz',
      merchantLogo: '🧴',
      discountBadge: '30% OFF',
      badgeColor: '#ff2b70',
      image: '/assets/anua_serum.jpg',
      rating: 4.9,
      reviewsCount: '650',
      price: 1190,
      originalPrice: 1700,
      providers: [
        { name: 'Daraz', price: 1190, isBest: true },
        { name: 'Choice Legacy', price: 1250 }
      ]
    },
    {
      id: 'pop-4',
      title: 'Dhaka to Chittagong',
      category: 'delivery',
      merchant: 'Shohoz',
      merchantLogo: '🚌',
      discountBadge: '৳300 OFF',
      badgeColor: '#00c853',
      image: '/assets/bus.jpg',
      rating: 4.8,
      reviewsCount: '780',
      price: 1200,
      originalPrice: 1600,
      providers: [
        { name: 'Shohoz', price: 1200, isBest: true },
        { name: 'Green Line', price: 1350 }
      ]
    },
    {
      id: 'pop-5',
      title: "Domino's Pizza",
      category: 'food',
      merchant: 'foodpanda',
      merchantLogo: '🍕',
      discountBadge: 'Buy 1 Get 1 OFF',
      badgeColor: '#ff9800',
      image: '/assets/pizza.jpg',
      rating: 4.6,
      reviewsCount: '920',
      price: 390,
      originalPrice: 780,
      providers: [
        { name: 'FoodPanda', price: 390, isBest: true },
        { name: 'HungryNaki', price: 420 }
      ]
    },
    {
      id: 'pop-6',
      title: 'CeraVe Cleanser',
      category: 'skincare',
      merchant: 'Choice Legacy',
      merchantLogo: '✨',
      discountBadge: '25% OFF',
      badgeColor: '#ff2b70',
      image: '/assets/cleanser.jpg',
      rating: 4.9,
      reviewsCount: '540',
      price: 1350,
      originalPrice: 1800,
      providers: [
        { name: 'Choice Legacy', price: 1350, isBest: true },
        { name: 'Pickaboo', price: 1420 }
      ]
    }
  ];

  const filteredPopularDeals = popularTab === 'all'
    ? POPULAR_DEALS_ITEMS
    : POPULAR_DEALS_ITEMS.filter(d => d.category === popularTab);

  const showFood = selectedCategory === 'all' || selectedCategory === 'food';
  const showRides = selectedCategory === 'all' || selectedCategory === 'rides';
  const showSkincare = selectedCategory === 'all' || selectedCategory === 'skincare';
  const showCoupons = selectedCategory === 'all' || selectedCategory === 'coupons';
  const showDeals = selectedCategory === 'all' || selectedCategory === 'deals';

  return (
    <div className="sectors-wrapper">

      {/* ==================== 1. TRUSTED PARTNERS MARQUEE ==================== */}
      <section className="partners-marquee-section">
        <span className="partners-label">Trusted Partners</span>
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Set 1 */}
            <div className="partner-chip foodpanda"><span className="p-icon">🐼</span> foodpanda</div>
            <div className="partner-chip pathao"><span className="p-icon">🔴</span> pathao</div>
            <div className="partner-chip uber"><span className="p-icon">🚘</span> Uber</div>
            <div className="partner-chip shohoz"><span className="p-icon">🟢</span> Shohoz</div>
            <div className="partner-chip daraz"><span className="p-icon">🟠</span> daraz</div>
            <div className="partner-chip pickaboo"><span className="p-icon">🔵</span> Pickaboo</div>
            <div className="partner-chip easybuy"><span className="p-icon">🛍️</span> EasyBuy</div>
            <div className="partner-chip kagoj"><span className="p-icon">📦</span> Kagoj</div>
            <div className="partner-chip bracbank"><span className="p-icon">🏦</span> BRAC BANK</div>
            <div className="partner-chip andmore">and more....</div>

            {/* Set 2 (Duplicate for smooth infinite scrolling loop) */}
            <div className="partner-chip foodpanda"><span className="p-icon">🐼</span> foodpanda</div>
            <div className="partner-chip pathao"><span className="p-icon">🔴</span> pathao</div>
            <div className="partner-chip uber"><span className="p-icon">🚘</span> Uber</div>
            <div className="partner-chip shohoz"><span className="p-icon">🟢</span> Shohoz</div>
            <div className="partner-chip daraz"><span className="p-icon">🟠</span> daraz</div>
            <div className="partner-chip pickaboo"><span className="p-icon">🔵</span> Pickaboo</div>
            <div className="partner-chip easybuy"><span className="p-icon">🛍️</span> EasyBuy</div>
            <div className="partner-chip kagoj"><span className="p-icon">📦</span> Kagoj</div>
            <div className="partner-chip bracbank"><span className="p-icon">🏦</span> BRAC BANK</div>
            <div className="partner-chip andmore">and more....</div>
          </div>
        </div>
      </section>

      {/* ==================== 2. CATEGORY ICON NAVIGATION ROW ==================== */}
      <section className="category-icons-row">
        <div
          className={`category-icon-item ${selectedCategory === 'food' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('food')}
        >
          <div className="cat-bubble orange-bg">🍔</div>
          <span>Food</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'rides' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('rides')}
        >
          <div className="cat-bubble blue-bg">🚗</div>
          <span>Rides</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'skincare' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('skincare')}
        >
          <div className="cat-bubble purple-bg">🧴</div>
          <span>Skin Care</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'coupons' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('coupons')}
        >
          <div className="cat-bubble pink-bg">🎟️</div>
          <span>Coupons</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'delivery' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('delivery')}
        >
          <div className="cat-bubble green-bg">📦</div>
          <span>Delivery</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'bank' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('bank')}
        >
          <div className="cat-bubble yellow-bg">💳</div>
          <span>Bank Offers</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'deals' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('deals')}
        >
          <div className="cat-bubble red-bg">🔥</div>
          <span>Top Deals</span>
        </div>

        <div
          className={`category-icon-item ${selectedCategory === 'subscription' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('subscription')}
        >
          <div className="cat-bubble gold-bg">👑</div>
          <span>Premium</span>
        </div>
      </section>

      {/* ==================== 3. THREE FEATURED PROMOTIONAL BANNERS ==================== */}
      <section className="featured-banners-grid">
        {/* Banner 1: Food */}
        <div className="feature-banner-card banner-pink">
          <div className="banner-content">
            <span className="banner-top-tag">🐼 foodpanda</span>
            <h2 className="banner-heading">
              UP TO <br />
              <strong>60% OFF</strong> <br />
              on Food Orders
            </h2>
            <p className="banner-sub">From your favorite restaurants</p>
            <button
              className="btn-banner-action"
              onClick={() => scrollToAllDeals('food')}
            >
              <span>Explore Food Deals</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="banner-img-wrap">
            <img src="/assets/burger.jpg" alt="Food discount banner" className="banner-img" />
          </div>
        </div>

        {/* Banner 2: Rides */}
        <div className="feature-banner-card banner-green">
          <div className="banner-content">
            <h2 className="banner-heading">
              Save More <br />
              on Every Ride
            </h2>
            <p className="banner-sub">Compare Uber, Pathao &amp; Shohoz</p>
            <button
              className="btn-banner-action"
              onClick={() => scrollToAllDeals('rides')}
            >
              <span>View Ride Offers</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="banner-img-wrap">
            <img src="/assets/blue_car.jpg" alt="Ride fare comparison banner" className="banner-img" />
          </div>
        </div>

        {/* Banner 3: Skincare */}
        <div className="feature-banner-card banner-coral">
          <div className="banner-content">
            <h2 className="banner-heading">
              Glow for Less <br />
              up to <strong>70% OFF</strong> <br />
              on Skincare Products
            </h2>
            <p className="banner-sub">Your favorite brands, best prices</p>
            <button
              className="btn-banner-action"
              onClick={() => scrollToAllDeals('skincare')}
            >
              <span>Shop Skincare Deals</span>
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="banner-img-wrap">
            <img src="/assets/skincare.jpg" alt="Skincare discount banner" className="banner-img" />
          </div>
        </div>
      </section>

      {/* ==================== 4. POPULAR DEALS SECTION ==================== */}
      <section className="popular-deals-section">
        <div className="popular-deals-header">
          <div className="popular-title-flex">
            <h2>🔥 Popular Deals</h2>
          </div>

          <div className="popular-tabs flex-wrap">
            <button
              className={`pop-tab ${popularTab === 'all' ? 'active' : ''}`}
              onClick={() => setPopularTab('all')}
            >
              All
            </button>
            <button
              className={`pop-tab ${popularTab === 'food' ? 'active' : ''}`}
              onClick={() => setPopularTab('food')}
            >
              Food
            </button>
            <button
              className={`pop-tab ${popularTab === 'rides' ? 'active' : ''}`}
              onClick={() => setPopularTab('rides')}
            >
              Rides
            </button>
            <button
              className={`pop-tab ${popularTab === 'skincare' ? 'active' : ''}`}
              onClick={() => setPopularTab('skincare')}
            >
              Skin Care
            </button>
            <button
              className={`pop-tab ${popularTab === 'delivery' ? 'active' : ''}`}
              onClick={() => setPopularTab('delivery')}
            >
              Delivery
            </button>
            <button
              className={`pop-tab ${popularTab === 'bank' ? 'active' : ''}`}
              onClick={() => setPopularTab('bank')}
            >
              Bank Offers
            </button>
          </div>
        </div>

        <div className="popular-grid">
          {filteredPopularDeals.map((deal) => {
            const isSaved = savedDeals.some(d => d.id === deal.id);
            return (
              <div
                key={deal.id}
                className="pop-deal-card animate-fade-in"
                onClick={() => handleOfferClick(deal)}
              >
                <div className="pop-card-img-wrap">
                  <img src={deal.image} alt={deal.title} className="pop-card-img" />
                  <button
                    className="btn-card-heart floating-heart"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (toggleSaveDeal) toggleSaveDeal(deal);
                    }}
                  >
                    <Heart
                      size={18}
                      fill={isSaved ? "#ff4757" : "none"}
                      color="#ff4757"
                    />
                  </button>
                  <div
                    className="pop-discount-badge"
                    style={{ backgroundColor: deal.badgeColor }}
                  >
                    {deal.discountBadge}
                  </div>
                </div>

                <div className="pop-card-body">
                  <h3 className="pop-deal-title">{deal.title}</h3>

                  <div className="pop-merchant-row">
                    <span className="pop-merchant-icon">{deal.merchantLogo}</span>
                    <span className="pop-merchant-name">{deal.merchant}</span>
                  </div>

                  <div className="pop-rating-row">
                    <Star size={14} fill="#eab308" color="#eab308" />
                    <span className="score">{deal.rating}</span>
                    <span className="count">({deal.reviewsCount})</span>
                  </div>

                  <div className="pop-price-row">
                    <span className="current-price">৳{deal.price}</span>
                    {deal.originalPrice > deal.price && (
                      <span className="old-price">৳{deal.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== 5. WHY CHOOSE OFFERMATRIX? ==================== */}
      <section className="why-choose-section">
        <div className="why-header">
          <h2>Why Choose OfferMatrix?</h2>
          <div className="handwritten-note">
            Smart Choices<br />
            Happier You 💕 <span className="arrow-curved">↙</span>
          </div>
        </div>

        <div className="why-features-grid">
          <div className="why-feature-card">
            <div className="why-icon-bubble green">
              <Tag size={22} />
            </div>
            <h3>Best Prices</h3>
            <p>Compare &amp; save your money</p>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-bubble green">
              <ShieldCheck size={22} />
            </div>
            <h3>Verified Offers</h3>
            <p>Only trusted partners</p>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-bubble green">
              <Layers size={22} />
            </div>
            <h3>All in One Place</h3>
            <p>Food, rides, skincare and more</p>
          </div>

          <div className="why-feature-card">
            <div className="why-icon-bubble yellow">
              <Star size={22} />
            </div>
            <h3>Real User Reviews</h3>
            <p>Make better decisions</p>
          </div>
        </div>

        {/* App Download Banner */}
        <div className="app-download-banner">
          <div className="app-banner-left">
            <div className="phone-mockups-container">
              {/* 3 Phone Screens Representation */}
              <div className="phone-screen screen-left">
                <div className="phone-header">OfferMatrix</div>
                <div className="phone-badge pink">Food 50% OFF</div>
                <div className="phone-img-mini"><img src="/assets/biryani.jpg" alt="app screen" /></div>
              </div>

              <div className="phone-screen screen-center">
                <div className="phone-header center">OfferMatrix App</div>
                <div className="phone-banner-mini">Compare Rides &amp; Save</div>
                <div className="phone-img-mini"><img src="/assets/blue_car.jpg" alt="app screen center" /></div>
                <div className="phone-btn-mini">Get Deal ⚡</div>
              </div>

              <div className="phone-screen screen-right">
                <div className="phone-header">Skin Care</div>
                <div className="phone-badge purple">70% OFF</div>
                <div className="phone-img-mini"><img src="/assets/skincare.jpg" alt="app screen right" /></div>
              </div>
            </div>
          </div>

          <div className="app-banner-middle">
            <h2 className="app-banner-title">
              Take the Best Deals <br />
              With You Everywhere
            </h2>
            <p className="app-banner-sub">
              Download the OfferMatrix app and never miss an offer again.
            </p>

            <div className="app-store-buttons">
              <a href="#download-play" className="btn-store google-play" onClick={(e) => { e.preventDefault(); if (onToast) onToast('Android App coming soon to Play Store!'); }}>
                <span className="store-icon">▶</span>
                <div className="store-text">
                  <span className="small">GET IT ON</span>
                  <span className="big">Google Play</span>
                </div>
              </a>

              <a href="#download-appstore" className="btn-store app-store" onClick={(e) => { e.preventDefault(); if (onToast) onToast('iOS App coming soon to App Store!'); }}>
                <span className="store-icon"></span>
                <div className="store-text">
                  <span className="small">Download on the</span>
                  <span className="big">App Store</span>
                </div>
              </a>
            </div>
          </div>

          <div className="app-banner-right">
            <ul className="app-feature-list">
              <li>
                <span className="feat-icon pink">🎟️</span>
                <span>Exclusive App Offers</span>
              </li>
              <li>
                <span className="feat-icon orange">🔔</span>
                <span>Price Alerts</span>
              </li>
              <li>
                <span className="feat-icon green">🛡️</span>
                <span>Save Favorite Deals</span>
              </li>
              <li>
                <span className="feat-icon cyan">⚡</span>
                <span>Faster &amp; Easier</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ==================== 6. WHAT OUR USERS SAY ==================== */}
      <section className="testimonials-section">
        <div className="section-header-flex">
          <h2>What Our Users Say</h2>
          <a href="#all-reviews" className="link-see-all" onClick={(e) => { e.preventDefault(); if (onToast) onToast('Showing 1,420+ verified community reviews'); }}>
            See All <ArrowRight size={16} />
          </a>
        </div>

        <div className="testimonials-grid">
          {/* Review 1 */}
          <div className="testimonial-card">
            <div className="user-profile-header">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                alt="Sadia Rahman"
                className="user-avatar"
              />
              <div className="user-info">
                <h4 className="user-name">Sadia Rahman</h4>
                <span className="verified-badge">✓ Verified User</span>
              </div>
            </div>
            <p className="review-quote">
              "OfferMatrix helped me save so much on food and rides. Such a useful platform!"
            </p>
            <div className="stars-row">
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
            </div>
          </div>

          {/* Review 2 */}
          <div className="testimonial-card">
            <div className="user-profile-header">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Nafiul Islam"
                className="user-avatar"
              />
              <div className="user-info">
                <h4 className="user-name">Nafiul Islam</h4>
                <span className="verified-badge">✓ Verified User</span>
              </div>
            </div>
            <p className="review-quote">
              "I always check OfferMatrix before shopping. Best deals in one place!"
            </p>
            <div className="stars-row">
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
            </div>
          </div>

          {/* Review 3 */}
          <div className="testimonial-card">
            <div className="user-profile-header">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Tasnim Chowdhury"
                className="user-avatar"
              />
              <div className="user-info">
                <h4 className="user-name">Tasnim Chowdhury</h4>
                <span className="verified-badge">✓ Verified User</span>
              </div>
            </div>
            <p className="review-quote">
              "The skincare deals are amazing! Love the comparison feature."
            </p>
            <div className="stars-row">
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
              <Star size={16} fill="#eab308" color="#eab308" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. LATEST DEALS & INSIGHTS (BLOG) ==================== */}
      <section className="insights-blog-section">
        <div className="section-header-flex">
          <h2>Latest Deals &amp; Insights</h2>
          <a href="#blog-all" className="link-see-all" onClick={(e) => { e.preventDefault(); if (onToast) onToast('Opening OfferMatrix Deal Blog'); }}>
            See All <ArrowRight size={16} />
          </a>
        </div>

        <div className="insights-grid">
          {/* Article 1 */}
          <div className="blog-card">
            <div className="blog-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                onError={(e) => { e.target.src = "/assets/biryani.jpg"; }}
                alt="Top restaurants Dhaka"
                className="blog-img"
              />
              <span className="blog-tag pink">Food</span>
            </div>
            <div className="blog-body">
              <h3 className="blog-title">Top 10 Restaurants with Biggest Discounts in Dhaka</h3>
              <span className="blog-date">12 Sep 2026</span>
            </div>
          </div>

          {/* Article 2 */}
          <div className="blog-card">
            <div className="blog-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80"
                onError={(e) => { e.target.src = "/assets/blue_car.jpg"; }}
                alt="Cheapest ride Dhaka"
                className="blog-img"
              />
              <span className="blog-tag green">Rides</span>
            </div>
            <div className="blog-body">
              <h3 className="blog-title">How to Get the Cheapest Ride in Dhaka</h3>
              <span className="blog-date">10 Sep 2026</span>
            </div>
          </div>

          {/* Article 3 */}
          <div className="blog-card">
            <div className="blog-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
                onError={(e) => { e.target.src = "/assets/skincare.jpg"; }}
                alt="Best skincare deals"
                className="blog-img"
              />
              <span className="blog-tag purple">Skin Care</span>
            </div>
            <div className="blog-body">
              <h3 className="blog-title">Best Skincare Deals This Month</h3>
              <span className="blog-date">08 Sep 2026</span>
            </div>
          </div>

          {/* Article 4 */}
          <div className="blog-card">
            <div className="blog-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?auto=format&fit=crop&w=600&q=80"; }}
                alt="Use coupons like a pro"
                className="blog-img"
              />
              <span className="blog-tag orange">Tips</span>
            </div>
            <div className="blog-body">
              <h3 className="blog-title">How to Use Coupons Like a Pro</h3>
              <span className="blog-date">05 Sep 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 8. DON'T MISS ANY DEAL (NEWSLETTER) ==================== */}
      <section className="newsletter-section">
        <div className="newsletter-card">
          <div className="newsletter-left">
            <h2>Don't Miss Any Deal!</h2>
            <p>Get the latest offers, coupons and updates in your inbox.</p>
          </div>

          <form className="newsletter-right" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-newsletter"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-subscribe">
              {subscribed ? 'Subscribed! 🎉' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
