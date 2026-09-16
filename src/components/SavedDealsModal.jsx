import React from 'react';
import { X, Trash2, ExternalLink, Heart } from 'lucide-react';

export default function SavedDealsModal({ savedDeals, onClose, onRemove, onOpenDetail }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <button className="btn-close-modal" onClick={onClose}>
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Heart size={22} fill="#ff2b70" color="#ff2b70" />
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>
            Saved Deals ({savedDeals.length})
          </h2>
        </div>

        {savedDeals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 10px', color: '#6b7280' }}>
            <p style={{ fontSize: '15px', fontWeight: 600 }}>Your saved list is empty.</p>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>Click the heart icon on any deal card to save it here for quick access!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
            {savedDeals.map((deal) => (
              <div 
                key={deal.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '16px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={deal.image} 
                    alt={deal.title || deal.route} 
                    style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>
                      {deal.title || deal.route}
                    </h4>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#ff2b70', marginTop: '2px' }}>
                      Best Price: ৳{deal.bestPrice || deal.cheapestPrice}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    style={{
                      padding: '8px 14px',
                      borderRadius: '9999px',
                      background: 'var(--btn-gradient)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onClick={() => {
                      onClose();
                      onOpenDetail(deal);
                    }}
                  >
                    <span>View</span>
                    <ExternalLink size={12} />
                  </button>
                  <button
                    style={{
                      padding: '8px',
                      borderRadius: '50%',
                      color: '#ef4444',
                      background: '#fee2e2'
                    }}
                    onClick={() => onRemove(deal.id)}
                    title="Remove from saved"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
