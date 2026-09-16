import React, { useState } from 'react';
import {
  ArrowLeft, Search, ShoppingBag, User, Heart, Star, MapPin, Globe, X,
  MessageCircle, Send, Sparkles, Percent, Tag, ShieldCheck, Check, Navigation, Phone, Smartphone, ChevronRight,
  Car, Bike, Package, CreditCard, UtensilsCrossed, Shield, Download, Zap
} from 'lucide-react';

export default function PathaoPage({ onBack, onToast, onAddToCart, offers = [] }) {
  const [activeTab, setActiveTab] = useState('bike'); // 'bike', 'car', 'food', 'parcel', 'pay'
  const [lang, setLang] = useState('bn'); // 'bn' or 'en'

  // AI Pathao Support Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: lang === 'bn' 
        ? "হ্যালো! 🛵 পাঠাও #HereWithYou সিস্টেমে স্বাগতম! রাইড বুকিং, ফুড ডেলিভারি, পার্সেল কুরিয়ার বা আয় করার বিষয় জানতে জিজ্ঞেস করুন।"
        : "Hello! 🛵 Welcome to Pathao #HereWithYou! Ask about Bike, Car, Food delivery, Parcel courier, or how to earn with Pathao.",
      time: 'Just now'
    }
  ]);

  // Tab Content Data (Matching Screenshots 2 & 3)
  const tabContent = {
    bike: {
      titleBn: 'জ্যাম থেকে বাঁচুন, সময় বাঁচান',
      descBn: 'অসহনীয় ট্রাফিক জ্যাম থেকে বাঁচার একমাত্র সমাধান পাঠাও বাইক! সাশ্রয়ী মূল্যে, সময় বাঁচিয়ে গন্তব্যস্থলে পৌঁছে যান সময়মতো।',
      titleEn: 'Beat traffic jams, save precious time',
      descEn: 'Pathao Bike is your ultimate solution to bypass city traffic. Reach your destination safely and affordably on time.',
      points: [
        {
          titleBn: 'আমরা আছি আপনার সাথে',
          descBn: 'আমাদের প্রতিটি রাইড নিরাপদ এবং সেফটি কাভারেজ সার্ভিস অন্তর্ভুক্ত, যার কারণে আমাদের সাথে আপনার প্রতিটি রাইড হবে অনেক বেশি নিরাপদ।'
        },
        {
          titleBn: 'সব সময় এভেইলএবল',
          descBn: 'ভোর সকাল কিংবা গভীর রাত, যেকোনো সময়েই আমাদের প্রশিক্ষিত রাইডাররা প্রস্তুত আপনার নিরাপদ রাইড নিশ্চিত করতে।'
        }
      ],
      mapImg: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
      actionText: 'বাইক রাইড বুক করুন ➔'
    },
    car: {
      titleBn: 'বেঁচে নিন আপনার পছন্দের অপশন',
      descBn: 'বাজেট টাইট? ব্যবহার করুন পাঠাও কার লাইট! এসি কারে ট্রাভেল করতে চান? ব্যবহার করুন পাঠাও কার প্লাস।',
      titleEn: 'Choose your preferred ride option',
      descEn: 'Budget tight? Choose Pathao Car Lite! Want premium AC travel? Upgrade to Pathao Car Plus.',
      points: [
        {
          titleBn: 'নিরাপদ ও আরামদায়ক ট্রাভেল',
          descBn: 'আমাদের প্রতিটি ক্যাব সর্বোচ্চ সেফটি স্ট্যান্ডার্ড মেনে চলে। পরিবার বা একা রাইডে সর্বোচ্চ কমফোর্ট পান।'
        },
        {
          titleBn: 'সাশ্রয়ী ভাড়া ও ডিসকাউন্ট',
          descBn: 'প্রতিটি রাইডে পান সেরা কম ভাড়া ও বিকাশ পেমেন্টে ক্যাশব্যাক সুবিধা।'
        }
      ],
      mapImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      actionText: 'কার রাইড বুক করুন ➔'
    },
    food: {
      titleBn: 'সেরা রেস্তোরাঁর খাবার আপনার দরজায়',
      descBn: 'ক্ষুধা পেলেই পাঠান পাঠাও ফুড! ঢাকার সেরা রেস্তোরাঁ থেকে ৩০ মিনিটে গরম গরম খাবার পৌঁছাবে আপনার কাছে।',
      titleEn: 'Top restaurant dishes delivered hot',
      descEn: 'Hungry? Pathao Food delivers hot meals from top city restaurants directly to your doorstep in 30 minutes.',
      points: [
        {
          titleBn: 'বিশাল অফার ও ফ্রি ডেলিভারি',
          descBn: 'প্রতিদিন পান ৫০% পর্যন্ত ছাড় ও নির্বাচিত রেস্তোরাঁয় ফ্রি ডেলিভারি অফার।'
        },
        {
          titleBn: 'লাইভ জিপিএস ট্র্যাকিং',
          descBn: 'অর্ডার করার পর রাইডারের অবস্থান রিয়েল টাইমে অ্যাপ ম্যাপে ট্র্যাক করুন।'
        }
      ],
      mapImg: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      actionText: 'ফুড অর্ডার করুন ➔'
    },
    parcel: {
      titleBn: 'নিরাপদে পার্সেল পাঠান দ্রুততম সময়ে',
      descBn: 'জরুরি ডকুমেন্ট বা গিফট? পাঠাও পার্সেলের মাধ্যমে ঢাকার যেকোনো প্রান্তে ৩০-৬০ মিনিটে পার্সেল ডেলিভারি পান।',
      titleEn: 'Send parcels safely within hours',
      descEn: 'Urgent document or gift package? Pathao Parcel delivers to any corner of the city reliably within 30-60 mins.',
      points: [
        {
          titleBn: 'লাইভ লোকেশন ট্র্যাকিং',
          descBn: 'সেন্ডার ও রিসিভার উভয়েই পার্সেল ডেলিভারি রিয়েল টাইমে ম্যাপে দেখতে পারবেন।'
        },
        {
          titleBn: 'কুরিয়ার ও ক্যাশ অন ডেলিভারি',
          descBn: 'ব্যবসার পার্সেল পাঠাতে ক্যাশ অন ডেলিভারি এবং দ্রুত পেমেন্ট ডিসবার্সমেন্ট পান।'
        }
      ],
      mapImg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      actionText: 'পার্সেল পাঠান ➔'
    },
    pay: {
      titleBn: 'ক্যাশলেস ডিজিটাল পেমেন্ট পাঠাও পে',
      descBn: 'রাইড, ফুড বা পার্সেলের বিল পরিশোধ করুন ক্যাশলেস পাঠাও পে দিয়ে। পান আকর্ষণীয় ক্যাশব্যাক!',
      titleEn: 'Cashless digital payments with Pathao Pay',
      descEn: 'Pay seamlessly for rides, food orders, and parcels with Pathao Pay. Enjoy instant cashback rewards!',
      points: [
        {
          titleBn: '১ সেকেন্ডে পেমেন্ট',
          descBn: 'যেকোনো রাইড বা ফুড বিল মুহূর্তেই পে করুন ওয়ালেট ব্যালেন্স থেকে।'
        },
        {
          titleBn: 'নিরাপদ এনক্রিপ্টেড ওয়ালেট',
          descBn: 'বাংলাদেশ ব্যাংক অনুমোদিত ডিজিটাল পেমেন্ট ওয়ালেট নিরাপত্তা।'
        }
      ],
      mapImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      actionText: 'পাঠাও পে এক্সপ্লোর করুন ➔'
    }
  };

  // AI Chat Handler
  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('earn') || lower.includes('আয়') || lower.includes('rider') || lower.includes('driver')) {
        botReply = "💼 **পাঠাও ড্রাইভ/রাইড দিয়ে আয় করুন**: পাঠাও অ্যাপে বাইক, কার বা সাইকেল রেজিস্টার করে মাসে ৳৩০,০০০+ পর্যন্ত আয় করুন! 'আয় করুন' বাটনে ক্লিক করে আজই যোগ দিন।";
      } else if (lower.includes('bike') || lower.includes('বাইক') || lower.includes('ride') || lower.includes('ভাড়া')) {
        botReply = "🛵 **পাঠাও বাইক রাইড**: ট্রাফিক জ্যাম ছাড়াই দ্রুত গন্তব্যে পৌঁছান। বেস ফেয়ার ৳৩০, প্রতি কিমি ৳১২। প্রোমো কোড `PATHAO20` দিয়ে পান ২০% ডিসকাউন্ট!";
      } else if (lower.includes('food') || lower.includes('ফুড') || lower.includes('খাবার')) {
        botReply = "🍔 **পাঠাও ফুড ডেলিভারি**: Kacchi Bhai, Takeout, Pizzaburg সহ সেরা রেস্তোরাঁর খাবারে পান ৫০% পর্যন্ত ছাড় ও দ্রুত ৩০ মিনিটে ডেলিভারি!";
      } else if (lower.includes('parcel') || lower.includes('পার্সেল')) {
        botReply = "📦 **পাঠাও পার্সেল কুরিয়ার**: ঢাকার মধ্যে মাত্র ৳৬০ থেকে ডকুমেন্ট ও পার্সেল পাঠান ৩০ মিনিটে!";
      } else {
        botReply = lang === 'bn'
          ? `ধন্যবাদ পাঠাও সাথে থাকার জন্য! "${query}" নিয়ে যেকোনো সহায়তায় পাঠাও সুপার অ্যাপ ব্যবহার করুন বা আমাদের হেল্পলাইনে কল দিন।`
          : `Thanks for connecting with Pathao! For "${query}", use the Pathao Super App or reach our 24/7 hotline.`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const currentTabData = tabContent[activeTab] || tabContent.bike;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', 'Inter', 'Noto Sans Bengali', sans-serif", color: '#111827' }}>

      {/* Top Floating Back to OfferMatrix Ribbon */}
      <div style={{ background: '#111827', color: '#ffffff', padding: '8px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10000 }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #e11d48, #be123c)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '99px',
            padding: '7px 18px',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to OfferMatrix</span>
        </button>

        <div style={{ fontSize: '13px', fontWeight: 700, color: '#f3f4f6' }}>
          🔴 Pathao Bangladesh • দেশের ১ নম্বর সুপার অ্যাপ • #HereWithYou
        </div>

        <button
          onClick={() => onToast('Pathao Hotline: 09610007368')}
          style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '6px', padding: '4px 12px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
        >
          Helpline: 09610007368
        </button>
      </div>

      {/* PATHAO MAIN TOP HEADER (Matching Screenshots 1-5) */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: '41px', zIndex: 9000 }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Pathao Red Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => onToast('Pathao Home')}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e11d48', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900 }}>
              P
            </div>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#e11d48', letterSpacing: '-0.8px' }}>
              pathao
            </span>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Pathao Driver Registration')}>
              <span>আয় করুন</span>
              <span style={{ fontSize: '11px' }}>▾</span>
            </div>

            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Pathao Services List')}>
              <span>সার্ভিসসমূহ</span>
              <span style={{ fontSize: '11px' }}>▾</span>
            </div>

            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Pathao Support & Help')}>
              <span>হেল্প</span>
              <span style={{ fontSize: '11px' }}>▾</span>
            </div>

            <div style={{ cursor: 'pointer' }} onClick={() => onToast('Pathao Official Blog')}>
              <span>ব্লগ</span>
            </div>

            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Pathao Careers')}>
              <span>ক্যারিয়ার</span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
            </div>

            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('More Pathao Offers')}>
              <span>আরো</span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48' }}></span>
              <span style={{ fontSize: '11px' }}>▾</span>
            </div>
          </div>

          {/* Language Switcher */}
          <div 
            onClick={() => {
              const newLang = lang === 'bn' ? 'en' : 'bn';
              setLang(newLang);
              onToast(`Language switched to ${newLang === 'bn' ? 'বাংলা' : 'English'}`);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 800, color: '#111827', cursor: 'pointer', background: '#f8fafc', padding: '6px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          >
            <Globe size={16} color="#e11d48" />
            <span>{lang === 'bn' ? 'বাংলা' : 'EN'}</span>
            <span style={{ fontSize: '11px' }}>▾</span>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION (Matching Screenshot 1) */}
      <section style={{ position: 'relative', background: '#ffffff', overflow: 'hidden', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Text Content & Action Buttons */}
          <div>
            <h1 style={{ fontSize: '54px', fontWeight: 900, lineHeight: 1.15, margin: '0 0 16px 0', letterSpacing: '-1px', color: '#111827' }}>
              দেশের ১ নম্বর <br />
              <span style={{ color: '#e11d48' }}>সুপার অ্যাপ</span>
            </h1>

            <p style={{ fontSize: '20px', color: '#4b5563', margin: '0 0 36px 0', fontWeight: 600 }}>
              এক অ্যাপেই পাবেন সব সমাধান
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onToast('Redirected to Pathao Earn Money Driver Portal')}
                style={{
                  background: '#e11d48',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '16px 36px',
                  fontWeight: 900,
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.3)'
                }}
              >
                <span>💼 আয় করুন</span>
                <span>→</span>
              </button>

              <button
                onClick={() => onToast('Downloading Pathao Super App...')}
                style={{
                  background: '#ffffff',
                  color: '#111827',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '10px',
                  padding: '16px 32px',
                  fontWeight: 900,
                  fontSize: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                }}
              >
                <span>📱 ডাউনলোড অ্যাপ</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Red Curve Graphic & Super App Ecosystem (Matching Screenshot 1) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Top Award Badges */}
            <div style={{ position: 'absolute', top: '-40px', left: '20px', zIndex: 4, display: 'flex', gap: '16px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #fee2e2', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#e11d48' }}>10</span>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#374151' }}>YEARS</span>
              </div>
              <div style={{ background: '#ffffff', border: '1px solid #fef08a', borderRadius: '50%', width: '70px', height: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: '16px' }}>🏆</span>
                <span style={{ fontSize: '8px', fontWeight: 900, color: '#854d0e' }}>SUPERBRANDS</span>
              </div>
            </div>

            {/* Red Diagonal Curve Container */}
            <div style={{
              width: '480px',
              height: '480px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: '0 20px 50px rgba(225, 29, 72, 0.25)'
            }}>
              {/* Central Circle with Riders & Mobile App Showcase */}
              <div style={{ width: '340px', height: '340px', borderRadius: '50%', background: '#ffffff', padding: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80" 
                  alt="Pathao Super App Ecosystem Showcase" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                />
              </div>

              {/* Floating Service Badges around Circle */}
              <div style={{ position: 'absolute', top: '20px', left: '60px', background: '#fff', padding: '8px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 900, color: '#e11d48', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🛵 Bike</div>
              <div style={{ position: 'absolute', top: '20px', right: '60px', background: '#fff', padding: '8px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 900, color: '#e11d48', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🚗 Car</div>
              <div style={{ position: 'absolute', bottom: '60px', left: '20px', background: '#fff', padding: '8px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 900, color: '#e11d48', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>💳 Pay</div>
              <div style={{ position: 'absolute', bottom: '20px', right: '120px', background: '#fff', padding: '8px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 900, color: '#e11d48', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🛺 CNG</div>
              <div style={{ position: 'absolute', top: '200px', right: '-10px', background: '#fff', padding: '8px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 900, color: '#e11d48', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🍔 Food</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Matching Screenshot 2) */}
      <section style={{ maxWidth: '1140px', margin: '-40px auto 60px', position: 'relative', zIndex: 10, padding: '0 24px' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '36px 48px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          textAlign: 'center'
        }}>
          {/* Stat 1 */}
          <div style={{ borderRight: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#111827', margin: '0 0 6px 0' }}>
              ১.৫ কোটি+
            </h2>
            <span style={{ fontSize: '15px', color: '#6b7280', fontWeight: 700 }}>
              অ্যাপ ডাউনলোড
            </span>
          </div>

          {/* Stat 2 */}
          <div style={{ borderRight: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#111827', margin: '0 0 6px 0' }}>
              ৩৫ কোটি+
            </h2>
            <span style={{ fontSize: '15px', color: '#6b7280', fontWeight: 700 }}>
              সফল ট্রিপ/অর্ডার
            </span>
          </div>

          {/* Stat 3 */}
          <div>
            <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#111827', margin: '0 0 6px 0' }}>
              ১ কোটি+
            </h2>
            <span style={{ fontSize: '15px', color: '#6b7280', fontWeight: 700 }}>
              মানুষের অগ্রযাত্রায়
            </span>
          </div>
        </div>
      </section>

      {/* LIVE PATHAO OFFERS & VOUCHERS SECTION (CONNECTED WITH ADMIN PATHAO) */}
      <section style={{ maxWidth: '1340px', margin: '40px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', margin: '0 0 4px 0' }}>
              🛵 Active Pathao Offers &amp; Vouchers
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, fontWeight: 500 }}>
              Exclusive discount codes &amp; deals updated directly by Pathao Admin
            </p>
          </div>
          <span style={{ background: '#fff1f2', color: '#e11d48', padding: '6px 16px', borderRadius: '99px', fontWeight: 800, fontSize: '13px', border: '1px solid #fecdd3' }}>
            ⚡ {offers.length} Live Offers
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {offers.map((offer, idx) => {
            const code = offer.code || `PATHAO${offer.id || idx + 1}`;
            return (
              <div
                key={offer.id || idx}
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  onToast(`Coupon code "${code}" copied! Applied for Pathao checkout.`);
                }}
                style={{
                  background: 'linear-gradient(135deg, #e11d48, #991b1b)',
                  color: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.25)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '130px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.25)', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                      {offer.discount || 'Special Discount'}
                    </span>
                    <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: 700 }}>
                      Valid till {offer.validTill || '30 Sep 2026'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.2 }}>
                    {offer.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', borderTop: '1px dashed rgba(255,255,255,0.3)', paddingTop: '10px' }}>
                  <code style={{ background: '#ffffff', color: '#e11d48', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 900 }}>
                    CODE: {code}
                  </code>
                  <span style={{ fontSize: '12px', fontWeight: 800 }}>Tap to Copy 📋</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PATHAO PLATFORM SERVICES SECTION (Matching Screenshots 2 & 3) */}
      <section style={{ maxWidth: '1340px', margin: '60px auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 900, color: '#111827', margin: '0 0 10px 0' }}>
            পাঠাও প্ল্যাটফর্ম
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280', margin: 0, fontWeight: 600 }}>
            পাঠাও সকল সুবিধা প্রদান করে শুধুমাত্র আপনার জন্য।
          </p>
        </div>

        {/* 5 Service Tabs Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {[
            { id: 'bike', label: 'বাইক', icon: '🛵' },
            { id: 'car', label: 'কার', icon: '🚗' },
            { id: 'food', label: 'ফুড', icon: '🍔' },
            { id: 'parcel', label: 'পার্সেল', icon: '📦' },
            { id: 'pay', label: 'Pay', icon: '💳' }
          ].map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(service.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '16px',
                background: activeTab === service.id ? '#ffffff' : '#f8fafc',
                color: activeTab === service.id ? '#e11d48' : '#374151',
                border: activeTab === service.id ? '2px solid #e11d48' : '1px solid #e2e8f0',
                boxShadow: activeTab === service.id ? '0 6px 20px rgba(225, 29, 72, 0.15)' : 'none',
                fontWeight: 900,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{service.icon}</span>
              <span>{service.label}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content Card (Matching Screenshot 3) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '48px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 12px 36px rgba(0,0,0,0.05)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Text & Feature Points */}
          <div>
            <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', margin: '0 0 14px 0', lineHeight: 1.2 }}>
              {lang === 'bn' ? currentTabData.titleBn : currentTabData.titleEn}
            </h3>
            <p style={{ fontSize: '15.5px', color: '#4b5563', margin: '0 0 28px 0', lineHeight: 1.6 }}>
              {lang === 'bn' ? currentTabData.descBn : currentTabData.descEn}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              {currentTabData.points.map((pt, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ffe4ec', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, flexShrink: 0 }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>
                      {pt.titleBn}
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
                      {pt.descBn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onToast(`Pathao ${activeTab.toUpperCase()} service requested!`)}
              style={{
                background: '#e11d48',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 32px',
                fontWeight: 900,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(225, 29, 72, 0.25)'
              }}
            >
              {currentTabData.actionText}
            </button>
          </div>

          {/* Right Smartphone GPS Map Graphic (Matching Screenshot 3) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '320px',
              background: '#111827',
              borderRadius: '40px',
              padding: '14px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              border: '4px solid #374151'
            }}>
              <div style={{ background: '#ffffff', borderRadius: '30px', overflow: 'hidden', padding: '16px' }}>
                <div style={{ background: '#e11d48', color: '#ffffff', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 900, marginBottom: '10px' }}>
                  📍 Pickup: North South University, Dhaka
                </div>

                <div style={{ height: '260px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                  <img src={currentTabData.mapImg} alt="Pathao GPS Map Tracking" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.95)', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 900, color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>⚡ ETA: 5 mins away</span>
                    <span style={{ color: '#e11d48' }}>৳75 BDT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #HereWithYou LIFESTYLE PHOTO GRID (Matching Screenshot 4) */}
      <section style={{ maxWidth: '1340px', margin: '60px auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '38px', fontWeight: 900, color: '#111827', margin: 0 }}>
            আপনার দৈনন্দিন পথ চলায় <span style={{ color: '#e11d48' }}>#HereWithYou!</span>
          </h2>
        </div>

        {/* 6 Grid Gallery Box with Green Border Frame */}
        <div style={{
          border: '2px solid #10b981',
          borderRadius: '24px',
          padding: '24px',
          background: '#ffffff',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {[
            { title: 'Pathao Bike Ride', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80' },
            { title: 'Pathao Car Comfort', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80' },
            { title: 'Pathao Driver Partner', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
            { title: 'Pathao Food Delivery', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
            { title: 'Pathao Pay Cashless', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80' },
            { title: 'Pathao Hero Rider', img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onToast(`Viewing ${item.title}`)}
              style={{
                position: 'relative',
                height: '220px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}></div>
              <div style={{ position: 'absolute', bottom: '14px', left: '16px', color: '#ffffff', fontWeight: 800, fontSize: '15px' }}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VECTOR ILLUSTRATION BANNER SECTION (Matching Screenshot 5) */}
      <section style={{ background: '#fcfcfc', padding: '60px 24px 80px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto', textAlign: 'center' }}>
          
          <button
            onClick={() => onToast('Redirected to Pathao Rider Signup Form')}
            style={{
              background: '#e11d48',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '16px 44px',
              fontWeight: 900,
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(225, 29, 72, 0.3)',
              marginBottom: '48px'
            }}
          >
            আয় শুরু করুন ➔
          </button>

          {/* Vector City Illustration Showcase */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '8px' }}>📦👩‍💼</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>Parcel Courier</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '72px', marginBottom: '8px' }}>🚗🚘</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>Pathao Car</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '8px' }}>🚲🥡</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>Food Delivery</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '72px', marginBottom: '8px' }}>🛵🏍️</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>Pathao Bike</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#111827', color: '#9ca3af', padding: '40px 24px', textAlign: 'center', fontSize: '13.5px' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <p>© {new Date().getFullYear()} Pathao Limited. #HereWithYou. Partnered with OfferMatrix Bangladesh.</p>
        </div>
      </footer>

      {/* Floating Red Pathao Chat Button */}
      <div
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 90000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#e11d48',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          boxShadow: '0 8px 30px rgba(225, 29, 72, 0.4)',
          cursor: 'pointer'
        }}
      >
        <MessageCircle size={28} />
      </div>

      {/* Interactive AI Pathao Support Modal */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '28px',
            width: '380px',
            height: '520px',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(225, 29, 72, 0.4)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ background: '#e11d48', padding: '14px 18px', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffffff', color: '#e11d48', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                P
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900 }}>Pathao Support AI</h4>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>#HereWithYou</div>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#fff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#fff5f5', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.sender === 'user' ? '#e11d48' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#111827',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '13px',
                  lineHeight: 1.4,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                <div>{msg.text}</div>
                <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' }}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Chips */}
          <div style={{ padding: '8px 12px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {['💼 আয় করুন', '🛵 বাইক রাইড', '🍔 ফুড ডেলিভারি', '📦 পার্সেল'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '4px 10px',
                  background: '#fff5f5',
                  color: '#e11d48',
                  border: '1px solid #fecdd3',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ padding: '10px 12px', background: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Ask Pathao AI..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 14px',
                borderRadius: '99px',
                border: '1px solid #e2e8f0',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#e11d48',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
