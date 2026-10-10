# AFPE - Plan de Desarrollo React Native

**Proyecto:** App de Finanzas Personales para Estudiantes  
**Equipo:** Emiliano, Andrés, Iker, Federico (PM)  
**Timeline:** 5/10 - 25/11 (8 semanas) → MVP el 27/11  
**Stack:** React Native + Expo + Firebase + Zustand

---

## 📋 Stack Tecnológico Elegido

### Frontend (Mobile)
- **React Native + Expo** (no necesita compilación nativa)
- **React Navigation** (navegación entre pantallas)
- **Zustand** (estado global ligero y rápido)
- **React Native Paper** (componentes UI pulidos)
- **Redux Persist** (persistencia local)

### Backend & Data
- **Firebase Realtime Database** (sincronización en tiempo real)
- **Firebase Authentication** (auth seguro)
- **Firebase Cloud Functions** (alertas/notificaciones)

### Testing & Deployment
- **Jest** (unit tests)
- **Expo Go** (testing en dispositivos reales sin compilar)
- **EAS Build** (compilación para TestFlight/Google Play)

### Version Control & Colaboración
- **Git + GitHub** (repositorio compartido)
- **Gitflow** (ramas feature/develop/main)

---

## 🏗️ Estructura de Carpetas

```
afpe-app/
├── .expo/
├── .github/
│   └── workflows/           # CI/CD
├── app.json                 # Config de Expo
├── app.config.js           # Config avanzada
├── src/
│   ├── screens/            # Pantallas por feature
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── Dashboard/
│   │   │   ├── DashboardScreen.js
│   │   │   └── ChartsScreen.js
│   │   ├── Transactions/
│   │   │   ├── TransactionsScreen.js
│   │   │   ├── AddTransactionScreen.js
│   │   │   └── EditTransactionScreen.js
│   │   ├── Goals/
│   │   │   ├── GoalsScreen.js
│   │   │   └── AddGoalScreen.js
│   │   └── Settings/
│   │       └── SettingsScreen.js
│   ├── components/         # Componentes reutilizables
│   │   ├── TransactionCard.js
│   │   ├── CategoryBadge.js
│   │   ├── GoalProgressBar.js
│   │   ├── ChartWidget.js
│   │   └── EmptyState.js
│   ├── navigation/         # Configuración de navegación
│   │   ├── RootNavigator.js
│   │   └── AuthNavigator.js
│   ├── store/              # Zustand stores
│   │   ├── authStore.js
│   │   ├── transactionStore.js
│   │   └── goalStore.js
│   ├── services/           # Integraciones externas
│   │   ├── firebase.js
│   │   ├── authService.js
│   │   ├── transactionService.js
│   │   └── notificationService.js
│   ├── utils/              # Funciones helper
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── dates.js
│   │   └── constants.js
│   ├── styles/             # Tema y estilos globales
│   │   ├── theme.js
│   │   └── colors.js
│   └── App.js              # Root component
├── tests/                  # Tests
├── package.json
├── babel.config.js
└── README.md
```

---

## 🔄 Plan de Iteraciones (3 sprints de 2-3 semanas)

### **Iteración 1: Autenticación & Base (5/10 - 18/10)**
**Objetivo:** Usuarios pueden registrarse, loguearse y ver pantalla principal vacía

**Features:**
- ✅ Registro con email/contraseña (Firebase Auth)
- ✅ Login y logout
- ✅ Pantalla de bienvenida (Dashboard vacío)
- ✅ Persistencia de sesión
- ✅ Validación básica de formularios

**Entregables:**
- App funcional en Expo Go
- Usuarios creados en Firebase
- Documentación de setup

**Responsabilidades:**
- **Emiliano**: Setup de proyecto, Firebase config, AuthNavigator
- **Andrés**: LoginScreen y RegisterScreen UI
- **Iker**: Store de Zustand para auth, persistencia
- **Federico**: Testing manual, coordinar avances

---

### **Iteración 2: Registro de Movimientos & Metas (19/10 - 5/11)**
**Objetivo:** Usuarios pueden registrar gastos/ingresos y crear metas de ahorro

**Features:**
- ✅ Agregar transacción (ingresos/gastos)
- ✅ Categorizar movimientos (comida, transporte, materiales, etc)
- ✅ Editar/eliminar transacciones
- ✅ Crear metas de ahorro con objetivo
- ✅ Ver lista de transacciones del mes actual
- ✅ Persistencia en Firebase

**Entregables:**
- Pantalla de agregar transacción funcional
- Pantalla de metas funcional
- Sincronización Firebase real-time

**Responsabilidades:**
- **Andrés**: AddTransactionScreen, TransactionsScreen UI
- **Iker**: transactionStore en Zustand, lógica
- **Emiliano**: GoalsScreen, AddGoalScreen
- **Federico**: Pruebas, validar flujos

---

### **Iteración 3: Dashboard, Alertas & Reportes (6/11 - 25/11)**
**Objetivo:** MVP completo con visualización de datos y notificaciones

**Features:**
- ✅ Dashboard con resumen de mes (ingresos, egresos, saldo)
- ✅ Gráficas de gastos por categoría (pie chart, bar chart)
- ✅ Alertas de sobregasto por categoría
- ✅ Recordatorios de pagos recurrentes
- ✅ Reportes mensuales descargables (PDF)
- ✅ Notificaciones push configurables
- ✅ Modo oscuro opcional

