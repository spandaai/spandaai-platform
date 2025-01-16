@echo off
setlocal enabledelayedexpansion

echo     _____                       _                  _____ 
echo    / ____^|                     ^| ^|           /^|   ^|_   _^|
echo    ^| (___  _ __   __ _ _ __   __^| ^| __ _    /  \    ^| ^|  
echo     \___ ^|^| '_ \ / _` ^| '_ \ / _` ^| / _` ^|   / /\ \   ^| ^|  
echo     ____) ^| ^|_) ^| (_^| ^| ^| ^| ^| (_^| ^| (_^| _ / ____ \ _^| ^|_
echo    ^|_____/^| .__/ \__,_^|_^| ^|_^|\__,_^|\__,_(_)_/    \_\____^|
echo            ^| ^|                                             
echo            ^|_^|   

:: Store the root directory path
set "ROOT_DIR=%CD%"

echo 🌐 Creating platform network if it doesn't exist...
docker network inspect platform_network >nul 2>&1 || docker network create platform_network

echo 🌐 Creating app network if it doesn't exist...
docker network inspect app_network >nul 2>&1 || docker network create app_network

echo 🚀 Starting main services with Docker Compose...
docker compose up -d

cd components/dockprom

echo 🚀 Starting monitoring services in dockprom...
docker compose up -d

:: Return to root directory
cd "%ROOT_DIR%"

echo ⏳ Waiting for services to be healthy...
timeout /t 10 /nobreak >nul

echo ✨ Checking service status...
echo Main services:
docker compose ps
echo.
echo Monitoring services:
cd dockprom && docker compose ps

echo 🎉 Deployment complete! All services are now running.
echo.
echo 📝 Access points:
echo - Grafana: http://localhost:3000 (username - admin/ password - admin)
echo - Prometheus: http://localhost:9090
echo - AlertManager: http://localhost:9093
echo - Kafka: http://localhost:9092
echo - Redis: http://localhost:6379
echo - MySQL: http://localhost:3306
echo - Ollama: http://localhost:11434
echo - Verba: http://localhost:8000

pause
endlocal
