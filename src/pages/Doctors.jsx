import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Briefcase, Calendar, Check, GraduationCap, MapPin, Sparkles } from 'lucide-react';

const Doctors = () => {
  const certifications = [
    'Completed Dermatosurgery Observer ship at Nanavati Hospital, Mumbai under HOD Dr. Satish Sawant.',
    'Completed specialized Observer ship at St. John Hospital, Bangalore in Lasers, Dermatosurgery & Dermatopathology.',
    'Hands-on aesthetic lift training at Kasemrad Aesthetic Centre, Bangkok, Thailand under Dr. Niwat Polnikom.',
    'Awarded 2nd Prize in Award Paper Presentation at South Zone Dermatology Conference, Bangalore.',
    'Published clinical study on Childhood Behcet’s Disease in the International Journal of Dermatology.',
  ];

  return (
    <div className="pt-[70px] bg-light-bg overflow-hidden">
      {/* SECTION 1: HERO */}
      <section className="bg-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-[12px] bg-primary/10 border border-primary/20 text-primary font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Our Specialist Team
          </span>
          <h1 className="font-sans font-bold text-4xl sm:text-5xl text-charcoal">
            Meet Our Expert Dermatologists
          </h1>
          <p className="text-body-gray text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
            Led by nationally acclaimed specialists bringing advanced, result-oriented clinical and cosmetic skin solutions to Aurangabad.
          </p>
        </div>
      </section>

      {/* SECTION 2: DOCTOR CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Card 1: Dr. Ajeet Singh Sethi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[24px] border border-border-light shadow-md overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Doctor Left Photo */}
              <div className="w-full lg:w-[40%] bg-gray-50 flex items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-border-light flex-shrink-0">
                <div className="w-full max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-md border-4 border-white">
                  <img
                    src="/assets/images/hero_doctor.png"
                    alt="Dr. Ajeet Singh Sethi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Doctor Right Details */}
              <div className="w-full lg:w-[60%] p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3.5 mb-3">
                    <h2 className="font-bold text-[24px] sm:text-[28px] text-charcoal leading-none">
                      Dr. Ajeet Singh Sethi
                    </h2>
                    <span className="bg-primary/10 text-primary text-[11px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                      MBBS, MD (Dermatology)
                    </span>
                  </div>
                  <p className="text-primary font-semibold text-[14px] flex items-center gap-1.5 mb-4">
                    <GraduationCap size={18} />
                    <span>Rajeev Gandhi University Of Health Sciences, Bangalore, Karnataka</span>
                  </p>

                  {/* Specializations badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="bg-gray-100 text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      Clinical Dermatology
                    </span>
                    <span className="bg-gray-100 text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      Dermatosurgery
                    </span>
                    <span className="bg-gray-100 text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      Aesthetic Cosmetology
                    </span>
                    <span className="bg-gray-100 text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      Laser Hair Reduction
                    </span>
                    <span className="bg-gray-100 text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      Anti-Aging Peels
                    </span>
                  </div>

                  {/* Quick stats (Exp, Timing) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-body-gray font-medium mb-6">
                    <p className="flex items-center gap-2">
                      <Briefcase size={16} className="text-primary" />
                      <span>15+ Years Clinical Experience (Ex. Kaya Clinic Mumbai Specialist)</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>Monday to Saturday: 10:30 AM - 8:30 PM (Sunday Closed)</span>
                    </p>
                  </div>

                  <hr className="border-border-light my-5" />

                  {/* Certifications & Achievements */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-[14px] text-charcoal flex items-center gap-1.5">
                      <Award size={16} className="text-primary" />
                      <span>Key Qualifications &amp; Observer Ships:</span>
                    </h4>
                    <ul className="space-y-2 text-[12.5px] text-body-gray font-medium">
                      {certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="stroke-[3]" />
                          </span>
                          <span className="leading-relaxed">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border-light">
                  <Link
                    to="/book"
                    className="bg-primary hover:bg-primary-hover text-white text-center font-semibold text-[14px] py-3.5 px-6 rounded-xl flex-grow shadow-md transition-colors cursor-pointer"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href="https://wa.me/919552000499?text=Hello%2C%20I%20would%20like%20to%20book%20a%20consultation%20with%20Dr.%20Ajeet%20Singh%20Sethi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-center font-semibold text-[14px] py-3 px-6 rounded-xl transition-all cursor-pointer"
                  >
                    WhatsApp Consult
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Dedicated Tricologist & Surgeon Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[24px] border border-border-light shadow-md overflow-hidden p-8 flex flex-col space-y-6"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-border-light pb-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 bg-primary/10 text-primary font-semibold text-[11px] px-3 py-1 rounded-full w-max mx-auto lg:mx-0">
                  <Sparkles size={12} />
                  <span>Clinical Team Expansion</span>
                </div>
                <h3 className="font-bold text-[20px] text-charcoal">
                  Dedicated Tricologists &amp; Hair Transplant Surgeons
                </h3>
                <p className="text-body-gray text-[14px] max-w-2xl leading-relaxed">
                  In addition to aesthetic dermatology, our CIDCO N3 facility houses visiting Qualified Tricologists and FUE Hair Transplant Surgeons, providing safe, high-density hair restoration.
                </p>
              </div>
              <Link
                to="/contact"
                className="bg-primary hover:bg-primary-hover text-white text-[13px] font-semibold py-3 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Inquire For Hair transplant
              </Link>
            </div>

            {/* Quick specifications of surgical facility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <h4 className="font-bold text-[14px] text-charcoal">FUE Direct Method</h4>
                <p className="text-[12px] text-gray-500">Stitchless hair restoration</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <h4 className="font-bold text-[14px] text-charcoal">Mesoporation Scalp</h4>
                <p className="text-[12px] text-gray-500">Active peptide scalp infusion</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <h4 className="font-bold text-[14px] text-charcoal">Platelet Rich Plasma</h4>
                <p className="text-[12px] text-gray-500">Biocompatible growth factors</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
                <h4 className="font-bold text-[14px] text-charcoal">In-House Pharmacy</h4>
                <p className="text-[12px] text-gray-500">Immediate access to medications</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
