import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  credits: number;
  tier: string;
  zipCode: string;
  monthlyPrice: number;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  useCredit: () => boolean;
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

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    credits: 0,
    tier: '',
    zipCode: '',
    monthlyPrice: 0,
  });

  const updateUserData = (data: Partial<UserData>): void => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const useCredit = (): boolean => {
    if (userData.credits > 0) {
      setUserData(prev => ({ ...prev, credits: prev.credits - 1 }));
      return true;
    }
    return false;
  };

  const value: UserContextType = {
    userData,
    updateUserData,
    useCredit,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