**Entregables:**
- Dashboard con gráficas funcionales
- Sistema de alertas working
- MVP completo testeable
- Build para Android/iOS

**Responsabilidades:**
- **Emiliano**: Dashboard analytics, gráficas
- **Andrés**: Visualización de reportes
- **Iker**: Cloud Functions para alertas, notificaciones push
- **Federico**: Testing final, documentación técnica

---

## 💻 Setup Inicial

### Requisitos previos
```bash
# Instalar Node.js 18+ (si no lo tienen)
node --version   # v18.0.0 o superior

# Instalar Expo CLI globalmente
npm install -g expo-cli

# Instalar Git (si no lo tienen)
git --version
```

### Crear proyecto
```bash
# Crear proyecto con Expo
npx create-expo-app afpe-app
cd afpe-app

# Instalar dependencias principales
npm install react-native-paper zustand firebase react-navigation react-native-screens react-native-safe-area-context

# Instalar dev dependencies
npm install --save-dev jest @testing-library/react-native babel-jest
```

### Configurar Firebase
1. Ir a [https://firebase.google.com](https://firebase.google.com)
2. Crear proyecto "AFPE"
3. Habilitar Authentication (Email/Password)
4. Crear Realtime Database (modo prueba)
5. Copiar credenciales a `src/services/firebase.js`

### Iniciar proyecto
```bash
expo start

# En otra terminal, scannear QR con Expo Go en el celular
```

---

## 🎨 Diseño Visual (Mobile First)

### Color Palette
```
Primary:     #2E7D32 (green - finanzas positivas)
Secondary:   #F57C00 (orange - alertas/advertencia)
Accent:      #1976D2 (blue - CTAs)
Error:       #D32F2F (red - gastos)
Success:     #388E3C (green - ingresos)
Background: #FAFAFA
Surface:    #FFFFFF
Text Dark:  #212121
Text Light: #757575
```

### Tipografía
```
Heading 1 (24sp, bold): Títulos de pantalla
Heading 2 (20sp, bold): Subtítulos
Body (16sp, regular): Contenido principal
Caption (14sp, regular): Etiquetas, fechas
Label (12sp, medium): Badges, categorías
```

### Principios de UI
- ✅ Bottom navigation para secciones principales (Home, Transactions, Goals, Settings)
- ✅ Botón flotante (+) para agregar transacción rápida
- ✅ Cards para transactions, goals, charts
- ✅ Tabs para filtrar por período (Hoy, Semana, Mes, Año)
- ✅ Formularios simples, validación inline
- ✅ Toasts para confirmaciones rápidas
- ✅ Loading states claros

---

## 🔐 Seguridad & Mejores Prácticas

### Autenticación
- ✅ Firebase Authentication (no guardar contraseñas)
- ✅ JWT tokens con refresh automático
- ✅ Logout al cerrar app (15 min de inactividad)

### Data Privacidad
- ✅ Encriptación en tránsito (HTTPS Firebase)
- ✅ Reglas Firestore/Database: Solo el usuario ve sus datos
- ✅ No guardar datos sensibles en localStorage

### Testing
- ✅ Unit tests para services (authService, transactionService)
- ✅ Component tests para screens críticas
- ✅ Manual testing en dispositivos reales
- ✅ Pruebas de seguridad (inyección, validación)

---

## 📅 Checklist por Semana

### Semana 1 (5-11 Oct)
- [ ] Repo creado en GitHub, gitflow setup
- [ ] Proyecto Expo inicializado
- [ ] Firebase project configurado
- [ ] AuthNavigator + LoginScreen básico
- [ ] Firebase Authentication funcional

### Semana 2 (12-18 Oct)
- [ ] RegisterScreen completo
- [ ] Persistencia de sesión (Redux Persist)
- [ ] DashboardScreen pantalla vacía
- [ ] Tests de autenticación

### Semana 3 (19-25 Oct)
- [ ] AddTransactionScreen funcional
- [ ] transactionStore en Zustand
- [ ] Sincronización Firebase
- [ ] TransactionsScreen mostrando lista

### Semana 4 (26-1 Nov)
- [ ] Editar/eliminar transacciones
- [ ] GoalsScreen + AddGoalScreen
- [ ] Validaciones completas
- [ ] Tests de transacciones

### Semana 5 (2-8 Nov)
- [ ] Dashboard con resumen de mes
- [ ] Gráficas (pie chart, bar chart)
- [ ] Historial de transacciones por período
- [ ] UI pulida

### Semana 6 (9-15 Nov)
- [ ] Cloud Functions para alertas
- [ ] Notificaciones push
- [ ] Reportes mensuales
- [ ] Settings screen

### Semana 7 (16-22 Nov)
- [ ] Testing completo
- [ ] Bugfixing
- [ ] Performance optimization
- [ ] Dark mode opcional

### Semana 8 (23-27 Nov)
- [ ] Build final para Android/iOS
- [ ] Documentación técnica
- [ ] Manual de usuario
- [ ] Presentación final

---

## 🚀 Próximos Pasos

1. **Hoy**: Crear repo en GitHub, configurar estructura
2. **Mañana**: Setup Firebase y primeras pantallas
3. **Esta semana**: MVP de autenticación funcional
4. **Próxima semana**: Empezar Iteración 1

¿Empezamos ahora?
