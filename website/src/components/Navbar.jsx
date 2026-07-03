import React, { useEffect, useState } from 'react';

export default function Navbar({ onOpenBookingModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 md:py-4 shadow-sm' : 'py-4 md:py-6'}`}>
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-8 md:h-10 flex items-center justify-center">
            <img src="/assets/images/Bajaj-logo-removebg-preview.png" alt="Bajaj Logo" className="h-full object-contain" />
          </div>
          <span className="text-xl md:text-2xl font-space font-extrabold tracking-widest uppercase glow-text">VAIBAV BAJAJ</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-500">
          <a href="#about" className="hover:text-slate-900 transition-colors">About Us</a>
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={onOpenBookingModal} className="btn-premium rounded-full text-xs px-4 py-2 md:text-sm md:px-6 md:py-2.5 whitespace-nowrap">Book a Service</button>
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-800 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-4 px-6 flex flex-col gap-4 animate-fade-in-up">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-600 hover:text-brand-primary">About Us</a>
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-600 hover:text-brand-primary">Features</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-600 hover:text-brand-primary">How it Works</a>
          <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-600 hover:text-brand-primary">Testimonials</a>
        </div>
      )}
    </nav>
  );
}
