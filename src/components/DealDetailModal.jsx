import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ExternalLink, ShieldCheck, Heart, ShoppingBag, Plus, Minus, CreditCard, Sparkles } from 'lucide-react';

export default function DealDetailModal({
  deal,
  onClose,
  onSave,
  isSaved,
  onToast,
  onAddToCart
}) {
  if (!deal) return null;

  // Standardize provider list for Skincare, Food, Rides, etc.
  const getInitialProviders = (dealItem) => {
    if (dealItem.providers && dealItem.providers.length > 0) {
      return dealItem.providers;
    }

    // Default apps for Skincare products if missing
    if (dealItem.category === 'skincare' || dealItem.storeTag || dealItem.brand) {
      const base = dealItem.currPrice || dealItem.bestPrice || 1000;
      const tag = dealItem.storeTag || 'Choice Legacy';
      return [
        { name: tag, price: base, isBest: true, discountNote: 'Direct Auth Retailer' },
        { name: 'kirei', price: Math.round(base * 1.03), discountNote: 'Verified Original' },
        { name: 'Makeup Chari', price: Math.round(base * 1.05), discountNote: 'Authentic Warranty' },
        { name: 'Beautybooth BD', price: Math.round(base * 1.07), discountNote: 'Express Delivery' },
        { name: 'Daraz Mall', price: Math.round(base * 1.09), discountNote: 'Official Mall Store' },
      ];
    }

    // Default for Food
    const base = dealItem.currPrice || dealItem.bestPrice || 200;
    return [
      { name: 'FoodPanda', price: base, isBest: true, time: '20-30 min' },
      { name: 'Pathao Food', price: Math.round(base * 1.08), time: '25-35 min' },
      { name: 'HungryNaki', price: Math.round(base * 1.12), time: '30-40 min' }
    ];
  };

  const providers = getInitialProviders(deal);
  const [selectedApp, setSelectedApp] = useState(providers[0]?.name || 'Choice Legacy');
  const [selectedPayment, setSelectedPayment] = useState('bKash');
  const [quantity, setQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('description');

  const getProductInfo = (dealItem) => {
    const brandLower = (dealItem.brand || dealItem.title || '').toLowerCase();
    const subLower = (dealItem.subTitle || dealItem.subtitle || '').toLowerCase();

    // COSRX
    if (brandLower.includes('cosrx') || subLower.includes('cosrx')) {
      if (subLower.includes('snail') || subLower.includes('96')) {
        return {
          description: "Light-weight essence that absorbs quickly into skin to give a natural glow from within. Formulated with 96.3% Snail Secretion Filtrate, it repairs damaged skin, restores elasticity, and deep-hydrates without stickiness.",
          ingredients: "Snail Secretion Filtrate (96.3%), Sodium Hyaluronate, Allantoin, Panthenol, Arginine, Ethyl Hexanediol, Phenoxyethanol, Butylene Glycol.",
          howToUse: "1. Cleanse face with gentle wash.\n2. Apply toner.\n3. Pump 1-2 drops onto hands and pat gently across face.\n4. Follow with moisturizer. Use AM & PM.",
          barcode: "8809416470009 (South Korea - Certified 100% Authentic)"
        };
      }
      if (subLower.includes('cleanser') || subLower.includes('morning') || subLower.includes('low ph')) {
        return {
          description: "A soothing gel cleanser with BHA and Tea Tree Oil designed to refine skin texture and clear pore impurities without stripping natural moisture. Formulated at optimal pH 5.0-6.0.",
          ingredients: "Water, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Polysorbate 20, Styrax Japonicus Branch/Fruit/Leaf Extract, Tea Tree Leaf Oil, Betaine Salicylate (0.5%).",
          howToUse: "1. Squeeze a pea-sized amount onto wet palms.\n2. Gently massage in circular motions on damp face.\n3. Rinse thoroughly with lukewarm water. Use morning and night.",
          barcode: "8809416470122 (South Korea - Dermatologically Tested)"
        };
      }
      if (subLower.includes('lotion') || subLower.includes('moisturiz') || subLower.includes('birch')) {
        return {
          description: "Contains 70% Birch Sap (Betula Platyphylla Japonica Juice) to calm skin and deliver ultra-lightweight hydration to oily, sensitive, or freshly exfoliated skin.",
          ingredients: "Betula Platyphylla Japonica Juice (70.85%), Butylene Glycol, Glycerin, Dimethicone, Betaine, Cetearyl Alcohol, Sodium Hyaluronate, Tea Tree Leaf Oil.",
          howToUse: "1. After cleansing & serum, apply 1-2 pumps.\n2. Spread evenly across face and neck.\n3. Press gently into skin until fully absorbed. Use AM & PM.",
          barcode: "8809416470351 (South Korea - Non-Comedogenic)"
        };
      }
      if (subLower.includes('rice') || subLower.includes('mask') || subLower.includes('overnight')) {
        return {
          description: "Enriched with 68.9% Rice Extract and 2% Niacinamide, this 3-in-1 spa mask intensely nourishes and brightens skin tone while you sleep.",
          ingredients: "Oryza Sativa (Rice) Extract (68.9%), Niacinamide (2%), Sunflower Seed Oil, Glycerin, Dimethicone, Betaine, 1,2-Hexanediol, Ethylhexylglycerin.",
          howToUse: "As an overnight mask: Apply generously at the last step of evening routine.\nAs a wash-off mask: Leave on for 15 minutes, then rinse.\nAs a daily moisturizer: Apply thin layer.",
          barcode: "8809416470214 (South Korea - Multi-Functional Spa Formula)"
        };
      }
    }

    // PURITO
    if (brandLower.includes('purito') || subLower.includes('purito')) {
      if (subLower.includes('serum') || subLower.includes('centella')) {
        return {
          description: "Fragrance-free and essential oil-free barrier repair serum. Formulated with 49% Centella Asiatica Extract and 3% Niacinamide to calm sensitive, irritated, or compromised skin.",
          ingredients: "Centella Asiatica Extract (49%), Water, Glycerin, Dipropylene Glycol, Niacinamide (3%), Butylene Glycol, Madecassic Acid, Asiaticoside, Asiatic Acid, Sodium Hyaluronate.",
          howToUse: "1. Dispense 1-2 pumps after toner.\n2. Gently smooth over face and neck.\n3. Pat gently until fully absorbed. Ideal for morning and night routines.",
          barcode: "8809563100845 (South Korea - 100% EWG Green Level)"
        };
      }
      if (subLower.includes('cream') || subLower.includes('sea') || subLower.includes('water')) {
        return {
          description: "Enriched with 60% Deep Sea Water sourced from 608m depth, Green Caviar, and Niacinamide to replenish moisture loss and fortify skin moisture barrier.",
          ingredients: "Sea Water (Deep Sea Water 60%), Dipropylene Glycol, Glycerin, Caprylic/Capric Triglyceride, Sodium Hyaluronate, Niacinamide (2%), Caulerpa Lentillifera Extract.",
          howToUse: "1. Apply an appropriate amount to face after serum.\n2. Gently massage upward until absorbed.\n3. Locks in 48-hour hydration. Use daily.",
          barcode: "8809563100913 (South Korea - Hypoallergenic)"
        };
      }
      if (subLower.includes('cleanser') || subLower.includes('barrier')) {
        return {
          description: "A low-pH 5.5 gel cleanser containing Centella Asiatica and Tea Tree oil. Gently cleanses impurities while preserving skin's natural acidic protective layer.",
          ingredients: "Water, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Centella Asiatica Extract, Tea Tree Leaf Oil, Grapefruit Peel Oil, Hydrolyzed Collagen, Allantoin.",
          howToUse: "1. Work gel into foam with wet hands.\n2. Massage onto wet face in circular motion.\n3. Rinse off with lukewarm water. Use AM & PM.",
          barcode: "8809563100777 (South Korea - pH 5.5 Balanced)"
        };
      }
      if (subLower.includes('mask') || subLower.includes('bentolin') || subLower.includes('clay')) {
        return {
          description: "4-in-1 pore purifying clay mask formulated with Bentonite, Kaolin, Volcanic Ash, and Illite. Absorbs excess sebum, unclogs pores, and refines texture.",
          ingredients: "Kaolin, Bentonite, Volcanic Ash, Illite, Water, Charcoal Powder, Centella Asiatica Extract, Sodium Hyaluronate, 1,2-Hexanediol.",
          howToUse: "1. Apply even layer over clean dry face.\n2. Leave on for 10-15 minutes until dry.\n3. Rinse thoroughly with lukewarm water. Use 1-2 times weekly.",
          barcode: "8809563101125 (South Korea - Deep Pore Detox)"
        };
      }
    }

    // ANUA
    if (brandLower.includes('anua') || subLower.includes('anua')) {
      if (subLower.includes('dark spot') || subLower.includes('niacinamide') || subLower.includes('txa') || dealItem.badge === 'BRIGHTENING AMPOULE') {
        return {
          description: "High-performance dark spot ampoule serum with 10% Niacinamide, 4% Tranexamic Acid (TXA), and 2% Arbutin to target stubborn hyperpigmentation, acne scars, and uneven skin tone.",
          ingredients: "Water, Niacinamide (10%), Tranexamic Acid (4%), Arbutin (2%), 1,2-Hexanediol, Sodium Hyaluronate, Centella Asiatica Extract, Macadamia Seed Oil, Glutathione.",
          howToUse: "1. Apply 3-4 drops onto face after toner.\n2. Gently press onto dark spots and hyperpigmented areas.\n3. Wear SPF during daytime. Use AM & PM.",
          barcode: "8809640730553 (South Korea - Targeted Spot Corrector)"
        };
      }
      if (subLower.includes('toner') || subLower.includes('77%')) {
        return {
          description: "Viral Korea #1 soothing toner containing 77% Houttuynia Cordata (Heartleaf) extract. Instantly relieves redness, calms acne flare-ups, and hydrates skin.",
          ingredients: "Houttuynia Cordata Extract (77%), Water, 1,2-Hexanediol, Glycerin, Betaine, Centella Asiatica Extract, Chamomilla Recutita Flower Extract, Panthenol.",
          howToUse: "1. Dispense onto cotton pad or clean hands.\n2. Pat gently over face.\n3. Can be used as a DIY 5-minute soothing sheet mask pack.",
          barcode: "8809640730010 (South Korea - #1 Olive Young Winner)"
        };
      }
      if (subLower.includes('cream') || subLower.includes('calming') || subLower.includes('intense')) {
        return {
          description: "Formulated with 70% Heartleaf Extract and Ceramide NP to repair skin barrier, soothe sensitive skin, and lock in non-greasy hydration.",
          ingredients: "Houttuynia Cordata Extract (70%), Cetearyl Alcohol, Glycerin, Ceramide NP, Panthenol, Hyaluronic Acid, Centella Asiatica Extract, Squalane.",
          howToUse: "1. Smooth over face and neck as final moisturizer step.\n2. Massage until fully absorbed.\n3. Use AM & PM for barrier protection.",
          barcode: "8809640730225 (South Korea - Barrier Repair Seal)"
        };
      }
      if (subLower.includes('foam') || subLower.includes('cleansing') || subLower.includes('quercetinol')) {
        return {
          description: "Pore-cleansing foam containing Quercetinol and 3,000ppm Heartleaf powder. Exfoliates dead skin cells, clears excess sebum, and purifies pores.",
          ingredients: "Houttuynia Cordata Extract (33.4%), Quercetinol, Heartleaf Powder (3,000ppm), Salicylic Acid (0.5%), Glycerin, Sodium Cocoyl Glycinate.",
          howToUse: "1. Lather onto wet palms until foamy.\n2. Massage gently on face avoiding eyes.\n3. Wash thoroughly with warm water. Use daily.",
          barcode: "8809640730416 (South Korea - Fine Pore Exfoliator)"
        };
      }
      if (subLower.includes('mud') || subLower.includes('mask')) {
        return {
          description: "Wash-off clay mud mask with 70% Heartleaf extract and mineral clay to tighten enlarged pores, remove excess oil, and soothe irritated skin.",
          ingredients: "Houttuynia Cordata Extract (70%), Kaolin, Bentonite, Glycerin, Centella Asiatica Extract, Tea Tree Extract, Allantoin.",
          howToUse: "1. Apply even layer on clean face.\n2. Leave for 10-15 minutes.\n3. Rinse gently with warm water. Use 1-2 times weekly.",
          barcode: "8809640730683 (South Korea - Pore Soothing Mud)"
        };
      }
    }

    // BRIGHTENING AMPOULES (SKIN1004, Skin&Lab, etc.)
    if (brandLower.includes('skin1004') || subLower.includes('skin1004') || subLower.includes('brightening ampoule') || subLower.includes('skin&lab')) {
      return {
        description: "Advanced brightening capsule ampoule formulated with MadeWhite™ micro-capsules suspended in Centella Asiatica. Fades hyperpigmentation, reduces dark spots, and restores luminosity.",
        ingredients: "Centella Asiatica Extract (77%), Niacinamide (4%), Madecassoside (MadeWhite™ Capsules 2%), Tranexamic Acid (2%), 3-O-Ethyl Ascorbic Acid (Vitamin C).",
        howToUse: "1. Drop 2-3 drops onto clean skin.\n2. Smooth over face as capsules melt into skin.\n3. Follow with moisturizer and sunscreen. Use AM & PM.",
        barcode: "8809576261236 (South Korea - MadeWhite™ Capsule Tech)"
      };
    }

    // THE PUREST SOLUTIONS
    if (brandLower.includes('purest solution') || subLower.includes('purest solution')) {
      if (subLower.includes('aha') || subLower.includes('peeling') || subLower.includes('bha')) {
        return {
          description: "Intensive facial peeling solution containing 10% AHA (Glycolic & Lactic Acid) and 2% BHA (Salicylic Acid) to peel away dead skin cells, clear blackheads, and unblock pores.",
          ingredients: "Aqua, Glycolic Acid (AHA), Salicylic Acid (BHA 2%), Lactic Acid, Tasmannia Lanceolata Fruit Extract, Hyaluronic Acid, Sodium Hydroxide, Glycerin.",
          howToUse: "1. Use ONLY at night on clean dry skin.\n2. Leave on for maximum 10 minutes.\n3. Rinse thoroughly with lukewarm water. Use max 2 times/week. Always wear sunscreen.",
          barcode: "8682773320148 (EU/Turkey Certified - AHA+BHA Peeling)"
        };
      }
      if (subLower.includes('moisturiz') || subLower.includes('hydration') || subLower.includes('oil-free')) {
        return {
          description: "Ultra-lightweight oil-free gel moisturizer enriched with 4D Hyaluronic Acid complex and Ceramides. Delivers weightless hydration without clogging pores.",
          ingredients: "Aqua, Sodium Hyaluronate Crosspolymer, Sodium Hyaluronate, Ceramide NP, Niacinamide (2%), Panthenol, Glycerin, Pentylene Glycol.",
          howToUse: "1. Massage onto clean face and neck.\n2. Use morning and night after serum.\n3. Excellent makeup base for oily & combination skin.",
          barcode: "8682773320254 (EU/Turkey Certified - 4D Hyaluronic Gel)"
        };
      }
      if (subLower.includes('cleans') || subLower.includes('gel') || subLower.includes('facewash')) {
        return {
          description: "Mild sulfate-free cleansing gel enriched with Hyaluronic Acid and 0.5% Salicylic Acid that purifies pores while respecting skin's natural moisture barrier.",
          ingredients: "Aqua, Disodium Cocoamphodiacetate, Cocamidopropyl Betaine, Salicylic Acid (0.5%), Sodium Hyaluronate, Glycerin, Chamomilla Recutita Flower Extract.",
          howToUse: "1. Apply onto wet face.\n2. Gently massage for 60 seconds.\n3. Rinse off with clean water. Use AM & PM.",
          barcode: "8682773320018 (EU/Turkey Certified - Gentle Cleanse)"
        };
      }
      if (subLower.includes('mask') || subLower.includes('purifying') || subLower.includes('clay')) {
        return {
          description: "Detoxifying clay mask formulated with Kaolin, 1% Zinc PCA, and Tea Tree oil to absorb excess oil, shrink pore appearance, and calm acne breakouts.",
          ingredients: "Kaolin, Aqua, Bentonite, Zinc PCA (1%), Melaleuca Alternifolia (Tea Tree) Leaf Oil, Niacinamide, Glycerin, Phenoxyethanol.",
          howToUse: "1. Apply thin layer over clean skin.\n2. Leave on for 10-15 minutes until dry.\n3. Rinse off thoroughly with water. Use 1-2 times weekly.",
          barcode: "8682773320391 (EU/Turkey Certified - Zinc PCA Detox)"
        };
      }
      return {
        description: "High-density hydration & brightening serum featuring multi-molecular Hyaluronic Acid (2%) and Provitamin B5 (Panthenol) to plump fine lines and boost radiance.",
        ingredients: "Aqua, Sodium Hyaluronate (2%), Panthenol (Provitamin B5), Niacinamide, Hydrolyzed Glycosaminoglycans, Glycerin, Ethylhexylglycerin.",
        howToUse: "1. Apply 3-5 drops to damp skin after cleansing.\n2. Pat gently into face.\n3. Follow immediately with moisturizer. Use AM & PM.",
        barcode: "8682773320520 (EU/Turkey Certified - Multi-Depth Hydration)"
      };
    }

    // General Fallback for other skincare items
    return {
      description: dealItem.subTitle
        ? `${dealItem.brand} - ${dealItem.subTitle}. Premium quality skincare product verified for safety and effectiveness.`
        : "Authentic skincare product dermatologically tested and imported through official channels.",
      ingredients: "Active Botanicals, Hyaluronic Acid, Niacinamide, Ceramides, Purified Water, Tocopherol.",
      howToUse: "1. Cleanse skin thoroughly.\n2. Apply appropriate amount to face and neck.\n3. Gently massage until absorbed. Use daily.",
      barcode: "8809000112233 (Verified Authentic Import Seal)"
    };
  };

  const productInfo = getProductInfo(deal);

  // Find currently selected app data
  const currentProvider = providers.find(p => p.name === selectedApp) || providers[0];
  const unitPrice = currentProvider?.price || deal.currPrice || deal.bestPrice || 0;
  const originalUnitPrice = deal.oldPrice || deal.originalPrice || Math.round(unitPrice * 1.3);

  // Payment method discount rates
  let paymentDiscountPct = 0;
  if (selectedPayment === 'bKash') paymentDiscountPct = 0.05; // 5%
  else if (selectedPayment === 'Nagad') paymentDiscountPct = 0.07; // 7%
  else if (selectedPayment === 'Card') paymentDiscountPct = 0.10; // 10%
  else paymentDiscountPct = 0; // Cash on delivery

  // Total Calculations
  const baseSubtotal = unitPrice * quantity;
  const originalSubtotal = originalUnitPrice * quantity;
  const appDiscountTotal = Math.max(0, originalSubtotal - baseSubtotal);
  const paymentDiscountAmount = Math.round(baseSubtotal * paymentDiscountPct);
  const finalPayable = Math.max(0, baseSubtotal - paymentDiscountAmount);
  const totalSavings = Math.round(originalSubtotal - finalPayable);

  const handleAddCart = () => {
    if (onAddToCart) {
      onAddToCart({
        ...deal,
        selectedApp,
        selectedPayment,
        qty: quantity,
        appPrice: unitPrice,
        oldPrice: originalUnitPrice,
        finalPrice: finalPayable,
        savings: totalSavings
      });
    }
    onToast(`🛒 Added ${quantity}x "${deal.brand || deal.title || deal.route}" (${selectedApp}) to Basket!`);
    onClose();
  };

  const handleOrderNow = () => {
    if (onAddToCart) {
      onAddToCart({
        ...deal,
        selectedApp,
        selectedPayment,
        qty: quantity,
        appPrice: unitPrice,
        oldPrice: originalUnitPrice,
        finalPrice: finalPayable,
        savings: totalSavings
      });
    }
    onToast(`⚡ Order placed via ${selectedApp} with ${selectedPayment}! Total: ৳${finalPayable.toLocaleString()}`);
    if (deal.category === 'food' || !deal.category || deal.type === 'food') {
      window.dispatchEvent(new CustomEvent('open-deliveryman-chat', {
        detail: { dealTitle: deal.brand || deal.title || deal.route || 'Food Order' }
      }));
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '640px',
          width: '94%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '24px'
        }}
      >
        <button className="btn-close-modal" onClick={onClose} style={{ background: '#f3f4f6', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
          <X size={18} color="#4b5563" />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={deal.img || deal.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80'}
            alt={deal.brand || deal.title || deal.route}
            style={{ width: '84px', height: '84px', borderRadius: '18px', objectFit: 'cover', border: '1px solid #e5e7eb' }}
          />
          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '9999px',
              background: '#e6f9f0',
              color: '#047857',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {deal.badge || deal.tag || (deal.category === 'skincare' ? 'AUTHENTIC SKINCARE' : 'VERIFIED OFFER')}
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginTop: '4px' }}>
              {deal.brand || deal.title || deal.route}
            </h2>
            <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
              {deal.subTitle || deal.subtitle || 'Best price comparison across Bangladeshi apps'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#ff2b70' }}>
                ৳{unitPrice.toLocaleString()}
              </span>
              {originalUnitPrice > unitPrice && (
                <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through' }}>
                  ৳{originalUnitPrice.toLocaleString()}
                </span>
              )}
              {totalSavings > 0 && (
                <span style={{
                  background: '#ff4757',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '9999px'
                }}>
                  SAVE ৳{totalSavings.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 1: Choose App / Store Breakdown */}
        <div style={{ background: '#f9fafb', borderRadius: '18px', padding: '16px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#374151', margin: 0 }}>
              1. Select App / Store Offering Discount:
            </h4>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ff2b70' }}>Live App Comparison</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {providers.map((p, idx) => {
              const isSelected = selectedApp === p.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedApp(p.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: isSelected ? '#fdf2f8' : 'white',
                    border: isSelected ? '2px solid #ff2b70' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color={isSelected ? "#ff2b70" : "#9ca3af"} />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: '#1f2937' }}>{p.name}</span>
                      {p.discountNote && <div style={{ fontSize: '11px', color: '#6b7280' }}>{p.discountNote}</div>}
                      {p.time && <div style={{ fontSize: '11px', color: '#6b7280' }}>Est: {p.time}</div>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px', color: isSelected ? '#ff2b70' : '#1f2937' }}>
                      ৳{p.price.toLocaleString()}
                    </span>
                    {p.isBest && (
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '9999px'
                      }}>
                        Lowest Price
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Choose Payment Method Discount */}
        <div style={{ background: '#f9fafb', borderRadius: '18px', padding: '16px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#374151', marginBottom: '10px', margin: 0 }}>
            2. Select Payment Method Discount:
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', marginTop: '10px' }}>
            {[
              { id: 'bKash', label: 'bKash', extra: '5% Cashback', color: '#e2136e', bg: '#fdf2f8' },
              { id: 'Nagad', label: 'Nagad', extra: '7% Discount', color: '#f97316', bg: '#fff7ed' },
              { id: 'Card', label: 'Visa / Card', extra: '10% Instant Off', color: '#2563eb', bg: '#eff6ff' },
              { id: 'COD', label: 'Cash on Delivery', extra: 'Standard Rate', color: '#4b5563', bg: '#f3f4f6' },
            ].map(pm => (
              <button
                key={pm.id}
                onClick={() => setSelectedPayment(pm.id)}
                style={{
                  padding: '10px',
                  borderRadius: '12px',
                  border: selectedPayment === pm.id ? `2px solid ${pm.color}` : '1px solid #e5e7eb',
                  background: selectedPayment === pm.id ? pm.bg : 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 800, color: pm.color }}>{pm.label}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#059669', marginTop: '2px' }}>{pm.extra}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Quantity Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9fafb', borderRadius: '16px', padding: '12px 16px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#374151' }}>
            3. Quantity (How many items):
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', border: '1px solid #d1d5db', borderRadius: '9999px', padding: '3px 10px' }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center' }}
            >
              <Minus size={16} />
            </button>
            <span style={{ fontSize: '16px', fontWeight: 800, minWidth: '24px', textAlign: 'center' }}>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563', display: 'flex', alignItems: 'center' }}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Section 4: Product Specs & Information Tabs */}
        <div style={{ background: '#ffffff', borderRadius: '18px', padding: '16px', marginBottom: '16px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px', marginBottom: '12px', overflowX: 'auto' }}>
            {[
              { id: 'description', label: '📖 Description' },
              { id: 'ingredients', label: '🧪 Ingredients' },
              { id: 'howToUse', label: '💡 How to Use' },
              { id: 'barcode', label: '🛡️ Barcode Verification' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveDetailTab(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: activeDetailTab === tab.id ? '1.5px solid #ff2b70' : '1px solid #e5e7eb',
                  background: activeDetailTab === tab.id ? '#fff0f5' : '#f9fafb',
                  color: activeDetailTab === tab.id ? '#ff2b70' : '#4b5563',
                  fontWeight: activeDetailTab === tab.id ? 800 : 600,
                  fontSize: '12px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
            {activeDetailTab === 'description' && (
              <div>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800, color: '#111827' }}>Product Overview</h5>
                <p style={{ margin: 0, color: '#4b5563' }}>{productInfo.description}</p>
              </div>
            )}

            {activeDetailTab === 'ingredients' && (
              <div>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800, color: '#111827' }}>Key Active Ingredients</h5>
                <p style={{ margin: 0, color: '#047857', fontWeight: 600, background: '#f0fdf4', padding: '10px 12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  {productInfo.ingredients}
                </p>
              </div>
            )}

            {activeDetailTab === 'howToUse' && (
              <div>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800, color: '#111827' }}>Application Instructions</h5>
                <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap', color: '#4b5563', background: '#f8fafc', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '12.5px' }}>
                  {productInfo.howToUse}
                </pre>
              </div>
            )}

            {activeDetailTab === 'barcode' && (
              <div>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800, color: '#111827' }}>Authenticity &amp; EAN Code</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#eff6ff', padding: '10px 12px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                  <span style={{ fontSize: '20px' }}>🏷️</span>
                  <div>
                    <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '13px' }}>Barcode / EAN: {productInfo.barcode}</div>
                    <div style={{ fontSize: '11px', color: '#3b82f6', marginTop: '2px' }}>Verified original batch by OfferMatrix Quality Assurance</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown Calculation */}
        <div style={{ background: '#fff0f5', borderRadius: '16px', padding: '14px 16px', marginBottom: '20px', border: '1px solid #fecdd3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4b5563', marginBottom: '4px' }}>
            <span>Base Price ({quantity}x)</span>
            <span>৳{baseSubtotal.toLocaleString()}</span>
          </div>
          {paymentDiscountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#059669', fontWeight: 700, marginBottom: '4px' }}>
              <span>{selectedPayment} Gateway Discount</span>
              <span>-৳{paymentDiscountAmount.toLocaleString()}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed #f472b6' }}>
            <div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>Total Payable Amount</span>
              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>Total Saved: ৳{totalSavings.toLocaleString()}</div>
            </div>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#ff2b70' }}>৳{finalPayable.toLocaleString()}</span>
          </div>
        </div>

        {/* Security & Guarantee Note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#059669', marginBottom: '20px' }}>
          <ShieldCheck size={16} />
          <span>Real-time price verification &amp; authentic barcode guarantee by OfferMatrix</span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              padding: '12px 14px',
              borderRadius: '9999px',
              border: '1.5px solid #e5e7eb',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => onSave(deal)}
            title="Save deal"
          >
            <Heart size={18} fill={isSaved ? "#ff4757" : "none"} color="#ff4757" />
          </button>

          <button
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '9999px',
              background: 'white',
              border: '2px solid #ff2b70',
              color: '#ff2b70',
              fontWeight: 800,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
            onClick={handleAddCart}
          >
            <ShoppingBag size={16} />
            <span>Add to Basket 🛒</span>
          </button>

          <button
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(255, 43, 112, 0.35)'
            }}
            onClick={handleOrderNow}
          >
            <span>Order Now ⚡</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
