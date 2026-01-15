import { defineStore } from 'pinia';
import { toasts } from './state';
import { showToast, removeToast, clearToasts } from './actions';

export const useToastStore = defineStore('toast', () => {
  return {
    // State
    toasts,
    // Actions
    showToast,
    removeToast,
    clearToasts,
  };
});
