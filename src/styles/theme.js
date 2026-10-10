// src/styles/theme.js
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

/**
 * Tema global de AFPE basado en React Native Paper
 * Incluye colores, tipografía y estilos
 */

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Colores primarios
    primary: '#2E7D32', // Verde finanzas
    secondary: '#F57C00', // Naranja alertas
    tertiary: '#1976D2', // Azul CTAs

    // Estados
    error: '#D32F2F', // Rojo egresos
    success: '#388E3C', // Verde ingresos
    warning: '#F57C00', // Naranja advertencias
    info: '#1976D2', // Azul información

    // Backgrounds
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',

    // Textos
    onBackground: '#212121',
    onSurface: '#212121',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',

    // Adicionales
    outline: '#E0E0E0',
    outlineVariant: '#BDBDBD',
    scrim: 'rgba(0, 0, 0, 0.32)',

    // Grises
    disabled: '#757575',
    placeholder: '#9E9E9E',
  },

  // Tipografía personalizada
  fonts: {
    ...DefaultTheme.fonts,
  },
};

/**
 * Colores específicos de AFPE (para usar en componentes)
 */
export const colors = {
  // Primarios
  primary: '#2E7D32',
  secondary: '#F57C00',
  accent: '#1976D2',

  // Estados
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',

  // Backgrounds
  background: '#FAFAFA',
  surface: '#FFFFFF',
  surfaceLight: '#F5F5F5',
  surfaceDark: '#F0F0F0',

  // Textos
  text: {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    inverse: '#FFFFFF',
  },

  // Categorías de transacciones
  categories: {
    comida: '#FF6B6B',
    transporte: '#4ECDC4',
    materiales: '#45B7D1',
    entretenimiento: '#FFA07A',
    servicios: '#98D8C8',
    salud: '#F7DC6F',
    otros: '#B19CD9',
  },

  // Gráficas
  chart: {
    income: '#388E3C',
    expense: '#D32F2F',
    neutral: '#757575',
  },
};

/**
 * Tamaños comunes
 */
export const sizes = {
  // Espaciados
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,

  // Radio de bordes
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  // Sombras
  shadow: {
    sm: {
      elevation: 2,
    },
    md: {
      elevation: 4,
    },
    lg: {
      elevation: 8,
    },
  },
};

/**
 * Tipografía
 */
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
};
