@echo off
echo Pokretanje Virtuelne Ture kroz Nis...
echo Provera .env fajla...
if not exist .env (
    echo GRESKA: .env fajl ne postoji!
    echo Molimo kreirajte .env fajl sa DATABASE_URL.
    echo.
    echo Primer .env fajla:
    echo DATABASE_URL="postgresql://username:password@localhost:5432/virtuelni_nis"
    echo NODE_ENV=development
    pause
    exit /b 1
)

set NODE_ENV=development
npx tsx server/index.ts