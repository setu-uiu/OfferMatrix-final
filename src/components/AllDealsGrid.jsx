import React, { useState } from 'react';
import { Heart, Star, ExternalLink, Filter } from 'lucide-react';
import { ALL_DEALS, CATEGORIES } from '../data/dealsData';

export default function AllDealsGrid({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  savedDeals,
  toggleSaveDeal,
  onOpenDealDetail,
  deals = []
}) {
  const [sortBy, setSortBy] = useState('discount');
  const sourceDeals = (deals && deals.length > 0) ? deals : ALL_DEALS;

  // Filter deals
  const filteredDeals = sourceDeals.filter((deal) => {
    const matchesCategory = selectedCategory === 'all' || deal.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.tag && deal.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort deals
  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortBy === 'discount') return b.savings - a.savings;
    if (sortBy === 'price') return a.bestPrice - b.bestPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="deals-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            Explore <span>All Offers</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Showing {sortedDeals.length} active price comparison deals in Bangladesh
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#4b5563' }}>
            <Filter size={16} />
            Sort By:
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              border: '1px solid #d1d5db',
              background: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="discount">Highest Discount</option>
            <option value="price">Lowest Price</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {sortedDeals.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}>No deals found matching "{searchQuery}"</h3>
          <p style={{ color: '#6b7280', marginTop: '6px' }}>Try searching for Biryani, Rides, Skincare, or change your category filter.</p>
          <button
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              background: '#ff2b70',
              color: 'white',
              borderRadius: '9999px',
              fontWeight: 700
            }}
            onClick={() => { setSelectedCategory('all'); }}
          >
            Show All Deals
          </button>
        </div>
      ) : (
        <div className="all-deals-grid">
          {sortedDeals.map((deal) => {
            const isSaved = savedDeals.some(d => d.id === deal.id);
            return (
              <div key={deal.id} className="deal-card animate-fade-in">
                {/* Header */}
                <div className="card-header-badge">
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: '#fff0f5',
                    color: '#ff2b70'
                  }}>
                    {deal.tag}
                  </span>
                  <button
                    className="btn-card-heart"
                    onClick={() => toggleSaveDeal(deal)}
                  >
                    <Heart
                      size={18}
                      fill={isSaved ? "#ff4757" : "none"}
                      color="#ff4757"
                    />
                  </button>
                </div>

                {/* Image & Discount Badge */}
                <div className="card-img-wrapper" style={{ height: '160px' }}>
                  <img src={deal.image} alt={deal.title} className="card-img" />
                  {deal.savings > 0 && (
                    <div className="floating-save-badge orange" style={{ bottom: '10px', right: '10px', left: 'auto', width: '52px', height: '52px' }}>
                      <span className="save-label">Save</span>
                      <span className="save-amount">৳{deal.savings}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="card-title-group">
                  <h3 className="card-item-title" style={{ fontSize: '17px' }}>{deal.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '13px', color: '#6b7280' }}>
                    <Star size={14} fill="#eab308" color="#eab308" />
                    <span style={{ fontWeight: 700, color: '#1f2937' }}>{deal.rating}</span>
                    <span>({deal.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="price-row" style={{ marginTop: '8px' }}>
                  <span className="main-price">৳{deal.bestPrice}</span>
                  {deal.originalPrice > deal.bestPrice && (
                    <span className="old-price">৳{deal.originalPrice}</span>
                  )}
                </div>

                {/* Providers brief list */}
                <div className="provider-list" style={{ gap: '4px', marginBottom: '12px' }}>
                  {deal.providers.slice(0, 2).map((p, idx) => (
                    <div key={idx} className={`provider-row ${p.isBest ? 'best-row' : ''}`} style={{ padding: '4px 8px', fontSize: '12px' }}>
                      <span>{p.name}</span>
                      <span style={{ fontWeight: 800 }}>৳{p.price}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="btn-card-action"
                  onClick={() => onOpenDealDetail(deal)}
                >
                  <span>Compare & Grab Deal</span>
                  <ExternalLink size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
