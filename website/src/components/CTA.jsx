import React from 'react';

export default function CTA({ onOpenBookingModal }) {
  return (
    <section className="py-32 px-6 relative z-10 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="glass-panel p-12 md:p-20 text-center relative overflow-hidden border-accent-hover/30">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-hover/10 to-accent-neon/10 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-space font-bold mb-8">Ready to upgrade your ride?</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">Join thousands of riders who have already switched to the most advanced motorcycle service platform.</p>
            <button onClick={onOpenBookingModal} className="btn-premium px-12 py-5 text-xl font-bold shadow-neon">Book a Service</button>
          </div>
        </div>
      </div>
    </section>
  );
}
