import React from 'react';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">
            About <span className="glow-text uppercase tracking-widest">VAIBAV BAJAJ</span>
          </h2>
          <div className="h-1 w-20 bg-accent-neon mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-light">
            At Vaibav Bajaj, we believe your motorcycle deserves more than just a regular service—it deserves precision engineering and care. As an authorized premium service center, we combine state-of-the-art diagnostic technology with decades of hands-on mechanical expertise to ensure your ride is always at peak performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 glass-panel border border-slate-100 bg-slate-50/50 hover:bg-white">
              <h3 className="text-3xl font-bold mb-2 text-accent-neon">15+</h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Years Experience</p>
            </div>
            <div className="p-6 glass-panel border border-slate-100 bg-slate-50/50 hover:bg-white">
              <h3 className="text-3xl font-bold mb-2 text-accent-neon">50k+</h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Bikes Serviced</p>
            </div>
            <div className="p-6 glass-panel border border-slate-100 bg-slate-50/50 hover:bg-white">
              <h3 className="text-3xl font-bold mb-2 text-accent-neon">100%</h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">Genuine Parts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
