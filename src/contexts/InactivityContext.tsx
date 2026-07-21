import React, { createContext, useContext } from 'react';

interface InactivityContextType {
  resetTimer: () => void;
}

const InactivityContext = createContext<InactivityContextType | undefined>(undefined);

export const InactivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const resetTimer = () => {
    // intentionally no-op to prevent automatic logout via inactivity.
  };

  return (
    <InactivityContext.Provider value={{ resetTimer }}>
      {children}
    </InactivityContext.Provider>
  );
};

export const useInactivity = () => {
  const context = useContext(InactivityContext);
  if (context === undefined) {
    throw new Error('useInactivity must be used within InactivityProvider');
  }
  return context;
};