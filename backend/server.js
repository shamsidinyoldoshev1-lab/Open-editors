import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { startTelegramBot } from './bot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// backend papkasidagi yoki rootdagi .env faylini yuklash
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot orqali xabar yuborish funksiyasi
async function sendTelegramMessage(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log("ℹ️ Telegram sozlamalari (.env) kiritilmagan. Xabar faqat konsolga chiqarildi.");
    return false;
  }

  const text = 
    `🏡 *YANGI MIJOZ ARIZASI (KOTTEJ SOTUVI)*\n\n` +
    `👤 *Mijoz:* ${lead.name}\n` +
    `📞 *Telefon:* [${lead.phone}](tel:${lead.phone.replace(/\\s+/g, '')})\n` +
    `💬 *Savol/Xabar:* ${lead.message}\n` +
    `⏰ *Vaqt:* ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (data.ok) {
      console.log("✅ Telegram botga ariza muvaffaqiyatli yetkazildi!");
      return true;
    } else {
      console.error("⚠️ Telegram API xatoligi:", data.description);
      return false;
    }
  } catch (error) {
    console.error("⚠️ Telegramga yuborishda tarmoq xatosi:", error.message);
    return false;
  }
}

// Ko'chmas mulk (Kottej) ma'lumotlari bazasi
const cottageData = {
  id: "cottage-01",
  title: "Prestige Bo'stonliq Luxury Villa",
  subtitle: "Tog' etagidagi zamonaviy Hi-Tech uslubidagi premial kottej",
  price: 285000,
  currency: "USD",
  priceFormatted: "$285,000",
  location: "Toshkent viloyati, Bo'stonliq tumani, Chimyon yo'nalishi",
  coordinates: { lat: 41.5421, lng: 70.0215 },
  rooms: 6,
  bedrooms: 4,
  bathrooms: 4,
  area: 420,
  areaFormatted: "420 m²",
  landArea: "10 sotix",
  floors: 2,
  yearBuilt: 2024,
  renovation: "Mualliflik Yevro-ta'miri (Design Luxury)",
  hasPool: true,
  poolType: "Isitiladigan panoramali basseyn (12x5 m)",
  parking: "3 ta avtomobil uchun yopiq garaj",
  description: "Toshkent shahridan atigi 45 daqiqalik yo'l masofasida joylashgan ushbu kottej sof tog' havosi va go'zal panoramik manzarasini taqdim etadi. 10 sotix yer maydonida 420 m² lik 2 qavatli shinam villa barpo etilgan. Loyiha 'Aqlli Uy' (Smart Home) tizimi, qishki va yozgi isitiladigan basseyn, fin saunasi, keng shiypon (barbekyu zonasi) hamda landshaft dizayniga ega bog' bilan to'liq ta'minlangan. Barcha xonalar Italiya va Germaniya materiallari bilan bezatilgan.",
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
  kuulaPostUrl: "https://kuula.co/post/LCPZM",
  agent: {
    name: "Yoldashev Shamsiddin",
    avatar: "/agent.png",
    role: "Premial ko'chmas mulk bo'yicha ekspert",
    phone: "+998 90 123 45 67",
    telegram: "@cottage_expert_uz",
    email: "info@luxcottage.uz"
  }
};

// Mijozlar xabarlarini saqlash ro'yxati
const contactLeads = [];

// 1. GET /api/properties - Kottej ma'lumotlarini qaytaruvchi endpoint
app.get('/api/properties', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: cottageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ma'lumotlarni yuklashda xatolik yuz berdi",
      error: error.message
    });
  }
});

// 2. POST /api/contact - Mijoz arizasini qabul qiluvchi endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Ism va telefon raqamini kiritish majburiy!"
      });
    }

    const newLead = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      message: message ? message.trim() : "Qo'shimcha izoh yo'q",
      createdAt: new Date().toISOString()
    };

    contactLeads.push(newLead);

    // Terminalda bildirishnoma chiqarish
    console.log("-----------------------------------------");
    console.log("🔔 YANGI MIJOZ MUROJAATI QABUL QILINDI:");
    console.log(`👤 Ismi: ${newLead.name}`);
    console.log(`📞 Telefoni: ${newLead.phone}`);
    console.log(`💬 Xabari: ${newLead.message}`);
    console.log(`⏰ Vaqti: ${newLead.createdAt}`);
    console.log("-----------------------------------------");

    // Telegram Botga yuborish (agar .env sozlangan bo'lsa)
    const telegramSent = await sendTelegramMessage(newLead);

    return res.status(201).json({
      success: true,
      message: telegramSent 
        ? "Murojaatingiz qabul qilindi va mutaxassis Telegramiga yetkazildi!"
        : "Murojaatingiz muvaffaqiyatli qabul qilindi! Mutaxassisimiz tez orada siz bilan bog'lanadi.",
      leadId: newLead.id,
      telegramSent: telegramSent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Arizani qabul qilishda xatolik yuz berdi.",
      error: error.message
    });
  }
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`🚀 Backend server muvaffaqiyatli ishga tushdi: http://localhost:${PORT}`);
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    console.log(`🤖 Telegram Bot integratsiyasi faol: Chat ID: ${process.env.TELEGRAM_CHAT_ID}`);
    startTelegramBot();
  } else {
    console.log(`ℹ️ Telegram Bot sozlanmagan. Sozlash uchun backend/.env faylini to'ldiring.`);
  }
  console.log(`📡 API endpointlar:`);
  console.log(`   - GET  http://localhost:${PORT}/api/properties`);
  console.log(`   - POST http://localhost:${PORT}/api/contact`);
});
