@echo off
title Detener portafolio
echo Deteniendo el servidor local del portafolio...
powershell -NoProfile -Command "$p = Get-CimInstance Win32_Process -Filter \"name='node.exe'\" | Where-Object { $_.CommandLine -match 'portafolio-angel' }; $p | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; 'Procesos detenidos: ' + @($p).Count | Out-File -Encoding ascii '%~dp0detener.log'"
timeout /t 2 >nul
