import React, { useState, useEffect } from 'react';
import {
  Mail, Lock, User, Store, ShieldCheck, ArrowRight, ArrowLeft,
  Percent, Eye, EyeOff, Shield, Check, Phone, Star, Bell, Zap, Sparkles
} from 'lucide-react';

import { OfferMatrixAPI } from '../services/api';

export default function AuthModal({ onClose, onToast, onLoginSuccess, initialSignUp = false, initialAccountType = 'user', initialCategory = null, onSelectCategory }) {
  const [isSignUp, setIsSignUp] = useState(initialSignUp || initialCategory === 'rides' || initialCategory === 'ride' || initialCategory === 'food');
  const [signUpStep, setSignUpStep] = useState(initialCategory ? 'merchant_explore' : (initialSignUp ? (initialAccountType === 'merchant' ? 'merchant_explore' : 'details') : (initialAccountType === 'merchant' ? 'merchant_explore' : 'select'))); // 'select', 'details', 'merchant_explore', 'verify'
  const [accountType, setAccountType] = useState(initialAccountType); // 'user', 'merchant', 'admin'
  const [hoveredExploreCard, setHoveredExploreCard] = useState(null);
  const [skincareSubStep, setSkincareSubStep] = useState(initialCategory === 'skincare');
  const [foodSubStep, setFoodSubStep] = useState(initialCategory === 'food');
  const [rideSubStep, setRideSubStep] = useState(initialCategory === 'rides' || initialCategory === 'ride');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [pendingToken, setPendingToken] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSelectAccountType = (type) => {
    setAccountType(type);
    if (type === 'merchant') {
      setSignUpStep('merchant_explore');
      onToast('Welcome to Merchant Explore View!');
    } else {
      setSignUpStep('details');
      onToast(`Selected ${type.charAt(0).toUpperCase() + type.slice(1)} Account`);
    }
  };

  const handleSignUpSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!agreeTerms) {
      setAuthError('Please check the box to agree to the Terms of Service & Privacy Policy');
      onToast('Please agree to the Terms of Service & Privacy Policy');
      return;
    }
    if (!fullName) {
      setAuthError('Please enter your full name');
      return;
    }
    if (!email) {
      setAuthError('Please enter your email address');
      return;
    }
    if (!password || !confirmPassword) {
      setAuthError('Please enter password and confirm password');
      return;
    }
    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters long');
      onToast('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match');
      onToast('Passwords do not match');
      return;
    }

    setAuthLoading(true);
    const roleName = accountType === 'admin' || (email && email.toLowerCase().includes('admin')) ? 'ADMIN' : (accountType === 'merchant' ? 'MERCHANT' : 'USER');

    const res = await OfferMatrixAPI.register({
      name: fullName,
      email,
      password,
      confirmPassword,
      roleName
    });

    setAuthLoading(false);

    if (res.error) {
      setAuthError(`Registration Failed: ${res.error}`);
      onToast(`Registration Failed: ${res.error}`);
    } else {
      setAuthSuccess(`Account created successfully! Logging you in...`);
      onToast(`Account created successfully! 🎉`);

      // Auto-verify email and automatically log user in so Dashboard opens immediately
      if (res.verificationToken) {
        await OfferMatrixAPI.verifyEmail(res.verificationToken);
      }

      const loginRes = await OfferMatrixAPI.login({ email, password });
      if (!loginRes.error && loginRes.user) {
        if (loginRes.token) {
          localStorage.setItem('offermatrix_token', loginRes.token);
        }
        onToast(`Welcome, ${loginRes.user.name}! 👋`);
        if (onLoginSuccess) {
          onLoginSuccess(loginRes.user);
        }
        onClose();
      } else {
        setAuthSuccess(`Account created! A verification link was sent to ${email}.`);
      }
    }
  };

  const handleSignInSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!email || !password) {
      setAuthError('Please enter your email and password');
      onToast('Please enter your email and password');
      return;
    }

    setAuthLoading(true);
    const res = await OfferMatrixAPI.login({ email, password });
    setAuthLoading(false);

    if (res.error) {
      setAuthError(`Login Failed: ${res.error}`);
      onToast(`Login Failed: ${res.error}`);
    } else {
      if (res.token) {
        localStorage.setItem('offermatrix_token', res.token);
      }
      onToast(`Welcome back, ${res.user.name}! 👋`);
      if (onLoginSuccess) {
        onLoginSuccess(res.user);
      }
      onClose();
    }
  };

  const handleSocialLogin = (provider) => {
    const typeLabel = isSignUp ? ` (${accountType.toUpperCase()})` : '';
    const isAdmin = accountType === 'admin' || (email && email.toLowerCase().includes('admin'));
    onToast(`Signing in with ${provider}${typeLabel}...`);
    setTimeout(() => {
      onToast(`Welcome! Signed in via ${provider}.`);
      if (onLoginSuccess) {
        onLoginSuccess({
          name: isAdmin ? 'Admin' : 'Meherunnesasetu7',
          email: isAdmin ? 'admin@offermatrix.com' : 'setumeherunnesa59@gmail.com',
          role: isAdmin ? 'admin' : (accountType || 'user')
        });
      }
      onClose();
    }, 800);
  };

  const getAccountTypeLabel = () => {
    if (accountType === 'merchant') return 'MERCHANT ACCOUNT';
    if (accountType === 'admin') return 'ADMIN ACCOUNT';
    return 'USER ACCOUNT';
  };

  return (
    <div className="auth-modal-overlay">
      <div className={`auth-modal-wrapper ${signUpStep === 'merchant_explore' ? 'explore-mode' : ''}`}>
        {/* Top Header Bar */}
        <div className="auth-top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              type="button"
              className="auth-header-back-btn"
              onClick={() => {
                if (signUpStep !== 'select' && isSignUp && signUpStep !== 'merchant_explore') {
                  setSignUpStep('select');
                } else {
                  onClose();
                }
              }}
            >
              <ArrowLeft size={16} color="#ff2b70" strokeWidth={2.5} />
              <span>Back to OfferMatrix</span>
            </button>

            <div className="logo-wrapper" onClick={onClose} style={{ cursor: 'pointer' }}>
              <div className="logo-icon">
                <Percent size={20} strokeWidth={3} />
              </div>
              <div className="logo-text">
                Offer<span>Matrix</span>
              </div>
            </div>
          </div>

          <div className="auth-top-header-right">
            <div className="auth-header-secure">
              <div className="auth-secure-green-circle">
                <ShieldCheck size={18} color="#ffffff" />
              </div>
              <div className="auth-secure-text">
                <span className="auth-secure-title">Secure &amp; Trusted</span>
                <span className="auth-secure-sub">Your data is protected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body Container */}
        {signUpStep === 'merchant_explore' ? (
          rideSubStep ? (
            <div className="merchant-explore-container ride-store-container" style={{ padding: '14px 24px 14px 24px', maxWidth: '1240px', margin: '0 auto', height: 'calc(100vh - 60px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f8fafc 100%)', position: 'relative', boxShadow: '0 20px 60px rgba(37, 99, 235, 0.08)', boxSizing: 'border-box' }}>
              {/* Background Decorative Glowing Ambient Orbs */}
              <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }}></div>
              <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none' }}></div>

              {/* Top Sub Navigation Bar */}
              <div className="explore-top-nav ride-top-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', position: 'relative', zIndex: 10, flexShrink: 0 }}>
                <button
                  type="button"
                  className="ride-back-btn"
                  onClick={() => {
                    if (initialCategory) {
                      onClose();
                    } else {
                      setRideSubStep(false);
                    }
                  }}
                  style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '1.5px solid #3b82f6', borderRadius: '99px', padding: '6px 18px', fontSize: '13px', fontWeight: 800, color: '#2563eb', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.12)', transition: 'all 0.2s ease' }}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', border: '1.5px solid #93c5fd', borderRadius: '99px', padding: '6px 18px', fontSize: '12px', fontWeight: 800, color: '#1d4ed8' }}>
                  <span style={{ fontSize: '15px' }}>⚡</span>
                  <span>BANGLADESH'S #1 RIDE FARE COMPARATOR</span>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', border: '1.5px solid #4ade80', borderRadius: '99px', padding: '6px 14px', fontSize: '12px', fontWeight: 800, color: '#15803d' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
                  <span>3,850+ Drivers Online</span>
                </div>
              </div>

              {/* Eyecatchy Hero Title & Headline */}
              <div className="explore-header-section" style={{ textAlign: 'center', marginBottom: '10px', position: 'relative', zIndex: 10, flexShrink: 0 }}>
                <h1 className="explore-main-title" style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 2px 0', letterSpacing: '-0.5px', fontFamily: "'Outfit', sans-serif" }}>
                  Choose Your <span style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 50%, #0d9488 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 6px rgba(37, 99, 235, 0.15))' }}>Ride Platform</span>
                </h1>
                <p className="explore-subtitle" style={{ fontSize: '13px', color: '#475569', maxWidth: '640px', margin: '0 auto 6px auto', lineHeight: '1.3', fontWeight: 500 }}>
                  Compare live fares, luxury sedan options, CNG rates &amp; instant promo codes across Bangladesh's top ride sharing platforms
                </p>

                <div className="explore-dots-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <span style={{ width: '28px', height: '5px', borderRadius: '99px', background: 'linear-gradient(90deg, #2563eb, #3b82f6)', display: 'inline-block' }}></span>
                  <span style={{ width: '10px', height: '5px', borderRadius: '99px', background: '#60a5fa', opacity: 0.8, display: 'inline-block' }}></span>
                  <span style={{ width: '6px', height: '5px', borderRadius: '99px', background: '#93c5fd', opacity: 0.5, display: 'inline-block' }}></span>
                </div>
              </div>

              {/* Visual Car Categories Grid (4 Compact Fleet Cards) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px', position: 'relative', zIndex: 10, flexShrink: 0 }}>
                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e2e8f0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=120&q=80" alt="AC Sedan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>AC Sedan Cars</div>
                    <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 700 }}>UberX &amp; OBHAI</div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #e2e8f0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=120&q=80" alt="Premium SUV" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Premium SUV</div>
                    <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: 700 }}>6 Passenger XL</div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #fef08a', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(245,158,11,0.04)', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=120&q=80" alt="CNG Auto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>CNG Auto</div>
                    <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 700 }}>Budget City Ride</div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', borderRadius: '14px', border: '1.5px solid #bbf7d0', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 2px 8px rgba(34,197,94,0.04)', cursor: 'pointer' }}>
                  <div style={{ width: '40px', height: '30px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=120&q=80" alt="Moto Ride" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Moto Ride</div>
                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>Fast Traffic Express</div>
                  </div>
                </div>
              </div>

              {/* 3 Main Eyecatchy Platform Cards Grid (Fits 100% inside screen) */}
              <div className="explore-cards-grid ride-stores-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', position: 'relative', zIndex: 10, flex: 1, minHeight: '0' }}>
                {/* UBER CARD */}
                <div
                  className="explore-card store-card uber-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('uber');
                    onToast('Opening Uber Bangladesh Official Hub! 🚗');
                  }}
                  style={{ background: '#ffffff', borderRadius: '18px', border: '2px solid #38bdf8', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 8px 24px rgba(56, 189, 248, 0.12)', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                >
                  {/* Car Photo Header */}
                  <div style={{ position: 'relative', height: '95px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
                      alt="Uber Sedan"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }}></div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '10px', background: '#000000', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '15px', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>
                      Uber
                    </div>
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'linear-gradient(135deg, #0284c7, #2563eb)', color: '#ffffff', padding: '3px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: 800 }}>
                      ⚡ 25% OFF
                    </span>
                  </div>

                  <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: '0 0 2px 0' }}>Uber Bangladesh</h3>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                        Go Anywhere With Uber • AC Sedans, XL &amp; Intercity
                      </p>

                      {/* Car Type Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '2px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🚗 UberX Sedan</span>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '2px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🚙 Uber XL</span>
                        <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '2px 7px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🏍️ Moto</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Starting Fare</div>
                        <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 900 }}>From ৳120</div>
                      </div>
                      <button type="button" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(15, 23, 42, 0.3)' }}>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* OBHAI CARD */}
                <div
                  className="explore-card store-card obhai-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('obhai');
                    onToast('Opening OBHAI Official Hub! 🚕');
                  }}
                  style={{ background: '#ffffff', borderRadius: '20px', border: '2px solid #fbbf24', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.12)', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                >
                  {/* Car Photo Header */}
                  <div style={{ position: 'relative', height: '105px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
                      alt="OBHAI Yellow Car"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }}></div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '10px', background: '#fbbf24', color: '#000000', padding: '3px 10px', borderRadius: '6px', fontSize: '15px', fontWeight: 900, fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      OBHAI <span style={{ fontSize: '9px', fontWeight: 800, color: '#451a03' }}>পৌঁছে দেশ</span>
                    </div>
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'linear-gradient(135deg, #d97706, #b45309)', color: '#ffffff', padding: '3px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: 800 }}>
                      🚕 CNG &amp; Car
                    </span>
                  </div>

                  <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: '0 0 2px 0' }}>OBHAI Rides</h3>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                        Safer Rides for a Better Tomorrow • CNG &amp; Microbus
                      </p>

                      {/* Car Type Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🛺 OBHAI CNG</span>
                        <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🚗 Express Sedan</span>
                        <span style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🚐 Microbus</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #fef3c7', paddingTop: '8px' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Starting Fare</div>
                        <div style={{ fontSize: '14px', color: '#b45309', fontWeight: 900 }}>From ৳80</div>
                      </div>
                      <button type="button" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)' }}>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* INDRIVER CARD */}
                <div
                  className="explore-card store-card indriver-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('indriver');
                    onToast('Selected inDriver Fares & Delivery! 🚘');
                    onClose();
                  }}
                  style={{ background: '#ffffff', borderRadius: '20px', border: '2px solid #4ade80', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.12)', display: 'flex', flexDirection: 'column', transition: 'all 0.2s ease' }}
                >
                  {/* Car Photo Header */}
                  <div style={{ position: 'relative', height: '105px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
                      alt="inDriver Modern Car"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)' }}></div>
                    <div style={{ position: 'absolute', bottom: '8px', left: '10px', background: '#22c55e', color: '#ffffff', padding: '3px 10px', borderRadius: '6px', fontSize: '15px', fontWeight: 900, fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 900 }}>iD</span>
                      inDriver
                    </div>
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#ffffff', padding: '3px 8px', borderRadius: '99px', fontSize: '10px', fontWeight: 800 }}>
                      💬 Bargain Live
                    </span>
                  </div>

                  <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: '0 0 2px 0' }}>inDriver City &amp; Intercity</h3>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0', lineHeight: '1.3' }}>
                        Your Ride, Your Price • Offer &amp; Bargain Directly
                      </p>

                      {/* Car Type Pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <span style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🚘 City Rides</span>
                        <span style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🏙️ Intercity</span>
                        <span style={{ background: '#dcfce7', color: '#166534', border: '1px solid #86efac', padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700 }}>🤝 Bargain</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #dcfce7', paddingTop: '8px' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Fare Strategy</div>
                        <div style={{ fontSize: '14px', color: '#15803d', fontWeight: 900 }}>Set Your Price</div>
                      </div>
                      <button type="button" style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)' }}>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Trust & Feature Ribbon */}
              <div style={{ marginTop: '10px', padding: '8px 16px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', gap: '10px', position: 'relative', zIndex: 10, flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#1e293b' }}>
                  <span style={{ fontSize: '14px' }}>⚡</span>
                  <span>Instant Fare Comparison</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#1e293b' }}>
                  <span style={{ fontSize: '14px' }}>🛡️</span>
                  <span>100% Verified Promos</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#1e293b' }}>
                  <span style={{ fontSize: '14px' }}>💳</span>
                  <span>Instant bKash &amp; Card Refunds</span>
                </div>
              </div>
            </div>
          ) : foodSubStep ? (
            <div className="merchant-explore-container food-store-container">
              {/* Sub Navigation Bar */}
              <div className="explore-top-nav food-top-nav" style={{ position: 'relative', zIndex: 100, marginTop: '12px', marginBottom: '16px' }}>
                <button
                  type="button"
                  className="skincare-back-btn food-back-btn"
                  onClick={() => {
                    if (initialCategory) {
                      onClose();
                    } else {
                      setFoodSubStep(false);
                    }
                  }}
                  style={{ position: 'relative', zIndex: 100, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '2px solid #ff2b70', borderRadius: '99px', padding: '10px 22px', fontSize: '14px', fontWeight: 800, color: '#ff2b70', boxShadow: '0 4px 16px rgba(255, 43, 112, 0.25)' }}
                >
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </button>

                <div className="skincare-pill-center food-pill-center" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff0f3', border: '1px solid #fecdd3', borderRadius: '99px', padding: '6px 18px', fontSize: '13px', fontWeight: 800, color: '#e11d48' }}>
                  <span>🍴</span>
                  <span>Food</span>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="dot dot-pink"></div>
              <div className="dot dot-orange"></div>
              <div className="dot dot-mint"></div>
              <div className="dot dot-purple"></div>

              <div className="skincare-float-text-left" style={{ color: '#ff2b70' }}>Good Food Happier You ♡</div>
              <div className="skincare-float-text-right" style={{ color: '#ff2b70' }}>Delicious Deals Everyday ♡</div>

              <div className="skincare-float-palette" style={{ fontSize: '32px' }}>🍔</div>
              <div className="skincare-float-lipstick" style={{ fontSize: '32px' }}>🍟</div>
              <div className="skincare-float-serum" style={{ fontSize: '32px' }}>🍲</div>
              <div className="skincare-float-heart" style={{ fontSize: '32px' }}>🧋</div>

              {/* Section Headline */}
              <div className="explore-header-section">
                <h1 className="explore-main-title">
                  Choose Your <span className="skincare-store-pink-text" style={{ color: '#ff2b70' }}>Food Platform</span>
                </h1>
                <p className="explore-subtitle">
                  Compare prices, explore offers and find the best food deals from top food delivery platforms
                </p>

                <div className="explore-dots-bar">
                  <span className="dot-pill dot-pink-pill" style={{ width: '28px' }}></span>
                  <span className="dot-pill dot-pink-pill" style={{ width: '12px', opacity: 0.6 }}></span>
                  <span className="dot-pill dot-pink-pill" style={{ width: '8px', opacity: 0.3 }}></span>
                </div>
              </div>

              {/* 3 Food Platform Cards Grid (EXACT MATCH TO REFERENCE SCREENSHOT 2) */}
              <div className="explore-cards-grid food-stores-grid">
                {/* FOODPANDA */}
                <div
                  className="explore-card store-card foodpanda-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('foodpanda');
                    onToast('Selected foodpanda platform! 🐼');
                    onClose();
                  }}
                  style={{ background: '#ffffff', borderRadius: '24px', border: '1.5px solid #f1f5f9', padding: '20px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s ease' }}
                >
                  <div className="store-logo-box" style={{ background: '#d70f64', height: '140px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>
                        🐼
                      </div>
                      <span style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.5px', color: '#ffffff', fontFamily: 'sans-serif' }}>
                        foodpanda
                      </span>
                    </div>
                  </div>

                  <h3 className="explore-card-title store-title" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0' }}>foodpanda</h3>
                  <p className="explore-card-desc store-desc" style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
                    Good Food Brings Us Together
                  </p>
                  <button type="button" className="explore-card-arrow-btn" style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#d70f64', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' }}>
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* FOODI */}
                <div
                  className="explore-card store-card foodi-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('foodi');
                    onToast('Selected foodi platform! 🍴');
                    onClose();
                  }}
                  style={{ background: '#ffffff', borderRadius: '24px', border: '1.5px solid #f1f5f9', padding: '20px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s ease' }}
                >
                  <div className="store-logo-box" style={{ background: '#fff8f6', border: '1.5px solid #fee2e2', height: '140px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '34px', fontWeight: 900, color: '#e11d48', fontFamily: 'sans-serif' }}>foodi</span>
                        <span style={{ fontSize: '24px' }}>🍴</span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#e11d48', letterSpacing: '1px' }}>
                        JUST ORDER &amp; SMILE
                      </span>
                    </div>
                  </div>

                  <h3 className="explore-card-title store-title" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0' }}>foodi</h3>
                  <p className="explore-card-desc store-desc" style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
                    Just Order &amp; Smile
                  </p>
                  <button type="button" className="explore-card-arrow-btn" style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e11d48', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' }}>
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* PATHAO */}
                <div
                  className="explore-card store-card pathao-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('pathao');
                    onToast('Selected Pathao Super App! 🛵');
                    onClose();
                  }}
                  style={{ background: '#ffffff', borderRadius: '24px', border: '1.5px solid #f1f5f9', padding: '20px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s ease' }}
                >
                  <div className="store-logo-box" style={{ background: '#fff5f5', border: '1.5px solid #fecdd3', height: '140px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e11d48', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#e11d48', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: 900 }}>
                        P
                      </div>
                      <span style={{ fontSize: '26px', fontWeight: 900, color: '#e11d48', fontFamily: 'sans-serif' }}>pathao</span>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.8px' }}>
                        HERE WITH YOU
                      </span>
                    </div>
                  </div>

                  <h3 className="explore-card-title store-title" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', margin: '0 0 4px 0' }}>pathao</h3>
                  <p className="explore-card-desc store-desc" style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
                    Here With You
                  </p>
                  <button type="button" className="explore-card-arrow-btn" style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#e11d48', color: '#ffffff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', cursor: 'pointer' }}>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              {/* Footer Cursive Banner */}
              <div className="explore-footer-cursive" style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>
                — Eat Better, Save More <span className="heart-pink" style={{ color: '#ff2b70' }}>♡</span> —
              </div>
            </div>
          ) : skincareSubStep ? (
            <div className="merchant-explore-container skincare-store-container">
              {/* Sub Navigation Bar */}
              <div className="explore-top-nav skincare-top-nav" style={{ position: 'relative', zIndex: 100, marginTop: '12px', marginBottom: '16px' }}>
                <button
                  type="button"
                  className="skincare-back-btn"
                  onClick={() => {
                    if (initialCategory) {
                      onClose();
                    } else {
                      setSkincareSubStep(false);
                    }
                  }}
                  style={{ position: 'relative', zIndex: 100, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ffffff', border: '2px solid #ff2b70', borderRadius: '99px', padding: '10px 22px', fontSize: '14px', fontWeight: 800, color: '#ff2b70', boxShadow: '0 4px 16px rgba(255, 43, 112, 0.25)' }}
                >
                  <ArrowLeft size={18} />
                  <span>Back</span>
                </button>

                <div className="skincare-pill-center">
                  <Sparkles size={14} color="#e11d48" />
                  <span>Skincare</span>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="dot dot-pink"></div>
              <div className="dot dot-orange"></div>
              <div className="dot dot-mint"></div>
              <div className="dot dot-purple"></div>

              <div className="skincare-float-text-left">Beauty Deals For You ♡</div>
              <div className="skincare-float-text-right">Look Good Save More ♡</div>
              <div className="skincare-float-palette">🎨</div>
              <div className="skincare-float-lipstick">💄</div>
              <div className="skincare-float-serum">🧴</div>
              <div className="skincare-float-heart">💕</div>

              {/* Section Headline */}
              <div className="explore-header-section">
                <h1 className="explore-main-title">
                  Choose Your <span className="skincare-store-pink-text">Skincare Store</span>
                </h1>
                <p className="explore-subtitle">
                  Compare prices, explore offers and find the best deals from top skincare stores
                </p>

                <div className="explore-dots-bar">
                  <span className="dot-pill dot-pink-pill" style={{ width: '28px' }}></span>
                  <span className="dot-pill dot-pink-pill" style={{ width: '12px', opacity: 0.6 }}></span>
                  <span className="dot-pill dot-pink-pill" style={{ width: '8px', opacity: 0.3 }}></span>
                </div>
              </div>

              {/* 3 Skincare Store Cards Grid */}
              <div className="explore-cards-grid skincare-stores-grid">
                {/* CHOICE LEGACY */}
                <div
                  className="explore-card store-card choice-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('choice_legacy');
                    onClose();
                  }}
                >
                  <div className="store-logo-box bg-slate-blue">
                    <div className="choice-logo-content">
                      <span className="choice-font-script">Choice</span>
                      <span className="choice-font-bold">LEGACY</span>
                      <span className="choice-font-sub">Your Ultimate Beauty Destination</span>
                    </div>
                  </div>

                  <h3 className="explore-card-title store-title">Choice Legacy</h3>
                  <p className="explore-card-desc store-desc">
                    Your Ultimate Beauty Destination
                  </p>
                  <button type="button" className="explore-card-arrow-btn store-btn-blue">
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* KIREI */}
                <div
                  className="explore-card store-card kirei-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('kirei');
                    onClose();
                  }}
                >
                  <div className="store-logo-box bg-peach-cream">
                    <div className="kirei-logo-content">
                      <div className="kirei-flower-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <path d="M20 5L24 15L35 15L26 21L30 32L20 25L10 32L14 21L5 15L16 15L20 5Z" fill="#e11d48" opacity="0.85" />
                        </svg>
                      </div>
                      <span className="kirei-font-bold">Kirei</span>
                      <span className="kirei-font-sub">Simply Caring</span>
                    </div>
                  </div>

                  <h3 className="explore-card-title store-title">Kirei</h3>
                  <p className="explore-card-desc store-desc">
                    Simply Caring
                  </p>
                  <button type="button" className="explore-card-arrow-btn store-btn-orange">
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* MAKEUP CHARI */}
                <div
                  className="explore-card store-card makeup-card"
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory('makeup_chari');
                    onClose();
                  }}
                >
                  <div className="store-logo-box bg-soft-pink">
                    <div className="makeup-logo-content">
                      <div className="makeup-m-icon">
                        <svg width="56" height="46" viewBox="0 0 56 46" fill="none">
                          <path d="M6 38C12 12 18 6 24 24C30 42 36 6 48 38" stroke="#881337" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="makeup-font-main">MAKEUP CHARI</span>
                    </div>
                  </div>

                  <h3 className="explore-card-title store-title">Makeup Chari</h3>
                  <p className="explore-card-desc store-desc">
                    Beauty for Every You
                  </p>
                  <button type="button" className="explore-card-arrow-btn store-btn-pink">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Footer Cursive Banner */}
              <div className="explore-footer-cursive">
                — Self Care, Better You <span className="heart-pink">♡</span> —
              </div>
            </div>
          ) : (
            <div className="merchant-explore-container">
              {/* Top Navigation / Back Button */}
              <div className="explore-top-nav">
                <button
                  type="button"
                  className="auth-back-to-types-btn"
                  onClick={() => {
                    setSignUpStep('select');
                    setAccountType('user');
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Account Types</span>
                </button>
              </div>

              {/* Floating Decorative Elements */}
              <div className="dot dot-pink"></div>
              <div className="dot dot-orange"></div>
              <div className="dot dot-mint"></div>
              <div className="dot dot-purple"></div>

              <div className="explore-float-gift">🎁</div>
              <div className="explore-float-pink-tag">%</div>
              <div className="explore-float-bags">🛍️</div>
              <div className="explore-float-purple-tag">%</div>
              <div className="explore-float-car">🚗</div>
              <div className="explore-float-leaves">🌿</div>

              {/* Explore Section Headline */}
              <div className="explore-header-section">
                <h1 className="explore-main-title">
                  What do you want to <span className="explore-gradient-text">explore?</span>
                </h1>
                <p className="explore-subtitle">
                  Compare, save and get the best deals across Food, Ride &amp; Skincare.
                </p>

                <div className="explore-dots-bar">
                  <span className="dot-pill dot-pink-pill"></span>
                  <span className="dot-pill dot-green-pill"></span>
                  <span className="dot-pill dot-blue-pill"></span>
                </div>
              </div>

              {/* 3 Explore Cards Grid */}
              <div className="explore-cards-grid">
                {/* FOOD CARD */}
                <div
                  className="explore-card food-card"
                  onMouseEnter={() => setHoveredExploreCard('food')}
                  onMouseLeave={() => setHoveredExploreCard(null)}
                  onClick={() => setFoodSubStep(true)}
                >
                  <div className="explore-card-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                      alt="Food Deals"
                      className="explore-card-real-img"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/assets/biryani.jpg'; }}
                    />
                  </div>

                  <h3 className="explore-card-title food-title">Food</h3>
                  <p className="explore-card-desc">
                    Compare best food deals from Foodpanda, Foodi, Pathao &amp; more
                  </p>
                  <button type="button" className="explore-card-arrow-btn food-btn">
                    <ArrowRight size={18} />
                  </button>

                  {/* HOVER POPUP FOR FOOD */}
                  {hoveredExploreCard === 'food' && (
                    <div className="explore-hover-popup popup-food" onClick={(e) => e.stopPropagation()}>
                      <div className="popup-header">
                        <div className="popup-badge bg-pink">🍔 Food Deals</div>
                        <span className="popup-status">🟢 4 Partners Active</span>
                      </div>
                      <ul className="popup-offers-list">
                        <li>
                          <strong>Foodpanda:</strong> Up to 50% OFF BOGO Meals &amp; Free Delivery
                        </li>
                        <li>
                          <strong>Foodi:</strong> Flat ৳100 Cashback with <code>SAVE100</code>
                        </li>
                        <li>
                          <strong>Pathao Food:</strong> 30% OFF on top restaurants
                        </li>
                        <li>
                          <strong>KFC &amp; Burger King:</strong> Combos from ৳199
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="popup-cta-btn btn-food"
                        onClick={() => {
                          if (onSelectCategory) onSelectCategory('food');
                          onClose();
                        }}
                      >
                        Explore Food Deals →
                      </button>
                    </div>
                  )}
                </div>

                {/* RIDE CARD */}
                <div
                  className="explore-card ride-card"
                  onMouseEnter={() => setHoveredExploreCard('ride')}
                  onMouseLeave={() => setHoveredExploreCard(null)}
                  onClick={() => setRideSubStep(true)}
                >
                  <div className="explore-card-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
                      alt="Ride Fares"
                      className="explore-card-real-img"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/assets/blue_car.jpg'; }}
                    />
                  </div>

                  <h3 className="explore-card-title ride-title">Ride</h3>
                  <p className="explore-card-desc">
                    Find the best ride fares from Uber, Obhai, inDrive &amp; more
                  </p>
                  <button type="button" className="explore-card-arrow-btn ride-btn">
                    <ArrowRight size={18} />
                  </button>

                  {/* HOVER POPUP FOR RIDE */}
                  {hoveredExploreCard === 'ride' && (
                    <div className="explore-hover-popup popup-ride" onClick={(e) => e.stopPropagation()}>
                      <div className="popup-header">
                        <div className="popup-badge bg-blue">🚗 Ride Fares</div>
                        <span className="popup-status">🟢 Lowest Fare Guarantee</span>
                      </div>
                      <ul className="popup-offers-list">
                        <li>
                          <strong>Uber:</strong> Save up to 25% on UberX &amp; Intercity
                        </li>
                        <li>
                          <strong>Pathao Rides:</strong> 15% Instant Discount on Bike rides
                        </li>
                        <li>
                          <strong>inDrive:</strong> Bargain best fares across town
                        </li>
                        <li>
                          <strong>Obhai:</strong> Flat ৳50 OFF CNG &amp; Car bookings
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="popup-cta-btn btn-ride"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRideSubStep(true);
                        }}
                      >
                        Compare Ride Fares →
                      </button>
                    </div>
                  )}
                </div>

                {/* SKINCARE CARD */}
                <div
                  className="explore-card skincare-card"
                  onMouseEnter={() => setHoveredExploreCard('skincare')}
                  onMouseLeave={() => setHoveredExploreCard(null)}
                  onClick={() => setSkincareSubStep(true)}
                >
                  <div className="explore-card-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
                      alt="Skincare Offers"
                      className="explore-card-real-img"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/assets/skincare.jpg'; }}
                    />
                  </div>

                  <h3 className="explore-card-title skincare-title">Skincare</h3>
                  <p className="explore-card-desc">
                    Compare skincare deals from Choice Legacy, Kirei, Makeup Chari &amp; more
                  </p>
                  <button type="button" className="explore-card-arrow-btn skincare-btn">
                    <ArrowRight size={18} />
                  </button>

                  {/* HOVER POPUP FOR SKINCARE */}
                  {hoveredExploreCard === 'skincare' && (
                    <div className="explore-hover-popup popup-skincare" onClick={(e) => e.stopPropagation()}>
                      <div className="popup-header">
                        <div className="popup-badge bg-amber">🧴 Skincare Offers</div>
                        <span className="popup-status">🟢 100% Authentic Brands</span>
                      </div>
                      <ul className="popup-offers-list">
                        <li>
                          <strong>Choice Legacy:</strong> Buy 1 Get 1 Free on Cleansers
                        </li>
                        <li>
                          <strong>Kirei:</strong> 20% OFF Sunscreens, Serums &amp; Cleansers
                        </li>
                        <li>
                          <strong>Makeup Chari:</strong> Extra 10% OFF Korean Skincare
                        </li>
                        <li>
                          <strong>The Mall:</strong> Free Shipping on orders over ৳1,000
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="popup-cta-btn btn-skincare"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSkincareSubStep(true);
                        }}
                      >
                        Explore Skincare Deals →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Cursive Banner */}
              <div className="explore-footer-cursive">
                Save More, Live Better <span className="heart-pink">♡</span>
              </div>
            </div>
          )
        ) : (
          <div className="auth-modal-body">
            {/* Left Panel: Branding */}
            <div className="auth-left-panel">
              {/* Background floating colorful dots */}
              <div className="dot dot-pink"></div>
              <div className="dot dot-orange"></div>
              <div className="dot dot-mint"></div>
              <div className="dot dot-purple"></div>

              {/* Floating Decorative Badges & Icons */}
              {!isSignUp ? (
                <>
                  <div className="auth-float-tag-pink">
                    <Percent size={22} color="#ffffff" strokeWidth={3} />
                  </div>
                  <div className="auth-float-check-circle"><span>✓</span></div>
                  <div className="auth-float-balloon">🎈</div>
                  <div className="auth-float-gift-box">🎁</div>
                  <div className="auth-float-food-bowl">🍲</div>
                  <div className="auth-float-car">🚗</div>
                  <div className="auth-float-bags">🛍️</div>
                </>
              ) : (
                <>
                  <div className="auth-float-gift-box-left">🎁</div>
                  <div className="auth-float-bags-left">🛍️</div>
                  <div className="auth-float-purple-tag">
                    <Percent size={22} color="#ffffff" strokeWidth={3} />
                  </div>
                  <div className="auth-float-car-right">🚗</div>
                  <div className="auth-float-balloon-right">📍</div>
                  <div className="auth-float-food-bowl-right">🍲</div>
                </>
              )}

              {/* Main Branding Content */}
              <div className="auth-left-content">
                {isSignUp ? (
                  <>
                    {signUpStep === 'details' && (
                      <button
                        type="button"
                        className="auth-back-to-types-btn"
                        onClick={() => setSignUpStep('select')}
                      >
                        <ArrowLeft size={14} />
                        <span>Back to account types</span>
                      </button>
                    )}

                    {signUpStep === 'details' && (
                      <div className="auth-user-account-badge">
                        <User size={14} color="#ff2b70" />
                        <span>{getAccountTypeLabel()}</span>
                      </div>
                    )}

                    <h1 className="auth-join-title">
                      Join <span className="auth-brand-pink">Offer</span><span className="auth-brand-green">Matrix</span>
                    </h1>
                    <p className="auth-join-subtitle">
                      {signUpStep === 'details'
                        ? 'Complete your registration to get started'
                        : 'Start your smart saving journey'}
                    </p>

                    {signUpStep !== 'details' && (
                      <p className="auth-left-desc margin-bottom-lg">
                        Compare prices, find the best deals and save more on everything you love.
                      </p>
                    )}

                    {/* 4 Feature Rows Stacked Vertically */}
                    <div className="auth-vertical-features">
                      <div className="auth-v-feature-item">
                        <div className="v-feature-icon icon-green">🏷️</div>
                        <div className="v-feature-text">
                          <strong>Best Prices</strong>
                          <span>Compare and get the lowest prices</span>
                        </div>
                      </div>

                      <div className="auth-v-feature-item">
                        <div className="v-feature-icon icon-pink">%</div>
                        <div className="v-feature-text">
                          <strong>Top Offers</strong>
                          <span>Exclusive deals &amp; coupons just for you</span>
                        </div>
                      </div>

                      <div className="auth-v-feature-item">
                        <div className="v-feature-icon icon-blue">৳</div>
                        <div className="v-feature-text">
                          <strong>Save More</strong>
                          <span>Stack offers and save extra every time</span>
                        </div>
                      </div>

                      <div className="auth-v-feature-item">
                        <div className="v-feature-icon icon-purple">🛡️</div>
                        <div className="v-feature-text">
                          <strong>Safe &amp; Secure</strong>
                          <span>Your data is 100% safe and secure</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="auth-welcome-pill">
                      <span>🎉 WELCOME BACK</span>
                    </div>

                    <h1 className="auth-left-title">
                      Welcome Back to <span className="auth-brand-green">OfferMatrix</span>
                    </h1>

                    <p className="auth-left-desc">
                      Sign in to continue comparing the best prices, finding top deals and saving more every day.
                    </p>

                    <div className="auth-features-row">
                      <div className="auth-feature-pill">
                        <div className="feature-icon-box box-green">🏷️</div>
                        <div className="feature-text">
                          <strong>Best Prices</strong>
                          <span>Compare &amp; find lowest prices</span>
                        </div>
                      </div>

                      <div className="auth-feature-pill">
                        <div className="feature-icon-box box-pink">%</div>
                        <div className="feature-text">
                          <strong>Top Offers</strong>
                          <span>Exclusive deals &amp; coupons</span>
                        </div>
                      </div>

                      <div className="auth-feature-pill">
                        <div className="feature-icon-box box-blue">🛡️</div>
                        <div className="feature-text">
                          <strong>Safe &amp; Secure</strong>
                          <span>Your data is 100% safe with us</span>
                        </div>
                      </div>
                    </div>

                    <div className="auth-quote-box">
                      <span className="quote-mark">“</span>
                      <p className="quote-text">
                        "Smart people don't pay more — they find better deals."
                      </p>
                      <p className="quote-author">
                        — Save Smarter. Live Better with <span className="quote-brand">OfferMatrix</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Panel: Form / Account Selector / Details View */}
            <div className="auth-right-panel">
              {isSignUp ? (
                signUpStep === 'select' ? (
                  /* Create Account Step 1: Choose Account Type */
                  <div className="auth-account-type-card">
                    <h2 className="account-type-title">Choose Your Account Type</h2>
                    <p className="account-type-subtitle">
                      Select the account type that best describes you to get started
                    </p>

                    {/* 3 Account Cards Grid */}
                    <div className="account-type-grid">
                      {/* User Account */}
                      <div
                        className={`account-card ${accountType === 'user' ? 'selected' : ''}`}
                        onClick={() => handleSelectAccountType('user')}
                      >
                        {accountType === 'user' && (
                          <div className="account-check-badge">
                            <Check size={12} color="#ffffff" strokeWidth={3} />
                          </div>
                        )}
                        <div className="account-icon-circle circle-pink">
                          <User size={20} color="#ff2b70" />
                        </div>
                        <h3 className="account-card-title">User Account</h3>
                        <p className="account-card-desc">
                          Find the best deals, compare and save more
                        </p>
                      </div>

                      {/* Merchant Account */}
                      <div
                        className={`account-card ${accountType === 'merchant' ? 'selected' : ''}`}
                        onClick={() => handleSelectAccountType('merchant')}
                      >
                        {accountType === 'merchant' && (
                          <div className="account-check-badge">
                            <Check size={12} color="#ffffff" strokeWidth={3} />
                          </div>
                        )}
                        <div className="account-icon-circle circle-green">
                          <Store size={18} color="#00c853" />
                        </div>
                        <h3 className="account-card-title">Merchant Account</h3>
                        <p className="account-card-desc">
                          Manage your store, offers and products
                        </p>
                      </div>

                      {/* Admin Account */}
                      <div
                        className={`account-card ${accountType === 'admin' ? 'selected' : ''}`}
                        onClick={() => handleSelectAccountType('admin')}
                      >
                        {accountType === 'admin' && (
                          <div className="account-check-badge">
                            <Check size={12} color="#ffffff" strokeWidth={3} />
                          </div>
                        )}
                        <div className="account-icon-circle circle-blue">
                          <ShieldCheck size={18} color="#3b82f6" />
                        </div>
                        <h3 className="account-card-title">Admin Account</h3>
                        <p className="account-card-desc">
                          Manage platform, users and system
                        </p>
                      </div>
                    </div>

                    {/* Social Divider */}
                    <div className="auth-divider">
                      <span>or continue with</span>
                    </div>

                    {/* Social Buttons */}
                    <div className="auth-social-grid">
                      <button
                        type="button"
                        className="auth-social-btn"
                        onClick={() => handleSocialLogin('Google')}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Continue with Google</span>
                      </button>

                      <button
                        type="button"
                        className="auth-social-btn"
                        onClick={() => handleSocialLogin('Facebook')}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Continue with Facebook</span>
                      </button>
                    </div>

                    {/* Footer Link */}
                    <div className="auth-form-footer" style={{ marginTop: '20px' }}>
                      <div className="auth-switch-text">
                        Already have an account?{' '}
                        <button
                          type="button"
                          className="auth-switch-link"
                          onClick={() => setIsSignUp(false)}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Create Account Step 2: Details Registration Form (EXACT MATCH TO REFERENCE IMAGE) */
                  <div className="auth-details-wrapper">
                    <div className="auth-details-card">
                      {/* Stepper Header inside Card */}
                      <div className="auth-stepper-bar">
                        {/* Step 1: Account Type */}
                        <div
                          className="stepper-step completed"
                          onClick={() => setSignUpStep('select')}
                          title="Click to change account type"
                        >
                          <div className="step-circle step-check">
                            <Check size={12} color="#ffffff" strokeWidth={3} />
                          </div>
                          <span className="step-label active-pink">Account Type</span>
                        </div>

                        <div className="stepper-line line-pink"></div>

                        {/* Step 2: Your Details */}
                        <div className="stepper-step active">
                          <div className="step-circle step-pink">2</div>
                          <span className="step-label active-pink">Your Details</span>
                        </div>

                        <div className="stepper-line line-gray"></div>

                        {/* Step 3: Verify */}
                        <div className="stepper-step">
                          <div className="step-circle step-gray">3</div>
                          <span className="step-label">Verify</span>
                        </div>
                      </div>

                      {/* Centered User Account Badge */}
                      <div className="auth-card-user-badge">
                        <User size={13} color="#ff2b70" />
                        <span>{getAccountTypeLabel()}</span>
                      </div>

                      {/* Title & Subtitle */}
                      <h2 className="auth-details-title">Create Your Account</h2>
                      <p className="auth-details-subtitle">Fill in your details to get started</p>

                      {/* Inline Alert Banners */}
                      {authError && (
                        <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', color: '#991b1b', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: authError.toLowerCase().includes('already exists') ? '8px' : '0' }}>
                            <span>⚠️</span>
                            <span>{authError}</span>
                          </div>
                          {authError.toLowerCase().includes('already exists') && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsSignUp(false);
                                setAuthError('');
                                setAuthSuccess('');
                              }}
                              style={{ background: '#ff2b70', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Click here to Sign In with this email 🔑
                            </button>
                          )}
                        </div>
                      )}

                      {authSuccess && (
                        <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', color: '#166534', padding: '12px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: pendingToken ? '8px' : '0' }}>
                            <span>✅</span>
                            <span>{authSuccess}</span>
                          </div>
                          {pendingToken && (
                            <button
                              type="button"
                              onClick={async () => {
                                setAuthLoading(true);
                                const vRes = await OfferMatrixAPI.verifyEmail(pendingToken);
                                setAuthLoading(false);
                                if (vRes.error) {
                                  setAuthError(vRes.error);
                                } else {
                                  setAuthSuccess('Email verified successfully! You can now Sign In.');
                                  setPendingToken('');
                                  onToast('Email verified successfully! 🎉');
                                }
                              }}
                              style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '4px' }}
                            >
                              Click to Instant Verify Email Now ⚡
                            </button>
                          )}
                        </div>
                      )}

                      {/* Registration Form */}
                      <form onSubmit={handleSignUpSubmit} className="auth-details-form">
                        {/* Row 1: Full Name & Email Address */}
                        <div className="auth-form-row">
                          <div className="auth-input-group">
                            <div className="auth-input-wrapper">
                              <User size={18} className="auth-input-icon" />
                              <input
                                type="text"
                                className="auth-input"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="auth-input-group">
                            <div className="auth-input-wrapper">
                              <Mail size={18} className="auth-input-icon" />
                              <input
                                type="email"
                                className="auth-input"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Phone Number & Password */}
                        <div className="auth-form-row">
                          <div className="auth-input-group">
                            <div className="auth-input-wrapper">
                              <Phone size={18} className="auth-input-icon" />
                              <input
                                type="tel"
                                className="auth-input"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="auth-input-group">
                            <div className="auth-input-wrapper">
                              <Lock size={18} className="auth-input-icon" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="auth-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <button
                                type="button"
                                className="auth-eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                              >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Confirm Password (Full Width) */}
                        <div className="auth-input-group">
                          <div className="auth-input-wrapper">
                            <Check size={18} className="auth-input-icon" />
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              className="auth-input"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="auth-eye-btn"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              tabIndex={-1}
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="auth-terms-row">
                          <label className="auth-checkbox-label">
                            <input
                              type="checkbox"
                              checked={agreeTerms}
                              onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            <span className="checkbox-text">
                              I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="auth-pink-link">Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="auth-pink-link">Privacy Policy</a>
                            </span>
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="auth-submit-btn-pink"
                          onClick={handleSignUpSubmit}
                          disabled={authLoading}
                          style={{ opacity: authLoading ? 0.7 : 1, cursor: authLoading ? 'not-allowed' : 'pointer' }}
                        >
                          <span>{authLoading ? 'Creating Account...' : 'Create Account'}</span>
                          <ArrowRight size={18} />
                        </button>
                      </form>

                      {/* Already have an account? Sign In */}
                      <div className="auth-signin-row">
                        <span>Already have an account?</span>
                        <button
                          type="button"
                          className="auth-switch-link"
                          onClick={() => {
                            setIsSignUp(false);
                            setSignUpStep('select');
                          }}
                        >
                          Sign In
                        </button>
                      </div>

                      {/* Premium Care Features Section */}
                      <div className="auth-premium-section">
                        <div className="auth-premium-header">
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          <span>PREMIUM CARE FEATURES</span>
                        </div>
                        <div className="auth-premium-grid">
                          <div className="premium-card bg-yellow">
                            <span className="premium-emoji">🔔</span>
                            <span className="premium-title">Price Alerts</span>
                          </div>
                          <div className="premium-card bg-pink">
                            <span className="premium-emoji">💰</span>
                            <span className="premium-title">Exclusive Deals</span>
                          </div>
                          <div className="premium-card bg-pink-flash">
                            <span className="premium-emoji">⚡</span>
                            <span className="premium-title">Flash Sales</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Page Footer at the bottom */}
                    <div className="auth-page-footer">
                      <p>© 2025 OfferMatrix. All rights reserved.</p>
                      <div className="auth-footer-links">
                        <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                        <span>·</span>
                        <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                        <span>·</span>
                        <a href="#help" onClick={(e) => e.preventDefault()}>Help Center</a>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* Sign In View */
                <div className="auth-form-container">
                  <div className="auth-form-header">
                    <h2 className="auth-form-title">Sign In</h2>
                    <p className="auth-form-subtitle">
                      Enter your credentials to continue your journey
                    </p>
                  </div>

                  {/* Inline Alert Banners */}
                  {authError && (
                    <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', color: '#991b1b', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>⚠️</span>
                      <span>{authError}</span>
                    </div>
                  )}

                  {authSuccess && (
                    <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', color: '#166534', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>✅</span>
                      <span>{authSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleSignInSubmit} className="auth-form">
                    {/* Email / Phone Input */}
                    <div className="auth-input-group">
                      <label className="auth-label">Email or Phone Number</label>
                      <div className="auth-input-wrapper">
                        <Mail size={18} className="auth-input-icon" />
                        <input
                          type="text"
                          className="auth-input"
                          placeholder="setumeherunnesa59@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="auth-input-group">
                      <div className="auth-label-row">
                        <label className="auth-label">Password</label>
                        <button
                          type="button"
                          className="auth-forgot-link"
                          onClick={() => onToast('Password reset link sent to your email.')}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="auth-input-wrapper">
                        <Lock size={18} className="auth-input-icon" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="auth-input"
                          placeholder="••••••••••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="auth-eye-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="auth-options-row">
                      <label className="auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className="checkbox-text">Remember me</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="auth-submit-btn"
                      onClick={handleSignInSubmit}
                      disabled={authLoading}
                      style={{ opacity: authLoading ? 0.7 : 1, cursor: authLoading ? 'not-allowed' : 'pointer' }}
                    >
                      <span>{authLoading ? 'Signing In...' : 'Sign In'}</span>
                      <ArrowRight size={18} />
                    </button>
                  </form>

                  {/* Social Divider */}
                  <div className="auth-divider">
                    <span>or continue with</span>
                  </div>

                  {/* Social Buttons */}
                  <div className="auth-social-grid">
                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() => handleSocialLogin('Google')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() => handleSocialLogin('Facebook')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Continue with Facebook</span>
                    </button>
                  </div>

                  {/* Footer Links inside Form */}
                  <div className="auth-form-footer">
                    <div className="auth-switch-text">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        className="auth-switch-link"
                        onClick={() => {
                          setIsSignUp(true);
                          setSignUpStep('select');
                        }}
                      >
                        Create Account
                      </button>
                    </div>

                    <div className="auth-encrypted-badge">
                      <Shield size={14} color="#6b7280" />
                      <span>Secure &amp; Encrypted</span>
                    </div>

                    <button type="button" className="auth-back-btn" onClick={onClose}>
                      <ArrowLeft size={14} />
                      <span>Back to Landing Page</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
