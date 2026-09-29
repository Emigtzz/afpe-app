# AFPE - App de Finanzas Personales para Estudiantes

> Aplicación móvil multiplataforma (Android/iOS) para que estudiantes universitarios gestionen sus finanzas personales.

**Desarrollado para:** Universidad de Colima | Asignatura: Dirección de Proyectos
**Equipo:** Ángel Federico López Ruiz (PM), Andrés Miguel Vázquez Bazán, Iker Marroquín Flores, Jesús Emiliano Gutierrez Luna

---

## 🎯 Características

✅ **Autenticación segura** - Registro e inicio de sesión con Firebase  
✅ **Registro de movimientos** - Categoriza tus gastos e ingresos  
✅ **Metas de ahorro** - Define objetivos y haz seguimiento  
✅ **Alertas automáticas** - Recibe notificaciones de sobregasto  
✅ **Dashboard interactivo** - Visualiza tus finanzas en tiempo real  
✅ **Reportes mensuales** - Análisis detallado de tu comportamiento financiero  
✅ **Multiplataforma** - Funciona en Android e iOS

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** 18.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm** 9.0.0 o superior (viene con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- **Expo CLI** (se instala con npm)
- **Expo Go App** (descarga desde App Store o Google Play)

### Verificar instalación

```bash
node --version      # v18.0.0 o superior
npm --version       # 9.0.0 o superior
git --version       # 2.x.x o superior
```

---

## 🚀 Setup Inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-equipo/afpe-app.git
cd afpe-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### a. Crear proyecto en Firebase

1. Ir a [https://firebase.google.com](https://firebase.google.com)
2. Clickear "Ir a la consola"
3. Crear nuevo proyecto llamado "AFPE"
4. Seleccionar ubicación (México)
5. Desactivar Google Analytics (opcional)

#### b. Configurar Realtime Database

1. En Firebase Console → Realtime Database
2. Crear database
3. Seleccionar "México" como ubicación
4. Seleccionar "Comenzar en modo prueba"
5. Copiar la URL de la database (ej: `https://afpe-xxxx.firebaseio.com`)

#### c. Configurar Authentication

1. En Firebase Console → Authentication
2. Clickear "Configurar método de inicio de sesión"
3. Habilitar "Email/Contraseña"

#### d. Obtener credenciales

1. En Firebase Console → Configuración de proyecto → Apps
2. Registrar app como "Web"
3. Copiar las credenciales

#### e. Crear archivo `.env.local`

Crear archivo `.env.local` en la raíz del proyecto:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
EXPO_PUBLIC_FIREBASE_DATABASE_URL=YOUR_DATABASE_URL
```

> ⚠️ **NO hacer commit de este archivo** - Agregar a `.gitignore`

### 4. Iniciar el proyecto

```bash
npm start
```

Se abrirá el Expo CLI. Tienes opciones:

```
› Press i to open iOS simulator
› Press a to open Android emulator
› Press w to open web app
› Press r to reload app
› Press m to toggle menu
```

### 5. Instalar Expo Go en tu dispositivo

- **iOS**: [App Store - Expo Go](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Google Play - Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)

Escanea el QR con Expo Go para ver la app en tiempo real.

---

## 📁 Estructura del Proyecto

```
afpe-app/
├── .github/
│   └── workflows/          # CI/CD automation
├── .env.local             # Variables de entorno (NO COMPARTIR)
├── .gitignore             # Archivos a ignorar en Git
├── app.json               # Configuración Expo
├── app.config.js          # Configuración avanzada
├── package.json           # Dependencias
├── babel.config.js        # Configuración Babel
├── src/
│   ├── screens/           # Pantallas por feature
│   ├── components/        # Componentes reutilizables
│   ├── navigation/        # Configuración de navegación
│   ├── store/             # Stores de Zustand
│   ├── services/          # Integraciones (Firebase, APIs)
│   ├── utils/             # Funciones helper
│   ├── styles/            # Temas y estilos
│   └── App.js             # Root component
├── tests/                 # Tests unitarios
├── assets/                # Imágenes, fonts, etc
└── README.md              # Este archivo
```

---

## 🔄 Flujo de Trabajo con Git

### Branches principales

- **`main`** - Versión estable (release)
- **`develop`** - Rama de desarrollo activa
- **`feature/xxx`** - Nuevas funcionalidades
- **`bugfix/xxx`** - Correcciones de bugs

### Crear una nueva feature

```bash
# Actualizar develop
git checkout develop
git pull origin develop

# Crear rama de feature
git checkout -b feature/tu-feature-name

# Hacer cambios, comitear
git add .
git commit -m "feat: descripción clara de cambios"

# Subir cambios
git push origin feature/tu-feature-name

# Crear Pull Request en GitHub
```

### Naming de commits

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:    Nueva funcionalidad
fix:     Corrección de bug
refactor: Cambios de código sin alterar comportamiento
style:   Cambios de formato/estilos
test:    Agregar o actualizar tests
docs:    Cambios en documentación
chore:   Cambios en tooling/config
```

Ejemplos:
```bash
git commit -m "feat: agregar pantalla de login"
git commit -m "fix: corregir error en validación de email"
git commit -m "refactor: reorganizar transactionStore"
```

---

## 🧪 Testing

### Ejecutar tests

```bash
npm test              # Ejecutar tests una sola vez
npm run test:watch   # Ejecutar tests en modo watch
```

### Estructura de tests

```
tests/
├── utils/
│   ├── validators.test.js
│   └── formatters.test.js
├── store/
│   ├── authStore.test.js
│   └── transactionStore.test.js
└── components/
    └── TransactionCard.test.js
```

---

## 🎯 Plan de Desarrollo (3 Iteraciones)

### Iteración 1: Autenticación (5-18 Oct)
- Registro e inicio de sesión
- Persistencia de sesión
- Dashboard vacío

### Iteración 2: Movimientos & Metas (19 Oct - 5 Nov)
- Agregar/editar/eliminar transacciones
- Crear metas de ahorro
- Sincronización Firebase

### Iteración 3: Dashboard & Alertas (6-25 Nov)
- Dashboard con resumen
- Gráficas interactivas
- Alertas de sobregasto
- Reportes mensuales

---

## 🐛 Debugging

### Habilitar console logs

Los logs se ven en la terminal cuando ejecutas `npm start`.

### Debug de Firebase

```javascript
import { enableLogging } from 'firebase/database';
enableLogging(true);
```

### Usar React Native Debugger

```bash
# Instalar React Native Debugger
# https://github.com/jhen0409/react-native-debugger
```

En Expo:
- Press `j` para abrir debugger
- Abrir React Native Debugger

---

## 📦 Comandos Útiles

```bash
# Empezar desarrollo
npm start

# Abrir en simulador iOS
npm run ios

# Abrir en emulador Android
npm run android

# Abrir en web (experimentalTiene limitaciones)
npm run web

# Limpiar cache
expo start -c

# Instalar nuevas dependencias
npm install package-name

# Desinstalar dependencias
npm uninstall package-name
```

---

## 🔒 Seguridad

⚠️ **IMPORTANTE:**

- **NUNCA** hacer commit de `.env.local`
- **NUNCA** compartir credenciales de Firebase
- Usar variables de entorno para todos los secretos
- Las reglas de Firebase deben restringir acceso por usuario
- Encriptar datos sensibles antes de guardar

---

## 📚 Recursos Útiles

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [Firebase React Docs](https://firebase.google.com/docs/database)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)

---

## 📞 Soporte & Contacto

**Equipo AFPE:**
- Ángel Federico López Ruiz (PM)
- Andrés Miguel Vázquez Bazán
- Iker Marroquín Flores
- Jesús Emiliano Gutierrez Luna

**Profesor:** Angelica Maria Aguilar Arias  
**Universidad:** Universidad de Colima  
**Materia:** Dirección de Proyectos

---

## 📄 Licencia

Este proyecto es académico y desarrollado para la Universidad de Colima.

---

**Última actualización:** 27 de Septiembre, 2026  
**Versión:** 0.1.0 - Pre-MVP
