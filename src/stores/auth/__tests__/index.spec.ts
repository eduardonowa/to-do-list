import { describe, it, expect } from '@jest/globals';
import { useAuthStore } from '../index';

describe('Auth Store', () => {
  it('should export useAuthStore function', () => {
    expect(typeof useAuthStore).toBe('function');
  });
});
