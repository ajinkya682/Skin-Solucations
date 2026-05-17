import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Heart, Sparkles, Target, Compass, CheckCircle } from 'lucide-react';

const About = () => {
  const whyChooseUs = [
    {
      id: 1,
      title: 'Expert Certified Dermatologists',
      desc: 'Our clinical team is led by MD Qualified, kaya-trained dermatologists with observer ships from Bangalore and Nanavati Hospital Mumbai.',
      icon: <Award className="w-6 h-6 text-primary" />,
    },
    {
      id: 2,
      title: 'FDA Approved Modern Treatments',
      desc: 'We strictly employ US FDA-approved state-of-the-art systems such as Cutera CoolGlide Nd-YAG and Exilis RF, assuring absolute client safety.',
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    },
    {
      id: 3,
      title: 'Personalized Skin Assessment',
      desc: 'We strongly believe that since no two faces are identical, skin therapies must be custom-engineered to target your specific cellular traits.',
      icon: <Target className="w-6 h-6 text-primary" />,
    },
    {
      id: 4,
      title: 'Comfortable and Safe Environment',
      desc: 'A clinical layout optimized for total client hygiene, sterile handling and absolute privacy during consulting and operational sessions.',
      icon: <Heart className="w-6 h-6 text-primary" />,
    },
  ];

  const timelineEvents = [
    {
      year: '2009',
      title: 'Foundation of Skin Solutions',
      desc: 'Dr. Ajeet Singh Sethi established the clinic in Aurangabad after extensive consultation at Kaya Skin Clinic in Mumbai, with a mission to bring world-class skin therapies to Marathwada.',
    },
    {
      year: '2013',
      title: 'Aesthetic Technology Expansion',
      desc: 'Introduced the state-of-the-art US-FDA approved Nd-YAG Cutera Laser for advanced laser hair reduction and carbon laser toning.',
    },
    {
      year: '2018',
      title: 'Non-Surgical Face Tightening Launch',
      desc: 'Acquired Exilis Radio Frequency device designed to tighten loose skin, dissolve body fat, and reduce wrinkles without surgical downtime.',
    },
    {
      year: '2022',
      title: 'State-of-the-Art Luxury Clinic Facility',
      desc: 'Relocated into a premium, ultra-modern luxury infrastructure in CIDCO N3 (Opp. Rama International) with separate laser wings and strict sterile consultation rooms.',
    },
    {
      year: 'Present',
      title: '10,000+ Rejuvenated Smiles',
      desc: 'Serving as the region’s premier medical-aesthetic clinic, backed by 15+ years of trust, certified safety, and result-oriented clinical protocols.',
    },
  ];

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-gradient-to-r from-white to-[#F5F0E8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Col */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary font-semibold text-[12px] px-3 py-1 rounded-full w-max">
                <Sparkles size={14} />
                <span>About Our Clinic</span>
              </div>
              <h1 className="font-sans font-bold text-4xl sm:text-5xl leading-tight text-charcoal">
                A Decade of <br />
                <span className="text-primary">Skin Clinical Excellence.</span>
              </h1>
              <p className="text-body-gray text-[15px] sm:text-[16px] leading-relaxed">
                Skin is the most beautiful, Visible, enchanting and precious body part. At Skin Solutions, our endeavour is to restore the smile on every face which has gone into hiding by providing innovative & advanced dermatological therapeutic solutions and customized cosmetic treatments.
              </p>
              <p className="text-body-gray text-[15px] sm:text-[16px] leading-relaxed">
                Never in Aurangabad, approach to skin therapy was so revolutionary and result-oriented. We offer a hygienic, relaxed and refreshing environment backed by internationally acclaimed technology.
              </p>
              <div>
                <Link
                  to="/doctors"
                  className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md inline-block cursor-pointer"
                >
                  Meet Our Doctors
                </Link>
              </div>
            </motion.div>

            {/* Right Col */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="/assets/images/clinic_interior.png"
                  alt="Skin Solutions Clinic Interior"
                  className="w-full h-full object-cover"
                />
                {/* Floating Badge */}
                <div className="absolute top-6 left-6 bg-primary text-white font-sans font-bold text-[14px] py-2 px-4 rounded-xl shadow-lg">
                  Est. 2009
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MISSION AND VISION */}
      <section className="bg-card-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl border-l-4 border-l-primary border border-border-light shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Target size={24} />
              </div>
              <h3 className="font-bold text-[20px] text-charcoal">Our Mission</h3>
              <p className="text-body-gray text-[14px] leading-relaxed">
                To provide advanced clinical dermatological and cosmetic services that are effective and accessible. We aim to customize scientific skin solutions specifically engineered for Indian skin types, restoring beauty and self-confidence.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl border-l-4 border-l-gold border border-border-light shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Compass size={24} />
              </div>
              <h3 className="font-bold text-[20px] text-charcoal">Our Vision</h3>
              <p className="text-body-gray text-[14px] leading-relaxed">
                To serve as a trusted regional clinic for world-class dermatology, combining clinical dermatopathology, dermatosurgery, and non-surgical body-contouring with absolute focus on hygiene, certified safety, and long-lasting patient health.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="bg-beige py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
              Why Patients Choose Us
            </h2>
            <p className="text-body-gray text-[15px]">
              Combining medical-grade diagnostics with modern, relaxing aesthetic cosmetology.
            </p>
          </div>

          {/* Grid Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-2xl border border-border-light shadow-sm flex items-start space-x-5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-[16px] text-charcoal">{feature.title}</h3>
                  <p className="text-body-gray text-[14px] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CLINIC TIMELINE */}
      <section className="bg-card-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
              Our Journey
            </h2>
            <p className="text-body-gray text-[15px]">
              A timeline demonstrating continuous expansion of technology and professional care.
            </p>
          </div>

          {/* Vertical Timeline container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    key={event.year}
                    className={`relative flex flex-col md:flex-row items-center justify-between ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Event Dot on line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10" />

                    {/* Left/Right Card Panel */}
                    <div className="w-full md:w-[45%] bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[18px] font-sans font-extrabold text-primary">
                          {event.year}
                        </span>
                      </div>
                      <h4 className="font-bold text-[15px] text-charcoal mb-2">{event.title}</h4>
                      <p className="text-body-gray text-[13px] leading-relaxed">{event.desc}</p>
                    </div>

                    {/* Spacer for MD screens */}
                    <div className="hidden md:block w-[45%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
