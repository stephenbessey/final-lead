import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '../types';

interface UserContextType {
  userData: UserData;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  useCredit: () => boolean;
  resetError: () => void;
  saveZipCode: (zipCode: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

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

const STORAGE_KEY = '@leadgen_user_data';

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(INITIAL_USER_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const loadStoredData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData) as UserData;
          setUserData(parsedData);
        }
      } catch (err) {
        console.error('Failed to load user data:', err);
        setError('Failed to load user data');
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    loadStoredData();
  }, []);

  const saveUserData = useCallback(async (data: UserData): Promise<void> => {
    try {
      const serializedData = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, serializedData);
    } catch (err) {
      console.error('Failed to save user data:', err);
      throw new Error('Failed to save user data');
    }
  }, []);

  const updateUserData = useCallback(async (data: Partial<UserData>): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (data.credits !== undefined && data.credits < 0) {
        throw new Error('Credits cannot be negative');
      }
      
      if (data.monthlyPrice !== undefined && data.monthlyPrice < 0) {
        throw new Error('Monthly price cannot be negative');
      }
      
      const updatedUserData = { ...userData, ...data };
      setUserData(updatedUserData);
      await saveUserData(updatedUserData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user data';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userData, saveUserData]);

  const useCredit = useCallback((): boolean => {
    try {
      if (userData.credits <= 0) {
        setError('No credits remaining');
        return false;
      }

      const updatedUserData = { 
        ...userData, 
        credits: Math.max(0, userData.credits - 1)
      };
      
      setUserData(updatedUserData);
      
      saveUserData(updatedUserData).catch(err => {
        console.error('Failed to persist credit usage:', err);
      });
      
      setError(null);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to use credit';
      setError(errorMessage);
      return false;
    }
  }, [userData, saveUserData]);

  const saveZipCode = useCallback(async (zipCode: string): Promise<void> => {
    await updateUserData({ zipCode });
  }, [updateUserData]);

  const resetError = useCallback((): void => {
    setError(null);
  }, []);

  const value: UserContextType = React.useMemo(() => ({
    userData,
    isLoading,
    error,
    isInitialized,
    updateUserData,
    useCredit,
    resetError,
    saveZipCode,
  }), [
    userData, 
    isLoading, 
    error, 
    isInitialized,
    updateUserData, 
    useCredit, 
    resetError, 
    saveZipCode,
  ]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};