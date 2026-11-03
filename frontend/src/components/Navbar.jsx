import React, { useState } from 'react';
import { Home, Phone, Menu, X, Compass } from 'lucide-react';

export default function Navbar({ agentPhone }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Home className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                PRESTIGE <span className="text-emerald-400">VILLAS</span>
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
                Tog' Kottejlari
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-emerald-400 transition-colors">Bosh sahifa</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Xususiyatlar</a>
            <a href="#virtual-tour" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>360° Virtual Tur</span>
            </a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Bog'lanish</a>
          </nav>

          {/* Call to action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${agentPhone || '+998901234567'}`}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Qo'ng'iroq qilish</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Menyu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 bg-slate-950/95 space-y-3 px-2">
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              Bosh sahifa
            </a>
            <a
              href="#features"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              Xususiyatlar
            </a>
            <a
              href="#virtual-tour"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-emerald-400 hover:bg-slate-800"
            >
              360° Virtual Tur
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              Bog'lanish
            </a>
            <a
              href={`tel:${agentPhone || '+998901234567'}`}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Qo'ng'iroq qilish</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
