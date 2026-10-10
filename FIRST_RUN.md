# 🚀 PRIMERA EJECUCIÓN - AFPE

Sigue estos pasos para que la app funcione por primera vez.

---

## ✅ CHECKLIST PRE-REQUISITOS

Antes de empezar, verifica que tengas:

- [ ] **Node.js 18+** instalado (`node --version`)
- [ ] **npm 9+** instalado (`npm --version`)
- [ ] **Git** instalado (`git --version`)
- [ ] **Firebase Project** creado en https://firebase.google.com
- [ ] **Expo CLI** instalado globalmente: `npm install -g expo-cli`
- [ ] **Expo Go App** instalada en tu celular (iOS/Android)

---

## 🔧 PASO 1: Clonar el Repositorio

```bash
# Clonar el repo
git clone https://github.com/tu-equipo/afpe-app.git
cd afpe-app

# Verificar que está en la carpeta correcta
pwd  # Deberías ver algo como: /Users/emiliano/proyectos/afpe-app
```

---

## 📦 PASO 2: Instalar Dependencias

```bash
# Instalar todas las dependencias
npm install

# Esto puede tomar 2-5 minutos
# Deberías ver algo como: added XXX packages
```

**Si falla:**
```bash
# Opción 1: Forzar instalación
npm install --force

# Opción 2: Limpiar cache y reintentar
npm cache clean --force
rm -rf node_modules
npm install
```

---

## 🔑 PASO 3: Configurar Firebase

### a) Obtener credenciales de Firebase

1. Ir a https://firebase.google.com/console
2. Seleccionar proyecto "AFPE"
3. Ir a **Configuración del proyecto** (ícono de engranaje)
4. Seleccionar tu app Web
5. Copiar el objeto de configuración (SDK Config)

Debería verse algo así:
```javascript
{
  apiKey: "AIzaSyDXXXXXXXXX",
  authDomain: "afpe-xxxxx.firebaseapp.com",
  projectId: "afpe-xxxxx",
  storageBucket: "afpe-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxx"
}
```

### b) Crear archivo `.env.local`

En la raíz del proyecto (`afpe-app/.env.local`), crear un archivo con:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyDXXXXXXXXX
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=afpe-xxxxx.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=afpe-xxxxx
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=afpe-xxxxx.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxxx
EXPO_PUBLIC_FIREBASE_DATABASE_URL=https://afpe-xxxxx.firebaseio.com
```

> ⚠️ **IMPORTANTE:** Este archivo NO debe hacer commit. Ya está en `.gitignore`

### c) Verificar que Firebase está habilitado

En Firebase Console:
- [ ] **Authentication** → Email/Password habilitado
- [ ] **Realtime Database** → Creado en "us-central1" (México)
- [ ] **Database Rules** → Configurado en modo prueba (o reglas personalizadas)

---

## 📱 PASO 4: Ejecutar la App

```bash
# Iniciar Expo
npm start

# Debería ver algo como:
# ✔ Expo server is ready
# › Press i to open iOS simulator
# › Press a to open Android emulator
# › Scan the QR code above with Expo Go
```

---

## 🔍 PASO 5: Abrir en tu dispositivo

### Opción A: Escanear QR con Expo Go (RECOMENDADO)

1. Instalar **Expo Go** en tu celular:
   - iOS: App Store → buscar "Expo Go"
   - Android: Google Play → buscar "Expo Go"

2. Abrir Expo Go

3. Escanear el QR que aparece en la terminal

4. ¡Espera a que cargue! (puede tomar 10-30 segundos la primera vez)

### Opción B: Emulador Android

```bash
# En otra terminal, con Android emulator corriendo
npm run android
```

### Opción C: Simulador iOS (solo Mac)

```bash
# En otra terminal
npm run ios
```

---

## 🎯 QUÉ DEBERÍAS VER

Si todo está correcto, verás:

### Pantalla de Login
```
┌─────────────────────────┐
│                         │
│        AFPE             │
│  Finanzas Personales    │
│                         │
│  [Email input]          │
│  [Password input]       │
│  [Iniciar sesión]       │
│                         │
│  ¿No tienes cuenta?     │
│  Regístrate aquí        │
│                         │
└─────────────────────────┘
```

---

## 🧪 PROBAR FUNCIONALIDADES BÁSICAS

### 1. Crear cuenta
- Email: `test@example.com`
- Password: `123456` (mínimo 6 caracteres)
- Clickear "Crear Cuenta"
- Debería mostrar: "Cuenta creada correctamente"

### 2. Login
- Usar el email y password que creaste
- Debería entrar al Dashboard

### 3. Dashboard
- Deberías ver: Welcome card, Balance summary, Quick actions
- Los números deberían ser $0 (sin movimientos aún)

### 4. Navegar por tabs
- Clickear en los tabs de abajo:
  - 🏠 Inicio (Dashboard)
  - 📊 Movimientos (TransactionsScreen)
  - 🎯 Metas (GoalsScreen)
  - ⚙️ Ajustes (SettingsScreen)

### 5. Logout
- Ir a Ajustes → Cerrar Sesión
- Debería volver a la pantalla de Login

---

## ⚠️ PROBLEMAS COMUNES

### "Metro bundler failed"
```bash
# Solución: Limpiar cache
expo start -c

