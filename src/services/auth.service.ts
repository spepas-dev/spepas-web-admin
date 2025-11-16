import { API_ROUTES } from '@/config/api.config';
import { User } from '@/types';

import { ApiService } from './api.service';

interface AuthResponse {
  status: number;
  message: string;
  filtered?: {
    user: User;
  };
  user?: User; // Alternative structure in case the response format varies
}

interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const credentials: LoginCredentials = { email, password };
      const response = await ApiService.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, credentials);

      // Validate response structure
      if (!response) {
        throw new Error('Empty response received from server');
      }

      // Check if user data exists in either possible structure
      const user = response.filtered?.user || response.user;
      if (!user) {
        throw new Error('Invalid response: user data not found');
      }

      // Validate user data structure
      if (!user.email || !user.name) {
        throw new Error('Invalid user data: missing required fields');
      }

      return response;
    } catch (error: any) {
      // Enhanced error handling with more specific messages
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;

        switch (status) {
          case 401:
            throw new Error('Invalid email or password');
          case 403:
            throw new Error('Account is disabled or suspended');
          case 429:
            throw new Error('Too many login attempts. Please try again later');
          case 500:
            throw new Error('Server error. Please try again later');
          default:
            throw new Error(serverMessage || `Login failed with status ${status}`);
        }
      } else if (error.request) {
        throw new Error('Unable to connect to server. Please check your internet connection');
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  }

  static async logout(): Promise<void> {
    try {
      await ApiService.post('/auth/signout');
    } catch (error: any) {
      // Log logout errors but don't throw them since we're clearing local state anyway
      console.warn('Logout API call failed:', {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data
      });

      // Don't throw the error - logout should always succeed locally
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await ApiService.get<AuthResponse>('/auth/user');

      // Handle both possible response structures
      const user = response.filtered?.user || response.user || response;

      if (!user || typeof user !== 'object') {
        throw new Error('Invalid user data received from server');
      }

      return user as User;
    } catch (error: any) {
      console.error('Failed to get current user:', error);
      throw new Error('Unable to fetch user information');
    }
  }

  static async refreshSession(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      console.warn('Session refresh failed:', error);
      return false;
    }
  }
}
