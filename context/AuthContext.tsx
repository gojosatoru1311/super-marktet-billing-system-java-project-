import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CustomerInfo {
  isLoggedIn: boolean;
  loyaltyId?: string;
  phoneNumber?: string;
  name?: string;
  email?: string;
  rewardPoints: number;
}

interface StaffInfo {
  isLoggedIn: boolean;
  employeeId?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  customerInfo: CustomerInfo;
  staffInfo: StaffInfo;
  loginCustomer: (details: { 
    loyaltyId?: string; 
    phoneNumber?: string;
    name?: string;
    email?: string;
  }) => void;
  logoutCustomer: () => void;
  loginStaff: (employeeId: string, password: string) => Promise<boolean>;
  logoutStaff: () => void;
  addRewardPoints: (amount: number) => void;
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
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    isLoggedIn: false,
    rewardPoints: 0
  });
  const [staffInfo, setStaffInfo] = useState<StaffInfo>({
    isLoggedIn: false
  });

  const loginCustomer = (details: { 
    loyaltyId?: string; 
    phoneNumber?: string;
    name?: string;
    email?: string;
  }) => {
    setCustomerInfo({
      isLoggedIn: true,
      ...details,
      rewardPoints: customerInfo.rewardPoints
    });
  };

  const logoutCustomer = () => {
    setCustomerInfo({
      isLoggedIn: false,
      rewardPoints: 0
    });
  };

  const loginStaff = async (employeeId: string, password: string): Promise<boolean> => {
    // In demo mode, any credentials work
    setStaffInfo({
      isLoggedIn: true,
      employeeId
    });
    setIsAuthenticated(true);
    return true;
  };

  const logoutStaff = () => {
    setStaffInfo({
      isLoggedIn: false
    });
    setIsAuthenticated(false);
  };

  const addRewardPoints = (amount: number) => {
    // Calculate reward points (1 point per ₹100 spent)
    const points = Math.floor(amount / 100);
    setCustomerInfo(prev => ({
      ...prev,
      rewardPoints: prev.rewardPoints + points
    }));
  };

  const value = {
    isAuthenticated,
    customerInfo,
    staffInfo,
    loginCustomer,
    logoutCustomer,
    loginStaff,
    logoutStaff,
    addRewardPoints
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};