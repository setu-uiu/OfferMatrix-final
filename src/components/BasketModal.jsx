import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, Sparkles, ArrowRight, Tag, CreditCard } from 'lucide-react';

export default function BasketModal({ 
  cartItems = [], 
  onClose, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart, 
  onToast,
  onPlaceOrder
}) {
  const [selectedGlobalPayment, setSelectedGlobalPayment] = useState('bKash');

  // Compute multi-app / multi-restaurant discount matrix
  const uniqueApps = Array.from(new Set(cartItems.map(item => item.selectedApp || item.storeTag || 'Default App')));
  const isMultiAppOrder = uniqueApps.length > 1;

  // Subtotal without any discount
  const originalSubtotal = cartItems.reduce((acc, item) => {
    const origPrice = item.oldPrice || item.originalPrice || (item.currPrice ? item.currPrice * 1.3 : item.price * 1.3);
    return acc + (Number(origPrice) * item.qty);
  }, 0);

  // App-Specific Skincare / Food Discount sum
  const appDiscountTotal = cartItems.reduce((acc, item) => {
    const origPrice = item.oldPrice || item.originalPrice || (item.currPrice ? item.currPrice * 1.3 : item.price * 1.3);
    const itemPrice = item.appPrice || item.currPrice || item.price || item.bestPrice;
    const savePerUnit = Math.max(0, origPrice - itemPrice);
    return acc + (savePerUnit * item.qty);
  }, 0);

  // General OfferMatrix App Combo Discount (extra bonus for multi-app / multi-restaurant order!)
  let offerMatrixComboDiscount = 0;
  if (cartItems.length > 0) {
    if (isMultiAppOrder) {
      offerMatrixComboDiscount = 150; // ৳150 bonus discount for multi-app / multi-restaurant combo order
    } else {
      offerMatrixComboDiscount = 50; // ৳50 general OfferMatrix platform coupon bonus
    }
  }

  // Current subtotal after app & OfferMatrix discount
  const baseDiscountedTotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.appPrice || item.currPrice || item.price || item.bestPrice;
    return acc + (Number(itemPrice) * item.qty);
  }, 0) - offerMatrixComboDiscount;

  const validBaseTotal = Math.max(0, baseDiscountedTotal);

  // Payment Gateway Discount on entire basket
  let paymentDiscountPct = 0;
  if (selectedGlobalPayment === 'bKash') paymentDiscountPct = 0.05; // 5%
  else if (selectedGlobalPayment === 'Nagad') paymentDiscountPct = 0.07; // 7%
  else if (selectedGlobalPayment === 'Card') paymentDiscountPct = 0.10; // 10%
  else paymentDiscountPct = 0; // Cash on delivery

  const paymentDiscountAmount = Math.round(validBaseTotal * paymentDiscountPct);
  const grandTotal = Math.max(0, validBaseTotal - paymentDiscountAmount);
  const totalSavings = Math.round((originalSubtotal - grandTotal));

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    if (onPlaceOrder) {
      onPlaceOrder({
        cartItems,
        grandTotal,
        totalSavings,
        paymentMethod: selectedGlobalPayment,
        uniqueApps
      });
    }
    onClearCart();
    onToast(`🎉 Order Placed Successfully! Total: ৳${grandTotal.toLocaleString()} via ${selectedGlobalPayment}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '94%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '24px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(255, 43, 112, 0.3)'
            }}>
              <ShoppingBag size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>
                Your OfferMatrix Basket
              </h2>
              <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected across {uniqueApps.length} {uniqueApps.length === 1 ? 'store/app' : 'stores/apps'}
              </span>
            </div>
          </div>

          <button className="btn-close-modal" onClick={onClose} style={{ background: '#f3f4f6', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
            <X size={20} color="#4b5563" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '50px', marginBottom: '16px' }}>🛒</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Your basket is empty</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '6px', maxWidth: '360px', margin: '6px auto 20px' }}>
              Add skincare products or food items from different apps to compare prices & unlock combo discounts!
            </p>
            <button 
              onClick={onClose}
              style={{
                padding: '12px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 43, 112, 0.3)'
              }}
            >
              Explore Deals Now
            </button>
          </div>
        ) : (
          <>
            {/* Multi-App Savings Banner */}
            {isMultiAppOrder && (
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                border: '1px solid #86efac',
                borderRadius: '16px',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Sparkles size={22} color="#16a34a" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#15803d', fontSize: '13.5px', display: 'block' }}>
                    🎉 Multi-App / Multi-Store Order Detected!
                  </strong>
                  <span style={{ color: '#166534', fontSize: '12.5px' }}>
                    Ordering across <strong>{uniqueApps.join(', ')}</strong> unlocks an extra <strong>৳150 OfferMatrix Multi-App Bonus Discount</strong>!
                  </span>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {cartItems.map((item, idx) => {
                const itemPrice = item.appPrice || item.currPrice || item.price || item.bestPrice;
                const oldPrice = item.oldPrice || item.originalPrice || (item.currPrice ? item.currPrice * 1.3 : item.price * 1.3);

                return (
                  <div 
                    key={`${item.id}-${idx}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '16px',
                      background: '#f9fafb',
                      border: '1px solid #f3f4f6',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Item Image & Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 240px' }}>
                      <img 
                        src={item.img || item.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80'} 
                        alt={item.brand || item.title} 
                        style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e5e7eb' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>
                            {item.brand || item.title}
                          </h4>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            background: '#eff6ff',
                            color: '#2563eb',
                            border: '1px solid #bfdbfe'
                          }}>
                            {item.selectedApp || item.storeTag || 'OfferMatrix'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '2px' }}>
                          {item.subTitle || item.subtitle || item.category || 'Product'}
                        </span>
                        {item.selectedPayment && (
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                            Paid via {item.selectedPayment}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* Qty Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '9999px', border: '1px solid #d1d5db', padding: '2px 6px' }}>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          style={{ padding: '4px 8px', cursor: 'pointer', color: '#4b5563' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '14px', minWidth: '24px', textAlign: 'center' }}>
                          {item.qty}
                        </span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          style={{ padding: '4px 8px', cursor: 'pointer', color: '#4b5563' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div style={{ textAlign: 'right', minWidth: '80px' }}>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff2b70' }}>
                          ৳{(itemPrice * item.qty).toLocaleString()}
                        </div>
                        {oldPrice > itemPrice && (
                          <div style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>
                            ৳{(oldPrice * item.qty).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        style={{ padding: '8px', color: '#ef4444', background: '#fef2f2', borderRadius: '50%', cursor: 'pointer', border: 'none' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Method Selector for Cart */}
            <div style={{ background: '#f9fafb', borderRadius: '18px', padding: '16px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CreditCard size={18} color="#ff2b70" />
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0 }}>
                  Select Preferred Payment Method for Extra Discount:
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {[
                  { id: 'bKash', name: 'bKash', discount: '5% OFF', color: '#e2136e', bg: '#fdf2f8' },
                  { id: 'Nagad', name: 'Nagad', discount: '7% OFF', color: '#f97316', bg: '#fff7ed' },
                  { id: 'Card', name: 'Visa / Card', discount: '10% OFF', color: '#2563eb', bg: '#eff6ff' },
                  { id: 'COD', name: 'Cash on Delivery', discount: 'No Extra Off', color: '#4b5563', bg: '#f3f4f6' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedGlobalPayment(pm.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '14px',
                      border: selectedGlobalPayment === pm.id ? `2px solid ${pm.color}` : '1px solid #e5e7eb',
                      background: selectedGlobalPayment === pm.id ? pm.bg : 'white',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontSize: '13px', fontWeight: 800, color: pm.color, display: 'block' }}>{pm.name}</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', display: 'block', marginTop: '2px' }}>{pm.discount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Matrix Discount Summary Box */}
            <div style={{ background: '#fafafa', borderRadius: '18px', padding: '18px', border: '1.5px dashed #d1d5db', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1f2937', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📊 OfferMatrix Detailed Savings Breakdown
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563' }}>
                  <span>Original Items Price Subtotal</span>
                  <span>৳{originalSubtotal.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 600 }}>
                  <span>App Skincare / Food Specific Discount</span>
                  <span>-৳{appDiscountTotal.toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9333ea', fontWeight: 700 }}>
                  <span>
                    OfferMatrix General Apps Discount {isMultiAppOrder ? '(Multi-App Bonus 🌟)' : '(Platform Coupon 🎟️)'}
                  </span>
                  <span>-৳{offerMatrixComboDiscount.toLocaleString()}</span>
                </div>

                {paymentDiscountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0284c7', fontWeight: 700 }}>
                    <span>Payment Gateway Discount ({selectedGlobalPayment})</span>
                    <span>-৳{paymentDiscountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ height: '1px', background: '#e5e7eb', margin: '6px 0' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>Grand Total Payable</span>
                    <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>
                      🔥 Total Savings: ৳{totalSavings.toLocaleString()}
                    </div>
                  </div>
                  <span style={{ fontSize: '26px', fontWeight: 900, color: '#ff2b70' }}>
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={onClearCart}
                style={{
                  padding: '14px 18px',
                  borderRadius: '9999px',
                  border: '1.5px solid #e5e7eb',
                  background: 'white',
                  color: '#6b7280',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>

              <button 
                onClick={handleCheckout}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255, 43, 112, 0.4)'
                }}
              >
                <span>Proceed to Multi-App Checkout (৳{grandTotal.toLocaleString()})</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
