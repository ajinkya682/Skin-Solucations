import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Before and After', path: '/before-after' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[70px] z-[999] transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-card-white shadow-md'
          : 'bg-card-white/95 backdrop-blur-sm shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo and Tagline */}
        <Link to="/" className="flex flex-col justify-center select-none group">
          <span className="font-sans font-bold text-[22px] leading-tight text-primary transition-colors group-hover:text-primary-hover">
            Skin Solutions
          </span>
          <span className="font-sans text-[10px] text-body-gray font-medium tracking-wide">
            Skin, Cosmetology and Laser Clinic
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative font-sans font-semibold text-[14px] transition-all duration-200 hover:text-primary ${
                  isActive ? 'text-primary font-bold' : 'text-charcoal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden xl:block">
          <Link
            to="/book"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-semibold text-[14px] px-5 py-2.5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-charcoal hover:text-primary transition-colors focus:outline-none p-1.5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="xl:hidden absolute top-[70px] left-0 right-0 bg-card-white border-t border-border-light shadow-lg flex flex-col py-4 px-6 gap-4 animate-slideDown overflow-y-auto max-h-[calc(100vh-70px)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-sans font-semibold text-[15px] py-2.5 border-b border-gray-50 flex items-center justify-between ${
                  isActive ? 'text-primary font-bold border-l-4 border-l-primary pl-3' : 'text-charcoal pl-1'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold text-center text-[15px] py-3 rounded-lg mt-3 transition-all duration-300 cursor-pointer"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
