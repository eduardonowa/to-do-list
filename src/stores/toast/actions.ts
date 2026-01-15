import { toasts } from './state';
import type { IToast } from './state';

const DEFAULT_DURATION = 5000; // 5 seconds

export const showToast = (
  message: string,
  variant: IToast['variant'] = 'info',
  duration?: number
) => {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  const toast: IToast = {
    id,
    message,
    variant,
    duration: duration ?? DEFAULT_DURATION,
  };

  toasts.value.push(toast);

  // Auto remove after duration
  if (toast.duration && toast.duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, toast.duration);
  }

  return id;
};

export const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

export const clearToasts = () => {
  toasts.value = [];
};
