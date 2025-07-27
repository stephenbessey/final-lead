import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

interface AuthContextType {
  authState: AuthState;
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (username: string): void => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      username,
    };
    
    setAuthState({
      isAuthenticated: true,
      user,
    });
  };

  const logout = (): void => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  const value: AuthContextType = {
    authState,
    isAuthenticated: authState.isAuthenticated,
    currentUser: authState.user?.username || null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};