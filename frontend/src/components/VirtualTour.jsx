import React, { useState, useRef } from 'react';
import { Compass, ExternalLink, Maximize, RotateCcw, Info, Eye, Loader2, Link2 } from 'lucide-react';

export default function VirtualTour({ tourUrl }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Kuula 360 virtual tur iframe va to'g'ridan-to'g'ri post havolasi
  const defaultIframeUrl = "https://kuula.co/share/collection/7dXdt?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1";
  const directKuulaPostUrl = "https://kuula.co/post/LCPZM";
  const activeUrl = tourUrl || defaultIframeUrl;

  // Brauzerning Fullscreen API-sini boshqarish
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`To'liq ekran xatosi: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Ekranni yopish xatosi: ${err.message}`);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <section id="virtual-tour" className="py-16 sm:py-20 relative overflow-hidden bg-slate-950/60">
      {/* Orqa fon nur effekti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-teal-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Sarlavha va Harakatlar Paneli (Header) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            {/* Nishonlar guruhi */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                <Compass className="w-4 h-4 animate-spin text-emerald-400" />
                <span>INTERAKTIV 360° PANORAMA</span>
              </div>

              {/* To'g'ridan-to'g'ri Kuula Post havolasi nishoni */}
              <a
                href={directKuulaPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="To'g'ridan-to'g'ri Kuula postiga o'tish"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-emerald-400 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition shadow-sm"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>kuula.co/post/LCPZM</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>

            {/* Asosiy sarlavha */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Kottej Bo‘ylab Virtual Sayohat
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
              Uydan chiqmasdan kottejning barcha xonalari, zallari, basseyni va hovlisini to‘liq 360 darajada ko‘zdan kechiring.
            </p>
          </div>

          {/* O'ng tomon: "Yangi oynada ochish" tugmasi */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={directKuulaPostUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Yangi oynada ochish</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-3 rounded-xl text-xs text-slate-400">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sichqoncha yoki sensor bilan burang</span>
            </div>
          </div>
        </div>

        {/* 2. Virtual Tur Konteyneri (360 Kuula Viewer Wrapper) */}
        <div 
          ref={containerRef}
          className="relative bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden group transition-all duration-300"
        >
          {/* Iframe ustidagi suzuvchi asboblar paneli */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none gap-2">
            
            {/* Jonli indikator */}
            <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 text-xs font-semibold text-slate-200 pointer-events-auto shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Jonli 360° Sayr</span>
            </div>

            {/* O'ng tomondagi boshqaruv tugmalari guruhi */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Oyna ustidagi "Yangi oynada ochish" tugmasi (kuula.co/post/LCPZM) */}
              <a
                href={directKuulaPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Alohida toza sahifada ochish: https://kuula.co/post/LCPZM"
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-emerald-500 hover:text-slate-950 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700/80 transition-all shadow-lg backdrop-blur-md active:scale-95"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Yangi oynada (LCPZM)</span>
              </a>

              {/* To'liq ekranga o'tish tugmasi */}
              <button
                type="button"
                onClick={toggleFullscreen}
                title="To'liq ekranga o'tkazish"
                className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700/80 transition-all shadow-lg backdrop-blur-md active:scale-95"
              >
                <Maximize className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">To'liq ekran</span>
              </button>
            </div>
          </div>

          {/* Yuklanish indikatori */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm gap-3">
              <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
              <p className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
                360° Panorama yuklanmoqda...
              </p>
            </div>
          )}

          {/* 100% Responsiv Kuula Iframe */}
          <div className="w-full h-[450px] sm:h-[550px] md:h-[640px] lg:h-[720px] relative bg-slate-950">
            <iframe
              title="Kottej 360 Virtual Tur"
              src={activeUrl}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 select-none"
              allow="accelerometer; gyroscope; xr-spatial-tracking; fullscreen"
              allowFullScreen={true}
              loading="lazy"
            />
          </div>

          {/* Pastki yordamchi qator (Status & To'g'ridan-to'g'ri link) */}
          <div className="bg-slate-900/95 border-t border-slate-800 px-5 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Eye className="w-4 h-4 text-emerald-400" />
                Ultra HD Sifat
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <a
                href={directKuulaPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition"
              >
                <span>Kuula Post havolasi: https://kuula.co/post/LCPZM</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">
                * Boshqa xonaga o‘tish uchun ekrandagi strelkalarni bosing
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
