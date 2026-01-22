import { ref } from 'vue';
import type { ITask } from '@/types';

export const tasks = ref<ITask[]>([]);
export const isLoading = ref(false);
export const error = ref<string | null>(null);
export const selectedCategories = ref<string[]>([]);
export const selectedPriorities = ref<string[]>([]);
export const isCreating = ref(false);
export const isUpdating = ref(false);
export const isDeleting = ref<number | null>(null);
export const isToggling = ref<number | null>(null);

export const state = {
  tasks,
  isLoading,
  error,
  selectedCategories,
  selectedPriorities,
  isCreating,
  isUpdating,
  isDeleting,
  isToggling,
};
