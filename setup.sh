#!/bin/bash

# AFPE Setup Script
# Ejecutar: bash setup.sh

set -e  # Exit on error

echo "🚀 AFPE - Setup Inicial"
echo "================================"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# 1. Verificar Node.js
echo "1️⃣  Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    echo "   Descarga desde: https://nodejs.org/ (versión 18+)"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js $NODE_VERSION encontrado"

# 2. Verificar npm
echo ""
echo "2️⃣  Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm $NPM_VERSION encontrado"

# 3. Instalar dependencias
echo ""
echo "3️⃣  Instalando dependencias..."
print_warning "Esto puede tomar 3-5 minutos..."
npm install

print_success "Dependencias instaladas"

# 4. Crear .env.local si no existe
echo ""
echo "4️⃣  Verificando .env.local..."
if [ ! -f .env.local ]; then
    print_warning ".env.local no encontrado"
    echo "   Copiando desde .env.example..."
    cp .env.example .env.local
    print_warning "IMPORTANTE: Edita .env.local con tus credenciales de Firebase"
    echo "   Abre .env.local y reemplaza los valores con tus credenciales"
else
    print_success ".env.local ya existe"
fi

# 5. Verificar Expo CLI
echo ""
echo "5️⃣  Verificando Expo CLI..."
if ! command -v expo &> /dev/null; then
    print_warning "Expo CLI no está instalado globalmente"
    echo "   Instalando..."
    npm install -g expo-cli
    print_success "Expo CLI instalado"
else
    EXPO_VERSION=$(expo --version)
    print_success "Expo CLI $EXPO_VERSION encontrado"
fi

# 6. Resumen
echo ""
echo "================================"
echo -e "${GREEN}✓ Setup completado${NC}"
echo "================================"
echo ""
echo "Próximos pasos:"
echo "1. Edita .env.local con tus credenciales de Firebase"
echo "2. Ejecuta: npm start"
echo "3. Escanea el QR con Expo Go en tu celular"
echo ""
echo "¿Necesitas ayuda?"
echo "Lee FIRST_RUN.md para instrucciones detalladas"
echo ""
