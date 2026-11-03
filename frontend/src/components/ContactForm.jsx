import React, { useState } from 'react';
import { Send, Phone, User, MessageSquare, CheckCircle, AlertCircle, Loader2, Sparkles, Shield } from 'lucide-react';

export default function ContactForm({ agent }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Iltimos, ismingiz va telefon raqamingizni kiriting!'
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null, message: '' });

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: result.message || "Murojaatingiz qabul qilindi! Tez orada bog'lanamiz."
        });
        // Formani tozalash
        setFormData({ name: '', phone: '', message: '' });
      } else {
        throw new Error(result.message || 'Xatolik yuz berdi');
      }
    } catch (err) {
      console.error('So\'rov yuborishda xatolik:', err);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: err.message || "Server bilan aloqa o'rnatib bo'lmadi. Backend server yoqilganligiga ishonch hosil qiling."
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            Aloqa & Buyurtma
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Kottejni Ko'rish Uchun Ro'yxatdan O'ting
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            O'zingizga qulay vaqtni tanlang. Kottej bo'yicha shaxsiy taqdimot va ekskursiya tashkil etamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ariza Qoldiring
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Ma'lumotlaringizni qoldiring, mutaxassisimiz 15 daqiqa ichida siz bilan bog'lanadi.
            </p>

            {/* Success notification */}
            {status.success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold block">Rahmat!</span>
                  {status.message}
                </div>
              </div>
            )}

            {/* Error notification */}
            {status.error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold block">Xatolik:</span>
                  {status.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Ismingiz <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masalan: Sardor Rahimov"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Telefon Raqamingiz <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+998 90 123 45 67"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Xabar yoki Savolingiz (Ixtiyoriy)
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-4 pointer-events-none text-slate-500">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Kottejni qachon borib ko'rish mumkin? Ipoteka shartlari qanday?"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/25 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Arizani yuborish</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sizning ma'lumotlaringiz maxfiyligi to'liq kafolatlanadi.</span>
              </div>
            </form>
          </div>

          {/* Agent Card Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={agent?.avatar || "/agent.png"}
                    alt={agent?.name || "Yoldashev Shamsiddin"}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500/40 bg-slate-900"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {agent?.name || "Yoldashev Shamsiddin"}
                  </h4>
                  <p className="text-xs text-emerald-400 font-medium">
                    {agent?.role || "Premial ko'chmas mulk bo'yicha ekspert"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tajriba: 8+ yil hashamatli kottejlar savdosi
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400 block">To'g'ridan-to'g'ri telefon:</span>
                  <a
                    href={`tel:${agent?.phone || '+998901234567'}`}
                    className="text-lg font-bold text-white hover:text-emerald-400 transition"
                  >
                    {agent?.phone || "+998 90 123 45 67"}
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Telegram orqali savol:</span>
                  <a
                    href={`https://t.me/${agent?.telegram?.replace('@', '') || 'cottage_expert_uz'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold text-emerald-400 hover:underline"
                  >
                    {agent?.telegram || "@cottage_expert_uz"}
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Elektron pochta:</span>
                  <a
                    href={`mailto:${agent?.email || 'info@luxcottage.uz'}`}
                    className="text-sm font-medium text-slate-300 hover:text-emerald-400"
                  >
                    {agent?.email || "info@luxcottage.uz"}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300">
              <span className="text-emerald-400 font-semibold block mb-1">
                ⭐ Eksklyuziv Xizmat
              </span>
              Biz sizga Toshkent shahridan kottejgacha qulay transfer hamda joyida kofe-breyk bilan to'liq taqdimot tashkil qilib beramiz.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
