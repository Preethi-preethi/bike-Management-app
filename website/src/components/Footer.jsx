import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 px-6 relative z-10 bg-brand-surface/50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-neon flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m12 14 9-5-9-5-9 5 9 5z"/></svg>
          </div>
          <span className="text-xl font-space font-bold tracking-tight">MotoCare<span className="text-accent-neon">.</span></span>
        </div>
        <div className="text-slate-500 text-sm">
          &copy; 2026 MotoCare Technologies. All rights reserved.
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
