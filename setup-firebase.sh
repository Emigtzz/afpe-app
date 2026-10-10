#!/bin/bash

# AFPE Firebase Setup Script
# Ejecutar: bash setup-firebase.sh

set -e

echo "🔥 AFPE - Firebase Configuration"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Verificar que .env.local existe
if [ ! -f .env.local ]; then
    print_error ".env.local no encontrado"
    echo ""
    echo "Por favor ejecuta primero: bash setup.sh"
    exit 1
fi

echo "Configuración de Firebase para AFPE"
echo "===================================="
echo ""
echo "Este script te ayudará a configurar tus credenciales de Firebase"
echo ""

# Preguntar si desea configurar Firebase
read -p "¿Deseas configurar Firebase ahora? (s/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    print_info "Configuración cancelada"
    echo "Puedes hacerlo manualmente editando .env.local"
    exit 0
fi

echo ""
echo "Por favor, obtén tus credenciales de Firebase:"
echo "1. Ve a https://firebase.google.com/console"
echo "2. Selecciona tu proyecto 'AFPE'"
echo "3. Ve a 'Configuración del proyecto' (ícono de engranaje)"
echo "4. Copia el SDK Config (objeto de configuración)"
echo ""

# Solicitar cada variable
print_info "Ingresa tus credenciales de Firebase:"
echo ""

read -p "API Key: " api_key
read -p "Auth Domain: " auth_domain
read -p "Project ID: " project_id
read -p "Storage Bucket: " storage_bucket
read -p "Messaging Sender ID: " messaging_sender_id
read -p "App ID: " app_id
read -p "Database URL (https://xxx.firebaseio.com): " database_url

# Validar que no estén vacías
if [ -z "$api_key" ] || [ -z "$auth_domain" ] || [ -z "$project_id" ]; then
    print_error "Faltan credenciales requeridas"
    exit 1
fi

# Crear backup de .env.local
cp .env.local .env.local.backup
print_success "Backup creado en .env.local.backup"

# Actualizar .env.local
echo "EXPO_PUBLIC_FIREBASE_API_KEY=$api_key" > .env.local
echo "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=$auth_domain" >> .env.local
echo "EXPO_PUBLIC_FIREBASE_PROJECT_ID=$project_id" >> .env.local
echo "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=$storage_bucket" >> .env.local
echo "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$messaging_sender_id" >> .env.local
echo "EXPO_PUBLIC_FIREBASE_APP_ID=$app_id" >> .env.local
echo "EXPO_PUBLIC_FIREBASE_DATABASE_URL=$database_url" >> .env.local

print_success "Credenciales guardadas en .env.local"

echo ""
echo "Verificando Firebase Config..."
echo "================================"

# Verificar que todas las variables están configuradas
if grep -q "EXPO_PUBLIC_FIREBASE" .env.local; then
    print_success "Firebase configurado correctamente"
else
    print_error "Error configurando Firebase"
    exit 1
fi

echo ""
echo "✅ Firebase está configurado!"
echo ""
echo "Próximos pasos:"
echo "1. Verifica Firebase Console (https://firebase.google.com)"
echo "2. Asegúrate que Authentication (Email/Password) está habilitado"
echo "3. Asegúrate que Realtime Database está creado"
echo "4. Ejecuta: npm start"
echo ""

print_warning "NO compartas tu .env.local - Contiene credenciales sensibles"
print_warning ".env.local ya está en .gitignore - No se hará commit"
echo ""
