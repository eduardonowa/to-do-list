import { ref } from 'vue';
import type { ITask } from '@/types';

export const tasks = ref<ITask[]>([]);
export const isLoading = ref(false);
export const error = ref<string | null>(null);
export const selectedCategory = ref<string>('All');
export const selectedPriority = ref<string>('All');
