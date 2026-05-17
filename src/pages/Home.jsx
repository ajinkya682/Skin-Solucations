import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  Shield,
  Phone,
  ArrowRight,
  Smile,
  CheckCircle,
  Calendar,
  Sparkles,
  Award,
  Heart,
  Activity,
  ChevronRight,
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Laser', 'Acne', 'Pigmentation', 'Hair', 'Anti-Aging'];

  // Services list
  const allServices = [
    {
      id: 1,
      name: 'Laser Toning',
      category: 'Laser',
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      desc: 'US FDA approved Nd-YAG laser for deep pigment clearing, skin whitening and skin rejuvenation.',
      benefits: ['Even skin tone & brightness', 'Melasma pigment clearing', 'Painless & no downtime'],
    },
    {
      id: 2,
      name: 'Acne Treatment',
      category: 'Acne',
      icon: <Activity className="w-6 h-6 text-primary" />,
      desc: 'Comprehensive clinical peels and fractional CO2 laser to remove active pimples and acne scars.',
      benefits: ['Fades deep pimple scars', 'Shrinks open pores', 'Regulates sebum oil control'],
    },
    {
      id: 3,
      name: 'Pigmentation Removal',
      category: 'Pigmentation',
      icon: <Award className="w-6 h-6 text-primary" />,
      desc: 'Yellow peel and target lasers to treat uneven patches, tanning, sun spots and dark circles.',
      benefits: ['Removes under eye circles', 'Clears sun spots and warts', 'Ideal for Indian skin tones'],
    },
    {
      id: 4,
      name: 'Anti-Aging Therapy',
      category: 'Anti-Aging',
      icon: <Heart className="w-6 h-6 text-primary" />,
      desc: 'Premium Exilis radio frequency and Botox/Fillers to tighten skin, remove wrinkles and lines.',
      benefits: ['Tightens loose face skin', 'Smoothes fine lines & wrinkles', 'Stimulates skin collagen'],
    },
    {
      id: 5,
      name: 'Hair Restoration',
      category: 'Hair',
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      desc: 'PRP (Platelet Rich Plasma) and advanced stitchless FUE Hair Transplant for natural hair growth.',
      benefits: ['Controls active hair fall', 'Stimulates dormant follicles', 'High density natural growth'],
    },
    {
      id: 6,
      name: 'Tattoo Removal',
      category: 'Laser',
      icon: <Shield className="w-6 h-6 text-primary" />,
      desc: 'High-performance Tri-Beam Laser to break down multicolor tattoo pigments safely and cleanly.',
      benefits: ['Minimal residual scaring', 'Safe for sensitive skin', 'Complete pigment removal'],
    },
  ];

  const filteredServices =
    activeCategory === 'All'
      ? allServices
      : allServices.filter((service) => service.category === activeCategory);

  return (
    <div className="pt-[70px] overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[calc(100vh-70px)] flex items-center bg-gradient-to-r from-white to-[#F5F0E8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary font-semibold text-[12px] px-3 py-1 rounded-full w-max">
                <Sparkles size={14} />
                <span>Trusted Dermatology Clinic Since 2009</span>
              </div>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.15] text-charcoal">
                Reveal Your Most <br />
                <span className="text-primary">Confident Skin.</span>
              </h1>
              <p className="text-body-gray text-[16px] leading-relaxed max-w-[480px]">
                Advanced medical-grade dermatology and laser cosmetology treatments customized for your unique skin needs. Restoring smiles, backed by science.
              </p>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-primary-hover text-white font-semibold text-center py-3.5 px-7 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Book Appointment
                </Link>
                <a
                  href="https://wa.me/919552000499?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold flex items-center justify-center gap-2 py-3 px-7 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 2.01 14.032.989 11.41.989c-5.442 0-9.87 4.373-9.873 9.803-.001 1.77.476 3.498 1.381 5.03L1.96 21.547l5.811-1.517zM17.818 14.5c-.34-.17-2.01-.99-2.32-1.1-.31-.11-.53-.17-.75.17-.22.34-.85 1.1-1.04 1.3-.19.2-.39.22-.73.05-1.3-.65-2.27-1.14-3.15-2.65-.23-.4-.23-.82-.06-1.15.17-.33.34-.73.51-1.1.17-.37.23-.62.11-.85-.12-.23-.75-1.92-1.04-2.62-.28-.68-.57-.59-.75-.59-.19-.01-.4-.01-.62-.01-.22 0-.58.08-.88.4-.3.33-1.15 1.1-1.15 2.68s1.15 3.12 1.3 3.32c.16.2 2.26 3.4 5.48 4.79 2.58 1.12 3.11.9 4.23.8.34-.03 1.15-.47 1.32-.93.16-.47.16-.87.11-.96-.05-.08-.22-.13-.56-.3z" />
                  </svg>
                  <span>WhatsApp Now</span>
                </a>
              </div>
              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-200/50 text-[13px] text-body-gray">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-ping" />
                  Available Today
                </span>
                <span className="text-gray-300">|</span>
                <span>Free Initial Consultation</span>
                <span className="text-gray-300">|</span>
                <span>100% Safe Technology</span>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white z-10">
                <img
                  src="/assets/images/hero_doctor.png"
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Card 1: Experience */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute top-10 -left-6 md:-left-12 bg-white flex items-center space-x-3.5 py-3 px-5 rounded-2xl shadow-lg border border-border-light z-20 hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-charcoal">15+ Years</h4>
                  <p className="text-[12px] text-body-gray">Clinical Experience</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Patients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 right-4 md:-right-6 bg-white flex items-center space-x-3.5 py-3.5 px-5 rounded-2xl shadow-lg border border-border-light z-20 hover:scale-105 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                  <Smile size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-charcoal">10,000+</h4>
                  <p className="text-[12px] text-body-gray">Happy Patients</p>
                </div>
              </motion.div>

              {/* Decorative floating circles */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 -z-10" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold/5 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS BAR */}
      <section className="bg-beige border-y border-border-light/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 items-center text-center">
            {/* Stat Item 1 */}
            <div className="flex flex-col items-center border-r border-gray-300/60 px-4">
              <span className="font-sans font-bold text-3xl sm:text-4xl text-primary leading-tight">
                15+
              </span>
              <span className="text-[13px] sm:text-[14px] text-body-gray font-semibold mt-1">
                Years of Experience
              </span>
            </div>

            {/* Stat Item 2 */}
            <div className="flex flex-col items-center lg:border-r border-gray-300/60 px-4">
              <span className="font-sans font-bold text-3xl sm:text-4xl text-primary leading-tight">
                10,000+
              </span>
              <span className="text-[13px] sm:text-[14px] text-body-gray font-semibold mt-1">
                Happy Patients
              </span>
            </div>

            {/* Stat Item 3 */}
            <div className="flex flex-col items-center border-r border-gray-300/60 px-4">
              <span className="font-sans font-bold text-3xl sm:text-4xl text-primary leading-tight">
                25+
              </span>
              <span className="text-[13px] sm:text-[14px] text-body-gray font-semibold mt-1">
                Advanced Treatments
              </span>
            </div>

            {/* Stat Item 4 */}
            <div className="flex flex-col items-center px-4">
              <span className="font-sans font-bold text-3xl sm:text-4xl text-primary leading-tight flex items-center justify-center gap-1">
                4.9 <Star className="fill-gold text-gold w-6 h-6 inline-block" />
              </span>
              <span className="text-[13px] sm:text-[14px] text-body-gray font-semibold mt-1">
                Google Review Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PREVIEW */}
      <section className="bg-card-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
              Our Signature Treatments
            </h2>
            <p className="text-body-gray text-[15px] max-w-xl mx-auto">
              Clinically-proven aesthetic medical procedures, utilizing state-of-the-art dermatological technology.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center items-center gap-2.5 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4.5 py-2.5 rounded-full font-semibold text-[13px] tracking-wide transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-primary border-primary text-white shadow-md'
                      : 'bg-white border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={service.id}
                className="bg-white rounded-2xl p-7 flex flex-col border border-border-light shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="font-bold text-[18px] text-charcoal mb-2">{service.name}</h3>
                <p className="text-body-gray text-[14px] leading-relaxed mb-5 flex-grow">
                  {service.desc}
                </p>
                {/* Benefits List */}
                <ul className="space-y-2 mb-6 text-[13px] text-body-gray font-medium">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="text-primary w-4.5 h-4.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="inline-flex items-center text-primary hover:text-primary-hover font-bold text-[14px] w-max group cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BEFORE AND AFTER PREVIEW */}
      <section className="bg-beige py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
              Real Patient Transformations
            </h2>
            <p className="text-body-gray text-[15px]">
              Genuine case outcomes demonstrating laser accuracy and aesthetic precision.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BeforeAfterSlider
              beforeImage="/assets/images/before_after_laser.png"
              afterImage="/assets/images/before_after_laser.png"
              treatmentName="Carbon Laser Peel & Toning"
              category="Laser Toning"
            />
            <BeforeAfterSlider
              beforeImage="/assets/images/before_after_laser.png"
              afterImage="/assets/images/before_after_laser.png"
              treatmentName="CO2 Fractional Acne Scar Therapy"
              category="Acne Removal"
            />
            <BeforeAfterSlider
              beforeImage="/assets/images/before_after_laser.png"
              afterImage="/assets/images/before_after_laser.png"
              treatmentName="Deep Melasma Pigment Peels"
              category="Pigmentation"
            />
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/before-after"
              className="bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View All Results</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: DOCTOR CREDIBILITY */}
      <section className="bg-card-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side text info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary font-semibold text-[12px] px-3 py-1 rounded-full w-max">
                <Award size={14} />
                <span>Award Winning Dermatologists</span>
              </div>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
                Meet Our Expert Dermatologists
              </h2>
              <p className="text-body-gray text-[15px] leading-relaxed">
                Led by Dr. Ajeet Singh Sethi, a conscientious and enthusiastic humanist with extensive dermatosurgical experience across India's premier cosmetic institutions. All treatments are customize-engineered for Indian skin conditions.
              </p>
              <div>
                <Link
                  to="/doctors"
                  className="text-primary hover:text-primary-hover font-bold inline-flex items-center gap-1 text-[15px] group cursor-pointer"
                >
                  <span>View All Doctors Profiles</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right side doctor preview cards stack */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* Doctor Card */}
              <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                  <img
                    src="/assets/images/hero_doctor.png"
                    alt="Dr. Ajeet Singh Sethi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-bold text-[18px] text-charcoal">Dr. Ajeet Singh Sethi</h3>
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-max mx-auto sm:mx-0">
                      MBBS, MD (Dermatology)
                    </span>
                  </div>
                  <p className="text-[13px] text-body-gray">
                    Consultant Dermatologist & Cosmetologist. Ex. Kaya Skin Clinic Specialist.
                  </p>
                  <p className="text-[12px] text-gray-400 font-semibold flex items-center justify-center sm:justify-start gap-1">
                    <Activity size={14} className="text-primary" />
                    <span>15+ Years Clinical Experience</span>
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold py-2.5 px-4 rounded-lg flex-shrink-0 w-full sm:w-auto text-center transition-colors cursor-pointer"
                >
                  Book with Dr. Ajeet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="bg-beige py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
              What Our Patients Say
            </h2>
            <p className="text-body-gray text-[15px]">
              Genuine reviews from patients who achieved healthy and beautiful skin transformations.
            </p>
          </div>

          {/* Testimonial Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-border-light shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-gold text-gold w-4 h-4" />
                  ))}
                </div>
                <span className="text-primary font-bold text-4xl leading-none">&ldquo;</span>
                <p className="text-body-gray italic text-[14px] leading-relaxed -mt-2 mb-6">
                  Extremely clean and relaxing clinic. Dr. Ajeet explained the entire process of CO2 fractional laser for my acne scars. The results are amazing in just 3 sessions. Highly recommended!
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[14px]">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-charcoal leading-tight">Rajesh P.</h4>
                  <p className="text-[12px] text-gray-500">Aurangabad • Acne Scar Reduction</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-border-light shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-gold text-gold w-4 h-4" />
                  ))}
                </div>
                <span className="text-primary font-bold text-4xl leading-none">&ldquo;</span>
                <p className="text-body-gray italic text-[14px] leading-relaxed -mt-2 mb-6">
                  My dark pigmentation patches had been causing uneven skin tone. The customized skin peel treatments did magic. My skin feels fresh, clear, and glowing. Thank you Skin Solutions!
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[14px]">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-charcoal leading-tight">Pooja S.</h4>
                  <p className="text-[12px] text-gray-500">Pune • Deep Skin Peels</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-border-light shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-gold text-gold w-4 h-4" />
                  ))}
                </div>
                <span className="text-primary font-bold text-4xl leading-none">&ldquo;</span>
                <p className="text-body-gray italic text-[14px] leading-relaxed -mt-2 mb-6">
                  Excellent Laser Hair Reduction treatment! It was almost painless using their advanced Nd-YAG laser device. Staff was incredibly polite, highly hygienic environment.
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-[14px]">
                  A
                </div>
                <div>
                  <h4 className="font-bold text-[14px] text-charcoal leading-tight">Anjali K.</h4>
                  <p className="text-[12px] text-gray-500">Mumbai • Laser Hair Reduction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CLINIC HIGHLIGHTS STRIP */}
      <section className="bg-footer-dark border-t border-gray-800 py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center text-center">
            {/* Highlight 1 */}
            <div className="flex flex-col items-center space-y-2">
              <Sparkles size={28} className="text-primary" />
              <h4 className="font-bold text-[15px] tracking-wide">Advanced Equipment</h4>
              <p className="text-[12px] text-gray-500">US-FDA Approved Lasers</p>
            </div>
            {/* Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-gray-800 self-center justify-self-center" />
            {/* Highlight 2 */}
            <div className="flex flex-col items-center space-y-2">
              <Award size={28} className="text-primary" />
              <h4 className="font-bold text-[15px] tracking-wide">Certified Doctors</h4>
              <p className="text-[12px] text-gray-500">Post Graduate Experts</p>
            </div>
            {/* Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-gray-800 self-center justify-self-center" />
            {/* Highlight 3 */}
            <div className="flex flex-col items-center space-y-2">
              <Shield size={28} className="text-primary" />
              <h4 className="font-bold text-[15px] tracking-wide">Sterile Safe Clinic</h4>
              <p className="text-[12px] text-gray-500">100% Hygiene Assured</p>
            </div>
            {/* Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-gray-800 self-center justify-self-center" />
            {/* Highlight 4 */}
            <div className="flex flex-col items-center space-y-2">
              <Heart size={28} className="text-primary" />
              <h4 className="font-bold text-[15px] tracking-wide">Personalized Care</h4>
              <p className="text-[12px] text-gray-500">Customized For Indian Skin</p>
            </div>
            {/* Divider */}
            <div className="hidden lg:block h-8 w-[1px] bg-gray-800 self-center justify-self-center" />
            {/* Highlight 5 */}
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle size={28} className="text-primary" />
              <h4 className="font-bold text-[15px] tracking-wide">Trusted Since 2009</h4>
              <p className="text-[12px] text-gray-500">Thousands of Happy Faces</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-white py-20 text-center relative overflow-hidden">
        {/* Background bubbles */}
        <div className="absolute top-0 left-0 w-36 h-36 rounded-full bg-white/5 -translate-x-12 -translate-y-12" />
        <div className="absolute bottom-0 right-0 w-52 h-52 rounded-full bg-white/5 translate-x-16 translate-y-16" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] leading-tight">
            Start Your Skin Transformation Today
          </h2>
          <p className="text-white/80 text-[15px] sm:text-[16px] max-w-xl mx-auto">
            Book a consulting session with Dr. Ajeet Singh Sethi and discover clinical care designed especially for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+919552000499"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary font-bold flex items-center justify-center gap-2 py-3 px-8 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <Phone size={18} />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
