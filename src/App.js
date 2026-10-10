// src/App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useAuthStore } from './store/authStore';
import RootNavigator from './navigation/RootNavigator';
import { theme } from './styles/theme';

/**
 * Root component de AFPE
 * Maneja: Autenticación global, tema, inicialización de listeners
 */

export default function App() {
  const { initAuthListener } = useAuthStore();

  useEffect(() => {
    // Inicializar listener de autenticación cuando la app carga
    const unsubscribe = initAuthListener();

    // Limpiar listener al desmontar
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initAuthListener]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
