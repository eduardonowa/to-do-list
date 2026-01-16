import { describe, it, expect } from '@jest/globals';
import { authService, taskService } from '../api';

describe('API Service', () => {
  describe('authService', () => {
    it('should export authService object', () => {
      expect(authService).toBeDefined();
    });

    it('should have login method', () => {
      expect(typeof authService.login).toBe('function');
    });

    it('should have logout method', () => {
      expect(typeof authService.logout).toBe('function');
    });

    it('should have getStoredUser method', () => {
      expect(typeof authService.getStoredUser).toBe('function');
    });

    it('should have getStoredToken method', () => {
      expect(typeof authService.getStoredToken).toBe('function');
    });
  });

  describe('taskService', () => {
    it('should export taskService object', () => {
      expect(taskService).toBeDefined();
    });

    it('should have getTasks method', () => {
      expect(typeof taskService.getTasks).toBe('function');
    });

    it('should have getTaskById method', () => {
      expect(typeof taskService.getTaskById).toBe('function');
    });

    it('should have createTask method', () => {
      expect(typeof taskService.createTask).toBe('function');
    });

    it('should have updateTask method', () => {
      expect(typeof taskService.updateTask).toBe('function');
    });

    it('should have deleteTask method', () => {
      expect(typeof taskService.deleteTask).toBe('function');
    });

    it('should have toggleTaskComplete method', () => {
      expect(typeof taskService.toggleTaskComplete).toBe('function');
    });
  });
});
