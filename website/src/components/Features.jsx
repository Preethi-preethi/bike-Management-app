import React from 'react';

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 px-6 relative z-10 border-t border-slate-200 bg-brand-surface/30">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">Engineered for <span className="text-accent-neon">Excellence</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">We've rebuilt the motorcycle service experience from the ground up to save you time and provide ultimate transparency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative h-full glass-panel p-8 md:p-10 border border-slate-200 group-hover:border-cyan-400/50 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-100 rounded-full blur-3xl opacity-50 group-hover:bg-cyan-300 transition-colors duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-8 shadow-inner border border-white group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2.5"><path d="m12 14 9-5-9-5-9 5 9 5z"/><path d="m12 14 9-5-9-5-9 5 9 5z"/><path d="M12 21v-7"/><path d="m5 10 7 4 7-4"/></svg>
                </div>
                <h3 className="text-2xl font-space font-bold mb-3 text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">Digital Telemetry</h3>
                <p className="text-slate-500 leading-relaxed font-light">Instantly sync your bike's diagnostic data to our cloud. We know what's wrong before you even book the service.</p>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative h-full glass-panel p-8 md:p-10 border border-slate-200 group-hover:border-blue-400/50 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:bg-blue-300 transition-colors duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center mb-8 shadow-inner border border-white group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-2xl font-space font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Transparent Pricing</h3>
                <p className="text-slate-500 leading-relaxed font-light">No hidden fees. Review the AI-generated itemized breakdown of parts and labor before approving any work.</p>
              </div>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-fuchsia-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative h-full glass-panel p-8 md:p-10 border border-slate-200 group-hover:border-purple-400/50 rounded-3xl bg-white/80 backdrop-blur-xl shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 group-hover:bg-purple-300 transition-colors duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-fuchsia-50 flex items-center justify-center mb-8 shadow-inner border border-white group-hover:scale-110 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <h3 className="text-2xl font-space font-bold mb-3 text-slate-900 group-hover:text-purple-600 transition-colors duration-300">Genuine Bajaj Parts</h3>
                <p className="text-slate-500 leading-relaxed font-light">We use only 100% authentic Bajaj OEM parts for all repairs and replacements, ensuring your motorcycle performs at its absolute best with full warranty coverage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
