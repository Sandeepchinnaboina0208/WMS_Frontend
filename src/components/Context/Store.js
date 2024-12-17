import { createContext, useContext, useState, useEffect } from 'react';

// Create Context for the Store
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Initialize state from localStorage or default values
  const [store, setStore] = useState(() => {
    const savedStore = JSON.parse(localStorage.getItem('store'));
    return savedStore || { isAuthenticated: false, user: null };
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    console.log('Store updated:', store);
    localStorage.setItem('store', JSON.stringify(store));
  }, [store]);

  const login = (user) =>{
    console.log('Logging in user:', user); // Debugging
    setStore({ isAuthenticated: true, user });
    
  };
  const logout = () => {
    setStore({ isAuthenticated: false, user: null });
    localStorage.removeItem('store'); // Remove the store from localStorage on logout
  };
  

  return (
    <StoreContext.Provider value={{ store, login, logout }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
