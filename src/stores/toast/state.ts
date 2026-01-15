import { ref } from 'vue';

export interface IToast {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const toasts = ref<IToast[]>([]);
