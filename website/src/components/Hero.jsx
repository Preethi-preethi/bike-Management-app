import React from 'react';

export default function Hero({ onOpenBookingModal }) {
  return (
    <section className="relative min-h-[90vh] pt-[100px] pb-12">
      <div className="container mx-auto px-4 md:px-12 z-10 relative flex flex-col md:flex-row items-center gap-4 lg:gap-8 w-full">
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-space font-bold tracking-tighter mb-3 md:mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            The Future of <br className="hidden sm:block" />
            <span className="glow-text">Motorcycle Service.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mb-6 md:mb-6 animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
            Experience seamless telemetry, intelligent booking, and real-time repair tracking powered by the industry's most advanced platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-start w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={onOpenBookingModal} className="btn-premium px-6 py-3 text-base w-full sm:w-auto flex items-center justify-center gap-2">
              Book a Service
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
            </button>
            <a href="#features" className="px-6 py-3 rounded-xl font-medium border border-slate-400 hover:bg-slate-50 hover:border-slate-500 transition-all text-base w-full sm:w-auto text-center flex items-center justify-center">
              Explore Features
            </a>
          </div>
        </div>

        <div className="flex-1 relative animate-fade-in-up w-full flex items-center justify-center md:justify-end mt-10 md:mt-0" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-accent-neon/10 blur-3xl rounded-full scale-[0.8] z-0"></div>

          <div className="relative z-10 inline-block h-[250px] sm:h-[350px] md:h-[450px]">
            <img src="/assets/images/hero_final_transparent.png" alt="Motorcycle Service Professional" className="h-full w-auto object-contain -ml-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
