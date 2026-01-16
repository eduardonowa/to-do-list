import { describe, it, expect } from '@jest/globals';
import { isAuthenticated } from '../getters';

describe('Auth Getters', () => {
  it('should export isAuthenticated computed', () => {
    expect(isAuthenticated).toBeDefined();
  });
});
