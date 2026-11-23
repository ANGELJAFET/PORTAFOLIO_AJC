@echo off
title Portafolio Angel - servidor (puerto 3007)
cd /d "%~dp0"

echo Deteniendo cualquier servidor anterior del portafolio...
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"name='node.exe'\" | Where-Object { $_.CommandLine -match 'portafolio-angel' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }"

if not exist node_modules (
  echo Instalando dependencias por primera vez, espera un momento...
  call npm install
)

echo Abriendo http://localhost:3007 en el navegador en unos segundos...
start "" cmd /c "timeout /t 15 >nul & start http://localhost:3007"

echo.
echo Servidor del portafolio en marcha. Para detenerlo, cierra esta ventana o pulsa Ctrl + C.
echo.
call npm run dev
pause
