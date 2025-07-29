@echo off
echo ========================================
echo    Virtuelna Tura kroz Nis - Setup
echo ========================================
echo.

echo 1. Instaliranje Node.js paketa...
call npm install
if errorlevel 1 (
    echo GRESKA: npm install neuspešan!
    pause
    exit /b 1
)

echo.
echo 2. Kreiranje .env fajla...
if not exist .env (
    echo DATABASE_URL="postgresql://username:password@localhost:5432/virtuelni_nis" > .env
    echo NODE_ENV=development >> .env
    echo .env fajl kreiran! Molimo uredite DATABASE_URL.
) else (
    echo .env fajl već postoji.
)

echo.
echo 3. Za pokretanje aplikacije koristite:
echo    - dev.bat (development)
echo    - ili npm run dev
echo.
echo Setup završen!
pause