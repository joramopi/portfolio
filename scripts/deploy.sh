#!/bin/bash

# Script de deployment
set -e

echo "🚀 Iniciando deployment..."

# Verificar variables de entorno
if [ -z "$JWT_SECRET" ]; then
    echo "❌ Error: JWT_SECRET no está definido"
    exit 1
fi

# Construir y ejecutar contenedores
echo "📦 Construyendo imágenes..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "🔄 Deteniendo contenedores anteriores..."
docker-compose -f docker-compose.prod.yml down

echo "🆙 Iniciando nuevos contenedores..."
docker-compose -f docker-compose.prod.yml up -d

echo "🏥 Verificando salud de los servicios..."
sleep 10
docker-compose -f docker-compose.prod.yml ps

echo "✅ Deployment completado!"
echo "🌐 Aplicación disponible en: http://localhost"
