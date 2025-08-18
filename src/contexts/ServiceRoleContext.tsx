import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ServiceRole = 'seeker' | 'provider';

interface ServiceRoleContextValue {
  role: ServiceRole;
  setRole: (role: ServiceRole) => void;
  toggleRole: () => void;
}

const ServiceRoleContext = createContext<ServiceRoleContextValue | undefined>(undefined);

export const ServiceRoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<ServiceRole>('seeker');

  useEffect(() => {
    const stored = localStorage.getItem('serviceRole');
    if (stored === 'seeker' || stored === 'provider') {
      setRoleState(stored);
    }
  }, []);

  const setRole = (newRole: ServiceRole) => {
    setRoleState(newRole);
    localStorage.setItem('serviceRole', newRole);
  };

  const toggleRole = () => setRole(role === 'seeker' ? 'provider' : 'seeker');

  return (
    <ServiceRoleContext.Provider value={{ role, setRole, toggleRole }}>
      {children}
    </ServiceRoleContext.Provider>
  );
};

export const useServiceRole = () => {
  const ctx = useContext(ServiceRoleContext);
  if (!ctx) throw new Error('useServiceRole must be used within ServiceRoleProvider');
  return ctx;
};
