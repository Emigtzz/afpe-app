// src/screens/Settings/SettingsScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
import { Text, Card, Button, Divider, List } from 'react-native-paper';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community-icons';
import { useAuthStore } from '../../store/authStore';
import { colors, sizes, typography } from '../../styles/theme';

/**
 * SettingsScreen - Pantalla de configuración
 * Incluye: perfil, notificaciones, privacidad, logout
 */

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  /**
   * Manejar logout
   */
  const handleLogout = () => {
    Alert.alert(
      '¿Cerrar sesión?',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Section */}
      <Text style={styles.sectionTitle}>Perfil</Text>
      <Card style={styles.card}>
        <Card.Content style={styles.profileContent}>
          <View style={styles.profileIcon}>
            <MaterialCommunityIcons name="account-circle" size={48} color={colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <Text style={styles.profileText}>Usuario de AFPE</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Account Settings Section */}
      <Text style={styles.sectionTitle}>Cuenta</Text>
      <Card style={styles.card}>
        <List.Item
          title="Email"
          description={user?.email}
          left={(props) => <List.Icon {...props} icon="email" />}
        />
        <Divider />
        <List.Item
          title="Cambiar Contraseña"
          description="Actualiza tu contraseña de forma segura"
          left={(props) => <List.Icon {...props} icon="lock" />}
          onPress={() => alert('Funcionalidad de cambio de contraseña (próximamente)')}
        />
        <Divider />
        <List.Item
          title="Eliminar Cuenta"
          description="Elimina tu cuenta permanentemente"
          left={(props) => <List.Icon {...props} icon="delete" color={colors.error} />}
          titleStyle={{ color: colors.error }}
          onPress={() => alert('Funcionalidad de eliminación de cuenta (próximamente)')}
        />
      </Card>

      {/* Notifications Section */}
      <Text style={styles.sectionTitle}>Notificaciones</Text>
      <Card style={styles.card}>
        <List.Item
          title="Notificaciones de Sobregasto"
          description="Recibe alertas cuando excedas tus límites"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Recordatorios de Metas"
          description="Recibe recordatorios de tus metas de ahorro"
          left={(props) => <List.Icon {...props} icon="clock" />}
          right={() => (
            <Switch value={true} onValueChange={() => {}} />
          )}
        />
      </Card>

      {/* Appearance Section */}
      <Text style={styles.sectionTitle}>Apariencia</Text>
      <Card style={styles.card}>
        <List.Item
          title="Modo Oscuro"
          description="Activa el tema oscuro para ojos cómodos"
          left={(props) => <List.Icon {...props} icon="moon-waning-crescent" />}
          right={() => (
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
            />
          )}
        />
      </Card>

      {/* About Section */}
      <Text style={styles.sectionTitle}>Acerca de</Text>
      <Card style={styles.card}>
        <List.Item
          title="Versión"
          description="0.1.0 (MVP)"
          left={(props) => <List.Icon {...props} icon="information" />}
        />
        <Divider />
        <List.Item
          title="Términos y Condiciones"
          left={(props) => <List.Icon {...props} icon="file-document" />}
          onPress={() => alert('Términos y condiciones (próximamente)')}
        />
        <Divider />
        <List.Item
          title="Política de Privacidad"
          left={(props) => <List.Icon {...props} icon="shield" />}
          onPress={() => alert('Política de privacidad (próximamente)')}
        />
      </Card>

      {/* Help Section */}
      <Text style={styles.sectionTitle}>Ayuda</Text>
      <Card style={styles.card}>
        <List.Item
          title="Centro de Ayuda"
          description="Encuentra respuestas a preguntas frecuentes"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          onPress={() => alert('Centro de ayuda (próximamente)')}
        />
        <Divider />
        <List.Item
          title="Reportar un Problema"
          description="Ayúdanos a mejorar reportando errores"
          left={(props) => <List.Icon {...props} icon="bug" />}
          onPress={() => alert('Reporte de problemas (próximamente)')}
        />
      </Card>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={handleLogout}
        icon="logout"
        style={styles.logoutButton}
        textColor={colors.error}
      >
        Cerrar Sesión
      </Button>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Hecho con ❤️ para estudiantes de la Universidad de Colima
        </Text>
        <Text style={styles.footerText}>© 2026 AFPE. Todos los derechos reservados.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: sizes.lg,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: sizes.xl,
    marginBottom: sizes.md,
  },
  card: {
    marginBottom: sizes.lg,
    backgroundColor: colors.surface,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizes.lg,
  },
  profileIcon: {
    marginRight: sizes.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileEmail: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: sizes.sm,
  },
  profileText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  logoutButton: {
    marginTop: sizes.xl,
    marginBottom: sizes.xl,
    borderColor: colors.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: sizes.xl,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  footerText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: sizes.sm,
  },
});
