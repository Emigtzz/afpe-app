// src/store/transactionStore.js
import { create } from 'zustand';
import { ref, push, set, onValue, remove, update } from 'firebase/database';
import { database } from '../services/firebase';

/**
 * Store para transacciones (ingresos/gastos)
 * Maneja: CRUD de transacciones, sincronización Firebase
 */

export const useTransactionStore = create((set, get) => ({
  // Estado
  transactions: [],
  loading: false,
  error: null,

  // Categorías disponibles
  categories: [
    { id: 'comida', name: 'Comida', icon: '🍔', color: '#FF6B6B' },
    { id: 'transporte', name: 'Transporte', icon: '🚌', color: '#4ECDC4' },
    { id: 'materiales', name: 'Materiales', icon: '📚', color: '#45B7D1' },
    { id: 'entretenimiento', name: 'Entretenimiento', icon: '🎮', color: '#FFA07A' },
    { id: 'servicios', name: 'Servicios', icon: '⚡', color: '#98D8C8' },
    { id: 'salud', name: 'Salud', icon: '⚕️', color: '#F7DC6F' },
    { id: 'otros', name: 'Otros', icon: '📦', color: '#B19CD9' },
  ],

  /**
   * Crear nueva transacción
   * @param {string} userId - UID del usuario
   * @param {object} transactionData - Datos de la transacción
   */
  addTransaction: async (userId, transactionData) => {
    set({ loading: true, error: null });
    try {
      const transactionsRef = ref(database, `users/${userId}/transactions`);
      const newTransactionRef = push(transactionsRef);

      const transaction = {
        ...transactionData,
        id: newTransactionRef.key,
        createdAt: new Date().toISOString(),
      };

      await set(newTransactionRef, transaction);
      return transaction;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Actualizar una transacción existente
   * @param {string} userId
   * @param {string} transactionId
   * @param {object} updates
   */
  updateTransaction: async (userId, transactionId, updates) => {
    set({ loading: true, error: null });
    try {
      const transactionRef = ref(
        database,
        `users/${userId}/transactions/${transactionId}`
      );
      await update(transactionRef, updates);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Eliminar una transacción
   * @param {string} userId
   * @param {string} transactionId
   */
  deleteTransaction: async (userId, transactionId) => {
    set({ loading: true, error: null });
    try {
      const transactionRef = ref(
        database,
        `users/${userId}/transactions/${transactionId}`
      );
      await remove(transactionRef);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  /**
   * Cargar transacciones del usuario en tiempo real
   * @param {string} userId
   */
  loadTransactions: (userId) => {
    if (!userId) return;

    set({ loading: true });
    const transactionsRef = ref(database, `users/${userId}/transactions`);

    const unsubscribe = onValue(
      transactionsRef,
      (snapshot) => {
        const data = snapshot.val();
        const transactions = data ? Object.values(data) : [];
        set({ transactions, loading: false });
      },
      (error) => {
        set({ error: error.message, loading: false });
      }
    );

    return unsubscribe; // Retornar función para desuscribirse
  },

  /**
   * Obtener transacciones del mes actual
   */
  getTransactionsThisMonth: () => {
    const { transactions } = get();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.filter((t) => {
      const transactionDate = new Date(t.createdAt);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
  },

  /**
   * Obtener balance del mes (ingresos - egresos)
   */
  getMonthlyBalance: () => {
    const transactions = get().getTransactionsThisMonth();
    return transactions.reduce((sum, t) => {
      return sum + (t.type === 'income' ? t.amount : -t.amount);
    }, 0);
  },

  /**
   * Obtener total de gastos por categoría
   */
  getSpendingByCategory: () => {
    const transactions = get().getTransactionsThisMonth();
    const expenses = transactions.filter((t) => t.type === 'expense');

    const byCategory = {};
    expenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

    return byCategory;
  },

  /**
   * Obtener total de ingresos del mes
   */
  getTotalIncome: () => {
    const transactions = get().getTransactionsThisMonth();
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  /**
   * Obtener total de egresos del mes
   */
  getTotalExpenses: () => {
    const transactions = get().getTransactionsThisMonth();
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  /**
   * Limpiar error
   */
  clearError: () => set({ error: null }),
}));
