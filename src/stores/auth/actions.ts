import { authService } from '@/services/api';
import { user, token, isLoading, error } from './state';
import type { ILoginCredentials, IAuthResponse } from '@/types';
import { useTasksStore } from '../tasks';

export const initializeAuth = () => {
  const storedUser = authService.getStoredUser();
  const storedToken = authService.getStoredToken();

  if (storedUser && storedToken) {
    user.value = storedUser;
    token.value = storedToken;
  }
};

export const login = async (credentials: ILoginCredentials) => {
  isLoading.value = true;
  error.value = null;

  try {
    const response: IAuthResponse = await authService.login(credentials);
    user.value = response.user;
    token.value = response.token;

    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    const tasksStore = useTasksStore();
    tasksStore.resetFilters();

    return { success: true };
  } catch (err: any) {
    console.error(err);
    if (!err.response) {
      error.value = 'Unable to reach the server. Please check your connection or try again later.';
    } else if (err.response.status >= 500) {
      error.value = 'We are having problems on our side. Please try again in a few minutes.';
    } else {
      error.value = err.response?.data?.error || 'Login failed. Please check your credentials.';
    }
    return { success: false, error: error.value };
  } finally {
    isLoading.value = false;
  }
};

export const logout = () => {
  user.value = null;
  token.value = null;
  authService.logout();

  const tasksStore = useTasksStore();
  tasksStore.resetFilters();
};

export const actions = {
  initializeAuth,
  login,
  logout,
};
