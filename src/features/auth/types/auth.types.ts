export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'manager' | 'user';
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }