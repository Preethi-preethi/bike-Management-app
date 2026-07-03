import React from 'react';

const models = [
  { name: 'Dominar 400', type: 'Sports Tourer', img: 'sport_bike.png' },
  { name: 'Dominar 250', type: 'Sports Tourer', img: 'sport_bike.png' },
  { name: 'Pulsar NS400Z', type: 'Street Fighter', img: 'sport_bike.png' },
  { name: 'Pulsar N250', type: 'Street Fighter', img: 'sport_bike.png' },
  { name: 'Pulsar RS200', type: 'Race Sport', img: 'sport_bike.png' },
  { name: 'Pulsar NS200', type: 'Street Fighter', img: 'sport_bike.png' },
  { name: 'Pulsar N160', type: 'Street Fighter', img: 'sport_bike.png' },
  { name: 'Pulsar 150', type: 'Commuter', img: 'sport_bike.png' },
  { name: 'Avenger Cruise 220', type: 'Cruiser', img: 'cruiser_bike.png' },
  { name: 'Avenger Street 160', type: 'Cruiser', img: 'cruiser_bike.png' },
  { name: 'Freedom 125 CNG', type: 'Commuter', img: 'sport_bike.png' },
  { name: 'Platina 110', type: 'Commuter', img: 'sport_bike.png' },
  { name: 'CT 110X', type: 'Commuter', img: 'sport_bike.png' },
  { name: 'Chetak Premium 2024', type: 'Electric Scooter', img: 'chetak_logo.png' }
];

export default function SupportedModels() {
  return (
    <section className="py-24 px-6 relative z-10 border-t border-slate-200 bg-brand-surface/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">Supported <span className="text-accent-neon">Machines</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">Our telemetry systems and mechanics are fully optimized for the complete Bajaj lineup.</p>
        </div>

        <div className="relative overflow-hidden w-full max-w-full group mt-8 py-4">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-surface/20 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-surface/20 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            <div className="flex gap-6 px-3 shrink-0">
              {models.map((m, i) => (
                <div key={i} className="w-[300px] glass-panel p-4 border-accent-neon/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-accent-neon hover:shadow-neon transition-all duration-300 flex items-center gap-4 cursor-pointer rounded-2xl group overflow-hidden">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-inner relative transition-transform duration-500 group-hover:scale-105">
                    <img src={`/assets/images/bikes/${m.img}`} alt={m.name} className="w-full h-full object-cover transition-all duration-500" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-space font-bold text-accent-neon drop-shadow-sm group-hover:text-slate-900 transition-colors">{m.name}</h3>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">{m.type}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-6 px-3 shrink-0" aria-hidden="true">
              {models.map((m, i) => (
                <div key={i} className="w-[300px] glass-panel p-4 border-accent-neon/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-accent-neon hover:shadow-neon transition-all duration-300 flex items-center gap-4 cursor-pointer rounded-2xl group overflow-hidden">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-inner relative transition-transform duration-500 group-hover:scale-105">
                    <img src={`/assets/images/bikes/${m.img}`} alt={m.name} className="w-full h-full object-cover transition-all duration-500" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-space font-bold text-accent-neon drop-shadow-sm group-hover:text-slate-900 transition-colors">{m.name}</h3>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">{m.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
