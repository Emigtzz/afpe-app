# 🚀 Deployment & Builds - AFPE

Guía para hacer builds y desplegar AFPE en App Store (iOS) y Google Play (Android).

> ⚠️ **NOTA**: Esta guía es para después de la Iteración 3 (MVP completo).

---

## 📋 Requisitos Previos

### Para iOS
- Mac con Xcode instalado
- Apple Developer Account ($99/año)
- Certificados y provisioning profiles configurados

### Para Android
- Android Studio instalado
- Android SDK configurado
- Google Play Developer Account ($25 único)
- Keystore configurado

### Para Ambos
- Expo Account (https://expo.dev)
- EAS CLI instalado: `npm install -g eas-cli`
- Versión del app actualizada en `app.json`

---

## 🔧 Pre-Deployment Checklist

Antes de hacer un build:

- [ ] Todos los tests pasan: `npm test`
- [ ] No hay console.logs en producción
- [ ] `.env.local` NO está en el repo
- [ ] Versión actualizada en `app.json`
- [ ] Cambios merged a `main`
- [ ] Tag git creado: `git tag v0.1.0`
- [ ] Notas de release preparadas
- [ ] App probada en Expo Go en múltiples dispositivos
- [ ] Iconos y splash screens en lugar (512x512px, 1024x1024px)

---

## 🏗️ Proceso de Build

### 1. Preparar Versión

```bash
# Actualizar versión en app.json
{
  "expo": {
    "version": "0.1.0",
    ...
  }
}

# Tag git
git tag v0.1.0
git push origin v0.1.0
```

### 2. Build con EAS

#### a) Configurar EAS

```bash
# Login en Expo
npx expo login

# Inicializar EAS en el proyecto
eas build:configure

# Esto crea eas.json
```

#### b) Hacer Build para Android

```bash
# Build para testing (Android APK)
eas build --platform android --local

# O build para Google Play (Android AAB)
eas build --platform android

# Esto crea:
# - APK para testing inmediato
# - AAB para Google Play
```

#### c) Hacer Build para iOS

```bash
# Build para TestFlight (iOS)
eas build --platform ios

# Esto crea un build para TestFlight
# (Recomendado para testing antes de App Store)
```

#### d) Build para Ambos (Recomendado)

```bash
# Build simultáneo para Android + iOS
eas build --platform all

# Espera... (toma 15-20 minutos)
```

---

## 📱 Testing Antes de Publicar

### Android

```bash
# 1. Descargar el APK
eas build:list  # Ver builds disponibles

# 2. Instalar en emulador
adb install app-debug.apk

# 3. O compartir APK para testing interno
```

### iOS

```bash
# 1. TestFlight (recomendado)
# - Abrir link en email de Apple
# - Invitar testers internos
# - Instalar desde TestFlight app

# 2. O Simulator
# Xcode → Product → Scheme → Select Simulator
```

---

## 🎯 Publicar en App Stores

### Google Play Store

```bash
# 1. Crear cuenta en https://play.google.com/console
# 2. Pagar $25 (uno solo)
# 3. Crear aplicación en Play Console

# 4. Subir build
eas submit --platform android

# 5. Responder preguntas sobre:
#    - Categoría de la app
#    - Audiencia objetivo
#    - Contenido inapropiado
#    - Privacidad

# 6. Review de Google (24-48 horas)

# 7. ¡Publicar!
```

### App Store (iOS)

```bash
# 1. Crear cuenta en https://appstoreconnect.apple.com
# 2. Pagar $99/año

# 3. Crear app en App Store Connect

# 4. Subir build
eas submit --platform ios

# 5. Responder preguntas sobre:
#    - Categoría
#    - Privacidad
#    - Edad mínima
#    - Testflight testers

# 6. Review de Apple (24-48 horas, a veces + lento)

# 7. ¡Publicar!
```

---

## 📊 Monitoreo Post-Publicación

Una vez publicada:

```bash
# Ver analytics
# - Google Play Console
# - App Store Connect

# Monitorear crashes
# - Crashlytics (Firebase)
# - Sentry (si estás usando)

# Recopilar feedback
# - Ratings en store
# - User feedback in-app
# - Soporte por email
```

---

## 🔄 Actualizar la App

### Versioning

Usamos Semantic Versioning: `MAJOR.MINOR.PATCH`

- `0.1.0` → MVP inicial
- `0.2.0` → Nuevas features (Iteración 2)
- `0.3.0` → Dashboard completo (Iteración 3)
- `1.0.0` → Release oficial
- `1.1.0` → Bugfixes y mejoras

### Proceso de Actualización

```bash
# 1. Desarrollar nuevas features en feature/xxx
# 2. Merge a develop y hacer tests
# 3. Merge a main
# 4. Aumentar versión en app.json
# 5. Crear build con eas build
# 6. Testing en TestFlight / Beta
# 7. Publicar con eas submit
# 8. Tag git con la versión
```

---

## ⚠️ Checklist de Privacidad & Seguridad

Antes de publicar (importante para App Stores):

- [ ] Política de privacidad en https://tudominio.com/privacy
- [ ] Términos de servicio en https://tudominio.com/terms
- [ ] No recopilar datos de menores sin consentimiento
- [ ] Ser transparente sobre permisos (cámara, micrófono, ubicación)
- [ ] Encriptar datos en tránsito (HTTPS) ✓ Firebase lo hace
- [ ] No vender datos de usuarios
- [ ] Cumplir GDPR/LGPD/CCPA según región
- [ ] Update privacy policy en cada store

---

## 🐛 Troubleshooting

### "Build falló"
```bash
# Ver logs detallados
eas build:list --verbose

# Si es certificado:
# iOS: Regenerar en Apple Developer
# Android: Verificar keystore
```

### "App Store rechazó mi app"
- Leer rejection reason cuidadosamente
- Arreglar issue
- Resubmit

### "El build demora mucho"
- Normal (15-20 minutos)
- Puedes hacer otras cosas
- Ver progreso en: https://expo.dev/builds

### "Crash en App Store pero no en Expo Go"
- Probar en build APK/TestFlight
- Usar Crashlytics para ver stack trace
- Check .env.local está bien configurado

---

## 📚 Recursos

- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [EAS Submit Docs](https://docs.expo.dev/build/submit-to-app-stores/)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)

---

## 👥 Soporte

- **Problemas con build**: Emiliano
- **Problemas con store**: Federico (PM)
- **Crashes/Performance**: Iker

---

**Nota**: Esta guía es referencia. Actualizarla con versiones reales cuando se haga el primer build.

Última actualización: 1 de Octubre, 2026
