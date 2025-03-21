
  import React, { createContext, useContext, useReducer, useEffect } from 'react';
  import { AuthState, User } from '../../types/auth.types';
  import { AuthService } from '@/services/auth.service';
  import { useStore } from '@/stores';
  
  interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  };
  
  type AuthAction =
    | { type: 'SET_USER'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; payload: boolean };
  
  const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        };
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { setToken, setUser, setRefreshToken } = useStore((state) => state.actions);
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          dispatch({ type: 'SET_LOADING', payload: false });
          return;
        }
  
        const user = await AuthService.getCurrentUser();
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        dispatch({ type: 'LOGOUT' });
      }
    };
  
    const login = async (email: string, password: string) => {
      try {
        const {data: { token, user }} = await AuthService.login( email, password );
        localStorage.setItem('auth_token', token);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        throw error;
      }
    };
  
    const logout = async () => {
      try {
        await AuthService.logout();
        localStorage.removeItem('auth_token');
        dispatch({ type: 'LOGOUT' });
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
  
    return (
      <AuthContext.Provider value={{ ...state, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  