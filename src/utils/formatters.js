// src/utils/formatters.js

/**
 * Formatear monto a moneda MXN
 * @param {number} amount
 * @param {string} currency - Código de moneda (default: MXN)
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'MXN') => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formatear fecha a formato legible
 * @param {string|Date} date
 * @param {string} format - 'short', 'medium', 'long', 'time' (default: 'short')
 * @returns {string}
 */
export const formatDate = (date, format = 'short') => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options = {
    short: { month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
  };

  return new Intl.DateTimeFormat('es-MX', options[format] || options.short).format(dateObj);
};

/**
 * Formatear a fecha ISO (para Firebase)
 * @param {Date} date
 * @returns {string}
 */
export const formatDateISO = (date) => {
  return date.toISOString();
};

/**
 * Obtener mes y año en texto
 * @param {Date} date
 * @returns {string}
 */
export const getMonthYear = (date) => {
  const options = { month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('es-MX', options).format(date);
};

/**
 * Obtener diferencia de días entre dos fechas
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
export const getDaysDifference = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Obtener porcentaje con formato
 * @param {number} part
 * @param {number} total
 * @returns {string}
 */
export const formatPercentage = (part, total) => {
  if (total === 0) return '0%';
  return `${((part / total) * 100).toFixed(1)}%`;
};

/**
 * Truncar texto a N caracteres
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalizar primer letra
 * @param {string} text
 * @returns {string}
 */
export const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Obtener nombre del mes por número
 * @param {number} monthIndex - 0-11
 * @returns {string}
 */
export const getMonthName = (monthIndex) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthIndex];
};

/**
 * Formatear para mostrar en charts/gráficas
 * @param {number} amount
 * @returns {string}
 */
export const formatForChart = (amount) => {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
  return amount.toString();
};
