// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  HelperText,
} from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';
import { isValidEmail, isValidPassword, getErrorMessage } from '../../utils/validators';
import { colors, sizes, typography } from '../../styles/theme';

/**
 * LoginScreen - Pantalla de inicio de sesión
 * Funcionalidades: email/password login, validación, navegación a register
 */

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { loading, error, login, clearError } = useAuthStore();

  // Limpiar error cuando el usuario empieza a escribir
  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
    if (error) clearError();
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (error) clearError();
  };

  /**
   * Validar formulario
   */
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email es requerido';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Contraseña es requerida';
    } else if (!isValidPassword(password)) {
      newErrors.password = 'Contraseña debe tener mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejar submit del login
   */
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login(email, password);
      // La navegación se maneja automáticamente en RootNavigator
    } catch (err) {
      // El error se maneja en el store
      Alert.alert('Error de login', getErrorMessage(err.code || error));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AFPE</Text>
          <Text style={styles.subtitle}>Finanzas Personales</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="tu@email.com"
              editable={!loading}
              style={styles.input}
              outlineColor={colors.outline}
              activeOutlineColor={colors.primary}
              textColor={colors.text.primary}
            />
            {errors.email && (
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Contraseña"
              value={password}
              onChangeText={handlePasswordChange}
              mode="outlined"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              placeholder="••••••••"
              editable={!loading}
              style={styles.input}
              outlineColor={colors.outline}
              activeOutlineColor={colors.primary}
              textColor={colors.text.primary}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={loading}
                />
              }
            />
            {errors.password && (
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>
            )}
          </View>

          {/* Error message from Firebase */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{getErrorMessage(error)}</Text>
            </View>
          )}

          {/* Login Button */}
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>

          {/* Forgot Password (placeholder) */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            disabled={loading}
          >
            <Text style={styles.registerLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: sizes.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: sizes.xxl,
    marginBottom: sizes.xxl,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: sizes.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  form: {
    marginBottom: sizes.xl,
  },
  inputContainer: {
    marginBottom: sizes.lg,
  },
  input: {
    backgroundColor: colors.surface,
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: sizes.radius.md,
    padding: sizes.md,
    marginBottom: sizes.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: sizes.md,
    marginBottom: sizes.lg,
    backgroundColor: colors.primary,
  },
  buttonContent: {
    paddingVertical: sizes.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  forgotContainer: {
    alignItems: 'center',
    marginTop: sizes.md,
  },
  forgotText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizes.lg,
    paddingVertical: sizes.lg,
  },
  registerText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  registerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
