@echo off
echo Pokretanje production verzije...
if not exist .env (
    echo GRESKA: .env fajl ne postoji!
    echo Molimo kreirajte .env fajl sa DATABASE_URL.
    pause
    exit /b 1
)

echo Provera DATABASE_URL...
for /f "usebackq tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DATABASE_URL" (
        if "%%b"=="" (
            echo GRESKA: DATABASE_URL je prazan u .env fajlu!
            pause
            exit /b 1
        )
    )
)

set NODE_ENV=production
node dist/index.js