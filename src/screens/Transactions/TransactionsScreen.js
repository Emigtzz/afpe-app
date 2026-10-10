// src/screens/Transactions/TransactionsScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, FAB, Button } from 'react-native-paper';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community-icons';
import { colors, sizes, typography } from '../../styles/theme';

/**
 * TransactionsScreen - Pantalla de movimientos
 * Iteración 2: Implementar agregar/editar/eliminar/listar transacciones
 */

export default function TransactionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="swap-horizontal"
            size={80}
            color={colors.placeholder}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>Sin movimientos</Text>
          <Text style={styles.emptyText}>
            Agrega tu primer ingreso o gasto para empezar a rastrear tus finanzas
          </Text>
        </View>

        {/* Feature Cards */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>📊 Registro de Movimientos</Text>
            <Text style={styles.cardText}>
              Registra todos tus ingresos y egresos categorizados por tipo
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🏷️ Categorización Automática</Text>
            <Text style={styles.cardText}>
              Organiza tus movimientos en categorías predefinidas
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>✏️ Edición y Eliminación</Text>
            <Text style={styles.cardText}>
              Modifica o elimina movimientos en cualquier momento
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>📱 Sincronización en Tiempo Real</Text>
            <Text style={styles.cardText}>
              Tus datos se sincronizan automáticamente en la nube
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="Agregar"
        onPress={() => alert('Pantalla de agregar transacción (Iteración 2)')}
        style={styles.fab}
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: sizes.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: sizes.xxl * 2,
    marginBottom: sizes.xxl,
  },
  emptyIcon: {
    marginBottom: sizes.lg,
    opacity: 0.3,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: sizes.md,
  },
  emptyText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  card: {
    marginBottom: sizes.lg,
    backgroundColor: colors.surface,
  },
  cardTitle: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: sizes.md,
  },
  cardText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  fab: {
    position: 'absolute',
    margin: sizes.lg,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});
