// src/screens/Auth/RegisterScreen.js
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
  Checkbox,
} from 'react-native-paper';
import { useAuthStore } from '../../store/authStore';
import { isValidEmail, isValidPassword, getErrorMessage } from '../../utils/validators';
import { colors, sizes, typography } from '../../styles/theme';

/**
 * RegisterScreen - Pantalla de registro
 * Funcionalidades: email/password register, validación, términos y condiciones
 */

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const { loading, error, register, clearError } = useAuthStore();

  // Limpiar error cuando el usuario escribe
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

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es requerido';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejar submit del registro
   */
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(email, password);
      Alert.alert(
        'Éxito',
        'Cuenta creada correctamente. Bienvenido a AFPE!'
      );
      // La navegación se maneja automáticamente en RootNavigator
    } catch (err) {
      Alert.alert('Error de registro', getErrorMessage(err.code || error));
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
        {/* Back Button & Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            disabled={loading}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Atrás</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a AFPE hoy</Text>
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

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Confirmar Contraseña"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              placeholder="••••••••"
              editable={!loading}
              style={styles.input}
              outlineColor={colors.outline}
              activeOutlineColor={colors.primary}
              textColor={colors.text.primary}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                />
              }
            />
            {errors.confirmPassword && (
              <HelperText type="error" visible={!!errors.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>
            )}
          </View>

          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <Checkbox
              status={acceptTerms ? 'checked' : 'unchecked'}
              onPress={() => {
                setAcceptTerms(!acceptTerms);
                if (errors.terms) {
                  setErrors((prev) => ({ ...prev, terms: '' }));
                }
              }}
              color={colors.primary}
              disabled={loading}
            />
            <TouchableOpacity style={styles.termsText}>
              <Text style={styles.termsLabel}>
                Acepto los{' '}
                <Text style={styles.termsLink}>Términos y Condiciones</Text>
              </Text>
            </TouchableOpacity>
          </View>
          {errors.terms && (
            <HelperText type="error" visible={!!errors.terms}>
              {errors.terms}
            </HelperText>
          )}

          {/* Error message from Firebase */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{getErrorMessage(error)}</Text>
            </View>
          )}

          {/* Register Button */}
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.loginLink}>Inicia sesión</Text>
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
  backButton: {
    marginBottom: sizes.lg,
  },
  backText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    alignItems: 'flex-start',
    marginTop: sizes.lg,
    marginBottom: sizes.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.md,
    marginTop: sizes.lg,
  },
  termsText: {
    flex: 1,
    marginLeft: sizes.md,
  },
  termsLabel: {
    color: colors.text.primary,
    fontSize: 14,
  },
  termsLink: {
    color: colors.accent,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
  registerButton: {
    marginTop: sizes.md,
    backgroundColor: colors.primary,
  },
  buttonContent: {
    paddingVertical: sizes.md,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: sizes.lg,
    paddingVertical: sizes.lg,
  },
  loginText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
