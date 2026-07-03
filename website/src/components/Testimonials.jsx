import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const hardcodedTestimonials = [
  {
    quote: "The real-time telemetry tracking is phenomenal. I knew exactly when my Ducati was being worked on and when it was ready. Highly recommended.",
    initials: "AK",
    name: "Arjun K.",
    bike: "Vaibav Bajaj Customer",
    rating: 5,
    color: "from-blue-500 to-purple-500"
  },
  {
    quote: "No hidden costs. The AI-generated invoice was exactly what I paid. The glassmorphic UI is just a bonus to a perfectly engineered backend.",
    initials: "RS",
    name: "Rahul S.",
    bike: "Vaibav Bajaj Customer",
    rating: 5,
    color: "from-green-400 to-emerald-600"
  }
];

const colors = [
  "from-blue-500 to-purple-500",
  "from-green-400 to-emerald-600",
  "from-orange-400 to-red-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-cyan-500"
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(hardcodedTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id', { ascending: false })
        .limit(10);

      if (data && data.length > 0) {
        const formatted = data.map((t, index) => {
          const initials = t.customer_name ? t.customer_name.substring(0, 2).toUpperCase() : "VB";
          return {
            quote: t.comment || "Great service!",
            initials: initials,
            name: t.customer_name || "Customer",
            bike: "Vaibav Bajaj Customer",
            rating: t.rating || 5,
            color: colors[index % colors.length]
          };
        });
        
        // Merge fetched with hardcoded to always have content
        setTestimonials([...formatted, ...hardcodedTestimonials]);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const getSlideClasses = (index) => {
    const num = testimonials.length;
    if (index === activeIndex) return 'opacity-100 scale-100 z-30 translate-x-0';
    if (index === (activeIndex + 1) % num) return 'opacity-40 scale-90 z-20 -translate-x-[20%] blur-[2px]';
    if (index === (activeIndex - 1 + num) % num) return 'opacity-40 scale-90 z-20 translate-x-[20%] blur-[2px]';
    return 'opacity-0 scale-75 z-10 translate-x-[40%] blur-[4px]';
  };

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="scroll-mt-24 py-24 px-6 relative z-10 border-t border-slate-200 bg-brand-surface/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-space font-bold mb-6">User <span className="text-accent-neon">Feedback</span></h2>
            <p className="text-xl text-slate-500">Don't just take our word for it. Read the reviews from riders who have experienced the Vaibav Bajaj difference.</p>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto h-[420px] sm:h-[380px] md:h-[350px] overflow-hidden flex items-center justify-center">
          {testimonials.map((t, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`absolute w-full max-w-2xl transition-all duration-700 ease-in-out cursor-pointer ${getSlideClasses(index)}`}
            >
              <div className="glass-panel p-6 sm:p-8 md:p-10 border border-slate-200/80 hover:border-accent-neon/50 shadow-2xl transition-colors bg-white/80 rounded-3xl">
                <div className="flex gap-1 mb-6 text-accent-neon">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={i < t.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={i < t.rating ? "0" : "2"}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="text-lg md:text-xl text-slate-900 mb-6 italic font-light leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-white shadow-lg ${t.color}`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{t.name}</h4>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mt-1">{t.bike}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-12 flex-wrap max-w-lg mx-auto">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-10 bg-accent-neon' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
