import { describe, it, expect } from '@jest/globals';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setCategoryFilter,
  setPriorityFilter,
  resetFilters,
  actions,
} from '../actions';

describe('Tasks Actions', () => {
  it('should export fetchTasks function', () => {
    expect(typeof fetchTasks).toBe('function');
  });

  it('should export createTask function', () => {
    expect(typeof createTask).toBe('function');
  });

  it('should export updateTask function', () => {
    expect(typeof updateTask).toBe('function');
  });

  it('should export deleteTask function', () => {
    expect(typeof deleteTask).toBe('function');
  });

  it('should export toggleTaskComplete function', () => {
    expect(typeof toggleTaskComplete).toBe('function');
  });

  it('should export setCategoryFilter function', () => {
    expect(typeof setCategoryFilter).toBe('function');
  });

  it('should export setPriorityFilter function', () => {
    expect(typeof setPriorityFilter).toBe('function');
  });

  it('should export resetFilters function', () => {
    expect(typeof resetFilters).toBe('function');
  });

  it('should export actions object', () => {
    expect(actions).toBeDefined();
    expect(actions).toHaveProperty('fetchTasks');
    expect(actions).toHaveProperty('createTask');
    expect(actions).toHaveProperty('updateTask');
    expect(actions).toHaveProperty('deleteTask');
    expect(actions).toHaveProperty('toggleTaskComplete');
    expect(actions).toHaveProperty('setCategoryFilter');
    expect(actions).toHaveProperty('setPriorityFilter');
    expect(actions).toHaveProperty('resetFilters');
  });
});
