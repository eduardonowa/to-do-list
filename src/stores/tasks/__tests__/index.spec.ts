import { describe, it, expect } from '@jest/globals';
import { useTasksStore } from '../index';

describe('Tasks Store', () => {
  it('should export useTasksStore function', () => {
    expect(typeof useTasksStore).toBe('function');
  });
});
