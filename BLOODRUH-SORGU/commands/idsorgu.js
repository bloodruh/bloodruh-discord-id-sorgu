// MADE BY BLOODRUH
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// BLOODRUH HEADER IMAGE (Değiştirme!)
const HEADER_IMAGE = 'https://media.discordapp.net/attachments/1437513951322833087/1439371247954952372/standard.gif?ex=691a466f&is=6918f4ef&hm=89a37f34d363e7a4a9877d9ccc6c053d506cf94aeadf0f6c9148932bf7aa0bf3&=';

// Base64 decode fonksiyonu
function tryDecodeBase64(str) {
  if (!str) return str;
  const regex = /^[A-Za-z0-9+/=]+$/;
  if (!regex.test(str) || str.length < 8) return str;
  try {
    const decoded = Buffer.from(str, 'base64').toString('utf8');
    if (decoded.includes('@')) return decoded;
    return str;
  } catch {
    return str;
  }
}

// Email provider tespit
function detectProviderFromEmail(email) {
  if (!email) return 'Bilinmiyor';
  const domain = email.split('@')[1] || '';
  if (domain.includes('gmail')) return 'Google / Gmail';
  if (domain.includes('hotmail') || domain.includes('outlook') || domain.includes('live')) return 'Microsoft / Outlook';
  if (domain.includes('proton')) return 'ProtonMail';
  if (domain.includes('yahoo')) return 'Yahoo';
  if (domain.includes('yandex')) return 'Yandex';
  return 'Diğer';
}

// Snowflake'den tarih
function snowflakeToDate(id) {
  const timestamp = BigInt(id) >> 22n;
  return new Date(Number(timestamp) + 1420070400000);
}

// Yaş hesapla
function ageFromDate(date) {
  if (!date) return { human: 'Bilinmiyor' };
  const now = Date.now();
  const diff = now - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  
  if (years > 0) return { human: `${years} yıl ${months} ay` };
  if (months > 0) return { human: `${months} ay` };
  return { human: `${days} gün` };
}

// Hak kontrolü
function hasCredit(userId) {
  const dbPath = path.join(__dirname, '..', 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return db.users[userId] && db.users[userId].credits > 0;
}

// Hak düş
function decreaseCredit(userId) {
  const dbPath = path.join(__dirname, '..', 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  if (db.users[userId]) {
    db.users[userId].credits--;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  }
}

// Kalan hak
function getCredits(userId) {
  const dbPath = path.join(__dirname, '..', 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return db.users[userId]?.credits || 0;
}

// Progress bar
function progressBar(current, max) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  const filled = Math.round(percentage / 10);
  const empty = 10 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `${bar} ${current}/${max} (${Math.round(percentage)}%)`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('idsorgu')
    .setDescription('Discord ID sorgula (DM only)')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('Sorgulanacak Discord ID')
        .setRequired(true)
    ),

  async execute(interaction) {
    // DM kontrolü
    if (interaction.guild) {
      return interaction.reply({
        content: '❌ Bu komut sadece DM\'de kullanılabilir!',
        ephemeral: true
      });
    }

    await interaction.deferReply({ ephemeral: true });

    const queryId = interaction.options.getString('id').trim();
    const userId = interaction.user.id;

    // Veriyi yükle
    const dataPath = path.join(__dirname, '..', 'bloodruh-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const user = data[queryId];

    if (!user) {
      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('❌ BULUNAMADI ❌')
        .setDescription(
          `╔═══════════════════════════╗\n` +
          `║   BLOODRUH SORGU SİSTEMİ   ║\n` +
          `╚═══════════════════════════╝\n\n` +
          `🆔 **ARANAN ID:** \`${queryId}\`\n\n` +
          `⚠️ **HATA:** VERİTABANINDA KAYIT YOK!\n\n` +
          `**OLASI SEBEPLER:**\n` +
          `❌ Kullanıcı kayıtlı değil\n` +
          `❌ ID yanlış girilmiş\n` +
          `❌ Kayıt silinmiş\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━`
        )
        .setFooter({ text: '⚠️ MADE BY BLOODRUH | ID KONTROL ET ⚠️' })
        .setTimestamp()
        .setImage(HEADER_IMAGE);

      return interaction.editReply({ embeds: [embed] });
    }

    // Email ve IP decode
    const email = tryDecodeBase64(user.email || '');
    const ip = user.ip || '—';
    const provider = detectProviderFromEmail(email);
    const created = snowflakeToDate(user.id);
    const age = ageFromDate(created);

    const config = require('../config.json');
    const hasHak = hasCredit(userId);
    const maxCredits = config.maxCredits || 100;

    const embed = new EmbedBuilder()
      .setTimestamp()
      .setImage(HEADER_IMAGE);

    // HAK VARSA FULL VIEW
    if (hasHak) {
      decreaseCredit(userId);
      const remaining = getCredits(userId);

      embed
        .setColor('#ff0000')
        .setTitle('💀 SORGU SONUCU 💀')
        .setDescription(
          `╔═══════════════════════════╗\n` +
          `║   BLOODRUH SORGU SİSTEMİ   ║\n` +
          `╚═══════════════════════════╝\n\n` +
          `🆔 **ID:** \`${user.id}\`\n` +
          `📧 **EMAIL:** ${email || 'YOK'}\n` +
          `🌐 **IP:** ${ip}\n` +
          `📬 **PROVIDER:** ${provider}\n` +
          `📅 **OLUŞTURMA:** ${created ? created.toISOString().split('T')[0] : 'BİLİNMİYOR'} (${age.human})\n` +
          `✅ **DOĞRULANDI:** ${user.verified === '1' ? 'EVET' : 'HAYIR'}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `🔋 **KALAN HAK:** ${progressBar(remaining, maxCredits)}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━`
        )
        .setFooter({ text: `⚡ MADE BY BLOODRUH | KALAN: ${remaining} ⚡` });

    } else {
      // HAK YOKSA SANSÜRLÜ VIEW
      const maskedEmail = email ? (email.split('@')[0].slice(0, 2) + '***@***') : '—';
      const maskedIP = ip !== '—' ? (ip.split('.').slice(0, 2).join('.') + '.***.***') : '—';
      const currentCredits = getCredits(userId);

      embed
        .setColor('#000000')
        .setTitle('🔒 SANSÜRLÜ SORGU 🔒')
        .setDescription(
          `╔═══════════════════════════╗\n` +
          `║   BLOODRUH SORGU SİSTEMİ   ║\n` +
          `╚═══════════════════════════╝\n\n` +
          `🆔 **ID:** \`${user.id}\`\n` +
          `📧 **EMAIL:** ${maskedEmail}\n` +
          `🌐 **IP:** ${maskedIP}\n` +
          `📬 **PROVIDER:** ${provider}\n` +
          `📅 **OLUŞTURMA:** ${created ? created.toISOString().split('T')[0] : 'BİLİNMİYOR'} (${age.human})\n` +
          `✅ **DOĞRULANDI:** ${user.verified === '1' ? 'EVET' : 'HAYIR'}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `⚠️ **UYARI:** HAK YETERSİZ!\n` +
          `🔋 **KALAN HAK:** ${progressBar(currentCredits, maxCredits)}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `💰 **TAM GÖRÜNÜM İÇİN HAK SATIN AL!**`
        )
        .setFooter({ text: '⛔ MADE BY BLOODRUH | HAK YETERSİZ ⛔' });
    }

    return interaction.editReply({ embeds: [embed] });
  }
};
