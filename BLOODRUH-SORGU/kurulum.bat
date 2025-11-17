@echo off
chcp 65001 >nul
title BLOODRUH SORGU BOT - Kurulum
color 0C

echo.
echo ╔═══════════════════════════════════╗
echo ║  BLOODRUH SORGU BOT - KURULUM    ║
echo ╚═══════════════════════════════════╝
echo.

echo [1/3] Node.js kontrol ediliyor...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js bulunamadı!
    echo.
    echo Lütfen Node.js'i yükleyin: https://nodejs.org/
    pause
    exit
)
echo ✅ Node.js bulundu!
echo.

echo [2/3] Bağımlılıklar yükleniyor...
call npm install
if errorlevel 1 (
    echo ❌ Bağımlılıklar yüklenemedi!
    pause
    exit
)
echo ✅ Bağımlılıklar yüklendi!
echo.

echo [3/3] Yapılandırma kontrol ediliyor...
if not exist "config.json" (
    echo ⚠️ config.json bulunamadı!
    echo.
    echo config.example.json dosyasını config.json olarak kopyalayın
    echo ve bot token + client ID'yi girin.
    pause
    exit
)
echo ✅ Yapılandırma tamam!
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ KURULUM TAMAMLANDI!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Botu başlatmak için start.bat dosyasını çalıştırın.
echo.
echo 💀 MADE BY BLOODRUH 💀
echo.
pause
