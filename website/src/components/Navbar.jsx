import React, { useEffect, useState } from 'react';

export default function Navbar({ onOpenBookingModal }) {
  const [scrolled, setScrolled] = useState(false);

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
          <span className="text-xl md:text-2xl font-space font-bold tracking-tight">Vaibav Bajaj</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-500">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
        </div>
        <div className="flex gap-4">
          <button onClick={onOpenBookingModal} className="btn-premium rounded-full text-xs px-4 py-2 md:text-sm md:px-6 md:py-2.5 whitespace-nowrap">Book a Service</button>
        </div>
      </div>
    </nav>
  );
}
