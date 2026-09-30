// src/screens/Goals/GoalsScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, FAB } from 'react-native-paper';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community-icons';
import { colors, sizes, typography } from '../../styles/theme';

/**
 * GoalsScreen - Pantalla de metas de ahorro
 * Iteración 2: Implementar crear/editar/eliminar/rastrear metas
 */

export default function GoalsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="target"
            size={80}
            color={colors.placeholder}
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyTitle}>Sin metas</Text>
          <Text style={styles.emptyText}>
            Crea tus primeras metas de ahorro y comienza a alcanzarlas
          </Text>
        </View>

        {/* Feature Cards */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🎯 Definir Metas</Text>
            <Text style={styles.cardText}>
              Establece metas de ahorro con montos y fechas específicas
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>📈 Seguimiento de Progreso</Text>
            <Text style={styles.cardText}>
              Visualiza visualmente tu progreso hacia cada meta
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>📅 Fechas de Vencimiento</Text>
            <Text style={styles.cardText}>
              Establece fechas límite y recibe recordatorios automáticos
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>🎉 Celebra Logros</Text>
            <Text style={styles.cardText}>
              Recibe notificaciones cuando alcances tus metas
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="Nueva Meta"
        onPress={() => alert('Pantalla de agregar meta (Iteración 2)')}
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
