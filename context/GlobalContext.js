'use client';
import { createContext, useContext, useState } from 'react';

// Create context
const GlobalContext = createContext();

// Create a provider - this is used to wrap layout component
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context - this is used to get state anywhere in the project
export function useGlobalContext() {
  return useContext(GlobalContext);
}
