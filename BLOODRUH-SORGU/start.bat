@echo off
chcp 65001 >nul
title BLOODRUH SORGU BOT
color 0A

:start
cls
echo.
echo ╔═══════════════════════════════════╗
echo ║    BLOODRUH SORGU BOT BAŞLIYOR   ║
echo ╚═══════════════════════════════════╝
echo.
echo 💀 MADE BY BLOODRUH 💀
echo.

node index.js

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ⚠️ Bot kapandı!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🔄 Otomatik yeniden başlatılıyor...
timeout /t 3 /nobreak >nul
goto start
