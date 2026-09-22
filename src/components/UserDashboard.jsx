import React, { useState, useEffect } from 'react';
import {
  Percent, Search, Bell, Heart, User, LayoutDashboard, Utensils,
  Car, Sparkles, Package, ShieldAlert, Wallet, CreditCard, Gift,
  Settings, HelpCircle, LogOut, ChevronDown, ShoppingBag,
  Tag, Zap, ArrowLeft, RefreshCw, Star, Clock, MapPin
} from 'lucide-react';

export default function UserDashboard({
  currentUser,
  userOrders = [],
  setUserOrders,
  selectedOrder: propSelectedOrder,
  setSelectedOrder: propSetSelectedOrder,
  onRefreshOrders,
  onLogout,
  onToast,
  foodpandaOffers = [],
  foodiOffers = [],
  pathaoOffers = [],
  onOpenSaved,
  onOpenDealDetail,
  cartCount = 0,
  onOpenCart,
  onAddToCart,
  onOpenChoiceLegacy,
  onOpenKirei,
  onOpenMakeupChari,
  onOpenFoodpanda,
  onOpenFoodi,
  onOpenPathao,
  onOpenUber,
  onOpenObhai,
  onOpenIndriver,
  initialTab = 'food'
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeCategoryMode, setActiveCategoryMode] = useState(
    initialTab === 'ride' ? 'ride' : initialTab === 'skincare' ? 'skincare' : initialTab === 'food' ? 'food' : 'dashboard'
  );

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
      if (initialTab === 'ride') setActiveCategoryMode('ride');
      else if (initialTab === 'skincare') setActiveCategoryMode('skincare');
      else if (initialTab === 'food') setActiveCategoryMode('food');
      else if (initialTab === 'dashboard') setActiveCategoryMode('dashboard');
    }
  }, [initialTab]);
  const [copiedCoupon, setCopiedCoupon] = useState('');
  const [selectedQuickAction, setSelectedQuickAction] = useState('food');
  const [orderCategoryFilter, setOrderCategoryFilter] = useState('all');
  const [localSelectedOrder, setLocalSelectedOrder] = useState(null);

  const selectedOrder = propSelectedOrder || localSelectedOrder;
  const setSelectedOrder = propSetSelectedOrder || setLocalSelectedOrder;

  // Interactive Ride State
  const [pickupLocation, setPickupLocation] = useState('Dhanmondi, Dhaka');
  const [dropLocation, setDropLocation] = useState('Gulshan 2, Dhaka');
  const [vehicleType, setVehicleType] = useState('Car / Sedan (AC)');
  const [seatCount, setSeatCount] = useState('4 Passengers (Regular)');
  const [stopsList, setStopsList] = useState([]);
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [newStopInput, setNewStopInput] = useState('');
  const [selectedRideFilter, setSelectedRideFilter] = useState('cheapest');
  const [isSearchingRides, setIsSearchingRides] = useState(false);
  const [bookingRideModal, setBookingRideModal] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bKash');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('Today');
  const [scheduleTime, setScheduleTime] = useState('05:00 PM');

  // Interactive Sidebar Modals State
  const [isComplainModalOpen, setIsComplainModalOpen] = useState(false);
  const [complainCategoryFilter, setComplainCategoryFilter] = useState('all');
  const [complainSearchQuery, setComplainSearchQuery] = useState('');
  const [isFilingNewComplaint, setIsFilingNewComplaint] = useState(false);
  const [newComplaintCategory, setNewComplaintCategory] = useState('promo');
  const [newComplaintTarget, setNewComplaintTarget] = useState('foodpanda');
  const [newComplaintDesc, setNewComplaintDesc] = useState('');
  const [complainSupportedIds, setComplainSupportedIds] = useState([]);
  const [complainDiscussedIds, setComplainDiscussedIds] = useState([]);
  const [complainDetailId, setComplainDetailId] = useState(null);
  const [selectedRaidReportModal, setSelectedRaidReportModal] = useState(null);
  const [complainNewTitle, setComplainNewTitle] = useState('');
  const [complainNewImg, setComplainNewImg] = useState('');

  const [savedDealsFilter, setSavedDealsFilter] = useState('all');
  const [savedDealsSearch, setSavedDealsSearch] = useState('');
  const [savedDealsList, setSavedDealsList] = useState([
    {
      id: 'sd-1',
      vendor: 'Kacchi Bhai – Dhanmondi',
      title: 'Chicken Biryani Combo Meal',
      price: '৳189',
      oldPrice: '৳270',
      discount: '30% OFF',
      date: '2026-08-28',
      category: 'food',
      tag: 'FOOD',
      tagBg: '#ff2b70',
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'sd-2',
      vendor: 'Uber BD',
      title: 'Uber Premier Airport Drop',
      price: '৳450',
      oldPrice: '৳600',
      discount: '25% OFF',
      date: '2026-08-27',
      category: 'ride',
      tag: 'RIDE',
      tagBg: '#1e293b',
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'sd-3',
      vendor: 'Beautybooth BD',
      title: 'CeraVe Hydrating Cleanser 473ml',
      price: '৳1250',
      oldPrice: '৳1650',
      discount: '24% OFF',
      date: '2026-08-25',
      category: 'skincare',
      tag: 'SKINCARE',
      tagBg: '#db2777',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'sd-4',
      vendor: 'Pizza Hut – Gulshan',
      title: 'Cheesy Pepperoni Pizza Large',
      price: '৳599',
      oldPrice: '৳850',
      discount: '29% OFF',
      date: '2026-08-24',
      category: 'food',
      tag: 'FOOD',
      tagBg: '#ff2b70',
      img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'sd-5',
      vendor: 'Careme BD',
      title: 'The Ordinary Niacinamide 10% + Zinc 1%',
      price: '৳950',
      oldPrice: '৳1050',
      discount: '10% OFF',
      date: '2026-08-20',
      category: 'skincare',
      tag: 'SKINCARE',
      tagBg: '#db2777',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'sd-6',
      vendor: 'Pathao BD',
      title: 'Pathao Car Ride Dhanmondi to Airport',
      price: '৳380',
      oldPrice: '৳500',
      discount: '24% OFF',
      date: '2026-08-18',
      category: 'ride',
      tag: 'RIDE',
      tagBg: '#1e293b',
      img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80'
    }
  ]);

  const [isPriceAlertsModalOpen, setIsPriceAlertsModalOpen] = useState(false);
  const [priceAlertFilter, setPriceAlertFilter] = useState('all');
  const [priceAlertsList, setPriceAlertsList] = useState([
    { id: 'pa1', title: 'Chicken Biryani – Bismillah Biryani', category: 'food', target: '৳190', current: '৳199', drop: '9% Drop', status: 'Active', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=100&q=80' },
    { id: 'pa2', title: 'Pathao Ride Dhanmondi to Gulshan 2', category: 'ride', target: '৳380', current: '৳420', drop: 'Fare Alert', status: 'Active', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=100&q=80' },
    { id: 'pa3', title: 'CeraVe Hydrating Cleanser 236ml', category: 'skincare', target: '৳1,200', current: '৳1,250', drop: '4% Drop', status: 'Active', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80' },
    { id: 'pa4', title: 'Uber Sedan Intercity Dhaka–CTG', category: 'ride', target: '৳1,500', current: '৳1,650', drop: 'Fare Alert', status: 'Paused', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=100&q=80' },
    { id: 'pa5', title: 'Farmhouse Pizza – Pizza Hut', category: 'food', target: '৳320', current: '৳349', drop: '8% Drop', status: 'Active', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80' }
  ]);
  const [notifChannels, setNotifChannels] = useState({
    whatsapp: true,
    email: true,
    push: true
  });
  const [isAddingPriceAlert, setIsAddingPriceAlert] = useState(false);
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertCategory, setNewAlertCategory] = useState('food');
  const [newAlertTarget, setNewAlertTarget] = useState('');
  const [newAlertCurrent, setNewAlertCurrent] = useState('');

  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
  const [couponCategoryFilter, setCouponCategoryFilter] = useState('all');
  const [viewOrderDetailsModal, setViewOrderDetailsModal] = useState(null);

  // Deliveryman Chatbox State
  const [activeDeliverymanChat, setActiveDeliverymanChat] = useState(null);
  const [deliverymanChatInput, setDeliverymanChatInput] = useState('');
  const [deliverymanChatHistory, setDeliverymanChatHistory] = useState([
    { sender: 'rider', text: "Hello Setu! 👋 I'm your delivery rider Rahim. I have picked up your food order and I am currently on the way!", time: '1:48 PM' },
    { sender: 'rider', text: "Estimated arrival time: 10-12 minutes. Please keep your phone reachable. 🛵", time: '1:49 PM' }
  ]);

  const handleSendDeliverymanMessage = (customText) => {
    const textToSend = customText || deliverymanChatInput;
    if (!textToSend || !textToSend.trim()) return;

    const userMsg = {
      sender: 'me',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setDeliverymanChatHistory(prev => [...prev, userMsg]);
    setDeliverymanChatInput('');

    // Trigger rider automated response after 1.2s
    setTimeout(() => {
      const riderReplies = [
        "Got it! I am near your location now, arriving in 2-3 minutes! 🛵💨",
        "Sure thing! I will call you as soon as I arrive at your gate. 📞",
        "Don't worry, your food is hot and safely packed in my thermal delivery bag! 🍱🔥",
        "Understood! Thank you for the instructions."
      ];
      const randomReply = riderReplies[Math.floor(Math.random() * riderReplies.length)];
      setDeliverymanChatHistory(prev => [...prev, {
        sender: 'rider',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  useEffect(() => {
    const handleOpenDeliverymanChatEvent = (e) => {
      const dealTitle = e.detail?.dealTitle || 'Food Order';
      const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}-FD`;
      setDeliverymanChatHistory([
        {
          sender: 'rider',
          text: `Hello Setu! 👋 I'm your delivery rider Rahim. I have picked up your food order for "${dealTitle}" and I am currently on the way! 🛵`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          sender: 'rider',
          text: "Estimated arrival time: 10-12 minutes. Please keep your phone reachable. 📦",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setActiveDeliverymanChat({
        name: 'Rahim Ahmed (Delivery Rider)',
        phone: '+880 1712 345678',
        vehicle: 'Honda Dream 110 (Motorcycle)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        orderId: newOrderId
      });
    };

    window.addEventListener('open-deliveryman-chat', handleOpenDeliverymanChatEvent);
    return () => window.removeEventListener('open-deliveryman-chat', handleOpenDeliverymanChatEvent);
  }, []);

  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [reviewCategoryFilter, setReviewCategoryFilter] = useState('all');
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    user: 'Sadman Rahman',
    category: 'food',
    item: '',
    rating: 5,
    comment: '',
    location: 'Dhanmondi, Dhaka'
  });

  const [userReviewsList, setUserReviewsList] = useState([
    {
      id: 'rev-1',
      user: 'Tanvir Ahmed',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      location: 'Dhanmondi, Dhaka',
      category: 'food',
      item: 'Kacchi Biryani - Sultan\'s Dine',
      rating: 5,
      ratingText: '⭐️⭐️⭐️⭐️⭐️ 5.0',
      comment: 'Super fast delivery via Foodpanda! The deal saved me ৳150 on Sultan\'s Kacchi. Meat was extremely tender and hot.',
      date: 'Today',
      itemImg: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 24,
      isHelpful: false
    },
    {
      id: 'rev-2',
      user: 'Nusrat Jahan',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      location: 'Gulshan, Dhaka',
      category: 'skincare',
      item: 'COSRX Snail Mucin Power Essence',
      rating: 5,
      ratingText: '⭐️⭐️⭐️⭐️⭐️ 5.0',
      comment: 'Authentic product from Choice Legacy BD. 100% original barcode scanned! Made my skin glow and hydrated instantly.',
      date: 'Yesterday',
      itemImg: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 19,
      isHelpful: false
    },
    {
      id: 'rev-3',
      user: 'Rahim Chowdhury',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      location: 'Banani, Dhaka',
      category: 'ride',
      item: 'Pathao Sedan Ride (Dhanmondi to Airport)',
      rating: 4,
      ratingText: '⭐️⭐️⭐️⭐️ 4.0',
      comment: 'Polite driver Rahim and clean AC car. Fare was ৳120 lower than Uber during evening rush hour.',
      date: '2 days ago',
      itemImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 14,
      isHelpful: false
    },
    {
      id: 'rev-4',
      user: 'Sakib Al Hasan',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      location: 'Uttara, Dhaka',
      category: 'food',
      item: 'Pizza Hut - 1+1 Medium Deal',
      rating: 5,
      ratingText: '⭐️⭐️⭐️⭐️⭐️ 5.0',
      comment: 'Awesome 1+1 deal redeemed directly at Uttara sector 7 branch. Super cheese crust and fast pickup.',
      date: '3 days ago',
      itemImg: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 31,
      isHelpful: false
    },
    {
      id: 'rev-5',
      user: 'Raisa Samad',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      location: 'Mirpur, Dhaka',
      category: 'skincare',
      item: 'The Ordinary Niacinamide 10%',
      rating: 5,
      ratingText: '⭐️⭐️⭐️⭐️⭐️ 5.0',
      comment: 'Verified genuine serum! Noticeably reduced acne marks within 2 weeks. Got extra 10% coupon code off.',
      date: '4 days ago',
      itemImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 8,
      isHelpful: false
    },
    {
      id: 'rev-6',
      user: 'Mehedi Hasan',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      location: 'GEC, Chittagong',
      category: 'ride',
      item: 'InDrive Fare Bidding (GEC to Agrabad)',
      rating: 4,
      ratingText: '⭐️⭐️⭐️⭐️ 4.0',
      comment: 'Fare bidding saved ৳80 compared to normal cabs in Chittagong. Driver was punctual and courteous.',
      date: '5 days ago',
      itemImg: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 12,
      isHelpful: false
    }
  ]);

  const handleToggleHelpful = (id) => {
    setUserReviewsList(prev => prev.map(rev => {
      if (rev.id === id) {
        const nextHelpful = !rev.isHelpful;
        if (nextHelpful) {
          onToast('Marked review as helpful 👍');
        } else {
          onToast('Unmarked review');
        }
        return {
          ...rev,
          isHelpful: nextHelpful,
          helpfulCount: nextHelpful ? rev.helpfulCount + 1 : Math.max(0, rev.helpfulCount - 1)
        };
      }
      return rev;
    }));
  };

  const handleAddNewReview = (e) => {
    e.preventDefault();
    if (!newReviewForm.item.trim() || !newReviewForm.comment.trim()) {
      onToast('Please fill out the item name and review comment.');
      return;
    }

    const categoryEmojiMap = { food: '🍴', ride: '🚗', skincare: '✨' };
    const starsString = '⭐️'.repeat(newReviewForm.rating) + ` ${newReviewForm.rating}.0`;

    const newEntry = {
      id: `rev-${Date.now()}`,
      user: newReviewForm.user || 'Verified User',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      location: newReviewForm.location || 'Dhaka',
      category: newReviewForm.category,
      item: `${categoryEmojiMap[newReviewForm.category] || ''} ${newReviewForm.item}`,
      rating: Number(newReviewForm.rating),
      ratingText: starsString,
      comment: newReviewForm.comment,
      date: 'Just now',
      itemImg: newReviewForm.category === 'food'
        ? 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'
        : newReviewForm.category === 'ride'
          ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80'
          : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
      helpfulCount: 1,
      isHelpful: true
    };

    setUserReviewsList([newEntry, ...userReviewsList]);
    setIsAddingReview(false);
    setNewReviewForm({
      user: 'Sadman Rahman',
      category: 'food',
      item: '',
      rating: 5,
      comment: '',
      location: 'Dhanmondi, Dhaka'
    });
    onToast('🎉 Review published! ৳20 reward credited to your Setu Pay wallet.');
  };

  // Interactive Live Chat System State
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [chatInputValue, setChatInputValue] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'm1',
      sender: 'agent',
      name: 'Nusrat Jahan (Setu Officer)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      text: '👋 Hello Sadman! Welcome to OfferMatrix 24/7 Live Support.',
      time: '10:02 AM'
    },
    {
      id: 'm2',
      sender: 'agent',
      name: 'Nusrat Jahan (Setu Officer)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      text: 'I am here to assist with Food Coupons 🍔, Ride Fare Disputes 🚗, Skincare Authenticity ✨, or Wallet Cashback 💳. How can I help you today?',
      time: '10:03 AM'
    }
  ]);

  const handleSendChatMessage = (textToSend) => {
    const messageText = typeof textToSend === 'string' ? textToSend : chatInputValue;
    if (!messageText || !messageText.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      name: 'You (Sadman)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInputValue('');
    setIsAgentTyping(true);

    setTimeout(() => {
      let replyText = `Thanks for reaching out! Our support team is checking your details regarding: "${messageText.trim()}". An officer will assist you right away.`;
      const lower = messageText.toLowerCase();

      if (lower.includes('cashback') || lower.includes('wallet') || lower.includes('balance') || lower.includes('money') || lower.includes('refund')) {
        replyText = `💳 Your Setu Pay balance is ৳1,850. Cashback from verified food orders & rides is credited automatically within 10 minutes!`;
      } else if (lower.includes('coupon') || lower.includes('code') || lower.includes('discount') || lower.includes('promo')) {
        replyText = `🎟️ Active code today: Use "FOODPAD100" for ৳100 OFF food orders above ৳500, or "UBERFREE" for intercity toll exemption!`;
      } else if (lower.includes('raid') || lower.includes('complain') || lower.includes('magistrate') || lower.includes('hygiene') || lower.includes('food')) {
        replyText = `⚖️ Executive Magistrate mobile court raids are updated under 'Complain & Issues'. Sultan's Kacchi (Dhanmondi) & Kacchi Bhai have official compliance reports!`;
      } else if (lower.includes('ride') || lower.includes('pathao') || lower.includes('uber') || lower.includes('indrive') || lower.includes('fare')) {
        replyText = `🚗 InDrive fare bidding is currently 18% lower than Uber for Dhanmondi–Gulshan routes today. Check our live fare comparison calculator!`;
      } else if (lower.includes('skincare') || lower.includes('authentic') || lower.includes('cerave') || lower.includes('cosrx')) {
        replyText = `✨ All skincare products listed on OfferMatrix (CeraVe, COSRX, The Ordinary) undergo barcode authenticity verification with Choice Legacy BD!`;
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        replyText = `👋 Hello! I am online and active right now. Please select or type what you need help with: Food, Rides, Skincare, or Wallet Refund!`;
      }

      const agentMsg = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        name: 'Nusrat Jahan (Setu Officer)',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, agentMsg]);
      setIsAgentTyping(false);
      onToast('💬 New message from Nusrat Jahan (Support Officer)');
    }, 1000);
  };

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isBankCardsModalOpen, setIsBankCardsModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Complaints & General Promo Problems Dataset
  const [complaintsData, setComplaintsData] = useState([
    {
      id: 'cmp-1',
      isRaid: true,
      title: 'Sultan\'s Kacchi — Mutton Sultan Thali (Viral Biryani)',
      category: 'food',
      target: 'Sultan\'s Kacchi — Dhanmondi 27 Branch',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Fined & Sealed',
      statusClass: 'badge-status-escalated',
      date: '25 Aug 2026',
      desc: 'Unhygienic kitchen floor with uncovered cooked meat. 50kg stale mutton confiscated & spot fine issued.',
      location: 'Dhanmondi 27 Branch',
      penalty: '৳1,00,000 Spot Fine',
      inspector: 'Executive Magistrate Sarwar Alam (Safe Food Mobile Unit #3)',
      resolution: 'Mobile court sealed kitchen operations until full compliance report submitted.',
      seizedItems: '50kg stale uncooked mutton stored near waste bins, 20L reused burnt oil, uncertified food colors.',
      legalSection: 'Safe Food Act 2013, Section 31 & Section 42',
      courtMemo: 'BSFA-MOBILE-COURT-2026/884',
      courtQuote: 'Food hygiene standards were severely compromised. ৳1,00,000 fine imposed and outlet sealed until reinspection.',
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
      supportCount: 142,
      discussCount: 48
    },
    {
      id: 'cmp-2',
      isRaid: true,
      title: 'Kacchi Bhai — Kacchi Platter Combo',
      category: 'food',
      target: 'Kacchi Bhai — Gulshan-2 Circle',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Re-inspected & Cleared',
      statusClass: 'badge-status-green',
      date: '18 Aug 2026',
      desc: 'Rusted ghee oil drums stored near main stoves. Expired spices batch #982 confiscated.',
      location: 'Gulshan-2 Circle',
      penalty: '৳2,00,000 Court Fine',
      inspector: 'DNCC Executive Magistrate & BSFA Joint Inspection Team',
      resolution: 'Fined ৳2,00,000. Replaced storage containers with grade stainless steel. Passed reinspection.',
      seizedItems: '4 rusted ghee drums, 15kg expired chili powder batch #982.',
      legalSection: 'DNCC Health Ordinance 2019, Section 14',
      courtMemo: 'DNCC-COURT-2026/412',
      courtQuote: 'Restaurant fulfilled all compliance requirements and installed automated stainless steel oil dispensers.',
      img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=500&q=80',
      supportCount: 98,
      discussCount: 32
    },
    {
      id: 'cmp-3',
      isRaid: true,
      title: 'Star Kabab & Restaurant — Star Special Mutton Leg Roast',
      category: 'food',
      target: 'Star Kabab — Banani Outlet',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Under Review',
      statusClass: 'badge-status-blue-review',
      date: '12 Aug 2026',
      desc: 'Stale cooked gravies stored in non-freezer room. Unhygienic washing sinks & open drainage.',
      location: 'Banani Outlet',
      penalty: '৳1,50,000 Spot Fine',
      inspector: 'Bangladesh Safe Food Authority Inspector Team',
      resolution: 'Case under active review by Metropolitan Magistrate Court following spot inspection.',
      seizedItems: '30kg stale cooked mutton gravies, unwashed kitchen prep tables.',
      legalSection: 'Safe Food Act 2013, Section 28',
      courtMemo: 'BSFA-MOBILE-COURT-2026/902',
      courtQuote: 'Owner given 7 days notice to overhaul ventilation system and repair kitchen drainage.',
      img: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?auto=format&fit=crop&w=500&q=80',
      supportCount: 84,
      discussCount: 29
    },
    {
      id: 'cmp-4',
      isRaid: true,
      title: 'Chillox — Cheesy Beef Burger (Viral Deal)',
      category: 'food',
      target: 'Chillox — Uttara Sector 11',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Operations Suspended',
      statusClass: 'badge-status-escalated',
      date: '05 Aug 2026',
      desc: 'Expired mayonnaise batch #34 used in sauces. Substandard cold room storage temperature (+14°C).',
      location: 'Uttara Sector 11',
      penalty: '৳80,000 Spot Fine',
      inspector: 'DNCC Executive Magistrate Court Unit #2',
      resolution: 'Cold room usage suspended. Sauce batches destroyed on spot in magistrate presence.',
      seizedItems: '45 jars expired mayonnaise, 20kg unchilled beef patties.',
      legalSection: 'Safe Food Ordinance Section 19',
      courtMemo: 'DNCC-COURT-2026/509',
      courtQuote: 'Sauce batches destroyed on spot. Cold room operations suspended until cooling unit replaced.',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
      supportCount: 115,
      discussCount: 37
    },
    {
      id: 'cmp-raid-5',
      isRaid: true,
      title: 'Chef\'s Table Courts — Multi-Cuisine Food Court Raid',
      category: 'food',
      target: 'Chef\'s Table Courts — Gulshan Centerpoint',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Fined & Resolved',
      statusClass: 'badge-status-green',
      date: '28 Jul 2026',
      desc: 'Uncertified imported cheese, lack of central water testing reports, improper staff aprons & hairnets.',
      location: 'Gulshan Centerpoint',
      penalty: '৳3,00,000 Joint Fine',
      inspector: 'Executive Magistrate Sarwar Alam & DNCC Health Inspection',
      resolution: 'Stalls fined combined ৳3 Lakh. Management installed central UV water purification.',
      seizedItems: '40kg uncertified imported cheese blocks, uncalibrated water filters.',
      legalSection: 'Safe Food Act 2013, Section 35',
      courtMemo: 'BSFA-MOBILE-COURT-2026/711',
      courtQuote: 'Management mandated central UV filtration for all stalls and staff hygiene training.',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80',
      supportCount: 76,
      discussCount: 18
    },
    {
      id: 'cmp-raid-6',
      isRaid: true,
      title: 'Takeout Burgers — Smash Burger Outlet',
      category: 'food',
      target: 'Takeout Burgers — Dhanmondi Road 2',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Re-inspected & Cleared',
      statusClass: 'badge-status-green',
      date: '20 Jul 2026',
      desc: 'Stale burger patties stored past 48h limit, unwashed table tops, grease build-up in exhaust hoods.',
      location: 'Dhanmondi Road 2',
      penalty: '৳1,20,000 Spot Fine',
      inspector: 'Safe Food Authority Mobile Court #1',
      resolution: 'Spot fine ৳1.2 Lakh paid. Deep cleaning completed under BSFA supervision.',
      seizedItems: '25kg stale ground beef, unwashed stainless steel trays.',
      legalSection: 'Safe Food Act 2013, Section 31',
      courtMemo: 'BSFA-MOBILE-COURT-2026/650',
      courtQuote: 'Outlet paid fine and underwent mandatory sanitation audit.',
      img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80',
      supportCount: 63,
      discussCount: 14
    },
    {
      id: 'cmp-raid-7',
      isRaid: true,
      title: 'Bismillah Biryani — Old Dhaka Special Kacchi',
      category: 'food',
      target: 'Bismillah Biryani — Nazira Bazar, Old Dhaka',
      badge: '⚖️ MAGISTRATE RAID',
      badgeColor: '#ef4444',
      status: 'Fined & Sealed',
      statusClass: 'badge-status-escalated',
      date: '02 Jul 2026',
      desc: 'Artificial non-food textile dye (Red-40) found mixed into biryani rice. Unhygienic open cooking pit.',
      location: 'Nazira Bazar, Old Dhaka',
      penalty: '৳1,75,000 Fine & Sealed',
      inspector: 'Executive Magistrate Sarwar Alam',
      resolution: 'Textile dye confiscated on spot. Outlet sealed for 14 days and court case filed.',
      seizedItems: '5kg textile dye #Red-40, 100kg contaminated rice batch.',
      legalSection: 'Safe Food Act 2013, Section 41 (Adulteration Penalty)',
      courtMemo: 'BSFA-MOBILE-COURT-2026/501',
      courtQuote: 'Using industrial chemical dye in biryani is a severe criminal offense. Outlet sealed and case sent to court.',
      img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80',
      supportCount: 210,
      discussCount: 65
    },
    {
      id: 'cmp-5',
      title: 'Meter Tampering & Extra Cash Extortion',
      category: 'ride',
      target: 'Uber BD — Driver #UBER-DRV-8492',
      badge: '🚗 RIDE ISSUE',
      badgeColor: '#3b82f6',
      status: 'Escalated',
      statusClass: 'badge-status-escalated',
      date: '27 Aug 2026',
      desc: 'Demanded ৳250 extra cash over app fare near Airport road and threatened to cancel ride mid-highway.',
      location: 'Airport – Uttara Route',
      penalty: 'Driver Account Suspended',
      inspector: 'UBER-DRV-8492',
      resolution: 'Uber BD suspended driver for 30 days pending police report.',
      img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=500&q=80',
      supportCount: 89,
      discussCount: 31
    },
    {
      id: 'cmp-6',
      title: 'Reckless Overspeeding & Misbehavior',
      category: 'ride',
      target: 'Pathao BD — Driver #PATHAO-DRV-3104',
      badge: '🚗 RIDE ISSUE',
      badgeColor: '#3b82f6',
      status: 'Escalated',
      statusClass: 'badge-status-escalated',
      date: '22 Aug 2026',
      desc: 'Rider drove aggressively over speed limits and engaged in verbal misbehavior during evening rush hour.',
      location: 'Farmgate Overpass Route',
      penalty: 'Account Flagged',
      inspector: 'PATHAO-DRV-3104',
      resolution: 'Complaint escalated to Pathao safety team for review.',
      img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=500&q=80',
      supportCount: 56,
      discussCount: 14
    },
    {
      id: 'cmp-7',
      title: 'Fake COSRX Snail Mucin sold on Facebook Page "GlowSkin BD"',
      category: 'skincare',
      target: 'GlowSkin BD — Facebook Page',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Scam Blacklisted',
      statusClass: 'badge-status-red',
      date: '25 Aug 2026',
      desc: 'Received counterfeit bottle without security hologram seal. Packaging colour was off and product smelled synthetic.',
      location: 'Online — Facebook Shop',
      penalty: 'Page Reported & Removed',
      inspector: 'BD Police Cyber Crime Unit',
      resolution: 'Facebook page reported and removed. Case filed with cyber crime unit.',
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80',
      supportCount: 112,
      discussCount: 44
    },
    {
      id: 'cmp-8',
      title: 'The Ordinary Niacinamide — Expired Batch Sold',
      category: 'skincare',
      target: 'BeautyGlow BD — Daraz Store',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Under Review',
      statusClass: 'badge-status-blue-review',
      date: '19 Aug 2026',
      desc: 'Product expiry date was scratched off. Seller refused refund after complaint.',
      location: 'Daraz Online Marketplace',
      penalty: 'Store Suspended',
      inspector: 'Daraz BD Trust & Safety Team',
      resolution: 'Daraz suspended seller account pending investigation.',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
      supportCount: 78,
      discussCount: 27
    },
    {
      id: 'cmp-sf-1',
      title: 'Fake CeraVe Hydrating Cleanser 473ml sold on "SkinCare Vault BD"',
      category: 'skincare',
      target: 'SkinCare Vault BD — Facebook Page',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Scam Blacklisted',
      statusClass: 'badge-status-red',
      date: '28 Aug 2026',
      desc: 'Diluted solution mixed with soapy water without anti-fake QR hologram. Caused facial burning and skin redness.',
      location: 'Online — Facebook Shop',
      penalty: 'Page Blocked & Banned',
      inspector: 'BD Police Cyber Crime Unit',
      resolution: 'Facebook shop reported and removed. Wallet accounts frozen.',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80',
      supportCount: 156,
      discussCount: 52
    },
    {
      id: 'cmp-sf-2',
      title: 'Fake Beauty of Joseon Relief Sunscreen sold on Instagram',
      category: 'skincare',
      target: 'KBeautyTrends BD — Instagram Shop',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Scam Blacklisted',
      statusClass: 'badge-status-red',
      date: '26 Aug 2026',
      desc: 'Counterfeit sunscreen tube lacked Korean 3D hologram sticker. Text printed with spelling errors and left heavy white cast.',
      location: 'Online — Instagram Page',
      penalty: 'Account Terminated',
      inspector: 'Consumer Rights Protection Unit',
      resolution: 'Instagram account blacklisted across community safety database.',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
      supportCount: 134,
      discussCount: 41
    },
    {
      id: 'cmp-sf-3',
      title: 'Fake Anua Heartleaf 77% Soothing Toner sold on Daraz',
      category: 'skincare',
      target: 'GlamourBox BD — Daraz Seller',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Under Review',
      statusClass: 'badge-status-blue-review',
      date: '24 Aug 2026',
      desc: 'Bottle contained plain perfumed water. Seller scratched off batch number and blocked refund requests.',
      location: 'Daraz Online Marketplace',
      penalty: 'Store Suspended',
      inspector: 'Daraz BD Trust & Safety Team',
      resolution: 'Daraz seller store suspended pending investigation.',
      img: 'https://images.unsplash.com/photo-1608248597263-00de4680c74f?auto=format&fit=crop&w=500&q=80',
      supportCount: 89,
      discussCount: 33
    },
    {
      id: 'cmp-sf-4',
      title: 'Counterfeit Skin1004 Madagascar Centella Ampoule',
      category: 'skincare',
      target: 'GlowDaily BD — Facebook Page',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Under Review',
      statusClass: 'badge-status-blue-review',
      date: '21 Aug 2026',
      desc: 'Dropper bottle filled with plain glycerin water. Seller blocked buyer immediately after receiving bKash payment.',
      location: 'Online — Facebook Shop',
      penalty: 'bKash Wallet Frozen',
      inspector: 'Cyber Police Fraud Division',
      resolution: 'Complaint submitted with bKash transaction proof. Account flagged for refund.',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80',
      supportCount: 94,
      discussCount: 28
    },
    {
      id: 'cmp-sf-5',
      title: 'Fake La Roche-Posay Effaclar Duo+ sold on "FrenchBeauty BD"',
      category: 'skincare',
      target: 'FrenchBeauty BD — Facebook Page',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Scam Blacklisted',
      statusClass: 'badge-status-red',
      date: '17 Aug 2026',
      desc: 'Fake French tube with incorrect typography and no barcode scan match. Caused severe allergic rash.',
      location: 'Online — Facebook Shop',
      penalty: 'Page Terminated',
      inspector: 'BD Police Cyber Crime Unit',
      resolution: 'FB Page reported and terminated. Victims offered refund assistance.',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80',
      supportCount: 167,
      discussCount: 59
    },
    {
      id: 'cmp-sf-6',
      title: 'Expired Peeling Solution AHA 30% sold on Facebook Page',
      category: 'skincare',
      target: 'AestheticSkin BD — Facebook Page',
      badge: '💧 SKINCARE FRAUD',
      badgeColor: '#ec4899',
      status: 'Scam Blacklisted',
      statusClass: 'badge-status-red',
      date: '14 Aug 2026',
      desc: 'Expiry date label scrubbed off. Red peeling acid had turned dark brown and separated into thick sludge.',
      location: 'Online — Facebook Shop',
      penalty: 'Page Blacklisted',
      inspector: 'OfferMatrix Fraud Protection',
      resolution: 'Page added to OfferMatrix blacklisted fraud list.',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
      supportCount: 121,
      discussCount: 45
    },
    {
      id: 'cmp-9',
      title: 'Promo Code FOODPANDA50 Failed at Checkout',
      category: 'app',
      target: 'OfferMatrix App — General Issue',
      badge: '⚙️ GENERAL ISSUE',
      badgeColor: '#eab308',
      status: 'Resolved',
      statusClass: 'badge-status-green',
      date: 'Today',
      desc: 'Code failed during checkout, causing order #OM-8921 to be placed without applying valid ৳50 discount.',
      location: 'Coupon & Promotion Error',
      penalty: 'Code: FOODPANDA50',
      inspector: 'OfferMatrix Support Team',
      resolution: '৳50 wallet credit issued manually within 30 minutes of complaint.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80',
      supportCount: 33,
      discussCount: 9
    },
    {
      id: 'cmp-10',
      title: 'Sultan\'s Kacchi Unhygienic Kitchen Penalty',
      category: 'app',
      target: 'OfferMatrix Community — General Report',
      badge: '⚙️ GENERAL ISSUE',
      badgeColor: '#eab308',
      status: 'Escalated',
      statusClass: 'badge-status-escalated',
      date: '25 Aug 2026',
      desc: 'Mobile court fined Sultan\'s Kacchi ৳1,00,000 for unhygienic food storage and expired ingredients.',
      location: 'Food Safety Raid',
      penalty: 'Code: N/A',
      inspector: 'Safe Food Authority BD',
      resolution: 'Matter escalated to media and regulatory bodies.',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80',
      supportCount: 201,
      discussCount: 88
    },
    {
      id: 'cmp-11',
      title: 'Rider Extortion Attempt Near Airport Route',
      category: 'app',
      target: 'OfferMatrix Community — General Report',
      badge: '⚙️ GENERAL ISSUE',
      badgeColor: '#eab308',
      status: 'Resolved',
      statusClass: 'badge-status-green',
      date: '27 Aug 2026',
      desc: 'Rider #8492 demanded ৳250 extra cash over app fare. Account suspended for 30 days.',
      location: 'Rider Misconduct',
      penalty: 'Code: N/A',
      inspector: 'Uber BD Safety Division',
      resolution: 'Driver permanently suspended after second complaint within 60 days.',
      img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=500&q=80',
      supportCount: 155,
      discussCount: 61
    }
  ]);

  const ALL_COUPONS_DATA = [
    { code: 'FOOD10', title: 'Extra 10% OFF on Food', store: 'foodpanda & Foodie', category: 'food', minOrder: 'Above ৳199', expiry: 'Valid till 30 Sep', img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=300&q=80' },
    { code: 'PANDA20', title: '20% OFF First 3 Orders', store: 'foodpanda BD', category: 'food', minOrder: 'Above ৳250', expiry: 'Valid till 15 Oct', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80' },
    { code: 'KACCHI50', title: 'Flat ৳50 OFF Biryani', store: 'Kacchi Bhai', category: 'food', minOrder: 'Above ৳299', expiry: 'Valid till 20 Sep', img: '/assets/biryani.jpg' },
    { code: 'RIDE10', title: '10% Cashback on Rides', store: 'Uber & Pathao', category: 'ride', minOrder: 'Above ৳150', expiry: 'Valid till 30 Sep', img: '/assets/blue_car.jpg' },
    { code: 'PATHAO15', title: '15% OFF Dhaka Rides', store: 'Pathao Rides', category: 'ride', minOrder: 'Above ৳100', expiry: 'Valid till 10 Oct', img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=300&q=80' },
    { code: 'UBERFREE', title: 'Free Intercity Toll', store: 'Uber Intercity', category: 'ride', minOrder: 'Above ৳1,000', expiry: 'Valid till 05 Oct', img: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=300&q=80' },
    { code: 'SKIN10', title: 'Extra 10% OFF Skincare', store: 'Choice Legacy & Kirei', category: 'skincare', minOrder: 'Above ৳999', expiry: 'Valid till 30 Sep', img: '/assets/skincare.jpg' },
    { code: 'BEAUTY15', title: '15% OFF CeraVe & COSRX', store: 'Makeup Chari', category: 'skincare', minOrder: 'Above ৳1,500', expiry: 'Valid till 25 Oct', img: 'https://images.unsplash.com/photo-1608248597263-00de4680c74f?auto=format&fit=crop&w=300&q=80' }
  ];

  const ALL_REVIEWS_DATA = [
    { name: 'Sakib A.', location: 'Dhanmondi', rating: 5, category: 'food', item: 'Bismillah Biryani', comment: 'Bismillah Biryani was super fresh and hot! Arrived in 25 minutes via foodpanda.', date: 'Today', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', itemImg: '/assets/biryani.jpg' },
    { name: 'Tanvir H.', location: 'Banani', rating: 5, category: 'ride', item: 'InDrive Ride', comment: 'InDrive fare bidding saved me ৳80 compared to Uber today for Banani trip!', date: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', itemImg: '/assets/blue_car.jpg' },
    { name: 'Nabila K.', location: 'Gulshan', rating: 5, category: 'skincare', item: 'CeraVe Hydrating', comment: 'CeraVe Cleanser from Choice Legacy is 100% authentic original product. Very fast delivery.', date: '3 days ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', itemImg: '/assets/skincare.jpg' },
    { name: 'Fahim M.', location: 'Uttara', rating: 4, category: 'food', item: 'Pizza Hut Farmhouse', comment: 'Great crust and cheesy topping. Used FOOD10 code and got extra discount.', date: '4 days ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', itemImg: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80' },
    { name: 'Raisa S.', location: 'Mirpur', rating: 5, category: 'skincare', item: 'The Ordinary Serum', comment: 'Real Niacinamide serum! Saw noticeable skin glowing result in 2 weeks.', date: '5 days ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', itemImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80' },
    { name: 'Mehedi H.', location: 'Motijheel', rating: 4, category: 'ride', item: 'Pathao Car', comment: 'Clean car and polite driver Rahim. Very comfortable commute.', date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', itemImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=300&q=80' }
  ];

  const handleAddNewComplaint = (e) => {
    e.preventDefault();
    if (!newComplaintDesc.trim()) return;

    const newTicket = {
      id: `cmp-${Date.now()}`,
      title: `Complaint re: ${newComplaintTarget} (${newComplaintCategory.toUpperCase()})`,
      category: newComplaintCategory,
      target: newComplaintTarget,
      status: 'Under Review 🟡',
      statusClass: 'badge-status-yellow',
      date: 'Just now',
      desc: newComplaintDesc,
      resolution: 'Ticket #TCK-' + Math.floor(1000 + Math.random() * 9000) + ' created. Our support team will respond within 2 hours.'
    };

    setComplaintsData([newTicket, ...complaintsData]);
    setNewComplaintDesc('');
    setIsFilingNewComplaint(false);
    onToast('🎉 Complaint ticket submitted successfully! Our team is on it.');
  };

  const filteredComplaints = complaintsData.filter(cmp => {
    const matchesCat = complainCategoryFilter === 'all' ? true : cmp.category === complainCategoryFilter;
    const matchesQuery = complainSearchQuery.trim() === '' ? true : (
      cmp.title.toLowerCase().includes(complainSearchQuery.toLowerCase()) ||
      cmp.desc.toLowerCase().includes(complainSearchQuery.toLowerCase()) ||
      cmp.target.toLowerCase().includes(complainSearchQuery.toLowerCase())
    );
    return matchesCat && matchesQuery;
  });

  // Interactive Skincare State & Datasets
  const [selectedSkincareCategory, setSelectedSkincareCategory] = useState('Face Wash');
  const [skincareSearchQuery, setSkincareSearchQuery] = useState('');

  const SKINCARE_CATEGORIES = [
    { id: 'All', label: 'All Products', icon: '✨' },
    { id: 'Face Wash', label: 'Face Wash', icon: '🧴' },
    { id: 'Moisturizer', label: 'Moisturizer', icon: '💧' },
    { id: 'Serum', label: 'Serum / Ampoule', icon: '🧪' },
    { id: 'Mask', label: 'Mask', icon: '🎭' },
    { id: 'Sunscreen', label: 'Sunscreen', icon: '☀️' },
    { id: 'Toner', label: 'Toner', icon: '💧' }
  ];

  const SKINCARE_FEATURES = [
    { label: 'Best Prices', sub: 'Find lowest price', icon: '✔️' },
    { label: '100% Authentic', sub: 'Original products', icon: '✔️' },
    { label: 'Top Brands', sub: 'Trusted & popular', icon: '⭐' },
    { label: 'Expert Reviews', sub: 'Read before you buy', icon: '🖊️' },
    { label: 'Exclusive Offers', sub: 'Save more today', icon: '🎁' },
    { label: 'Easy Returns', sub: 'Hassle-free guarantee', icon: '🔄' }
  ];

  const SKINCARE_DEALS_DATA = [
    {
      id: 'skin-1',
      brand: 'CeraVe Hydrating',
      subTitle: 'Facial Cleanser 236ml',
      rating: 4.5,
      ratingCount: '2.1k',
      currPrice: 1250,
      oldPrice: 1650,
      discountPct: 24,
      saveAmount: 400,
      badge: 'BEST DEAL',
      storeTag: 'Choice Legacy',
      category: 'Face Wash',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-2',
      brand: 'The Ordinary',
      subTitle: 'Niacinamide 10% + Zinc 1% 30ml',
      rating: 4.5,
      ratingCount: '1.8k',
      currPrice: 890,
      oldPrice: 1200,
      discountPct: 26,
      saveAmount: 310,
      badge: null,
      storeTag: 'kirei',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-3',
      brand: 'La Roche-Posay',
      subTitle: 'Anthelios Sunscreen 50ml',
      rating: 4.7,
      ratingCount: '3.2k',
      currPrice: 1690,
      oldPrice: 2200,
      discountPct: 23,
      saveAmount: 510,
      badge: null,
      storeTag: 'Makeup Chari',
      category: 'Sunscreen',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-4',
      brand: 'Simple Kind To Skin',
      subTitle: 'Moisturising Facial Wash 150ml',
      rating: 4.4,
      ratingCount: '1.2k',
      currPrice: 650,
      oldPrice: 850,
      discountPct: 24,
      saveAmount: 200,
      badge: null,
      storeTag: 'Choice Legacy',
      category: 'Face Wash',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-5',
      brand: 'COSRX Advanced',
      subTitle: '96 Snail Mucin Power Essence 100ml',
      rating: 4.6,
      ratingCount: '1.9k',
      currPrice: 1550,
      oldPrice: 1950,
      discountPct: 20,
      saveAmount: 400,
      badge: null,
      storeTag: 'kirei',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-6',
      brand: 'Beauty of Joseon',
      subTitle: 'Relief Sun: Rice + Probiotics SPF50+ 50ml',
      rating: 4.8,
      ratingCount: '2.9k',
      currPrice: 1350,
      oldPrice: 1750,
      discountPct: 23,
      saveAmount: 400,
      badge: 'TOP SUNSCREEN',
      storeTag: 'Choice Legacy',
      category: 'Sunscreen',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-7',
      brand: 'Anua Heartleaf',
      subTitle: '77% Soothing Toner 250ml',
      rating: 4.7,
      ratingCount: '1.6k',
      currPrice: 1890,
      oldPrice: 2400,
      discountPct: 21,
      saveAmount: 510,
      badge: 'VIRAL TONER',
      storeTag: 'kirei',
      category: 'Toner',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-8',
      brand: "Paula's Choice",
      subTitle: 'Skin Perfecting 2% BHA Liquid 118ml',
      rating: 4.9,
      ratingCount: '3.5k',
      currPrice: 2450,
      oldPrice: 3100,
      discountPct: 21,
      saveAmount: 650,
      badge: 'BEST EXFOLIANT',
      storeTag: 'Makeup Chari',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-9',
      brand: 'SKIN1004',
      subTitle: 'Madagascar Centella Ampoule 100ml',
      rating: 4.8,
      ratingCount: '2.2k',
      currPrice: 1450,
      oldPrice: 1900,
      discountPct: 24,
      saveAmount: 450,
      badge: null,
      storeTag: 'Beautybooth BD',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-10',
      brand: 'Neutrogena',
      subTitle: 'Hydro Boost Water Gel 50g',
      rating: 4.6,
      ratingCount: '1.4k',
      currPrice: 1150,
      oldPrice: 1500,
      discountPct: 23,
      saveAmount: 350,
      badge: null,
      storeTag: 'Choice Legacy',
      category: 'Moisturizer',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-11',
      brand: 'Innisfree',
      subTitle: 'Green Tea Seed Hyaluronic Serum 80ml',
      rating: 4.7,
      ratingCount: '1.8k',
      currPrice: 1650,
      oldPrice: 2100,
      discountPct: 21,
      saveAmount: 450,
      badge: null,
      storeTag: 'Daraz Mall',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-12',
      brand: 'Laneige',
      subTitle: 'Lip Sleeping Mask Berry 20g',
      rating: 4.9,
      ratingCount: '4.1k',
      currPrice: 1290,
      oldPrice: 1650,
      discountPct: 22,
      saveAmount: 360,
      badge: 'BEST SELLER',
      storeTag: 'kirei',
      category: 'Lip Care',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-13',
      brand: 'COSRX Low pH',
      subTitle: 'Good Morning Gel Cleanser 150ml',
      rating: 4.7,
      ratingCount: '2.4k',
      currPrice: 980,
      oldPrice: 1350,
      discountPct: 27,
      saveAmount: 370,
      badge: 'FACE WASH',
      storeTag: 'Choice Legacy',
      category: 'Face Wash',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-14',
      brand: 'COSRX Oil-Free',
      subTitle: 'Ultra-Moisturizing Birch Lotion 100ml',
      rating: 4.8,
      ratingCount: '1.9k',
      currPrice: 1650,
      oldPrice: 2150,
      discountPct: 23,
      saveAmount: 500,
      badge: 'MOISTURIZER',
      storeTag: 'kirei',
      category: 'Moisturizer',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-15',
      brand: 'COSRX Rice Spa',
      subTitle: 'Ultimate Nourishing Overnight Spa Mask 60ml',
      rating: 4.9,
      ratingCount: '2.1k',
      currPrice: 1480,
      oldPrice: 1950,
      discountPct: 24,
      saveAmount: 470,
      badge: 'SPA MASK',
      storeTag: 'Makeup Chari',
      category: 'Mask',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-16',
      brand: 'Purito Centella',
      subTitle: 'Unscented Barrier Serum 60ml',
      rating: 4.8,
      ratingCount: '1.7k',
      currPrice: 1580,
      oldPrice: 2100,
      discountPct: 25,
      saveAmount: 520,
      badge: 'EWG GREEN',
      storeTag: 'kirei',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-17',
      brand: 'Purito Deep Sea',
      subTitle: 'Pure Water Hydration Cream 50ml',
      rating: 4.7,
      ratingCount: '1.3k',
      currPrice: 1620,
      oldPrice: 2100,
      discountPct: 23,
      saveAmount: 480,
      badge: 'MOISTURIZER',
      storeTag: 'Choice Legacy',
      category: 'Moisturizer',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-18',
      brand: 'Purito Defense',
      subTitle: 'Barrier pH 5.5 Cleanser 150ml',
      rating: 4.6,
      ratingCount: '1.1k',
      currPrice: 1150,
      oldPrice: 1550,
      discountPct: 26,
      saveAmount: 400,
      badge: 'FACE WASH',
      storeTag: 'Beautybooth BD',
      category: 'Face Wash',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-19',
      brand: 'Purito Bentolin',
      subTitle: 'Pore Clay Mask Detox 120g',
      rating: 4.8,
      ratingCount: '1.5k',
      currPrice: 1450,
      oldPrice: 1900,
      discountPct: 24,
      saveAmount: 450,
      badge: 'PORE MASK',
      storeTag: 'Makeup Chari',
      category: 'Mask',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-20',
      brand: 'Anua Niacinamide 10%',
      subTitle: 'TXA 4% Dark Spot Correcting Serum 30ml',
      rating: 4.9,
      ratingCount: '3.1k',
      currPrice: 1950,
      oldPrice: 2500,
      discountPct: 22,
      saveAmount: 550,
      badge: 'BRIGHTENING AMPOULE',
      storeTag: 'kirei',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-21',
      brand: 'Anua Heartleaf 70%',
      subTitle: 'Intense Calming Moisture Cream 50ml',
      rating: 4.8,
      ratingCount: '2.3k',
      currPrice: 1850,
      oldPrice: 2400,
      discountPct: 23,
      saveAmount: 550,
      badge: 'MOISTURIZER',
      storeTag: 'Choice Legacy',
      category: 'Moisturizer',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-22',
      brand: 'Anua Quercetinol',
      subTitle: 'Heartleaf Pore Deep Cleansing Foam 150ml',
      rating: 4.7,
      ratingCount: '1.8k',
      currPrice: 1250,
      oldPrice: 1650,
      discountPct: 24,
      saveAmount: 400,
      badge: 'FACE WASH',
      storeTag: 'Beautybooth BD',
      category: 'Face Wash',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-23',
      brand: 'SKIN1004 Tone Brightening',
      subTitle: 'Madagascar Centella Capsule Ampoule 100ml',
      rating: 4.9,
      ratingCount: '3.4k',
      currPrice: 1680,
      oldPrice: 2200,
      discountPct: 24,
      saveAmount: 520,
      badge: 'BRIGHTENING AMPOULE',
      storeTag: 'Choice Legacy',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-24',
      brand: 'The Purest Solutions',
      subTitle: 'AHA 10% + BHA 2% Peeling Serum 30ml',
      rating: 4.8,
      ratingCount: '2.5k',
      currPrice: 1420,
      oldPrice: 1850,
      discountPct: 23,
      saveAmount: 430,
      badge: 'PEELING SERUM',
      storeTag: 'Makeup Chari',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-25',
      brand: 'The Purest Solutions',
      subTitle: 'Intense Hydration Oil-Free Gel Moisturizer 50ml',
      rating: 4.7,
      ratingCount: '1.9k',
      currPrice: 1490,
      oldPrice: 1950,
      discountPct: 24,
      saveAmount: 460,
      badge: 'MOISTURIZER',
      storeTag: 'Choice Legacy',
      category: 'Moisturizer',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-26',
      brand: 'The Purest Solutions',
      subTitle: 'Gentle Facial Cleansing Gel 200ml',
      rating: 4.6,
      ratingCount: '1.4k',
      currPrice: 1180,
      oldPrice: 1550,
      discountPct: 24,
      saveAmount: 370,
      badge: 'FACE WASH',
      storeTag: 'kirei',
      category: 'Face Wash',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-27',
      brand: 'The Purest Solutions',
      subTitle: 'Purifying Kaolin & Zinc Clay Mask 100ml',
      rating: 4.8,
      ratingCount: '1.6k',
      currPrice: 1380,
      oldPrice: 1800,
      discountPct: 23,
      saveAmount: 420,
      badge: 'CLAY MASK',
      storeTag: 'Beautybooth BD',
      category: 'Mask',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-28',
      brand: 'The Purest Solutions',
      subTitle: 'Hyaluronic Acid 2% + B5 Brightening Serum 30ml',
      rating: 4.9,
      ratingCount: '2.8k',
      currPrice: 1390,
      oldPrice: 1800,
      discountPct: 23,
      saveAmount: 410,
      badge: 'HYDRATION BOOST',
      storeTag: 'kirei',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-29',
      brand: 'Anua Heartleaf 70%',
      subTitle: 'Mud Wash-Off Pore Soothing Mask 100ml',
      rating: 4.8,
      ratingCount: '1.7k',
      currPrice: 1680,
      oldPrice: 2200,
      discountPct: 24,
      saveAmount: 520,
      badge: 'SOOTHING MASK',
      storeTag: 'Makeup Chari',
      category: 'Mask',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'skin-30',
      brand: 'Skin&Lab Vitamin C',
      subTitle: 'Brightening Ampoule Serum 30ml',
      rating: 4.8,
      ratingCount: '2.0k',
      currPrice: 1550,
      oldPrice: 2000,
      discountPct: 22,
      saveAmount: 450,
      badge: 'BRIGHTENING AMPOULE',
      storeTag: 'Choice Legacy',
      category: 'Serum',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const SKINCARE_TOP_BRANDS = [
    { name: 'CeraVe', rating: 4.6, reviews: '2.5k', avatar: 'CeraVe', bg: '#0284c7' },
    { name: 'COSRX', rating: 4.8, reviews: '3.4k', avatar: 'COSRX', bg: '#1e293b' },
    { name: 'Anua', rating: 4.9, reviews: '2.9k', avatar: 'Anua', bg: '#059669' },
    { name: 'Purito', rating: 4.7, reviews: '2.1k', avatar: 'Purito', bg: '#0d9488' },
    { name: 'The Purest Solutions', rating: 4.8, reviews: '1.9k', avatar: 'TPS', bg: '#7c3aed' }
  ];

  const TRENDING_SKINCARE_ITEMS = [
    { icon: '🍊', title: 'Brightening Ampoules', sub: 'Dark Spot Corrector' },
    { icon: '🧪', title: 'The Purest Solutions AHA/BHA', sub: 'Exfoliating Peeling' },
    { icon: '🐌', title: 'COSRX Snail Mucin', sub: 'Barrier Hydration' },
    { icon: '🌿', title: 'Anua Heartleaf 77%', sub: 'Redness Soothing' }
  ];

  const filteredSkincareDeals = SKINCARE_DEALS_DATA.filter(deal => {
    const matchesCat = (selectedSkincareCategory === 'All')
      ? true
      : deal.category === selectedSkincareCategory;
    const matchesQuery = skincareSearchQuery.trim() === '' ? true : (
      deal.brand.toLowerCase().includes(skincareSearchQuery.toLowerCase()) ||
      deal.subTitle.toLowerCase().includes(skincareSearchQuery.toLowerCase()) ||
      deal.storeTag.toLowerCase().includes(skincareSearchQuery.toLowerCase()) ||
      deal.category.toLowerCase().includes(skincareSearchQuery.toLowerCase())
    );
    return matchesCat && matchesQuery;
  });

  const DHAKA_LOCATIONS = [
    'Dhanmondi, Dhaka',
    'Gulshan 2, Dhaka',
    'Gulshan 1, Dhaka',
    'Uttara, Dhaka',
    'Banani, Dhaka',
    'Mirpur 10, Dhaka',
    'Motijheel, Dhaka',
    'Shahbagh, Dhaka',
    'Mohakhali, Dhaka',
    'Bashundhara R/A, Dhaka',
    'Hazrat Shahjalal International Airport, Dhaka'
  ];

  const VEHICLE_TYPES = [
    'Car / Sedan (AC)',
    'CNG Auto Rickshaw',
    'Bike / Motorcycle',
    'Microbus / HiAce (AC)',
    'Premium SUV (AC)'
  ];

  const SEAT_OPTIONS = [
    '1 Passenger (Motorcycle)',
    '2 Passengers (CNG)',
    '4 Passengers (Regular)',
    '6 Passengers (Micro/SUV)',
    '7+ Passengers (Large Group)'
  ];

  const handleSwapLocations = () => {
    setPickupLocation(dropLocation);
    setDropLocation(pickupLocation);
    onToast(`Swapped: ${dropLocation.split(',')[0]} ⇄ ${pickupLocation.split(',')[0]}`);
  };

  const handleAddStopSubmit = (e) => {
    e.preventDefault();
    if (newStopInput.trim()) {
      setStopsList([...stopsList, newStopInput.trim()]);
      onToast(`Added stop: "${newStopInput.trim()}"`);
      setNewStopInput('');
      setIsAddingStop(false);
    }
  };

  const handleRemoveStop = (index) => {
    const updated = stopsList.filter((_, i) => i !== index);
    setStopsList(updated);
    onToast('Stop removed');
  };

  const handleSearchRides = () => {
    setIsSearchingRides(true);
    onToast(`Searching rides from ${pickupLocation.split(',')[0]} to ${dropLocation.split(',')[0]}... 🚗`);
    setTimeout(() => {
      setIsSearchingRides(false);
      const el = document.getElementById('ride-options-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const getDynamicRouteInfo = () => {
    const key = `${pickupLocation} -> ${dropLocation}`;
    const reverseKey = `${dropLocation} -> ${pickupLocation}`;

    const PREDEFINED_ROUTES = {
      'Dhanmondi, Dhaka -> Gulshan 2, Dhaka': { dist: 11.9, time: 17, route: 'Dhanmondi Main Road → Mohakhali Flyover → Gulshan 2' },
      'Gulshan 2, Dhaka -> Dhanmondi, Dhaka': { dist: 11.9, time: 18, route: 'Gulshan Circle 2 → Mohakhali Flyover → Dhanmondi Road 27' },
      'Uttara, Dhaka -> Dhanmondi, Dhaka': { dist: 18.5, time: 34, route: 'Airport Road → Bijoy Sarani Flyover → Dhanmondi' },
      'Dhanmondi, Dhaka -> Uttara, Dhaka': { dist: 18.5, time: 36, route: 'Mirpur Road → Airport Road → House Building Uttara' },
      'Banani, Dhaka -> Motijheel, Dhaka': { dist: 14.2, time: 26, route: 'VIP Road → Moghbazar Flyover → Kakrail → Motijheel' },
      'Motijheel, Dhaka -> Banani, Dhaka': { dist: 14.2, time: 28, route: 'Motijheel → Moghbazar → Mohakhali → Banani Kamal Ataturk' },
      'Mirpur 10, Dhaka -> Gulshan 1, Dhaka': { dist: 12.8, time: 22, route: 'Mirpur 10 → Agargaon → Mohakhali → Gulshan 1' },
      'Gulshan 1, Dhaka -> Mirpur 10, Dhaka': { dist: 12.8, time: 24, route: 'Gulshan 1 → Mohakhali → Agargaon → Mirpur 10' },
    };

    let info = PREDEFINED_ROUTES[key] || PREDEFINED_ROUTES[reverseKey];
    if (!info) {
      const charSum = (pickupLocation.length + dropLocation.length) % 12;
      const dist = parseFloat((7.5 + charSum * 0.9).toFixed(1));
      const time = Math.round(dist * 1.5 + 4);
      const route = `${pickupLocation.split(',')[0]} Main Road → Moghbazar Flyover → ${dropLocation.split(',')[0]}`;
      info = { dist, time, route };
    }

    if (stopsList.length > 0) {
      info = {
        ...info,
        dist: parseFloat((info.dist + stopsList.length * 2.2).toFixed(1)),
        time: info.time + stopsList.length * 6,
        route: `${pickupLocation.split(',')[0]} → ${stopsList.join(' → ')} → ${dropLocation.split(',')[0]}`
      };
    }

    let fareMultiplier = 1.0;
    if (vehicleType.includes('CNG')) fareMultiplier = 0.55;
    else if (vehicleType.includes('Bike') || vehicleType.includes('Motorcycle')) fareMultiplier = 0.35;
    else if (vehicleType.includes('Microbus') || vehicleType.includes('SUV')) fareMultiplier = 1.6;

    return { ...info, fareMultiplier };
  };

  const routeInfo = getDynamicRouteInfo();

  const getDynamicRideProviders = () => {
    const { dist, fareMultiplier } = routeInfo;
    const baseOptions = [
      {
        id: 'indrive',
        brand: 'InDrive',
        badge: 'BEST DISCOUNT ⏳',
        badgeClass: 'badge-best-discount',
        rating: 4.5,
        ratingCount: '14.1k',
        carType: 'Mini Bidding',
        carColor: '#059669',
        seats: seatCount,
        basePrice: Math.round((dist * 16.5 + 10) * fareMultiplier),
        discountPct: 20,
        logoBg: 'bg-indrive-green',
        logoText: 'iD',
        highlightBorder: true,
        timeOffset: 0,
        surge: false,
        femaleDriverAvailable: true
      },
      {
        id: 'pathao',
        brand: 'Pathao',
        badge: 'Cheapest',
        badgeClass: 'badge-cheapest-blue',
        rating: 4.7,
        ratingCount: '22.3k',
        carType: 'Regular',
        carColor: '#dc2626',
        seats: seatCount,
        basePrice: Math.round((dist * 16.8 + 8) * fareMultiplier),
        discountPct: 17,
        logoBg: 'bg-pathao-red',
        logoText: 'P',
        timeOffset: 0,
        surge: false,
        femaleDriverAvailable: true
      },
      {
        id: 'uber',
        brand: 'Uber',
        badge: 'Popular',
        badgeClass: 'badge-popular-blue',
        rating: 4.8,
        ratingCount: '18.5k',
        carType: 'UberGo',
        carColor: '#111827',
        seats: seatCount,
        basePrice: Math.round((dist * 19.2 + 12) * fareMultiplier),
        discountPct: 16,
        logoBg: 'bg-uber-black',
        logoText: 'Uber',
        timeOffset: 0,
        surge: false,
        femaleDriverAvailable: true
      },
      {
        id: 'obhai',
        brand: 'OBHAI',
        badge: 'Fast Driver',
        badgeClass: 'badge-popular-blue',
        rating: 4.6,
        ratingCount: '9.2k',
        carType: 'OBHAI Car',
        carColor: '#d97706',
        seats: seatCount,
        basePrice: Math.round((dist * 20.1 + 14) * fareMultiplier),
        discountPct: 15,
        logoBg: 'bg-obhai-yellow',
        logoText: 'OBHA',
        timeOffset: -2,
        surge: false,
        femaleDriverAvailable: false
      },
      {
        id: 'shohoz',
        brand: 'Shohoz',
        badge: null,
        rating: 4.4,
        ratingCount: '5.8k',
        carType: 'Standard',
        carColor: '#0d9488',
        seats: seatCount,
        basePrice: Math.round((dist * 21.0 + 16) * fareMultiplier),
        discountPct: 13,
        logoBg: 'bg-shohoz-teal',
        logoText: 'S',
        timeOffset: 1,
        surge: false,
        femaleDriverAvailable: false
      }
    ];

    let options = baseOptions.map(opt => {
      const finalFare = Math.round(opt.basePrice * (1 - opt.discountPct / 100));
      const savings = opt.basePrice - finalFare;
      return {
        ...opt,
        finalFare,
        savings
      };
    });

    if (selectedRideFilter === 'cheapest') {
      options.sort((a, b) => a.finalFare - b.finalFare);
    } else if (selectedRideFilter === 'shortest') {
      options.sort((a, b) => a.timeOffset - b.timeOffset);
    } else if (selectedRideFilter === 'best_rated') {
      options.sort((a, b) => b.rating - a.rating);
    } else if (selectedRideFilter === 'no_surge') {
      options = options.filter(o => !o.surge);
    } else if (selectedRideFilter === 'women_drivers') {
      options = options.filter(o => o.femaleDriverAvailable);
    }

    return options;
  };

  const dynamicProviders = getDynamicRideProviders();
  const cheapestOption = [...dynamicProviders].sort((a, b) => a.finalFare - b.finalFare)[0];

  const handleConfirmRideBooking = (rideObj) => {
    const newRideOrder = {
      id: `act-${Date.now()}`,
      category: 'ride',
      title: `${rideObj.brand} Ride (${pickupLocation.split(',')[0]} to ${dropLocation.split(',')[0]})`,
      subtitle: `${rideObj.brand} (${rideObj.carType})`,
      code: `Order #RIDE-${Math.floor(100000 + Math.random() * 900000)} • Just now`,
      status: 'In Transit',
      estTotal: `Est. Total: ৳${rideObj.finalFare}`,
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=120&q=80',
      avatarText: rideObj.logoText,
      bgClass: 'bg-kb',
      summary: {
        orderId: `Order #RIDE-${Math.floor(100000 + Math.random() * 900000)}`,
        date: `Placed Today • ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        type: 'ride',
        driverName: 'Rider: Rahim',
        driverPhone: '01712 345678',
        riderImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
        route: { pickup: pickupLocation, drop: dropLocation },
        items: [
          { name: `${rideObj.brand} ${rideObj.carType}`, qty: `${routeInfo.dist} km`, price: `৳${rideObj.basePrice}`, img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=80&q=80' }
        ],
        subtotal: `৳${rideObj.basePrice}`,
        deliveryFee: '৳0',
        discount: `-৳${rideObj.savings}`,
        total: `৳${rideObj.finalFare}`
      }
    };

    ALL_ACTIVE_ORDERS.unshift(newRideOrder);
    setBookingRideModal(null);
    onToast(`🎉 Ride booked with ${rideObj.brand}! Driver Rahim is on the way.`);
    setActiveTab('orders');
    setSelectedOrder(newRideOrder);
  };

  const userName = currentUser?.name || 'Meherunnesasetu7';

  const formattedUserOrders = (userOrders || []).map(order => {
    const rawSt = order.status || 'PENDING';
    const firstItem = order.items?.[0];
    const itemsTitle = order.items && order.items.length > 0
      ? order.items.map(i => `${i.name}${i.quantity > 1 ? ` x${i.quantity}` : ''}`).join(' + ')
      : 'Food Order';

    const formattedDateStr = order.createdAt
      ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : 'Today';

    const formattedTimeStr = order.createdAt
      ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '';

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      category: order.category || 'food',
      title: itemsTitle,
      subtitle: order.merchantName || 'OfferMatrix Food',
      code: `Order #${order.orderNumber} • ${formattedTimeStr}`,
      status: rawSt === 'PENDING' ? 'Pending' : rawSt === 'CONFIRMED' ? 'Confirmed' : rawSt === 'PREPARING' ? 'Preparing' : rawSt === 'ON_THE_WAY' ? 'In Transit' : rawSt === 'DELIVERED' ? 'Delivered' : rawSt,
      rawStatus: rawSt,
      estTotal: `Total: ৳${Number(order.totalAmount).toLocaleString()}`,
      price: `৳${Number(order.totalAmount).toLocaleString()}`,
      img: firstItem?.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=120&q=80',
      avatarText: order.merchantName ? order.merchantName.substring(0, 2).toUpperCase() : 'OM',
      bgClass: 'bg-kb',
      date: `${formattedDateStr}${formattedTimeStr ? ` • ${formattedTimeStr}` : ''}`,
      summary: {
        orderId: `Order #${order.orderNumber}`,
        date: `Placed on ${formattedDateStr}${formattedTimeStr ? ` • ${formattedTimeStr}` : ''}`,
        type: order.category || 'food',
        rawStatus: rawSt,
        driverName: order.deliveryPartner?.name ? `Rider: ${order.deliveryPartner.name}` : null,
        driverPhone: order.deliveryPartner?.phone || null,
        riderImg: order.deliveryPartner?.avatar || null,
        partnerCode: order.deliveryPartner?.partnerCode || null,
        riderVehicle: order.deliveryPartner?.vehicle || null,
        items: (order.items || []).map(i => ({
          name: i.name,
          qty: `x${i.quantity}`,
          price: `৳${(Number(i.unitPrice) * i.quantity).toLocaleString()}`,
          img: i.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=80&q=80'
        })),
        subtotal: `৳${Number(order.subtotal).toLocaleString()}`,
        deliveryFee: `৳${Number(order.deliveryFee).toLocaleString()}`,
        discount: `-৳${Number(order.discount).toLocaleString()}`,
        total: `৳${Number(order.totalAmount).toLocaleString()}`,
        paymentMethod: order.paymentMethod || 'Cash on Delivery'
      }
    };
  });

  const ALL_ACTIVE_ORDERS = formattedUserOrders.filter(o => o.rawStatus !== 'DELIVERED' && o.rawStatus !== 'CANCELLED');
  const ALL_HISTORY_ORDERS = formattedUserOrders.filter(o => o.rawStatus === 'DELIVERED' || o.rawStatus === 'CANCELLED');

  // Filtering active orders and history by category
  const filteredActiveOrders = ALL_ACTIVE_ORDERS.filter(o =>
    orderCategoryFilter === 'all' ? true : o.category === orderCategoryFilter
  );

  const filteredHistoryOrders = ALL_HISTORY_ORDERS.filter(o =>
    orderCategoryFilter === 'all' ? true : o.category === orderCategoryFilter
  );

  // Active Summary Data
  const currentSummaryOrder = selectedOrder
    ? (typeof selectedOrder.summary === 'object' ? selectedOrder : formattedUserOrders.find(o => o.id === selectedOrder.id || o.id === selectedOrder) || null)
    : (filteredActiveOrders.length > 0 ? filteredActiveOrders[0] : (ALL_ACTIVE_ORDERS.length > 0 ? ALL_ACTIVE_ORDERS[0] : null));

  const activeSummary = currentSummaryOrder ? currentSummaryOrder.summary : null;

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    onToast(`Coupon code ${code} copied to clipboard! 🎉`);
    setTimeout(() => setCopiedCoupon(''), 3000);
  };

  return (
    <div className="dashboard-root">
      {/* Top Sticky Header */}
      <header className="dashboard-top-nav">
        <div className="dashboard-top-left">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <Percent size={20} strokeWidth={3} />
            </div>
            <div className="logo-text">
              Offer<span>Matrix</span>
            </div>
          </div>
        </div>

        <div className="dashboard-top-center">
          <div className="dashboard-search-bar">
            <Search size={17} className="search-icon" />
            <input
              type="text"
              placeholder="Search food, deals, restaurants..."
              className="dash-search-input"
            />
          </div>
        </div>

        <div className="dashboard-top-right">
          <button className="dash-icon-btn" title="Notifications">
            <Bell size={18} />
            <span className="dash-notif-dot"></span>
          </button>

          <button className="dash-saved-btn" onClick={onOpenSaved}>
            <Heart size={16} fill="#ff2b70" color="#ff2b70" />
            <span>Saved (6)</span>
          </button>

          <div
            className="dash-user-profile-chip"
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="user-avatar-wrap">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="User Avatar"
                className="user-avatar-img"
              />
            </div>
            <div className="user-info-text">
              <span className="user-name-title">{userName}</span>
              <span className="user-badge-sub">Premium Member</span>
            </div>
            <ChevronDown size={14} color="#6b7280" />

            {isUserMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '210px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.12), 0 8px 10px -6px rgba(0,0,0,0.08)',
                  border: '1px solid #e5e7eb',
                  padding: '8px 0',
                  zIndex: 1000
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: '8px 16px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{userName}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentUser?.email || 'setumeherunnesa59@gmail.com'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setActiveTab('settings');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    color: '#374151',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onLogout();
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    color: '#ef4444',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <LogOut size={16} color="#ef4444" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Main Content Grid + Right Widgets Column */}
      <div className="dashboard-layout-body orders-mode">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-section">
            <span className="sidebar-group-title">MAIN</span>
            <ul className="sidebar-menu">
              <li
                className={`sidebar-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('dashboard');
                  setActiveCategoryMode('dashboard');
                }}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'food' ? 'active-food' : ''}`}
                onClick={() => {
                  setActiveTab('food');
                  setActiveCategoryMode('food');
                }}
              >
                <Utensils size={18} color={activeTab === 'food' ? '#ffffff' : '#02a9ea'} />
                <span>Food</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'ride' ? 'active-ride' : ''}`}
                onClick={() => {
                  setActiveTab('ride');
                  setActiveCategoryMode('ride');
                }}
              >
                <Car size={18} color="#ef4444" />
                <span>Ride</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'skincare' ? 'active-skincare' : ''}`}
                onClick={() => {
                  setActiveTab('skincare');
                  setActiveCategoryMode('skincare');
                }}
              >
                <Sparkles size={18} color={activeTab === 'skincare' ? '#e06666' : '#3b82f6'} />
                <span>Skincare</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'basket' ? 'active' : ''}`}
                onClick={() => {
                  if (onOpenCart) onOpenCart();
                  else if (onToast) onToast('Basket opened');
                }}
              >
                <ShoppingBag size={18} color="#ec4899" />
                <span>Basket</span>
                {cartCount > 0 && <span className="sidebar-badge badge-pink">{cartCount}</span>}
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'orders' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => {
                  setActiveTab('orders');
                  if (activeCategoryMode === 'food') setOrderCategoryFilter('food');
                  else if (activeCategoryMode === 'ride') setOrderCategoryFilter('ride');
                  else if (activeCategoryMode === 'skincare') setOrderCategoryFilter('skincare');
                  else setOrderCategoryFilter('all');
                }}
              >
                <Package size={18} color={activeTab === 'orders' ? '#ffffff' : '#8b5cf6'} />
                <span>Orders</span>
                <span className="sidebar-badge badge-pink">3</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'saved_deals' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => {
                  setActiveTab('saved_deals');
                  if (activeCategoryMode === 'food') setSavedDealsFilter('food');
                  else if (activeCategoryMode === 'ride') setSavedDealsFilter('ride');
                  else if (activeCategoryMode === 'skincare') setSavedDealsFilter('skincare');
                  else setSavedDealsFilter('all');
                }}
              >
                <Heart size={18} color={activeTab === 'saved_deals' ? '#ffffff' : '#ff2b70'} />
                <span>Saved Deals</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'price_alerts' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => {
                  setActiveTab('price_alerts');
                  if (activeCategoryMode === 'food') setPriceAlertFilter('food');
                  else if (activeCategoryMode === 'ride') setPriceAlertFilter('ride');
                  else if (activeCategoryMode === 'skincare') setPriceAlertFilter('skincare');
                  else setPriceAlertFilter('all');
                }}
              >
                <Bell size={18} color={activeTab === 'price_alerts' ? '#ffffff' : '#eab308'} />
                <span>Price Alerts</span>
                <span className="sidebar-badge badge-red">5</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'coupons' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('coupons')}
              >
                <Tag size={18} color={activeTab === 'coupons' ? '#ffffff' : '#10b981'} />
                <span>Coupons</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'reviews' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                <Star size={18} color={activeTab === 'reviews' ? '#ffffff' : '#f59e0b'} />
                <span>Reviews</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-group-title">COMMUNITY</span>
            <ul className="sidebar-menu">
              <li
                className={`sidebar-menu-item ${activeTab === 'complain_issues' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => {
                  setActiveTab('complain_issues');
                  if (activeCategoryMode === 'food') {
                    setComplainCategoryFilter('viral');
                  } else if (activeCategoryMode === 'ride') {
                    setComplainCategoryFilter('ride');
                  } else if (activeCategoryMode === 'skincare') {
                    setComplainCategoryFilter('skincare');
                  } else {
                    setComplainCategoryFilter('all');
                  }
                }}
              >
                <ShieldAlert size={18} color={activeTab === 'complain_issues' ? '#ffffff' : '#ff2b70'} />
                <span className={activeTab === 'complain_issues' ? '' : (activeCategoryMode === 'food' ? 'text-blue' : activeCategoryMode === 'ride' ? 'text-red' : activeCategoryMode === 'skincare' ? 'text-coral' : 'text-pink')}>
                  {activeCategoryMode === 'skincare' ? 'Fraud Pages' : activeCategoryMode === 'ride' ? 'Ride complain' : activeCategoryMode === 'food' ? '🔥 Viral Restaurant Raid' : 'Complain Issues'}
                </span>
                <span className="sidebar-badge-dashed">Alert</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'my_wallet' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('my_wallet')}
              >
                <Wallet size={18} color={activeTab === 'my_wallet' ? '#ffffff' : '#3b82f6'} />
                <span>My Wallet</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'bank_cards' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('bank_cards')}
              >
                <CreditCard size={18} color={activeTab === 'bank_cards' ? '#ffffff' : '#6366f1'} />
                <span>Bank Cards</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'refer_earn' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('refer_earn')}
              >
                <Gift size={18} color={activeTab === 'refer_earn' ? '#ffffff' : '#ec4899'} />
                <span>Refer &amp; Earn</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <span className="sidebar-group-title">ACCOUNT</span>
            <ul className="sidebar-menu">
              <li
                className={`sidebar-menu-item ${activeTab === 'settings' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={18} color={activeTab === 'settings' ? '#ffffff' : '#6b7280'} />
                <span>Settings</span>
              </li>
              <li
                className={`sidebar-menu-item ${activeTab === 'help_support' ? (activeCategoryMode === 'food' ? 'active-food' : activeCategoryMode === 'ride' ? 'active-ride' : activeCategoryMode === 'skincare' ? 'active-skincare' : 'active') : ''}`}
                onClick={() => setActiveTab('help_support')}
              >
                <HelpCircle size={18} color={activeTab === 'help_support' ? '#ffffff' : '#ff2b70'} />
                <span className={activeTab === 'help_support' ? '' : (activeCategoryMode === 'food' ? 'text-blue' : activeCategoryMode === 'ride' ? 'text-red' : activeCategoryMode === 'skincare' ? 'text-coral' : 'text-pink')}>Help &amp; Support</span>
              </li>
              <li className="sidebar-menu-item" onClick={onLogout}>
                <LogOut size={18} color="#ef4444" />
                <span className="text-red">Log Out</span>
              </li>
            </ul>
          </div>

          {/* Bottom Sidebar Invite Banner */}
          <div className="sidebar-invite-card">
            <div className="invite-gift-icon">🎁</div>
            <h4 className="invite-title">Invite &amp; Earn</h4>
            <p className="invite-desc">Invite your friends and earn exciting rewards</p>
            <button className="invite-btn" onClick={() => onToast('Referral link copied! Share with friends.')}>
              Invite Now
            </button>
          </div>
        </aside>

        {/* Center Main Dashboard Content */}
        {activeTab === 'food' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              {/* Left Column: Food Main Deals */}
              <div className="orders-left-col">
                {/* Category Switcher Pills */}
                <div className="dash-greeting-bar" style={{ marginBottom: '4px' }}>
                  <div></div>
                  <div className="greeting-pills">
                    <span
                      className="category-tag-pill pill-active-blue"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveTab('food');
                        setActiveCategoryMode('food');
                      }}
                    >
                      🍴 Food
                    </span>
                    <span
                      className="category-tag-pill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveTab('ride');
                        setActiveCategoryMode('ride');
                      }}
                    >
                      🚗 Ride
                    </span>
                    <span
                      className={`category-tag-pill ${activeTab === 'skincare' ? 'pill-active-coral' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveTab('skincare');
                        setActiveCategoryMode('skincare');
                      }}
                    >
                      ✨ Skincare
                    </span>
                  </div>
                </div>

                {/* Food Hero Banner Card */}
                <div className="food-hero-card">
                  <div className="food-hero-left">
                    <div className="food-hero-greeting">Hey {userName}! 👋</div>
                    <h1 className="food-hero-title">
                      Find the best <span className="text-blue-accent">food deals</span> from top restaurants &amp; apps
                    </h1>
                    <p className="food-hero-desc">
                      Compare prices, delivery time, offers &amp; save more every time.
                    </p>
                  </div>
                  <div className="food-hero-right">
                    <div className="food-hero-img-wrap" style={{ width: '280px', height: '160px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(2, 132, 199, 0.15)' }}>
                      <img
                        src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                        alt="Healthy Food Bowl"
                        className="food-hero-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Food Search Card */}
                <div className="food-search-card">
                  <div className="food-search-input-wrap">
                    <Search size={18} color="#94a3b8" />
                    <input
                      type="text"
                      placeholder="Search for food, restaurant or cuisines..."
                      className="food-search-input"
                    />
                  </div>
                  <div className="food-search-divider"></div>
                  <div className="food-search-location">
                    <span>📍 Dhaka</span>
                    <ChevronDown size={14} color="#64748b" />
                  </div>
                  <button className="food-search-btn" onClick={() => onToast('Searching top food deals in Dhaka...')}>
                    Search
                  </button>
                </div>

                {/* Quick Access Section */}
                <div className="food-quick-access-container">
                  <div className="section-header-row">
                    <h3 className="section-title">Quick Access</h3>
                    <button className="section-view-all-link" onClick={() => onToast('Viewing all partner apps...')}>View All</button>
                  </div>

                  <div className="quick-access-icons-row">
                    <div className="quick-app-item">
                      <div className="app-icon-circle bg-pink-gradient">
                        <Percent size={22} color="#ffffff" strokeWidth={3} />
                      </div>
                      <span className="app-label" style={{ fontWeight: 800, color: '#0f172a' }}>All Deals</span>
                      <div className="app-active-bar"></div>
                    </div>

                    <div className="quick-app-item" onClick={() => onOpenFoodpanda ? onOpenFoodpanda() : onToast('Opening foodpanda...')}>
                      <div className="app-icon-circle bg-foodpanda-circle">
                        <span style={{ fontSize: '20px' }}>🐼</span>
                      </div>
                      <span className="app-label">foodpanda</span>
                    </div>

                    <div className="quick-app-item" onClick={() => onOpenFoodi ? onOpenFoodi() : onToast('Opening Foodi...')}>
                      <div className="app-icon-circle bg-foodie-circle">
                        <Utensils size={20} color="#d97706" />
                      </div>
                      <span className="app-label">Foodi</span>
                    </div>

                    <div className="quick-app-item" onClick={() => onOpenPathao ? onOpenPathao() : onToast('Opening Pathao Food...')}>
                      <div className="app-icon-circle bg-pathao-circle">
                        <Car size={20} color="#dc2626" />
                      </div>
                      <span className="app-label">Pathao Food</span>
                    </div>

                    <div className="quick-app-item" onClick={() => onToast('Filtering Hungry Naki deals...')}>
                      <div className="app-icon-circle bg-hungry-circle">
                        <Utensils size={20} color="#9333ea" />
                      </div>
                      <span className="app-label">Hungry Naki</span>
                    </div>

                    <div className="quick-app-item" onClick={() => onToast('Filtering Star Tech deals...')}>
                      <div className="app-icon-circle bg-startech-circle">
                        <Star size={20} color="#eab308" />
                      </div>
                      <span className="app-label">Star Tech</span>
                    </div>

                    <div className="quick-app-item" onClick={() => onToast('Filtering MealBuzz deals...')}>
                      <div className="app-icon-circle bg-mealbuzz-circle">
                        <Zap size={20} color="#3b82f6" />
                      </div>
                      <span className="app-label">MealBuzz</span>
                    </div>

                    <div className="quick-app-item" onClick={() => onToast('Showing more apps...')}>
                      <div className="app-icon-circle bg-more-circle">
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#64748b' }}>+</span>
                      </div>
                      <span className="app-label">More Apps</span>
                    </div>
                  </div>
                </div>

                {/* Filter Pills Sub-Bar */}
                <div className="food-filter-pills-row">
                  <div className="filter-subcard active-blue">
                    <div className="filter-subcard-top">
                      <Zap size={15} color="#ffffff" />
                      <strong>Best Offers</strong>
                    </div>
                    <span className="filter-subcard-sub">Top deals today</span>
                  </div>

                  <div className="filter-subcard" onClick={() => onToast('Showing Viral Restaurants...')}>
                    <div className="filter-subcard-top">
                      <span>🔥</span>
                      <strong>Viral Restaurants</strong>
                    </div>
                    <span className="filter-subcard-sub">Trending &amp; popular</span>
                  </div>

                  <div className="filter-subcard" onClick={() => onToast('Showing Nearby deals...')}>
                    <div className="filter-subcard-top">
                      <span>📍</span>
                      <strong>Near Me</strong>
                    </div>
                    <span className="filter-subcard-sub">Best deals nearby</span>
                  </div>

                  <div className="filter-subcard" onClick={() => onToast('Showing New Arrivals...')}>
                    <div className="filter-subcard-top">
                      <span>✨</span>
                      <strong>New Arrivals</strong>
                    </div>
                    <span className="filter-subcard-sub">Latest restaurants</span>
                  </div>

                  <div className="filter-subcard" onClick={() => onToast('Filtering Free Delivery...')}>
                    <div className="filter-subcard-top">
                      <span>🚚</span>
                      <strong>Free Delivery</strong>
                    </div>
                    <span className="filter-subcard-sub">No delivery charge</span>
                  </div>

                  <div className="filter-subcard" onClick={() => onToast('Filtering Top Rated deals...')}>
                    <div className="filter-subcard-top">
                      <span>⭐</span>
                      <strong>1.4k+ Deals</strong>
                    </div>
                    <span className="filter-subcard-sub">Rating 4.0+</span>
                  </div>
                </div>

                {/* Best Food Deals Section */}
                <div className="food-section-container">
                  <div className="section-header-row">
                    <div>
                      <h3 className="section-title">Best Food Deals for You</h3>
                      <p className="section-subtitle">Top restaurants and dishes with the best offers</p>
                    </div>
                    <button className="section-view-all-link" onClick={() => onToast('Viewing all food deals...')}>View All Deals</button>
                  </div>

                  <div className="food-deals-cards-grid">
                    {/* Deal 1 */}
                    <div
                      className="food-deal-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onOpenDealDetail && onOpenDealDetail({
                        id: 'fd-1',
                        title: 'Chicken Biryani',
                        subtitle: 'Bismillah Biryani House',
                        category: 'food',
                        bestPrice: 199,
                        originalPrice: 269,
                        savings: 61,
                        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
                        providers: [
                          { name: 'FoodPanda', price: 199, isBest: true, time: '30-40 min' },
                          { name: 'Pathao Food', price: 215, time: '35-45 min' },
                          { name: 'HungryNaki', price: 225, time: '35-45 min' }
                        ]
                      })}
                    >
                      <div className="food-deal-img-wrapper">
                        <img
                          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80"
                          alt="Chicken Biryani"
                          className="food-deal-img"
                        />
                        <span className="badge-best-deal">BEST DEAL</span>
                        <span className="badge-rating">⭐ 4.9 (2.3k)</span>
                      </div>
                      <div className="food-deal-content">
                        <h4 className="food-deal-title">Chicken Biryani</h4>
                        <span className="food-deal-restaurant">Bismillah Biryani House</span>

                        <div className="food-deal-meta">
                          <span>⏱ 30-40 min</span>
                          <span className="dot-sep">•</span>
                          <span>🚚 0৳ delivery</span>
                        </div>

                        <div className="food-deal-price-row">
                          <span className="food-curr-price">৳199</span>
                          <span className="food-old-price">৳269</span>
                          <span className="food-off-badge">
                            {foodpandaOffers[0]?.discount ? (foodpandaOffers[0].discount.includes('%') || foodpandaOffers[0].discount.includes('৳') ? foodpandaOffers[0].discount : `${foodpandaOffers[0].discount} OFF`) : '24% OFF'}
                          </span>
                        </div>

                        <div className="food-deal-save-row">
                          <span className="food-save-text">You Save ৳61</span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('open-deliveryman-chat', {
                                  detail: { dealTitle: 'Chicken Biryani' }
                                }));
                                onToast('⚡ Food order placed! Live chatbox with Deliveryman opened 🛵');
                              }}
                              style={{
                                background: '#ff2b70',
                                color: '#ffffff',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              💬 Order &amp; Chat
                            </button>
                            <span className="food-app-tag tag-fp" onClick={(e) => { e.stopPropagation(); onOpenFoodpanda && onOpenFoodpanda(); }}>foodpanda</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deal 2 */}
                    <div
                      className="food-deal-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onOpenDealDetail && onOpenDealDetail({
                        id: 'fd-2',
                        title: 'Farmhouse Pizza',
                        subtitle: 'Pizza Hut',
                        category: 'food',
                        bestPrice: 349,
                        originalPrice: 499,
                        savings: 150,
                        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
                        providers: [
                          { name: 'Foodi', price: 349, isBest: true, time: '25-35 min' },
                          { name: 'FoodPanda', price: 379, time: '30-40 min' },
                          { name: 'Pizza Hut Direct', price: 399, time: '35-45 min' }
                        ]
                      })}
                    >
                      <div className="food-deal-img-wrapper">
                        <img
                          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
                          alt="Farmhouse Pizza"
                          className="food-deal-img"
                        />
                        <span className="badge-rating">⭐ 4.6 (1.9k)</span>
                      </div>
                      <div className="food-deal-content">
                        <h4 className="food-deal-title">Farmhouse Pizza</h4>
                        <span className="food-deal-restaurant">Pizza Hut</span>

                        <div className="food-deal-meta">
                          <span>⏱ 25-35 min</span>
                          <span className="dot-sep">•</span>
                          <span>🚚 59৳ delivery</span>
                        </div>

                        <div className="food-deal-price-row">
                          <span className="food-curr-price">৳349</span>
                          <span className="food-old-price">৳499</span>
                          <span className="food-off-badge">
                            {foodiOffers[0]?.discount ? (foodiOffers[0].discount.includes('%') || foodiOffers[0].discount.includes('৳') ? foodiOffers[0].discount : `${foodiOffers[0].discount} OFF`) : '30% OFF'}
                          </span>
                        </div>

                        <div className="food-deal-save-row">
                          <span className="food-save-text">You Save ৳150</span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('open-deliveryman-chat', {
                                  detail: { dealTitle: 'Farmhouse Pizza' }
                                }));
                                onToast('⚡ Food order placed! Live chatbox with Deliveryman opened 🛵');
                              }}
                              style={{
                                background: '#ff2b70',
                                color: '#ffffff',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              💬 Order &amp; Chat
                            </button>
                            <span className="food-app-tag tag-foodie" onClick={(e) => { e.stopPropagation(); onOpenFoodi && onOpenFoodi(); }}>Foodi</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deal 3 */}
                    <div
                      className="food-deal-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onOpenDealDetail && onOpenDealDetail({
                        id: 'fd-3',
                        title: 'Beef Burger Meal',
                        subtitle: 'Burger King',
                        category: 'food',
                        bestPrice: 299,
                        originalPrice: 429,
                        savings: 121,
                        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
                        providers: [
                          { name: 'Pathao Food', price: 299, isBest: true, time: '20-30 min' },
                          { name: 'FoodPanda', price: 320, time: '25-35 min' },
                          { name: 'HungryNaki', price: 340, time: '30-40 min' }
                        ]
                      })}
                    >
                      <div className="food-deal-img-wrapper">
                        <img
                          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
                          alt="Beef Burger Meal"
                          className="food-deal-img"
                        />
                        <span className="badge-rating">⭐ 4.4 (987)</span>
                      </div>
                      <div className="food-deal-content">
                        <h4 className="food-deal-title">Beef Burger Meal</h4>
                        <span className="food-deal-restaurant">Burger King</span>

                        <div className="food-deal-meta">
                          <span>⏱ 20-30 min</span>
                          <span className="dot-sep">•</span>
                          <span>🚚 49৳ delivery</span>
                        </div>

                        <div className="food-deal-price-row">
                          <span className="food-curr-price">৳299</span>
                          <span className="food-old-price">৳429</span>
                          <span className="food-off-badge">
                            {pathaoOffers[0]?.discount ? (pathaoOffers[0].discount.includes('%') || pathaoOffers[0].discount.includes('৳') ? pathaoOffers[0].discount : `${pathaoOffers[0].discount} OFF`) : '29% OFF'}
                          </span>
                        </div>

                        <div className="food-deal-save-row">
                          <span className="food-save-text">You Save ৳121</span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('open-deliveryman-chat', {
                                  detail: { dealTitle: 'Beef Burger Meal' }
                                }));
                                onToast('⚡ Food order placed! Live chatbox with Deliveryman opened 🛵');
                              }}
                              style={{
                                background: '#ff2b70',
                                color: '#ffffff',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              💬 Order &amp; Chat
                            </button>
                            <span className="food-app-tag tag-pathao" onClick={(e) => { e.stopPropagation(); onOpenPathao && onOpenPathao(); }}>Pathao Food</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Deal 4 */}
                    <div
                      className="food-deal-card"
                      style={{ cursor: 'pointer' }}
                      onClick={() => onOpenDealDetail && onOpenDealDetail({
                        id: 'fd-4',
                        title: 'Chicken Chowmein',
                        subtitle: 'Chowking',
                        category: 'food',
                        bestPrice: 179,
                        originalPrice: 269,
                        savings: 90,
                        image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=500&q=80',
                        providers: [
                          { name: 'Hungry Naki', price: 179, isBest: true, time: '20-30 min' },
                          { name: 'FoodPanda', price: 199, time: '25-35 min' },
                          { name: 'Pathao Food', price: 210, time: '25-35 min' }
                        ]
                      })}
                    >
                      <div className="food-deal-img-wrapper">
                        <img
                          src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=500&q=80"
                          alt="Chicken Chowmein"
                          className="food-deal-img"
                        />
                        <span className="badge-rating">⭐ 4.5 (1.5k)</span>
                      </div>
                      <div className="food-deal-content">
                        <h4 className="food-deal-title">Chicken Chowmein</h4>
                        <span className="food-deal-restaurant">Chowking</span>

                        <div className="food-deal-meta">
                          <span>⏱ 20-30 min</span>
                          <span className="dot-sep">•</span>
                          <span>🚚 49৳ delivery</span>
                        </div>

                        <div className="food-deal-price-row">
                          <span className="food-curr-price">৳179</span>
                          <span className="food-old-price">৳269</span>
                          <span className="food-off-badge">33% OFF</span>
                        </div>

                        <div className="food-deal-save-row">
                          <span className="food-save-text">You Save ৳90</span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.dispatchEvent(new CustomEvent('open-deliveryman-chat', {
                                  detail: { dealTitle: 'Chicken Chowmein' }
                                }));
                                onToast('⚡ Food order placed! Live chatbox with Deliveryman opened 🛵');
                              }}
                              style={{
                                background: '#ff2b70',
                                color: '#ffffff',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              💬 Order &amp; Chat
                            </button>
                            <span className="food-app-tag tag-hungry">Hungry Naki</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Rated Restaurants Section */}
                <div className="food-section-container" style={{ marginTop: '12px' }}>
                  <div className="section-header-row">
                    <div>
                      <h3 className="section-title">Top Rated Restaurants Near You</h3>
                      <p className="section-subtitle">Explore top restaurants with great reviews and offers</p>
                    </div>
                    <button className="section-view-all-link" onClick={() => onToast('Viewing all top restaurants...')}>View All</button>
                  </div>

                  <div className="top-restaurants-grid">
                    {/* Restaurant 1 */}
                    <div className="restaurant-card">
                      <div className="restaurant-img-wrap">
                        <img
                          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
                          alt="Pizza Hut"
                          className="restaurant-banner-img"
                        />
                      </div>
                      <div className="restaurant-info-row">
                        <div className="restaurant-logo-box">
                          <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80"
                            alt="Pizza Hut Logo"
                          />
                        </div>
                        <div className="restaurant-details">
                          <h4 className="restaurant-name">Pizza Hut</h4>
                          <div className="restaurant-stats">
                            <span className="r-rating">⭐ 4.6 (2.1k)</span>
                            <span className="dot-sep">•</span>
                            <span className="r-time">⏱ 25-35 min</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Restaurant 2 */}
                    <div className="restaurant-card">
                      <div className="restaurant-img-wrap">
                        <img
                          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
                          alt="Burger King"
                          className="restaurant-banner-img"
                        />
                      </div>
                      <div className="restaurant-info-row">
                        <div className="restaurant-logo-box">
                          <img
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80"
                            alt="Burger King Logo"
                          />
                        </div>
                        <div className="restaurant-details">
                          <h4 className="restaurant-name">Burger King</h4>
                          <div className="restaurant-stats">
                            <span className="r-rating">⭐ 4.5 (1.9k)</span>
                            <span className="dot-sep">•</span>
                            <span className="r-time">⏱ 20-30 min</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Restaurant 3 */}
                    <div className="restaurant-card">
                      <div className="restaurant-img-wrap">
                        <img
                          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80"
                          alt="Bismillah Biryani"
                          className="restaurant-banner-img"
                        />
                      </div>
                      <div className="restaurant-info-row">
                        <div className="restaurant-logo-box">
                          <img
                            src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=100&q=80"
                            alt="Bismillah Biryani Logo"
                          />
                        </div>
                        <div className="restaurant-details">
                          <h4 className="restaurant-name">Bismillah Biryani</h4>
                          <div className="restaurant-stats">
                            <span className="r-rating">⭐ 4.8 (1.8k)</span>
                            <span className="dot-sep">•</span>
                            <span className="r-time">⏱ 30-40 min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Joint Food Widgets */}
              <div className="orders-right-col">
                {/* Your Savings Widget */}
                <div className="right-widget-card">
                  <div className="widget-header-row">
                    <h4 className="widget-title-sm">Your Savings</h4>
                    <select className="chart-dropdown">
                      <option>This Month</option>
                      <option>Last Month</option>
                    </select>
                  </div>

                  <div className="savings-hero-amount">
                    <span className="savings-taka-val">৳1,250</span>
                    <span className="savings-badge-up">▲ 18% vs last month</span>
                  </div>

                  <div className="savings-metrics-grid">
                    <div className="savings-metric-box">
                      <span className="s-metric-label">Total Orders</span>
                      <strong className="s-metric-val">18</strong>
                    </div>
                    <div className="savings-metric-box">
                      <span className="s-metric-label">Total Saved</span>
                      <strong className="s-metric-val">৳3,760</strong>
                    </div>
                  </div>

                  <div className="savings-progress-wrap">
                    <div className="savings-progress-bar">
                      <div className="savings-progress-fill" style={{ width: '82%' }}></div>
                    </div>
                    <p className="savings-benchmark-text">
                      🔥 You're saving more than <strong>82%</strong> of users!
                    </p>
                  </div>
                </div>

                {/* Viral Restaurants Widget */}
                <div className="right-widget-card">
                  <div className="widget-header-row">
                    <h4 className="widget-title-sm">Viral Restaurants</h4>
                    <button className="prov-view-all" onClick={() => onToast('Viewing all Viral Restaurants...')}>View All</button>
                  </div>

                  <div className="viral-restaurants-list">
                    <div className="viral-item">
                      <div className="viral-img-thumb">
                        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=80&q=80" alt="Spicy Treat" />
                        <span className="badge-penalty">Penalty</span>
                      </div>
                      <div className="viral-info">
                        <strong className="viral-name">Spicy Treat Restaurant</strong>
                        <p className="viral-date">Magistrate Raid on 12 May 2024</p>
                        <p className="viral-reason">Hygiene issues found</p>
                        <span className="viral-penalty-amt">Penalty: ৳50,000</span>
                      </div>
                    </div>

                    <div className="viral-item">
                      <div className="viral-img-thumb">
                        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=80&q=80" alt="Foodies Hub" />
                      </div>
                      <div className="viral-info">
                        <strong className="viral-name">Foodies Hub</strong>
                        <p className="viral-date">Raid on 02 May 2024</p>
                        <p className="viral-reason">Expired food items found</p>
                      </div>
                    </div>

                    <div className="viral-item">
                      <div className="viral-img-thumb">
                        <img src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=80&q=80" alt="Tasty Bites Cafe" />
                        <span className="badge-penalty">Penalty</span>
                      </div>
                      <div className="viral-info">
                        <strong className="viral-name">Tasty Bites Cafe</strong>
                        <p className="viral-date">Raid on 28 Apr 2024</p>
                        <p className="viral-reason">Kitchen hygiene issues</p>
                        <span className="viral-penalty-amt">Penalty: ৳20,000</span>
                      </div>
                    </div>
                  </div>

                  <button className="viral-see-all-btn" onClick={() => onToast('Opening Penalized Restaurants list...')}>
                    See All Penalized Restaurants
                  </button>
                </div>

                {/* Pink Dashed Promo Widget */}
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">🍏</div>
                  <h4 className="promo-pink-title">Get Extra 10% OFF</h4>
                  <p className="promo-pink-code">Use code: <strong>FOOD10</strong></p>
                  <p className="promo-pink-sub">Valid on all orders above ৳199</p>
                  <button
                    className="promo-pink-btn"
                    onClick={() => {
                      navigator.clipboard.writeText('FOOD10');
                      onToast('Coupon FOOD10 copied! Extra 10% off applied.');
                    }}
                  >
                    Copy Code &gt;
                  </button>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'orders' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              {/* Left Column: Orders & History */}
              <div className="orders-left-col">
                {/* Premium Member Banner Header Card */}
                <div className="orders-premium-banner">
                  <div>
                    <div className="greeting-sub">Hey Setu! 👋</div>
                    <h1 className="orders-greeting-title">Your Orders</h1>
                    <p className="orders-greeting-desc">Track, manage and enjoy your orders – all in one place.</p>
                  </div>

                  <div className="orders-member-card">
                    <div style={{ fontSize: '24px' }}>👑</div>
                    <div className="orders-member-info">
                      <strong className="orders-member-title">Premium Member</strong>
                      <span className="orders-member-desc">Get faster delivery, exclusive offers and extra savings!</span>
                    </div>
                    <button className="btn-upgrade-pink" onClick={() => onToast('Upgrading to Ultra Premium VIP... 👑')}>
                      Upgrade Now
                    </button>
                  </div>
                </div>

                {/* Filter Category Pills (All Orders, Food, Ride, Skincare) */}
                <div className="orders-category-pills-row">
                  <button
                    className={`order-cat-pill ${orderCategoryFilter === 'all' ? 'active-pink' : ''}`}
                    onClick={() => setOrderCategoryFilter('all')}
                  >
                    💳 All Orders <span className="order-pill-badge">{formattedUserOrders.length}</span>
                  </button>

                  <button
                    className={`order-cat-pill ${orderCategoryFilter === 'food' ? 'active-pink' : ''}`}
                    onClick={() => setOrderCategoryFilter('food')}
                  >
                    🍴 Food <span className="order-pill-badge">{formattedUserOrders.filter(o => o.category === 'food').length}</span>
                  </button>

                  <button
                    className={`order-cat-pill ${orderCategoryFilter === 'ride' ? 'active-pink' : ''}`}
                    onClick={() => setOrderCategoryFilter('ride')}
                  >
                    🚗 Ride <span className="order-pill-badge">{formattedUserOrders.filter(o => o.category === 'ride').length}</span>
                  </button>

                  <button
                    className={`order-cat-pill ${orderCategoryFilter === 'skincare' ? 'active-pink' : ''}`}
                    onClick={() => setOrderCategoryFilter('skincare')}
                  >
                    💧 Skincare <span className="order-pill-badge">{formattedUserOrders.filter(o => o.category === 'skincare').length}</span>
                  </button>
                </div>

                {/* Active Orders Section */}
                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Active Orders</h3>
                    <button className="orders-live-tracker-link" onClick={() => onToast('Opening Live Map Tracker...')}>
                      Live Tracker
                    </button>
                  </div>

                  <div className="active-orders-list">
                    {filteredActiveOrders.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '24px 16px', color: '#6b7280', fontSize: '13.5px' }}>
                        No active orders at the moment.
                      </div>
                    ) : (
                      filteredActiveOrders.map(order => (
                        <div
                          key={order.id}
                          className={`active-order-item ${currentSummaryOrder?.id === order.id ? 'selected' : ''}`}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <div className="active-order-left">
                            <div className={`order-avatar-circle ${order.bgClass}`}>
                              {order.avatarText}
                            </div>
                            <div className="order-main-details">
                              <h4 className="order-item-title">{order.title}</h4>
                              <span className="order-item-subtitle">{order.subtitle}</span>
                              <span className="order-item-code">{order.code}</span>
                            </div>
                          </div>

                          <div className="active-order-right">
                            <div className="order-thumb-wrap">
                              <img src={order.img} alt={order.title} className="order-thumb-img" />
                            </div>
                            <div className="order-status-box">
                              <span className="badge-in-transit">{order.status}</span>
                              <span className="order-est-total">{order.estTotal}</span>
                            </div>
                            <button
                              className="btn-track-outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrder(order);
                                onToast(`Tracking ${order.title}...`);
                              }}
                            >
                              Track →
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Order History Section */}
                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Order History</h3>
                    <span style={{ fontSize: '12px', color: '#ff2b70', fontWeight: 800 }}>{filteredHistoryOrders.length} Orders Total</span>
                  </div>

                  <div className="order-history-list">
                    {filteredHistoryOrders.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '24px 16px', color: '#6b7280', fontSize: '13.5px' }}>
                        No past order history.
                      </div>
                    ) : (
                      filteredHistoryOrders.map(item => (
                        <div key={item.id} className="order-history-item" onClick={() => onToast(`Viewing receipt for ${item.title}`)}>
                          <div className="history-left">
                            {item.img ? (
                              <img src={item.img} alt={item.title} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }} />
                            ) : (
                              <div className={`order-avatar-circle ${item.bgClass}`} style={{ width: '40px', height: '40px', fontSize: '11px' }}>
                                {item.avatarText}
                              </div>
                            )}
                            <div className="order-main-details">
                              <h4 className="order-item-title" style={{ fontSize: '13.5px' }}>{item.title}</h4>
                              <span className="order-item-subtitle">{item.subtitle}</span>
                            </div>
                          </div>

                          <div className="history-center-meta">
                            <span className="history-date">📅 {item.date}</span>
                            <span className={item.status === 'Delivered' ? 'badge-delivered-green' : 'badge-completed'}>
                              {item.status}
                            </span>
                          </div>

                          <div className="history-right">
                            <span className="history-price">{item.price}</span>
                            <button
                              className="btn-reorder-outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToast(`Reordered "${item.title}"! Item added to cart.`);
                              }}
                            >
                              Reorder ↺
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Actions 5 Cards Grid */}
                <div className="orders-section-card" style={{ border: 'none', padding: '0', background: 'transparent' }}>
                  <h3 className="section-title" style={{ marginBottom: '12px' }}>Quick Actions</h3>
                  <div className="orders-quick-actions-row">
                    <div className="orders-quick-card bg-pink-soft" onClick={() => onToast('Showing quick reorder items...')}>
                      <div className="quick-card-icon">↺</div>
                      <strong className="quick-card-title">Reorder</strong>
                      <span className="quick-card-desc">Your favorite items one click away</span>
                      <span className="quick-card-arrow">→</span>
                    </div>

                    <div className="orders-quick-card bg-purple-soft" onClick={() => onToast('Opening real-time map tracker...')}>
                      <div className="quick-card-icon">📍</div>
                      <strong className="quick-card-title">Track All Orders</strong>
                      <span className="quick-card-desc">See real-time updates</span>
                      <span className="quick-card-arrow">→</span>
                    </div>

                    <div className="orders-quick-card bg-yellow-soft" onClick={() => onToast('Opening review portal...')}>
                      <div className="quick-card-icon">✨</div>
                      <strong className="quick-card-title">Rate &amp; Review</strong>
                      <span className="quick-card-desc">Share your experience</span>
                      <span className="quick-card-arrow">→</span>
                    </div>

                    <div className="orders-quick-card bg-blue-soft" onClick={() => onToast('Connecting to 24/7 customer support...')}>
                      <div className="quick-card-icon">🎧</div>
                      <strong className="quick-card-title">Need Help?</strong>
                      <span className="quick-card-desc">Get support anytime</span>
                      <span className="quick-card-arrow">→</span>
                    </div>

                    <div className="orders-quick-card bg-pink-soft" onClick={() => onToast('Opening exclusive coupons...')}>
                      <div className="quick-card-icon">💳</div>
                      <strong className="quick-card-title">View Coupons</strong>
                      <span className="quick-card-desc">Save more on next order</span>
                      <span className="quick-card-arrow">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Joint Order Summary Panel */}
              <div className="orders-right-col">
                <div className="right-widget-card" style={{ sticky: 'top', top: '10px' }}>
                  <div className="order-summary-header">
                    <h4 className="order-summary-title">Order Summary</h4>
                    {activeSummary && <span className="badge-live-red">🔴 Live</span>}
                  </div>

                  {!activeSummary ? (
                    <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                      <div style={{ fontSize: '44px', marginBottom: '12px' }}>🛍️</div>
                      <h5 style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 6px 0' }}>No active order</h5>
                      <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                        Your order summary will appear here after you place an order.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="order-summary-code">
                        {activeSummary.orderId}
                      </div>
                      <div className="order-summary-date">
                        {activeSummary.date}
                      </div>

                      {/* Stepper Progress Tracker */}
                      <div className="order-stepper">
                        <div className="order-stepper-line">
                          <div className="order-stepper-line-fill" style={{
                            width: activeSummary.rawStatus === 'DELIVERED' ? '100%'
                              : ['ON_THE_WAY', 'PICKED_UP'].includes(activeSummary.rawStatus) ? '75%'
                                : ['PREPARING', 'READY_FOR_PICKUP'].includes(activeSummary.rawStatus) ? '50%' : '25%'
                          }}></div>
                        </div>

                        <div className={`stepper-node ${activeSummary.rawStatus !== 'CANCELLED' ? 'active' : ''}`}>
                          <div className="stepper-circle">✓</div>
                          <span className="stepper-node-label">Confirmed</span>
                        </div>

                        <div className={`stepper-node ${['PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'ON_THE_WAY', 'DELIVERED'].includes(activeSummary.rawStatus) ? 'active' : ''}`}>
                          <div className="stepper-circle">{activeSummary.type === 'ride' ? '🚗' : activeSummary.type === 'skincare' ? '📦' : '%'}</div>
                          <span className="stepper-node-label">{activeSummary.type === 'ride' ? 'Driver Assigned' : activeSummary.type === 'skincare' ? 'Packed' : 'Preparing'}</span>
                        </div>

                        <div className={`stepper-node ${['PICKED_UP', 'ON_THE_WAY', 'DELIVERED'].includes(activeSummary.rawStatus) ? 'active' : ''}`}>
                          <div className="stepper-circle">{activeSummary.type === 'ride' ? '📍' : activeSummary.type === 'skincare' ? '🚚' : '🚚'}</div>
                          <span className="stepper-node-label">{activeSummary.type === 'ride' ? 'On the way' : activeSummary.type === 'skincare' ? 'Shipped' : 'On the way'}</span>
                        </div>

                        <div className={`stepper-node ${activeSummary.rawStatus === 'DELIVERED' ? 'active' : ''}`}>
                          <div className="stepper-circle">🎁</div>
                          <span className="stepper-node-label">Delivered</span>
                        </div>
                      </div>

                      {/* Delivery Partner / Carrier Box */}
                      <div className="delivery-partner-card">
                        <span className="delivery-partner-label">
                          {activeSummary.type === 'ride' ? 'Driver & Vehicle' : activeSummary.type === 'skincare' ? 'Courier Carrier' : 'Delivery Partner'}
                        </span>
                        {activeSummary.driverName ? (
                          <div className="delivery-partner-row">
                            <div className="rider-info-left">
                              <img
                                src={activeSummary.riderImg || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"}
                                alt="Partner"
                                className="rider-avatar-img"
                              />
                              <div className="rider-details">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <strong className="rider-name">{activeSummary.driverName}</strong>
                                  {activeSummary.partnerCode && (
                                    <span style={{ fontSize: '10px', background: '#fdf2f8', color: '#db2777', padding: '1px 6px', borderRadius: '6px', fontWeight: 700, border: '1px solid #fbcfe8' }}>
                                      {activeSummary.partnerCode}
                                    </span>
                                  )}
                                </div>
                                <span className="rider-phone">📞 {activeSummary.driverPhone || 'Phone: N/A'}</span>
                                {activeSummary.riderVehicle && (
                                  <span className="rider-vehicle" style={{ fontSize: '11px', color: '#6b7280' }}>
                                    🛵 {activeSummary.riderVehicle}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="rider-action-btns">
                              <button className="rider-btn-circle" onClick={() => onToast('Calling delivery partner...')}>📞</button>
                              <button
                                className="rider-btn-circle"
                                onClick={() => setActiveDeliverymanChat({
                                  name: activeSummary.driverName || 'Rahim Ahmed (Delivery Rider)',
                                  phone: activeSummary.driverPhone || '+880 1712 345678',
                                  vehicle: activeSummary.riderVehicle || 'Honda Dream 110 (Motorcycle)',
                                  avatar: activeSummary.riderImg || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                                  orderId: activeSummary.orderId
                                })}
                                title="Chat with Deliveryman"
                              >
                                💬
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '8px 0', fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
                            Delivery partner will be assigned soon.
                          </div>
                        )}
                      </div>

                      {/* Order Items List */}
                      <div className="summary-items-list">
                        <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a' }}>Order Items</span>
                        {activeSummary.items.map((item, idx) => (
                          <div key={idx} className="summary-item-row">
                            <div className="summary-item-left">
                              <img src={item.img} alt={item.name} className="summary-item-img" />
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className="summary-item-name">{item.name}</span>
                                <span className="summary-item-qty">{item.qty}</span>
                              </div>
                            </div>
                            <span className="summary-item-price">{item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing Breakdown */}
                      <div className="summary-pricing-table">
                        <div className="pricing-row">
                          <span>Subtotal</span>
                          <strong style={{ color: '#0f172a' }}>{activeSummary.subtotal}</strong>
                        </div>
                        <div className="pricing-row">
                          <span>Delivery Fee</span>
                          <strong style={{ color: '#0f172a' }}>{activeSummary.deliveryFee}</strong>
                        </div>
                        <div className="pricing-row">
                          <span>Discount</span>
                          <span className="text-pink-discount">{activeSummary.discount}</span>
                        </div>
                      </div>

                      <div className="summary-total-row">
                        <strong className="total-label">Total</strong>
                        <strong className="total-amount">{activeSummary.total}</strong>
                      </div>

                      {/* Payment Method Box */}
                      <div className="summary-payment-box">
                        <div className="pay-box-top">
                          <span>Payment Method</span>
                          <button className="pay-change-link" onClick={() => onToast('Payment method change options...')}>Change</button>
                        </div>
                        <div className="pay-box-bottom">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="pay-logo-box bg-bkash" style={{ width: '28px', height: '28px', fontSize: '9px' }}>
                              {activeSummary.paymentMethod}
                            </div>
                            <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>{activeSummary.paymentMethod}</strong>
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: '800', color: '#ff2b70' }}>-{activeSummary.total}</span>
                        </div>
                      </div>

                      {/* Track Button */}
                      <button
                        className="btn-track-order-pink"
                        onClick={() => {
                          if (activeSummary.driverName) {
                            onToast(`Tracking ${activeSummary.orderId} live...`);
                          } else {
                            onToast(`Status: ${activeSummary.rawStatus}. Live location tracking will appear when the delivery partner is assigned.`);
                          }
                        }}
                      >
                        📍 Track Order
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'ride' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              {/* Left Column: Ride Content */}
              <div className="orders-left-col">
                {/* Category Switcher Pills */}
                <div className="dash-greeting-bar" style={{ marginBottom: '4px' }}>
                  <div></div>
                  <div className="greeting-pills">
                    <span
                      className="category-tag-pill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('food')}
                    >
                      🍴 Food
                    </span>
                    <span
                      className="category-tag-pill pill-active-red-dark"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('ride')}
                    >
                      🚗 Ride
                    </span>
                    <span
                      className={`category-tag-pill ${activeTab === 'skincare' ? 'pill-active-coral' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('skincare')}
                    >
                      ✨ Skincare
                    </span>
                  </div>
                </div>

                {/* Ride Hero Banner Card */}
                <div className="ride-hero-card">
                  <div className="ride-hero-left">
                    <div className="ride-hero-greeting">Hey {userName}! 👋</div>
                    <h1 className="ride-hero-title">
                      Find the best <span className="text-red-highlight">ride deals</span> from top providers
                    </h1>
                    <p className="ride-hero-desc">
                      Compare prices, travel time, and save more on every ride.
                    </p>
                  </div>
                  <div className="ride-hero-right">
                    <div className="ride-hero-img-wrap" style={{ width: '280px', height: '150px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(136, 19, 55, 0.12)' }}>
                      <img
                        src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
                        alt="White Sedan Car"
                        className="ride-hero-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Ride Search Form Card */}
                <div className="ride-search-card">
                  <div className="ride-search-grid">
                    {/* From & To inputs with Swap */}
                    <div className="ride-locations-wrap">
                      <div className="ride-input-group">
                        <span className="ride-field-label">
                          <span className="dot-green"></span> PICKUP LOCATION (FROM)
                        </span>
                        <div className="ride-input-box">
                          <MapPin size={16} color="#10b981" />
                          <select
                            className="ride-select-input"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                          >
                            {DHAKA_LOCATIONS.map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} color="#64748b" style={{ marginLeft: 'auto', pointerEvents: 'none' }} />
                        </div>
                      </div>

                      <button className="ride-swap-btn" title="Swap Locations" onClick={handleSwapLocations}>
                        <RefreshCw size={14} color="#3b82f6" />
                      </button>

                      <div className="ride-input-group">
                        <span className="ride-field-label">
                          <span className="dot-red"></span> DROP LOCATION (TO)
                        </span>
                        <div className="ride-input-box">
                          <MapPin size={16} color="#ef4444" />
                          <select
                            className="ride-select-input"
                            value={dropLocation}
                            onChange={(e) => setDropLocation(e.target.value)}
                          >
                            {DHAKA_LOCATIONS.map(loc => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} color="#64748b" style={{ marginLeft: 'auto', pointerEvents: 'none' }} />
                        </div>
                      </div>
                    </div>

                    {/* Quick Location Chips Bar */}
                    <div className="quick-location-chips-row">
                      <span className="quick-chip-label">Quick Pick:</span>
                      {['Dhanmondi, Dhaka', 'Gulshan 2, Dhaka', 'Banani, Dhaka', 'Uttara, Dhaka', 'Airport, Dhaka'].map(loc => (
                        <button
                          key={loc}
                          type="button"
                          className="quick-loc-chip"
                          onClick={() => {
                            if (pickupLocation === loc) {
                              setDropLocation(loc === 'Dhanmondi, Dhaka' ? 'Gulshan 2, Dhaka' : 'Dhanmondi, Dhaka');
                            } else {
                              setPickupLocation(loc);
                            }
                            onToast(`Selected ${loc.split(',')[0]}`);
                          }}
                        >
                          📍 {loc.split(',')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Intermediate Stops List */}
                    {stopsList.length > 0 && (
                      <div className="ride-stops-list-row">
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#475569' }}>Intermediate Stops:</span>
                        {stopsList.map((stop, idx) => (
                          <span key={idx} className="stop-pill-badge">
                            📍 {stop}
                            <button className="stop-remove-btn" onClick={() => handleRemoveStop(idx)}>✕</button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Add Stop Input Form Row */}
                    {isAddingStop && (
                      <form onSubmit={handleAddStopSubmit} className="add-stop-form-row">
                        <input
                          type="text"
                          placeholder="Type stop location (e.g. Mohakhali Flyover, Farmgate)..."
                          value={newStopInput}
                          onChange={(e) => setNewStopInput(e.target.value)}
                          className="add-stop-text-input"
                          autoFocus
                        />
                        <button type="submit" className="btn-confirm-add-stop">Add</button>
                        <button type="button" className="btn-cancel-add-stop" onClick={() => setIsAddingStop(false)}>Cancel</button>
                      </form>
                    )}

                    {/* Vehicle Type & Seats */}
                    <div className="ride-details-wrap">
                      <div className="ride-input-group">
                        <span className="ride-field-label">VEHICLE TYPE</span>
                        <div className="ride-input-box">
                          <Car size={16} color="#dc2626" />
                          <select
                            className="ride-select-input"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                          >
                            {VEHICLE_TYPES.map(vt => (
                              <option key={vt} value={vt}>{vt}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} color="#64748b" style={{ marginLeft: 'auto', pointerEvents: 'none' }} />
                        </div>
                      </div>

                      <div className="ride-input-group">
                        <span className="ride-field-label">CHOOSE SEATS</span>
                        <div className="ride-input-box">
                          <User size={16} color="#3b82f6" />
                          <select
                            className="ride-select-input"
                            value={seatCount}
                            onChange={(e) => setSeatCount(e.target.value)}
                          >
                            {SEAT_OPTIONS.map(so => (
                              <option key={so} value={so}>{so}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} color="#64748b" style={{ marginLeft: 'auto', pointerEvents: 'none' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ride-search-bottom-row">
                    <button className="btn-add-stop" onClick={() => setIsAddingStop(true)}>
                      + Add Stop
                    </button>
                    <button
                      className="btn-search-rides-red"
                      onClick={handleSearchRides}
                      disabled={isSearchingRides}
                    >
                      {isSearchingRides ? 'Searching...' : 'Search Rides'}
                    </button>
                  </div>
                </div>

                {/* Live Route & Travel Time Pathfinder */}
                <div className="ride-pathfinder-card">
                  <div className="pathfinder-header">
                    <div className="pathfinder-header-left">
                      <span style={{ fontSize: '18px' }}>🗺️</span>
                      <div>
                        <h3 className="pathfinder-title">Live Route &amp; Travel Time Pathfinder</h3>
                        <span className="pathfinder-sub">{pickupLocation.split(',')[0]} → {dropLocation.split(',')[0]}</span>
                      </div>
                    </div>
                    <div className="pathfinder-badges">
                      <span className="badge-fast-route">● Fast Route</span>
                      <span className="badge-time-dist">⏱ {routeInfo.time} mins ({routeInfo.dist} km)</span>
                    </div>
                  </div>

                  {/* Route Map Graphic */}
                  <div className="route-map-canvas">
                    <div className="map-grid-overlay"></div>

                    {/* Pickup Spot Pin */}
                    <div className="map-pin-badge pickup-pin">
                      <span className="pin-dot green pulse"></span>
                      <div>
                        <strong className="pin-title">{pickupLocation.split(',')[0]}</strong>
                        <span className="pin-sub">Pickup Spot</span>
                      </div>
                    </div>

                    {/* Moving Car Icon & ETA Floating Tag */}
                    <div className="map-car-icon-moving">
                      <div className="car-eta-pill">ETA {routeInfo.time} min</div>
                      <div className="car-emoji">🚗</div>
                    </div>

                    {/* SVG Route Curve */}
                    <svg className="route-svg-path" viewBox="0 0 700 120" preserveAspectRatio="none">
                      <path
                        d="M 120 70 C 250 20, 450 110, 580 70"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="4"
                        strokeDasharray="6 6"
                      />
                    </svg>

                    {/* Destination Pin */}
                    <div className="map-pin-badge drop-pin">
                      <span className="pin-dot red"></span>
                      <div>
                        <strong className="pin-title">{dropLocation.split(',')[0]}</strong>
                        <span className="pin-sub">Destination</span>
                      </div>
                    </div>
                  </div>

                  <div className="pathfinder-footer">
                    <span className="suggested-route-text">
                      Suggested Route: <strong>{routeInfo.route}</strong>
                    </span>
                    <span className="traffic-sync-text">✓ Live Traffic Sync</span>
                  </div>
                </div>

                {/* 6 Quick Filter Cards */}
                <div className="ride-filter-cards-row">
                  <div
                    className={`ride-filter-card ${selectedRideFilter === 'cheapest' ? 'active-filter' : ''}`}
                    onClick={() => { setSelectedRideFilter('cheapest'); onToast('Sorted by Cheapest fares'); }}
                  >
                    <div className="filter-card-icon bg-green-light">🚗</div>
                    <strong className="filter-card-title">Cheapest</strong>
                    <span className="filter-card-sub">Find lowest fare</span>
                  </div>

                  <div
                    className={`ride-filter-card ${selectedRideFilter === 'shortest' ? 'active-filter' : ''}`}
                    onClick={() => { setSelectedRideFilter('shortest'); onToast('Sorted by Shortest Time'); }}
                  >
                    <div className="filter-card-icon bg-blue-light">⏱</div>
                    <strong className="filter-card-title">Shortest Time</strong>
                    <span className="filter-card-sub">Save travel time</span>
                  </div>

                  <div
                    className={`ride-filter-card ${selectedRideFilter === 'best_rated' ? 'active-filter' : ''}`}
                    onClick={() => { setSelectedRideFilter('best_rated'); onToast('Filtered by Best Rated drivers'); }}
                  >
                    <div className="filter-card-icon bg-yellow-light">⭐</div>
                    <strong className="filter-card-title">Best Rated</strong>
                    <span className="filter-card-sub">Top rated drivers</span>
                  </div>

                  <div
                    className={`ride-filter-card ${selectedRideFilter === 'no_surge' ? 'active-filter' : ''}`}
                    onClick={() => { setSelectedRideFilter('no_surge'); onToast('Filtered by No Surge pricing'); }}
                  >
                    <div className="filter-card-icon bg-purple-light">🔮</div>
                    <strong className="filter-card-title">No Surge</strong>
                    <span className="filter-card-sub">Avoid surge pricing</span>
                  </div>

                  <div
                    className={`ride-filter-card ${selectedRideFilter === 'women_drivers' ? 'active-filter' : ''}`}
                    onClick={() => { setSelectedRideFilter('women_drivers'); onToast('Filtered by Women Drivers'); }}
                  >
                    <div className="filter-card-icon bg-pink-light">👩‍✈️</div>
                    <strong className="filter-card-title">Women Drivers</strong>
                    <span className="filter-card-sub">Female driver only</span>
                  </div>

                  <div
                    className={`ride-filter-card ${isScheduleModalOpen ? 'active-filter' : ''}`}
                    onClick={() => setIsScheduleModalOpen(true)}
                  >
                    <div className="filter-card-icon bg-orange-light">📅</div>
                    <strong className="filter-card-title">Book Later</strong>
                    <span className="filter-card-sub">Schedule your ride</span>
                  </div>
                </div>

                {/* Available Ride Options Section */}
                <div className="ride-options-section" id="ride-options-section">
                  <div className="ride-options-header">
                    <div>
                      <h3 className="ride-options-title">Available Ride Options</h3>
                      <p className="ride-options-sub">Compare Uber, OBHAI, InDrive &amp; Pathao fares for {vehicleType}</p>
                    </div>
                    <div className="ride-headers-meta">
                      <span>Est. Time</span>
                      <span>Fare</span>
                      <span>Savings</span>
                    </div>
                  </div>

                  <div className="ride-cards-list">
                    {dynamicProviders.map(provider => (
                      <div
                        key={provider.id}
                        className={`ride-deal-card ${provider.highlightBorder ? 'highlighted-border-green' : ''}`}
                      >
                        <div className="ride-card-left">
                          <div className={`ride-brand-logo ${provider.logoBg}`}>
                            {provider.logoText}
                          </div>
                          <div className="ride-brand-info">
                            <div className="brand-title-row">
                              <strong className="brand-name">{provider.brand}</strong>
                              {provider.badge && (
                                <span className={provider.badgeClass}>{provider.badge}</span>
                              )}
                            </div>
                            <div className="brand-rating-row">
                              <span className="rating-star">★ {provider.rating}</span>
                              <span className="rating-count">({provider.ratingCount})</span>
                            </div>
                          </div>
                        </div>

                        <div className="ride-card-center">
                          <div className="car-type-info">
                            <Car size={16} color={provider.carColor} />
                            <strong className="car-type-name">{provider.carType}</strong>
                          </div>
                          <span className="car-seats-spec">{provider.seats}</span>
                        </div>

                        <div className="ride-card-time">
                          <strong className="time-val">{routeInfo.time + provider.timeOffset} min</strong>
                          <span className="dist-val">{routeInfo.dist} km</span>
                        </div>

                        <div className="ride-card-price">
                          <div className="price-main-row">
                            <strong className="price-curr">৳{provider.finalFare}</strong>
                            <span className="price-old">৳{provider.basePrice}</span>
                          </div>
                          <span className="cashback-tag">💳 bKash / Card Cashback</span>
                        </div>

                        <div className="ride-card-right">
                          <span className="savings-green-bold">Save ৳{provider.savings} ({provider.discountPct}% OFF)</span>
                          <button
                            className={provider.brand === 'InDrive' ? 'btn-book-green' : 'btn-book-dark-red'}
                            onClick={() => setBookingRideModal(provider)}
                          >
                            Book Now →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Widgets */}
              <div className="orders-right-col">
                {/* Widget 1: Your Ride Summary */}
                <div className="right-widget-card">
                  <h4 className="widget-title-bold">Your Ride Summary</h4>

                  <div className="ride-summary-route-box">
                    <div className="route-point-row">
                      <span className="dot-point green"></span>
                      <div>
                        <span className="route-point-label">Pickup</span>
                        <strong className="route-point-val">{pickupLocation}</strong>
                      </div>
                    </div>

                    <div className="route-connecting-line"></div>

                    <div className="route-point-row">
                      <span className="dot-point red"></span>
                      <div>
                        <span className="route-point-label">Drop</span>
                        <strong className="route-point-val">{dropLocation}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="ride-summary-metrics">
                    <div>
                      <span className="metric-label">Total Distance</span>
                      <strong className="metric-val">{routeInfo.dist} km</strong>
                    </div>
                    <div>
                      <span className="metric-label">Est. Travel Time</span>
                      <strong className="metric-val">{routeInfo.time} min</strong>
                    </div>
                  </div>

                  {cheapestOption && (
                    <div className="cheapest-ride-highlight-card">
                      <div className="cheapest-top-row">
                        <span>Cheapest Ride ({cheapestOption.brand})</span>
                        <strong className="cheapest-price-green">৳{cheapestOption.finalFare}</strong>
                      </div>
                      <span className="cheapest-save-text">You Save ৳{cheapestOption.savings} ({cheapestOption.discountPct}% OFF)</span>
                    </div>
                  )}

                  <p className="cashback-hint-text">
                    💡 Compare &amp; book to get extra bKash/Card cashback
                  </p>
                </div>

                {/* Widget 2: Why Choose OfferMatrix? */}
                <div className="right-widget-card">
                  <h4 className="widget-title-bold">Why Choose OfferMatrix?</h4>

                  <div className="why-choose-list">
                    <div className="why-choose-item">
                      <div className="why-icon-circle bg-teal-light">
                        <Search size={16} color="#0d9488" />
                      </div>
                      <div>
                        <strong className="why-title">Compare across multiple providers</strong>
                        <span className="why-sub">Find the best price</span>
                      </div>
                    </div>

                    <div className="why-choose-item">
                      <div className="why-icon-circle bg-blue-light">
                        <RefreshCw size={16} color="#2563eb" />
                      </div>
                      <div>
                        <strong className="why-title">Real-time fare &amp; time updates</strong>
                        <span className="why-sub">Always get accurate info</span>
                      </div>
                    </div>

                    <div className="why-choose-item">
                      <div className="why-icon-circle bg-yellow-light">
                        <Tag size={16} color="#d97706" />
                      </div>
                      <div>
                        <strong className="why-title">No hidden charges</strong>
                        <span className="why-sub">Transparent pricing</span>
                      </div>
                    </div>

                    <div className="why-choose-item">
                      <div className="why-icon-circle bg-pink-light">
                        <ShieldAlert size={16} color="#e11d48" />
                      </div>
                      <div>
                        <strong className="why-title">Secure &amp; trusted</strong>
                        <span className="why-sub">Your safety is our priority</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Widget 3: Promo Banner */}
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">🎁</div>
                  <h4 className="promo-pink-title">Get Extra 10% OFF</h4>
                  <p className="promo-pink-code">Use code: <strong>RIDE10</strong></p>
                  <p className="promo-pink-sub">Valid on all rides above ৳150</p>
                  <button
                    className="promo-pink-btn"
                    onClick={() => handleCopyCode('RIDE10')}
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'skincare' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              {/* Left Column: Skincare Main Content */}
              <div className="orders-left-col">
                {/* Category Switcher Pills */}
                <div className="dash-greeting-bar" style={{ marginBottom: '4px' }}>
                  <div></div>
                  <div className="greeting-pills">
                    <span
                      className="category-tag-pill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('food')}
                    >
                      🍴 Food
                    </span>
                    <span
                      className="category-tag-pill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('ride')}
                    >
                      🚗 Ride
                    </span>
                    <span
                      className="category-tag-pill pill-active-coral"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setActiveTab('skincare')}
                    >
                      ✨ Skincare
                    </span>
                    {onOpenCart && (
                      <button
                        onClick={onOpenCart}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          background: '#fff0f5',
                          color: '#ff2b70',
                          border: '1px solid #fecdd3',
                          fontWeight: 800,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        🛒 Basket ({cartCount})
                      </button>
                    )}
                  </div>
                </div>

                {/* Skincare Hero Banner Card */}
                <div className="skincare-hero-card">
                  <div className="skincare-hero-left">
                    <div className="skincare-hero-greeting">Hey Setu! 👋</div>
                    <h1 className="skincare-hero-title">
                      Find the best <span className="text-coral-accent">skincare deals</span> from top brands &amp; stores
                    </h1>
                    <p className="skincare-hero-desc">
                      Compare prices, read reviews, and save more on your skincare.
                    </p>
                  </div>
                  <div className="skincare-hero-right">
                    <div className="skincare-hero-img-mask">
                      <img
                        src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80"
                        alt="Essential Oil Dropper Bottle with Rose Petals"
                        className="skincare-hero-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Skincare Search Card */}
                <div className="skincare-search-card">
                  <div className="skincare-search-input-wrap">
                    <Search size={18} color="#94a3b8" />
                    <input
                      type="text"
                      placeholder="Search for products, brands or stores..."
                      className="skincare-search-input"
                      value={skincareSearchQuery}
                      onChange={(e) => setSkincareSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="skincare-search-divider"></div>
                  <div className="skincare-search-location">
                    <span>📍 Dhaka</span>
                    <ChevronDown size={14} color="#64748b" />
                  </div>
                  <button
                    className="skincare-search-btn"
                    onClick={() => onToast(`Searching skincare products for "${skincareSearchQuery || 'All'}" in Dhaka...`)}
                  >
                    Search
                  </button>
                </div>

                {/* Top Skincare Categories */}
                <div className="skincare-categories-container">
                  <h3 className="section-title" style={{ marginBottom: '12px' }}>Top Skincare Categories</h3>

                  <div className="skincare-cat-pills-row">
                    {SKINCARE_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        className={`skincare-cat-pill ${selectedSkincareCategory === cat.id ? 'active-coral' : ''}`}
                        onClick={() => {
                          setSelectedSkincareCategory(cat.id);
                          onToast(`Filtered by category: ${cat.label}`);
                        }}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Sub-feature Pills */}
                  <div className="skincare-features-grid">
                    {SKINCARE_FEATURES.map((feat, idx) => (
                      <div key={idx} className="skincare-feature-card" onClick={() => onToast(`Showing ${feat.label} offers...`)}>
                        <div className="skincare-feature-top">
                          <span className="feat-icon">{feat.icon}</span>
                          <strong>{feat.label}</strong>
                        </div>
                        <span className="feat-sub">{feat.sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Skincare Deals for You Section */}
                <div className="food-section-container" style={{ marginTop: '24px' }}>
                  <div className="section-header-row">
                    <div>
                      <h3 className="section-title">Best Skincare Deals for You</h3>
                      <p className="section-subtitle">Handpicked deals from top stores</p>
                    </div>
                    <button className="section-view-all-link" onClick={() => onToast('Viewing all skincare deals...')}>View All Deals</button>
                  </div>

                  <div className="skincare-deals-cards-grid">
                    {filteredSkincareDeals.map(deal => (
                      <div
                        key={deal.id}
                        className="food-deal-card skincare-deal-card"
                        style={{
                          cursor: 'pointer',
                          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                          borderRadius: '20px',
                          overflow: 'hidden',
                          background: 'white',
                          border: '1px solid #f3f4f6',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => {
                          if (onOpenDealDetail) {
                            onOpenDealDetail({
                              ...deal,
                              title: `${deal.brand} ${deal.subTitle}`,
                              category: 'skincare',
                              bestPrice: deal.currPrice,
                              originalPrice: deal.oldPrice,
                              savings: deal.saveAmount
                            });
                          }
                        }}
                      >
                        <div>
                          <div className="food-deal-img-wrapper" style={{ height: '190px', borderRadius: '18px 18px 0 0', overflow: 'hidden' }}>
                            <img
                              src={deal.img}
                              alt={deal.brand}
                              className="food-deal-img"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80';
                              }}
                            />
                            {deal.badge && <span className="badge-best-deal" style={{ fontSize: '11px', fontWeight: 800 }}>{deal.badge}</span>}
                            <span className="badge-rating" style={{ fontSize: '11px', fontWeight: 700 }}>⭐ {deal.rating} ({deal.ratingCount})</span>
                          </div>

                          <div className="food-deal-content" style={{ padding: '14px 16px 12px' }}>
                            <h4 className="food-deal-title" style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: 0 }}>
                              {deal.brand}
                            </h4>
                            <span className="food-deal-restaurant" style={{ fontSize: '12.5px', color: '#6b7280', marginTop: '2px', display: 'block', minHeight: '36px' }}>
                              {deal.subTitle}
                            </span>

                            <div className="food-deal-price-row" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className="food-curr-price" style={{ color: '#ff2b70', fontSize: '18px', fontWeight: 900 }}>
                                ৳{deal.currPrice.toLocaleString()}
                              </span>
                              <span className="food-old-price" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>
                                ৳{deal.oldPrice.toLocaleString()}
                              </span>
                              <span className="food-off-badge" style={{ background: '#fff0f5', color: '#dc2626', fontWeight: 800, fontSize: '11px', padding: '2px 8px', borderRadius: '9999px' }}>
                                {deal.discountPct}% OFF
                              </span>
                            </div>

                            <div className="food-deal-save-row" style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span className="food-save-text" style={{ color: '#16a34a', fontWeight: 700, fontSize: '12.5px' }}>
                                You Save ৳{deal.saveAmount}
                              </span>
                              <span className="food-app-tag" style={{ background: '#fff1f2', color: '#ff2b70', border: '1px solid #fecdd3', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>
                                {deal.storeTag}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '0 16px 14px' }}>
                          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                            <button
                              style={{
                                flex: 1,
                                padding: '9px 8px',
                                borderRadius: '9999px',
                                background: 'white',
                                border: '1.5px solid #ff2b70',
                                color: '#ff2b70',
                                fontWeight: 800,
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToCart) {
                                  onAddToCart({
                                    ...deal,
                                    title: `${deal.brand} ${deal.subTitle}`,
                                    category: 'skincare',
                                    selectedApp: deal.storeTag || 'Choice Legacy',
                                    selectedPayment: 'bKash',
                                    qty: 1,
                                    appPrice: deal.currPrice,
                                    oldPrice: deal.oldPrice,
                                    finalPrice: Math.round(deal.currPrice * 0.95),
                                    savings: deal.saveAmount + Math.round(deal.currPrice * 0.05)
                                  });
                                }
                                if (onToast) {
                                  onToast(`🛒 Added "${deal.brand}" to Basket!`);
                                }
                              }}
                            >
                              <span>Add to Basket 🛒</span>
                            </button>

                            <button
                              style={{
                                flex: 1,
                                padding: '9px 8px',
                                borderRadius: '9999px',
                                background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '12px',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                boxShadow: '0 4px 12px rgba(255, 43, 112, 0.3)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenDealDetail) {
                                  onOpenDealDetail({
                                    ...deal,
                                    title: `${deal.brand} ${deal.subTitle}`,
                                    category: 'skincare',
                                    bestPrice: deal.currPrice,
                                    originalPrice: deal.oldPrice,
                                    savings: deal.saveAmount
                                  });
                                }
                              }}
                            >
                              <span>Order ⚡</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Products Banner Button */}
                  <div style={{ textAlign: 'center', marginTop: '28px' }}>
                    <button
                      onClick={() => {
                        setSelectedSkincareCategory('All');
                        onToast('✨ Showing all 30 authentic skincare products (COSRX, Purito, Anua, Brightening Ampoules, The Purest Solutions)!');
                      }}
                      style={{
                        padding: '12px 28px',
                        borderRadius: '9999px',
                        background: 'white',
                        border: '2px solid #ff2b70',
                        color: '#ff2b70',
                        fontWeight: 800,
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 14px rgba(255, 43, 112, 0.15)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>➕ Explore &amp; Add More Products</span>
                    </button>
                  </div>
                </div>

                {/* Trending Now Section */}
                <div className="food-section-container" style={{ marginTop: '24px' }}>
                  <div className="section-header-row">
                    <div>
                      <h3 className="section-title">Trending Now</h3>
                      <p className="section-subtitle">Most searched &amp; popular skincare products</p>
                    </div>
                    <button className="section-view-all-link" onClick={() => onToast('Viewing all trending skincare...')}>View All</button>
                  </div>

                  <div className="skincare-trending-grid">
                    {TRENDING_SKINCARE_ITEMS.map((item, idx) => (
                      <div key={idx} className="skincare-trending-card" onClick={() => onToast(`Exploring ${item.title}...`)}>
                        <div className="trending-icon-box">{item.icon}</div>
                        <div className="trending-info">
                          <strong className="trending-title">{item.title}</strong>
                          <span className="trending-sub">{item.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fraud Pages & Fake Products Warning Banner */}
                <div className="skincare-fraud-banner" style={{ marginTop: '24px' }}>
                  <div className="fraud-left">
                    <h4 className="fraud-title">Fraud Pages &amp; Fake Products</h4>
                    <p className="fraud-desc">Report scam pages or fake skincare products to help others stay safe.</p>
                  </div>
                  <button
                    className="btn-report-fraud"
                    onClick={() => onToast('Opening Scam & Fake Skincare Report Portal... 🛡️')}
                  >
                    Report Now 🛡️
                  </button>
                </div>
              </div>

              {/* Right Column: Skincare Joint Widgets */}
              <div className="orders-right-col">
                {/* Skincare Savings Widget */}
                <div className="right-widget-card">
                  <div className="widget-header-row">
                    <h4 className="widget-title-sm">Skincare Savings</h4>
                    <select className="chart-dropdown">
                      <option>This Month</option>
                      <option>Last Month</option>
                    </select>
                  </div>

                  <div className="savings-hero-amount">
                    <span className="savings-taka-val" style={{ color: '#e06666' }}>৳2,850</span>
                    <span className="savings-badge-up">▲ 22% vs last month</span>
                  </div>

                  <div className="savings-metrics-grid">
                    <div className="savings-metric-box">
                      <span className="s-metric-label">Products Compared</span>
                      <strong className="s-metric-val">36</strong>
                    </div>
                    <div className="savings-metric-box">
                      <span className="s-metric-label">Total Saved</span>
                      <strong className="s-metric-val">৳8,450</strong>
                    </div>
                  </div>

                  <div className="savings-progress-wrap">
                    <div className="savings-progress-bar">
                      <div className="savings-progress-fill" style={{ width: '78%', background: 'linear-gradient(90deg, #e06666 0%, #ff8a65 100%)' }}></div>
                    </div>
                    <p className="savings-benchmark-text">
                      You're saving more than <strong>78%</strong> of users!
                    </p>
                  </div>
                </div>

                {/* Most Sold & Most Viral Products Widget */}
                <div className="right-widget-card" style={{ border: '1.5px solid #fecdd3', background: '#fff0f5' }}>
                  <div className="widget-header-row" style={{ marginBottom: '12px' }}>
                    <div>
                      <h4 className="widget-title-sm" style={{ color: '#be123c', fontSize: '15px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🔥 Most Sold &amp; Viral Products
                      </h4>
                      <span style={{ fontSize: '11px', color: '#9f1239', fontWeight: 700 }}>Top 5 Trending in Bangladesh</span>
                    </div>
                    <span style={{ fontSize: '11px', background: '#ffe4e6', color: '#be123c', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>
                      ⚡ Live
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {SKINCARE_DEALS_DATA.slice(0, 5).map((viralItem) => (
                      <div
                        key={`viral-${viralItem.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'white',
                          borderRadius: '14px',
                          padding: '10px 12px',
                          border: '1px solid #ffe4e6',
                          boxShadow: '0 2px 8px rgba(225, 29, 72, 0.05)',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          if (onOpenDealDetail) {
                            onOpenDealDetail({
                              ...viralItem,
                              title: `${viralItem.brand} ${viralItem.subTitle}`,
                              category: 'skincare',
                              bestPrice: viralItem.currPrice,
                              originalPrice: viralItem.oldPrice,
                              savings: viralItem.saveAmount
                            });
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={viralItem.img}
                            alt={viralItem.brand}
                            style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong style={{ fontSize: '13px', color: '#111827', display: 'block', lineHeight: 1.2 }}>{viralItem.brand}</strong>
                            <span style={{ fontSize: '11px', color: '#6b7280' }}>{viralItem.storeTag} • ⭐ {viralItem.rating}</span>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70', marginTop: '2px' }}>
                              ৳{viralItem.currPrice.toLocaleString()} <span style={{ fontSize: '10px', color: '#9ca3af', textDecoration: 'line-through' }}>৳{viralItem.oldPrice}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          style={{
                            padding: '6px 12px',
                            borderRadius: '9999px',
                            background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '11px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(255, 43, 112, 0.25)',
                            flexShrink: 0
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddToCart) {
                              onAddToCart({
                                ...viralItem,
                                title: `${viralItem.brand} ${viralItem.subTitle}`,
                                category: 'skincare',
                                selectedApp: viralItem.storeTag || 'Choice Legacy',
                                selectedPayment: 'bKash',
                                qty: 1,
                                appPrice: viralItem.currPrice,
                                oldPrice: viralItem.oldPrice,
                                finalPrice: Math.round(viralItem.currPrice * 0.95),
                                savings: viralItem.saveAmount + Math.round(viralItem.currPrice * 0.05)
                              });
                            }
                            if (onToast) {
                              onToast(`🛒 Added "${viralItem.brand}" to Basket!`);
                            }
                          }}
                        >
                          Add 🛒
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Partner Stores Advertisements Widget: Choice Legacy, kirei, Makeup Chari */}
                <div className="right-widget-card" style={{ border: '2px solid #fbcfe8', background: 'linear-gradient(180deg, #ffffff 0%, #fff0f5 100%)', borderRadius: '20px', padding: '18px' }}>
                  <div className="widget-header-row" style={{ marginBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#be123c', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🛍️ Featured Partner Stores &amp; Apps
                      </h4>
                      <span style={{ fontSize: '11px', color: '#9f1239', fontWeight: 600 }}>100% Authentic Verified Partners</span>
                    </div>
                    <span style={{ fontSize: '10px', background: '#ffe4e6', color: '#be123c', fontWeight: 800, padding: '3px 8px', borderRadius: '9999px' }}>
                      AD
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Ad 1: Choice Legacy */}
                    <div
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '14px',
                        border: '1.5px solid #fecdd3',
                        boxShadow: '0 4px 12px rgba(225, 29, 72, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        if (onOpenChoiceLegacy) onOpenChoiceLegacy();
                        else setSkincareSearchQuery('Choice Legacy');
                        onToast('🛍️ Opening Choice Legacy BD store...');
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            background: '#fff0f5',
                            color: '#be123c',
                            fontWeight: 900,
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            border: '1px solid #fecdd3'
                          }}>
                            Choice Legacy
                          </div>
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>✓ Verified Partner</span>
                        </div>
                        <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          UP TO 30% OFF
                        </span>
                      </div>

                      <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginTop: '8px', marginBottom: '2px' }}>
                        Choice Legacy BD – Authentic USA &amp; Korean Skincare
                      </h5>
                      <p style={{ fontSize: '11.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
                        Direct barcode verified authentic products. CeraVe, Simple, Neutrogena &amp; Beauty of Joseon with 24h delivery.
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #f3f4f6' }}>
                        <span style={{ fontSize: '11px', color: '#be123c', fontWeight: 700 }}>🎟️ Code: CHOICE15 (15% OFF)</span>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#ff2b70' }}>Shop Deals ➔</span>
                      </div>
                    </div>

                    {/* Ad 2: kirei */}
                    <div
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '14px',
                        border: '1.5px solid #fed7aa',
                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        if (onOpenKirei) onOpenKirei();
                        else setSkincareSearchQuery('kirei');
                        onToast('🛍️ Opening Kirei store...');
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            background: '#fff7ed',
                            color: '#c2410c',
                            fontWeight: 900,
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            border: '1px solid #ffedd5'
                          }}>
                            kirei
                          </div>
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>✓ Top Rated App</span>
                        </div>
                        <span style={{ fontSize: '10px', background: '#ffedd5', color: '#c2410c', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          5% bKash Cash
                        </span>
                      </div>

                      <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginTop: '8px', marginBottom: '2px' }}>
                        kirei App – Viral Korean K-Beauty Hub
                      </h5>
                      <p style={{ fontSize: '11.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
                        Home of Anua, COSRX, The Ordinary &amp; Laneige. Guaranteed genuine imports with live order tracking.
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #f3f4f6' }}>
                        <span style={{ fontSize: '11px', color: '#c2410c', fontWeight: 700 }}>🎟️ Code: KIREI10 (10% OFF)</span>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#ea580c' }}>Shop Deals ➔</span>
                      </div>
                    </div>

                    {/* Ad 3: Makeup Chari */}
                    <div
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '14px',
                        border: '1.5px solid #ddd6fe',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => {
                        if (onOpenMakeupChari) onOpenMakeupChari();
                        else {
                          setSkincareSearchQuery('Makeup Chari');
                          onToast('💄 Opening Makeup Chari Store...');
                        }
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            background: '#f5f3ff',
                            color: '#6d28d9',
                            fontWeight: 900,
                            fontSize: '11px',
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            border: '1px solid #ddd6fe'
                          }}>
                            Makeup Chari
                          </div>
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>✓ Official Warranty</span>
                        </div>
                        <span style={{ fontSize: '10px', background: '#ede9fe', color: '#6d28d9', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          FREE SHIPPING
                        </span>
                      </div>

                      <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginTop: '8px', marginBottom: '2px' }}>
                        Makeup Chari – Luxury Skincare &amp; Derm Products
                      </h5>
                      <p style={{ fontSize: '11.5px', color: '#6b7280', margin: 0, lineHeight: 1.4 }}>
                        La Roche-Posay, Paula's Choice &amp; CeraVe official mall partner. Free delivery on orders above ৳1,500.
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #f3f4f6' }}>
                        <span style={{ fontSize: '11px', color: '#6d28d9', fontWeight: 700 }}>🎟️ Code: CHARI15 (15% OFF)</span>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#7c3aed' }}>Shop Deals ➔</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pink Promo Widget */}
                <div className="food-promo-card-pink" style={{ background: '#fff5f5', borderColor: '#fecdd3' }}>
                  <div className="promo-apple-icon">🎁</div>
                  <h4 className="promo-pink-title">Get Extra 10% OFF</h4>
                  <p className="promo-pink-code">Use code: <strong style={{ color: '#e06666' }}>SKIN10</strong></p>
                  <p className="promo-pink-sub">Valid on all orders above ৳999</p>
                  <button
                    className="promo-pink-btn"
                    style={{ background: '#e06666' }}
                    onClick={() => handleCopyCode('SKIN10')}
                  >
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'saved_deals' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Greeting & Header Stats Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>Hey Setu! 👋</div>
                  <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '4px 0 2px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Saved Deals <span style={{ color: '#ff2b70' }}>💕</span>
                  </h1>
                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                    Your bookmarked food offers, ride discounts, and skincare products.
                  </p>
                </div>

                {/* Top Right Stats Box */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '12px 24px', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Heart size={20} fill="#ff2b70" color="#ff2b70" />
                    </div>
                    <div>
                      <strong style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', display: 'block', lineHeight: 1 }}>{savedDealsList.length}</strong>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Total Saved</span>
                    </div>
                  </div>

                  <div style={{ width: '1px', height: '36px', background: '#f1f5f9' }}></div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontWeight: 900, fontSize: '18px' }}>
                      ৳
                    </div>
                    <div>
                      <strong style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', display: 'block', lineHeight: 1 }}>৳3,450</strong>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Potential Savings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Filter Pills Bar */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  className={`category-tag-pill ${savedDealsFilter === 'all' ? (activeCategoryMode === 'food' ? 'pill-active-blue' : 'pill-active-coral') : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 18px',
                    borderRadius: '25px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: savedDealsFilter === 'all' ? 'none' : '1px solid #e2e8f0',
                    background: savedDealsFilter === 'all' ? (activeCategoryMode === 'food' ? '#02a9ea' : '#ff2b70') : '#ffffff',
                    color: savedDealsFilter === 'all' ? '#ffffff' : '#475569',
                    boxShadow: savedDealsFilter === 'all' ? (activeCategoryMode === 'food' ? '0 4px 12px rgba(2,169,234,0.3)' : '0 4px 12px rgba(255,43,112,0.3)') : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSavedDealsFilter('all')}
                >
                  ❤️ All Saved <span style={{ background: savedDealsFilter === 'all' ? '#ffffff' : '#f1f5f9', color: savedDealsFilter === 'all' ? (activeCategoryMode === 'food' ? '#02a9ea' : '#ff2b70') : '#475569', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 900 }}>{savedDealsList.length}</span>
                </button>

                <button
                  className={`category-tag-pill ${savedDealsFilter === 'food' ? (activeCategoryMode === 'food' ? 'pill-active-blue' : 'pill-active-coral') : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 18px',
                    borderRadius: '25px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: savedDealsFilter === 'food' ? 'none' : '1px solid #e2e8f0',
                    background: savedDealsFilter === 'food' ? (activeCategoryMode === 'food' ? '#02a9ea' : '#ff2b70') : '#ffffff',
                    color: savedDealsFilter === 'food' ? '#ffffff' : '#475569',
                    boxShadow: savedDealsFilter === 'food' ? (activeCategoryMode === 'food' ? '0 4px 12px rgba(2,169,234,0.3)' : '0 4px 12px rgba(255,43,112,0.3)') : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSavedDealsFilter('food')}
                >
                  🍴 Food Deals <span style={{ background: savedDealsFilter === 'food' ? '#ffffff' : '#f1f5f9', color: savedDealsFilter === 'food' ? (activeCategoryMode === 'food' ? '#02a9ea' : '#ff2b70') : '#475569', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 900 }}>{savedDealsList.filter(d => d.category === 'food').length}</span>
                </button>

                <button
                  className={`category-tag-pill ${savedDealsFilter === 'ride' ? 'pill-active-coral' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 18px',
                    borderRadius: '25px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: savedDealsFilter === 'ride' ? 'none' : '1px solid #e2e8f0',
                    background: savedDealsFilter === 'ride' ? '#ff2b70' : '#ffffff',
                    color: savedDealsFilter === 'ride' ? '#ffffff' : '#475569',
                    boxShadow: savedDealsFilter === 'ride' ? '0 4px 12px rgba(255,43,112,0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSavedDealsFilter('ride')}
                >
                  🚗 Ride Deals <span style={{ background: savedDealsFilter === 'ride' ? '#ffffff' : '#f1f5f9', color: savedDealsFilter === 'ride' ? '#ff2b70' : '#475569', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 900 }}>{savedDealsList.filter(d => d.category === 'ride').length}</span>
                </button>

                <button
                  className={`category-tag-pill ${savedDealsFilter === 'skincare' ? 'pill-active-coral' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 18px',
                    borderRadius: '25px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: savedDealsFilter === 'skincare' ? 'none' : '1px solid #e2e8f0',
                    background: savedDealsFilter === 'skincare' ? '#ff2b70' : '#ffffff',
                    color: savedDealsFilter === 'skincare' ? '#ffffff' : '#475569',
                    boxShadow: savedDealsFilter === 'skincare' ? '0 4px 12px rgba(255,43,112,0.3)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSavedDealsFilter('skincare')}
                >
                  💧 Skincare Products <span style={{ background: savedDealsFilter === 'skincare' ? '#ffffff' : '#f1f5f9', color: savedDealsFilter === 'skincare' ? '#ff2b70' : '#475569', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 900 }}>{savedDealsList.filter(d => d.category === 'skincare').length}</span>
                </button>
              </div>

              {/* 4-Column Card Grid Matching User Screenshot */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {savedDealsList
                  .filter(deal => savedDealsFilter === 'all' ? true : deal.category === savedDealsFilter)
                  .map((deal) => (
                    <div
                      key={deal.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        border: '1px solid #f1f5f9',
                        overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                    >
                      {/* Image Banner */}
                      <div style={{ height: '175px', position: 'relative', overflow: 'hidden' }}>
                        <img src={deal.img} alt={deal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                        {/* Top Left Tag Badge */}
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: deal.tagBg,
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 900,
                          padding: '4px 12px',
                          borderRadius: '6px',
                          letterSpacing: '0.5px'
                        }}>
                          {deal.tag}
                        </span>

                        {/* Top Right Heart Bookmark Button */}
                        <button
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#ffffff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }}
                          onClick={() => {
                            setSavedDealsList(savedDealsList.filter(d => d.id !== deal.id));
                            onToast(`Removed "${deal.title}" from saved deals ❤️`);
                          }}
                        >
                          <Heart size={16} fill="#ff2b70" color="#ff2b70" />
                        </button>
                      </div>

                      {/* Card Content Body */}
                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>{deal.vendor}</span>
                          <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '4px 0 10px 0', lineHeight: 1.3 }}>
                            {deal.title}
                          </h4>

                          {/* Price & Discount Row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '19px', fontWeight: 900, color: '#ff2b70' }}>{deal.price}</strong>
                            <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>{deal.oldPrice}</span>
                            <span style={{ fontSize: '11.5px', fontWeight: 800, background: '#dcfce7', color: '#16a34a', padding: '2px 7px', borderRadius: '6px' }}>
                              {deal.discount}
                            </span>
                          </div>
                        </div>

                        {/* Card Footer Row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f8fafc' }}>
                          <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 500 }}>Saved: {deal.date}</span>
                          <button
                            style={{
                              background: 'linear-gradient(135deg, #ff2b70 0%, #d91b5c 100%)',
                              color: '#ffffff',
                              fontSize: '12.5px',
                              fontWeight: 800,
                              padding: '7px 16px',
                              borderRadius: '20px',
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 4px 10px rgba(255,43,112,0.25)'
                            }}
                            onClick={() => onToast(`Redirecting to ${deal.vendor} deal... 🚀`)}
                          >
                            Order Now →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </main>
        ) : activeTab === 'price_alerts' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">Live Price Tracking 🔔</div>
                    <h1 className="greeting-title">Active Price Alerts ({priceAlertsList.length})</h1>
                    <p className="greeting-desc">Get instant notifications when fares or product prices reach your budget target.</p>
                  </div>
                  <div className="greeting-pills">
                    {[
                      { key: 'all', label: `All (${priceAlertsList.length})` },
                      { key: 'food', label: `🍴 Food (${priceAlertsList.filter(a => a.category === 'food').length})` },
                      { key: 'ride', label: `🚗 Ride (${priceAlertsList.filter(a => a.category === 'ride').length})` },
                      { key: 'skincare', label: `✨ Skincare (${priceAlertsList.filter(a => a.category === 'skincare').length})` },
                    ].map(pill => {
                      const isActive = priceAlertFilter === pill.key;
                      return (
                        <button
                          key={pill.key}
                          className={`category-tag-pill ${isActive ? (activeCategoryMode === 'food' ? 'pill-active-blue' : 'pill-active-coral') : ''}`}
                          style={{
                            cursor: 'pointer',
                            border: isActive ? 'none' : '1px solid #e2e8f0',
                            background: isActive ? (activeCategoryMode === 'food' ? '#02a9ea' : '#ff2b70') : '#ffffff',
                            color: isActive ? '#ffffff' : '#475569',
                            fontWeight: isActive ? 900 : 700,
                            boxShadow: isActive ? (activeCategoryMode === 'food' ? '0 4px 12px rgba(2,169,234,0.3)' : '0 4px 12px rgba(255,43,112,0.3)') : 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setPriceAlertFilter(pill.key)}
                        >
                          {pill.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Form for Adding New Price Alert */}
                {isAddingPriceAlert && (
                  <div className="complain-form-card animate-fade-in" style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>🔔 Add New Price Tracking Alert</h3>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newAlertTitle.trim() || !newAlertTarget.trim()) return;
                      const newAlert = {
                        id: `pa-${Date.now()}`,
                        title: newAlertTitle,
                        category: newAlertCategory,
                        target: newAlertTarget.startsWith('৳') ? newAlertTarget : `৳${newAlertTarget}`,
                        current: newAlertCurrent ? (newAlertCurrent.startsWith('৳') ? newAlertCurrent : `৳${newAlertCurrent}`) : '৳250',
                        drop: 'New Alert',
                        status: 'Active',
                        img: newAlertCategory === 'food'
                          ? 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=100&q=80'
                          : newAlertCategory === 'ride'
                            ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=100&q=80'
                            : 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80'
                      };
                      setPriceAlertsList([newAlert, ...priceAlertsList]);
                      setNewAlertTitle('');
                      setNewAlertTarget('');
                      setNewAlertCurrent('');
                      setIsAddingPriceAlert(false);
                      onToast(`🔔 Price alert for "${newAlertTitle}" created!`);
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        <div className="form-field-group">
                          <label className="form-field-label">ITEM / RIDE TITLE</label>
                          <input type="text" className="form-input-text" placeholder="e.g. Kacchi Biryani, Pathao Ride..." value={newAlertTitle} onChange={e => setNewAlertTitle(e.target.value)} required />
                        </div>
                        <div className="form-field-group">
                          <label className="form-field-label">CATEGORY</label>
                          <select className="form-select-box" value={newAlertCategory} onChange={e => setNewAlertCategory(e.target.value)}>
                            <option value="food">🍴 Food</option>
                            <option value="ride">🚗 Ride</option>
                            <option value="skincare">✨ Skincare</option>
                          </select>
                        </div>
                        <div className="form-field-group">
                          <label className="form-field-label">TARGET PRICE BUDGET (৳)</label>
                          <input type="text" className="form-input-text" placeholder="e.g. ৳180" value={newAlertTarget} onChange={e => setNewAlertTarget(e.target.value)} required />
                        </div>
                        <div className="form-field-group">
                          <label className="form-field-label">CURRENT PRICE (৳)</label>
                          <input type="text" className="form-input-text" placeholder="e.g. ৳220" value={newAlertCurrent} onChange={e => setNewAlertCurrent(e.target.value)} />
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button type="button" className="btn-cancel-modal" onClick={() => setIsAddingPriceAlert(false)}>Cancel</button>
                        <button type="submit" className="btn-file-complaint-main" style={{ background: '#ff2b70' }}>Set Price Alert 🔔</button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Alert List</h3>
                    <button className="orders-live-tracker-link" onClick={() => setIsAddingPriceAlert(!isAddingPriceAlert)}>
                      {isAddingPriceAlert ? '✕ Close Form' : '+ Add Alert'}
                    </button>
                  </div>
                  <div className="active-orders-list">
                    {priceAlertsList
                      .filter(a => priceAlertFilter === 'all' ? true : a.category === priceAlertFilter)
                      .map(alert => (
                        <div key={alert.id} className="active-order-item" style={{ cursor: 'default' }}>
                          <div className="active-order-left">
                            <img src={alert.img} alt={alert.title} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                            <div className="order-main-details">
                              <h4 className="order-item-title" style={{ fontSize: '13.5px' }}>{alert.title}</h4>
                              <span className="order-item-subtitle">Target: <strong style={{ color: '#ff2b70' }}>{alert.target}</strong> • Current: {alert.current}</span>
                            </div>
                          </div>
                          <div className="active-order-right">
                            <span className="badge-delivered-green">{alert.drop}</span>
                            <button
                              className={alert.status === 'Active' ? 'badge-in-transit' : 'badge-completed'}
                              style={{ border: 'none', cursor: 'pointer' }}
                              onClick={() => {
                                const updated = priceAlertsList.map(a => a.id === alert.id ? { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' } : a);
                                setPriceAlertsList(updated);
                                onToast(`Alert for "${alert.title}" status changed to ${alert.status === 'Active' ? 'Paused' : 'Active'}.`);
                              }}
                            >
                              {alert.status}
                            </button>
                            <button
                              className="btn-track-outline"
                              onClick={() => {
                                const newT = prompt(`Edit target price for "${alert.title}":`, alert.target);
                                if (newT) {
                                  const updated = priceAlertsList.map(a => a.id === alert.id ? { ...a, target: newT.startsWith('৳') ? newT : `৳${newT}` } : a);
                                  setPriceAlertsList(updated);
                                  onToast(`Updated target price to ${newT}`);
                                }
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    {priceAlertsList.filter(a => priceAlertFilter === 'all' ? true : a.category === priceAlertFilter).length === 0 && (
                      <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                        <p style={{ margin: 0, fontWeight: 700 }}>No alerts found in this category.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Notification Channels</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', cursor: 'pointer', padding: '8px 10px', borderRadius: '8px', background: '#f8fafc', transition: 'all 0.2s ease' }}
                      onClick={() => {
                        setNotifChannels(prev => ({ ...prev, whatsapp: !prev.whatsapp }));
                        onToast(`WhatsApp Alert ${!notifChannels.whatsapp ? 'Enabled 📲' : 'Disabled ❌'}`);
                      }}
                    >
                      <span>📲 WhatsApp Alert</span>
                      <strong style={{ color: notifChannels.whatsapp ? '#10b981' : '#64748b' }}>{notifChannels.whatsapp ? 'Enabled' : 'Disabled'}</strong>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', cursor: 'pointer', padding: '8px 10px', borderRadius: '8px', background: '#f8fafc', transition: 'all 0.2s ease' }}
                      onClick={() => {
                        setNotifChannels(prev => ({ ...prev, email: !prev.email }));
                        onToast(`Email Digest ${!notifChannels.email ? 'Enabled 📩' : 'Disabled ❌'}`);
                      }}
                    >
                      <span>📩 Email Digest</span>
                      <strong style={{ color: notifChannels.email ? '#10b981' : '#64748b' }}>{notifChannels.email ? 'Enabled' : 'Disabled'}</strong>
                    </div>
                    <div
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', cursor: 'pointer', padding: '8px 10px', borderRadius: '8px', background: '#f8fafc', transition: 'all 0.2s ease' }}
                      onClick={() => {
                        setNotifChannels(prev => ({ ...prev, push: !prev.push }));
                        onToast(`Push Notification ${!notifChannels.push ? 'Enabled 🔔' : 'Disabled ❌'}`);
                      }}
                    >
                      <span>🔔 Push Notification</span>
                      <strong style={{ color: notifChannels.push ? '#10b981' : '#64748b' }}>{notifChannels.push ? 'Enabled' : 'Disabled'}</strong>
                    </div>
                  </div>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">⚡</div>
                  <h4 className="promo-pink-title">Real-Time Tracker</h4>
                  <p className="promo-pink-sub">Prices checked every 15 minutes across all partner apps.</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'coupons' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">Verified Vouchers 🎟️</div>
                    <h1 className="greeting-title">Active Promo Coupons</h1>
                    <p className="greeting-desc">Copy promo codes to save big on Foodpanda, Pathao, Careme &amp; Uber.</p>
                  </div>
                  <div className="greeting-pills">
                    {[
                      { key: 'all', label: 'All Coupons' },
                      { key: 'food', label: '🍴 Food' },
                      { key: 'ride', label: '🚗 Ride' },
                      { key: 'skincare', label: '✨ Skincare' },
                    ].map(pill => {
                      const isActive = couponCategoryFilter === pill.key;
                      return (
                        <button
                          key={pill.key}
                          className={`category-tag-pill ${isActive ? 'pill-active-coral' : ''}`}
                          style={{
                            cursor: 'pointer',
                            border: isActive ? 'none' : '1px solid #e2e8f0',
                            background: isActive ? '#ff2b70' : '#ffffff',
                            color: isActive ? '#ffffff' : '#475569',
                            fontWeight: isActive ? 900 : 700,
                            boxShadow: isActive ? '0 4px 12px rgba(255,43,112,0.3)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setCouponCategoryFilter(pill.key)}
                        >
                          {pill.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Available Vouchers</h3>
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>
                      {[
                        { code: 'FOOD20', category: 'food', title: '20% OFF on First 3 Food Orders', vendor: 'Foodpanda', min: 'Min Order ৳250', exp: 'Exp: 30 Sep', bg: '#fff1f2', text: '#e11d48', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80' },
                        { code: 'PATHAO100', category: 'ride', title: 'Flat ৳100 OFF on Car Rides', vendor: 'Pathao', min: 'Min Fare ৳300', exp: 'Exp: 25 Sep', bg: '#eff6ff', text: '#2563eb', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=100&q=80' },
                        { code: 'GLOW30', category: 'skincare', title: '30% OFF Skincare Serums & Toners', vendor: 'Careme BD', min: 'Min Order ৳1,200', exp: 'Exp: 15 Oct', bg: '#fdf2f8', text: '#db2777', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80' },
                        { code: 'UBERFREE', category: 'ride', title: 'Free Upgrade to Sedan AC', vendor: 'Uber', min: 'Any Ride', exp: 'Exp: 20 Sep', bg: '#f0fdf4', text: '#16a34a', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=100&q=80' },
                        { code: 'PIZZA50', category: 'food', title: 'Buy 1 Get 1 Free Large Pizza', vendor: 'Pizza Hut', min: 'Min Order ৳899', exp: 'Exp: 28 Sep', bg: '#fff7ed', text: '#ea580c', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80' },
                        { code: 'CERAVE20', category: 'skincare', title: '20% OFF CeraVe Cleansers', vendor: 'Beautybooth BD', min: 'Min Order ৳1,500', exp: 'Exp: 10 Oct', bg: '#fdf2f8', text: '#db2777', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=100&q=80' }
                      ].filter(c => couponCategoryFilter === 'all' ? true : c.category === couponCategoryFilter).length} Vouchers Available
                    </span>
                  </div>
                  <div className="active-orders-list">
                    {[
                      { code: 'FOOD20', category: 'food', title: '20% OFF on First 3 Food Orders', vendor: 'Foodpanda', min: 'Min Order ৳250', exp: 'Exp: 30 Sep', bg: '#fff1f2', text: '#e11d48', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=100&q=80' },
                      { code: 'PATHAO100', category: 'ride', title: 'Flat ৳100 OFF on Car Rides', vendor: 'Pathao', min: 'Min Fare ৳300', exp: 'Exp: 25 Sep', bg: '#eff6ff', text: '#2563eb', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=100&q=80' },
                      { code: 'GLOW30', category: 'skincare', title: '30% OFF Skincare Serums & Toners', vendor: 'Careme BD', min: 'Min Order ৳1,200', exp: 'Exp: 15 Oct', bg: '#fdf2f8', text: '#db2777', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=100&q=80' },
                      { code: 'UBERFREE', category: 'ride', title: 'Free Upgrade to Sedan AC', vendor: 'Uber', min: 'Any Ride', exp: 'Exp: 20 Sep', bg: '#f0fdf4', text: '#16a34a', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=100&q=80' },
                      { code: 'PIZZA50', category: 'food', title: 'Buy 1 Get 1 Free Large Pizza', vendor: 'Pizza Hut', min: 'Min Order ৳899', exp: 'Exp: 28 Sep', bg: '#fff7ed', text: '#ea580c', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&q=80' },
                      { code: 'CERAVE20', category: 'skincare', title: '20% OFF CeraVe Cleansers', vendor: 'Beautybooth BD', min: 'Min Order ৳1,500', exp: 'Exp: 10 Oct', bg: '#fdf2f8', text: '#db2777', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=100&q=80' }
                    ]
                      .filter(cpn => couponCategoryFilter === 'all' ? true : cpn.category === couponCategoryFilter)
                      .map(cpn => (
                        <div key={cpn.code} className="active-order-item" style={{ cursor: 'default' }}>
                          <div className="active-order-left">
                            <img src={cpn.img} alt={cpn.title} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                            <div className="order-main-details">
                              <h4 className="order-item-title" style={{ fontSize: '13.5px' }}>{cpn.title}</h4>
                              <span className="order-item-subtitle">{cpn.vendor} • {cpn.min} • <strong style={{ color: '#ff2b70' }}>{cpn.exp}</strong></span>
                            </div>
                          </div>
                          <div className="active-order-right">
                            <span style={{ padding: '6px 12px', background: cpn.bg, color: cpn.text, borderRadius: '8px', fontWeight: 800, fontSize: '13px', fontFamily: 'monospace' }}>
                              {cpn.code}
                            </span>
                            <button className="btn-track-outline" onClick={() => { navigator.clipboard?.writeText(cpn.code); onToast(`Copied voucher ${cpn.code}! 🎉`); }}>Copy Code</button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Coupon Savings</h4>
                  <div className="savings-hero-amount" style={{ marginTop: '10px' }}>
                    <span className="savings-taka-val">৳2,450</span>
                    <span className="savings-badge-up">Total Coupon Savings</span>
                  </div>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">🎁</div>
                  <h4 className="promo-pink-title">Daily Promo Drop</h4>
                  <p className="promo-pink-sub">New promo codes added daily at 10:00 AM.</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'reviews' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">Verified Experiences ⭐️</div>
                    <h1 className="greeting-title">User Reviews &amp; Ratings</h1>
                    <p className="greeting-desc">See real feedback from customers across Dhaka &amp; Chittagong.</p>
                  </div>
                  <div className="greeting-pills">
                    {[
                      { key: 'all', label: 'All Reviews' },
                      { key: 'food', label: '🍴 Food' },
                      { key: 'ride', label: '🚗 Ride' },
                      { key: 'skincare', label: '✨ Skincare' },
                    ].map(pill => {
                      const isActive = reviewCategoryFilter === pill.key;
                      return (
                        <button
                          key={pill.key}
                          className={`category-tag-pill ${isActive ? 'pill-active-coral' : ''}`}
                          style={{
                            cursor: 'pointer',
                            border: isActive ? 'none' : '1px solid #e2e8f0',
                            background: isActive ? '#ff2b70' : '#ffffff',
                            color: isActive ? '#ffffff' : '#475569',
                            fontWeight: isActive ? 900 : 700,
                            boxShadow: isActive ? '0 4px 12px rgba(255,43,112,0.3)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setReviewCategoryFilter(pill.key)}
                        >
                          {pill.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">
                      Recent Feedback {reviewCategoryFilter !== 'all' && `(${reviewCategoryFilter.toUpperCase()})`}
                    </h3>
                    <button className="orders-live-tracker-link" onClick={() => setIsAddingReview(true)}>+ Write Review</button>
                  </div>
                  <div className="active-orders-list">
                    {userReviewsList
                      .filter(rev => reviewCategoryFilter === 'all' ? true : rev.category === reviewCategoryFilter)
                      .map(rev => (
                        <div key={rev.id} className="active-order-item" style={{ cursor: 'default', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              {/* USER PROFILE PICTURE (AVATAR) */}
                              <div style={{ position: 'relative' }}>
                                <img
                                  src={rev.userAvatar}
                                  alt={rev.user}
                                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'; }}
                                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70', boxShadow: '0 2px 6px rgba(255,43,112,0.2)' }}
                                />
                                <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', background: '#10b981', color: '#ffffff', fontSize: '9px', width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '1.5px solid #ffffff' }}>✓</span>
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <strong style={{ fontSize: '14px', color: '#0f172a', fontWeight: 800 }}>{rev.user}</strong>
                                  <span style={{ fontSize: '10.5px', background: '#ecfdf5', color: '#059669', padding: '1px 6px', borderRadius: '6px', fontWeight: 700 }}>Verified Buyer</span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                                  <span style={{ color: '#ff2b70', fontWeight: 700 }}>{rev.item}</span> • {rev.location}
                                </div>
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '12.5px', color: '#eab308', fontWeight: 800, background: '#fefce8', padding: '3px 8px', borderRadius: '8px', border: '1px solid #fef08a' }}>
                                {rev.ratingText || ('⭐️'.repeat(rev.rating) + ` ${rev.rating}.0`)}
                              </span>
                              {rev.itemImg && (
                                <img
                                  src={rev.itemImg}
                                  alt={rev.item}
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                  style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e2e8f0', flexShrink: 0 }}
                                />
                              )}
                            </div>
                          </div>

                          <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.5, background: '#f8fafc', padding: '10px 14px', borderRadius: '10px', width: '100%', fontStyle: 'italic', borderLeft: '3px solid #ff2b70' }}>
                            "{rev.comment}"
                          </p>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '11.5px', color: '#94a3b8', paddingTop: '2px' }}>
                            <span>📅 {rev.date}</span>
                            <button
                              style={{
                                background: rev.isHelpful ? '#fff1f2' : '#f8fafc',
                                border: rev.isHelpful ? '1px solid #fecdd3' : '1px solid #e2e8f0',
                                color: rev.isHelpful ? '#e11d48' : '#64748b',
                                cursor: 'pointer',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '8px',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              onClick={() => handleToggleHelpful(rev.id)}
                            >
                              Helpful 👍 {rev.helpfulCount}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Community Score</h4>
                  <div className="savings-hero-amount" style={{ marginTop: '10px' }}>
                    <span className="savings-taka-val">4.9 ★</span>
                    <span className="savings-badge-up">{userReviewsList.length * 200 + 40} Reviews</span>
                  </div>
                </div>
                <div
                  className="food-promo-card-pink"
                  style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
                  onClick={() => setIsAddingReview(true)}
                >
                  <div className="promo-apple-icon">✨</div>
                  <h4 className="promo-pink-title">Earn Review Rewards</h4>
                  <p className="promo-pink-sub">Get ৳20 wallet credit for every verified photo review!</p>
                  <button style={{ marginTop: '8px', background: '#ffffff', color: '#ff2b70', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>
                    + Write Review Now
                  </button>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'complain_issues_old_removed' ? (
          <main className="dashboard-main-content"><div /></main>
        ) : activeTab === 'my_wallet' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#ffffff' }}>
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub" style={{ color: '#38bdf8' }}>Setu Pay Balance 💳</div>
                    <h1 className="greeting-title" style={{ color: '#ffffff' }}>৳1,850.00</h1>
                    <p className="greeting-desc" style={{ color: '#94a3b8' }}>Total Earned Cashback: <strong>৳4,250.00</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-upgrade-pink" style={{ background: '#ff2b70' }} onClick={() => onToast('Adding funds to wallet via bKash/Nagad...')}>+ Add Money</button>
                    <button className="btn-upgrade-pink" style={{ background: '#334155', color: '#fff' }} onClick={() => onToast('Withdraw request initiated...')}>Withdraw</button>
                  </div>
                </div>

                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Recent Wallet Transactions</h3>
                    <span style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 800 }}>Updated Live</span>
                  </div>
                  <div className="active-orders-list">
                    {[
                      { id: 'w1', title: 'Cashback from Foodpanda Order', date: '07 Sep 2026', channel: 'bKash', amount: '+৳150.00', color: '#16a34a', icon: '🎁' },
                      { id: 'w2', title: 'Pathao Ride Fare Payment', date: '06 Sep 2026', channel: 'Wallet', amount: '-৳380.00', color: '#ef4444', icon: '🚗' },
                      { id: 'w3', title: 'Referral Bonus (Friend Joined)', date: '04 Sep 2026', channel: 'Setu Bonus', amount: '+৳250.00', color: '#16a34a', icon: '🎉' },
                      { id: 'w4', title: 'Careme BD Skincare Cashback', date: '01 Sep 2026', channel: 'Nagad', amount: '+৳200.00', color: '#16a34a', icon: '✨' }
                    ].map(tx => (
                      <div key={tx.id} className="active-order-item" style={{ cursor: 'default' }}>
                        <div className="active-order-left">
                          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                            {tx.icon}
                          </div>
                          <div className="order-main-details">
                            <h4 className="order-item-title" style={{ fontSize: '13.5px' }}>{tx.title}</h4>
                            <span className="order-item-subtitle">{tx.channel} • 📅 {tx.date}</span>
                          </div>
                        </div>
                        <div className="active-order-right">
                          <strong style={{ fontSize: '15px', color: tx.color }}>{tx.amount}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Auto-Cashback Active</h4>
                  <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '6px' }}>
                    Cashback is automatically credited to your Setu Pay wallet within 2 hours of deal completion.
                  </p>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">💳</div>
                  <h4 className="promo-pink-title">Instant Cashout</h4>
                  <p className="promo-pink-sub">Transfer wallet balance directly to bKash or Nagad anytime!</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'bank_cards' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">Payment Methods 💳</div>
                    <h1 className="greeting-title">Saved Bank Cards &amp; Mobile Banking</h1>
                    <p className="greeting-desc">Manage credit cards, debit cards, bKash &amp; Nagad for one-click checkout.</p>
                  </div>
                  <button className="btn-upgrade-pink" onClick={() => onToast('Opening Add New Bank Card form...')}>+ Add New Method</button>
                </div>

                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Saved Accounts</h3>
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>3 Saved</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', padding: '10px 0' }}>
                    <div style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '16px', padding: '20px', color: '#fff', boxShadow: '0 10px 20px rgba(37,99,235,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>CITY BANK VISA</span>
                        <span style={{ fontSize: '18px', fontWeight: 900 }}>VISA</span>
                      </div>
                      <div style={{ margin: '24px 0 16px', fontSize: '18px', letterSpacing: '2px', fontFamily: 'monospace' }}>•••• •••• •••• 4289</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.8 }}>
                        <span>CARDHOLDER: {userName.toUpperCase()}</span>
                        <span>EXP: 08/29</span>
                      </div>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, #e11d48, #be123c)', borderRadius: '16px', padding: '20px', color: '#fff', boxShadow: '0 10px 20px rgba(225,29,72,0.2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px' }}>bKASH WALLET</span>
                        <span style={{ fontSize: '14px', fontWeight: 900 }}>bKash</span>
                      </div>
                      <div style={{ margin: '24px 0 16px', fontSize: '18px', letterSpacing: '2px', fontFamily: 'monospace' }}>017•• •••578</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.8 }}>
                        <span>ACCOUNT: PRIMARY</span>
                        <span>STATUS: VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Bank Partner Offers</h4>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                    <p style={{ margin: 0 }}>🏦 <strong>City Bank:</strong> Extra 10% cashback on Foodpanda</p>
                    <p style={{ margin: 0 }}>🏦 <strong>EBL:</strong> 15% OFF on Pathao rides every Friday</p>
                  </div>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">🔒</div>
                  <h4 className="promo-pink-title">256-bit SSL Encryption</h4>
                  <p className="promo-pink-sub">Your payment details are 100% PCI-DSS compliant and secure.</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'refer_earn' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar" style={{ background: 'linear-gradient(135deg, #ff2b70 0%, #d91b5c 100%)', color: '#fff' }}>
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub" style={{ color: '#ffe4e6' }}>Invite Friends &amp; Get Cash 🎁</div>
                    <h1 className="greeting-title" style={{ color: '#fff' }}>Earn ৳250 Per Referral!</h1>
                    <p className="greeting-desc" style={{ color: '#ffe4e6' }}>Share your code. When a friend signs up and orders, you both get ৳250 bonus.</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 20px', borderRadius: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#ffe4e6', textTransform: 'uppercase', fontWeight: 700 }}>Your Code</div>
                    <strong style={{ fontSize: '18px', color: '#fff', letterSpacing: '1.5px' }}>SETU-VIP-2026</strong>
                  </div>
                </div>

                <div className="orders-section-card">
                  <div className="orders-section-header">
                    <h3 className="orders-sec-title">Your Referral History</h3>
                    <span style={{ fontSize: '12.5px', color: '#ff2b70', fontWeight: 900, background: '#fff1f2', padding: '4px 10px', borderRadius: '20px', border: '1px solid #fecdd3' }}>
                      Total Earned: ৳1,750
                    </span>
                  </div>
                  <div className="active-orders-list">
                    {[
                      { name: 'Sabbir Rahman', date: '06 Sep 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80' },
                      { name: 'Farhana Hossain', date: '04 Sep 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
                      { name: 'Arif Chowdhury', date: '01 Sep 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80' },
                      { name: 'Nusrat Jahan', date: '28 Aug 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
                      { name: 'Tanvir Ahmed', date: '25 Aug 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
                      { name: 'Mehedi Hasan', date: '20 Aug 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' },
                      { name: 'Tasnim Kazi', date: '18 Aug 2026', status: 'Completed', amount: '+৳250', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80' }
                    ].map((ref, idx) => (
                      <div key={idx} className="active-order-item" style={{ cursor: 'default' }}>
                        <div className="active-order-left">
                          <img src={ref.img} alt={ref.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                          <div className="order-main-details">
                            <h4 className="order-item-title" style={{ fontSize: '14px', color: '#0f172a' }}>{ref.name}</h4>
                            <span className="order-item-subtitle" style={{ fontSize: '12px', color: '#64748b' }}>Joined 📅 {ref.date}</span>
                          </div>
                        </div>
                        <div className="active-order-right">
                          <span className="badge-delivered-green">{ref.status}</span>
                          <strong style={{ fontSize: '14.5px', color: '#ff2b70', fontWeight: 900 }}>{ref.amount}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Quick Share</h4>
                  <button className="btn-upgrade-pink" style={{ width: '100%', marginTop: '10px', background: 'linear-gradient(135deg, #ff2b70 0%, #d91b5c 100%)', color: '#ffffff', border: 'none', boxShadow: '0 4px 14px rgba(255,43,112,0.3)' }} onClick={() => { navigator.clipboard?.writeText('SETU-VIP-2026'); onToast('Referral link copied! Share with friends.'); }}>
                    Copy Link &amp; Share
                  </button>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">🎉</div>
                  <h4 className="promo-pink-title">No Earnings Limit</h4>
                  <p className="promo-pink-sub">Invite unlimited friends and accumulate rewards with zero cap!</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'settings' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">Account Center ⚙️</div>
                    <h1 className="greeting-title">Settings &amp; Preferences</h1>
                    <p className="greeting-desc">Update your profile info, notification preferences and security settings.</p>
                  </div>
                </div>

                <div className="orders-section-card">
                  <h3 className="orders-sec-title" style={{ marginBottom: '16px' }}>Personal Profile</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>FULL NAME</label>
                      <input type="text" defaultValue={userName} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>PHONE NUMBER</label>
                      <input type="text" defaultValue="01712 345678" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>DELIVERY ADDRESS</label>
                      <input type="text" defaultValue="House 42, Road 7, Dhanmondi, Dhaka" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', marginTop: '4px' }} />
                    </div>
                  </div>
                  <button className="btn-upgrade-pink" style={{ marginTop: '20px' }} onClick={() => onToast('Profile changes saved successfully! 🎉')}>Save Changes</button>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Security Health</h4>
                  <div style={{ marginTop: '10px', fontSize: '13px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 800 }}>🟢 2-Factor Auth Enabled</span>
                  </div>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">⚙️</div>
                  <h4 className="promo-pink-title">Privacy Control</h4>
                  <p className="promo-pink-sub">Your personal data is encrypted and never shared with 3rd parties.</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'help_support' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              <div className="orders-left-col">
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">24/7 Helpline 🎧</div>
                    <h1 className="greeting-title">Help &amp; Customer Support</h1>
                    <p className="greeting-desc">Have a question or need assistance? We are here to help you 24/7.</p>
                  </div>
                </div>

                <div className="orders-section-card">
                  <h3 className="orders-sec-title" style={{ marginBottom: '16px' }}>Frequently Asked Questions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { q: 'How do price alerts work?', a: 'When you set a target price for food, ride or skincare items, our system monitors live prices and alerts you via WhatsApp and Email when it drops.' },
                      { q: 'What should I do if a promo code is invalid?', a: 'You can immediately submit a ticket under the "Complain Issues" tab. Our team will verify and compensate you with equivalent wallet credit.' },
                      { q: 'How can I cash out my referral earnings?', a: 'Go to "My Wallet" and click "Withdraw". You can transfer your balance directly to bKash or Nagad within 5 minutes.' }
                    ].map((faq, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <strong style={{ fontSize: '14px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>❓ {faq.q}</strong>
                        <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.4 }}>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="orders-right-col">
                <div className="right-widget-card">
                  <h4 className="widget-title-sm">Direct Hotline</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <button className="btn-upgrade-pink" style={{ background: '#2563eb' }} onClick={() => setIsLiveChatOpen(true)}>💬 Live Chat Support</button>
                    <button className="btn-upgrade-pink" style={{ background: '#16a34a' }} onClick={() => onToast('Dialing Helpline 16222...')}>📞 Call 16222</button>
                  </div>
                </div>
                <div className="food-promo-card-pink">
                  <div className="promo-apple-icon">🎧</div>
                  <h4 className="promo-pink-title">24/7 Agent Availability</h4>
                  <p className="promo-pink-sub">Our customer success team responds within an average of 3 minutes.</p>
                </div>
              </div>
            </div>
          </main>
        ) : activeTab === 'complain_issues' ? (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="complain-page-wrapper">

              {/* Hero Banner */}
              {complainCategoryFilter === 'viral' ? (
                <div className="complain-hero-banner animate-fade-in" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1.5px solid #38bdf8', boxShadow: '0 12px 30px rgba(2, 132, 199, 0.25)' }}>
                  <div className="complain-hero-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid #0284c7' }}>
                    ⚖️ EXECUTIVE MAGISTRATE MOBILE COURT INSIGHTS
                  </div>
                  <h1 className="complain-hero-title" style={{ color: '#ffffff' }}>
                    🔥 <span>Viral Restaurant Raids</span> &amp; Food Safety Fines
                  </h1>
                  <p className="complain-hero-desc" style={{ color: '#94a3b8' }}>
                    Verified Mobile Court Inspection Reports by Executive Magistrate Sarwar Alam, Bangladesh Safe Food Authority (BSFA), and DNCC Inspectors.
                    View spot fine amounts, magistrate findings, sealed kitchens, and food hygiene violations across Dhaka.
                  </p>

                  {/* Quick Metrics Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginTop: '20px' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL FINES IMPOSED</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#f87171', marginTop: '2px' }}>৳13,25,000</div>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>RAIDED RESTAURANTS</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', marginTop: '2px' }}>7 Outlets</div>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>OUTLETS SEALED</div>
                      <div style={{ fontSize: '22px', fontWeight: 900, color: '#fbbf24', marginTop: '2px' }}>3 Outlets</div>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>LEAD MAGISTRATE</div>
                      <div style={{ fontSize: '13px', fontWeight: 900, color: '#4ade80', marginTop: '4px' }}>Sarwar Alam &amp; BSFA</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="complain-hero-banner">
                  <div className="complain-hero-badge">✦ COMMUNITY SAFETY CENTER</div>
                  <h1 className="complain-hero-title">
                    🚨 <span>Complain</span> Issues &amp; Reports
                  </h1>
                  <p className="complain-hero-desc">
                    View all community complaints across Food Safety, Ride Misconduct, Skincare Fraud &amp; General Issues.
                    You can freely browse or file your own complaint — keep OfferMatrix safe for everyone!
                  </p>
                </div>
              )}

              {/* Stat Cards Row */}
              <div className="complain-stats-row" style={{ marginTop: '16px' }}>
                <div className="complain-stat-card" style={{ cursor: 'pointer' }} onClick={() => setComplainCategoryFilter('food')}>
                  <div className="complain-stat-icon" style={{ background: '#fff7ed' }}>🍽️</div>
                  <div>
                    <div className="complain-stat-num">{complaintsData.filter(c => c.category === 'food').length}</div>
                    <div className="complain-stat-label">Food Safety</div>
                  </div>
                </div>
                <div className="complain-stat-card" style={{ cursor: 'pointer' }} onClick={() => setComplainCategoryFilter('viral')}>
                  <div className="complain-stat-icon" style={{ background: '#e0f2fe' }}>🔥</div>
                  <div>
                    <div className="complain-stat-num">{complaintsData.filter(c => c.category === 'food' || c.isRaid).length}</div>
                    <div className="complain-stat-label">Magistrate Raids</div>
                  </div>
                </div>
                <div className="complain-stat-card" style={{ cursor: 'pointer' }} onClick={() => setComplainCategoryFilter('ride')}>
                  <div className="complain-stat-icon" style={{ background: '#eff6ff' }}>🚗</div>
                  <div>
                    <div className="complain-stat-num">{complaintsData.filter(c => c.category === 'ride').length}</div>
                    <div className="complain-stat-label">Ride Misconduct</div>
                  </div>
                </div>
                <div className="complain-stat-card" style={{ cursor: 'pointer' }} onClick={() => setComplainCategoryFilter('skincare')}>
                  <div className="complain-stat-icon" style={{ background: '#fdf4ff' }}>💧</div>
                  <div>
                    <div className="complain-stat-num">{complaintsData.filter(c => c.category === 'skincare').length}</div>
                    <div className="complain-stat-label">Skincare Fraud</div>
                  </div>
                </div>
              </div>

              {/* Filter Tabs + File a Complaint button */}
              <div className="complain-tabs-row">
                <div className="complain-tab-pills">
                  {[
                    { key: 'all', label: `🗂️ All Issues`, count: complaintsData.length },
                    { key: 'viral', label: `🔥 Viral Restaurant Raids`, count: complaintsData.filter(c => c.category === 'food' || c.isRaid).length },
                    { key: 'food', label: `🍽️ Food Safety`, count: complaintsData.filter(c => c.category === 'food').length },
                    { key: 'ride', label: `🚗 Ride Issues`, count: complaintsData.filter(c => c.category === 'ride').length },
                    { key: 'skincare', label: `💧 Skincare`, count: complaintsData.filter(c => c.category === 'skincare').length },
                    { key: 'app', label: `⚙️ General`, count: complaintsData.filter(c => c.category === 'app').length },
                  ].map(tab => {
                    const isViral = tab.key === 'viral';
                    const isActive = complainCategoryFilter === tab.key;
                    return (
                      <button
                        key={tab.key}
                        className={`complain-tab-pill ${isActive ? 'complain-tab-active' : ''}`}
                        style={
                          isActive && isViral ? {
                            background: '#e0f2fe',
                            color: '#0369a1',
                            borderColor: '#0284c7',
                            boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)',
                            fontWeight: 900
                          } : isViral ? {
                            background: '#f0f9ff',
                            color: '#0284c7',
                            borderColor: '#bae6fd',
                            fontWeight: 800
                          } : {}
                        }
                        onClick={() => setComplainCategoryFilter(tab.key)}
                      >
                        {tab.label} <span className="complain-tab-count" style={isActive && isViral ? { background: '#0284c7', color: '#ffffff' } : {}}>{tab.count}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  className="btn-file-complaint-main"
                  onClick={() => setIsFilingNewComplaint(!isFilingNewComplaint)}
                >
                  🚨 File a Complaint
                </button>
              </div>

              {/* Search Row */}
              <div className="complain-search-row">
                <div className="complain-search-box">
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder={complainCategoryFilter === 'viral' ? "Search viral restaurant, magistrate, or fine..." : "Search complaints..."}
                    value={complainSearchQuery}
                    onChange={(e) => setComplainSearchQuery(e.target.value)}
                    className="complain-search-input"
                  />
                </div>
              </div>

              {/* New Complaint Form */}
              {isFilingNewComplaint && (
                <div className="complain-form-card animate-fade-in">
                  <h3 style={{ fontSize: '16px', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>📝 File New Complaint</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newComplaintDesc.trim() || !newComplaintTitle.trim()) return;
                    const newTicket = {
                      id: `cmp-${Date.now()}`,
                      title: newComplaintTitle,
                      category: newComplaintCategory,
                      target: newComplaintTarget || 'Unknown',
                      badge: newComplaintCategory === 'food' ? '🍽️ FOOD SAFETY' : newComplaintCategory === 'ride' ? '🚗 RIDE ISSUE' : newComplaintCategory === 'skincare' ? '💧 SKINCARE FRAUD' : '⚙️ GENERAL ISSUE',
                      badgeColor: newComplaintCategory === 'food' ? '#f97316' : newComplaintCategory === 'ride' ? '#3b82f6' : newComplaintCategory === 'skincare' ? '#ec4899' : '#eab308',
                      status: 'Under Review',
                      statusClass: 'badge-status-blue-review',
                      date: 'Just now',
                      desc: newComplaintDesc,
                      location: newComplaintTarget,
                      penalty: 'Pending',
                      inspector: 'OfferMatrix Community Team',
                      resolution: 'Ticket #TCK-' + Math.floor(1000 + Math.random() * 9000) + ' created. Our team responds within 2 hours.',
                      img: complainNewImg || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&q=80',
                      supportCount: 0,
                      discussCount: 0
                    };
                    setComplaintsData([newTicket, ...complaintsData]);
                    setNewComplaintDesc('');
                    setComplainNewTitle('');
                    setComplainNewImg('');
                    setIsFilingNewComplaint(false);
                    onToast('🎉 Complaint submitted! Our safety team is on it.');
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div className="form-field-group">
                        <label className="form-field-label">COMPLAINT TITLE</label>
                        <input type="text" className="form-input-text" placeholder="e.g. Stale food served at restaurant..." value={complainNewTitle} onChange={e => setComplainNewTitle(e.target.value)} required />
                      </div>
                      <div className="form-field-group">
                        <label className="form-field-label">ISSUE CATEGORY</label>
                        <select className="form-select-box" value={newComplaintCategory} onChange={(e) => setNewComplaintCategory(e.target.value)}>
                          <option value="food">🍽️ Food Safety</option>
                          <option value="ride">🚗 Ride Misconduct</option>
                          <option value="skincare">💧 Skincare Fraud</option>
                          <option value="app">⚙️ General / App Issue</option>
                        </select>
                      </div>
                      <div className="form-field-group">
                        <label className="form-field-label">STORE / APP / DRIVER NAME</label>
                        <input type="text" className="form-input-text" placeholder="e.g. foodpanda, Uber, Kacchi Bhai..." value={newComplaintTarget} onChange={(e) => setNewComplaintTarget(e.target.value)} required />
                      </div>
                      <div className="form-field-group">
                        <label className="form-field-label">IMAGE URL (Optional)</label>
                        <input type="url" className="form-input-text" placeholder="https://..." value={complainNewImg} onChange={e => setComplainNewImg(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-field-group" style={{ marginBottom: '16px' }}>
                      <label className="form-field-label">PROBLEM DESCRIPTION</label>
                      <textarea rows={3} className="form-textarea" placeholder="Describe what happened in detail..." value={newComplaintDesc} onChange={(e) => setNewComplaintDesc(e.target.value)} required />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button type="button" className="btn-cancel-modal" onClick={() => setIsFilingNewComplaint(false)}>Cancel</button>
                      <button type="submit" className="btn-file-complaint-main">Submit Ticket 🚀</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Complaint Detail Modal */}
              {complainDetailId && (() => {
                const cmp = complaintsData.find(c => c.id === complainDetailId);
                if (!cmp) return null;
                return (
                  <div className="modal-backdrop-blur" onClick={() => setComplainDetailId(null)}>
                    <div className="modal-card-lg animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
                      <div className="modal-card-header">
                        <h3 className="modal-title-main">📋 Complaint Details</h3>
                        <button className="modal-close-btn" onClick={() => setComplainDetailId(null)}>✕</button>
                      </div>
                      <div className="modal-body-content">
                        {cmp.img && <img src={cmp.img} alt={cmp.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '14px', marginBottom: '16px' }} />}
                        <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '6px', background: cmp.badgeColor + '22', color: cmp.badgeColor, fontWeight: 800, fontSize: '12px', marginBottom: '10px' }}>{cmp.badge}</div>
                        <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>{cmp.title}</h2>
                        <p style={{ color: '#475569', fontSize: '14px', marginBottom: '14px' }}>{cmp.desc}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>📍 {cmp.location}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>⚖️ {cmp.penalty}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>🧑‍⚖️ {cmp.inspector}</span>
                        </div>
                        {cmp.resolution && (
                          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 16px', fontSize: '13.5px', color: '#166534', fontWeight: 600 }}>
                            ✅ <strong>Resolution:</strong> {cmp.resolution}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Magistrate Raid Official Report Modal */}
              {selectedRaidReportModal && (
                <div className="modal-backdrop-blur" onClick={() => setSelectedRaidReportModal(null)}>
                  <div className="modal-card-lg animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '720px', borderTop: '4px solid #ef4444' }}>
                    <div className="modal-card-header" style={{ background: '#fff1f2', borderBottom: '1px solid #fecdd3' }}>
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 900, background: '#ef4444', color: '#ffffff', padding: '3px 9px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                          OFFICIAL MOBILE COURT INSPECTION REPORT
                        </span>
                        <h3 className="modal-title-main" style={{ color: '#991b1b', marginTop: '6px', fontSize: '18px' }}>
                          ⚖️ Executive Magistrate Raid Report
                        </h3>
                      </div>
                      <button className="modal-close-btn" onClick={() => setSelectedRaidReportModal(null)}>✕</button>
                    </div>

                    <div className="modal-body-content" style={{ padding: '20px' }}>
                      {selectedRaidReportModal.img && (
                        <img src={selectedRaidReportModal.img} alt={selectedRaidReportModal.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} />
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                        <div>
                          <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: 0 }}>{selectedRaidReportModal.target || selectedRaidReportModal.title}</h2>
                          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>📍 {selectedRaidReportModal.location || selectedRaidReportModal.target} • Raid Date: {selectedRaidReportModal.date}</span>
                        </div>
                        <div style={{ background: '#fee2e2', border: '1.5px solid #ef4444', borderRadius: '10px', padding: '6px 14px', textAlign: 'right' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#991b1b', display: 'block', textTransform: 'uppercase' }}>PENALTY IMPOSED</span>
                          <strong style={{ fontSize: '16px', fontWeight: 900, color: '#dc2626' }}>{selectedRaidReportModal.penalty || '৳1,00,000 Fine'}</strong>
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0369a1', marginBottom: '6px', textTransform: 'uppercase' }}>🧑‍⚖️ INSPECTING AUTHORITY &amp; MAGISTRATE</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{selectedRaidReportModal.inspector || 'Executive Magistrate Sarwar Alam'}</div>
                        {selectedRaidReportModal.courtMemo && (
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>Memo No: {selectedRaidReportModal.courtMemo}</div>
                        )}
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#334155', marginBottom: '8px', textTransform: 'uppercase' }}>⚠️ VIOLATIONS &amp; CONFISCATED ITEMS:</h4>
                        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, background: '#fff7ed', border: '1px solid #fed7aa', padding: '12px 14px', borderRadius: '10px', margin: 0 }}>
                          {selectedRaidReportModal.seizedItems || selectedRaidReportModal.desc}
                        </p>
                      </div>

                      {selectedRaidReportModal.courtQuote && (
                        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>💬 EXECUTIVE MAGISTRATE ORDER:</div>
                          <p style={{ fontSize: '13.5px', color: '#14532d', fontStyle: 'italic', margin: 0 }}>"{selectedRaidReportModal.courtQuote}"</p>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <button className="btn-cancel-modal" onClick={() => setSelectedRaidReportModal(null)}>Close Report</button>
                        <button className="btn-file-complaint-main" onClick={() => {
                          const title = selectedRaidReportModal.target || selectedRaidReportModal.title;
                          setSelectedRaidReportModal(null);
                          setNewComplaintTarget(title);
                          setComplainNewTitle(`Follow-up Complaint re: ${title}`);
                          setIsFilingNewComplaint(true);
                        }}>🚨 Report Further Violation</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Complaints List */}
              <div className="complain-list">
                {complaintsData
                  .filter(c => {
                    const matchCat = complainCategoryFilter === 'all'
                      ? true
                      : complainCategoryFilter === 'viral'
                        ? (c.category === 'food' || c.isRaid === true)
                        : c.category === complainCategoryFilter;
                    const q = complainSearchQuery.toLowerCase().trim();
                    const matchQ = q === '' ? true : (c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.target.toLowerCase().includes(q));
                    return matchCat && matchQ;
                  })
                  .map(cmp => (
                    <div key={cmp.id} className="complain-item-card-full" style={cmp.isRaid ? { borderLeft: '4px solid #ef4444' } : {}}>
                      {/* Left: Image */}
                      {cmp.img && (
                        <div className="complain-item-img-wrap">
                          <img
                            src={cmp.img}
                            alt={cmp.title}
                            className="complain-item-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80';
                            }}
                          />
                        </div>
                      )}

                      {/* Right: Content */}
                      <div className="complain-item-body">
                        <div className="complain-item-top-row">
                          <div className="complain-badge-wrap">
                            <span className="complain-cat-badge" style={{ background: (cmp.badgeColor || '#f97316') + '18', color: cmp.badgeColor || '#f97316', borderLeft: `3px solid ${cmp.badgeColor || '#f97316'}` }}>
                              {cmp.badge || '📋 COMPLAINT'}
                            </span>
                          </div>
                          <span className="complain-date">📅 {cmp.date}</span>
                        </div>

                        <h3 className="complain-item-title">{cmp.title}</h3>
                        <p className="complain-item-desc">{cmp.desc}</p>

                        <div className="complain-item-meta-row">
                          {cmp.location && <span className="complain-meta-tag"><span>📍</span> {cmp.location}</span>}
                          {cmp.penalty && <span className="complain-meta-tag" style={cmp.isRaid ? { background: '#fee2e2', color: '#dc2626', fontWeight: 800 } : {}}><span>⚖️</span> {cmp.penalty}</span>}
                          {cmp.inspector && <span className="complain-meta-tag inspector-tag"><span>🧑‍⚖️</span> {cmp.inspector}</span>}
                        </div>

                        <div className="complain-item-bottom-row">
                          <div className="complain-status-wrap">
                            <span className={`complain-status-badge ${cmp.statusClass}`}>
                              {cmp.status === 'Under Review' ? '🔵' : cmp.status === 'Resolved' || cmp.status === 'Re-inspected & Cleared' || cmp.status === 'Fined & Resolved' ? '🟢' : cmp.status === 'Escalated' || cmp.status === 'Fined & Sealed' || cmp.status === 'Operations Suspended' ? '🔴' : cmp.status === 'Scam Blacklisted' ? '🚫' : '📋'} {cmp.status}
                            </span>
                          </div>

                          <div className="complain-action-btns">
                            <button
                              className={`complain-action-btn ${complainSupportedIds.includes(cmp.id) ? 'complain-btn-active-support' : ''}`}
                              onClick={() => {
                                if (complainSupportedIds.includes(cmp.id)) {
                                  setComplainSupportedIds(complainSupportedIds.filter(id => id !== cmp.id));
                                  onToast('Support removed.');
                                } else {
                                  setComplainSupportedIds([...complainSupportedIds, cmp.id]);
                                  onToast('👍 You supported this complaint!');
                                }
                              }}
                            >
                              🔥 Support {(cmp.supportCount || 0) + (complainSupportedIds.includes(cmp.id) ? 1 : 0)}
                            </button>
                            {cmp.isRaid ? (
                              <button
                                className="complain-action-btn"
                                style={{ background: '#eff6ff', color: '#0284c7', borderColor: '#bae6fd', fontWeight: 800 }}
                                onClick={() => setSelectedRaidReportModal(cmp)}
                              >
                                📄 Official Raid Report
                              </button>
                            ) : (
                              <button
                                className={`complain-action-btn ${complainDiscussedIds.includes(cmp.id) ? 'complain-btn-active-discuss' : ''}`}
                                onClick={() => {
                                  if (!complainDiscussedIds.includes(cmp.id)) {
                                    setComplainDiscussedIds([...complainDiscussedIds, cmp.id]);
                                  }
                                  onToast('💬 Opening discussion thread...');
                                }}
                              >
                                💬 Discuss
                              </button>
                            )}
                            <button
                              className="complain-action-btn complain-btn-details"
                              onClick={() => setComplainDetailId(cmp.id)}
                            >
                              📋 Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {complaintsData.filter(c => {
                  const matchCat = complainCategoryFilter === 'all'
                    ? true
                    : complainCategoryFilter === 'viral'
                      ? (c.category === 'food' || c.isRaid === true)
                      : c.category === complainCategoryFilter;
                  const q = complainSearchQuery.toLowerCase().trim();
                  return matchCat && (q === '' ? true : c.title.toLowerCase().includes(q));
                }).length === 0 && (
                    <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
                      <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#64748b' }}>No complaints found</p>
                      <p style={{ fontSize: '14px' }}>Try changing the filter or search query.</p>
                    </div>
                  )}
              </div>

            </div>
          </main>
        ) : (
          <main className="dashboard-main-content" style={{ maxWidth: '100%' }}>
            <div className="orders-page-joint-grid">
              {/* Left Main Column: Dashboard Content */}
              <div className="orders-left-col">
                {/* Greeting Header Bar */}
                <div className="dash-greeting-bar">
                  <div className="greeting-text-wrap">
                    <div className="greeting-sub">Hey {userName}! 👋</div>
                    <h1 className="greeting-title">Smart Savings, Smarter You!</h1>
                    <p className="greeting-desc">Compare, save &amp; enjoy the best from Food, Ride &amp; Skincare.</p>
                  </div>
                  <div className="greeting-pills">
                    <span
                      className="category-tag-pill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveTab('food');
                        setActiveCategoryMode('food');
                      }}
                    >
                      🍴 Food
                    </span>
                    <span
                      className="category-tag-pill"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveTab('ride');
                        setActiveCategoryMode('ride');
                      }}
                    >
                      🚗 Ride
                    </span>
                    <span
                      className={`category-tag-pill ${activeTab === 'skincare' ? 'pill-active-coral' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveTab('skincare');
                        setActiveCategoryMode('skincare');
                      }}
                    >
                      ✨ Skincare
                    </span>
                  </div>
                </div>

                {/* 4 Stat Summary Cards */}
                <div className="dash-stats-grid">
                  {/* Card 1 */}
                  <div className="dash-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-label">Total Saved Deals</span>
                      <div className="stat-icon-circle bg-pink-light">
                        <Heart size={18} fill="#ff2b70" color="#ff2b70" />
                      </div>
                    </div>
                    <div className="stat-value">6</div>
                    <div className="stat-trend trend-up">
                      <span>▲ 28%</span> vs last month
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="dash-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-label">Total Orders</span>
                      <div className="stat-icon-circle bg-blue-light">
                        <Package size={18} color="#3b82f6" />
                      </div>
                    </div>
                    <div className="stat-value">9</div>
                    <div className="stat-trend trend-up">
                      <span>▲ 15%</span> vs last month
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="dash-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-label">Active Price Alerts</span>
                      <div className="stat-icon-circle bg-yellow-light">
                        <Bell size={18} color="#eab308" />
                      </div>
                    </div>
                    <div className="stat-value">5</div>
                    <div className="stat-trend trend-up">
                      <span>▲ 20%</span> vs last month
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="dash-stat-card">
                    <div className="stat-card-top">
                      <span className="stat-label">Total Savings</span>
                      <div className="stat-icon-circle bg-orange-light">
                        <Gift size={18} color="#f97316" />
                      </div>
                    </div>
                    <div className="stat-value">৳2,401</div>
                    <button
                      className="stat-calc-link"
                      onClick={() => onToast('Showing savings breakdown...')}
                    >
                      View savings calculation &gt;
                    </button>
                  </div>
                </div>

                {/* Quick Actions Filter Bar */}
                <div className="dash-quick-actions-card">
                  <span className="quick-actions-label">Quick Actions</span>
                  <div className="quick-actions-pills">
                    <button
                      className={`quick-pill ${selectedQuickAction === 'saved' ? 'active' : ''}`}
                      onClick={() => setSelectedQuickAction('saved')}
                    >
                      🎵 Saved Deals
                    </button>
                    <button
                      className={`quick-pill ${selectedQuickAction === 'alerts' ? 'active' : ''}`}
                      onClick={() => setSelectedQuickAction('alerts')}
                    >
                      🔔 Price Alerts
                    </button>
                    <button
                      className={`quick-pill ${selectedQuickAction === 'orders' ? 'active' : ''}`}
                      onClick={() => setSelectedQuickAction('orders')}
                    >
                      📦 My Orders
                    </button>
                    <button
                      className={`quick-pill ${selectedQuickAction === 'food' ? 'active' : ''}`}
                      onClick={() => setSelectedQuickAction('food')}
                    >
                      🍴 Food Deals
                    </button>
                    <button
                      className={`quick-pill ${selectedQuickAction === 'ride' ? 'active' : ''}`}
                      onClick={() => setSelectedQuickAction('ride')}
                    >
                      🚗 Ride Offers
                    </button>
                    <button
                      className={`quick-pill ${selectedQuickAction === 'skincare' ? 'active' : ''}`}
                      onClick={() => setSelectedQuickAction('skincare')}
                    >
                      💧 Skincare Deals
                    </button>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="dash-charts-grid">
                  {/* Chart 1: Spending Overview */}
                  <div className="dash-chart-card">
                    <div className="chart-card-header">
                      <h3 className="chart-title">Spending Overview</h3>
                      <div className="chart-header-right">
                        <div className="chart-legend">
                          <span className="legend-item"><span className="dot dot-pink"></span> Food</span>
                          <span className="legend-item"><span className="dot dot-blue"></span> Ride</span>
                          <span className="legend-item"><span className="dot dot-purple"></span> Skincare</span>
                        </div>
                        <select className="chart-dropdown">
                          <option>This Month</option>
                          <option>Last Month</option>
                        </select>
                      </div>
                    </div>

                    {/* Line Chart Visual Representation */}
                    <div className="line-chart-container">
                      <svg className="svg-line-chart" viewBox="0 0 500 160" preserveAspectRatio="none">
                        {/* Grid Lines */}
                        <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeDasharray="4" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeDasharray="4" />
                        <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeDasharray="4" />

                        {/* Food Line (Pink) */}
                        <path
                          d="M 20 130 Q 100 110, 180 100 T 340 30 T 480 70"
                          fill="none"
                          stroke="#ff2b70"
                          strokeWidth="3.5"
                        />
                        <circle cx="180" cy="100" r="5" fill="#ff2b70" />
                        <circle cx="340" cy="30" r="5" fill="#ff2b70" />
                        <circle cx="480" cy="70" r="5" fill="#ff2b70" />

                        {/* Ride Line (Blue) */}
                        <path
                          d="M 20 115 Q 100 110, 180 105 T 340 90 T 480 100"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                        />
                        <circle cx="100" cy="110" r="4" fill="#3b82f6" />
                        <circle cx="340" cy="90" r="4" fill="#3b82f6" />
                        <circle cx="480" cy="100" r="4" fill="#3b82f6" />

                        {/* Skincare Line (Purple) */}
                        <path
                          d="M 20 125 Q 100 120, 180 115 T 340 110 T 480 120"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="3"
                        />
                        <circle cx="180" cy="115" r="4" fill="#a855f7" />
                        <circle cx="340" cy="110" r="4" fill="#a855f7" />
                      </svg>

                      <div className="chart-x-axis">
                        <span>1 May</span>
                        <span>7 May</span>
                        <span>14 May</span>
                        <span>21 May</span>
                        <span>28 May</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Spending by Category */}
                  <div className="dash-chart-card">
                    <div className="chart-card-header">
                      <h3 className="chart-title">Spending by Category</h3>
                      <select className="chart-dropdown">
                        <option>This Month</option>
                        <option>Last Month</option>
                      </select>
                    </div>

                    <div className="donut-chart-wrapper">
                      <div className="donut-svg-container">
                        <svg viewBox="0 0 120 120" className="donut-svg">
                          <circle cx="60" cy="60" r="45" fill="none" stroke="#f1f5f9" strokeWidth="14" />
                          {/* Pink - Food 60% */}
                          <circle
                            cx="60" cy="60" r="45" fill="none"
                            stroke="#ff2b70" strokeWidth="14"
                            strokeDasharray="170 283" strokeDashoffset="0"
                            transform="rotate(-90 60 60)"
                          />
                          {/* Blue - Ride 25% */}
                          <circle
                            cx="60" cy="60" r="45" fill="none"
                            stroke="#3b82f6" strokeWidth="14"
                            strokeDasharray="70 283" strokeDashoffset="-170"
                            transform="rotate(-90 60 60)"
                          />
                          {/* Purple - Skincare 15% */}
                          <circle
                            cx="60" cy="60" r="45" fill="none"
                            stroke="#a855f7" strokeWidth="14"
                            strokeDasharray="43 283" strokeDashoffset="-240"
                            transform="rotate(-90 60 60)"
                          />
                        </svg>
                        <div className="donut-inner-text">
                          <span className="donut-sub">TOTAL</span>
                          <span className="donut-total">৳8,450</span>
                        </div>
                      </div>

                      <div className="donut-legend-list">
                        <div className="donut-legend-row">
                          <span className="legend-label"><span className="dot dot-pink"></span> 🍴 Food <span className="pct">60%</span></span>
                          <span className="legend-val">৳5,070</span>
                        </div>
                        <div className="donut-legend-row">
                          <span className="legend-label"><span className="dot dot-blue"></span> 🚗 Ride <span className="pct">25%</span></span>
                          <span className="legend-val">৳2,110</span>
                        </div>
                        <div className="donut-legend-row">
                          <span className="legend-label"><span className="dot dot-purple"></span> 💧 Skincare <span className="pct">15%</span></span>
                          <span className="legend-val">৳1,270</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Providers Row (Food, Ride, Skincare Logos Grid) */}
                <div className="dash-providers-grid">
                  {/* Food Delivery Card */}
                  <div className="provider-category-card">
                    <div className="prov-header">
                      <span className="prov-title text-pink">Food Delivery</span>
                      <button className="prov-view-all" onClick={() => onToast('Viewing all Food Delivery services...')}>View All</button>
                    </div>
                    <div className="prov-logos-row">
                      <div className="prov-logo-item">
                        <div className="prov-logo-box bg-foodpanda">foodpanda</div>
                        <span className="prov-name">foodpanda</span>
                      </div>
                      <div className="prov-logo-item">
                        <div className="prov-logo-box bg-foodi">foodi</div>
                        <span className="prov-name">foodi</span>
                      </div>
                      <div className="prov-logo-item">
                        <div className="prov-logo-box bg-pathao">pathao</div>
                        <span className="prov-name">pathao</span>
                      </div>
                    </div>
                  </div>

                  {/* Ride Services Card */}
                  <div className="provider-category-card">
                    <div className="prov-header">
                      <span className="prov-title">Ride Services</span>
                      <button className="prov-view-all" onClick={() => onToast('Viewing all Ride Services...')}>View All</button>
                    </div>
                    <div className="prov-logos-row">
                      <div className="prov-logo-item" style={{ cursor: 'pointer' }} onClick={() => { if (onOpenUber) onOpenUber(); else if (onToast) onToast('Opening Uber...'); }}>
                        <div className="prov-logo-box bg-uber">Uber</div>
                        <span className="prov-name">Uber</span>
                      </div>
                      <div className="prov-logo-item" style={{ cursor: 'pointer' }} onClick={() => { if (onOpenObhai) onOpenObhai(); else if (onToast) onToast('Opening OBHAI...'); }}>
                        <div className="prov-logo-box bg-obhai">OBHAI</div>
                        <span className="prov-name">OBHAI</span>
                      </div>
                      <div className="prov-logo-item">
                        <div className="prov-logo-box bg-indrive">inDrive</div>
                        <span className="prov-name">inDrive</span>
                      </div>
                    </div>
                  </div>

                  {/* Skincare Stores Card */}
                  <div className="provider-category-card">
                    <div className="prov-header">
                      <span className="prov-title text-purple">Skincare Stores</span>
                      <button className="prov-view-all" onClick={() => onToast('Viewing all Skincare stores...')}>View All</button>
                    </div>
                    <div className="prov-logos-row">
                      <div className="prov-logo-item">
                        <div className="prov-logo-box bg-choice">Choice Legacy</div>
                        <span className="prov-name">Choice Legacy</span>
                      </div>
                      <div className="prov-logo-item">
                        <div className="prov-logo-box bg-kirei">kirei</div>
                        <span className="prov-name">kirei</span>
                      </div>
                      <div className="prov-logo-item" style={{ cursor: 'pointer' }} onClick={() => { if (onOpenMakeupChari) onOpenMakeupChari(); }}>
                        <div className="prov-logo-box bg-makeup">Makeup Chari</div>
                        <span className="prov-name">Makeup Chari</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exclusive Coupons, Price Alerts, Monthly Savings Goal Row */}
                <div className="dash-three-cols-grid">
                  {/* Exclusive Coupons */}
                  <div className="dash-card">
                    <div className="dash-card-header">
                      <h4 className="dash-card-title">Exclusive Coupons</h4>
                      <button className="prov-view-all" onClick={() => onToast('Opening All Coupons...')}>View All</button>
                    </div>

                    <div className="coupons-list">
                      <div className="coupon-item">
                        <div className="coupon-left">
                          <span className="coupon-code-tag tag-pink">FOOD50</span>
                          <div className="coupon-details">
                            <strong>৳50 OFF</strong>
                            <span>Min. spend ৳300</span>
                          </div>
                        </div>
                        <button
                          className="btn-copy-sm"
                          onClick={() => handleCopyCode('FOOD50')}
                        >
                          {copiedCoupon === 'FOOD50' ? 'Copied!' : 'Copy Code'}
                        </button>
                      </div>

                      <div className="coupon-item">
                        <div className="coupon-left">
                          <span className="coupon-code-tag tag-blue">RIDE100</span>
                          <div className="coupon-details">
                            <strong>৳100 OFF</strong>
                            <span>Min. spend ৳250</span>
                          </div>
                        </div>
                        <button
                          className="btn-copy-sm"
                          onClick={() => handleCopyCode('RIDE100')}
                        >
                          {copiedCoupon === 'RIDE100' ? 'Copied!' : 'Copy Code'}
                        </button>
                      </div>

                      <div className="coupon-item">
                        <div className="coupon-left">
                          <span className="coupon-code-tag tag-purple">SKIN10</span>
                          <div className="coupon-details">
                            <strong>10% OFF</strong>
                            <span>Min. spend ৳1,000</span>
                          </div>
                        </div>
                        <button
                          className="btn-copy-sm"
                          onClick={() => handleCopyCode('SKIN10')}
                        >
                          {copiedCoupon === 'SKIN10' ? 'Copied!' : 'Copy Code'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price Alerts */}
                  <div className="dash-card">
                    <div className="dash-card-header">
                      <h4 className="dash-card-title">Price Alerts</h4>
                      <button className="prov-view-all" onClick={() => onToast('Opening All Price Alerts...')}>View All</button>
                    </div>

                    <div className="alerts-list">
                      <div className="alert-item">
                        <img
                          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=80&q=80"
                          alt="CeraVe"
                          className="alert-img"
                        />
                        <div className="alert-info">
                          <strong className="alert-name">CeraVe Hydrating Cleanser 473ml</strong>
                          <div className="alert-prices">
                            <span className="curr-price">৳1250</span>
                            <span className="old-price">৳1650</span>
                            <span className="badge-drop">24% Drop</span>
                          </div>
                        </div>
                        <Bell size={16} color="#eab308" className="alert-bell-icon" />
                      </div>

                      <div className="alert-item">
                        <img
                          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=80&q=80"
                          alt="Kacchi"
                          className="alert-img"
                        />
                        <div className="alert-info">
                          <strong className="alert-name">Kacchi Bhai Platinum Thali</strong>
                          <div className="alert-prices">
                            <span className="curr-price">৳240</span>
                            <span className="old-price">৳320</span>
                            <span className="badge-green-target">৳10 Below Target!</span>
                          </div>
                        </div>
                        <Bell size={16} color="#eab308" className="alert-bell-icon" />
                      </div>

                      <div className="alert-item">
                        <img
                          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=80&q=80"
                          alt="Pathao"
                          className="alert-img"
                        />
                        <div className="alert-info">
                          <strong className="alert-name">Pathao Car Airport Route</strong>
                          <div className="alert-prices">
                            <span className="curr-price">৳350</span>
                            <span className="old-price">৳420</span>
                            <span className="badge-wait">Waiting for Price Drop</span>
                          </div>
                        </div>
                        <Bell size={16} color="#eab308" className="alert-bell-icon" />
                      </div>
                    </div>
                  </div>

                  {/* Monthly Savings Goal */}
                  <div className="dash-card bg-goal">
                    <div className="dash-card-header">
                      <h4 className="dash-card-title text-green">Monthly Savings Goal</h4>
                      <button className="prov-view-all" onClick={() => onToast('Opening Goal Editor...')}>Edit Goal</button>
                    </div>

                    <p className="goal-sub">You are doing great! Keep it up.</p>

                    <div className="goal-progress-box">
                      <div className="goal-amt-row">
                        <strong className="goal-curr">৳6,250</strong>
                        <span className="goal-target">/ ৳10,000</span>
                        <span className="goal-pct">62%</span>
                      </div>
                      <div className="goal-bar-wrap">
                        <div className="goal-bar-fill" style={{ width: '62%' }}></div>
                      </div>
                    </div>

                    <div className="goal-stats-grid">
                      <div className="goal-stat-item">
                        <span className="g-stat-label">Top Category</span>
                        <strong className="g-stat-val">Food</strong>
                      </div>
                      <div className="goal-stat-item">
                        <span className="g-stat-label">Best Saving</span>
                        <strong className="g-stat-val">৳2,150</strong>
                      </div>
                      <div className="goal-stat-item">
                        <span className="g-stat-label">Cashback Earned</span>
                        <strong className="g-stat-val">৳1,250</strong>
                      </div>
                    </div>

                    <div className="goal-footer">
                      <Clock size={13} color="#059669" />
                      <span>6 days left in this month</span>
                    </div>
                  </div>
                </div>

                {/* Payment Offers Banner Section */}
                <div className="dash-card payment-banner-card">
                  <div className="dash-card-header">
                    <h4 className="dash-card-title">Payment Offers</h4>
                    <button className="prov-view-all" onClick={() => onToast('Viewing all Payment Offers...')}>View All</button>
                  </div>

                  <div className="payment-methods-grid">
                    {/* bKash */}
                    <div className="pay-method-item">
                      <div className="pay-logo-box bg-bkash">bKash</div>
                      <div className="pay-info">
                        <strong className="pay-title text-green">bKash</strong>
                        <div className="pay-discount">Up to 10% OFF</div>
                        <span className="pay-min">Min. spend ৳500</span>
                      </div>
                    </div>

                    {/* Nagad */}
                    <div className="pay-method-item">
                      <div className="pay-logo-box bg-nagad">Nagad</div>
                      <div className="pay-info">
                        <strong className="pay-title text-green">Nagad</strong>
                        <div className="pay-discount">Up to 8% OFF</div>
                        <span className="pay-min">Min. spend ৳300</span>
                      </div>
                    </div>

                    {/* Rocket */}
                    <div className="pay-method-item">
                      <div className="pay-logo-box bg-rocket">Rocket</div>
                      <div className="pay-info">
                        <strong className="pay-title text-green">Rocket</strong>
                        <div className="pay-discount">Up to 10% OFF</div>
                        <span className="pay-min">Min. spend ৳300</span>
                      </div>
                    </div>

                    {/* Visa */}
                    <div className="pay-method-item">
                      <div className="pay-logo-box bg-visa">Visa</div>
                      <div className="pay-info">
                        <strong className="pay-title text-green">Visa Cards</strong>
                        <div className="pay-discount">Up to 15% OFF</div>
                        <span className="pay-min">Selected cards</span>
                      </div>
                    </div>

                    {/* Mastercard */}
                    <div className="pay-method-item">
                      <div className="pay-logo-box bg-mastercard">MC</div>
                      <div className="pay-info">
                        <strong className="pay-title text-green">Mastercard</strong>
                        <div className="pay-discount">Up to 15% OFF</div>
                        <span className="pay-min">Selected cards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Joint Widgets Column */}
              <div className="orders-right-col">
                {/* Product Comparison Card */}
                <div className="right-widget-card">
                  <div className="widget-top-bar">
                    <button className="widget-back-link">
                      <ArrowLeft size={14} />
                      <span>Product Comparison</span>
                    </button>
                    <div className="widget-actions">
                      <Heart size={16} className="action-icon" />
                      <RefreshCw size={16} className="action-icon" />
                    </div>
                  </div>

                  <div className="widget-product-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=260&q=80"
                      alt="The Ordinary Niacinamide"
                      className="widget-prod-img"
                    />
                  </div>

                  <div className="widget-prod-details">
                    <span className="widget-prod-cat">Skincare</span>
                    <h4 className="widget-prod-title">
                      The Ordinary Niacinamide 10% + Zinc 1% 30ml
                    </h4>
                    <p className="widget-prod-sub">Compare prices &amp; offers from top stores</p>
                  </div>
                </div>

                {/* Top Store Offers Widget */}
                <div className="right-widget-card">
                  <h4 className="widget-section-title">Top Store Offers</h4>

                  <div className="store-offers-list">
                    {/* Store 1 */}
                    <div className="store-offer-item">
                      <div className="store-header-row">
                        <strong className="store-name">choice LEGACY</strong>
                        <span className="store-recommended-tag">Recommended</span>
                      </div>
                      <div className="store-price-row">
                        <span className="s-price">৳500</span>
                        <span className="s-old-price">৳525</span>
                        <span className="s-discount">5% OFF</span>
                      </div>
                      <div className="store-footer-row">
                        <span className="s-meta">Free Delivery | 4.6 ★</span>
                        <button
                          className="btn-view-store"
                          onClick={() => onToast('Redirecting to Choice Legacy store...')}
                        >
                          View Store
                        </button>
                      </div>
                    </div>

                    {/* Store 2 */}
                    <div className="store-offer-item">
                      <div className="store-header-row">
                        <strong className="store-name">kirei</strong>
                      </div>
                      <div className="store-price-row">
                        <span className="s-price">৳300</span>
                        <span className="s-old-price">৳600</span>
                        <span className="s-discount">50% OFF</span>
                      </div>
                      <div className="store-footer-row">
                        <span className="s-meta">Free Delivery | 4.7 ★</span>
                        <button
                          className="btn-view-store"
                          onClick={() => onToast('Redirecting to Kirei store...')}
                        >
                          View Store
                        </button>
                      </div>
                    </div>

                    {/* Store 3 */}
                    <div className="store-offer-item">
                      <div className="store-header-row">
                        <strong className="store-name text-pink">Makeup Chari</strong>
                      </div>
                      <div className="store-price-row">
                        <span className="s-price text-pink">৳446</span>
                        <span className="s-old-price">৳525</span>
                        <span className="s-discount">15% OFF</span>
                      </div>
                      <div className="store-footer-row">
                        <span className="s-meta">Free Delivery | 4.5 ★</span>
                        <button
                          className="btn-view-store"
                          onClick={() => { if (onOpenMakeupChari) onOpenMakeupChari(); else onToast('Redirecting to Makeup Chari store...'); }}
                        >
                          View Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Offers (Extra Discounts) Widget */}
                <div className="right-widget-card">
                  <h4 className="widget-section-title">Payment Offers (Extra Discounts)</h4>

                  <div className="extra-discounts-list">
                    <div className="extra-discount-item">
                      <div className="ext-logo bg-bkash">bk</div>
                      <div className="ext-details">
                        <strong>Up to 10% OFF</strong>
                        <span>Min. spend ৳500</span>
                      </div>
                      <button className="ext-link-btn" onClick={() => onToast('Showing bKash payment offers...')}>View Offers</button>
                    </div>

                    <div className="extra-discount-item">
                      <div className="ext-logo bg-nagad">Ng</div>
                      <div className="ext-details">
                        <strong>Up to 8% OFF</strong>
                        <span>Min. spend ৳500</span>
                      </div>
                      <button className="ext-link-btn" onClick={() => onToast('Showing Nagad payment offers...')}>View Offers</button>
                    </div>

                    {/* How it works? Widget */}
                    <div className="right-widget-card bg-how-it-works">
                      <h4 className="widget-section-title text-center">How it works?</h4>

                      <div className="how-it-works-steps">
                        <div className="how-step">
                          <div className="how-icon">🔍</div>
                          <strong className="how-title">1. Compare</strong>
                          <span className="how-desc">Check prices from top stores</span>
                        </div>
                        <div className="how-arrow">›</div>
                        <div className="how-step">
                          <div className="how-icon">🏷️</div>
                          <strong className="how-title">2. Choose</strong>
                          <span className="how-desc">Pick the best deal</span>
                        </div>
                        <div className="how-arrow">›</div>
                        <div className="how-step">
                          <div className="how-icon">💰</div>
                          <strong className="how-title">3. Save More</strong>
                          <span className="how-desc">Apply payment offers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      {/* Ride Booking Confirmation Modal */}
      {bookingRideModal && (
        <div className="modal-backdrop-overlay" onClick={() => setBookingRideModal(null)}>
          <div className="ride-booking-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="modal-title">Confirm Ride Booking</h3>
              <button className="modal-close-btn" onClick={() => setBookingRideModal(null)}>✕</button>
            </div>

            <div className="modal-body-content">
              {/* Brand Summary */}
              <div className="booking-brand-box">
                <div className={`ride-brand-logo ${bookingRideModal.logoBg}`}>
                  {bookingRideModal.logoText}
                </div>
                <div>
                  <strong style={{ fontSize: '16px', color: '#0f172a' }}>{bookingRideModal.brand} ({bookingRideModal.carType})</strong>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>⭐ {bookingRideModal.rating} • {bookingRideModal.seats}</div>
                </div>
              </div>

              {/* Route Summary */}
              <div className="booking-route-preview">
                <div style={{ fontSize: '13px', color: '#0f172a', fontWeight: 700 }}>
                  🟢 <strong>From:</strong> {pickupLocation}
                </div>
                <div style={{ fontSize: '13px', color: '#0f172a', fontWeight: 700, marginTop: '6px' }}>
                  🔴 <strong>To:</strong> {dropLocation}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  ⏱ <strong>Est. Time:</strong> {routeInfo.time} mins | 📏 <strong>Distance:</strong> {routeInfo.dist} km
                </div>
              </div>

              {/* Fare Breakdown */}
              <div className="booking-fare-breakdown">
                <div className="fare-row">
                  <span>Regular Fare</span>
                  <span>৳{bookingRideModal.basePrice}</span>
                </div>
                <div className="fare-row">
                  <span>Offer Discount ({bookingRideModal.discountPct}%)</span>
                  <span className="text-green-discount">-৳{bookingRideModal.savings}</span>
                </div>
                <div className="fare-row-total">
                  <strong>Total Fare</strong>
                  <strong className="total-price-green">৳{bookingRideModal.finalFare}</strong>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div style={{ marginTop: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Select Payment Method:</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '8px' }}>
                  {['bKash', 'Nagad', 'Card', 'Cash'].map(pm => (
                    <button
                      key={pm}
                      className={`payment-method-btn ${selectedPaymentMethod === pm ? 'active-pay' : ''}`}
                      onClick={() => setSelectedPaymentMethod(pm)}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer-row">
              <button className="btn-cancel-modal" onClick={() => setBookingRideModal(null)}>Cancel</button>
              <button className="btn-confirm-ride-booking" onClick={() => handleConfirmRideBooking(bookingRideModal)}>
                Confirm &amp; Request Ride 🚗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Later Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="ride-booking-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="modal-title">Schedule Ride for Later 📅</h3>
              <button className="modal-close-btn" onClick={() => setIsScheduleModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body-content">
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>SELECT DATE</label>
                <select className="add-stop-text-input" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)}>
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Day after Tomorrow">Day after Tomorrow</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: 800, color: '#475569', display: 'block', marginBottom: '6px' }}>SELECT TIME</label>
                <select className="add-stop-text-input" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)}>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="09:30 PM">09:30 PM</option>
                </select>
              </div>
            </div>

            <div className="modal-footer-row">
              <button className="btn-cancel-modal" onClick={() => setIsScheduleModalOpen(false)}>Cancel</button>
              <button
                className="btn-confirm-ride-booking"
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  onToast(`Ride scheduled for ${scheduleDate} at ${scheduleTime}! 📅`);
                }}
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Interactive Complain & Issues Portal Modal */}
      {isComplainModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsComplainModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">
                🛡️ Complain &amp; Issues Portal
              </h3>
              <button className="modal-close-btn" onClick={() => setIsComplainModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body-content">
              {/* Category Filter Bar */}
              <div className="modal-filter-pills">
                <button
                  className={`modal-filter-btn ${complainCategoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setComplainCategoryFilter('all')}
                >
                  💳 All Issues ({complaintsData.length})
                </button>
                <button
                  className={`modal-filter-btn ${complainCategoryFilter === 'promo' ? 'active' : ''}`}
                  onClick={() => setComplainCategoryFilter('promo')}
                >
                  🎟️ Promo Code Problems ({complaintsData.filter(c => c.category === 'promo').length})
                </button>
                <button
                  className={`modal-filter-btn ${complainCategoryFilter === 'food' ? 'active' : ''}`}
                  onClick={() => setComplainCategoryFilter('food')}
                >
                  🍴 Food Complaints ({complaintsData.filter(c => c.category === 'food').length})
                </button>
                <button
                  className={`modal-filter-btn ${complainCategoryFilter === 'ride' ? 'active' : ''}`}
                  onClick={() => setComplainCategoryFilter('ride')}
                >
                  🚗 Ride Complaints ({complaintsData.filter(c => c.category === 'ride').length})
                </button>
                <button
                  className={`modal-filter-btn ${complainCategoryFilter === 'skincare' ? 'active' : ''}`}
                  onClick={() => setComplainCategoryFilter('skincare')}
                >
                  ✨ Skincare &amp; Fraud Pages ({complaintsData.filter(c => c.category === 'skincare').length})
                </button>
              </div>

              {/* Search & Action Row */}
              <div className="modal-search-row">
                <div className="modal-search-input-box">
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search issues, store names or promo codes..."
                    value={complainSearchQuery}
                    onChange={(e) => setComplainSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  className="btn-file-complaint-pink"
                  onClick={() => setIsFilingNewComplaint(!isFilingNewComplaint)}
                >
                  {isFilingNewComplaint ? '✕ Cancel' : '+ Report Promo / File Issue'}
                </button>
              </div>

              {/* New Complaint Form Box */}
              {isFilingNewComplaint && (
                <form className="complaint-form-box animate-fade-in" onSubmit={handleAddNewComplaint}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    File New Complaint / Report Promo Code Issue 📝
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-field-group">
                      <label className="form-field-label">ISSUE CATEGORY</label>
                      <select
                        className="form-select-box"
                        value={newComplaintCategory}
                        onChange={(e) => setNewComplaintCategory(e.target.value)}
                      >
                        <option value="promo">🎟️ Promo Code / Discount Failed</option>
                        <option value="food">🍴 Food Delivery / Restaurant Hygiene</option>
                        <option value="ride">🚗 Ride Fare Overcharge / Driver Behavior</option>
                        <option value="skincare">✨ Fake Skincare / Scam FB Page</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">STORE / APP NAME</label>
                      <input
                        type="text"
                        placeholder="e.g. foodpanda, Uber, Kirei, etc."
                        className="form-input-text"
                        value={newComplaintTarget}
                        onChange={(e) => setNewComplaintTarget(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">PROBLEM DESCRIPTION &amp; PROMO CODE USED</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what went wrong (e.g. Copied promo code FOOD10 from website, but store rejected it at checkout)..."
                      className="form-textarea"
                      value={newComplaintDesc}
                      onChange={(e) => setNewComplaintDesc(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" className="btn-cancel-modal" onClick={() => setIsFilingNewComplaint(false)}>Cancel</button>
                    <button type="submit" className="btn-confirm-ride-booking" style={{ background: '#ff2b70' }}>Submit Ticket 🚀</button>
                  </div>
                </form>
              )}

              {/* Complaints & Issues List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {filteredComplaints.length === 0 ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                    No complaints found matching your search.
                  </div>
                ) : (
                  filteredComplaints.map(cmp => (
                    <div key={cmp.id} className="complaint-item-card" style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
                      {cmp.img && (
                        <img
                          src={cmp.img}
                          alt={cmp.title}
                          style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover', flexShrink: 0, border: '1px solid #e2e8f0' }}
                        />
                      )}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div className="complaint-item-top">
                          <div>
                            <strong className="complaint-title">{cmp.title}</strong>
                            <div className="complaint-meta" style={{ marginTop: '4px' }}>
                              <span>Target: <strong>{cmp.target}</strong></span>
                              <span>•</span>
                              <span>{cmp.date}</span>
                            </div>
                          </div>
                          <span className={cmp.statusClass}>{cmp.status}</span>
                        </div>
                        <div className="complaint-desc">
                          💬 "{cmp.desc}"
                        </div>
                        {cmp.resolution && (
                          <div className="complaint-resolution">
                            ✅ <strong>Resolution:</strong> {cmp.resolution}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Price Alerts Modal */}
      {isPriceAlertsModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsPriceAlertsModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">🔔 Active Price Alerts ({priceAlertsList.filter(a => a.active).length})</h3>
              <button className="modal-close-btn" onClick={() => setIsPriceAlertsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-filter-pills">
                <button className={`modal-filter-btn ${priceAlertFilter === 'all' ? 'active' : ''}`} onClick={() => setPriceAlertFilter('all')}>All ({priceAlertsList.length})</button>
                <button className={`modal-filter-btn ${priceAlertFilter === 'food' ? 'active' : ''}`} onClick={() => setPriceAlertFilter('food')}>🍴 Food (2)</button>
                <button className={`modal-filter-btn ${priceAlertFilter === 'ride' ? 'active' : ''}`} onClick={() => setPriceAlertFilter('ride')}>🚗 Ride (2)</button>
                <button className={`modal-filter-btn ${priceAlertFilter === 'skincare' ? 'active' : ''}`} onClick={() => setPriceAlertFilter('skincare')}>✨ Skincare (1)</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {priceAlertsList
                  .filter(a => priceAlertFilter === 'all' ? true : a.category === priceAlertFilter)
                  .map(alert => (
                    <div key={alert.id} className="complaint-item-card" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {alert.img && (
                          <img src={alert.img} alt={alert.title} style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                        )}
                        <div>
                          <strong className="complaint-title">{alert.title}</strong>
                          <div className="complaint-meta" style={{ marginTop: '2px' }}>
                            <span>Target: <strong style={{ color: '#ff2b70' }}>{alert.targetPrice}</strong></span>
                            <span>•</span>
                            <span>Current: {alert.currPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="badge-status-green">{alert.dropPct}</span>
                        <button
                          style={{ fontSize: '12px', fontWeight: 800, color: alert.active ? '#16a34a' : '#94a3b8', background: '#f8fafc', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                          onClick={() => {
                            setPriceAlertsList(priceAlertsList.map(item => item.id === alert.id ? { ...item, active: !item.active } : item));
                            onToast(`Alert for ${alert.title} ${alert.active ? 'paused' : 'resumed'}`);
                          }}
                        >
                          {alert.active ? '🟢 Active' : '⏸ Paused'}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Coupons Modal */}
      {isCouponsModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsCouponsModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">🎟️ Coupons &amp; Promo Codes</h3>
              <button className="modal-close-btn" onClick={() => setIsCouponsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-filter-pills">
                <button className={`modal-filter-btn ${couponCategoryFilter === 'all' ? 'active' : ''}`} onClick={() => setCouponCategoryFilter('all')}>All ({ALL_COUPONS_DATA.length})</button>
                <button className={`modal-filter-btn ${couponCategoryFilter === 'food' ? 'active' : ''}`} onClick={() => setCouponCategoryFilter('food')}>🍴 Food Deals (3)</button>
                <button className={`modal-filter-btn ${couponCategoryFilter === 'ride' ? 'active' : ''}`} onClick={() => setCouponCategoryFilter('ride')}>🚗 Ride Offers (3)</button>
                <button className={`modal-filter-btn ${couponCategoryFilter === 'skincare' ? 'active' : ''}`} onClick={() => setCouponCategoryFilter('skincare')}>✨ Skincare Codes (2)</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {ALL_COUPONS_DATA
                  .filter(c => couponCategoryFilter === 'all' ? true : c.category === couponCategoryFilter)
                  .map((cup, idx) => (
                    <div key={idx} className="food-promo-card-pink" style={{ marginBottom: 0, textAlign: 'left', alignItems: 'flex-start', padding: '14px' }}>
                      {cup.img && (
                        <img src={cup.img} alt={cup.title} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                      )}
                      <strong className="promo-pink-title">{cup.title}</strong>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>{cup.store} • {cup.minOrder}</span>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 900, color: '#ff2b70', background: '#ffffff', padding: '4px 8px', borderRadius: '6px', border: '1px dashed #fecdd3' }}>{cup.code}</span>
                        <button className="promo-pink-btn" onClick={() => handleCopyCode(cup.code)}>Copy Code</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Reviews Modal */}
      {isReviewsModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsReviewsModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">⭐ Community Reviews &amp; Ratings ({userReviewsList.length})</h3>
              <button className="modal-close-btn" onClick={() => setIsReviewsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div className="modal-filter-pills">
                <button className={`modal-filter-btn ${reviewCategoryFilter === 'all' ? 'active' : ''}`} onClick={() => setReviewCategoryFilter('all')}>All ({userReviewsList.length})</button>
                <button className={`modal-filter-btn ${reviewCategoryFilter === 'food' ? 'active' : ''}`} onClick={() => setReviewCategoryFilter('food')}>🍴 Food ({userReviewsList.filter(r => r.category === 'food').length})</button>
                <button className={`modal-filter-btn ${reviewCategoryFilter === 'ride' ? 'active' : ''}`} onClick={() => setReviewCategoryFilter('ride')}>🚗 Ride ({userReviewsList.filter(r => r.category === 'ride').length})</button>
                <button className={`modal-filter-btn ${reviewCategoryFilter === 'skincare' ? 'active' : ''}`} onClick={() => setReviewCategoryFilter('skincare')}>✨ Skincare ({userReviewsList.filter(r => r.category === 'skincare').length})</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {userReviewsList
                  .filter(r => reviewCategoryFilter === 'all' ? true : r.category === reviewCategoryFilter)
                  .map((rev) => (
                    <div key={rev.id} className="complaint-item-card" style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
                      {rev.itemImg && (
                        <img src={rev.itemImg} alt={rev.item} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0, border: '1px solid #e2e8f0' }} />
                      )}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div className="complaint-item-top">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {rev.userAvatar && (
                              <img src={rev.userAvatar} alt={rev.user} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff2b70' }} />
                            )}
                            <div>
                              <strong className="complaint-title">{rev.user} ({rev.location})</strong>
                              <span style={{ fontSize: '11.5px', color: '#64748b', display: 'block' }}>Review for <strong>{rev.item}</strong> • {rev.date}</span>
                            </div>
                          </div>
                          <span className="badge-status-green">⭐ {'★'.repeat(rev.rating)} ({rev.rating}.0)</span>
                        </div>
                        <div className="complaint-desc" style={{ borderLeftColor: '#f59e0b' }}>
                          "{rev.comment}"
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                          <button style={{ background: rev.isHelpful ? '#fff1f2' : '#f8fafc', border: '1px solid #e2e8f0', color: rev.isHelpful ? '#ff2b70' : '#64748b', cursor: 'pointer', padding: '4px 10px', borderRadius: '8px', fontSize: '11.5px', fontWeight: 700 }} onClick={() => handleToggleHelpful(rev.id)}>Helpful 👍 {rev.helpfulCount}</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive My Wallet Modal */}
      {isWalletModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsWalletModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">👛 OfferMatrix Wallet</h3>
              <button className="modal-close-btn" onClick={() => setIsWalletModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '20px', padding: '28px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>AVAILABLE BALANCE</span>
                  <div style={{ fontSize: '38px', fontWeight: 900, color: '#38bdf8', marginTop: '4px' }}>৳1,450</div>
                  <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: 700 }}>Total Cashback Earned: ৳850</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=200&q=80" alt="Wallet Card" style={{ width: '120px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #334155' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className="btn-confirm-ride-booking" style={{ background: '#0284c7', fontSize: '13px' }} onClick={() => onToast('Opening bKash Add Money gateway...')}>+ Add Money</button>
                    <button className="btn-cancel-modal" style={{ background: '#334155', color: '#ffffff', border: 'none', fontSize: '13px' }} onClick={() => onToast('Cashback redemption options...')}>Redeem Rewards</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Bank Cards Modal */}
      {isBankCardsModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsBankCardsModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">💳 Saved Bank Cards &amp; Payment Methods</h3>
              <button className="modal-close-btn" onClick={() => setIsBankCardsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="complaint-item-card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=150&q=80" alt="City Bank Amex" style={{ width: '60px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <strong className="complaint-title">City Bank American Express (**** 4892)</strong>
                      <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'block', marginTop: '2px' }}>🎁 15% OFF on foodpanda &amp; Foodie orders</span>
                    </div>
                  </div>
                  <span className="badge-status-green">Default</span>
                </div>

                <div className="complaint-item-card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=150&q=80" alt="bKash Wallet" style={{ width: '60px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <strong className="complaint-title">bKash Account (01712****78)</strong>
                      <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'block', marginTop: '2px' }}>⚡ Instant 10% Cashback on Food, Rides &amp; Skincare</span>
                    </div>
                  </div>
                  <span className="badge-status-green">Linked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Refer & Earn Modal */}
      {isReferModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsReferModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">🎁 Refer &amp; Earn Rewards</h3>
              <button className="modal-close-btn" onClick={() => setIsReferModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80" alt="Referral Gift Banner" style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '16px' }} />
              <h4 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: 0 }}>Invite Friends &amp; Earn ৳100 Cashback</h4>
              <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '500px', margin: 0 }}>Your friends get ৳50 OFF on their first Food, Ride or Skincare order!</p>

              <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '16px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '450px' }}>
                <span style={{ fontSize: '20px', fontWeight: 900, color: '#ff2b70' }}>SETU2026</span>
                <button className="promo-pink-btn" onClick={() => handleCopyCode('SETU2026')}>Copy Code</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Settings Modal */}
      {isSettingsModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsSettingsModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">⚙️ Account Settings</h3>
              <button className="modal-close-btn" onClick={() => setIsSettingsModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div className="form-field-group">
                <label className="form-field-label">FULL NAME</label>
                <input type="text" className="form-input-text" defaultValue={userName} />
              </div>
              <div className="form-field-group">
                <label className="form-field-label">CITY / LOCATION</label>
                <select className="form-select-box" defaultValue="Dhaka">
                  <option value="Dhaka">Dhaka, Bangladesh</option>
                  <option value="Chattogram">Chattogram, Bangladesh</option>
                  <option value="Sylhet">Sylhet, Bangladesh</option>
                </select>
              </div>
              <button className="btn-file-complaint-pink" style={{ alignSelf: 'flex-start' }} onClick={() => { setIsSettingsModalOpen(false); onToast('Settings saved successfully! ⚙️'); }}>Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Help & Support Modal */}
      {isHelpModalOpen && (
        <div className="modal-backdrop-blur" onClick={() => setIsHelpModalOpen(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">🎧 Help &amp; Support Center</h3>
              <button className="modal-close-btn" onClick={() => setIsHelpModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body-content">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
                <div className="complaint-item-card" onClick={() => { setIsHelpModalOpen(false); setIsLiveChatOpen(true); }} style={{ cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px' }}>💬</span>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Live Chat</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Instant 24/7 Response</span>
                </div>

                <div className="complaint-item-card" onClick={() => onToast('Calling Hotline 16999... 📞')} style={{ cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px' }}>📞</span>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Call 16999</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Toll Free Hotline</span>
                </div>

                <div className="complaint-item-card" onClick={() => onToast('Opening Email Support... 📧')} style={{ cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px' }}>📧</span>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>Email Support</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>support@offermatrix.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Write Review Modal */}
      {isAddingReview && (
        <div className="modal-backdrop-blur" onClick={() => setIsAddingReview(false)}>
          <div className="modal-card-lg animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-card-header">
              <h3 className="modal-title-main">✍️ Write a Verified Review</h3>
              <button className="modal-close-btn" onClick={() => setIsAddingReview(false)}>✕</button>
            </div>
            <form onSubmit={handleAddNewReview} className="modal-body-content" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="complain-field-group">
                <label className="complain-label">Your Name</label>
                <input
                  type="text"
                  className="complain-input"
                  value={newReviewForm.user}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, user: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="complain-field-group">
                <label className="complain-label">Category</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[
                    { key: 'food', label: '🍴 Food' },
                    { key: 'ride', label: '🚗 Ride' },
                    { key: 'skincare', label: '✨ Skincare' }
                  ].map(cat => (
                    <button
                      type="button"
                      key={cat.key}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: newReviewForm.category === cat.key ? '2px solid #ff2b70' : '1px solid #cbd5e1',
                        background: newReviewForm.category === cat.key ? '#fff1f2' : '#ffffff',
                        color: newReviewForm.category === cat.key ? '#ff2b70' : '#475569',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setNewReviewForm({ ...newReviewForm, category: cat.key })}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="complain-field-group">
                <label className="complain-label">Store / Service / Product Name</label>
                <input
                  type="text"
                  className="complain-input"
                  value={newReviewForm.item}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, item: e.target.value })}
                  placeholder="e.g. Sultan's Dine, Pathao Car, CeraVe Cleanser"
                  required
                />
              </div>

              <div className="complain-field-group">
                <label className="complain-label">Your Rating</label>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        filter: star <= newReviewForm.rating ? 'none' : 'grayscale(100%) opacity(40%)'
                      }}
                      onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                    >
                      ⭐
                    </button>
                  ))}
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b', marginLeft: '6px' }}>{newReviewForm.rating}.0 / 5.0</span>
                </div>
              </div>

              <div className="complain-field-group">
                <label className="complain-label">Your Location</label>
                <input
                  type="text"
                  className="complain-input"
                  value={newReviewForm.location}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, location: e.target.value })}
                  placeholder="e.g. Dhanmondi, Dhaka"
                />
              </div>

              <div className="complain-field-group">
                <label className="complain-label">Review Feedback / Experience</label>
                <textarea
                  className="complain-textarea"
                  rows={3}
                  value={newReviewForm.comment}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                  placeholder="Share details about delivery speed, authenticity, discount savings, driver behavior..."
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn-cancel-modal" onClick={() => setIsAddingReview(false)}>Cancel</button>
                <button type="submit" className="btn-confirm-ride-booking" style={{ background: '#ff2b70' }}>Publish &amp; Claim ৳20 🎉</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Live Chat Trigger Button */}
      {!isLiveChatOpen && (
        <button
          className="floating-live-chat-btn animate-fade-in"
          onClick={() => {
            if (activeTab === 'food' || orderCategoryFilter === 'food') {
              setActiveDeliverymanChat({
                name: 'Rahim Ahmed (Delivery Rider)',
                phone: '+880 1712 345678',
                vehicle: 'Honda Dream 110 (Motorcycle)',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                orderId: 'ORD-98421-FD'
              });
            } else {
              setIsLiveChatOpen(true);
            }
          }}
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            border: '2px solid rgba(255,255,255,0.4)',
            padding: '12px 22px',
            borderRadius: '50px',
            fontWeight: 800,
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.45)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease'
          }}
        >
          <span style={{ position: 'relative', display: 'inline-flex', fontSize: '18px' }}>
            💬
            <span style={{ position: 'absolute', top: '-2px', right: '-4px', width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', border: '2px solid #ffffff' }} />
          </span>
          <span>Live Chat Support</span>
          <span style={{ background: '#ef4444', color: '#ffffff', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', fontWeight: 900 }}>24/7</span>
        </button>
      )}

      {/* 24/7 Live Chatting System Widget / Window */}
      {isLiveChatOpen && (
        <div
          className="live-chat-window-container animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '380px',
            height: '540px',
            maxHeight: '90vh',
            maxWidth: '92vw',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(15, 23, 42, 0.25)',
            border: '1.5px solid #cbd5e1',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Live Chat Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              color: '#ffffff',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              borderBottom: '1px solid #334155'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Nusrat Jahan"
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #38bdf8' }}
                />
                <span style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', border: '2px solid #0f172a' }} />
              </div>
              <div>
                <strong style={{ fontSize: '15px', display: 'block', color: '#ffffff', fontWeight: 800 }}>Nusrat Jahan</strong>
                <span style={{ fontSize: '11.5px', color: '#38bdf8', fontWeight: 600 }}>🟢 Setu Senior Support Officer</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#94a3b8', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: 800 }}
                onClick={() => setIsLiveChatOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '8px 16px', fontSize: '11.5px', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>⚡ Avg response time: <strong>&lt; 1 min</strong></span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>🔒 Encrypted Live Chat</span>
          </div>

          {/* Chat Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: '#f8fafc'
            }}
          >
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                    fontSize: '13px',
                    lineHeight: 1.45,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                  }}
                >
                  {msg.text}
                </div>
                <span style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '3px', padding: '0 4px' }}>
                  {msg.sender === 'agent' ? 'Nusrat • ' : ''}{msg.time}
                </span>
              </div>
            ))}

            {isAgentTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px', background: '#ffffff', padding: '8px 12px', borderRadius: '12px', width: 'fit-content', border: '1px solid #e2e8f0' }}>
                <span className="animate-pulse">💬 Nusrat is typing...</span>
              </div>
            )}
          </div>

          {/* Quick Action Suggestion Pills */}
          <div style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {[
              '🍔 Food Coupon Issue',
              '🚗 Ride Fare Dispute',
              '✨ Skincare Authenticity',
              '💳 Check Wallet Balance'
            ].map((pill, i) => (
              <button
                key={i}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                onClick={() => handleSendChatMessage(pill)}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Chat Footer Input Area */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendChatMessage(); }}
            style={{
              padding: '12px 14px',
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <button
              type="button"
              style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
              onClick={() => onToast('📎 Photo attachment upload ready!')}
            >
              📎
            </button>
            <input
              type="text"
              style={{
                flex: 1,
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                padding: '8px 14px',
                fontSize: '13px',
                outline: 'none'
              }}
              placeholder="Type your message..."
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
            />
            <button
              type="submit"
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '18px',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Send 🚀
            </button>
          </form>
        </div>
      )}
      {/* ================= LIVE CHATBOX WITH DELIVERYMAN / RIDER MODAL ================= */}
      {activeDeliverymanChat && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '380px',
          height: '520px',
          maxHeight: '90vh',
          maxWidth: '92vw',
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)',
          zIndex: 100000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1.5px solid #fecdd3',
          fontFamily: "'Inter', sans-serif"
        }}>
          {/* Deliveryman Chat Header */}
          <div style={{
            background: 'linear-gradient(135deg, #ff2b70 0%, #ff528b 100%)',
            padding: '14px 16px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={activeDeliverymanChat.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}
                alt="Deliveryman"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ffffff' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 900, lineHeight: 1.1 }}>
                  {activeDeliverymanChat.name || 'Rahim Ahmed (Delivery Rider)'}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.9, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80' }}></span>
                  <span>Online • On the way 🛵</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveDeliverymanChat(null)}
              style={{ background: 'rgba(255, 255, 255, 0.2)', border: 'none', color: '#ffffff', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>
          </div>

          {/* Delivery Rider Info Sub-bar */}
          <div style={{ background: '#fff0f5', padding: '8px 14px', borderBottom: '1px solid #fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#be185d', fontWeight: 700 }}>
            <span>🛵 {activeDeliverymanChat.vehicle || 'Honda Dream 110'}</span>
            <span>📞 {activeDeliverymanChat.phone || '+880 1712 345678'}</span>
          </div>

          {/* Messages Body Container */}
          <div style={{ flex: 1, padding: '14px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {deliverymanChatHistory.map((msg, idx) => {
              const isRider = msg.sender === 'rider';
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isRider ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    background: isRider ? '#ffffff' : '#ff2b70',
                    color: isRider ? '#0f172a' : '#ffffff',
                    padding: '9px 13px',
                    borderRadius: isRider ? '14px 14px 14px 2px' : '14px 14px 2px 14px',
                    fontSize: '12px',
                    fontWeight: 500,
                    maxWidth: '82%',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    border: isRider ? '1px solid #e2e8f0' : 'none',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '9.5px', color: '#94a3b8', marginTop: '3px', padding: '0 2px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Preset Reply Chips */}
          <div style={{ background: '#ffffff', padding: '8px 10px 4px 10px', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
              {[
                "Where are you now? 🛵",
                "Call me upon arrival 📞",
                "Leave at reception 🏠",
                "Bring extra napkins 🧻",
                "Is food packed hot? 🍱"
              ].map((chip, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => handleSendDeliverymanMessage(chip)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '99px',
                    padding: '4px 10px',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#334155',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendDeliverymanMessage(); }}
            style={{ padding: '10px 12px', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <input
              type="text"
              placeholder="Type message to deliveryman..."
              value={deliverymanChatInput}
              onChange={(e) => setDeliverymanChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '9px 14px',
                borderRadius: '99px',
                border: '1.5px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                background: '#f8fafc'
              }}
            />

            <button
              type="submit"
              style={{
                background: '#ff2b70',
                color: '#ffffff',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255, 43, 112, 0.3)'
              }}
            >
              🚀
            </button>
          </form>
        </div>
      )}
      </div>
  );
}
