import { describe, it, expect, beforeEach } from '@jest/globals';
import { authService, taskService } from '../api';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
});

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('logout', () => {
    it('removes token and user from localStorage', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', '{"id": 1}');

      authService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('getStoredUser', () => {
    it('returns null when no user is stored', () => {
      expect(authService.getStoredUser()).toBeNull();
    });

    it('returns parsed user when user is stored', () => {
      const user = { id: 1, email: 'test@example.com' };
      localStorage.setItem('user', JSON.stringify(user));

      expect(authService.getStoredUser()).toEqual(user);
    });
  });

  describe('getStoredToken', () => {
    it('returns null when no token is stored', () => {
      expect(authService.getStoredToken()).toBeNull();
    });

    it('returns token when token is stored', () => {
      localStorage.setItem('token', 'test-token');

      expect(authService.getStoredToken()).toBe('test-token');
    });
  });
});

describe('taskService', () => {
  it('has all required methods', () => {
    expect(typeof taskService.getTasks).toBe('function');
    expect(typeof taskService.getTaskById).toBe('function');
    expect(typeof taskService.createTask).toBe('function');
    expect(typeof taskService.updateTask).toBe('function');
    expect(typeof taskService.deleteTask).toBe('function');
    expect(typeof taskService.toggleTaskComplete).toBe('function');
  });
});
