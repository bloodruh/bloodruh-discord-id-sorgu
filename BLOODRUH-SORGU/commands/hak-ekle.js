// MADE BY BLOODRUH
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hak-ekle')
    .setDescription('Kullanıcıya sorgu hakkı ekle (Admin only)')
    .addStringOption(option =>
      option.setName('userid')
        .setDescription('Hak eklenecek kullanıcının Discord ID\'si')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('miktar')
        .setDescription('Eklenecek hak miktarı')
        .setRequired(true)
        .setMinValue(1)
    ),

  async execute(interaction) {
    const config = require('../config.json');
    
    // Admin kontrolü
    if (!config.adminIds.includes(interaction.user.id)) {
      return interaction.reply({
        content: '❌ Bu komutu kullanma yetkiniz yok!',
        ephemeral: true
      });
    }

    const userId = interaction.options.getString('userid');
    const amount = interaction.options.getInteger('miktar');

    // ID formatı kontrolü
    if (!/^\d{17,19}$/.test(userId)) {
      return interaction.reply({
        content: '❌ Geçersiz Discord ID formatı!',
        ephemeral: true
      });
    }

    const dbPath = path.join(__dirname, '..', 'database.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Kullanıcı yoksa oluştur
    if (!db.users[userId]) {
      db.users[userId] = { credits: 0 };
    }

    db.users[userId].credits += amount;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('✅ HAK EKLENDİ ✅')
      .setDescription(
        `╔═══════════════════════════╗\n` +
        `║  BLOODRUH ADMİN PANELİ   ║\n` +
        `╚═══════════════════════════╝\n\n` +
        `🆔 **USER ID:** \`${userId}\`\n` +
        `➕ **EKLENEN:** ${amount} HAK\n` +
        `💰 **YENİ TOPLAM:** ${db.users[userId].credits} HAK\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`
      )
      .setFooter({ text: `⚡ MADE BY BLOODRUH | ADMİN: ${interaction.user.tag} ⚡` })
      .setTimestamp();

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
