import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">Service Protocol <span className="text-accent-neon">Activation</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">A streamlined three-step process to get your vehicle back to optimal performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 z-0"></div>

          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-3xl glass-panel border border-slate-300 flex items-center justify-center mb-8 shadow-sm group-hover:-translate-y-2 group-hover:border-accent-neon/50 transition-all duration-300">
              <span className="text-3xl font-space font-bold text-accent-neon">01</span>
            </div>
            <h3 className="text-2xl font-space font-bold mb-4">Initialize Request</h3>
            <p className="text-slate-500">Select your vehicle, choose a service center, and pick a convenient time slot via our unified portal.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-3xl glass-panel border border-slate-300 flex items-center justify-center mb-8 shadow-sm group-hover:-translate-y-2 group-hover:border-blue-500/50 transition-all duration-300">
              <span className="text-3xl font-space font-bold text-blue-500">02</span>
            </div>
            <h3 className="text-2xl font-space font-bold mb-4">Diagnostic Uplink</h3>
            <p className="text-slate-500">Our technicians receive your request and prepare for your arrival with pre-analyzed telemetry data.</p>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-3xl glass-panel border border-slate-300 flex items-center justify-center mb-8 shadow-sm group-hover:-translate-y-2 group-hover:border-purple-500/50 transition-all duration-300">
              <span className="text-3xl font-space font-bold text-purple-500">03</span>
            </div>
            <h3 className="text-2xl font-space font-bold mb-4">Track & Complete</h3>
            <p className="text-slate-500">Monitor progress in real-time, approve additional parts if needed, and receive your optimized machine.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
