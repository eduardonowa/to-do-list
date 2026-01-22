import { ref } from 'vue';
import type { IUser } from '@/types';

export const user = ref<Omit<IUser, 'password'> | null>(null);
export const token = ref<string | null>(null);
export const isLoading = ref(false);
export const error = ref<string | null>(null);

export const state = {
  user,
  token,
  isLoading,
  error,
};
