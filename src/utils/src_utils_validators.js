// src/utils/validators.js

/**
 * Validar email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar contraseña (mínimo 6 caracteres)
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validar monto (debe ser positivo)
 * @param {number} amount
 * @returns {boolean}
 */
export const isValidAmount = (amount) => {
  const numAmount = parseFloat(amount);
  return !isNaN(numAmount) && numAmount > 0;
};

/**
 * Validar descripción (no vacía)
 * @param {string} description
 * @returns {boolean}
 */
export const isValidDescription = (description) => {
  return description && description.trim().length > 0;
};

/**
 * Validar meta de ahorro
 * @param {object} goal
 * @returns {boolean}
 */
export const isValidGoal = (goal) => {
  return (
    isValidDescription(goal.name) &&
    isValidAmount(goal.targetAmount) &&
    goal.dueDate && new Date(goal.dueDate) > new Date()
  );
};

/**
 * Obtener mensaje de error amigable para Firebase errors
 * @param {string} firebaseError
 * @returns {string}
 */
export const getErrorMessage = (firebaseError) => {
  const errorMap = {
    'auth/email-already-in-use': 'Este email ya está registrado.',
    'auth/invalid-email': 'Email inválido.',
    'auth/weak-password': 'Contraseña muy débil. Mínimo 6 caracteres.',
    'auth/user-not-found': 'Usuario no encontrado.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
  };

  return errorMap[firebaseError] || 'Error desconocido. Intenta de nuevo.';
};

/**
 * Validar transacción completa
 * @param {object} transaction
 * @returns {{valid: boolean, errors: string[]}}
 */
export const validateTransaction = (transaction) => {
  const errors = [];

  if (!isValidDescription(transaction.description)) {
    errors.push('Descripción requerida');
  }
  if (!isValidAmount(transaction.amount)) {
    errors.push('Monto debe ser mayor a 0');
  }
  if (!transaction.category) {
    errors.push('Categoría requerida');
  }
  if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
    errors.push('Tipo de transacción inválido');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
