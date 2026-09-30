// src/navigation/RootNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../styles/theme';

const Stack = createNativeStackNavigator();

/**
 * RootNavigator - Controla navegación principal
 * Si el usuario está autenticado → AppNavigator
 * Si no → AuthNavigator
 */

export default function RootNavigator() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {user ? (
        // Usuario autenticado → mostrar AppNavigator
        <Stack.Screen
          name="App"
          component={AppNavigator}
          options={{ animationEnabled: false }}
        />
      ) : (
        // Usuario no autenticado → mostrar AuthNavigator
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ animationEnabled: false }}
        />
      )}
    </Stack.Navigator>
  );
}
