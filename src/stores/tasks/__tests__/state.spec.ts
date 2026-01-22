import { describe, it, expect } from '@jest/globals';
import { tasks, isLoading, error, selectedCategories, selectedPriorities, state } from '../state';

describe('Tasks State', () => {
  it('should export tasks ref', () => {
    expect(tasks).toBeDefined();
  });

  it('should export isLoading ref', () => {
    expect(isLoading).toBeDefined();
  });

  it('should export error ref', () => {
    expect(error).toBeDefined();
  });

  it('should export selectedCategories ref', () => {
    expect(selectedCategories).toBeDefined();
  });

  it('should export selectedPriorities ref', () => {
    expect(selectedPriorities).toBeDefined();
  });

  it('should export state object', () => {
    expect(state).toBeDefined();
    expect(state).toHaveProperty('tasks');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
    expect(state).toHaveProperty('selectedCategories');
    expect(state).toHaveProperty('selectedPriorities');
  });
});
