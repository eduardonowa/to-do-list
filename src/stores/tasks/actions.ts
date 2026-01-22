import { taskService } from '@/services/api';
import {
  tasks,
  isLoading,
  error,
  selectedCategories,
  selectedPriorities,
  isCreating,
  isUpdating,
  isDeleting,
  isToggling,
} from './state';
import type { ITaskFormData } from '@/types';

export const fetchTasks = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    tasks.value = await taskService.getTasks();
  } catch (err: any) {
    if (!err.response) {
      error.value = 'Unable to reach the server. Please check your connection or try again later.';
    } else if (err.response.status >= 500) {
      error.value = 'We are having problems loading your tasks. Please try again in a few minutes.';
    } else {
      error.value = err.response?.data?.error || 'Failed to fetch tasks';
    }
  } finally {
    isLoading.value = false;
  }
};

export const createTask = async (taskData: ITaskFormData) => {
  isCreating.value = true;
  error.value = null;

  try {
    const newTask = await taskService.createTask(taskData);
    tasks.value.push(newTask);
    return { success: true, task: newTask };
  } catch (err: any) {
    if (!err.response) {
      error.value = 'Unable to reach the server. Please check your connection or try again later.';
    } else if (err.response.status >= 500) {
      error.value = 'We are having problems creating your task. Please try again in a few minutes.';
    } else {
      error.value = err.response?.data?.error || 'Failed to create task';
    }
    return { success: false, error: error.value };
  } finally {
    isCreating.value = false;
  }
};

export const updateTask = async (id: number, taskData: Partial<ITaskFormData>) => {
  isUpdating.value = true;
  error.value = null;

  try {
    const updatedTask = await taskService.updateTask(id, taskData);
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
    return { success: true, task: updatedTask };
  } catch (err: any) {
    if (!err.response) {
      error.value = 'Unable to reach the server. Please check your connection or try again later.';
    } else if (err.response.status >= 500) {
      error.value = 'We are having problems updating your task. Please try again in a few minutes.';
    } else {
      error.value = err.response?.data?.error || 'Failed to update task';
    }
    return { success: false, error: error.value };
  } finally {
    isUpdating.value = false;
  }
};

export const deleteTask = async (id: number) => {
  isDeleting.value = id;
  error.value = null;

  try {
    await taskService.deleteTask(id);
    tasks.value = tasks.value.filter(task => task.id !== id);
    return { success: true };
  } catch (err: any) {
    if (!err.response) {
      error.value = 'Unable to reach the server. Please check your connection or try again later.';
    } else if (err.response.status >= 500) {
      error.value = 'We are having problems deleting your task. Please try again in a few minutes.';
    } else {
      error.value = err.response?.data?.error || 'Failed to delete task';
    }
    return { success: false, error: error.value };
  } finally {
    isDeleting.value = null;
  }
};

export const toggleTaskComplete = async (id: number, completed: boolean) => {
  isToggling.value = id;
  error.value = null;

  try {
    const updatedTask = await taskService.toggleTaskComplete(id, completed);
    const index = tasks.value.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.value[index] = updatedTask;
    }
    return { success: true, task: updatedTask };
  } catch (err: any) {
    if (!err.response) {
      error.value = 'Unable to reach the server. Please check your connection or try again later.';
    } else if (err.response.status >= 500) {
      error.value = 'We are having problems updating your task. Please try again in a few minutes.';
    } else {
      error.value = err.response?.data?.error || 'Failed to update task';
    }
    return { success: false, error: error.value };
  } finally {
    isToggling.value = null;
  }
};

export const toggleCategoryFilter = (category: string) => {
  const index = selectedCategories.value.indexOf(category);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(category);
  }
};

export const togglePriorityFilter = (priority: string) => {
  const index = selectedPriorities.value.indexOf(priority);
  if (index > -1) {
    selectedPriorities.value.splice(index, 1);
  } else {
    selectedPriorities.value.push(priority);
  }
};

export const resetFilters = () => {
  selectedCategories.value = [];
  selectedPriorities.value = [];
};

export const removeFilter = (type: 'category' | 'priority', value: string) => {
  if (type === 'category') {
    const index = selectedCategories.value.indexOf(value);
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    }
  } else if (type === 'priority') {
    const index = selectedPriorities.value.indexOf(value);
    if (index > -1) {
      selectedPriorities.value.splice(index, 1);
    }
  }
};

export const actions = {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  toggleCategoryFilter,
  togglePriorityFilter,
  resetFilters,
  removeFilter,
};
