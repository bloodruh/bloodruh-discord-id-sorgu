# �  BLOODRUH SORGU BOT 💀

Discord ID sorgulama sistemi ile kullanıcı bilgilerini sorgulayın!

## � KÖZELLİKLER

- **ID Sorgulama**: Discord ID ile kullanıcı bilgilerini sorgula
- **Kredi Sistemi**: Hak bazlı sorgulama sistemi
- **Admin Paneli**: Kullanıcılara hak ekle/kaldır
- **Güvenli**: Sadece DM'de çalışır, gizlilik öncelikli
- **Profesyonel Görünüm**: Modern embed tasarımı
- **Otomatik Koruma**: Dosya bütünlüğü kontrolü ve otomatik onarım

## 📋 KURULUM

### 1. Gereksinimler
- Node.js v16 veya üzeri
- Discord Bot Token
- Discord Application ID

### 2. Kurulum Adımları

```bash
# Bağımlılıkları yükle
npm install

# Config dosyasını düzenle
# config.json içinde token, clientId ve adminIds ayarla
```

### 3. Yapılandırma

`config.json` dosyasını düzenleyin:

```json
{
  "token": "BOT_TOKEN_BURAYA",
  "clientId": "BOT_CLIENT_ID_BURAYA",
  "adminIds": ["ADMIN_DISCORD_ID"],
  "maxCredits": 100
}
```

### 4. Veri Dosyası

`bloodruh-data.json` dosyasına sorgulanacak verileri ekleyin:

```json
{
  "DISCORD_ID": {
    "id": "DISCORD_ID",
    "email": "BASE64_ENCODED_EMAIL",
    "ip": "IP_ADRESI",
    "verified": "1"
  }
}
```

### 5. Kurulum Scripti (Otomatik)

Windows için `install.bat` dosyasını çalıştırın:

```bash
install.bat
```

Bu script otomatik olarak:
- Node.js bağımlılıklarını yükler
- Gerekli dosyaları oluşturur
- Botu başlatır

### 6. Başlatma

```bash
# Windows için (Önerilen)
start.bat

# Manuel başlatma
node index.js
```

`start.bat` dosyası botu otomatik yeniden başlatma ile çalıştırır.

## 🎮 KOMUTLAR

### Kullanıcı Komutları

- `/idsorgu [id]` - Discord ID sorgula (Sadece DM)

### Admin Komutları

- `/hak-ekle [kullanıcı] [miktar]` - Kullanıcıya sorgu hakkı ekle
- `/hak-kaldir [kullanıcı] [miktar]` - Kullanıcıdan sorgu hakkı kaldır

## 🔒 GÜVENLİK

- Tüm sorgular DM üzerinden yapılır
- Hak sistemi ile sınırlı erişim
- Otomatik dosya koruma sistemi
- Yetkisiz değişikliklere karşı korumalı

## 📊 HAK SİSTEMİ

- Kullanıcılar sorgu yapmak için hak gerektirir
- Her sorgu 1 hak tüketir
- Hak yoksa sansürlü bilgi gösterilir
- Adminler sınırsız hak ekleyebilir

## 🛠️ DESTEK

Sorun yaşarsanız:
1. `database.json` dosyasının var olduğundan emin olun
2. Bot tokenının doğru olduğunu kontrol edin
3. Bot'un gerekli izinlere sahip olduğunu doğrulayın

## ⚠️ UYARI

- Bu bot sadece eğitim amaçlıdır
- Kişisel verilerin korunmasına dikkat edin
- Yasalara uygun kullanın

---

**💀 MADE BY BLOODRUH 💀**
