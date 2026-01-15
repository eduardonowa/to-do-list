import { authService } from '@/services/api';
import { user, token, isLoading, error } from './state';
import type { ILoginCredentials, IAuthResponse } from '@/types';

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

    return { success: true };
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Login failed. Please check your credentials.';
    return { success: false, error: error.value };
  } finally {
    isLoading.value = false;
  }
};

export const logout = () => {
  user.value = null;
  token.value = null;
  authService.logout();
};
