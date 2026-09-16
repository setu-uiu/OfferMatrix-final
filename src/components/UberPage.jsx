import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Search, ShoppingBag, MapPin, Clock, ShieldCheck, Star, Car,
  ChevronDown, Globe, Check, Copy, ExternalLink, Calendar, Package, Bike,
  Navigation, Navigation2, Zap, Award, Sparkles, User, Info
} from 'lucide-react';

export default function UberPage({ onBack, onToast, onAddToCart, offers = [] }) {
  // Navigation & Location state
  const [selectedCity, setSelectedCity] = useState('Dhaka, BD');
  const [pickupLocation, setPickupLocation] = useState('Banani 11, Dhaka');
  const [dropoffLocation, setDropoffLocation] = useState('Hazrat Shahjalal International Airport (DAC)');
  const [pickupTimeOption, setPickupTimeOption] = useState('Pickup now');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);

  // Active Tab for Map vs Hero Art
  const [rightVisualMode, setRightVisualMode] = useState('illustration'); // 'illustration' or 'map'

  // Ride Fare Calculator & Selection
  const [selectedVehicle, setSelectedVehicle] = useState('uberx');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedFare, setCalculatedFare] = useState(null);

  // Copied Promo Code state
  const [copiedCode, setCopiedCode] = useState('');

  // Active Promo Codes Data
  const defaultOffers = [
    { code: 'UBER20', title: '20% off on 3 Rides', discount: '20% OFF', validTill: '30 Sep 2026', badge: 'Popular', desc: 'Valid on all AC Sedans & UberX trips across Dhaka' },
    { code: 'UBER50', title: 'Flat ৳50 bKash Cashback', discount: '৳50 OFF', validTill: '25 Sep 2026', badge: 'bKash Special', desc: 'Instant cashback when paying via bKash on Uber App' },
    { code: 'UBERWEEKEND', title: 'Weekend Ride Special', discount: '25% OFF', validTill: '28 Sep 2026', badge: 'Weekend', desc: 'Save 25% on intercity and city rides Friday to Saturday' },
    { code: 'UBERAIRPORT', title: 'Airport Ride Discount', discount: '৳100 OFF', validTill: '05 Oct 2026', badge: 'Airport', desc: 'Flat ৳100 discount on airport pickup and dropoff rides' }
  ];

  const activeOffersList = offers.length > 0 ? offers : defaultOffers;

  // Vehicle Categories Data with real images
  const vehicleFleet = [
    {
      id: 'uberx',
      name: 'UberX Sedan',
      seats: '4 seats',
      eta: '3 mins away',
      baseFare: 210,
      oldFare: 260,
      savings: 50,
      desc: 'Comfortable, AC sedan rides for daily city travel',
      tag: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'uberxl',
      name: 'Uber XL SUV',
      seats: '6 seats',
      eta: '5 mins away',
      baseFare: 380,
      oldFare: 450,
      savings: 70,
      desc: 'Spacious SUVs with extra luggage space for group travel',
      tag: '6 Seats',
      img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'moto',
      name: 'Uber Moto',
      seats: '1 seat',
      eta: '2 mins away',
      baseFare: 95,
      oldFare: 130,
      savings: 35,
      desc: 'Beat traffic fast with affordable motorcycle rides',
      tag: 'Fastest',
      img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'intercity',
      name: 'Uber Intercity',
      seats: '4 seats',
      eta: '8 mins away',
      baseFare: 1450,
      oldFare: 1750,
      savings: 300,
      desc: 'Convenient outstation rides to Gazipur, CTG, Sylhet & beyond',
      tag: 'Outstation',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'premier',
      name: 'Uber Premier',
      seats: '4 seats',
      eta: '4 mins away',
      baseFare: 490,
      oldFare: 580,
      savings: 90,
      desc: 'Top-rated drivers in premium high-end sedan cars',
      tag: 'VIP Luxury',
      img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Explore Cards Data (Screenshot 2 exact items)
  const exploreCards = [
    {
      id: 'exp-1',
      title: 'Ride',
      desc: 'Go anywhere with Uber. Request a ride, hop in, and go.',
      actionText: 'Details',
      badge: 'Popular',
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'exp-2',
      title: 'Reserve',
      desc: 'Reserve your ride in advance so you can relax on the day of your trip.',
      actionText: 'Details',
      badge: 'Schedule Ahead',
      img: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'exp-3',
      title: 'Intercity',
      desc: 'Get convenient, affordable outstation cabs anytime at your door.',
      actionText: 'Details',
      badge: 'Long Distance',
      img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'exp-4',
      title: 'Parcel',
      desc: 'Uber makes same-day item delivery easier than ever.',
      actionText: 'Details',
      badge: 'Express Delivery',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'exp-5',
      title: 'Rentals',
      desc: 'Request a trip for a block of time and make multiple stops.',
      actionText: 'Details',
      badge: 'Hourly Package',
      img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'exp-6',
      title: 'Bike',
      desc: 'Get affordable motorbike rides in minutes at your doorstep.',
      actionText: 'Details',
      badge: 'Traffic Beat',
      img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const handleCalculateFare = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      const selected = vehicleFleet.find(v => v.id === selectedVehicle) || vehicleFleet[0];
      setCalculatedFare(selected);
      if (onToast) onToast(`Estimated fare for ${selected.name}: ৳${selected.baseFare} 🚗`);
      const fareSection = document.getElementById('fare-results-section');
      if (fareSection) {
        fareSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onToast) onToast(`Uber promo code ${code} copied! 10% extra discount applied.`);
    setTimeout(() => setCopiedCode(''), 3000);
  };

  const handleBookRide = (vehicle) => {
    const rideItem = {
      id: `uber-${vehicle.id}-${Date.now()}`,
      title: `Uber ${vehicle.name} Ride`,
      vendor: 'Uber BD',
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      price: vehicle.baseFare,
      qty: 1,
      type: 'ride',
      selectedApp: 'Uber',
      img: vehicle.img
    };

    if (onAddToCart) {
      onAddToCart(rideItem);
      if (onToast) onToast(`Added ${vehicle.name} booking to your Basket! 🚗`);
    } else if (onToast) {
      onToast(`Ride request sent for ${vehicle.name}! Fare: ৳${vehicle.baseFare}`);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", background: '#ffffff', color: '#0f172a', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* ==================== 1. OFFERMATRIX TOP BACK BAR ==================== */}
      <div style={{ background: 'linear-gradient(90deg, #000000 0%, #1e293b 100%)', color: '#ffffff', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', position: 'sticky', top: 0, zIndex: 100 }}>
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
          <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px' }}>OFFICIAL PARTNER</span>
            <span style={{ fontWeight: 600 }}>Bangladesh's #1 Uber Ride & Promo Hub</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#4ade80', fontWeight: 700 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }}></span>
            <span>3,850+ Drivers Active Now</span>
          </div>
        </div>
      </div>

      {/* ==================== 2. UBER OFFICIAL NAVBAR (Screenshot 1 Exact Header) ==================== */}
      <nav style={{ background: '#000000', color: '#ffffff', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a' }}>
        {/* Left Side: Logo & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <div style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.8px', color: '#ffffff', cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>
            Uber
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#ride" style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, textDecoration: 'none', padding: '6px 0', borderBottom: '2px solid #ffffff' }}>Ride</a>
            <a href="#earn" style={{ color: '#d1d5db', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Earn</a>
            <a href="#business" style={{ color: '#d1d5db', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Business</a>
            <a href="#eats" style={{ color: '#d1d5db', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Uber Eats</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#d1d5db', fontSize: '15px', fontWeight: 500, cursor: 'pointer' }}>
              <span>About</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        {/* Right Side: Language, Help, Login, Signup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Globe size={16} />
            <span>EN</span>
          </div>

          <a href="#help" style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>Help</a>
          <a href="#login" onClick={() => onToast && onToast('Uber Log In modal opened!')} style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}>Log in</a>
          
          <button
            onClick={() => onToast && onToast('Uber Sign Up modal opened!')}
            style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '8px 18px', borderRadius: '9999px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.1s ease' }}
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* ==================== 3. HERO SECTION (Screenshot 1 Exact Layout) ==================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        
        {/* Left Column: Form & Call to Action */}
        <div>
          {/* Location City Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#000000', fontWeight: 600, marginBottom: '20px' }}>
            <MapPin size={16} color="#000000" />
            <span>{selectedCity}</span>
            <button
              onClick={() => setShowCityModal(true)}
              style={{ background: 'none', border: 'none', color: '#000000', textDecoration: 'underline', fontWeight: 600, fontSize: '14px', cursor: 'pointer', padding: 0 }}
            >
              Change city
            </button>
          </div>

          {/* Main Headline */}
          <h1 style={{ fontSize: '54px', fontWeight: 800, color: '#000000', lineHeight: '1.08', letterSpacing: '-1.5px', margin: '0 0 28px 0' }}>
            Go anywhere with<br />Uber
          </h1>

          {/* Pickup Now Pill Dropdown */}
          <div style={{ position: 'relative', marginBottom: '20px', display: 'inline-block' }}>
            <button
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              style={{ background: '#f3f4f6', color: '#000000', border: 'none', padding: '10px 18px', borderRadius: '9999px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <Clock size={16} />
              <span>{pickupTimeOption}</span>
              <ChevronDown size={14} />
            </button>

            {showTimeDropdown && (
              <div style={{ position: 'absolute', top: '48px', left: 0, background: '#ffffff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: '8px 0', width: '220px', zIndex: 50, border: '1px solid #e5e7eb' }}>
                <div 
                  onClick={() => { setPickupTimeOption('Pickup now'); setShowTimeDropdown(false); }}
                  style={{ padding: '10px 16px', fontSize: '14px', color: '#000000', cursor: 'pointer', fontWeight: 600, background: pickupTimeOption === 'Pickup now' ? '#f3f4f6' : 'transparent' }}
                >
                  ⚡ Pickup now
                </div>
                <div 
                  onClick={() => { setPickupTimeOption('Schedule for later'); setShowTimeDropdown(false); }}
                  style={{ padding: '10px 16px', fontSize: '14px', color: '#000000', cursor: 'pointer', fontWeight: 500, background: pickupTimeOption === 'Schedule for later' ? '#f3f4f6' : 'transparent' }}
                >
                  📅 Schedule for later
                </div>
              </div>
            )}
          </div>

          {/* Uber Pickup & Dropoff Input Fields Box */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            
            {/* Field 1: Pickup Location */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '8px', padding: '4px 14px', border: '1px solid transparent', transition: 'border 0.2s' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#000000', marginRight: '14px', flexShrink: 0 }}></div>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Pickup location"
                style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: '#000000', fontWeight: 600 }}
              />
              <Navigation2 size={18} color="#000000" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => onToast && onToast('Located current position via GPS!')} />
            </div>

            {/* Connecting Vertical Dot Line */}
            <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '2px', background: '#94a3b8', zIndex: 2 }}></div>

            {/* Field 2: Dropoff Location */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '8px', padding: '4px 14px', border: '1px solid transparent' }}>
              <div style={{ width: '12px', height: '12px', background: '#000000', marginRight: '14px', flexShrink: 0 }}></div>
              <input
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                placeholder="Dropoff location"
                style={{ width: '100%', padding: '12px 0', background: 'transparent', border: 'none', outline: 'none', fontSize: '15px', color: '#000000', fontWeight: 600 }}
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={handleCalculateFare}
              style={{ background: '#000000', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', transition: 'transform 0.15s ease' }}
            >
              <span>{isCalculating ? 'Calculating fare...' : 'See prices'}</span>
            </button>

            <a
              href="#activity"
              onClick={(e) => { e.preventDefault(); onToast && onToast('Redirecting to Uber login...'); }}
              style={{ color: '#000000', fontSize: '14px', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
            >
              Log in to see your recent activity
            </a>
          </div>
        </div>

        {/* Right Column: Screenshot 1 Suitcase Hero Art & Interactive Map Toggle */}
        <div style={{ position: 'relative' }}>
          
          {/* Mode Switcher Tabs (Illustration vs Google Map) */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', background: '#f1f5f9', padding: '4px', borderRadius: '10px', width: 'fit-content' }}>
            <button
              onClick={() => setRightVisualMode('illustration')}
              style={{ border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: rightVisualMode === 'illustration' ? '#ffffff' : 'transparent', color: rightVisualMode === 'illustration' ? '#000000' : '#64748b', boxShadow: rightVisualMode === 'illustration' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none' }}
            >
              🎨 Uber Travel View
            </button>
            <button
              onClick={() => setRightVisualMode('map')}
              style={{ border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', background: rightVisualMode === 'map' ? '#ffffff' : 'transparent', color: rightVisualMode === 'map' ? '#000000' : '#64748b', boxShadow: rightVisualMode === 'map' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none' }}
            >
              🗺️ Live Dhaka Google Map
            </button>
          </div>

          {rightVisualMode === 'illustration' ? (
            /* Screenshot 1 Exact Suitcase Artwork Container */
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '440px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                alt="Uber Travel Packed Suitcase Illustration"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Decorative Travel Graphic Layer */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(234, 88, 12, 0.2) 0%, rgba(180, 83, 9, 0.75) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                
                {/* Floating Glass Box Banner (Screenshot 1 bottom right overlay) */}
                <div style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '14px', padding: '14px 20px', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '18px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    Ready to travel?
                  </div>
                  <button
                    onClick={() => { setPickupTimeOption('Schedule for later'); onToast && onToast('Schedule ahead selected!'); }}
                    style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '10px 20px', borderRadius: '9999px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  >
                    Schedule ahead
                  </button>
                </div>

              </div>
            </div>
          ) : (
            /* Interactive Live Google Map View */
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '440px', border: '2px solid #000000', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
              <iframe
                title="Dhaka Live Uber Route Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700302251347!2d90.399581!3d23.7946925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m3!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Map Floating Route Badge */}
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: '#000000', color: '#ffffff', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                <span>Live Route: Banani ➔ Airport (14.2 km • ~24 mins)</span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ==================== 4. LIVE FARE RESULTS & VEHICLE FLEET SELECTION ==================== */}
      <section id="fare-results-section" style={{ background: '#f8fafc', padding: '40px 24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <span style={{ background: '#000000', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                UBER BANGLADESH FARES
              </span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '6px 0 0 0' }}>
                Choose Your Uber Ride
              </h2>
            </div>

            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
              Route: <span style={{ color: '#0f172a', fontWeight: 800 }}>{pickupLocation}</span> ➔ <span style={{ color: '#0f172a', fontWeight: 800 }}>{dropoffLocation}</span>
            </div>
          </div>

          {/* Vehicle Fleet Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {vehicleFleet.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #000000' : '1px solid #e2e8f0',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 10px 25px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Tag Pill */}
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: isSelected ? '#000000' : '#f1f5f9', color: isSelected ? '#ffffff' : '#475569', padding: '2px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: 800 }}>
                    {vehicle.tag}
                  </span>

                  {/* Vehicle Image */}
                  <div style={{ height: '80px', margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={vehicle.img} alt={vehicle.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0' }}>{vehicle.name}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, marginBottom: '8px' }}>
                      {vehicle.seats} • {vehicle.eta}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: '#000000' }}>৳{vehicle.baseFare}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through' }}>৳{vehicle.oldFare}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookRide(vehicle);
                      }}
                      style={{
                        width: '100%',
                        background: isSelected ? '#000000' : '#f1f5f9',
                        color: isSelected ? '#ffffff' : '#0f172a',
                        border: 'none',
                        padding: '10px 0',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
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

      {/* ==================== 5. ACTIVE PROMO CODES & OFFERMATRIX DISCOUNTS ==================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
              ⚡ OfferMatrix Verified Promos
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '6px 0 0 0' }}>
              Active Uber Discount Codes
            </h2>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Click any promo code to instantly copy and apply discount</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {activeOffersList.map((offer, idx) => (
            <div
              key={idx}
              style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ background: '#000000', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>
                    {offer.badge || 'Active Offer'}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 900, color: '#16a34a' }}>{offer.discount}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>{offer.title}</h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                  {offer.desc || 'Valid on all ride categories in Bangladesh'}
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
                    gap: '6px',
                    transition: 'all 0.2s'
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

      {/* ==================== 6. EXPLORE WHAT YOU CAN DO WITH UBER (Screenshot 2 Exact Section) ==================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '36px 24px 60px 24px' }}>
        <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#000000', margin: '0 0 32px 0', letterSpacing: '-0.8px' }}>
          Explore what you can do with Uber
        </h2>

        {/* 6 Cards Grid (Screenshot 2 exact 3 column x 2 row layout) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {exploreCards.map((card) => (
            <div
              key={card.id}
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                minHeight: '180px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                border: '1px solid #f1f5f9',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => onToast && onToast(`Exploring Uber ${card.title}!`)}
            >
              {/* Left Info Column */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingRight: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: '0 0 8px 0' }}>{card.title}</h3>
                  <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: '1.4', maxWidth: '200px' }}>{card.desc}</p>
                </div>

                <button
                  style={{
                    background: '#ffffff',
                    color: '#000000',
                    border: '1px solid #e2e8f0',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: 'fit-content',
                    marginTop: '20px'
                  }}
                >
                  {card.actionText}
                </button>
              </div>

              {/* Right Image Graphic Column */}
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 7. THE UBER YOU KNOW, REIMAGINED FOR BUSINESS (Screenshot 3 Exact Section) ==================== */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Text Column */}
          <div>
            <h2 style={{ fontSize: '42px', fontWeight: 800, color: '#000000', lineHeight: '1.15', margin: '0 0 20px 0', letterSpacing: '-0.8px' }}>
              The Uber you know,<br />reimagined for business
            </h2>

            <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: '0 0 28px 0', maxWidth: '460px' }}>
              Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                onClick={() => onToast && onToast('Uber for Business registration started!')}
                style={{ background: '#000000', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}
              >
                Get started
              </button>

              <a
                href="#solutions"
                onClick={(e) => { e.preventDefault(); onToast && onToast('Showing business solutions'); }}
                style={{ color: '#000000', fontSize: '15px', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
              >
                Check out our solutions
              </a>
            </div>
          </div>

          {/* Right Corporate Visual Column */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', height: '360px', boxShadow: '0 16px 32px rgba(0,0,0,0.1)' }}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
              alt="Uber for Business corporate building visual"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

        </div>
      </section>

      {/* ==================== 8. BOTTOM STICKY SEE PRICES BAR (Screenshot 3 Exact Bottom Bar) ==================== */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#000000', color: '#ffffff', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 90, cursor: 'pointer', boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' }}
           onClick={() => {
             const heroSec = document.getElementById('fare-results-section');
             if (heroSec) heroSec.scrollIntoView({ behavior: 'smooth' });
           }}>
        <div style={{ fontSize: '16px', fontWeight: 700 }}>
          See prices
        </div>
      </div>

      {/* ==================== CITY SELECTOR MODAL ==================== */}
      {showCityModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '420px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#000000', margin: '0 0 16px 0' }}>Select Your City</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Dhaka, BD', 'Chattogram, BD', 'Sylhet, BD', 'Rajshahi, BD', 'Khulna, BD'].map((city) => (
                <button
                  key={city}
                  onClick={() => { setSelectedCity(city); setShowCityModal(false); if (onToast) onToast(`City set to ${city}`); }}
                  style={{ background: selectedCity === city ? '#000000' : '#f8fafc', color: selectedCity === city ? '#ffffff' : '#0f172a', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, textAlign: 'left', cursor: 'pointer' }}
                >
                  📍 {city}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCityModal(false)}
              style={{ width: '100%', marginTop: '16px', background: 'none', border: 'none', color: '#64748b', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
