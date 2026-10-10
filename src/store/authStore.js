// src/store/authStore.js
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../services/firebase';

/**
 * Store de autenticación con Zustand
 * Maneja: login, logout, registro, estado de usuario, persistencia
 */

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      loading: false,
      error: null,

      // Acciones
      /**
       * Registrar nuevo usuario
       * @param {string} email
       * @param {string} password
       */
      register: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          set({
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              createdAt: new Date().toISOString(),
            },
            loading: false,
          });
          return userCredential.user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      /**
       * Iniciar sesión
       * @param {string} email
       * @param {string} password
       */
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          set({
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            },
            loading: false,
          });
          return userCredential.user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      /**
       * Cerrar sesión
       */
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await signOut(auth);
          set({ user: null, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      /**
       * Verificar estado de autenticación
       * (Llamar en App.js al iniciar)
       */
      initAuthListener: () => {
        return onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email,
              },
            });
          } else {
            set({ user: null });
          }
        });
      },

      /**
       * Limpiar error
       */
      clearError: () => set({ error: null }),

      /**
       * Obtener usuario actual
       */
      getUser: () => get().user,

      /**
       * Verificar si está autenticado
       */
      isAuthenticated: () => get().user !== null,
    }),
    {
      name: 'auth-store', // Nombre en AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Solo persistir datos no sensibles
        user: state.user,
      }),
    }
  )
);
