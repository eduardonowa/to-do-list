import { describe, it, expect } from '@jest/globals';
import { filteredTasks, tasksByCategory, categories, getters } from '../getters';

describe('Tasks Getters', () => {
  it('should export filteredTasks computed', () => {
    expect(filteredTasks).toBeDefined();
  });

  it('should export tasksByCategory computed', () => {
    expect(tasksByCategory).toBeDefined();
  });

  it('should export categories computed', () => {
    expect(categories).toBeDefined();
  });

  it('should export getters object', () => {
    expect(getters).toBeDefined();
    expect(getters).toHaveProperty('filteredTasks');
    expect(getters).toHaveProperty('tasksByCategory');
    expect(getters).toHaveProperty('categories');
  });
});
