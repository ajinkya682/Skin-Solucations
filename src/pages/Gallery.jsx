import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Check, Cpu, Award } from 'lucide-react';

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const galleryImages = [
    {
      id: 1,
      title: 'Luxury Reception Lobby',
      desc: 'Hygienic and relaxed premium waiting area designed for comfort.',
      src: '/assets/images/clinic_interior.png',
      span: 'md:col-span-2 md:row-span-2',
    },
    {
      id: 2,
      title: 'Dermatologist Consulting Suite',
      desc: 'Private space for personalized dermatosurgical skin assessments.',
      src: '/assets/images/hero_doctor.png',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 3,
      title: 'US-FDA Laser Wing',
      desc: 'Housing high-end Nd-YAG and Fractional CO2 treatment systems.',
      src: '/assets/images/clinic_interior.png',
      span: 'md:col-span-1 md:row-span-2',
    },
    {
      id: 4,
      title: 'Trichology Therapy Room',
      desc: 'Sterile environment for PRP and hair mesotherapy procedures.',
      src: '/assets/images/hero_doctor.png',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      id: 5,
      title: 'Exilis Body Contouring Wing',
      desc: 'Dedicated suite for non-surgical face lifting and skin tightening.',
      src: '/assets/images/clinic_interior.png',
      span: 'md:col-span-2 md:row-span-1',
    },
  ];

  const technologies = [
    {
      name: 'Exilis Ultra 360',
      type: 'Skin Tightening & Body Contouring',
      fda: 'US-FDA Approved Class II System',
      desc: 'The first system to deliver simultaneous Radio Frequency (RF) and Ultrasound energy. Heats deeper skin layers to stimulate new collagen production, smoothing wrinkles and defining jawlines.',
      specs: ['Monopolar Radio Frequency', 'Therapeutic Ultrasound integration', 'Real-time impedance monitoring'],
    },
    {
      name: 'Cutera CoolGlide Nd-YAG',
      type: 'Laser Hair Reduction & Vein Therapy',
      fda: 'US-FDA Approved Nd-YAG System',
      desc: 'Acclaimed gold standard 1064nm laser optimized specifically for dark Indian skin tones. Possesses advanced contact copper cooling to clear active hair follicles with absolute safety.',
      specs: ['1064 nm Nd-YAG precision wavelength', 'Copper contact cooling handpiece', 'Adjustable pulse widths for fine hair'],
    },
    {
      name: 'Tri-Beam Q-Switched Nd-YAG',
      type: 'Laser Toning & Tattoo Removal',
      fda: 'US-FDA Approved Q-Switch Laser',
      desc: 'Generates ultra-fast microsecond pulse sweeps to cleanly break up deep dermal melasma, sunspots, and tattoo inks without damaging superficial tissue layers.',
      specs: ['Dual-Pulse high peak power output', 'Fractional collimated handpiece', 'Safe melasma toning protocols'],
    },
  ];

  const strips = [
    { title: '100% Sterile Clinic', desc: 'Strict surgical grade sanitization before every session.' },
    { title: 'Privacy Guaranteed', desc: 'Separate, private laser wings for absolute client comfort.' },
    { title: 'HEPA Air Purification', desc: 'Filtered continuous air flow preventing airborne contaminants.' },
    { title: 'Diagnostic Assessment', desc: 'Detailed computerized skin analytics prior to treatments.' },
    { title: 'Emergency Protocols', desc: 'Medical-grade safety equipments and trained hospital personnel.' },
  ];

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-gradient-to-r from-white to-[#F5F0E8] py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[12px] bg-primary/10 border border-primary/20 text-primary font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Step Inside Our Facility
          </span>
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-charcoal">
            Skin Solutions Clinic Tour
          </h1>
          <p className="text-body-gray text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
            Take a virtual tour of our premium CIDCO N3 facility, engineered for absolute sterile safety, client comfort and luxury care.
          </p>
        </div>
      </section>

      {/* SECTION 2: MASONRY TOUR GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              className={`relative rounded-3xl overflow-hidden shadow-md group cursor-pointer ${img.span}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-charcoal/80 flex flex-col justify-end p-6 transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-flex items-center gap-1 text-primary text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Clinic Facility</span>
                  </span>
                  <h3 className="text-white font-bold text-[18px] leading-tight">
                    {img.title}
                  </h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TECHNOLOGY SHOWCASE */}
      <section className="bg-beige py-20 border-y border-border-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-charcoal">
              Aesthetic Technology Showcase
            </h2>
            <p className="text-body-gray text-[15px]">
              We strictly utilize gold standard US-FDA approved laser and radio-frequency devices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="bg-white rounded-2xl p-7 border border-border-light shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="font-bold text-[18px] text-charcoal">{tech.name}</h3>
                      <span className="text-[12px] text-primary font-semibold">{tech.type}</span>
                    </div>
                    <Cpu size={24} className="text-primary flex-shrink-0" />
                  </div>
                  <span className="inline-block bg-primary/10 text-primary text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider">
                    {tech.fda}
                  </span>
                  <p className="text-body-gray text-[13.5px] leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                  <span className="text-[11px] text-charcoal font-bold uppercase tracking-wider block">
                    Technical Specifications:
                  </span>
                  <ul className="space-y-1.5 text-[12px] text-body-gray font-medium">
                    {tech.specs.map((spec, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check size={14} className="text-primary" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHITE FEATURES STRIP */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {strips.map((strip) => (
              <div
                key={strip.title}
                className="bg-white border border-border-light p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <Shield size={18} />
                </div>
                <h4 className="font-bold text-[14px] text-charcoal">{strip.title}</h4>
                <p className="text-[12px] text-body-gray leading-relaxed">{strip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
