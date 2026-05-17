import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Check, X, User, ShieldCheck, Sparkles, 
  CheckCircle2, Clock, Phone, Mail, FileText, Gift,
  ArrowRight, ArrowLeft, Heart, CheckSquare, Bell
} from 'lucide-react';

const Book = () => {
  // Booking Wizard States
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    doctor: 'Dr. Ajeet Singh Sethi (MD)',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // { dayName, dateString, isClosed }
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyText, setVerifyText] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Brand New "Pro" Features States
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [showPromoField, setShowPromoField] = useState(false);
  
  // Custom Opt-in toggles
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    email: true,
    sms: false
  });

  // Simulated live slot countdown
  const [slotsRemaining, setSlotsRemaining] = useState(4);

  // Static Data
  const treatmentsList = [
    'Laser Hair Reduction',
    'Carbon Laser Peel & Toning',
    'CO2 Fractional Acne Scar Reduction',
    'Oxygeneo 3-in-1 Facial',
    'Deep Melasma Skin Peels',
    'Exilis Radio Frequency Tightening',
    'Hair Fall Mesotherapy & PRP',
    'Laser Tattoo Removal',
    'Other General Dermatology Consultation',
  ];

  const doctorsList = [
    {
      name: 'Dr. Ajeet Singh Sethi (MD)',
      role: 'Principal Dermatologist & Hair Transplant Surgeon',
      desc: 'Expertise in clinical dermatology, laser resurfacing, and FUE surgeries.',
      initials: 'AS',
      avatarBg: 'bg-primary/10 text-primary',
    },
    {
      name: 'Dr. Sethi’s Laser & Aesthetic Team',
      role: 'Certified Aesthetician & Advanced Laser Specialist',
      desc: 'US-FDA approved system experts specialized in Oxygeneo and skin peeling.',
      initials: 'LT',
      avatarBg: 'bg-gold/10 text-gold',
    },
  ];

  // Calendar calculations starting tomorrow
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    const days = [];
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 1; i <= 7; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const dayIndex = futureDate.getDay();
      
      const dayName = dayNames[dayIndex];
      const dateNum = futureDate.getDate();
      const monthName = monthNames[futureDate.getMonth()];
      const isClosed = dayIndex === 0; // Sundays closed

      const dateString = `${dayName}, ${monthName} ${dateNum}, ${futureDate.getFullYear()}`;

      days.push({
        dayName: dayName.substring(0, 3), // e.g. "Mon"
        dateNum,
        monthName,
        isClosed,
        dateString,
      });
    }
    setCalendarDays(days);
    
    // Pre-select first active date (excluding Sunday)
    const firstActive = days.find(d => !d.isClosed);
    if (firstActive) {
      setSelectedDate(firstActive);
    }

    // Set a random remaining slot countdown (2 to 5) to look realistic
    setSlotsRemaining(Math.floor(Math.random() * 4) + 2);
  }, []);

  // Time Slots division
  const allSlotsConfig = {
    morning: [
      { time: '10:30 AM', status: 'available' },
      { time: '11:15 AM', status: 'booked' },
      { time: '12:00 PM', status: 'filling' },
      { time: '12:45 PM', status: 'available' },
    ],
    afternoon: [
      { time: '2:00 PM', status: 'available' },
      { time: '2:45 PM', status: 'booked' },
      { time: '3:30 PM', status: 'filling' },
      { time: '4:15 PM', status: 'available' },
    ],
    evening: [
      { time: '5:00 PM', status: 'filling' },
      { time: '5:45 PM', status: 'booked' },
      { time: '6:30 PM', status: 'available' },
      { time: '7:15 PM', status: 'available' },
      { time: '8:00 PM', status: 'available' },
    ],
  };

  // Practitioner-Specific Filter Logic
  // Dr. Ajeet Singh Sethi (MD) is on duty during Morning (10:30 - 1:00) and Evening (5:00 - 8:30) sessions
  // Laser Specialists are on duty during Afternoon (2:00 - 5:00) sessions
  const getFilteredSlots = () => {
    const isDrSethi = formData.doctor.includes('Ajeet');
    
    if (isDrSethi) {
      return {
        morning: allSlotsConfig.morning,
        afternoon: allSlotsConfig.afternoon.map(s => ({ ...s, status: 'unavailable', reason: 'Aesthetician Shift Only' })),
        evening: allSlotsConfig.evening,
      };
    } else {
      return {
        morning: allSlotsConfig.morning.map(s => ({ ...s, status: 'unavailable', reason: 'Principal Doctor Shift Only' })),
        afternoon: allSlotsConfig.afternoon,
        evening: allSlotsConfig.evening.map(s => ({ ...s, status: 'unavailable', reason: 'Principal Doctor Shift Only' })),
      };
    }
  };

  const filteredSlots = getFilteredSlots();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const selectDoctor = (docName) => {
    setFormData({ ...formData, doctor: docName });
    // Reset selected slot if the doctor changes to prevent choosing invalid shifts
    setSelectedSlot(null);
  };

  // Promo Code Validator
  const applyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'GLOW2026' || code === 'WELCOME10') {
      setPromoApplied(true);
    } else if (!code) {
      setPromoError('Please enter a voucher code.');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 or GLOW2026.');
    }
  };

  const removePromo = () => {
    setPromoApplied(false);
    setPromoCode('');
    setPromoError('');
  };

  // Notification Checklist Handlers
  const toggleNotification = (channel) => {
    setNotifications({
      ...notifications,
      [channel]: !notifications[channel]
    });
  };

  // Validation routines
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Patient name is required.';
    
    const phonePattern = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number starting with 6-9.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.treatment) newErrors.treatment = 'Please select a treatment service.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const proceedToStep2 = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Verification Processing Loops
  const triggerVerification = () => {
    if (!selectedSlot) {
      setErrors({ ...errors, slot: 'Please select an active session slot.' });
      return;
    }
    setErrors({});
    setIsVerifying(true);

    const states = [
      'Authenticating credentials with CIDCO portal...',
      'Validating selected specialist shift schedule...',
      'Assigning diagnostic consultation room...',
      'Securing your zero-cost skin analysis ticket...',
    ];

    let current = 0;
    setVerifyText(states[0]);

    const interval = setInterval(() => {
      current++;
      if (current < states.length) {
        setVerifyText(states[current]);
      } else {
        clearInterval(interval);
        const randId = `SS-${2026}-${Math.floor(1000 + Math.random() * 9000)}`;
        setTicketId(randId);
        setIsVerifying(false);
        setIsConfirmed(true);
      }
    }, 900);
  };

  const resetBookingWizard = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      treatment: '',
      doctor: 'Dr. Ajeet Singh Sethi (MD)',
      message: '',
    });
    setSelectedSlot(null);
    setStep(1);
    setIsConfirmed(false);
    setPromoApplied(false);
    setPromoCode('');
    setShowPromoField(false);
    
    // Select first active calendar day
    const firstActive = calendarDays.find(d => !d.isClosed);
    if (firstActive) setSelectedDate(firstActive);
  };

  // Canvas Exporter with Verified Styling
  const downloadPassImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, '#FAFAF8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // Golden-Beige Outer Frame
    ctx.strokeStyle = '#D4A853';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 588, 788);

    // Inner Border
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 560, 760);

    // Clinic Header
    ctx.textAlign = 'center';
    
    ctx.fillStyle = '#F97316'; // Primary Orange
    ctx.font = 'bold 32px Poppins, sans-serif';
    ctx.fillText('SKIN SOLUTIONS', 300, 75);

    ctx.fillStyle = '#4B5563';
    ctx.font = '500 14px Poppins, sans-serif';
    ctx.fillText('SKIN, COSMETOLOGY & LASER CLINIC', 300, 105);

    ctx.fillStyle = '#D4A853'; // Gold
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('• CIDCO N3, AURANGABAD •', 300, 128);

    // Draw circular tear-out side notches representation
    ctx.fillStyle = '#FAFAF8';
    ctx.beginPath();
    ctx.arc(20, 420, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(580, 420, 16, 0, Math.PI * 2);
    ctx.fill();

    // Dotted perforated tear line in midsection
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 8]);
    ctx.beginPath();
    ctx.moveTo(36, 420);
    ctx.lineTo(564, 420);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Verified Seal
    ctx.fillStyle = '#DEF7EC'; // light green bg
    ctx.beginPath();
    ctx.roundRect(190, 160, 220, 40, 8);
    ctx.fill();

    ctx.fillStyle = '#03543F'; // dark green text
    ctx.font = 'bold 13px Poppins, sans-serif';
    ctx.fillText('✓ CLINICAL PASS VERIFIED', 300, 185);

    // Ticket Pass Code
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('UNIQUE APPOINTMENT PASS', 300, 238);

    ctx.fillStyle = '#F97316';
    ctx.font = 'extrabold 38px Poppins, sans-serif';
    ctx.fillText(ticketId, 300, 282);

    // Structured Grid Information Blocks
    const drawGridLabel = (title, val, x, y, align) => {
      ctx.textAlign = align;
      ctx.fillStyle = '#9CA3AF';
      ctx.font = 'bold 10px Poppins, sans-serif';
      ctx.fillText(title.toUpperCase(), x, y);
      
      ctx.fillStyle = '#1C1C1C';
      ctx.font = 'bold 15px Poppins, sans-serif';
      ctx.fillText(val, x, y + 22);
    };

    // Row 1
    drawGridLabel('Patient Name', formData.name, 70, 330, 'left');
    drawGridLabel('Procedure', formData.treatment, 530, 330, 'right');

    // Row 2
    const consultDate = selectedDate?.dateString.split(', ')[1] || '';
    drawGridLabel('Consultation Date', consultDate, 70, 465, 'left');
    drawGridLabel('Locked Time Slot', selectedSlot, 530, 465, 'right');

    // Row 3
    drawGridLabel('Assigned Specialist', formData.doctor, 70, 545, 'left');
    drawGridLabel('Triage Status', 'Priority Secured', 530, 545, 'right');

    // Barcode Generator Graphics
    ctx.fillStyle = '#1C1C1C';
    let barcodeX = 140;
    const barcodeWidths = [2, 4, 1, 3, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 2, 3, 4, 1, 2];
    for (let j = 0; j < barcodeWidths.length; j++) {
      const width = barcodeWidths[j] * 2;
      if (j % 2 === 0) {
        ctx.fillRect(barcodeX, 620, width, 55);
      }
      barcodeX += width + 2;
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px Courier, monospace';
    ctx.fillText(`*${ticketId}*`, 300, 692);

    // Footer lines
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '11px Poppins, sans-serif';
    ctx.fillText('Please arrive 10 minutes prior to your slots shift.', 300, 725);
    ctx.fillText('For support inquiries, call CIDCO helpdesk (+91-9552000499).', 300, 742);

    // Save as Image Downloader Link
    const link = document.createElement('a');
    link.download = `SkinSolutions_Pass_${ticketId}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-light-bg relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PAGE HEADER */}
        <div className="text-center space-y-3 mb-10 sm:mb-14">
          <span className="bg-primary/10 text-primary font-bold text-[11px] sm:text-[12px] uppercase px-3 py-1.5 rounded-full tracking-wider">
            Premium Booking System
          </span>
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Secure Your Skincare Consultation
          </h1>
          <p className="text-body-gray max-w-xl mx-auto text-[14px] sm:text-[16px]">
            Experience state-of-the-art dermatological therapies in Aurangabad. Lock in your session chip below in under 2 minutes.
          </p>
        </div>

        {/* STEPPER METRIC CARD */}
        <div className="bg-white rounded-2xl border border-border-light p-4 sm:p-5 mb-8 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors duration-300 ${
              step === 1 ? 'bg-primary text-white' : 'bg-green-500 text-white'
            }`}>
              {step > 1 ? <Check size={16} className="stroke-[3]" /> : '1'}
            </span>
            <div>
              <p className="text-[11px] uppercase font-bold text-gray-400 leading-none">Step 1</p>
              <h4 className="text-[13px] sm:text-[14px] font-bold text-charcoal">Patient & Service Info</h4>
            </div>
          </div>
          
          <div className="h-[1px] bg-gray-200 flex-grow mx-4 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] transition-colors duration-300 ${
              step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              2
            </span>
            <div>
              <p className="text-[11px] uppercase font-bold text-gray-400 leading-none">Step 2</p>
              <h4 className="text-[13px] sm:text-[14px] font-bold text-charcoal">Calendar & Slot Picker</h4>
            </div>
          </div>
        </div>

        {/* DYNAMIC SLOT COUNTER URGENCY ACCORDION */}
        {step === 2 && !isConfirmed && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-50 border border-primary/20 rounded-xl p-3 sm:p-4 mb-6 flex items-center gap-3"
          >
            <Bell className="w-5 h-5 text-primary animate-bounce flex-shrink-0" />
            <p className="text-[12.5px] text-primary font-bold">
              High Demand: Only {slotsRemaining} consultation passes remaining for {formData.doctor.split(' ')[0]} {formData.doctor.split(' ')[1]} today!
            </p>
          </motion.div>
        )}

        {/* STEP 1: PATIENT & SPECIALIST CONFIGURATION */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-border-light p-6 sm:p-8 shadow-sm space-y-6 sm:space-y-8"
          >
            {/* Treatment Selector Dropdown */}
            <div className="space-y-2">
              <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-primary" />
                Select Your Required Skincare Solution
              </label>
              <select
                name="treatment"
                value={formData.treatment}
                onChange={handleInputChange}
                className={`w-full bg-light-bg border rounded-xl py-3.5 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer ${
                  errors.treatment ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <option value="" disabled>-- Click to view clinical solutions --</option>
                {treatmentsList.map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
              {errors.treatment && (
                <p className="text-red-500 text-[12px] font-bold flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.treatment}
                </p>
              )}
            </div>

            {/* Doctor Selection Grid */}
            <div className="space-y-3">
              <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                Select Assigned Dermatologist
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctorsList.map((doc, idx) => {
                  const isSelected = formData.doctor === doc.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => selectDoctor(doc.name)}
                      className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative text-left select-none flex flex-col justify-between ${
                        isSelected 
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/5 scale-[1.01]' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${doc.avatarBg}`}>
                            {doc.initials}
                          </div>
                          {isSelected && (
                            <span className="bg-primary text-white rounded-full p-1 shadow-sm">
                              <Check size={14} className="stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-[15px] sm:text-[16px] text-charcoal">{doc.name}</h4>
                          <p className="text-primary font-bold text-[11px] uppercase tracking-wider mt-0.5">{doc.role}</p>
                        </div>
                        <p className="text-body-gray text-[12.5px] leading-relaxed">{doc.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Patient Credentials Block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal">Patient Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className={`w-full bg-light-bg border rounded-xl py-3 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[12px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal">10-Digit Mobile Phone</label>
                <div className="relative">
                  <span className="absolute left-4 top-[13.5px] text-[14px] text-gray-400 font-bold">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength={10}
                    placeholder="Mobile number"
                    className={`w-full bg-light-bg border rounded-xl py-3 pl-12 pr-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[12px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@address.com"
                    className={`w-full bg-light-bg border rounded-xl py-3 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[12px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* General Description / Condition notes */}
            <div className="space-y-2">
              <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal">Describe Your Skin Concern (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Mention any symptoms, duration, or past treatments..."
                className="w-full bg-light-bg border border-gray-200 rounded-xl py-3 px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            {/* "PRO" FEATURE: PROMO / VOUCHER PANEL */}
            <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setShowPromoField(!showPromoField)}
                className="flex items-center justify-between w-full text-[13px] font-bold text-charcoal hover:text-primary transition-colors focus:outline-none"
              >
                <span className="flex items-center gap-2">
                  <Gift size={16} className="text-primary" />
                  Have a Clinical Pass Voucher or Coupon?
                </span>
                <span className="text-primary text-[12px]">{showPromoField ? 'Hide' : 'Apply Coupon'}</span>
              </button>

              <AnimatePresence>
                {showPromoField && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 flex gap-2.5">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Try WELCOME10 or GLOW2026"
                          disabled={promoApplied}
                          className={`w-full bg-white border rounded-lg py-2.5 px-3.5 text-[13px] focus:outline-none uppercase font-bold tracking-wider ${
                            promoApplied ? 'border-green-300 bg-green-50' : 'border-gray-200'
                          }`}
                        />
                        {promoError && <p className="text-red-500 text-[11px] font-bold mt-1">{promoError}</p>}
                      </div>
                      
                      {promoApplied ? (
                        <button
                          type="button"
                          onClick={removePromo}
                          className="bg-red-500 hover:bg-red-600 text-white text-[12px] font-bold px-4 rounded-lg cursor-pointer transition-colors"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={applyPromo}
                          className="bg-charcoal hover:bg-charcoal/90 text-white text-[12px] font-bold px-4 rounded-lg cursor-pointer transition-colors"
                        >
                          Apply Code
                        </button>
                      )}
                    </div>
                    {promoApplied && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2.5 bg-green-500/10 border border-green-500/20 text-green-700 rounded-lg p-2.5 text-[12.5px] font-bold flex items-center gap-1.5"
                      >
                        <Sparkles size={14} className="text-green-600 fill-green-600/10" />
                        Voucher active! 100% Free Consultation Fee Secured.
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* "PRO" FEATURE: NOTIFICATION CHANNELS PICKER */}
            <div className="space-y-3">
              <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-primary" />
                Receipt & Notification Channels (Select At Least One)
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div 
                  onClick={() => toggleNotification('whatsapp')}
                  className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer select-none transition-colors duration-200 ${
                    notifications.whatsapp ? 'border-primary/40 bg-primary/5' : 'border-gray-200 bg-white'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={notifications.whatsapp} 
                    readOnly 
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <h5 className="text-[12.5px] font-bold text-charcoal leading-none">WhatsApp</h5>
                    <p className="text-[10px] text-gray-400 mt-1">Diagnostic instruction cards</p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleNotification('email')}
                  className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer select-none transition-colors duration-200 ${
                    notifications.email ? 'border-primary/40 bg-primary/5' : 'border-gray-200 bg-white'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={notifications.email} 
                    readOnly 
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <h5 className="text-[12.5px] font-bold text-charcoal leading-none">Email Calendar</h5>
                    <p className="text-[10px] text-gray-400 mt-1">Google Cal & Outlook links</p>
                  </div>
                </div>

                <div 
                  onClick={() => toggleNotification('sms')}
                  className={`border rounded-xl p-3 flex items-center gap-3 cursor-pointer select-none transition-colors duration-200 ${
                    notifications.sms ? 'border-primary/40 bg-primary/5' : 'border-gray-200 bg-white'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={notifications.sms} 
                    readOnly 
                    className="accent-primary w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <h5 className="text-[12.5px] font-bold text-charcoal leading-none">SMS Text</h5>
                    <p className="text-[10px] text-gray-400 mt-1">Queue & gate entry alerts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={proceedToStep2}
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-[15px]"
              >
                <span>Proceed to Slot Selection</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DYNAMIC CALENDAR & SLOTS CHIPS SELECTOR */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-border-light p-6 sm:p-8 shadow-sm space-y-8"
          >
            {/* Calendar dates rolling slider block */}
            <div className="space-y-3">
              <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal block">
                Select Consultation Date
              </label>
              
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {calendarDays.map((day, idx) => {
                  const isSelected = selectedDate?.dateString === day.dateString;
                  return (
                    <div
                      key={idx}
                      onClick={() => !day.isClosed && setSelectedDate(day)}
                      className={`flex-shrink-0 w-16 sm:w-20 rounded-xl p-3 border text-center transition-all duration-300 select-none ${
                        day.isClosed 
                          ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' 
                          : isSelected
                            ? 'border-primary bg-primary/5 text-primary font-bold shadow-md shadow-primary/5'
                            : 'border-gray-200 bg-white text-charcoal hover:border-gray-300 cursor-pointer'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider block font-bold text-gray-400">
                        {day.dayName}
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold block my-0.5">
                        {day.dateNum}
                      </span>
                      <span className="text-[10px] uppercase font-bold block">
                        {day.isClosed ? 'Closed' : day.monthName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Category grids */}
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                <label className="text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-charcoal">
                  Available Slots Selection
                </label>
                
                {/* Doctor name display tag */}
                <span className="bg-charcoal text-white font-bold text-[10px] sm:text-[11px] uppercase px-3 py-1 rounded-md tracking-wider">
                  {formData.doctor}
                </span>
              </div>

              {errors.slot && (
                <p className="text-red-500 text-[12px] font-bold flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.slot}
                </p>
              )}

              {/* Render Sessions */}
              {['morning', 'afternoon', 'evening'].map((sessionKey) => {
                const sessionLabel = 
                  sessionKey === 'morning' ? '🌅 Morning Shift (10:30 AM - 1:00 PM)' :
                  sessionKey === 'afternoon' ? '☀️ Afternoon Shift (2:00 PM - 5:00 PM)' :
                  '🌆 Evening Shift (5:00 PM - 8:30 PM)';

                const slots = filteredSlots[sessionKey];

                return (
                  <div key={sessionKey} className="space-y-3">
                    <h5 className="text-[12px] font-bold text-charcoal/75 uppercase tracking-wider">
                      {sessionLabel}
                    </h5>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slots.map((slot, idx) => {
                        const isSelected = selectedSlot === slot.time;
                        const isUnavailable = slot.status === 'unavailable';
                        const isBooked = slot.status === 'booked';
                        
                        let badgeBg = 'bg-gray-100 text-gray-500';
                        let badgeText = 'Booked';

                        if (slot.status === 'available') {
                          badgeBg = 'bg-green-100 text-green-700';
                          badgeText = 'Available';
                        } else if (slot.status === 'filling') {
                          badgeBg = 'bg-orange-100 text-orange-700';
                          badgeText = 'Filling Fast';
                        }

                        if (isUnavailable) {
                          return (
                            <div
                              key={idx}
                              className="border border-gray-100 rounded-xl p-3 bg-gray-50/50 text-center opacity-40 cursor-not-allowed select-none relative"
                              title={slot.reason}
                            >
                              <span className="text-[14px] font-bold text-gray-400 block line-through">
                                {slot.time}
                              </span>
                              <span className="bg-red-50 text-red-600 font-extrabold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded mt-1.5 inline-block">
                                Off-Duty
                              </span>
                            </div>
                          );
                        }

                        return (
                          <div
                            key={idx}
                            onClick={() => !isBooked && setSelectedSlot(slot.time)}
                            className={`border rounded-xl p-3 text-center transition-all duration-300 relative select-none ${
                              isBooked 
                                ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                                : isSelected
                                  ? 'border-primary bg-primary/5 text-primary font-bold shadow-md shadow-primary/5 scale-[1.03]'
                                  : 'border-gray-200 bg-white text-charcoal hover:border-gray-300 cursor-pointer'
                            }`}
                          >
                            <span className={`text-[14px] font-bold block ${isBooked ? 'line-through text-gray-300' : ''}`}>
                              {slot.time}
                            </span>
                            
                            <span className={`font-extrabold text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded mt-1.5 inline-block ${
                              isBooked ? 'bg-gray-100 text-gray-400' : badgeBg
                            }`}>
                              {badgeText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back & Confirmation Trigger Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[14px]"
              >
                <ArrowLeft size={16} />
                <span>Go Back</span>
              </button>

              <button
                type="button"
                onClick={triggerVerification}
                className="w-2/3 bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-[14px] sm:text-[15px]"
              >
                <ShieldCheck size={18} />
                <span>Secure Slot & Book</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* DYNAMIC SPINNER INTERFACE ON VERIFY STATE */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-md z-[99999] flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="space-y-6 max-w-sm">
              {/* Luxury gold spinning skin loader */}
              <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto shadow-md" />
              <div className="space-y-2">
                <h4 className="font-sans font-bold text-xl text-white">Verifying Slots Shift...</h4>
                <p className="text-gray-300 text-[13.5px] italic font-medium animate-pulse">
                  {verifyText}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUXURY SLOTS TICKET CONFIRMATION SCREEN */}
      <AnimatePresence>
        {isConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-md z-[99998] overflow-y-auto p-4 flex justify-center items-start sm:items-center"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              className="bg-white rounded-[32px] shadow-2xl p-5 sm:p-7 max-w-md w-full border border-border-light text-center space-y-4.5 relative my-8 mx-auto"
            >
              <button
                onClick={resetBookingWizard}
                className="absolute top-5 right-5 text-gray-450 hover:text-charcoal transition-colors focus:outline-none cursor-pointer p-1.5"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Verified Pass Shield Badge */}
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-6 h-6 stroke-[2]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-charcoal">
                  Consultation Pass Verified!
                </h3>
                <p className="text-[11px] sm:text-[12px] text-body-gray uppercase tracking-wider font-extrabold">
                  Skin Solutions Clinic • CIDCO N3
                </p>
              </div>

              {/* MEDICAL TICKET PASS (THE TEAR-OFF CARD GRAPHIC) */}
              <div className="relative bg-gray-50 border border-gray-200/80 rounded-xl p-4 sm:p-5 text-left space-y-3.5 shadow-sm">
                {/* Tear notches left & right */}
                <div className="absolute top-[48%] -left-3 w-6 h-6 rounded-full bg-white border-r border-gray-200/80 transform -translate-y-1/2" />
                <div className="absolute top-[48%] -right-3 w-6 h-6 rounded-full bg-white border-l border-gray-200/80 transform -translate-y-1/2" />

                <div className="flex justify-between items-center border-b border-dashed border-gray-200 pb-3">
                  <div>
                    <span className="text-[9px] sm:text-[9.5px] uppercase font-bold text-gray-400 block tracking-wider">
                      Unique Appointment Pass
                    </span>
                    <strong className="text-[15px] sm:text-[16px] text-primary font-sans font-extrabold tracking-wide uppercase">
                      {ticketId}
                    </strong>
                  </div>
                  <span className="bg-green-100 text-green-700 font-extrabold text-[9.5px] uppercase px-2.5 py-1 rounded-md tracking-wider">
                    Secured
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11.5px] sm:text-[12.5px]">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-gray-400 block">Patient Name</span>
                    <span className="text-charcoal font-bold">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-gray-400 block">Procedure</span>
                    <span className="text-charcoal font-bold leading-tight line-clamp-1">{formData.treatment}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-gray-400 block">Consultation Date</span>
                    <span className="text-charcoal font-bold">{selectedDate?.dateString.split(', ')[1]}</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] uppercase font-bold text-gray-400 block">Locked Time Slot</span>
                    <span className="text-primary font-extrabold">{selectedSlot}</span>
                  </div>
                </div>
              </div>

              {/* Display voucher confirmation if applied */}
              {promoApplied && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-700 text-[11.5px] font-bold rounded-lg p-2.5">
                  Coupon {promoCode.toUpperCase()} Applied Successfully! (100% Consultation Discount Secured).
                </div>
              )}

              {/* Vertical Lifecyle Confirmation timeline */}
              <div className="text-left space-y-3.5 pt-1">
                <h4 className="text-[11.5px] uppercase font-extrabold tracking-wider text-charcoal">
                  Lifecycle Validation Progress:
                </h4>
                
                <div className="space-y-3.5 pl-0.5">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-[12.5px] font-bold text-charcoal leading-none">Slot Secured Successfully</h5>
                      <p className="text-[11px] text-body-gray mt-0.5 leading-normal">
                        Registered under ticket ID <span className="font-bold text-primary">{ticketId}</span> in CIDCO N3 records.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
                      <Clock size={11} className="stroke-[2.5]" />
                    </div>
                    <div>
                      <h5 className="text-[12.5px] font-bold text-primary leading-none">Reception Callback Scheduled</h5>
                      <p className="text-[11px] text-body-gray mt-0.5 leading-normal">
                        Our desk officer will call your phone (<span className="font-bold underline">{formData.phone}</span>) within 2 hours to confirm your active slot.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles size={11} />
                    </div>
                    <div>
                      <h5 className="text-[12.5px] font-bold text-gray-400 leading-none">Sterile Chambers Consultation</h5>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                        In-person consultation and comprehensive skin diagnostic scanning at Opp Rama International.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trigger Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={downloadPassImage}
                  className="w-full bg-charcoal hover:bg-charcoal/90 text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-[13.5px] sm:text-[14px]"
                >
                  <Sparkles size={15} className="text-gold fill-gold/20" />
                  <span>Download Pass as Image</span>
                </button>

                <button
                  onClick={resetBookingWizard}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 sm:py-3.5 rounded-xl shadow-md transition-colors cursor-pointer text-[13.5px] sm:text-[14px]"
                >
                  Done, Thank You!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Book;
