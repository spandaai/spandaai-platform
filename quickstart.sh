#!/bin/bash

# Exit on any error
set -e

echo "
   _____                       _                  _____ 
  / ____|                     | |           /\   |_   _|
 | (___  _ __   __ _ _ __   __| | __ _     /  \    | |  
  \___ \| '_ \ / _\` | '_ \ / _'| / _' |   / /\ \   | |  
  ____) | |_) | (_| | | | | (_| | (_| |_ / ____ \ _| |_ 
 |_____/| .__/ \__,_|_| |_|\__,_|\__,_(_)_/    \_\_____|
        | |                                             
        |_|   
"

# Store the root directory path
ROOT_DIR=$(pwd)

echo "🌐 Creating platform network if it doesn't exist..."
docker network inspect platform_network >/dev/null 2>&1 || docker network create platform_network

echo "🚀 Starting main services with Docker Compose..."
docker compose up -d

echo "📂 Changing to dockprom directory..."
cd dockprom || {
    echo "❌ Error: dockprom directory not found!"
    echo "Creating dockprom directory..."
    mkdir dockprom
    cd dockprom
}

echo "🚀 Starting monitoring services in dockprom..."
docker compose up -d

# Return to root directory
cd "$ROOT_DIR"

echo "⏳ Waiting for services to be healthy..."
sleep 10

echo "✨ Checking service status..."
echo "Main services:"
docker compose ps
echo -e "\nMonitoring services:"
cd dockprom && docker compose ps

echo "🎉 Deployment complete! All services are now running."
echo "
📝 Access points:
- Grafana: http://localhost:3000 (admin/admin)
- Prometheus: http://localhost:9090
- AlertManager: http://localhost:9093
- Kafka: localhost:9092
- Redis: localhost:6379
- MySQL: localhost:3306
- Ollama: http://localhost:11434"