import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const BeforeAfter = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    { key: 'All', name: 'All' },
    { key: 'Laser Toning', name: 'Laser Toning' },
    { key: 'Acne', name: 'Acne Scars' },
    { key: 'Pigmentation', name: 'Pigmentation' },
    { key: 'Hair', name: 'Hair Care' },
    { key: 'Tattoo', name: 'Tattoo Removal' },
  ];

  const galleryItems = [
    {
      id: 1,
      filter: 'Laser Toning',
      treatmentName: 'Carbon Laser Peel & Toning',
      desc: 'Clearing deep-seated melasma pigments and restoring uniform skin tone.',
      duration: '4 Sessions',
      before: '/assets/images/before_after_laser.png',
      after: '/assets/images/before_after_laser.png',
    },
    {
      id: 2,
      filter: 'Acne',
      treatmentName: 'CO2 Fractional Laser Resurfacing',
      desc: 'Significant reduction in deep pitted icepick acne scars and porous craters.',
      duration: '3 Sessions',
      before: '/assets/images/before_after_laser.png',
      after: '/assets/images/before_after_laser.png',
    },
    {
      id: 3,
      filter: 'Pigmentation',
      treatmentName: 'Yellow Peel Skin Whitening',
      desc: 'Removing deep sun tan patches and uneven dark spots on cheeks.',
      duration: '2 Sessions',
      before: '/assets/images/before_after_laser.png',
      after: '/assets/images/before_after_laser.png',
    },
    {
      id: 4,
      filter: 'Hair',
      treatmentName: 'PRP Scalp Follicle Re-Growth',
      desc: 'Natural revitalization of dormant scalp roots increasing active density.',
      duration: '6 Sessions',
      before: '/assets/images/before_after_laser.png',
      after: '/assets/images/before_after_laser.png',
    },
    {
      id: 5,
      filter: 'Tattoo',
      treatmentName: 'Tri-Beam Q-Switched Tattoo Fade',
      desc: 'Complete breakup and removal of dark carbon tattoo pigments safely.',
      duration: '5 Sessions',
      before: '/assets/images/before_after_laser.png',
      after: '/assets/images/before_after_laser.png',
    },
    {
      id: 6,
      filter: 'Laser Toning',
      treatmentName: 'Under Eye Laser Toning',
      desc: 'Fading dark circular shadows and fine lines around orbital sockets.',
      duration: '3 Sessions',
      before: '/assets/images/before_after_laser.png',
      after: '/assets/images/before_after_laser.png',
    },
  ];

  const filteredItems =
    selectedFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.filter === selectedFilter);

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[12px] bg-primary/10 border border-primary/20 text-primary font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Clinical Case Results
          </span>
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-charcoal">
            Real Patient Transformations
          </h1>
          <p className="text-body-gray text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
            Witness the clinical accuracy and result-oriented outcomes achieved by our certified dermatologists.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-6">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4.5 py-2.5 rounded-full font-semibold text-[13px] tracking-wide border transition-all duration-300 cursor-pointer ${
                  selectedFilter === filter.key
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FILTER AND GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
              >
                <BeforeAfterSlider
                  beforeImage={item.before}
                  afterImage={item.after}
                  treatmentName={item.treatmentName}
                  category={item.filter}
                  duration={item.duration}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 3: TRUST NOTE */}
      <section className="bg-white py-12 border-t border-border-light text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Shield size={22} className="stroke-[2.5]" />
          </div>
          <h4 className="font-bold text-[15px] text-charcoal">Hygienic &amp; Ethical Clinical Standards</h4>
          <p className="text-[12.5px] text-body-gray leading-relaxed max-w-lg">
            All photography displayed on this website showcases actual clinical patients of Skin Solutions. Informed written consent has been obtained from each individual. Results may vary based on skin type and physiological traits.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BeforeAfter;
