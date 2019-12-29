import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthDataContext = createContext(null);

const initialAuthData = null;

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);

  useEffect(() => {
    const currentAuthData = sessionStorage.getItem('currentAuthData');
    console.log(currentAuthData)
    if (currentAuthData) {
      setAuthData(currentAuthData);
    }
  }, []);

  const onLogout = () => {
    setAuthData(initialAuthData);
    sessionStorage.clear();
  };

  const onLogin = newAuthData => {
    setAuthData(newAuthData);
    sessionStorage.setItem('currentAuthData', newAuthData);
  }

  const authDataValue = {
    authData,
    onLogin,
    onLogout
  }

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;