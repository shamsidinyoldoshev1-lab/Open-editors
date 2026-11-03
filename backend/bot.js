import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TOKEN) {
  console.error("❌ Xatolik: TELEGRAM_BOT_TOKEN topilmadi!");
  process.exit(1);
}

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

// Kottej ma'lumotlari
const cottageInfo = 
`🏡 *PRESTIGE BO'STONLIQ LUXURY VILLA*

💰 *Narxi:* $285,000
📍 *Manzil:* Toshkent viloyati, Bo'stonliq tumani, Chimyon yo'nalishi
📐 *Umumiy maydon:* 420 m²
🌳 *Yer uchastkasi:* 10 sotix
🛏 *Xonalar soni:* 6 ta xona (4 ta keng yotoqxona)
🚿 *Sanuzellar:* 4 ta alohida vanna
🏊‍♂️ *Basseyn:* Isitiladigan panoramali basseyn (12x5 m)
✨ *Ta'mir holati:* Mualliflik Yevro-ta'miri (Design Luxury)
🚗 *Avtoturargoh:* 3 ta avtomobil uchun yopiq garaj

*Qo'shimcha qulayliklar:*
• Aqlli Uy (Smart Home) to'liq avtomatizatsiyasi
• Fin saunasi va barbekyu zonasi
• Artezian qudug'i va mustaqil elektr generatori
• 24/7 video kuzatuv va qo'riqlash tizimi`;

const expertInfo = 
`👤 *MAS'UL EKSPERT:*

*Ismi:* Yoldashev Shamsiddin
*Lavozimi:* Premial ko'chmas mulk bo'yicha ekspert
*Tajriba:* 8+ yil hashamatli kottejlar savdosi
📞 *Telefon:* +998 90 123 45 67
💬 *Telegram:* @cottage_expert_uz
✉️ *Email:* info@luxcottage.uz

Sizga kottej bo'yicha shaxsiy taqdimot, joyiga borib ko'rish uchun bepul transfer va qulay shartnomalarni taqdim etamiz.`;

// Asosiy menyu klaviaturasi
const mainMenuKeyboard = {
  keyboard: [
    [{ text: "🏡 Kottej haqida" }, { text: "🌐 360° Virtual Tur" }],
    [{ text: "👤 Mas'ul Ekspert" }, { text: "✍️ Ariza qoldirish" }]
  ],
  resize_keyboard: true,
  persistent: true
};

