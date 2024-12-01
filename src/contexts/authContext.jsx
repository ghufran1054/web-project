import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const setAuth = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);
    setIsLoggedIn(true);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };