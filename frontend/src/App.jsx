import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VirtualTour from './components/VirtualTour';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Loader2, AlertCircle } from 'lucide-react';

// Standart (zaxira) ma'lumotlar - agar backend server hali ulanmagan bo'lsa sahifa buzilmasligi uchun
const fallbackCottage = {
  id: "cottage-01",
  title: "Prestige Bo'stonliq Luxury Villa",
  subtitle: "Tog' etagidagi zamonaviy Hi-Tech uslubidagi premial kottej",
  price: 285000,
  currency: "USD",
  priceFormatted: "$285,000",
  location: "Toshkent viloyati, Bo'stonliq tumani, Chimyon yo'nalishi",
  rooms: 6,
  bedrooms: 4,
  bathrooms: 4,
  area: 420,
  areaFormatted: "420 m²",
  landArea: "10 sotix",
  yearBuilt: 2024,
  renovation: "Mualliflik Yevro-ta'miri (Design Luxury)",
  description: "Toshkent shahridan atigi 45 daqiqalik yo'l masofasida joylashgan ushbu kottej sof tog' havosi va go'zal panoramik manzarasini taqdim etadi. 10 sotix yer maydonida 420 m² lik 2 qavatli shinam villa barpo etilgan. Loyiha 'Aqlli Uy' tizimi, qishki va yozgi isitiladigan basseyn, fin saunasi, keng shiypon (barbekyu zonasi) hamda landshaft dizayniga ega bog' bilan to'liq ta'minlangan.",
  features: [
    { id: 1, title: "Umumiy maydon", value: "420 m²", icon: "Square" },
    { id: 2, title: "Xonalar soni", value: "6 xona (4 yotoqxona)", icon: "BedDouble" },
    { id: 3, title: "Sanuzellar", value: "4 ta alohida vanna", icon: "Bath" },
    { id: 4, title: "Yer maydoni", value: "10 sotix", icon: "Maximize" },
    { id: 5, title: "Basseyn", value: "Isitiladigan (yozgi + qishki)", icon: "Waves" },
    { id: 6, title: "Ta'mir holati", value: "Premial Yevro-ta'mir", icon: "Sparkles" },
    { id: 7, title: "Aqlli Uy tizimi", value: "Avtomatlashtirilgan", icon: "Cpu" },
    { id: 8, title: "Xavfsizlik", value: "24/7 video kuzatuv va qo'riqlash", icon: "ShieldCheck" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
  ],
  kuulaTourUrl: "https://kuula.co/share/collection/7dXdt?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
  agent: {
    name: "Yoldashev Shamsiddin",
    avatar: "/agent.png",
    role: "Premial ko'chmas mulk bo'yicha ekspert",
    phone: "+998 90 123 45 67",
    telegram: "@cottage_expert_uz",
    email: "info@luxcottage.uz"
  }
};

export default function App() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/properties`);
        if (!response.ok) {
          throw new Error(`Server status: ${response.status}`);
        }
        const json = await response.json();
        if (json.success && json.data) {
          setProperty(json.data);
          setBackendOnline(true);
        } else {
          setProperty(fallbackCottage);
        }
      } catch (err) {
        console.warn("Backend serverga ulanish imkoni bo'lmadi, zaxira ma'lumotlar ishlatilmoqda:", err.message);
        setProperty(fallbackCottage);
        setBackendOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 gap-4">
        <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
        <p className="text-sm font-medium text-slate-400 tracking-wider">
          Kottej ma'lumotlari yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Backend aloqa bildirishnomasi (agar backend hali yoqilmagan bo'lsa foydalanuvchiga eslatma beradi) */}
      {!backendOnline && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs py-2 px-4 text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            <strong>Eslatma:</strong> Node.js backend serveri (<code>localhost:5000</code>) hozircha o'chiq. Zaxira ma'lumotlar ko'rsatilmoqda. Formani yuborish uchun <code>backend</code> papkasida serverni yoqing.
          </span>
        </div>
      )}

      {/* 1. Navbar */}
      <Navbar agentPhone={property?.agent?.phone} />

      {/* 2. Hero Section (Narx va Manzil kartochkasi bilan) */}
      <Hero property={property} />

      {/* 3. Features Section (Maydon, xonalar, basseyn, ta'mir) */}
      <Features property={property} />

      {/* 4. Kuula 360 Virtual Tour (Responsive Iframe) */}
      <VirtualTour tourUrl={property?.kuulaTourUrl} />

      {/* 5. Contact Form (Agent bilan bog'lanish & POST so'rov) */}
      <ContactForm agent={property?.agent} />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
