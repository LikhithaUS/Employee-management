@echo off

title Employee Management System

echo ==========================================
echo       EMPLOYEE MANAGEMENT SYSTEM
echo ==========================================
echo.

cd /d "%~dp0"

echo Installing Backend dependencies...
cd backend
call npm install

echo.
echo Installing Frontend dependencies...
cd ..\frontend
call npm install

echo.
echo Starting application...
cd ..

start "" cmd /k "npm run dev"

timeout /t 5 /nobreak > nul

start http://localhost:5173

echo.
echo ==========================================
echo EMS Started Successfully
echo ==========================================
echo.
echo Frontend: http://localhost:5173
echo Backend : http://localhost:5000
echo.
pause