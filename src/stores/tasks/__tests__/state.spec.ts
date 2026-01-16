import { describe, it, expect } from '@jest/globals';
import { tasks, isLoading, error, selectedCategory, selectedPriority, state } from '../state';

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

  it('should export selectedCategory ref', () => {
    expect(selectedCategory).toBeDefined();
  });

  it('should export selectedPriority ref', () => {
    expect(selectedPriority).toBeDefined();
  });

  it('should export state object', () => {
    expect(state).toBeDefined();
    expect(state).toHaveProperty('tasks');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
    expect(state).toHaveProperty('selectedCategory');
    expect(state).toHaveProperty('selectedPriority');
  });
});
