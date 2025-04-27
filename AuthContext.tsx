import React, { createContext, useState, useContext, ReactNode } from 'react';

type Role = 'cashier' | 'supervisor' | 'manager';

interface StaffUser {
  id: string;
  name: string;
  role: Role;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: StaffUser | null;
  login: (employeeId: string, password: string) => Promise<boolean>;
  logout: () => void;
  customerInfo: {
    isLoggedIn: boolean;
    loyaltyId?: string;
    phoneNumber?: string;
    name?: string;
  };
  loginCustomer: (details: { 
    loyaltyId?: string; 
    phoneNumber?: string;
    name?: string;
  }) => void;
  logoutCustomer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<StaffUser | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    isLoggedIn: false,
  });

  const login = async (employeeId: string, password: string): Promise<boolean> => {
    // Accept any credentials for now
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({
          id: employeeId,
          name: 'Staff Member',
          role: 'cashier',
        });
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const loginCustomer = (details: { 
    loyaltyId?: string; 
    phoneNumber?: string;
    name?: string;
  }) => {
    setCustomerInfo({
      isLoggedIn: true,
      ...details,
    });
  };

  const logoutCustomer = () => {
    setCustomerInfo({
      isLoggedIn: false,
    });
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    customerInfo,
    loginCustomer,
    logoutCustomer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};