import { createContext, useState, useContext } from 'react';

// Creăm contextul
const AuthContext = createContext(null);

// ATENȚIE: Trebuie să aibă 'export' în față!
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ATENȚIE: Și aici trebuie 'export'!
export const useAuth = () => useContext(AuthContext);