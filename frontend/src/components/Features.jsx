import React from 'react';
import { 
  Square, 
  BedDouble, 
  Bath, 
  Maximize, 
  Waves, 
  Sparkles, 
  Cpu, 
  ShieldCheck,
  CheckCircle,
  Flame,
  Car,
  Trees
} from 'lucide-react';

export default function Features({ property }) {
  if (!property) return null;

  // Icon mapping helper
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Square': return <Square className="w-6 h-6 text-emerald-400" />;
      case 'BedDouble': return <BedDouble className="w-6 h-6 text-emerald-400" />;
      case 'Bath': return <Bath className="w-6 h-6 text-emerald-400" />;
      case 'Maximize': return <Maximize className="w-6 h-6 text-emerald-400" />;
      case 'Waves': return <Waves className="w-6 h-6 text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-400" />;
    }
  };

  const extraHighlights = [
    { title: "Isitiladigan Panoramali Basseyn", desc: "Qishki va yozgi rejimda ishlovchi, suv filtrlash tizimiga ega shinam basseyn (12x5 m)." },
    { title: "Aqlli Uy (Smart Home)", desc: "Yoritish, xona harorati, xavfsizlik va sug'orish tizimi to'liq smartfon orqali boshqariladi." },
    { title: "Premial Yevro-ta'mir", desc: "Mualliflik dizayni bo'yicha Italiya marmari, eman parketi va premium santexnika jihozlari." },
    { title: "Mustaqil Ta'minot", desc: "Artezian toza tog' suvi qudug'i, kuchli zaxira generatori va gaz ta'minoti mavjud." }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900/40 border-y border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            Asosiy Xususiyatlar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Kottej Qulayliklari va Parametrlari
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Har bir detal sizning tinch, qulay va hashamatli hayotingiz uchun maxsus o'ylangan.
          </p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {property.features?.map((feature) => (
            <div 
              key={feature.id}
              className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-transform">
                {getIcon(feature.icon)}
              </div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {feature.title}
              </span>
              <p className="text-xl font-bold text-white mt-1">
                {feature.value}
              </p>
            </div>
          ))}
        </div>

        {/* In-depth Details & Description Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Description text */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Tabiat va Zamonaviylikning Mukammal Uyg'unligi
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              {property.description}
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 text-sm">
                  <strong>Yer maydoni:</strong> 10 sotix toza tog' tabiati bag'rida, mevali va manzarali daraxtlar.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 text-sm">
                  <strong>Avtoturargoh:</strong> 3 ta avtomobil uchun avtomatik darvozali yopiq garaj.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-200 text-sm">
                  <strong>Dam olish zonasi:</strong> Barbekyu pechi, qishki kamin va shinam ochiq ayvon.
                </span>
              </div>
            </div>
          </div>

          {/* Right: Feature Highlights Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {extraHighlights.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800/90 relative overflow-hidden"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 mb-3" />
                <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
