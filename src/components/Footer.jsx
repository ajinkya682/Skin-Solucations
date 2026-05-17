import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Clinic', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Meet Doctors', path: '/doctors' },
    { name: 'Transformations', path: '/before-after' },
    { name: 'Clinic Gallery', path: '/gallery' },
    { name: 'Patient Reviews', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const treatments = [
    'Laser Hair Reduction',
    'Oxygeneo Super Facial',
    'Acne & Scar Reduction',
    'Non-Surgical Face Lift',
    'Anti-Aging Yellow Peel',
    'Hair Fall Mesotherapy',
  ];

  return (
    <footer className="bg-footer-dark text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[60px] pb-[30px]">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex flex-col">
              <span className="font-bold text-[22px] leading-tight text-white">
                Skin Solutions
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                Skin, Cosmetology and Laser Clinic
              </span>
            </Link>
            <p className="text-[14px] leading-relaxed text-gray-400">
              Discover the most advanced and innovative skin care, in an environment which is hygienic, relaxed, refreshing and customized to Indian skin.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 text-gray-400"
                aria-label="Facebook"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 text-gray-400"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px] stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 text-gray-400"
                aria-label="YouTube"
              >
                <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-[16px] tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 text-[14px]">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-primary hover:pl-1 transition-all duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-[16px] tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Our Treatments
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              {treatments.map((treatment) => (
                <li key={treatment}>
                  <Link
                    to="/services"
                    className="hover:text-primary hover:pl-1 transition-all duration-200 block"
                  >
                    {treatment}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-[16px] tracking-wide relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-[14px]">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Opp Rama International, CIDCO N3, Aurangabad 431003, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span>+91-9552000499</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a href="mailto:reception@skinsolutions.in" className="hover:text-primary transition-colors">
                  reception@skinsolutions.in
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-300">Mon - Sat: 10:30 AM - 8:30 PM</p>
                  <p className="text-[12px] text-gray-500">Sunday Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-[50px] pt-[25px] text-center">
          <p className="text-[12px] text-gray-500">
            Copyright &copy; {new Date().getFullYear()} Skin Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
