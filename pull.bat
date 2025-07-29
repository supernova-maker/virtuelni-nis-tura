@echo off
echo ========================================
echo   Preuzimanje najnovijih izmena
echo ========================================
echo.

echo Preuzima izmene sa GitHub-a...
git pull origin main

echo.
if errorlevel 1 (
    echo GRESKA: Problem sa preuzimanjem izmena!
    echo Proverite internet konekciju ili Git konfiguraciju.
) else (
    echo Uspesno preuzete najnovije izmene!
)

echo.
pause