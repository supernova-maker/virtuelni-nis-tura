@echo off
echo ========================================
echo    Git Sync - Virtuelna Tura kroz Nis
echo ========================================
echo.

echo Proverava Git status...
git status

echo.
echo Dodaje sve izmene...
git add .

echo.
set /p commit_msg="Unesite poruku o izmenama: "
if "%commit_msg%"=="" set commit_msg="Automatske izmene"

echo Pravi commit...
git commit -m "%commit_msg%"

echo.
echo Salje izmene na GitHub...
git push origin main

echo.
echo Sync zavrsen!
pause