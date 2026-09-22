import React, { useState } from 'react';
import {
  Tag, Percent, Search, Bell, Calendar, ChevronDown, LayoutDashboard,
  Users, Store, Utensils, Car, Sparkles, Ticket, MessageSquare,
  Star, BarChart2, FileText, Settings, LogOut, ShieldCheck, ArrowRight,
  ChevronRight, TrendingUp, AlertTriangle, Shield, Plus, Filter, X,
  UserCheck, UserX, AlertOctagon, Mail, Phone, MoreVertical, CheckCircle2,
  Clock, RotateCcw, AlertCircle, Edit2, Trash2, Heart, Send, ChevronUp, Building2
} from 'lucide-react';

const MOCK_USERS_DATA = [
  {
    id: 1,
    name: 'Nusrat Jahan',
    email: 'nusrat@gmail.com',
    phone: '01712-345678',
    joined: '12 Aug 2026',
    status: 'Active',
    complaints: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 2,
      reviewsCount: 5,
      offersUsed: 12,
      savedDeals: 3,
      recentComplaints: [
        { title: 'Fake product advertised', sub: '(Skincare)', date: '12 Sep 2026' },
        { title: 'Wrong discount code', sub: '(Food)', date: '05 Sep 2026' }
      ],
      recentActivity: [
        { title: 'Logged in from Dhaka, BD', date: 'Today, 10:24 AM', color: '#10b981' },
        { title: 'Used an offer (foodpanda)', date: '14 Sep 2026, 02:15 PM', color: '#10b981' },
        { title: 'Submitted a complaint', date: '12 Sep 2026, 11:30 AM', color: '#ef4444' },
        { title: 'Account created', date: '12 Aug 2026, 09:10 PM', color: '#3b82f6' }
      ]
    }
  },
  {
    id: 2,
    name: 'Tanvir Rahman',
    email: 'tanvir@gmail.com',
    phone: '01823-456789',
    joined: '10 Aug 2026',
    status: 'Active',
    complaints: 0,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 0,
      reviewsCount: 8,
      offersUsed: 19,
      savedDeals: 6,
      recentComplaints: [],
      recentActivity: [
        { title: 'Logged in from Chittagong, BD', date: 'Today, 09:15 AM', color: '#10b981' },
        { title: 'Used an offer (Uber)', date: '15 Sep 2026, 06:20 PM', color: '#10b981' },
        { title: 'Account created', date: '10 Aug 2026, 02:30 PM', color: '#3b82f6' }
      ]
    }
  },
  {
    id: 3,
    name: 'Samiha Islam',
    email: 'samiha@gmail.com',
    phone: '01676-234567',
    joined: '09 Aug 2026',
    status: 'Reported',
    complaints: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 5,
      reviewsCount: 2,
      offersUsed: 4,
      savedDeals: 1,
      recentComplaints: [
        { title: 'Payment failed twice on bKash', sub: '(Wallet)', date: '10 Sep 2026' },
        { title: 'Expired coupon code', sub: '(General)', date: '08 Sep 2026' }
      ],
      recentActivity: [
        { title: 'Reported for multiple failed claims', date: 'Yesterday, 04:10 PM', color: '#f59e0b' },
        { title: 'Logged in from Sylhet, BD', date: '11 Sep 2026, 11:00 AM', color: '#10b981' }
      ]
    }
  },
  {
    id: 4,
    name: 'Rafi Ahmed',
    email: 'rafi@gmail.com',
    phone: '01988-123456',
    joined: '05 Aug 2026',
    status: 'Suspended',
    complaints: 8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 8,
      reviewsCount: 0,
      offersUsed: 2,
      savedDeals: 0,
      recentComplaints: [
        { title: 'Abusive language in live chat', sub: '(Support)', date: '04 Sep 2026' }
      ],
      recentActivity: [
        { title: 'Account suspended by Admin', date: '05 Sep 2026, 03:00 PM', color: '#ef4444' }
      ]
    }
  },
  {
    id: 5,
    name: 'Meherun Nesa',
    email: 'meherun@gmail.com',
    phone: '01766-987654',
    joined: '03 Aug 2026',
    status: 'Active',
    complaints: 1,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 1,
      reviewsCount: 12,
      offersUsed: 24,
      savedDeals: 9,
      recentComplaints: [
        { title: 'Delayed food delivery', sub: '(Pathao)', date: '01 Sep 2026' }
      ],
      recentActivity: [
        { title: 'Logged in from Dhaka, BD', date: 'Today, 08:30 AM', color: '#10b981' }
      ]
    }
  },
  {
    id: 6,
    name: 'Sifat Mahmud',
    email: 'sifat@gmail.com',
    phone: '01890-765432',
    joined: '01 Aug 2026',
    status: 'Active',
    complaints: 0,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 0,
      reviewsCount: 6,
      offersUsed: 15,
      savedDeals: 5,
      recentComplaints: [],
      recentActivity: [
        { title: 'Logged in from Rajshahi, BD', date: 'Today, 11:15 AM', color: '#10b981' }
      ]
    }
  },
  {
    id: 7,
    name: 'Afia Rahman',
    email: 'afia@gmail.com',
    phone: '01755-667788',
    joined: '28 Jul 2026',
    status: 'Active',
    complaints: 3,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 3,
      reviewsCount: 4,
      offersUsed: 10,
      savedDeals: 2,
      recentComplaints: [
        { title: 'CeraVe cleanser QR code check', sub: '(Skincare)', date: '25 Aug 2026' }
      ],
      recentActivity: [
        { title: 'Logged in from Dhaka, BD', date: 'Yesterday, 02:20 PM', color: '#10b981' }
      ]
    }
  },
  {
    id: 8,
    name: 'Tahia Khan',
    email: 'tahia@gmail.com',
    phone: '01844-998877',
    joined: '25 Jul 2026',
    status: 'Reported',
    complaints: 4,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 4,
      reviewsCount: 1,
      offersUsed: 3,
      savedDeals: 1,
      recentComplaints: [
        { title: 'Merchant refused deal discount', sub: '(Food)', date: '20 Aug 2026' }
      ],
      recentActivity: [
        { title: 'Reported by Merchant Kacchi Bhai', date: '21 Aug 2026, 05:00 PM', color: '#f59e0b' }
      ]
    }
  },
  {
    id: 9,
    name: 'Zarin Chowdhury',
    email: 'zarin@gmail.com',
    phone: '01611-223344',
    joined: '20 Jul 2026',
    status: 'Active',
    complaints: 0,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 0,
      reviewsCount: 9,
      offersUsed: 21,
      savedDeals: 7,
      recentComplaints: [],
      recentActivity: [
        { title: 'Logged in from Khulna, BD', date: 'Yesterday, 10:00 AM', color: '#10b981' }
      ]
    }
  },
  {
    id: 10,
    name: 'Fahim Hossain',
    email: 'fahim@gmail.com',
    phone: '01933-556677',
    joined: '18 Jul 2026',
    status: 'Suspended',
    complaints: 6,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    details: {
      complaintsCount: 6,
      reviewsCount: 0,
      offersUsed: 1,
      savedDeals: 0,
      recentComplaints: [
        { title: 'Fraudulent refund claim', sub: '(Wallet)', date: '15 Jul 2026' }
      ],
      recentActivity: [
        { title: 'Account suspended by Admin', date: '18 Jul 2026, 12:00 PM', color: '#ef4444' }
      ]
    }
  }
];

