@echo off
chcp 65001 > nul
echo ========================================================
echo   Iniciando Portal da Rota Bioceanica (Rota 4 Mundos)
echo ========================================================
echo.

echo [1/2] Iniciando Servidor Backend (Porta 3333)...
start "RotaBio - Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Iniciando Servidor Frontend (Porta 5173)...
start "RotaBio - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo Servidores em execucao:
echo - Frontend:    http://localhost:5173
echo - Backend API: http://localhost:3333
echo - Healthcheck: http://localhost:3333/health
echo ========================================================
echo.
pause
