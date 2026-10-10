# ✅ SETUP CHECKLIST - AFPE React Native

Sigue estos pasos en orden. Si algo falla, avísame.

---

## 📋 PASO 1: Preparación (Hoy - 27 Sept)

### Team Lead (Federico)
- [ ] Crear repositorio en GitHub: `afpe-app`
- [ ] Agregar al equipo como colaboradores
- [ ] Crear `.gitignore` (copiar plantilla de Node.js)
- [ ] Crear branches: `develop`, `feature/*`
- [ ] Subir estos archivos al repo

### Todos
- [ ] Instalar Node.js 18+
- [ ] Instalar Git
- [ ] Clonar el repo
- [ ] Crear cuenta en Expo: https://expo.dev/signup
- [ ] Descargar Expo Go en el celular

---

## 🔥 PASO 2: Firebase Setup (Hoy/Mañana - 28 Sept)

### Alguien del equipo (preferentemente Emiliano)
- [ ] Ir a https://firebase.google.com
- [ ] Clickear "Ir a la consola"
- [ ] Clickear "Crear proyecto"
  - Nombre: `AFPE`
  - Ubicación: México
  - Sin Google Analytics
- [ ] Ir a "Realtime Database"
  - [ ] Crear database
  - [ ] Ubicación: México (us-central1)
  - [ ] Modo prueba
  - [ ] Copiar URL de la database
- [ ] Ir a "Authentication"
  - [ ] Habilitar Email/Contraseña
- [ ] Ir a "Configuración del proyecto" → Apps
  - [ ] Registrar app Web
  - [ ] Copiar credenciales (SDK Config)
  - [ ] Compartir con el equipo en Slack/Teams (SEGURO!)

### Todos
- [ ] Recibir credenciales de Firebase
- [ ] Crear `.env.local` con las credenciales:
  ```env
  EXPO_PUBLIC_FIREBASE_API_KEY=...
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
  EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
  EXPO_PUBLIC_FIREBASE_APP_ID=...
  EXPO_PUBLIC_FIREBASE_DATABASE_URL=...
  ```
- [ ] Verificar que `.env.local` está en `.gitignore`

---

## 💻 PASO 3: Setup Local (28-29 Sept)

### Todos
```bash
# Clonar repo
git clone https://github.com/[equipo]/afpe-app.git
cd afpe-app

# Instalar dependencias
npm install

# Verificar que npm start funciona sin errores
npm start

# Deberías ver algo como:
# › Metro waiting on exp://...
# › Scan the QR code above with Expo Go
```

Si aparece error:
- Limpiar: `npm install --force`
- Limpiar cache: `rm -rf node_modules/.cache`
- Reintentar: `npm install`

---

## 📱 PASO 4: Primer Test en Expo Go (29 Sept)

### Todos
- [ ] Abrir Expo Go en tu celular
- [ ] Escanear el QR que aparece en la terminal
- [ ] Debería cargar "Hello World" en el celular

Si no funciona:
- Verificar que estás en la misma red WiFi
- Reintentar escanear el QR
- Ejecutar: `expo start -c` (limpiar cache)

---

## 📂 PASO 5: Estructura de Carpetas (30 Sept)

Emiliano crea las carpetas:
```bash
mkdir -p src/screens/{Auth,Dashboard,Transactions,Goals,Settings}
mkdir -p src/components
mkdir -p src/navigation
mkdir -p src/store
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/styles
mkdir -p tests/{utils,store,components}
mkdir -p assets
```

---

## 🔑 PASO 6: Archivos de Configuración (30 Sept - 1 Oct)

Los archivos ya están listos. Colocar en el repo:
- [ ] `src/services/firebase.js` (✅ Hecho)
- [ ] `src/store/authStore.js` (✅ Hecho)
- [ ] `src/store/transactionStore.js` (✅ Hecho)
- [ ] `src/utils/validators.js` (✅ Hecho)
- [ ] `src/utils/formatters.js` (✅ Hecho)
- [ ] `app.config.js` (✅ Hecho)
- [ ] `package.json` (✅ Hecho)
- [ ] `.env.local` (⚠️ CREAR LOCALMENTE, NO COMMITEAR)

