@echo off
setlocal enabledelayedexpansion

:: Store the root directory path
set "ROOT_DIR=%CD%"

echo 🌐 Creating platform network if it doesn't exist...
docker network inspect platform_network >nul 2>&1 || docker network create platform_network

echo 🚀 Starting main services with Docker Compose...
docker compose up -d

echo 📂 Changing to dockprom directory...
if not exist dockprom (
    echo ❌ Error: dockprom directory not found!
    echo Creating dockprom directory...
    mkdir dockprom
)
cd dockprom

echo 🚀 Starting monitoring services in dockprom...
docker compose up -d

:: Return to root directory
cd "%ROOT_DIR%"

echo ⏳ Waiting for services to be healthy...
timeout /t 10 /nobreak > nul

echo ✨ Checking service status...
echo Main services:
docker compose ps
echo.
echo Monitoring services:
cd dockprom && docker compose ps

echo 🎉 Deployment complete! All services are now running.
echo.
echo 📝 Access points:
echo - Grafana: http://localhost:3000 (admin/admin)
echo - Prometheus: http://localhost:9090
echo - AlertManager: http://localhost:9093
echo - Kafka: localhost:9092
echo - Redis: localhost:6379
echo - MySQL: localhost:3306
echo - Ollama: http://localhost:11434

:: Return to root directory
cd "%ROOT_DIR%"

endlocal