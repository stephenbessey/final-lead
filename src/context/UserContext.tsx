import React, { createContext, useState, ReactNode } from 'react';
import { UserState } from '../types';

interface UserContextType extends UserState {
  updateCredits: (credits: number) => void;
  updatePlan: (plan: string) => void;
  updateZipCode: (zipCode: string) => void;
  updateUserData: (data: any) => void;
  userData: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>({
    credits: 25,
    plan: 'Professional',
    zipCode: '90210',
  });

  const [userData, setUserData] = useState<any>({});

  const updateCredits = (credits: number): void => {
    setUserState(prev => ({ ...prev, credits }));
  };

  const updatePlan = (plan: string): void => {
    setUserState(prev => ({ ...prev, plan }));
  };

  const updateZipCode = (zipCode: string): void => {
    setUserState(prev => ({ ...prev, zipCode }));
  };

  const updateUserData = (data: any): void => {
    setUserData(data);
  };

  const value: UserContextType = {
    ...userState,
    updateCredits,
    updatePlan,
    updateZipCode,
    updateUserData,
    userData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserContext };