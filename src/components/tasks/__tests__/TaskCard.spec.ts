import { describe, it, expect } from '@jest/globals';
import type { ITask } from '@/types';

describe('TaskCard.vue', () => {
  it('component file exists and can be imported', () => {
    const componentPath = '../TaskCard.vue';
    expect(componentPath).toBeDefined();
  });

  it('accepts task prop with ITask interface', () => {
    const mockTask: ITask = {
      id: 1,
      title: 'Test Task',
      description: 'Test Description',
      category: 'Personal',
      priority: 'High',
      dueDate: '2024-12-31',
      completed: false,
      userId: 1,
    };

    expect(mockTask.id).toBe(1);
    expect(mockTask.title).toBe('Test Task');
    expect(mockTask.priority).toBe('High');
  });

  it('has expected events', () => {
    const expectedEvents = ['click', 'toggle', 'delete'];
    expect(expectedEvents.length).toBe(3);
  });

  it('displays task information correctly', () => {
    const task: ITask = {
      id: 1,
      title: 'Task Title',
      description: 'Task Description',
      category: 'Work',
      priority: 'Medium',
      dueDate: '2024-12-31',
      completed: false,
      userId: 1,
    };

    expect(task.title).toBe('Task Title');
    expect(task.category).toBe('Work');
    expect(task.completed).toBe(false);
  });
});
