import React, { useState } from 'react';
import {
  ArrowLeft, Search, MapPin, Clock, ShieldCheck, Star, Car,
  ChevronDown, Globe, Check, Copy, ExternalLink, Settings,
  Menu, Truck, Package, Shield, Heart, Sparkles, User, Info, ArrowRight
} from 'lucide-react';

export default function IndriverPage({ onBack, onToast, onAddToCart, offers = [] }) {
  // Navigation & Location State
  const [selectedCity, setSelectedCity] = useState('Dhaka, BD');
  const [pickupLocation, setPickupLocation] = useState('Dhanmondi 27, Dhaka');
  const [dropoffLocation, setDropoffLocation] = useState('Gulshan 2, Dhaka');
  const [offeredPrice, setOfferedPrice] = useState(250);
  const [driverBids, setDriverBids] = useState([]);
  const [isBiddingActive, setIsBiddingActive] = useState(false);

  // Copied Promo Code State
  const [copiedCode, setCopiedCode] = useState('');

  // Active Promo Codes Data
  const defaultOffers = [
    { code: 'INDRIVER30', title: 'Set Your Fare 30% OFF', discount: '30% OFF', validTill: '30 Sep 2026', badge: 'Bargain Special', desc: 'Save 30% on your offered price for city car rides' },
    { code: 'INDRIVER100', title: 'Intercity Bargain Special', discount: '৳100 OFF', validTill: '25 Sep 2026', badge: 'Intercity', desc: 'Flat ৳100 discount on long distance trips to CTG, Sylhet & Gazipur' },
    { code: 'INDRIVERFIRST', title: 'First inDrive Trip Offer', discount: '20% OFF', validTill: '28 Sep 2026', badge: 'New User', desc: 'Exclusive offer for first-time inDrive passengers in Dhaka' },
    { code: 'INDRIVERBKASH', title: 'bKash Instant Cashback', discount: '৳40 CASHBACK', validTill: '05 Oct 2026', badge: 'bKash Pay', desc: 'Get ৳40 instant cashback when paying fare via bKash' }
  ];

  const activeOffersList = offers.length > 0 ? offers : defaultOffers;

  const handleStartBidding = () => {
    setIsBiddingActive(true);
    setDriverBids([]);
    if (onToast) onToast(`Bidding request posted for ৳${offeredPrice}! Finding nearby drivers... 🚘`);

    setTimeout(() => {
      setDriverBids([
        { id: 'bid-1', name: 'Tanvir Hossain', rating: '4.9 ★', car: 'Toyota Premio AC', fare: offeredPrice, eta: '2 mins away', trips: '1,420 trips', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
        { id: 'bid-2', name: 'Rafiqul Islam', rating: '4.8 ★', car: 'Honda Grace Hybrid', fare: Number(offeredPrice) + 20, eta: '4 mins away', trips: '980 trips', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
        { id: 'bid-3', name: 'Kabir Ahmed', rating: '4.95 ★', car: 'Nissan Sylphy AC', fare: Number(offeredPrice) - 10, eta: '3 mins away', trips: '2,150 trips', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
      ]);
    }, 800);
  };

  const handleAcceptBid = (bid) => {
    const rideItem = {
      id: `indriver-${bid.id}-${Date.now()}`,
      title: `inDrive ${bid.car} Ride`,
      vendor: 'inDrive BD',
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      price: bid.fare,
      qty: 1,
      type: 'ride',
      selectedApp: 'inDrive',
      img: '/indrive_hero_delivery.jpg'
    };

    if (onAddToCart) {
      onAddToCart(rideItem);
      if (onToast) onToast(`Accepted ${bid.name}'s offer for ৳${bid.fare}! Added to Basket 🚘`);
    } else if (onToast) {
      onToast(`Driver ${bid.name} accepted your ride for ৳${bid.fare}! Arriving in ${bid.eta}.`);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onToast) onToast(`inDrive promo code ${code} copied! Extra discount applied.`);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: '#ffffff', color: '#0f172a', minHeight: '100vh' }}>
      
      {/* ==================== 1. OFFERMATRIX TOP BACK BAR ==================== */}
      <div style={{ background: 'linear-gradient(90deg, #09090b 0%, #18181b 100%)', color: '#ffffff', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272a', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <ArrowLeft size={16} />
              <span>Back to OfferMatrix</span>
            </button>
          )}
          <div style={{ fontSize: '13px', color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#a3e635', color: '#0f172a', fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '99px' }}>OFFICIAL PARTNER</span>
            <span style={{ fontWeight: 600 }}>Bangladesh's #1 inDrive Bargain Fare & Delivery Hub</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#a3e635', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a3e635', display: 'inline-block', boxShadow: '0 0 8px #a3e635' }}></span>
            <span>4,120+ Drivers & Couriers Online</span>
          </div>
        </div>
      </div>

      {/* ==================== 2. INDRIVE OFFICIAL NAVBAR (Exact Match Screenshot 1 Header) ==================== */}
      <nav style={{ background: '#ffffff', color: '#000000', padding: '0 40px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', position: 'relative', zIndex: 90 }}>
        {/* Left: inDrive Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#a3e635', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', fontSize: '18px', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>
            iD
          </div>
          <span style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: '#000000', fontFamily: "'Outfit', sans-serif" }}>
            inDrive
          </span>
        </div>

        {/* Right Nav Options: Get the App, En (BD Flag), Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => onToast && onToast('inDrive App download link sent to your phone! 📱')}
            style={{ background: '#b4f316', color: '#000000', border: 'none', padding: '10px 22px', borderRadius: '9999px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 8px rgba(180, 243, 22, 0.4)', transition: 'transform 0.15s ease' }}
          >
            Get the App
          </button>

          {/* Bangladesh Flag Language Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '7px 16px', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
            <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#006a4e', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f42a41', display: 'inline-block' }}></span>
            </span>
            <span>En</span>
          </div>

          {/* Menu Button */}
          <button
            onClick={() => onToast && onToast('inDrive main menu opened')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1.5px solid #e2e8f0', padding: '8px 18px', borderRadius: '9999px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
          >
            <Menu size={18} color="#000000" />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* ==================== 3. HERO SECTION (Exact Match Screenshot 1) ==================== */}
      <section style={{ position: 'relative', height: '540px', width: '100%', overflow: 'hidden' }}>
        {/* Background Image: Realistic Photo of South Asian courier delivering box on Bangladesh street */}
        <img
          src="/indrive_hero_delivery.jpg"
          alt="inDrive Bangladesh Delivery Courier Realistic Photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}
        />

        {/* Soft Vignette Overlay matching Screenshot 1 */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 45%, rgba(0, 0, 0, 0.1) 100%)' }}></div>

        {/* Text & CTA Content Layer (Exact Placement Screenshot 1) */}
        <div style={{ position: 'absolute', inset: 0, maxWidth: '1280px', margin: '0 auto', padding: '0 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ maxWidth: '600px' }}>
            
            {/* Lime Green Highlight Badge: "Fair deals" */}
            <div style={{ display: 'inline-block', background: '#b4f316', color: '#000000', padding: '6px 18px', borderRadius: '12px', fontSize: '52px', fontWeight: 900, letterSpacing: '-1px', marginBottom: '8px', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 20px rgba(180, 243, 22, 0.4)' }}>
              Fair deals
            </div>

            {/* Main Headline text: "in delivery, cargo and food" */}
            <h1 style={{ fontSize: '56px', fontWeight: 900, color: '#ffffff', lineHeight: '1.08', letterSpacing: '-1.5px', margin: '4px 0 28px 0', textShadow: '0 4px 16px rgba(0,0,0,0.4)', fontFamily: "'Outfit', sans-serif" }}>
              in delivery,<br />cargo and food
            </h1>

            {/* Lime Green CTA Button: "Check them all" */}
            <button
              onClick={() => {
                const sec = document.getElementById('services-grid-section');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ background: '#b4f316', color: '#000000', border: 'none', padding: '16px 36px', borderRadius: '18px', fontSize: '16px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 6px 24px rgba(180, 243, 22, 0.5)', transition: 'transform 0.15s ease' }}
            >
              Check them all
            </button>
          </div>
        </div>

        {/* Bottom Left Floating Gear Settings Icon (Exact Match Screenshot 1) */}
        <button
          onClick={() => onToast && onToast('inDrive preference settings')}
          style={{ position: 'absolute', bottom: '24px', left: '24px', width: '42px', height: '42px', borderRadius: '50%', background: '#1e293b', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
        >
          <Settings size={20} />
        </button>
      </section>

      {/* ==================== 4. ONE APP, MANY SERVICES SECTION (Exact Match Screenshots 2 & 3) ==================== */}
      <section id="services-grid-section" style={{ background: '#fcfbfa', padding: '64px 32px 80px 32px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Top Pill Badge: "inDrive app" */}
          <div style={{ display: 'inline-block', background: '#f4f3e8', color: '#000000', padding: '8px 24px', borderRadius: '9999px', fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>
            inDrive app
          </div>

          {/* Section Main Title: "One app, many services" */}
          <h2 style={{ fontSize: '52px', fontWeight: 900, color: '#000000', margin: '0 0 48px 0', letterSpacing: '-1.5px', fontFamily: "'Outfit', sans-serif" }}>
            One app, many services
          </h2>

          {/* Services Cards Grid (Exact Layout Screenshots 2 & 3) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px', textAlign: 'left' }}>
            
            {/* CARD 1: CITY RIDES */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'center' }}>
                {/* Illustration Graphic with Green Accents */}
                <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', background: '#f7fee7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"
                    alt="City Rides inDrive"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>City rides</h3>
                  <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Forever good rides for a fair price
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="#bargain"
                      onClick={(e) => { e.preventDefault(); const calc = document.getElementById('bidding-calculator-section'); if (calc) calc.scrollIntoView({ behavior: 'smooth' }); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Passengers ›
                    </a>
                    <a
                      href="#driver"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('inDrive Driver Partner signup opened!'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Drivers ›
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: CITY TO CITY */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'center' }}>
                {/* Illustration Graphic with Green Accents */}
                <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', background: '#f7fee7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80"
                    alt="City to City inDrive"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>City to city</h3>
                  <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Choose comfort at fair price all the way long
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="#intercity"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('Intercity routes: Dhaka to CTG, Sylhet & Bogura'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Passengers ›
                    </a>
                    <a
                      href="#intercity-driver"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('Intercity driver registration'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Drivers ›
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: DELIVERY (Exact Match Screenshot 3) */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'center' }}>
                {/* Illustration Graphic with Green Accents */}
                <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
                    alt="Delivery Courier inDrive"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Delivery</h3>
                  <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Express delivery for business and people.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="#clients"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('Express delivery request opened!'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Clients ›
                    </a>
                    <a
                      href="#couriers"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('Courier partner registration'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Couriers ›
                    </a>
                    <a
                      href="#business"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('inDrive Business Solutions'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Business ›
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: FREIGHT / CARGO */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '36px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'center' }}>
                {/* Illustration Graphic with Green Accents */}
                <div style={{ width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80"
                    alt="inDrive Freight Truck"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#000000', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Cargo</h3>
                  <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.4' }}>
                    Heavy logistics & truck moving made simple
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="#shippers"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('Truck & Cargo shipping form'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Shippers ›
                    </a>
                    <a
                      href="#truck-drivers"
                      onClick={(e) => { e.preventDefault(); onToast && onToast('Cargo Driver registration'); }}
                      style={{ fontSize: '16px', fontWeight: 800, color: '#000000', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      For Drivers ›
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 5. INTERACTIVE FARE BIDDING CALCULATOR ==================== */}
      <section id="bidding-calculator-section" style={{ background: '#ffffff', padding: '60px 24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ background: '#b4f316', color: '#000000', padding: '4px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}>
              ⚡ YOU SET THE PRICE
            </span>
            <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '8px 0 0 0' }}>
              Live Fare Bidding Calculator
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', margin: '4px 0 0 0' }}>
              Offer your fare price directly to drivers and get instant responses
            </p>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '32px', border: '2px solid #b4f316', boxShadow: '0 12px 36px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 180px', gap: '16px', alignItems: 'end' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase' }}>Pickup Point</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px 14px' }}>
                  <MapPin size={18} color="#16a34a" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase' }}>Destination</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '10px 14px' }}>
                  <MapPin size={18} color="#ef4444" style={{ marginRight: '8px' }} />
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase' }}>Offer Your Fare (৳)</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1.5px solid #b4f316', borderRadius: '12px', padding: '10px 14px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#15803d', marginRight: '6px' }}>৳</span>
                  <input
                    type="number"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '16px', fontWeight: 900, color: '#0f172a' }}
                  />
                </div>
              </div>

              <button
                onClick={handleStartBidding}
                style={{ background: '#b4f316', color: '#000000', border: 'none', padding: '14px 20px', borderRadius: '12px', fontSize: '15px', fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 14px rgba(180, 243, 22, 0.4)' }}
              >
                Post Offer
              </button>
            </div>

            {/* Drivers Live Counter Offers */}
            {isBiddingActive && (
              <div style={{ marginTop: '28px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  <span>Driver Counter Offers Received (Live):</span>
                </div>

                {driverBids.length === 0 ? (
                  <div style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>Broadcasting your fare offer to nearby drivers...</div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {driverBids.map((bid) => (
                      <div key={bid.id} style={{ background: '#ffffff', borderRadius: '16px', padding: '16px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <img src={bid.img} alt={bid.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{bid.name}</div>
                            <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>{bid.rating} • {bid.trips}</div>
                          </div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '10px', marginBottom: '12px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>🚗 {bid.car}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>ETA: {bid.eta}</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '20px', fontWeight: 900, color: '#000000' }}>৳{bid.fare}</span>
                          <button
                            onClick={() => handleAcceptBid(bid)}
                            style={{ background: '#000000', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== 6. VERIFIED OFFERMATRIX PROMO CODES ==================== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
              ⚡ OfferMatrix Verified Promos
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '6px 0 0 0' }}>
              Active inDrive Discount Codes
            </h2>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Click any promo code to copy and apply discount</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {activeOffersList.map((offer, idx) => (
            <div
              key={idx}
              style={{ background: '#ffffff', borderRadius: '18px', border: '1.5px solid #e2e8f0', padding: '20px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ background: '#000000', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {offer.badge || 'Active Coupon'}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 900, color: '#16a34a' }}>{offer.discount}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>{offer.title}</h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                  {offer.desc || 'Valid on all inDrive rides in Bangladesh'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px border-dashed #e2e8f0', paddingTop: '12px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Exp: {offer.validTill}</span>

                <button
                  onClick={() => handleCopyCode(offer.code)}
                  style={{
                    background: copiedCode === offer.code ? '#16a34a' : '#000000',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>{offer.code}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 7. SOCIAL IMPACT SECTION (Exact Match Screenshot 4) ==================== */}
      <section style={{ background: '#b4f316', color: '#000000', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Organic Curved Leaf Accent Background Shapes matching Screenshot 4 */}
        <div style={{ position: 'absolute', top: '-120px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-150px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }}></div>

        <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Main Title matching Screenshot 4 */}
          <h2 style={{ fontSize: '56px', fontWeight: 900, color: '#000000', margin: '0 0 20px 0', letterSpacing: '-1.5px', lineHeight: '1.08', fontFamily: "'Outfit', sans-serif" }}>
            Social Impact:<br />making a difference
          </h2>

          {/* Subtitle Paragraph matching Screenshot 4 */}
          <p style={{ fontSize: '18px', color: '#1a1a1a', fontWeight: 600, lineHeight: '1.5', margin: '0 auto 36px auto', maxWidth: '720px' }}>
            We don't just drive - we empower. inDrive's social projects support local communities through access to education, art, sport, and equal opportunities.
          </p>

          {/* Dark Pill CTA Button matching Screenshot 4 */}
          <button
            onClick={() => onToast && onToast('inDrive Social Impact Initiatives loaded!')}
            style={{ background: '#121212', color: '#ffffff', border: 'none', padding: '16px 36px', borderRadius: '18px', fontSize: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          >
            Learn more
          </button>
        </div>
      </section>

      {/* ==================== 8. FOOTER BAR ==================== */}
      <footer style={{ background: '#09090b', color: '#a1a1aa', padding: '40px 32px 30px 32px', borderTop: '1px solid #18181b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#b4f316', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', fontSize: '14px', fontWeight: 900 }}>
              iD
            </div>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff' }}>inDrive</span>
          </div>

          <div style={{ fontSize: '13px' }}>
            © {new Date().getFullYear()} inDrive & OfferMatrix BD. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
            <a href="#privacy" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Terms of Use</a>
            <a href="#safety" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Safety Rules</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