export default function AdminDashboard({
  currentUser,
  onLogout,
  onToast,
  foodpandaOffers = [],
  setFoodpandaOffers,
  foodiOffers = [],
  setFoodiOffers,
  pathaoOffers = [],
  setPathaoOffers,
  uberOffers = [],
  setUberOffers,
  obhaiOffers = [],
  setObhaiOffers,
  indriverOffers = [],
  setIndriverOffers
}) {
  const [activeTab, setActiveTab] = useState('coupons');
  const [isFoodSubOpen, setIsFoodSubOpen] = useState(false);
  const [activeFoodSubTab, setActiveFoodSubTab] = useState('all');

  // Ride Submenu & Selected Platform State
  const [isRideSubOpen, setIsRideSubOpen] = useState(false);
  const [activeRideSubTab, setActiveRideSubTab] = useState('all');
  const [selectedRidePlatform, setSelectedRidePlatform] = useState('uber'); // 'uber' | 'obhai' | 'indriver'

  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('Last 30 Days');

  // Selected Food Platform Card ('foodpanda' | 'foodi' | 'pathao')
  const [selectedPlatform, setSelectedPlatform] = useState('foodpanda');

  // Users Management State
  const [userFilterTab, setUserFilterTab] = useState('all');
  const [userSearchText, setUserSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS_DATA[0]);
  const [showUserDetails, setShowUserDetails] = useState(true);
  const [usersList, setUsersList] = useState(MOCK_USERS_DATA);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserStatus, setNewUserStatus] = useState('Active');
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [userMessageContent, setUserMessageContent] = useState('');

  const handleAddNewUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      onToast('Please enter user name and email');
      return;
    }
    const newUserObj = {
      id: Date.now(),
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '01700-000000',
      joined: '17 Sep 2026',
      status: newUserStatus,
      complaints: 0,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      details: {
        complaintsCount: 0,
        reviewsCount: 0,
        offersUsed: 0,
        savedDeals: 0,
        recentComplaints: [],
        recentActivity: [
          { title: 'Account created by Admin', date: 'Just now', color: '#3b82f6' }
        ]
      }
    };
    setUsersList([newUserObj, ...usersList]);
    setSelectedUser(newUserObj);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    onToast(`Added user ${newUserName} successfully! 🎉`);
  };

  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (!userMessageContent.trim()) {
      onToast('Please enter a message to send');
      return;
    }
    onToast(`Message sent to ${selectedUser?.name || 'User'}! 📩`);
    setIsSendMessageModalOpen(false);
    setUserMessageContent('');
  };

  // Account Type Toggles for standard & premium user vs merchant pages
  const [complaintsAccountType, setComplaintsAccountType] = useState('user');
  const [reviewsAccountType, setReviewsAccountType] = useState('user');
  const [reportsAccountType, setReportsAccountType] = useState('user');
  const [notificationsAccountType, setNotificationsAccountType] = useState('user');
  const [contentAccountType, setContentAccountType] = useState('user');
  const [settingsAccountType, setSettingsAccountType] = useState('user');

  // Filter & Input States for adaptive pages
  const [complaintCategoryFilter, setComplaintCategoryFilter] = useState('all');
  const [complaintTierFilter, setComplaintTierFilter] = useState('all');
  const [complaintSearch, setComplaintSearch] = useState('');

  const [reviewRatingFilter, setReviewRatingFilter] = useState('all');
  const [reviewTierFilter, setReviewTierFilter] = useState('all');

  const [notifTargetTier, setNotifTargetTier] = useState('all');
  const [notifTitleInput, setNotifTitleInput] = useState('');
  const [notifBodyInput, setNotifBodyInput] = useState('');

  const [userAllowSignup, setUserAllowSignup] = useState(true);
  const [userRequireOTP, setUserRequireOTP] = useState(true);
  const [merchantAutoApprove, setMerchantAutoApprove] = useState(false);
  const [merchantRequireLicense, setMerchantRequireLicense] = useState(true);

  // Food Form Input State
  const [offerTitle, setOfferTitle] = useState('Flat 20% Discount on All Orders');
  const [offerType, setOfferType] = useState('Flat Discount');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [minOrder, setMinOrder] = useState('200');
  const [validFrom, setValidFrom] = useState('2026-09-15');
  const [validTill, setValidTill] = useState('2026-09-30');
  const [description, setDescription] = useState('Get 20% off on all food orders. T&C applied.');
  const [offerStatus, setOfferStatus] = useState(true);

  // Ride Form Input State
  const [rideOfferTitle, setRideOfferTitle] = useState('20% off on 3 Rides');
  const [rideOfferType, setRideOfferType] = useState('Select Offer Type');
  const [rideDiscountType, setRideDiscountType] = useState('percentage');
  const [rideDiscountValue, setRideDiscountValue] = useState('20');
  const [rideMinAmount, setRideMinAmount] = useState('100');
  const [rideValidFrom, setRideValidFrom] = useState('2026-09-15');
  const [rideValidTill, setRideValidTill] = useState('2026-09-30');
  const [rideDescription, setRideDescription] = useState('Get 20% off on all Uber rides. T&C applied.');
  const [rideOfferStatus, setRideOfferStatus] = useState(true);

  // Skincare Submenu & Selected Platform State
  const [isSkincareSubOpen, setIsSkincareSubOpen] = useState(false);
  const [activeSkincareSubTab, setActiveSkincareSubTab] = useState('all');
  const [selectedSkincarePlatform, setSelectedSkincarePlatform] = useState('choice_legacy'); // 'choice_legacy' | 'kirei' | 'makeup_chari'

  // Skincare Offers State
  const [choiceLegacyOffers, setChoiceLegacyOffers] = useState([
    { id: 1, title: 'Flat 20% off on All Products', discount: '20%', validTill: '30 Sep 2026', status: 'Active', code: 'CHOICE20' },
    { id: 2, title: 'Buy 1 Get 1 (Selected Items)', discount: '50%', validTill: '25 Sep 2026', status: 'Active', code: 'CHOICEBOGO' },
    { id: 3, title: 'Skincare Combo Deal', discount: '30%', validTill: '28 Sep 2026', status: 'Active', code: 'CHOICECOMBO' },
    { id: 4, title: 'Student Discount', discount: '15%', validTill: '20 Sep 2026', status: 'Expired', code: 'CHOICESTUDENT' },
    { id: 5, title: 'Free Gift on 1500+ Purchase', discount: 'Free Gift', validTill: '18 Sep 2026', status: 'Active', code: 'CHOICEGIFT' }
  ]);

  const [kireiOffers, setKireiOffers] = useState([
    { id: 1, title: 'Kirei Glow Offer 25% OFF', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'KIREI25' },
    { id: 2, title: 'Free Serum on 2000+ Orders', discount: 'Free Serum', validTill: '25 Sep 2026', status: 'Active', code: 'KIREISERUM' },
    { id: 3, title: 'Kirei Bundle Deal 30% OFF', discount: '30%', validTill: '28 Sep 2026', status: 'Active', code: 'KIREIDEAL' }
  ]);

  const [makeupChariOffers, setMakeupChariOffers] = useState([
    { id: 1, title: 'Makeup Chari Flash 20% OFF', discount: '20%', validTill: '30 Sep 2026', status: 'Active', code: 'CHARI20' },
    { id: 2, title: 'Foundation Bundle ৳150 OFF', discount: '৳150 off', validTill: '25 Sep 2026', status: 'Active', code: 'CHARIBUNDLE' },
    { id: 3, title: 'First Makeup Order 35% OFF', discount: '35%', validTill: '28 Sep 2026', status: 'Active', code: 'CHARIFIRST' }
  ]);

  // Skincare Form Input State
  const [skincareOfferTitle, setSkincareOfferTitle] = useState('Flat 20% off on All Skincare Products');
  const [skincareOfferType, setSkincareOfferType] = useState('Select Offer Type');
  const [skincareDiscountType, setSkincareDiscountType] = useState('percentage');
  const [skincareDiscountValue, setSkincareDiscountValue] = useState('20');
  const [skincareMinAmount, setSkincareMinAmount] = useState('1000');
  const [skincareValidFrom, setSkincareValidFrom] = useState('2026-09-15');
  const [skincareValidTill, setSkincareValidTill] = useState('2026-09-30');
  const [skincareDescription, setSkincareDescription] = useState('e.g. Get 20% off on all skincare products. T&C applied.');
  const [skincareOfferStatus, setSkincareOfferStatus] = useState(true);


  // Determine active ride offers list based on selectedRidePlatform
  const activeRideOffers = selectedRidePlatform === 'uber'
    ? (uberOffers.length > 0 ? uberOffers : [
      { id: 1, title: '20% off on 3 Rides', discount: '20%', validTill: '30 Sep 2026', status: 'Active', code: 'UBER20' },
      { id: 2, title: 'Flat 50 BDT Cashback', discount: '৳50', validTill: '25 Sep 2026', status: 'Active', code: 'UBER50' },
      { id: 3, title: 'Weekend Ride Offer', discount: '25%', validTill: '28 Sep 2026', status: 'Active', code: 'UBERWEEKEND' },
      { id: 4, title: 'First Ride Offer', discount: '30%', validTill: '20 Sep 2026', status: 'Expired', code: 'UBERFIRST' },
      { id: 5, title: 'Airport Ride Discount', discount: '৳100', validTill: '18 Sep 2026', status: 'Active', code: 'UBERAIRPORT' }
    ])
    : selectedRidePlatform === 'obhai'
      ? (obhaiOffers.length > 0 ? obhaiOffers : [
        { id: 1, title: 'OBHAI 25% OFF on CNG', discount: '25%', validTill: '30 Sep 2026', status: 'Active', code: 'OBHAI25' },
        { id: 2, title: 'Flat ৳40 Cashback via bKash', discount: '৳40', validTill: '25 Sep 2026', status: 'Active', code: 'OBHAICASH' },
        { id: 3, title: 'Weekend Special Ride', discount: '20%', validTill: '28 Sep 2026', status: 'Active', code: 'OBHAIWEEKEND' }
      ])
      : (indriverOffers.length > 0 ? indriverOffers : [
        { id: 1, title: 'Set Your Fare 30% OFF', discount: '30%', validTill: '30 Sep 2026', status: 'Active', code: 'INDRIVER30' },
        { id: 2, title: 'Intercity Bargain Special', discount: '৳100', validTill: '25 Sep 2026', status: 'Active', code: 'INDRIVER100' },
        { id: 3, title: 'First InDriver Trip Offer', discount: '20%', validTill: '28 Sep 2026', status: 'Active', code: 'INDRIVERFIRST' }
      ]);

  const setActiveRideOffers = selectedRidePlatform === 'uber'
    ? setUberOffers
    : selectedRidePlatform === 'obhai'
      ? setObhaiOffers
      : setIndriverOffers;

  const getRideBrandInfo = () => {
    if (selectedRidePlatform === 'obhai') {
      return { name: 'OBHAI', icon: '🚕', slogan: 'Rides for a Better Tomorrow', codePrefix: 'OBHAI' };
    }
    if (selectedRidePlatform === 'indriver') {
      return { name: 'inDriver', icon: '🚙', slogan: 'Your Ride, Your Price', codePrefix: 'INDRIVER' };
    }
    return { name: 'Uber', icon: '🚘', slogan: 'Go Anywhere With Uber', codePrefix: 'UBER' };
  };

  const rideBrandInfo = getRideBrandInfo();

  const handleSelectRidePlatform = (plat) => {
    setSelectedRidePlatform(plat);
    setActiveRideSubTab(plat);
    const titleText = plat === 'uber'
      ? '20% off on 3 Rides'
      : plat === 'obhai'
        ? 'OBHAI 25% OFF on CNG'
        : 'Set Your Fare 30% OFF';
    setRideOfferTitle(titleText);
    onToast(`Switched Ride Offer Manager to ${plat.toUpperCase()}`);
  };

  const handlePublishRideOffer = (e) => {
    e.preventDefault();
    const newOffer = {
      id: Date.now(),
      title: rideOfferTitle,
      discount: rideDiscountType === 'percentage' ? `${rideDiscountValue}%` : `৳${rideDiscountValue}`,
      validTill: rideValidTill ? new Date(rideValidTill).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '30 Sep 2026',
      status: rideOfferStatus ? 'Active' : 'Expired',
      code: `${rideBrandInfo.codePrefix}${rideDiscountValue}`
    };

    if (setActiveRideOffers) {
      setActiveRideOffers([newOffer, ...activeRideOffers]);
    }
    onToast(`Published new offer for ${rideBrandInfo.name}! 🚀`);
  };

  const handleDeleteRideOffer = (id) => {
    if (setActiveRideOffers) {
      setActiveRideOffers(activeRideOffers.filter(o => o.id !== id));
    }
    onToast(`Deleted offer from ${rideBrandInfo.name}`);
  };

  // Determine active offers list based on selectedPlatform
  const activeOffers = selectedPlatform === 'foodpanda'
    ? foodpandaOffers
    : selectedPlatform === 'foodi'
      ? foodiOffers
      : pathaoOffers;

  const setActiveOffers = selectedPlatform === 'foodpanda'
    ? setFoodpandaOffers
    : selectedPlatform === 'foodi'
      ? setFoodiOffers
      : setPathaoOffers;

  const getPlatformBrandInfo = () => {
    if (selectedPlatform === 'foodi') {
      return { name: 'Foodi', icon: '🔴', slogan: 'Just Order & Smile', codePrefix: 'FOODI' };
    }
    if (selectedPlatform === 'pathao') {
      return { name: 'Pathao Food', icon: '🛵', slogan: 'Here With You', codePrefix: 'PATHAO' };
    }
    return { name: 'Foodpanda', icon: '🐼', slogan: 'Good Food Brings Us Together', codePrefix: 'PANDA' };
  };

  const brandInfo = getPlatformBrandInfo();

  const handleSelectPlatform = (plat) => {
    setSelectedPlatform(plat);
    setActiveFoodSubTab(plat);
    const titleText = plat === 'foodpanda'
      ? 'Flat 20% Discount on All Orders'
      : plat === 'foodi'
        ? 'Just Order & Smile 25% OFF'
        : 'Pathao Food Express 30% OFF';
    setOfferTitle(titleText);
    onToast(`Switched Admin Offer Manager to ${plat.toUpperCase()}`);
  };

  const handlePublishOffer = (e) => {
    e.preventDefault();
    const newOffer = {
      id: activeOffers.length + 1,
      title: offerTitle,
      discount: discountType === 'percentage' ? `${discountValue}%` : `${discountValue}৳ off`,
      validTill: '30 Sep 2026',
      status: offerStatus ? 'Active' : 'Expired',
      code: `${brandInfo.codePrefix}${discountValue}`
    };

    setActiveOffers([newOffer, ...activeOffers]);
    onToast(`Published new offer for ${brandInfo.name}! 🚀 Connected to ${brandInfo.name} Merchant view.`);
  };

  const handleDeleteOffer = (id) => {
    setActiveOffers(activeOffers.filter(o => o.id !== id));
    onToast(`Deleted offer from ${brandInfo.name}`);
  };

  const handleAction = (user, actionType) => {
    if (actionType === 'warn') {
      onToast(`Warning sent to ${user.name}! ⚠️`);
    } else if (actionType === 'suspend') {
      setUsersList(usersList.map(u => u.id === user.id ? { ...u, status: 'Suspended' } : u));
      if (selectedUser?.id === user.id) {
        setSelectedUser({ ...selectedUser, status: 'Suspended' });
      }
      onToast(`Suspended account for ${user.name} 🚫`);
    } else if (actionType === 'activate') {
      setUsersList(usersList.map(u => u.id === user.id ? { ...u, status: 'Active' } : u));
      if (selectedUser?.id === user.id) {
        setSelectedUser({ ...selectedUser, status: 'Active' });
      }
      onToast(`Activated account for ${user.name} ✅`);
    }
  };

  // Offers & Coupons State
  const [isCouponsSubOpen, setIsCouponsSubOpen] = useState(true);
  const [activeCouponSubTab, setActiveCouponSubTab] = useState('delivery');
  const [couponPlatform, setCouponPlatform] = useState('food');
  const [couponMerchant, setCouponMerchant] = useState('foodpanda');
  const [couponOfferTitle, setCouponOfferTitle] = useState('');
  const [couponOfferType, setCouponOfferType] = useState('General Discount');
  const [couponDiscountType, setCouponDiscountType] = useState('percentage');
  const [couponDiscountValue, setCouponDiscountValue] = useState('20');
  const [couponMaxDiscount, setCouponMaxDiscount] = useState('');
  const [couponMinOrder, setCouponMinOrder] = useState('');
  const [couponValidFrom, setCouponValidFrom] = useState('2026-09-15');
  const [couponValidTill, setCouponValidTill] = useState('2026-09-30');
  const [couponPaymentMethods, setCouponPaymentMethods] = useState({ all: true, card: false, bkash: false, nagad: false, cash: false });
  const [couponDescription, setCouponDescription] = useState('');
  const [bankOfferBank, setBankOfferBank] = useState('');
  const [bankOfferDiscountType, setBankOfferDiscountType] = useState('percentage');
  const [bankOfferDiscountValue, setBankOfferDiscountValue] = useState('15');
  const [bankOfferValidTill, setBankOfferValidTill] = useState('2026-09-30');
  const [walletBkash, setWalletBkash] = useState(true);
  const [walletNagad, setWalletNagad] = useState(false);
  const [walletDiscountType, setWalletDiscountType] = useState('percentage');
  const [walletDiscountValue, setWalletDiscountValue] = useState('90');
  const [walletValidTill, setWalletValidTill] = useState('2026-09-30');

  // Delivery Offers State
  const [deliveryPartner, setDeliveryPartner] = useState('SteadFast');
  const [deliveryOfferTitle, setDeliveryOfferTitle] = useState('৳50 off on Delivery');
  const [deliveryOfferType, setDeliveryOfferType] = useState('Delivery Discount');
  const [deliveryDiscountType, setDeliveryDiscountType] = useState('percentage');
  const [deliveryDiscountValue, setDeliveryDiscountValue] = useState('50');
  const [deliveryMinOrder, setDeliveryMinOrder] = useState('200');
  const [deliveryValidFrom, setDeliveryValidFrom] = useState('2026-09-15');
  const [deliveryValidTill, setDeliveryValidTill] = useState('2026-09-30');
  const [deliveryTerms, setDeliveryTerms] = useState('Valid only for SteadFast delivery. Minimum order ৳200. T&C applied.');
  const [deliveryStatus, setDeliveryStatus] = useState(true);
  const [deliveryNotify, setDeliveryNotify] = useState(true);
  const [deliveryServices, setDeliveryServices] = useState({ SteadFast: true, REDX: false, CarryBee: false });

  const [deliveryOffersList, setDeliveryOffersList] = useState([
    { id: 1, partner: 'SteadFast', title: '৳50 off on Delivery', discount: '৳50', minOrder: '৳200', validTill: '30 Sep 2026', status: 'Active' },
    { id: 2, partner: 'REDX', title: '25% off Delivery', discount: '25%', minOrder: '৳150', validTill: '28 Sep 2026', status: 'Active' },
    { id: 3, partner: 'CarryBee', title: 'Free Delivery', discount: '100%', minOrder: '৳300', validTill: '25 Sep 2026', status: 'Scheduled' },
    { id: 4, partner: 'SteadFast', title: '৳30 off (Min ৳150)', discount: '৳30', minOrder: '৳150', validTill: '20 Sep 2026', status: 'Expired' },
    { id: 5, partner: 'CarryBee', title: '20% off Delivery', discount: '20%', minOrder: '৳200', validTill: '18 Sep 2026', status: 'Active' }
  ]);

  const [deliverySearch, setDeliverySearch] = useState('');
  const [deliveryPartnerFilter, setDeliveryPartnerFilter] = useState('All');
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState('All');

  // Helper function to render realistic delivery partner logos
  const renderDeliveryLogo = (key, style = {}) => {
    const normKey = (key || '').toLowerCase();
    if (normKey.includes('steadfast')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', ...style }}>
          <div style={{ background: '#006837', padding: '4px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 900, fontStyle: 'italic', fontSize: '13px', color: '#ffffff', letterSpacing: '-0.5px' }}>SteadFast</span>
            <span style={{ fontSize: '9px', color: '#4ade80', fontWeight: 700 }}>Courier</span>
          </div>
        </div>
      );
    }
    if (normKey.includes('redx')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', ...style }}>
          <div style={{ background: '#ffffff', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 900, fontSize: '14px', color: '#dc2626', letterSpacing: '0.5px' }}>RED<span style={{ color: '#000000' }}>X</span></span>
            <span style={{ fontSize: '9px', color: '#475569', fontWeight: 700 }}>Delivery</span>
          </div>
        </div>
      );
    }
    if (normKey.includes('carrybee')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', ...style }}>
          <div style={{ background: '#fbbf24', padding: '4px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontWeight: 900, fontSize: '13px', color: '#000000' }}>carry<span style={{ color: '#dc2626' }}>bee</span></span>
            <span style={{ fontSize: '8px', color: '#1e293b', fontWeight: 600 }}>Delivering with Trust</span>
          </div>
        </div>
      );
    }
    return <span style={{ fontWeight: 700, color: '#ffffff' }}>{key}</span>;
  };

  // Helper function to render realistic bank logos
  const renderBankLogo = (key, style = {}) => {
    const normKey = (key || '').toLowerCase();
    if (normKey.includes('brac')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#00529B" />
            <path d="M4 18L12 6L20 18H4Z" fill="#FDB813" />
            <path d="M8 18L12 11L16 18H8Z" fill="#00529B" />
          </svg>
          <span style={{ fontWeight: 800, fontSize: '11px', color: '#00529B', letterSpacing: '-0.2px', fontFamily: 'sans-serif' }}>BRAC BANK</span>
        </div>
      );
    }
    if (normKey.includes('city')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#E11D48" />
            <path d="M7 7H17V10H10V14H16V17H7V7Z" fill="#FFFFFF" />
          </svg>
          <span style={{ fontWeight: 800, fontSize: '11px', color: '#E11D48', fontFamily: 'sans-serif' }}>city bank</span>
        </div>
      );
    }
    if (normKey.includes('dutch') || normKey.includes('dbbl')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#0284C7" />
            <path d="M12 4C14 7 15 10 12 12C9 10 10 7 12 4Z" fill="#16A34A" />
            <path d="M12 20C10 17 9 14 12 12C15 14 14 17 12 20Z" fill="#DC2626" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '9px', color: '#0f172a', lineHeight: 1.1, fontFamily: 'sans-serif' }}>Dutch-Bangla Bank</span>
        </div>
      );
    }
    if (normKey.includes('eastern') || normKey.includes('ebl')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6C4 6 10 4 14 8C18 12 20 18 20 18C20 18 14 20 10 16C6 12 4 6 4 6Z" fill="#16A34A" />
            <path d="M6 8C6 8 11 7 14 10C17 13 18 18 18 18" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '9px', color: '#0284c7', lineHeight: 1.1, fontFamily: 'sans-serif' }}>Eastern Bank PLC.</span>
        </div>
      );
    }
    if (normKey.includes('islami') || normKey.includes('ibbl')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#15803D" strokeWidth="2" fill="#F0FDF4" />
            <path d="M12 6L14 10H10L12 6Z" fill="#15803D" />
            <circle cx="12" cy="14" r="3" fill="#15803D" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '8px', color: '#15803d', lineHeight: 1.1, fontFamily: 'sans-serif' }}>Islami Bank<br />Bangladesh Limited</span>
        </div>
      );
    }
    if (normKey.includes('ucb')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="5" fill="#DC2626" />
            <circle cx="17" cy="12" r="4" fill="#FACC15" />
            <path d="M6 8V13C6 15 8 16 10 16C12 16 14 15 14 13V8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontWeight: 900, fontSize: '13px', color: '#dc2626', fontFamily: 'sans-serif' }}>UCB</span>
        </div>
      );
    }
    if (normKey.includes('standard') || normKey.includes('sc')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 8C5 5 10 5 12 9C14 13 19 13 19 10C19 7 15 6 12 9" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M5 14C5 11 10 11 12 15C14 19 19 19 19 16" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '9px', color: '#0284c7', lineHeight: 1.1, fontFamily: 'sans-serif' }}>Standard<br />Chartered</span>
        </div>
      );
    }
    if (normKey.includes('prime')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', ...style }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 19L12 5L20 19H4Z" fill="#1E3A8A" />
            <path d="M10 19L14 12L18 19H10Z" fill="#E11D48" />
          </svg>
          <span style={{ fontWeight: 800, fontSize: '10px', color: '#1e3a8a', fontFamily: 'sans-serif' }}>Prime Bank</span>
        </div>
      );
    }
    return <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '11px' }}>{key}</span>;
  };

  // Dedicated Bank Offers Page State
  const [bankFormSelectedBank, setBankFormSelectedBank] = useState('BRAC Bank');
  const [bankFormOfferTitle, setBankFormOfferTitle] = useState('');
  const [bankFormPlatforms, setBankFormPlatforms] = useState({ food: true, ride: true, skincare: false, all: false });
  const [bankFormDiscountType, setBankFormDiscountType] = useState('percentage');
  const [bankFormDiscountValue, setBankFormDiscountValue] = useState('15');
  const [bankFormMaxDiscount, setBankFormMaxDiscount] = useState('500');
  const [bankFormMinOrder, setBankFormMinOrder] = useState('300');
  const [bankFormValidFrom, setBankFormValidFrom] = useState('2026-09-15');
  const [bankFormValidTill, setBankFormValidTill] = useState('2026-11-30');
  const [bankFormOfferCode, setBankFormOfferCode] = useState('BRAC15');
  const [bankFormTerms, setBankFormTerms] = useState('Valid on BRAC Bank credit & debit cards. Maximum discount ৳500.');
  const [bankFormStatus, setBankFormStatus] = useState(true);
  const [bankFormFeatured, setBankFormFeatured] = useState(true);

  const [bankOffersSearch, setBankOffersSearch] = useState('');
  const [bankOffersBankFilter, setBankOffersBankFilter] = useState('All');
  const [bankOffersStatusFilter, setBankOffersStatusFilter] = useState('All');

  const [bankOffersList, setBankOffersList] = useState([
    { id: 1, bank: 'BRAC BANK', logoKey: 'brac', title: '15% off on all orders', discount: '15%', validTill: '30 Nov 2026', status: 'Active' },
    { id: 2, bank: 'City Bank', logoKey: 'city', title: '৳200 off (Min ৳500)', discount: '৳200', validTill: '28 Oct 2026', status: 'Active' },
    { id: 3, bank: 'Dutch-Bangla Bank', logoKey: 'dbbl', title: '20% off on ride', discount: '20%', validTill: '25 Sep 2026', status: 'Active' },
    { id: 4, bank: 'Eastern Bank PLC.', logoKey: 'ebl', title: '10% off (Max ৳300)', discount: '10%', validTill: '30 Sep 2026', status: 'Scheduled' },
    { id: 5, bank: 'Islami Bank', logoKey: 'ibbl', title: '15% off on skincare', discount: '15%', validTill: '20 Oct 2026', status: 'Active' },
    { id: 6, bank: 'UCB', logoKey: 'ucb', title: '৳150 off (Min ৳1400)', discount: '৳150', validTill: '18 Oct 2026', status: 'Active' },
    { id: 7, bank: 'Standard Chartered', logoKey: 'sc', title: '20% off (Weekend)', discount: '20%', validTill: '30 Sep 2026', status: 'Expired' },
    { id: 8, bank: 'Prime Bank', logoKey: 'prime', title: '10% off (All)', discount: '10%', validTill: '12 Oct 2026', status: 'Active' }
  ]);

  const [couponSearchText, setCouponSearchText] = useState('');
  const [couponStatusFilter, setCouponStatusFilter] = useState('All');
  const [couponPlatformFilter, setCouponPlatformFilter] = useState('All');
  const [allCoupons, setAllCoupons] = useState([
    { id: 1, title: '20% off on all orders', platform: 'food', merchant: 'foodpanda', merchantIcon: '🐼', discount: '20%', validTill: '30 Sep 2026', status: 'Active' },
    { id: 2, title: 'Flat 50 BDT cashback', platform: 'ride', merchant: 'Uber', merchantIcon: '🚘', discount: '৳50', validTill: '20 Sep 2026', status: 'Active' },
    { id: 3, title: 'Buy 1 Get 1', platform: 'skincare', merchant: 'Kirei', merchantIcon: '✨', discount: '50%', validTill: '30 Sep 2026', status: 'Active' },
    { id: 4, title: '15% off with BRAC Bank', platform: 'food', merchant: 'BRAC BANK', merchantIcon: '🏦', discount: '15%', validTill: '30 Sep 2026', status: 'Scheduled' },
    { id: 5, title: '40% off (Nagad)', platform: 'ride', merchant: 'Nagad', merchantIcon: '💳', discount: '40%', validTill: '20 Sep 2026', status: 'Active' }
  ]);

  const filteredUsers = usersList.filter(u => {
    const matchesFilter =
      userFilterTab === 'all' ||
      (userFilterTab === 'active' && u.status === 'Active') ||
      (userFilterTab === 'suspended' && u.status === 'Suspended') ||
      (userFilterTab === 'reported' && u.status === 'Reported');

    const matchesSearch =
      userSearchText === '' ||
      u.name.toLowerCase().includes(userSearchText.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchText.toLowerCase()) ||
      u.phone.includes(userSearchText);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-root-dark">
      {/* Top Header Navbar */}
      <header className="admin-navbar-dark">
        <div className="admin-nav-left">
          <div className="logo-wrapper">
            <div className="logo-icon pink-badge">
              <Percent size={20} strokeWidth={3} />
            </div>
            <div className="logo-text text-white">
              Offer<span>Matrix</span>
              <span className="admin-sub-tag">Admin Panel</span>
            </div>
          </div>

          <div className="admin-search-wrapper">
            <Search size={16} color="#64748b" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search merchants, users, offers, complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-shortcut-pill">Ctrl + K</span>
          </div>
        </div>

        <div className="admin-nav-right">
          <button className="admin-icon-btn" title="Notifications">
            <Bell size={18} color="#94a3b8" />
            <span className="admin-bell-badge">12</span>
          </button>

          <div className="admin-user-profile">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
              alt="Admin Profile"
              className="admin-avatar-img"
            />
            <div className="admin-user-info">
              <span className="admin-name">Admin</span>
              <span className="admin-role-title">Super Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-layout-body">
        {/* Left Sidebar Navigation */}
        <aside className="admin-sidebar-dark">
          <ul className="admin-menu-list">
            <li
              className={`admin-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={18} />
              <span>Users</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'merchants' ? 'active' : ''}`}
              onClick={() => { setActiveTab('merchants'); onToast('Opened Merchants Management'); }}
            >
              <Store size={18} />
              <span>Merchants</span>
            </li>

            {/* Food Menu Item with Sub-items */}
            <li
              className={`admin-menu-item ${activeTab === 'food' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('food');
                setIsFoodSubOpen(!isFoodSubOpen);
              }}
            >
              <Utensils size={18} />
              <span>Food</span>
              {isFoodSubOpen ? (
                <ChevronUp size={14} className="menu-arrow" />
              ) : (
                <ChevronRight size={14} className="menu-arrow" />
              )}
            </li>

            {/* Sub-menu items for Food */}
            {isFoodSubOpen && (
              <div className="admin-sub-menu-list">
                <div
                  className={`sub-menu-item ${activeFoodSubTab === 'all' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('food'); setActiveFoodSubTab('all'); }}
                >
                  <span className="bullet">•</span>
                  <span>All Platforms</span>
                </div>
                <div
                  className={`sub-menu-item ${activeFoodSubTab === 'foodpanda' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('foodpanda')}
                >
                  <span className="bullet">•</span>
                  <span>Foodpanda</span>
                </div>
                <div
                  className={`sub-menu-item ${activeFoodSubTab === 'foodi' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('foodi')}
                >
                  <span className="bullet">•</span>
                  <span>Foodi</span>
                </div>
                <div
                  className={`sub-menu-item ${activeFoodSubTab === 'pathao' ? 'active' : ''}`}
                  onClick={() => handleSelectPlatform('pathao')}
                >
                  <span className="bullet">•</span>
                  <span>Pathao</span>
                </div>
              </div>
            )}

            {/* Ride Menu Item with Sub-items */}
            <li
              className={`admin-menu-item ${activeTab === 'ride' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('ride');
                setIsRideSubOpen(!isRideSubOpen);
              }}
            >
              <Car size={18} />
              <span>Ride</span>
              {isRideSubOpen ? (
                <ChevronUp size={14} className="menu-arrow" />
              ) : (
                <ChevronRight size={14} className="menu-arrow" />
              )}
            </li>

            {/* Sub-menu items for Ride */}
            {isRideSubOpen && (
              <div className="admin-sub-menu-list">
                <div
                  className={`sub-menu-item ${activeRideSubTab === 'all' && activeTab === 'ride' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('ride'); setActiveRideSubTab('all'); }}
                >
                  <span className="bullet">•</span>
                  <span>All Platforms</span>
                </div>
                <div
                  className={`sub-menu-item ${activeRideSubTab === 'uber' && activeTab === 'ride' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('ride'); handleSelectRidePlatform('uber'); }}
                >
                  <span className="bullet">•</span>
                  <span>Uber</span>
                </div>
                <div
                  className={`sub-menu-item ${activeRideSubTab === 'obhai' && activeTab === 'ride' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('ride'); handleSelectRidePlatform('obhai'); }}
                >
                  <span className="bullet">•</span>
                  <span>OBHAI</span>
                </div>
                <div
                  className={`sub-menu-item ${activeRideSubTab === 'indriver' && activeTab === 'ride' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('ride'); handleSelectRidePlatform('indriver'); }}
                >
                  <span className="bullet">•</span>
                  <span>inDriver</span>
                </div>
              </div>
            )}

            {/* Skincare Menu Item with Sub-items */}
            <li
              className={`admin-menu-item ${activeTab === 'skincare' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('skincare');
                setIsSkincareSubOpen(!isSkincareSubOpen);
              }}
            >
              <Sparkles size={18} />
              <span>Skincare</span>
              {isSkincareSubOpen ? (
                <ChevronUp size={14} className="menu-arrow" />
              ) : (
                <ChevronRight size={14} className="menu-arrow" />
              )}
            </li>

            {/* Sub-menu items for Skincare */}
            {isSkincareSubOpen && (
              <div className="admin-sub-menu-list">
                <div
                  className={`sub-menu-item ${activeSkincareSubTab === 'all' && activeTab === 'skincare' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('skincare'); setActiveSkincareSubTab('all'); }}
                >
                  <span className="bullet">•</span>
                  <span>All Platforms</span>
                </div>
                <div
                  className={`sub-menu-item ${activeSkincareSubTab === 'choice_legacy' && activeTab === 'skincare' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('skincare'); setActiveSkincareSubTab('choice_legacy'); setSelectedSkincarePlatform('choice_legacy'); onToast('Switched to Choice Legacy'); }}
                >
                  <span className="bullet">•</span>
                  <span>Choice Legacy</span>
                </div>
                <div
                  className={`sub-menu-item ${activeSkincareSubTab === 'kirei' && activeTab === 'skincare' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('skincare'); setActiveSkincareSubTab('kirei'); setSelectedSkincarePlatform('kirei'); onToast('Switched to Kirei'); }}
                >
                  <span className="bullet">•</span>
                  <span>Kirei</span>
                </div>
                <div
                  className={`sub-menu-item ${activeSkincareSubTab === 'makeup_chari' && activeTab === 'skincare' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('skincare'); setActiveSkincareSubTab('makeup_chari'); setSelectedSkincarePlatform('makeup_chari'); onToast('Switched to Makeup Chari'); }}
                >
                  <span className="bullet">•</span>
                  <span>Makeup Chari</span>
                </div>
              </div>
            )}

            {/* Offers & Coupons Menu with Sub-items */}
            <li
              className={`admin-menu-item ${activeTab === 'coupons' ? 'active' : ''}`}
              style={{ color: activeTab === 'coupons' ? '#ec4899' : '' }}
              onClick={() => {
                setActiveTab('coupons');
                if (!activeCouponSubTab || activeCouponSubTab === 'all') {
                  setActiveCouponSubTab('delivery');
                }
                setIsCouponsSubOpen(!isCouponsSubOpen);
              }}
            >
              <Ticket size={18} />
              <span>Offers &amp; Coupons</span>
              {isCouponsSubOpen ? (
                <ChevronUp size={14} className="menu-arrow" />
              ) : (
                <ChevronRight size={14} className="menu-arrow" />
              )}
            </li>

            {/* Offers & Coupons Sub-menu */}
            {isCouponsSubOpen && (
              <div className="admin-sub-menu-list">
                {[['all', 'All Offers'], ['create', 'Create New Offer'], ['bank', 'Bank Offers'], ['wallet', 'bKash & Nagad'], ['delivery', 'Delivery Offers'], ['manage', 'Manage Coupons']].map(([key, label]) => (
                  <div
                    key={key}
                    className={`sub-menu-item ${activeCouponSubTab === key && activeTab === 'coupons' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('coupons'); setActiveCouponSubTab(key); }}
                  >
                    <span className="bullet">•</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}

            <li
              className={`admin-menu-item ${activeTab === 'complaints' ? 'active' : ''}`}
              onClick={() => { setActiveTab('complaints'); onToast('Opened Complaints Center'); }}
            >
              <MessageSquare size={18} />
              <span>Complaints</span>
              <span className="admin-badge-red">28</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => { setActiveTab('reviews'); onToast('Opened Reviews & Feedback'); }}
            >
              <Star size={18} />
              <span>Reviews & Feedback</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => { setActiveTab('reports'); onToast('Opened Reports & Analytics'); }}
            >
              <BarChart2 size={18} />
              <span>Reports & Analytics</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => { setActiveTab('notifications'); onToast('Opened Notifications'); }}
            >
              <Bell size={18} />
              <span>Notifications</span>
              <span className="admin-badge-red">12</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => { setActiveTab('content'); onToast('Opened Manage Content'); }}
            >
              <FileText size={18} />
              <span>Manage Content</span>
            </li>

            <li
              className={`admin-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => { setActiveTab('settings'); onToast('Opened Settings'); }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </li>

            <li className="admin-menu-item logout-item" onClick={onLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </li>
          </ul>

          <div className="admin-sidebar-card">
            <div className="crown-badge">👑 Admin Control</div>
            <div className="sidebar-card-title">
              {activeTab === 'ride' ? 'Manage Rides' : activeTab === 'skincare' ? 'Manage Skincare Offers' : 'Manage Offers'}
            </div>
            <div className="sidebar-card-sub">
              {activeTab === 'ride' ? 'Better Deals for Everyone' : activeTab === 'skincare' ? 'Build a More Beautiful Marketplace' : 'Build a Better Marketplace'}
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="admin-main-content">

          {/* =========================================================
             0. USERS MANAGEMENT PAGE (PIXEL PERFECT MATCH WITH SCREENSHOT 2)
             ========================================================= */}
          {activeTab === 'users' ? (
            <div className="users-management-page" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', color: '#ffffff' }}>
              
              {/* Header Title & Add New User Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                    Dashboard &gt; <span style={{ color: '#38bdf8', fontWeight: 600 }}>Users</span>
                  </div>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#ffffff', letterSpacing: '-0.5px' }}>
                    Users Management
                  </h1>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0 0' }}>
                    View, manage and take action on all users. Keep the community safe and trusted.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
                  }}
                >
                  <Plus size={16} />
                  <span>Add New User</span>
                </button>
              </div>

              {/* 4 Metric KPI Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {/* Total Users */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={22} color="#ffffff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Total Users</span>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '2px 0 0 0', color: '#ffffff' }}>12,480</h3>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>↑ 12% vs last month</span>
                  </div>
                </div>

                {/* Active Users */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Store size={22} color="#ffffff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Active Users</span>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '2px 0 0 0', color: '#ffffff' }}>11,210</h3>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>↑ 10% vs last month</span>
                  </div>
                </div>

                {/* Suspended Users */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserX size={22} color="#ffffff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Suspended Users</span>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '2px 0 0 0', color: '#ffffff' }}>320</h3>
                    <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>↑ 5% vs last month</span>
                  </div>
                </div>

                {/* Reported Users */}
                <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={22} color="#ffffff" />
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Reported Users</span>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '2px 0 0 0', color: '#ffffff' }}>156</h3>
                    <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600 }}>↑ 18% vs last month</span>
                  </div>
                </div>
              </div>

              {/* Main Content Split: Left Table & Right User Details Panel */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>

                {/* Left Side: Table & Filters */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Filter Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    
                    {/* Status Tabs */}
                    <div style={{ display: 'flex', gap: '4px', backgroundColor: '#0f172a', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                      <button
                        onClick={() => setUserFilterTab('all')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: userFilterTab === 'all' ? '#0284c7' : 'transparent',
                          color: userFilterTab === 'all' ? '#ffffff' : '#94a3b8'
                        }}
                      >
                        All Users (12,480)
                      </button>
                      <button
                        onClick={() => setUserFilterTab('active')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: userFilterTab === 'active' ? '#0284c7' : 'transparent',
                          color: userFilterTab === 'active' ? '#ffffff' : '#94a3b8'
                        }}
                      >
                        Active (11,210)
                      </button>
                      <button
                        onClick={() => setUserFilterTab('suspended')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: userFilterTab === 'suspended' ? '#0284c7' : 'transparent',
                          color: userFilterTab === 'suspended' ? '#ffffff' : '#94a3b8'
                        }}
                      >
                        Suspended (320)
                      </button>
                      <button
                        onClick={() => setUserFilterTab('reported')}
                        style={{
                          padding: '6px 14px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: userFilterTab === 'reported' ? '#0284c7' : 'transparent',
                          color: userFilterTab === 'reported' ? '#ffffff' : '#94a3b8'
                        }}
                      >
                        Reported (156)
                      </button>
                    </div>

                    {/* Right Controls: Filter button & Search Bar */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#0f172a',
                          border: '1px solid #1e293b',
                          color: '#e2e8f0',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        <Filter size={14} />
                        <span>Filter</span>
                      </button>

                      <div style={{ position: 'relative' }}>
                        <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="text"
                          placeholder="Search user by name, email, phone..."
                          value={userSearchText}
                          onChange={(e) => setUserSearchText(e.target.value)}
                          style={{
                            backgroundColor: '#0f172a',
                            border: '1px solid #1e293b',
                            borderRadius: '8px',
                            padding: '8px 12px 8px 34px',
                            color: '#ffffff',
                            fontSize: '12px',
                            width: '260px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          <th style={{ padding: '12px 14px', width: '36px', textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={selectedCheckboxes.length === usersList.filter(u => userFilterTab === 'all' ? true : userFilterTab === 'active' ? u.status === 'Active' : userFilterTab === 'suspended' ? u.status === 'Suspended' : u.status === 'Reported').length && usersList.length > 0}
                              onChange={(e) => {
                                const currentFiltered = usersList.filter(u => userFilterTab === 'all' ? true : userFilterTab === 'active' ? u.status === 'Active' : userFilterTab === 'suspended' ? u.status === 'Suspended' : u.status === 'Reported');
                                if (e.target.checked) {
                                  setSelectedCheckboxes(currentFiltered.map(u => u.id));
                                } else {
                                  setSelectedCheckboxes([]);
                                }
                              }}
                            />
                          </th>
                          <th style={{ padding: '12px 14px', width: '36px', color: '#64748b' }}>#</th>
                          <th style={{ padding: '12px 14px' }}>User</th>
                          <th style={{ padding: '12px 14px' }}>Contact</th>
                          <th style={{ padding: '12px 14px' }}>Joined Date</th>
                          <th style={{ padding: '12px 14px' }}>Status</th>
                          <th style={{ padding: '12px 14px' }}>Complaints</th>
                          <th style={{ padding: '12px 14px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList
                          .filter(u => {
                            const matchesTab = userFilterTab === 'all' ? true :
                              userFilterTab === 'active' ? u.status === 'Active' :
                              userFilterTab === 'suspended' ? u.status === 'Suspended' :
                              userFilterTab === 'reported' ? u.status === 'Reported' : true;
                            const matchesSearch = u.name.toLowerCase().includes(userSearchText.toLowerCase()) ||
                              u.email.toLowerCase().includes(userSearchText.toLowerCase()) ||
                              u.phone.toLowerCase().includes(userSearchText.toLowerCase());
                            return matchesTab && matchesSearch;
                          })
                          .map((user, idx) => {
                            const isSelected = selectedUser?.id === user.id;
                            return (
                              <tr
                                key={user.id}
                                onClick={() => { setSelectedUser(user); setShowUserDetails(true); }}
                                style={{
                                  borderBottom: '1px solid #1e293b',
                                  backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.15s ease'
                                }}
                              >
                                <td style={{ padding: '12px 14px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    checked={selectedCheckboxes.includes(user.id)}
                                    onChange={() => handleToggleCheckbox(user.id)}
                                  />
                                </td>
                                <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px' }}>{idx + 1}</td>
                                <td style={{ padding: '12px 14px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img
                                      src={user.avatar}
                                      alt={user.name}
                                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #334155' }}
                                    />
                                    <div>
                                      <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '13px' }}>{user.name}</div>
                                      <div style={{ fontSize: '11px', color: '#64748b' }}>{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: '12px 14px', color: '#cbd5e1', fontSize: '12px' }}>{user.phone}</td>
                                <td style={{ padding: '12px 14px', color: '#cbd5e1', fontSize: '12px' }}>{user.joined}</td>
                                <td style={{ padding: '12px 14px' }}>
                                  {user.status === 'Active' && (
                                    <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                                      Active
                                    </span>
                                  )}
                                  {user.status === 'Reported' && (
                                    <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                                      Reported
                                    </span>
                                  )}
                                  {user.status === 'Suspended' && (
                                    <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
                                      Suspended
                                    </span>
                                  )}
                                </td>
                                <td style={{ padding: '12px 14px', fontWeight: 600, color: user.complaints > 0 ? '#ef4444' : '#64748b', fontSize: '13px' }}>
                                  {user.complaints}
                                </td>
                                <td style={{ padding: '12px 14px' }} onClick={(e) => e.stopPropagation()}>
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                    <button
                                      onClick={() => { setSelectedUser(user); setShowUserDetails(true); }}
                                      style={{
                                        backgroundColor: '#0f2b48',
                                        color: '#38bdf8',
                                        border: '1px solid #0284c7',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      View
                                    </button>
                                    <button
                                      onClick={() => handleAction(user, 'warn')}
                                      style={{
                                        backgroundColor: '#3f2e06',
                                        color: '#fbbf24',
                                        border: '1px solid #d97706',
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Warn
                                    </button>
                                    {user.status === 'Suspended' ? (
                                      <button
                                        onClick={() => handleAction(user, 'activate')}
                                        style={{
                                          backgroundColor: '#063726',
                                          color: '#34d399',
                                          border: '1px solid #10b981',
                                          padding: '4px 10px',
                                          borderRadius: '6px',
                                          fontSize: '11px',
                                          fontWeight: 600,
                                          cursor: 'pointer'
                                        }}
                                      >
                                        Activate
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => handleAction(user, 'suspend')}
                                        style={{
                                          backgroundColor: '#3b0707',
                                          color: '#f87171',
                                          border: '1px solid #dc2626',
                                          padding: '4px 10px',
                                          borderRadius: '6px',
                                          fontSize: '11px',
                                          fontWeight: 600,
                                          cursor: 'pointer'
                                        }}
                                      >
                                        Suspend
                                      </button>
                                    )}
                                    <button style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
                                      <MoreVertical size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    {/* Table Footer Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderTop: '1px solid #1e293b', fontSize: '12px', color: '#94a3b8' }}>
                      <div>Showing 1 to 10 of 12,480 users</div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>&lt;</button>
                        <button style={{ backgroundColor: '#0284c7', border: 'none', color: '#ffffff', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>1</button>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>2</button>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>3</button>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>4</button>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>5</button>
                        <span>...</span>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}>1248</button>
                        <button style={{ backgroundColor: '#1e293b', border: 'none', color: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>&gt;</button>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span>Show</span>
                        <select style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#ffffff', borderRadius: '4px', padding: '2px 6px', fontSize: '12px' }}>
                          <option>10</option>
                          <option>25</option>
                          <option>50</option>
                        </select>
                        <span>per page</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Side Panel: User Details */}
                {showUserDetails && selectedUser && (
                  <div style={{ width: '330px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#ffffff' }}>User Details</h3>
                      <button onClick={() => setShowUserDetails(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>

                    {/* Profile Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0284c7' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#ffffff' }}>{selectedUser.name}</h4>
                          <span style={{
                            backgroundColor: selectedUser.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : selectedUser.status === 'Reported' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: selectedUser.status === 'Active' ? '#34d399' : selectedUser.status === 'Reported' ? '#fbbf24' : '#f87171',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '10px'
                          }}>
                            {selectedUser.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                          <Mail size={12} /> <span>{selectedUser.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          <Phone size={12} /> <span>{selectedUser.phone}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                          <Clock size={12} /> <span>Joined: {selectedUser.joined}</span>
                        </div>
                      </div>
                    </div>

                    {/* 4 Stat Boxes (2x2 Grid) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{selectedUser.details?.complaintsCount ?? selectedUser.complaints}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Total Complaints</div>
                      </div>
                      <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{selectedUser.details?.reviewsCount ?? 5}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Total Reviews</div>
                      </div>
                      <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{selectedUser.details?.offersUsed ?? 12}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Offers Used</div>
                      </div>
                      <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>{selectedUser.details?.savedDeals ?? 3}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>Saved Deals</div>
                      </div>
                    </div>

                    {/* Recent Complaints */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Recent Complaints</span>
                        <span style={{ fontSize: '11px', color: '#38bdf8', cursor: 'pointer' }}>View All</span>
                      </div>
                      {selectedUser.details?.recentComplaints && selectedUser.details.recentComplaints.length > 0 ? (
                        selectedUser.details.recentComplaints.map((c, i) => (
                          <div key={i} style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#831843', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <AlertCircle size={16} color="#f43f5e" />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {c.title}
                              </div>
                              <div style={{ fontSize: '10px', color: '#94a3b8' }}>{c.sub}</div>
                            </div>
                            <div style={{ fontSize: '10px', color: '#64748b' }}>{c.date}</div>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', padding: '6px 0' }}>No complaints filed</div>
                      )}
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', display: 'block', marginBottom: '10px' }}>Recent Activity</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(selectedUser.details?.recentActivity || [
                          { title: 'Logged in from Dhaka, BD', date: 'Today, 10:24 AM', color: '#10b981' },
                          { title: 'Account created', date: '12 Aug 2026', color: '#3b82f6' }
                        ]).map((act, i) => (
                          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: act.color || '#10b981', marginTop: '4px' }} />
                            <div>
                              <div style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 500 }}>{act.title}</div>
                              <div style={{ fontSize: '10px', color: '#64748b' }}>{act.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => setIsSendMessageModalOpen(true)}
                        style={{
                          width: '100%',
                          backgroundColor: '#0284c7',
                          color: '#ffffff',
                          border: 'none',
                          padding: '10px',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Send size={14} />
                        <span>Send Message</span>
                      </button>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleAction(selectedUser, 'warn')}
                          style={{
                            flex: 1,
                            backgroundColor: '#451a03',
                            color: '#fbbf24',
                            border: '1px solid #d97706',
                            padding: '8px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '11px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <AlertTriangle size={12} />
                          <span>Warn User</span>
                        </button>

                        <button
                          onClick={() => handleAction(selectedUser, selectedUser.status === 'Suspended' ? 'activate' : 'suspend')}
                          style={{
                            flex: 1,
                            backgroundColor: selectedUser.status === 'Suspended' ? '#064e3b' : '#450a0a',
                            color: selectedUser.status === 'Suspended' ? '#34d399' : '#f87171',
                            border: selectedUser.status === 'Suspended' ? '1px solid #10b981' : '1px solid #ef4444',
                            padding: '8px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '11px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          {selectedUser.status === 'Suspended' ? <UserCheck size={12} /> : <UserX size={12} />}
                          <span>{selectedUser.status === 'Suspended' ? 'Activate User' : 'Suspend User'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          ) : activeTab === 'ride' ? (
            <div className="food-page-container">

              {/* Header Banner & Stats Row */}
              <div className="food-header-row">
                <div className="food-title-box">
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb" style={{ color: '#3b82f6' }}>Ride</span>
                  </div>
                  <div className="food-heading-flex">
                    <div className="blue-icon-square" style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Car size={22} color="#ffffff" />
                    </div>
                    <div>
                      <h1 className="users-main-title">Ride Platforms</h1>
                      <p className="users-main-sub">
                        Manage ride sharing partners, set offers, update discounts and bring the best ride deals to users.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Ride Offers Stat Box */}
                <div className="total-food-offers-card">
                  <div className="stat-pink-icon" style={{ background: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(37, 99, 235, 0.3)' }}>
                    <Tag size={20} color="#3b82f6" />
                  </div>
                  <div>
                    <span className="stat-pink-label" style={{ color: '#93c5fd' }}>Total Ride Offers</span>
                    <h3 className="stat-pink-value">182</h3>
                    <span className="stat-pink-growth" style={{ color: '#34d399' }}>↑ 22% this month</span>
                  </div>
                </div>

                {/* Ride Smarter Save More Hero Promo Banner */}
                <div className="food-promo-hero-card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid #334155' }}>
                  <div className="food-hero-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=240&q=80"
                      alt="Ride Smarter"
                      className="food-hero-img"
                    />
                  </div>
                  <div className="food-hero-text">
                    <span className="hero-quote-bold" style={{ color: '#ffffff' }}>Ride Smarter</span>
                    <span className="hero-quote-sub" style={{ color: '#60a5fa' }}>Save More ♡</span>
                  </div>
                </div>
              </div>

              {/* 3 Real Ride Platform Cards Grid */}
              <div className="food-platforms-grid">

                {/* 1. UBER CARD */}
                <div
                  className={`food-platform-card ${selectedRidePlatform === 'uber' ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectRidePlatform('uber')}
                >
                  <div className="platform-banner-top" style={{ background: '#ffffff', color: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <span style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: '#000000', letterSpacing: '-1px' }}>Uber</span>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Uber</h3>
                    <p className="p-card-sub">Go Anywhere With Uber</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. OBHAI CARD */}
                <div
                  className={`food-platform-card ${selectedRidePlatform === 'obhai' ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectRidePlatform('obhai')}
                >
                  <div className="platform-banner-top" style={{ background: '#ffffff', color: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#000000', letterSpacing: '0.5px' }}>OBHAI</span>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>পৌঁছে দেব</span>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">OBHAI</h3>
                    <p className="p-card-sub">Rides for a Better Tomorrow</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. INDRIVER CARD */}
                <div
                  className={`food-platform-card ${selectedRidePlatform === 'indriver' ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectRidePlatform('indriver')}
                >
                  <div className="platform-banner-top" style={{ background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>iD</div>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>inDriver</span>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">inDriver</h3>
                    <p className="p-card-sub">Your Ride, Your Price</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Flex Grid: Left Ride Offers Table + Right Add/Update Ride Offer Form */}
              <div className="food-content-split">

                {/* Left Side: Current Offers Table for Selected Platform */}
                <div className="food-offers-table-box">
                  <div className="offers-table-header">
                    <div className="table-header-title flex-gap">
                      <div className="pink-icon-square" style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#2563eb' }}>
                        <Car size={16} color="#ffffff" />
                      </div>
                      <h3>Current Offers - {rideBrandInfo.name}</h3>
                    </div>
                    <span className="link-view-all" style={{ color: '#3b82f6' }}>View All</span>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '38px' }}><input type="checkbox" /></th>
                          <th style={{ width: '32px' }}>#</th>
                          <th>Offer Title</th>
                          <th>Discount</th>
                          <th>Valid Till</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeRideOffers.map((offer, idx) => (
                          <tr key={offer.id} className="user-table-row">
                            <td><input type="checkbox" /></td>
                            <td className="col-num">{idx + 1}</td>
                            <td style={{ fontWeight: 700, color: '#ffffff' }}>{offer.title}</td>
                            <td style={{ fontWeight: 800, color: '#60a5fa' }}>{offer.discount}</td>
                            <td className="col-date">{offer.validTill}</td>
                            <td>
                              <span className={`status-badge-pill ${offer.status.toLowerCase()}`}>
                                {offer.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons-flex">
                                <button
                                  className="btn-action-icon edit"
                                  title="Edit Offer"
                                  onClick={() => {
                                    setRideOfferTitle(offer.title);
                                    onToast(`Editing ${offer.title} for ${rideBrandInfo.name}`);
                                  }}
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  className="btn-action-icon delete"
                                  title="Delete Offer"
                                  onClick={() => handleDeleteRideOffer(offer.id)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="table-pagination-footer">
                    <span>Showing 1 to {activeRideOffers.length} of {activeRideOffers.length} offers</span>
                    <div className="pagination-pills">
                      <button className="page-pill-btn">&lt;</button>
                      <button className="page-pill-btn active" style={{ background: '#2563eb' }}>1</button>
                      <button className="page-pill-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Add / Update Offer Form for Selected Platform */}
                <div className="food-offer-form-card">
                  <div className="form-card-header">
                    <div className="pink-icon-square" style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#2563eb' }}>
                      <Car size={16} color="#ffffff" />
                    </div>
                    <h3>Add / Update {rideBrandInfo.name} Offer</h3>
                  </div>

                  <form onSubmit={handlePublishRideOffer} className="admin-offer-form">
                    <div className="form-group">
                      <label>Offer Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={`e.g. 20% off on 3 ${rideBrandInfo.name} Rides`}
                        value={rideOfferTitle}
                        onChange={(e) => setRideOfferTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Offer Type *</label>
                      <select
                        className="form-select"
                        value={rideOfferType}
                        onChange={(e) => setRideOfferType(e.target.value)}
                      >
                        <option value="Select Offer Type">Select Offer Type</option>
                        <option value="Percentage Discount">Percentage Discount</option>
                        <option value="Flat Cashback">Flat Cashback</option>
                        <option value="Airport Ride Special">Airport Ride Special</option>
                        <option value="Weekend Discount">Weekend Discount</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Discount Type *</label>
                      <div className="radio-options-row">
                        <label className={`radio-pill-label ${rideDiscountType === 'percentage' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="rideDiscountType"
                            checked={rideDiscountType === 'percentage'}
                            onChange={() => setRideDiscountType('percentage')}
                          />
                          <span>Percentage (%)</span>
                        </label>
                        <label className={`radio-pill-label ${rideDiscountType === 'fixed' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="rideDiscountType"
                            checked={rideDiscountType === 'fixed'}
                            onChange={() => setRideDiscountType('fixed')}
                          />
                          <span>Fixed Amount (৳)</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Discount Value *</label>
                      <div className="suffix-input-wrap">
                        <input
                          type="number"
                          className="form-input"
                          value={rideDiscountValue}
                          onChange={(e) => setRideDiscountValue(e.target.value)}
                          required
                        />
                        <span className="input-suffix-tag">{rideDiscountType === 'percentage' ? '%' : '৳'}</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Minimum Ride Amount (৳)</label>
                      <div className="suffix-input-wrap">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 100"
                          value={rideMinAmount}
                          onChange={(e) => setRideMinAmount(e.target.value)}
                        />
                        <span className="input-suffix-tag">৳</span>
                      </div>
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label>Valid From *</label>
                        <input
                          type="date"
                          className="form-input"
                          value={rideValidFrom}
                          onChange={(e) => setRideValidFrom(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Valid Till *</label>
                        <input
                          type="date"
                          className="form-input"
                          value={rideValidTill}
                          onChange={(e) => setRideValidTill(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder={`e.g. Get ${rideDiscountValue}% off on all ${rideBrandInfo.name} rides. T&C applied.`}
                        value={rideDescription}
                        onChange={(e) => setRideDescription(e.target.value)}
                        maxLength={200}
                      ></textarea>
                      <span className="char-count-text">{rideDescription.length}/200</span>
                    </div>

                    <div className="form-toggle-row">
                      <span className="toggle-label">Status</span>
                      <div
                        className={`toggle-switch-bar ${rideOfferStatus ? 'active' : ''}`}
                        onClick={() => setRideOfferStatus(!rideOfferStatus)}
                        style={{ background: rideOfferStatus ? '#2563eb' : '#334155' }}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                      <span className="status-text-bold">{rideOfferStatus ? 'Active' : 'Inactive'}</span>
                    </div>

                    <div className="form-actions-row">
                      <button
                        type="button"
                        className="btn-form-cancel"
                        onClick={() => onToast('Cancelled ride offer editing')}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-form-publish-pink" style={{ background: '#2563eb', color: '#ffffff' }}>
                        <Send size={15} />
                        <span>Publish Offer</span>
                      </button>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          ) : activeTab === 'skincare' ? (
            /* =========================================================
               SKINCARE PLATFORMS PAGE (PIXEL PERFECT MATCH WITH SCREENSHOT)
               ========================================================= */
            <div className="food-page-container">

              {/* Header Banner & Stats Row */}
              <div className="food-header-row">
                <div className="food-title-box">
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb" style={{ color: '#ec4899' }}>Skincare</span>
                  </div>
                  <div className="food-heading-flex">
                    <div className="pink-icon-square" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #ec4899, #f472b6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={22} color="#ffffff" />
                    </div>
                    <div>
                      <h1 className="users-main-title">Skincare Platforms</h1>
                      <p className="users-main-sub">
                        Manage skincare partners, set offers, update discounts and bring the best beauty deals to users.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Skincare Offers Stat Box */}
                <div className="total-food-offers-card">
                  <div className="stat-pink-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                    <Tag size={20} color="#ec4899" />
                  </div>
                  <div>
                    <span className="stat-pink-label" style={{ color: '#f9a8d4' }}>Total Skincare Offers</span>
                    <h3 className="stat-pink-value">156</h3>
                    <span className="stat-pink-growth" style={{ color: '#34d399' }}>↑ 28% this month</span>
                  </div>
                </div>

                {/* Beauty Deals Brighter You Hero Promo Banner */}
                <div className="food-promo-hero-card" style={{ background: 'linear-gradient(135deg, #fff1f8, #fce7f3)', border: '1px solid #fbcfe8' }}>
                  <div className="food-hero-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=240&q=80"
                      alt="Skincare Beauty"
                      className="food-hero-img"
                    />
                  </div>
                  <div className="food-hero-text">
                    <span className="hero-quote-bold" style={{ color: '#be185d' }}>Beauty Deals</span>
                    <span className="hero-quote-sub" style={{ color: '#db2777' }}>Brighter You</span>
                    <span style={{ fontSize: '11px', color: '#9d174d', marginTop: '2px', display: 'block' }}>Skincare for a Healthier, Happier You</span>
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '14px', color: '#ec4899', fontSize: '18px' }}>♡</div>
                </div>
              </div>

              {/* 3 Skincare Platform Cards Grid */}
              <div className="food-platforms-grid">

                {/* 1. CHOICE LEGACY CARD */}
                <div
                  className={`food-platform-card ${selectedSkincarePlatform === 'choice_legacy' ? 'selected-platform' : ''}`}
                  onClick={() => { setSelectedSkincarePlatform('choice_legacy'); setActiveSkincareSubTab('choice_legacy'); setSkincareOfferTitle('Flat 20% off on All Skincare Products'); onToast('Switched to Choice Legacy'); }}
                >
                  <div className="platform-banner-top" style={{ background: 'linear-gradient(135deg, #bfdbfe, #93c5fd)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 900, color: '#1e3a5f', lineHeight: 1 }}>Choice</div>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 900, color: '#1e3a5f', letterSpacing: '3px' }}>LEGACY</div>
                      <div style={{ fontSize: '9px', color: '#3b82f6', marginTop: '3px', letterSpacing: '1.5px' }}>Your Ultimate Beauty Destination</div>
                    </div>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Choice Legacy</h3>
                    <p className="p-card-sub">Your Ultimate Beauty Destination</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow"><ArrowRight size={16} /></button>
                    </div>
                  </div>
                </div>

                {/* 2. KIREI CARD */}
                <div
                  className={`food-platform-card ${selectedSkincarePlatform === 'kirei' ? 'selected-platform' : ''}`}
                  onClick={() => { setSelectedSkincarePlatform('kirei'); setActiveSkincareSubTab('kirei'); setSkincareOfferTitle('Kirei Glow Offer 25% OFF'); onToast('Switched to Kirei'); }}
                >
                  <div className="platform-banner-top" style={{ background: 'linear-gradient(135deg, #fff7ed, #fef3c7)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '30px', fontWeight: 700, color: '#c2410c', fontStyle: 'italic', lineHeight: 1 }}>Kirei</div>
                      <div style={{ fontSize: '10px', color: '#92400e', marginTop: '3px', letterSpacing: '1px' }}>Simply Caring</div>
                    </div>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Kirei</h3>
                    <p className="p-card-sub">Simply Caring</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow"><ArrowRight size={16} /></button>
                    </div>
                  </div>
                </div>

                {/* 3. MAKEUP CHARI CARD */}
                <div
                  className={`food-platform-card ${selectedSkincarePlatform === 'makeup_chari' ? 'selected-platform' : ''}`}
                  onClick={() => { setSelectedSkincarePlatform('makeup_chari'); setActiveSkincareSubTab('makeup_chari'); setSkincareOfferTitle('Makeup Chari Flash 20% OFF'); onToast('Switched to Makeup Chari'); }}
                >
                  <div className="platform-banner-top" style={{ background: '#ffffff', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: 900, color: '#7c3aed', fontFamily: "'Outfit', sans-serif", letterSpacing: '-1px', lineHeight: 1 }}>M</div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', letterSpacing: '2px' }}>MAKEUP CHARI</div>
                      <div style={{ fontSize: '9px', color: '#8b5cf6', marginTop: '2px' }}>Beauty for Everyone</div>
                    </div>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Makeup Chari</h3>
                    <p className="p-card-sub">Beauty for Everyone</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow"><ArrowRight size={16} /></button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Flex Grid: Left Skincare Offers Table + Right Add/Update Skincare Offer Form */}
              <div className="food-content-split">

                {/* Left Side: Current Offers Table for Selected Skincare Platform */}
                <div className="food-offers-table-box">
                  <div className="offers-table-header">
                    <div className="table-header-title flex-gap">
                      <div className="pink-icon-square" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
                        <Sparkles size={16} color="#ffffff" />
                      </div>
                      <h3>Current Offers - {selectedSkincarePlatform === 'choice_legacy' ? 'Choice Legacy' : selectedSkincarePlatform === 'kirei' ? 'Kirei' : 'Makeup Chari'}</h3>
                    </div>
                    <span className="link-view-all" style={{ color: '#ec4899' }}>View All</span>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '38px' }}><input type="checkbox" /></th>
                          <th style={{ width: '32px' }}>#</th>
                          <th>Offer Title</th>
                          <th>Discount</th>
                          <th>Valid Till</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedSkincarePlatform === 'choice_legacy' ? choiceLegacyOffers : selectedSkincarePlatform === 'kirei' ? kireiOffers : makeupChariOffers).map((offer, idx) => (
                          <tr key={offer.id} className="user-table-row">
                            <td><input type="checkbox" /></td>
                            <td className="col-num">{idx + 1}</td>
                            <td style={{ fontWeight: 700, color: '#ffffff' }}>{offer.title}</td>
                            <td style={{ fontWeight: 800, color: '#ec4899' }}>{offer.discount}</td>
                            <td className="col-date">{offer.validTill}</td>
                            <td>
                              <span className={`status-badge-pill ${offer.status.toLowerCase()}`}>
                                {offer.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons-flex">
                                <button
                                  className="btn-action-icon edit"
                                  title="Edit Offer"
                                  onClick={() => {
                                    setSkincareOfferTitle(offer.title);
                                    onToast(`Editing ${offer.title}`);
                                  }}
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  className="btn-action-icon delete"
                                  title="Delete Offer"
                                  onClick={() => {
                                    if (selectedSkincarePlatform === 'choice_legacy') setChoiceLegacyOffers(choiceLegacyOffers.filter(o => o.id !== offer.id));
                                    else if (selectedSkincarePlatform === 'kirei') setKireiOffers(kireiOffers.filter(o => o.id !== offer.id));
                                    else setMakeupChariOffers(makeupChariOffers.filter(o => o.id !== offer.id));
                                    onToast(`Deleted offer from ${selectedSkincarePlatform}`);
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="table-pagination-footer">
                    <span>Showing 1 to {(selectedSkincarePlatform === 'choice_legacy' ? choiceLegacyOffers : selectedSkincarePlatform === 'kirei' ? kireiOffers : makeupChariOffers).length} of {(selectedSkincarePlatform === 'choice_legacy' ? choiceLegacyOffers : selectedSkincarePlatform === 'kirei' ? kireiOffers : makeupChariOffers).length} offers</span>
                    <div className="pagination-pills">
                      <button className="page-pill-btn">&lt;</button>
                      <button className="page-pill-btn active" style={{ background: '#ec4899' }}>1</button>
                      <button className="page-pill-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Add / Update Skincare Offer Form */}
                <div className="food-offer-form-card">
                  <div className="form-card-header">
                    <div className="pink-icon-square" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
                      <Sparkles size={16} color="#ffffff" />
                    </div>
                    <h3>Add / Update {selectedSkincarePlatform === 'choice_legacy' ? 'Choice Legacy' : selectedSkincarePlatform === 'kirei' ? 'Kirei' : 'Makeup Chari'} Offer</h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newOffer = {
                        id: Date.now(),
                        title: skincareOfferTitle,
                        discount: skincareDiscountType === 'percentage' ? `${skincareDiscountValue}%` : `৳${skincareDiscountValue}`,
                        validTill: skincareValidTill ? new Date(skincareValidTill).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '30 Sep 2026',
                        status: skincareOfferStatus ? 'Active' : 'Expired',
                        code: `${selectedSkincarePlatform.toUpperCase()}${skincareDiscountValue}`
                      };
                      if (selectedSkincarePlatform === 'choice_legacy') setChoiceLegacyOffers([newOffer, ...choiceLegacyOffers]);
                      else if (selectedSkincarePlatform === 'kirei') setKireiOffers([newOffer, ...kireiOffers]);
                      else setMakeupChariOffers([newOffer, ...makeupChariOffers]);
                      onToast(`Published new skincare offer! 🌸 Connected to ${selectedSkincarePlatform} Merchant view.`);
                    }}
                    className="admin-offer-form"
                  >
                    <div className="form-group">
                      <label>Offer Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Flat 20% off on All Skincare Products"
                        value={skincareOfferTitle}
                        onChange={(e) => setSkincareOfferTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Offer Type *</label>
                      <select
                        className="form-select"
                        value={skincareOfferType}
                        onChange={(e) => setSkincareOfferType(e.target.value)}
                      >
                        <option value="Select Offer Type">Select Offer Type</option>
                        <option value="Percentage Discount">Percentage Discount</option>
                        <option value="Fixed Amount">Fixed Amount Off</option>
                        <option value="Buy 1 Get 1">Buy 1 Get 1</option>
                        <option value="Free Gift">Free Gift on Purchase</option>
                        <option value="Student Discount">Student Discount</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Discount Type *</label>
                      <div className="radio-options-row">
                        <label className={`radio-pill-label ${skincareDiscountType === 'percentage' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="skincareDiscountType"
                            checked={skincareDiscountType === 'percentage'}
                            onChange={() => setSkincareDiscountType('percentage')}
                          />
                          <span>Percentage (%)</span>
                        </label>
                        <label className={`radio-pill-label ${skincareDiscountType === 'fixed' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="skincareDiscountType"
                            checked={skincareDiscountType === 'fixed'}
                            onChange={() => setSkincareDiscountType('fixed')}
                          />
                          <span>Fixed Amount (৳)</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Discount Value *</label>
                      <div className="suffix-input-wrap">
                        <input
                          type="number"
                          className="form-input"
                          value={skincareDiscountValue}
                          onChange={(e) => setSkincareDiscountValue(e.target.value)}
                          required
                        />
                        <span className="input-suffix-tag">{skincareDiscountType === 'percentage' ? '%' : '৳'}</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Minimum Purchase Amount (৳)</label>
                      <div className="suffix-input-wrap">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 1000"
                          value={skincareMinAmount}
                          onChange={(e) => setSkincareMinAmount(e.target.value)}
                        />
                        <span className="input-suffix-tag">৳</span>
                      </div>
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label>Valid From *</label>
                        <input
                          type="date"
                          className="form-input"
                          value={skincareValidFrom}
                          onChange={(e) => setSkincareValidFrom(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Valid Till *</label>
                        <input
                          type="date"
                          className="form-input"
                          value={skincareValidTill}
                          onChange={(e) => setSkincareValidTill(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder="e.g. Get 20% off on all skincare products. T&C applied."
                        value={skincareDescription}
                        onChange={(e) => setSkincareDescription(e.target.value)}
                        maxLength={200}
                      ></textarea>
                      <span className="char-count-text">{skincareDescription.length}/200</span>
                    </div>

                    <div className="form-toggle-row">
                      <span className="toggle-label">Status</span>
                      <div
                        className={`toggle-switch-bar ${skincareOfferStatus ? 'active' : ''}`}
                        onClick={() => setSkincareOfferStatus(!skincareOfferStatus)}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                      <span className="status-text-bold">{skincareOfferStatus ? 'Active' : 'Inactive'}</span>
                    </div>

                    <div className="form-actions-row">
                      <button
                        type="button"
                        className="btn-form-cancel"
                        onClick={() => onToast('Cancelled skincare offer editing')}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-form-publish-pink">
                        <Send size={15} />
                        <span>Publish Offer</span>
                      </button>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          ) : activeTab === 'food' ? (
            <div className="food-page-container">

              {/* Header Banner & Stats Row */}
              <div className="food-header-row">
                <div className="food-title-box">
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Food</span>
                  </div>
                  <div className="food-heading-flex">
                    <div className="pink-icon-square">
                      <Utensils size={22} color="#ffffff" />
                    </div>
                    <div>
                      <h1 className="users-main-title">Food Platforms</h1>
                      <p className="users-main-sub">
                        Manage food delivery partners, update offers, set discounts and make deals live on OfferMatrix.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Food Offers Stat Box */}
                <div className="total-food-offers-card">
                  <div className="stat-pink-icon">
                    <Store size={20} color="#ec4899" />
                  </div>
                  <div>
                    <span className="stat-pink-label">Total Food Offers</span>
                    <h3 className="stat-pink-value">248</h3>
                    <span className="stat-pink-growth">↑ 18% this month</span>
                  </div>
                </div>

                {/* Good Food Happier People Hero Promo Banner */}
                <div className="food-promo-hero-card">
                  <div className="food-hero-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80"
                      alt="Burger Combo"
                      className="food-hero-img"
                    />
                  </div>
                  <div className="food-hero-text">
                    <span className="hero-quote-bold">Good Food</span>
                    <span className="hero-quote-sub">Happier People ♡</span>
                  </div>
                </div>
              </div>

              {/* 3 Real Food Platform Cards Grid */}
              <div className="food-platforms-grid">

                {/* 1. FOODPANDA CARD */}
                <div
                  className={`food-platform-card ${selectedPlatform === 'foodpanda' ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectPlatform('foodpanda')}
                >
                  <div className="platform-banner-top foodpanda-banner">
                    <div className="fp-logo-wrap">
                      <div className="fp-panda-head">🐼</div>
                      <span className="fp-logo-text">foodpanda</span>
                    </div>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Foodpanda</h3>
                    <p className="p-card-sub">Good Food Brings Us Together</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. FOODI CARD */}
                <div
                  className={`food-platform-card ${selectedPlatform === 'foodi' ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectPlatform('foodi')}
                >
                  <div className="platform-banner-top foodi-banner">
                    <div className="foodi-logo-wrap">
                      <span className="foodi-brand-name">foodi</span>
                      <span className="foodi-slogan">JUST ORDER &amp; SMILE</span>
                    </div>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Foodi</h3>
                    <p className="p-card-sub">Just Order &amp; Smile</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. PATHAO CARD */}
                <div
                  className={`food-platform-card ${selectedPlatform === 'pathao' ? 'selected-platform' : ''}`}
                  onClick={() => handleSelectPlatform('pathao')}
                >
                  <div className="platform-banner-top pathao-banner">
                    <div className="pathao-logo-wrap">
                      <div className="pathao-icon-circle">
                        <div className="pathao-dot"></div>
                      </div>
                      <div className="pathao-text-block">
                        <span className="pathao-brand-name">pathao</span>
                        <span className="pathao-slogan">HERE WITH YOU</span>
                      </div>
                    </div>
                  </div>
                  <div className="platform-card-body">
                    <h3 className="p-card-title">Pathao</h3>
                    <p className="p-card-sub">Here With You</p>
                    <div className="p-card-footer">
                      <span className="status-badge-pill active">Active</span>
                      <button className="btn-circle-arrow">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Flex Grid: Left Offers Table + Right Add/Update Offer Form */}
              <div className="food-content-split">

                {/* Left Side: Current Offers Table for Selected Platform */}
                <div className="food-offers-table-box">
                  <div className="offers-table-header">
                    <div className="table-header-title flex-gap">
                      <span className="panda-icon">{brandInfo.icon}</span>
                      <h3>Current Offers - {brandInfo.name}</h3>
                    </div>
                    <span className="link-view-all">View All</span>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '38px' }}><input type="checkbox" /></th>
                          <th style={{ width: '32px' }}>#</th>
                          <th>Offer Title</th>
                          <th>Discount</th>
                          <th>Valid Till</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeOffers.map((offer, idx) => (
                          <tr key={offer.id} className="user-table-row">
                            <td><input type="checkbox" /></td>
                            <td className="col-num">{idx + 1}</td>
                            <td style={{ fontWeight: 700, color: '#ffffff' }}>{offer.title}</td>
                            <td style={{ fontWeight: 800, color: '#ec4899' }}>{offer.discount}</td>
                            <td className="col-date">{offer.validTill}</td>
                            <td>
                              <span className={`status-badge-pill ${offer.status.toLowerCase()}`}>
                                {offer.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons-flex">
                                <button
                                  className="btn-action-icon edit"
                                  title="Edit Offer"
                                  onClick={() => {
                                    setOfferTitle(offer.title);
                                    onToast(`Editing ${offer.title} for ${brandInfo.name}`);
                                  }}
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  className="btn-action-icon delete"
                                  title="Delete Offer"
                                  onClick={() => handleDeleteOffer(offer.id)}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="table-pagination-footer">
                    <span>Showing 1 to {activeOffers.length} of {activeOffers.length} offers</span>
                    <div className="pagination-pills">
                      <button className="page-pill-btn">&lt;</button>
                      <button className="page-pill-btn active">1</button>
                      <button className="page-pill-btn">&gt;</button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Add / Update Offer Form for Selected Platform */}
                <div className="food-offer-form-card">
                  <div className="form-card-header">
                    <span className="panda-icon">{brandInfo.icon}</span>
                    <h3>Add / Update {brandInfo.name} Offer</h3>
                  </div>

                  <form onSubmit={handlePublishOffer} className="admin-offer-form">
                    <div className="form-group">
                      <label>Offer Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={`e.g. Flat 20% Discount on ${brandInfo.name} Orders`}
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Offer Type *</label>
                      <select
                        className="form-select"
                        value={offerType}
                        onChange={(e) => setOfferType(e.target.value)}
                      >
                        <option value="Flat Discount">Flat Discount</option>
                        <option value="Free Delivery">Free Delivery</option>
                        <option value="Buy 1 Get 1">Buy 1 Get 1</option>
                        <option value="Student Special">Student Special</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Discount Type *</label>
                      <div className="radio-options-row">
                        <label className={`radio-pill-label ${discountType === 'percentage' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="discountType"
                            checked={discountType === 'percentage'}
                            onChange={() => setDiscountType('percentage')}
                          />
                          <span>Percentage (%)</span>
                        </label>
                        <label className={`radio-pill-label ${discountType === 'fixed' ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="discountType"
                            checked={discountType === 'fixed'}
                            onChange={() => setDiscountType('fixed')}
                          />
                          <span>Fixed Amount (৳)</span>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Discount Value *</label>
                      <div className="suffix-input-wrap">
                        <input
                          type="number"
                          className="form-input"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(e.target.value)}
                          required
                        />
                        <span className="input-suffix-tag">{discountType === 'percentage' ? '%' : '৳'}</span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Minimum Order Amount (৳)</label>
                      <div className="suffix-input-wrap">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. 200"
                          value={minOrder}
                          onChange={(e) => setMinOrder(e.target.value)}
                        />
                        <span className="input-suffix-tag">৳</span>
                      </div>
                    </div>

                    <div className="form-row-two">
                      <div className="form-group">
                        <label>Valid From *</label>
                        <input
                          type="date"
                          className="form-input"
                          value={validFrom}
                          onChange={(e) => setValidFrom(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Valid Till *</label>
                        <input
                          type="date"
                          className="form-input"
                          value={validTill}
                          onChange={(e) => setValidTill(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder={`e.g. Get ${discountValue}% off on all ${brandInfo.name} orders. T&C applied.`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                      ></textarea>
                      <span className="char-count-text">{description.length}/200</span>
                    </div>

                    <div className="form-toggle-row">
                      <span className="toggle-label">Status</span>
                      <div
                        className={`toggle-switch-bar ${offerStatus ? 'active' : ''}`}
                        onClick={() => setOfferStatus(!offerStatus)}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                      <span className="status-text-bold">{offerStatus ? 'Active' : 'Inactive'}</span>
                    </div>

                    <div className="form-actions-row">
                      <button
                        type="button"
                        className="btn-form-cancel"
                        onClick={() => onToast('Cancelled offer editing')}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-form-publish-pink">
                        <Send size={15} />
                        <span>Publish Offer</span>
                      </button>
                    </div>
                  </form>
                </div>

              </div>

            </div>
          ) : activeTab === 'coupons' || activeTab === 'delivery' ? (
            activeCouponSubTab !== 'bank' ? (
              /* =========================================================
                 DELIVERY OFFERS FULL PAGE (Matching user screenshot)
                 ========================================================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0' }}>

                {/* Header / Breadcrumb & Top Stat Cards Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Offers &amp; Coupons</span> &gt; <span style={{ color: '#fbbf24', fontWeight: 700 }}>Delivery Offers</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #ec4899, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>
                        <Car size={20} color="#ffffff" />
                      </div>
                      <div>
                        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>Delivery Offers</h1>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>Manage delivery partner offers for SteadFast, REDX and CarryBee.</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: '#94a3b8', background: '#0f172a', border: '1px solid #1e293b', padding: '8px 14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} color="#94a3b8" />
                    <span>15 Sep 2026 - 30 Sep 2026</span>
                  </div>
                </div>

                {/* Top Grid: 3 Delivery Partner Cards + 2 Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 210px 210px', gap: '12px', alignItems: 'stretch' }}>

                  {/* 1. SteadFast Courier Card */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      {renderDeliveryLogo('steadfast')}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>SteadFast Courier</div>
                        <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600 }}>Active Offers: 8</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                      <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', padding: '3px 8px', borderRadius: '99px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34d399' }}></span> Active Partner
                      </span>
                      <button style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Viewing SteadFast Offers')}>
                        View Offers &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 2. REDX Delivery Card */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      {renderDeliveryLogo('redx')}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>REDX Delivery</div>
                        <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600 }}>Active Offers: 6</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                      <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', padding: '3px 8px', borderRadius: '99px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34d399' }}></span> Active Partner
                      </span>
                      <button style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Viewing REDX Offers')}>
                        View Offers &rarr;
                      </button>
                    </div>
                  </div>

                  {/* 3. CarryBee Delivery Card */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      {renderDeliveryLogo('carrybee')}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>CarryBee Delivery</div>
                        <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600 }}>Active Offers: 5</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
                      <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)', padding: '3px 8px', borderRadius: '99px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34d399' }}></span> Active Partner
                      </span>
                      <button style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => onToast('Viewing CarryBee Offers')}>
                        View Offers &rarr;
                      </button>
                    </div>
                  </div>

                  {/* Total Delivery Offers Stat */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Car size={18} color="#ec4899" />
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Delivery Offers</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>19</div>
                      <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>&uarr; 28% this month</div>
                    </div>
                  </div>

                  {/* Total Redemptions Stat */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={18} color="#3b82f6" />
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Redemptions</div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>8,420</div>
                      <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>&uarr; 36% this month</div>
                    </div>
                  </div>

                </div>

                {/* Middle Section: Form (Left) + Phone Preview (Right) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: '16px', alignItems: 'start' }}>

                  {/* Form Container: Create New Delivery Offer */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={16} color="#fff" />
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Create New Delivery Offer</h3>
                        <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>Add a new offer for SteadFast, REDX or CarryBee.</p>
                      </div>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const newOffer = {
                        id: deliveryOffersList.length + 1,
                        partner: deliveryPartner,
                        title: deliveryOfferTitle || 'Delivery Discount',
                        discount: deliveryDiscountType === 'percentage' ? `${deliveryDiscountValue}%` : `৳${deliveryDiscountValue}`,
                        minOrder: `৳${deliveryMinOrder}`,
                        validTill: '30 Sep 2026',
                        status: deliveryStatus ? 'Active' : 'Expired'
                      };
                      setDeliveryOffersList([newOffer, ...deliveryOffersList]);
                      onToast(`Published Delivery Offer for ${deliveryPartner}! 🚀`);
                    }}>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        {/* Delivery Partner */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Delivery Partner *</label>
                          <select className="form-select" style={{ padding: '8px 10px', fontSize: '12px' }} value={deliveryPartner} onChange={e => setDeliveryPartner(e.target.value)}>
                            <option value="SteadFast">SteadFast</option>
                            <option value="REDX">REDX</option>
                            <option value="CarryBee">CarryBee</option>
                          </select>
                        </div>

                        {/* Discount Type */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Discount Type *</label>
                          <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                              <input type="radio" name="dldt" checked={deliveryDiscountType === 'percentage'} onChange={() => setDeliveryDiscountType('percentage')} /> Percentage (%)
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                              <input type="radio" name="dldt" checked={deliveryDiscountType === 'fixed'} onChange={() => setDeliveryDiscountType('fixed')} /> Fixed Amount (৳)
                            </label>
                          </div>
                        </div>

                        {/* Upload Banner */}
                        <div className="form-group" style={{ gridRow: 'span 2' }}>
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Offer Banner (Optional)</label>
                          <div style={{ border: '2px dashed #334155', borderRadius: '10px', padding: '16px 10px', textAlign: 'center', color: '#64748b', cursor: 'pointer', marginTop: '4px', fontSize: '11px', height: '105px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🖼️</div>
                            <span>Drag &amp; drop or click to upload</span>
                            <span style={{ fontSize: '9px', color: '#475569', marginTop: '2px' }}>(Recommended size: 1200 &times; 628)</span>
                          </div>
                        </div>

                        {/* Offer Title */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Offer Title *</label>
                          <input type="text" className="form-input" style={{ padding: '8px 10px', fontSize: '12px' }} placeholder="e.g. ৳50 off on Delivery" value={deliveryOfferTitle} onChange={e => setDeliveryOfferTitle(e.target.value)} />
                        </div>

                        {/* Discount Value */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Discount Value *</label>
                          <div style={{ position: 'relative' }}>
                            <input type="text" className="form-input" style={{ padding: '8px 10px', fontSize: '12px' }} value={deliveryDiscountValue} onChange={e => setDeliveryDiscountValue(e.target.value)} />
                            <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: '#64748b' }}>%</span>
                          </div>
                        </div>

                        {/* Offer Type */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Offer Type *</label>
                          <select className="form-select" style={{ padding: '8px 10px', fontSize: '12px' }} value={deliveryOfferType} onChange={e => setDeliveryOfferType(e.target.value)}>
                            <option value="Delivery Discount">Delivery Discount</option>
                            <option value="Free Delivery">Free Delivery</option>
                            <option value="Cashback">Cashback</option>
                          </select>
                        </div>

                        {/* Minimum Order Amount */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Minimum Order Amount (৳) *</label>
                          <input type="text" className="form-input" style={{ padding: '8px 10px', fontSize: '12px' }} value={deliveryMinOrder} onChange={e => setDeliveryMinOrder(e.target.value)} />
                        </div>

                        {/* Valid From */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Valid From *</label>
                          <input type="date" className="form-input" style={{ padding: '8px 10px', fontSize: '11px' }} value={deliveryValidFrom} onChange={e => setDeliveryValidFrom(e.target.value)} />
                        </div>

                        {/* Valid Till */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Valid Till *</label>
                          <input type="date" className="form-input" style={{ padding: '8px 10px', fontSize: '11px' }} value={deliveryValidTill} onChange={e => setDeliveryValidTill(e.target.value)} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                        {/* Applicable Services */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Applicable Services *</label>
                          <div style={{ display: 'flex', gap: '14px', marginTop: '6px' }}>
                            {['SteadFast', 'REDX', 'CarryBee'].map(srv => (
                              <label key={srv} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                                <input type="checkbox" checked={deliveryServices[srv]} onChange={e => setDeliveryServices({ ...deliveryServices, [srv]: e.target.checked })} /> {srv}
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Terms &amp; Conditions (Optional)</label>
                          <textarea className="form-textarea" rows="2" style={{ fontSize: '11px', padding: '6px 10px' }} value={deliveryTerms} onChange={e => setDeliveryTerms(e.target.value)} maxLength={300}></textarea>
                          <div style={{ fontSize: '9px', color: '#64748b', textAlign: 'right' }}>0/300</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Status</span>
                            <div className={`toggle-switch-bar ${deliveryStatus ? 'active' : ''}`} style={{ scale: '0.8' }} onClick={() => setDeliveryStatus(!deliveryStatus)}>
                              <div className="toggle-handle-circle"></div>
                            </div>
                            <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 700 }}>{deliveryStatus ? 'Active' : 'Inactive'}</span>
                          </div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="checkbox" checked={deliveryNotify} onChange={e => setDeliveryNotify(e.target.checked)} /> Notify users about this offer
                          </label>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button type="button" className="btn-form-cancel" style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => onToast('Cancelled')}>Cancel</button>
                          <button type="submit" className="btn-form-publish-pink" style={{ padding: '8px 20px', fontSize: '12px' }}>
                            <Send size={14} /> <span>Publish Offer</span>
                          </button>
                        </div>
                      </div>

                    </form>
                  </div>

                  {/* Offer Preview (User View) Frame */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>👁️</div>
                      <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Offer Preview (User View)</h3>
                    </div>

                    {/* Phone Frame */}
                    <div style={{ background: '#ffffff', borderRadius: '18px', border: '3px solid #334155', padding: '10px', color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>

                      {/* Top header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                          &lt; <span style={{ color: '#000000' }}>Offer</span><span style={{ color: '#00c853' }}>Matrix</span>
                        </div>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#000000' }}></div>
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#000000' }}></div>
                        </div>
                      </div>

                      {/* Category Icons Bar */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', marginBottom: '10px' }}>
                        <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '8px', padding: '4px', textAlign: 'center' }}>
                          <span style={{ fontSize: '12px' }}>🍽️</span>
                          <div style={{ fontSize: '8px', fontWeight: 700, color: '#ec4899' }}>Food</div>
                        </div>
                        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '4px', textAlign: 'center' }}>
                          <span style={{ fontSize: '12px' }}>🛵</span>
                          <div style={{ fontSize: '8px', fontWeight: 700, color: '#0284c7' }}>Ride</div>
                        </div>
                        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px', padding: '4px', textAlign: 'center' }}>
                          <span style={{ fontSize: '12px' }}>✨</span>
                          <div style={{ fontSize: '8px', fontWeight: 700, color: '#e11d48' }}>Skincare</div>
                        </div>
                      </div>

                      {/* Main Delivery Banner Card */}
                      <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', borderRadius: '12px', padding: '10px', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ marginBottom: '6px' }}>
                          {renderDeliveryLogo('steadfast')}
                        </div>

                        <div style={{ fontSize: '18px', fontWeight: 900, lineHeight: 1 }}>
                          ৳50 OFF
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3px', marginBottom: '8px' }}>
                          On Delivery
                        </div>

                        <div style={{ background: '#ffffff', color: '#059669', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', fontSize: '8px', fontWeight: 800 }}>
                          Use Code <span style={{ color: '#047857' }}>STEAD50</span>
                        </div>

                        {/* Delivery rider graphic */}
                        <div style={{ position: 'absolute', right: '4px', bottom: '4px', width: '55px', height: '55px' }}>
                          <img src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=120&q=80" alt="Delivery Rider" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid #ffffff' }} />
                        </div>
                      </div>

                      {/* Carousel indicator dots */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '8px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }}></div>
                        <div style={{ width: '12px', height: '4px', borderRadius: '99px', background: '#ec4899' }}></div>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }}></div>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }}></div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* All Delivery Offers Table */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BarChart2 size={14} color="#fff" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>All Delivery Offers</h3>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px' }}>
                        <Search size={13} color="#64748b" />
                        <input type="text" placeholder="Search delivery offers..." value={deliverySearch} onChange={e => setDeliverySearch(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '11px', outline: 'none', width: '160px' }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Partner:</span>
                        <select className="form-select" style={{ padding: '5px 8px', fontSize: '11px', width: 'auto' }} value={deliveryPartnerFilter} onChange={e => setDeliveryPartnerFilter(e.target.value)}>
                          <option value="All">All</option>
                          <option value="SteadFast">SteadFast</option>
                          <option value="REDX">REDX</option>
                          <option value="CarryBee">CarryBee</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>Status:</span>
                        <select className="form-select" style={{ padding: '5px 8px', fontSize: '11px', width: 'auto' }} value={deliveryStatusFilter} onChange={e => setDeliveryStatusFilter(e.target.value)}>
                          <option value="All">All</option>
                          <option value="Active">Active</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Expired">Expired</option>
                        </select>
                      </div>

                      <button style={{ padding: '6px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '11px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => onToast('Exporting offers list...')}>
                        <span>&darr; Export</span>
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '38px' }}><input type="checkbox" /></th>
                          <th style={{ width: '32px' }}>#</th>
                          <th>Partner</th>
                          <th>Offer Title</th>
                          <th>Discount</th>
                          <th>Min. Order</th>
                          <th>Valid Till</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveryOffersList
                          .filter(o => {
                            const matchSearch = deliverySearch === '' || o.title.toLowerCase().includes(deliverySearch.toLowerCase()) || o.partner.toLowerCase().includes(deliverySearch.toLowerCase());
                            const matchPartner = deliveryPartnerFilter === 'All' || o.partner === deliveryPartnerFilter;
                            const matchStatus = deliveryStatusFilter === 'All' || o.status === deliveryStatusFilter;
                            return matchSearch && matchPartner && matchStatus;
                          })
                          .map((o, idx) => (
                            <tr key={o.id} className="user-table-row">
                              <td><input type="checkbox" /></td>
                              <td className="col-num">{idx + 1}</td>
                              <td>{renderDeliveryLogo(o.partner)}</td>
                              <td style={{ fontWeight: 700, color: '#ffffff' }}>{o.title}</td>
                              <td style={{ fontWeight: 800, color: '#ec4899' }}>{o.discount}</td>
                              <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{o.minOrder}</td>
                              <td className="col-date">{o.validTill}</td>
                              <td>
                                <span className={`status-badge-pill ${o.status.toLowerCase()}`}>{o.status}</span>
                              </td>
                              <td>
                                <div className="action-buttons-flex">
                                  <button className="btn-action-icon edit" title="Edit" onClick={() => onToast(`Editing: ${o.title}`)}>✏️</button>
                                  <button className="btn-action-icon" title="Duplicate" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)' }} onClick={() => onToast(`Duplicated: ${o.title}`)}>📋</button>
                                  <button className="btn-action-icon delete" title="Delete" onClick={() => { setDeliveryOffersList(prev => prev.filter(item => item.id !== o.id)); onToast(`Deleted: ${o.title}`); }}>🗑️</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>

                  <div className="table-pagination-footer">
                    <span>Showing 1 to {deliveryOffersList.length} of {deliveryOffersList.length} offers</span>
                    <div className="pagination-pills">
                      <button className="page-pill-btn">&lt;</button>
                      <button className="page-pill-btn active" style={{ background: '#2563eb' }}>1</button>
                      <button className="page-pill-btn">&gt;</button>
                    </div>
                  </div>
                </div>

              </div>
            ) : activeCouponSubTab === 'bank' ? (
              /* =========================================================
                 BANK OFFERS FULL PAGE (Matching screenshot media_1789486054444.png)
                 ========================================================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0' }}>

                {/* Header / Breadcrumb & Top Stat Cards Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Offers &amp; Coupons</span> &gt; <span style={{ color: '#fbbf24', fontWeight: 700 }}>Bank Offers</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #ec4899, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>
                        <Building2 size={20} color="#ffffff" />
                      </div>
                      <div>
                        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0, lineHeight: 1.2 }}>Bank Offers</h1>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>Manage bank partnerships, create offers and provide exclusive bank discounts to users.</p>
                      </div>
                    </div>
                  </div>

                  {/* Top Right Summary Badges */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={18} color="#a78bfa" />
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Bank Offers</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>48</div>
                        <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>↑ 25% this month</div>
                      </div>
                    </div>

                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Clock size={18} color="#34d399" />
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Offers</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          36 <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }}></span>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={18} color="#a78bfa" />
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Partner Banks</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          8 <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horizontal Bank Logo Strip (Row of 8 bank logo cards) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
                  {[
                    { name: 'BRAC Bank', key: 'brac' },
                    { name: 'City Bank', key: 'city' },
                    { name: 'Dutch-Bangla Bank', key: 'dbbl' },
                    { name: 'Eastern Bank PLC.', key: 'ebl' },
                    { name: 'Islami Bank', key: 'ibbl' },
                    { name: 'UCB', key: 'ucb' },
                    { name: 'Standard Chartered', key: 'sc' },
                    { name: 'Prime Bank', key: 'prime' }
                  ].map(b => (
                    <div
                      key={b.key}
                      onClick={() => setBankFormSelectedBank(b.name)}
                      style={{
                        background: '#ffffff',
                        borderRadius: '10px',
                        padding: '10px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        height: '52px',
                        cursor: 'pointer',
                        border: bankFormSelectedBank === b.name ? '2px solid #ec4899' : '1px solid #e2e8f0',
                        boxShadow: bankFormSelectedBank === b.name ? '0 0 10px rgba(236,72,153,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s'
                      }}
                    >
                      {renderBankLogo(b.key)}
                    </div>
                  ))}
                </div>

                {/* Main Content Grid Layout: Left Form + Center Table & Insights + Right Preview & CTA */}
                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 240px', gap: '16px', alignItems: 'start' }}>

                  {/* ---- LEFT COLUMN: Add / Update Bank Offer Form ---- */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={15} color="#fff" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Add / Update Bank Offer</h3>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const newOffer = {
                        id: bankOffersList.length + 1,
                        bank: bankFormSelectedBank,
                        logoKey: bankFormSelectedBank.toLowerCase().includes('brac') ? 'brac' : bankFormSelectedBank.toLowerCase().includes('city') ? 'city' : bankFormSelectedBank.toLowerCase().includes('dutch') ? 'dbbl' : bankFormSelectedBank.toLowerCase().includes('eastern') ? 'ebl' : bankFormSelectedBank.toLowerCase().includes('islami') ? 'ibbl' : bankFormSelectedBank.toLowerCase().includes('ucb') ? 'ucb' : bankFormSelectedBank.toLowerCase().includes('standard') ? 'sc' : 'prime',
                        title: bankFormOfferTitle || 'Bank Special Offer',
                        discount: `${bankFormDiscountValue}${bankFormDiscountType === 'percentage' ? '%' : '৳'}`,
                        validTill: bankFormValidTill,
                        status: bankFormStatus ? 'Active' : 'Scheduled'
                      };
                      setBankOffersList([newOffer, ...bankOffersList]);
                      onToast(`Added Bank Offer for ${bankFormSelectedBank}!`);
                    }}>
                      {/* Select Bank */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Select Bank *</label>
                        <select
                          className="form-select"
                          style={{ padding: '8px 10px', fontSize: '12px' }}
                          value={bankFormSelectedBank}
                          onChange={e => setBankFormSelectedBank(e.target.value)}
                        >
                          <option value="BRAC Bank">BRAC Bank</option>
                          <option value="City Bank">City Bank</option>
                          <option value="Dutch-Bangla Bank">Dutch-Bangla Bank</option>
                          <option value="Eastern Bank PLC.">Eastern Bank PLC.</option>
                          <option value="Islami Bank">Islami Bank</option>
                          <option value="UCB">UCB</option>
                          <option value="Standard Chartered">Standard Chartered</option>
                          <option value="Prime Bank">Prime Bank</option>
                        </select>
                      </div>

                      {/* Offer Title */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Offer Title *</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ padding: '8px 10px', fontSize: '12px' }}
                          placeholder="e.g. 15% off with BRAC Bank Card"
                          value={bankFormOfferTitle}
                          onChange={e => setBankFormOfferTitle(e.target.value)}
                        />
                      </div>

                      {/* Applicable Platform */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Applicable Platform *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '4px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                            <input type="checkbox" checked={bankFormPlatforms.food} onChange={e => setBankFormPlatforms({ ...bankFormPlatforms, food: e.target.checked })} /> Food
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                            <input type="checkbox" checked={bankFormPlatforms.ride} onChange={e => setBankFormPlatforms({ ...bankFormPlatforms, ride: e.target.checked })} /> Ride
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                            <input type="checkbox" checked={bankFormPlatforms.skincare} onChange={e => setBankFormPlatforms({ ...bankFormPlatforms, skincare: e.target.checked })} /> Skincare
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                            <input type="checkbox" checked={bankFormPlatforms.all} onChange={e => setBankFormPlatforms({ ...bankFormPlatforms, all: e.target.checked })} /> All Platforms
                          </label>
                        </div>
                      </div>

                      {/* Discount Type */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Discount Type *</label>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                            <input type="radio" name="bkdt" checked={bankFormDiscountType === 'percentage'} onChange={() => setBankFormDiscountType('percentage')} /> Percentage (%)
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                            <input type="radio" name="bkdt" checked={bankFormDiscountType === 'fixed'} onChange={() => setBankFormDiscountType('fixed')} /> Fixed Amount (৳)
                          </label>
                        </div>
                      </div>

                      {/* Discount Value & Max Discount */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Discount Value *</label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              className="form-input"
                              style={{ padding: '8px 10px', fontSize: '12px' }}
                              value={bankFormDiscountValue}
                              onChange={e => setBankFormDiscountValue(e.target.value)}
                            />
                            <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#64748b' }}>%</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Maximum Discount (৳)</label>
                          <input
                            type="text"
                            className="form-input"
                            style={{ padding: '8px 10px', fontSize: '12px' }}
                            value={bankFormMaxDiscount}
                            onChange={e => setBankFormMaxDiscount(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Minimum Order Amount */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Minimum Order Amount (৳)</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ padding: '8px 10px', fontSize: '12px' }}
                          value={bankFormMinOrder}
                          onChange={e => setBankFormMinOrder(e.target.value)}
                        />
                      </div>

                      {/* Valid From & Valid Till */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Valid From *</label>
                          <input
                            type="date"
                            className="form-input"
                            style={{ padding: '8px 10px', fontSize: '11px' }}
                            value={bankFormValidFrom}
                            onChange={e => setBankFormValidFrom(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Valid Till *</label>
                          <input
                            type="date"
                            className="form-input"
                            style={{ padding: '8px 10px', fontSize: '11px' }}
                            value={bankFormValidTill}
                            onChange={e => setBankFormValidTill(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Offer Code */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Offer Code (Optional)</label>
                        <input
                          type="text"
                          className="form-input"
                          style={{ padding: '8px 10px', fontSize: '12px' }}
                          value={bankFormOfferCode}
                          onChange={e => setBankFormOfferCode(e.target.value)}
                        />
                      </div>

                      {/* Terms & Conditions */}
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Terms &amp; Conditions</label>
                        <textarea
                          className="form-textarea"
                          rows={2}
                          style={{ padding: '8px 10px', fontSize: '11px', height: '54px', resize: 'none' }}
                          value={bankFormTerms}
                          onChange={e => setBankFormTerms(e.target.value)}
                        />
                        <div style={{ textAlign: 'right', fontSize: '9px', color: '#64748b', marginTop: '2px' }}>{bankFormTerms.length}/300</div>
                      </div>

                      {/* Status & Feature Checkbox */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingTop: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Status</span>
                          <div
                            className={`toggle-switch-pill ${bankFormStatus ? 'on' : ''}`}
                            onClick={() => setBankFormStatus(!bankFormStatus)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="toggle-handle-circle"></div>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: bankFormStatus ? '#34d399' : '#64748b' }}>{bankFormStatus ? 'Active' : 'Inactive'}</span>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#e2e8f0', cursor: 'pointer' }}>
                          <input type="checkbox" checked={bankFormFeatured} onChange={e => setBankFormFeatured(e.target.checked)} /> Feature this offer
                        </label>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '8px' }}>
                        <button
                          type="button"
                          className="btn-form-cancel"
                          style={{ padding: '8px', fontSize: '12px' }}
                          onClick={() => onToast('Cancelled bank offer edit')}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-form-publish-pink"
                          style={{ padding: '8px', fontSize: '12px', justifyContent: 'center' }}
                        >
                          <Send size={14} />
                          <span>Save Offer</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* ---- CENTER COLUMN: Table + Insights ---- */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* All Bank Offers Table Card */}
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Building2 size={15} color="#fff" />
                          </div>
                          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>All Bank Offers</h3>
                        </div>

                        {/* Table Filters */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '5px 10px' }}>
                            <Search size={12} color="#64748b" />
                            <input
                              type="text"
                              placeholder="Search bank offers..."
                              value={bankOffersSearch}
                              onChange={e => setBankOffersSearch(e.target.value)}
                              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '11px', outline: 'none', width: '130px' }}
                            />
                          </div>
                          <select
                            className="form-select"
                            style={{ padding: '5px 8px', fontSize: '11px', width: 'auto' }}
                            value={bankOffersBankFilter}
                            onChange={e => setBankOffersBankFilter(e.target.value)}
                          >
                            <option value="All">Bank: All</option>
                            <option value="BRAC Bank">BRAC Bank</option>
                            <option value="City Bank">City Bank</option>
                            <option value="Dutch-Bangla Bank">Dutch-Bangla Bank</option>
                            <option value="Eastern Bank PLC.">Eastern Bank PLC.</option>
                            <option value="Islami Bank">Islami Bank</option>
                            <option value="UCB">UCB</option>
                            <option value="Standard Chartered">Standard Chartered</option>
                            <option value="Prime Bank">Prime Bank</option>
                          </select>
                          <select
                            className="form-select"
                            style={{ padding: '5px 8px', fontSize: '11px', width: 'auto' }}
                            value={bankOffersStatusFilter}
                            onChange={e => setBankOffersStatusFilter(e.target.value)}
                          >
                            <option value="All">Status: All</option>
                            <option value="Active">Active</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Expired">Expired</option>
                          </select>
                        </div>
                      </div>

                      {/* Table */}
                      <div className="table-responsive-wrapper">
                        <table className="users-data-table">
                          <thead>
                            <tr>
                              <th style={{ width: '32px' }}><input type="checkbox" /></th>
                              <th style={{ width: '28px' }}>#</th>
                              <th>Bank</th>
                              <th>Offer Title</th>
                              <th>Discount</th>
                              <th>Valid Till</th>
                              <th>Status</th>
                              <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankOffersList
                              .filter(o => {
                                const matchSearch = bankOffersSearch === '' || o.title.toLowerCase().includes(bankOffersSearch.toLowerCase()) || o.bank.toLowerCase().includes(bankOffersSearch.toLowerCase());
                                const matchBank = bankOffersBankFilter === 'All' || o.bank.toLowerCase().includes(bankOffersBankFilter.toLowerCase());
                                const matchStatus = bankOffersStatusFilter === 'All' || o.status === bankOffersStatusFilter;
                                return matchSearch && matchBank && matchStatus;
                              })
                              .map((o, idx) => (
                                <tr key={o.id} className="user-table-row">
                                  <td><input type="checkbox" /></td>
                                  <td className="col-num">{idx + 1}</td>
                                  <td>
                                    <div style={{ background: '#ffffff', padding: '4px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
                                      {renderBankLogo(o.logoKey || o.bank)}
                                    </div>
                                  </td>
                                  <td style={{ fontWeight: 600, color: '#ffffff', fontSize: '12px' }}>{o.title}</td>
                                  <td style={{ fontWeight: 700, color: '#ec4899', fontSize: '12px' }}>{o.discount}</td>
                                  <td className="col-date" style={{ fontSize: '11px' }}>{o.validTill}</td>
                                  <td>
                                    <span className={`status-badge-pill ${o.status.toLowerCase()}`}>{o.status}</span>
                                  </td>
                                  <td>
                                    <div className="action-buttons-flex">
                                      <button className="btn-action-icon edit" title="Edit" onClick={() => onToast(`Editing ${o.bank} offer`)}>✏️</button>
                                      <button className="btn-action-icon" title="Duplicate" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)' }} onClick={() => onToast(`Duplicated ${o.bank} offer`)}>📋</button>
                                      <button className="btn-action-icon delete" title="Delete" onClick={() => { setBankOffersList(prev => prev.filter(x => x.id !== o.id)); onToast(`Deleted offer`); }}>🗑️</button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Footer */}
                      <div className="table-pagination-footer" style={{ marginTop: '12px', fontSize: '11px' }}>
                        <span>Showing 1 to {bankOffersList.length} of {bankOffersList.length} offers</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="pagination-pills">
                            <button className="page-pill-btn">&lt;</button>
                            <button className="page-pill-btn active" style={{ background: '#3b82f6' }}>1</button>
                            <button className="page-pill-btn">&gt;</button>
                          </div>
                          <select className="form-select" style={{ padding: '3px 6px', fontSize: '10px', width: 'auto' }}>
                            <option>10 per page</option>
                            <option>20 per page</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Bank Offer Insights Card */}
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Building2 size={15} color="#fff" />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Bank Offer Insights</h3>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', border: '1px solid #334155' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                              🟩
                            </div>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Total Redemptions</span>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>12,480</div>
                          <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>↑ 32% this month</div>
                        </div>

                        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', border: '1px solid #334155' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(236,72,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                              👥
                            </div>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Unique Users</span>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>8,210</div>
                          <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>↑ 18% this month</div>
                        </div>

                        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', border: '1px solid #334155' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                              🏷️
                            </div>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Total Discount Given</span>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>৳ 5,20,000</div>
                          <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>↑ 25% this month</div>
                        </div>

                        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', border: '1px solid #334155' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                              📊
                            </div>
                            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>Revenue Impact</span>
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>৳ 18,50,000</div>
                          <div style={{ fontSize: '10px', color: '#34d399', fontWeight: 600, marginTop: '2px' }}>↑ 28% this month</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ---- RIGHT COLUMN: Offer Preview & CTA ---- */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Offer Preview (User View) Card */}
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>👁️</div>
                        <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>Offer Preview (User View)</h3>
                      </div>

                      {/* Phone Mockup Frame */}
                      <div style={{ background: '#0d1117', borderRadius: '18px', border: '2px solid #334155', padding: '10px', fontFamily: "'Inter', sans-serif" }}>

                        {/* Phone Status / Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ fontWeight: 900, fontSize: '13px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ color: '#ff2b70', fontSize: '12px' }}>%</span> Offer<span style={{ color: '#00c853' }}>Matrix</span>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#ec4899' }}></div>
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#3b82f6' }}></div>
                          </div>
                        </div>

                        {/* Category Pills */}
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '8px', background: '#ec489922', color: '#ec4899', padding: '2px 6px', borderRadius: '99px', border: '1px solid #ec489955', fontWeight: 600 }}>🍽️ Food</span>
                          <span style={{ fontSize: '8px', background: '#1e293b', color: '#94a3b8', padding: '2px 6px', borderRadius: '99px', border: '1px solid #334155' }}>🚗 Ride</span>
                          <span style={{ fontSize: '8px', background: '#1e293b', color: '#94a3b8', padding: '2px 6px', borderRadius: '99px', border: '1px solid #334155' }}>✨ Skincare</span>
                        </div>

                        {/* Main Featured Bank Banner Card (BRAC BANK) */}
                        <div style={{ background: 'linear-gradient(135deg, #0284c7, #1e3a8a)', borderRadius: '10px', padding: '10px', marginBottom: '10px', position: 'relative', overflow: 'hidden' }}>
                          <div style={{ background: '#ffffff', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>
                            {renderBankLogo('brac')}
                          </div>
                          <div style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
                            15% OFF
                          </div>
                          <div style={{ fontSize: '9px', fontWeight: 700, color: '#bae6fd', letterSpacing: '0.3px', marginBottom: '6px' }}>
                            ON ALL ORDERS
                          </div>

                          <div style={{ display: 'inline-block', background: '#ffffff22', backdropFilter: 'blur(4px)', border: '1px solid #ffffff44', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', color: '#ffffff', fontWeight: 700 }}>
                            Use Code <span style={{ color: '#fef08a' }}>{bankFormOfferCode || 'BRAC15'}</span>
                          </div>

                          {/* Floating Credit Card graphic */}
                          <div style={{ position: 'absolute', right: '-10px', bottom: '-5px', width: '70px', height: '44px', background: 'linear-gradient(135deg, #1e40af, #3b82f6)', borderRadius: '6px', border: '1px solid #60a5fa', transform: 'rotate(-10deg)', boxShadow: '0 4px 10px rgba(0,0,0,0.4)', padding: '4px' }}>
                            <div style={{ width: '10px', height: '7px', background: '#fbbf24', borderRadius: '2px', marginBottom: '10px' }}></div>
                            <div style={{ fontSize: '5px', color: '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>•••• •••• •••• 4821</div>
                          </div>

                          {/* Pagination Dots */}
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginTop: '8px' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff88' }}></div>
                            <div style={{ width: '12px', height: '4px', borderRadius: '99px', background: '#ffffff' }}></div>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff88' }}></div>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ffffff88' }}></div>
                          </div>
                        </div>

                        {/* More Bank Offers Section */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 700, color: '#ffffff' }}>More Bank Offers</span>
                          <span style={{ fontSize: '8px', color: '#ec4899', fontWeight: 600 }}>See All &gt;</span>
                        </div>

                        {/* 2x2 Grid of Bank Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '6px', border: '1px solid #334155' }}>
                            <div style={{ background: '#fff', padding: '2px 4px', borderRadius: '4px', marginBottom: '4px', display: 'inline-block' }}>
                              {renderBankLogo('city')}
                            </div>
                            <div style={{ fontSize: '9px', fontWeight: 800, color: '#e11d48' }}>৳200 OFF</div>
                            <div style={{ fontSize: '7px', color: '#94a3b8' }}>Min. ৳500</div>
                          </div>

                          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '6px', border: '1px solid #334155' }}>
                            <div style={{ background: '#fff', padding: '2px 4px', borderRadius: '4px', marginBottom: '4px', display: 'inline-block' }}>
                              {renderBankLogo('dbbl')}
                            </div>
                            <div style={{ fontSize: '9px', fontWeight: 800, color: '#e11d48' }}>20% OFF</div>
                            <div style={{ fontSize: '7px', color: '#94a3b8' }}>On Rides</div>
                          </div>

                          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '6px', border: '1px solid #334155' }}>
                            <div style={{ background: '#fff', padding: '2px 4px', borderRadius: '4px', marginBottom: '4px', display: 'inline-block' }}>
                              {renderBankLogo('ebl')}
                            </div>
                            <div style={{ fontSize: '9px', fontWeight: 800, color: '#e11d48' }}>10% OFF</div>
                            <div style={{ fontSize: '7px', color: '#94a3b8' }}>Max ৳300</div>
                          </div>

                          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '6px', border: '1px solid #334155' }}>
                            <div style={{ background: '#fff', padding: '2px 4px', borderRadius: '4px', marginBottom: '4px', display: 'inline-block' }}>
                              {renderBankLogo('ibbl')}
                            </div>
                            <div style={{ fontSize: '9px', fontWeight: 800, color: '#16a34a' }}>15% OFF</div>
                            <div style={{ fontSize: '7px', color: '#94a3b8' }}>On Skincare</div>
                          </div>
                        </div>

                        {/* Bottom Nav Mockup */}
                        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '6px', borderTop: '1px solid #334155' }}>
                          <span style={{ fontSize: '10px', color: '#94a3b8' }}>🏠</span>
                          <span style={{ fontSize: '10px', color: '#ec4899', fontWeight: 700 }}>🎁</span>
                          <span style={{ fontSize: '10px', color: '#94a3b8' }}>📁</span>
                          <span style={{ fontSize: '10px', color: '#94a3b8' }}>👤</span>
                        </div>
                      </div>
                    </div>

                    {/* Partner with More Banks CTA Card */}
                    <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #2e1065)', border: '1px solid #4c1d95', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '20px' }}>
                        📢
                      </div>
                      <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff', margin: '0 0 4px' }}>Partner with More Banks</h4>
                      <p style={{ fontSize: '11px', color: '#c084fc', margin: '0 0 12px', lineHeight: 1.3 }}>Bring more exclusive deals to your users.</p>
                      <button
                        style={{ width: '100%', padding: '8px', background: '#0f172a', border: '1px solid #6b21a8', borderRadius: '8px', color: '#ffffff', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                        onClick={() => onToast('Opening Bank Partnership request...')}
                      >
                        Add New Bank Partner
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ) : (
              /* =========================================================
                 OFFERS & COUPONS GENERAL PAGE
                 ========================================================= */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0' }}>

                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Offers &amp; Coupons</h1>
                    <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0 0' }}>Create, manage and publish offers across Food, Ride and Skincare. Set discounts, bank offers, wallet offers and more.</p>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', background: '#1e293b', padding: '6px 14px', borderRadius: '8px', border: '1px solid #334155', whiteSpace: 'nowrap' }}>
                    📅 Mon, 15 Sep 2026
                  </div>
                </div>

                {/* Top Stat Cards: Food / Ride / Skincare offer counts */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                  {[
                    { label: 'Food Offers', count: '124 Active', icon: '🍽️', color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
                    { label: 'Ride Offers', count: '98 Active', icon: '🚗', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
                    { label: 'Skincare Offers', count: '76 Active', icon: '✨', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' }
                  ].map((s) => (
                    <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}33`, borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{s.icon}</div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '14px' }}>{s.label}</div>
                          <div style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>{s.count}</div>
                        </div>
                      </div>
                      <button
                        style={{ fontSize: '12px', color: s.color, background: 'transparent', border: `1px solid ${s.color}66`, borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
                        onClick={() => onToast(`Opening Create ${s.label} Offer form...`)}
                      >
                        + Create Offer
                      </button>
                    </div>
                  ))}
                </div>

                {/* Main Content Row: Form + Side Panels + Preview */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px 220px', gap: '16px', alignItems: 'start' }}>

                  {/* ---- LEFT: Add New Offer / Coupon Form ---- */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={16} color="#fff" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>Add New Offer / Coupon</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div className="form-group">
                        <label>Platform *</label>
                        <select className="form-select" value={couponPlatform} onChange={e => setCouponPlatform(e.target.value)}>
                          <option value="food">🍽️ Food</option>
                          <option value="ride">🚗 Ride</option>
                          <option value="skincare">✨ Skincare</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Discount Type *</label>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="radio" name="cdt" checked={couponDiscountType === 'percentage'} onChange={() => setCouponDiscountType('percentage')} /> Percentage (%)
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="radio" name="cdt" checked={couponDiscountType === 'fixed'} onChange={() => setCouponDiscountType('fixed')} /> Fixed Amount (৳)
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Discount Value *</label>
                        <div className="suffix-input-wrap">
                          <input type="number" className="form-input" value={couponDiscountValue} onChange={e => setCouponDiscountValue(e.target.value)} />
                          <span className="input-suffix-tag">{couponDiscountType === 'percentage' ? '%' : '৳'}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div className="form-group">
                        <label>Merchant / Partner *</label>
                        <select className="form-select" value={couponMerchant} onChange={e => setCouponMerchant(e.target.value)}>
                          <option value="foodpanda">🐼 foodpanda</option>
                          <option value="foodi">🔴 foodi</option>
                          <option value="pathao">🛵 pathao</option>
                          <option value="Uber">🚘 Uber</option>
                          <option value="OBHAI">🚕 OBHAI</option>
                          <option value="inDriver">🚙 inDriver</option>
                          <option value="Choice Legacy">💙 Choice Legacy</option>
                          <option value="Kirei">✨ Kirei</option>
                          <option value="Makeup Chari">💜 Makeup Chari</option>
                          <option value="BRAC BANK">🏦 BRAC BANK</option>
                          <option value="bKash">💳 bKash</option>
                          <option value="Nagad">💳 Nagad</option>
                        </select>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div className="form-group">
                          <label>Maximum Discount (%)</label>
                          <input type="text" className="form-input" placeholder="e.g. 100" value={couponMaxDiscount} onChange={e => setCouponMaxDiscount(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Minimum Order Amount (৳)</label>
                          <input type="text" className="form-input" placeholder="e.g. 250" value={couponMinOrder} onChange={e => setCouponMinOrder(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label>Offer Title *</label>
                      <input type="text" className="form-input" placeholder="e.g. 20% off on all orders" value={couponOfferTitle} onChange={e => setCouponOfferTitle(e.target.value)} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div className="form-group">
                        <label>Offer Type *</label>
                        <select className="form-select" value={couponOfferType} onChange={e => setCouponOfferType(e.target.value)}>
                          <option>General Discount</option>
                          <option>Bank Offer</option>
                          <option>Wallet Cashback</option>
                          <option>Free Delivery</option>
                          <option>Buy 1 Get 1</option>
                          <option>Student Discount</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Valid From *</label>
                        <input type="date" className="form-input" value={couponValidFrom} onChange={e => setCouponValidFrom(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Valid Till *</label>
                        <input type="date" className="form-input" value={couponValidTill} onChange={e => setCouponValidTill(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label>Applicable Payment Method</label>
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {[['all', 'All Methods'], ['card', 'Credit/Debit Card'], ['bkash', 'bKash'], ['nagad', 'Nagad'], ['cash', 'Cash on Delivery']].map(([key, label]) => (
                          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={couponPaymentMethods[key]}
                              onChange={() => setCouponPaymentMethods(prev => ({ ...prev, [key]: !prev[key] }))}
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label>Upload Banner (Optional)</label>
                      <div style={{ border: '2px dashed #334155', borderRadius: '10px', padding: '20px', textAlign: 'center', color: '#64748b', cursor: 'pointer', marginTop: '4px', fontSize: '13px' }}>
                        <div style={{ fontSize: '22px', marginBottom: '4px' }}>📤</div>
                        Drag &amp; drop or click to upload<br />
                        <span style={{ fontSize: '11px', color: '#475569' }}>(Recommended size: 1200 × 628)</span>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label>Description</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder={`e.g. Get 20% off on all ${couponMerchant} orders. T&C applied.`}
                        value={couponDescription}
                        onChange={e => setCouponDescription(e.target.value)}
                        maxLength={300}
                      ></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn-form-cancel" style={{ flex: 1 }} onClick={() => onToast('Cancelled')}>
                        Cancel
                      </button>
                      <button
                        className="btn-form-publish-pink"
                        style={{ flex: 2 }}
                        onClick={() => {
                          if (!couponOfferTitle.trim()) { onToast('Please enter an offer title'); return; }
                          const newOffer = {
                            id: Date.now(),
                            title: couponOfferTitle,
                            platform: couponPlatform,
                            merchant: couponMerchant,
                            merchantIcon: couponPlatform === 'food' ? '🍽️' : couponPlatform === 'ride' ? '🚗' : '✨',
                            discount: couponDiscountType === 'percentage' ? `${couponDiscountValue}%` : `৳${couponDiscountValue}`,
                            validTill: '30 Sep 2026',
                            status: 'Active'
                          };
                          setAllCoupons(prev => [newOffer, ...prev]);
                          setCouponOfferTitle('');
                          onToast(`Published "${newOffer.title}" for ${couponMerchant} 🚀`);
                        }}
                      >
                        <Send size={15} />
                        <span>Publish Offer</span>
                      </button>
                    </div>
                  </div>

                  {/* ---- MIDDLE: Quick Add Bank Offer + Wallet Offers ---- */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                    {/* Quick Add Bank Offer */}
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🏦</div>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Quick Add Bank Offer</h3>
                      </div>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label>Select Bank</label>
                        <select className="form-select" value={bankOfferBank} onChange={e => setBankOfferBank(e.target.value)}>
                          <option value="">Select Bank</option>
                          <option>BRAC Bank</option>
                          <option>Dutch-Bangla Bank (DBBL)</option>
                          <option>City Bank</option>
                          <option>Eastern Bank (EBL)</option>
                          <option>Standard Chartered</option>
                          <option>Islami Bank</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label>Discount Type</label>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="radio" name="bdt" checked={bankOfferDiscountType === 'percentage'} onChange={() => setBankOfferDiscountType('percentage')} /> Percentage (%)
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="radio" name="bdt" checked={bankOfferDiscountType === 'fixed'} onChange={() => setBankOfferDiscountType('fixed')} /> Fixed (৳)
                          </label>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        <div className="form-group">
                          <label>Discount Value</label>
                          <div className="suffix-input-wrap">
                            <input type="number" className="form-input" value={bankOfferDiscountValue} onChange={e => setBankOfferDiscountValue(e.target.value)} />
                            <span className="input-suffix-tag">{bankOfferDiscountType === 'percentage' ? '%' : '৳'}</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Valid Till</label>
                          <input type="date" className="form-input" value={bankOfferValidTill} onChange={e => setBankOfferValidTill(e.target.value)} />
                        </div>
                      </div>
                      <button
                        style={{ width: '100%', padding: '10px', background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                        onClick={() => onToast(`Bank offer added: ${bankOfferDiscountValue}${bankOfferDiscountType === 'percentage' ? '%' : '৳'} off with ${bankOfferBank || 'selected bank'}`)}
                      >
                        Add Bank Offer
                      </button>
                    </div>

                    {/* Wallet Offers */}
                    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💳</div>
                        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Wallet Offers</h3>
                      </div>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label>Select Wallet</label>
                        <div style={{ display: 'flex', gap: '14px', marginTop: '5px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: walletBkash ? '#fff' : '#94a3b8', cursor: 'pointer', fontWeight: walletBkash ? 700 : 400 }}>
                            <input type="checkbox" checked={walletBkash} onChange={() => setWalletBkash(!walletBkash)} /> bKash
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: walletNagad ? '#fff' : '#94a3b8', cursor: 'pointer', fontWeight: walletNagad ? 700 : 400 }}>
                            <input type="checkbox" checked={walletNagad} onChange={() => setWalletNagad(!walletNagad)} /> Nagad
                          </label>
                        </div>
                      </div>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label>Discount Type</label>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="radio" name="wdt" checked={walletDiscountType === 'percentage'} onChange={() => setWalletDiscountType('percentage')} /> Percentage (%)
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#94a3b8', cursor: 'pointer' }}>
                            <input type="radio" name="wdt" checked={walletDiscountType === 'fixed'} onChange={() => setWalletDiscountType('fixed')} /> Fixed (৳)
                          </label>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                        <div className="form-group">
                          <label>Discount Value</label>
                          <div className="suffix-input-wrap">
                            <input type="number" className="form-input" value={walletDiscountValue} onChange={e => setWalletDiscountValue(e.target.value)} />
                            <span className="input-suffix-tag">{walletDiscountType === 'percentage' ? '%' : '৳'}</span>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Valid Till</label>
                          <input type="date" className="form-input" value={walletValidTill} onChange={e => setWalletValidTill(e.target.value)} />
                        </div>
                      </div>
                      <button
                        style={{ width: '100%', padding: '10px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '9px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                        onClick={() => onToast(`Wallet offer added: ${walletDiscountValue}${walletDiscountType === 'percentage' ? '%' : '৳'} off`)}
                      >
                        Add Wallet Offer
                      </button>
                    </div>
                  </div>

                  {/* ---- RIGHT: Offer Preview (User View) ---- */}
                  <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>👁️</div>
                      <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Offer Preview (User View)</h3>
                    </div>

                    {/* Phone mockup */}
                    <div style={{ background: '#1a1a2e', borderRadius: '20px', border: '2px solid #334155', padding: '12px', maxWidth: '190px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
                      {/* App header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 800, fontSize: '14px' }}>Offer<span style={{ color: '#00c853' }}>Matrix</span></div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899' }}></div>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></div>
                        </div>
                      </div>

                      {/* Category pills */}
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '10px', flexWrap: 'wrap' }}>
                        {['🍽️ Food', '🚗 Ride', '✨ Skincare'].map(c => (
                          <span key={c} style={{ fontSize: '9px', background: c.includes('Food') ? '#ec489922' : '#1e293b', color: c.includes('Food') ? '#ec4899' : '#94a3b8', padding: '2px 6px', borderRadius: '99px', border: `1px solid ${c.includes('Food') ? '#ec489955' : '#334155'}` }}>{c}</span>
                        ))}
                      </div>

                      {/* Top Offers label */}
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Top Offers</div>

                      {/* Foodpanda offer card */}
                      <div style={{ background: '#ff2b70', borderRadius: '10px', padding: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ background: '#fff', borderRadius: '6px', padding: '4px 6px', fontSize: '10px', fontWeight: 800, color: '#ff2b70', lineHeight: 1 }}>🐼 fp</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#fff' }}>foodpanda</div>
                          <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{couponDiscountValue || '20'}% OFF</div>
                          <div style={{ fontSize: '8px', color: '#ffc0cb' }}>ON ALL ORDERS</div>
                          <div style={{ fontSize: '8px', color: '#ffd700', marginTop: '2px' }}>Via Code: F{couponDiscountValue || '20'}003</div>
                        </div>
                        <div style={{ fontSize: '20px' }}>🍔</div>
                      </div>

                      {/* Bank Offers label */}
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', marginBottom: '5px' }}>Bank Offers</div>

                      {/* BRAC Bank card */}
                      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)', borderRadius: '10px', padding: '8px', marginBottom: '8px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#60a5fa', marginBottom: '2px' }}>🏦 BRAC BANK</div>
                        <div style={{ fontSize: '14px', fontWeight: 900, color: '#fff' }}>{bankOfferDiscountValue || '15'}% OFF</div>
                        <div style={{ fontSize: '8px', color: '#93c5fd' }}>with BRAC Bank Card</div>
                      </div>

                      {/* Wallet Offers label */}
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', marginBottom: '5px' }}>Wallet Offers</div>

                      {/* bKash & Nagad */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                        <div style={{ background: '#e91e8c', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
                          <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff' }}>bKash</div>
                          <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff' }}>{walletDiscountValue || '50'}% off</div>
                          <div style={{ fontSize: '7px', color: '#ffc0cb' }}>Upto ৳150</div>
                        </div>
                        <div style={{ background: '#f97316', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
                          <div style={{ fontSize: '9px', fontWeight: 800, color: '#fff' }}>Nagad</div>
                          <div style={{ fontSize: '12px', fontWeight: 900, color: '#fff' }}>50% off</div>
                          <div style={{ fontSize: '7px', color: '#fed7aa' }}>Max ৳100</div>
                        </div>
                      </div>

                      {/* Bottom nav mockup */}
                      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #334155' }}>
                        {['🏠', '🎁', '📦', '👤'].map(i => <span key={i} style={{ fontSize: '14px', cursor: 'pointer' }}>{i}</span>)}
                      </div>
                    </div>
                  </div>

                </div>

                {/* All Offers & Coupons Table */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ticket size={15} color="#fff" />
                      </div>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>All Offers &amp; Coupons</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px' }}>
                        <Search size={13} color="#64748b" />
                        <input
                          type="text"
                          placeholder="Search offer title, merchant..."
                          value={couponSearchText}
                          onChange={e => setCouponSearchText(e.target.value)}
                          style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '12px', outline: 'none', width: '160px' }}
                        />
                      </div>
                      <select className="form-select" style={{ padding: '6px 10px', fontSize: '12px', width: 'auto' }} value={couponPlatformFilter} onChange={e => setCouponPlatformFilter(e.target.value)}>
                        <option>All</option>
                        <option value="food">Food</option>
                        <option value="ride">Ride</option>
                        <option value="skincare">Skincare</option>
                      </select>
                      <select className="form-select" style={{ padding: '6px 10px', fontSize: '12px', width: 'auto' }} value={couponStatusFilter} onChange={e => setCouponStatusFilter(e.target.value)}>
                        <option>All</option>
                        <option>Active</option>
                        <option>Scheduled</option>
                        <option>Expired</option>
                      </select>
                      <div style={{ fontSize: '12px', color: '#64748b', background: '#1e293b', padding: '6px 10px', borderRadius: '8px', border: '1px solid #334155', whiteSpace: 'nowrap' }}>📅 15 Sep 2026 – 30 Sep 2026</div>
                      <button
                        style={{ padding: '6px 14px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                        onClick={() => onToast('Exporting offers list...')}
                      >↓ Export</button>
                    </div>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '38px' }}><input type="checkbox" /></th>
                          <th style={{ width: '32px' }}>#</th>
                          <th>Offer Title</th>
                          <th>Platform</th>
                          <th>Merchant / Partner</th>
                          <th>Discount</th>
                          <th>Valid Till</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCoupons
                          .filter(c => {
                            const matchSearch = couponSearchText === '' || c.title.toLowerCase().includes(couponSearchText.toLowerCase()) || c.merchant.toLowerCase().includes(couponSearchText.toLowerCase());
                            const matchPlatform = couponPlatformFilter === 'All' || c.platform === couponPlatformFilter;
                            const matchStatus = couponStatusFilter === 'All' || c.status === couponStatusFilter;
                            return matchSearch && matchPlatform && matchStatus;
                          })
                          .map((c, idx) => (
                            <tr key={c.id} className="user-table-row">
                              <td><input type="checkbox" /></td>
                              <td className="col-num">{idx + 1}</td>
                              <td style={{ fontWeight: 700, color: '#ffffff' }}>{c.title}</td>
                              <td>
                                <span style={{ fontSize: '13px' }}>
                                  {c.platform === 'food' ? '🍽️' : c.platform === 'ride' ? '🚗' : '✨'}
                                </span>
                              </td>
                              <td style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '12px' }}>
                                <span style={{ fontSize: '13px' }}>{c.merchantIcon}</span>
                                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '13px' }}>{c.merchant}</span>
                              </td>
                              <td style={{ fontWeight: 800, color: '#ec4899' }}>{c.discount}</td>
                              <td className="col-date">{c.validTill}</td>
                              <td>
                                <span className={`status-badge-pill ${c.status.toLowerCase()}`}>{c.status}</span>
                              </td>
                              <td>
                                <div className="action-buttons-flex">
                                  <button className="btn-action-icon edit" title="Edit" onClick={() => onToast(`Editing: ${c.title}`)}>✏️</button>
                                  <button className="btn-action-icon" title="Duplicate" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.1)' }} onClick={() => onToast(`Duplicated: ${c.title}`)}>📋</button>
                                  <button className="btn-action-icon delete" title="Delete" onClick={() => { setAllCoupons(prev => prev.filter(o => o.id !== c.id)); onToast(`Deleted: ${c.title}`); }}>🗑️</button>
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>

                  <div className="table-pagination-footer">
                    <span>Showing 1 to {allCoupons.length} of {allCoupons.length} offers</span>
                    <div className="pagination-pills">
                      <button className="page-pill-btn">&lt;</button>
                      <button className="page-pill-btn active" style={{ background: '#ec4899' }}>1</button>
                      <button className="page-pill-btn">&gt;</button>
                    </div>
                  </div>
                </div>

              </div>
            )
          ) : activeTab === 'users' ? (

            /* USERS MANAGEMENT PAGE VIEW */
            <div className="users-page-container">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Users</span>
                  </div>
                  <h1 className="users-main-title">Users Management</h1>
                  <p className="users-main-sub">
                    View, manage and take action on all users. Keep the community safe and trusted.
                  </p>
                </div>

                <button
                  className="btn-add-user"
                  onClick={() => onToast('Opening Add New User Modal...')}
                >
                  <Plus size={18} />
                  <span>Add New User</span>
                </button>
              </div>

              <div className="admin-metrics-grid">
                <div className="metric-card-dark">
                  <div className="metric-icon-box blue">
                    <Users size={20} color="#3b82f6" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Total Users</span>
                    <h3 className="metric-value">12,480</h3>
                    <span className="metric-growth green">↑ 12% vs last month</span>
                  </div>
                </div>

                <div className="metric-card-dark">
                  <div className="metric-icon-box green">
                    <Store size={20} color="#10b981" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Active Users</span>
                    <h3 className="metric-value">11,210</h3>
                    <span className="metric-growth green">↑ 10% vs last month</span>
                  </div>
                </div>

                <div className="metric-card-dark">
                  <div className="metric-icon-box red">
                    <UserX size={20} color="#ef4444" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Suspended Users</span>
                    <h3 className="metric-value">320</h3>
                    <span className="metric-growth red">↑ 5% vs last month</span>
                  </div>
                </div>

                <div className="metric-card-dark">
                  <div className="metric-icon-box orange">
                    <AlertTriangle size={20} color="#f97316" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Reported Users</span>
                    <h3 className="metric-value">156</h3>
                    <span className="metric-growth red">↑ 18% vs last month</span>
                  </div>
                </div>
              </div>

              <div className={`users-content-layout ${showUserDetails ? 'with-sidebar' : 'full-width'}`}>
                <div className="users-table-container">
                  <div className="table-controls-bar">
                    <div className="filter-tabs-group">
                      <button
                        className={`filter-tab ${userFilterTab === 'all' ? 'active' : ''}`}
                        onClick={() => setUserFilterTab('all')}
                      >
                        All Users (12,480)
                      </button>
                      <button
                        className={`filter-tab ${userFilterTab === 'active' ? 'active' : ''}`}
                        onClick={() => setUserFilterTab('active')}
                      >
                        Active (11,210)
                      </button>
                      <button
                        className={`filter-tab ${userFilterTab === 'suspended' ? 'active' : ''}`}
                        onClick={() => setUserFilterTab('suspended')}
                      >
                        Suspended (320)
                      </button>
                      <button
                        className={`filter-tab ${userFilterTab === 'reported' ? 'active' : ''}`}
                        onClick={() => setUserFilterTab('reported')}
                      >
                        Reported (156)
                      </button>
                    </div>

                    <div className="search-controls-right">
                      <button className="btn-table-filter" onClick={() => onToast('Applied Filters')}>
                        <Filter size={15} />
                        <span>Filter</span>
                      </button>
                      <div className="table-search-box">
                        <Search size={15} color="#64748b" />
                        <input
                          type="text"
                          placeholder="Search user by name, email, phone..."
                          value={userSearchText}
                          onChange={(e) => setUserSearchText(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive-wrapper">
                    <table className="users-data-table">
                      <thead>
                        <tr>
                          <th style={{ width: '38px' }}>
                            <input
                              type="checkbox"
                              checked={selectedCheckboxes.length === usersList.length && usersList.length > 0}
                              onChange={toggleSelectAll}
                            />
                          </th>
                          <th style={{ width: '32px' }}>#</th>
                          <th>User</th>
                          <th>Contact</th>
                          <th>Joined Date</th>
                          <th>Status</th>
                          <th>Complaints</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, idx) => {
                          const isSelectedUser = selectedUser?.id === user.id;
                          return (
                            <tr
                              key={user.id}
                              className={`user-table-row ${isSelectedUser ? 'row-highlighted' : ''}`}
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserDetails(true);
                              }}
                            >
                              <td onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  checked={selectedCheckboxes.includes(user.id)}
                                  onChange={() => toggleSelectUser(user.id)}
                                />
                              </td>
                              <td className="col-num">{idx + 1}</td>
                              <td>
                                <div className="user-cell-flex">
                                  <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                                  <div className="user-cell-meta">
                                    <span className="user-cell-name">{user.name}</span>
                                    <span className="user-cell-email">{user.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="col-contact">{user.phone}</td>
                              <td className="col-date">{user.joined}</td>
                              <td>
                                <span className={`status-badge-pill ${user.status.toLowerCase()}`}>
                                  {user.status}
                                </span>
                              </td>
                              <td>
                                <span className={`complaints-count-text ${user.complaints > 0 ? 'has-complaints' : ''}`}>
                                  {user.complaints}
                                </span>
                              </td>
                              <td onClick={(e) => e.stopPropagation()}>
                                <div className="action-buttons-flex">
                                  <button
                                    className="btn-action-view"
                                    onClick={() => {
                                      setSelectedUser(user);
                                      setShowUserDetails(true);
                                    }}
                                  >
                                    View
                                  </button>

                                  {user.status === 'Suspended' ? (
                                    <button
                                      className="btn-action-activate"
                                      onClick={() => handleAction(user, 'activate')}
                                    >
                                      <Search size={12} />
                                      <span>Activate</span>
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        className="btn-action-warn"
                                        onClick={() => handleAction(user, 'warn')}
                                      >
                                        Warn
                                      </button>
                                      <button
                                        className="btn-action-suspend"
                                        onClick={() => handleAction(user, 'suspend')}
                                      >
                                        🚫 Suspend
                                      </button>
                                    </>
                                  )}

                                  <button className="btn-action-dots" title="More options">
                                    <MoreVertical size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="table-pagination-footer">
                    <div className="pagination-text">
                      Showing 1 to 10 of 12,480 users
                    </div>
                    <div className="pagination-pills">
                      <button className="page-pill-btn">&lt;</button>
                      <button className="page-pill-btn active">1</button>
                      <button className="page-pill-btn">2</button>
                      <button className="page-pill-btn">3</button>
                      <button className="page-pill-btn">4</button>
                      <button className="page-pill-btn">5</button>
                      <span className="page-dots">...</span>
                      <button className="page-pill-btn">1248</button>
                      <button className="page-pill-btn">&gt;</button>
                    </div>
                    <div className="pagination-per-page">
                      <span>Show</span>
                      <select className="per-page-select">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                      </select>
                      <span>per page</span>
                    </div>
                  </div>
                </div>

                {showUserDetails && selectedUser && (
                  <div className="user-details-panel animate-fade-in">
                    <div className="panel-header-row">
                      <h3>User Details</h3>
                      <button className="btn-close-panel" onClick={() => setShowUserDetails(false)}>
                        <X size={18} />
                      </button>
                    </div>

                    <div className="user-profile-header">
                      <img src={selectedUser.avatar} alt={selectedUser.name} className="profile-lg-avatar" />
                      <div className="profile-header-info">
                        <div className="profile-name-row">
                          <h4 className="profile-full-name">{selectedUser.name}</h4>
                          <span className={`status-badge-pill ${selectedUser.status.toLowerCase()}`}>
                            {selectedUser.status}
                          </span>
                        </div>
                        <div className="profile-meta-item">
                          <Mail size={13} color="#94a3b8" />
                          <span>{selectedUser.email}</span>
                        </div>
                        <div className="profile-meta-item">
                          <Phone size={13} color="#94a3b8" />
                          <span>{selectedUser.phone}</span>
                        </div>
                        <div className="profile-meta-item">
                          <Calendar size={13} color="#94a3b8" />
                          <span>Joined: {selectedUser.joined}</span>
                        </div>
                      </div>
                    </div>

                    <div className="panel-mini-stats-grid">
                      <div className="mini-stat-box">
                        <span className="mini-num red">{selectedUser.details?.complaintsCount ?? selectedUser.complaints}</span>
                        <span className="mini-label">Total Complaints</span>
                      </div>
                      <div className="mini-stat-box">
                        <span className="mini-num">{selectedUser.details?.reviewsCount ?? 5}</span>
                        <span className="mini-label">Total Reviews</span>
                      </div>
                      <div className="mini-stat-box">
                        <span className="mini-num">{selectedUser.details?.offersUsed ?? 12}</span>
                        <span className="mini-label">Offers Used</span>
                      </div>
                      <div className="mini-stat-box">
                        <span className="mini-num">{selectedUser.details?.savedDeals ?? 3}</span>
                        <span className="mini-label">Saved Deals</span>
                      </div>
                    </div>

                    <div className="panel-section">
                      <div className="panel-section-header">
                        <h4>Recent Complaints</h4>
                        <span className="link-view-all">View All</span>
                      </div>
                      <div className="panel-complaints-list">
                        {selectedUser.details?.recentComplaints && selectedUser.details.recentComplaints.length > 0 ? (
                          selectedUser.details.recentComplaints.map((c, i) => (
                            <div key={i} className="panel-complaint-card">
                              <div className="p-c-icon">🌸</div>
                              <div className="p-c-meta">
                                <span className="p-c-title">{c.title}</span>
                                <span className="p-c-sub">{c.sub}</span>
                              </div>
                              <span className="p-c-date">{c.date}</span>
                            </div>
                          ))
                        ) : (
                          <div className="empty-sub-note">No recent complaints filed.</div>
                        )}
                      </div>
                    </div>

                    <div className="panel-section">
                      <h4 className="panel-section-title">Recent Activity</h4>
                      <div className="timeline-list">
                        <div className="timeline-item">
                          <div className="timeline-dot-wrap">
                            <span className="t-dot green"></span>
                            <span className="t-line"></span>
                          </div>
                          <div className="t-content">
                            <span className="t-title">Logged in from Dhaka, BD</span>
                            <span className="t-date">Today, 10:24 AM</span>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-dot-wrap">
                            <span className="t-dot green"></span>
                            <span className="t-line"></span>
                          </div>
                          <div className="t-content">
                            <span className="t-title">Used an offer (foodpanda)</span>
                            <span className="t-date">14 Sep 2026, 02:15 PM</span>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-dot-wrap">
                            <span className="t-dot red"></span>
                            <span className="t-line"></span>
                          </div>
                          <div className="t-content">
                            <span className="t-title">Submitted a complaint</span>
                            <span className="t-date">12 Sep 2026, 11:30 AM</span>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-dot-wrap">
                            <span className="t-dot gray"></span>
                          </div>
                          <div className="t-content">
                            <span className="t-title">Account created</span>
                            <span className="t-date">12 Aug 2026, 09:10 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="panel-actions-block">
                      <button
                        className="btn-send-message-blue"
                        onClick={() => onToast(`Message composer opened for ${selectedUser.name}`)}
                      >
                        <Mail size={16} />
                        <span>Send Message</span>
                      </button>

                      <div className="two-buttons-row">
                        <button
                          className="btn-warn-user-gold"
                          onClick={() => handleAction(selectedUser, 'warn')}
                        >
                          <AlertTriangle size={15} />
                          <span>Warn User</span>
                        </button>
                        <button
                          className="btn-suspend-user-red"
                          onClick={() => handleAction(selectedUser, 'suspend')}
                        >
                          <UserX size={15} />
                          <span>Suspend User</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'complaints' ? (

            /* =========================================================
               1. COMPLAINTS PAGE VIEW (USER & MERCHANT ACCOUNTS)
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Complaints</span>
                  </div>
                  <h1 className="users-main-title">Complaints &amp; Support Center</h1>
                  <p className="users-main-sub">
                    Review and resolve complaints reported by User Accounts and Merchant Accounts.
                  </p>
                </div>

                <div className="account-type-toggle-bar">
                  <button
                    className={`account-toggle-btn ${complaintsAccountType === 'user' ? 'user-active' : ''}`}
                    onClick={() => setComplaintsAccountType('user')}
                  >
                    <Users size={16} />
                    <span>User Accounts (187)</span>
                  </button>
                  <button
                    className={`account-toggle-btn ${complaintsAccountType === 'merchant' ? 'merchant-active' : ''}`}
                    onClick={() => setComplaintsAccountType('merchant')}
                  >
                    <Store size={16} />
                    <span>Merchants Account (42)</span>
                  </button>
                </div>
              </div>

              {complaintsAccountType === 'user' ? (
                <>
                  <div className="admin-metrics-grid">
                    <div className="metric-card-dark">
                      <div className="metric-icon-box red">
                        <MessageSquare size={20} color="#ef4444" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Total User Complaints</span>
                        <h3 className="metric-value">187</h3>
                        <span className="metric-growth red">↑ 14% vs last month</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box orange">
                        <Clock size={20} color="#f97316" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Pending Resolution</span>
                        <h3 className="metric-value">42</h3>
                        <span className="metric-growth green">↓ 5% faster response</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box green">
                        <CheckCircle2 size={20} color="#10b981" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Resolved Tickets</span>
                        <h3 className="metric-value">145</h3>
                        <span className="metric-growth green">94% resolution rate</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box pink">
                        <Sparkles size={20} color="#ec4899" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Premium User Priority</span>
                        <h3 className="metric-value">12</h3>
                        <span className="metric-growth pink">VIP Fast-track</span>
                      </div>
                    </div>
                  </div>

                  <div className="users-table-container">
                    <div className="table-controls-bar">
                      <div className="filter-tabs-group">
                        <button
                          className={`filter-tab ${complaintCategoryFilter === 'all' ? 'active' : ''}`}
                          onClick={() => setComplaintCategoryFilter('all')}
                        >
                          All (187)
                        </button>
                        <button
                          className={`filter-tab ${complaintCategoryFilter === 'food' ? 'active' : ''}`}
                          onClick={() => setComplaintCategoryFilter('food')}
                        >
                          🍔 Food (72)
                        </button>
                        <button
                          className={`filter-tab ${complaintCategoryFilter === 'ride' ? 'active' : ''}`}
                          onClick={() => setComplaintCategoryFilter('ride')}
                        >
                          🚗 Ride (68)
                        </button>
                        <button
                          className={`filter-tab ${complaintCategoryFilter === 'skincare' ? 'active' : ''}`}
                          onClick={() => setComplaintCategoryFilter('skincare')}
                        >
                          ✨ Skincare (47)
                        </button>
                      </div>

                      <div className="search-controls-right">
                        <select
                          className="setting-input-select"
                          value={complaintTierFilter}
                          onChange={(e) => setComplaintTierFilter(e.target.value)}
                        >
                          <option value="all">All User Tiers</option>
                          <option value="premium">⭐ Premium Users Only</option>
                          <option value="standard">🛡️ Standard Users Only</option>
                        </select>

                        <div className="table-search-box">
                          <Search size={15} color="#64748b" />
                          <input
                            type="text"
                            placeholder="Search user complaints..."
                            value={complaintSearch}
                            onChange={(e) => setComplaintSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive-wrapper">
                      <table className="users-data-table">
                        <thead>
                          <tr>
                            <th>Ticket ID</th>
                            <th>User &amp; Tier</th>
                            <th>Subject</th>
                            <th>Category</th>
                            <th>Target Merchant</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="user-table-row">
                            <td className="col-contact">#CMP-9042</td>
                            <td>
                              <div className="user-cell-flex">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Nusrat" className="user-avatar-small" />
                                <div>
                                  <div className="user-cell-name">Nusrat Jahan</div>
                                  <span className="tier-badge-pill premium">⭐ Premium User</span>
                                </div>
                              </div>
                            </td>
                            <td><strong>Expired promo code on foodpanda order</strong></td>
                            <td><span className="status-pill active" style={{ background: '#db2777' }}>Food</span></td>
                            <td>foodpanda</td>
                            <td className="col-date">15 Sep 2026</td>
                            <td><span className="status-pill pending">In Progress</span></td>
                            <td>
                              <div className="action-buttons-flex">
                                <button className="btn-action-view" onClick={() => onToast('Viewing Complaint #CMP-9042')}>View</button>
                                <button className="btn-action-activate" onClick={() => onToast('Resolved Ticket #CMP-9042')}>Resolve</button>
                              </div>
                            </td>
                          </tr>

                          <tr className="user-table-row">
                            <td className="col-contact">#CMP-8812</td>
                            <td>
                              <div className="user-cell-flex">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Tanvir" className="user-avatar-small" />
                                <div>
                                  <div className="user-cell-name">Tanvir Rahman</div>
                                  <span className="tier-badge-pill standard">🛡️ Standard User</span>
                                </div>
                              </div>
                            </td>
                            <td><strong>Driver overcharged distance fare on Uber</strong></td>
                            <td><span className="status-pill active" style={{ background: '#2563eb' }}>Ride</span></td>
                            <td>Uber BD</td>
                            <td className="col-date">14 Sep 2026</td>
                            <td><span className="status-pill active">Resolved</span></td>
                            <td>
                              <div className="action-buttons-flex">
                                <button className="btn-action-view" onClick={() => onToast('Viewing Complaint #CMP-8812')}>View</button>
                              </div>
                            </td>
                          </tr>

                          <tr className="user-table-row">
                            <td className="col-contact">#CMP-7640</td>
                            <td>
                              <div className="user-cell-flex">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Samiha" className="user-avatar-small" />
                                <div>
                                  <div className="user-cell-name">Samiha Islam</div>
                                  <span className="tier-badge-pill premium">⭐ Premium User</span>
                                </div>
                              </div>
                            </td>
                            <td><strong>Damaged serum box received from Choice Legacy</strong></td>
                            <td><span className="status-pill active" style={{ background: '#f59e0b' }}>Skincare</span></td>
                            <td>Choice Legacy</td>
                            <td className="col-date">13 Sep 2026</td>
                            <td><span className="status-pill inactive">Open</span></td>
                            <td>
                              <div className="action-buttons-flex">
                                <button className="btn-action-view" onClick={() => onToast('Viewing Complaint #CMP-7640')}>View</button>
                                <button className="btn-action-activate" onClick={() => onToast('Resolved Ticket #CMP-7640')}>Resolve</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-metrics-grid">
                    <div className="metric-card-dark">
                      <div className="metric-icon-box blue">
                        <Store size={20} color="#3b82f6" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Merchant Disputes</span>
                        <h3 className="metric-value">42</h3>
                        <span className="metric-growth green">↓ 8% this month</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box green">
                        <Ticket size={20} color="#10b981" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Settlement Claims</span>
                        <h3 className="metric-value">18</h3>
                        <span className="metric-growth green">90% processed</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box orange">
                        <AlertTriangle size={20} color="#f97316" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Fraudulent Claim Appeals</span>
                        <h3 className="metric-value">14</h3>
                        <span className="metric-growth red">Pending Audit</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box gold">
                        <ShieldCheck size={20} color="#f59e0b" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Premium Merchant Support</span>
                        <h3 className="metric-value">10</h3>
                        <span className="metric-growth green">Priority SLA</span>
                      </div>
                    </div>
                  </div>

                  <div className="users-table-container">
                    <div className="table-controls-bar">
                      <div className="filter-tabs-group">
                        <button className="filter-tab active">All Merchants (42)</button>
                        <button className="filter-tab">Food Merchants (18)</button>
                        <button className="filter-tab">Ride Partners (14)</button>
                        <button className="filter-tab">Skincare Brands (10)</button>
                      </div>

                      <div className="search-controls-right">
                        <select className="setting-input-select">
                          <option value="all">All Merchant Tiers</option>
                          <option value="premium">💎 Premium Merchants</option>
                          <option value="standard">🏬 Standard Merchants</option>
                        </select>

                        <div className="table-search-box">
                          <Search size={15} color="#64748b" />
                          <input type="text" placeholder="Search merchant tickets..." />
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive-wrapper">
                      <table className="users-data-table">
                        <thead>
                          <tr>
                            <th>Ticket ID</th>
                            <th>Merchant &amp; Tier</th>
                            <th>Issue Category</th>
                            <th>Subject</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="user-table-row">
                            <td className="col-contact">#MCH-4021</td>
                            <td>
                              <div className="user-cell-flex">
                                <div className="merchant-logo-thumb panda">🐼</div>
                                <div>
                                  <div className="user-cell-name">Foodpanda BD</div>
                                  <span className="tier-badge-pill merchant-premium">💎 Premium Merchant</span>
                                </div>
                              </div>
                            </td>
                            <td>Settlement</td>
                            <td><strong>Commission calculation mismatch on August offer</strong></td>
                            <td className="col-date">15 Sep 2026</td>
                            <td><span className="status-pill pending">Under Review</span></td>
                            <td>
                              <div className="action-buttons-flex">
                                <button className="btn-action-view" onClick={() => onToast('Auditing Merchant Dispute #MCH-4021')}>Audit</button>
                                <button className="btn-action-activate" onClick={() => onToast('Resolved Merchant Dispute #MCH-4021')}>Resolve</button>
                              </div>
                            </td>
                          </tr>

                          <tr className="user-table-row">
                            <td className="col-contact">#MCH-3990</td>
                            <td>
                              <div className="user-cell-flex">
                                <div className="merchant-logo-thumb uber">Uber</div>
                                <div>
                                  <div className="user-cell-name">Uber Mobility</div>
                                  <span className="tier-badge-pill merchant-premium">💎 Premium Merchant</span>
                                </div>
                              </div>
                            </td>
                            <td>Fraud Claim</td>
                            <td><strong>Appeal regarding user fake discount claims</strong></td>
                            <td className="col-date">13 Sep 2026</td>
                            <td><span className="status-pill active">Resolved</span></td>
                            <td>
                              <div className="action-buttons-flex">
                                <button className="btn-action-view" onClick={() => onToast('Viewing Merchant Ticket #MCH-3990')}>View</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === 'reviews' ? (

            /* =========================================================
               2. REVIEWS & FEEDBACK PAGE VIEW (USER & MERCHANT ACCOUNTS)
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Reviews &amp; Feedback</span>
                  </div>
                  <h1 className="users-main-title">Reviews &amp; Feedback Center</h1>
                  <p className="users-main-sub">
                    Monitor user ratings, deal comments, and feedback submitted by Merchant Accounts.
                  </p>
                </div>

                <div className="account-type-toggle-bar">
                  <button
                    className={`account-toggle-btn ${reviewsAccountType === 'user' ? 'user-active' : ''}`}
                    onClick={() => setReviewsAccountType('user')}
                  >
                    <Users size={16} />
                    <span>User Accounts (4,820)</span>
                  </button>
                  <button
                    className={`account-toggle-btn ${reviewsAccountType === 'merchant' ? 'merchant-active' : ''}`}
                    onClick={() => setReviewsAccountType('merchant')}
                  >
                    <Store size={16} />
                    <span>Merchants Account (320)</span>
                  </button>
                </div>
              </div>

              {reviewsAccountType === 'user' ? (
                <>
                  <div className="admin-metrics-grid">
                    <div className="metric-card-dark">
                      <div className="metric-icon-box gold">
                        <Star size={20} color="#f59e0b" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Avg User Rating</span>
                        <h3 className="metric-value">4.7 / 5.0</h3>
                        <span className="metric-growth green">↑ 4.8k Total Reviews</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box pink">
                        <Sparkles size={20} color="#ec4899" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Premium User Reviews</span>
                        <h3 className="metric-value">1,240</h3>
                        <span className="metric-growth pink">⭐ Verified Buyers</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box red">
                        <AlertTriangle size={20} color="#ef4444" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Flagged / Spam Reviews</span>
                        <h3 className="metric-value">34</h3>
                        <span className="metric-growth red">Needs Moderation</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box green">
                        <UserCheck size={20} color="#10b981" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Verified Purchase Reviews</span>
                        <h3 className="metric-value">4,210</h3>
                        <span className="metric-growth green">87% Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="users-table-container">
                    <div className="table-controls-bar">
                      <div className="filter-tabs-group">
                        <button className="filter-tab active">All Ratings</button>
                        <button className="filter-tab">5 ⭐ (3,400)</button>
                        <button className="filter-tab">4 ⭐ (1,100)</button>
                        <button className="filter-tab">3 ⭐ or lower (320)</button>
                      </div>

                      <div className="search-controls-right">
                        <select
                          className="setting-input-select"
                          value={reviewTierFilter}
                          onChange={(e) => setReviewTierFilter(e.target.value)}
                        >
                          <option value="all">All User Tiers</option>
                          <option value="premium">⭐ Premium Users Only</option>
                          <option value="standard">🛡️ Standard Users Only</option>
                        </select>
                      </div>
                    </div>

                    <div className="cms-items-list">
                      <div className="review-item-card">
                        <div className="users-header-row">
                          <div className="user-cell-flex">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Nusrat" className="user-avatar-small" />
                            <div>
                              <span className="user-cell-name">Nusrat Jahan</span>
                              <span className="tier-badge-pill premium" style={{ marginLeft: '8px' }}>⭐ Premium User</span>
                            </div>
                          </div>
                          <div className="stars-rating-row">
                            ★★★★★ <span style={{ color: '#ffffff', fontSize: '13px', marginLeft: '6px' }}>5.0</span>
                          </div>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '13.5px', marginTop: '6px' }}>
                          "Foodpanda 50% discount coupon applied smoothly without any errors. Food arrived hot in 25 mins!"
                        </p>
                        <div className="setting-info-sub">Reviewed: <strong>Foodpanda 50% Off Deal</strong> • 15 Sep 2026</div>
                        <div className="action-buttons-flex" style={{ marginTop: '8px' }}>
                          <button className="btn-action-activate" onClick={() => onToast('Review Approved')}>Approve</button>
                          <button className="btn-action-warn" onClick={() => onToast('Review Flagged')}>Flag</button>
                        </div>
                      </div>

                      <div className="review-item-card">
                        <div className="users-header-row">
                          <div className="user-cell-flex">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Tanvir" className="user-avatar-small" />
                            <div>
                              <span className="user-cell-name">Tanvir Rahman</span>
                              <span className="tier-badge-pill standard" style={{ marginLeft: '8px' }}>🛡️ Standard User</span>
                            </div>
                          </div>
                          <div className="stars-rating-row">
                            ★★★★☆ <span style={{ color: '#ffffff', fontSize: '13px', marginLeft: '6px' }}>4.0</span>
                          </div>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '13.5px', marginTop: '6px' }}>
                          "Uber ride promo code worked nicely. Saved ৳80 on trip to Gulshan."
                        </p>
                        <div className="setting-info-sub">Reviewed: <strong>Uber 20% Off 3 Rides</strong> • 14 Sep 2026</div>
                        <div className="action-buttons-flex" style={{ marginTop: '8px' }}>
                          <button className="btn-action-activate" onClick={() => onToast('Review Approved')}>Approve</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-metrics-grid">
                    <div className="metric-card-dark">
                      <div className="metric-icon-box green">
                        <Store size={20} color="#10b981" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Merchant Satisfaction</span>
                        <h3 className="metric-value">94.2%</h3>
                        <span className="metric-growth green">High Partner Trust</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box gold">
                        <Star size={20} color="#f59e0b" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Avg Merchant Rating</span>
                        <h3 className="metric-value">4.6 / 5.0</h3>
                        <span className="metric-growth green">320 Merchants</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box blue">
                        <MessageSquare size={20} color="#3b82f6" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Platform Feature Feedback</span>
                        <h3 className="metric-value">58</h3>
                        <span className="metric-growth blue">Product Suggestions</span>
                      </div>
                    </div>
                  </div>

                  <div className="users-table-container">
                    <div className="cms-items-list">
                      <div className="review-item-card">
                        <div className="users-header-row">
                          <div className="user-cell-flex">
                            <div className="merchant-logo-thumb panda">🐼</div>
                            <div>
                              <span className="user-cell-name">Foodpanda Merchant Team</span>
                              <span className="tier-badge-pill merchant-premium" style={{ marginLeft: '8px' }}>💎 Premium Merchant</span>
                            </div>
                          </div>
                          <div className="stars-rating-row">
                            ★★★★★ <span style={{ color: '#ffffff', fontSize: '13px', marginLeft: '6px' }}>5.0</span>
                          </div>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '13.5px', marginTop: '6px' }}>
                          "OfferMatrix platform brought 35% higher campaign conversions for our lunchtime offers!"
                        </p>
                        <div className="setting-info-sub">Category: <strong>Campaign Performance Feedback</strong> • 15 Sep 2026</div>
                        <div className="action-buttons-flex" style={{ marginTop: '8px' }}>
                          <button className="btn-action-activate" onClick={() => onToast('Responded to Merchant')}>Respond to Partner</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === 'reports' ? (

            /* =========================================================
               3. REPORTS & ANALYTICS PAGE VIEW (USER & MERCHANT ACCOUNTS)
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Reports &amp; Analytics</span>
                  </div>
                  <h1 className="users-main-title">Reports &amp; Analytics Hub</h1>
                  <p className="users-main-sub">
                    Deep analytics and growth metrics for User Accounts and Merchant Accounts.
                  </p>
                </div>

                <div className="account-type-toggle-bar">
                  <button
                    className={`account-toggle-btn ${reportsAccountType === 'user' ? 'user-active' : ''}`}
                    onClick={() => setReportsAccountType('user')}
                  >
                    <Users size={16} />
                    <span>User Analytics</span>
                  </button>
                  <button
                    className={`account-toggle-btn ${reportsAccountType === 'merchant' ? 'merchant-active' : ''}`}
                    onClick={() => setReportsAccountType('merchant')}
                  >
                    <Store size={16} />
                    <span>Merchant Analytics</span>
                  </button>
                </div>
              </div>

              {reportsAccountType === 'user' ? (
                <>
                  <div className="admin-metrics-grid">
                    <div className="metric-card-dark">
                      <div className="metric-icon-box blue">
                        <Users size={20} color="#3b82f6" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Monthly Active Users</span>
                        <h3 className="metric-value">12,480</h3>
                        <span className="metric-growth green">↑ 16% growth</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box pink">
                        <Sparkles size={20} color="#ec4899" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Premium User Ratio</span>
                        <h3 className="metric-value">18.5%</h3>
                        <span className="metric-growth pink">2,308 Premium Users</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box green">
                        <TrendingUp size={20} color="#10b981" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">User Total Savings</span>
                        <h3 className="metric-value">৳1,450,000</h3>
                        <span className="metric-growth green">Saved across all deals</span>
                      </div>
                    </div>
                  </div>

                  <div className="users-table-container">
                    <div className="users-header-row" style={{ marginBottom: '16px' }}>
                      <h3>User Growth &amp; Sector Engagement Report</h3>
                      <button className="btn-add-user" onClick={() => onToast('Exporting User Report CSV...')}>
                        <FileText size={16} />
                        <span>Export User Report (CSV)</span>
                      </button>
                    </div>

                    <div className="admin-charts-grid">
                      <div className="admin-chart-card">
                        <h4>User Deal Redemptions by Category</h4>
                        <p className="setting-info-sub">Food: 45% • Ride: 35% • Skincare: 20%</p>
                      </div>
                      <div className="admin-chart-card">
                        <h4>Standard vs Premium User Activity Ratio</h4>
                        <p className="setting-info-sub">Premium users claim 3.4x more deals on average.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="admin-metrics-grid">
                    <div className="metric-card-dark">
                      <div className="metric-icon-box green">
                        <Store size={20} color="#10b981" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Active Merchants</span>
                        <h3 className="metric-value">320</h3>
                        <span className="metric-growth green">↑ 12 new this month</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box gold">
                        <BarChart2 size={20} color="#f59e0b" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Merchant Gross Revenue</span>
                        <h3 className="metric-value">৳8,920,000</h3>
                        <span className="metric-growth green">↑ 22% ROI boost</span>
                      </div>
                    </div>

                    <div className="metric-card-dark">
                      <div className="metric-icon-box blue">
                        <Ticket size={20} color="#3b82f6" />
                      </div>
                      <div className="metric-content">
                        <span className="metric-label">Merchant Deal Impressions</span>
                        <h3 className="metric-value">1,450,000</h3>
                        <span className="metric-growth blue">High Impression Rate</span>
                      </div>
                    </div>
                  </div>

                  <div className="users-table-container">
                    <div className="users-header-row" style={{ marginBottom: '16px' }}>
                      <h3>Merchant ROI &amp; Sector Performance Report</h3>
                      <button className="btn-add-user" onClick={() => onToast('Exporting Merchant Report CSV...')}>
                        <FileText size={16} />
                        <span>Export Merchant Report (CSV)</span>
                      </button>
                    </div>

                    <div className="admin-charts-grid">
                      <div className="admin-chart-card">
                        <h4>Premium Merchant vs Standard Merchant Campaign Reach</h4>
                        <p className="setting-info-sub">Premium Merchants achieve 4.2x higher click-through conversion.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === 'notifications' ? (

            /* =========================================================
               4. NOTIFICATIONS PAGE VIEW (USER & MERCHANT ACCOUNTS)
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Notifications</span>
                  </div>
                  <h1 className="users-main-title">Notifications &amp; Broadcast Center</h1>
                  <p className="users-main-sub">
                    Send target announcements and push updates to User Accounts and Merchant Accounts.
                  </p>
                </div>

                <div className="account-type-toggle-bar">
                  <button
                    className={`account-toggle-btn ${notificationsAccountType === 'user' ? 'user-active' : ''}`}
                    onClick={() => setNotificationsAccountType('user')}
                  >
                    <Users size={16} />
                    <span>User Broadcasts</span>
                  </button>
                  <button
                    className={`account-toggle-btn ${notificationsAccountType === 'merchant' ? 'merchant-active' : ''}`}
                    onClick={() => setNotificationsAccountType('merchant')}
                  >
                    <Store size={16} />
                    <span>Merchant Broadcasts</span>
                  </button>
                </div>
              </div>

              {notificationsAccountType === 'user' ? (
                <>
                  <div className="notif-composer-card">
                    <h3 style={{ color: '#ffffff', fontSize: '17px', fontWeight: '800' }}>📢 Send User Announcement / Broadcast</h3>
                    <div className="notif-form-grid">
                      <div>
                        <label className="setting-info-title">Target User Group</label>
                        <select
                          className="setting-input-select"
                          style={{ width: '100%', marginTop: '6px' }}
                          value={notifTargetTier}
                          onChange={(e) => setNotifTargetTier(e.target.value)}
                        >
                          <option value="all">All Users (12,480)</option>
                          <option value="premium">⭐ Premium Users Only (2,308)</option>
                          <option value="standard">🛡️ Standard Users Only (10,172)</option>
                        </select>
                      </div>

                      <div>
                        <label className="setting-info-title">Notification Category</label>
                        <select className="setting-input-select" style={{ width: '100%', marginTop: '6px' }}>
                          <option>🔥 Flash Promo Alert</option>
                          <option>📢 System Announcement</option>
                          <option>🎁 Reward Notification</option>
                        </select>
                      </div>

                      <div className="notif-form-full">
                        <label className="setting-info-title">Title</label>
                        <input
                          type="text"
                          className="setting-input-select"
                          style={{ width: '100%', marginTop: '6px' }}
                          placeholder="e.g. 50% Off Weekend Sale is Live!"
                          value={notifTitleInput}
                          onChange={(e) => setNotifTitleInput(e.target.value)}
                        />
                      </div>

                      <div className="notif-form-full">
                        <label className="setting-info-title">Message Body</label>
                        <textarea
                          className="setting-input-select"
                          style={{ width: '100%', marginTop: '6px', height: '70px', resize: 'vertical' }}
                          placeholder="Type notification message visible on user dashboards..."
                          value={notifBodyInput}
                          onChange={(e) => setNotifBodyInput(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      className="btn-add-user"
                      style={{ marginTop: '16px' }}
                      onClick={() => {
                        onToast('User Push Broadcast Sent Successfully!');
                        setNotifTitleInput('');
                        setNotifBodyInput('');
                      }}
                    >
                      <Send size={16} />
                      <span>Send User Notification</span>
                    </button>
                  </div>

                  <div className="users-table-container">
                    <h3>Sent User Notifications Log</h3>
                    <div className="table-responsive-wrapper" style={{ marginTop: '14px' }}>
                      <table className="users-data-table">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Target Group</th>
                            <th>Category</th>
                            <th>Sent Date</th>
                            <th>Reach</th>
                            <th>Open Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="user-table-row">
                            <td><strong>🔥 Foodpanda 50% Lunch Special Live!</strong></td>
                            <td><span className="tier-badge-pill premium">⭐ Premium Users</span></td>
                            <td>Flash Promo</td>
                            <td className="col-date">15 Sep 2026</td>
                            <td>2,308 users</td>
                            <td><span className="status-pill active">84%</span></td>
                          </tr>
                          <tr className="user-table-row">
                            <td><strong>📢 Welcome New Uber Discount Codes!</strong></td>
                            <td><span className="tier-badge-pill standard">🛡️ Standard Users</span></td>
                            <td>Announcement</td>
                            <td className="col-date">14 Sep 2026</td>
                            <td>10,172 users</td>
                            <td><span className="status-pill active">76%</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="notif-composer-card">
                    <h3 style={{ color: '#ffffff', fontSize: '17px', fontWeight: '800' }}>🏪 Send Merchant Announcement Broadcast</h3>
                    <div className="notif-form-grid">
                      <div>
                        <label className="setting-info-title">Target Merchant Segment</label>
                        <select className="setting-input-select" style={{ width: '100%', marginTop: '6px' }}>
                          <option>All Merchants (320)</option>
                          <option>💎 Premium Merchants Only (85)</option>
                          <option>🏬 Standard Merchants Only (235)</option>
                          <option>Food Sector Merchants</option>
                          <option>Ride Partner Companies</option>
                          <option>Skincare Partner Brands</option>
                        </select>
                      </div>

                      <div>
                        <label className="setting-info-title">Announcement Category</label>
                        <select className="setting-input-select" style={{ width: '100%', marginTop: '6px' }}>
                          <option>📜 Platform Policy Update</option>
                          <option>💸 Monthly Settlement Notice</option>
                          <option>⚡ Campaign Boost Alert</option>
                        </select>
                      </div>

                      <div className="notif-form-full">
                        <label className="setting-info-title">Title</label>
                        <input
                          type="text"
                          className="setting-input-select"
                          style={{ width: '100%', marginTop: '6px' }}
                          placeholder="e.g. Monthly Payout Settlement Schedule Ready"
                        />
                      </div>

                      <div className="notif-form-full">
                        <label className="setting-info-title">Notice Message</label>
                        <textarea
                          className="setting-input-select"
                          style={{ width: '100%', marginTop: '6px', height: '70px', resize: 'vertical' }}
                          placeholder="Write notice to be displayed in merchant portal..."
                        />
                      </div>
                    </div>

                    <button
                      className="btn-add-user"
                      style={{ marginTop: '16px', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                      onClick={() => onToast('Merchant Announcement Broadcast Sent!')}
                    >
                      <Send size={16} />
                      <span>Send Merchant Notice</span>
                    </button>
                  </div>

                  <div className="users-table-container">
                    <h3>Sent Merchant Notifications Log</h3>
                    <div className="table-responsive-wrapper" style={{ marginTop: '14px' }}>
                      <table className="users-data-table">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Target Segment</th>
                            <th>Category</th>
                            <th>Sent Date</th>
                            <th>Reach</th>
                            <th>Read Rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="user-table-row">
                            <td><strong>💸 August Payout Statements Published</strong></td>
                            <td><span className="tier-badge-pill merchant-premium">💎 Premium Merchants</span></td>
                            <td>Settlement</td>
                            <td className="col-date">15 Sep 2026</td>
                            <td>85 merchants</td>
                            <td><span className="status-pill active">96%</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : activeTab === 'content' ? (

            /* =========================================================
               5. MANAGE CONTENT PAGE VIEW (USER & MERCHANT ACCOUNTS)
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Manage Content</span>
                  </div>
                  <h1 className="users-main-title">Content Management System</h1>
                  <p className="users-main-sub">
                    Customize homepage banners, FAQs, and portal announcements for User and Merchant accounts.
                  </p>
                </div>

                <div className="account-type-toggle-bar">
                  <button
                    className={`account-toggle-btn ${contentAccountType === 'user' ? 'user-active' : ''}`}
                    onClick={() => setContentAccountType('user')}
                  >
                    <Users size={16} />
                    <span>User-Facing Content</span>
                  </button>
                  <button
                    className={`account-toggle-btn ${contentAccountType === 'merchant' ? 'merchant-active' : ''}`}
                    onClick={() => setContentAccountType('merchant')}
                  >
                    <Store size={16} />
                    <span>Merchant-Facing Content</span>
                  </button>
                </div>
              </div>

              {contentAccountType === 'user' ? (
                <div className="admin-settings-grid">
                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <Sparkles size={20} color="#ec4899" />
                      <h3>User Hero Promoted Banners</h3>
                    </div>

                    <div className="cms-items-list">
                      <div className="cms-banner-card">
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=150&q=80" alt="Banner 1" className="cms-banner-thumb" />
                        <div>
                          <div className="setting-info-title">Food &amp; Dining Mega Festival</div>
                          <span className="tier-badge-pill premium">⭐ Premium &amp; Standard</span>
                        </div>
                        <span className="status-pill active">Active</span>
                      </div>

                      <div className="cms-banner-card">
                        <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=150&q=80" alt="Banner 2" className="cms-banner-thumb" />
                        <div>
                          <div className="setting-info-title">Uber Rides Weekend Discounts</div>
                          <span className="tier-badge-pill standard">🛡️ Standard Users</span>
                        </div>
                        <span className="status-pill active">Active</span>
                      </div>
                    </div>

                    <button className="btn-add-user" style={{ marginTop: '10px' }} onClick={() => onToast('Add Banner Modal Opened')}>
                      <Plus size={16} />
                      <span>Add New User Banner</span>
                    </button>
                  </div>

                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <FileText size={20} color="#3b82f6" />
                      <h3>User Help &amp; FAQ Articles</h3>
                    </div>

                    <div className="cms-items-list">
                      <div className="setting-row-item">
                        <div>
                          <div className="setting-info-title">How to redeem instant foodpanda promo code?</div>
                          <div className="setting-info-sub">Category: Deal Redemptions</div>
                        </div>
                        <button className="btn-action-view" onClick={() => onToast('Edit FAQ')}>Edit</button>
                      </div>

                      <div className="setting-row-item">
                        <div>
                          <div className="setting-info-title">What are the perks of Premium User Subscription?</div>
                          <div className="setting-info-sub">Category: Membership</div>
                        </div>
                        <button className="btn-action-view" onClick={() => onToast('Edit FAQ')}>Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="admin-settings-grid">
                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <Store size={20} color="#10b981" />
                      <h3>Merchant Portal Banners &amp; Spotlights</h3>
                    </div>

                    <div className="cms-items-list">
                      <div className="cms-banner-card">
                        <div>
                          <div className="setting-info-title">Upgrade to Premium Merchant Tier for 3x Reach</div>
                          <span className="tier-badge-pill merchant-premium">💎 Merchant Portal</span>
                        </div>
                        <span className="status-pill active">Active</span>
                      </div>
                    </div>

                    <button className="btn-add-user" style={{ marginTop: '10px', background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={() => onToast('Add Merchant Banner')}>
                      <Plus size={16} />
                      <span>Add Merchant Banner</span>
                    </button>
                  </div>

                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <ShieldCheck size={20} color="#f59e0b" />
                      <h3>Merchant Policy Docs &amp; Onboarding Guidelines</h3>
                    </div>

                    <div className="cms-items-list">
                      <div className="setting-row-item">
                        <div>
                          <div className="setting-info-title">OfferMatrix Merchant Partner Terms &amp; Commission Guide</div>
                          <div className="setting-info-sub">Document • Updated Aug 2026</div>
                        </div>
                        <button className="btn-action-view" onClick={() => onToast('Editing Policy Doc')}>Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'settings' ? (

            /* =========================================================
               6. SETTINGS PAGE VIEW (USER & MERCHANT ACCOUNTS)
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Settings</span>
                  </div>
                  <h1 className="users-main-title">Platform Feature Settings</h1>
                  <p className="users-main-sub">
                    Configure operational rules, account limits, and tier benefits for User Accounts and Merchant Accounts.
                  </p>
                </div>

                <div className="account-type-toggle-bar">
                  <button
                    className={`account-toggle-btn ${settingsAccountType === 'user' ? 'user-active' : ''}`}
                    onClick={() => setSettingsAccountType('user')}
                  >
                    <Users size={16} />
                    <span>User Account Settings</span>
                  </button>
                  <button
                    className={`account-toggle-btn ${settingsAccountType === 'merchant' ? 'merchant-active' : ''}`}
                    onClick={() => setSettingsAccountType('merchant')}
                  >
                    <Store size={16} />
                    <span>Merchant Account Settings</span>
                  </button>
                </div>
              </div>

              {settingsAccountType === 'user' ? (
                <div className="admin-settings-grid">
                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <Users size={20} color="#3b82f6" />
                      <h3>User Registration &amp; Auth Controls</h3>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Allow New User Registrations</div>
                        <div className="setting-info-sub">Enable signups for new end users on OfferMatrix platform</div>
                      </div>
                      <div
                        className={`toggle-switch-bar ${userAllowSignup ? 'active' : ''}`}
                        onClick={() => {
                          setUserAllowSignup(!userAllowSignup);
                          onToast(`User Registrations ${!userAllowSignup ? 'Enabled' : 'Disabled'}`);
                        }}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Require Phone OTP Verification</div>
                        <div className="setting-info-sub">Verify Bangladeshi mobile numbers before account creation</div>
                      </div>
                      <div
                        className={`toggle-switch-bar ${userRequireOTP ? 'active' : ''}`}
                        onClick={() => {
                          setUserRequireOTP(!userRequireOTP);
                          onToast(`Phone OTP Verification ${!userRequireOTP ? 'Enabled' : 'Disabled'}`);
                        }}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <Sparkles size={20} color="#ec4899" />
                      <h3>User Tier Privileges (Premium vs Standard)</h3>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Standard User Claim Limit</div>
                        <div className="setting-info-sub">Daily coupon claims per Standard User</div>
                      </div>
                      <select className="setting-input-select" defaultValue="10">
                        <option value="5">5 Claims/day</option>
                        <option value="10">10 Claims/day</option>
                        <option value="15">15 Claims/day</option>
                      </select>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Premium User Unlimited Access</div>
                        <div className="setting-info-sub">Unlimited deal claims &amp; priority fast-track support</div>
                      </div>
                      <span className="tier-badge-pill premium">⭐ Active Perk</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="admin-settings-grid">
                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <Store size={20} color="#10b981" />
                      <h3>Merchant Onboarding &amp; Audit Rules</h3>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Auto-Approve Merchant Applications</div>
                        <div className="setting-info-sub">Bypass manual admin approval for new merchant store signups</div>
                      </div>
                      <div
                        className={`toggle-switch-bar ${merchantAutoApprove ? 'active' : ''}`}
                        onClick={() => {
                          setMerchantAutoApprove(!merchantAutoApprove);
                          onToast(`Auto Approve Merchants ${!merchantAutoApprove ? 'Enabled' : 'Disabled'}`);
                        }}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Mandate Trade License Verification</div>
                        <div className="setting-info-sub">Require valid Trade License upload prior to publishing offers</div>
                      </div>
                      <div
                        className={`toggle-switch-bar ${merchantRequireLicense ? 'active' : ''}`}
                        onClick={() => {
                          setMerchantRequireLicense(!merchantRequireLicense);
                          onToast(`Trade License Verification ${!merchantRequireLicense ? 'Enabled' : 'Disabled'}`);
                        }}
                      >
                        <div className="toggle-handle-circle"></div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card-dark">
                    <div className="settings-card-header">
                      <ShieldCheck size={20} color="#f59e0b" />
                      <h3>Merchant Tier Perks &amp; Payout Rules</h3>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Default Platform Commission</div>
                        <div className="setting-info-sub">Standard platform fee percentage per transaction</div>
                      </div>
                      <select className="setting-input-select" defaultValue="5%">
                        <option value="3%">3% Fee</option>
                        <option value="5%">5% Fee</option>
                        <option value="8%">8% Fee</option>
                      </select>
                    </div>

                    <div className="setting-row-item">
                      <div>
                        <div className="setting-info-title">Premium Merchant Featured Boost</div>
                        <div className="setting-info-sub">Homepage hero placement &amp; 0% commission bonus</div>
                      </div>
                      <span className="tier-badge-pill merchant-premium">💎 Active Perk</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : activeTab === 'merchants' ? (

            /* =========================================================
               7. MERCHANTS MANAGEMENT PAGE VIEW
               ========================================================= */
            <div className="users-page-container animate-fade-in">
              <div className="users-header-row">
                <div>
                  <div className="users-breadcrumb">
                    <span>Dashboard</span> &gt; <span className="active-crumb">Merchants</span>
                  </div>
                  <h1 className="users-main-title">Merchants Management</h1>
                  <p className="users-main-sub">
                    View, audit and manage partner merchant accounts across Food, Ride, and Skincare.
                  </p>
                </div>

                <button className="btn-add-user" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }} onClick={() => onToast('Add Merchant Modal Opened')}>
                  <Plus size={18} />
                  <span>Add New Merchant</span>
                </button>
              </div>

              <div className="admin-metrics-grid">
                <div className="metric-card-dark">
                  <div className="metric-icon-box green">
                    <Store size={20} color="#10b981" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Total Active Merchants</span>
                    <h3 className="metric-value">320</h3>
                    <span className="metric-growth green">↑ 8% this month</span>
                  </div>
                </div>

                <div className="metric-card-dark">
                  <div className="metric-icon-box gold">
                    <Star size={20} color="#f59e0b" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Premium Merchants</span>
                    <h3 className="metric-value">85</h3>
                    <span className="metric-growth green">💎 Featured Partners</span>
                  </div>
                </div>
              </div>

              <div className="users-table-container">
                <div className="table-responsive-wrapper">
                  <table className="users-data-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Merchant Store</th>
                        <th>Sector</th>
                        <th>Merchant Tier</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th style={{ textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="user-table-row">
                        <td className="col-num">1</td>
                        <td>
                          <div className="user-cell-flex">
                            <div className="merchant-logo-thumb panda">🐼</div>
                            <div>
                              <div className="user-cell-name">Foodpanda</div>
                              <div className="user-cell-email">partner@foodpanda.com.bd</div>
                            </div>
                          </div>
                        </td>
                        <td>Food</td>
                        <td><span className="tier-badge-pill merchant-premium">💎 Premium Merchant</span></td>
                        <td><span className="status-pill active">Active</span></td>
                        <td className="col-date">10 Aug 2026</td>
                        <td>
                          <div className="action-buttons-flex">
                            <button className="btn-action-view" onClick={() => onToast('Viewing Merchant Details')}>View</button>
                          </div>
                        </td>
                      </tr>

                      <tr className="user-table-row">
                        <td className="col-num">2</td>
                        <td>
                          <div className="user-cell-flex">
                            <div className="merchant-logo-thumb uber">Uber</div>
                            <div>
                              <div className="user-cell-name">Uber BD</div>
                              <div className="user-cell-email">partner@uber.com</div>
                            </div>
                          </div>
                        </td>
                        <td>Ride</td>
                        <td><span className="tier-badge-pill merchant-premium">💎 Premium Merchant</span></td>
                        <td><span className="status-pill active">Active</span></td>
                        <td className="col-date">12 Aug 2026</td>
                        <td>
                          <div className="action-buttons-flex">
                            <button className="btn-action-view" onClick={() => onToast('Viewing Merchant Details')}>View</button>
                          </div>
                        </td>
                      </tr>

                      <tr className="user-table-row">
                        <td className="col-num">3</td>
                        <td>
                          <div className="user-cell-flex">
                            <div className="merchant-logo-thumb kirei">Kirei</div>
                            <div>
                              <div className="user-cell-name">Kirei Skincare</div>
                              <div className="user-cell-email">contact@kirei.bd</div>
                            </div>
                          </div>
                        </td>
                        <td>Skincare</td>
                        <td><span className="tier-badge-pill merchant-standard">🏬 Standard Merchant</span></td>
                        <td><span className="status-pill pending">Pending Audit</span></td>
                        <td className="col-date">15 Aug 2026</td>
                        <td>
                          <div className="action-buttons-flex">
                            <button className="btn-action-activate" onClick={() => onToast('Approved Merchant Account')}>Approve</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (

            /* MAIN DASHBOARD HOME PAGE VIEW */
            <>
              <div className="admin-welcome-row">
                <div>
                  <div className="welcome-greeting">Welcome Back, Admin! 👋</div>
                  <h1 className="welcome-headline">Here's What's Happening Today</h1>
                  <p className="welcome-subtext">Monitor users, merchants, deals, and complaints across all platforms.</p>
                </div>

                <div className="welcome-controls">
                  <div className="date-pill">
                    <Calendar size={14} />
                    <span>Mon, 15 Sep 2026</span>
                  </div>
                  <select
                    className="time-select-pill"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                  >
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="This Year">This Year</option>
                  </select>

                  <div className="quote-box-dark">
                    <span>"A safer, smarter, better marketplace for everyone."</span>
                    <span className="quote-author">— OfferMatrix</span>
                  </div>
                </div>
              </div>

              <div className="admin-metrics-grid">
                <div
                  className="metric-card-dark"
                  onClick={() => setActiveTab('users')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="metric-icon-box blue">
                    <Users size={20} color="#3b82f6" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Total Users</span>
                    <h3 className="metric-value">12,480</h3>
                    <span className="metric-growth green">↑ 12% vs last month</span>
                  </div>
                </div>

                <div className="metric-card-dark">
                  <div className="metric-icon-box green">
                    <Store size={20} color="#10b981" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Total Merchants</span>
                    <h3 className="metric-value">320</h3>
                    <span className="metric-growth green">↑ 8% vs last month</span>
                  </div>
                </div>

                <div
                  className="metric-card-dark"
                  onClick={() => setActiveTab('food')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="metric-icon-box pink">
                    <Ticket size={20} color="#ec4899" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Active Offers</span>
                    <h3 className="metric-value">1,245</h3>
                    <span className="metric-growth green">↑ 25% vs last month</span>
                  </div>
                </div>

                <div className="metric-card-dark">
                  <div className="metric-icon-box red">
                    <MessageSquare size={20} color="#ef4444" />
                  </div>
                  <div className="metric-content">
                    <span className="metric-label">Total Complaints</span>
                    <h3 className="metric-value">187</h3>
                    <span className="metric-growth red">↑ 18% vs last month</span>
                  </div>
                </div>
              </div>

              <div className="admin-charts-grid">
                <div className="admin-chart-card">
                  <div className="chart-card-header">
                    <h3>User Growth</h3>
                    <select className="chart-select">
                      <option>Last 9 Months</option>
                      <option>Last 6 Months</option>
                    </select>
                  </div>

                  <div className="line-chart-mock">
                    <svg viewBox="0 0 500 180" className="chart-svg">
                      <defs>
                        <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 20 140 Q 60 120, 100 90 T 180 85 T 260 40 T 340 60 T 420 20 T 480 10"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M 20 140 Q 60 120, 100 90 T 180 85 T 260 40 T 340 60 T 420 20 T 480 10 L 480 180 L 20 180 Z"
                        fill="url(#pinkGrad)"
                      />
                      <circle cx="20" cy="140" r="4" fill="#ec4899" />
                      <circle cx="100" cy="90" r="4" fill="#ec4899" />
                      <circle cx="180" cy="85" r="4" fill="#ec4899" />
                      <circle cx="260" cy="40" r="5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="340" cy="60" r="4" fill="#ec4899" />
                      <circle cx="420" cy="20" r="4" fill="#ec4899" />
                      <circle cx="480" cy="10" r="5" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    <div className="chart-x-axis">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                    </div>
                  </div>
                </div>

                <div className="admin-chart-card">
                  <div className="chart-card-header">
                    <h3>Complaints by Category</h3>
                    <select className="chart-select">
                      <option>This Month</option>
                      <option>All Time</option>
                    </select>
                  </div>

                  <div className="donut-chart-flex">
                    <div className="donut-wrapper">
                      <svg viewBox="0 0 100 100" className="donut-svg">
                        <circle cx="50" cy="50" r="38" stroke="#1e293b" strokeWidth="12" fill="none" />
                        <circle
                          cx="50" cy="50" r="38"
                          stroke="#ec4899" strokeWidth="12" fill="none"
                          strokeDasharray="90 150" strokeDashoffset="0"
                        />
                        <circle
                          cx="50" cy="50" r="38"
                          stroke="#38bdf8" strokeWidth="12" fill="none"
                          strokeDasharray="85 155" strokeDashoffset="-90"
                        />
                        <circle
                          cx="50" cy="50" r="38"
                          stroke="#f59e0b" strokeWidth="12" fill="none"
                          strokeDasharray="60 180" strokeDashoffset="-175"
                        />
                      </svg>
                      <div className="donut-center-text">
                        <span className="total-label">Total</span>
                        <span className="total-num">187</span>
                      </div>
                    </div>

                    <div className="donut-legend">
                      <div className="legend-row">
                        <span className="dot pink"></span>
                        <span className="legend-name">Food</span>
                        <span className="legend-val">72 (38%)</span>
                      </div>
                      <div className="legend-row">
                        <span className="dot blue"></span>
                        <span className="legend-name">Ride</span>
                        <span className="legend-val">68 (36%)</span>
                      </div>
                      <div className="legend-row">
                        <span className="dot gold"></span>
                        <span className="legend-name">Skincare</span>
                        <span className="legend-val">47 (25%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-chart-card">
                  <div className="chart-card-header">
                    <h3>Top Complaint Issues</h3>
                    <span className="link-view-all">View All</span>
                  </div>

                  <div className="issues-list">
                    <div className="issue-row">
                      <div className="issue-icon pink">✨</div>
                      <div className="issue-info">
                        <span className="issue-title">Fake/Duplicate Products</span>
                        <span className="issue-sub">(Skincare)</span>
                      </div>
                      <span className="issue-count">56</span>
                    </div>

                    <div className="issue-row">
                      <div className="issue-icon orange">🍔</div>
                      <div className="issue-info">
                        <span className="issue-title">Unhygienic Restaurant</span>
                        <span className="issue-sub">(Food)</span>
                      </div>
                      <span className="issue-count">48</span>
                    </div>

                    <div className="issue-row">
                      <div className="issue-icon blue">🚗</div>
                      <div className="issue-info">
                        <span className="issue-title">Rider Misbehaviour</span>
                        <span className="issue-sub">(Ride)</span>
                      </div>
                      <span className="issue-count">42</span>
                    </div>

                    <div className="issue-row">
                      <div className="issue-icon gold">🎟️</div>
                      <div className="issue-info">
                        <span className="issue-title">Incorrect Discount</span>
                        <span className="issue-sub">(All Platforms)</span>
                      </div>
                      <span className="issue-count">21</span>
                    </div>

                    <div className="issue-row">
                      <div className="issue-icon red">🏷️</div>
                      <div className="issue-info">
                        <span className="issue-title">Order Without Coupon</span>
                      </div>
                      <span className="issue-count">18</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-platforms-section">
                <h2 className="section-headline-dark">Manage Platforms & Offers</h2>

                <div className="platforms-cards-grid">
                  <div
                    className="platform-sector-card food"
                    onClick={() => setActiveTab('food')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="platform-card-header pink">
                      <div className="header-left flex-gap">
                        <Utensils size={18} />
                        <div>
                          <h4 className="platform-title">Food</h4>
                          <p className="platform-sub">Manage food platforms, offers and merchants</p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="arrow-btn" />
                    </div>

                    <div className="partner-logos-row">
                      <div className="partner-logo-pill">foodpanda</div>
                      <div className="partner-logo-pill">foodi</div>
                      <div className="partner-logo-pill">pathao</div>
                    </div>
                  </div>

                  <div className="platform-sector-card ride">
                    <div className="platform-card-header blue">
                      <div className="header-left flex-gap">
                        <Car size={18} />
                        <div>
                          <h4 className="platform-title">Ride</h4>
                          <p className="platform-sub">Manage ride platforms, offers and merchants</p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="arrow-btn" />
                    </div>

                    <div className="partner-logos-row">
                      <div className="partner-logo-pill">Uber</div>
                      <div className="partner-logo-pill">OBHAI</div>
                      <div className="partner-logo-pill">inDriver</div>
                    </div>
                  </div>

                  <div className="platform-sector-card skincare">
                    <div className="platform-card-header gold">
                      <div className="header-left flex-gap">
                        <Sparkles size={18} />
                        <div>
                          <h4 className="platform-title">Skincare</h4>
                          <p className="platform-sub">Manage skincare platforms, offers and merchants</p>
                        </div>
                      </div>
                      <ArrowRight size={18} className="arrow-btn" />
                    </div>

                    <div className="partner-logos-row">
                      <div className="partner-logo-pill">Choice LEGACY</div>
                      <div className="partner-logo-pill">Kirei</div>
                      <div className="partner-logo-pill">MAKEUP CHARMI</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-tables-grid">
                <div className="admin-table-card">
                  <div className="chart-card-header">
                    <h3>Latest Users</h3>
                    <span className="link-view-all" onClick={() => setActiveTab('users')}>View All</span>
                  </div>

                  <div className="list-items">
                    <div className="user-list-item">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Nusrat" className="user-thumb" />
                      <div className="user-detail">
                        <span className="u-name">Nusrat Jahan</span>
                        <span className="u-email">nusrat@gmail.com</span>
                      </div>
                      <span className="u-date">15 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>

                    <div className="user-list-item">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Tanvir" className="user-thumb" />
                      <div className="user-detail">
                        <span className="u-name">Tanvir Rahman</span>
                        <span className="u-email">tanvir@gmail.com</span>
                      </div>
                      <span className="u-date">15 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>

                    <div className="user-list-item">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Samiha" className="user-thumb" />
                      <div className="user-detail">
                        <span className="u-name">Samiha Islam</span>
                        <span className="u-email">samiha@gmail.com</span>
                      </div>
                      <span className="u-date">14 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>

                    <div className="user-list-item">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="Rafi" className="user-thumb" />
                      <div className="user-detail">
                        <span className="u-name">Rafi Ahmed</span>
                        <span className="u-email">rafi@gmail.com</span>
                      </div>
                      <span className="u-date">14 Sep 2026</span>
                      <span className="status-pill inactive">Inactive</span>
                    </div>
                  </div>
                </div>

                <div className="admin-table-card">
                  <div className="chart-card-header">
                    <h3>Latest Merchants</h3>
                    <span className="link-view-all">View All</span>
                  </div>

                  <div className="list-items">
                    <div className="user-list-item">
                      <div className="merchant-logo-thumb">Choice</div>
                      <div className="user-detail">
                        <span className="u-name">Choice Legacy</span>
                        <span className="u-email">Skincare</span>
                      </div>
                      <span className="u-date">15 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>

                    <div className="user-list-item">
                      <div className="merchant-logo-thumb panda">🐼</div>
                      <div className="user-detail">
                        <span className="u-name">Foodpanda</span>
                        <span className="u-email">Food</span>
                      </div>
                      <span className="u-date">14 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>

                    <div className="user-list-item">
                      <div className="merchant-logo-thumb uber">Uber</div>
                      <div className="user-detail">
                        <span className="u-name">Uber</span>
                        <span className="u-email">Ride</span>
                      </div>
                      <span className="u-date">14 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>

                    <div className="user-list-item">
                      <div className="merchant-logo-thumb kirei">Kirei</div>
                      <div className="user-detail">
                        <span className="u-name">Kirei</span>
                        <span className="u-email">Skincare</span>
                      </div>
                      <span className="u-date">13 Sep 2026</span>
                      <span className="status-pill pending">Pending</span>
                    </div>

                    <div className="user-list-item">
                      <div className="merchant-logo-thumb pathao">P</div>
                      <div className="user-detail">
                        <span className="u-name">Pathao</span>
                        <span className="u-email">Ride</span>
                      </div>
                      <span className="u-date">12 Sep 2026</span>
                      <span className="status-pill active">Active</span>
                    </div>
                  </div>
                </div>

                <div className="admin-right-column">
                  <div className="admin-table-card">
                    <div className="chart-card-header">
                      <h3>Recent Complaints</h3>
                      <span className="link-view-all">View All</span>
                    </div>

                    <div className="complaints-brief-list">
                      <div className="complaint-item">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&q=80" alt="C1" className="c-avatar" />
                        <div className="c-info">
                          <span className="c-title">Fake product from Choice Legacy</span>
                          <span className="c-sub">Skincare • 2 min ago</span>
                        </div>
                      </div>

                      <div className="complaint-item">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=60&q=80" alt="C2" className="c-avatar" />
                        <div className="c-info">
                          <span className="c-title">Food quality issue at foodpanda</span>
                          <span className="c-sub">Food • 15 min ago</span>
                        </div>
                      </div>

                      <div className="complaint-item">
                        <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=60&q=80" alt="C3" className="c-avatar" />
                        <div className="c-info">
                          <span className="c-title">Rider misbehaved (OBHAI)</span>
                          <span className="c-sub">Ride • 28 min ago</span>
                        </div>
                      </div>

                      <div className="complaint-item">
                        <div className="c-icon-badge">%</div>
                        <div className="c-info">
                          <span className="c-title">Coupon code not working</span>
                          <span className="c-sub">General • 1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-safety-card">
                    <div className="safety-left">
                      <div className="safety-shield-icon">
                        <ShieldCheck size={28} color="#00f2fe" />
                      </div>
                      <div>
                        <h4 className="safety-title">Keep the Platform Safe</h4>
                        <p className="safety-desc">Review complaints, monitor merchants and take action for a better community.</p>
                      </div>
                    </div>

                    <button className="btn-view-complaints" onClick={() => onToast('Opening All Complaints Dashboard')}>
                      <span>View All Complaints</span>
                      <ArrowRight size={16} />
                    </button>

                    <div className="safety-footer-quote">
                      "Fair Offers. Safe Users. Trusted Merchants." — OfferMatrix Admin
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

        </main>
      </div>

      {/* Add New User Modal */}
      {isAddUserModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Add New User</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleAddNewUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nusrat Jahan"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. nusrat@gmail.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. 01712-345678"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Initial Account Status</label>
                <select
                  value={newUserStatus}
                  onChange={(e) => setNewUserStatus(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', outline: 'none' }}
                >
                  <option value="Active">Active</option>
                  <option value="Reported">Reported</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  style={{ flex: 1, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '10px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#0284c7', border: 'none', color: '#ffffff', padding: '10px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {isSendMessageModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '440px',
            padding: '24px',
            color: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Send Message to {selectedUser?.name}</h3>
              <button onClick={() => setIsSendMessageModalOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSendMessageSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>Message Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your message or notification..."
                  value={userMessageContent}
                  onChange={(e) => setUserMessageContent(e.target.value)}
                  style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '10px 12px', color: '#ffffff', fontSize: '13px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsSendMessageModalOpen(false)}
                  style={{ flex: 1, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', padding: '10px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#0284c7', border: 'none', color: '#ffffff', padding: '10px', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Send size={14} />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
