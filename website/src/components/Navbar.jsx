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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand/80 backdrop-blur-md border-b border-slate-200 py-4' : 'py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-neon to-accent-hover flex items-center justify-center shadow-neon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 9-5-9-5-9 5 9 5z"/><path d="m12 14 9-5-9-5-9 5 9 5z"/><path d="M12 21v-7"/><path d="m5 10 7 4 7-4"/></svg>
          </div>
          <span className="text-2xl font-space font-bold tracking-tight">MotoCare<span className="text-accent-neon">.</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-500">
          <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
        </div>
        <div className="flex gap-4">
          <button onClick={onOpenBookingModal} className="btn-premium rounded-full text-sm px-6 py-2.5">Book a Service</button>
        </div>
      </div>
    </nav>
  );
}
