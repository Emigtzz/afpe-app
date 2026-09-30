// src/screens/Dashboard/DashboardScreen.js
import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from '@react-native-vector-icons/material-community-icons';
import { useAuthStore } from '../../store/authStore';
import { useTransactionStore } from '../../store/transactionStore';
import { colors, sizes, typography } from '../../styles/theme';
import { formatCurrency, getMonthYear } from '../../utils/formatters';

/**
 * DashboardScreen - Pantalla principal de AFPE
 * Muestra: resumen de mes, balance, gráficas, acciones rápidas
 * Iteración 3: Implementar gráficas y alertas
 */

export default function DashboardScreen({ navigation }) {
  const { user } = useAuthStore();
  const { loadTransactions, getMonthlyBalance, getTotalIncome, getTotalExpenses } =
    useTransactionStore();

  const balance = getMonthlyBalance();
  const income = getTotalIncome();
  const expenses = getTotalExpenses();

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = loadTransactions(user.uid);
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [user]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {/* Welcome Card */}
      <Card style={styles.welcomeCard}>
        <Card.Content style={styles.welcomeContent}>
          <Text style={styles.welcomeText}>¡Hola, {user?.email?.split('@')[0]}!</Text>
          <Text style={styles.dateText}>{getMonthYear(new Date())}</Text>
        </Card.Content>
      </Card>

      {/* Balance Summary */}
      <Card style={styles.balanceCard}>
        <Card.Content>
          <Text style={styles.balanceLabel}>Balance de este mes</Text>
          <Text
            style={[
              styles.balanceAmount,
              { color: balance >= 0 ? colors.success : colors.error },
            ]}
          >
            {formatCurrency(balance)}
          </Text>

          {/* Income & Expenses Row */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={[styles.icon, { backgroundColor: colors.success + '20' }]}>
                <MaterialCommunityIcons
                  name="arrow-down-left"
                  size={20}
                  color={colors.success}
                />
              </View>
              <Text style={styles.summaryLabel}>Ingresos</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(income)}</Text>
            </View>

            <View style={styles.summaryItem}>
              <View style={[styles.icon, { backgroundColor: colors.error + '20' }]}>
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  size={20}
                  color={colors.error}
                />
              </View>
              <Text style={styles.summaryLabel}>Egresos</Text>
              <Text style={styles.summaryAmount}>{formatCurrency(expenses)}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Transactions')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#45B7D1' + '20' }]}>
              <MaterialCommunityIcons name="plus" size={24} color="#45B7D1" />
            </View>
            <Text style={styles.actionLabel}>Agregar Movimiento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Goals')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
              <MaterialCommunityIcons name="target" size={24} color={colors.primary} />
            </View>
            <Text style={styles.actionLabel}>Ver Metas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Placeholder for Iteration 3 */}
      <Card style={styles.placeholderCard}>
        <Card.Content>
          <MaterialCommunityIcons
            name="chart-pie"
            size={48}
            color={colors.outline}
            style={{ alignSelf: 'center', marginBottom: sizes.md }}
          />
          <Text style={styles.placeholderTitle}>Gráficas por categoría</Text>
          <Text style={styles.placeholderText}>
            Esta funcionalidad se habilitará en la siguiente actualización
          </Text>
        </Card.Content>
      </Card>

      {/* Alerts Placeholder */}
      <Card style={styles.placeholderCard}>
        <Card.Content>
          <MaterialCommunityIcons
            name="bell-outline"
            size={48}
            color={colors.outline}
            style={{ alignSelf: 'center', marginBottom: sizes.md }}
          />
          <Text style={styles.placeholderTitle}>Sistema de Alertas</Text>
          <Text style={styles.placeholderText}>
            Recibirás notificaciones de sobregasto pronto
          </Text>
        </Card.Content>
      </Card>
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
  welcomeCard: {
    marginBottom: sizes.xl,
    backgroundColor: colors.primary,
  },
  welcomeContent: {
    paddingVertical: sizes.lg,
  },
  welcomeText: {
    ...typography.h3,
    color: '#fff',
    marginBottom: sizes.sm,
  },
  dateText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  balanceCard: {
    marginBottom: sizes.xl,
    backgroundColor: colors.surface,
  },
  balanceLabel: {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: sizes.md,
  },
  balanceAmount: {
    ...typography.h2,
    marginBottom: sizes.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: sizes.lg,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizes.md,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: sizes.sm,
  },
  summaryAmount: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  section: {
    marginBottom: sizes.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: sizes.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: sizes.lg,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: sizes.lg,
    backgroundColor: colors.surface,
    borderRadius: sizes.radius.lg,
    borderWidth: 1,
    borderColor: colors.outline,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizes.md,
  },
  actionLabel: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
  placeholderCard: {
    marginBottom: sizes.lg,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.outline,
    borderStyle: 'dashed',
  },
  placeholderTitle: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: sizes.sm,
  },
  placeholderText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
