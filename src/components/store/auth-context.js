import React, { useState, useEffect } from "react";

// Creates a context object. Context is your app or component-wide state. We wrap this around all of the JSX components that should be able to tap into this context. If you need
// all parts of your app to be able to listen to this context, then wrap your app component's JSX in this.
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // The typical format for useEffect. Takes a function and then an array of dependencies. useEffect() fires every time the dependencies change, but since we
  // put none in the array it will only fire once.
  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "LOGGED_IN") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "LOGGED_IN");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