---

## 🎬 PASO 7: Comenzar Iteración 1 (2-5 Oct)

### Responsabilidades

**Emiliano:**
- [ ] Setup de App.js y RootNavigator
- [ ] AuthNavigator configuration
- [ ] Login/Register screens skeleton

**Andrés:**
- [ ] LoginScreen UI (Email input, Password input, Login button)
- [ ] RegisterScreen UI (Email, Password, Confirm password, Register button)

**Iker:**
- [ ] Conectar authStore con Firebase
- [ ] Validaciones en authStore
- [ ] Tests para authStore

**Federico (PM):**
- [ ] Coordinar avances
- [ ] Testing manual en Expo Go
- [ ] Documentación

### Meta Semana 1
✅ App funcional en Expo Go con login/registro completo

---

## 🧪 PASO 8: Testing antes de Commit

Antes de hacer `git push`, ejecutar:
```bash
# Verificar que no hay errores de linting
npm run lint

# Ejecutar tests
npm test

# Formatear código
npm run format

# Verificar que npm start funciona
npm start
```

---

## 🚀 PASO 9: Git Workflow

### Crear una feature
```bash
# Asegurarse estar en develop
git checkout develop
git pull origin develop

# Crear rama de feature
git checkout -b feature/auth-screens

# Hacer cambios
# ... editar archivos ...

# Comitear cambios
git add .
git commit -m "feat: agregar login y register screens"

# Subir cambios
git push origin feature/auth-screens

# En GitHub: Crear Pull Request
# Federico revisa y hace merge a develop
```

---

## 📝 PASO 10: Documentación

- [ ] Mantener README.md actualizado
- [ ] Agregar cambios importantes al PLAN de desarrollo
- [ ] Documentar decisiones técnicas

---

## ⚠️ CHECKLIST DE SEGURIDAD

Antes de hacer push CUALQUIER código:
- [ ] `.env.local` NO está en el repo
- [ ] NO hay API keys, contraseñas o tokens expuestos
- [ ] No hay datos sensibles en comentarios
- [ ] Verificar `.gitignore` está bien configurado

---

## 🆘 Si algo no funciona

### "npm install falla"
```bash
npm install --force
npm ci --force
```

### "Expo Go no conecta"
```bash
expo start -c      # Limpiar cache
expo start --local # Forzar conexión local
```

### "Firebase no conecta"
- Verificar `.env.local` tiene todas las variables
- Verificar credenciales en Firebase Console
- Verificar database URL es correcta
- Reintentar: `expo start -c`

### "Error en transactionStore"
```bash
# Verificar que Firebase está inicializado
# Verificar permisos en Realtime Database
# Versión de firebase correcta: npm list firebase
```

---

## 📞 Contacto Técnico

- **Problemas de Firebase:** Emiliano
- **Problemas de UI:** Andrés
- **Problemas de State/Logic:** Iker
- **Coordinación General:** Federico
- **GitHub Setup:** Federico

---

## 📅 Timeline

| Fecha | Hito | Responsable |
|-------|------|-------------|
| 27-28 Sept | Firebase setup | Emiliano |
| 28-30 Sept | Setup local, estructura | Todos |
| 1-5 Oct | Iteración 1: Auth | Emiliano, Andrés, Iker |
| 5-18 Oct | MVP Auth funcional | Todos |
| 19 Oct - 5 Nov | Iteración 2: Movimientos | Todos |
| 6-25 Nov | Iteración 3: Dashboard | Todos |
| 26-27 Nov | Testing final, Build | Todos |
| 30 Nov | Presentación | Todos |

---

✅ **Cuando hayas completado TODO esto, avísame para empezar a codificar la primera pantalla.**

**¿Preguntas?** Mensaje en el chat de equipo.
