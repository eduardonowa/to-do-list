import axios from 'axios';
import type { IUser, ITask, ILoginCredentials, ITaskFormData, IAuthResponse } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/auth/login', credentials);
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser(): Omit<IUser, 'password'> | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  },
};

export const taskService = {
  async getTasks(): Promise<ITask[]> {
    const response = await api.get<ITask[]>('/tasks');
    return response.data;
  },

  async getTaskById(id: number): Promise<ITask> {
    const response = await api.get<ITask>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(task: ITaskFormData): Promise<ITask> {
    const response = await api.post<ITask>('/tasks', {
      ...task,
      completed: false,
    });
    return response.data;
  },

  async updateTask(id: number, task: Partial<ITaskFormData>): Promise<ITask> {
    const response = await api.patch<ITask>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async toggleTaskComplete(id: number, completed: boolean): Promise<ITask> {
    const response = await api.patch<ITask>(`/tasks/${id}`, { completed });
    return response.data;
  },
};
