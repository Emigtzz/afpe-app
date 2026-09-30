// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community-icons';

// Screens
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import GoalsScreen from '../screens/Goals/GoalsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

// Colores
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * DashboardStack - Stack para Dashboard
 */
function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="DashboardMain"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
    </Stack.Navigator>
  );
}

/**
 * TransactionsStack - Stack para Transacciones
 */
function TransactionsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="TransactionsMain"
        component={TransactionsScreen}
        options={{ title: 'Mis Movimientos' }}
      />
    </Stack.Navigator>
  );
}

/**
 * GoalsStack - Stack para Metas
 */
function GoalsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="GoalsMain"
        component={GoalsScreen}
        options={{ title: 'Mis Metas' }}
      />
    </Stack.Navigator>
  );
}

/**
 * SettingsStack - Stack para Configuración
 */
function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ title: 'Configuración' }}
      />
    </Stack.Navigator>
  );
}

/**
 * AppNavigator - Navegación principal con Bottom Tabs
 * Tabs: Home, Transactions, Goals, Settings
 */

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home';

          if (route.name === 'Dashboard') {
            iconName = 'home-outline';
          } else if (route.name === 'Transactions') {
            iconName = 'swap-horizontal';
          } else if (route.name === 'Goals') {
            iconName = 'target';
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.outline,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          title: 'Inicio',
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsStack}
        options={{
          title: 'Movimientos',
        }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsStack}
        options={{
          title: 'Metas',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Ajustes',
        }}
      />
    </Tab.Navigator>
  );
}
