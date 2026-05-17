import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import BeforeAfter from './pages/BeforeAfter';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Book from './pages/Book';

// Scroll to top on page navigation helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-light-bg text-charcoal antialiased">
        {/* Helper to ensure navigation always lands at the top of the new page */}
        <ScrollToTop />

        {/* Global Navigation Header */}
        <Navbar />

        {/* Core Main content body */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/before-after" element={<BeforeAfter />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
            {/* Fallback route back to home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Floating Pulsing WhatsApp Widget */}
        <FloatingWhatsApp />

        {/* Global Footer Area */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
