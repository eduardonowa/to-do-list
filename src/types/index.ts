export interface IUser {
  id: number;
  email: string;
  password: string;
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  completed: boolean;
  userId: number;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface ITaskFormData {
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface IAuthResponse {
  user: Omit<IUser, 'password'>;
  token: string;
}