// Telegramga xabar yuborish
async function sendMsg(chatId, text, extra = {}) {
  try {
    const body = {
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown',
      ...extra
    };

    const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch (err) {
    console.error(`Xabar yuborishda xatolik (chatId: ${chatId}):`, err.message);
  }
}

// Xabarlarni qayta ishlash
async function handleUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const text = msg.text ? msg.text.trim() : '';
  const senderName = [msg.from.first_name, msg.from.last_name].filter(Boolean).join(' ');
  const username = msg.from.username ? `@${msg.from.username}` : 'Mavjud emas';

  console.log(`📩 Xabar keldi [${senderName} | ID: ${chatId}]: "${text}"`);

  // 1. /start yoki /help buyrug'i
  if (text === '/start' || text === '/help') {
    const welcomeText = 
`Assalomu alaykum, *${senderName || 'Hurmatli mijoz'}*! 👋

*Prestige Bo'stonliq Luxury Villa* kottejining rasmiy botiga xush kelibsiz!

Bu yerda siz:
• Kottejning barcha parametr va qulayliklarini bilib olishingiz;
• 360° interaktiv virtual sayohat qilishingiz;
• Mas'ul ekspert *Yoldashev Shamsiddin* bilan to'g'ridan-to'g'ri bog'lanishingiz mumkin.

Quyidagi menyu tugmalaridan birini tanlang: 👇`;

    await sendMsg(chatId, welcomeText, { reply_markup: mainMenuKeyboard });
    return;
  }

  // 2. Kottej haqida ma'lumot
  if (text === '🏡 Kottej haqida') {
    await sendMsg(chatId, cottageInfo, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐 360° Virtual Turni Ko'rish", url: "https://kuula.co/post/LCPZM" }],
          [{ text: "📞 Ekspertga qo'ng'iroq", url: "https://t.me/cottage_expert_uz" }]
        ]
      }
    });
    return;
  }

  // 3. 360° Virtual Tur
  if (text === '🌐 360° Virtual Tur') {
    const tourText = 
`🌐 *360° INTERAKTIV VIRTUAL SAYOHAT*

Uydan chiqmasdan kottejning barcha xonalari, zallari, basseyni va hovlisini to'liq 360 darajada ko'zdan kechiring!

Quyidagi tugmani bosing va virtual sayohatni boshlang: 👇`;

    await sendMsg(chatId, tourText, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🚀 360° Panoramani ochish (Kuula)", url: "https://kuula.co/post/LCPZM" }]
        ]
      }
    });
    return;
  }

  // 4. Mas'ul Ekspert
  if (text === "👤 Mas'ul Ekspert") {
    await sendMsg(chatId, expertInfo, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "💬 Telegram orqali yozish", url: "https://t.me/cottage_expert_uz" }]
        ]
      }
    });
    return;
  }

  // 5. Ariza qoldirish
  if (text === '✍️ Ariza qoldirish') {
    const askText = 
`✍️ *ARIZA QOLDIRISH*

Iltimos, telefon raqamingiz va savolingizni shu yerga yozib yuboring (Masalan: *+998 90 123 45 67 Kottejni qachon ko'rsak bo'ladi?*).

Ekspertimiz *Yoldashev Shamsiddin* tez orada siz bilan bog'lanadi!`;

    await sendMsg(chatId, askText, { reply_markup: mainMenuKeyboard });
    return;
  }

  // 6. Foydalanuvchi oddiy xabar yoki telefon raqami yozsa
  // Mijozga tasdiq xabari:
  const thankYouText = 
`✅ *Rahmat, ${senderName}!*

Sizning xabaringiz qabul qilindi va ekspertimiz *Yoldashev Shamsiddin*ga yetkazildi. Tez orada siz bilan bog'lanamiz! 🤝`;

  await sendMsg(chatId, thankYouText, { reply_markup: mainMenuKeyboard });

  // Adminga (TELEGRAM_CHAT_ID) xabar yetkazish:
  if (ADMIN_CHAT_ID && String(ADMIN_CHAT_ID) !== String(chatId)) {
    const adminNotification = 
`🔔 *BOTDAN YANGI MUROJAAT!*

👤 *Kimdan:* ${senderName}
📱 *Username:* ${username}
🆔 *Chat ID:* \`${chatId}\`
💬 *Xabar:* ${text}
⏰ *Vaqt:* ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;

    await sendMsg(ADMIN_CHAT_ID, adminNotification);
  }
}

// Long-polling tsikli
export async function startTelegramBot() {
  console.log("🤖 Telegram Bot Polling xizmati ishga tushmoqda...");
  
  // Bot ma'lumotlarini tekshirish
  try {
    const meRes = await fetch(`${TELEGRAM_API}/getMe`);
    const me = await meRes.json();
    if (me.ok) {
      console.log(`✅ Telegram Bot ulandi: @${me.result.username} (${me.result.first_name})`);
    } else {
      console.error("❌ Telegram getMe xatosi:", me.description);
      return;
    }
  } catch (err) {
    console.error("❌ Telegram ulanish xatosi:", err.message);
  }

  let offset = 0;
  let isRunning = true;

  while (isRunning) {
    try {
      const res = await fetch(`${TELEGRAM_API}/getUpdates?offset=${offset}&timeout=20`, {
        signal: AbortSignal.timeout(30000)
      });
      const data = await res.json();

      if (data.ok && Array.isArray(data.result)) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          await handleUpdate(update);
        }
      } else if (!data.ok) {
        console.warn("⚠️ getUpdates ogohlantirish:", data.description);
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (err) {
      // Tarmoq uzilishi bo'lsa 3 soniya kutib qayta ulanadi
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

// Agar to'g'ridan-to'g'ri `node bot.js` deb chaqirilsa
if (process.argv[1] && process.argv[1].endsWith('bot.js')) {
  startTelegramBot();
}
