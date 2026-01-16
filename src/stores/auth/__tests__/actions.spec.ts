import { describe, it, expect } from '@jest/globals';
import { initializeAuth, login, logout } from '../actions';

describe('Auth Actions', () => {
  it('should export initializeAuth function', () => {
    expect(typeof initializeAuth).toBe('function');
  });

  it('should export login function', () => {
    expect(typeof login).toBe('function');
  });

  it('should export logout function', () => {
    expect(typeof logout).toBe('function');
  });
});
