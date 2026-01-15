import { defineStore } from 'pinia';
import { user, token, isLoading, error } from './state';
import { isAuthenticated } from './getters';
import { initializeAuth, login, logout } from './actions';

export const useAuthStore = defineStore('auth', () => {
  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    initializeAuth,
    login,
    logout,
  };
});
