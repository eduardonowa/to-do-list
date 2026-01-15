import { computed } from 'vue';
import { tasks, selectedCategory, selectedPriority } from './state';
import type { ITask } from '@/types';

export const filteredTasks = computed(() => {
  let filtered = [...tasks.value];

  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(task => task.category === selectedCategory.value);
  }

  if (selectedPriority.value !== 'All') {
    filtered = filtered.filter(task => task.priority === selectedPriority.value);
  }

  return filtered;
});

export const tasksByCategory = computed(() => {
  const categories: Record<string, ITask[]> = {};

  tasks.value.forEach(task => {
    categories[task.category] ??= [];
    categories[task.category]?.push(task);
  });

  return categories;
});

export const categories = computed(() => {
  const uniqueCategories = new Set(tasks.value.map(task => task.category));
  return Array.from(uniqueCategories);
});
