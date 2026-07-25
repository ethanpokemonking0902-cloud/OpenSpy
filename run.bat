@echo off
REM OpenSpy Development Server Launcher
REM Run this batch file to start the Next.js dev server

cd /d "%~dp0"

echo.
echo ===================================
echo  OpenSpy Development Server
echo ===================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Start dev server
echo Starting Next.js dev server...
echo Press Ctrl+C to stop
echo.
call npm run dev

pause
