import React from 'react';

export default function Hero({ onOpenBookingModal }) {
  return (
    <section className="relative pt-16 pb-20 md:pt-20 md:pb-24 px-6 flex items-center min-h-[90vh]">
      <div className="container mx-auto z-10 relative flex flex-col md:flex-row items-center gap-4 lg:gap-8">
        <div className="flex-1 text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-bold tracking-tighter mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            The Future of <br/>
            <span className="glow-text">Motorcycle Service.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-8 md:mb-10 animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
            Experience seamless telemetry, intelligent booking, and real-time repair tracking powered by the industry's most advanced platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={onOpenBookingModal} className="btn-premium px-6 py-3 text-base w-full sm:w-auto flex items-center justify-center gap-2">
              Book a Service
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            </button>
            <button className="px-6 py-3 rounded-xl font-medium border border-slate-400 hover:bg-slate-50 hover:border-white/40 transition-all text-base w-full sm:w-auto">
              Explore Features
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative animate-fade-in-up w-full flex items-center md:justify-end justify-center" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-accent-neon/10 blur-3xl rounded-full scale-[0.8] z-0"></div>
          
          <div className="relative z-10 inline-block h-[350px] md:h-[550px]">
            <img src="/assets/images/hero_final_transparent.png" alt="Motorcycle Service Professional" className="h-full w-auto object-contain -ml-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
