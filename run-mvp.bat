@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo === آموزش آزاد امیرکبیر — اجرای MVP ===
echo.

if not exist "node_modules\" (
  echo نصب وابستگی‌ها...
  call npm install
  if errorlevel 1 (
    echo نصب ناموفق بود.
    pause
    exit /b 1
  )
)

echo در حال اجرای سرور توسعه...
echo آدرس‌ها:
echo   هوم:          http://localhost:3000
echo   حرفه‌ای:      http://localhost:3000/professional
echo.
echo برای توقف: Ctrl+C
echo.

call npm run dev

pause
