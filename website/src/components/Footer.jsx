import React from 'react';
import { PhoneCall, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white relative z-10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand & Copyright Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/images/Bajaj-logo-removebg-preview.png" alt="Bajaj Logo" className="h-8 object-contain" />
              <span className="text-xl font-space font-extrabold tracking-widest uppercase glow-text">VAIBAV BAJAJ</span>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed font-light">
              Experience seamless telemetry, intelligent booking, and real-time repair tracking powered by the industry's most advanced platform.
            </p>
            <div className="text-slate-400 text-xs font-medium">
              &copy; 2026 Vaibav Bajaj.<br />All rights reserved.
            </div>
          </div>

          {/* District Columns */}
          <div className="col-span-1">
            <h3 className="font-space font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-accent-neon" /> Karur District
            </h3>
            <p className="text-slate-500 text-sm mb-3">5/294, Kovai Main Road</p>
            <a href="tel:+919876543210" className="flex items-center gap-2 text-slate-600 text-sm hover:text-accent-neon transition-colors font-medium">
              <PhoneCall size={14} /> +91 98765 43210
            </a>
          </div>

          <div className="col-span-1">
            <h3 className="font-space font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-accent-neon" /> Salem District
            </h3>
            <p className="text-slate-500 text-sm mb-3">248/1, Meyyanoor Main Road</p>
            <a href="tel:+919876543211" className="flex items-center gap-2 text-slate-600 text-sm hover:text-accent-neon transition-colors font-medium">
              <PhoneCall size={14} /> +91 98765 43211
            </a>
          </div>

          <div className="col-span-1">
            <h3 className="font-space font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-accent-neon" /> Thanjavur District
            </h3>
            <p className="text-slate-500 text-sm mb-3">20/1, Natrajapuram South Colony</p>
            <a href="tel:+919876543212" className="flex items-center gap-2 text-slate-600 text-sm hover:text-accent-neon transition-colors font-medium">
              <PhoneCall size={14} /> +91 98765 43212
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
