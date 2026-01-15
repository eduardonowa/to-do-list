import { defineStore } from 'pinia';
import { tasks, isLoading, error, selectedCategory, selectedPriority } from './state';
import { filteredTasks, tasksByCategory, categories } from './getters';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setCategoryFilter,
  setPriorityFilter,
} from './actions';

export const useTasksStore = defineStore('tasks', () => {
  return {
    // State
    tasks,
    isLoading,
    error,
    selectedCategory,
    selectedPriority,
    // Getters
    filteredTasks,
    tasksByCategory,
    categories,
    // Actions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    setCategoryFilter,
    setPriorityFilter,
  };
});
