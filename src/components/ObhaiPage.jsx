import React, { useState } from 'react';
import {
  ArrowLeft, MapPin, Clock, ShieldCheck, Star, Car, ChevronDown,
  Globe, Check, Copy, Navigation, Navigation2, Search, Zap, User, Phone, Info
} from 'lucide-react';

export default function ObhaiPage({ onBack, onToast, onAddToCart, offers = [] }) {
  // Navigation & Location state
  const [selectedCity, setSelectedCity] = useState('Dhaka');
  const [pickupLocation, setPickupLocation] = useState('Gulshan 2, Dhaka');
  const [dropoffLocation, setDropoffLocation] = useState('Dhanmondi 27, Dhaka');
  const [showCityModal, setShowCityModal] = useState(false);

  // Active Tab for "Your travel buddy" section (Screenshot 2)
  const [activeBuddyTab, setActiveBuddyTab] = useState('ride_sharing'); // 'ride_sharing', 'truck', 'express', 'vts'

  // Visual Mode (Artwork vs Live Google Map)
  const [visualMode, setVisualMode] = useState('map'); // 'map' or 'artwork'

  // Ride Fare Selection
  const [selectedVehicle, setSelectedVehicle] = useState('obhai_cng');
  const [isCalculating, setIsCalculating] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');

  // Default OBHAI Offers Data
  const defaultOffers = [
    { code: 'OBHAI25', title: 'OBHAI 25% OFF on CNG Rides', discount: '25% OFF', validTill: '30 Sep 2026', badge: 'CNG Special', desc: 'Flat 25% discount on all OBHAI CNG rides in Dhaka' },
    { code: 'OBHAICASH', title: 'Flat ৳40 bKash Cashback', discount: '৳40 OFF', validTill: '25 Sep 2026', badge: 'bKash Exclusive', desc: 'Instant cashback when paying via bKash' },
    { code: 'OBHAIWEEKEND', title: 'Weekend Outstation Special', discount: '20% OFF', validTill: '28 Sep 2026', badge: 'Intercity', desc: 'Save 20% on Obhai Intercity G rides Friday to Saturday' }
  ];

  const activeOffersList = offers.length > 0 ? offers : defaultOffers;

  // OBHAI Vehicles Fleet Data
  const vehicleFleet = [
    {
      id: 'obhai_cng',
      name: 'Obhai CNG',
      seats: '3 seats',
      eta: '2 mins away',
      baseFare: 80,
      oldFare: 110,
      savings: 30,
      desc: 'Affordable, eco-friendly green CNG auto rickshaws',
      tag: 'Cheapest',
      img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'obhai_g',
      name: 'Obhai G (Sedan AC)',
      seats: '4 seats',
      eta: '4 mins away',
      baseFare: 190,
      oldFare: 240,
      savings: 50,
      desc: 'Premium, comfortable and safe AC sedan car services',
      tag: 'Best Comfort',
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'obhai_intercity',
      name: 'Obhai Intercity G',
      seats: '4 seats',
      eta: '7 mins away',
      baseFare: 1350,
      oldFare: 1600,
      savings: 250,
      desc: 'Safe, on-demand car services for outstation travels',
      tag: 'Outstation',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'obhai_microbus',
      name: 'Obhai Microbus',
      seats: '7-11 seats',
      eta: '10 mins away',
      baseFare: 2200,
      oldFare: 2600,
      savings: 400,
      desc: 'Large capacity microbus for group and family tours',
      tag: 'Group Travel',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const handleCalculateFare = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      const selected = vehicleFleet.find(v => v.id === selectedVehicle) || vehicleFleet[0];
      if (onToast) onToast(`Calculated OBHAI fare for ${selected.name}: ৳${selected.baseFare} 🚕`);
      const fareSection = document.getElementById('obhai-fare-section');
      if (fareSection) fareSection.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onToast) onToast(`OBHAI promo code ${code} copied! Extra discount applied.`);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const handleBookRide = (vehicle) => {
    const rideItem = {
      id: `obhai-${vehicle.id}-${Date.now()}`,
      title: `OBHAI ${vehicle.name} Ride`,
      vendor: 'OBHAI Bangladesh',
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      price: vehicle.baseFare,
      qty: 1,
      type: 'ride',
      selectedApp: 'OBHAI',
      img: vehicle.img
    };

    if (onAddToCart) {
      onAddToCart(rideItem);
      if (onToast) onToast(`Added ${vehicle.name} booking to your Basket! 🚕`);
    } else if (onToast) {
      onToast(`Ride requested for ${vehicle.name}! Fare: ৳${vehicle.baseFare}`);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: '#ffffff', color: '#0f172a', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* ==================== 1. OFFERMATRIX TOP BACK BAR ==================== */}
      <div style={{ background: 'linear-gradient(90deg, #111827 0%, #1e293b 100%)', color: '#ffffff', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <ArrowLeft size={16} />
              <span>Back to OfferMatrix</span>
            </button>
          )}
          <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#fbbf24', color: '#000000', fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '99px' }}>OBHAI RIDES</span>
            <span style={{ fontWeight: 600 }}>Safer Rides for a Better Tomorrow • CNG & Cars</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block', boxShadow: '0 0 8px #fbbf24' }}></span>
            <span>2,450+ OBHAI CNGs & Sedans Active</span>
          </div>
        </div>
      </div>

      {/* ==================== 2. TOP MINI HEADER & MAIN NAVBAR (Screenshot 1 Exact Header) ==================== */}
      <div style={{ background: '#111111', color: '#999999', fontSize: '12px', padding: '6px 48px', display: 'flex', justifyContent: 'flex-end', gap: '20px', borderBottom: '1px solid #222222' }}>
        <a href="#contact" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>Contact Us</a>
        <a href="#mgh" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 600 }}>MGH Group</a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff', fontWeight: 600, cursor: 'pointer' }}>
          <span>EN</span>
          <ChevronDown size={12} />
        </div>
      </div>

      <nav style={{ background: '#18181b', color: '#ffffff', padding: '0 48px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #27272a' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <div style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '0.5px', color: '#ffffff', fontFamily: 'sans-serif' }}>
            OBHAI
          </div>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#fbbf24', background: '#3f3f46', padding: '2px 6px', borderRadius: '4px' }}>
            পৌঁছে দেব
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#driver" style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, textDecoration: 'none' }}>Become a Driver</a>
          <a href="#services" style={{ color: '#d4d4d8', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Services</a>
          <a href="#support" style={{ color: '#d4d4d8', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Support</a>
          <a href="#about" style={{ color: '#d4d4d8', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>About Us</a>
          <a href="#blogs" style={{ color: '#d4d4d8', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Blogs</a>

          <button
            onClick={() => onToast && onToast('OBHAI App Download link sent!')}
            style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 22px', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>Download app</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </nav>

      {/* ==================== 3. HERO SECTION (Screenshot 1 Exact Layout) ==================== */}
      <section style={{ position: 'relative', background: 'linear-gradient(180deg, #18181b 0%, #27272a 100%)', color: '#ffffff', padding: '60px 48px 80px 48px', overflow: 'hidden' }}>
        
        {/* Background City Image Overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: 'url(https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Text Column */}
          <div>
            <h1 style={{ fontSize: '58px', fontWeight: 900, color: '#ffffff', lineHeight: '1.08', letterSpacing: '-1.5px', margin: '0 0 16px 0' }}>
              Rides to remember
            </h1>
            <p style={{ fontSize: '20px', color: '#e4e4e7', margin: '0 0 32px 0', fontWeight: 400 }}>
              No matter where you go, Obhai will take you.
            </p>

            {/* App Store Download Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#000000', border: '1px solid #3f3f46', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <span style={{ fontSize: '20px' }}>▶</span>
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#a1a1aa' }}>GET IT ON</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>Google Play</div>
                </div>
              </div>

              <div style={{ background: '#000000', border: '1px solid #3f3f46', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <span style={{ fontSize: '20px' }}></span>
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#a1a1aa' }}>Download on the</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>App Store</div>
                </div>
              </div>
            </div>

            {/* Fare Estimator Inputs Box */}
            <div style={{ background: '#ffffff', color: '#0f172a', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', width: '100%', maxWidth: '440px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px', color: '#000000', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🚕 Instant OBHAI Fare Calculator</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f4f4f5', padding: '10px 14px', borderRadius: '8px' }}>
                  <MapPin size={16} color="#16a34a" style={{ marginRight: '10px' }} />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Pickup location"
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', background: '#f4f4f5', padding: '10px 14px', borderRadius: '8px' }}>
                  <MapPin size={16} color="#dc2626" style={{ marginRight: '10px' }} />
                  <input
                    type="text"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    placeholder="Dropoff location"
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 600, color: '#0f172a' }}
                  />
                </div>
              </div>

              <button
                onClick={handleCalculateFare}
                style={{ width: '100%', background: '#fbbf24', color: '#000000', border: 'none', padding: '12px 0', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}
              >
                {isCalculating ? 'Calculating fare...' : 'Estimate Fare & Book'}
              </button>
            </div>
          </div>

          {/* Right Visual Column (Green CNG Auto & Car + App Phone + Google Map Toggle) */}
          <div style={{ position: 'relative' }}>
            
            {/* View Switcher */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', background: '#27272a', padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
              <button
                onClick={() => setVisualMode('artwork')}
                style={{ border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: visualMode === 'artwork' ? '#ffffff' : 'transparent', color: visualMode === 'artwork' ? '#000000' : '#a1a1aa' }}
              >
                🛺 OBHAI CNG & Fleet Art
              </button>
              <button
                onClick={() => setVisualMode('map')}
                style={{ border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: visualMode === 'map' ? '#ffffff' : 'transparent', color: visualMode === 'map' ? '#000000' : '#a1a1aa' }}
              >
                🗺️ Live Dhaka Google Map
              </button>
            </div>

            {visualMode === 'artwork' ? (
              /* Screenshot 1 Center Phone App + Green CNG + Sedan Car Visual */
              <div style={{ position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Phone App Mockup */}
                <div style={{ width: '220px', height: '380px', borderRadius: '24px', overflow: 'hidden', border: '4px solid #3f3f46', background: '#000000', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'absolute', zIndex: 1 }}>
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80" alt="Obhai App Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: '#ffffff', color: '#000000', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>
                    <div>Obhai CNG</div>
                    <div style={{ color: '#16a34a' }}>৳154.0 (Estimated)</div>
                  </div>
                </div>

                {/* Green CNG Rickshaw Image in Front */}
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
                  alt="OBHAI Green CNG Auto"
                  style={{ width: '280px', height: '200px', objectFit: 'cover', borderRadius: '16px', position: 'absolute', bottom: 0, left: '-20px', zIndex: 3, border: '3px solid #fbbf24', boxShadow: '0 12px 24px rgba(0,0,0,0.4)' }}
                />

                {/* Grey Sedan Car on Right */}
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
                  alt="OBHAI Sedan Car"
                  style={{ width: '320px', height: '220px', objectFit: 'cover', borderRadius: '16px', position: 'absolute', bottom: '10px', right: '-40px', zIndex: 2, border: '3px solid #38bdf8', boxShadow: '0 12px 24px rgba(0,0,0,0.4)' }}
                />
              </div>
            ) : (
              /* Live Dhaka Google Map */
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '420px', border: '3px solid #fbbf24', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <iframe
                  title="OBHAI Live Dhaka Google Map"
                  src="https://maps.google.com/maps?q=Gulshan,+Dhaka,+Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div style={{ position: 'absolute', top: '14px', left: '14px', background: '#18181b', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, border: '1px solid #fbbf24' }}>
                  🛺 OBHAI Live Route: {pickupLocation} ➔ {dropoffLocation} (Est. ৳80 CNG / ৳190 Sedan)
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==================== 4. LIVE OBHAI FARES & FLEET OPTIONS ==================== */}
      <section id="obhai-fare-section" style={{ background: '#f8fafc', padding: '48px 24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <span style={{ background: '#fbbf24', color: '#000000', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                OBHAI RIDE OPTIONS
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '6px 0 0 0' }}>
                Select Your OBHAI Ride Category
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {vehicleFleet.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #d97706' : '1px solid #e2e8f0',
                    padding: '20px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 10px 24px rgba(217, 119, 6, 0.15)' : '0 2px 8px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: 800 }}>
                    {vehicle.tag}
                  </span>

                  <div style={{ height: '90px', margin: '12px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={vehicle.img} alt={vehicle.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px 0' }}>{vehicle.name}</h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px 0', lineHeight: '1.4' }}>{vehicle.desc}</p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 900, color: '#d97706' }}>৳{vehicle.baseFare}</span>
                      <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>৳{vehicle.oldFare}</span>
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800 }}>Save ৳{vehicle.savings}</span>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); handleBookRide(vehicle); }}
                      style={{
                        width: '100%',
                        background: '#fbbf24',
                        color: '#000000',
                        border: 'none',
                        padding: '10px 0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                    >
                      Book {vehicle.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================== 5. YOUR TRAVEL BUDDY SECTION (Screenshot 2 Exact Layout) ==================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: '42px', fontWeight: 900, color: '#000000', margin: '0 0 32px 0', letterSpacing: '-0.8px' }}>
          Your travel buddy
        </h2>

        {/* Tab Header Row (Screenshot 2 exact tab design) */}
        <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '40px', gap: '36px' }}>
          {[
            { id: 'ride_sharing', label: 'Ride Sharing' },
            { id: 'truck', label: 'Truck' },
            { id: 'express', label: 'Express' },
            { id: 'vts', label: 'Vehicle Tracking System' }
          ].map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveBuddyTab(tab.id)}
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: activeBuddyTab === tab.id ? '#2563eb' : '#64748b',
                paddingBottom: '12px',
                borderBottom: activeBuddyTab === tab.id ? '3px solid #2563eb' : 'none',
                marginBottom: '-2px',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Tab Content Display (Screenshot 2 exact items) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Vehicles Specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb', margin: '0 0 4px 0' }}>Obhai G</h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Premium, comfortable and safe car services.</p>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0' }}>Obhai CNG</h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Move hassle-free with affordable CNG auto rickshaws.</p>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: '0 0 4px 0' }}>Obhai Intercity G</h3>
              <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>Safe, on-demand car services for outstation travels.</p>
            </div>

          </div>

          {/* Right White Sedan Car Asset */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
              alt="Obhai White Sedan Car"
              style={{ width: '100%', height: '320px', objectFit: 'contain' }}
            />
          </div>

        </div>
      </section>

      {/* ==================== 6. FIND US WHERE YOU GO SECTION (Screenshot 3 Exact Layout) ==================== */}
      <section style={{ background: '#f8fafc', padding: '60px 24px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Round Circle Travel Image Graphic (Screenshot 3 exact round frame) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '320px', height: '320px', borderRadius: '50%', border: '8px solid #ffffff', overflow: 'hidden', boxShadow: '0 16px 32px rgba(0,0,0,0.08)' }}>
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
                alt="Find us where you go travel compass phone yellow car"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right Info Column */}
          <div>
            <h2 style={{ fontSize: '44px', fontWeight: 900, color: '#000000', margin: '0 0 16px 0', letterSpacing: '-0.8px' }}>
              Find us where you go
            </h2>
            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: '0 0 28px 0', maxWidth: '480px' }}>
              We're available in 23+ cities across Bangladesh. Book an Obhai and we'll take you there.
            </p>

            <button
              onClick={() => setShowCityModal(true)}
              style={{
                background: '#ffffff',
                color: '#2563eb',
                border: '1.5px solid #3b82f6',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              View all cities
            </button>
          </div>

        </div>
      </section>

      {/* ==================== ACTIVE PROMOS SECTION ==================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '20px' }}>
          Active OBHAI Coupons & Offers
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {activeOffersList.map((offer, idx) => (
            <div key={idx} style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '18px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ background: '#fbbf24', color: '#000000', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>{offer.badge}</span>
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#16a34a' }}>{offer.discount}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 4px 0' }}>{offer.title}</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>{offer.desc}</p>
              <button
                onClick={() => handleCopyCode(offer.code)}
                style={{ width: '100%', background: copiedCode === offer.code ? '#16a34a' : '#18181b', color: '#ffffff', border: 'none', padding: '8px 0', borderRadius: '6px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
              >
                {copiedCode === offer.code ? 'Copied!' : `Copy ${offer.code}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CITY MODAL ==================== */}
      {showCityModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '440px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#000000', margin: '0 0 16px 0' }}>OBHAI Available Cities (23+)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh', 'Comilla', 'Cox\'s Bazar'].map((city) => (
                <button
                  key={city}
                  onClick={() => { setSelectedCity(city); setShowCityModal(false); if (onToast) onToast(`Selected ${city} for OBHAI`); }}
                  style={{ background: selectedCity === city ? '#fbbf24' : '#f4f4f5', color: selectedCity === city ? '#000000' : '#0f172a', border: '1px solid #e4e4e7', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}
                >
                  📍 {city}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCityModal(false)}
              style={{ width: '100%', marginTop: '16px', background: 'none', border: 'none', color: '#64748b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
