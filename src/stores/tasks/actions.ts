import { taskService } from '@/services/api';
import { tasks, isLoading, error, selectedCategory, selectedPriority } from './state';
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
  isLoading.value = true;
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
    isLoading.value = false;
  }
};

export const updateTask = async (id: number, taskData: Partial<ITaskFormData>) => {
  isLoading.value = true;
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
    isLoading.value = false;
  }
};

export const deleteTask = async (id: number) => {
  isLoading.value = true;
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
    isLoading.value = false;
  }
};

export const toggleTaskComplete = async (id: number, completed: boolean) => {
  isLoading.value = true;
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
    isLoading.value = false;
  }
};

export const setCategoryFilter = (category: string) => {
  selectedCategory.value = category;
};

export const setPriorityFilter = (priority: string) => {
  selectedPriority.value = priority;
};

export const resetFilters = () => {
  selectedCategory.value = 'All';
  selectedPriority.value = 'All';
};

export const actions = {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setCategoryFilter,
  setPriorityFilter,
  resetFilters,
};