# O forzar reload
# Press 'r' en la terminal
```

### "Firebase connection error"
- Verificar que `.env.local` tiene todas las variables
- Verificar que la URL de Firebase es correcta
- Verificar que Firebase Database está habilitada

### "Icon not found: material-community-icons"
```bash
# Los iconos pueden no estar disponibles en desarrollo
# Usar iconos simples de expo en su lugar:
# npm install expo-icon-sets
```

### "La app no carga en el celular"
- Verificar que celular y PC están en la MISMA red WiFi
- Escanear el QR nuevamente
- Ejecutar: `expo start --tunnel` (si WiFi local falla)

### "Cambios no se ven"
```bash
# Presionar 'r' en la terminal para reload
# O Ctrl+C y ejecutar npm start nuevamente
```

---

## 🔄 RELOAD & DEBUG

### Durante desarrollo:

```bash
# En la terminal que corre expo:
r              → Recargar la app
i              → Abrir en iOS simulator
a              → Abrir en Android emulator
j              → Abrir debugger
m              → Ver menu de opciones
Ctrl+C         → Detener expo
```

### En Expo Go (en el celular):

- Shake el celular → menú de desarrollo
- "Reload" → recargar
- "Go Home" → volver a pantalla de proyectos

---

## 📊 ESTRUCTURA DE CARPETAS ESPERADA

Después de clonar y `npm install`, deberías tener:

```
afpe-app/
├── node_modules/          ← Creado por npm install
├── .expo/                 ← Creado por Expo
├── src/
│   ├── App.js
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Dashboard/
│   │   ├── Transactions/
│   │   ├── Goals/
│   │   └── Settings/
│   ├── navigation/
│   ├── store/
│   ├── services/
│   ├── utils/
│   └── styles/
├── assets/
├── .env.local             ← CREAR (no compartir)
├── .gitignore
├── app.json
├── babel.config.js
├── package.json
├── index.js
└── README.md
```

---

## ✅ CHECKLIST FINAL

Antes de reportar "está listo":

- [ ] `npm install` corrió sin errores
- [ ] `.env.local` está creado con credenciales Firebase
- [ ] `npm start` inicia sin errores
- [ ] QR se escanea con Expo Go
- [ ] Veo la pantalla de Login
- [ ] Puedo crear una cuenta
- [ ] Puedo hacer login
- [ ] Veo el Dashboard
- [ ] Puedo navegar entre tabs
- [ ] El Logout funciona

---

## 📞 SI ALGO FALLA

Comparte:
1. El error exacto que ves
2. El output de `npm start`
3. La versión de Node.js: `node --version`
4. El output de `npm list react-native`

---

## 🎉 ¡ÉXITO!

Si llegaste aquí sin errores, **la Iteración 1 está lista para codificar**.

Próximos pasos:
1. Conectar LoginScreen con Firebase ✅
2. Conectar RegisterScreen con Firebase ✅
3. Validación de formularios ✅
4. Tests básicos
5. Publicar en rama develop

**¿Problemas? Mensajea al canal #desarrollo**

---

**Última actualización:** 29 de Septiembre, 2026  
**Versión:** 0.1.0 - Setup Base
