# 🤝 Guía de Contribución - AFPE

¡Gracias por contribuir a AFPE! Esta guía te ayudará a entender cómo trabajar en el proyecto.

---

## 📋 Antes de Empezar

1. **Instala todas las herramientas** requeridas (Node.js 18+, Git, Expo)
2. **Ejecuta el setup**: `bash setup.sh`
3. **Configura Firebase**: `bash setup-firebase.sh`
4. **Lee la documentación**:
   - `README.md` - Setup y estructura
   - `FIRST_RUN.md` - Primera ejecución
   - `AFPE_Plan_Desarrollo_ReactNative.md` - Plan técnico

---

## 🌿 Workflow con Git

### Estructura de Ramas

```
main (producción)
  ↑
develop (desarrollo activo)
  ↑
feature/* (nuevas features)
  ↑
bugfix/* (correcciones)
```

### Crear una Feature

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Crear rama de feature
git checkout -b feature/nombre-descriptivo

# Ejemplo: feature/auth-screens, feature/dashboard-stats, etc.
```

### Hacer Cambios y Comitear

```bash
# 1. Editar archivos
# vim src/screens/Auth/LoginScreen.js

# 2. Verificar cambios
git status

# 3. Agregar cambios
git add .

# 4. Comitear con mensaje descriptivo
git commit -m "feat: agregar LoginScreen con validación"

# O si es un bugfix:
git commit -m "fix: corregir error en authStore"
```

### Subir Cambios

```bash
# Subir la rama
git push origin feature/nombre-descriptivo

# En GitHub: Crear Pull Request
# - Asignar a un revisor
# - Describir cambios
# - Linkar issues si aplica
```

### Merge a Develop

Una vez aprobado el PR:
- Click en "Merge pull request"
- Seleccionar "Squash and merge" (recomendado)
- Eliminar rama después del merge

---

## 📝 Formato de Commits

Usamos Conventional Commits. Estructura:

```
<tipo>(<scope>): <descripción>

<cuerpo (opcional)>

<pie de página (opcional)>
```

### Tipos de Commits

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `feat` | Nueva funcionalidad | `feat: agregar LoginScreen` |
| `fix` | Corrección de bug | `fix: corregir validación email` |
| `refactor` | Cambios de código | `refactor: reorganizar authStore` |
| `style` | Formateo/estilos | `style: ajustar padding en Card` |
| `test` | Agregar tests | `test: agregar tests para validators` |
| `docs` | Documentación | `docs: actualizar README` |
| `chore` | Config/tooling | `chore: actualizar dependencias` |

### Ejemplos

```bash
# ✓ Bien
git commit -m "feat(auth): agregar LoginScreen con validación Firebase"
git commit -m "fix(dashboard): corregir balance negativo"
git commit -m "refactor(store): simplificar authStore"
git commit -m "test(validators): agregar tests de email"

# ✗ Mal
git commit -m "cambios"
git commit -m "arreglos"
git commit -m "update"
git commit -m "fix typo"
```

---

## 🧪 Testing

Antes de hacer push:

```bash
# Lint (verificar formato)
npm run lint

# Tests
npm test

# Format (auto-formatear)
npm run format
```

### GitHub Actions

Los workflows automáticos se ejecutarán:
- En cada push
- En cada Pull Request

Si falla, verás un ✗ rojo. Arregla y haz push nuevamente.

---

## 📁 Estructura de Carpetas

```
src/
├── screens/          ← Pantallas por feature
│   ├── Auth/         (LoginScreen, RegisterScreen)
│   ├── Dashboard/    (DashboardScreen, etc)
│   ├── Transactions/ (TransactionsScreen, AddTransaction, etc)
│   ├── Goals/        (GoalsScreen, AddGoal, etc)
│   └── Settings/     (SettingsScreen, etc)
│
├── navigation/       ← Navegación entre pantallas
│
├── store/            ← Estado global (Zustand)
│   ├── authStore.js
│   ├── transactionStore.js
│   └── goalStore.js
│
├── services/         ← Integraciones externas
│   ├── firebase.js
│   ├── notificationService.js
│   └── analyticsService.js
│
├── utils/            ← Funciones helper
│   ├── validators.js
│   ├── formatters.js
│   └── constants.js
│
├── styles/           ← Tema global
│   ├── theme.js
│   └── colors.js
│
└── App.js            ← Root component
```

---

## 🎯 Ciclo de Vida de una Funcionalidad

### Fase 1: Planificación
- Crear issue en GitHub describiendo la feature
- Asignar a responsable
- Estimar tamaño (S, M, L, XL)

### Fase 2: Desarrollo
- Crear rama `feature/nombre`
- Hacer commits pequeños y descriptivos
- Comprobar localmente en Expo Go

### Fase 3: Testing
- Ejecutar `npm test`
- Testing manual en celular (iOS + Android si es posible)
- Verificar que no hay console errors

### Fase 4: Pull Request
- Describir cambios claramente
- Asignar revisor (preferentemente PM)
- Esperar feedback

### Fase 5: Review & Merge
- Revisor aprueba o sugiere cambios
- Hacer ajustes si es necesario
- Merge a `develop`
- Deletear rama local y remota

---

## ⚠️ Reglas Importantes

### ✅ Hacer

- ✓ Hacer commits pequeños y frecuentes
- ✓ Escribir mensajes de commit descriptivos
- ✓ Probar localmente antes de hacer push
- ✓ Crear PRs contra `develop`, no `main`
- ✓ Revisar cambios del revisor constructivamente
- ✓ Actualizar documentación si es necesario
- ✓ Agregar tests para nuevas funcionalidades

### ❌ No Hacer

- ✗ **NUNCA** hacer commit de `.env.local`
- ✗ **NUNCA** hacer commit de `node_modules/`
- ✗ Hacer commits directos a `main` o `develop`
- ✗ Cambiar código de otros sin consultar
- ✗ Mergear tu propio PR sin review
- ✗ Dejar console.logs en producción
- ✗ Ignorar failing tests

---

## 🔒 Seguridad

- **NUNCA** commitear archivos `.env.local`
- **NUNCA** commitear contraseñas o keys
- **NUNCA** usar credenciales en código

Si accidentalmente commiteas algo sensible:
```bash
# Deshacer último commit (cuidado!)
git reset --soft HEAD~1

# O reescribir histórico (si nadie más ha pullado)
git rebase -i HEAD~N
```

---

## 📚 Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)
- [React Native Best Practices](https://reactnative.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 👥 Contactos

| Rol | Persona | Contacto |
|-----|---------|----------|
| Backend/Firebase | Emiliano | @emiliano |
| Frontend/UI | Andrés | @andrés |
| State/Lógica | Iker | @iker |
| Coordinación/PM | Federico | @federico |

---

## ❓ Preguntas Frecuentes

**P: ¿Cómo actualizo mi rama con cambios de develop?**
```bash
git checkout mi-feature
git fetch origin
git rebase origin/develop
```

**P: ¿Accidentalmente commitee a main?**
```bash
git reset --soft HEAD~1
git stash
git checkout develop
git commit -m "feat: ..."
```

**P: ¿Mi PR tiene conflictos?**
```bash
git fetch origin
git rebase origin/develop
# Arregla los conflictos
git add .
git rebase --continue
git push -f origin mi-feature
```

**P: ¿Cómo agrego una nueva librería?**
```bash
npm install nombre-de-libreria
git add package.json package-lock.json
git commit -m "chore: agregar librería-nueva"
```

---

**Gracias por contribuir a AFPE.** 🚀

Última actualización: 1 de Octubre, 2026
