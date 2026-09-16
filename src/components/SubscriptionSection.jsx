import React, { useState } from 'react';
import { Crown, Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/dealsData';

export default function SubscriptionSection({ selectedCategory = 'all', onToast, onOpenAuth }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'

  if (selectedCategory !== 'all' && selectedCategory !== 'subscription') {
    return null;
  }

  const handleSelectPlan = (plan) => {
    if (plan.id === 'free') {
      onToast('You are currently on the Free Explorer plan!');
    } else {
      onToast(`Subscribed to ${plan.name} (${billingCycle})! 🎉 Check your dashboard.`);
      if (onOpenAuth) {
        onOpenAuth();
      }
    }
  };

  return (
    <section id="subscription-sector" className="sector-container sector-subscription">
      {/* Header */}
      <div className="sector-header text-center">
        <div className="sector-badge purple">
          <Crown size={16} />
          <span>OFFERMATRIX PASS</span>
        </div>
        <h2 className="sector-title">
          Supercharge Your Savings with <span>Premium Membership</span>
        </h2>
        <p className="sector-subtitle">
          Unlock extra 10–15% cashback, zero delivery fees, and priority ride allocations across Bangladesh.
        </p>

        {/* Monthly / Yearly Billing Toggle */}
        <div className="billing-toggle-wrapper">
          <button
            className={`billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly Billing
          </button>
          <button
            className={`billing-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => setBillingCycle('yearly')}
          >
            <span>Yearly Billing</span>
            <span className="save-pill">SAVE 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="pricing-grid">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          const isYearly = billingCycle === 'yearly' && price > 0;

          return (
            <div
              key={plan.id}
              className={`pricing-card ${plan.highlight ? 'popular-plan' : ''}`}
              style={{ borderColor: plan.highlight ? '#ff2b70' : '#e5e7eb' }}
            >
              {plan.badge && (
                <div
                  className="plan-badge-top"
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(135deg, #ff2b70, #ff528b)'
                      : plan.id === 'vip'
                      ? 'linear-gradient(135deg, #8b5cf6, #a855f7)'
                      : '#6b7280'
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-title">{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>
              </div>

              <div className="plan-price-box">
                <div className="price-display">
                  <span className="currency">৳</span>
                  <span className="amount">{price}</span>
                  <span className="period">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                {isYearly && plan.savingsText && (
                  <div className="yearly-savings-badge">{plan.savingsText}</div>
                )}
              </div>

              {/* Features List */}
              <ul className="plan-features-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <div className="feature-check" style={{ color: plan.highlight ? '#ff2b70' : '#00c853' }}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`btn-plan-cta ${plan.highlight ? 'btn-primary-glow' : 'btn-outline'}`}
                style={{
                  background: plan.highlight
                    ? 'linear-gradient(135deg, #ff2b70, #ff528b)'
                    : plan.id === 'vip'
                    ? 'linear-gradient(135deg, #8b5cf6, #a855f7)'
                    : '#f3f4f6',
                  color: plan.id === 'free' ? '#374151' : '#ffffff'
                }}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.id === 'pro' && <Zap size={16} />}
                {plan.id === 'vip' && <Sparkles size={16} />}
                <span>{plan.ctaText}</span>
              </button>

              <div className="plan-footer-note">
                <ShieldCheck size={14} color="#9ca3af" />
                <span>Cancel anytime in 1-click</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
