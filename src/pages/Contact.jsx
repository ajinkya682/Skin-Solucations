import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Calendar, Check, X, 
  MessageSquare, PhoneCall, ArrowRight, ArrowLeft, 
  User, ShieldCheck, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';

const Contact = () => {
  // Booking States
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
    },
    {
      name: 'Dr. Sethi’s Laser & Aesthetic Team',
      role: 'Certified Aesthetician & Advanced Laser Specialist',
      desc: 'US-FDA approved system experts specialized in Oxygeneo and peels.',
      initials: 'SS',
    },
  ];

  // Generated next 7 calendar days starting from tomorrow
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

      // Full formatting for submission: e.g. "Monday, May 18, 2026"
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
    // Pre-select the first non-closed day
    const firstActive = days.find(d => !d.isClosed);
    if (firstActive) {
      setSelectedDate(firstActive);
    }
  }, []);

  // Time Slots divided by sessions
  const slotsConfig = {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const selectDoctor = (docName) => {
    setFormData({ ...formData, doctor: docName });
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Patient name is required.';
    
    // Indian phone format
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
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Interactive Verification Loop & Confetti Reveal
  const triggerVerification = () => {
    if (!selectedSlot) {
      setErrors({ ...errors, slot: 'Please select an active time slot.' });
      return;
    }
    setErrors({});
    setIsVerifying(true);

    const states = [
      'Connecting to Skin Solutions CIDCO portal...',
      'Checking Dr. Sethi’s surgical roster...',
      'Verifying slot room sanitization status...',
      'Locking in your premium aesthetic session...',
    ];

    let current = 0;
    setVerifyText(states[0]);

    const interval = setInterval(() => {
      current++;
      if (current < states.length) {
        setVerifyText(states[current]);
      } else {
        clearInterval(interval);
        // Generate random ticket
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
    // Pre-select first active date
    const firstActive = calendarDays.find(d => !d.isClosed);
    if (firstActive) setSelectedDate(firstActive);
  };

  const downloadPassImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');

    // 1. Draw Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, '#FAFAF8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 800);

    // 2. Draw Golden-Beige Outer Border
    ctx.strokeStyle = '#D4A853';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 588, 788);

    // Inner subtle thin border
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 560, 760);

    // 3. Draw Clinic Header
    ctx.textAlign = 'center';
    
    // Brand title
    ctx.fillStyle = '#F97316'; // Primary Orange
    ctx.font = 'bold 32px Poppins, sans-serif';
    ctx.fillText('SKIN SOLUTIONS', 300, 75);

    // Subtitle
    ctx.fillStyle = '#4B5563';
    ctx.font = '500 14px Poppins, sans-serif';
    ctx.fillText('SKIN, COSMETOLOGY & LASER CLINIC', 300, 105);
    
    // Address
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '500 12px Poppins, sans-serif';
    ctx.fillText('Opp Rama International, CIDCO N3, Aurangabad', 300, 128);

    // 4. Draw Verified Shield / Banner
    ctx.fillStyle = '#D1FAE5'; // Light green background
    ctx.beginPath();
    ctx.roundRect(180, 155, 240, 42, 10);
    ctx.fill();

    ctx.fillStyle = '#065F46'; // Dark green text
    ctx.font = 'bold 13px Poppins, sans-serif';
    ctx.fillText('✓ CLINICAL PASS VERIFIED', 300, 181);

    // 5. Draw Decorative Ticket Divider & Side Cut Notches
    // Side notches
    ctx.fillStyle = '#1C1C1C'; // Draw notches using modal or mask backing overlay style
    ctx.beginPath();
    ctx.arc(20, 410, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(580, 410, 18, 0, Math.PI * 2);
    ctx.fill();

    // Dotted line
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(38, 410);
    ctx.lineTo(562, 410);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // 6. Draw Ticket Content Details (Left Aligned & Structured)
    ctx.textAlign = 'left';

    // Unique Pass Box
    ctx.fillStyle = '#F97316';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('UNIQUE APPOINTMENT PASS', 60, 245);
    
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 36px Poppins, sans-serif';
    ctx.fillText(ticketId || 'SS-2026-2685', 60, 288);

    // Details Grid Left Column
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('PATIENT NAME', 60, 345);
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 18px Poppins, sans-serif';
    ctx.fillText(formData.name || 'Ajinkya Saivar', 60, 372);

    // Details Grid Right Column
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('PROCEDURE', 320, 345);
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 18px Poppins, sans-serif';
    const treatmentText = formData.treatment || 'CO2 Fractional Acne Scar Reduction';
    const shortTreatment = treatmentText.length > 25 ? treatmentText.substring(0, 22) + '...' : treatmentText;
    ctx.fillText(shortTreatment, 320, 372);

    // Section 2 Details (Below Dotted Line)
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('CONSULTATION DATE', 60, 470);
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 18px Poppins, sans-serif';
    const dateStr = selectedDate?.dateString || 'Monday, May 18, 2026';
    ctx.fillText(dateStr.split(', ')[1] || dateStr, 60, 498);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('LOCKED TIME SLOT', 320, 470);
    ctx.fillStyle = '#F97316'; // Orange time text
    ctx.font = 'bold 22px Poppins, sans-serif';
    ctx.fillText(selectedSlot || '12:45 PM', 320, 498);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 11px Poppins, sans-serif';
    ctx.fillText('ASSIGNED PRACTITIONER', 60, 555);
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 16px Poppins, sans-serif';
    ctx.fillText(formData.doctor || 'Dr. Ajeet Singh Sethi (MD)', 60, 582);

    // 7. Draw Barcode at the bottom
    const barcodeY = 640;
    const barcodeHeight = 45;
    ctx.fillStyle = '#1C1C1C';
    let currentX = 80;
    while (currentX < 520) {
      const barWidth = Math.floor(Math.random() * 3) + 1;
      const gap = Math.floor(Math.random() * 3) + 1;
      ctx.fillRect(currentX, barcodeY, barWidth, barcodeHeight);
      currentX += barWidth + gap;
    }

    // Barcode numbers label
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px Courier New, monospace';
    ctx.fillText(`*${ticketId || 'SS-2026-2685'}*`, 300, 702);

    // Terms label at the bottom
    ctx.fillStyle = '#6B7280';
    ctx.font = 'italic 11px Poppins, sans-serif';
    ctx.fillText('Please show this image at the clinic front desk upon arrival.', 300, 735);
    ctx.fillText('Helpline: +91-9552000499 | reception@skinsolutions.in', 300, 755);

    // 8. Convert to Data URL and Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `SkinSolutions_Pass_${ticketId || 'SS-2026-2685'}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden relative min-h-screen pb-20 md:pb-8">
      {/* SECTION 1: HERO */}
      <section className="bg-gradient-to-r from-white to-[#F5F0E8] py-14 text-center border-b border-border-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[12px] bg-primary/10 border border-primary/20 text-primary font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Premium Booking System
          </span>
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-charcoal">
            Secure Your Aesthetic Slot
          </h1>
          <p className="text-body-gray text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
            Experience luxury medical dermatology. Select your preferred practitioner, lock a sterile time slot, and receive a secure clinical pass.
          </p>
        </div>
      </section>

      {/* SECTION 2: WIZARD WORKSPACE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Booking Wizard */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-border-light shadow-md p-8 relative">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] ${
                  step === 1 ? 'bg-primary text-white' : 'bg-green-500 text-white'
                }`}>
                  {step > 1 ? <Check size={16} /> : '1'}
                </div>
                <span className={`text-[13.5px] font-bold ${
                  step === 1 ? 'text-charcoal' : 'text-gray-400'
                }`}>
                  Patient &amp; Treatment
                </span>
              </div>
              <div className="w-12 h-[2px] bg-gray-200" />
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] ${
                  step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  2
                </div>
                <span className={`text-[13.5px] font-bold ${
                  step === 2 ? 'text-charcoal' : 'text-gray-400'
                }`}>
                  Date &amp; Slot selector
                </span>
              </div>
            </div>

            {/* STEP 1: PATIENT & TREATMENT DETAILS */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <h3 className="font-sans font-bold text-[18px] text-charcoal mb-4">
                  Select Your Practitioner
                </h3>
                
                {/* Doctor Cards Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctorsList.map((doc) => {
                    const isSelected = formData.doctor === doc.name;
                    return (
                      <div
                        key={doc.name}
                        onClick={() => selectDoctor(doc.name)}
                        className={`border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                          isSelected 
                            ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/10' 
                            : 'border-border-light bg-gray-50 hover:bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[13px] ${
                            isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-charcoal'
                          }`}>
                            {doc.initials}
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                              <Check size={12} className="stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <h4 className="font-bold text-[14.5px] text-charcoal leading-snug">{doc.name}</h4>
                        <p className="text-[11.5px] text-primary font-semibold mt-1 mb-2">{doc.role}</p>
                        <p className="text-[12px] text-body-gray leading-relaxed">{doc.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="h-[1px] bg-gray-100 my-6" />

                <h3 className="font-sans font-bold text-[18px] text-charcoal mb-4">
                  Patient &amp; Procedure Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-[13px] font-bold text-charcoal">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter patient name"
                      className={`w-full bg-gray-50 border p-3.5 rounded-xl text-[14px] text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.name ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="text-[13px] font-bold text-charcoal">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      className={`w-full bg-gray-50 border p-3.5 rounded-xl text-[14px] text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-[13px] font-bold text-charcoal">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@example.com"
                      className={`w-full bg-gray-50 border p-3.5 rounded-xl text-[14px] text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.email ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Treatment Input */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="treatment" className="text-[13px] font-bold text-charcoal">
                      Select Treatment *
                    </label>
                    <select
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 border p-3.5 rounded-xl text-[14px] text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.treatment ? 'border-red-400' : 'border-gray-200 focus:border-primary'
                      }`}
                    >
                      <option value="">Choose your procedure</option>
                      {treatmentsList.map((treatment) => (
                        <option key={treatment} value={treatment}>
                          {treatment}
                        </option>
                      ))}
                    </select>
                    {errors.treatment && (
                      <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.treatment}
                      </span>
                    )}
                  </div>
                </div>

                {/* Additional Note Input */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-[13px] font-bold text-charcoal">
                    Write Special Medical Notes / Concerns (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describe your skin concern or request details here"
                    className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl text-[14px] text-charcoal focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-gray-150 flex justify-end">
                  <button
                    type="button"
                    onClick={proceedToStep2}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Slot Selection</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DYNAMIC CALENDAR & TIME SLOT SELECTOR */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                {/* Visual Calendar Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans font-bold text-[17px] text-charcoal">
                      Select Available Consultation Date
                    </h3>
                    <span className="text-[11.5px] text-body-gray font-semibold flex items-center gap-1">
                      <Clock size={12} className="text-primary" /> Mon - Sat: 10:30 AM - 8:30 PM
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {calendarDays.map((day) => {
                      const isSelected = selectedDate?.dateString === day.dateString;
                      return (
                        <div
                          key={day.dateString}
                          onClick={() => {
                            if (!day.isClosed) {
                              setSelectedDate(day);
                              setSelectedSlot(null);
                            }
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 ${
                            day.isClosed 
                              ? 'bg-red-50/20 border-red-100 opacity-50 cursor-not-allowed'
                              : isSelected
                                ? 'bg-primary border-primary text-white shadow-md scale-105'
                                : 'bg-gray-50 border-border-light hover:bg-white hover:border-gray-300 cursor-pointer'
                          }`}
                        >
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${
                            isSelected ? 'text-white' : 'text-gray-400'
                          }`}>
                            {day.dayName}
                          </span>
                          <span className="text-[18px] font-extrabold leading-none my-1 font-sans">
                            {day.dateNum}
                          </span>
                          <span className={`text-[9.5px] font-bold uppercase ${
                            day.isClosed 
                              ? 'text-red-500 font-extrabold'
                              : isSelected 
                                ? 'text-white/80' 
                                : 'text-body-gray'
                          }`}>
                            {day.isClosed ? 'Closed' : day.monthName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Area */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-bold text-[17px] text-charcoal">
                      Choose Your Preferred Time Slot
                    </h3>
                    <p className="text-[12px] text-body-gray">
                      Select a visual session slot below. Clean sanitization blocks are secured between treatments.
                    </p>
                  </div>

                  {/* Morning Session */}
                  <div className="space-y-3">
                    <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      🌅 Morning Sessions
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {slotsConfig.morning.map((slot) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            disabled={slot.status === 'booked'}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`px-4.5 py-3 rounded-xl border text-[13px] font-semibold transition-all flex items-center gap-2 select-none ${
                              slot.status === 'booked'
                                ? 'bg-gray-100 border-gray-200 text-gray-450 opacity-40 line-through cursor-not-allowed'
                                : isSelected
                                  ? 'bg-primary border-primary text-white shadow-md ring-2 ring-primary/20 scale-105'
                                  : 'bg-white border-border-light hover:border-gray-300 text-charcoal hover:scale-[1.02]'
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.status === 'filling' && !isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" title="Filling Fast" />
                            )}
                            {isSelected && <Check size={14} className="stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon Session */}
                  <div className="space-y-3">
                    <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      ☀️ Afternoon Sessions
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {slotsConfig.afternoon.map((slot) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            disabled={slot.status === 'booked'}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`px-4.5 py-3 rounded-xl border text-[13px] font-semibold transition-all flex items-center gap-2 select-none ${
                              slot.status === 'booked'
                                ? 'bg-gray-100 border-gray-200 text-gray-455 opacity-40 line-through cursor-not-allowed'
                                : isSelected
                                  ? 'bg-primary border-primary text-white shadow-md ring-2 ring-primary/20 scale-105'
                                  : 'bg-white border-border-light hover:border-gray-300 text-charcoal hover:scale-[1.02]'
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.status === 'filling' && !isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" title="Filling Fast" />
                            )}
                            {isSelected && <Check size={14} className="stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening Session */}
                  <div className="space-y-3">
                    <h4 className="text-[12.5px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      🌆 Evening Sessions
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {slotsConfig.evening.map((slot) => {
                        const isSelected = selectedSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            disabled={slot.status === 'booked'}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`px-4.5 py-3 rounded-xl border text-[13px] font-semibold transition-all flex items-center gap-2 select-none ${
                              slot.status === 'booked'
                                ? 'bg-gray-100 border-gray-200 text-gray-460 opacity-40 line-through cursor-not-allowed'
                                : isSelected
                                  ? 'bg-primary border-primary text-white shadow-md ring-2 ring-primary/20 scale-105'
                                  : 'bg-white border-border-light hover:border-gray-300 text-charcoal hover:scale-[1.02]'
                            }`}
                          >
                            <span>{slot.time}</span>
                            {slot.status === 'filling' && !isSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" title="Filling Fast" />
                            )}
                            {isSelected && <Check size={14} className="stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {errors.slot && (
                    <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.slot}
                    </span>
                  )}
                </div>

                {/* Back and Confirm Button group */}
                <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row gap-3 sm:justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-charcoal font-semibold py-3.5 px-6 rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer text-[14px]"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={triggerVerification}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-[14px]"
                  >
                    <span>Secure Slot &amp; Book</span>
                    <Sparkles size={16} className="fill-white/20" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Address and Operational Hours info */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Real-time Summary Card (Sticky/Progress display) */}
            <div className="bg-[#F5F0E8] border border-primary/10 rounded-3xl p-7 space-y-5">
              <h3 className="font-bold text-[16px] text-charcoal flex items-center gap-2 border-b border-primary/10 pb-3">
                <ShieldCheck className="text-primary w-5.5 h-5.5" />
                <span>Appointment Summary</span>
              </h3>
              
              <ul className="space-y-3.5 text-[13.5px] font-medium text-body-gray">
                <li className="flex justify-between items-start">
                  <span>Practitioner:</span>
                  <span className="text-charcoal font-bold text-right max-w-[200px]">{formData.doctor}</span>
                </li>
                <li className="flex justify-between items-start">
                  <span>Procedure:</span>
                  <span className="text-charcoal font-bold text-right max-w-[200px]">
                    {formData.treatment || <em className="text-gray-400 font-normal">Not selected</em>}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Selected Date:</span>
                  <span className="text-charcoal font-bold text-right">
                    {selectedDate?.dateString || <em className="text-gray-400 font-normal">Not selected</em>}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Selected Time:</span>
                  <span className="text-primary font-extrabold text-right">
                    {selectedSlot || <em className="text-gray-400 font-normal">Select slot in Step 2</em>}
                  </span>
                </li>
              </ul>

              <div className="border-t border-primary/10 pt-4 text-[11.5px] leading-relaxed text-gray-500 font-medium">
                Our sterile procedure chambers are locked for a minimum of 20 minutes between consultation slots to guarantee full HEPA room purification.
              </div>
            </div>

            {/* Address Details Card */}
            <div className="bg-white rounded-3xl border border-border-light shadow-md p-8 space-y-6">
              <h3 className="font-bold text-[18px] text-charcoal pb-2 border-b border-gray-100">
                Clinic Location &amp; Contact
              </h3>

              <ul className="space-y-5 text-[14px] text-body-gray font-medium">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-0.5 text-[14px]">Clinic Address</h4>
                    <p className="leading-relaxed">
                      Opp Rama International, CIDCO N3, Aurangabad 431003, Maharashtra, India
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-0.5 text-[14px]">Call Phone Number</h4>
                    <p>+91-9552000499</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-0.5 text-[14px]">Email Inbox</h4>
                    <a href="mailto:reception@skinsolutions.in" className="hover:text-primary transition-colors block">
                      reception@skinsolutions.in
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Operational hours */}
            <div className="bg-white rounded-3xl border border-border-light shadow-md p-8 space-y-5">
              <h3 className="font-bold text-[18px] text-charcoal pb-2 border-b border-gray-100 flex items-center gap-2">
                <Clock className="text-primary w-5.5 h-5.5" />
                <span>Working Hours</span>
              </h3>

              <div className="overflow-hidden rounded-xl border border-gray-150">
                <table className="w-full text-[13.5px] text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="p-3 font-bold text-charcoal">Monday to Saturday</td>
                      <td className="p-3 text-body-gray font-semibold">10:30 AM - 8:30 PM</td>
                    </tr>
                    <tr className="bg-red-50/30">
                      <td className="p-3 font-bold text-red-500">Sunday</td>
                      <td className="p-3 text-red-500 font-extrabold uppercase text-[12px] tracking-wider">Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFYING LOADER OVERLAY */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4"
          >
            <div className="text-center space-y-6 max-w-sm w-full p-8">
              {/* Circular Aesthetic Glow Loader */}
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                />
                <Sparkles size={24} className="text-primary absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-bold text-[18px]">Verifying Consultation Pass</h4>
                <p className="text-gray-400 text-[13px] font-semibold tracking-wide animate-pulse min-h-[20px]">
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
                      <h5 className="text-[12.5px] font-bold text-gray-400 leading-none">Sterile Procedure Chambers Entry</h5>
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

      {/* Sticky Bottom Mobile Quick Navigation Dock */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border-light shadow-2xl flex items-center justify-around px-4 z-[999]">
        <a
          href="tel:+919552000499"
          className="flex flex-col items-center justify-center text-charcoal hover:text-primary transition-colors w-1/3"
        >
          <PhoneCall size={20} className="text-primary" />
          <span className="text-[10px] font-bold mt-1 text-charcoal">Call Clinic</span>
        </a>
        
        <div className="w-[1px] h-8 bg-gray-200" />

        <a
          href="https://wa.me/919552000499?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-charcoal hover:text-primary transition-colors w-1/3"
        >
          <MessageSquare size={20} className="text-[#25D366]" />
          <span className="text-[10px] font-bold mt-1 text-charcoal">WhatsApp</span>
        </a>

        <div className="w-[1px] h-8 bg-gray-200" />

        <button
          onClick={() => {
            setStep(1);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center text-charcoal hover:text-primary transition-colors w-1/3"
        >
          <Calendar size={20} className="text-primary" />
          <span className="text-[10px] font-bold mt-1 text-charcoal">Book Now</span>
        </button>
      </div>
    </div>
  );
};

export default Contact;
