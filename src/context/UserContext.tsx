import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { UserData } from '../types';

interface UserContextType {
  userData: UserData;
  isLoading: boolean;
  error: string | null;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  useCredit: () => boolean;
  resetError: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

const INITIAL_USER_DATA: UserData = {
  credits: 0,
  tier: '',
  zipCode: '',
  monthlyPrice: 0,
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserData = useCallback(async (data: Partial<UserData>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate async operation (e.g., API call)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate data before updating
      if (data.credits !== undefined && data.credits < 0) {
        throw new Error('Credits cannot be negative');
      }
      
      if (data.monthlyPrice !== undefined && data.monthlyPrice < 0) {
        throw new Error('Monthly price cannot be negative');
      }
      
      setUserData(prev => ({ ...prev, ...data }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user data';
      setError(errorMessage);
      throw err; // Re-throw to allow calling components to handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  const useCredit = useCallback((): boolean => {
    try {
      if (userData.credits <= 0) {
        setError('No credits remaining');
        return false;
      }

      setUserData(prev => ({ 
        ...prev, 
        credits: Math.max(0, prev.credits - 1) // Ensure credits never go below 0
      }));
      
      setError(null);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to use credit';
      setError(errorMessage);
      return false;
    }
  }, [userData.credits]);

  const resetError = useCallback((): void => {
    setError(null);
  }, []);

  const value: UserContextType = React.useMemo(() => ({
    userData,
    isLoading,
    error,
    updateUserData,
    useCredit,
    resetError,
  }), [userData, isLoading, error, updateUserData, useCredit, resetError]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};