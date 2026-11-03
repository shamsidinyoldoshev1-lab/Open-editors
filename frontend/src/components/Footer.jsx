import React from 'react';
import { Home, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Home className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">PRESTIGE VILLAS</span>
              <span className="text-xs text-slate-300 block">Tog' kottejlari sotuvi</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <a href="#hero" className="hover:text-emerald-400 transition">Bosh sahifa</a>
            <a href="#features" className="hover:text-emerald-400 transition">Xususiyatlar</a>
            <a href="#virtual-tour" className="hover:text-emerald-400 transition">360° Virtual Tur</a>
            <a href="#contact" className="hover:text-emerald-400 transition">Bog'lanish</a>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Barcha mulk huquqlari himoyalangan</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Prestige Villas. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            Merosiy va zamonaviy arxitektura namunasi
          </p>
        </div>
      </div>
    </footer>
  );
}
