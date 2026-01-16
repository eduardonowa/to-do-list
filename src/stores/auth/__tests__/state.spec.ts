import { describe, it, expect } from '@jest/globals';
import { user, token, isLoading, error, state } from '../state';

describe('Auth State', () => {
  it('should export user ref', () => {
    expect(user).toBeDefined();
  });

  it('should export token ref', () => {
    expect(token).toBeDefined();
  });

  it('should export isLoading ref', () => {
    expect(isLoading).toBeDefined();
  });

  it('should export error ref', () => {
    expect(error).toBeDefined();
  });

  it('should export state object', () => {
    expect(state).toBeDefined();
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('token');
    expect(state).toHaveProperty('isLoading');
    expect(state).toHaveProperty('error');
  });
});
