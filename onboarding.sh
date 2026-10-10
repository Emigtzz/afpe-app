#!/bin/bash

# AFPE Onboarding Script
# Para nuevos desarrolladores que se unen al equipo
# Ejecutar: bash onboarding.sh

set -e

echo "👋 Bienvenido a AFPE"
echo "===================="
echo ""
echo "Este script te ayudará a configurar tu entorno de desarrollo"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Presentación del proyecto
echo "📱 Proyecto: AFPE - App de Finanzas Personales para Estudiantes"
echo "📚 Equipo: Emiliano, Andrés, Iker, Federico"
echo "🎯 Objetivo: Iteración 1 - Autenticación (5-18 Oct)"
echo ""

# 2. Configuración del entorno
print_step "Verificando herramientas requeridas..."
echo ""

# Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js $NODE_VERSION instalado"
else
    print_warning "Node.js no encontrado"
    echo "  Descarga desde: https://nodejs.org/ (v18+)"
    exit 1
fi

# Git
if command -v git &> /dev/null; then
    print_success "Git instalado"
else
    print_warning "Git no encontrado"
    exit 1
fi

# Expo
if command -v expo &> /dev/null; then
    print_success "Expo CLI instalado"
else
    print_warning "Expo CLI no encontrado - Instalando..."
    npm install -g expo-cli
    print_success "Expo CLI instalado"
fi

echo ""
print_step "Configurando repositorio..."
echo ""

# Configurar Git
read -p "¿Cuál es tu nombre? " user_name
read -p "¿Cuál es tu email? " user_email

git config user.name "$user_name"
git config user.email "$user_email"

print_success "Git configurado para $user_name <$user_email>"

echo ""
print_step "Instalando dependencias del proyecto..."
echo ""

npm install

print_success "Dependencias instaladas"

echo ""
print_step "Creando archivo .env.local..."
echo ""

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    print_success ".env.local creado"
    print_warning "IMPORTANTE: Edita .env.local con tus credenciales de Firebase"
else
    print_warning ".env.local ya existe"
fi

echo ""
echo "📋 Información importante:"
echo "========================="
echo ""
echo "1. RAMAS DE GIT:"
echo "   main   → Versión estable (releases)"
echo "   develop → Rama de desarrollo activa"
echo "   feature/xxx → Para nuevas funcionalidades"
echo ""
echo "2. ESTRUCTURA DE COMMITS:"
echo "   feat:    Nueva funcionalidad"
echo "   fix:     Corrección de bug"
echo "   refactor: Cambios de código"
echo "   test:    Agregar tests"
echo "   docs:    Documentación"
echo ""
echo "3. FLUJO DE TRABAJO:"
echo "   1. Crea rama desde develop: git checkout -b feature/mi-feature"
echo "   2. Haz cambios y commitea: git commit -m 'feat: descripción'"
echo "   3. Push: git push origin feature/mi-feature"
echo "   4. Crea Pull Request en GitHub"
echo "   5. Espera review y merge"
echo ""
echo "4. ARCHIVOS IMPORTANTES:"
echo "   README.md → Setup y documentación general"
echo "   FIRST_RUN.md → Guía primera ejecución"
echo "   AFPE_Plan_Desarrollo_ReactNative.md → Plan técnico"
echo ""

echo "5. CONTACTOS POR ÁREA:"
echo "   Backend/Firebase: Emiliano"
echo "   Frontend/UI: Andrés"
echo "   State/Lógica: Iker"
echo "   Coordinación: Federico"
echo ""

echo ""
print_step "Próximos pasos:"
echo ""
echo "1. Edita .env.local con tus credenciales de Firebase"
echo "   (Pídele a Emiliano si no las tienes)"
echo ""
echo "2. Ejecuta: npm start"
echo ""
echo "3. Escanea el QR con Expo Go en tu celular"
echo ""
echo "4. Verifica que puedes hacer signup/login"
echo ""
echo "5. Lee la documentación en:"
echo "   - README.md"
echo "   - AFPE_Plan_Desarrollo_ReactNative.md"
echo ""

echo "═════════════════════════════════════════"
print_success "¡Onboarding completado!"
echo "═════════════════════════════════════════"
echo ""
echo "¿Preguntas? Pregunta en el canal #desarrollo o a Federico (PM)"
echo ""
