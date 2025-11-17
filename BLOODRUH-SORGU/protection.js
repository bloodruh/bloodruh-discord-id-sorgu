// BLOODRUH PROTECTION SYSTEM
// Bu dosyayı silme veya değiştirme!

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Korumalı değerler
const PROTECTED = {
  signature: 'MADE BY BLOODRUH',
  image: 'https://media.discordapp.net/attachments/1437513951322833087/1439371247954952372/standard.gif?ex=691a466f&is=6918f4ef&hm=89a37f34d363e7a4a9877d9ccc6c053d506cf94aeadf0f6c9148932bf7aa0bf3&=',
  author: 'BLOODRUH'
};

// Dosya hash'lerini kontrol et
function checkIntegrity() {
  const files = [
    'commands/idsorgu.js',
    'commands/hak-ekle.js',
    'commands/hak-kaldir.js',
    'lib/helpers.js',
    'lib/storage.js',
    'lib/formatter.js',
    'lib/parser.js',
    'lib/loader.js',
    'lib/api.js'
  ];

  // Encrypted files - these are allowed to not have visible signature
  const encryptedFiles = [
    'lib/api.js',
    'lib/storage.js',
    'lib/formatter.js',
    'lib/parser.js',
    'lib/loader.js'
  ];

  for (const file of files) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      console.error(`\n❌ HATA: ${file} dosyası bulunamadı!`);
      console.error('❌ Bot başlatılamıyor!\n');
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Skip signature check for encrypted files
    if (encryptedFiles.includes(file)) {
      // Just check if file has some content
      if (content.length < 100) {
        console.error(`\n❌ HATA: ${file} dosyası çok kısa veya boş!`);
        console.error('❌ Bot başlatılamıyor!\n');
        process.exit(1);
      }
      continue;
    }

    // MADE BY BLOODRUH kontrolü (only for non-encrypted files)
    if (!content.includes(PROTECTED.signature)) {
      console.error(`\n❌ HATA: ${file} dosyası değiştirilmiş!`);
      console.error('❌ "MADE BY BLOODRUH" imzası bulunamadı!');
      console.error('❌ Bot başlatılamıyor!\n');
      process.exit(1);
    }

    // Image link kontrolü (sadece idsorgu.js için)
    if (file === 'commands/idsorgu.js' && !content.includes(PROTECTED.image)) {
      console.error(`\n❌ HATA: ${file} dosyasındaki header image değiştirilmiş!`);
      console.error('❌ Bot başlatılamıyor!\n');
      process.exit(1);
    }
  }

  return true;
}

// Otomatik onarım (opsiyonel)
function autoRepair() {
  console.log('🔧 Dosyalar kontrol ediliyor...');
  
  try {
    checkIntegrity();
    console.log('✅ Tüm dosyalar doğrulandı!');
    return true;
  } catch (err) {
    console.error('❌ Doğrulama başarısız!');
    return false;
  }
}

// Başlangıç kontrolü
function init() {
  console.log('\n╔═══════════════════════════════════╗');
  console.log('║  BLOODRUH SORGU BOT - PROTECTION  ║');
  console.log('╚═══════════════════════════════════╝\n');
  
  console.log('🔒 Güvenlik kontrolü başlatılıyor...\n');
  
  if (!checkIntegrity()) {
    console.error('❌ Güvenlik kontrolü başarısız!');
    console.error('❌ Bot kapatılıyor...\n');
    process.exit(1);
  }
  
  console.log('✅ Güvenlik kontrolü başarılı!');
  console.log('✅ Bot başlatılıyor...\n');
}

module.exports = {
  init,
  checkIntegrity,
  PROTECTED
};
