import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 px-6 relative z-10 bg-brand-surface/50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img src="/assets/images/Bajaj-logo-removebg-preview.png" alt="Bajaj Logo" className="h-8 object-contain" />
          <span className="text-xl font-space font-bold tracking-tight">Vaibav Bajaj</span>
        </div>
        <div className="text-slate-500 text-sm">
          &copy; 2026 Vaibav Bajaj. All rights reserved.
        </div>
        <div className="flex gap-6 text-slate-500">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">System Status</a>
        </div>
      </div>
    </footer>
  );
}
