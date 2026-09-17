import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HeroDealsGrid from './components/HeroDealsGrid';
import AllDealsGrid from './components/AllDealsGrid';
import DealDetailModal from './components/DealDetailModal';
import BasketModal from './components/BasketModal';
import SavedDealsModal from './components/SavedDealsModal';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import ToastNotification from './components/ToastNotification';
import ChoiceLegacyPage from './components/ChoiceLegacyPage';
import KireiPage from './components/KireiPage';
import MakeupChariPage from './components/MakeupChariPage';
import FoodpandaPage from './components/FoodpandaPage';
import FoodiPage from './components/FoodiPage';
import PathaoPage from './components/PathaoPage';
import UberPage from './components/UberPage';
import ObhaiPage from './components/ObhaiPage';
import IndriverPage from './components/IndriverPage';
import SectorSections from './components/SectorSections';
import SubscriptionSection from './components/SubscriptionSection';
import AdminDashboard from './components/AdminDashboard';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedDeals, setSavedDeals] = useState([]);

  // Auth & View state
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('landing'); // 'landing' or 'dashboard'

  // Cart & Basket state
  const [cartItems, setCartItems] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // Modals state
  const [activeDealDetail, setActiveDealDetail] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Copy code & Toast state
  const [copiedCode, setCopiedCode] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Dynamic Offers state for Merchant platforms (Foodpanda, Foodi, Pathao)
  const [foodpandaOffers, setFoodpandaOffers] = useState([
    { id: 1, title: 'Flat 50% off your 1st order', discount: '50%', validTill: '30 Sep 2026', status: 'Active', code: 'YUMPANDA' },
    { id: 2, title: 'Tk. 200 off your first feast', discount: '৳200 off', validTill: '30 Sep 2026', status: 'Active', code: 'BKASHNC200' },
    { id: 3, title: 'Crowd Faves Flat 25% off', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'CROWDFAV25' }
  ]);

  const [foodiOffers, setFoodiOffers] = useState([
    { id: 1, title: 'Just Order & Smile 25% OFF', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'FOODI25' },
    { id: 2, title: 'Flat 20% OFF on Kacchi & Biryani', discount: '20%', validTill: '30 Sep 2026', status: 'Active', code: 'FOODIKACCHI' },
    { id: 3, title: 'Free Delivery on All Orders', discount: 'Free Delivery', validTill: '30 Sep 2026', status: 'Active', code: 'FOODIFREE' }
  ]);

  const [pathaoOffers, setPathaoOffers] = useState([
    { id: 1, title: 'Pathao Food Express 30% OFF', discount: '30%', validTill: '30 Sep 2026', status: 'Active', code: 'PATHAO30' },
    { id: 2, title: 'Flat ৳150 OFF on Biryani Deals', discount: '৳150 off', validTill: '30 Sep 2026', status: 'Active', code: 'PATHAOBIRYANI' },
    { id: 3, title: '50% OFF First Food Delivery', discount: '50%', validTill: '30 Sep 2026', status: 'Active', code: 'PATHAO50' }
  ]);

  // Dynamic Offers state for Ride platforms (Uber, OBHAI, inDriver)
  const [uberOffers, setUberOffers] = useState([
    { id: 1, title: '20% off on 3 Rides', discount: '20%', validTill: '30 Sep 2026', status: 'Active', code: 'UBER20' },
    { id: 2, title: 'Flat 50 BDT Cashback', discount: '৳50', validTill: '25 Sep 2026', status: 'Active', code: 'UBER50' },
    { id: 3, title: 'Weekend Ride Offer', discount: '25%', validTill: '28 Sep 2026', status: 'Active', code: 'UBERWEEKEND' },
    { id: 4, title: 'First Ride Offer', discount: '30%', validTill: '20 Sep 2026', status: 'Expired', code: 'UBERFIRST' },
    { id: 5, title: 'Airport Ride Discount', discount: '৳100', validTill: '18 Sep 2026', status: 'Active', code: 'UBERAIRPORT' }
  ]);

  const [obhaiOffers, setObhaiOffers] = useState([
    { id: 1, title: 'OBHAI 25% OFF on CNG', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'OBHAI25' },
    { id: 2, title: 'Flat ৳40 Cashback via bKash', discount: '৳40', validTill: '25 Sep 2026', status: 'Active', code: 'OBHAICASH' },
    { id: 3, title: 'Weekend Special Ride', discount: '20%', validTill: '28 Sep 2026', status: 'Active', code: 'OBHAIWEEKEND' }
  ]);

  const [indriverOffers, setIndriverOffers] = useState([
    { id: 1, title: 'Set Your Fare 30% OFF', discount: '30%', validTill: '30 Sep 2026', status: 'Active', code: 'INDRIVER30' },
    { id: 2, title: 'Intercity Bargain Special', discount: '৳100', validTill: '25 Sep 2026', status: 'Active', code: 'INDRIVER100' },
    { id: 3, title: 'First InDriver Trip Offer', discount: '20%', validTill: '28 Sep 2026', status: 'Active', code: 'INDRIVERFIRST' }
  ]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData?.role === 'admin') {
      setActiveView('admin');
      triggerToast('Welcome Back, Admin! Super Admin Dashboard loaded 👑');
    } else {
      setActiveView('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('landing');
    setSelectedCategory('all');
    setIsBasketOpen(false);
    setActiveDealDetail(null);
    setIsSavedModalOpen(false);
    setIsAuthModalOpen(false);
    triggerToast('Logged out successfully 👋');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    triggerToast(`Coupon code ${code} copied! Extra 10% off applied.`);
    setTimeout(() => {
      setCopiedCode('');
    }, 3000);
  };

  const toggleSaveDeal = (deal) => {
    const exists = savedDeals.some(d => d.id === deal.id);
    if (exists) {
      setSavedDeals(savedDeals.filter(d => d.id !== deal.id));
      triggerToast(`Removed "${deal.title || deal.brand || deal.route}" from saved deals`);
    } else {
      setSavedDeals([...savedDeals, deal]);
      triggerToast(`Saved "${deal.title || deal.brand || deal.route}" to your list! ❤️`);
    }
  };

  const removeSavedDeal = (id) => {
    setSavedDeals(savedDeals.filter(d => d.id !== id));
    triggerToast('Deal removed from saved list');
  };

  // Cart Handlers
  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => item.id === newItem.id && item.selectedApp === newItem.selectedApp && item.selectedPayment === newItem.selectedPayment
      );

      if (existingIdx >= 0) {
        const updated = [...prevItems];
        updated[existingIdx].qty += newItem.qty || 1;
        return updated;
      }
      return [...prevItems, newItem];
    });
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    triggerToast('Item removed from basket');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = (orderInfo) => {
    // Order successfully recorded
    console.log('Order completed:', orderInfo);
  };

  return (
    <div className="app-root">
      {/* Choice Legacy Store View */}
      {selectedCategory === 'choice_legacy' || activeView === 'choice_legacy' ? (
        <ChoiceLegacyPage
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'kirei' || activeView === 'kirei' ? (
        <KireiPage
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'makeup_chari' || activeView === 'makeup_chari' ? (
        <MakeupChariPage
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'foodpanda' || activeView === 'foodpanda' ? (
        <FoodpandaPage
          offers={foodpandaOffers}
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'foodi' || activeView === 'foodi' ? (
        <FoodiPage
          offers={foodiOffers}
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'pathao' || activeView === 'pathao' ? (
        <PathaoPage
          offers={pathaoOffers}
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'uber' || activeView === 'uber' ? (
        <UberPage
          offers={uberOffers}
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'obhai' || activeView === 'obhai' ? (
        <ObhaiPage
          offers={obhaiOffers}
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : selectedCategory === 'indriver' || activeView === 'indriver' || selectedCategory === 'indrive' || activeView === 'indrive' ? (
        <IndriverPage
          offers={indriverOffers}
          onBack={() => {
            setSelectedCategory('all');
            setActiveView('landing');
          }}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      ) : activeView === 'admin' || currentUser?.role === 'admin' ? (
        <AdminDashboard
          currentUser={currentUser}
          onLogout={handleLogout}
          onToast={triggerToast}
          foodpandaOffers={foodpandaOffers}
          setFoodpandaOffers={setFoodpandaOffers}
          foodiOffers={foodiOffers}
          setFoodiOffers={setFoodiOffers}
          pathaoOffers={pathaoOffers}
          setPathaoOffers={setPathaoOffers}
          uberOffers={uberOffers}
          setUberOffers={setUberOffers}
          obhaiOffers={obhaiOffers}
          setObhaiOffers={setObhaiOffers}
          indriverOffers={indriverOffers}
          setIndriverOffers={setIndriverOffers}
        />
      ) : activeView === 'dashboard' ? (
        <UserDashboard
          currentUser={currentUser}
          onLogout={handleLogout}
          onToast={triggerToast}
          foodpandaOffers={foodpandaOffers}
          foodiOffers={foodiOffers}
          pathaoOffers={pathaoOffers}
          onOpenSaved={() => setIsSavedModalOpen(true)}
          onOpenDealDetail={(deal) => setActiveDealDetail(deal)}
          cartCount={cartItems.length}
          onOpenCart={() => setIsBasketOpen(true)}
          onAddToCart={handleAddToCart}
          onOpenChoiceLegacy={() => {
            setSelectedCategory('choice_legacy');
            setActiveView('choice_legacy');
          }}
          onOpenKirei={() => {
            setSelectedCategory('kirei');
            setActiveView('kirei');
          }}
          onOpenMakeupChari={() => {
            setSelectedCategory('makeup_chari');
            setActiveView('makeup_chari');
          }}
          onOpenFoodpanda={() => {
            setSelectedCategory('foodpanda');
            setActiveView('foodpanda');
          }}
          onOpenFoodi={() => {
            setSelectedCategory('foodi');
            setActiveView('foodi');
          }}
          onOpenPathao={() => {
            setSelectedCategory('pathao');
            setActiveView('pathao');
          }}
          onOpenUber={() => {
            setSelectedCategory('uber');
            setActiveView('uber');
          }}
          onOpenObhai={() => {
            setSelectedCategory('obhai');
            setActiveView('obhai');
          }}
          onOpenIndriver={() => {
            setSelectedCategory('indriver');
            setActiveView('indriver');
          }}
          initialTab={
            selectedCategory === 'food'
              ? 'food'
              : selectedCategory === 'skincare'
                ? 'skincare'
                : 'dashboard'
          }
        />
      ) : (
        <>
          {/* Top Sticky Navbar */}
          <Navbar
            activeCategory={selectedCategory}
            setActiveCategory={setSelectedCategory}
            savedCount={savedDeals.length}
            cartCount={cartItems.length}
            currentUser={currentUser}
            onOpenSaved={() => setIsSavedModalOpen(true)}
            onOpenCart={() => setIsBasketOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenDashboard={() => setActiveView('dashboard')}
            onLogout={handleLogout}
            onOpenFindDeal={() => {
              const el = document.getElementById('all-deals-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Main Content Area */}
          <main className="main-content">
            {/* Hero Section Grid */}
            <div className="hero-grid">
              {/* Left Column: Headline, Search, Banner */}
              <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onCopyCode={handleCopyCode}
                copiedCode={copiedCode}
              />

              {/* Right Column: Hero Deal Cards */}
              <HeroDealsGrid
                savedDeals={savedDeals}
                toggleSaveDeal={toggleSaveDeal}
                onOpenDealDetail={(deal) => setActiveDealDetail(deal)}
                onCopyCode={handleCopyCode}
                copiedCode={copiedCode}
              />
            </div>

            {/* New Landing Page Sections matching reference images */}
            <SectorSections
              selectedCategory={selectedCategory}
              savedDeals={savedDeals}
              toggleSaveDeal={toggleSaveDeal}
              onOpenDealDetail={(deal) => setActiveDealDetail(deal)}
              onCopyCode={handleCopyCode}
              copiedCode={copiedCode}
              setSelectedCategory={setSelectedCategory}
              onToast={triggerToast}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          </main>

          {/* Dark Footer matching Image 5 */}
          <footer className="main-dark-footer">
            <div className="footer-top-grid">
              {/* Col 1: Brand Info */}
              <div className="footer-col brand-col">
                <div className="footer-logo">
                  <span className="logo-box-pink">%</span>
                  <span className="logo-text-dark">Offer<span className="logo-green">Matrix</span></span>
                </div>
                <p className="footer-brand-sub">
                  Bangladesh's Smart Deal Platform <br />
                  Compare. Save. Live Better.
                </p>
                <div className="footer-social-row">
                  <a href="#fb" className="social-btn fb">f</a>
                  <a href="#ig" className="social-btn ig">📷</a>
                  <a href="#yt" className="social-btn yt">▶</a>
                  <a href="#in" className="social-btn in">in</a>
                </div>
              </div>

              {/* Col 2: Quick Links */}
              <div className="footer-col">
                <h4 className="footer-col-title">Quick Links</h4>
                <ul className="footer-links-list">
                  <li><a href="#home" onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
                  <li><a href="#food" onClick={(e) => { e.preventDefault(); setSelectedCategory('food'); }}>Food</a></li>
                  <li><a href="#rides" onClick={(e) => { e.preventDefault(); setSelectedCategory('rides'); }}>Rides</a></li>
                  <li><a href="#skincare" onClick={(e) => { e.preventDefault(); setSelectedCategory('skincare'); }}>Skin Care</a></li>
                  <li><a href="#coupons" onClick={(e) => { e.preventDefault(); setSelectedCategory('coupons'); }}>Coupons</a></li>
                  <li><a href="#deals" onClick={(e) => { e.preventDefault(); setSelectedCategory('deals'); }}>Deals</a></li>
                  <li><a href="#blog" onClick={(e) => { e.preventDefault(); triggerToast('OfferMatrix Blog loaded'); }}>Blog</a></li>
                </ul>
              </div>

              {/* Col 3: Support */}
              <div className="footer-col">
                <h4 className="footer-col-title">Support</h4>
                <ul className="footer-links-list">
                  <li><a href="#help" onClick={(e) => { e.preventDefault(); triggerToast('Help Center opened'); }}>Help Center</a></li>
                  <li><a href="#contact" onClick={(e) => { e.preventDefault(); triggerToast('Contact Us: support@offermatrix.bd'); }}>Contact Us</a></li>
                  <li><a href="#report" onClick={(e) => { e.preventDefault(); triggerToast('Report Issue Form loaded'); }}>Report an Issue</a></li>
                  <li><a href="#terms" onClick={(e) => { e.preventDefault(); triggerToast('Terms of Service'); }}>Terms of Service</a></li>
                  <li><a href="#privacy" onClick={(e) => { e.preventDefault(); triggerToast('Privacy Policy'); }}>Privacy Policy</a></li>
                  <li><a href="#faq" onClick={(e) => { e.preventDefault(); triggerToast('Frequently Asked Questions'); }}>FAQ</a></li>
                </ul>
              </div>

              {/* Col 4: Download App */}
              <div className="footer-col app-col">
                <h4 className="footer-col-title">Download App</h4>
                <div className="footer-app-btns">
                  <a href="#play" className="footer-store-btn" onClick={(e) => { e.preventDefault(); triggerToast('Google Play download link'); }}>
                    <span>▶</span> GET IT ON Google Play
                  </a>
                  <a href="#store" className="footer-store-btn" onClick={(e) => { e.preventDefault(); triggerToast('App Store download link'); }}>
                    <span></span> Download on App Store
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-bottom-bar">
              <span>© {new Date().getFullYear()} OfferMatrix. All rights reserved.</span>
              <span>Made with ❤️ in Bangladesh</span>
            </div>
          </footer>
        </>
      )}



      {/* Modals & Toasts */}
      {activeDealDetail && (
        <DealDetailModal
          deal={activeDealDetail}
          onClose={() => setActiveDealDetail(null)}
          onSave={toggleSaveDeal}
          isSaved={savedDeals.some(d => d.id === activeDealDetail.id)}
          onToast={triggerToast}
          onAddToCart={handleAddToCart}
        />
      )}

      {isBasketOpen && (
        <BasketModal
          cartItems={cartItems}
          onClose={() => setIsBasketOpen(false)}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onToast={triggerToast}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {isSavedModalOpen && (
        <SavedDealsModal
          savedDeals={savedDeals}
          onClose={() => setIsSavedModalOpen(false)}
          onRemove={removeSavedDeal}
          onOpenDetail={(deal) => setActiveDealDetail(deal)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onToast={triggerToast}
          onLoginSuccess={handleLoginSuccess}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'choice_legacy') {
              setActiveView('choice_legacy');
            } else if (cat === 'kirei') {
              setActiveView('kirei');
            } else if (cat === 'makeup_chari') {
              setActiveView('makeup_chari');
            } else if (cat === 'foodpanda') {
              setActiveView('foodpanda');
            } else if (cat === 'foodi') {
              setActiveView('foodi');
            } else if (cat === 'pathao') {
              setActiveView('pathao');
            } else if (cat === 'uber') {
              setActiveView('uber');
            } else if (cat === 'obhai') {
              setActiveView('obhai');
            } else if (cat === 'indriver' || cat === 'indrive') {
              setActiveView('indriver');
            } else {
              setActiveView('dashboard');
            }
            setIsAuthModalOpen(false);
          }}
        />
      )}

      <ToastNotification message={toastMessage} />
    </div>
  );
}
