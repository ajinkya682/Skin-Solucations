import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Phone,
  Calendar,
  Sparkles,
  Zap,
  Flame,
  User,
  Scissors,
  Bookmark,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    { key: 'All', name: 'All' },
    { key: 'Laser', name: 'Laser Treatments' },
    { key: 'Acne', name: 'Acne & Skin' },
    { key: 'Pigmentation', name: 'Pigmentation' },
    { key: 'Hair', name: 'Hair Care' },
    { key: 'Anti-Aging', name: 'Anti-Aging' },
  ];

  const serviceData = [
    {
      category: 'Laser',
      categoryName: 'Laser Treatments',
      items: [
        {
          name: 'Laser Hair Reduction',
          icon: <Zap className="w-5.5 h-5.5 text-primary" />,
          desc: 'US FDA-approved Cutera CoolGlide 1064 Nd-YAG Laser, exceptionally safe and effective for Indian skin.',
          benefits: ['Permanent hair follicle reduction', 'Safest for dark skin tones', 'Almost painless and fast'],
          steps: ['Consultation & patch test', 'Skin chilling & gel application', 'Precise laser hair pulse treatment'],
        },
        {
          name: 'Carbon Laser Peel',
          icon: <Flame className="w-5.5 h-5.5 text-primary" />,
          desc: 'Advanced Tri-Beam Laser peeling to clean deep pores, remove blackheads, and instantly brighten skin.',
          benefits: ['Instant glow and smoothness', 'Reduces active acne & oiliness', 'Tightens skin open pores'],
          steps: ['Liquid carbon layer apply', 'Laser sweep to vaporize carbon', 'Soothing skin recovery mask'],
        },
        {
          name: 'Tattoo Removal',
          icon: <Scissors className="w-5.5 h-5.5 text-primary" />,
          desc: 'High precision Tri-Beam Q-Switched Laser to target and break up stubborn multicolor inks cleanly.',
          benefits: ['Safe tattoo pigment fade', 'No residual scarring', 'Effective on dark green/black inks'],
          steps: ['Laser parameters setup', 'Micro-second laser pulses', 'Post-care cooling & dressing'],
        },
      ],
    },
    {
      category: 'Acne',
      categoryName: 'Acne and Skin Solutions',
      items: [
        {
          name: 'Acne & Scar Reduction',
          icon: <TrendingUp className="w-5.5 h-5.5 text-primary" />,
          desc: 'Advanced Fractional CO2 Laser therapy to activate collagen and resurface deep acne and pimple pits.',
          benefits: ['Fades pitted pimple scars', 'Smoothes out skin texture', 'Visible results in 2-4 sessions'],
          steps: ['Numbing skin cream application', 'Fractional CO2 laser scan', 'Collagen healing serum apply'],
        },
        {
          name: 'Oxygeneo Super Facial',
          icon: <Sparkles className="w-5.5 h-5.5 text-primary" />,
          desc: 'Patented 3-in-1 facial system to exfoliate dead cells, infuse essential nutrients, and oxygenate skin.',
          benefits: ['Immediate skin glow & plump', 'Dermatologist proven technology', 'Deep cellular hydration'],
          steps: ['Gentle exfoliation session', 'Active ingredient infusion', 'CO2 bubble skin oxygenation'],
        },
        {
          name: 'Warts & Moles RF Removal',
          icon: <Bookmark className="w-5.5 h-5.5 text-primary" />,
          desc: 'Superior high-frequency radio frequency device to vaporize sunspots, warts, skin tags, and moles painless.',
          benefits: ['Completely painless RF sweep', 'No residual scarring or spots', 'Single session quick treatment'],
          steps: ['Local numbing block', 'Radio frequency cauterization', 'Antiseptic recovery cover'],
        },
      ],
    },
    {
      category: 'Pigmentation',
      categoryName: 'Pigmentation & Whitening',
      items: [
        {
          name: 'Clinical Skin Peels',
          icon: <Sparkles className="w-5.5 h-5.5 text-primary" />,
          desc: 'Customized Glycolic, Salicylic, and Yellow Peels to treat deep tanning, uneven tone, and open pores.',
          benefits: ['Lightens dark tan & patches', 'Gentle exfoliation & smooth', 'Engineered for Indian skin'],
          steps: ['Deep pore skin cleansing', 'Chemical peel overlay apply', 'Neutralization & SPF shield'],
        },
        {
          name: 'Melasma Laser Toning',
          icon: <Zap className="w-5.5 h-5.5 text-primary" />,
          desc: 'High-speed PTP Pulse Tri-Beam Laser to systematically clear hormonal melasma and uneven pigmentation.',
          benefits: ['Clears deep melasma patches', 'Lightens tanning & pigmentation', 'No skin irritation or down-time'],
          steps: ['Skin safety evaluation', 'Laser toning micro-sweeps', 'Cooling absolute hydration'],
        },
      ],
    },
    {
      category: 'Hair',
      categoryName: 'Hair Restoration & Transplant',
      items: [
        {
          name: 'Hair Fall Mesotherapy',
          icon: <TrendingUp className="w-5.5 h-5.5 text-primary" />,
          desc: 'Direct micro-injections of essential hair vitamins and growth peptides into the scalp to stop hair fall.',
          benefits: ['Controls active baldness', 'Nourishes dry hair roots', 'Increases follicle density'],
          steps: ['Scalp sterile disinfection', 'Active peptide micro-injections', 'LLLT (Low light laser therapy)'],
        },
        {
          name: 'PRP Hair Therapy',
          icon: <CheckCircle className="w-5.5 h-5.5 text-primary" />,
          desc: 'Platelet-Rich Plasma harvested from your own blood, rich in growth factors, injected for hair density.',
          benefits: ['Natural hair follicle regrowth', 'Stops genetic hair thinning', 'Highly safe & biocompatible'],
          steps: ['Blood harvest & centrifugation', 'Active plasma extraction', 'Precise scalp micro-injections'],
        },
      ],
    },
    {
      category: 'Anti-Aging',
      categoryName: 'Anti-Aging & Tightening',
      items: [
        {
          name: 'Exilis Non-Surgical Lift',
          icon: <Flame className="w-5.5 h-5.5 text-primary" />,
          desc: 'FDA-approved Exilis Ultra system delivering combined radio frequency (RF) to tighten skin and dissolve fat.',
          benefits: ['Immediate jawline skin tightening', 'Reduces unwanted facial fat', 'Completely non-invasive & safe'],
          steps: ['Skin surface gel apply', 'Controlled RF heating sweep', 'Post heating cooling care'],
        },
        {
          name: 'Botox & Fillers',
          icon: <User className="w-5.5 h-5.5 text-primary" />,
          desc: 'High-end cosmetic micro-injections to instantly smooth expression lines, crow feet, wrinkles and plump lips.',
          benefits: ['Erases deep face wrinkles', 'Restores youthful volume', 'Results last up to 6-9 months'],
          steps: ['Aesthetic mapping & marking', 'Precise localized injections', 'Post-procedure cooling block'],
        },
      ],
    },
  ];

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[12px] bg-primary/10 border border-primary/20 text-primary font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            All Treatments
          </span>
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-charcoal">
            Advanced Skin &amp; Laser Treatments
          </h1>
          <p className="text-body-gray text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
            Hygienic, comfortable environment utilizing state-of-the-art diagnostic technology custom-customized to Indian skin types.
          </p>

          {/* Filter Navigation Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-6">
            {categories.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4.5 py-2.5 rounded-full font-semibold text-[13px] tracking-wide border transition-all duration-300 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-20">
          {serviceData
            .filter((category) => activeTab === 'All' || activeTab === category.category)
            .map((category) => (
              <div key={category.category} className="space-y-8">
                {/* Category Header */}
                <div className="flex items-center space-x-3 border-l-4 border-primary pl-4">
                  <h2 className="font-sans font-bold text-2xl text-charcoal">
                    {category.categoryName}
                  </h2>
                </div>

                {/* 3 Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.name}
                      className="bg-white rounded-2xl p-7 flex flex-col border border-border-light shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                    >
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-5 flex-shrink-0">
                        {item.icon}
                      </div>

                      <h3 className="font-bold text-[18px] text-charcoal mb-2">{item.name}</h3>
                      <p className="text-body-gray text-[14px] leading-relaxed mb-5 flex-grow">
                        {item.desc}
                      </p>

                      {/* Benefits */}
                      <div className="mb-5">
                        <span className="text-[12px] text-charcoal font-bold block mb-2">Key Benefits:</span>
                        <ul className="space-y-1.5 text-[13px] text-body-gray font-medium">
                          {item.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="text-primary w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Steps */}
                      <div className="mb-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="text-[11px] text-charcoal font-bold uppercase tracking-wider block mb-2.5">
                          Treatment Steps:
                        </span>
                        <ol className="space-y-1.5 text-[12px] text-body-gray font-medium">
                          {item.steps.map((step, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* CTA */}
                      <Link
                        to="/contact"
                        className="bg-primary hover:bg-primary-hover text-white font-semibold text-[13px] text-center py-3 rounded-xl transition-all duration-200 cursor-pointer"
                      >
                        Book Consultation
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* SECTION 3: BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-primary/5 border border-primary/25 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="font-bold text-[20px] text-charcoal">
              Not sure which treatment is right for you?
            </h3>
            <p className="text-body-gray text-[14px] leading-relaxed">
              Book a detailed dermatosurgical and skin analysis consultation with our certified dermatologist.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl text-center text-[14px] transition-colors cursor-pointer"
            >
              Free Consultation
            </Link>
            <a
              href="tel:+919552000499"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2.5 px-6 rounded-xl text-center text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Phone size={16} />
              <span>Call Doctor</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
