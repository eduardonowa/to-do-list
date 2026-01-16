import { computed } from 'vue';
import { tasks, selectedCategories, selectedPriorities } from './state';
import type { ITask } from '@/types';

export const filteredTasks = computed(() => {
  let filtered = [...tasks.value];

  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(task => selectedCategories.value.includes(task.category));
  }

  if (selectedPriorities.value.length > 0) {
    filtered = filtered.filter(task => selectedPriorities.value.includes(task.priority));
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

export const activeFilters = computed(() => {
  const filters: Array<{ type: 'category' | 'priority'; label: string; value: string }> = [];

  selectedCategories.value.forEach(category => {
    filters.push({
      type: 'category',
      label: 'Category',
      value: category,
    });
  });

  selectedPriorities.value.forEach(priority => {
    filters.push({
      type: 'priority',
      label: 'Priority',
      value: priority,
    });
  });

  return filters;
});

export const hasActiveFilters = computed(() => {
  return selectedCategories.value.length > 0 || selectedPriorities.value.length > 0;
});

export const getters = {
  filteredTasks,
  tasksByCategory,
  categories,
  activeFilters,
  hasActiveFilters,
};
