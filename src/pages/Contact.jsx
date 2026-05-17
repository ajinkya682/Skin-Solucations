import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, Check, X,
  MessageSquare, PhoneCall, ArrowRight, Clipboard,
  Sparkles, CheckCircle2, AlertCircle, Compass, HelpCircle
} from 'lucide-react';

const Contact = () => {
  // Contact Form States
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Live Clinical Status Clock State
  // Open Hours: Monday to Saturday, 10:30 AM - 8:30 PM. Sunday: Closed.
  const [clinicStatus, setClinicStatus] = useState({ isOpen: false, text: '' });

  useEffect(() => {
    const checkClinicStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Convert current time to total minutes past midnight
      const totalMinutes = currentHour * 60 + currentMinute;
      
      const openTime = 10 * 60 + 30; // 10:30 AM in minutes (630)
      const closeTime = 20 * 60 + 30; // 8:30 PM in minutes (1230)

      if (currentDay === 0) {
        // Sunday
        setClinicStatus({
          isOpen: false,
          text: 'CLOSED NOW — Sunday Closed (Opens tomorrow at 10:30 AM)'
        });
      } else if (totalMinutes >= openTime && totalMinutes < closeTime) {
        // Active hours Mon-Sat
        setClinicStatus({
          isOpen: true,
          text: 'OPEN NOW — Clinic is currently receiving patients'
        });
      } else {
        // Closed hours Mon-Sat
        let nextOpenText = 'Opens tomorrow at 10:30 AM';
        if (currentDay === 6) {
          nextOpenText = 'Opens Monday at 10:30 AM';
        }
        setClinicStatus({
          isOpen: false,
          text: `CLOSED NOW — Clinic is closed (${nextOpenText})`
        });
      }
    };

    checkClinicStatus();
    // Refresh status every 30 seconds
    const statusInterval = setInterval(checkClinicStatus, 30000);
    return () => clearInterval(statusInterval);
  }, []);

  // Quick Action: Copy to Clipboard Utility
  const handleCopyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`✓ ${label} copied to clipboard!`);
    
    // Auto dismiss toast after 2.5 seconds
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Inquiry Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    
    const phonePattern = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit number.';
    }

    if (formData.email.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        newErrors.email = 'Please enter a valid email.';
      }
    }

    if (!formData.message.trim()) newErrors.message = 'Please type your message.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 bg-light-bg relative">
      
      {/* GLOBAL TOAST NOTICE */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[99999] bg-charcoal text-white font-bold text-[13px] px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-white/10"
          >
            <Sparkles size={15} className="text-gold fill-gold/20" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PAGE HEADER */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <span className="bg-primary/10 text-primary font-bold text-[11px] sm:text-[12px] uppercase px-3 py-1.5 rounded-full tracking-wider">
            Contact Hub
          </span>
          <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-charcoal">
            Get In Touch With Skin Solutions
          </h1>
          <p className="text-body-gray max-w-xl mx-auto text-[14px] sm:text-[16px]">
            Have a clinical inquiry, feedback, or need directions? Our Aurangabad team is here to assist you.
          </p>

          {/* DYNAMIC CLINIC CLOCK BAR */}
          <div className="inline-block pt-3">
            <span className={`inline-flex items-center gap-2 text-[12.5px] font-bold px-4 py-2 rounded-full border shadow-sm ${
              clinicStatus.isOpen 
                ? 'bg-green-500/10 border-green-500/20 text-green-700' 
                : 'bg-red-500/10 border-red-500/20 text-red-700'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${clinicStatus.isOpen ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
              <span>{clinicStatus.text}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: CLINIC CONTACT INFORMATION DETAILS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Action Hub Header */}
            <div className="bg-white rounded-3xl border border-border-light p-6 sm:p-7 shadow-sm space-y-6">
              <h3 className="font-sans font-bold text-xl text-charcoal border-b border-gray-100 pb-3 flex items-center gap-2">
                <Compass className="text-primary w-5 h-5" />
                Clinic Details
              </h3>

              <div className="space-y-5">
                {/* 1. Address landmark */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase font-bold text-gray-400">Clinical Landmark</p>
                    <p className="text-[14px] font-bold text-charcoal leading-relaxed">
                      Opp Rama International, CIDCO N3, Aurangabad, Maharashtra 431003
                    </p>
                  </div>
                </div>

                {/* 2. Direct Phone Hub */}
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="text-[11px] uppercase font-bold text-gray-400">Call Reception Desk</p>
                    <div className="flex items-center justify-between">
                      <a href="tel:+919552000499" className="text-[14px] font-bold text-charcoal hover:text-primary transition-colors">
                        +91-9552000499
                      </a>
                      <button 
                        onClick={() => handleCopyToClipboard('+919552000499', 'Phone number')}
                        className="text-gray-450 hover:text-charcoal p-1 rounded hover:bg-gray-100 transition-all focus:outline-none"
                        title="Copy to clipboard"
                      >
                        <Clipboard size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Direct Email Hub */}
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="text-[11px] uppercase font-bold text-gray-400">Clinic Email Inquiry</p>
                    <div className="flex items-center justify-between">
                      <a href="mailto:reception@skinsolutions.in" className="text-[14px] font-bold text-charcoal hover:text-primary transition-colors">
                        reception@skinsolutions.in
                      </a>
                      <button 
                        onClick={() => handleCopyToClipboard('reception@skinsolutions.in', 'Email address')}
                        className="text-gray-450 hover:text-charcoal p-1 rounded hover:bg-gray-100 transition-all focus:outline-none"
                        title="Copy to clipboard"
                      >
                        <Clipboard size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Shift Schedule Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1 flex-grow">
                    <p className="text-[11px] uppercase font-bold text-gray-400">Clinical Shifts</p>
                    <div className="text-[13.5px] font-bold text-charcoal space-y-1">
                      <div className="flex justify-between">
                        <span>Monday – Saturday</span>
                        <span>10:30 AM – 8:30 PM</span>
                      </div>
                      <div className="flex justify-between text-red-500 font-extrabold">
                        <span>Sunday</span>
                        <span>Clinic Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GPS Map Landmark Box */}
            <div className="bg-white rounded-3xl border border-border-light p-5 shadow-sm space-y-3 relative overflow-hidden group">
              <div className="h-44 rounded-2xl bg-gray-100 relative overflow-hidden flex items-center justify-center border border-gray-100">
                {/* Beautiful custom clinical map graphic decoration */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visual coordinate target marker decoration */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center animate-pulse">
                    <MapPin className="stroke-[2.5]" />
                  </div>
                  <span className="font-extrabold text-[12.5px] text-charcoal">Rama International Road</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Aurangabad, CIDCO N3</span>
                </div>

                {/* Map Grid Roads representations */}
                <div className="absolute top-1/2 left-0 right-0 h-[10px] bg-gray-200/50" />
                <div className="absolute left-1/3 top-0 bottom-0 w-[10px] bg-gray-200/50" />
              </div>
              
              <a
                href="https://maps.google.com/?q=Skin+Solutions+Clinic+CIDCO+N3+Aurangabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-charcoal hover:bg-charcoal/90 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-[13.5px]"
              >
                <span>Navigate in Google Maps</span>
                <ArrowRight size={15} />
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: CUSTOM FORM & GENERAL INQUIRY COMPONENT */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-border-light p-6 sm:p-8 shadow-sm space-y-6 relative">
              <h3 className="font-sans font-bold text-xl text-charcoal border-b border-gray-100 pb-3 flex items-center gap-2">
                <MessageSquare className="text-primary w-5 h-5" />
                Send a Message
              </h3>

              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-500/10 border border-green-500/20 text-green-800 rounded-2xl p-6 text-center space-y-3.5"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[16px]">Inquiry Received Securely</h4>
                      <p className="text-[13px] leading-relaxed text-green-700/90 max-w-sm mx-auto">
                        Thank you for contacting Skin Solutions. Our desk officer will review your message and reach out to you shortly!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-wider text-charcoal">Your Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. / Mr. / Ms. Name"
                          className={`w-full bg-light-bg border rounded-xl py-3 px-4 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                            errors.name ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[11px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle size={13} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label className="text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-wider text-charcoal">Mobile Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={10}
                          placeholder="10-digit number"
                          className={`w-full bg-light-bg border rounded-xl py-3 px-4 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[11px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle size={13} />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-wider text-charcoal">Email Address (Optional)</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@address.com"
                          className={`w-full bg-light-bg border rounded-xl py-3 px-4 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[11px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle size={13} />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Subject dropdown */}
                      <div className="space-y-2">
                        <label className="text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-wider text-charcoal">Inquiry Subject</label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full bg-light-bg border border-gray-200 rounded-xl py-3 px-4 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                        >
                          <option value="General Inquiry">General Clinic Inquiry</option>
                          <option value="Treatment Questions">Treatment & Procedures</option>
                          <option value="Price Lists">Price Lists & Bundles</option>
                          <option value="Feedback">Feedback & Review</option>
                        </select>
                      </div>
                    </div>

                    {/* Message box */}
                    <div className="space-y-2">
                      <label className="text-[12.5px] sm:text-[13px] font-extrabold uppercase tracking-wider text-charcoal">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Write your question or request detail here..."
                        className={`w-full bg-light-bg border rounded-xl py-3 px-4 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none ${
                          errors.message ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-[11px] font-bold mt-1 flex items-center gap-1">
                          <AlertCircle size={13} />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer text-[14px]"
                      >
                        Submit Message
                      </button>
                    </div>

                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
