import React from 'react';
import { MapPin, DollarSign, CheckCircle2, Compass, PhoneCall, Maximize2, Bed, Bath, Trees } from 'lucide-react';

export default function Hero({ property }) {
  if (!property) return null;

  return (
    <section id="hero" className="relative pt-6 pb-16 lg:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-teal-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sotuvda mavjud
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            ★ Premial Hi-Tech Loyiha
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">
            Qurilgan yili: {property.yearBuilt || 2024}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {property.title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 leading-relaxed">
            {property.subtitle}
          </p>
        </div>

        {/* Hero Grid: Main Image & Price/Location Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Showcase (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="relative group overflow-hidden rounded-3xl border border-slate-800 shadow-2xl bg-slate-900 aspect-[16/10]">
              <img
                src={property.gallery?.[0] || "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Quick Badges on Image */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    {property.location}
                  </span>
                </div>

                <a
                  href="#virtual-tour"
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95"
                >
                  <Compass className="w-4 h-4" />
                  <span>360° sayohatni ko'rish</span>
                </a>
              </div>
            </div>

            {/* Thumbnail Gallery Preview */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {property.gallery?.slice(1, 4).map((img, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-800">
                  <img
                    src={img}
                    alt={`Galereya ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Price & Highlight Card (4/5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle accent border top */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
                  Kottej Narxi
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                    {property.priceFormatted || `$${property.price?.toLocaleString()}`}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">/ to'liq mulk</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  * Hujjatlar to'liq tayyor, to'g'ridan-to'g'ri mulkdordan
                </p>
              </div>

              {/* Location Detail */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Manzil
                    </span>
                    <p className="text-sm font-medium text-slate-200 mt-0.5">
                      {property.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
                  <Maximize2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Maydon</span>
                    <span className="text-sm font-bold text-white">{property.areaFormatted || `${property.area} m²`}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
                  <Trees className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Yer uchastkasi</span>
                    <span className="text-sm font-bold text-white">{property.landArea || "10 sotix"}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
                  <Bed className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Xonalar</span>
                    <span className="text-sm font-bold text-white">{property.rooms} ta xona</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
                  <Bath className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Sanuzel</span>
                    <span className="text-sm font-bold text-white">{property.bathrooms} ta vanna</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/25 active:scale-98"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Agent bilan bog'lanish</span>
                </a>

                <a
                  href="#virtual-tour"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-all border border-slate-700"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>360° Virtual Turga o'tish</span>
                </a>
              </div>

              {/* Fast trust bullet points */}
              <div className="mt-6 pt-5 border-t border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kredit va ipoteka variantlari ko'rib chiqiladi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Mulk egasi bilan to'g'ridan-to'g'ri shartnoma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
