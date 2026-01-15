import { describe, it, expect } from '@jest/globals';
import type { IUser, ITask, ILoginCredentials, ITaskFormData, IAuthResponse } from '../index';

describe('Type Definitions', () => {
  it('IUser interface has correct structure', () => {
    const user: IUser = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    };

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@example.com');
    expect(user.password).toBe('password123');
  });

  it('ITask interface has correct structure', () => {
    const task: ITask = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      category: 'Personal',
      priority: 'High',
      dueDate: '2024-12-31',
      completed: false,
      userId: 1,
    };

    expect(task.id).toBe(1);
    expect(task.title).toBe('Test Task');
    expect(task.priority).toBe('High');
    expect(task.completed).toBe(false);
  });

  it('ILoginCredentials interface has correct structure', () => {
    const credentials: ILoginCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(credentials.email).toBe('test@example.com');
    expect(credentials.password).toBe('password123');
  });

  it('ITaskFormData interface has correct structure', () => {
    const formData: ITaskFormData = {
      title: 'New Task',
      description: 'Task Description',
      category: 'Work',
      priority: 'Medium',
      dueDate: '2024-12-31',
    };

    expect(formData.title).toBe('New Task');
    expect(formData.priority).toBe('Medium');
  });

  it('IAuthResponse interface has correct structure', () => {
    const authResponse: IAuthResponse = {
      user: {
        id: 1,
        email: 'test@example.com',
      },
      token: 'test-token',
    };

    expect(authResponse.user.id).toBe(1);
    expect(authResponse.token).toBe('test-token');
    expect('password' in authResponse.user).toBe(false);
  });
});
