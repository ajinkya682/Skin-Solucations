import React, { useState } from 'react';

const FloatingWhatsApp = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919552000499'; // Clinic WhatsApp number
  const message = encodeURIComponent('Hello, I would like to book a consultation.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div
      className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[9999] flex items-center select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div
        className={`absolute right-16 bg-charcoal text-white text-[12px] font-sans font-medium py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 transform ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us on WhatsApp
        <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-charcoal rotate-45" />
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pulse flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.488 2.01 14.032.989 11.41.989c-5.442 0-9.87 4.373-9.873 9.803-.001 1.77.476 3.498 1.381 5.03L1.96 21.547l5.811-1.517zM17.818 14.5c-.34-.17-2.01-.99-2.32-1.1-.31-.11-.53-.17-.75.17-.22.34-.85 1.1-1.04 1.3-.19.2-.39.22-.73.05-1.3-.65-2.27-1.14-3.15-2.65-.23-.4-.23-.82-.06-1.15.17-.33.34-.73.51-1.1.17-.37.23-.62.11-.85-.12-.23-.75-1.92-1.04-2.62-.28-.68-.57-.59-.75-.59-.19-.01-.4-.01-.62-.01-.22 0-.58.08-.88.4-.3.33-1.15 1.1-1.15 2.68s1.15 3.12 1.3 3.32c.16.2 2.26 3.4 5.48 4.79 2.58 1.12 3.11.9 4.23.8.34-.03 1.15-.47 1.32-.93.16-.47.16-.87.11-.96-.05-.08-.22-.13-.56-.3z" />
        </svg>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
